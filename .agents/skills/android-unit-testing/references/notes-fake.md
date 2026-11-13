# Controllable Notes fake

Use with the project's NoteRepository, Note and typed Result contracts. The optional `android-data-layer` skill shows the repository shape used here. Place the fake in test sources and import the actual project-owned domain types. This supplies the initialNotes/refreshResult constructor contract used by the unit-testing example. Adapt the production ViewModel and UI model mapper to the actual feature.

```kotlin
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.flow.MutableStateFlow

class FakeNoteRepository(initialNotes: List<Note> = emptyList()) : NoteRepository {
    private val rows = MutableStateFlow(initialNotes.toList())
    var refreshResult: EmptyResult<DataError> = Result.Success(Unit)
    var refreshedNotes: List<Note> = initialNotes.toList()
    var refreshGate: CompletableDeferred<Unit>? = null
    var refreshCalls: Int = 0
        private set

    override fun observeNotes() = rows

    override suspend fun refresh(): EmptyResult<DataError> {
        refreshCalls++
        refreshGate?.await() // Cancellation propagates; the fake does not swallow it.
        val result = refreshResult
        if (result is Result.Success) rows.value = refreshedNotes.toList()
        return result
    }
}
```

For a loading test, set an incomplete gate before triggering refresh, run scheduled entry, assert pending state and unchanged data, then complete the gate and run scheduled completion. For a failure test, set refreshResult to a typed error and assert existing rows remain. For duplicate submission, hold the first request at the gate and exercise the second action before resolving it; do not infer concurrency handling from two immediate successes. Cancel jobs/complete gates in teardown so tests cannot hang.

This fake exercises the ViewModel contract; it does not test real repository transactions, migrations or transport exceptions. Use the real repository with controlled local/remote sources for those checks.

Its mutable controls/counter are intended for scheduler-controlled tests, not an implementation of thread-safe persistence. Do not infer real multi-thread/process race safety from this fake or share one instance between parallel tests. For several independently finishing requests, capture a separate response/gate per call so changing one mutable result does not accidentally change every pending request.
