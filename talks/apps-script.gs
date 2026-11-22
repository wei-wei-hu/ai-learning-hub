/**
 * Upcoming AI Talks · AI Learning Hub
 * Google Apps Script for the subscriber sheet. Paste this whole file into Apps Script.
 *
 * What it does:
 *   - The talks page sends it free signups (Sign up form).
 *   - Every hour it asks Stripe who has paid or cancelled, and updates the sheet.
 *   - Every Monday (free) and Friday (paid) it emails the talk list from the talks page.
 *   - Unsubscribe links in the emails come back here.
 *
 * Nothing private is stored in this file. Your Stripe key, your email and the signing
 * password live in Project Settings > Script Properties, which only you can see.
 * Step-by-step setup: talks/README.md in the repo.
 */

const SENDER_NAME = 'AI Learning Hub';
// Optional: send from another address you own. It must first be added in
// Gmail > Settings > Accounts > "Send mail as". Leave '' to use your Gmail.
const FROM_ALIAS = '';
const SITE = 'https://wei-wei-hu.github.io/ai-learning-hub';
const TALKS_PAGE = SITE + '/talks/';
const DATA_URL = SITE + '/talks/data.json';
const TZ = 'America/Los_Angeles';

const HEADERS = ['Email', 'Status', 'Plan', 'Stripe customer', 'Stripe subscription', 'Signed up', 'Updated', 'Source'];
const COL = { email: 1, status: 2, plan: 3, customer: 4, subscription: 5, signedUp: 6, updated: 7, source: 8 };

const props_ = () => PropertiesService.getScriptProperties();
const prop_ = k => String(props_().getProperty(k) || '').trim();

function ss_() {
  const saved = prop_('SHEET_ID');
  if (saved) return SpreadsheetApp.openById(saved);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  throw new Error('No sheet yet. Run setup() once.');
}

// Emails that always count as paid readers with no Stripe payment (you, gifts, testers).
// Script Property ALWAYS_PAID, comma separated. setup() puts your own address there.
function alwaysPaid_() { return prop_('ALWAYS_PAID').split(',').map(x => x.trim().toLowerCase()).filter(Boolean); }
const isAlwaysPaid_ = e => alwaysPaid_().indexOf(String(e).trim().toLowerCase()) >= 0;

// ===== One-time setup =====
function setup() {
  let ss;
  try { ss = ss_(); } catch (e) {
    ss = SpreadsheetApp.create('Upcoming AI Talks subscribers');
    props_().setProperty('SHEET_ID', ss.getId());
  }
  const sh = ss.getSheetByName('Subscribers') || ss.insertSheet('Subscribers');
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  const issue = ss.getSheetByName('Issue') || ss.insertSheet('Issue');
  issue.getRange('A1:A4').setValues([['Weekly emails'], ['Last free email (Monday)'], ['Last paid email (Friday)'], ['Last Stripe check']]).setFontWeight('bold');
  if (!prop_('SECRET')) props_().setProperty('SECRET', Utilities.getUuid() + Utilities.getUuid());
  if (!prop_('ALWAYS_PAID')) props_().setProperty('ALWAYS_PAID', Session.getEffectiveUser().getEmail());
  Logger.log('Your sheet: ' + ss.getUrl());
}

// Turns on the weekly emails and the hourly Stripe check.
function setupTriggers() {
  const mine = ['sendFreeEdition', 'sendPaidEdition', 'syncStripe'];
  ScriptApp.getProjectTriggers().forEach(t => { if (mine.indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sendFreeEdition').timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(6).inTimezone(TZ).create();
  ScriptApp.newTrigger('sendPaidEdition').timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(6).inTimezone(TZ).create();
  ScriptApp.newTrigger('syncStripe').timeBased().everyHours(1).create();
  Logger.log('Done. Free list: Mondays ~6 AM Pacific. Paid list: Fridays ~6 AM Pacific. Stripe check: every hour.');
}
// Older name, kept so an existing trigger setup still works.
function setupWeeklyEmails() { setupTriggers(); }

// ===== Signups from the talks page =====
function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'Something went wrong. Please try again.' }); }
  if (d.action === 'subscribe') return subscribe_(d);
  // Anything else needs the signing password (kept for manual or scripted changes).
  if (!prop_('SECRET') || d.secret !== prop_('SECRET')) return out_('denied');
  return withLock_(() => {
    const sh = sheet_(), now = new Date(), email = clean_(d.email);
    if (d.action === 'paid') { markPaid_(sh, email, d.plan || '', d.customer || '', d.subscription || '', now); return out_('ok'); }
    if (d.action === 'cancel') { markCancelled_(sh, d.subscription, d.customer, now); return out_('ok'); }
    if (d.action === 'unsubscribe') { unsubscribe_(sh, email, now); return out_('ok'); }
    return out_('unknown action');
  });
}

