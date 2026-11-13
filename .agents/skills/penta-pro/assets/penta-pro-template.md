# PentaPRO Specification Templates

**PRODUCT · PROOF · PROJECT · PRODUCTION · PROCESS**

Describe the product, solution, evidence, working method, and operation across its lifecycle, with implementation detail for the next useful increment. Keep detailed supporting material in linked project documents.


| Pillar | Guiding question | Primary responsibility |
| --- | --- | --- |
| PRODUCT | What should we achieve, for whom, and why? | User needs, behavior, business rules, and quality expectations. |
| PROOF | What evidence will show that the solution works and is useful? | Verification, validation, traceability, and acceptance evidence. |
| PROJECT | What solution will we deliver, within which constraints? | Delivery commitments, resources, risks, and solution design. |
| PRODUCTION | How will people install, use, operate, and recover the software? | Environments, releases, monitoring, maintenance, and recovery. |
| PROCESS | How will people and agents carry out the work? | Workflow, responsibilities, context, and execution boundaries. |

PROJECT includes both delivery planning and the technical blueprint. PROOF means evidence-based confidence, not mathematical proof. PRODUCTION applies to deployed services, installed applications, command-line tools, and distributed libraries.

Use this order for presentation and interview deepening. Gather consequential operational and delivery constraints early; refine PROOF after design and operational decisions. PROCESS records authority and resume state throughout. Reconcile affected pillars before handoff rather than treating the order as fixed execution phases.

## Authoring guidance

- Replace `[FILL IN]` with supported project content or an explicit gap. Remove drafting instructions, sample rows, and unused forms from the deliverable. Keep the coverage decisions.
- For specification-only work, plan product verification and operational actions; execute them only when the user's task authorizes execution. Reuse actual existing evidence and keep unexecuted checks `Unverified`. Template prompts grant no execution authority.
- Check links from the final document's location. Replace links to authoring resources with the relevant project artifact or remove them after incorporating the needed details.
- Identify consequential statements as requirements, constraints, decisions, or assumptions, and record their confirmation status: `Confirmed`, `Proposed`, or `Pending`. Examples and placeholders are not approved requirements.
- Resolve blocking uncertainty for the next deliverable. Record other open questions with an owner and a point by which they must be answered. Do not invent missing targets, tools, or approvals.
- Specify the first usable increment and high-risk behavior in detail; refine later work as evidence emerges. A prototype or technical experiment may resolve uncertainty before implementation.
- Keep each fact in one authoritative location. Use stable IDs and links rather than repeating requirements across pillars.
- Keep artifacts in clear English. Define supported user-interface languages separately under PRODUCT.
- Screen every pillar and relevant software or domain concern. Use a concise answer, a maintained link, or an explicit reason for a gap, deferral, or non-applicability. A small project can still have high safety, privacy, or financial consequences.
- Choose depth by consequence and stage. A low-risk internal increment may need only concise answers and links; a consequential system needs explicit contracts, threat and failure analysis, recovery evidence, and specialist review. Stop expanding a section when more detail would not change the next decision, check, or operating action.
- A useful minimum for any increment is: intended outcome and evidence, selected scope and exclusions, observable behavior and acceptance criteria, material design and dependency decisions, planned checks, execution authority, and how the result will be released, operated, or removed. Add conditional detail where consequences require it.
- Preserve existing project conventions for identifiers, artifacts, statuses, and authority. The prefixes and state vocabulary in PROCESS are defaults for clarity, not a reason to rename an established register.
- Automatically fill supported facts and delegated choices with provenance. Label inferences and recommendations; ask about consequential missing decisions. Never invent research, numerical baselines, legal applicability, resources, or execution evidence.


## Output files

For a first specification using the default layout, adapt these five templates into `docs/` relative to the project root. This index is an authoring resource. The generated specification consists of the five pillar files.

| Template | Project destination | Canonical content |
| --- | --- | --- |
| [PRODUCT](product.md) | `docs/product.md` | Summary, domain glossary, outcomes, requirements, and acceptance criteria. |
| [PROOF](proof.md) | `docs/proof.md` | Verification plans, traceability, actual evidence, and outcome evaluation. |
| [PROJECT](project.md) | `docs/project.md` | Design, contracts, delivery constraints, risks, questions, and decisions. |
| [PRODUCTION](production.md) | `docs/production.md` | Distribution, configuration, operation, support, and recovery. |
| [PROCESS](process.md) | `docs/process.md` | Shared document state, coverage, identifiers, history, resume state, tasks, and authority. |

Use one integrated interview and populate supported content across the set. Keep a concise disposition in a pillar even when little detail applies. Preserve existing project documents and requested locations. Read [document maintenance](../references/document-maintenance.md) for updates, partial writes, or migration.
