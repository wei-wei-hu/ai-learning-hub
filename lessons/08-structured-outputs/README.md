# Lesson 8: Structured Outputs

[← Lesson 7: Tool Use and Function Calling](../07-tool-use/README.md) · [Course home](../../README.md) · [Lesson 9: Retrieval and Agentic RAG →](../09-retrieval-and-rag/README.md)

> Generate schema-constrained JSON and handle validation failures.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Define a JSON schema for a model's answer
- Turn free text into records your systems can store
- Handle refusals and missing fields safely

## Why it matters

Business systems need fields, not paragraphs. Structured outputs let AI feed spreadsheets, CRMs and dashboards without fragile parsing. This is often the first AI feature that reaches production inside a company.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) | Docs | Intermediate | Guarantee JSON that matches your schema |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) | Docs | Intermediate | JSON outputs and strict tool use |

## Try it

1. Collect five customer emails, real or invented.
2. Define a schema with fields for intent, urgency, product and next step.
3. Extract all five with each provider and load the results into a spreadsheet.

## Check yourself

1. What is the difference between asking for JSON and enforcing a schema?
2. How should your code respond when a required field is missing?
3. Which of your current reports could be filled by structured outputs?

---

[← Lesson 7: Tool Use and Function Calling](../07-tool-use/README.md) · [Course home](../../README.md) · [Lesson 9: Retrieval and Agentic RAG →](../09-retrieval-and-rag/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/).*
