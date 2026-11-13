# Android and KMP test effectiveness

Use with [verification](verification.md) when the review relies on Android/Kotlin tests. Discover the actual runner, test source sets, selected variant, dependency versions, filters and CI jobs. JUnit, AssertK, Turbine, mock libraries, fakes and robot helpers are options, not required migrations.

## Observable contract and useful cases

Start from the intended behavior, including implicit inputs such as locale, clock, restoration values and collaborator outcomes. Select distinct risk-relevant examples: Unicode/grapheme boundaries, domain numeric limits/overflow, time-zone/expiry boundaries, repeated action, late response, cancellation, stale cached data and recovery. Do not require every category for every unit or delete valid regression examples simply because one production defect can break several tests. Multiple inputs may establish distinct contract boundaries even on the same branch.

Fakes should reproduce the relevant collaborator contract, including rejected/empty/late responses, and expose effects needed to detect defects. A fake that always succeeds or bypasses the subject can manufacture confidence; excessive mock call-pattern checks can also miss wrong persisted data. Use inexpensive real collaborators where helpful and inspect real integration checks for boundaries the fake replaces. Test taxonomy labels do not change what was exercised.

## Coroutine scheduling and Flow

- Establish scheduler/dispatcher ownership, collector start, virtual-time control, teardown and escaped real IO. For ordinary kotlinx-coroutines-test scopes, share the intended TestCoroutineScheduler among collaborating test dispatchers. Reset replaced Main dispatchers and cancel long-lived collectors at cleanup. A different test API may have its own context-sharing constraints; inspect its actual contract.
- StandardTestDispatcher queues work; eager UnconfinedTestDispatcher execution is a testing choice, not proof that production ordering is safe. Advance the scheduler that owns the relevant work or await a bounded observable condition. Do not fix races with arbitrary sleeps or forced eager execution.
- StateFlow conflates updates and equal values. A test cannot assume every intermediate loading state will be collected. If a transient phase matters to the contract, use a controlled suspended dependency and observe it before release. Otherwise assert the meaningful current/final state and effects; avoid testing incidental scheduling.
- Subscribe before actions when checking one-shot flows/channels. Examine replay, buffering, missing/multiple collectors and cancellation between state change and delivery. A single received event is not proof of exactly-once delivery across lifecycle/process boundaries. Test required acknowledgment/state ownership rather than prescribing Channels universally.
- Check cancellation is propagated without displaying a spurious service error, committing abandoned results, or emitting a success after work was cancelled. When outcomes may already have committed, distinguish cancellation of observation from rollback of the effect.

## Compose/device tests

Check the actual Compose testing API and resolved artifact versions before applying dispatcher guidance. Automatic synchronization, composition/effect context, test-body scheduler and external workers are distinct; a version number alone does not imply every test needs a fixed clock jump. Inspect mainClock.autoAdvance, idle synchronization and external idling/condition mechanisms. Advancing a Compose animation clock does not complete arbitrary network or IO work.

Exercise user controls and assert the resulting state/navigation/data, including the relevant real ViewModel or integration graph. Prefer semantic targets that identify the intended control; stable tags are valid when text is localized/ambiguous. Reading production string resources avoids incidental copy drift, but cannot independently prove that the chosen label/resource is correct. Validate copy/accessibility requirements separately. Inspect merged semantics, helper/robot assertions and whether a click actually reached the intended handler.

Component previews can reveal visual states; automated screenshot regression can protect appearance, and interaction tests protect behavior. None universally replaces the others. createComposeRule versus createAndroidComposeRule does not alone establish JVM versus device execution: inspect source set, runner and host. Robolectric evidence has a different boundary from a real Android runtime; report it accurately rather than banning a harness by name.

## Restoration and multiplatform coverage

Constructing a ViewModel with a populated SavedStateHandle tests initialization from a map. Activity recreation tests another boundary. Actual save/restore wiring and process loss need suitable lifecycle/device evidence. Critical durable data needs the agreed persistence/recovery checks as well. Do not infer equivalent iOS termination recovery from compiling a common SavedStateHandle API.

For KMP inspect common/platform source sets and actual enabled test compilations. JVM-only imports/mocking infrastructure in common tests may leave native targets uncompilable or untested. Verify each required supported target and platform adapter; a Linux host cannot supply an iOS runtime result. Scrutinize name-based exclusions, isFailOnNoMatchingTests=false and aggregate tasks that can succeed with zero intended cases. Do not rename tests or relax discovery to hide a failed gate.

A bounded isolated mutation can challenge a specific protection gap; [verification](verification.md) defines baseline, discovery, assertion and equivalence checks. Mutation survival is not proof that a suite is useless or that public production APIs must be expanded solely for a test.

Primary references: [Android coroutine tests](https://developer.android.com/kotlin/coroutines/test), [StateFlow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/), [Compose synchronization](https://developer.android.com/develop/ui/compose/testing/synchronization), [KMP test configuration](https://developer.android.com/kotlin/multiplatform/plugin).
