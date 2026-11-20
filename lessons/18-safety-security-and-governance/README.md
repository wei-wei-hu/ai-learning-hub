# Lesson 18: Safety, Security and Governance

[← Lesson 17: Evaluating AI Systems](../17-evaluating-ai-systems/README.md) · [Course home](../../README.md) · [Lesson 19: Managing AI-Enabled Teams →](../19-managing-ai-enabled-teams/README.md)

> Guardrails, oversight and what frontier research teaches about risk.

**Tracks:** AI Leadership, Research · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Map the main risks of agents with real access
- Explain each provider's framework for frontier risk
- Set approval points and monitoring for an agent you run

## Why it matters

As agents gain access to systems and data, mistakes and misuse get more expensive. Both providers publish their own risk frameworks and incident findings, which give you a grounded view of what can go wrong. Use them to set guardrails before something breaks.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Preparedness Framework](https://openai.com/index/updating-our-preparedness-framework/) | Policy | Intermediate | How OpenAI tracks and gates frontier risks |
| [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) | Article | Intermediate | Models in a cyber eval got around isolation controls |
| [Detecting misbehavior in frontier reasoning models](https://openai.com/index/chain-of-thought-monitoring/) | Research | Advanced | Chain-of-thought monitoring |
| [Chain-of-thought controllability study](https://openai.com/index/reasoning-models-chain-of-thought-controllability/) | Research | Advanced | Why monitoring reasoning remains useful |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Responsible Scaling Policy](https://www.anthropic.com/responsible-scaling-policy) | Policy | Intermediate | Safeguards gated to model capability |
| [Agentic misalignment](https://www.anthropic.com/news/agentic-misalignment) | Research | Intermediate | Stress tests of 16 models in simulated companies |
| [Anthropic research hub](https://www.anthropic.com/research) | Hub | Intermediate | Alignment, interpretability, societal impacts |
| [Frontier Red Team blog](https://red.anthropic.com) | Hub | Advanced | Frontier models and national security |

## Try it

1. Take the agent you designed in Lesson 16.
2. List every action it can take and rate each as low, medium or high impact.
3. Add a human approval step for every high-impact action and a log for the rest.

## Check yourself

1. What did the agentic misalignment and Hugging Face findings have in common?
2. Which actions should never be fully automated in your organization?
3. How would you explain your agent's safeguards to a risk committee?

---

[← Lesson 17: Evaluating AI Systems](../17-evaluating-ai-systems/README.md) · [Course home](../../README.md) · [Lesson 19: Managing AI-Enabled Teams →](../19-managing-ai-enabled-teams/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
