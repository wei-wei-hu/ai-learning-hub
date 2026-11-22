# Lesson 13: Memory and Context Engineering

[← Lesson 12: Multi-Agent Systems and Orchestration](../12-multi-agent-systems/README.md) · [Course home](../../README.md) · [Lesson 14: Model Context Protocol and Integrations →](../14-mcp-and-integrations/README.md)

> Keep agents on track across long tasks and many sessions.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Explain why context windows fill up and what happens when they do
- Use compaction, memory files and conversation state
- Decide what an agent should remember and what it should forget

## Why it matters

Long tasks fail when agents lose track of what they already did. Both providers now treat context as a resource to manage deliberately. Good memory design is what separates a demo from an agent that works for hours.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) | Docs | Intermediate | Carry context across turns |
| [Building reliable agents with memory and compaction](https://developers.openai.com/cookbook/examples/agents_sdk/building_reliable_agents_memory_compaction) | Cookbook | Advanced | An evidence-review agent that manages long context |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Article | Intermediate | Manage limited attention across long tasks |
| [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) | Docs | Intermediate | Store and read information across conversations |

## Try it

1. Give an agent a 20-step task, such as reviewing 20 short documents.
2. Run it once with no memory strategy and once with a notes file it updates after each step.
3. Compare where each run lost track or repeated work.

## Check yourself

1. What is compaction, and what can it lose?
2. What belongs in long-term memory versus the current context?
3. How could stale memory cause a wrong answer?

---

[← Lesson 12: Multi-Agent Systems and Orchestration](../12-multi-agent-systems/README.md) · [Course home](../../README.md) · [Lesson 14: Model Context Protocol and Integrations →](../14-mcp-and-integrations/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/pathway/).*
