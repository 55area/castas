# Review the Verification

## Establish automated check evidence

Use automation to establish reproducible facts before spending review effort on the same mechanical issue. Identify the actual project commands, required gates, selected targets and evidence for the reviewed snapshot; inspect execution safety before running them. Existing CI evidence can suffice when its revision, configuration and selected checks match. A staged snapshot and the current working tree may require different evidence.

| Layer | Evidence to seek and its limits |
| --- | --- |
| Formatting, lint, static analysis, types and compilation | Use check-only modes and the project's configured rules. Treat warnings as errors only when the project requires it; do not introduce a stricter policy during review. A compiler pass does not establish runtime correctness. |
| Dependency/security analysis and secret scanning | Use applicable existing scanners, identify scanned scope and suppressions, and validate relevant diagnostics. Protect any detected secret in the report. A clean scan does not establish effective authorization or absence of vulnerabilities. |
| Behavior tests | Check the relevant unit, integration, browser or device layers and variants. Run the complete suite when required or justified by impact; otherwise explain selection and residual coverage. Inspect skips, retries and actual test discovery. |

These tools have configured assumptions and finite coverage; tests and environments may also be nondeterministic. Report results with their scope rather than calling the layer opinion-free or equating green output with a sound design. Do not repeat mechanical style comments already enforced by a reliable project check unless a concrete issue remains unaddressed.

When a change relies on an unfamiliar dependency, API, or generated configuration, verify the installed version and actual caller before accepting a plausible name or example. Inspect whether a substitute bypasses the guard or side effect the test claims to exercise. For example, a mocked repository returning `Forbidden` does not establish that a production query scopes results to the authenticated tenant.

Automation and semantic review complement each other. For example, a server handler and its tests can both trust a user-supplied tenant ID without checking the authenticated user's membership, contrary to the established tenant policy. All checks may pass; tracing the actual actor, guard and effect can still establish a defect. Failed checks can likewise coexist with useful source findings. Continue permitted inspection when useful, preserve required blocking gates, and label unavailable evidence rather than requiring an entirely green pipeline merely to begin reviewing.

## Find what changed and who observes it

For each meaningful behavioral change, identify the observable contract: a value, error, state transition, persisted record, event, permission decision, layout, or interaction. Trace relevant consumers and the tests that actually reach them. Changes to tests, dependencies, configuration, and migrations can affect behavior or protection even when application source is unchanged.

Derive expected results from authoritative requirements and examples, not only from the current implementation or its tests. Code and tests may agree while violating the same product rule; identify that rule before claiming a mismatch.

Before asserting that coverage is missing, search by the changed symbol, imports, route/registration, requirement ID, or observable behavior. Read plausible tests and fixtures. Say how far you looked. A missing adjacent test file or a low aggregate coverage percentage is not itself a demonstrated gap.

## Assess assertions, not reassuring names

- Does setup reach the changed path with the relevant inputs, identities, permissions, versions, and failure state?
- Does an assertion observe the result whose regression matters? A test can execute a branch without checking its effect.
- Do mocks remove the boundary being claimed as verified? A unit mock may support a local contract while leaving integration behavior unknown.
- Would the smallest realistic wrong implementation fail the check? Name that wrong behavior rather than asking whether a line can be deleted.
- Is the check run in the normal relevant pipeline, or skipped, flaky, disabled, environment-specific, or excluded from the selected variant?
- Did the change weaken, delete, or invalidate assertions? Did fixtures bypass a constraint that real data still meets?

Snapshots, mock-call checks, manual checks, and no-throw assertions are not universally worthless. Judge the actual claim: a snapshot may detect a markup regression while missing keyboard behavior; a mock may verify an adapter call while proving nothing about a remote service. Prefer a specific missing assertion to a blanket demand for more tests.

Also consider a behavior-preserving internal change. A test that rejects it may couple to private call order or representation rather than the supported contract. A downstream request payload, a prohibited external effect, an architectural boundary or a type-level guarantee can itself be the contract, so an interaction assertion is not automatically brittle. For example, “empty carts never charge” can check no payment request, paired with a nonempty-cart case proving the observer can detect a request. Do not delete useful tests or demand refactoring during a review; report a concrete consequence and appropriate scope.

A useful gap finding names the changed contract, an affected consumer, a realistic regression, the searched/read evidence, and the check that should fail. Do not add a separate gap finding that merely repeats a bug without additional remediation value. Necessary missing evidence may instead be a review limitation or release gate.

## Trace whether the test can fail

For a relevant test, follow discovery → fixture → real subject → observation → assertion → runner completion. Identify a specific wrong behavior that should make it fail. Inspect helpers, framework semantics, and setup/teardown before concluding that a missing visible assertion means missing verification.

