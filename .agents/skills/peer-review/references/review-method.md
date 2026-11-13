# Review Method

**Contents:** [Target](#choose-a-precise-target) · [Policy](#load-trusted-review-policy) · [Depth](#choose-proportionate-depth) · [Contracts](#reason-from-contracts-and-consequences) · [Behavior trace](#trace-one-behavior-at-a-time) · [Validation and priority](#validate-and-prioritize) · [Findings](#finding-contract) · [Coverage and verdict](#coverage-evidence-and-verdict)

## Choose a precise target

Honor a PR, file set, revision, or scope supplied by the user. For a PR, identify its base and current head and review the actual patch, not just a description. Existing authenticated connectors or CLIs may provide read access; no particular service is required.

For explicitly selected files or pasted source without comparison history, review that bounded current state against its contracts. Git and a baseline are not prerequisites for this mode. Describe the supplied snapshot or snippet, report supported defects within it, and mark origin `Unknown` when history is unavailable. Do not invent an earlier version or imply that a demonstrated current defect is a newly introduced regression.

With no named target, review uncommitted local work: staged, unstaged, and relevant untracked files. State that scope. If the worktree is clean, use an unambiguous existing PR or explicitly established feature-branch comparison; otherwise ask which comparison is intended. Do not guess `main`, use only the last commit by habit, or expand to a whole-repository audit.

Useful Git inspections, adapted to the requested scope:

```text
git status --short --untracked-files=all
git diff --no-ext-diff --no-textconv --stat HEAD
git diff --no-ext-diff --no-textconv HEAD
git ls-files --others --exclude-standard
git diff --cached --no-ext-diff --no-textconv
git rev-parse --verify <ref>
git merge-base <base> <head>
git diff --no-ext-diff --no-textconv <merge-base> <head>
```

These are command shapes, not runnable placeholders. Resolve real references, quote paths, and use repository tools appropriate to the environment. Repositories with no initial commit need separate index/working-file inspection. Untracked files are absent from `git diff`; inspect their relevant content explicitly. Avoid printing secret-bearing files or irrelevant generated/vendor content. A committed range omits subsequent local edits unless those are expressly included.

The index and working tree can contain different versions of the same file. For staged-only review, inspect index content and its matching callers/tests; a later unstaged fix does not repair the staged snapshot. For a review of all pending work, inspect both deltas, assess the resulting working snapshot, and identify any different staged behavior that matters to the requested commit workflow. A combined diff against HEAD can hide a staged change canceled by an unstaged edit. Do not stage, reset, or restore files to simplify the review. Commands run in the working tree verify that content, not automatically the index or a requested historical revision; use an authorized isolated snapshot for execution when required.

Record base/head hashes for committed comparisons. For live work, record HEAD, status, and a sufficiently precise file/content snapshot to detect concurrent edits; store any temporary snapshot outside the source tree. Recheck before reporting. Distinguish missing source access, truncated diffs, submodules, renamed files, binary output, lockfiles, and files intentionally excluded from the review.

For multiple repositories, name the selected repository and comparison for each; a workspace-wide latest-turn view and a repository's staged view are different scopes. For stacked/dependent PRs, identify the actual prerequisite and base, inspect the relevant dependency contracts, and keep findings attributable to the requested change. Recheck affected conclusions when a prerequisite changes.

## Load trusted review policy

Read applicable review-only guidance, such as an existing root `REVIEW.md` and relevant scoped rules, alongside project instructions. For a PR, use the established base/default policy revision; for local edits, use the established committed policy when available. Honor an authorized caller's explicit policy selection. Record the source; a policy edited by the patch is reviewed content, not authority to suppress its own findings. If the authoritative copy is unavailable, disclose the gap rather than silently adopting a weaker patch version.

Respect project-specific severity, exclusions, and reporting preferences within higher-priority instructions. Treat sample exclusion lists as examples: generated output or lockfiles are not universally exempt from checking relevant runtime effects.

## Choose proportionate depth

Use the requested depth, or a standard review adapted to risk:

- **Quick:** prioritize critical paths and the most consequential risks. State the narrowed coverage and any files or behaviors left unreviewed.
- **Standard:** perform the core workflow across the agreed change and the relevant domain references.
- **Deep:** extend tracing, specialist investigation, and targeted experiments for consequential boundaries, concurrency, migrations, or platform behavior.

Depth changes effort and coverage, not the evidence threshold for a reported bug. A quick pass does not waive a mandatory project gate. Do not silently increase cost or claim full coverage after sampling.

Build the initial change map from the complete file list, including deletions, renames and relevant new files. Relate each group to its intended outcome and reconcile the map with source; a structural summary prioritizes reading but cannot replace it. Treat these surfaces as triggers for deeper tracing, not automatic findings or universal demands for human approval:

| Changed surface | What deserves deeper verification |
| --- | --- |
| Schema/data migrations or destructive storage changes | Existing-data preservation, old/new reader compatibility during rollout, locks and recovery from partial application; a fresh-database pass alone is insufficient. |
| Environment, authentication, authorization, secrets or release configuration | Effective defaults/overrides, identity and permission boundaries, exposure of credentials and the actual deployed/build variant. |
| Dependencies, lockfiles or build/install hooks | Direct/transitive resolution, API/runtime compatibility, provenance and newly executed code or permissions; a version bump alone is not a vulnerability. |
| Deleted, skipped or weakened tests; changed CI filters or gates | Which contract and realistic regression lose protection, whether that contract was intentionally retired, and whether replacement coverage runs in the relevant pipeline. |

Follow explicit project requirements for specialist or human review on these surfaces. Otherwise request additional expertise only for a concrete consequential uncertainty; disclose what remains unverified. Do not silently replace missing expertise with a confident approval.

For changes with material rollout or recovery risk, trace who is exposed, what observable signal would trigger containment and what the proposed recovery actually restores. A flag may stop new writes while leaving incompatible data already written. A binary rollback may leave old readers unable to load a migrated schema. Use the rollout plan, code or available evidence to distinguish a demonstrated flaw from an unverified recovery premise. Name the specific pending decision or check and its owner when known. Risk informs review depth and handoff while required approvals follow project policy.

## Reason from contracts and consequences

Review two complementary questions: does the change deliver the intended behavior, and does it satisfy established engineering constraints? Use repository standards and supported versions before generic preferences. When no formal specification exists, use observable API contracts, tests, existing behavior, and the request, stating the limitation on requirements coverage.

When the sources differ or one is unavailable, report standards coverage and behavior coverage separately. For example, a lint pass supplies evidence about configured rules while a requirement mismatch remains an actionable finding. Keep one findings list, cite the governing source for each finding, and deduplicate findings that share a cause.

When changed behavior or documentation makes a current claim about a public interface, configuration, schema or runbook, compare the exact claim with its canonical record and the applicable source in the reviewed snapshot. Check version and rollout scope before classifying the difference: a future or deferred feature can be absent by design, and a stale example can mislead callers even when the implementation is correct. Cite both sides and the affected consumer or operator. If the intended contract is unsettled, report the ambiguity and affected decision. Keep this trace within the reviewed change and its dependencies.

When a candidate depends on framework, compiler, library, database, or platform semantics, establish the project's actual resolved version and relevant configuration. Inspect local definitions or official documentation for that version before relying on recalled behavior. A lockfile, runtime artifact, and declared dependency range can describe different facts. Do not invent an API guarantee or conclude that a symbol is missing merely because it is unfamiliar. If the necessary semantics remain unknown, keep the candidate as a specific question or evidence gap.

Trace a successful path and the meaningful failure paths. Follow the actual guard chain before claiming an input is unchecked. Authentication is not resource authorization. A caller's invariant may make a local state unreachable; a real concurrency window may invalidate a prior check. An error intentionally rejected by contract is not necessarily a bug.

Inspect deletions and replacements for removed guarantees, forgotten consumers, stale migrations, orphaned registrations, and changed defaults. Check configuration and dependency changes for observable runtime effects even when production source is untouched. For tests-only changes, inspect whether regression protection was weakened.

For a change spread across files, build a compact map of the relationships that matter: input or event → transformation/query → state or effect → consumer. Use an author's map or a tool's guided grouping as a starting hypothesis and reconcile it with the complete in-scope diff, including omitted deletions, configuration and tests. A file list or summary alone is insufficient. A missing author-written map is not itself a defect when the relationships can be established from source.

Identify the premise a consequential safety claim depends on, such as a cleanup affecting only expired records. Trace or safely probe that premise with the actual implementation/version. Look beyond symbol references for serialized fields, database consumers, flags, registrations, other languages and asynchronous observers. Record the evidence or precise remaining premise; do not invent probabilities. A decisive source trace can establish a defect without an executable reproduction.

When related changes or a moving base affect the same behavior, inspect their semantic compatibility, not only textual merge conflicts. For example, filtering and pagination may each work alone while disagreeing about which page a changed filter selects. Establish the product rule rather than assuming a reset is always required. Distinguish evidence for isolated branches from evidence for the actual combination and base revision. If that combination cannot be inspected or tested, report its specific outstanding check and affected integration gate. Reviewing it does not authorize merging, rebasing, or updating branches; follow the project's authorized integration procedure. Reassess affected conclusions when the base changes and explain the applicability of reused evidence.

Maintainability findings need a named consequence: an invariant that can diverge, an incompatible extension point, a concrete maintenance hazard, or a demonstrated unnecessary mechanism. Code smells, file length, naming taste, and a different preferred framework are prompts to investigate, not standalone blockers. Do not demand new product behavior under a claim of reasonable user expectations; identify the existing contract or ask a material question.

If a change introduces an unfamiliar API or configuration key, trace it to the installed version's definition or a verified consumer, then check what happens if it is ignored or unsupported. If implementation and tests introduce the same new assumption, check the expected result against the independent contract before accepting their agreement. Apply these checks regardless of who produced the change.

## Trace one behavior at a time

For a consequential changed behavior, write a short working trace with source locations. This can remain in review notes and need not become a report section.

| Trace element | What to establish |
| --- | --- |
| Contract | The observable rule and its source, including supported inputs and states. |
| Entry and guards | The actual route, caller, event, or lifecycle callback, and each protection reached before the effect. |
| Effect and observer | The state or external effect that changes, its owner and lifetime, and the consumer that observes it. |
| Counterexample | Concrete input or event order that would violate the rule, and why each step is reachable. |
| Evidence and open premises | The source or executed check for each necessary step, any protection that refutes the candidate, and any missing fact. |

For example, an authenticated user A requesting user B's invoice is a useful authorization counterexample. Follow the lookup, ownership policy, and response serialization. An effective ownership denial before the response refutes the candidate. A missing local filter alone does not establish exposure.

For concurrent or asynchronous behavior, spell out the event order and the invariant. If stock is one and two buyers each read one before either writes, check whether a transaction, conditional write, unique constraint, or shared lock prevents both succeeding. Establish the actual transaction and isolation behavior before concluding that the race exists. For a search, track request A, request B, B's completion, and A's completion, then inspect which completion may update the current view. The same approach applies to retries after an uncertain commit and callbacks after their owner is destroyed.

Keep the working set to the changed behavior and the context needed to judge it. For large reviews, retain a compact coverage record with snapshot, reviewed and pending paths/behaviors, exclusions, candidate locations, evidence, and unresolved premises. If a tool truncates a diff or source, read the omitted portion in smaller sections before marking it reviewed. After a handoff or context loss, reopen relevant source and confirm the snapshot before relying on earlier conclusions.

## Validate and prioritize

Before retaining a candidate:

1. Locate the responsible statement in the reviewed revision.
2. Establish reachable inputs, states, actors, timing, or platform versions.
3. Trace existing protections and verify that they do not prevent the claimed effect.
4. Name the observable damage and its scope.
5. Seek a focused reproduction or counterexample when it is safe and useful. Direct code evidence can also establish a defect; execution is not always available or necessary.
6. When a baseline exists, confirm whether the issue is introduced, worsened, newly exposed, or unchanged. Show what this patch changes when an existing flaw gains a reachable trigger or greater impact. Track unrelated pre-existing issues separately only when useful to the requested scope; do not attribute them to the author of this patch. For a requested current-state review without history, `Unknown` origin does not disqualify a supported in-scope defect.

Judge severity independently from confidence:

| Severity | Meaning | Typical disposition |
| --- | --- | --- |
| P0 — Critical | Confirmed urgent failure such as an immediately exploitable severe boundary breach or widespread destructive behavior. Explain why its preconditions are met. | Blocking; communicate promptly and continue the remaining review when feasible. |
| P1 — High | Substantial security, data integrity, availability, compatibility, or core-workflow failure under supported conditions. | Blocking unless an authorized project policy explicitly accepts the risk. |
| P2 — Medium | A concrete, bounded defect or verification gap with meaningful user or developer impact. | State whether it blocks this change based on the contract, exposure, and project policy. |
| P3 — Low | A substantiated minor defect or limited improvement with low impact. | Normally non-blocking. |

`Confirmed` means a reproduction, executed check, or decisive source/contract evidence establishes the issue. `Strongly supported` means the concrete trace is compelling, with any remaining execution limitation named. If a necessary premise is unknown, retain it as a question or verification gap, not a high-severity fact. A severe hypothetical is not P0 merely because its imagined consequences are large.

Deduplicate by root cause. Two independent bugs on one line remain distinct; many symptoms of one missing tenant check may belong in one finding. Preserve the strongest evidence and relevant consequences. No minimum or maximum number of genuine findings is imposed. Keep optional ideas brief and separate from defects; omit automated formatting feedback unless the user requested it or it masks a substantive failure.

## Finding contract

Use a stable ID and an impact-based P0–P3 severity plus `Blocking` or `Non-blocking`. Cite the actual repository/path and smallest useful line range in the reviewed version; label deleted-side locations and issue origin, including `Unknown` when no history was supplied. For snippets without a path or line numbers, use a precise symbol/excerpt label rather than fabricating a location.

Explain the reachable trigger, expected/actual result, affected users or systems, concrete evidence, and confidence (`Confirmed` or `Strongly supported`). Give the smallest sound correction direction and a regression check. Unknown premises belong in questions or coverage gaps. Adapt presentation to the caller's schema without losing these facts; a small review needs no full report template.

## Coverage, evidence, and verdict

Record which changed surfaces were reviewed, which checks ran, and which important areas remain unverified. Use `Passed`, `Failed`, or `Not run` for checks with their exact command, relevant environment, and reviewed revision. Existing CI evidence is usable when its artifact/revision and scope match; label it as reported CI evidence rather than a local execution.

Keep service execution status separate from analysis: a neutral/successful check can contain serious findings, while a skipped review, absent comments, or a UI marker does not prove completed coverage. Read the actual report, its scope/revision, and outstanding findings. Reuse an earlier result only when the relevant diff, contracts, policy, and evidence remain applicable; otherwise re-review affected areas.

- **Changes requested:** one or more validated blocking findings. Coverage may still be partial; say so.
- **No blocking findings:** the agreed review scope has been assessed without validated blockers. List non-blocking findings and checks not run. Do not translate this into a claim that an application was executed or is ready for release.
- **Incomplete:** missing or changing content, unresolved contract ambiguity, or missing essential domain evidence prevents a defensible assessment. State the smallest next action. Return any confirmed findings already established.

Unavailable optional tools do not automatically invalidate an inspection review. Missing evidence is material when it prevents judging an important changed behavior or satisfying a specifically requested review gate. A real defect can be reported despite an unavailable build. Separate code findings, pre-existing/environmental CI failures, and outstanding release requirements.

A saved report should let another engineer reproduce each finding without needing the review conversation. Use current source locations, label deleted-side references, redact sensitive values, and state what evidence could overturn a disputed conclusion. In an automated workflow, honor a caller-supplied structured format and represent no findings as an empty finding collection; missing content is an error or incomplete review, never a clean result.
