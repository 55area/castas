---
name: android-data-layer
description: Implement or debug native Android repositories, Ktor/OkHttp clients, Room persistence, DataStore and synchronization. Use for data-layer code changes; use peer-review for independent assessment and cybersec for security audits.
license: MIT
metadata:
  version: "1.3.0"
---

# Android Data Layer

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Use Android libraries and standard `src/main`, `src/test`, and `src/androidTest` directories. Keep domain contracts free of Android framework dependencies. Optional companions are `android-module-structure` for module ownership, `android-error-handling` for typed errors, and `android-di-koin` for existing Koin wiring.

## Ownership and models

- A data source encapsulates a concrete transport or storage mechanism. A repository exposes application data and coordinates sources or policy. A repository may wrap one source; do not add an abstraction merely to satisfy a source-count rule.
- Place contracts consumed by presentation in the domain/API module so presentation does not import concrete data implementations. Adapt this arrangement to an existing architecture instead of splitting every trivial feature into three modules.
- Separate network DTOs and Room entities from domain models when their contracts differ. Keep serialization, database annotations, and transport details out of domain contracts. Use data-layer mapping extensions such as `NoteDto.toNote()` and `NoteEntity.toNote()`.
- Name concrete implementations by their mechanism or policy (`RoomNoteDataSource`, `OfflineFirstNoteRepository`). Follow established project naming when it differs.

## Ktor on Android

For a project using Ktor with OkHttp, use `io.ktor:ktor-client-okhttp` with matching core, content negotiation, serializer, and only the auth/logging plugins needed by the client. Keep an established client such as Retrofit when it already owns the boundary. Manage versions in the catalog. The Android app needs the `android.permission.INTERNET` manifest permission.

Create and inject one client per owner. Accept an engine to reuse production configuration with `MockEngine` in tests. The owner closes clients/engines in tests and explicitly managed scopes. Configure `expectSuccess = false` when the project's helper maps HTTP statuses itself, as in the optional `android-error-handling` skill.

Set bounded connection/request/socket timeouts appropriate to the service. Configure a trusted HTTPS base URL with Ktor `defaultRequest` and URL builders, and test path-prefix handling. For kotlinx.serialization DTOs, apply the compatible serialization compiler plugin where `@Serializable` types are declared and configure JSON in the owned client's `ContentNegotiation` plugin. If the response contract permits additive fields, configure that decoder with `json(Json { ignoreUnknownKeys = true })` or use a supported DTO-specific setting. Keep required-field and domain validation, and test both additive fields and missing or invalid required data. [Ktor client serialization](https://ktor.io/docs/client-serialization.html)

Retry only selected transient failures with bounds and backoff. Before repeating a write after an ambiguous response, reconcile its state or use the server's replay contract.

Enable verbose logging only in debug builds and sanitize authorization/cookie headers. Payloads may also contain tokens or personal data: prefer header/status logging, and never assume header redaction makes body logging safe.

## Authentication and DataStore

When using Ktor bearer authentication, inject token storage and define bounded refresh and explicit session invalidation. Serialize concurrent refreshes or use the selected plugin version's coordination. Test concurrent 401s, rejected refresh, logout during refresh, and stale responses. Avoid recursion when the refresh call itself receives 401. Apply the approved origin and credential policy at every redirect hop, including credentials attached by an interceptor. Disable automatic redirects for authenticated requests if the installed client cannot enforce that policy. Test the actual destination and headers with synthetic credentials on controlled endpoints.

DataStore persists small preferences/settings. It does not by itself establish an encrypted credential vault. Choose credential protection from the threat model; Android Keystore protects cryptographic keys, not arbitrary strings. Never describe APK constants or `local.properties` as protection for backend secrets. Decide which credential artifacts can be backed up or transferred, what happens when restored data cannot be decrypted or its session was revoked, and when reauthentication is required. Verify backup rules and logout/restore behavior for the supported environments.

Keep **one DataStore instance per file per process**. A top-level Android delegate is a simple native construction:

```kotlin
import android.content.Context
import androidx.datastore.preferences.preferencesDataStore

val Context.sessionDataStore by preferencesDataStore(name = "session")
```

If the project uses Koin, it can provide `androidContext().sessionDataStore` as a singleton. Reuse the existing owner in other setups. Do not also create a second factory instance for that file. For multiple processes, explicitly choose the supported multiprocess API and use it consistently. Keep stored values immutable, handle corruption according to a documented recovery policy, and use transactional updates for related fields.

## Room setup and storage errors

Keep a shared database with its existing owner. For example, `:core:database` can own shared data and a feature database can remain with an independently owned feature. Keep entities, DAOs, the database class, exported schemas, and migrations together. Data modules depend on that database module; presentation does not access DAOs directly.

Match runtime, compiler, imports, schema tooling and migration tests to the installed Room major version:

| Room | Native Android setup |
|---|---|
| 2.x | Use `androidx.room:room-runtime`, its compiler through the supported KSP configuration, and plugin `androidx.room` with `room { schemaDirectory(...) }` where supported. Preserve the selected database factory and driver. |
| 3.x | Use `androidx.room3:room3-runtime`, `androidx.room3:room3-compiler` through KSP, and plugin `androidx.room3` with `room3 { schemaDirectory(...) }`. Select a supported `SQLiteDriver` and pass it to `setDriver(...)` before `build()`. Migrate DAO and transaction APIs deliberately. |

