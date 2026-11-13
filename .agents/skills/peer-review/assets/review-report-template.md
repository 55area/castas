# Peer Review: [Change title]

Replace fields with actual evidence; remove unused guidance and optional sections. Preserve the caller's output format when one is specified.

## Assessment

- **Verdict:** Changes requested / No blocking findings / Incomplete
- **Coverage:** Complete for the agreed scope / Partial — [missing surfaces]
- **Target:** [Repository and base/head, local snapshot, or explicit files/snippet without history; review date]
- **Scope and exclusions:** [Selected code, relevant tests, and intentionally excluded material]
- **Independence:** [Fresh reviewer / Independent session / Disclosed self-review; model if known]
- **Intent and contracts:** [Expected outcome and requirement/specification references]
- **Review policy and depth:** [Policy source/revision; Quick / Standard / Deep and agreed limits]

## Findings

### CR-001 — [P1] [Concrete failure title]

- **Disposition:** Blocking / Non-blocking — [impact-based reason]
- **Location:** [Actual path and minimal line range; old/new side when needed; precise snippet/symbol label if no path was supplied]
- **Origin:** Introduced / Worsened / Newly exposed / Pre-existing / Unknown — [baseline evidence, or unavailable history]
- **Trigger:** [Reachable input, actor, state, timing, or supported platform]
- **Expected / actual:** [Observable contract and failure]
- **Impact:** [Who is affected and how]
- **Evidence:** [Code/contract trace or reproducer; check result if executed]
- **Confidence:** Confirmed / Strongly supported — [remaining limitation if any]
- **Correction:** [Smallest sound direction]
- **Verification:** [Specific check that should detect the regression and validate the fix]

If no findings survive validation, state that explicitly. Do not retain example findings or placeholders in a finished report.

## Verification evidence

| Check / command | Revision and environment | Result | What it establishes / limitation |
| --- | --- | --- | --- |
| [Actual check] | [Actual target] | Passed / Failed / Not run | [Evidence or reason] |

[Identify applicable formatting/static/build, security/secret and behavioral-test checks. Distinguish locally executed evidence from matching CI results or author claims, required gates from selected checks, and code failures from inherited/environment failures. State the consequence of each unmet required gate; omit inapplicable layers.]

## Material questions and gaps

[Unresolved contract questions, unavailable evidence, unreviewed surfaces, or stale-snapshot limits. State the smallest next action and whether it prevents assessment.]

## Follow-up

[Implementer action, re-review scope, and remaining project gates. For re-review, give each previous finding's status and evidence. This report is not a remote approval or release authorization.]

[For related changes or a moving base: identify the assessed combination/base, shared behavior, known review/integration ownership, missing combined-state evidence and next action. Keep individual review results separate from integration readiness; omit this guidance when irrelevant.]
