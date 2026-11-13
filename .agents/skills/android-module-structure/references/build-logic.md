# Native build-logic examples

Use these patterns when a project actually needs reusable conventions. Adapt aliases and SDK levels to its catalog. Examples assume AGP 9+ with built-in Kotlin; for a supported older AGP stack, apply the compatible Kotlin Android plugin in Android conventions instead. Do not mix both modes.

## Included build and catalog

In the root `settings.gradle.kts`, put plugin management first:

```kotlin
pluginManagement {
    includeBuild("build-logic")
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories { google(); mavenCentral() }
}
rootProject.name = "Notes"
include(":app", ":core:domain", ":core:design-system")
```

`build-logic/settings.gradle.kts`:

```kotlin
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
    versionCatalogs {
        create("libs") { from(files("../gradle/libs.versions.toml")) }
    }
}
rootProject.name = "build-logic"
include(":convention")
```

`build-logic/convention/build.gradle.kts`:

```kotlin
plugins { `kotlin-dsl` }
dependencies {
    implementation(libs.android.gradlePlugin)
    implementation(libs.kotlin.gradlePlugin)
    implementation(libs.compose.compiler.gradlePlugin)
    implementation(libs.ksp.gradlePlugin)
    implementation(libs.room.gradlePlugin)
}
```

The included build needs its own catalog import. The plugin implementation artifacts must be available at runtime when conventions apply external plugins; `compileOnly` alone is not sufficient for a self-contained included build. Use precompiled script plugin filenames as plugin IDs; do not add redundant manual `gradlePlugin` registrations for them.

In the root catalog, define the matching plugin implementation libraries using the project's compatible versions:

```toml
[libraries]
android-gradlePlugin = { module = "com.android.tools.build:gradle", version.ref = "agp" }
kotlin-gradlePlugin = { module = "org.jetbrains.kotlin:kotlin-gradle-plugin", version.ref = "kotlin" }
compose-compiler-gradlePlugin = { module = "org.jetbrains.kotlin:compose-compiler-gradle-plugin", version.ref = "kotlin" }
ksp-gradlePlugin = { module = "com.google.devtools.ksp:symbol-processing-gradle-plugin", version.ref = "ksp" }
room-gradlePlugin = { module = "androidx.room:room-gradle-plugin", version.ref = "room" }
```

These are catalog additions, not a complete standalone catalog: define `agp`, `kotlin`, `ksp`, and `room` in `[versions]`, plus aliases used below. Do not invent `unspecified` versions for external plugins. Select versions from the actual toolchain compatibility requirements, including AGP's effective Kotlin compiler.

## Android library convention

`build-logic/convention/src/main/kotlin/app.android.library.gradle.kts`:

```kotlin
import org.gradle.api.artifacts.VersionCatalogsExtension

plugins { id("com.android.library") }
val catalog = extensions.getByType<VersionCatalogsExtension>().named("libs")
android {
    compileSdk = catalog.findVersion("compileSdk").get().requiredVersion.toInt()
    defaultConfig {
        minSdk = catalog.findVersion("minSdk").get().requiredVersion.toInt()
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
```

JVM 17 here is an example bytecode level, not a universal Gradle runtime requirement. With built-in Kotlin, an unset `kotlin.compilerOptions.jvmTarget` defaults to `android.compileOptions.targetCompatibility`; do not add redundant incompatible settings. For legacy Kotlin Android or explicit overrides, align the effective Java/Kotlin targets through the selected public DSL/toolchain. Set each module's namespace in its own build file rather than deriving an invalid package from arbitrary hyphenated module paths. See the official [built-in Kotlin migration rules](https://developer.android.com/build/migrate-to-built-in-kotlin).

`app.android.compose.library.gradle.kts`:

```kotlin
import org.gradle.api.artifacts.VersionCatalogsExtension

plugins {
    id("app.android.library")
    id("org.jetbrains.kotlin.plugin.compose")
}
val catalog = extensions.getByType<VersionCatalogsExtension>().named("libs")
android { buildFeatures { compose = true } }
dependencies {
    "implementation"(platform(catalog.findLibrary("androidx-compose-bom").get()))
    "androidTestImplementation"(platform(catalog.findLibrary("androidx-compose-bom").get()))
    "implementation"(catalog.findLibrary("androidx-compose-ui").get())
    "implementation"(catalog.findLibrary("androidx-compose-material3").get())
    "implementation"(catalog.findLibrary("androidx-compose-ui-tooling-preview").get())
    "debugImplementation"(catalog.findLibrary("androidx-compose-ui-tooling").get())
}
```

