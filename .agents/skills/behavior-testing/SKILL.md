---
name: behavior-testing
description: Author automated behavior tests outside native Android. Use when tests are the primary deliverable or test-first implementation is requested.
license: MIT
metadata:
  version: "1.2.0"
---

# Test observable behavior

For regression checks that accompany an ordinary product change, use the implementation workflow and the project's runner.

1. Find the expected outcome in the accepted requirement, public contract, or reproduced defect. Read the existing runner, test discovery, fixtures, and CI commands. Use the smallest boundary that still exercises the failure mode. A unit test can cover pure behavior, while an integration test can cover an actual transaction or adapter. Use a browser or native app harness for behavior that depends on that runtime.
2. Choose inputs and expected results independently of the code under test. Include the boundary, failure, or concurrency case that would catch the relevant regression. Reuse existing fixtures and runners. Substitute external dependencies where needed for isolation or determinism, and exercise the real boundary when a substitute could hide the defect. Verify observable output and effects.
3. For test-first work or a regression with a reproducible baseline, run the focused check before the fix. Confirm discovery and the intended assertion failure. Setup errors, skipped tests, and unrelated failures do not establish a regression. If source already contains a fix, preserve it. Where material, use an isolated baseline or a reversible fault probe to check sensitivity. Label existing-behavior tests and unavailable baseline evidence accurately.
4. When implementation is authorized, implement the smallest complete behavior and rerun the focused check. Refactor within scope when it improves the result and rerun affected checks. Run the appropriate broader suite and required gates where safe and available. Report inherited, introduced, and unclassified failures separately.
5. For test-only work, preserve product code and explain any failure that requires a separate fix. For browser journeys, use the running app and user-facing interactions. Wait for the observable state under test instead of relying on arbitrary sleeps or global network quiet. Capture focused trace, DOM, or screenshot evidence only as needed. Exercise keyboard, viewport, and recovery behavior where the contract depends on them.

Use isolated fixtures, disposable services, and synthetic data. Keep real credentials and production systems out of default tests. Follow project policy and authorized scope for changes to dependencies, runners, or CI. Choose coverage by failure consequence and contract. Preserve meaningful assertions, including status, payload, and unchanged state where a failure must have no effect.

For a flaky test or a choice between competing test boundaries, use [test design and intermittent failures](references/test-design.md).

Report the behavior and boundary exercised, commands and actual outcomes, baseline or fault-sensitivity evidence where available, and remaining gaps. A mocked response establishes behavior against that substitute. It cannot establish that a live provider meets the contract.
