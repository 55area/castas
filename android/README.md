# Castas for Android

This directory contains the native Android app. The repository [README](../README.md) introduces both applications and the shared project layout; this guide covers Android-specific development, verification, and release details.

## Requirements

- Android 8.0 (API 26) or newer
- JDK 25 (Gradle runtime)
- Android SDK Platform 36 and Build-Tools 36.0.0
- Android SDK Platform-Tools for device installation and instrumented tests

Use JDK 25 as the Gradle runtime in Android Studio and for command-line builds. CI uses JDK 25 too. The app still targets Java/Kotlin bytecode 17 for Android device compatibility; the Gradle runtime version does not change the minimum Android API.

Open the `android/` directory in an Android Studio version that supports AGP 9.5. For command-line work, run Gradle commands from this directory. The checked-in wrapper uses Gradle 9.9.1 with a verified distribution checksum; the Android Gradle Plugin is 9.5.1 and uses built-in Kotlin.

## Build and verify

From the repository root:

```sh
cd android
./gradlew :app:assembleDebug :app:testDebugUnitTest :app:lintDebug
./gradlew :app:lintRelease :app:bundleRelease
```

Run instrumented tests on a dedicated emulator or device with disposable app data:

```sh
ANDROID_SERIAL=DEVICE_SERIAL ./gradlew :app:connectedDebugAndroidTest
```

On Linux, [`tools/android-preflight.sh`](tools/android-preflight.sh) checks emulator acceleration and, when given an ADB serial, waits for the device to finish booting and reports its API level. On Windows, use `gradlew.bat` and set `ANDROID_SERIAL` in PowerShell before running the instrumented task.

The GitHub Actions workflow at [`.github/workflows/android.yml`](../.github/workflows/android.yml) runs the build, JVM tests, lint, release packaging, and instrumented tests on an API 36 AOSP Automated Test Device. Run local device tests on other Android versions as needed.

## Install on a device

With Android SDK Platform-Tools on `PATH`, run from `android/`:

```sh
./gradlew :app:installDebug
adb devices -l
```

Alternatively, build with `:app:assembleDebug` and install `app/build/outputs/apk/debug/app-debug.apk` using `adb -s DEVICE_SERIAL install -r ...`. Updating an existing installation requires a matching signing key; uninstalling clears the app's saved data.

## App behavior and data

The app works offline and has no account, analytics, backend, or Internet permission. It keeps the preferred language and last completed result in private app storage. Answers to an unfinished questionnaire remain in memory and are discarded if the user leaves or the process ends. The active session survives Activity recreation while the process remains alive.

Copying a result sends its text to the Android system clipboard. The app marks the clip as sensitive where supported by the platform. Users can erase the saved result and language preference through **Settings → Apps → Castas → Storage → Clear storage**.

## Structure

- `app/src/main/` contains the Compose UI, questionnaire logic, translations, and bundled content.
- `app/src/test/` contains JVM tests; `app/src/androidTest/` contains device and emulator tests.
- `tools/` contains Android host-side utilities.
- Shared requirements, design references, and verification records are in [`../openspec/`](../openspec/) and [`../docs/`](../docs/).

New user-facing behavior belongs to the shared feature process described in the [repository README](../README.md): specify and implement the web and Android acceptance criteria together, or record an explicit platform-specific scope or intentional difference in the root OpenSpec change.

## Release

The debug APK and unsigned release bundle are generated at:

- `android/app/build/outputs/apk/debug/app-debug.apk`
- `android/app/build/outputs/bundle/release/app-release.aab`

The repository does not contain production signing credentials. See the [production checklist](../docs/production.md) for signing, Play Console, and physical-device release checks. The shared GPL-3.0 license is [`../LICENSE`](../LICENSE).
