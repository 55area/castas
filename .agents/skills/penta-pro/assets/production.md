# PRODUCTION

[PRODUCT](product.md) · [PROOF](proof.md) · [PROJECT](project.md) · [PRODUCTION](production.md) · [PROCESS](process.md)

Shared specification state and next action are recorded in [PROCESS](process.md#document-metadata-and-resume-state).

Define how the software reaches actual users and remains usable. Adapt this pillar to the distribution model; a local tool may need installation and upgrade instructions without cloud infrastructure.

Capture consequential operating constraints early enough to shape the solution. Detail deployment, configuration, updates, and recovery using PROJECT's design, then reconcile their checks in PROOF and work in PROCESS. If an operational requirement makes the design infeasible, revisit the affected decision rather than silently dropping the requirement.

## Environments, setup, and configuration

Document required runtimes, services, supported platforms, access, and meaningful differences between development, test, staging, and production. Use isolated test data and credentials. Keep important validation and authorization behavior consistent; document any isolated development exceptions.

| Operation | Command or procedure and verification status | Working directory / prerequisites |
| --- | --- | --- |
| Install dependencies | [FILL IN] | [FILL IN] |
| Configure and start locally | [FILL IN] | [FILL IN] |
| Run checks and build | [FILL IN or reference PROOF] | [FILL IN] |
| Apply migrations and prepare test data | [FILL IN or Not applicable] | [FILL IN] |
| Package, install, or deploy | [FILL IN] | [FILL IN] |
| Recover or restore | [FILL IN] | [FILL IN] |

Do not execute placeholder commands. For each configuration value, record its name, type, purpose, validation, environment-specific default, whether it is secret, and how it is supplied. Keep secret values out of the specification and version control.

## Release, update, and recovery

- Identify the release owner, authorized actions, versioned artifact, target environment, prerequisites, and acceptance evidence.
- Record known limitations with affected users, impact, workaround, planned resolution, and whether they block release or public launch.
- Define rollout steps, user communication when needed, post-release checks, and rollback or roll-forward triggers.
- Describe data migration sequencing and compatibility between versions. Record irreversible changes and recovery limits; reverting application code may not restore prior data.
- Before a consequential cutover, plan a rehearsal with representative state, data volume, and failure points. Define reconciliation criteria, the point of no return, and abort or recovery steps that can actually work. Link rehearsal evidence in PROOF before the applicable release gate.
- Define backup scope, retention, access, restoration procedure, maximum acceptable data loss, and maximum recovery time where applicable. Add point-in-time recovery or equivalent granularity when the data and failure modes require it. Verify restoration and link the evidence under PROOF.
- For installed software or libraries, specify packaging, supported upgrades, compatibility, diagnostics, and removal behavior, including treatment of user data.

| Supported version / platform / consumer | Compatibility commitment | Upgrade / migration / coexistence path | Deprecation or end-of-support trigger | Verification reference |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN: API, ABI, schema, file, device, or runtime as relevant] | [FILL IN] | [FILL IN] | [FILL IN] |

Choose a direct, staged, pilot, canary, flag-based, app-store, package, or other release strategy suited to distribution. Define enable/disable ownership, cohorts, abort signals, user communication, known limitations, and impact on in-progress work. For migrations, specify cut-over, old/new coexistence, validation/reconciliation, downtime if any, and recovery from partial or irreversible steps; do not assume dual writes are required.

Where recovery matters, name recovery time objective (RTO) and recovery point objective (RPO), with scope, rationale, dependencies, and planned exercise. Link the latest actual restoration/rollback evidence, tested revision/data scope, and outstanding gaps in PROOF; mark untested procedures explicitly.

## Launch, documentation, and customer operations

Release authorization asks whether the artifact may be deployed. Launch readiness asks whether real users, support, documentation, and commercial commitments are ready. Use this section conditionally; a local utility may need only installation/removal guidance and a defect-reporting channel.

- Define the launch tier (internal, alpha, beta, early access, general availability) and the evidence required for it. Distinguish launch from technical deployment.
- Identify required documentation and enablement: user, administrator, API, migration, troubleshooting, release notes, in-product help, support macros, and training. Assign ownership, review, localization, and a check that examples work with the released version. For APIs, CLIs, libraries, and platforms, documentation is part of the product.
- Define the support model proportional to actual use: channels, hours, tiers, response or resolution expectations, knowledge base, escalation, and status communication. A written target is not evidence that support is staffed.
- For commercial or multi-user products, cover onboarding/activation, adoption or health signals, renewal and churn reasons, entitlement or billing operations, and the feedback route back into PRODUCT. Do not invent pricing, revenue, or customer commitments.
- Record public announcements, partner or marketplace requirements, and legal or policy notices only where they affect delivery or operation.

## Operation, support, and maintenance

- Define relevant health signals, service-level objectives, capacity assumptions, resource budgets, and cost alerts. Reference the quality targets in PRODUCT.
- Distinguish operational logs from audit records. Specify necessary events and fields, redaction, access, and retention; avoid indiscriminate collection of personal or secret data.
- Assign ownership for alerts, incidents, support, dependency updates, and vulnerability response. Link actionable runbooks and escalation paths.
- Document data locations and access controls, retention/deletion jobs, and operational responsibilities for applicable obligations.
- Define maintenance, deprecation, export, and retirement behavior when relevant. Feed operational findings back into PRODUCT, PROJECT, PROOF, and PROCESS.

| Signal / requirement reference | Indicator, data source, target, and window | Alert / severity / actionable trigger | Owner / response expectation / runbook | Evidence reference |
| --- | --- | --- | --- | --- |
| [FILL IN] | [FILL IN: SLI/SLO where relevant; local diagnostics can suffice] | [FILL IN] | [FILL IN] | [FILL IN] |

Define service-level indicator (SLI) and objective (SLO) formulas, populations, and exclusions when used. Specify sampling, correlation, cardinality/cost controls, and behavior when observability fails. Link thresholds to PRODUCT quality targets, avoiding competing definitions. Define error-budget actions when useful for the service, not as a requirement for all software.

Each actionable runbook identifies symptom/trigger, diagnosis, permissions, safe mitigation, recovery verification, escalation, communication, and follow-up evidence. Incident severity and response expectations should reflect impact and actual support coverage. Record who coordinates an incident and how users/stakeholders are informed; feed causal findings and corrective work into the backlog.

Plan capacity reviews, cost ownership/alerts, dependency inventory, provenance or SBOM where needed, license checks, vulnerability triage, patch targets and response expectations where the project commits to them, emergency fixes, and supported-version policy. Record the usage or cost threshold that triggers scaling or provisioning and the lead time needed to act on it where capacity affects release or readiness. For multi-tenant products, include tenant onboarding/offboarding, isolation checks, export, and deletion. Schedule retention/deletion jobs with failure handling and verification. Connect support and feedback channels to product decisions. Define sunset notice, migration/export, archival/deletion, and disabled integration behavior where applicable.