function subscribe_(d) {
  if (d.website) return json_({ ok: true, status: 'new' });          // hidden spam-trap field
  const email = clean_(d.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) return json_({ ok: false, error: 'Please enter a valid email.' });
  // Simple limits: 5 tries per email and 300 signups per hour in total.
  const cache = CacheService.getScriptCache();
  const k = 'try:' + email, n = Number(cache.get(k) || 0), h = 'hour:' + Utilities.formatDate(new Date(), TZ, 'yyyyMMddHH'), hn = Number(cache.get(h) || 0);
  if (n >= 5 || hn >= 300) return json_({ ok: false, error: 'Too many tries. Please try again later.' });
  cache.put(k, String(n + 1), 21600); cache.put(h, String(hn + 1), 3700);
  return withLock_(() => {
    const sh = sheet_(), now = new Date(), row = findRow_(sh, COL.email, email);
    if (!row) {
      const paid = isAlwaysPaid_(email);
      sh.appendRow([email, paid ? 'Paid' : 'Free', paid ? 'Complimentary' : '', '', '', now, now, String(d.source || 'talks page').slice(0, 60)]);
      return json_({ ok: true, status: paid ? 'paid' : 'new' });
    }
    const status = String(sh.getRange(row, COL.status).getValue());
    if (status === 'Paid' || isAlwaysPaid_(email)) return json_({ ok: true, status: 'paid' });
    if (status === 'Unsubscribed' || status === 'Cancelled') {
      sh.getRange(row, COL.status).setValue('Free'); sh.getRange(row, COL.updated).setValue(now);
      return json_({ ok: true, status: 'new' });
    }
    return json_({ ok: true, status: 'free' });
  });
}

// ===== Unsubscribe links in the emails =====
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== 'unsubscribe') return page_('Upcoming AI Talks', 'Find the list at <a href="' + TALKS_PAGE + '">' + TALKS_PAGE + '</a>.');
  const email = clean_(p.e), tok = String(p.t || '');
  const bad = () => page_('Link not valid', 'This unsubscribe link looks incomplete. Reply to any of our emails and we\'ll remove you by hand.');
  if (!email || !prop_('SECRET') || tok !== token_(email)) return bad();
  withLock_(() => unsubscribe_(sheet_(), email, new Date()));
  return page_('You\'re unsubscribed', 'You won\'t get the Upcoming AI Talks emails anymore. If you\'re a paid reader, cancel your payment from the link in your Stripe receipt.');
}

// ===== Stripe: who has paid, who has cancelled =====
// Needs Script Property STRIPE_KEY: a restricted key with Read access to Subscriptions and Customers.
// Optional STRIPE_PRICE_IDS (comma separated) if your Stripe account sells other things too.
function syncStripe() {
  const key = prop_('STRIPE_KEY');
  if (!key) throw new Error('Add STRIPE_KEY in Project Settings > Script Properties first.');
  const prices = prop_('STRIPE_PRICE_IDS').split(',').map(x => x.trim()).filter(Boolean);
  const subs = [];
  let after = '';
  for (let page = 0; page < 50; page++) {
    const url = 'https://api.stripe.com/v1/subscriptions?status=all&limit=100&expand[]=data.customer' + (after ? '&starting_after=' + after : '');
    const r = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + key }, muteHttpExceptions: true });
    if (r.getResponseCode() !== 200) throw new Error('Stripe said ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 300));
    const j = JSON.parse(r.getContentText());
    subs.push.apply(subs, j.data);
    if (!j.has_more || !j.data.length) break;
    after = j.data[j.data.length - 1].id;
  }
  const live = { active: 1, trialing: 1, past_due: 1 };
  const ended = { canceled: 1, unpaid: 1, incomplete_expired: 1 };
  // Newest first, so a reader who came back after cancelling counts as paid.
  subs.sort((a, b) => b.created - a.created);
  let paid = 0, cancelled = 0;
  withLock_(() => {
    const sh = sheet_(), now = new Date(), seen = {};
    subs.forEach(s => {
      const item = s.items && s.items.data && s.items.data[0], price = item && item.price;
      if (prices.length && !(price && prices.indexOf(price.id) >= 0)) return;
      const cust = s.customer && typeof s.customer === 'object' ? s.customer : { id: s.customer };
      const email = clean_(cust.email);
      if (!email || seen[email]) return;
      seen[email] = 1;
      const plan = price && price.recurring && price.recurring.interval === 'year' ? 'Yearly' : 'Monthly';
      if (live[s.status]) { if (markPaid_(sh, email, plan, cust.id || '', s.id, now)) paid++; }
      else if (ended[s.status]) { if (markCancelled_(sh, s.id, cust.id, now)) cancelled++; }
    });
    const issue = ss_().getSheetByName('Issue');
    if (issue) issue.getRange('B4').setValue(`${now} · ${subs.length} Stripe subscriptions · ${paid} newly paid · ${cancelled} newly cancelled`);
  });
}

