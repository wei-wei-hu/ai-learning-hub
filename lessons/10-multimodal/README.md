# Lesson 10: Multimodal: Vision, Audio and Voice

[← Lesson 9: Retrieval and Agentic RAG](../09-retrieval-and-rag/README.md) · [Course home](../../README.md) · [Lesson 11: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK →](../11-agent-frameworks/README.md)

> Work with images, speech and real-time voice.

**Tracks:** Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Send images to a model and extract information from them
- Choose between speech-to-text, text-to-speech and real-time voice
- Design a voice interaction that handles interruptions

## Why it matters

A large share of business information lives in screenshots, scanned forms, charts and calls. Multimodal models can read and respond to all of it. Voice also opens AI to people who will never type a prompt.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Images and vision](https://developers.openai.com/api/docs/guides/images-vision) | Docs | Beginner | Image inputs and image generation |
| [Audio and speech](https://developers.openai.com/api/docs/guides/audio) | Docs | Intermediate | Speech-to-text, text-to-speech, realtime audio |
| [Voice agents guide](https://developers.openai.com/api/docs/guides/voice-agents) | Docs | Intermediate | Voice-first agents with realtime models |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Features overview: vision and files](https://platform.claude.com/docs/en/build-with-claude/overview) | Docs | Beginner | Image and PDF support across the platform |
| [Claude Cookbooks: multimodal notebooks](https://github.com/anthropics/claude-cookbooks) | Repo | Intermediate | Charts, documents and image recipes |

## Try it

1. Take a screenshot of a chart from a real report.
2. Ask each model to extract the data as a table and summarize the trend.
3. Check every number against the original and note any errors.

## Check yourself

1. What kinds of images still cause extraction mistakes?
2. When is a chained speech pipeline better than a real-time voice model?
3. Which workflow in your team starts with a document or a phone call?

## Stage 2 project

This lesson completes **Stage 2: Build AI applications**. Before you move on, finish one piece of work.

**What to produce:** A small application that calls a model API, uses one tool and returns structured output.

**Example scenario:** An automated weekly report: pull figures from a data source and produce the same report format every week.

**You are ready for the next stage when:**

- [ ] Your application runs end to end from a single command
- [ ] Its output follows a fixed schema every time
- [ ] It answers from your own documents and shows where each answer came from

---

[← Lesson 9: Retrieval and Agentic RAG](../09-retrieval-and-rag/README.md) · [Course home](../../README.md) · [Lesson 11: Agent Frameworks: OpenAI Agents SDK and Claude Agent SDK →](../11-agent-frameworks/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/).*
