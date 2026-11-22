# Upcoming AI Talks

Free AI talks and webinars, picked and checked every week. Part of AI Learning Hub by Weiwei Hu.

**Page:** https://wei-wei-hu.github.io/ai-learning-hub/ai-talks/

| Feature | How it works |
|---|---|
| Talks page | `docs/ai-talks/index.html`, served by GitHub Pages from the `docs` folder |
| Weekly list | `docs/ai-talks/talks.json`. Run `node ai-talks/build.mjs` to bake it into the page and write `docs/ai-talks/data.json` |
| Free signup | The Sign up form posts to the Google Apps Script in `ai-talks/apps-script.gs`, which adds a row to the subscriber sheet |
| Paid plan ($8/mo or $80/yr) | Buttons open Stripe Payment Links. Every hour the Apps Script asks Stripe who has paid or cancelled and updates the sheet |
| Weekly emails | The Apps Script emails the free list Mondays and the paid list Fridays, about 6 AM Pacific, from `data.json` |
| Unsubscribe | Each email has a signed link back to the Apps Script |
| LinkedIn carousel | `ai-talks/weekly-carousel/` renders slides, a PDF, captions and videos from `talks.json` |

Nothing private lives in this repo. The Stripe key, your email and the signing password are kept in the Apps Script's Script Properties.

## One-time setup (about 20 minutes)

### 1. GitHub
1. Rename the repo to `ai-learning-hub` in **Settings > General > Repository name**, then merge the pull request.
2. In **Settings > Pages**, check that the site builds from the `main` branch, `/docs` folder.

### 2. Google Apps Script (signups and emails)
1. Open your existing **Upcoming AI Talks** Apps Script project (the one tied to the subscriber sheet). Your current subscribers stay where they are.
2. Replace all the code with `ai-talks/apps-script.gs` and save.
3. Pick **setup** in the toolbar and press **Run**. It adds a signing password and your email (as a complimentary paid reader) to Script Properties.
4. Click **Deploy > Manage deployments**, press the pencil, choose **New version**, and deploy. The `/exec` URL stays the same. (No deployment yet? Use **Deploy > New deployment > Web app**, Execute as **Me**, Who has access **Anyone**.)

### 3. Stripe (payments)
1. **Developers > API keys > Create restricted key.** Give it **Read** on *Subscriptions* and *Customers*, nothing else. Copy it.
2. In Apps Script, open **Project Settings > Script Properties** and add `STRIPE_KEY` with that key. If your Stripe account sells other things, also add `STRIPE_PRICE_IDS` with the two talk price IDs, comma separated.
3. Run **syncStripe** once. The **Issue** tab shows "Last Stripe check" when it works.
4. Run **setupTriggers** once. This turns on the Monday and Friday emails and the hourly Stripe check.
5. In **Payment Links**, edit both links. Under "After payment", set the redirect to `https://wei-wei-hu.github.io/ai-learning-hub/ai-talks/?paid=1`.
6. In **Developers > Webhooks**, delete the old `thesignalslab.co` endpoint. It is no longer needed.
7. Optional: in **Settings > Business > Public details**, change the public business name from Signals Lab to the name you want on receipts and card statements.

### 4. Connect the page
At the bottom of `docs/ai-talks/index.html`, fill in the three settings and commit:

```js
var TALKS = {
  scriptUrl: "https://script.google.com/macros/s/.../exec",
  monthly: "https://buy.stripe.com/...",
  yearly: "https://buy.stripe.com/..."
};
```

These are public links, so they are safe in a public repo.

### 5. Test
1. Sign up on the talks page with your own email. A **Free** row appears in the sheet.
2. Run **sendTestToMe** in Apps Script to preview both emails.
3. Use Stripe test mode to check a payment, then switch back to live links.

## Every week
1. Update `docs/ai-talks/talks.json` (fields: `date` YYYY-MM-DD, `start`, `end` like `8:00 AM`, `format`, `host`, `top`, `tags`, `title`, `short`, `url`, `desc`, `sort`, plus a top-level `updated` date and `courses` list).
2. Run `node ai-talks/build.mjs` and commit. Past talks drop off by themselves.
3. Optional carousel: `node ai-talks/weekly-carousel/render-weekly.js docs/ai-talks/talks.json <output folder>` (needs Playwright), then `python3 ai-talks/weekly-carousel/make-video.py <output folder>/<Monday>`.

Gmail sends about 100 emails a day from a regular account. Once the list grows past that, move sending to an email service.
