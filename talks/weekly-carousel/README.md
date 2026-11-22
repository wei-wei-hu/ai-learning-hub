# Weekly Upcoming AI Talks carousel

Renders a 4:5 (1080x1350) carousel of the coming week's talks, in the Upcoming AI Talks page style (AI Learning Hub).

    node render-weekly.js <talks.json> <output folder> [YYYY-MM-DD]

- Input: the same talks.json the site reads (fields: date, start, end, format, host, top, tags, title, short, url, desc, sort).
- Date: the Monday of the week to post. Default is the next Monday in Pacific time, so a Sunday run picks the coming week.
- Shows talks from that Monday on, sorted like the site, up to 6, two per slide (cover with calendar, talk tiles with time-of-day bars, recap with one light sign-up line).
- Output folder <Monday>/: slide-1.png … slide-N.png, carousel.pdf (upload to LinkedIn as a document), caption.txt (full list), caption-short.txt (short, warm: use this one), slides.html.
- Exits with code 2 and renders nothing if there are no upcoming talks.
- Needs Playwright with Chromium (preinstalled in the cloud container; run with NODE_PATH=$(npm root -g)). Fonts load from Google Fonts; a warning prints if they fail.
- Brand rule (2026-11-22): AI Learning Hub by Weiwei Hu. No Signals Lab name or logo.

## Silent video (second step)

    python3 make-video.py <output folder>/<Monday>

- Uses the rendered slide PNGs. No voice and no audio track (user's choice, 2026-11-14).
- Timing: cover 3.5s, each talk slide 5s, recap 4.5s, call-to-action 4.5s, with 0.5s crossfades and a slow push-in.
- Writes video-9x16.mp4 (Reels, Shorts, TikTok) and video-1x1.mp4 (LinkedIn, feed). Needs ffmpeg, pillow and numpy.
- The last slide is the call to action: a simple "Follow Weiwei Hu" slide (LinkedIn, Newsletter, GitHub pills), with one light line: Free weekly list at wei-wei-hu.github.io/ai-learning-hub/talks.

## Source checklist: check every one before each weekly list

The user found missed events once (Microsoft Ignite and free courses, Nov 2026). Before drafting, open each source below and add anything free and online in the coming 2–3 weeks. English only, US-friendly, all times in Pacific.

Big conferences, which usually stream keynotes free. Check each one's dates every week:
- Microsoft Ignite (Nov) and Microsoft Build (May): ignite.microsoft.com, build.microsoft.com
- AWS re:Invent (late Nov to early Dec): aws.amazon.com/events/reinvent/livestream/ (lists every streamed keynote with PT times)
- Google Cloud Next (spring) and Google I/O (May): cloud.withgoogle.com/next, io.google
- NVIDIA GTC (March, plus GTC DC and Paris): nvidia.com/gtc
- Apple WWDC (June), Meta Connect (Sept), Salesforce Dreamforce (Sept/Oct)
- OpenAI DevDay (fall), Anthropic events (anthropic.com/events)

Webinars and live sessions:
- Anthropic: claude.com/resources/webinars and anthropic.com/events
- OpenAI Academy: academy.openai.com/public/events
- Microsoft: Microsoft Reactor events and Microsoft Learn live shows
- AWS: aws.amazon.com/events (online events and webinars)
- Google: Google Cloud events and Google for Developers events
- NVIDIA: nvidia.com/en-us/events and NVIDIA Developer webinars
- Hugging Face: huggingface.co/events

Free self-paced courses, which go in the "courses" list in talks.json and show on the "Learn anytime" slide:
- Anthropic Academy: anthropic.skilljar.com (for example, AI Fluency: Framework & Foundations)
- Hugging Face Learn: huggingface.co/learn (for example, AI Agents Course)
- NVIDIA Deep Learning Institute: nvidia.com/en-us/training (self-paced courses, many free)
- Google: Google Skills / Cloud Skills Boost, and Microsoft Learn, AWS Skill Builder, OpenAI Academy

Rules: verify each date and time on the official page, and skip anything you can't confirm. Mark the 1–2 biggest items as top picks. Data fields: talks[] (date, start, end, format, host, top, tags, title, short, url, desc, sort) and courses[] (host, title, url, desc, meta).
