# Validation and evidence

Match verification to the deliverable. A specification can be reviewed for consistency and implementability without a running app. An implemented screen requires relevant build/runtime evidence before claiming observed behavior. A usability claim requires an appropriate user study; an LLM critique is not a participant study.

## Choose a useful check set

Trace a primary task through entry, action, visible result and persistent outcome when applicable. Add the consequential failure/recovery and boundary cases suggested by the change. Check shared-component consumers and neighboring screens when a shared token or behavior changes. Do not manufacture dozens of screenshots or exhaustive permutations for a narrow edit.

| Question | Useful evidence | Insufficient alone |
| --- | --- | --- |
| Is the screen specified clearly? | Concrete state/transition and acceptance examples, linked requirements, explicit gaps | Filled headings or a large document |
| Does the composition work at target sizes? | Current rendered capture with viewport/device, state, content and theme | Source code or a stale mock |
| Can users operate it? | Actual keyboard/touch/assistive interaction and observable outcome | Calling handlers or enumerating focusable nodes |
| Is the implementation behaving correctly? | Relevant assertions, error/recovery cases, data/effect checks | Render-only smoke test or screenshot |
| Is it accessible? | Applicable automated plus manual/assistive checks with scope and limits | Zero scanner findings or an accessibility-tree proxy |
| Does the design help real users? | Observed task results and research limitations | Model confidence, aesthetic preference or invented metrics |

For rendered review record a coherent batch of observed issues; fix them and inspect again only when implementation/refinement is authorized. Use consistent data, locale, theme and dimensions for comparisons. Wait for relevant content/fonts/animations to settle; mask only irrelevant dynamic content, never the behavior under test. Preserve meaningful assertions rather than updating goldens just to turn tests green. Visual diffs can catch appearance changes but cannot replace interaction checks.

When the task requires matching a supplied design, compare the relevant layout, content, assets and component states under matching conditions where possible. Record intentional departures and unresolved differences against the agreed constraints. Source inspection alone cannot establish rendered fidelity, and matching one screenshot does not establish unseen states or other window sizes.

Establish whether the selected app and account use isolated test data or a live service before interacting. A local frontend can still call production APIs. Exercise consequential actions with controlled fixtures or an authorized sandbox; a request to inspect a checkout, delete dialog or notification flow does not by itself authorize a real purchase, deletion or message. Record the unexecuted boundary if safe conditions are unavailable; do not silently switch targets or assume an irreversible action can be cleaned up afterward.

Check hierarchy, actionable labels, alignment, clipping, reflow, content extremes, relevant themes/text scaling, focus/input, loading/empty/error and recovery. Inspect actual computed colors/semantics when making numerical or accessibility claims. Screenshot estimates must be labeled estimates. Do not claim exact WCAG contrast from an image without reliable foreground/background evidence and calculation.

## Reproduce a journey safely

For runtime checks, reuse the existing harness and record a compact recipe: build/instance identity, usable readiness, account and fixture prerequisites, public entry route, actions, expected visible result and durable effect, reset and cleanup. Confirm ownership before driving a shared browser, emulator or service; serialize interaction with that instance or use genuinely isolated instances. After surprising behavior, recheck the instance and relevant UI state before continuing. Reset only test-owned resources and retain captured evidence after teardown.

Capture the action and resulting state, not only a final screenshot or an internal handler call. Where persistence is promised, verify through the contract's supported read-back or re-entry path so a cached optimistic result cannot masquerade as a saved record. Mark alternate entry points and inaccessible prerequisites as pending coverage. A source/harness mismatch may be stale automation or a product regression; establish the intended contract before changing either.

For a changed form or other consequential interaction, verify the recovery path with a concrete input and actor. For example, submit invalid data by keyboard, observe which field and message are exposed, correct it without losing unrelated input, then confirm the resulting state. Where relevant, test an asynchronous error or permission denial as a separate case. Record viewport, zoom/text scaling, locale and assistive technology actually exercised. Automated semantics and a successful render leave manual reading order, announcements and task completion unverified.

For an accessibility pass on that form, scan the actual rendered error and recovery states with the project's checker where available. Then complete the journey using the supported keyboard or switch input and a representative screen reader. Check where focus lands, what is announced, which inputs persist, and whether the user can recover. On native Android, use device semantics checks and TalkBack where relevant. Record each exercised platform and state, and leave untested combinations explicit.

## Evidence record and stopping

Record target revision or local snapshot, screen/state, environment and tool, action, expected and observed result, pass/fail/not-run and artifact reference. Separate `planned`, `source-inspected`, `rendered-inspected`, `interaction-tested` and `user-tested` evidence. Scope claims to the checks actually performed.

Classify findings by task impact: blocked critical action, substantial barrier/recovery defect, minor friction or optional refinement. Confidence and impact are separate. Include reproducible condition, affected users, evidence and next check; do not invent an aggregate design score. Missing material evidence stays pending, not passed. If no tool/device is available, complete the specification or static assessment and provide a specific remaining check.

Stop when the requested detail/change and relevant checks are complete, or when a specific unresolved decision/access limit prevents further dependent work. Save current work and next action; avoid endless polish, repeated scans or claims of perfection. A document marked accepted records an actual user decision; it does not grant implementation, publication or release authority.

## Trust the scope of a checker

When a contrast/token checker contributes evidence, inspect its selected pairs, supported formats/themes and handling of missing roles, unknown usage categories and skipped calculations. Unknown or skipped required pairs remain unverified; they must not disappear behind a successful exit code. Calculated token pairs must also match actual rendered foreground/background combinations, including opacity and interaction state. Neither a token check nor a component's accessibility attributes establishes complete WCAG conformance.

The optional [prototype workflow](prototyping.md) provides a bounded checker and local builder. Check the declared usage classification against the rendered typography or UI cue, keep numerical comparisons unrounded until deciding pass/fail, and explicitly inventory combinations not declared. Do not use an easier usage category to make an essential pair pass. Unsupported layered backgrounds need actual compositing/rendered analysis, not a skipped success.

For reproducible prototype captures, open the exact screen/state/theme/window route, confirm the displayed controls match it, and wait for relevant layout/assets rather than relying solely on a fixed delay. Inspect the resulting image and test intended transitions using the controls. A button that merely switches mock state is illustrative; it does not establish persistence, networking, undo, keyboard focus containment or native behavior. Keep local examples offline where possible; do not publish a concept, fetch a font/icon service or enable external analytics solely because an upstream template did so.
