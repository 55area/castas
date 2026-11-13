# Specification Patterns

Use a form below only when the [pillar templates](../assets/penta-pro-template.md) need more detail for a consequential contract, decision, or operational procedure. Fill supported fields automatically with source references; leave unresolved choices `Pending` and recommendations `Proposed`. Incorporate applicable detail into its owning pillar or link an existing authoritative artifact; these forms do not require additional output files.

Keep each record in its existing authoritative location and link it from the specification. Copy only applicable fields; explain non-applicability when it could otherwise look like an omission. Native schemas, headers, trackers, or runbooks can replace these forms. The [worked example](worked-example.md) demonstrates linked records without executed evidence.

## Data dictionary and privacy lifecycle

Use for persisted, exchanged, or sensitive data whose meaning or lifecycle affects behavior. Separate business ownership from the component that stores it.

| Entity record | Value to establish |
| --- | --- |
| Identity and purpose | Entity ID/name, requirement references, business purpose, accountable owner. |
| Authority and provenance | Authoritative system/schema/version; origin, derivation, and lineage across transformations. |
| Relationships | Keys, cardinality, ownership, referential constraints, deletion/cascade behavior. |
| Invariants and concurrency | Conditions that must remain true; atomic updates, conflict handling, consistency guarantees. |
| Evolution | Compatible readers/writers, migration mapping, defaults for old records, reconciliation and recovery limits. |

| Field / path | Meaning, type, unit / encoding | Required, null, absent, and default semantics | Valid / invalid examples and constraints | Classification / lifecycle reference |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN: distinguish missing from an empty value] | [FILL IN] | [FILL IN] |

| Data category / copies | Purpose and applicable obligation reference | Access / sharing / locations | Retention trigger and duration | Deletion / export / consent withdrawal | Owner / verification |
| --- | --- | --- | --- | --- | --- |
| [FILL IN: include derived data, logs, caches, backups where relevant] | [FILL IN: do not infer legal applicability] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Record lifecycle exceptions, third-party propagation, delayed deletion in backups, and what happens if a retention/export/deletion job fails. Link the actual schedule, reconciliation check, and evidence in PRODUCTION/PROOF. Do not copy personal data or credentials into examples.

## Interface contract

Use for an API operation, event, CLI command, library entry point, device protocol, or file format. A shared contract describes observable behavior; it need not prescribe internal implementation.

| Contract record | Value to establish |
| --- | --- |
| Identity | Contract ID/version, owner, provider, consumers, linked requirement/AC IDs, authoritative artifact. |
| Invocation | Operation/address/signature, transport or file encoding, prerequisites, authentication and authorization. |
| Inputs | Schema, units, optional/default values, validation, size/rate/resource limits and their basis. |
| Outputs and effects | Success schema, observable state changes, atomicity, completion semantics, durability. |
| Failures | Error identifier/schema, affected state, retryability, user-visible feedback and sensitive-data exclusions. |
| Time and interruption | Timeout owner, cancellation/deadline behavior, partial completion, resume policy. |
| Repetition and ordering | Duplicate identity/scope/lifetime, replay result, idempotency limits, ordering guarantees and concurrency conflicts. |
| Evolution | Supported versions, breaking-change rule, negotiation/deprecation, migration and fallback. |

Add the transport-specific details that matter:

- **API:** method/path, status codes, headers, pagination/filtering, authorization scope, retry budget and provider rate-limit behavior.
- **Event:** envelope/key, producer and consumer ownership, delivery guarantee, partition/order scope, acknowledgment, replay and poison-message disposition.
- **CLI/library:** arguments/signature, stdout/stderr or return/exception contract, exit codes, determinism, environment variables, ABI/API compatibility as relevant.
- **File/device:** encoding/framing, units/endianness, schema/version marker, truncated/corrupt input behavior, checksums and safe handling of unknown fields.

| Example / AC reference | Exact input and initial state | Expected output / error / final state | Retry or recovery outcome |
| --- | --- | --- | --- |
| [Valid case] | [FILL IN] | [FILL IN] | [FILL IN or Not applicable] |
| [Invalid or boundary case] | [FILL IN] | [FILL IN] | [FILL IN or Not applicable] |

