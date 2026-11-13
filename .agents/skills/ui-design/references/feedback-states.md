# Feedback surfaces and state coverage

Choose feedback from the user's task, available content, persistence of the condition and need for a decision. The same network failure may need different presentation during initial load, background refresh or form submission. Reuse existing components and keep system/platform semantics. These are decision aids, not a mandatory numbered taxonomy or requirement to build all surfaces.

| Condition | Useful surface | Recovery and accessibility concern |
| --- | --- | --- |
| One field violates a known rule | Associated field message | Explain the correction, preserve input; expose invalid state and association |
| Submission has several errors or an off-screen error | Form summary plus field messages | Link/focus targets appropriately, retain field detail; do not duplicate announcements |
| Brief low-stakes action feedback | Transient status/snackbar | Announce proportionately; essential recovery must outlast a disappearing message |
| Ongoing stale/offline/permission/sync condition | Persistent local callout/banner | Keep usable content visible, identify affected actions and accurate next steps |
| Primary content unavailable with no usable fallback | Content-area failure state | Retain useful navigation, explain what can be retried and preserve unrelated work |
| A consequential decision must precede an action | Dialog/sheet or dedicated decision step | Explain object, scope and consequence; valid cancellation, focus/Back behavior and safe alternative |

Do not turn every error into a modal or reset the whole screen when only a section failed. Prefer truthful copy: what happened, why if known, and what can be done. “Your data is safe”, “Changes will sync”, progress percentages and undo promises require an actual supporting contract. A support identifier may appear in secondary detail; avoid exposing sensitive diagnostics.

A practical selection sequence is to identify the affected scope and usable content, then ask whether a specific decision is required, whether feedback belongs to a field/form, and whether the condition persists or only acknowledges an event. Use the smallest surface that preserves comprehension and recovery; a decision may coexist with field detail or a persistent notice, so these categories are not exclusive tiers. A reversible action can offer Undo only when the real reversal exists; an irreversible or shared effect needs a consequence-aware choice, without requiring typed confirmation for every destructive action.

Specify validation timing by task. First-time input should not be punished while incomplete; once a specific error is shown, timely correction feedback helps. On submit make invalid/off-screen fields discoverable. Disabled submission should have an understandable prerequisite; do not use it as the only explanation of invalid input. Server validation remains authoritative and may differ from a local check.

## Distinguish real states

For data screens consider first-use empty, no filter matches, completed/cleared work, first load, refreshing with retained content, pagination/loading-more/end, partial failure, offline with/without cache and time-sensitive stale data. Keep only states the feature can actually reach. Identify what remains interactive and whether data is local, pending or confirmed.

For editors/actions consider pristine/dirty/invalid, pending submission, rejected result, unknown outcome, cancellation/unsaved work and concurrent changes. Permission/session changes can affect multiple screens: describe shared shell behavior once and screen exceptions where needed. Local data loss, background work and account changes must follow actual product/privacy policy.

For delayed results, specify which screen instance and operation still own the result after navigation, dismissal, or a second submission. A late failure should not move focus into a screen the user left. If a completed action removes the original focus target, choose a logical surviving target and verify the announcement and focus in the actual UI. [W3C modal dialog focus guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

For relevant controls inspect default, focus, pressed, selected/toggled, disabled, loading and error appearances. Test meaningful content extremes: zero/one/many records, long words/translated strings, large or negative numbers when valid, badges/tag overflow, missing optional values and failed images with stable dimensions. Specify truncation/access to full content instead of designing only ideal demo data.

## Reviewable artifacts

A compact component/state gallery can expose shared inconsistencies before many screens are built. When comparing directions, keep the same representative task/content and vary meaningful palette/type/composition/density decisions within fixed brand constraints. Capture selected reasons and exceptions in docs/ui-design.md; do not require three options or a new theme system for a small edit.

Link a mock state with screen ID, trigger, theme/window and intended transition. Native previews, HTML concepts and production runtime evidence have different roles. Generated swatches should use the actual canonical tokens when possible, but a passing token-pair calculation does not establish every rendered combination or accessibility conformance. Verify focus, actual translucent/background pairs and interaction separately. No automatic publication, external font/icon downloads or upstream viewer is required.

In a state gallery, use human-readable labels and show a representative common state first. Order the remaining states to support review of the journey rather than implying every state is a linear step. For each state retain its trigger/guard, affected region, retained content, allowed actions and recovery. Put shared shell/session/navigation behavior in one place and link screen exceptions. A component gallery should include relevant keyboard focus, loading, disabled and error behavior; a painted focus ring or pointer-events-only loading style does not prove focusability or prevent keyboard submission. Optional [local prototype tools](prototyping.md) support named state links, but the Markdown contract retains the intended behavior.
