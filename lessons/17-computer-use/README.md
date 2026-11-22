# Lesson 17: Computer Use and Browser Agents

[← Lesson 16: Coding Agents: Codex and Claude Code](../16-coding-agents/README.md) · [Course home](../../README.md) · [Lesson 18: Long-Running and Managed Agents →](../18-long-running-and-managed-agents/README.md)

> Agents that operate screens, browsers and apps.

**Tracks:** Engineering, Safety & Governance · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Explain the screenshot → action loop
- Choose between computer use, browser tools and an API integration
- Identify prompt-injection risks in agents that read web pages

## Why it matters

Many systems have no API, so agents need to use them the way people do. That power comes with new risks, because every web page an agent reads can contain instructions. This lesson pairs the capability with the defenses.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Computer use guide](https://developers.openai.com/api/docs/guides/tools-computer-use) | Docs | Advanced | Operate interfaces through screenshots and actions |
| [Computer use topic hub](https://developers.openai.com/topics/cua) | Hub | Advanced | Guides and demos |
| [Hardening ChatGPT Atlas against prompt injection](https://openai.com/index/hardening-atlas-against-prompt-injection) | Article | Intermediate | Finding and fixing attacks on browser agents |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) | Docs | Advanced | Screenshots, mouse and keyboard control |
| [Beyond permission prompts](https://www.anthropic.com/engineering/claude-code-sandboxing) | Article | Intermediate | Sandboxing for safer autonomy |

## Try it

1. Run a computer use demo in a sandbox, never on your main machine.
2. Give it a simple form-filling task.
3. Add a page with a hidden instruction and see whether the agent follows it; write down the defense you would add.

## Check yourself

1. When is computer use the wrong choice?
2. What is prompt injection, and why are browser agents especially exposed?
3. Which actions should always require a human to confirm?

---

[← Lesson 16: Coding Agents: Codex and Claude Code](../16-coding-agents/README.md) · [Course home](../../README.md) · [Lesson 18: Long-Running and Managed Agents →](../18-long-running-and-managed-agents/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-hub/pathway/).*
