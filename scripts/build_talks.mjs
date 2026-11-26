#!/usr/bin/env node
// Upcoming AI Talks: bakes docs/talks/talks.json into docs/talks/index.html.
// Run from the repo root after editing talks.json:  node scripts/build_talks.mjs
// It fills the blocks between <!--T:NAME--> and <!--/T:NAME--> markers and
// writes docs/talks/data.json, the cleaned list the weekly email reads.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = join(ROOT, "docs/talks/index.html");
const DATA = join(ROOT, "docs/talks/talks.json");
const OUT = join(ROOT, "docs/talks/data.json");

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const laToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());
const dparts = iso => { const d = new Date(iso + "T12:00:00Z"); return { day: String(d.getUTCDate()).padStart(2, "0"), dow: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }), mon: MONTHS[d.getUTCMonth()].slice(0, 3), month: MONTHS[d.getUTCMonth()], year: d.getUTCFullYear(), date: d }; };
const ampm = t => (String(t).match(/(AM|PM)$/i) || [""])[0].toUpperCase();
function timeRange(t) {
  const s = String(t.start || "").trim(), e = String(t.end || "").trim();
  if (!s) return "";
  if (!e) return `${s} PST`;
  return ampm(s) && ampm(s) === ampm(e) ? `${s.replace(/\s*(AM|PM)$/i, "")} – ${e} PST` : `${s} – ${e} PST`;
}
function swapBlock(html, name, inner) {
  const a = `<!--T:${name}-->`, b = `<!--/T:${name}-->`, i = html.indexOf(a), j = html.indexOf(b);
  return i < 0 || j < i ? html : html.slice(0, i + a.length) + inner + html.slice(j);
}
function cleanTalks(raw) {
  if (!raw || !Array.isArray(raw.talks) || !/^\d{4}-\d{2}-\d{2}$/.test(raw.updated || "")) return null;
  const today = laToday();
  const talks = raw.talks
    .filter(t => t && /^\d{4}-\d{2}-\d{2}$/.test(t.date || "") && t.title && /^https:\/\//.test(t.url || "") && t.date >= today)
    .sort((a, b) => (a.date + (a.sort || "")).localeCompare(b.date + (b.sort || "")))
    .slice(0, 12);
  const courses = (Array.isArray(raw.courses) ? raw.courses : []).filter(c => c && c.title && /^https:\/\//.test(c.url || "")).slice(0, 6);
  return { updated: raw.updated, talks, courses };
}
function tagsHtml(t) {
  let h = `<span class="tag dark">${esc(t.host)}</span>`;
  if (t.top) h += `<span class="tag lime">Top pick</span>`;
  for (const x of (t.tags || []).slice(0, 2)) h += `<span class="tag">${esc(x)}</span>`;
  return h;
}
function renderTalksPage(html, data) {
  const u = dparts(data.updated);
  html = swapBlock(html, "UPDATED", `Updated ${u.mon} ${Number(u.day)}, ${u.year}`);
  html = swapBlock(html, "ASOF", `${u.month} ${Number(u.day)}, ${u.year}`);
  const list = data.talks.length ? data.talks.map((t, i) => {
    const p = dparts(t.date), cls = t.top ? "pick" : (i % 2 ? "sky" : "");
    const when = timeRange(t) + (t.format ? ` · ${esc(t.format)}` : "");
    return `
    <article class="card talk ${cls}" data-date="${t.date}">
      <div class="when"><span class="num">${p.day}</span><div><b>${p.dow}, ${p.mon}</b>${esc(when)}</div></div>
      <div class="tags">${tagsHtml(t)}</div>
      <h3><a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.title)}</a></h3>
      <p class="take">${esc(t.desc)}</p>
${t.top && t.why ? `      <p class="why"><b>Why I picked it</b>${esc(t.why)}</p>\n` : ""}    </article>
`;
  }).join("") : `
    <article class="card talk"><h3>New talks are on the way.</h3><p class="take">Sign up above and we'll send the next list to your inbox.</p></article>
`;
  html = swapBlock(html, "LIST", list);
  html = swapBlock(html, "COURSES", (data.courses || []).map((c, i) => `
      <a class="course k${i % 3}" href="${esc(c.url)}" target="_blank" rel="noopener">
        <span class="tag dark">${esc(c.provider || c.host)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.desc)}</p>
        <div class="c-foot"><span>${/^free/i.test(c.meta || "") ? esc(c.meta) : "Free" + (c.meta ? " · " + esc(c.meta) : "")}</span><span class="c-go">Start free ›</span></div>
      </a>`).join("") + "\n    ");
  if (!(data.courses || []).length) html = html.replace('<section class="courses" id="courses">', '<section class="courses" id="courses" hidden>');
  return swapBlock(html, "HERO", heroBento(data));
}
// Hero: calendar of talk days, count capsule, and the top pick with a time-of-day strip.
function heroBento(data) {
  const talks = data.talks;
  if (!talks.length) return "";
  const days = {}; for (const t of talks) { days[t.date] = days[t.date] || { top: false }; if (t.top) days[t.date].top = true; }
  const first = new Date(talks[0].date + "T12:00:00Z");
  const mon = new Date(first); mon.setUTCDate(first.getUTCDate() - ((first.getUTCDay() + 6) % 7));
  let rows = "";
  for (let w = 0; w < 3; w++) {
    let r = "";
    for (let k = 0; k < 7; k++) {
      const d = new Date(mon); d.setUTCDate(mon.getUTCDate() + w * 7 + k);
      const iso = d.toISOString().slice(0, 10), info = days[iso];
      const badge = d.getUTCDate() === 1 && (w || k) ? `<i>${MONTHS[d.getUTCMonth()].slice(0, 3)}</i>` : "";
      r += `<span class="${info ? "on" + (info.top ? " tp" : "") : ""}">${d.getUTCDate()}${badge}</span>`;
    }
    rows += `<div class="cal-r">${r}</div>`;
  }
  const a = dparts(talks[0].date), b = dparts(talks[talks.length - 1].date);
  const range = talks[0].date === talks[talks.length - 1].date ? `${a.mon} ${Number(a.day)}` : `${a.mon} ${Number(a.day)} – ${b.mon} ${Number(b.day)}`;
  const tp = talks.find(t => t.top) || talks[0], p = dparts(tp.date);
  // 28 half-hour slots from 6 AM to 8 PM; the talk's time is filled in.
  const mins = x => { const m = String(x || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i); if (!m) return null; let h = Number(m[1]) % 12; if (/pm/i.test(m[3])) h += 12; return h * 60 + Number(m[2]); };
  const s = mins(tp.start), e = mins(tp.end) ?? (s != null ? s + 60 : null);
  let bars = "";
  for (let k = 0; k < 28; k++) {
    const t0 = 360 + k * 30, on = s != null && t0 + 30 > s && t0 < e;
    bars += `<span class="${on ? "on" : ""}" style="height:${on ? 100 : [30, 42, 54, 36][k % 4]}%"></span>`;
  }
  return `    <div class="bento">
      <div class="b-cal" aria-label="Talk days">
        <div class="cal-h"><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b><b>S</b></div>${rows}
        <div class="cal-k"><span><i></i>Talk day</span><span><i class="k-top"></i>Top pick</span><span class="rng">${range}</span></div>
      </div>
      <div class="b-count"><span class="cnum">${talks.length}</span><span class="clab">Upcoming<br>talks</span></div>
      <a class="b-top" href="${esc(tp.url)}" target="_blank" rel="noopener">
        <span class="b-arrow" aria-hidden="true">↗</span>
        <span class="tag">★ ${tp.top ? "Top pick" : "Next up"}</span>
        <div class="tp-d"><span class="num">${p.day}</span><span class="mo">${p.mon.toUpperCase()}<b>${p.dow.toUpperCase()} · ${esc(tp.start || "")}</b></span></div>
        <div class="ttl">${esc(tp.short || tp.title)}</div>
        <div class="tbar"><div class="bars">${bars}</div><div class="tlab"><span>6 AM</span><b>${esc(timeRange(tp))}</b><span>8 PM</span></div></div>
        <span class="tag dark">${esc(tp.host)}</span>
      </a>
    </div>
`;
}

const raw = JSON.parse(readFileSync(DATA, "utf8"));
const data = cleanTalks(raw);
if (!data) { console.error("talks.json is missing 'updated' (YYYY-MM-DD) or a 'talks' list."); process.exit(1); }
writeFileSync(OUT, JSON.stringify(data, null, 1) + "\n");
writeFileSync(PAGE, renderTalksPage(readFileSync(PAGE, "utf8"), data));
console.log(`Built the talks page: ${data.talks.length} upcoming talks, ${data.courses.length} courses, updated ${data.updated}.`);
