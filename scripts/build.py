#!/usr/bin/env python3
"""Build the course from data/lessons.json.

Generates:
  - lessons/<slug>/README.md for every lesson
  - the curriculum table inside README.md (between CURRICULUM markers)
  - the lesson data embedded in docs/index.html (between LESSONS markers)

Run from the repo root:  python3 scripts/build.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "data" / "lessons.json").read_text(encoding="utf-8"))
LESSONS = DATA["lessons"]
TRACKS = DATA["tracks"]


def num(i):
    return f"{i:02d}"


def track_names(codes):
    return ", ".join(TRACKS[c] for c in codes)


def resource_table(rows):
    out = ["| Resource | Type | Level | What you get |", "|---|---|---|---|"]
    for title, url, typ, level, note in rows:
        out.append(f"| [{title}]({url}) | {typ} | {level} | {note} |")
    return "\n".join(out)


def nav(i):
    parts = []
    if i > 0:
        p = LESSONS[i - 1]
        parts.append(f"[← Lesson {num(i-1)}: {p['title']}](../{p['slug']}/README.md)")
    parts.append("[Course home](../../README.md)")
    if i < len(LESSONS) - 1:
        n = LESSONS[i + 1]
        parts.append(f"[Lesson {num(i+1)}: {n['title']} →](../{n['slug']}/README.md)")
    return " · ".join(parts)


def lesson_md(i, l):
    goals = "\n".join(f"- {g}" for g in l["goals"])
    tries = "\n".join(f"{k}. {t}" for k, t in enumerate(l["try"], 1))
    checks = "\n".join(f"{k}. {q}" for k, q in enumerate(l["check"], 1))
    return f"""# Lesson {num(i)}: {l['title']}

{nav(i)}

> {l['summary']}.

**Tracks:** {track_names(l['tracks'])} · **Sources:** official OpenAI and Anthropic material, verified {DATA['verified']}

## In this lesson

{goals}

## Why it matters

{l['why']}

## Learn from OpenAI

{resource_table(l['openai'])}

## Learn from Anthropic

{resource_table(l['anthropic'])}

{compare_md(l)}## Try it

{tries}

## Check yourself

{checks}
{stage_md(i)}
---

{nav(i)}

*Track your progress in the [interactive learning path]({DATA['site']}).*
"""


def compare_md(l):
    if not l.get("compare"):
        return ""
    return f"""## Which approach should you explore?

{l['compare']}

*These are practical starting recommendations based on the resources in this lesson. Neither provider has been benchmarked here, and studying both is often worthwhile.*

"""


def stage_md(i):
    for k, s in enumerate(DATA.get("stages", []), 1):
        if s["last"] == i:
            items = "\n".join(f"- [ ] {c}" for c in s["checklist"])
            return f"""
## Stage {k} project

This lesson completes **Stage {k}: {s['name']}**. Before you move on, finish one piece of work.

**What to produce:** {s['project']}.

**Example scenario:** {s['scenario']}.

**You are ready for the next stage when:**

{items}
"""
    return ""


def projects_md():
    out = ["| Stage | What you finish with | Example scenario |", "|---|---|---|"]
    for k, s in enumerate(DATA.get("stages", []), 1):
        last = LESSONS[s["last"]]
        out.append(f"| [**{k}. {s['name']}**](./lessons/{last['slug']}/README.md#stage-{k}-project) | {s['project']} | {s['scenario']} |")
    return "\n".join(out)


def curriculum_md():
    out = ["| # | Lesson | What you'll learn | Tracks |", "|---|---|---|---|"]
    for i, l in enumerate(LESSONS):
        tracks = " ".join(f"`{TRACKS[c]}`" for c in l["tracks"])
        out.append(f"| {num(i)} | [{l['title']}](./lessons/{l['slug']}/README.md) | {l['summary']} | {tracks} |")
    return "\n".join(out)


def tracks_md():
    rows = ["| Track | Lessons |", "|---|---|"]
    for code, name in TRACKS.items():
        ids = [num(i) for i, l in enumerate(LESSONS) if code in l["tracks"]]
        rows.append(f"| **{name}** | {', '.join(ids)} |")
    return "\n".join(rows)


def replace_between(text, start, end, body):
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pattern.search(text):
        raise SystemExit(f"Markers {start} / {end} not found")
    return pattern.sub(lambda _: f"{start}\n{body}\n{end}", text)


def main():
    for i, l in enumerate(LESSONS):
        d = ROOT / "lessons" / l["slug"]
        d.mkdir(parents=True, exist_ok=True)
        (d / "README.md").write_text(lesson_md(i, l), encoding="utf-8")

    readme = ROOT / "README.md"
    text = readme.read_text(encoding="utf-8")
    text = replace_between(text, "<!-- CURRICULUM:START -->", "<!-- CURRICULUM:END -->", curriculum_md())
    readme.write_text(text, encoding="utf-8")

    site = ROOT / "docs" / "index.html"
    html = site.read_text(encoding="utf-8")
    payload = json.dumps({"repo": DATA["repo"], "tracks": TRACKS, "lessons": LESSONS, "stages": DATA.get("stages", [])}, ensure_ascii=False)
    html = replace_between(html, "/*LESSONS:START*/", "/*LESSONS:END*/", f"const COURSE={payload};")
    site.write_text(html, encoding="utf-8")

    print(f"Built {len(LESSONS)} lessons, README curriculum and site data.")


if __name__ == "__main__":
    main()
