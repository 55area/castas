# Security Assessment: [Target]

Replace prompts with actual evidence, omit irrelevant sections, and honor the caller's requested format. Do not leave example findings or secret values in the report.

## Assessment

- Mode and outcome: [Threat model / Audit / Authorized build-hardening / Readiness / Planning; Action required / No blocking findings / Incomplete where applicable]
- Scope and snapshot: [Selected repositories/files/systems, revisions or content snapshot, environment, date, exclusions]
- Authority and capabilities: [Allowed actions/targets, available source/tools, material limits]
- Requirements and baseline: [Project rules, standards/editions/selected IDs, platform/build versions]
- Assumptions and owners: [Known facts versus assumptions; responsible decision-maker]
- Independence: [Reviewer/session and model only when known; self-review disclosed]

## Threats and control coverage

| Threat ID / surface | Threat, prerequisites, invariant, and impact | Control and evidence | Verification | Coverage, gap, and next action |
| --- | --- | --- | --- | --- |
| [THR-001 / asset or boundary] | [Credible path; distinguish established links from assumptions] | [Proposed / implemented / runtime-observed; precise evidence] | [Check ID/link; planned versus executed] | [Assessed / Partially assessed / Not assessed / Not applicable with reason; residual risk, owner or Unknown, next action] |

Reuse existing IDs and link detailed threat models rather than duplicating them. Include material combined attack paths and meaningful prevention, containment, detection, and recovery. Assessed does not mean safe; exclusions and unavailable evidence are not Not applicable. For narrow work, a concise equivalent is sufficient.

## Findings

### SEC-001 — [P1] [Concrete failure]

- Type / disposition / treatment: [Vulnerability / Design risk / Control gap / Optional hardening; Blocking / Non-blocking with reason; Open / Changed but unverified / Mitigated / Resolved / Accepted risk]
- Location / origin: [Actual path/configuration or source label; Introduced / Worsened / Pre-existing / Unknown]
- Related threat / check: [Existing IDs or links where useful]
- Trigger and expected/actual behavior: [Reachable actor, input, state, timing, and broken rule]
- Impact and evidence: [Who/what is affected; trace/reproducer; Confirmed / Strongly supported with remaining limitations]
- Correction and verification: [Smallest sound direction, compensating layers, check that establishes corrected behavior]
- Owner / follow-up: [Actual owner or Unknown; accepted-risk rationale and review trigger when applicable]

## Verification evidence

| Check ID / command or procedure | Revision, environment, and evidence | Result and limits |
| --- | --- | --- |
| [VER-001 / actual check or explicitly planned procedure] | [Observed locally / matching CI record / planned target] | Passed / Failed / Not run — [invariant, prohibited effects and legitimate behavior checked; boundaries not exercised] |

Unsupported author claims remain unverified and belong in the gaps below, not as Passed/Failed execution evidence.

## Next actions and residual risk

[Prioritized actions, hypotheses needing investigation, unresolved decisions, excluded/unverified areas, risk ownership, recheck triggers, and the smallest next step. No claim of exhaustive attack coverage, certification, or complete security.]
