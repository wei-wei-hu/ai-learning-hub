<a id="top"></a>

<p align="center">
  <a href="https://wei-wei-hu.github.io/ai-learning-path/"><img src="./docs/cover.png" alt="AI Learning Path: Learn AI and AI Agents with OpenAI and Anthropic. 20 lessons, 4 tracks, official sources. Created by Weiwei Hu." width="100%"></a>
</p>

<h1 align="center">AI Learning Path</h1>

<p align="center"><strong>20 free, structured lessons · Official learning resources · Hands-on practice · Four role-based tracks</strong></p>

<p align="center">
  <a href="./LICENSE"><img alt="License: All rights reserved" src="https://img.shields.io/badge/license-all%20rights%20reserved-a99cf2"></a>
  <a href="#curriculum"><img alt="Lessons: 20" src="https://img.shields.io/badge/lessons-20-8fdcc4"></a>
  <a href="#four-tracks"><img alt="Tracks: 4" src="https://img.shields.io/badge/tracks-4-f7b98a"></a>
  <a href="#how-this-course-is-built"><img alt="Sources: official only" src="https://img.shields.io/badge/sources-official%20only-f2a9cf"></a>
  <a href="https://wei-wei-hu.github.io/ai-learning-path/"><img alt="Interactive site: live" src="https://img.shields.io/badge/site-live-8fb6ec"></a>
  <a href="./CONTRIBUTING.md"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen"></a>
</p>

<p align="center">
  <a href="https://wei-wei-hu.github.io/ai-learning-path/"><strong>Start the interactive learning path →</strong></a>
</p>

<p align="center">Created by <a href="https://weiweihu.carrd.co/">Weiwei Hu</a> · <a href="https://weiweihu.carrd.co/">Website</a> · <a href="https://www.linkedin.com/in/weiweihu/">LinkedIn</a></p>

<p align="center"><a href="#who-this-is-for">Who it's for</a> · <a href="#your-learning-journey">Learning journey</a> · <a href="#four-tracks">Four tracks</a> · <a href="#curriculum">Curriculum</a> · <a href="#about-the-author">About</a> · <a href="#license">License</a></p>

---

## Who this is for

This course is designed for curious beginners, software engineers, technical architects, and leaders responsible for adopting AI. Start with the **Leadership** track if you are focused on business decisions and governance; choose **Engineering** or **Architecture** for implementation depth. The **Research** track highlights model behavior and risk.

AI is moving quickly. The best learning resources are often scattered across documentation, research papers, tutorials, engineering blogs, and open-source repositories. Knowing where to start—and what to study next—can be harder than finding another tutorial.

**AI Learning Path** brings together selected, publicly available resources from **OpenAI and Anthropic** into a guided, 20-lesson curriculum. Learn how language models work, use APIs and tools, create agents, evaluate their performance, and deploy them responsibly.

Each lesson gives you official resources from both providers, a practical exercise, and questions to test what you learned. You can follow the full sequence or choose the lessons most relevant to your role.

**What makes this useful:** one learning sequence, two leading AI providers, and practical work you can apply to real projects.

## Your learning journey