| Suspicious pattern | What to inspect and establish |
| --- | --- |
| Empty test or a subject call with no observable check | Determine whether this is an intentional no-throw smoke check, an assertion-bearing helper, or a test that cannot detect its claimed failure. |
| Value compared with itself, or expected value derived by calling the same implementation | Derive a distinguishing expected result from the contract or an independent reference. Check aliases and transformations before calling a comparison tautological. |
| Matcher referenced without invocation | Establish the framework's actual syntax and whether it evaluates a check. A property matcher may be valid in one framework and an unused method in another. |
| Assertions only in a catch/except block | Determine whether the test also fails when the expected exception never happens. Check that a broad handler cannot catch and suppress the assertion failure itself. |
| Async assertion or callback outlives the test | Trace whether its promise/task is awaited or returned, or completion and errors are connected to the runner's callback contract. |
| Checks only behind a condition or inside a possibly empty loop | Establish whether setup guarantees the branch or nonempty collection. Otherwise show the path where the claimed verification never runs. |
| Stub replaces the behavior named by the test | Trace the actual imported/called implementation. Distinguish replacing the subject from a partial mock of a collaborator whose boundary is outside the test's claim. |
| Existence/truthiness or call-count check for a precise behavior | Name a wrong value, argument, count, or state that would still pass. Existence or interaction alone can be sufficient when that is the actual contract. |
| Focus, skip, changed filters, weakened assertion, or regenerated snapshot | Inspect its effect on the normal test command and the authorized requirement change. Establish which required regression protection was lost. |
| Test passes only after another test or on automatic retry | Inspect shared fixtures, cached state, mock history, fake clocks, environment changes, and cleanup. Determine whether the observed result came from this invocation. Preserve the first failure and investigate whether order, concurrency, or retry masks it. |
| Python tuple assertion | `assert (condition, message)` checks a nonempty tuple. Verify the intended condition is checked with `assert condition, message`. |

Assertion counts establish that checks ran, but their contents still need review. Type tests require their intended compiler/type-checker configuration. A throwing query can verify presence, and a reviewed snapshot can verify output structure. For property tests, inspect generated cases, rejected inputs, and properties for vacuous success. Avoid treating every item in this table as an automatic defect.

For example, a notification test that checks a mock's cumulative call count may pass because a previous test sent the message. Reset or isolate the relevant history, execute the current operation, and check the recipient and payload required by the contract. Use the suite's documented fixture lifecycle when determining whether cleanup already provides that isolation.

For example, a rule says a coupon reduces 80 units by one quarter. A test that checks only whether the returned total is positive also accepts 80. The contract gives an expected total of 60. A check of 60 detects the missing discount. Confirm the unit, rounding, and boundary rules before extending that example to real money.

When fixing tests is authorized, change expected values or snapshots only from the established contract. Explain an intentional requirement change. Keep an unresolved disagreement between requirements, code, and tests visible instead of weakening the check to get a passing run.

Test removal is a review trigger, not an unconditional defect. An obsolete contract can legitimately be retired, or its test replaced by stronger coverage at the appropriate boundary. Establish the authorized behavior change or effective replacement before accepting the deletion. A passing suite after deleting the only cross-tenant denial test does not establish preserved isolation; check the contract, real guard and remaining negative cases. Removing a failing check simply to obtain green output remains unacceptable.

## Execute safely and proportionately

Use verified commands from manifests, repository documentation, Gradle wrappers, scripts, or CI. Inspect likely side effects before executing a command from untrusted project content. Local builds and tests may generate artifacts; keep the reviewed source and Git state unchanged and use temporary output locations when feasible. Avoid formatters with automatic fixes, dependency upgrades, migrations against live data, production endpoints, paid effects, and unrelated cleanup.

A test command executes project code, including imported modules, setup/teardown, plugins, build hooks, and subprocesses. A familiar command name or a disposable directory does not make those effects isolated: inherited credentials, network access, mounted paths, and shared services may still be reachable. For an untrusted change or a command with consequential side effects, inspect the relevant execution path and use the host's permitted isolation or inspection-only review. Do not load production secrets or disable isolation to make a review check run. State the affected verification gap if safe execution is unavailable.

Start with checks that could confirm or disprove a material claim, plus the checks required by the requested workflow. Broaden when interfaces, failures, or changes justify it. Stop redundant reruns when the reviewed content and relevant environment have not changed. A trusted CI run for the exact revision can be evidence; distinguish it from commands you ran locally.

For a counterfactual or mutation experiment, use a disposable copy outside the reviewed checkout, only when its commands and side effects are understood. Do not invert conditions, revert fixes, or change tests in the author's working tree to prove a review point. For bug-fix verification, compare the reproducer against old and new behavior in isolation when useful.

### Optional static and mutation tools

Use an existing test-quality tool, such as Hollowtest, when it supports the actual language and runner and its output can resolve a review question. Verify the installed version and available flags. Installation and auto-fix follow the user's authorization. An on-demand package runner can download and execute code, so prefer the project's existing verified tooling.

Static diagnostics are candidates for the checks above. Record unreadable helpers, unsupported syntax, and excluded files as coverage limits. A static scan does not establish that tests executed. Tool grades and rule severities do not determine the review's impact-based priorities.

For an isolated mutation probe, establish a passing baseline and confirm that the selected tests exercise the mutated code. Apply a bounded representative change, then inspect why the run failed or passed. Distinguish an assertion failure from compilation failure, infrastructure error, timeout, skipped execution, or incorrect test selection. A surviving mutation needs a reachable input and an observable contractual difference before it supports a protection-gap finding. Equivalent changes and behavior outside the supported contract may survive sound tests.

