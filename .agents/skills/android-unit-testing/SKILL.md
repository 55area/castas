---
name: android-unit-testing
description: Author, run or debug isolated Kotlin/JVM and Android logic tests using fakes and deterministic coroutine scheduling. Use for test implementation tasks; use peer-review to assess test effectiveness without changing source and ui-design for screen acceptance design.
license: MIT
metadata:
  version: "1.2.4"
---

# Android Unit Testing

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Test the public contract and observable behavior. Before writing tests, enumerate plausible ways the behavior could fail: inputs, boundaries, collaborator errors, ordering, cancellation, and restoration. Spend coverage on distinct failure modes, not duplicated assertions. Use the [case catalogue](references/test-cases.md) when the unit handles text, arithmetic, time, or complex state.

## Boundaries and stack

An isolated test can wire multiple real classes when collaborators are pure and cheap. Keep real pure validators and fake network, storage or time boundaries where needed. Use boundary tests for real Room/SQLite, files, sockets and Android lifecycle, with the optional `android-integration-testing` skill when installed. Ktor MockEngine can exercise client integration without sockets.

Use `src/test` for JVM-hosted tests and `src/androidTest` when real Android framework/device behavior is needed. A pure framework helper can still be a small unit tested on a device. Robolectric is an optional supported JVM tool when suitable; it is not evidence of identical device behavior. Test critical platform behavior on Android.

Preserve the project's test framework: JUnit5 requires Jupiter dependencies and `useJUnitPlatform()` for host tasks; JUnit4 remains valid and Android instrumented runner support differs. Use AssertK or the established assertion library, Turbine for Flow emissions, and `kotlinx-coroutines-test` for virtual time. Do not move device tests onto Jupiter without a supported runner integration.

## Coroutine scheduling

Use one shared `TestCoroutineScheduler` for a test's dispatchers. Prefer `StandardTestDispatcher` when testing ordering, suspension, or races; use `UnconfinedTestDispatcher` deliberately for eager collectors or simple cases. Eager entry is not production scheduling and does not guarantee all suspend work completes immediately.

Virtual time controls work scheduled on test dispatchers. For code that switches to IO or Default explicitly, inject the dispatcher or test through a controlled collaborator. Record any real execution outside the scheduler when judging a timing assertion.

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
class NoteListViewModelTest {
    private val dispatcher = StandardTestDispatcher()

    @BeforeEach
    fun setUp() { Dispatchers.setMain(dispatcher) }

    @AfterEach
    fun tearDown() { Dispatchers.resetMain() }

