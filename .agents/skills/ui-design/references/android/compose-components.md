# Android Compose Components

Use native AndroidX Compose/Material 3 in Android modules with `src/main/res` and the owning module's `R` class. Read [presentation](presentation-mvi.md) for Root/Screen boundaries and [architecture](compose-architecture.md) for state, effects, adaptive layouts, and text input.

## Parameters and state

Pass only data a component needs; avoid taking an entire screen state or a ViewModel. Name callbacks after interactions (`onDeleteClick`, `onQueryChange`). Include `modifier: Modifier = Modifier` as the first optional parameter and apply it to the component's outermost UI node. Respect caller constraints; do not reuse one caller modifier across several children.

```kotlin
@Composable
fun NoteItem(
    title: String,
    onNoteClick: () -> Unit,
    onDeleteClick: () -> Unit,
    modifier: Modifier = Modifier,
    isExpanded: Boolean = false
) {
    // Render inputs and forward actions. Apply modifier at the root.
}
```

Hoist state when callers must coordinate it or business logic needs it. Purely local expansion, focus, scroll, and animation state may remain local; use saveable state where restoration matters. Offer stateless/stateful variants when that improves reuse. Do not send every visual toggle to a ViewModel by default.

Use typed parameters for stable component structure. Offer `@Composable` slots when content shape genuinely varies, especially design-system containers. Slots are not limited to a particular module type. Keep UI-only transformations local where appropriate; business transformations belong outside components.

## Material 3 and design-system reuse

Check `:core:design-system` and existing feature components before adding another primitive. Reuse or extend a suitable component. Prefer a matching Material 3 base for app-wide primitives: `FilledTonalIconButton`, `OutlinedTextField`, `AlertDialog`, tabs, and other appropriate variants. Customize colors, shape, border, padding, and slots through supported parameters.

Use lower-level layout/drawing primitives when the design or interaction cannot be modeled adequately by an existing component. Preserve accessibility roles, focus/input support, state indication, and touch targets when doing so; Material 3 is a useful base, not a requirement for every arbitrary composable.

```kotlin
@Composable
fun AppIconButton(
    onClick: () -> Unit,
    icon: Painter,
    contentDescription: String,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    FilledTonalIconButton(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        shape = CircleShape
    ) {
        Icon(painter = icon, contentDescription = contentDescription)
    }
}
```

For a standard clickable icon, use an IconButton/toggle-button variant rather than an unlabelled bare Icon with `clickable`. Ensure the **effective** interactive target is at least 48dp without overlapping neighboring controls, even when the visual glyph is smaller. Do not force an undersized touch target with hard constraints. Reflect a toggle's action/state in the appropriate description, role, or state semantics.

## Native icons and resources

Use the project's icon family before adding a different one. A central icon object is an optional useful convention:

```kotlin
object AppIcons {
    val Edit: Painter @Composable get() = painterResource(R.drawable.ic_edit)
    val Delete: Painter @Composable get() = painterResource(R.drawable.ic_delete)
}
```

Use `androidx.compose.ui.res.painterResource` and the design-system module's `R`. Import vetted vector drawable XML into `src/main/res/drawable` with Android Studio Vector Asset or an available design export tool; check viewport, path support, tint, and auto-mirroring. No separate skill or Figma connection is required. Do not add an icon dependency solely for an example if the project already owns a suitable vector.

Load user-visible static/localizable text with `stringResource(R.string...)` and quantities with `pluralStringResource(R.plurals..., quantity, ...)`. Dynamic user content stays dynamic. Give translators meaningful placeholders and context; avoid concatenating sentence fragments. Resources shared across features belong to an appropriate shared Android library, not an arbitrary feature. Import the owning library's R with non-transitive resource classes.

For directional icons, use auto-mirrored vectors where semantics require it; logos and non-directional symbols should not be mirrored automatically.

## Size, theme, and accessibility

Prefer `fillMaxWidth`, `weight`, `widthIn`/`heightIn`, wrapping, and suitable aspect ratios for flexible containers. Fixed dp values are density-independent and appropriate for design constants such as spacing/icons; fixed whole-screen widths and text-height constraints often fail on resized windows or large fonts. Adapt to available constraints rather than guessing device type.

Use `MaterialTheme.colorScheme`, typography, shapes, or the established extended theme. Keep raw palette constants inside theme definitions instead of binding components to one theme. Preserve sufficient contrast in enabled, selected, focused, and error states; do not communicate state by color alone.

Give meaningful native string descriptions to informative images and icon-only controls; use `null` for decorative images. Text-labeled controls usually already expose their label and should not receive a duplicate description. Use roles, selected/toggle state, headings, error semantics, and traversal/grouping where appropriate. Check TalkBack and keyboard/switch access for complex controls; previews do not validate accessibility behavior.

## Decomposition, visibility, and modifiers

Extract composables for coherent independent UI concepts, reuse, or clarity. Start private for file-local helpers and internal for module-local APIs; expose public feature entrypoints/design-system APIs when other modules need them. Public composables are not restricted to the design-system module.

Prefer built-in modifiers or plain modifier factories. For custom modifier behavior, use `Modifier.Node` when suitable; avoid introducing `Modifier.composed` for new code without a specific compatibility reason. A composable modifier factory can be valid when it actually needs composable APIs, but consider modifier nodes and the composition-local lookup scope before choosing it. Do not advertise `composed {}` as a composition-free extension.

Read animation values inside `graphicsLayer {}` or `offset {}` where the property permits deferring reads to drawing/placement. High-level layout animations remain valid when layout must change; measure performance instead of banning recomposition. Use effects for real UI lifecycles such as focus/registration, with correct keys and cleanup, not for hidden business operations.

## Previews and verification

Use native `androidx.compose.ui.tooling.preview.Preview`, theme-wrapped realistic sample data, and stateless entrypoints. Cover distinct meaningful visual states: enabled/disabled, selection/expansion variants, empty/loading/error content where applicable, long text, light/dark themes, relevant widths, and large fonts. Do not generate impossible combinations solely to expand coverage.

Separate named functions, multipreview annotations, and `PreviewParameter` are all valid; choose the format that keeps states easy to inspect. Native `@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)`, `widthDp`, and `fontScale` are available. Add compact/expanded and `fontScale = 2f` samples when reflow can fail. Include `ui-tooling-preview` for main compilation and keep the tooling runtime debug-only.

Previews complement tests. Add behavior and semantics tests for complex interactive components, and exercise action wiring and flows with the project's UI runner when warranted. The optional `android-ui-testing` skill covers that setup. A static preview does not prove touch, focus, semantics, restoration, or rendered pixel correctness.

Sources: [Compose API guidelines](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/docs/compose-api-guidelines.md), [accessibility](https://developer.android.com/develop/ui/compose/accessibility), [custom modifiers](https://developer.android.com/develop/ui/compose/custom-modifiers).

## Component acceptance example

For an icon-only Delete action: verify a localized accessible action name, one correct click target, disabled/loading behavior, and keyboard/TalkBack operation. Trigger deletion via the passed callback; do not delete directly from drawing/effect code. A destructive icon or a color alone is not an authorization check. Test that repeated activation obeys the owning action policy.

For stateful inputs, keep IME composition/selection intact and preserve password-manager/autofill support. Use semantic error/selected/toggled state rather than announcing the same icon and label twice. UI component examples with a comment-only body are outlines; implement their rendering, resources and callbacks before delivering product code.
