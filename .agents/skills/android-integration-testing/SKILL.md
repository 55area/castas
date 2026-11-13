---
name: android-integration-testing
description: Author, run or debug non-UI native Android boundary tests for Room, Ktor clients, DataStore, DI and WorkManager. Use for integration-test implementation; use peer-review for independent evidence assessment and cybersec for security audits.
license: MIT
metadata:
  version: "1.3.0"
---

# Android Integration Testing

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Choose the smallest test environment that exercises the real boundary. The optional `android-unit-testing` skill covers isolated logic. Use `android-ui-testing` when rendering, input or navigation are part of the claim. Several real classes can still run on a host without a server.

## Test location and dependencies

Use Kotlin/JVM or Android `src/test` for supported host tests; use `src/androidTest` with AndroidJUnitRunner for real Android storage/framework behavior. Preserve the project's supported JUnit engine. Typical fixtures include Room testing, Ktor MockEngine or a local MockWebServer, AndroidX test core, WorkManager testing, and coroutine test utilities. Align versions with production libraries.

MockEngine simulates the HTTP client engine without sockets. A repository test with a stubbed client isolates repository policy. A test with real client plugins and MockEngine can exercise decoding or request construction while leaving real redirects, TLS and sockets unverified. A loopback server exercises actual HTTP transport and can test disconnects/headers/timing; a controlled real service environment is needed for deployment/auth/backend-contract claims. Select the boundary deliberately and avoid external network dependence in ordinary deterministic suites.

## Repository and HTTP contracts

Reuse the production client configuration with an injected test engine; otherwise the test may miss serialization/auth/default URL bugs. Match method, host/path, query, headers, and body. Make unexpected requests fail immediately. Test response decoding and typed statuses, malformed success payloads, empty-body success, timeout/connectivity classification, and cancellation.

Exercise concurrent token refresh, rejected refresh, retry bounds, allowed hosts, idempotency of writes, and logout/session races when relevant. Do not use real credentials or enable sensitive body logging. Test base-URL path prefixes and encoded route arguments to catch incorrect string concatenation.

For offline-first repositories, collect the real storage stream, refresh, and observe committed changes. Verify a failed network refresh preserves cached data, a failed local write is reported, partial transactions roll back, and pending user edits survive refresh. Separate the refresh error from the observable cache.

## Room and migrations

An in-memory Room database still exercises SQLite. Create one database per test and close it afterward. Use the production database class, DAO and relevant driver settings. Choose an Android context for the Android builder or a supported host fixture for the installed Room major version. Exercise suspend operations and Flow under controlled scheduling.

Test constraints, transactions, conflict policy, observable invalidation, and actual DAO queries with representative data. Test migrations from supported historical schemas with `MigrationTestHelper` and committed schema exports. Use `androidx.room:room-testing` for Room 2 and `androidx.room3:room3-testing` for Room 3. Match helper construction, driver and schema asset/path configuration to the installed version and test host. A Room 3 host test can cover migrations with a supported host SQLite driver. Use the app's actual driver and Android device path for platform-specific upgrade claims. Seed a historical database under its old constraints, then verify its migrated schema and preserved/transformed rows. Read the result through the current DAO when mapping matters. Preserve user-owned data and cover destructive fallback only when the product contract permits it.

Test the real query/mutation semantics: literal-search `%`/`_` and escape characters, relevant case/accent distinctions, stable tie ordering, and parent/child preservation after an edit or conflict. SQLite REPLACE may delete related rows through cascades, while a parameterized LIKE still interprets wildcards. Keep expected matching and identity rules grounded in the project contract. The optional `android-data-layer` skill includes DAO examples.

## DataStore and lifecycle

Create one DataStore per unique temporary file. In `runTest`, use `backgroundScope` for a long-lived DataStore. For an explicit close-and-reopen test, give each instance a child Job under that background scope and cancel and join it before opening the replacement. Test updates, persistence after a controlled reopen, and the project's corruption and migration policy. Exercise multiprocess behavior only where the app uses it. [DataStore test scope guidance](https://developer.android.com/jetpack/androidx/releases/datastore#1.1.0-beta02)

For saved-state behavior, distinguish ViewModel initialization from real SavedStateRegistry save/restore. Activity recreation is useful but not a process-kill test. Use the appropriate Android owner/harness and describe the exact restoration boundary exercised.

## DI and workers

Use the installed DI stack's supported checks. In a Koin app, use compile-time checks where the plugin covers the graph and use the installed verification API for supported configurations outside that coverage. Exercise startup and important Android constructors under the real owner. Reset isolated/global container state between tests. A graph check leaves runtime configuration and platform startup to separate tests.

Use WorkManager's test facilities to construct workers with the production factory, control constraints/delays, and inspect state/output. Test durable enqueue policy and idempotent reruns as well as `doWork` return values. The optional `android-background` skill covers lifecycle and retry rules.

## Run and report

Run affected host/device tasks with the actual variant, capture failures at the owning boundary, and repeat only after changes or new unresolved concerns. Release-specific DI/shrinking/network configuration needs an appropriate release check. Report fixture, device/API where applicable, scenarios, command results, and remaining live-service/platform limits. Do not equate simulated transport with production connectivity or a passing structural check with executable behavior.

For instrumented suites that need per-test process isolation, consider Android Test Orchestrator. Enable `clearPackageData` only on a disposable test target and keep any stateful upgrade sequence within one case. The app state reset does not isolate shared remote services. [AndroidJUnitRunner and Orchestrator](https://developer.android.com/training/testing/instrumented-tests/androidx-test-libraries/runner)

## Negative security scenarios

When applicable, use controlled fixtures to test a wrong account/tenant ID, stale credential refresh after logout, unsafe URI/redirect, forbidden component entry, corrupted/restored storage and rejected TLS validation. Exercise release-effective network/manifest settings; mocks that always approve authentication cannot establish access control. Test backup/reopen failures without enabling destructive migration or plaintext credential fallback.

Keep fixtures independent of test order and ensure failures cannot reach a production endpoint. Check the configured base URL and account before executing writes, not merely whether the UI is running locally. Report which trust boundary the test truly crossed.

Prove that a negative fixture reaches its intended boundary. For authorization, use an existing resource that its owner can access, then a valid different identity; a missing resource or an earlier malformed-input rejection can leave authorization untested. For TLS, use a reachable controlled endpoint and the production trust configuration; a DNS failure or a MockEngine-thrown exception does not verify certificate rejection. Pair the denied case with legitimate behavior and inspect prohibited side effects, not only an error status.

Sources: [Room testing](https://developer.android.com/training/data-storage/room/testing-db), [migration testing](https://developer.android.com/training/data-storage/room/migrating-db-versions), [Room 3 MigrationTestHelper](https://developer.android.com/reference/kotlin/androidx/room3/testing/MigrationTestHelper), [Ktor MockEngine](https://ktor.io/docs/client-testing.html).
