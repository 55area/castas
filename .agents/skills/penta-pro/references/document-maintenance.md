# Maintaining the Five-Pillar Specification

Use for creation, updates, resumption, or requested migration to the five-file layout. Paths below are relative to the project's root. Preserve explicitly requested locations and existing authoritative documents.

## Ownership and navigation

| File | Owns |
| --- | --- |
| `docs/product.md` | Product summary, glossary, objectives, requirements, and acceptance criteria. |
| `docs/proof.md` | Check plans, requirement-to-evidence links, actual results, and outcome evaluation. |
| `docs/project.md` | Architecture, contracts, dependencies, risks, assumptions, open questions, and decisions. |
| `docs/production.md` | Environments, distribution, migrations, operations, support, and recovery. |
| `docs/process.md` | Shared specification metadata, coverage, identifier conventions, revision history, resume state, tasks, gates, and authority. |

Keep sibling navigation in each file and link specific records using their stable IDs and valid anchors. Record a fact once and reference its owner. For example, a check in `proof.md` links its acceptance criterion in `product.md` and its contract in `project.md`. Define stable headings or explicit anchors where record-level navigation is needed. Existing external schemas or trackers can remain authoritative.

Use PRODUCT → PROOF → PROJECT → PRODUCTION → PROCESS for new presentation and interview deepening. An order change alone does not require rewriting an existing specification or reopening settled decisions. Resume from PROCESS and follow affected dependencies; retain established locations and IDs.

For a first specification using the default layout, create all five files with supported content and explicit gaps. Small projects can have short pillars. Keep the template index as authoring guidance in the skill package. Remove drafting links and placeholders from the generated project files. Before writing, inspect any existing files at the destinations and resolve ambiguous ownership.

## Screen specifications and other companion artifacts

When a maintained screen specification such as `docs/ui-design.md` exists, keep it as the canonical home for detailed layouts, component states, interaction behavior and screen-specific acceptance. PRODUCT retains product requirements, business permissions and acceptance at the feature boundary; link the screen records rather than copying them. PROOF indexes the required checks and their actual evidence, wherever that evidence is maintained. PROJECT references the design system and implementation contracts, while PROCESS records artifact ownership and any unfinished reconciliation. Do not create a companion file merely because a template mentions one; the default PentaPRO output is still the five pillar files.

Compare the companion's actual scope and decision status with the product requirement. For example, an offline-only product and a screen labeled “Synchronized to cloud” conflict even if both documents are marked accepted. Identify the affected requirement and screen IDs, sources, and decision needed. Do not silently introduce cloud infrastructure or change a settled requirement to match the screen. Apply a resolution supported by current authority; otherwise leave only the dependent work blocked. If editing the companion is outside scope, record the exact pending reconciliation rather than claiming the whole set is consistent.

## Existing change and specification workflows

When the project already uses a maintained requirements/change system, establish which records are authoritative before filling the templates. Examples include capability specifications and active change tasks in OpenSpec, an existing requirements registry, or accepted tracker records. The presence of a tool alone does not select its authority; use the project's stated ownership and actual artifacts. This is conditional integration, not a requirement to install or initialize another framework.

When a five-pillar specification is in scope, use it for global context and navigation. PRODUCT links capability requirements and acceptance by their canonical IDs or stable locators. PROOF links their checks and revision-specific evidence. PROJECT holds global architecture and points to relevant change designs or durable decisions. PRODUCTION retains operating constraints and procedures. PROCESS points to the active change/task list and records shared readiness, authority, ownership and unresolved reconciliation. Keep requirement definitions and execution tasks with their existing owners.

For an external requirement without an ID, record its canonical artifact, capability, requirement title, and scenario when useful. Include the change or revision in verification records. A local ID may serve as a navigation alias. When a requirement is renamed or consolidated, update current pointers and retain the old reference with historical evidence.

An accepted schema, policy, state model or behavioral test can own a precise part of the contract. Verify what the project treats as authoritative and link the exact artifact, scope and revision. Record the intent and constraints that artifact cannot express in the owning pillar. If the project maintains generated outputs from an authoritative source, record its generation and verification workflow in PROJECT and link the checks in PROOF.

