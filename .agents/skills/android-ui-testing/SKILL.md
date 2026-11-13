---
name: android-ui-testing
description: Author, run or debug automated native Android Compose interaction tests on devices/emulators. Use for UI-test implementation; use ui-design for screen design, usability/accessibility critique or visual acceptance, and peer-review for independent code/test review.
license: MIT
metadata:
  version: "1.3.0"
---

# Android Compose UI Testing

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Use native AndroidX Compose UI testing and `AndroidJUnitRunner` under `src/androidTest` for real Android behavior. Optional companions are `android-unit-testing` for isolated logic and `android-integration-testing` for non-UI storage/network boundaries.

## Dependencies and host

Align `androidx.compose.ui:ui-test-junit4` with the project's Compose BOM in `androidTestImplementation`. Add compatible AndroidX test runner/rules and JUnit4. For rules using the default Compose test Activity, add `androidx.compose.ui:ui-test-manifest` in the appropriate debug configuration; declare a custom host Activity in the correct manifest when needed.

`createComposeRule()` can host real Android Compose content in a default Activity. `createAndroidComposeRule<YourActivity>()` is appropriate when the Activity or its resources/lifecycle matter. Neither function name alone determines whether the test runs on a device or in a JVM framework simulation. Optional Robolectric tests can supplement device coverage; do not equate them with device evidence.

## API version and synchronization

Inspect **both the library version and imported factory/environment**. Native v2 factories are under `androidx.compose.ui.test.junit4.v2`; earlier factories use `androidx.compose.ui.test.junit4`. The v2 APIs use StandardTestDispatcher for composition, while legacy factories retain eager behavior; directly constructed environments can differ. Use the migration guide for the installed version, including any opt-ins/configuration changes.

When the resolved version supports `ComposeUiTestConfig`, use its supported configuration overloads. Newer v2 environments default to touch input; keyboard-focused tests should select keyboard input explicitly through that API when available. Do not rely on a previous test's input mode or copy a new configuration class into an older dependency set. A migration is a deliberate scoped change, not a reason to upgrade every test dependency.

Use ordinary synchronized node interactions/assertions and `waitForIdle()` first. With auto-advancement enabled, the Compose clock progresses composition work toward idle. Set `mainClock.autoAdvance = false` only when deliberately controlling animation/timing, then advance the appropriate clock to the intended frame. Do not add an arbitrary 1–3 second advance to every click.

Compose's clock does not control all external I/O or every ViewModel dispatcher. Use controlled fakes/idling resources or `waitUntil` for externally driven conditions, and use the matching coroutine test scheduler for separately managed work. Never replace event synchronization with `Thread.sleep`.

## Screen and feature coverage

Keep most ViewModel logic in unit tests. UI tests verify meaningful rendered behavior and wiring: editing, submit, disabled/loading/error/retry states, accessibility semantics, and callbacks. Use a real ViewModel with controlled repository collaborators for a screen test. Acquire it through a test owner/DI or cancel its scope explicitly; manually constructing a ViewModel outside a store does not give it lifecycle cleanup.

A feature-level flow can use real domain/data logic with MockEngine and a test database at external boundaries. Call it a feature flow with a controlled backend; it does not verify a real service deployment. Exercise a representative success path and realistic failure/recovery, rather than duplicating every unit input through UI.

Cover relevant rotation/recreation, state save/restore, system back versus toolbar Up, deep-link entry, duplicate taps, long content, RTL, font scale, keyboard/IME interactions, and TalkBack semantics. `ActivityScenario.recreate()` tests Activity recreation, not a real process kill. Use the appropriate restoration harness or a separate controlled system process-recreation scenario and describe which was actually tested.

## Selectors and native resources

Prefer visible text or meaningful semantics for accessible user actions. Use localized `contentDescription` for informative graphics or otherwise unlabeled icon controls. Use `null` for purely decorative graphics and avoid duplicating existing labels. Assert the accessible action and name at the owning control. [Compose accessibility defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) Use a test tag when repeated/dynamic content or a stable container cannot be identified reliably through user-facing semantics. Scope selectors to a parent or refine matchers for duplicate labels; don't force an ambiguous text selector.

