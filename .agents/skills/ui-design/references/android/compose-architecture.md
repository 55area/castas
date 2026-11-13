# Android Compose Screen Architecture

Use native Jetpack Compose, AndroidX Lifecycle, Android resources, and Android platform integrations. Read [MVI presentation](presentation-mvi.md) for ViewModel/Root/Screen boundaries. Inspect the existing Compose compiler, BOM, API levels, and project architecture before changing them.

## State ownership

Place state at the lowest common owner that needs to read or modify it. Screen state involving business logic usually belongs in a ViewModel. Component-local expansion, focus, animation, and scroll state may stay in composition or a plain state holder. Use `remember` for composition lifetime, `rememberSaveable` with a supported saver for restorable UI state, and persistent storage for long-lived data. Hoist state when coordination or testing actually requires it.

Collect ViewModel flows with `collectAsStateWithLifecycle()`. Use `stateIn`/`SharingStarted.WhileSubscribed` when appropriate for shared upstream work; choose stop timeout and replay behavior deliberately. Do not promise that configuration-change survival equals process-death persistence.

## Stability and recomposition

Measure a user-visible performance issue before optimizing. Use compiler reports, Layout Inspector/recomposition tools, tracing, and release/profileable measurements where appropriate. Debug recomposition counts alone are not a performance benchmark.

Strong skipping is enabled by default with Kotlin 2.0.20 and later Compose compiler support; verify the actual toolchain. Unstable parameters can still be skipped by identity. Preserve immutable state and stable references where meaningful. `List`, `Map`, and `Set` interfaces do not guarantee immutability; use truly immutable models/collections or observable snapshot state when mutation is necessary.

`@Stable` and `@Immutable` assert contracts; they do not implement observability or immutability. Do not annotate a model just because it contains a collection or suppress compiler findings without meeting those contracts. Weigh structural equality cost before annotating large models. Keep domain models free from Compose annotations merely to force compiler inference.

Cache expensive, pure calculations with correctly keyed `remember` when beneficial. Format UI models upstream when business/presentation dependencies belong there. Use `derivedStateOf` when a frequently changing observable input drives a less frequently changing derived result, such as a scroll-to-top affordance; it is not a general replacement for every calculation.

## Effects and Android integration

Use `LaunchedEffect` for composition-scoped suspend work and `DisposableEffect` for registrations that need cleanup. Key effects by values that should restart them. Use `rememberUpdatedState` for callbacks that should update without restarting a long-lived effect. Use `rememberCoroutineScope` for user-triggered UI suspend work, such as opening a drawer. Avoid uncontrolled launches in a composable body.

```kotlin
@Composable
fun ObserveStart(onStart: () -> Unit) {
    val owner = LocalLifecycleOwner.current
    val currentOnStart by rememberUpdatedState(onStart)
    DisposableEffect(owner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_START) currentOnStart()
        }
        owner.lifecycle.addObserver(observer)
        onDispose { owner.lifecycle.removeObserver(observer) }
    }
}
```

Use `androidx.lifecycle.compose.LocalLifecycleOwner` and Lifecycle observer types. For work that must suspend below STARTED, use `repeatOnLifecycle` rather than relying on a composable being present. Critical business operations belong to an appropriate ViewModel/repository or durable worker, not a UI collector.

Native `LocalContext`, Activity Result APIs, Android intents, permissions, haptics, and `BackHandler` are available. Keep their lifecycle-bound coordination at the UI boundary and inject wrappers only when ownership or tests benefit. Do not retain an Activity in an application-scoped service. Custom `CompositionLocal`s are appropriate for scoped cross-cutting UI dependencies; avoid hidden business dependencies and frequently changing globals that broaden recomposition.

Request runtime permissions with the appropriate Activity Result contract from a lifecycle-bound UI owner. Ask only when the user invokes the feature, explain a rationale when appropriate, and handle denial/permanent denial or settings return without a request loop. Keep permissions out of composition-body side effects; a permission grant is not a guarantee the underlying service remains available. Persist only what the product needs, and recheck capability when the operation actually runs.

## Lazy layouts and animation

Provide stable unique item keys when available, and `contentType` for heterogeneous lazy lists where it improves reuse. Never use a changing index as identity for reorderable content. Put lazy containers in bounded constraints and avoid nesting scrollable containers with unbounded size along the same axis.

Defer rapidly changing state reads to layout/draw when the property permits it:

```kotlin
val alpha by animateFloatAsState(targetValue = if (visible) 1f else 0f)
Box(Modifier.graphicsLayer { this.alpha = alpha })

fun Modifier.animatedOffset(offsetProvider: () -> IntOffset): Modifier =
    offset { offsetProvider() }
```

This applies to draw/placement properties; layout-changing animations may legitimately require layout or recomposition. Do not ban all recomposition or all high-level animation APIs. Profile expensive paths and keep reduced-motion/accessibility behavior appropriate.

## Text input

For new code, prefer state-based Material text fields when supported by the project's selected versions. Use `TextFieldState`, `InputTransformation`, and `OutputTransformation` for input ownership, filtering, and display formatting. Preserve IME composition and selection; do not debounce the immediate text update. Debounce downstream searches/validation instead.

```kotlin
@Composable
fun QueryInput(onSearch: (String) -> Unit) {
    val query = rememberTextFieldState()
    Column {
        TextField(
            state = query,
            label = { Text(stringResource(R.string.search_query)) },
            lineLimits = TextFieldLineLimits.SingleLine
        )
        Button(onClick = { onSearch(query.text.toString()) }) {
            Text(stringResource(R.string.search))
        }
    }
}
```

Imports come from `androidx.compose.foundation.text.input`, `androidx.compose.foundation.text.input.TextFieldLineLimits`, Material 3, and native resource APIs. A ViewModel may own the field state when screen/business logic needs it; local ownership is valid otherwise. Add restoration/persistence explicitly for required drafts. For an existing value-based field, update its value synchronously and preserve selection/composition; migrate with the installed API rather than forcing every key through an async reducer.

## Windows, insets, and previews

Adapt to the current window, not a device-name or orientation heuristic. Use AndroidX adaptive/window APIs supported by the selected versions; recompute when resizing or folding changes available space. Choose navigation bar/rail and one-/two-pane layouts from content and available width. Handle system bars, display cutouts, and IME insets; avoid applying the same padding twice. Preserve destination and selection across layout changes.

Test compact and expanded windows, multi-window, fold posture where relevant, font scaling, RTL, keyboard input, and TalkBack focus order. Individual components should fit their assigned constraints rather than detect device form factors. Keep meaningful Screen previews in native `src/main`; wrap in theme and use realistic sample states without DI.

Sources: [state ownership](https://developer.android.com/develop/ui/compose/state-hoisting), [stability](https://developer.android.com/develop/ui/compose/performance/stability/fix), [text-field migration](https://developer.android.com/develop/ui/compose/text/migrate-state-based).

## Avoid lifecycle and privacy leaks

For search, debounce the downstream request, cancel obsolete work with a suitable latest operator, and verify that an older response cannot overwrite a newer query. Cancellation is cooperative; use request/session identity checks at the commit boundary when needed. Never launch domain writes from a recomposition or a preview. Avoid collecting the same cold network flow independently in several children.

Do not retain passwords or sensitive records in saveable state simply to preserve a screen. Define session expiry, logout, clipboard and screenshot policy with the owning product/security contract. Test large images and long lists with realistic bounds; decode/resize images for display rather than allocating full-resolution media on Main.