Distinguish the current baseline, a proposed or accepted change, and deployed behavior. A planned requirement or checked task is not execution evidence; a consolidated specification is not proof that a release containing it reached users. Preserve previous evidence with its tested revision. When a decision changes, reconcile affected canonical records under the existing authority and link the new state from the pillars. Do not infer authority from a later file timestamp, duplicate an entire requirement to fill a template table, or silently broaden an accepted change.

If a required external record is inaccessible, contradictory, or insufficiently detailed, mark the affected concern `Pending` and name the smallest missing input or reconciliation. Do not synthesize a replacement copy and then treat it as authoritative. When no external canonical workflow is selected, use the ordinary PentaPRO templates and ownership defaults.

### Example with an accepted OpenSpec change

For an approved change named `tenant-receipts`, PRODUCT points to the `Receipt retries` requirement and affected scenarios in the change delta. PROJECT links the change's design decisions. PRODUCTION records any durable storage or rollout constraints that apply to the project. PROCESS links the accepted change, its task list, acceptance decision, and next pending check. PROOF maps the scenarios to the handler checks, their observed results and the tested snapshot. For example, the conflicting replay scenario needs a 409 response and unchanged job state. If the tests have only been planned, record them as pending even when OpenSpec validates the delta and its planning artifacts are complete.

When resuming, reopen the active change and the latest relevant source. If the accepted scenario or implementation changed after the last check, keep the prior result tied to its snapshot and identify what needs rerunning. Update the owning record when the project accepts a changed decision. After the project synchronizes and archives the change, point ongoing PRODUCT references to the maintained capability spec and retain historical evidence against the tested change. [OpenSpec default schema](https://openspec.dev/docs/schemas/spec-driven)

## Coordinated updates and resumption

1. Read `process.md` for current scope, next action, shared status, and any unfinished update. Then inspect the affected pillars and their referenced records. For an existing single-file specification, read its equivalent resume section.
2. Identify the changed canonical records and downstream consequences. A requirement change may affect contracts, verification, tasks, and operating procedures. Update only files whose content or references need to change.
3. Before a material multi-file update, record `In progress` in PROCESS with affected IDs/files and remaining reconciliation. Save changes to the owning records, preserve unrelated edits, and reconcile their references. If concurrent edits are detected, inspect and combine them before writing.
4. Check target files and anchors, cross-file IDs, affected acceptance/check links, evidence applicability, and conflicting statuses. Preserve historical evidence and acceptance scope. Mark changed or unreviewed scope accurately.
5. After successful reconciliation, record the shared revision, change summary, and `Consistent` in PROCESS. Reassess readiness for the affected increment and save the next action. Consistency describes the documents and can coexist with pending questions or unverified software.

File writes may complete only partly. If interrupted, leave a durable record of which files were updated and what remains, and disclose partial saving. Resume by inspecting actual contents before completing the pending update. A partially reconciled set cannot be reported as fully updated or newly accepted. Preserve prior acceptance as history tied to its actual scope and revision.

## Baseline and proposed changes

For a material change to existing software, compare the request with accepted requirements, observed behavior, and related work already in progress. Record the baseline revision or state in PROCESS and link any conflict or overlap that could affect delivery. In PROJECT, summarize the intended additions, modifications, and retirements by canonical PRODUCT ID, with the reason, affected consumers or stored data, and compatibility commitments. Link changes to contracts, planned checks, tasks, and operating procedures in their owning pillars.

Keep a pending proposal separate from active requirements within the same files. Apply settled changes to the owning records, retaining stable IDs where identity remains the same and recording supersessions or retirements. Preserve previous acceptance and evidence with their original scope. If a compatibility commitment is still undecided, record who can resolve it and which work depends on it.

## Existing specifications and migration

An existing `docs/penta-pro.md` or another authoritative layout remains supported. An ordinary update preserves it. Migrate when the user requests the split or authorizes migration of that specification.

For migration, inventory sections, IDs, incoming links, decisions, evidence, and local customizations before moving content. Assign each record to its owning pillar, move shared state to PROCESS, and preserve all material content. Rewrite internal and discoverable incoming links and verify them from the new locations. Record uninspectable external references as migration limitations. Reconcile the five-file set before changing which location is authoritative.

Keep the old path as a short navigation page with forwarding anchors where existing links need them, unless its removal is authorized. It must point to the new canonical files and avoid retaining competing copies of requirements. The normal new-project output remains the five pillar files.