| Stage | Lessons | Focus | What you can do afterward |
|---|---|---|---|
| [**1. Understand AI**](./lessons/00-course-setup/README.md) | [Course Setup](./lessons/00-course-setup/README.md) · [AI Foundations](./lessons/01-ai-foundations/README.md) · [Prompting and Context](./lessons/02-prompting-and-context/README.md) | Foundations, prompting, context | Explain model strengths and limitations; write more effective instructions |
| [**2. Connect AI to real work**](./lessons/03-model-apis/README.md) | [Model APIs](./lessons/03-model-apis/README.md) · [Tool Use](./lessons/04-tool-use/README.md) · [Structured Outputs](./lessons/05-structured-outputs/README.md) · [Retrieval and RAG](./lessons/06-retrieval-and-rag/README.md) · [Multimodal](./lessons/07-multimodal/README.md) | APIs, tools, structured outputs, retrieval, multimodal | Prototype applications that use external tools and information |
| [**3. Create agents**](./lessons/08-what-is-an-agent/README.md) | [What Makes an Agent](./lessons/08-what-is-an-agent/README.md) · [Agent Frameworks](./lessons/09-agent-frameworks/README.md) · [Multi-Agent Systems](./lessons/10-multi-agent-systems/README.md) · [Memory and Context](./lessons/11-memory-and-context-engineering/README.md) · [MCP and Integrations](./lessons/12-mcp-and-integrations/README.md) · [Skills and Plugins](./lessons/13-skills-and-plugins/README.md) | Agent design, SDKs, multi-agent coordination, memory, MCP, skills | Design and prototype agent workflows with appropriate integrations |
| [**4. Operate advanced agents**](./lessons/14-coding-agents/README.md) | [Coding Agents](./lessons/14-coding-agents/README.md) · [Computer Use](./lessons/15-computer-use/README.md) · [Long-Running Agents](./lessons/16-long-running-and-managed-agents/README.md) | Coding agents, computer use, long-running tasks | Explore supervised automation and verify agent outputs |
| [**5. Evaluate and lead**](./lessons/17-evaluating-ai-systems/README.md) | [Evaluating AI](./lessons/17-evaluating-ai-systems/README.md) · [Safety and Governance](./lessons/18-safety-security-and-governance/README.md) · [Leading AI Adoption](./lessons/19-leading-ai-adoption/README.md) | Evaluation, safety, governance, adoption | Define quality checks, operational safeguards, and an adoption plan |

