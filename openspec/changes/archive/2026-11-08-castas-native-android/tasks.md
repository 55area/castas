# Tasks

## 1. Android project foundation

- [x] 1.1 Create the Kotlin Android app, Compose theme, navigation dependencies, and app resources; verify Gradle configuration resolves and the app assembles.
- [x] 1.2 Add a concise project README covering native stack, prerequisites, build, and test commands; verify every documented path and command matches the project.

## 2. Questionnaire domain and localization

- [x] 2.1 Port all 40 translated questions, five dimensions, and response labels to Android resources; verify each locale contains 40 questions and all expected dimensions/options.
- [x] 2.2 Implement score calculation, emoji row mapping, and share text formatting; add unit tests for score boundaries, invalid answer counts, and all emoji thresholds, then run the JVM unit test task.
- [x] 2.3 Implement completed-result persistence and language preference storage; verify real DataStore recreation on-device and verify incomplete sessions and write failures in JVM tests.

## 3. Native screens and flows

- [x] 3.1 Implement home and the four informational screens using the reference copy and assets; add UI coverage for navigation and return-to-home behavior, then run the applicable UI test task.
- [x] 3.2 Implement the one-question-at-a-time test flow, fresh restart behavior, answer progression, dimension labels, and progress; add UI tests for advancing, boundary transitions, and completion, then run the applicable UI test task.
- [x] 3.3 Implement result bars, five-by-five emoji grid, native emoji selection, clipboard sharing, and copied feedback; add UI tests for saved result rendering, emoji replacement, and clipboard output, then run the applicable UI test task.
- [x] 3.4 Implement Portuguese-default language selection and apply locale resources consistently; add UI checks for switching to English and Spanish across core screens, then run the applicable UI test task.
- [x] 3.5 Apply responsive layouts, text scaling, semantics, and accessibility announcements; verify narrow-width and enlarged-font screen states in Compose UI tests and inspect rendered behavior on an emulator/device when available.

## 4. Integrated verification and review

- [x] 4.1 Run the full available Gradle verification suite and assemble a debug APK; record exact commands, outcomes, and any unavailable Android device checks in `docs/proof.md`.
- [x] 4.2 Perform a read-only peer review against the OpenSpec requirements and Android security review proportionate to local-only data; record findings, scope, and unresolved risks in `docs/process.md`.
