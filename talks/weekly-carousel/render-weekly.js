// Weekly "Upcoming AI Talks" carousel for AI Learning Hub.
// Usage: node render-weekly.js <talks.json> <out-root> [YYYY-MM-DD monday]
// Writes <out-root>/<monday>/slide-N.png, carousel.pdf, slides.html, caption.txt
// Needs Playwright (preinstalled in the cloud container). Fonts load from Google Fonts.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const [, , dataPath, outRoot, mondayArg] = process.argv;
if (!dataPath || !outRoot) { console.error('usage: node render-weekly.js talks.json outRoot [YYYY-MM-DD]'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const d = s => { const [y,m,dd] = s.split('-').map(Number); return new Date(Date.UTC(y, m-1, dd)); };
const iso = x => x.toISOString().slice(0,10);
function nextMonday() { // Monday on/after "today" in Pacific time
  const p = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const t = new Date(Date.UTC(p.getFullYear(), p.getMonth(), p.getDate()));
  t.setUTCDate(t.getUTCDate() + ((8 - t.getUTCDay()) % 7)); return t;
}
const monday = mondayArg ? d(mondayArg) : nextMonday();
const mondayIso = iso(monday);

// Talks from Monday on, sorted, max 6 (same order the site uses)
let talks = (data.talks || []).filter(t => t.date >= mondayIso)
  .sort((a,b) => (a.date + (a.sort||'1')).localeCompare(b.date + (b.sort||'1'))).slice(0, 8);
if (!talks.length) { console.error('No upcoming talks from ' + mondayIso + '. Nothing rendered.'); process.exit(2); }

const SITE = 'wei-wei-hu.github.io/ai-learning-hub/talks', SITE_URL = 'https://' + SITE + '/';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dd2 = t => String(d(t.date).getUTCDate()).padStart(2,'0');
const dayLine = t => { const x = d(t.date); return DAY[x.getUTCDay()] + ', ' + MON[x.getUTCMonth()]; };
function timeLine(t) {
  let s = t.start || '', e = t.end || '';
  if (e) { const sa = s.slice(-2), ea = e.slice(-2); if (sa === ea) s = s.slice(0,-3); s = s + ' – ' + e; }
  return s + ' PST' + (t.format ? ' · ' + t.format : '');
}
const first = d(talks[0].date), last = d(talks[talks.length-1].date);
const range = MON[first.getUTCMonth()] + ' ' + first.getUTCDate() + ' – ' +
  (last.getUTCMonth() === first.getUTCMonth() ? '' : MON[last.getUTCMonth()] + ' ') + last.getUTCDate();
const top = talks.find(t => t.top) || talks[0];

// group talk slides: 2 per slide
// up to 2 talks per slide, split evenly (5 -> 2+2+1)
const nSlides = Math.ceil(talks.length / 2), groups = [];
for (let i = 0, k = 0; i < nSlides; i++) { const n = Math.ceil((talks.length - k) / (nSlides - i)); groups.push(talks.slice(k, k + n)); k += n; }
const courses = (data.courses || []).slice(0, 3);
const total = 1 + groups.length + (courses.length ? 1 : 0) + 2;
const LOGO = s => `<span class="logo" style="width:${s}px;height:${s}px;font:700 ${Math.round(s*.4)}px/1 'Roboto Slab',Georgia,serif;color:#E4F27A">AI</span>`;
const head = n => `<div class="top"><div class="brand">${LOGO(64)}AI Learning Hub</div><span class="count">${n} / ${total}</span></div>`;
const foot = (label) => `<div class="foot"><span class="url">${SITE}</span><span class="swipe">${label} <span>›</span></span></div>`;

// ---------- shared bits ----------
const ARROW = `<span class="arrow"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
const CLOCK = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const STAR = `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor"/></svg>`;
const fmtTag = t => t.format ? `<span class="chip">${esc(t.format[0].toUpperCase() + t.format.slice(1))}</span>` : '';
const timeOnly = t => { let s = t.start || '', e = t.end || ''; if (e) { if (s.slice(-2) === e.slice(-2)) s = s.slice(0,-3); s += ' – ' + e; } return s + ' PST'; };
const mins = v => { const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(v || ''); if (!m) return null; let h = +m[1] % 12; if (/PM/i.test(m[3])) h += 12; return h * 60 + +m[2]; };
// 6 AM – 8 PM day strip, one bar per 30 min; the talk's slot is filled
function timebar(t) {
  const a = mins(t.start); if (a == null) return ''; const b = mins(t.end) ?? a + 60;
  let bars = ''; for (let m = 360; m < 1200; m += 30) { const on = m + 30 > a && m < b; bars += `<span class="${on ? 'on' : ''}" style="height:${on ? 100 : 30 + ((m / 30) % 3) * 10}%"></span>`; }
  return `<div class="tbar"><div class="bars">${bars}</div><div class="tlab"><span>6 AM</span><b>${CLOCK} ${esc(timeOnly(t))}</b><span>8 PM</span></div></div>`;
}
const DOW = x => DAY[x.getUTCDay()].toUpperCase(), MO = x => MON[x.getUTCMonth()].toUpperCase();

// ---------- cover: calendar tile (talk days filled), count capsule, top pick ----------
const talkDays = new Set(talks.map(t => t.date));
const lastSun = new Date(last); lastSun.setUTCDate(lastSun.getUTCDate() + ((7 - lastSun.getUTCDay()) % 7));
const weeks = []; for (let w = new Date(monday); w <= lastSun && weeks.length < 4; w.setUTCDate(w.getUTCDate() + 7)) {
  const row = []; for (let i = 0; i < 7; i++) { const x = new Date(w); x.setUTCDate(x.getUTCDate() + i);
    const on = talkDays.has(iso(x)), tp = talks.some(t => t.top && t.date === iso(x));
    row.push(`<span class="${on ? (tp ? 'on tp' : 'on') : ''}">${x.getUTCDate()}${x.getUTCDate() === 1 ? `<i>${MON[x.getUTCMonth()]}</i>` : ''}</span>`); }
  weeks.push(row.join('')); }

const tileClass = (t, i) => t.top ? 'c-lime' : ['c-white', 'c-sky', 'c-lav'][i % 3];
const card = (t, i) => `
  <div class="tc ${tileClass(t, i)}">
    <div class="tc-top">
      <div class="date"><span class="num">${dd2(t)}</span><span class="mo">${MO(d(t.date))}<b>${DOW(d(t.date))}</b></span></div>
      <div class="tc-tags"><span class="tag dark">${esc(t.host)}</span>${t.top ? `<span class="tag star">${STAR} Top pick</span>` : ''}${fmtTag(t)}${(t.tags || []).map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>
      ${ARROW}
    </div>
    <h3>${esc(t.title)}</h3>
    <p>${esc(t.desc)}</p>
    ${timebar(t)}
  </div>`;

const css = fs.readFileSync(path.join(__dirname, 'weekly.css'), 'utf8');
let html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Upcoming AI Talks weekly</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;600;700&family=Karla:wght@400;500;600;700&display=swap">
<style>${css}</style></head><body>
<section class="slide" id="s1">${head(1)}
  <div class="seg"><span class="on">Week of ${MON[monday.getUTCMonth()]} ${monday.getUTCDate()}</span><span>All times PST</span></div>
  <h1 class="big">Upcoming<br><b>AI Talks.</b></h1>
  <div class="cover">
    <div class="t-cal"><div class="cal-h"><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b><b>S</b></div>${weeks.map(r => `<div class="cal-r">${r}</div>`).join('')}
      <div class="cal-k"><span><i class="k-on"></i>Talk day</span><span><i class="k-top"></i>Top pick</span><span class="rng">${esc(range)}</span></div></div>
    <div class="t-count"><div class="cap"><span class="cnum">${talks.length}</span><span class="clab">Upcoming<br>talks</span></div><p>Free to watch, picked and checked by AI Learning Hub.</p></div>
    <div class="t-top c-lav">${ARROW}<span class="tag lavtag">${STAR} Top pick</span><div class="tp-d"><span class="num">${dd2(top)}</span><span class="mo">${MO(d(top.date))}<b>${DOW(d(top.date))} · ${esc(top.start)}</b></span></div><div class="ttl">${esc(top.short || top.title)}</div><p class="tp-p">${esc(top.desc)}</p>${timebar(top)}<span class="tag dark" style="align-self:flex-start">${esc(top.host)}</span></div>
  </div>
  ${foot('Swipe')}
</section>`;
groups.forEach((g, gi) => {
  html += `<section class="slide" id="s${gi+2}">${head(gi+2)}
  <h2 class="mid" style="margin-top:56px">${gi===0 ? 'Mark your <b>calendar</b>' : 'More <b>worth watching</b>'}</h2>
  <div class="tl n${g.length}">${g.map((t,i)=>card(t, gi*2+i)).join('')}</div>
  ${foot(gi === groups.length-1 ? (courses.length ? 'Courses' : 'Recap') : 'More')}
</section>`;
});
if (courses.length) {
  const ci = groups.length + 2;
  html += `<section class="slide" id="s${ci}">${head(ci)}
  <h2 class="mid" style="margin-top:56px">Learn <b>anytime</b></h2>
  <div class="seg" style="margin-top:22px"><span class="on">Free courses</span><span>Self-paced</span></div>
  <div class="courses">${courses.map((c, k) => `<div class="cs ${['c-lime','c-lav','c-sky'][k % 3]}"><div class="cs-top"><span class="tag dark">${esc(c.host)}</span>${c.meta ? `<span class="chip">${esc(c.meta)}</span>` : ''}${ARROW}</div><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p></div>`).join('')}</div>
  ${foot('Recap')}
</section>`;
}
const recap = talks.map(t => `<div class="rc${t.top ? ' top' : ''}"><span class="rd"><b>${dd2(t)}</b>${MO(d(t.date))}</span><div class="rt"><b>${esc(t.short || t.title)}</b><small>${DAY[d(t.date).getUTCDay()]} · ${esc(t.start)} PST · ${esc(t.host)}</small></div>${t.top ? `<span class="tag star">${STAR}</span>` : ''}<span class="chev">›</span></div>`).join('');
html += `<section class="slide" id="s${total-1}">${head(total-1)}
  <h2 class="mid" style="margin-top:56px">All talks <b>at a glance</b></h2>
  <div class="seg" style="margin-top:22px"><span class="on">${talks.length} talks</span><span>${esc(range)}</span><span>Save for later</span></div>
  <div class="recap${talks.length > 5 ? " dense" : ""}">${recap}</div>
  ${foot('One more')}
</section>
<section class="slide" id="s${total}">${head(total)}
  <div class="cta-card">
    ${LOGO(150)}
    <h2>Follow<br><b>Weiwei Hu</b></h2>
    <p>New AI talks every week.</p>
    <div class="socials"><span>LinkedIn</span><span>Newsletter</span><span>GitHub</span></div>
  </div>
  <p class="cta-light">Free weekly list at <b>${SITE}</b></p>
</section></body></html>`;

const out = path.join(outRoot, mondayIso); fs.mkdirSync(out, { recursive: true });

fs.writeFileSync(path.join(out, 'slides.html'), html);

// caption
const lines = talks.map(t => `• ${dayLine(t).split(',')[0]} ${MON[d(t.date).getUTCMonth()]} ${d(t.date).getUTCDate()}, ${t.start} PST: ${t.short || t.title} (${t.host})${t.top ? ' ⭐' : ''}`);
const caption = `Free AI talks coming up, all in one place 👇

${lines.join('\n')}

⭐ = top pick. All times PST, checked on each host's official page. Which one are you joining?

Get the list free every Monday at ${SITE_URL}

#AI #AITalks #Webinars #Learning`;
fs.writeFileSync(path.join(out, 'caption.txt'), caption);
// short, warm caption: hook, 1–2 top picks with times, a question, one free-list line
const NUMW = ['Zero','One','Two','Three','Four','Five','Six'];
const picks = (talks.filter(t => t.top).length ? talks.filter(t => t.top) : talks).slice(0, 2);
const when = t => { const x = d(t.date); return `${DAY[x.getUTCDay()]}, ${MON[x.getUTCMonth()]} ${x.getUTCDate()}, ${(t.start || '').replace(':00', '')} PST`; };
const spanDays = (d(talks[talks.length-1].date) - monday) / 864e5;
const whenTxt = spanDays < 7 ? 'this week' : spanDays < 14 ? 'this week and next' : 'coming up';
const pickTxt = picks.map(t => `${t.short || t.title} (${when(t)})`).join(' and ');
const short = `${NUMW[talks.length] || talks.length} free AI ${talks.length === 1 ? 'talk' : 'talks'} ${whenTxt === 'coming up' ? 'coming up' : 'worth your time ' + whenTxt} 👇

Our top ${picks.length === 1 ? 'pick' : 'picks'}: ${pickTxt}.${courses.length ? `\nPlus ${courses.length === 1 ? 'a free course' : (NUMW[courses.length] || courses.length).toLowerCase() + ' free courses'} you can start anytime.` : ''}

Save this for later. Which one are you joining?

Free list every Monday: ${SITE_URL}

#AI #AITalks #Webinars`;
fs.writeFileSync(path.join(out, 'caption-short.txt'), short);


(async () => {
  const b = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  await p.goto('file://' + path.resolve(out, 'slides.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const ok = await p.evaluate(() => document.fonts.check('300 40px "Roboto Slab"') && document.fonts.check('600 20px Karla'));
  if (!ok) console.warn('WARNING: brand fonts did not load; slides use fallback fonts.');
  for (let i = 1; i <= total; i++) await (await p.$('#s' + i)).screenshot({ path: path.join(out, `slide-${i}.png`) });
  await p.addStyleTag({ content: 'body{background:none}.slide{margin:0;page-break-after:always}' });
  await p.pdf({ path: path.join(out, 'carousel.pdf'), width: '1080px', height: '1350px', printBackground: true });
  await b.close();
  console.log(`Rendered ${total} slides for week of ${mondayIso} -> ${out}`);
})();