Preview annotations used in main sources require the preview artifact on main compilation; keep the heavy tooling runtime debug-only. Add the Compose BOM to local test configurations too if they depend on Compose artifacts. A feature convention may extend this with Koin, Lifecycle, Navigation, and core presentation/design-system dependencies, but should not inject unwanted dependencies into every library.

## Native application convention

`app.android.application.gradle.kts`:

```kotlin
import org.gradle.api.artifacts.VersionCatalogsExtension

plugins { id("com.android.application") }
val catalog = extensions.getByType<VersionCatalogsExtension>().named("libs")
android {
    compileSdk = catalog.findVersion("compileSdk").get().requiredVersion.toInt()
    defaultConfig {
        minSdk = catalog.findVersion("minSdk").get().requiredVersion.toInt()
        targetSdk = catalog.findVersion("targetSdk").get().requiredVersion.toInt()
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}
```

Set `applicationId`, namespace, version, signing, and app-specific dependencies in `:app`. Compose-enabled application modules also apply the Compose compiler plugin and the same Compose dependency/tooling policy as above; do not apply the Android library convention to the application. Keep consumer rules in library modules and app-specific rules in the app.

## Room convention and feature use

Choose the convention that matches the project's Room major version. The Room 2 example uses the Room 2 plugin implementation from the catalog above.

`app.android.room.gradle.kts`:

```kotlin
import org.gradle.api.artifacts.VersionCatalogsExtension

plugins {
    id("app.android.library")
    id("com.google.devtools.ksp")
    id("androidx.room")
}
val catalog = extensions.getByType<VersionCatalogsExtension>().named("libs")
room { schemaDirectory("$projectDir/schemas") }
dependencies {
    "implementation"(catalog.findLibrary("androidx-room-runtime").get())
    "ksp"(catalog.findLibrary("androidx-room-compiler").get())
}
```

Expose Room through `api` only if your module's public signatures require consumers to see its types. Set the database module namespace and include migration tests. Do not add this convention to modules that do not own Room processing.

For Room 3, use the `androidx.room3` plugin and `room3` schema extension with `androidx.room3:room3-runtime` and `androidx.room3:room3-compiler` through KSP. When a precompiled convention applies the plugin, resolve its implementation for the chosen version on the included build's classpath, or apply the versioned plugin directly in the database module. Configure the chosen SQLite driver in the database builder and run migration tests against the exported schemas with the matching Room 3 helper. Check manual migrations, imports, transaction APIs and schema export paths when upgrading. [Room 3 schema export](https://developer.android.com/jetpack/androidx/releases/room3) · [Room 2 to 3 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3)

A Compose feature's `build.gradle.kts` can then stay small:

```kotlin
plugins { id("app.android.compose.library") }
android { namespace = "com.example.notes.presentation" }
dependencies {
    implementation(project(":feature:notes:domain"))
    implementation(project(":core:presentation"))
    implementation(project(":core:design-system"))
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.koin.androidx.compose)
    implementation(libs.androidx.navigation.compose)
}
```

Use the Koin dependency in this example only for a Koin feature. Apply the serialization compiler plugin in modules declaring serializable routes/DTOs, using a convention whose external plugin implementation is already on the included build classpath. Domain modules use `org.jetbrains.kotlin.jvm`; a small Kotlin/JVM convention can configure their toolchain and test engine. JUnit5 tests require Jupiter dependencies and `tasks.withType<Test>().configureEach { useJUnitPlatform() }`; Android instrumented tests use AndroidJUnitRunner with a compatible runner integration.

## Verification

Validate convention compilation and a consuming module, rather than only running Gradle help. Run affected unit tests, lint, debug/release assembly, and relevant device/migration tests. Verify configuration-cache reuse only with a second representative invocation when evaluating caching. Use Gradle providers for optional configuration, avoid credentials in generated constants, and keep build repositories centrally managed.

Sources: [Gradle precompiled conventions](https://docs.gradle.org/current/userguide/implementing_gradle_plugins_convention.html), [built-in Kotlin](https://developer.android.com/build/migrate-to-built-in-kotlin), [Room migrations/schema setup](https://developer.android.com/training/data-storage/room/migrating-db-versions).
