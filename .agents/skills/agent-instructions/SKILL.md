---
name: agent-instructions
description: Create or improve software-development SKILL.md packages and project agent instructions. Use when maintaining reusable agent workflows, activation descriptions, supporting resources, or AGENTS.md guidance. Ordinary product documentation and application implementation have separate owners.
license: MIT
metadata:
  version: "1.1.1"
---

# Maintain useful agent instructions

Improve an observable development outcome with the smallest clear instruction set. Use English artifacts and the user's conversation language. Preserve existing useful workflows and installation policy. Editing instructions does not authorize changing host settings, credentials, tools, or installed global packages.

1. **Establish the need.** Read the user's intended outcomes, the current instructions and their callers, and relevant examples or failures. Identify what the agent gets wrong or must know. Distinguish a missing capability from unclear discovery, missing project facts, unavailable tools, or an ineffective automated gate. A model's endorsement is not outcome evidence.
2. **Choose one owner.** Use project instructions for durable local commands and conventions, the actual runner/CI for deterministic enforcement, a conditional reference for detail belonging to an existing workflow, or a new skill for a distinct recurring task with a recognizable trigger and result. Preserve canonical requirements and existing decisions. Avoid a new alias or router that only repeats another package.
3. **Write for the target models.** Give concrete steps, observable completion criteria, meaningful failure handling and an honest fallback when tools are absent. Define non-obvious terms and use a small example when it changes decisions. Keep essential invariants in the entrypoint. Link specialist guidance with an explicit condition for reading it. Prefer clear procedures over slogans, long prohibition lists, or reliance on unstated expert knowledge. Preserve the user's authority and required gates.
4. **Package portably.** Check the current [Agent Skills specification](https://agentskills.io/specification) and the intended host's supported metadata. Use a matching lowercase directory/name and a concise description of capability and activation. Keep resources inside the package with relative paths. Cross-package navigation must be optional unless a real declared dependency is available. Host UI metadata is optional; it must not invent model settings or silently disable discovery. Include scripts only when they add repeatable value, inspect their effects, and execute meaningful checks. Inspect upstream licenses and record original adaptations or copied-material notices accurately.
5. **Evaluate and revise.** Validate metadata, paths, references and scripts. For substantial changes, use [the evaluation procedure](references/evaluation.md) to choose realistic matching, ambiguous, and non-matching tasks, including relevant smaller-model cases. Separate structural validation, a behavioral smoke trial and matched baseline comparisons. For comparative trials, verify isolation from the grader and sibling runs, and keep fixed controls for both success and failure. Preserve fixtures and actual evidence. Fix demonstrated failures, recheck affected cases, and report unavailable evidence instead of claiming universal improvement.

Return the changed behavior, why it belongs in this owner, what was preserved or retired, validation and limits. Update the repository's catalog, version metadata and installation guidance when affected. Store research and maintenance evidence outside ordinary runtime context. Do not install hooks, prescribe fixed model tiers, or copy upstream mandatory orchestration merely because an example uses them.
