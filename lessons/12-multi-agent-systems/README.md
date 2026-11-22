# Lesson 12: Multi-Agent Systems and Orchestration

[← Lesson 11: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK](../11-agent-frameworks/README.md) · [Course home](../../README.md) · [Lesson 13: Memory and Context Engineering →](../13-memory-and-context-engineering/README.md)

> Handoffs, subagents and when splitting work across agents helps.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Compare handoffs, manager agents and subagents
- Explain when parallel agents speed things up and when they waste tokens
- Design a two-agent system with a clear division of work

## Why it matters

Splitting work across agents can improve quality and speed, and it can also multiply cost and confusion. Anthropic's research system and OpenAI's orchestration recipes show both sides. The goal is to know which problems actually benefit.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Orchestration and handoffs recipes](https://developers.openai.com/resources/cookbooks) | Cookbook | Intermediate | Agent orchestration, handoffs, multi-tool |
| [Deep Research API with the Agents SDK](https://learn.chatgpt.com/cookbook/examples/deep_research_api/introduction_to_deep_research_api_agents) | Cookbook | Advanced | Agentic research workflows |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Article | Intermediate | Lessons from Claude's Research feature |
| [Introduction to Subagents](https://anthropic.skilljar.com/) | Course | Intermediate | Use subagents to manage context and delegate |

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

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/pathway/).*
