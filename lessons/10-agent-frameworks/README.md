# Lesson 10: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK

[← Lesson 09: Multimodal: Vision, Audio and Voice](../09-multimodal/README.md) · [Course home](../../README.md) · [Lesson 11: Multi-Agent Systems and Orchestration →](../11-multi-agent-systems/README.md)

> Build your first agent with each provider's official SDK.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Run each provider's agent quickstart
- Add a tool and a guardrail to an agent
- Read traces to see what the agent actually did

## Why it matters

The SDKs handle the loop, tool execution and state so you can focus on the job. Each one reflects how its provider thinks agents should be built. Running both side by side is the fastest way to learn what is common and what is a design choice.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Agents SDK guide](https://developers.openai.com/api/docs/guides/agents/sdk) | Docs | Intermediate | Agents, tools, handoffs, guardrails, tracing |
| [Agents SDK quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart) | Docs | Beginner | One agent, running locally |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | Repo | Intermediate | Python SDK and examples |
| [openai/openai-agents-js](https://github.com/openai/openai-agents-js) | Repo | Intermediate | TypeScript SDK |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) | Docs | Intermediate | The Claude Code agent loop as a library |
| [Agent SDK quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) | Docs | Beginner | Build a bug-fixing agent in minutes |
| [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) | Article | Intermediate | Design notes behind the SDK |
| [anthropics/claude-agent-sdk-demos](https://github.com/anthropics/claude-agent-sdk-demos) | Repo | Intermediate | Example agents to run and read |

## Which approach should you explore?

The OpenAI Agents SDK gives you separate parts for agents, tools, handoffs, guardrails and tracing, which suits workflows where several agents pass work to each other. The Claude Agent SDK packages the agent loop behind Claude Code as a library, which suits agents that read files and run commands. Choose by the kind of work your agent does, then check where it will be deployed and which of your existing systems it has to connect to before you commit.

*These are practical starting recommendations based on the resources in this lesson. Neither provider has been benchmarked here, and studying both is often worthwhile.*

## Try it

1. Complete both quickstarts.
2. Give each agent the get_order_status tool from Lesson 6.
3. Ask a question that needs two tool calls and compare the traces.

## Check yourself

1. What does the SDK do for you that you did by hand in Lesson 6?
2. Where would you add a guardrail in each SDK?
3. What did the traces reveal that the final answer hid?

---

[← Lesson 09: Multimodal: Vision, Audio and Voice](../09-multimodal/README.md) · [Course home](../../README.md) · [Lesson 11: Multi-Agent Systems and Orchestration →](../11-multi-agent-systems/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
