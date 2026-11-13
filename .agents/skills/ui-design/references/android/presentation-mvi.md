# Android Presentation with MVI

Use AndroidX Lifecycle and Jetpack Compose in Android modules. Keep business logic outside composables; keep UI-only state at its appropriate owner. Read [screen architecture](compose-architecture.md) for state ownership, effects, text input, and performance, and [component patterns](compose-components.md) for reusable UI.

The MVI, Koin and shared-module shapes below are examples for projects that select them. Preserve an existing coherent presentation/DI approach; do not add Koin, an MVI action layer or a `core:presentation` module merely to copy a snippet. Apply the state, ownership and evidence principles through the project's actual interfaces.

## State and actions

Expose immutable `StateFlow<ScreenState>` from a ViewModel and update a private `MutableStateFlow` atomically with `update`. Keep state meaningful: model mutually exclusive loading/content/error states explicitly when a set of booleans would permit impossible combinations. Preserve existing content during refresh when that matches the product.

Keep the `update` transformation pure: it can be evaluated more than once under contention. Perform writes, navigation, logging with side effects and ID allocation outside that lambda, then commit the derived state. Atomic UI-state replacement does not make a separate repository operation atomic. See [`MutableStateFlow.update`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/update.html).

Actions describe interactions (`OnRefreshClick`, `OnSubmit`); navigation directly known from a click can go through a UI callback. Do not define an unused Action case and then leave a sealed `when` non-exhaustive. Keep public mutable collections out of state. Add a UI model such as `NoteUi` when domain data needs presentation formatting; do not make redundant copies of already suitable data. Use explicit locale/timezone policies for formatted dates and currency.

```kotlin
data class NoteListState(
    val notes: List<NoteUi> = emptyList(),
    val isRefreshing: Boolean = false,
    val error: UiText? = null
)
sealed interface NoteListAction {
    data object OnRefreshClick : NoteListAction
    data object OnDismissError : NoteListAction
}
```

A ViewModel observes the repository's data stream, handles actions in `viewModelScope`, and exposes expected failures as state. For an offline repository, call `refresh()` for synchronization and render `observeNotes()`; do not replace database observation with the returned HTTP response. Handle a stream's known upstream failures deliberately. Guard duplicate submissions and define cancellation/stale-response behavior, rather than allowing older requests to overwrite newer state.

Use injectable dispatchers for code that explicitly dispatches, and an injectable clock for time-dependent logic. Keep suspend functions main-safe at the layer doing the work. `viewModelScope` uses Main; unit tests can replace Main. CPU-heavy work belongs on Default and blocking I/O on IO; Room/Ktor suspend operations ordinarily manage their own execution.

## Root and Screen

The Root owns ViewModel acquisition and lifecycle collection. The Screen renders inputs and emits callbacks; children receive the fields they need, not the ViewModel. Keeping Root and Screen in one file is a useful convention, not a framework requirement.

```kotlin
@Composable
fun NoteListRoot(
    onNoteClick: (String) -> Unit,
    viewModel: NoteListViewModel = koinViewModel()
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    NoteListScreen(state = state, onAction = viewModel::onAction, onNoteClick = onNoteClick)
}

@Composable
fun NoteListScreen(
    state: NoteListState,
    onAction: (NoteListAction) -> Unit,
    onNoteClick: (String) -> Unit
) {
    // Render state and pass callbacks to native Compose components.
}
```

Use `androidx.lifecycle.compose.collectAsStateWithLifecycle`, Compose runtime `getValue`, and the `koinViewModel` import provided by the installed Koin version. Resolve Lifecycle and Koin artifacts against the project's catalog. The optional `android-di-koin` skill covers the native setup.

## Transient effects and delivery

Prefer state for results that must remain observable until handled, including critical completion, session changes, field errors, and important messages. A queued notice can have an ID and an acknowledgement action; remove it only after handling. Recreating the screen should not replay an already acknowledged operation. Derive login navigation from the authentication/session state where possible.

A Channel/Flow of best-effort events is optional, not a required MVI layer. Use it only when losing a transient effect is acceptable and document single-consumer, buffering, and lifecycle behavior. A Channel does not guarantee delivery after process death, and cancellation after receive can lose an event. Do not launch critical writes from UI event collectors.

For an existing best-effort event Flow, define its helper rather than referring to a missing utility:

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberUpdatedState
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.flow.Flow

