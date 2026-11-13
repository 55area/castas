# Design method

## Discover proportionately

Establish the user's task and its conditions: first use or repeat use, role/permissions, interruptions, connectivity, time pressure, assistive technology, language, sensitive information, and device/input constraints. Use existing requirements and research first. Ask about consequential gaps in small batches; offer a reasoned proposal when the user delegates design. Routine details can use established defaults with their basis recorded.

When these affect the design, establish session frequency/duration and attention constraints; each important field's typical value, credible maximum, units and optionality; supported themes and default behavior; and the distinction between fixed brand assets and negotiable expression. Ask what specifically works in a reference (hierarchy, density, type, navigation or tone), and what the product should avoid conveying. Do not repeat an intake for information already settled in the project. Technical contracts matter when they change visible behavior, permissions or recovery; link their owners rather than inventing them or dismissing them as outside design.

Distinguish provided fact, observed behavior, research finding, hypothesis, proposed decision, and accepted decision. Synthetic personas and journeys are illustrative hypotheses, not researched users. For actual research, retain consent/privacy constraints, method, sample, observations, contradictory evidence and limitations. A recurring comment in a small sample does not establish population prevalence. Propose neutral task prompts and observe completion, errors, recovery and uncertainty rather than asking only whether a screen is attractive. Never fabricate interviews, quotes, analytics, conversion lift or participant acceptance.

## Trace tasks into surfaces

For each flow identify entry, preconditions, screens, decisions, completion and recovery. Account for direct entry, return visits, cancellation and interruption. A flow diagram can clarify branching; give endpoints real destinations or explicitly unresolved IDs. Shared components and defaults should serve multiple screens without erasing their contextual differences.

Use user-visible names on states and transitions. Keep distinctions that change allowed actions, permissions, recovery or the truth of a result: a single “done” node must not hide saved, queued and outcome-unknown states. State when a diagram omits transitions or represents only a selected journey. A useful state sketch explains the contract; it is not evidence that all paths were explored or that the running app follows it.

Before adding a screen, ask what task or necessary decision it supports. Before hiding a function behind a gesture, icon or overflow menu, consider discovery and an accessible alternative. Use progressive disclosure for secondary complexity without concealing required input, prices, risks or consequences. Marketing surfaces emphasize informed decisions; operational surfaces emphasize task completion; reading surfaces emphasize comprehension. Choose expression and density for the surface's purpose.

## Screen specification

A screen contract should cover relevant elements below, with rationale for consequential choices. Omit irrelevant detail rather than generating every conceivable state.

- **Identity:** stable screen ID, name, role, linked requirements, purpose, inputs/preconditions, route/destination and exits.
- **Structure:** reading order, primary action, supporting information, regions, shared components/variants and ownership, content width/density, persistent vs scrolling regions.
- **Content:** final or illustrative copy, labels, units, formats, validation, limits and wrapping/truncation with access to essential full content. Use realistic long names, zero values, large values and missing data. UI strings follow the product locale even when the specification is English.
- **Interaction:** control → trigger → guard → visible feedback → effect → destination/recovery. Specify keyboard, touch and assistive alternatives where relevant.
- **State:** initial, loading, empty, filtered-empty, success, validation failure, service failure, permission denied, stale/offline and partial data as applicable. A failed request must not masquerade as a valid empty result.
- **Adaptation:** layout changes at content/window constraints, theme, text scaling, localization, RTL, keyboard/insets and different input methods.
- **Verification:** concrete scenario, expected observable result, method/environment, status and evidence link.

For example, a save flow might be `editing → saving → saved`, `saving → rejected` or `saving → outcome unknown`. A timeout does not prove the operation failed. Keep the draft and show an accurate recovery path; check current status or retry safely according to the actual contract. Prevent accidental duplicate submission without using a disabled button as server-side enforcement. Avoid speculative promises of offline support or undo when the backend cannot provide them.

## Interaction patterns and failure recovery

- Forms need persistent labels, required/optional meaning, appropriate input types, understandable constraints and localized examples. Validate at useful moments without punishing unfinished input; preserve entered values and identify the specific corrective action. Permit password managers, paste and supported authentication alternatives.
- For search/filter/sort, show query and applied state, distinguish no records from no matches, preserve context on return, and define races between requests. A slower old response must not replace a newer query result.
- For destructive/costly actions, convey affected item, scope and consequence. Choose confirmation, reversible action or preview proportionate to risk. Do not claim reversibility without a real mechanism or blanket-confirm every trivial action.
- For optimistic updates, define pending truth, rollback/reconciliation and concurrent changes. Never show financial, medical or irreversible success solely from a tap.
- For onboarding and permission prompts, ask at the relevant need, explain benefit, support refusal and retry/settings when applicable. Do not fabricate urgency, testimonials, scarcity, consent or hidden subscriptions; make cancellation and privacy choices understandable.
- For notification/status feedback, distinguish action result, durable record and transient message. Important recovery must remain reachable after a toast disappears. Announce relevant changes without flooding assistive technology.
- For unsaved work and interruption, state what is retained, where and for how long, and what occurs on cancel, Back, refresh, process loss and session expiry as applicable. Avoid storing sensitive drafts without the project's retention/security decision.
- For account, tenant or permission changes, specify what content becomes unavailable and how pending responses/drafts are handled. Prevent a previous account's content from reappearing in the new context. Hidden controls, route guards and unguessable record IDs are not authorization enforcement; link the responsible service/domain contract and keep UI permission states consistent with it. See [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

Use [feedback surfaces and state coverage](feedback-states.md) when specifying error placement, refresh/partial-data behavior, control variants or stress cases.

## Explore a material visual decision

When direction is genuinely unresolved, compare a few named alternatives on the same representative screen, task, content and window. Give each a concise rationale and descriptive attributes tied to the audience. Vary meaningful axes such as palette temperature, type/hierarchy, shape, composition or information density; a hue swap alone rarely explores a different experience. Keep non-negotiable brand and platform behavior fixed, and explain which tradeoffs each option exposes.

Retain the chosen direction, rejected concerns and any remix by decision ID in `docs/ui-design.md`. A remix can combine compatible elements but needs another coherence/contrast check; it is not automatically validated because its source options were checked. Use the user's delegated authority for routine choices and seek input for consequential unresolved decisions. Do not impose three options, both themes, an extra approval ceremony or a visual redesign on a small edit. For reviewable local artifacts, use [prototyping](prototyping.md).

## Critique and refinement

For a consequential journey or implementation handoff, start at a documented entry with a realistic task. Use the screen contract and its linked sources to reconstruct the first available action, visible result and recovery path before consulting interview notes. If a step relies on an unlabeled gesture, an undocumented destination or knowledge of an invisible state, identify the exact missing cue or contract. Separate what is discoverable in the interface from what is merely explained in the specification. Record which screens and states were examined and whether the walkthrough used a specification, a mock or a running app.

Inspect the selected flow and rendered evidence when available. Report location/state, user barrier, evidence, impact, recommendation and verification. Separate reproducible defects, design-contract deviations, usability hypotheses and optional aesthetic suggestions. A source-only pass can establish bindings or semantic markup, but not a measured usability outcome. Reuse what already works; a polish request does not authorize replacing identity, product claims or navigation architecture.
