# Lesson 12: Multi-Agent Systems and Orchestration

[← Lesson 11: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK](../11-agent-frameworks/README.md) · [Course home](../../README.md) · [Lesson 13: Memory and Context Engineering →](../13-memory-and-context-engineering/README.md)

> Handoffs, subagents and when splitting work across agents helps.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Compare handoffs, manager agents and subagents
- Explain when parallel agents speed things up and when they waste tokens
- Design a two-agent system with a clear division of work

## Why it matters

Splitting work across agents can improve quality and speed, and it can also multiply cost and confusion. Anthropic's research system shows the gains, and its guide on folding subagents back into one loop shows the costs. The goal is to know which problems actually benefit.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Design and Build Agentic Systems](https://academy.openai.com/pages/courses) | Course | Intermediate | Defined roles, controlled tools, safe handoffs · 110 min |
| [Deep Research API with the Agents SDK](https://developers.openai.com/cookbook/examples/deep_research_api/introduction_to_deep_research_api_agents) | Cookbook | Advanced | Agentic research workflows (archived recipe) |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Article | Intermediate | Lessons from Claude's Research feature |
| [Introduction to Subagents](https://anthropic.skilljar.com/) | Course | Intermediate | Use subagents to manage context and delegate |
| [When to fold subagents into your main agent loop](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop) | Article | Intermediate | When one agent loop beats many subagents |

## Try it

1. Design a research assistant with one lead agent and two specialist agents.
2. Write the brief the lead agent sends to each specialist.
3. Run it on one question and compare the cost and quality with a single agent.

## Check yourself

1. What kinds of tasks gain the most from parallel agents?
2. Why does a clear brief between agents matter so much?
3. How would you decide a multi-agent design is not worth its cost?

---

[← Lesson 11: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK](../11-agent-frameworks/README.md) · [Course home](../../README.md) · [Lesson 13: Memory and Context Engineering →](../13-memory-and-context-engineering/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
