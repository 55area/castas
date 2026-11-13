# Optional local prototype workflow

Use a prototype to settle a material visual/interaction question or make multiple meaningful states easier to review. Existing application components, Compose previews, wireframes and project tooling remain valid choices. A small text correction does not require a gallery. Keep `docs/ui-design.md` authoritative and link optional sources/exports from it; this workflow does not add a required brief or replace product code.

## Decide what the artifact should demonstrate

Choose a representative task, stable screen IDs and the states that expose the decision. Include foundations/shared components, shell/global behavior and feature screens only as useful. Give each state a human label, trigger and concise behavior/recovery note. Show a common realistic state first, followed by relevant loading/empty/error and stress cases. Do not invent loading, offline support, successful persistence or Undo solely to make the demo richer.

For alternatives, keep task/content and review conditions matched, and vary substantive palette, type, composition or shape/density choices within the accepted constraints. Name each direction and record its rationale. Separate manifests/exports can be reviewed beside each other or captured under matching routes; the helper does not need to become a multi-product design framework. Record the chosen/remixed direction in the existing decision log and recheck the resulting combination.

## Local starter and commands

The original [starter manifest](../assets/prototype/manifest.json) and its neighboring files contain synthetic examples, not accepted brand tokens or production UI. Copy the starter into a project-owned optional artifact directory before editing. Reuse an existing project prototype location where one exists. Paths below illustrate a `docs/ui-prototype/` directory; it is not mandatory.

```sh
python3 /installed/path/ui-design/scripts/prototype_tools.py --help
python3 /installed/path/ui-design/scripts/prototype_tools.py check docs/ui-prototype/tokens.json
python3 /installed/path/ui-design/scripts/prototype_tools.py build docs/ui-prototype/manifest.json docs/ui-prototype/prototype.html
```

Replace `/installed/path` with the actual skill location. The [helper](../scripts/prototype_tools.py) uses Python 3.9+ and its standard library. No browser package, CDN, web server, font service or publication service is required for building the local file. Use available authorized browser/screenshot tools for inspection, rather than assuming a fixed Chrome installation or claiming a screenshot after a timer proves readiness.

The manifest names the title/language, relative token and optional CSS sources, review widths, and screens. Each screen has an ID, title, purpose, optional gallery kind and ordered states. Each state supplies an ID, label, trigger and local HTML source. Source fragments can include local partials with `<!-- include: path.html -->`. Keep source paths inside the manifest's directory tree and use unique IDs. The builder validates references/routes and fails without replacing the previous output when the input is invalid. JSON object keys must be unique at every level: duplicate token roles or manifest fields are errors, not a rule to silently keep the last declaration.

Keep previews small. A build allows 32 files in a fragment chain, 512 fragment reads, and 2 MiB of fragment input across HTML and CSS. Repeated includes count each time they expand. If a limit is reached, simplify the fragments or split the gallery.

Use reviewed, locally authored HTML/CSS inputs. Display imported content as escaped text or use the project's reviewed rendering policy. The helper rejects active markup and malformed comment forms that can hide tags from the build-time parser. The generated [Content Security Policy](https://www.w3.org/TR/CSP3/#script-src-inline) allows only the bundled viewer script by hash and limits resource loads. These controls support the local concept workflow. Keep arbitrary HTML out of the builder and use a separate reviewed rendering boundary for production content. Any real service, external asset or publication follows the actual user request and environment authority.

This bounded starter accepts ordinary semantic controls/layout markup, not SVG/media imports or a full application framework. Use the project's existing tools when richer imagery, custom scripts or actual service interaction is necessary. App CSS should target `.specimen` descendants so it does not restyle the review controls. Use container queries for specimen-width adaptations; the browser's outer viewport and the chosen content width are different measurements. The helper detects references to undeclared generated color/spacing/radius/type variables, not every CSS cascade or arbitrary project variable error.

After a failed build, an existing HTML file may be the previous successful export. Do not present it as a newly generated result or current evidence; check the exit status and rebuild the corrected source before inspecting that iteration.

