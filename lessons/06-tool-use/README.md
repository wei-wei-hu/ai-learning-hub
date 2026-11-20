# Lesson 06: Tool Use and Function Calling

[← Lesson 05: Working with the Model APIs](../05-model-apis/README.md) · [Course home](../../README.md) · [Lesson 07: Structured Outputs →](../07-structured-outputs/README.md)

> Let models call your code, search the web and act on real systems.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Define a tool with a clear name, description and input schema
- Run the request → tool call → result → answer loop
- Write tool descriptions a model can use correctly

## Why it matters

Tools are what turn a model from a writer into a worker. Nearly every agent failure traces back to a confusing tool or a missing one. Learning to design tools well pays off in every later lesson.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Function calling](https://developers.openai.com/api/docs/guides/function-calling) | Docs | Intermediate | Let models call your own code |
| [Using tools](https://developers.openai.com/api/docs/guides/tools) | Docs | Intermediate | Built-in web search, file search, code interpreter, MCP |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | Article | Intermediate | Design, test and improve tools |
| [Features overview: tools](https://platform.claude.com/docs/en/build-with-claude/overview) | Docs | Beginner | Every built-in tool and how it is supported |

## Try it

1. Write one tool, get_order_status(order_id), backed by a small dictionary of fake orders.
2. Connect it to each provider and ask 'Where is order 1042?'
3. Rewrite the tool description twice and note when the model calls it correctly.

## Check yourself

1. Who actually runs the tool: the model or your code?
2. What makes a tool description easy for a model to use correctly?
3. When would you use a built-in tool instead of writing your own?

---

[← Lesson 05: Working with the Model APIs](../05-model-apis/README.md) · [Course home](../../README.md) · [Lesson 07: Structured Outputs →](../07-structured-outputs/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