Specify expected behavior before using examples as tests. Distinguish promised behavior from a provider guarantee that still needs confirmation. A generated schema or mock is not evidence that a real provider conforms.

### Work through consequential operations

For an operation that changes durable state, grants access, or has external effects, describe the actor, allowed action and resource, initial state, success state, and observable result. Then examine the relevant interruptions and competing actions. Record choices as proposed or pending until their source or delegation settles them.

| Situation | Decision to specify | Concrete check to plan |
| --- | --- | --- |
| A request times out after the effect might have committed | How the caller discovers the outcome and safely resumes; who owns reconciliation | Commit the effect, suppress the response, then retry or query status. Check the final durable state and total external effects. |
| Two attempts overlap or a message is redelivered | What identifies one operation, where that identity is scoped, its lifetime, and what happens if its payload changes | Submit the same operation concurrently, then reuse its identity with changed input. Compare actual effects to the specified conflict/replay behavior. |
| Access changes while queued work is waiting | Whose authority the worker uses, when permission is evaluated, and who may retrieve the output | Queue work, revoke the actor's access, and exercise processing and retrieval under the chosen policy. |
| An authenticated actor requests another tenant's resource | The required resource-level authority and allowed response and effects | Use two isolated tenants. Exercise reads and writes across the boundary and verify both returned data and durable effects against the access rule. |
| A migration and older clients coexist | Which versions may read and write each state, and when recovery becomes irreversible | Exercise the supported old/new combinations with pre-existing data and interrupt at the consequential migration boundary. |

For example, if a confirmed rule permits at most one reservation per request, a missing response leaves the outcome unknown. A retry check must count reservations and inspect their ownership. A successful retry response alone cannot establish that the rule held. Keep the behavior and criterion in PRODUCT, the operation contract in PROJECT, the planned check in PROOF, ownership in PROCESS, and reconciliation or recovery in PRODUCTION.

## Threat and hazard mapping

Use where misuse, compromise, accidental failure, or unsafe operation can cause material harm. Security threats and safety hazards may share references, but document their different causes; a hazard does not require an attacker.

| Scenario field | Value to establish |
| --- | --- |
| Identity and exposure | Threat/hazard ID, affected people/assets, operation, trust boundary or unsafe operating condition. |
| Cause and sequence | Attacker capability or accidental failure; preconditions and credible path to the consequence. |
| Consequence and assessment | User/data/physical/financial impact, likelihood or exposure basis, uncertainty. |
| Prevention and detection | Control, safe-state behavior, detection signal, requirement/contract references and owner. |
| Response and recovery | Containment, interruption limits, recovery action, escalation/runbook reference. |
| Verification | Negative/fault/abuse scenario, environment, expected result, check/evidence references. |
| Residual risk | Remaining exposure, risk owner, decision/authority, conditions for acceptance and reconsideration. |

Consider control failure and common dependencies, not just the normal control path. Do not imply certification or acceptable residual risk from the presence of this table. Use the project's required analysis method when one applies.

## Decision detail

Use when a decision needs more rationale than its PROJECT register entry. Keep the register as an index to this record rather than a competing account.

| Decision field | Value to establish |
| --- | --- |
| ID / status / date | Stable ID; Proposed / Accepted / Superseded / Rejected; date of actual decision if made. |
| Context and criteria | Problem, affected IDs, hard constraints, evidence, material assumptions and comparison criteria. |
| Evidence and reversibility | Basis (measured, observed, expert judgment, or assumption) and whether the choice is a one-way or two-way door. |
| Options | Credible alternatives, including reuse or retaining current behavior where relevant; benefits and costs. |
| Choice and consequences | Selected or recommended option, rationale, disadvantages, operational effects and follow-up. |
| Decision-maker and authority | Person/agent, actual delegation or policy, scope; unresolved approvals remain explicit. |
| Reconsideration | Trigger, owner, superseded/superseding IDs, and affected artifacts to reconcile. |

