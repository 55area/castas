# Review the specification

Use this procedure for the first consolidated draft, material revisions and requested specification reviews. The target is what the written artifacts tell a reader to build, verify and operate. For an early draft, review intent and coherence and record which later checks are pending. Assess implementation readiness for a named increment, or for the entire selected scope when that scope must be specified before coding. A standalone review is read-only unless the user asks for revisions.

## Reconstruct before comparing

1. Identify the actual document revision or snapshot, intended increment, canonical files and accessible links. For new specs, cover all five pillars. For changes, follow affected records, including governing companion artifacts. If saving is unavailable, review the assembled draft and mark saved-file and link checks that could not be performed. Record omissions and unavailable sources. Preserve the established layout.
2. Use the saved artifacts and their accessible references to retell a representative journey in your own words. Include the actor, entry condition, normal and consequential failure outcomes, and a boundary or exclusion. For an existing system, also retell what the artifacts say happens today and what will change. For a new system, describe the documented current workaround or say that the baseline is unknown or inapplicable. Point to the records that support the reconstruction. Mark steps you cannot derive and where two readings remain possible.
3. Compare that reading with the actual brief, settled decisions and relevant baseline evidence. An answer known from the interview but absent from the files is a handoff gap. An authoritative link can supply context. If a linked source was unavailable, identify the missing evidence instead of assuming the definition is absent. Preserve the reconstruction even when it exposes no gap.

Label this an author review when done in the drafting session. If a fresh independent review is authorized and available, give the reviewer read-only access to the scoped snapshot, canonical links and requested checks. For the reconstruction, exclude the interview transcript, expected answer and prior reviewer conclusions. Ask for the reconstruction and cited gaps, then compare with the confirmed intent in the authoring session. Record completed and missing coverage separately. If the independent review cannot run, complete the author pass and record the gap if independence was requested or required.

## Follow one increment through the pillars

Use the [quality bar and readiness guidance](../SKILL.md#quality-bar) and select the lenses that affect the next decision. A single cross-pillar trace can expose several gaps:

| Lens | Evidence to seek |
| --- | --- |
| Purpose and scope | Each consequential mechanism supports a confirmed outcome or constraint. Identify a credible simpler or existing approach when added complexity lacks a reason. |
| Behavior and proof | Follow a requirement and its acceptance criteria to a concrete check. Walk a valid case and a meaningful denial, interruption or recovery case. Check that the expected result distinguishes the intended behavior from a credible wrong implementation. |
| Design and operations | Follow effects across owners, permissions, data, dependencies and rollout or recovery. Compare relevant existing interfaces, schemas, configuration and callers at the selected revision. Distinguish observed behavior, accepted contract, future work, and deployed evidence. An absent future feature is expected; a current claim contradicted by evidence needs reconciliation. |
| Handoff | Walk the first dependent task using its scope, contracts, prerequisites, decision authority and completion evidence. Identify the first consequential guess an implementer would have to make. Verify references that claim to exist and label planned paths. Leave reversible implementation choices within their recorded delegation. |

For example, PRODUCT requires queued edits to stay with the original account after a switch. A reader can find the queue schema in PROJECT but cannot tell what a worker does when the account changes just before writing. A PROOF case for normal sync does not resolve that gap. Cite the requirement and worker contract, identify the unresolved commit behavior and the affected task, and add or propose a distinguishing scenario with an account switch before commit. Keep unrelated work available.

## Resolve and recheck

- Combine findings with the same cause. For each material item record the affected ID or section, observed gap or conflicting evidence, consequence, decision owner and next action. Distinguish a confirmed contradiction, a missing input, and an optional improvement. A reviewer suggestion supplies a hypothesis, not product authority.
- Reopen the affected records before editing. Within authorized drafting or revision, fix supported clarifications and references, preserve settled decisions, and escalate consequential choices outside delegation. Record a disposition such as `Fixed and rechecked`, `Pending decision`, `Deferred` with a trigger, or `Dismissed with evidence`. An earlier dismissal applies only while its evidence and scope still hold.
- After repairs, reread the affected chain and check whether the fix added scope, complexity or new contradictions. A changed revision needs rechecking where the result could change. Stop when the selected scope is adequately reviewed and material items are resolved or routed with an owner and gate. If evidence is inaccessible or repairs churn, report what remains and the next useful action. Do not require a fixed number of rounds.
- When writing is authorized, keep a concise review record in PROCESS and link the owning records for decisions and evidence. Use the equivalent section in an established single-file specification. For a read-only review, return findings and coverage in the conversation or in the report explicitly requested. Keep document review, actual acceptance, increment readiness, executed verification and implementation authority separate.
