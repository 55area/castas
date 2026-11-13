# Android Review

Use for native Kotlin/Java, Compose or Views, and Android-specific portions of Flutter, React Native, or other applications. Identify the actual architecture, SDK levels, build variants, libraries, and supported devices before applying platform advice. Check official documentation for version-sensitive claims.

## Lifecycle and state restoration

- Trace activity/fragment creation, view destruction, configuration changes, background/foreground transitions, navigation, and process recreation. An object surviving rotation does not establish survival after process death.
- Check the intended ownership and durability of state: transient view state, ViewModel state, saved state, and persisted user data have different lifetimes. Inspect whether an in-flight operation is safely retried or accidentally duplicated after recreation.
- Verify references to views, activities, contexts, listeners, receivers, and callbacks are released at the correct owner boundary. For fragments, the view lifecycle can end while the fragment remains alive.
- Inspect Kotlin/Java boundary nullability, unchecked platform types, `lateinit` initialization, and non-null assertions against the real lifecycle and contract. A fallback that hides missing required data may be worse than an explicit failure; do not demand nullable defaults everywhere.
- Check loading, error, empty, offline, permission-denied, and retry states. Inspect navigation back-stack behavior, restored destinations, and one-time effects replayed after resubscription.

## Coroutines, Flow, and threads

- Trace coroutine ownership, parent/child relationships, cancellation, and exception propagation. Confirm work that should stop with a screen does so, while work required to outlive it has a deliberate durable or longer-lived owner.
- Inspect broad `Exception`/`Throwable` catches and wrappers such as `runCatching` for cancellation being swallowed or converted into a normal error/success. Show the effect before reporting; a catch may intentionally rethrow or check cancellation elsewhere.
- Check blocking disk/network operations and expensive CPU work against the main thread and dispatcher behavior. A `suspend` declaration by itself does not make a blocking implementation safe for main-thread callers.
- For Flow, inspect lifecycle-aware collection, cold versus shared execution, replay/buffering, subscription count, cancellation, error paths, and thread context. Check whether rotation or a second collector repeats a request or loses an essential event.
- Inspect concurrent read-modify-write state updates, duplicate jobs, cancellation of previous searches, and structured ownership of failures. Do not flag every `GlobalScope` or dispatcher reference by token alone; identify the ownership or testability consequence in this change.

## Compose and Views

- Check side effects, effect keys, state hoisting, list keys, remembered state, stale captured values, and cleanup. Rendering should not repeatedly trigger writes or network effects.
- Match saved/remembered state to the required lifetime. Do not treat recomposition avoidance as correctness, require every lambda to be memoized, or recommend stability annotations without evidence about the actual types and compiler version.
- Inspect accessibility semantics, content descriptions, focus, TalkBack operation, touch targets, dynamic text, keyboard input, and validation feedback.
- Review resource qualifiers, dark theme, localization, right-to-left layout where supported, large screens/foldables, insets, and system back behavior as affected by the change.
- For Views, inspect binding lifetime, adapters and item identity, recycled state, observer removal, and callbacks after a view is destroyed.

## Platform boundaries and privacy

- Review the merged manifest for the affected variant: exported activities/services/receivers/providers, intent filters, permissions, URI grants, backups, network configuration, and debug-only behavior leaking into release.
- Trace external intents, deep links, app links, file/content URIs, `PendingIntent` construction, and WebView bridges/navigation. Validate caller-controlled data and resource access at the actual entry point; an exported launcher is not automatically a vulnerability.
- Check runtime permission denial/revocation, activity-result callbacks, sensitive data in logs or notifications, token persistence, keystore use where appropriate, and backup/export behavior.
- Inspect background execution and scheduled work against supported OS behavior, retries, uniqueness, network/battery constraints, and whether the operation must survive process termination. Do not replace an existing mechanism solely because another library is fashionable.

## Persistence, network, and release

- Apply backend data/contract checks to Room/SQLite, caches, synchronization queues, and client/server payloads when affected. Check migrations with existing user data, offline edits, conflict handling, clock assumptions, logout cleanup, and delayed client upgrades.
- Inspect TLS handling, cleartext exceptions, test endpoints, and certificate/hostname checks. Check application configuration before asserting a transport is insecure; do not impose certificate pinning universally.
- Verify `minSdk`, `targetSdk`, `compileSdk`, API guards, Java/Kotlin versions, AGP/Gradle and dependency compatibility for the actual project. An API available on the reviewer's emulator may fail on a supported older device.
- Review R8/ProGuard/reflection/resource shrinking, release flavors, signing-secret handling, and feature modules when changed. Debug success does not establish release-build behavior.

## Evidence and execution limits

Discover commands from the project's Gradle wrapper, build scripts, and CI; do not assume a module name or variant. Use relevant JVM unit tests, lint, instrumentation, Compose/Espresso tests, migration tests, or release builds according to the changed risk.

Exercise lifecycle, process recreation, permission denial, offline/retry behavior, and supported API/device configurations when those paths matter. Recreating an activity is not evidence of a process-death test. Device/emulator tests may install an APK or alter device state: use an authorized test target and avoid modifying a person's active device as an incidental review action.

If no Android SDK, emulator, signing access, or network is available, state exactly which evidence is missing. Inspection may still establish a concrete defect. Do not call JVM test results Android instrumentation results, claim release verification from a debug build, or block every static review just because no emulator exists.

Primary references for version-sensitive verification:

- [Android architecture](https://developer.android.com/topic/architecture)
- [Processes and app lifecycle](https://developer.android.com/guide/components/activities/process-lifecycle)
- [Coroutines best practices](https://developer.android.com/kotlin/coroutines/coroutines-best-practices)
- [Exported component risks](https://developer.android.com/privacy-and-security/risks/android-exported)

## Data, presentation and dependency wiring

Inspect typed-result and exception boundaries rather than imposing a particular Result wrapper or MVI pattern. Trace HTTP execution, status handling and body decoding, including 204/empty or malformed successful responses. Check cancellation and expected failures at the actual responsible layer. In a result chain, observer helpers such as onFailure may return the original result: a local-cache call inside the callback can be discarded rather than become a fallback. Likewise, inspect whether a failed persistence operation is ignored before reporting synchronization success.

For navigation, prefer minimal identifiers where appropriate, but validate destination access and missing/stale IDs; type-safe serialized routes are not authorization. Check cross-feature callbacks, back-stack scoping, shared state and DI ownership. A singleton that captures an Activity or prior account can retain stale state or leak data; repeated DI startup may fail, and duplicate database/DataStore instances may violate storage ownership. Judge actual lifecycle effects, not preferred class/module naming.

For Compose, verify narrow component inputs, event callbacks, effective touch area and reused accessible primitives as needed. State belongs at the lowest owner satisfying its lifetime and sharing needs; local expansion/focus state need not always live in a ViewModel. Stable/Immutable annotations assert a compiler contract rather than making mutable collections observable: trace equality, mutation and snapshot notification before suggesting them. Profile meaningful performance issues; deferred layout/draw reads can help animation without making all recomposition a defect.

For KMP inspect source-set dependencies and supported actual implementations: JVM/Android-only APIs, generated resources, transport engines, lifecycle and secure-storage adapters need appropriate placement. Shared imports or an Android preview do not prove target compatibility or native behavior. Inspect actual plugin/AGP/Kotlin/Gradle compatibility and target test compilations instead of importing a generic module layout.

For related tests use [Android/KMP test effectiveness](android-testing.md) alongside the general verification reference. For transport logging, packaged secrets and auth-refresh races, apply the mobile/platform security checks to the actual affected flows.
