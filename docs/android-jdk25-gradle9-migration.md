# Android JDK 25 and Gradle 9 migration

Verified locally on 2026-11-14. This record describes the current build; the earlier [verification record](proof.md) and [closing audit](auditoria-fechamento-castas.md) retain their original JDK 21 and Gradle 8 evidence.

## Toolchain

- Gradle runtime: Temurin JDK 25.0.4.
- Gradle wrapper: 9.9.1, with the distribution SHA-256 pinned in `android/gradle/wrapper/gradle-wrapper.properties`.
- Android Gradle Plugin: 9.5.1 with built-in Kotlin. Compose compiler plugin: 2.2.10.
- Android SDK: compile/target API 36, Build-Tools 36.0.0, minimum API 26.
- App Java/Kotlin bytecode target: 17. JDK 25 is the build runtime, not the Android device runtime or bytecode target.

## Local checks

From `android/`, the GitHub Actions task sequence passed with the updated wrapper and JDK 25:

```sh
./gradlew --no-daemon :app:assembleDebug :app:assembleDebugAndroidTest :app:testDebugUnitTest :app:lintDebug :app:lintRelease :app:bundleRelease
```

Nine JVM tests passed. Lint reported zero errors and nine warnings per variant, concerning newer API or dependency versions. Debug APK, test APK, and release AAB were generated. The release AAB is unsigned, as intended until production signing is configured outside this repository.

The five instrumented tests passed on a disposable Android 8.0 (API 26) emulator using `ANDROID_SERIAL=emulator-5554 ./gradlew --no-daemon :app:connectedDebugAndroidTest`.

An Android 16 (API 36) AVD run completed four of five tests; the clipboard assertion could not read the clip because a system app took window focus. Android's clipboard API returns `null` without app focus. Repeated runs encountered `com.android.systemui` and other system-app ANR dialogs, including with host GPU and reduced display resolution. That AVD was not a reliable test target. Repeat the API 36 device suite on a stable emulator or physical device before Play submission. No API 36 test pass is claimed here.

GitHub Actions checks the build, JVM tests, lint, and packaging. Device tests are a separate release check. See the [production checklist](production.md) for signing and Play distribution steps.
