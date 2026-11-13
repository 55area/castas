# PROOF

[PRODUCT](product.md) · [PROOF](proof.md) · [PROJECT](project.md) · [PRODUCTION](production.md) · [PROCESS](process.md)

Shared specification state and next action are recorded in [PROCESS](process.md#document-metadata-and-resume-state).

Specify how the team will verify requirements and validate that the product serves its users. Define the checks before implementation; collect evidence as work proceeds.

Start with PRODUCT's behavior, acceptance criteria, and known constraints. Refine implementation-specific checks, environments, and procedures after PROJECT and PRODUCTION establish their design and operational details. Keep unresolved prerequisites explicit; a later refinement does not erase earlier expected outcomes or supply execution evidence.

## Acceptance and traceability

Keep acceptance criteria with their canonical feature or requirement record, indexed from PRODUCT. That record may be in PRODUCT or a project-selected specification registry. Link each requirement and criterion to a check and its execution evidence here instead of duplicating its definition.

| Requirement / criterion | Task or change | Verification method | Result | Evidence and tested revision |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN] | Pass / Fail / Unverified | [FILL IN] |

Evidence identifies the tested commit or artifact, environment, relevant data, command or manual procedure, expected and actual outcome, and execution date. A planned check or an unexecuted test remains `Unverified`.

Trace the value chain: objective/discovery → requirement → acceptance criterion → design/contract and task → check/evidence → outcome evaluation. Use canonical IDs or artifact and scenario locators tied to the checked revision. For the selected increment, flag missing or orphan references and report failed, unverified, or stale evidence. Retain historical results with their tested scope. Recheck after changes that affect a result or when the gate requires the exact revision. Where the gate permits prior evidence, document why changed inputs, requirements, or conditions cannot affect the result. Use existing automation for structural checks such as duplicate IDs, missing owners, broken links, or missing verification.

## Verification and validation strategy

- Choose unit, integration, contract, end-to-end, manual, or other checks according to behavior and risk. Define representative fixtures and isolate side effects.
- Use inspection or static analysis for structural constraints and analysis, simulation, or formal methods where they fit the claim or are required. Record assumptions and the limits of each method, including where target hardware or runtime evidence is needed.
- For critical rules, record concrete inputs and expected outputs derived from product requirements, independently of the implementation. Use these examples to check both the software and its tests.
- For tests relied on at a gate, identify a realistic wrong behavior their assertions must detect. Plan fixtures that reach the real subject and observe the required result, including prohibited side effects where relevant. Before accepting execution evidence, confirm discovery, assertion execution, and completion; zero selected tests, swallowed failures, or mocks replacing the claimed behavior leave that behavior unverified.
- For an independently useful slice, name the smallest runnable or observable check that demonstrates its value before later slices are available. For changes to existing software, pair changed-behavior checks with regression checks for compatibility that must be preserved.
- Test important failures and boundaries: denied access, malformed input, duplicate actions, concurrent updates, dependency failures, and partial completion as applicable.
- For UI changes, inspect relevant flows in the running application, including keyboard use, supported layouts, and error recovery. A successful build alone does not establish usable behavior.
- For critical or hard-to-test logic, add techniques that fit the actual risk — property-based tests, fuzzing, fault injection, or controlled load/chaos exercises — when they offer meaningful additional assurance. Record the technique choice and rationale where the consequence warrants it; advanced techniques are an investment decision, not a standing requirement.
- Define reproducible workload and environment details for performance checks. Validate security controls against the selected threat model and applicable requirements.
- Specify how representative users or a responsible stakeholder will validate the intended outcome. Passing technical tests does not establish product usefulness by itself.
- Identify checks that must recur as the system, dependencies, or usage change, such as performance after growth, accessibility after UI changes, dependency vulnerability review, and recovery drills. Record the cadence, owner, and action when a recurring check fails.
- Document the chosen test-first policy and any coverage targets in one place. Coverage is supporting evidence, not a substitute for meaningful assertions or behavioral checks.
- Use independent review for changes that require it. Provide the reviewer with requirements, the actual diff, relevant context, and evidence; review approval does not replace execution checks.

## Executable journeys and specialized evidence

When runtime verification is required, link a repeatable recipe in the project's existing test or runbook structure: launch and usable-readiness check, identified build/instance/account, fixtures and preconditions, public entry/action, expected visible result and durable effect, reset, evidence location, and teardown. A listening port does not establish migrated data or usable authentication. Identify which resources the check owns; cleanup removes only its own scratch state and keeps evidence. This recipe does not require creating another skill or a feature-map document.