    @Test
    fun `refresh failure preserves existing notes`() = runTest {
        val repo = FakeNoteRepository(initialNotes = listOf(Note("n1", "Saved")))
        val vm = NoteListViewModel(repo)
        try {
            runCurrent() // Starts the repository observation under test.
            repo.refreshResult = Result.Error(DataError.Network.REQUEST_TIMEOUT)
            vm.onAction(NoteListAction.OnRefreshClick)
            advanceUntilIdle()
            assertThat(vm.state.value.notes.map { it.id }).containsExactly("n1")
            assertThat(vm.state.value.isRefreshing).isFalse()
            assertThat(vm.state.value.error).isNotNull()
        } finally {
            vm.viewModelScope.cancel()
        }
    }
}
```

This example assumes the repository/VM contracts described by the data and presentation skills. Use the [complete controllable fake](references/notes-fake.md) rather than inventing its constructor or refresh behavior. Imports include JUnit Jupiter annotations, coroutine test APIs, `kotlinx.coroutines.Dispatchers`, `kotlinx.coroutines.cancel`, and `androidx.lifecycle.viewModelScope`; use the project's assertion imports. Reset global Main even after assertion failure and cancel ViewModel jobs or clear the owning `ViewModelStore` at teardown. `runTest` uses the replaced Main scheduler; do not create unrelated schedulers inside the fake.

For races, control a fake with deferred responses or gates: start request A, start B, finish B, then finish A; assert the agreed stale-result policy. For deadlines, move virtual time to just before/at/after the threshold. `advanceTimeBy` can require `runCurrent()` to execute work scheduled exactly at the new time. Do not use real sleeps or arbitrary multi-second advances as synchronization.

## Flow, state, and effects

Use Turbine `test { ... }` for observable emissions, with a collector active before triggering the action. `StateFlow` conflates equal/rapid updates: do not assume every intermediate loading value is observable. If a loading state is part of the contract, suspend the fake response and assert while it is pending; otherwise assert the final state.

For lazily shared/stateIn flows, keep an active collector in `backgroundScope` using the test scheduler. Cancel collectors at the end. Test best-effort ViewModel effects with an outcome only the ViewModel can decide, such as an async operation result; ordinary click-driven navigation belongs to UI callbacks. Prefer acknowledged state for effects requiring reliable delivery and test acknowledgement, duplicate consumption, and lifecycle re-entry.

## Fakes and fixtures

Prefer working in-memory fakes for repository/service contracts. Expose configured outcomes and controllable completion, not only a boolean that can represent one error. Mirror cancellation and expected error semantics. Keep mocks for cases where an observable fake is impractical; avoid asserting incidental call order instead of behavior.

A shared `:core:testing` JVM/Android test-fixtures module can own reusable fakes and clock utilities. Test-only dependencies must not leak into production. Keep mutable fake state per test, and use real pure collaborators where useful. Clock injection should distinguish wall time from monotonic elapsed time.

For an out-of-order response test, give calls A and B independent completion gates on the same test scheduler. Confirm that both calls reached the fake, finish B first, then A, and assert that A cannot overwrite B when the contract requires the latest result. One shared immediate response cannot exercise this ordering.

## Saved state and scope

Construct a real `SavedStateHandle(mapOf("noteId" to "n1"))` to test initialization and required-key validation. Test updates to the handle and restoration from captured values. This verifies the ViewModel contract, not the OS save/restore path; use Android lifecycle/restoration tests for that path. Do not mock the handle or promise persistence after force-stop.

## Coverage and completion

Cover meaningful success/failure distinctions, including error mappings that produce different behavior. Parameterized tests are useful for one contract across many inputs; retain input-specific failure diagnostics. Do not call two tests redundant merely because one production change could break both: independent contracts may legitimately share implementation.

Stop when the scoped behavior and relevant risks have meaningful coverage; document uncovered boundaries. Mutation testing is optional when explicitly requested, uses a compatible available tool, and can reveal weak assertions. Surviving mutants require investigation, not automatic production API changes, and a perfect score is not proof of exhaustive correctness.

When coverage reporting is needed, use Android/JVM JaCoCo or a compatible Kover setup without adding other targets. Report the actual variant, exclusions, and line/branch limits; coverage percentage alone does not establish useful assertions.

Run affected tests using the module's actual task: for example `:feature:notes:presentation:testDebugUnitTest` for an Android debug variant, or `:core:domain:test` for a Kotlin/JVM module. Run device tests separately. Report commands, results, and limits accurately.

## Parallelism, fakes and failure assertions

Dispatchers.setMain changes global process state. Do not run tests that replace Main concurrently without isolation; use the test engine's supported serialization/resource-lock configuration or separate processes. Reuse one scheduler for all dispatchers under test, but create independent fixture state per test. If a fake completes immediately, it may conceal the loading, cancellation or interleaving behavior you intended to test: add controllable suspension before asserting that behavior.

Use the same domain interface in the fake and production owner. Test each error that changes observable behavior; use tables for equivalent mappings. For cancellation, wait until a collaborator is suspended, cancel the owning job, and assert both cancellation propagation and the absence of a later success or stale write. When testing a race, assert that the intended interleaving occurred before trusting the final-state assertion. A passing test against a fake that silently reports every write as success does not exercise storage failure.

Sources: [coroutine testing](https://developer.android.com/kotlin/coroutines/test), [Flow testing](https://developer.android.com/kotlin/flow/test).