Keep the database instance in its owner and commit the exported schemas. Use suspend DAO operations and observable `Flow` queries for asynchronous work. For a deliberate major upgrade, check the existing file path, SQLite driver, SQL functions, manual migrations, and schema exports. Verify upgrade from a database created by the previous app, with representative data. [Room 2 to 3 migration](https://developer.android.com/training/data-storage/room/migration-2-to-3) · [Room 3 release notes](https://developer.android.com/jetpack/androidx/releases/room3)

Catch only known storage failures when a typed result is required. Rethrow `CancellationException` before broader catches. A flow query can also fail during collection: define whether that failure is propagated or materialized as state, rather than silently completing or reporting an empty database.

Choose automatic migrations only for supported schema changes; use manual migrations for transformations and explicit migration specs for ambiguous changes. Test migration paths with exported schemas and representative rows. Do not silently enable destructive migration for user-owned data. Use transactions for multi-table updates and cache replacement; make write conflicts and uniqueness rules explicit.

For DAO search or conflict-policy changes, read [query and write semantics](references/query-and-write-semantics.md). Bound SQL values can still act as LIKE wildcards, and SQLite REPLACE is not an ordinary update: it can delete a conflicting parent and cascade to child rows. Choose the intended matching and mutation contract before copying a query or conflict annotation.

## Offline-first when required

Use the database as the observable source of truth. Network refresh writes to storage; UI observes storage. Keep refresh failures separate from cached data so a failed refresh does not erase useful content.

```kotlin
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

// Domain declarations; Note is the domain model.
interface NoteRepository {
    fun observeNotes(): kotlinx.coroutines.flow.Flow<List<Note>>
    suspend fun refresh(): EmptyResult<DataError>
}
interface NoteLocalDataSource {
    fun observeNotes(): kotlinx.coroutines.flow.Flow<List<Note>>
    suspend fun replaceAll(notes: List<Note>): EmptyResult<DataError.Local>
}
interface NoteRemoteDataSource {
    suspend fun fetchNotes(): Result<List<Note>, DataError.Network>
}

class OfflineFirstNoteRepository(
    private val local: NoteLocalDataSource,
    private val remote: NoteRemoteDataSource
) : NoteRepository {
    private val refreshMutex = Mutex()
    override fun observeNotes() = local.observeNotes()

    override suspend fun refresh(): EmptyResult<DataError> = refreshMutex.withLock {
        when (val result = remote.fetchNotes()) {
            is Result.Success -> local.replaceAll(result.data)
            is Result.Error -> result
        }
    }
}
```

`replaceAll` must be atomic if partially replacing cached rows would expose an invalid state. Return local-write failure through the repository outcome. A network error leaves the existing database untouched. This example models a replaceable read cache. Preserve unsynchronized user edits during refresh. Offline writes need an outbox, stable operation IDs, conflict policy, and retry scheduling. The optional `android-background` skill covers durable sync.

For a one-shot cache-fallback API, explicitly `return` the local outcome in the failure branch. Calling `local.read()` inside `onFailure` does not change the original error result. Do not present that pattern as offline-first observation.

## Verification

Test DTO mapping, malformed JSON, storage errors, cancellation, atomic refresh, local-write failure, cache retention, refresh races, and relevant migrations at the real boundary. Use an injected clock for expiration and a controllable transport for deterministic errors. The optional `android-integration-testing` skill supplies fixture choices.

## Concurrent refresh, identity and bounded data

Scope the repository and its local source to one account/tenant. Serialize competing refresh commits or compare request/version identities so a slow response cannot overwrite newer data. For the simple repository example, a single instance serializes refreshes; this is not cross-process synchronization. Before committing, verify that the captured session is still current. Test logout during a request and account switches with pending writes.

Bind queries and writes to the captured account's storage key/database. A session check followed by a suspending write to a shared “current account” store still has a race. Coordinate the check and commit with session replacement at the actual writer boundary, or keep storage strictly account-partitioned and prevent stale results from becoming visible. A Mutex protects only participants using that same lock; logout, another repository instance or another process is not automatically covered. The sample above omits session policy and must not be presented as a complete multi-account implementation.

For an outbox, persist the local change and pending operation together when they must survive process loss as a unit. A worker can crash after the server accepts a mutation and before the outbox row is acknowledged. Verify replay with the same operation ID and preserve pending edits during refresh.

Validate DTO domain constraints after decoding. Well-formed JSON can contain invalid IDs, amounts or sizes. Bound pagination, response/media sizes and in-memory accumulation. Bind SQL inputs and validate filesystem paths at their owner. Use the optional `cybersec` skill's native Android controls when assessing credential hosts, backups, file sharing or account-scoped caches.

Sources: [Room migrations](https://developer.android.com/training/data-storage/room/migrating-db-versions), [DataStore](https://developer.android.com/topic/libraries/architecture/datastore), [Ktor testing](https://ktor.io/docs/client-testing.html).
