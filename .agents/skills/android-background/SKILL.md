---
name: android-background
description: Implement or debug native Android WorkManager jobs, constraints, retries, idempotency and worker initialization. Use for concrete durable-work changes; use penta-pro for product/operating requirements and cybersec for security assessment.
license: MIT
metadata:
  version: "1.2.4"
---

# Android Background Work

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Choose Android APIs from the execution contract. Use ViewModel/application coroutine scopes for appropriate in-process work; use WorkManager for deferrable persistent work with constraints and eventual execution. It is not an exact scheduler. Exact alarms and foreground services require their own user-visible need, permissions, platform restrictions, and current Android documentation; do not substitute them by default.

For short, time-sensitive one-time work, use expedited scheduling only when justified by the user-visible operation. Decide whether quota exhaustion should defer the work as ordinary work or drop it, and handle that outcome. If supporting Android versions below API 31, provide the worker's foreground information and notification for expedited execution. For long-running work, check foreground service types, permissions, start restrictions and job quotas for the supported OS and targetSdk before selecting a mechanism. [Work request options](https://developer.android.com/develop/background-work/background-tasks/persistent/getting-started/define-work) · [Long-running workers](https://developer.android.com/develop/background-work/background-tasks/persistent/how-to/long-running)

## Durable job design

Use `CoroutineWorker` for suspend repository work. Keep transport/storage policy in repositories and worker orchestration small. Return WorkManager success, retry, or failure according to the typed outcome. Alias the application's `Result` import when needed so it does not collide with `ListenableWorker.Result`.

- Persist an operation ID before the first attempt and reuse it on retry when the destination supports deduplication. Keep the logical operation ID distinct from the WorkRequest ID. Exercise loss of the response after the destination committed but before the worker could save completion. Without a safe replay or reconciliation contract, retain the unknown outcome for recovery.
- Enqueue named unique work with a deliberate ExistingWorkPolicy. KEEP avoids duplicate pending work, REPLACE cancels/replaces, and chained policies have different failure behavior. For periodic work use the matching periodic policy and respect its API minimum interval/flex; do not promise precise timing.
- Set only required constraints and bounded backoff for transient failures. Define an attempt/age limit according to the operation. Permanent validation/auth failures do not become endless retries; a recovered session can schedule a new operation.
- Keep inputs/output small and serializable within WorkManager's Data limit; store large payloads in persistent storage and pass IDs. Do not embed credentials in job Data or logs.
- Preserve coroutine cancellation. Do not catch `CancellationException` and report success/failure; release resources through structured cleanup. A stopped run can be rescheduled when constraints or execution limits interrupt it; explicit WorkManager `CANCELLED` is terminal for that request. Neither stopping nor cancellation rolls back effects already committed.
- Expose WorkInfo/progress with lifecycle-aware collection and separate job state from the data source of truth. Avoid unbounded polling from UI.

Periodic work schedules future runs even when one run returns `Result.failure()`. For permanent account revocation or a policy that must stop all future runs, cancel/disable the owning periodic request and recheck eligibility in the worker; returning failure alone is insufficient. See the official [work-state semantics](https://developer.android.com/develop/background-work/background-tasks/persistent/how-to/states).

## Koin integration and initialization

Resolve `CoroutineWorker` from `androidx.work:work-runtime` on WorkManager 2.9 and later. On older versions, check the matching `work-runtime-ktx` artifact. Preserve the project's worker factory and use compatible `io.insert-koin:koin-androidx-workmanager` only for Koin wiring. Register the worker with its runtime Context/WorkerParameters and injectable collaborators using the installed DSL:

```kotlin
val syncModule = module {
    worker { params -> NotesSyncWorker(androidContext(), params.get(), get()) }
}
```

Here `NotesSyncWorker` takes `(Context, WorkerParameters, NoteRepository)`: `androidContext()` supplies the application Context, `params.get()` retrieves this run's WorkerParameters, and `get()` resolves the repository. Do not register WorkerParameters as a singleton. Imports include `org.koin.androidx.workmanager.dsl.worker`, `org.koin.android.ext.koin.androidContext`, and `org.koin.dsl.module` for versions exposing this DSL. The supported constructor DSL `workerOf(::NotesSyncWorker)` is another option; verify the installed version's API.

Start Koin once in the Android Application and call `workManagerFactory()` after `androidContext(...)`; include the worker and repository modules before any work can be created. Use `org.koin.androidx.workmanager.koin.workManagerFactory` for the documented integration.

Disable **only WorkManager's** automatic startup metadata when the Koin factory owns initialization. Keep other AndroidX Startup initializers:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <application>
        <provider
            android:name="androidx.startup.InitializationProvider"
            android:authorities="${applicationId}.androidx-startup"
            android:exported="false"
            tools:node="merge">
            <meta-data
                android:name="androidx.work.WorkManagerInitializer"
                android:value="androidx.startup"
                tools:node="remove" />
        </provider>
    </application>
</manifest>
```

Use one initialization strategy: the Koin integration or a deliberately configured `Configuration.Provider`/custom WorkerFactory strategy supported by the installed versions. Prevent an early provider from selecting the default factory before your configuration. Inspect the merged manifest, Application registration, startup ordering, and any extra processes. The optional `android-module-structure` skill covers native module and manifest ownership.

## Verification

Test with `work-testing` facilities and the real worker factory: retryable versus permanent outcomes, constraints, bounded attempts, cancellation, duplicate scheduling, process-safe persistence, idempotent reruns, and session invalidation. Use deterministic drivers for delays/constraints. A unit call to `doWork()` does not verify enqueue policy, startup, persistence, or OS scheduling.

Run a device startup/worker smoke test and appropriate integration tests. Check relevant current Android execution restrictions when introducing long-running work or foreground notifications; document the supported API/targetSdk behavior.

## Account and execution boundaries

Bind work to an account/session identity and recheck it before reading credentials. Enforce the expected account or session generation at the atomic write boundary, or use storage partitioned by the captured account when the contract permits that account's work to finish. For server mutations, enforce resource ownership at the service. Exercise a session switch between the last pre-write check and the commit. Cancel matching unique work/tags on logout, and reject stale work even if cancellation arrived too late. Avoid storing bearer tokens in job inputs. A network-connected constraint does not prove the backend is reachable or that credentials remain valid.

Exercise rescheduling after process loss and a permanent auth error separately from a temporary network failure. For expedited work, cover the selected quota fallback and foreground notification path where supported.

Sources: [WorkManager releases](https://developer.android.com/jetpack/androidx/releases/work), [WorkManager configuration](https://developer.android.com/develop/background-work/background-tasks/persistent/configuration/custom-configuration), [Koin worker setup](https://insert-koin.io/docs/reference/koin-android/workmanager/).