An agent can settle a delegated technical choice without claiming that the user selected it. Accepting a decision does not accept the entire specification or prove its assumptions.

## Check and evidence record

Use to plan a check and later attach actual execution evidence. Keep expected outcomes and actual observations separate. Link requirement/AC definitions instead of rewriting them.

| Record field | Planned value or actual evidence |
| --- | --- |
| Identity and purpose | Check ID, requirement/AC/risk references, method, owner and gate. |
| Subject | Planned target; after execution, exact commit/artifact/configuration versions and relevant dependency versions. |
| Conditions | Environment, representative workload, fixture source/version, access prerequisites and limitations. |
| Procedure and oracle | Command with working directory or manual steps, expected result, basis for expected values. |
| Isolation | Side effects, permitted scope, setup/reset/cleanup and any required execution authorization. |
| Execution | Actual timestamp, executor, procedure deviations; use `Not run` until execution occurs. |
| Observation | Actual output, measurement or failure; use `Not observed` until it exists. |
| Result and evidence | Pass / Fail / Unverified; real evidence location and relevant excerpts, with sensitive values redacted. |
| Limits and follow-up | Untested cases, changed conditions, defects, next action, recheck trigger. |

Before execution, result is `Unverified`, execution is `Not run`, and evidence location is `None`. Do not supply a plausible result, commit, log link, or timestamp. If an exception permits a gate to proceed, link its authorized scope and expiry separately; it does not change the underlying check result. Retain historical evidence but reassess its applicability after changes.

## Actionable runbook

Use for an operational action whose diagnosis, authority, state changes, or recovery could be misunderstood. A local utility may need only installation/removal guidance; do not invent an on-call service.

| Runbook field | Value to establish |
| --- | --- |
| Identity and trigger | Runbook ID/version, owner, user-visible symptom or scheduled condition, signal/requirement references. |
| Scope and authority | Affected environment/data, operator access, permitted actions, existing authority and actions outside it. |
| Diagnosis | Read-only observations, expected states, distinguishing causes, safe data to collect. |
| Preconditions | Dependencies, backup/checkpoint if needed, concurrent work and conditions that prevent execution. |
| Action | Ordered procedure, actual commands or linked automation, expected result at each consequential step. |
| Stop and escalation | Unexpected states, safety limits, timeout, accountable responder and communication expectations. |
| Recovery | Rollback/roll-forward/restore route, irreversible effects, user/in-flight-work impact and retry safeguards. |
| Verification | Service/data/user checks, recovery objectives, evidence record, criteria for declaring recovery. |
| Maintenance | Last actual exercise/evidence or `Untested`, supported versions, review trigger and follow-up owner. |

Reconcile observed state before retrying an interrupted operation. A written recovery procedure is a plan until exercised; record its limits and actual evidence in PROOF.

## Release and launch record

Use when a release or public launch needs an auditable decision. Keep one record per release; link requirements, checks, and runbooks instead of copying their content. Deployment, release authorization, and launch authorization may be separate decisions.

| Record field | Value to establish |
| --- | --- |
| Identity and scope | Release ID/version, included requirement IDs, artifact, supported platforms, target environment, owner and date. |
| Known limitations | Affected users, impact, workaround, planned resolution, and whether each blocks release or launch. |
| Compatibility and migration | Supported versions and consumers, schema/protocol changes, upgrade paths, in-flight work, irreversible steps and recovery limits. |
| Verification | Required checks, tested revision, actual evidence, failed or unverified items, and authorized exceptions with scope and expiry. |
| Rollout and monitoring | Rollout strategy, cohorts, enable/disable ownership, post-release signals, abort or rollback triggers, and communication. |
| Launch dependencies | Documentation, support staffing, training, pricing/billing or entitlement checks, legal terms, analytics, partner or marketplace requirements. |
| Authorization | Release and launch decision-maker, authority source, scope, conditions, and date; unresolved approval remains explicit. |
| Follow-up | Post-release evaluation owner and window, known gaps, stop conditions, and next action. |
