# Contributing to AI Learning Hub

Thank you for helping more people learn AI from trustworthy sources. This guide explains what to contribute and how.

## The one rule

Every resource must come from an **official OpenAI or Anthropic source**. That includes their academies, developer docs, cookbooks, company and engineering blogs, research pages, and repositories under the `openai` or `anthropics` GitHub organizations. Third-party tutorials, videos and mirrors are not accepted, however good they are.

## Good contributions

- **Fix a broken or moved link.** Open an issue with the "Broken link" template, or send a pull request.
- **Add a newer official resource.** Explain which lesson it belongs in and what a learner gets from it.
- **Improve an exercise or question.** Exercises should take under an hour and work with free or low-cost accounts.
- **Report an outdated lesson.** Platforms change quickly; tell us what changed and link the official announcement.

## How to edit lessons

All lesson content lives in [`data/lessons.json`](./data/lessons.json). Do not edit the generated lesson `README.md` files directly, because the next build overwrites them.

1. Edit `data/lessons.json`. Each resource is a list of five values: `[title, url, type, level, what you get]`.
2. Run `python3 scripts/build.py` to regenerate the lesson pages, the README tables and the site data.
3. Commit both the JSON change and the regenerated files.
4. Open a pull request that names the lesson and links the official source.

## Style

- Write in plain, specific language. Avoid buzzwords and hype.
- Keep "What you get" notes short, roughly under ten words.
- Use the levels `Beginner`, `Intermediate` or `Advanced`.
- Use the types `Course`, `Docs`, `Guide`, `Article`, `Research`, `Policy`, `Cookbook`, `Repo`, `Track`, `Hub` or `Live/Video`.

## License for contributions

This course is copyrighted and all rights are reserved. By opening an issue or pull request, you grant the author a perpetual, worldwide, royalty-free license to use, modify and publish your contribution as part of the course, as described in [LICENSE](./LICENSE).

## Code of conduct

Be kind, assume good intent, and keep discussion focused on helping learners.
