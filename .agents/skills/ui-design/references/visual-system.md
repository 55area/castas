# Visual system and graphic assets

## Establish the governing system

Inspect actual themes/tokens, shared components and their consumers, accepted design guidance and supplied references. Trace which application and variant uses them. A repeated literal is evidence of implementation, not automatically an intentional token. Record source, scope and confidence; screenshot-only measurements are estimates. Imported screenshots cannot establish internal token names, exact spacing or hidden interactions.

For a supplied design, infer from the request which parts govern the result: layout, content, assets, component appearance or overall direction. Preserve those commitments and record allowed exploration. Unseen interaction and responsive states still need explicit contracts or labeled proposals. If visual fidelity conflicts with an accessibility requirement or accepted product contract, expose the conflict and propose a focused adjustment; do not silently reproduce the barrier or redesign unrelated areas.

For a new system propose a coherent small foundation: semantic color roles and foreground/background pairs, typography roles and fallback, spacing/layout rhythm, shape/elevation, iconography, component variants and motion. Label proposed names/values; map them to existing owners where possible. Record global defaults once and deliberate screen overrides with reasons. Native defaults, familiar fonts, brand colors, gradients, cards and shadows are legitimate when appropriate; do not replace user intent with a blacklist of aesthetics.

Choose a visual direction tied to the subject, audience and task. Compare references by hierarchy, density, composition, navigation and states. Distinguish implementing a supplied, authorized design from using third-party inspiration; inspiration does not establish permission to reuse branding, imagery, text or exact compositions. Preserve provenance, permissions and license requirements for reused material. A product dashboard and its marketing page may share tokens while requiring different composition and tone.

## Composition, typography and color

- Make the main task discoverable through alignment, grouping, hierarchy and clear affordances. Avoid making every region equally prominent. Spacing should express relationships; use the project's scale while allowing justified exceptions.
- Choose legible typography and tested fallbacks with language/glyph coverage. Specify role, weight, size, line height and wrapping where needed; support text growth and reflow. Do not shrink essential text to force a fixed mockup. Dense numeric views may benefit from aligned numbers and explicit units.
- Use semantic states and theme pairs, evaluate actual contrast including opacity/background images, and support color-independent meaning. Check hover/focus/selected/error states and relevant themes. A token's name or a generated palette does not prove contrast.
- Distinguish interactive affordances from decoration. Keep focus, selection and disabled states recognizable. Disabled controls should have an understandable prerequisite or alternative; tooltips alone do not explain them to every user.

During critique, temporarily disregard color to inspect whether position, spacing and typography still communicate hierarchy. Check whether containers clarify relationships or merely repeat borders/shadows. For dark themes, deliberately specify surface separation, emphasis, imagery and semantic pairs rather than mechanically inverting light values; pure black, native fonts and familiar components remain valid when suited to the product. Use tabular numerals when aligned changing values benefit from them. These are diagnostic techniques, not mandatory palette ratios, font counts or an aesthetic blacklist.

Keep primitive values distinct from semantic roles and component/state usage when that fits the existing system. A role needs its actual foreground/background partners and usage, not only a pleasing swatch. Reuse the canonical project format; the optional [prototype token format](prototyping.md#token-checks) is an interchange/example for local concepts, not a replacement for existing code tokens. Generate foundation specimens from the same source used by the mock so displayed values cannot silently drift. Record theme-specific exceptions, unsupported formats and unverified combinations explicitly.

## Icons, imagery and graphics

Use the existing icon family and deliberate size/stroke/fill conventions. Give meaningful controls accessible names; hide redundant decorative graphics from assistive technology. Resolve directional icons for RTL semantically, without mirroring logos, numbers or every image blindly.

For assets specify purpose, source/rights, dimensions/aspect ratio, crop/focal point, theme variants, scaling/export format, fallback and alternative text. Prefer existing vector assets for simple icons; generation is useful for original illustrations or photography when requested and supported. Record generated provenance and pending review. Generated images must not replace readable text, functional controls or native interface implementation. Do not add remote fonts/image services or tracking simply for visual polish.

For standalone posters, logos or illustration production, explain the boundary and use the available appropriate workflow when requested; this skill owns their interface placement and constraints. There is no mandatory image-generation, design-tool, font-library or paid-service dependency.

For charts match the representation to the question (comparison, trend, distribution, relationship), label units and scales, distinguish missing data from zero, and provide a readable summary or table when relevant. Do not hide critical meaning in color or hover-only tooltips, use misleading scales, or present decorative numbers as product facts.

## Motion and perceived performance

Specify purpose, trigger, affected elements, duration/easing or native token, interruption/cancellation and reduced-motion alternative. Feedback should acknowledge the action promptly; completion must reflect actual state. Preserve spatial continuity without blocking input, hiding content until an entrance animation, forcing scroll choreography or creating flashing/vestibular barriers.

Prefer existing native/framework mechanisms. For web, transform/opacity often avoid layout work, but profile meaningful bottlenecks instead of assuming an animation is free. Bound loops, stop unnecessary off-screen work and batch layout measurements. For Android, verify scrolling and transitions on representative hardware when performance matters. Do not prescribe universal frame rates, timing constants or extra libraries without a requirement and measurement.
