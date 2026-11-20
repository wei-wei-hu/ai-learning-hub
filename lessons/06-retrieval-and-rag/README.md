# Lesson 06: Retrieval and Agentic RAG

[← Lesson 05: Structured Outputs](../05-structured-outputs/README.md) · [Course home](../../README.md) · [Lesson 07: Multimodal: Vision, Audio and Voice →](../07-multimodal/README.md)

> Ground answers in your own documents and data.

**Tracks:** Architecture, Engineering · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Explain the retrieval-augmented generation (RAG) flow
- Use a built-in file search tool and compare it with your own pipeline
- Measure whether retrieved answers are actually correct

## Why it matters

Most company questions depend on company documents a model has never seen. Retrieval lets the model answer from your sources and cite them. Agentic RAG goes further and lets the model decide what to search for next.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [File search and retrieval](https://developers.openai.com/api/docs/guides/tools-file-search) | Docs | Intermediate | Built-in RAG over your files |
| [Build with Retrieval-Augmented Generation](https://academy.openai.com/pages/courses) | Course | Intermediate | Retrieval pipelines and answer-quality checks · 100 min |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | Article | Intermediate | A method that improves retrieval accuracy |
| [Claude Cookbooks: retrieval notebooks](https://github.com/anthropics/claude-cookbooks) | Repo | Intermediate | RAG recipes you can run |

## Try it

1. Upload three policy or product documents to a file search tool.
2. Write ten questions with known answers and run them.
3. Score each answer as correct, partly correct or wrong, and note whether it cited the right source.

## Check yourself

1. Why does chunking strategy affect answer quality?
2. What makes retrieval 'agentic' rather than a single search?
3. How would you prove to a stakeholder that your RAG answers are reliable?

---

[← Lesson 05: Structured Outputs](../05-structured-outputs/README.md) · [Course home](../../README.md) · [Lesson 07: Multimodal: Vision, Audio and Voice →](../07-multimodal/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
