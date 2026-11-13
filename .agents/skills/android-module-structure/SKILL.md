---
name: android-module-structure
description: Implement native Android/Kotlin JVM module boundaries, Gradle conventions and build configuration in an existing or authorized project. Use for concrete module/build changes; use penta-pro for requirements, architecture proposals and readiness specifications, and peer-review for read-only code review.
license: MIT
metadata:
  version: "1.4.0"
---

# Native Android Module Structure

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

For new native modules, use `com.android.application` for apps, `com.android.library` for Android libraries, and `org.jetbrains.kotlin.jvm` for framework-free Kotlin modules. Match the app’s existing UI toolkit, variants, dependency injection and resource ownership.

## Choose boundaries from ownership

Start with the project's existing structure and complexity. Feature-first layering is useful when features have independent data/presentation responsibilities; small features may share one module. Do not create a module for one trivial helper or require a domain/use-case layer without a real responsibility.

```text
:app                            Application, manifest, navigation/DI composition
:core:domain                    Shared domain contracts and error types
:core:data                      Shared transport/storage policy
:core:presentation              Shared Android UI helpers and resource-backed text
:core:design-system             Jetpack Compose theme, primitives, icons
:core:database                  Shared Room database, entities, DAOs, migrations
:core:testing                   Reusable test fixtures only, when needed
:feature:notes:domain           Feature contracts and models, if a separate module pays off
:feature:notes:data             Data implementations and DTO mapping
:feature:notes:presentation     ViewModels, routes, screens, feature resources
build-logic/                    Included Gradle build, not an application subproject
```

Keep code within the owning feature until multiple consumers justify a shared module. A database owned by one feature may use `:feature:notes:database`; do not duplicate a shared database per feature. Put related schema/migration ownership in the same database module.

| Module | Permitted dependencies in this layout |
|---|---|
| feature presentation | Its domain/API, core domain/presentation/design-system |
| feature data | Its domain/API, core domain/data, owning database |
| feature domain | Core domain and required Kotlin/JVM libraries; no Android UI/data implementation |
| database | Room and schema dependencies; no presentation |
| app | Required feature entrypoints and DI modules; application assembly |
| test fixtures | Test-facing contracts/utilities; never a production dependency |

Avoid direct feature implementation dependencies. Coordinate cross-feature navigation through callbacks assembled in the app; extract a narrow contract for genuinely shared domain interactions. Use Gradle `implementation` by default and `api` only when a dependency is part of a module's public API. Feature entrypoints must be public when the app consumes them; `internal` is module-scoped.

## Build configuration

Use an included `build-logic` build and version catalog for repeated configuration. Keep plugin versions, dependency versions, BOMs, and SDK/JVM choices compatible with the Gradle wrapper and Android Studio. Do not upgrade the entire toolchain as a side effect of adding a feature.

Read [native build-logic examples](references/build-logic.md) when creating conventions, Room/KSP setup, or catalog wiring. It covers included-build catalog access, native application/library conventions, Compose tooling, and registration through precompiled script plugin filenames.

AGP 9 enables built-in Kotlin by default. Inspect effective settings and supported per-module overrides before changing plugins. Use one Kotlin implementation per Android module. On AGP 9 versions that support temporary opt-out, projects retaining `org.jetbrains.kotlin.android` also need the compatible old DSL (`android.builtInKotlin=false` and `android.newDsl=false` for the documented project-wide opt-out). Check the migration guide for the actual AGP version before editing flags. Kotlin/JVM modules use their own Kotlin plugin. Align Compose and serialization plugins with the effective Kotlin compiler, and use public `com.android.build.api.dsl` APIs.

For a deliberate built-in Kotlin migration, also inspect annotation processing and source directories: legacy `org.jetbrains.kotlin.kapt` is incompatible with that mode; use supported KSP or the documented AGP legacy-kapt path when needed. Move custom Kotlin sources through supported Android source APIs rather than assuming the old Kotlin source-set DSL still applies. Do not remove a processor until its generated-code consumers have a verified replacement.