@Composable
fun <T> ObserveAsEvents(events: Flow<T>, onEvent: suspend (T) -> Unit) {
    val lifecycleOwner = LocalLifecycleOwner.current
    val currentHandler by rememberUpdatedState(onEvent)
    LaunchedEffect(events, lifecycleOwner) {
        lifecycleOwner.lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
            events.collect { currentHandler(it) }
        }
    }
}
```

The helper controls collection, not persistence or exactly-once delivery. A snackbar requiring reliable acknowledgement is better represented in state. Do not create an event merely to navigate on an ordinary item click.

## Native resource-backed text

Place `UiText` and shared mappings in the project's existing Android presentation owner; a `core:presentation` module is appropriate only when actual shared consumers justify it. Keep feature mappings and resource IDs in their owning feature. Do not store a Context in the ViewModel.

```kotlin
import android.content.Context
import androidx.annotation.PluralsRes
import androidx.annotation.StringRes
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource

sealed interface UiText {
    data class Dynamic(val value: String) : UiText
    data class Resource(@param:StringRes val id: Int, val args: List<Any> = emptyList()) : UiText
    data class Plural(
        @param:PluralsRes val id: Int,
        val quantity: Int,
        val args: List<Any> = emptyList()
    ) : UiText
}

@Composable
fun UiText.asString(): String = when (this) {
    is UiText.Dynamic -> value
    is UiText.Resource -> stringResource(id, *args.toTypedArray())
    is UiText.Plural -> pluralStringResource(id, quantity, *args.toTypedArray())
}

fun UiText.resolve(context: Context): String = when (this) {
    is UiText.Dynamic -> value
    is UiText.Resource -> context.getString(id, *args.toTypedArray())
    is UiText.Plural -> context.resources.getQuantityString(id, quantity, *args.toTypedArray())
}
```

Resolve outside composition with the current UI Context when needed. Android formatting is synchronous; no asynchronous resource wrapper is necessary. Use native `R.string.*` and `R.plurals.*`; include the quantity in formatting arguments if the resource has a numeric placeholder. Use plain `String` for inherently dynamic content such as an author's name. Map typed errors here, not inside domain/data code.

## Restoration and input

Use `SavedStateHandle` for small essential screen state after system-initiated process recreation. Read typed navigation arguments with `savedStateHandle.toRoute<DetailRoute>()` when using the selected Navigation API. Keep keys consistent and use Bundle-compatible values. Save IDs and drafts, not full object graphs, passwords, or access tokens. Persist large/long-lived drafts in Room or DataStore. Force-stop, task dismissal, and arbitrary app termination are not guaranteed saved-state restoration paths.

For state-based text fields, follow [text ownership](compose-architecture.md). If the ViewModel owns `TextFieldState`, save required draft text explicitly or use the supported saver at a UI owner; ViewModel construction alone does not persist it. Read current field values on submit instead of forcing every keystroke through an asynchronous state-flow loop.

Test saved-state initialization with a real `SavedStateHandle`, and test save/restore and lifecycle boundaries separately on Android. Constructing a second ViewModel from a map does not prove the OS restoration path.

## Screen previews and checks

Wrap previews in the app theme. Supply realistic content, empty/loading/error variants where relevant, large fonts, and relevant widths. Preview the stateless Screen without starting DI or a network client.

Verify action handling, duplicate submission, late responses, error clearing on retry, cancellation, locale changes, and restoration. Use the project's unit runner for state logic and its native harness for rendered behavior. Optional helpers are `android-unit-testing` and `android-ui-testing`.

Sources: [UI events](https://developer.android.com/topic/architecture/ui-layer/events), [saved state](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate).

## Concrete wiring and sensitive state

For the minimum Notes example, define the actual NoteUi mapper, ViewModel, repository bindings, resources and fake before copying its test. The state and action snippets describe contracts, not generated implementations. On refresh, retain the repository's observed data, expose pending/error separately, prevent overlapping submissions according to policy, clear stale error on a new attempt, and reset pending state in finally while preserving cancellation. Do not invent an events Flow when the screen has only state and click callbacks.

Account changes invalidate owned data/jobs and must prevent late responses from restoring another user's content. Credentials, passwords and sensitive payloads must not enter route arguments, SavedStateHandle, Compose saved state or exception messages. An acknowledged message held only in memory still does not survive arbitrary process loss; persist only when the actual retention policy requires it.
