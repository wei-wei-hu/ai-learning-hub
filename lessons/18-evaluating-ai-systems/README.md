# Lesson 18: Evaluating AI Systems

[← Lesson 17: Long-Running and Managed Agents](../17-long-running-and-managed-agents/README.md) · [Course home](../../README.md) · [Lesson 19: Safety, Security and Governance →](../19-safety-security-and-governance/README.md)

> Prove quality with evals before and after you ship.

**Tracks:** Management, AI Leadership, Engineering, Safety & Governance · **Sources:** official OpenAI and Anthropic material, verified November 2026

## In this lesson

- Build a small eval set from real examples
- Grade outputs with code checks, model graders and human review
- Track regressions when prompts, models or tools change

## Why it matters

Without evals, every change to a prompt or model is a guess. Evals turn quality into numbers that leaders can trust and engineers can improve. Both providers treat them as the foundation of production AI.

## Learn from OpenAI

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Evaluate AI Applications](https://academy.openai.com/pages/courses) | Course | Intermediate | Evals, failure analysis, regression prevention · 70 min |
| [Optimize AI Application Performance](https://academy.openai.com/pages/courses) | Course | Advanced | Quality, latency, reliability and cost · 30 min |
| [Model optimization learning track](https://developers.openai.com/tracks/model-optimization) | Track | Advanced | Accuracy, performance and cost tuning |

## Learn from Anthropic

| Resource | Type | Level | What you get |
|---|---|---|---|
| [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Article | Intermediate | Rigorous evals for multi-turn agents |
| [AI Fluency for Builders](https://anthropic.skilljar.com/) | Course | Intermediate | From problem to shipped solution |

## OpenAI or Anthropic?

OpenAI's courses give you a step-by-step method for evals, failure analysis and regression checks, which fits a single application with defined inputs and outputs. Anthropic's article focuses on agents that work across many turns, where a single right answer is harder to define. Use the first to set up your evaluation set and the second when you start grading agents.

## Try it

1. Collect 20 real inputs for one AI feature you built in this course.
2. Write the expected outcome for each and a pass/fail rule.
3. Run the set, change one thing in the prompt, and run it again.

## Check yourself

1. Why should eval cases come from real usage?
2. When is a model grader trustworthy, and when do you need a person?
3. What eval result would make you stop a launch?

---

[← Lesson 17: Long-Running and Managed Agents](../17-long-running-and-managed-agents/README.md) · [Course home](../../README.md) · [Lesson 19: Safety, Security and Governance →](../19-safety-security-and-governance/README.md)

*Track your progress in the [interactive learning path](https://wei-wei-hu.github.io/ai-learning-path/).*
