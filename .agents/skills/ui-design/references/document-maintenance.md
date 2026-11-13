# Maintaining docs/ui-design.md

Apply this procedure when screen documentation is in scope. Resolve the **target project root**, not this skill package or the filesystem root. The default path is `<project-root>/docs/ui-design.md`. Existing explicit project instructions or user destinations take precedence; report any deliberate alternative. Save partial specification iterations, but a localized implementation or review does not by itself require creating a design document. Update an existing authoritative screen contract when the authorized change affects it; preserve conversation-only and read-only scope.

If the project already maintains a screen specification at a different path, continue that authoritative document unless a path migration is requested. For an authorized migration, preserve its content and update incoming links instead of creating competing specifications.

Read the existing document before writing. Preserve accepted decisions, stable IDs, unrelated screens, manually maintained content and linked artifacts. Adapt the template instead of overwriting the document with a blank copy. For a first interview save the initial partial draft before pausing, with known facts, proposed scope, open questions and next action. At the end of each substantive iteration reconcile and save the cumulative document. If the interaction stops early, retain the draft and label incomplete coverage.

## Ownership and traceability

`ui-design.md` owns the detailed screen/flow/visual contract. Link existing design-system files for canonical tokens instead of cloning their full content. PentaPRO's five files retain ownership of product requirements, proof/evidence, architecture, operation and work execution. Record UI consequences here and propose or make authorized updates in the appropriate owner when a decision changes scope, permissions, data retention, contracts or acceptance. Do not silently resolve conflicts in whichever file was edited last.

Use existing IDs. If none exist, a small scheme such as `UI-S01` screen, `UI-F01` flow and `UI-D01` decision is sufficient. Keep IDs stable after renaming; retire IDs visibly when references still use them. Index screens with platform, purpose, specification/decision status and links. Scope platform differences explicitly; do not duplicate a whole screen merely for a theme or width variant.

Track decision status (`proposed`, `accepted`, `superseded`, `unresolved`) separately from evidence and implementation status. Record who/what supports acceptance; do not invent approval dates or owners. Proposed values can be precise enough to review without being misrepresented as measured or accepted. Avoid an ambiguous global `done` status.

## Update safely

1. Read current document, linked governing records and relevant source. Identify affected screens, flows, shared rules, decisions and checks.
2. Apply the smallest coherent update. Check references from linked flows and shared components; retain known exceptions. A shared-token change needs its consumer impact assessed.
3. Record a brief revision entry: changed scope, decision/evidence basis, unresolved effects and next action. Keep the current specification easy to find rather than accumulating duplicated historical versions.
4. Re-read saved sections and validate local references, ID uniqueness, navigation destinations and coverage. Recheck the file for concurrent edits before replacing it; reconcile instead of clobbering work. For interrupted or partial writes state what persisted and what remains.

Supporting wireframes, images, prototypes or exports are optional and linked with state/platform/version information. Keep essential behavior in the Markdown, so a missing design tool does not erase the contract. Do not create additional mandatory DESIGN.md/EXPERIENCE.md trees. Never put the target project's filled document inside the installed skill folder.

For prototype iterations, record the source manifest/token owner and generated artifact path, stable screen/state routes, themes/windows actually reviewed, illustrative interactions, and pending checks. Keep direction/selection history with the existing decisions rather than creating a competing brief. If resuming a project with an older design brief/prototype tree, preserve and link it, reconcile accepted facts into the existing authoritative specification, and update only the artifacts needed by this request. Generated HTML is a review surface; revise its source and rebuild rather than treating an edited export as the new canonical contract. Publication and responses to other people still require the user's authorization.

For large documents retain a concise index, shared foundations once, per-screen sections and a resume pointer to relevant IDs. Load those sections plus their dependencies; do not silently drop earlier screens to reduce context. Split output into additional files only if the user explicitly chooses a different document contract.