These stages describe learning goals. Some exercises may require programming experience, API access, or paid usage. Every lesson is listed in the [Curriculum](#curriculum), and you can choose a [track](#four-tracks) to focus on your role.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Four tracks

Every lesson is tagged with the tracks it serves, so you can take only what fits your role.

| Track | Who it is for | Start with |
|---|---|---|
| **Leadership** | Leaders who sponsor, govern and scale AI across an organization | [Lesson 01: AI Foundations](./lessons/01-ai-foundations/README.md) |
| **Architecture** | Architects and technical leads designing AI systems, integrations and evals | [Lesson 03: Working with the Model APIs](./lessons/03-model-apis/README.md) |
| **Engineering** | Engineers writing AI and agent code, including coding agents | [Lesson 03: Working with the Model APIs](./lessons/03-model-apis/README.md) |
| **Research** | Anyone who wants to understand how frontier models behave and how they are kept safe | [Lesson 18: Safety, Security and Governance](./lessons/18-safety-security-and-governance/README.md) |

The [Curriculum](#curriculum) shows which tracks each lesson belongs to. The [interactive site](https://wei-wei-hu.github.io/ai-learning-path/) turns each track into a step-by-step path with progress tracking.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Curriculum

<!-- CURRICULUM:START -->
| # | Lesson | What you'll learn | Tracks |
|---|---|---|---|
| 00 | [Course Setup](./lessons/00-course-setup/README.md) | How the course works, the four tracks, and the free accounts you need | `Leadership` `Architecture` `Engineering` `Research` |
| 01 | [AI Foundations](./lessons/01-ai-foundations/README.md) | How language models work, what they do well, and where they fail | `Leadership` `Architecture` `Engineering` `Research` |
| 02 | [Prompting and Context](./lessons/02-prompting-and-context/README.md) | Write instructions models follow reliably, and give them the right context | `Architecture` `Engineering` |
| 03 | [Working with the Model APIs](./lessons/03-model-apis/README.md) | Call models from code with the Responses API and the Messages API | `Architecture` `Engineering` |
| 04 | [Tool Use and Function Calling](./lessons/04-tool-use/README.md) | Let models call your code, search the web and act on real systems | `Architecture` `Engineering` |
| 05 | [Structured Outputs](./lessons/05-structured-outputs/README.md) | Generate schema-constrained JSON and handle validation failures | `Architecture` `Engineering` |
| 06 | [Retrieval and Agentic RAG](./lessons/06-retrieval-and-rag/README.md) | Ground answers in your own documents and data | `Architecture` `Engineering` |
| 07 | [Multimodal: Vision, Audio and Voice](./lessons/07-multimodal/README.md) | Work with images, speech and real-time voice | `Architecture` `Engineering` |
| 08 | [What Makes an Agent](./lessons/08-what-is-an-agent/README.md) | Workflows versus agents, and when an agent is worth building | `Leadership` `Architecture` `Engineering` |
| 09 | [Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK](./lessons/09-agent-frameworks/README.md) | Build your first agent with each provider's official SDK | `Architecture` `Engineering` |
| 10 | [Multi-Agent Systems and Orchestration](./lessons/10-multi-agent-systems/README.md) | Handoffs, subagents and when splitting work across agents helps | `Architecture` `Engineering` |
| 11 | [Memory and Context Engineering](./lessons/11-memory-and-context-engineering/README.md) | Keep agents on track across long tasks and many sessions | `Architecture` `Engineering` |
| 12 | [Model Context Protocol and Integrations](./lessons/12-mcp-and-integrations/README.md) | Connect AI to your tools and data through the open MCP standard | `Architecture` `Engineering` |
| 13 | [Skills and Plugins](./lessons/13-skills-and-plugins/README.md) | Package know-how so any agent can reuse it | `Architecture` `Engineering` |
| 14 | [Coding Agents: Codex and Claude Code](./lessons/14-coding-agents/README.md) | Delegate real software work and verify the results | `Leadership` `Architecture` `Engineering` |
| 15 | [Computer Use and Browser Agents](./lessons/15-computer-use/README.md) | Agents that operate screens, browsers and apps | `Architecture` `Engineering` `Research` |
| 16 | [Long-Running and Managed Agents](./lessons/16-long-running-and-managed-agents/README.md) | Run agents for hours in hosted harnesses and sandboxes | `Architecture` `Engineering` |
| 17 | [Evaluating AI Systems](./lessons/17-evaluating-ai-systems/README.md) | Prove quality with evals before and after you ship | `Leadership` `Architecture` `Engineering` |
| 18 | [Safety, Security and Governance](./lessons/18-safety-security-and-governance/README.md) | Guardrails, oversight and what frontier research teaches about risk | `Leadership` `Research` |
| 19 | [Leading AI Adoption](./lessons/19-leading-ai-adoption/README.md) | Strategy, roadmaps and helping a whole organization use AI well | `Leadership` |
<!-- CURRICULUM:END -->

<p align="right"><a href="#top">↑ Back to top</a></p>

## How this course is built

- **Official sources only.** Every link goes to OpenAI or Anthropic: their academies, docs, cookbooks, blogs, research pages or GitHub organizations.
- **Maintained.** A GitHub Action checks every link each week and opens an issue when one breaks. All resources were selected and verified in November 2026.

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

Created by **Weiwei Hu** · [Website](https://weiweihu.carrd.co/) · [LinkedIn](https://www.linkedin.com/in/weiweihu/) · [GitHub](https://github.com/wei-wei-hu)

Strategy and transformation leader focused on applying AI to business decisions, everyday workflows, and measurable outcomes.

If you find the learning path useful, **star the repository** to help others discover it. You can also share an improvement through [CONTRIBUTING.md](./CONTRIBUTING.md) or [connect on LinkedIn](https://www.linkedin.com/in/weiweihu/).

## Disclaimer

This is an independent learning guide. It is not affiliated with, endorsed by, or sponsored by OpenAI or Anthropic. All product names, logos and brands belong to their respective owners, and all linked material remains the property of its publishers.

## License

**Copyright © 2026 Weiwei Hu. All rights reserved.**

You may read and use this course for your own personal, non-commercial learning, share links to it, and quote short excerpts with credit to "Weiwei Hu, AI Learning Path" and a link to this repository.

Without prior written permission, you may **not** copy, republish or redistribute this course; modify, translate or create derivative courses or materials from it; use it for any commercial purpose, including paid training or consulting; remove the author's attribution; or use it to train or evaluate AI models.

Contributions are welcome under the terms in [LICENSE](./LICENSE). Linked OpenAI and Anthropic material belongs to its owners and is not covered by this license. For permission requests, contact [Weiwei Hu on LinkedIn](https://www.linkedin.com/in/weiweihu/).