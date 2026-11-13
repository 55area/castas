# Local design-skill consolidation — 1.4.0

Maintainer transfer record, 2026-11-06. The user requested consolidation of the local `android-skills/design` skill into `ui-design`, followed by removal of the source once its useful material was covered. All 18 source files were inspected. File names below identify the retired source inventory; they are not runtime dependencies or links to deleted files. Existing UI Design scope, English artifacts, canonical `docs/ui-design.md`, platform distinctions and authorization rules remain governing.

Most source design principles were already present in 1.3.1. The update adds focused discovery/critique prompts and an optional original local prototype workflow, rather than duplicating the source's mandatory multi-phase process. Source code, styles, templates and palette data were not copied.

| Source file | Destination / disposition |
| --- | --- |
| `SKILL.md` | Existing modes/discovery/iteration retained; optional artifact routing added to the [entrypoint](../SKILL.md) and [prototype workflow](prototyping.md). No fixed phase/option counts or automatic publication. |
| `references/interview.md` | [Design method](design-method.md): session/attention context, per-field realistic bounds/optionality, negotiable brand, reference-specific likes and negative attributes. Existing proportionate questions and saved partial drafts replace unconditional gates. |
| `references/design-principles.md` | [Visual system](visual-system.md) and [direction comparison](design-method.md#explore-a-material-visual-decision): hierarchy without color, purposeful grouping, dark-surface design, numeric alignment and meaningful named alternatives. Fixed grids/ratios/fonts and aesthetic bans excluded. |
| `references/error-framework.md` | Existing [feedback table](feedback-states.md) already covers all six useful surfaces; practical scope/persistence/decision selection added. Unsupported data-safety/undo promises, blanket modal/validation/timing rules and exclusive numbered tiers excluded. |
| `references/states.md` | Existing state/stress coverage retained; [gallery guidance](feedback-states.md#reviewable-artifacts) adds readable labels, common-state-first review, triggers and shared shell ownership. No invented or impossible states. |
| `references/accessibility.md` | Existing [web](web.md), [Android](android.md) and [validation](validation.md) guidance retained. Correct platform units, criterion exceptions and actual interaction evidence take precedence over universal sizing or conformance claims. |
| `references/tokens.md` | [Prototype token checks](prototyping.md#token-checks), original [token example](../assets/prototype/tokens.json) and [helper](../scripts/prototype_tools.py): primitive/semantic separation, explicit role pairs and theme coverage. No forced schema, remote fonts/icons or copied palette. |
| `references/build.md` | [Prototype workflow](prototyping.md): editable partials, generated local export, stable state routes, actual rendered inspection and source/output traceability. Artifact-host fragment rules, hard-coded host paths and auto-publishing excluded. |
| `scripts/design_tools.py` | New original [checker/builder](../scripts/prototype_tools.py) and focused [tests](../scripts/tests/test_prototype_tools.py). Preserve token checks, local assembly and specimens; reject silent omissions/unsupported values. Browser capture uses available tools rather than a fixed host-specific screenshot wrapper. |
| `assets/brief.template.md` | [Existing output template](../assets/ui-design-template.md) and [maintenance](document-maintenance.md) own direction history, artifact sources/routes, coverage and resume. No competing canonical brief. |
| `assets/index.template.html` | Original [starter manifest](../assets/prototype/manifest.json) plus builder replace framework-specific index boilerplate. |
| `assets/options.template.html` | [Matched direction comparison](prototyping.md#decide-what-the-artifact-should-demonstrate) through separate comparable exports/captures; no mandatory option count or copied comparison framework. |
| `assets/pages/system.template.html` | Original token-derived foundations plus component/system gallery entries; retain actual component states and behavior notes. |
| `assets/pages/feature.example.html` | Original starter screen/state sources demonstrate named states and transitions, without fake Undo/data guarantees. |
| `assets/tokens.example.json` | Original small [token fixture](../assets/prototype/tokens.json), with explicit pairs instead of importing brand/typography data. |
| `assets/viewer.js` | Original gallery runtime supports theme/window/state selection and route changes. Demo transitions remain distinct from production behavior; incomplete overlay/focus behavior is not inherited. |
| `assets/viewer.css` | Original neutral gallery presentation and resizable specimen area; no copied viewer styling or dependency. |
| `assets/components.css` | Original small example styles and native controls, with optional project styling. Existing platform components and canonical themes remain preferred implementation inputs. |

## Source defects and deliberate limits

A bounded source experiment reproduced three checker gaps: explicitly missing foreground roles were omitted, unknown usage categories accepted a 1:1 pair using a zero threshold, and pairs on translucent backgrounds were skipped. Inspection also found unbounded reference recursion, source includes outside the source root, remote font/icon loads despite a self-contained description, incomplete modal focus behavior, pointer-only loading suppression and an Undo example without reversal. These behaviors were not adopted.

The destination's original helper validates its declared contract and has regression cases for malformed/omitted inputs. Its supported opaque-background color calculations are narrower than all CSS color/compositing possibilities; success is not full WCAG conformance. Generated concepts do not establish native Android or backend behavior. Source implementation inspection and local helper tests are separate evidence categories.

Unconditional interviews/approvals, mandatory both-theme/every-state permutations, fixed timing/style rules, a separate authoritative documentation tree and automatic publication/comment replies were deliberately excluded because they would weaken the existing skill's scope or evidence contracts. Their useful goals are retained as conditional discovery, coverage and review practices.

Validation outcomes belong in [evaluation records](../evals/scenarios.md); historical trials retain their original scope. The original local source is backed up outside both repositories before authorized deletion and is not required to run UI Design.