## Token checks

Use the project's canonical token format when practical. The helper's small example format is optional: a flat primitive-color map, semantic roles grouped under named themes, and explicit `pairs` with `fg`, `bg` and `use` (`text`, `large-text`, or `nontext`). A pair may scope itself to declared themes; otherwise it applies to each declared theme. Primitive references use `{name}`. Colors use six-digit hex or eight-digit hex with alpha. Optional `space`/`radius` maps use numeric CSS-pixel values; `type` roles use a local/system `family` stack, `size` in CSS pixels, unitless `line`, and optional `weight`. The builder generates `--color-*`, `--space-*`, `--radius-*` and `--type-*` variables; these CSS values do not directly prescribe Android dp/sp. See the complete starter for the supported representation.

Declare actual foreground/background combinations for content, controls, state cues, focus and relevant surfaces. The checker evaluates every declared pair/theme and rejects missing roles/themes, unknown usage, unresolved/cyclic references and unsupported backgrounds; it does not silently turn an omitted computation into a pass. Supported foreground alpha is composited over an opaque known background. Layered/translucent backgrounds, gradients and images need separate real compositing/rendered evidence.

The 4.5:1 normal-text, 3:1 qualifying-large-text and 3:1 applicable non-text thresholds concern these particular criteria, including their definitions/exceptions. Classify actual usage correctly; do not relabel ordinary text to make it pass. Compare full calculated precision with the threshold, even if display output is rounded. Explicitly inventory undeclared pairs and formats: successfully checking a listed pair says nothing about combinations that were never supplied. See [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Generate semantic CSS and foundation specimens from the same token source used by the concept. This prevents value drift; it does not establish that the rendered markup uses every role correctly. A strict checker failure should lead to a justified token/usage correction or an explicitly unresolved design decision, not a bypassed check.

## Gallery navigation and review

Deep links identify the intended example, for example `#UI-S01/loaded?theme=light&width=360`. Use the generated controls to select a screen/state/theme/window and confirm they agree with the URL, including after hash changes and browser history. Use `data-goto="UI-S02/editing"` for a linked scenario and `data-state-to="error"` for a state change in the current screen. These are demonstration transitions, not API calls or persistence evidence. Use real disabled controls for a non-interactive loading state, not just pointer-event styling.

Keep a review matrix of the routes/themes/widths actually inspected, meaningful omissions and the decision each capture informs. Test one representative journey and recovery through controls as well as capturing static states. Ensure long content, font/text growth, keyboard focus, clipping, shell overlap and relevant theme pairs are checked where they can change the result. Do not expand a narrow edit into every possible screen/theme/window permutation.

Modal behavior needs a supported native dialog or the project's complete accessible pattern, with focus entry/containment, inert background, appropriate dismissal and focus return; a styled overlay or `alertdialog` attribute is not enough. The starter is a bounded local concept, not evidence that all accessibility interactions work. HTML concepts of Android screens cannot verify Android Back, IME, lifecycle, native navigation or TalkBack.

For a local native `<dialog id="review-choice">`, use `data-dialog-open="review-choice"` on the opener and `data-dialog-close` on a button inside it. Provide a visible title and accessible labeling in the markup. Dialog IDs and local anchors must be unique across the gallery; an ordinary `#element-id` link stays in its current state, while cross-state navigation uses screen/state routes. Test Escape, Tab/Shift+Tab, focus return and navigation away from an open dialog for the actual content. Do not label every dialog an alertdialog or trap users in a consequential flow merely to imitate a source example.

Keep essential errors/recovery reachable rather than hiding them behind a transient notification. An illustrative state can show “saved” or “undo” only with its mocked status disclosed; product guarantees still require the actual contract and runtime checks. Use [validation](validation.md) for evidence levels and [document maintenance](document-maintenance.md) for source/output ownership. Do not publish or respond to comments in someone else's service merely because the local artifact built successfully.
