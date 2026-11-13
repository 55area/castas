# PROCESS

[PRODUCT](product.md) · [PROOF](proof.md) · [PROJECT](project.md) · [PRODUCTION](production.md) · [PROCESS](process.md)

## Document metadata and resume state

| Field | Value |
| --- | --- |
| Template version | 2.8.1 |
| Product name and one-sentence purpose | [FILL IN] |
| Document owner and decision-makers | [FILL IN] |
| Specification version, updated date, and document status | [FILL IN: Draft / Reviewed / Accepted / Superseded] |
| Target release or increment | [FILL IN] |
| Change context and baseline | [FILL IN: new software, evolution, replacement, or investigation; existing revision when relevant] |
| Repository and authoritative specification files | [FILL IN] |
| Supported platforms and distribution channel | [FILL IN] |
| License and ownership constraints | [FILL IN] |
| Related feature specifications, decisions, and runbooks | [FILL IN] |
| Applicable software profiles and domain concerns | [FILL IN: combine relevant types and overlays] |
| Current specification focus | [FILL IN: discovery / feasibility / implementation / operation; descriptive, not an approval] |
| Next increment readiness | Not assessed |
| Readiness scope, assessor, basis, and date | [FILL IN after assessment] |
| Pending question references | [FILL IN: PROJECT question IDs; identify blockers] |
| Cross-file update state | [FILL IN: Consistent / In progress; affected files and pending reconciliation] |
| Last completed focus | [FILL IN] |
| Next action | [FILL IN] |

`Confirmed` means supported by cited project evidence or a decision made by the responsible person or an agent within explicit delegation. Identify the decision-maker and source of authority; an agent choice is not a user requirement or document acceptance. `Proposed` means a recommendation awaiting a decision. `Pending` means missing, disputed, or unresolved information; link it to an open question in PROJECT. Keep verification results separate: a confirmed requirement can still be unverified.

Assess next-increment readiness as `Not assessed`, `Blocked`, or `Ready for the next increment` against the conditions in PROCESS, with reasons and unresolved question references. Document and readiness statuses describe specification state; they do not authorize implementation, spending, external actions, merge, or release. Record actual authority, its source, and scope under PROCESS.

`Not applicable` means irrelevant for a stated reason. `Unknown` means evidence is missing; `Undecided` means a choice is outstanding; `Disputed` means sources conflict. These are reasons for `Pending`, not evidence of non-applicability. `Deferred` means relevant but scheduled for later, with an owner and trigger; it cannot hide a blocker for the selected increment. An assumption can be authorized for planning while its truth remains unverified.

## Coverage and authoritative artifacts

| Pillar / concern | Disposition | Detail or canonical artifact / revision | Owner | Reason / resolution trigger |
| --- | --- | --- | --- | --- |
| [FILL IN: all five pillars, then material conditional concerns] | Included / Linked / Pending / Deferred / Not applicable | [FILL IN] | [FILL IN] | [FILL IN] |

Record the source of truth for contracts, designs, decisions, test plans, and runbooks. `Included` means the specification covers the concern directly. Use `Linked` when the artifact is accessible, current enough for the decision, and contains the needed detail. Use `Pending` for unresolved applicability or material gaps, including inaccessible or contradictory links, and reference the PROJECT question. For `Deferred`, state when the work returns and who owns it. For `Not applicable`, state the basis for excluding it.

When inline detail becomes hard to navigate or has an independent review or update cycle, use this index or a filtered view to link feature specifications, increment plans, and contracts by stable ID. Record their owner, revision, status, and related requirement or evidence IDs where useful. Keep the shared outcomes, scope, requirements, and cross-feature decisions findable from the relevant pillar files. Generate machine-readable views only for a real consumer, with a defined synchronization rule.

## Revision history

| Version / date / author | Material change and reason | Affected IDs / artifacts | Decision or acceptance reference |
| --- | --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN: none if not accepted] |

Link existing version history where sufficient; record semantic changes and supersession, not every wording edit.

## Identifiers and status vocabulary

Use stable identifiers for records that are referenced, reconciled, or checked. Reuse existing project prefixes; those below are defaults, not a required scheme.

