# Lesson 6: Working with the Model APIs

[← Lesson 5: What Makes an Agent](../05-what-is-an-agent/README.md) · [Course home](../../README.md) · [Lesson 7: Tool Use and Function Calling →](../07-tool-use/README.md)

> Call models from code with the Responses API and the Messages API.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Send a first request with each provider's SDK
- Explain messages, roles, tokens and streaming
- Choose between the two providers' core APIs for a simple app

## Why it matters

Every product, agent and integration in this course sits on top of these two APIs. Once you can call them directly, the SDKs and frameworks in later lessons stop feeling like magic. This is also where cost and latency first become visible.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses) | Docs | Beginner | The core API for text, tools and multi-turn state |
| [AI app development learning track](https://developers.openai.com/tracks/ai-application-development) | Track | Intermediate | Concept to production |
| [API Builder Bootcamp](https://academy.openai.com/public/resources/api-builder-bootcamp-2026-08-19) | Live/Video | Intermediate | Five sessions from API foundations to production |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Claude Platform 101](https://anthropic.skilljar.com/) | Course | Beginner | Building on the Claude Platform |
| [Building with the Claude API](https://anthropic.skilljar.com/) | Course | Intermediate | The full API course |
| [Working with the Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) | Docs | Beginner | The core API the SDKs build on |

## Try it

1. Install the official Python SDK for each provider.
2. Send the same prompt template from Lesson 3 to both APIs and print the responses.
3. Log token usage for each call and estimate what 1,000 calls a day would cost.

## Check yourself

1. What is a token, and why does it drive both cost and speed?
2. What does streaming change for the person using your app?
3. Where in each API do you put standing instructions versus the user's message?

---

[← Lesson 5: What Makes an Agent](../05-what-is-an-agent/README.md) · [Course home](../../README.md) · [Lesson 7: Tool Use and Function Calling →](../07-tool-use/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/pathway/).*
