## ADDED Requirements

### Requirement: Android API support
The app SHALL target API 36 and install from API 26, with a working questionnaire and readable emoji fallback on its minimum platform.

#### Scenario: Verify the release SDK range
- **WHEN** the debug and release candidates are inspected and tested
- **THEN** the packaged SDK range is API 26 minimum and API 36 target, lint passes, and the core journey runs on both endpoint API levels

### Requirement: Reproducible candidate packaging
The repository SHALL build a release AAB with a documented toolchain and provide a separate maintainer checklist for production signing and Play submission.

#### Scenario: Build a local release candidate
- **WHEN** the configured build gate runs
- **THEN** it assembles the APKs, runs JVM tests and lint, and produces a release AAB without requiring production credentials

#### Scenario: Inspect packaging and data exposure
- **WHEN** the effective release artifact and APK splits are inspected
- **THEN** native libraries are 16 KiB aligned where required, completed results are excluded from backup, and the app declares no Internet permission
