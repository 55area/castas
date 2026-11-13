# PRODUCT

[PRODUCT](product.md) · [PROOF](proof.md) · [PROJECT](project.md) · [PRODUCTION](production.md) · [PROCESS](process.md)

Shared specification state and next action are recorded in [PROCESS](process.md#document-metadata-and-resume-state).

## Specification at a glance

- **Problem, audience, and evidence:** [FILL IN: link PRODUCT sources; distinguish hypothesis from observation].
- **Product bet and principles:** [FILL IN: vision, why now, differentiation, and decision heuristics].
- **Expected outcome and guardrails:** [FILL IN: objective/measure references].
- **Selected increment and exclusions:** [FILL IN: requirement/non-goal references; retain future scope].
- **Solution direction and constraints:** [FILL IN: decision references, alternatives, and trade-offs].
- **Principal risks, unresolved decisions, and next action:** [FILL IN: canonical IDs and affected work].
- **Decision or approval requested:** [FILL IN: what the reader must decide; do not infer authority].

Keep this a short linked summary, not a second specification.

Where readers have different responsibilities, give each audience a short route from the summary to the records they need to review and the decision or feedback expected. Use the gate records in PROCESS for actual approvals.

## Glossary

Define ambiguous domain terms, acronyms, units, and overloaded roles once. Identify the domain context when the same word has distinct meanings. Add an example and a counterexample when the boundary changes behavior, and use the agreed terms consistently in requirements and checks. Preserve stable IDs when editing; retire or supersede records explicitly rather than reassigning IDs. Existing project identifiers take precedence over the illustrative prefixes used here.

| Term | Meaning / boundary | Authoritative reference |
| --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN] |

Define the intended value and observable behavior. Technical implementation choices belong in PROJECT; evidence that behavior is achieved belongs in PROOF.

## Strategy, principles, and stopping criteria

Record the product bet before listing features. Keep this concise and conditional; an internal tool may need one sentence, while a commercial product may need a business case.

- **Vision and strategic intent:** What future state should this product create, in one or two sentences, and over what horizon?
- **Why now and why this:** Which change, evidence, or constraint makes this worth doing now, and why is this solution direction credible?
- **Principles and decision heuristics:** Identify the rules that resolve recurring trade-offs and their source. Keep preferences and proposals labeled. When an authorized principle imposes behavior, such as preserving committed data or requiring human review before an irreversible action, link it to a verifiable requirement and acceptance criterion.
- **Business and stakeholder alignment:** Link relevant organizational objectives, funding, contractual commitments, or portfolio priorities where they exist. Do not invent an OKR, business case, or market claim.
- **Alternatives and differentiation:** Compare build, buy, reuse, extend the current process, and do nothing when credible. State why users would choose this option and what would make that advantage temporary or weak. Market size, pricing, and competitive research are conditional, not universal.
- **Success and stopping criteria:** Define what would count as product success, what evidence would invalidate the core hypothesis, and what result should cause the team to stop, narrow, or change direction. These are product decisions, distinct from technical failure handling.

Scope boundaries, users, journeys, and measurable outcomes belong under the next heading. Project selection of the current release belongs in PROJECT.

## Problem, users, and outcomes

- **Problem and current alternatives:** What difficulty exists, and what evidence supports it?
- **Users and stakeholders:** Who uses, buys, administers, supports, or is affected by the software?
- **User journeys:** What tasks should users complete, in which real-world conditions?
- **Value and success measures:** Define the intended outcome, current baseline if known, target, measurement method, and evaluation window. Label untested beliefs as hypotheses.
- **Product boundaries:** Identify included capabilities, explicit non-goals, and unacceptable outcomes even if the software technically works. PROJECT selects which requirements belong in the current release.

## Discovery evidence and user context

| Evidence / hypothesis ID | Finding or belief and affected segment | Source, method, date, and scope | Limitations / contradictory evidence | Related objective / validation plan |
| --- | --- | --- | --- | --- |
| DISC-001 | [FILL IN] | [FILL IN: actual research or explicitly untested hypothesis] | [FILL IN] | [FILL IN] |