// ===== Weekly emails (automatic) =====
// Monday: everyone who hasn't unsubscribed (Free, Paid and Cancelled readers). Talks from today on.
function sendFreeEdition() { sendEdition_('free', ['Free', 'Paid', 'Cancelled'], 0); }
// Friday: paid readers only. Next week's talks, 3 days early.
function sendPaidEdition() { try { syncStripe(); } catch (e) { Logger.log(e); } sendEdition_('paid', ['Paid'], 3); }
// One-off: send the paid list to paid readers right now, starting from today's talks.
function sendPaidEditionNow() { sendEdition_('paid-now', ['Paid'], 0); }

// Sends a test of both emails to you only (the first ALWAYS_PAID address).
function sendTestToMe() {
  const data = loadTalks_(), me = alwaysPaid_()[0];
  if (!me) throw new Error('Run setup() first.');
  ['free', 'paid'].forEach(kind => {
    const ed = buildEdition_(data, kind, kind === 'paid' ? 3 : 0);
    GmailApp.sendEmail(me, '[Test] ' + ed.subject, ed.subject, { htmlBody: ed.html(me, kind === 'free'), name: SENDER_NAME });
  });
}

function loadTalks_() {
  const r = UrlFetchApp.fetch(DATA_URL + '?v=' + Date.now(), { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error('Could not read the talk list from the talks page (' + r.getResponseCode() + '). Nothing was sent.');
  const data = JSON.parse(r.getContentText());
  const age = (Date.now() - new Date(data.updated + 'T12:00:00Z').getTime()) / 864e5;
  if (age > 8) throw new Error('The talk list was last updated ' + data.updated + ', more than a week ago. Nothing was sent.');
  return data;
}

function sendEdition_(kind, statuses, daysAhead) {
  const today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  if (prop_('SENT_' + kind) === today) return; // already sent today
  const ed = buildEdition_(loadTalks_(), kind === 'paid-now' ? 'paid' : kind, daysAhead);
  if (!ed.count) throw new Error('No upcoming talks in the list. Nothing was sent.');
  const ss = ss_();
  const rows = ss.getSheetByName('Subscribers').getDataRange().getValues().slice(1);
  const statusOf = {};
  rows.forEach(r => { statusOf[clean_(r[0])] = r[COL.status - 1]; });
  const to = rows.filter(r => statuses.indexOf(r[COL.status - 1]) >= 0 || (isAlwaysPaid_(r[0]) && r[COL.status - 1] !== 'Unsubscribed')).map(r => clean_(r[0])).filter(Boolean);
  alwaysPaid_().forEach(e => { if (to.indexOf(e) < 0 && statusOf[e] !== 'Unsubscribed') to.push(e); });
  const left = MailApp.getRemainingDailyQuota();
  if (to.length > left) throw new Error(`Gmail allows ${left} more emails today and this edition has ${to.length} readers. Send the rest tomorrow, or move to an email service.`);
  to.forEach(email => {
    const isPaid = statusOf[email] === 'Paid' || isAlwaysPaid_(email);
    const opts = { htmlBody: ed.html(email, !isPaid), name: SENDER_NAME };
    if (FROM_ALIAS) opts.from = FROM_ALIAS;
    GmailApp.sendEmail(email, ed.subject, 'This email is best viewed in an email app that shows HTML.', opts);
  });
  props_().setProperty('SENT_' + kind, today);
  const issue = ss.getSheetByName('Issue');
  if (issue) issue.getRange(kind === 'free' ? 'B2' : 'B3').setValue(`${new Date()} · ${to.length} emails · ${ed.subject}`);
}

function buildEdition_(data, kind, daysAhead) {
  const from = new Date(Date.now() + daysAhead * 864e5);
  const start = Utilities.formatDate(from, TZ, 'yyyy-MM-dd');
  let talks = data.talks.filter(t => t.date >= start);
  if (!talks.length) talks = data.talks.filter(t => t.date >= Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'));
  const d0 = talks.length ? new Date(talks[0].date + 'T12:00:00Z') : from;
  const weekOf = Utilities.formatDate(d0, 'UTC', 'MMM d');
  const subject = (kind === 'paid' ? 'Early access: ' : '') + 'Upcoming AI Talks, week of ' + weekOf;
  const asOf = Utilities.formatDate(new Date(data.updated + 'T12:00:00Z'), 'UTC', 'MMMM d, yyyy');
  const e = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cards = talks.map(t => {
    const dt = new Date(t.date + 'T12:00:00Z');
    const day = Utilities.formatDate(dt, 'UTC', 'dd'), dow = Utilities.formatDate(dt, 'UTC', 'EEE, MMM');
    const when = timeRange_(t) + (t.format ? ' · ' + t.format : '');
    const tags = `<span style="display:inline-block;background:#151515;color:#fff;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:600">${e(t.host)}</span>` +
      (t.top ? ` <span style="display:inline-block;background:#E5F27A;color:#151515;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:600">Top pick</span>` : '');
    const cal = kind === 'paid' ? `<p style="margin:12px 0 0"><a href="${e(calLink_(t))}" style="display:inline-block;border:1px solid #151515;border-radius:999px;padding:7px 14px;color:#151515;text-decoration:none;font-size:13px;font-weight:600">Add to calendar ›</a></p>` : '';
    return `<tr><td style="padding:0 0 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${t.top ? '#F6FAD9' : '#ffffff'};border-radius:22px;border:1px solid #ECE8EF"><tr><td style="padding:20px 22px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="font:300 44px/1 Georgia,serif;color:#151515;padding-right:14px">${day}</td><td style="font:14px/1.4 Arial,sans-serif;color:#555"><b style="color:#151515">${dow}</b><br>${e(when)}</td></tr></table>
      <p style="margin:12px 0 0;font-family:Arial,sans-serif">${tags}</p>
      <p style="margin:12px 0 0;font:700 18px/1.3 Georgia,serif"><a href="${e(t.url)}" style="color:#151515;text-decoration:underline;text-decoration-color:#E5F27A">${e(t.title)}</a></p>
      <p style="margin:6px 0 0;font:15px/1.5 Arial,sans-serif;color:#444">${e(t.desc)}</p>${cal}
    </td></tr></table></td></tr>`;
  }).join('');
  const html = (email, showUpsell) => {
    const unsub = `${ScriptApp.getService().getUrl()}?action=unsubscribe&e=${encodeURIComponent(email)}&t=${token_(email)}`;
    const upsell = showUpsell ? `<tr><td style="padding:6px 0 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#151515;border-radius:22px"><tr><td style="padding:22px;font-family:Arial,sans-serif;color:#fff">
      <p style="margin:0;font:300 22px/1.3 Georgia,serif;color:#fff">Get next week's list 3 days early.</p>
      <p style="margin:14px 0 0"><a href="${TALKS_PAGE}?plan=monthly&email=${encodeURIComponent(email)}" style="display:inline-block;background:#E5F27A;color:#151515;border-radius:999px;padding:11px 20px;text-decoration:none;font-weight:700;font-size:14px">Subscribe to Paid ›</a></p>
    </td></tr></table></td></tr>` : '';
    return `<div style="background:#F3EEF2;padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
      <tr><td style="padding:0 4px 18px;font-family:Arial,sans-serif">
        <p style="margin:0;font-size:13px;color:#666">${kind === 'paid' ? 'Paid edition · 3 days early' : 'AI Learning Hub'}</p>
        <h1 style="margin:6px 0 0;font:300 34px/1.1 Georgia,serif;color:#151515">Upcoming <b>AI Talks.</b></h1>
        <p style="margin:8px 0 0;font-size:15px;color:#444">Free AI talks and webinars, curated weekly for you.</p>
      </td></tr>
      ${cards}${upsell}
      <tr><td style="padding:8px 4px 0;font:12px/1.5 Arial,sans-serif;color:#6b726e;text-align:center">Dates and times verified on each host’s official website as of ${asOf}. Schedules may change, so please confirm before registering.<br><br>You're getting this because you signed up for Upcoming AI Talks from <a href="${TALKS_PAGE}" style="color:#6b726e">AI Learning Hub</a> by Weiwei Hu. <a href="${unsub}" style="color:#6b726e">Unsubscribe</a></td></tr>
    </table></div>`;
  };
  return { subject, html, count: talks.length };
}

// ===== Helpers =====
function markPaid_(sh, email, plan, customer, subscription, now) {
  if (!email) return false;
  const row = findRow_(sh, COL.email, email);
  if (!row) { sh.appendRow([email, 'Paid', plan, customer, subscription, now, now, 'stripe']); return true; }
  const cur = sh.getRange(row, COL.status, 1, 4).getValues()[0];
  if (cur[0] === 'Paid' && cur[1] === plan && cur[2] === customer && cur[3] === subscription) return false;
  // Someone who unsubscribed from emails but still pays stays unsubscribed.
  const status = cur[0] === 'Unsubscribed' ? 'Unsubscribed' : 'Paid';
  sh.getRange(row, COL.status, 1, 4).setValues([[status, plan, customer, subscription]]);
  sh.getRange(row, COL.updated).setValue(now);
  return cur[0] !== status;
}
function markCancelled_(sh, subscription, customer, now) {
  let row = subscription ? findRow_(sh, COL.subscription, subscription) : 0;
  if (!row && customer) row = findRow_(sh, COL.customer, customer);
  if (!row || isAlwaysPaid_(sh.getRange(row, COL.email).getValue())) return false;
  if (String(sh.getRange(row, COL.status).getValue()) !== 'Paid') return false;
  sh.getRange(row, COL.status).setValue('Cancelled'); sh.getRange(row, COL.updated).setValue(now);
  return true;
}
function unsubscribe_(sh, email, now) {
  const row = findRow_(sh, COL.email, email);
  if (row) { sh.getRange(row, COL.status).setValue('Unsubscribed'); sh.getRange(row, COL.updated).setValue(now); }
}
function timeRange_(t) {
  const s = String(t.start || '').trim(), en = String(t.end || '').trim();
  if (!s) return '';
  if (!en) return s + ' PST';
  const ap = x => (x.match(/(AM|PM)$/i) || [''])[0].toUpperCase();
  return ap(s) && ap(s) === ap(en) ? s.replace(/\s*(AM|PM)$/i, '') + ' – ' + en + ' PST' : s + ' – ' + en + ' PST';
}
function hhmm_(x) {
  const m = String(x || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = Number(m[1]) % 12; if (/pm/i.test(m[3])) h += 12;
  return ('0' + h).slice(-2) + m[2] + '00';
}
function calLink_(t) {
  const d = t.date.replace(/-/g, '');
  const s = hhmm_(t.start) || '090000';
  let en = hhmm_(t.end);
  if (!en) en = ('0' + Math.min(23, Number(s.slice(0, 2)) + 1)).slice(-2) + s.slice(2);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(t.title) +
    '&dates=' + d + 'T' + s + '/' + d + 'T' + en + '&ctz=' + encodeURIComponent(TZ) + '&details=' + encodeURIComponent(t.url);
}
function token_(email) {
  return Utilities.computeHmacSha256Signature(String(email).toLowerCase(), prop_('SECRET'))
    .map(b => ('0' + (b & 0xff).toString(16)).slice(-2)).join('');
}
function findRow_(sh, col, value) {
  if (!value) return 0;
  const last = sh.getLastRow();
  if (last < 2) return 0;
  const vals = sh.getRange(2, col, last - 1, 1).getValues();
  for (let i = 0; i < vals.length; i++) if (String(vals[i][0]).trim().toLowerCase() === String(value).toLowerCase()) return i + 2;
  return 0;
}
function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}
const sheet_ = () => ss_().getSheetByName('Subscribers');
const clean_ = e => String(e || '').trim().toLowerCase();
const out_ = text => ContentService.createTextOutput(text);
const json_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
function page_(title, msg) {
  return HtmlService.createHtmlOutput(`<div style="font:16px/1.55 Arial,sans-serif;max-width:520px;margin:60px auto;padding:28px;background:#fff;border-radius:22px;border:1px solid #ECE8EF"><h1 style="font:300 30px/1.2 Georgia,serif;margin:0 0 12px">${title}</h1><p style="margin:0 0 18px;color:#444">${msg}</p><a href="${TALKS_PAGE}" style="display:inline-block;background:#151515;color:#fff;border-radius:999px;padding:10px 18px;text-decoration:none;font-weight:600">Back to Upcoming AI Talks ›</a></div>`).setTitle(title);
}
