# PROJECT

[PRODUCT](product.md) · [PROOF](proof.md) · [PROJECT](project.md) · [PRODUCTION](production.md) · [PROCESS](process.md)

Shared specification state and next action are recorded in [PROCESS](process.md#document-metadata-and-resume-state).

Define a feasible delivery commitment and the technical blueprint that supports it. This pillar covers more than scheduling: it connects scope and constraints to solution design.

Use PRODUCT's requirements, PROOF's evidence needs, and known operational constraints to compare feasible solutions. Check that the selected design can be verified and operated within the actual resources. Reconcile design-dependent checks in PROOF and detailed operating procedures in PRODUCTION as decisions settle.

## Delivery boundaries and resources

- **Current release:** Link the selected requirement IDs and explain the smallest useful outcome.
- **Milestones:** Define deliverables, dependencies, owners, and deadlines; distinguish fixed constraints from estimates.
- **Resources and budget:** Record available people, tools, environments, development costs, agent usage limits, and expected operating costs. Note material knowledge concentration, single-person dependencies, and backup ownership where they threaten delivery.
- **Decision rights:** Identify who owns product priorities, technical decisions, acceptance, and releases.
- **Trade-offs:** State what takes priority when scope, time, cost, maintainability, or quality conflict. Identify constraints that cannot be traded away.
- **Estimation basis:** Record method, range, assumptions, evidence, and uncertainty; distinguish forecasts from commitments. Include procurement, vendor limits, team availability, and licensing constraints when material.

| Dependency ID / deliverable | Provider / accountable owner | Consumer / affected requirement | Needed-by condition / commitment evidence | Fallback and escalation |
| --- | --- | --- | --- | --- |
| DEP-001 | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

For consequential third-party dependencies, link the actual service commitments, limits, commercial or renewal constraints, and an exit path for replacing the dependency or exporting its data. Record unavailable commitments as gaps with the affected scope.

## Risks, assumptions, and open decisions

| ID / kind | Statement / source | Impact / affected IDs / blocking condition | Owner | Resolution, validation, or mitigation | Needed by / status |
| --- | --- | --- | --- | --- | --- |
| OPEN-001 / question; ASM-001 / assumption; RISK-001 / risk | [FILL IN: one record per row] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Separate evidence from assumptions. Use a limited experiment when a consequential assumption can be tested cheaply. Escalate only the work blocked by an unresolved decision.

- For assumptions: record basis, validation/invalidation method, deadline, and who authorized proceeding if consequential; permission does not prove the assumption true.
- For risks: record likelihood and impact with rationale, prevention, detection/trigger, mitigation, residual risk, and acceptance owner. Avoid unsupported numerical precision.
- For questions: distinguish unknown, undecided, and disputed; identify the decision that depends on the answer and its resolver.
- For spikes/experiments: record question, bounded effort, method, success/failure or inconclusive criteria, expected evidence, owner, stopping condition, and decision enabled. Describe the plan without claiming it ran.
- Track intentional technical/specification debt with consequence, owner, reason, and review/repayment trigger. Do not call deferred blocking work complete.

## Solution architecture and technology

- Describe system boundaries, components, responsibilities, trust boundaries, and data flow. Include a diagram when useful.
- Select the simplest architecture that meets the requirements. Explain significant alternatives and trade-offs.
- Record approved runtimes, versions, frameworks, libraries, storage, and external services with rationale. Inventory existing systems, contracts, data, and platform constraints that the solution must reuse or preserve, with their owner and imposed limitation.
- When feasibility depends on a library, protocol, or provider guarantee, inspect the actual version and applicable primary documentation. Record the guarantee's scope and source. Keep unavailable guarantees as assumptions or open questions with the affected work.
- For existing software, distinguish observed behavior, required compatibility, and intended changes. Identify consumers and older data affected by the change. Link representative characterization checks and regression coverage, and record discrepancies between observed behavior and accepted requirements for resolution. For a material change, identify affected requirements by ID, their proposed additions, modifications, or retirements, and the compatibility boundaries that remain in force.
- Document meaningful decisions with status, requirement links, rationale, consequences, and conditions for reconsideration. An accepted decision can later be superseded explicitly.
- Define module boundaries, repository structure, important conventions, and actual reference implementations. Apply patterns where they solve a demonstrated problem.

| Decision ID / status | Context / affected requirements | Options and trade-offs | Choice / rationale / consequences | Decision-maker / authority / date | Revisit trigger / supersedes |
| --- | --- | --- | --- | --- | --- |
| DEC-001; Proposed / Accepted / Superseded / Rejected | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Record the evidence basis for consequential decisions (measured, observed, expert judgment, or assumption) and whether the choice is a one-way or two-way door. Reversible, low-consequence choices can usually be delegated; irreversible or high-consequence choices need explicit authority and stronger review. Decision acceptance records the authorized decision, not acceptance of the entire specification. Link existing architecture decision records instead of duplicating them. Use context, component, deployment, sequence, state, or entity diagrams when they resolve real ambiguity; no diagram notation is mandatory.

Model expected and peak workload, data growth, resource limits, critical bottlenecks, scaling/degradation strategy, and cost drivers where they influence feasibility. State units and assumptions, distinguish measured values from estimates, and link validation in PROOF and operational triggers in PRODUCTION.

## Data design and integration contracts

For a consequential new boundary, sketch a realistic caller interaction before settling the interface: input, returned value or error, observable effects, and ownership. Include the important invalid or interrupted case. Derive signatures and state variants from that contract; label sketches as proposals, not implemented APIs. Prefer one authoritative schema with derived consumers where feasible. A wrapper or adapter earns its place by hiding policy, representation, or a real compatibility boundary; do not require layers or remove them solely by caller count.

For concurrent writers, decide which state truly must be shared and identify every writer's execution boundary. Independent progress can use separate ownership; a shared balance or unique claim still needs an actual atomicity/coordination mechanism at that scope. A process-local mutex does not coordinate independent processes or services; a type declaration or instruction to serialize work does not by itself establish atomicity. Record behavior after a partial write, crash, retry, and stale claim where these affect the contract.

- Define logical schemas, constraints, identifiers, relationships, and ownership; add physical schema and indexing choices where needed.
- Specify transaction boundaries, consistency requirements, concurrent-update behavior, deduplication, and migration compatibility.
- For each API, event, file format, or external service, identify its owner and authoritative contract. Define schemas, validation, authorization, errors, compatibility, and versioning.
- Specify timeouts, cancellation, retryable failures, retry limits, and duplicate-request handling per operation. Repeated requests must not accidentally repeat irreversible effects.
- Define partial-failure handling and compensation where needed. Distributed transactions, queues, and circuit breakers require a stated reason.
- Identify security threats and map mitigations to relevant requirements and verification checks. Include secret handling, tenant boundaries, and dependency risks where applicable.

Use the [detailed patterns](../references/specification-patterns.md) for data dictionaries, interface contracts, and threat or hazard models when a maintained artifact does not already cover the concern. For instrumentation, link the collection semantics in PRODUCT and operating limits in PRODUCTION. Record any design-specific schema, correlation, redaction, or failure behavior here.

Store details once, link requirement IDs, and flag unavailable vendor guarantees. Use maintainable formats such as OpenAPI, AsyncAPI, schema files, or native headers where appropriate. Verify provider conformance separately.

## Interface and implementation conventions

- For visual interfaces, link the selected visual reference or design system with its approval status: components, tokens, themes, layouts, and accessibility expectations. Mark this not applicable for non-visual products; retain their interface contracts.
- Define project-specific code, dependency, error, logging, and documentation conventions. Distinguish mandatory rules from preferences.
- Explain compatibility constraints and forbidden patterns by their impact. Avoid arbitrary limits that encourage mechanical splitting or unnecessary abstractions.
