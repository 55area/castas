---
name: diagnose-defect
description: Investigate ambiguous, intermittent, cross-boundary, or performance defects in software. Use when the cause of a reported failure is unclear or prior fixes failed. Produce evidence for the cause and verify any authorized fix. Use the owning platform skill for clear, localized implementation or test failures.
license: MIT
metadata:
  version: "1.1.0"
---

# Diagnose a defect

Find the smallest reliable observation that distinguishes the reported failure from a working case. Scale investigation to uncertainty and impact.

1. Record the expected behavior, actual symptom, trigger, affected build/configuration, and impact. Locate the governing contract and the first relevant failure. Preserve the difference between an observed regression and a suspected one.
2. Establish a safe feedback loop using the existing test runner, a local request, a fixture, a representative browser/device interaction, or a sanitized trace. Verify that the loop reaches the failing path and checks the reported symptom. Preserve a control case. For intermittent failures, record attempts and conditions, then control scheduling, time, inputs, or network behavior where feasible. Use a fixed workload and comparable environments for performance investigations.
3. Trace the failing value, event, or state from the first incorrect boundary back to its source. Compare a working revision or path when it can distinguish causes. For competing explanations, state what each predicts and change one relevant factor at a time. Prefer a targeted read-only probe. Use temporary instrumentation only in an authorized environment, with bounded output and redaction.
4. If the task authorizes a fix, change the owning behavior and preserve existing contracts. Use a regression check that fails on the specific defect when feasible. Rerun the original trigger, the control, and relevant regression checks. Remove temporary instrumentation and harnesses from the deliverable. If the task requests diagnosis only, report the proposed correction and the check that would verify it.
5. When reproduction is unavailable, continue with safe source, revision, and existing evidence inspection. Label conclusions as hypotheses unless the evidence establishes the cause. Report the smallest missing artifact or observation that would distinguish the remaining explanations.

Keep active incident containment and root-cause analysis distinct. Follow existing authority for live mitigation, production probes, data access, and external actions. Work in isolated environments for replay and history bisection. Redact credentials and personal data before storing or sharing diagnostic artifacts.

When a reliable reproducer still leaves a large suspect range, read [revision bisection and input reduction](references/localization.md).

Return the symptom, affected scope, reproduction or evidence limits, cause confidence, actual check outcomes, and next action. Ordinary localized fixes can use the project's normal workflow.
