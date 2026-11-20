# Lesson 12: Model Context Protocol and Integrations

[← Lesson 11: Memory and Context Engineering](../11-memory-and-context-engineering/README.md) · [Course home](../../README.md) · [Lesson 13: Skills and Plugins →](../13-skills-and-plugins/README.md)

> Connect AI to your tools and data through the open MCP standard.

**Tracks:** Architecture, Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Explain MCP servers, clients, tools and resources
- Build a small MCP server
- Bring an MCP server into ChatGPT and into Claude

## Why it matters

MCP is the shared standard both providers support for connecting models to outside systems. Build an integration once and it works across many AI products. That makes it one of the highest-leverage skills in this course.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Apps SDK](https://developers.openai.com/apps-sdk) | Docs | Intermediate | Apps that run inside ChatGPT, built on MCP |
| [MCP Apps in ChatGPT](https://developers.openai.com/apps-sdk/mcp-apps-in-chatgpt) | Docs | Advanced | Build to the open MCP Apps standard first |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Introduction to Model Context Protocol](https://anthropic.skilljar.com/) | Course | Intermediate | Build MCP servers and clients in Python |
| [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/) | Course | Advanced | Sampling, notifications, transports |
| [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) | Article | Advanced | Call tools through code to save context |
| [modelcontextprotocol.io](https://modelcontextprotocol.io) | Docs | Intermediate | The open standard's official site |

## Try it

1. Build an MCP server with one tool that reads a CSV of your choice.
2. Connect it to Claude and to ChatGPT.
3. Ask the same question in both and note any differences in how the tool was used.

## Check yourself

1. What problem does MCP solve that plain function calling does not?
2. What should you check before connecting a third-party MCP server?
3. Which internal system would you expose through MCP first, and why?

---

[← Lesson 11: Memory and Context Engineering](../11-memory-and-context-engineering/README.md) · [Course home](../../README.md) · [Lesson 13: Skills and Plugins →](../13-skills-and-plugins/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