| Prefix | Typical record | Authoritative home |
| --- | --- | --- |
| `DISC`, `OBJ`, `MET` | Discovery finding, objective, measure | PRODUCT |
| `REQ`, `AC`, `FEAT`, `NG` | Requirement, acceptance criterion, feature, non-goal | PRODUCT |
| `ASM`, `OPEN`, `RISK`, `DEC`, `DEP` | Assumption, open question, risk, decision, dependency | PROJECT |
| `CHECK`, `VAL`, `EVID` | Planned check, validation activity, execution evidence | PROOF |
| `TASK`, `REL`, `RB` | Task, release, runbook | PROCESS for tasks, PRODUCTION for releases and runbooks |

These status vocabularies are distinct and may coexist:

| Dimension | Values | Meaning |
| --- | --- | --- |
| Document | Draft / Reviewed / Accepted / Superseded | State of the specification itself. |
| Statement confirmation | Confirmed / Proposed / Pending | Basis for believing a requirement or decision. |
| Record lifecycle | Active / Deferred / Superseded / Retired | Whether a record still governs current work. |
| Verification | Pass / Fail / Unverified | Result for a stated revision and procedure. |
| Readiness | Not assessed / Blocked / Ready for the next increment | Whether the selected increment is sufficiently specified to proceed once authorized. |
| Decision | Proposed / Accepted / Superseded / Rejected | Authority and current applicability of a choice. |
| Availability | Project-defined stage and cohort | Who can use a feature or release, for example pilot, generally available, or deprecated. Record actual authority separately in PROCESS. |

Do not collapse these into a single `done` or `approved`. A confirmed requirement can be unverified; an accepted decision can later be superseded; readiness does not grant implementation, spending, merge, or release authority. Never reuse a retired identifier. When confidence changes a decision, record its basis (measured, observed, expert judgment, or assumption) and whether it is a one-way or two-way door; reversible low-consequence choices can be delegated, while irreversible or high-consequence choices need explicit authority.

A **material** statement or change is one that could alter scope, behavior, acceptance, design, authority, cost, or operations. A **blocking** condition prevents the selected increment from proceeding or the specification from being accepted; routine choices within delegated authority are neither.

Define how people and agents transform agreed work into a reviewed change. PROOF defines the evidence required at each gate; PRODUCTION defines operational actions.

## Development cycle — repeat for each increment

PROCESS governs the entire cycle. Consult relevant material from all five pillars for each task; their document order is not a sequence of execution phases.

Although PROCESS appears last in the preferred presentation, record authority, ownership, shared state, and the next action throughout the interview. Complete the execution plan from the product, verification, design, and operational work identified in the other pillars.

Define the project's cycle from selecting an outcome and preparing checks through implementation, review, integration, and authorized release. Identify the required evidence and responsible role at each transition. Recheck affected behavior after fixes or integration, and feed feedback into tracked work and the relevant pillars.

| Stage / handoff | Responsible worker / accountable decision-maker | Input and output artifacts | Gate / evidence reference | Escalation or backup |
| --- | --- | --- | --- | --- |
| [FILL IN: actual workflow, including feedback] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Use a formal plan when complexity or uncertainty warrants it. Planning-only requests produce investigation and a proposal; they do not authorize implementation. Define any required plan approval explicitly.

Record whether specification readiness is required for the entire selected scope before coding or for each increment before its implementation. If the project distinguishes exploratory work from maintained delivery, define what evidence and authority are needed to adopt an experiment. Use the existing workflow and gates.

## Increment readiness, authority, and completion

Assess these conditions for the selected increment. When the entire selected scope must be specified first, assess all of it before handing off implementation. Retain unresolved items with owners and scope.

- Outcome, users, selected scope, exclusions, and evidence/hypotheses are explicit.
- Behavior, permissions, important failures, quality constraints, and observable acceptance criteria are sufficient for implementation.
- Necessary design, contracts, dependencies, feasibility, privacy/safety concerns, and operational constraints are resolved or covered by explicitly authorized assumptions with validation plans.
- Required checks are feasible; environments, access, representative data, and responsible roles are available when needed. A missing prerequisite for the next work is a blocker; future release evidence may remain planned.
- Blocking questions/conflicts are resolved; deferrals have no hidden dependency in this increment.
- Material prerequisites resolve to usable records with adequate detail and applicable status. If a prerequisite changes, reassess dependent checks, tasks, and gates.
- Ownership, handoff, and exception or escalation rules are known. Identify who can authorize execution and record actual authorization separately. An implementer can proceed without guessing consequential product decisions once authorized.