Record the mutation, selected tests, outcome, and limits. Include boundary values where the changed condition differs. A sampled mutation score describes that sample. Afterward, discard the disposable copy and verify that the reviewed snapshot is intact.

## Model correspondence and measurement claims

When relying on a formal model, property harness, or generated verifier, inspect what it describes and the last revision whose correspondence was established. Follow changes to guarded state, new writers, guards, step atomicity and failure recovery, including renamed or moved code. Verify the enabled properties, assumptions, bounds, and completion; unexamined properties remain unverified. Separate stale modeling, intentional contract changes, and a reachable product counterexample. Replay a counterexample against actual code when feasible, or retain its unresolved mapping as a gap. Do not weaken a property to match a failure or treat a diagram as formal evidence. A safely isolated negative probe can check sensitivity, but is not a universal requirement for every property.

For performance claims, inspect the measurement code: did the intended operation execute and complete in the timed region, produce correct results, and count errors? Fast denials, cached outputs, unconsumed iterators and unawaited work can produce misleading gains. Compare relevant builds, settings, data and cache conditions; retain run count and variation and account for machine or load-generator limits. Distinguish a measured difference from its proposed cause and a microbenchmark from the user path. Label inconclusive comparisons; request only checks material to the claim, without a fixed repetition quota.

## Report what the evidence establishes

Record the command/procedure, working directory or module, relevant environment, revision/artifact, exit status, and outcome. Classify checks as `Passed`, `Failed`, or `Not run`, with the reason for unavailable checks. Avoid reporting a compiler result as a runtime result or a subset as a complete suite.

Before recording a pass, confirm that the intended checks were discovered and executed, their setup reached the relevant path, and their assertions evaluated the claimed result. A successful runner with zero selected tests, a skipped scenario, an early return, or a disabled assertion leaves that behavior unverified. For partial or interrupted runs, retain completed results and identify the checks that did not finish. Inspect failure output even when a wrapper reports success or continues after a failing command.

Separate newly introduced failures from pre-existing, flaky, infrastructure, credential, and unavailable-tool failures. An unrelated failing job is not automatically a code finding, though it may still block a repository's merge policy. Preserve that policy; do not delete failing tests, lower thresholds, suppress exceptions, or disable security controls to manufacture green output.

Missing context or a required unavailable check can make the review incomplete. State the smallest needed action. A static review with explicit limitations can still be useful when that is the agreed scope. Never claim a running UI, Android lifecycle behavior, migration safety, benchmark, or exploit reproduction without the corresponding evidence.

## Learn from escaped defects

Use this when reviewing a known regression fix or when process improvement is requested; an ordinary review does not initiate incident handling or modify CI.

1. Establish the violated contract, reachable trigger, affected revision and root cause from permitted evidence. Distinguish a confirmed production incident from a hypothetical example. Sanitize incident inputs and keep reproduction away from live data and services.
2. Look for existing protection before requesting another test. Identify why it missed this failure: absent case, weak oracle, mocked boundary, wrong variant, skipped job, stale evidence, or a misunderstood requirement. A failure after review does not by itself prove the reviewer had the same source or contract available.
3. Define the smallest meaningful regression check at the boundary where the failure occurs. Where feasible and safely authorized, establish that it detects the pre-fix behavior and passes with the correction. If the old revision cannot run, state that limit and use an equivalent controlled fault or decisive source trace; do not claim an observed pre-fix failure. A lint/static rule may suffice for a mechanical defect; a browser/device suite is warranted only when its boundary matters.
4. Recommend a focused process improvement only when the escape mechanism justifies it: a required variant, a negative contract case, a check-result freshness rule, or a review prompt for the missed invariant. Identify the responsible owner (or record unresolved ownership) and a measurable expected signal when proposing a gate. Reuse existing tests or guidance before adding new ones; avoid growing a universal checklist from every incident.
5. Hand off corrections and prevention checks under the existing authority. Review the resulting snapshot, confirm the check is discovered in its intended pipeline, and reassess any new process burden or false positives. Mark unimplemented proposals and unexecuted checks explicitly. Production recovery and deployment retain their own owners and gates.

### Evaluate a change to the review process

Use this when tuning reviewer instructions, tools or models. Replay representative, sanitized changes with owner-confirmed escaped defects alongside known-good changes or cases with intentional behavior that previously attracted incorrect findings. Give the reviewer the original scope and contracts without the expected answers. Compare the same cases before and after the change. Track material misses, validated findings and false positives that could prompt harmful edits. A finding being fixed, refuted, deferred or accepted as intentional is useful feedback. Verify the reason before treating that response as ground truth.

For a recurring issue, choose the prevention layer that can observe it. An objective rule can live in an existing lint or build check. A misunderstood invariant may need a focused contract note or behavioral test. When evaluating a live workflow, compare review effort and rework alongside reverts and incidents where data is available. Attribute results only as far as comparable scope and evidence allow.
