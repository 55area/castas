# Native Android screens

## Native implementation procedures

This skill owns Android screen design and authorized UI implementation. Load only the procedure needed by that work; these are conditional references, not separate competing skills. Preserve existing Compose/Views architecture: MVI, Koin, module naming and a particular Navigation API are not universal requirements.

| Implementation concern | Procedure |
| --- | --- |
| Compose state/effects, recomposition, lazy layouts, text input and adaptation | [Compose architecture](android/compose-architecture.md) |
| Native resources, component APIs, Material reuse, semantics and previews | [Compose components](android/compose-components.md) |
| ViewModel/Root/Screen integration, UiText, effects and saved state | [Presentation](android/presentation-mvi.md) |
| Typed routes, feature graphs, ViewModel ownership, links and Back | [Navigation](android/navigation.md) |

Existing project contracts remain canonical. Examples require their actual imports, resources and dependency versions; comment-only bodies are outlines. A standalone test-authoring request can use the optional `android-unit-testing`, `android-integration-testing` or `android-ui-testing` package. A code-review request uses `peer-review`; a security review uses `cybersec`. If a companion package is unavailable, retain the evidence boundary and use the project's own tools rather than pretending to have loaded it.

Identify Compose, XML Views or interoperability from actual source/Gradle configuration, along with SDK constraints, navigation architecture, theme and design system. Preserve the established stack. Check current official APIs against installed dependency versions before generating code; community examples may contain obsolete or nonexistent APIs.

## Structure and adaptation

Use native components and the project's Material/custom theme, semantic color pairs, typography and resource conventions. Dynamic color, dark theme and manual theme selection depend on product scope; propose them where useful without imposing them universally. Verify supported themes, including custom contrast pairs and dynamic palettes when enabled.

Specify layout by current available window dimensions and input constraints, using the project's supported adaptive APIs. Plan phone, resizable/multi-window, tablet/foldable and list-detail arrangements when in scope; do not simply stretch a phone screen or lock orientation to hide a layout flaw. Record density-independent dimensions (dp), scalable text (sp), meaningful layout transitions and font-scale behavior. Resolve system bars, cutouts, gesture areas and IME insets together; avoid double padding from overlapping inset owners. Critical actions and errors must remain reachable with the keyboard visible.

## Navigation and state

Distinguish app Up, system Back, dismissed overlays and IME dismissal. Preserve expected back stack and selection when moving between list/detail or top-level destinations. Specify deep-link entry and return, pending authentication and unsaved edits as applicable. Use supported predictive-back integrations when relevant; verify actual versions instead of hand-building speculative handlers. Do not trap the user in the app.

Separate durable domain data, screen state, transient UI state and one-time effects. State hoisting/unidirectional flow should fit the project's architecture. A ViewModel can survive configuration change but does not itself guarantee process-death persistence. `remember` alone does not survive activity recreation; `rememberSaveable`/saved-state mechanisms fit small supported restoration data, with durable storage for data that must outlive them. Define draft/sensitive-data retention before choosing persistence. Avoid large objects in saved instance state.

Lifecycle-aware collection, cancellation and stable item keys matter for observable behavior. Recomposition or returning to a screen must not duplicate purchases, navigation, toasts, subscriptions or writes. For offline states distinguish local save, queued synchronization and server-confirmed completion. Define conflict and retry behavior from actual domain contracts.

## Accessibility and input

Use platform semantics, roles, states, headings and meaningful traversal grouping. For Compose inspect merged semantics and custom actions; for Views inspect labels, focusability and accessibility properties. Avoid redundant descriptions on already labeled text or duplicate icon/text announcements. Decorative graphics should not clutter traversal.

Aim for Android's recommended minimum 48dp interactive touch target, considering effective hit areas and spacing; do not confuse it with 48 physical px or web WCAG's 24 CSS px criterion. Support enlarged text/display size without inaccessible clipping, TalkBack operation and announcements, keyboard/D-pad or switch input when relevant. Complex gestures need an accessible alternative. Use string/plural resources, localized dates/numbers, RTL-aware start/end placement and proper keyboard/IME actions. Permission denial, permanent denial, revocation and partial access need accurate, recoverable states when present.

## Verification

Compose Preview and static screenshots help inspect examples; neither proves navigation, lifecycle, keyboard, TalkBack or network behavior. Use the actual build variant and existing Gradle/lint/test tasks; distinguish host unit tests from device instrumentation. Run Compose UI tests or Espresso/UI Automator as appropriate, with assertions on meaningful semantics and outcomes, synchronization and controlled fixtures. Do not add a new testing framework solely because this skill lists it.

For affected behavior, verify representative device/emulator API, window, font scale and theme; rotation/recreation, process restoration, Back, IME, denied permission and offline/retry as applicable. Record actual checks individually: activity recreation is not proof of process-death recovery. Test accessibility with TalkBack where available and record human-required checks honestly. Report unavailable SDK/emulator/device evidence rather than declaring a native interface verified from an HTML concept.

Primary references: [adaptive layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive), [state saving](https://developer.android.com/develop/ui/compose/state-saving), [accessibility defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults), [Compose testing](https://developer.android.com/develop/ui/compose/testing). For Views and mixed stacks consult corresponding Android Developers guidance for the actual components.

## Compose component contracts and shared UI

Separate the integration boundary (ViewModel/DI/lifecycle/navigation) from a renderable screen or component when that improves testing/previews. Give components the inputs and semantic action callbacks they need, plus an appropriately applied Modifier; avoid passing an entire screen graph to a small reusable control. Reuse accessible native/library primitives and the project's icons/resources. A custom clickable icon needs correct role, label, interaction feedback and effective hit area; choosing a library name does not prove those properties remain after overrides.

Hoist state to the lowest owner that meets sharing, business and lifetime requirements. Presentation-only expansion may remain local; domain decisions and persistent edits need suitable owners. Use effects with correct keys/cleanup for actual UI side effects, without forcing every click through a ViewModel event roundtrip. Async outcomes need explicit delivery/lifecycle behavior. Do not add a Channel or claim exactly-once delivery by convention.

For relevant reusable controls, preview meaningful visual variants with the app theme and realistic short/long data, text scale and available width. Use the project's supported multipreview/parameter mechanisms or separate previews; no fixed preview count or ban is required. Preview evidence supplements visual regression and interaction checks. Stability annotations must reflect the actual mutation/equality contract; adding Stable to a List-containing state is not a generic repair. Consider deferred layout/draw reads for measured animation cost, preserving interaction correctness.

For Compose Multiplatform, distinguish common resources/APIs from Android-only R, Context, Activity and preview parameters. Verify the actual plugin/version supports the intended common preview and lifecycle APIs. Use platform adapters for permissions, Back, storage and other native effects; Android Preview does not verify iOS gestures, accessibility or termination recovery. Keep shared screen intent and platform deltas in docs/ui-design.md, and disclose unverified targets.
