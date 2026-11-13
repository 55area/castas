# Software Profiles and Conditional Coverage

Use this reference when the software's delivery model or consequences require detail beyond the shared template. Select and combine relevant profiles; they are coverage prompts, not separate document types or a mandatory technology checklist. Keep all five pillars in the specification.

For each selected topic, add the requirement or decision to its canonical pillar and link its verification and operational implications. A short answer, an authoritative contract reference, or `Not applicable` with a reason can be sufficient. Unknown information is `Pending`, not `Not applicable`. Detail the current increment and risks that constrain later work; do not specify every future feature.

Reuse accessible project facts before asking questions. Attribute evidence to its source, recommendations as `Proposed`, and choices within explicit delegation to the agent and its authority. Ask the responsible person about consequential product or operational choices that remain unresolved. Do not invent traffic, accuracy, safety, retention, budget, support, or compliance targets.

## Select the relevant profiles

| Profile or overlay | Apply when | Consequential focus |
| --- | --- | --- |
| [Web, services, and SaaS](#web-services-and-saas) | Users or clients depend on a networked service. | Tenant boundaries, availability, capacity, integration failure, and rollout. |
| [Mobile, desktop, and offline](#mobile-desktop-and-offline) | Software is installed or continues working without a connection. | Device lifecycle, local data, synchronization, updates, and recovery. |
| [CLI and automation](#cli-and-automation) | People or jobs invoke commands with possible external effects. | Input/output contracts, repeatability, cancellation, and unattended execution. |
| [Infrastructure and developer tools](#infrastructure-and-developer-tools) | Software provisions resources, reconciles configuration, or controls build/deployment workflows. | Desired state, drift, destructive effects, reproducibility, and recovery. |
| [Libraries, SDKs, APIs, and platforms](#libraries-sdks-apis-and-platforms) | Other software or developers consume the deliverable. | Public contracts, compatibility, developer experience, and consumer migration. |
| [Data pipelines and analytics](#data-pipelines-and-analytics) | Software ingests, transforms, or interprets datasets. | Meaning, lineage, quality, freshness, replay, and reproducibility. |
| [AI, ML, and agent features](#ai-ml-and-agent-features) | Learned or probabilistic behavior affects results or actions. | Evaluation, uncertainty, data rights, authority, fallback, and change monitoring. |
| [Embedded, IoT, real-time, and physical systems](#embedded-iot-real-time-and-physical-systems) | Hardware, timing, connectivity, or physical effects constrain behavior. | Resource limits, timing, device identity, safe failure, and field updates. |
| [Games and interactive media](#games-and-interactive-media) | Interaction timing, simulation, shared sessions, or content drive the experience. | Responsiveness, state authority, persistence, fairness, and content lifecycle. |
| [Accessibility and localization](#accessibility-and-localization) | People interact with the software, documentation, or outputs. | Supported access needs, languages, formats, and equivalent journeys. |
| [Security, privacy, and abuse](#security-privacy-and-abuse) | Assets, data, privileges, or users can be harmed or misused. | Trust boundaries, data purpose, misuse, controls, and response. |
| [Impact on people and the environment](#impact-on-people-and-the-environment) | Software decisions or resource use can materially affect people or environments. | Affected groups, unfair or displaced outcomes, recourse, and resource limits. |
| [Regulated or contractual delivery](#regulated-or-contractual-delivery) | A known obligation or assurance commitment constrains delivery. | Applicability, accountable interpretation, evidence, review, and retention. |
| [Commercial products, launch, and customer operations](#commercial-products-launch-and-customer-operations) | Pricing, entitlements, billing, public launch, or ongoing customer support shape behavior. | Business model, packaging, launch readiness, documentation, support, and customer lifecycle. |

## Web, services, and SaaS

- **PRODUCT:** Define account and tenant lifecycles, membership, administrator powers, cross-tenant access, and externally visible consistency. If commercial, specify entitlement, billing, metering, cancellation, and refund rules that affect behavior.
- **PROOF:** Cover authorization and tenant isolation, concurrent actions, integration contracts, dependency failure, migration, and load at a stated workload. Separate tested limits from estimates; use isolated effects and representative fixtures.
- **PROJECT:** Record identity and trust boundaries, request and event contracts, expected load and growth assumptions, and per-operation timeout, retry, deduplication, and partial-failure behavior. Identify provider quotas, regional constraints, and degraded modes before selecting infrastructure.
- **PRODUCTION:** Link service indicators to quality targets; define rollout, rollback or roll-forward, capacity and cost signals, actionable alerts, and ownership. State user impact when dependencies or features are disabled.
- **PROCESS:** Identify service and integration owners, incident escalation, and who can change entitlements or enable features. Define access needed for verification without inventing deployment authority.

For service changes with durable writes, external effects, or asynchronous work, [trace one operation](specification-patterns.md#work-through-consequential-operations) from the caller through commit, response, retry, and recovery. Define the outcome when the commit succeeds and the response is lost, even for a synchronous endpoint. For deduplication, determine how callers distinguish a retry from a second intentional operation with identical input. If legacy clients supply no stable operation identity, preserve their documented behavior and record their coverage as a separate decision. [Amazon Builders’ Library on idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

## Mobile, desktop, and offline

- **PRODUCT:** Identify supported devices, operating systems, input methods, permissions, and connectivity conditions. Define behavior when permissions are denied, the app is suspended, local storage fills, or the user changes accounts.
- **PROOF:** Exercise supported platform combinations, upgrade paths, interrupted writes, reconnect conflicts, and recovery after process termination. Use device testing where emulation cannot establish the needed behavior.
- **PROJECT:** Specify which actions work offline, local data protection, authoritative state, conflict resolution, synchronization ordering, and duplicate prevention. Record restrictions of distribution channels and background execution when relevant.
- **PRODUCTION:** Define installation, signed or otherwise trusted update delivery as appropriate, rollback limits, user data migration, diagnostics, export, and uninstall behavior. State how long disconnected versions remain supported.
- **PROCESS:** Assign owners for platform compatibility, packaging, signing, and distribution review when required by the chosen channel. Record access and lead-time dependencies.

For Android or Kotlin Multiplatform, also read the [Android/KMP overlay](android-kmp.md) when platform contracts, shared code or delivery need detail. Keep its answers in the same five pillar documents.

## CLI and automation

- **PRODUCT:** Specify arguments, environment inputs, configuration precedence, standard input/output/error, exit codes, machine-readable output, and interactive versus unattended behavior. Identify destructive effects and any preview or confirmation behavior required by the actual use case.
- **PROOF:** Include golden input/output cases where useful, malformed inputs, broken pipes, signals, permission errors, empty inputs, and interrupted execution. Verify that retries and partial failures do not duplicate external effects.
- **PROJECT:** Define working-directory rules, path handling, encodings, locale dependence, atomic writes, concurrency, idempotency, and resumability. Keep credentials out of arguments or logs where they would be exposed.
- **PRODUCTION:** Define supported shells or runtimes, installation, version reporting, scheduling integration, log retention, upgrades, and recovery. A local tool may have no hosted service, telemetry, or on-call team; record that explicitly when relevant.
- **PROCESS:** Record execution identity, allowed targets, scheduling ownership, limits, and escalation for stuck or repeatedly failing jobs. Specify how a human takes over an interrupted run.

## Libraries, SDKs, APIs, and platforms

- **PRODUCT:** Define consumer groups, supported use cases, discovery and onboarding, public versus internal interfaces, and the promised behavior on invalid use. Consumers may be programs rather than end users.
- **PROOF:** Test representative consumer integrations and supported version combinations, not just internal implementations. Cover compatibility, examples, package contents, and behavior across public error paths.
- **PROJECT:** Specify public types or schemas, error semantics, lifecycle and resource ownership, cancellation, thread or concurrency guarantees, extensibility boundaries, and dependency compatibility. Link machine-readable contracts when they are authoritative.
- **PRODUCTION:** Define packaging and provenance, distribution, versioning policy, support windows, deprecation, migration guides, and withdrawal or replacement of defective artifacts. For plugins, include host compatibility and the permissions or isolation boundary. For open-source or community-facing software, record maintainer responsibility, contribution and review rules, security-disclosure route, support expectations, and governance or funding constraints where they affect sustainability.
- **PROCESS:** Assign public-contract ownership and review of breaking changes. Record consumer notification, migration responsibility, and any compatibility exception authority.

## Infrastructure and developer tools

- **PRODUCT:** Define the operator's intended state, scope of managed resources, observable preview/diff, and behavior for destructive, unauthorized, or conflicting changes.
- **PROOF:** Exercise convergence, repeated runs, concurrent operators, interrupted provisioning, out-of-band changes, and recovery in isolated resources. Verify previews against intended effects without treating a plan as an executed change.
- **PROJECT:** Specify reconciliation, drift detection, state ownership/locking, idempotency, dependency order, provider limits, and partial-failure recovery. For builds, define artifact inputs, reproducibility expectations, caches, provenance, and trust boundaries.
- **PRODUCTION:** Define distribution and upgrades, state backup/migration, audit and diagnostics, credentials rotation, orphan-resource cleanup, and rollback or repair limits.
- **PROCESS:** Record exact environment/account authority, spending limits, escalation, and state handoff. Separate plan, apply, promotion, and deletion permissions where the workflow distinguishes them.

## Data pipelines and analytics

- **PRODUCT:** Define dataset owners and consumers, business meaning, units, time zones, acceptable freshness, and how results inform decisions. Distinguish missing, zero, unknown, and excluded values.
- **PROOF:** Use representative distributions and boundary fixtures; verify totals, invariants, schema compatibility, missing or corrupt input handling, and reproducibility. State the reference result and tolerances rather than assuming numerical equality or statistical significance.
- **Scientific or numerical workloads:** Record model assumptions, units, numerical methods, reference datasets/solutions, convergence and tolerance criteria, random seeds where meaningful, and hardware/dependency sensitivity. Separate reproducible computation from evidence that the scientific model is valid.
- **PROJECT:** Document source contracts, schema evolution, lineage, transformations, quality rules, deduplication, ordering, late-arriving data, and reconciliation. Specify restart checkpoints, replay and backfill behavior, and whether repeated processing is safe.
- **PRODUCTION:** Define freshness and quality signals, lineage availability, quarantine and repair, replay costs, retention, deletion propagation, and downstream notification. Record how corrected historical results are distinguished from previous outputs.
- **PROCESS:** Identify who owns source changes, quality exceptions, metric definitions, and reprocessing decisions. Record required source access and handling restrictions for evaluation datasets.

## AI, ML, and agent features

- **PRODUCT:** Define the user task, acceptable and unacceptable outputs, affected groups, uncertainty presentation, and human review or appeal where consequences justify it. Specify which actions can be automatic and which require a person.
- **PROOF:** Define representative evaluation cases, task-specific scoring, baselines, failure thresholds, and evaluation limitations. Check robustness, relevant subgroup performance, privacy leakage, prompt injection, and tool misuse when applicable; test nondeterministic outcomes with a justified procedure rather than a single favorable sample.
- **PROJECT:** Identify model or provider dependencies, data provenance and usage rights, retrieval sources, prompt/configuration versions, tool interfaces, and resource budgets. Separate untrusted input from authority; specify tool permissions, side-effect boundaries, and fallback behavior.
- **PRODUCTION:** Version the deployed model and surrounding system; monitor outcome quality, drift, latency, usage cost, and abuse using permitted data. Define change evaluation, rollback, fallback, and retirement, including provider changes outside the team's control.
- **PROCESS:** Assign ownership for datasets, evaluation criteria, model or prompt changes, exceptions, and human escalation. Define bounded retries, cancellation, and recovery without repeating external actions. Record the actual authority for autonomous behavior.

## Embedded, IoT, real-time, and physical systems

- **PRODUCT:** State physical operating conditions, timing expectations, operator controls, and consequences of delayed, incorrect, or absent actions. Identify hazardous outcomes and the responsible domain expert when physical safety matters.
- **PROOF:** Identify what simulation can establish and what needs real hardware, hardware-in-the-loop, timing measurements, fault injection, or specialist review. Derive checks from hazards and requirements; do not claim safety from ordinary functional tests alone.
- **PROJECT:** Define hardware interfaces, resource and energy budgets, clocks, timing and concurrency constraints, device identity, connectivity loss, and safe states. Record boot, storage durability, power-loss behavior, and hardware/firmware compatibility.
- **PRODUCTION:** Define provisioning, trusted updates, interrupted-update recovery, fleet visibility, physical servicing, replacement, and device retirement. State recovery limits when a remote rollback is impossible.
- **PROCESS:** Assign hardware, firmware, field-service, and safety decision ownership. Identify equipment, access, traceability, and review dependencies before declaring the affected increment ready.

## Games and interactive media

- **PRODUCT:** Define interaction loops, player or participant goals, accessibility, progression, save behavior, and interruption handling. Where applicable, specify purchases, age-appropriate experiences, moderation, and unwanted interaction controls without assuming a particular audience or policy.
- **PROOF:** Verify deterministic rules where promised, latency and frame-time behavior, save migration, reconnects, and shared-state integrity. Use representative play or interaction sessions to assess usability and experience separately from technical correctness.
- **PROJECT:** Specify simulation and state authority, synchronization, matchmaking/session lifecycle, content formats and ownership, and performance budgets under representative scenes and devices.
- **PRODUCTION:** Define content delivery, session recovery, supported client versions, service shutdown behavior, and support for user-created content if offered. Link abuse or cheating controls to observable requirements and response ownership.
- **PROCESS:** Assign ownership for content, balance or rule changes, moderation, and compatibility across released clients. Record approval needs only where the project actually requires them.

## Accessibility and localization

- **PRODUCT:** Identify affected journeys, supported assistive technologies or input methods, languages and locales, and the applicable accessibility target with its version and source. Consider keyboard/focus behavior, alternatives to sensory cues, readable content, and equivalent recovery paths.
- **PROOF:** Define automated and manual checks appropriate to the target, including assistive-technology or representative-user checks where needed. Test meaningful locale and input combinations; do not label a tool-only scan as complete conformance.
- **PROJECT:** Specify text expansion, bidirectional layout where relevant, date/time/number/currency handling, pluralization, collation, and fallback behavior. Identify who supplies and maintains translations and accessible content.
- **PRODUCTION / PROCESS:** Assign accessibility and translation ownership, regression checks, feedback channels, and correction procedures. Distinguish artifact language from supported product languages.

## Security, privacy, and abuse

- **PRODUCT:** Identify valuable assets, affected people, data purposes, permission boundaries, foreseeable misuse, and unacceptable outcomes. Define notices, user choices, deletion/export, moderation, or appeals only where relevant to the product and actual obligations.
- **PROOF:** Verify selected controls and abuse scenarios, including access denial and recovery. Define authorized security-test scope and isolated data; a threat model is a design artifact, not execution evidence. Add fuzzing, fault injection, or similar techniques where the failure consequence justifies the investment.
- **PROJECT:** Map trust boundaries and threats to mitigations, requirements, and checks. Cover identity, secrets, privileges, tenancy, third parties, data locations, encryption/key ownership where relevant, and dependency or supply-chain exposure.
- **PRODUCTION / PROCESS:** Assign incident and vulnerability response, access review, retention/deletion operation, data-subject access/export/correction/deletion requests, audit access, and disclosure ownership. Record collection purpose, fields, redaction, retention, and access before adding telemetry.

## Impact on people and the environment

- **PRODUCT:** Identify affected users, workers, non-users, and communities. Where decisions affect access, opportunity, or treatment, specify what people need to understand, correct, contest, or escalate. Identify foreseeable harm from automation and the effects of losing a manual channel. Consider the energy or material impact when resource use is consequential.
- **PROOF:** Evaluate representative groups and conditions with lawful, appropriate evidence. Define the expected behavior, comparison and limitations, and a trigger for review or corrective action. Exercise recourse or manual fallback end to end. For material resource targets, state measurement boundaries, workload and baseline.
- **PROJECT:** Map impacts to the decisions, data, and operating conditions that cause them. Compare viable safeguards, human fallback, and resource budgets with an accountable owner. State whose needs or constraints inform the choice and which evidence is missing.
- **PRODUCTION / PROCESS:** Assign a response owner, safe data access, and a route for review and correction. Where appropriate, define follow-up measures, notice or reporting, and when to pause or change the feature. Keep the monitoring plan proportional to the impact and available evidence.

## Regulated or contractual delivery

- **PRODUCT / PROJECT:** Establish which jurisdictions, contracts, standards, versions, and product classifications actually apply, with source and accountable owner. Keep uncertain applicability Pending. Record non-negotiable requirements and the interpretation or specialist review needed; do not infer compliance from a software category.
- **PROOF:** Link each applicable obligation to required artifacts, checks, evidence retention, and the responsible reviewer. Identify any independent assessment or formal assurance the project actually requires, and its limits.
- **PRODUCTION:** Specify operational controls, reporting, record retention, revalidation triggers, support commitments, and retirement obligations. Confirm current authoritative requirements when the project depends on them; this profile supplies prompts, not legal or certification guidance.
- **PROCESS:** Record decision authority, change control, review separation, access restrictions, and traceability only to the extent required by the confirmed obligations. Generated text is not certification, legal approval, or expert sign-off.

## Commercial products, launch, and customer operations

Apply only where the product is sold, publicly launched, or supported as an ongoing service. Do not invent a business model for an internal utility.

- **PRODUCT:** Define the commercial model only where it changes behavior: plans and entitlements, trials, limits and overages, refunds, and the user promise. Identify buyers versus users, procurement constraints, adoption barriers, and the evidence for willingness to pay. Keep pricing, market-size, and revenue claims `Pending` unless an authorized source exists.
- **PROOF:** Verify entitlement boundaries, upgrade/downgrade/cancellation paths, usage or invoice calculations, plan migration, and published documentation examples. A pricing decision or contract is not evidence that the corresponding behavior works. Include support-readiness checks where launch depends on them.
- **PROJECT:** Record billing, metering, tax, entitlement, invoicing, and provisioning implications; payment-provider and vendor dependencies; and the data needed to calculate usage. Include launch dependencies such as documentation, support staffing, training, legal terms, verified analytics, and sales or partner enablement where those channels affect delivery.
- **PRODUCTION:** Define support channels and hours, response expectations, status communication, knowledge base, onboarding/activation, adoption and churn feedback, renewal or expansion, and export/exit. Feed recurring support themes and lost-customer reasons into PRODUCT. For a local tool, a defect-reporting channel and installation/removal guidance may be sufficient.
- **PROCESS:** Assign ownership for launch approval, pricing changes, support escalation, customer communication, and legal or procurement review. Distinguish release authority from launch authority and from authority to make commercial commitments.