For each segment that changes requirements, describe its task, current workaround, frequency/severity of the problem, capabilities, accessibility needs, environment, devices, connectivity, and barriers to adoption. Distinguish user, buyer, administrator, operator, and affected non-user. Personas are optional; do not invent biographies, interviews, or sample sizes.

Explain why this problem matters now and the credible alternatives, including reuse, purchase, or leaving the current process unchanged. Record commercial viability, pricing, procurement, or adoption constraints only when relevant. Compare current and intended journeys and identify how evidence could invalidate the proposed direction.

## Outcomes and measurement

| Objective / measure ID and kind | Definition, population, and unit | Baseline / source and proposed or confirmed target | Window / evaluation owner | Data source / instrumentation | Guardrail and decision trigger |
| --- | --- | --- | --- | --- | --- |
| OBJ-001 / MET-001; user, business, or technical | [FILL IN: formula and denominator if relevant] | [FILL IN: unknown is allowed] | [FILL IN] | [FILL IN: measured locally, manually, or by justified telemetry] | [FILL IN] |

Distinguish leading indicators, eventual outcomes, and guardrails. An operational health metric does not by itself demonstrate user value. Define comparison/baseline, observation window, sample limitations, and what result leads to continue, change, or stop. If a baseline is missing, plan its collection; do not fabricate a target or percentage improvement.

For each required analytics event, specify trigger, schema/version, minimal properties, owner, deduplication, allowed purposes, access, retention, and applicable consent/opt-out behavior. Link the implementation contract in PROJECT and collection checks in PROOF. Do not require network telemetry for local or privacy-constrained products.

## Domain, data, and access

- Define domain terms, actors, conceptual entities, relationships, and business rules using stable identifiers where useful.
- Describe business invariants: conditions that must remain true across operations, including failure and concurrency.
- Specify permissions by role, action, and resource ownership. Include administrative and cross-tenant behavior when applicable.
- Identify data owners, sensitivity, sources, allowed purposes, retention, deletion, export, and applicable obligations. Record the responsible decision-maker for unresolved obligations.
- Describe entity lifecycles, allowed transitions, prerequisites, and visible effects. Add a state diagram when it clarifies complex behavior.

## Privacy, obligations, and inclusive use

- Map relevant data categories to purpose, owner, storage/residency, cross-border transfer limits where applicable, recipients, permitted access, retention, deletion/export, backup treatment, and any consent or permission withdrawal behavior. Link the detailed data contract in PROJECT.
- Record each applicable contractual, legal, licensing, accessibility, safety, or industry obligation with source/version, jurisdiction or scope, responsible reviewer, affected requirements, and required evidence. Applicability and interpretation must be established by the responsible authority; a populated template does not establish compliance.
- Specify accessibility targets and affected journeys, assistive technologies, keyboard/focus behavior, non-visual alternatives, readable content, time limits, cognitive load, and verification method where relevant. Record the chosen standard and version if one applies; do not assume one universal target.
- For localized products, define locales, translation/content ownership, formats, time zones, units/currencies, pluralization, right-to-left behavior, and fallback. Separate document language from product language.
- Identify material misuse, abuse, fraud, physical or social harm, and affected groups. Specify prevention, human review, explanation, appeal, or safe failure where the consequence warrants it. Link threats and hazards to PROJECT and PROOF.
- Where the product can materially affect workers, non-users, communities, or the environment, assess who bears the impact and under what conditions. Consider unequal outcomes, changes to work and fallback access, and resource or energy use. Translate material impacts into requirements, verification scenarios, and an accountable response using the relevant profile.

## Requirements and quality targets

Record functional and quality requirements in one register. If using MoSCoW, put `Must`, `Should`, `Could`, and `Won't in this release` in Priority. Express the required behavior in the requirement, its observable result in acceptance, and the decision state in Confirmation. For example, a proposed export may be a `Should` for the increment while the export contract requires redacting credentials whenever the feature is enabled.

If a project-owned requirements or capability registry is authoritative, use this section as an index to its IDs or stable locators, scope and accepted status. Keep normative definitions and acceptance in that registry. Global objectives, product policies and unresolved ownership remain visible from this pillar.