For consequential formal/model-based checks, record the property, mapped code/design revision, assumptions, bounds, and checks that actually completed. Revisit the mapping after changes to guards, writers, atomic steps, or recovery paths. A passing obsolete model does not verify current code; a bounded model result is not a proof for arbitrary sizes or the whole deployed system. Plan a distinguishing negative case where useful and feasible, and keep model defects separate from product defects.

For a performance decision, define the workload, timed region, successful-work and error counts, comparable configurations, cache/warmup conditions, repeated runs and variation. Confirm that deferred or asynchronous work finishes inside the claimed interval. Relate a local speedup to the end-to-end task and investigate the actual limiter when claiming a cause. If the difference is within observed noise or the work differs, keep the comparison inconclusive. Do not impose a universal run count or require benchmarks for unrelated changes.


## Risk coverage and test data

| Risk / requirement / AC IDs | Failure or boundary to exercise | Method / environment / data | Expected result / check reference | Owner / evidence or gap |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Select checks for material risks, including migration, isolation, concurrency, recovery, accessibility, security, load, or device compatibility as applicable. Define regression selection for changed behavior and contracts, critical always-run checks, environment differences, and how flaky checks are investigated without silently removing a gate.

Specify fixture provenance, realistic volumes/distributions, edge/invalid cases, privacy protection, reproducible generation/seeds when useful, setup/reset/cleanup, and ownership. Prefer synthetic or appropriately de-identified data; record required access without including credentials. Keep unavailable environments and manual-only checks visible. Define defect severity by user impact, triage ownership, and which severity blocks each gate.

## User validation and experiments

| Validation ID / objective or hypothesis | Method / representative participants or stakeholder | Scenario / baseline or comparison / window | Success, failure, guardrails, and limitations | Owner / decision / evidence |
| --- | --- | --- | --- | --- |
| VAL-001 | [FILL IN: planned or actually recruited; distinguish them] | [FILL IN] | [FILL IN] | [FILL IN] |

Choose usability sessions, prototypes, acceptance walkthroughs, pilots, offline evaluation, or controlled experiments as appropriate. Plan how findings change the product decision and how actual participant/data access will be obtained. Do not equate technical test passes with product usefulness or infer causation from an uncontrolled metric change.

## Quality gates and exceptions

Define the checks required for a task, integration, and release, including their commands and owners. Keep one authoritative set of thresholds. Match checks to the risk and retain mandated project checks.

- Required acceptance criteria pass. A failed or unverified required check blocks the affected gate unless an explicitly authorized exception is recorded below.
- Required build, analysis, tests, and review have evidence for the relevant revision.
- Material findings are resolved; changes after verification trigger the affected checks again.
- Documentation, configuration, compatibility, and operational impacts are addressed.
- Any authorized exception records its owner, rationale, impact, mitigation, and expiry or follow-up. Do not weaken checks silently to obtain a pass.

An authorized exception leaves the underlying result `Fail` or `Unverified`. Record the separate gate disposition and revisit trigger. Check that the decision-maker has authority to waive the specific condition. Keep non-waivable obligations and constraints blocking until satisfied or formally changed by the responsible authority. Link gate ownership in PROCESS.

## Post-release validation

For the released revision and cohort, link product measures and operational signals, observation windows, responsible evaluator, acceptable result, and actions for regressions or inconclusive evidence. Define who may pause rollout, disable a feature, roll back, or schedule follow-up. Schedule the outcome review and record whether the original assumptions held, unexpected user behavior, support and cost impact, and the resulting product or specification changes. Record actual deployment, rollback, restoration, and outcome evidence only after execution; include artifact/data scope, timestamp, result, and unresolved gaps.

## Learning and effectiveness

Track product outcomes alongside delivery indicators such as time to an accepted increment, escaped defects, rework, operating cost, and human interruptions. Record baselines and compare similar work. Use findings to improve the specification and workflow; do not treat generated code volume as a success measure.

For material escaped defects or recurring incidents, record the affected requirement/check references, detection stage, supported causal findings, fix, regression coverage, and an owned prevention action. If the cause remains unknown, retain the uncertainty with the investigation or risk decision and follow-up trigger. Record recovery and longer-term corrective work separately.

When a rule repeatedly fails, consider an enforceable correction at its owning boundary: a schema-derived type, constrained API, lint, runtime invariant, or focused regression check. Select the smallest mechanism that catches the demonstrated failure and preserves valid behavior. A static type cannot enforce changing permissions or external state. Keep judgment-dependent guidance in the specification instead of adding a brittle rule or more duplicated instructions.