Mark `Blocked` if any unmet condition prevents this increment; record what would unblock it, who owns the resolution, and any project-defined response expectation. Do not label routine choices within delegated authority as blockers, and do not convert a count or percentage of completed sections into readiness.

For example, a fully specified local parser can be `Ready for the next increment` while its planned software tests remain `Unverified` and document acceptance is pending. If its overflow behavior is undecided and affects the selected inputs, that increment is `Blocked`. If release signing access is needed only for later distribution, record that dependency at the release gate. Reassess if the selected work requires signing earlier.

Before recording specification acceptance, review the selected revision. Check coverage dispositions and canonical links, sources and observable acceptance for scoped requirements, feasible planned checks for scoped `Must` requirements, and measurement details for scoped quality targets. Identify any gaps, their owners, the affected increment or gate, and the needed-by point. Record what the responsible person actually accepted, including scope, revision, date, and conditions. A review can find the document coherent while the increment still has a blocker. Assess its readiness and authorization separately.

For the first consolidated draft or a material revision, record the reviewed document revision or snapshot, affected scope, review method (author or independent), coverage gaps and a brief journey reconstruction or link to it. For material findings, record the affected IDs, consequence, disposition, owner and next action using existing records where possible. Mark a repair verified only after rereading the changed records and their affected links. Keep the review result separate from the acceptance and implementation gates below.

Make the handoff usable without the original interview. Record the baseline, affected IDs, settled decisions, next allowed action and remaining evidence. For a blocked increment, identify the decision or evidence needed to proceed. If a linked contract is inaccessible, state which conclusion still depends on it.

| Gate or authority | Responsible assessor / decision-maker | Required basis | Actual state / source / date / scope |
| --- | --- | --- | --- |
| Specification reviewed / accepted | [FILL IN] | Review findings resolved or recorded; actual acceptance by responsible person | [FILL IN: no acceptance inferred] |
| Increment ready | [FILL IN] | Checklist above and material assumption decisions | Not assessed |
| Implementation / spending / external actions authorized | [FILL IN] | Actual request or policy and its limits; separate actions as needed | [FILL IN: existing authorization remains valid] |
| Task done / integration eligible | [FILL IN] | Applicable PROOF checks, review, documentation, and addressed impacts | [FILL IN: not assessed before execution] |
| Release authorized | [FILL IN] | Release evidence, operational readiness, accepted exceptions, actual authority | [FILL IN] |
| Launch or public availability authorized | [FILL IN] | Applicable docs, support, training, communications, pricing/billing, legal terms, analytics, and on-call readiness | [FILL IN or Not applicable] |
| Post-release outcome evaluated | [FILL IN] | Planned observation and actual evidence linked in PROOF | [FILL IN] |

These records do not impose a new approval ceremony. The same person may own several roles; honor authority already granted. Completion of a coding task need not mean deployment, and a ready specification does not mean verified software.

## Task definition

A task is ready when its goal, scope, acceptance criteria, dependencies, necessary contracts, and decision authority are sufficiently clear. A task should deliver a verifiable increment; avoid splitting work solely by technical layer when that prevents usable outcomes.

When sequencing a material change, choose the first slice that exercises the riskiest applicable contract through a real entry point. Name the result, the check that can observe it, and the dependencies required to run that check. Mark setup work as a prerequisite until its dependent behavior is verified.

If an active change or existing tracker already owns execution tasks, link that list here and apply these conventions to its records. Do not create a parallel checklist with independent completion states. Shared readiness, authority and unfinished cross-document reconciliation remain recorded in PROCESS.

| Task field | Required information |
| --- | --- |
| Identity and outcome | Task ID, requirement references, user-visible result, and out-of-scope work. |
| Inputs | Relevant source files, specification sections, contracts, and prior decisions. |
| Execution | Owner, dependencies, permitted changes, and relevant environment. |
| Completion | Acceptance references, required checks, review requirements, and handoff location. |

Use these checks as a project-adaptable definition of ready and done, not a universal ceremony:

- **Ready to start:** the outcome and scope are clear; relevant requirements are confirmed; acceptance criteria are observable; dependencies, contracts, environment, and test data are available; blocking decisions are resolved or explicitly out of scope; execution authority is known.
- **Done for this task:** required behavior is implemented; applicable checks pass for the actual revision; acceptance evidence is recorded; review and documentation updates are complete; configuration, migration, compatibility, and operational impacts are handled; handoff is recorded. Done does not automatically mean deployed or launched.
- **Specification acceptance:** Record the responsible person's actual acceptance, including scope, revision, date, and conditions. Document coherence is a review result. Assess increment readiness separately against the checklist above.

## Agent responsibilities and authority

- Define concrete responsibilities, inputs, outputs, and tool access for implementation, review, and coordination. Use separate roles only when useful.
- Record permitted local edits, external actions, costs, merge authority, and release authority. Do not infer permission to deploy from permission to implement or merge.
- Continue authorized work without repeatedly requesting the same approval. Group non-blocking questions; escalate material scope changes or unresolved high-impact decisions.
- When running work in parallel, record dependencies and ownership, isolate conflicting changes, limit concurrency, and define the integration order.
- Set time, cost, and retry limits for automated runs. Define escalation conditions, cancellation behavior, and how work resumes without duplicating external actions.
- Keep durable task status, decisions, blockers, and evidence in the existing tracker or agreed file. Avoid maintaining contradictory task lists.
- Identify accountable owner, worker, backup/escalation, material-change boundaries, and response expectations when needed. Use human-only or mixed workflows without requiring agents.
- For automated work, specify input/context versions, output/schema expectations, acceptance rubric, consequential human checkpoints, usage budgets, and fallback if a model, tool, or skill is unavailable. Use independent evidence for generated claims. Record useful run/tool/decision traces with redaction and retention; do not require private model reasoning. Where generated or reused code is subject to provenance or licensing constraints, record those constraints with the review they require.
- On interruption or cancellation, save completed work, pending side effects, evidence, ownership, and a safe resume step. Reconcile actual external state before retrying; avoid duplicate actions.

## Context, skills, and change control

- Keep `AGENTS.md` focused on durable instructions and navigation. Store detailed requirements, feature specifications, decisions, and runbooks in their authoritative locations.
- Load the context needed for the current task. Identify source, version, and status when retrieving external or historical material; distinguish reference content from authorized instructions.
- Maintain a small registry only for skills and tools actually selected for the project: source/version, availability, trigger, inputs, outputs, permissions, and fallback if unavailable.
- Define the actual branch, commit, review, and CI conventions. Do not assume a branch name, installed skill, file path, or approval policy.
- When requirements change, assess affected tasks, contracts, tests, and operations; update their references and record the decision.
- At handoff, report changes, verification results, unresolved issues, and the exact next action when one is needed.
- Provide a short onboarding route through the authoritative specification, setup, sample task/check, current decisions, and escalation contact. Link the existing contributor guide when available.
- Define communication channels, decision turnaround, review cadence, and cross-team sync only where coordination needs them. Use the project's actual branch/CI baseline with rationale, not an assumed universal workflow.
- For a material change, identify source/reason, affected objectives and requirements, design/contracts, checks/evidence, schedule/cost, operations, and authority; record accepted/deferred/rejected disposition, update authoritative artifacts, and invalidate stale results. Track unresolved specification debt with owner and resolution trigger.
- When owners disagree or instructions conflict, record the arbiter, decision criteria, and expected resolution point. Pause only the work that depends on the unresolved choice instead of continuing on contradictory assumptions.

### Project rules and amendments

When binding project rules affect multiple pillars, link their authoritative source and revision. For each applicable rule, identify its scope, rationale when needed, accountable owner, affected records, and the check or gate that enforces it. Distinguish binding rules from preferences and proposed amendments. Keep product-specific requirements in PRODUCT and technical constraints in PROJECT.

If a rule has no existing authoritative home and the project needs to record it, keep its concise definition and authority here. For an amendment, use the project's decision and versioning policy. Record the previous rule, approved change or pending proposal, effective scope and date when known, and affected records and gates in the revision history. Review dependent checks, conventions, and open work before marking the amendment reconciled. An unresolved conflict or unauthorized exception stays visible at the affected gate.