| ID / kind | Requirement and reason | Source / parent objective or requirement / owner | Priority / increment | Confirmation / lifecycle | Feature / acceptance / proof reference |
| --- | --- | --- | --- | --- | --- |
| REQ-001; functional / quality / constraint | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

Keep each requirement independently interpretable and verifiable. Check that it is atomic, unambiguous, necessary, feasible, and consistent with other requirements. Express behavior in observable terms. If an external obligation or an existing platform fixes part of the implementation, record it as a constraint with its source. Link consequential dependencies, conflicts, and derived requirements to their origins and rationale. Distinguish permanent non-goals from scope deferred to a later increment, and give both IDs when other records need to reference them.

When prioritization or sequencing is contested, record the method and rationale used (for example MoSCoW, cost of delay, value/effort/risk/confidence, or an explicit stakeholder decision). Priority is not the same as release scope, and a high-priority item can still be deferred.

For quality requirement IDs already listed in the register, use the table below to supply measurement details rather than duplicate their definitions. Consider functional suitability, performance, reliability, security, privacy, accessibility, usability, compatibility, localization, maintainability, portability, interoperability, operability, supportability, safety, sustainability, and resource use. These are screening prompts, not automatic requirements. An established taxonomy such as ISO/IEC 25010 may be used as a checklist when it helps, but no standard is mandatory by default.

| ID | Attribute / user journey | Target and applicable baseline or basis | Workload, platform, and measurement window | Proof reference |
| --- | --- | --- | --- | --- |
| [Existing quality requirement ID] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |

For performance, specify the percentile, dataset size, concurrency or request rate, network conditions, and acceptable error rate where relevant. Avoid unexplained numbers such as a universal response-time or coverage target.

## Feature specification — repeat for each coherent feature

For linked feature specifications, point readers to their canonical records through the [coverage index](process.md#coverage-and-authoritative-artifacts).

- **Feature ID and title:** `[FILL IN]`.
- **Purpose and requirement references:** `[FILL IN]`.
- **Useful slice, when work is staged:** Identify the smallest coherent outcome someone can exercise independently. Link its priority rationale, acceptance check, and any prerequisite slice. Distinguish a prerequisite from an independently useful feature.
- **Actors and permissions:** `[FILL IN]`.
- **Preconditions, inputs, and postconditions:** `[FILL IN]`.
- **Main journey:** Describe the steps and observable outcomes.
- **Alternative and failure journeys:** Include invalid input, denied access, unavailable dependencies, cancellation, partial completion, and recovery where applicable.
- **Business rules and state transitions:** Reference the domain definitions; describe feature-specific rules here.
- **Interface behavior:** Specify screens or commands, navigation, inputs, outputs, validation, and relevant responsive or accessibility behavior.
- **UI states, when applicable:** Initial, loading, empty, populated, submitting, success, error, denied, stale or offline, and retry. Specify only meaningful states; optimistic updates require defined failure behavior.
- **Content and design:** Link the approved design system. Include labels, error messages, and accessibility names when exact wording matters. Mark draft copy explicitly.
- **Navigation and interaction:** For relevant interfaces, map entry/exit, deep links, back/undo, focus, interruption/resume, unsaved work, and responsive behavior. For content-driven products, define content sources, publishing/review, translation, ownership, and expiry.
- **First use and activation:** Where relevant, define the initial state, permissions or setup, onboarding or guidance, and the first observable useful result. Do not assume a returning, expert user.
- **Feature lifecycle and availability:** Record the relevant lifecycle state and the planned or actual availability separately. Include cohort, flags, or entitlements where they change who can use the feature.
- **Acceptance criteria:** Assign IDs such as `AC-001`. Describe observable outcomes using Given / When / Then or equally precise statements. Include meaningful negative and boundary cases. For behavior with variable outcomes, define a repeatable evaluation with representative inputs, tolerances or scoring criteria, and a decision rule. Make the criteria usable by someone who did not write the code.
- **Dependencies and unresolved decisions:** `[FILL IN]`.

Use a behavior table when it clarifies complex features; do not repeat simple prose in a second form.

| Situation / AC ID | Input, actor, and prior state | Expected output / effect / next state | Failure, recovery, and irreversible effects | Proof reference |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] | [FILL IN] |