```kotlin
// With a rule that exposes the Android host Activity:
val submit = composeTestRule.activity.getString(R.string.sign_in)
composeTestRule.onNodeWithText(submit).performClick()
composeTestRule.onNodeWithText(
    composeTestRule.activity.getString(R.string.login_error)
).assertIsDisplayed()
```

Read the same native resources as production rather than duplicating localized literals. Pass a resource resolver to reusable helpers that only know `SemanticsNodeInteractionsProvider`/generic Compose interfaces; those interfaces do not expose `.activity`. Use the unmerged semantics tree only when the merged tree cannot express the intended target, and explain the accessibility implications.

## Robot pattern for repeated flows

For repeated multi-step feature tests, encapsulate interaction vocabulary without hiding assertions or synchronization. A small Robot need not own the Activity or the rule:

```kotlin
class LoginRobot(
    private val nodes: SemanticsNodeInteractionsProvider,
    private val string: (Int) -> String
) {
    fun submit() = apply {
        nodes.onNodeWithText(string(R.string.sign_in)).performClick()
    }
    fun assertLoginError() = apply {
        nodes.onNodeWithText(string(R.string.login_error)).assertIsDisplayed()
    }
}
// Test: LoginRobot(composeTestRule) { id -> composeTestRule.activity.getString(id) }
// Content setup and external async synchronization remain explicit in the test.
```

Use imports from `androidx.compose.ui.test` for node interactions and provider types. Do not access `.activity` through `ComposeContentTestRule`. Avoid adding a Robot for a single trivial test unless it clarifies the flow.

## Cleanup and execution

Close test databases, HTTP clients/engines, and isolated DI containers; remove overrides and reset global dispatchers. Clear test-owned ViewModels and cancel collectors. Keep data isolated per test and do not rely on test order. Unexpected MockEngine requests should fail loudly rather than return a generic success.

Run the actual variant's connected-device task, for example `:app:connectedDebugAndroidTest`, or its configured managed-device task. Include required app startup, navigation, and release behavior in the chosen coverage. Report the device/API, executed cases, results, and limits. Passing previews, host-only tests, or a clock advance alone does not establish UI correctness.

## Check input routing and effective configuration

Drive real pointer/keyboard/semantics actions, not direct calls to onClick or assignment of a field's backing variable. Hold the first submission pending with a controlled fake, attempt a second activation through the affected input route, and assert the observable operation count. Use touch or keyboard events when hit-testing, overlays, or focus are the behavior under test. A semantics invocation alone does not exercise pointer routing. Keep accessible selectors and test data deterministic across locales; using resource IDs avoids copy drift but does not itself test localization, RTL or TalkBack.

When accessibility is part of the claim, pair assertions for names, roles, actions and states with the supported automated checks and the applicable keyboard or TalkBack journey. For a supported `AndroidComposeTestRule`, add the BOM-aligned `ui-test-junit4-accessibility` artifact and enable checks before an action or `tryPerformAccessibilityChecks()`. This API requires API 34+ and a device or emulator. Preserve ordinary semantics assertions on lower APIs and record which accessibility checks actually ran. [Compose accessibility testing](https://developer.android.com/develop/ui/compose/accessibility/testing) · [Rule API limits](https://developer.android.com/reference/kotlin/androidx/compose/ui/test/junit4/AndroidComposeTestRule)

Test protected screens and deep links under an unauthorized fixture and after a session change. Inspect release-effective permissions and manifest settings separately from a debug test Activity. Use synthetic accounts and records in screenshots and failure artifacts.

Sources: [Compose testing](https://developer.android.com/develop/ui/compose/testing), [v2 migration and dispatchers](https://developer.android.com/develop/ui/compose/testing/migrate-v2), [synchronization](https://developer.android.com/develop/ui/compose/testing/synchronization).
