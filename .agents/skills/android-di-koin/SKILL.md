---
name: android-di-koin
description: Implement or debug Koin bindings, Android ViewModel ownership and application/worker dependency wiring. Use for concrete DI code changes; use peer-review for independent inspection and ui-design for screen design.
license: MIT
metadata:
  version: "1.2.4"
---

# Android Dependency Injection with Koin

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Use the selected Android Koin integration and compatible versions. Keep dependency injection at composition roots and constructors. For an existing Hilt or other DI project, use its integration and testing workflow. Adding a second container belongs to an intentional migration.

## Dependencies and imports

Use `io.insert-koin:koin-android` for application startup/Context and `io.insert-koin:koin-androidx-compose` for the Android Compose integration. Use the Koin BOM or consistently aligned catalog versions. Add `koin-androidx-workmanager` only for workers. Do not assume an online example's imports match the installed Koin release.

Constructor DSL imports include `org.koin.core.module.dsl.singleOf` and `factoryOf`; `bind` is the declaration DSL, and `viewModelOf`/`koinViewModel` imports must match the selected integration version. Recent releases expose ViewModel DSL through `org.koin.core.module.dsl.viewModelOf` and Compose acquisition through `org.koin.compose.viewmodel.koinViewModel`; older Android integrations expose AndroidX package paths. Verify exported symbols rather than adding another UI platform integration merely to satisfy an import.

## Feature bindings and lifetimes

Create modules for actual bindings, usually one per feature layer. Assemble them in the Android application. Prefer constructor references for ordinary constructors; use lambdas for factory calls, named qualifiers, runtime parameters, and controlled initialization.

```kotlin
val notesDataModule = module {
    singleOf(::OfflineFirstNoteRepository) { bind<NoteRepository>() }
}
val notesPresentationModule = module {
    viewModelOf(::NoteListViewModel)
    viewModelOf(::NoteDetailViewModel)
}
```

A repository constructor's data-source interfaces must also have bindings. Register the native transport engine, configured HttpClient, DAO/database, and DataStore only where needed. The optional `android-data-layer` skill covers their construction and lifetimes. Prefer a singleton for an owned database/client, a ViewModel definition for a ViewModel, and a factory when a new instance per resolution is intended. Keep Activity-scoped state in its owner.

## Application composition

```kotlin
class NotesApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidContext(this@NotesApplication)
            modules(coreDataModule, notesDataModule, notesPresentationModule)
        }
    }
}
```

Declare the application class in `AndroidManifest.xml`. Start Koin once in that process before resolving dependencies; do not restart it on every Activity or screen composition. Account for Android startup providers/workers and extra processes if the app uses them.

Acquire a ViewModel at the Root/destination:

```kotlin
@Composable
fun NoteDetailRoot(viewModel: NoteDetailViewModel = koinViewModel()) {
    // Collect with lifecycle awareness; pass state and callbacks to Screen.
}
```

Confirm which navigation integration and ViewModel API the installed Koin artifacts provide. Use the current navigation entry's `ViewModelStoreOwner`/creation extras so arguments reach `SavedStateHandle`. Declare `SavedStateHandle` as a ViewModel constructor parameter; do not register a global singleton handle or create a fresh handle on every recomposition. A shared graph ViewModel requires an intentional parent owner. Qualifiers/keys distinguish instances within the same owner; parameters are applied on creation, not a command to mutate an existing ViewModel.

Resolve dependencies once at appropriate Compose boundaries. Pass values/callbacks to children rather than a ViewModel or container. Keep an Android Activity Context scoped to the Activity; use application Context for application-lived services. Close resources in their owner, and release scopes without retaining destroyed Android components.

## Workers and verification

Check factory ordering, initializer removal, and worker registration using the optional `android-background` skill or the installed integration's documentation. WorkManager has one initialization owner.

When the Koin Compiler Plugin covers the application entrypoint, use its checks for static graph, qualifier and scope errors. Verify which variants and module lists it can resolve. For projects outside that coverage, use the supported constructor verification API, such as `verify()` or `androidVerify()` where available. For runtime parameters, properties, dynamic modules, and Android navigation or startup, test the actual configured owner and assert the resolved instance or behavior. Use isolated containers and close/reset them between tests. [Compiler checks](https://insert-koin.io/docs/reference/koin-compiler/compile-safety/) · [Koin verification](https://insert-koin.io/docs/reference/koin-test/verify/)

## Resolve all bindings before calling a feature complete

Walk each constructor from the app composition root: concrete implementation, interface binding, qualifier, runtime parameters and lifetime. A module definition containing only a repository binding is not a complete graph if its data sources are absent. Check which scope owns every closeable instance captured by a longer-lived dependency. If switching accounts replaces a scoped repository, verify that an existing ViewModel resolves fresh state through the intended owner or is recreated. For a destination with SavedStateHandle, exercise resolution under the real navigation entry owner; do not fix it by registering one global handle.

Account-scoped services must not outlive their credentials/data policy. Close/reset owned clients and scopes on session replacement, reject late old-account writes, and never retain Activity/Composable references in singleton definitions. Verify the merged Application/startup configuration in the actual release variant, not only a test container with overrides.

Sources: [Android Koin ViewModels](https://insert-koin.io/docs/reference/koin-android/viewmodel/), [Compose ViewModels](https://insert-koin.io/docs/reference/koin-compose/compose-viewmodel/), [Koin WorkManager](https://insert-koin.io/docs/reference/koin-android/workmanager/).