Keep Java and Kotlin bytecode targets aligned, and choose a JDK supported by the selected Gradle/AGP versions. Enable core-library desugaring only for required Java APIs on the supported minSdk. Enable configuration/build caches where supported and fix incompatible custom tasks before treating caching as effective. Prefer provider-backed configuration over environment reads or internal `gradleLocalProperties` helpers.

## Native dependencies and resources

Keep the app's current stack. Use the Compose BOM when the project selects AndroidX Compose. Domain modules can use coroutines, `java.time` where supported by their runtime consumers, and other Kotlin/JVM libraries without becoming Android modules.

Each Android module owns its `namespace`, `src/main/res`, strings, plurals, and drawables. Share resources through appropriate Android library modules or public UI/accessor APIs. Reference the owning module's `R`; respect non-transitive R classes and resource visibility. Prefix resource names where that prevents collisions.

Use `BuildConfig` only for non-secret build configuration such as an endpoint or public client identifier; explicitly enable generation in modules that need it. Inject environment configuration into services for testability. `local.properties` and CI variables keep values out of source control, but generated APK constants are extractable. Keep server secrets on a server; configure signing credentials outside committed build files. Configure release shrinking/resource shrinking and keep rules according to the app's libraries, then exercise the release build.

This optional reference stack uses Android/JVM artifacts and Android source sets. Use an existing project's equivalent choices, such as Hilt or Retrofit, with their own integration and tests.

| Concern | Native project choice |
|---|---|
| UI and adaptation | AndroidX Jetpack Compose/Material 3 and AndroidX adaptive/window APIs |
| Navigation/lifecycle | AndroidX Navigation and Lifecycle |
| DI | Koin Android integrations |
| HTTP/serialization | Ktor with OkHttp and Kotlin serialization |
| Persistence | Android Room and Preferences/Proto DataStore |
| Images | The project's Android Compose image loader, such as Coil; preserve lifecycle/caching behavior and test loading/error content |
| Logging | Android logging or the established Android logger, with redaction and release policy |
| Durable background work | AndroidX WorkManager |
| Tests | Supported JUnit host/device engines, coroutine-test, Turbine, and the established assertions |

## Add a feature

1. Select the smallest useful module boundaries; add chosen modules to `settings.gradle.kts`.
2. Apply the native conventions and assign a unique namespace where required.
3. Add explicit permitted dependencies, native resources, and the feature API.
4. Register the feature in the app’s existing composition root and navigation when required. Use the optional `android-di-koin` and `ui-design` Android navigation examples when they match the project.
5. If using Room, configure KSP/schema export and migration coverage in the owning database module.
6. Run affected unit tests, lint, and a representative debug/release assembly. Run relevant device tests; do not report a documented command as an executed result.

## Supply chain and release handoff

Pin reproducible tool/dependency inputs and verify their origin before adding a repository or plugin. Keep approved repositories, dependency verification and signing controls in place while diagnosing build failures. Keep signing credentials outside tracked files and restrict CI access. Inspect the merged release manifest, effective network/backup config and minified output on the relevant release variant. The optional `cybersec` skill supplies native Android security controls.

Use targeted lint and meaningful host/device checks for affected behavior. For startup or scrolling performance work, capture a baseline and compare profileable/release behavior using supported benchmark tooling and representative devices; do not infer speed from fewer recompositions or more modules. Baseline Profiles and caching are optional measured optimizations, not substitutes for functional checks.

Maintainers evaluating another model/host can use the [cross-skill scenarios](evals/scenarios.md). A structural validator does not establish how well that model implements an Android app.

For a new runner, device, or uncertain build setup, use the [Android execution guidance](references/execution.md#verify-a-new-device-or-runner-before-feature-work) to verify the target before implementation.

Sources: [built-in Kotlin](https://developer.android.com/build/migrate-to-built-in-kotlin), [Gradle convention plugins](https://docs.gradle.org/current/userguide/implementing_gradle_plugins_convention.html).
