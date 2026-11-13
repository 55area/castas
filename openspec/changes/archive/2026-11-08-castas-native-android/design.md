# Design

## Context

See `proposal.md` for motivation and `specs/affective-polarization-test/spec.md` for observable behavior. The initial Android implementation is the baseline for this closure pass. The reference web source provides the questionnaire, Portuguese/English/Spanish translations, scoring function, and page copy. The reference wireframe has been corrected to the canonical 3/2/1/0 scale used by both implementations.

## Goals / Non-Goals

**Goals:**
- Keep the application architecture small and local-first, with testable domain scoring and UI state.
- Reuse the reference content and visual identity while adapting interaction patterns to Android.
- Keep screen and system behavior accessible and adaptive.

**Non-Goals:**
- Add accounts, backend APIs, analytics, ads, or remote synchronization.
- Reproduce web navigation or browser-specific behavior where Android provides a native equivalent.
- Add unfinished-test recovery, which conflicts with the web app's restart-from-first-question behavior.

## Decisions

1. **Use a single Android application module in Kotlin with Jetpack Compose.** This is an Android-native UI and avoids web rendering and cross-platform app frameworks. A single module suits the current app's limited domain; feature modules would add build and navigation overhead without an existing team boundary.
2. **Separate pure questionnaire/scoring logic from Compose screens.** Keep score mapping and result formatting independent of rendering so they can be covered with JVM tests. An Activity-owned ViewModel preserves the in-memory questionnaire across configuration changes and serializes submission. Raw answers are never written to disk.
3. **Use bundled translated content with an explicit in-app language selector.** Keep UI labels and questionnaire copy in bundled PT-BR, English, and Spanish assets, selected by the local language preference. This preserves full custom language selection independent of the device's system language.
4. **Persist only completed scores and timestamp using Preferences DataStore.** This matches the reference's completed-result-only persistence while avoiding a database for one small value object. Do not persist answers or progress. The result is shown after the DataStore write succeeds. Local I/O errors expose recovery without replacing a previously saved result. Use a native searchable dialog over the web catalog with a bundled EmojiCompat font.
5. **Use a simple native navigation graph for the seven reference screens.** Keep home as the root, informational pages as destinations, and questionnaire/result as the core flow. Native back returns to the prior screen; starting a test always creates a fresh answer session.
6. **Copy the existing icon and referenced image assets into Android resources.** Preserve the dark black surface, white type, orange accent, and existing expressive emoji identity. Adapt the web's fixed-width content box into responsive cards and scrolling layouts suitable for phones and tablets.

## Risks / Trade-offs

- **Reference documentation conflicts with its implementation on Likert point labels.** The canonical scoring contract is 3/2/1/0. Both the web wireframe and Android About screen now use it.
- **The reference says language is selected on the homepage and defaults to Portuguese, while Android may follow system locale.** Explicit in-app preference takes precedence, with Portuguese default for first launch.
- **This environment reports the current root `.agents` directory as read-only, so OpenSpec cannot install its Codex skill stubs there.** The CLI created the OpenSpec structure and change; invoke it through CLI commands and retain this native proposal/specification as the workflow record.
- **No Android SDK or emulator has yet been confirmed.** Compile and run host tests if the toolchain is available; device-level UI validation may remain unverified until an emulator/device is accessible.

## Migration Plan

No user data migration is needed because this is a new Android application. Build and install a debug APK for local validation. Release distribution and signing remain outside this implementation unless the repository or user supplies an established release path.

## Open Questions

- Can the current environment run a configured Android emulator or attached device for rendered UI checks?
- The web's terms/privacy pages name a website and refer to web-browser storage. Preserve the reference text as content, adapting only platform-specific storage wording where necessary for truthfulness.
