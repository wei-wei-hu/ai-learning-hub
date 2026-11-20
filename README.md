<div align="center">

# AI Learning Path

### Learn AI and agents from Experts: OpenAI and Anthropic

[![License: All rights reserved](https://img.shields.io/badge/license-all%20rights%20reserved-a99cf2)](./LICENSE)
[![Lessons](https://img.shields.io/badge/lessons-20-8fdcc4)](#curriculum)
[![Tracks](https://img.shields.io/badge/tracks-4-f7b98a)](#four-tracks)
[![Sources](https://img.shields.io/badge/sources-official%20only-f2a9cf)](#how-this-course-is-built)
[![Interactive site](https://img.shields.io/badge/site-live-8fb6ec)](https://wei-wei-hu.github.io/ai-learning-path/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](./CONTRIBUTING.md)

**[Start the interactive learning path →](https://wei-wei-hu.github.io/ai-learning-path/)**

</div>

---

OpenAI and Anthropic publish an enormous amount of free learning material: academy courses, developer docs, cookbooks, engineering blogs, research papers and open-source repos. It is spread across more than a dozen sites, and most people only ever find a few pieces of it.

This course gathers that material into **20 lessons** that build on each other, from how language models work to running long-running agents safely. Each lesson pairs the best official resources from **both** providers, then adds a hands-on exercise and questions to check your understanding. You learn the ideas once and see how two leading labs put them into practice.

## Start here

| If you want to… | Go to |
|---|---|
| Follow a guided path with progress tracking | **[Interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/)** |
| Read the course lesson by lesson | **[Lesson 00: Course Setup](./lessons/00-course-setup/README.md)** |
| Jump to a topic | The [curriculum](#curriculum) below |

## Four tracks

Every lesson is tagged with the tracks it serves, so you can take only what fits your role.

| Track | Who it is for |
|---|---|
| **Leadership** | Leaders who sponsor, govern and scale AI across an organization |
| **Architecture** | Architects and technical leads designing AI systems, integrations and evals |
| **Engineering** | Engineers writing AI and agent code, including coding agents |
| **Research & Safety** | Anyone who wants to understand how frontier models behave and how they are kept safe |

<!-- TRACKS:START -->
| Track | Lessons |
|---|---|
| **Leadership** | 00, 01, 08, 14, 17, 18, 19 |
| **Architecture** | 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17 |
| **Engineering** | 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17 |
| **Research & Safety** | 00, 01, 15, 18 |
<!-- TRACKS:END -->

## Curriculum

<!-- CURRICULUM:START -->
| # | Lesson | What you'll learn | Tracks |
|---|---|---|---|
| 00 | [Course Setup](./lessons/00-course-setup/README.md) | How the course works, the four tracks, and the free accounts you need | `Leadership` `Architecture` `Engineering` `Research & Safety` |
| 01 | [AI Foundations](./lessons/01-ai-foundations/README.md) | How language models work, what they do well, and where they fail | `Leadership` `Architecture` `Engineering` `Research & Safety` |
| 02 | [Prompting and Context](./lessons/02-prompting-and-context/README.md) | Write instructions models follow reliably, and give them the right context | `Architecture` `Engineering` |
| 03 | [Working with the Model APIs](./lessons/03-model-apis/README.md) | Call models from code with the Responses API and the Messages API | `Architecture` `Engineering` |
| 04 | [Tool Use and Function Calling](./lessons/04-tool-use/README.md) | Let models call your code, search the web and act on real systems | `Architecture` `Engineering` |
| 05 | [Structured Outputs](./lessons/05-structured-outputs/README.md) | Get valid JSON that matches your schema, every time | `Architecture` `Engineering` |
| 06 | [Retrieval and Agentic RAG](./lessons/06-retrieval-and-rag/README.md) | Ground answers in your own documents and data | `Architecture` `Engineering` |
| 07 | [Multimodal: Vision, Audio and Voice](./lessons/07-multimodal/README.md) | Work with images, speech and real-time voice | `Architecture` `Engineering` |
| 08 | [What Makes an Agent](./lessons/08-what-is-an-agent/README.md) | Workflows versus agents, and when an agent is worth building | `Leadership` `Architecture` `Engineering` |
| 09 | [Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK](./lessons/09-agent-frameworks/README.md) | Build your first agent with each provider's official SDK | `Architecture` `Engineering` |
| 10 | [Multi-Agent Systems and Orchestration](./lessons/10-multi-agent-systems/README.md) | Handoffs, subagents and when splitting work across agents helps | `Architecture` `Engineering` |
| 11 | [Memory and Context Engineering](./lessons/11-memory-and-context-engineering/README.md) | Keep agents on track across long tasks and many sessions | `Architecture` `Engineering` |
| 12 | [Model Context Protocol and Integrations](./lessons/12-mcp-and-integrations/README.md) | Connect AI to your tools and data through the open MCP standard | `Architecture` `Engineering` |
| 13 | [Skills and Plugins](./lessons/13-skills-and-plugins/README.md) | Package know-how so any agent can reuse it | `Architecture` `Engineering` |
| 14 | [Coding Agents: Codex and Claude Code](./lessons/14-coding-agents/README.md) | Delegate real software work and verify the results | `Leadership` `Architecture` `Engineering` |
| 15 | [Computer Use and Browser Agents](./lessons/15-computer-use/README.md) | Agents that operate screens, browsers and apps | `Architecture` `Engineering` `Research & Safety` |
| 16 | [Long-Running and Managed Agents](./lessons/16-long-running-and-managed-agents/README.md) | Run agents for hours in hosted harnesses and sandboxes | `Architecture` `Engineering` |
| 17 | [Evaluating AI Systems](./lessons/17-evaluating-ai-systems/README.md) | Prove quality with evals before and after you ship | `Leadership` `Architecture` `Engineering` |
| 18 | [Safety, Security and Governance](./lessons/18-safety-security-and-governance/README.md) | Guardrails, oversight and what frontier research teaches about risk | `Leadership` `Research & Safety` |
| 19 | [Leading AI Adoption](./lessons/19-leading-ai-adoption/README.md) | Strategy, roadmaps and helping a whole organization use AI well | `Leadership` |
<!-- CURRICULUM:END -->

## How each lesson works

Every lesson follows the same structure, so you always know what comes next.

1. **In this lesson:** three concrete learning goals
2. **Why it matters:** the practical reason to learn it
3. **Learn from OpenAI** and **Learn from Anthropic:** official courses, docs, articles and repos, each labeled by type and level
4. **Try it:** a short exercise you can finish in under an hour
5. **Check yourself:** three questions to test your understanding

## How this course is built

- **Official sources only.** Every link goes to OpenAI or Anthropic: their academies, docs, cookbooks, blogs, research pages or GitHub organizations.
- **Two providers, one order.** The lessons are organized by topic, so you see how each provider handles the same idea.
- **Kept current.** A weekly GitHub Action checks every link. Platform changes are reviewed and lessons updated; the last full review was November 2026.
- **One source of truth.** All lesson content lives in [`data/lessons.json`](./data/lessons.json). A small script builds the lesson pages, this curriculum table and the interactive site from it.

## Run it locally

```bash
git clone https://github.com/wei-wei-hu/ai-learning-path.git
cd ai-learning-path
python3 scripts/build.py      # rebuild lessons, README tables and site data
open docs/index.html          # or serve the docs/ folder with any static server
```

## Contributing

Found a broken link, a newer official resource, or a better exercise? Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first; the main rule is that every resource must come from an official OpenAI or Anthropic source. By contributing, you agree to the contribution terms in the [LICENSE](./LICENSE).

## About the author

Created by **Weiwei Hu** · [LinkedIn](https://www.linkedin.com/in/weiweihu/) · [GitHub](https://github.com/wei-wei-hu)

Strategy & Transformation Leader, turning AI into better decisions, simplified workflows and measurable business value.

Also by the author: **[Everyday AI Playbook](https://wei-wei-hu.github.io/everyday-ai-playbook/)**, a free collection of practical AI applications with prompts, examples and next steps.

If this course helped you, please ⭐ the repo so more people can find it, and [connect on LinkedIn](https://www.linkedin.com/in/weiweihu/) to follow new lessons.

## Disclaimer

This is an independent learning guide. It is not affiliated with, endorsed by, or sponsored by OpenAI or Anthropic. All product names, logos and brands belong to their respective owners, and all linked material remains the property of its publishers.

## License

**Copyright © 2026 Weiwei Hu. All rights reserved.**

You may read and use this course for your own personal, non-commercial learning, share links to it, and quote short excerpts with credit to "Weiwei Hu, AI Learning Path" and a link to this repository.

Without prior written permission, you may **not** copy, republish or redistribute this course; modify, translate or create derivative courses or materials from it; use it for any commercial purpose, including paid training or consulting; remove the author's attribution; or use it to train or evaluate AI models.

Contributions are welcome under the terms in [LICENSE](./LICENSE). Linked OpenAI and Anthropic material belongs to its owners and is not covered by this license. For permission requests, contact [Weiwei Hu on LinkedIn](https://www.linkedin.com/in/weiweihu/).
