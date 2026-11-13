# Android and Kotlin Multiplatform specification overlay

Apply alongside the mobile/offline profile when Android or KMP is in scope. Record answers in the existing five pillar files, using the preferred PRODUCT → PROOF → PROJECT → PRODUCTION → PROCESS order. These prompts do not mandate Compose, MVI, Clean Architecture, Koin, Ktor, Room, a module per layer, iOS support or a fixed SDK/library version.

## PRODUCT

Identify actual target platforms, device/window/input conditions and shared versus platform-specific journeys. For each important action define who can perform it, displayed fields, validation units, loading/refresh/partial failure, cancellation and recovery. Specify whether text limits count bytes, UTF-16 code units, code points or user-perceived characters when the distinction affects input, truncation or storage.

For offline edits distinguish locally retained, queued, synchronized and server-confirmed states. Define stale-data age, conflicts, account switch, permission loss and unsaved-data behavior. State which data may survive backgrounding, configuration recreation, process termination, logout and app upgrades. A library exposing saved-state types across targets does not establish equivalent OS restoration. Link a screen contract such as docs/ui-design.md if it exists; keep product permissions and acceptance here.

## PROOF

Plan checks by risk and execution boundary: pure logic, persistence/network integration, UI plus real presentation logic, representative feature flow and actual device/platform behavior. Use controlled clocks, schedulers and collaborators for repeatable failure/recovery tests; state which real boundaries are replaced. A mocked transport is not evidence of TLS or production service compatibility. Include relevant cancellation, concurrent/duplicate actions, late responses, data migration and restoration cases.

For KMP record which supported target runs each shared contract and which platform actuals need separate checks. JVM success does not imply Kotlin/Native success. A constructed SavedStateHandle proves consumption of supplied values, not the OS save/restore path. Define required device, SDK, variant and unavailable-evidence handling without claiming a universal test count or exhaustive matrix.

## PROJECT

Record state/data authority, module ownership, dependency direction, DI composition/lifetimes, resource ownership and platform adapters at the depth the increment needs. Keep transport DTOs, persistence records and UI formatting separate when their contracts differ; do not multiply identical models or interfaces by convention alone. Reuse the current architecture and justify new modules by ownership, isolation or build needs.

Specify error categories where callers take different actions: validation/rejection, authorization, transport failure, decoding failure, local storage failure, cancellation and unknown completion. Define whether a fallback transforms the returned result or merely observes it; whether a failed cache write changes success; and what an empty HTTP response means. Expected failures may use typed results, but cancellation must preserve structured ownership and unexpected defects must not silently become success.

For shared code identify target-compatible APIs/artifacts and platform implementations for transport, persistence, secure storage, permissions, navigation and lifecycle. Check the actual Kotlin/AGP/Gradle/Compose compatibility combination; do not infer a mandatory module split or API migration from the Gradle major version alone. Keep privileged secrets outside extractable client configuration; generated BuildConfig/BuildKonfig fields are packaged values, not a secrecy mechanism.

## PRODUCTION

Define platform-specific packaging/signing, update compatibility, migrations with existing user data, downgrade/rollback limits and disconnected-client support. Link platform test and release evidence. Set diagnostics/redaction, cache/draft backup and retention, logout cleanup, auth-refresh limits and background-sync ownership. Explicitly distinguish credential storage convenience from the encryption/key/access policy required by the threat model.

## PROCESS

Assign shared-contract and platform-adapter ownership, actual verification commands/environments and access needed for each gate. Record a developer handoff around state authority, failure/retry strategy, object lifetimes, tradeoffs and changed consumers; comprehension exercises can supplement explanation but do not replace code inspection/tests or authorize PR automation. Keep unavailable macOS/iOS/device checks pending with an owner or gate instead of marking every target complete.

Primary references: [Android architecture](https://developer.android.com/topic/architecture), [coroutine testing](https://developer.android.com/kotlin/coroutines/test), [Android KMP plugin](https://developer.android.com/kotlin/multiplatform/plugin). Verify platform/version details for the actual project.
