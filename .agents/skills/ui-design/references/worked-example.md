# Worked example: two-screen Android task flow

Illustrative specification excerpt, not an accepted project decision, executed test or user study. It demonstrates the amount of detail needed to expose decisions; real values and contracts come from the target project. Conversation may be Portuguese while specification prose is English and product strings follow the chosen locale.

## Context and scope

A native Android field-notes app has Compose and an existing theme. The requested increment lists notes and edits a note. Backend retry semantics and draft-retention policy are unknown. Specification only; no product code changes. The actual output would be `<target-project>/docs/ui-design.md`.

## Shared foundation

Use the existing theme and component library; exact token bindings pending source access. Proposed product locale: pt-BR. Show content with scalable text, accessible control names and native target sizes. Adapt list/detail arrangement to available window width when tablet support is confirmed. Permission checks remain the backend/domain owner's responsibility.

| Screen | Task / entry | Decision state |
| --- | --- | --- |
| UI-S01 Notes | Find a note; initial destination | Proposed |
| UI-S02 Edit note | Edit selected note; entry from UI-S01 | Proposed; save/draft decisions pending |

## UI-F01 — Edit a note

Start at UI-S01 → select an existing note → UI-S02 → change content → save → confirmed success → return to the updated list. Back with unsaved input needs a retention/discard decision. Direct/deep-link access is outside this increment unless requested.

## UI-S01 — Notes

Primary action: “Nova nota” if creation is confirmed in scope; otherwise omit it rather than expanding the increment. List rows show note title and localized modification date; full essential title remains accessible when visually truncated. Selecting a row opens UI-S02 with its stable note ID. Distinguish initial loading, no notes, filtered no matches and service failure. In failure, show “Não foi possível carregar as notas” and “Tentar novamente”; do not display an empty collection as a successful response.

## UI-S02 — Edit note

Top region identifies the selected note and app Up action. Scrollable editor uses a persistent “Título” label and “Conteúdo” label; “Salvar alterações” is the primary action, reachable with IME visible. Preserve text growth and focus; announce result once without repeating on recomposition. Propose title-required validation; actual length/domain limits are unresolved, not inferred from layout.

| State / trigger | Visible behavior | Effect / recovery |
| --- | --- | --- |
| Editing → Save with missing required title | “Informe um título”, associated with field; focus first invalid field after submit | Retain content; no write |
| Editing → valid Save | Immediate pending feedback, prevent accidental duplicate activation | Follow actual save contract |
| Saving → confirmed success | Show confirmed result; return/retain screen according to accepted flow | Refresh selected note/list state |
| Saving → validation rejection | Specific actionable field/message | Retain input and allow correction |
| Saving → timeout | Explain confirmation is unavailable; retain input | Status query/safe retry requires domain decision; do not promise rollback |
| Editing → Back | Show established unsaved-data behavior | Pending UI-D01; never silently discard a draft |

Accessibility checks include title/field names, logical traversal, non-color error meaning and focus/announcement on validation. Relevant Android checks: large text, IME/insets, Back, rotation and process restoration with the agreed retention policy. A Compose Preview would not establish these behaviors.

## Decisions, evidence and resume

| ID | Decision | Status / next action |
| --- | --- | --- |
| UI-D01 | What survives leaving/recreation/process loss, and where? | Unresolved; confirm retention/privacy requirement with product owner |
| UI-D02 | Is save retry safe after an unknown result? | Unresolved; inspect backend/status contract |
| UI-D03 | Does this increment include note creation/tablets? | Proposed scope question; do not add implementation |

Acceptance example: given an invalid title and existing content, activating Save presents the associated title error, retains content and performs no write. Verification is **planned, not run**. Native runtime, TalkBack and user-study evidence are unavailable in this excerpt.

Next iteration: resolve UI-D01 and UI-D02, then update UI-S02 and its checks. Preserve UI-S01 and IDs; reassess UI-F01 only where those decisions change its return/recovery behavior.
