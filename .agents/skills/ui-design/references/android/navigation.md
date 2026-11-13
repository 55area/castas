# Android Compose Navigation

Use the project's native AndroidX Navigation API. The example below uses Navigation Compose 2.x type-safe routes; a project already using Navigation 3 should retain its back-stack/key model rather than mixing the two APIs. Resolve the installed versions before choosing imports or migrating.

For Navigation Compose, add `androidx.navigation:navigation-compose` and the compatible Kotlin serialization plugin in each module declaring `@Serializable` routes. Keep all dependency versions in the catalog. Use `androidx.navigation.compose.*` and `androidx.navigation.toRoute`.

## Feature graph and destination identity

Define routes in the owning feature presentation module. Use separate route types for a nested graph and its start destination; reusing one type for both creates conflicting route identities.

```kotlin
@Serializable data object NotesGraph
@Serializable data object NoteListRoute
@Serializable data class NoteDetailRoute(val noteId: String)

fun NavGraphBuilder.notesGraph(
    navController: NavHostController,
    onEditNote: (String) -> Unit
) {
    navigation<NotesGraph>(startDestination = NoteListRoute) {
        composable<NoteListRoute> {
            NoteListRoot(onNoteClick = { id -> navController.navigate(NoteDetailRoute(id)) })
        }
        composable<NoteDetailRoute> { entry ->
            val route = entry.toRoute<NoteDetailRoute>()
            NoteDetailRoot(
                noteId = route.noteId,
                onBack = { navController.popBackStack() },
                onEdit = { onEditNote(route.noteId) }
            )
        }
    }
}
```

The root navigation composition in `:app` owns cross-feature knowledge:

```kotlin
@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = NotesGraph) {
        notesGraph(navController, onEditNote = { id -> navController.navigate(EditorRoute(id)) })
        editorGraph(navController)
    }
}
```

`EditorRoute`/`editorGraph` are the editor feature's public entrypoints. A feature should not import another feature's concrete routes; expose callbacks and assemble them in the application. Make graph functions/routes public where consumed across modules. Stateless Screen composables receive callbacks, not a NavController.

## Arguments and ViewModel scope

Pass stable IDs and small scalar arguments, then load current data at the destination. Do not serialize large models, credentials, or user-sensitive payloads into routes. Treat route/deep-link arguments as untrusted inputs and validate authorization when loading the data.

Acquire a destination ViewModel inside its `composable` entry with the project's selected factory or DI integration and the current entry's owner. For projects that use Koin, the optional `android-di-koin` skill covers native bindings. A ViewModel can decode typed arguments with `SavedStateHandle.toRoute<NoteDetailRoute>()`. Use one consistent source for the ID. Use a parent graph owner only when the product intentionally shares a ViewModel, and clear it when that graph leaves the stack.

For top-level tabs, choose `launchSingleTop`, `restoreState`, and `popUpTo(...){ saveState = true }` deliberately to avoid duplicate stacks and preserve each tab as required. After successful authentication, remove login destinations when back navigation must not return to them. Do not repeatedly navigate from an unacknowledged boolean during recomposition.

## Native Android back and links

Let the navigation host handle ordinary system back. Use Android `BackHandler`/`PredictiveBackHandler` only for a real interception requirement, such as confirming unsaved changes, and test gesture cancellation. Top bars should offer appropriate Up/back affordances and accessible labels. Test system Back separately from toolbar Up because their semantics can differ.

Declare Android deep links/App Links through the selected Navigation API and the manifest. An internal deep-link declaration alone does not expose the Activity externally. Match scheme/host/path narrowly, configure domain verification for verified App Links, and validate incoming arguments and access checks. Exercise cold start, an existing task, missing/deleted IDs, unauthenticated entry, and back-stack outcomes. Route `onNewIntent` through the host if the chosen Activity launch mode requires it.

## Verify

Test graph start, typed argument decoding, cross-feature callbacks, duplicate taps, relevant tab restoration, system back/Up, protected destinations, and links. Use `TestNavHostController` with the compatible Compose navigator for isolated graph checks. Exercise full flows through the native test harness, with the optional `android-ui-testing` skill where available. A simple recomposition test leaves process-death restoration unverified.

Sources: [Navigation Compose](https://developer.android.com/develop/ui/compose/navigation), [type-safe routes](https://developer.android.com/guide/navigation/design/type-safety).

## Treat external navigation as a trust boundary

An external link may identify a resource but must not directly authorize a delete, payment or privilege change. Parse the URI with platform APIs, validate exact scheme/host/path and argument constraints, then enforce account/record access in the responsible operation. Do not accept a host because its text contains a trusted domain. Check redirected and nested intents as well as the first URL. The optional `cybersec` skill has Android controls for exported components and URI grants.

Test direct entry with no parent stack, a missing/deleted record, malformed arguments, another account's record and session expiry while the screen is open. A type-safe route prevents some serialization mistakes; it does not validate domain ownership or authorize data access.
