# Proposal

## Why

Castas currently offers its affective polarization questionnaire as a web experience. Android users should be able to complete the same 40-question test and access the same informational pages in an app built with Android's native UI and platform APIs.

## What Changes

- Add a native Android application that reproduces the web app's home, political fanatic, questionnaire, result, about, terms, and privacy screens.
- Preserve the five dimensions, 40 translated questions, four-point response scale, scoring, emoji grid, custom positive emoji, result sharing, and local-only result persistence.
- Support Brazilian Portuguese, English, and Spanish, with Portuguese selected by default.
- Add native navigation, adaptive layouts, accessibility semantics, and Android build and test configuration.

## Capabilities

### New Capabilities

- `affective-polarization-test`: Native Castas screens, questionnaire flow, localization, scoring, result display and sharing, and local persistence.

### Modified Capabilities

None. This repository has no existing OpenSpec capabilities.

## Impact

- This Android repository gains a Kotlin and Jetpack Compose application, Android resources, Gradle configuration, and native tests.
- The reference is the Castas web app in `web/`; its behavior and content are treated as product evidence.
- The app requires no backend or network access for the test and stores only the completed result on-device.
- OpenSpec in this repository is initialized with the `spec-driven` schema. Codex setup could not create `.agents/skills` because that directory is read-only in this environment.
