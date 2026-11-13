# PROJECT

## Technical decisions

- One native Android application module using Kotlin, Compose, and Android Navigation. The UI keeps the web product's behavior and content while using Android back navigation and a native dialog.
- Scoring and share formatting are pure domain code. The app packages all 40 questions in PT-BR, English, and Spanish, plus a searchable emoji catalog and an EmojiCompat font for older Android releases.
- An Activity-scoped ViewModel retains the questionnaire across configuration changes. Leaving the test or losing the process discards unfinished answers. DataStore atomically saves only completed scores and the language preference. The UI opens a new result once the write succeeds and offers a retry after a storage failure.
- Android API 26 is the minimum. Compile and target API 36. The wrapper, Android Gradle Plugin, and build instructions are documented in the [Android guide](../android/README.md).

See [the questionnaire contract](../openspec/specs/affective-polarization-test/spec.md), [Android release contract](../openspec/specs/android-release-readiness/spec.md), and [UI design](ui-design.md).

## Data and security boundaries

The packaged app has no Internet permission, accounts, analytics, WebView, or app-managed backend. The launcher Activity is the public entry point. The release manifest also contains a ProfileInstaller receiver protected by the platform permission `android.permission.DUMP`. The saved result and language live in sandboxed Preferences DataStore. The manifest disables backup and specifies exclusion rules for both cloud backup and device transfer. Store links and project credits open externally only on user action.

Copying exports the scores to the system clipboard. The app marks that clip sensitive and displays short-lived confirmation. Receiving apps and platform clipboard behavior remain outside its control. Release approval, signing credentials, and physical-device validation are tracked in [PRODUCTION](production.md).
