# Lesson 15: Skills and Plugins

[← Lesson 14: Model Context Protocol and Integrations](../14-mcp-and-integrations/README.md) · [Course home](../../README.md) · [Lesson 16: Coding Agents: Codex and Claude Code →](../16-coding-agents/README.md)

> Package know-how so any agent can reuse it.

**Tracks:** AI at Work, Management, Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Write a SKILL.md with a clear description and steps
- Explain how skills load only when needed
- Bundle skills, tools and settings into a plugin

## Why it matters

Skills capture how your team does a job, so an agent can repeat it consistently. Both Codex and Claude now use the same SKILL.md folder format. Writing good skills is a skill that non-engineers can learn too.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Agent Skills in Codex](https://developers.openai.com/codex/skills) | Docs | Intermediate | SKILL.md folders that load only when needed |
| [Package your plugin](https://developers.openai.com/plugins/build/plugins) | Docs | Intermediate | Bundle skills and MCP servers in one plugin |
| [openai/skills](https://github.com/openai/skills) | Repo | Beginner | Official skills catalog |
| [openai/plugins](https://github.com/openai/plugins) | Repo | Intermediate | Official plugins |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Introduction to Agent Skills](https://anthropic.skilljar.com/) | Course | Intermediate | Build, share and troubleshoot Skills |
| [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | Article | Intermediate | How Skills work and how to write them |
| [anthropics/skills](https://github.com/anthropics/skills) | Repo | Beginner | Official example skills |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Repo | Intermediate | Anthropic-managed plugin directory |

## Try it

1. Pick one report or review you produce repeatedly.
2. Write a SKILL.md that describes when to use it and the exact steps.
3. Install it in Codex or Claude Code and run it on a fresh example.

## Check yourself

1. Why does the skill description matter more than its length?
2. What belongs in a skill versus a one-off prompt?
3. How would you share and version skills across a team?

## Stage 3 project

This lesson completes **Stage 3: Build agents**. Before you move on, finish one piece of work.

**What to produce:** A working agent that uses at least one tool integration through MCP and one reusable skill.

**Example scenario:** A customer support agent: look up an order, draft a reply and hand off to a person when it is unsure.

**You are ready for the next stage when:**

- [ ] Your agent completes a multi-step task without you guiding each step
- [ ] It connects to at least one real tool or data source
- [ ] You can explain what it remembers between steps and why

---

[← Lesson 14: Model Context Protocol and Integrations](../14-mcp-and-integrations/README.md) · [Course home](../../README.md) · [Lesson 16: Coding Agents: Codex and Claude Code →](../16-coding-agents/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/pathway/).*
