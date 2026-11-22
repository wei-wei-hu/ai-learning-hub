# Lesson 18: Long-Running and Managed Agents

[← Lesson 17: Computer Use and Browser Agents](../17-computer-use/README.md) · [Course home](../../README.md) · [Lesson 19: Evaluating AI Systems →](../19-evaluating-ai-systems/README.md)

> Run agents for hours in hosted harnesses and sandboxes.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Compare running your own agent loop with a managed agent service
- Explain what a harness does for long tasks
- Plan sandboxes, permissions and costs for a hosted agent

## Why it matters

In 2026 both providers launched hosted agent runtimes: OpenAI's Agents API and Anthropic's Claude Managed Agents. They remove much of the infrastructure work for long-running tasks. Knowing when to rent the harness and when to own it is now an architecture decision.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/) | Article | Intermediate | Managed Codex harness with sandbox choices |
| [Agents API docs](https://developers.openai.com/api/docs/guides/agents-api/overview) | Docs | Intermediate | Sessions, tools, environments and pricing |
| [openai/symphony](https://github.com/openai/symphony) | Repo | Advanced | Run autonomous Codex agents from a Linear board |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview) | Docs | Intermediate | Hosted harness for long-running work |
| [Managed Agents quickstart](https://platform.claude.com/docs/en/managed-agents/quickstart) | Docs | Intermediate | Your first hosted agent session |
| [Building always-on agents](https://claude.com/resources/articles/building-always-on-agents) | Article | Advanced | Inbox, timers, memory, permissions and outbox |
| [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Article | Advanced | Working across many context windows |

## Try it

1. Choose a task that takes a person at least an hour, such as a market scan.
2. Write the agent definition: instructions, tools, sandbox and stop conditions.
3. Estimate the cost per run and decide whether a hosted or self-run harness fits better.

## Check yourself

1. What does a harness add on top of a model and tools?
2. When would compliance push you toward a self-hosted sandbox?
3. How would you know a long-running agent has gone off track?

## Stage 4 project

This lesson completes **Stage 4: Run advanced agents**. Before you move on, finish one piece of work.

**What to produce:** One real task completed by a coding or long-running agent, with a written review of what it did.

**Example scenario:** An AI-assisted software review: have a coding agent review a pull request and compare its findings with a human review.

**You are ready for the next stage when:**

- [ ] You have reviewed an agent's full work log, not only its final answer
- [ ] You set limits on what the agent could access before it started
- [ ] You can name one task you would not hand to an agent yet, and why

---

[← Lesson 17: Computer Use and Browser Agents](../17-computer-use/README.md) · [Course home](../../README.md) · [Lesson 19: Evaluating AI Systems →](../19-evaluating-ai-systems/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
