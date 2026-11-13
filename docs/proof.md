# PROOF

## Verification contract

The [questionnaire capability](../openspec/specs/affective-polarization-test/spec.md) owns the interaction contract. The [release capability](../openspec/specs/android-release-readiness/spec.md) defines the local packaging and device gates. The [closing audit](auditoria-fechamento-castas.md) describes the changes, review scope, and operational handoff in Portuguese.

## Commands

Run with JDK 21, the Gradle 8.11.1 wrapper, AGP 8.9.3, platform 36, and Build-Tools 35.0.0.

```sh
./android/gradlew -p android --no-daemon --console=plain --continue \
  :app:assembleDebug :app:assembleDebugAndroidTest :app:testDebugUnitTest \
  :app:bundleRelease :app:lintDebug :app:lintRelease
```

Run the Android test suite with the app and test APKs installed on each dedicated AVD. The explicit serial targets only the intended guest.

```sh
android/tools/android-preflight.sh "$SERIAL"
adb -s "$SERIAL" install -r android/app/build/outputs/apk/debug/app-debug.apk
adb -s "$SERIAL" install -r android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk
adb -s "$SERIAL" shell am instrument -w -r -e capture true \
  com.teknolista.castas.test/androidx.test.runner.AndroidJUnitRunner
```

Bundletool 1.18.3 validates the bundle and generates installable splits with a disposable test key. Build-Tools 35.0.0 checks the resulting APKs with `zipalign -c -P 16 4`. `readelf -lW` inspects 64-bit native load segments. Inspect the bundle manifest, install the split set with `bundletool install-apks`, and check the initial questionnaire flow on a disposable guest.

## Evidence from the closing worktree

| Gate | Evidence |
| --- | --- |
| Build and unit tests | Debug APK, instrumentation APK, and unsigned release AAB built. All 9 JVM tests passed. Coverage includes score extremes and thresholds, answer guarding and cancellation, a failed write that preserves the previous result, and retry. |
| Lint | Debug and release passed with 0 errors and 7 warnings each. Six suggest newer dependencies. The remaining warning requests a legacy backup XML rule. The packaged manifest disables legacy backup and also sets `android:fullBackupContent="false"`. |
| Web reference | Compared all 120 question translations and their order against the TypeScript source. The three reference images match the Android assets by SHA-256. Each locale has 3,773 unique catalog entries before renderability filtering. |
| Android 8.0 emulator | API 26 x86, 5 instrumented tests passed in 33.588 s. Inspected the rendered `🫶` glyph and grid in the captured result. A separate ADB check reopened a persisted result after force-stop and changed the guest orientation while retaining question 2. |
| Android 16 tablet emulator | API 36 x86_64, 1280 × 800 dp, KVM, 16 KiB pages confirmed by `getconf PAGE_SIZE`. All 5 instrumented tests passed in 108.407 s. Optional screenshot capture was disabled in the test runner. |
| Effective release manifest | `com.teknolista.castas` 1.0.0, version code 1, minimum 26, target and compile 36, legacy backup disabled, Android 12+ extraction exclusions, no Internet permission. Successful manifest merge and execution at the minimum platform check the runtime dependencies included in the APK. |
| Bundle and split alignment | Bundletool validation passed. Bundle requests `PAGE_ALIGNMENT_16K`. All 87 APK splits passed ZIP alignment. Both native libraries for each of arm64-v8a and x86_64 have 16 KiB ELF load segments. |
| Release package smoke | Bundletool-installed APK splits, signed with a disposable test key, opened and advanced the questionnaire on API 26 with 4 KiB pages and API 36 with 16 KiB pages. |
| OpenSpec and whitespace | Both changes were validated and archived with 12/12 and 4/4 tasks. Both consolidated specifications and both archives passed strict validation. `git diff --check` passed in the Android and web repositories. |

Artifact SHA-256 checksums:

| Artifact | SHA-256 |
| --- | --- |
| `android/app/build/outputs/apk/debug/app-debug.apk` | `2a075bec7b6c9903532b125614857fc620c5aa01976605cd82d2cce3b5933750` |
| `android/app/build/outputs/bundle/release/app-release.aab` | `921cf421f1459faba8a3ea1dc5b9c2f32f64bef6cfc2c40f088214846557dae0` |

## Coverage limits

The build workflow in GitHub Actions runs the build, unit tests, and lint. Device tests in this record are local, and the workflow has yet to run remotely. Verify Play signing, installation and upgrade from a Play track, assistive technology on a physical phone, and asset redistribution rights before publishing. See [PRODUCTION](production.md).
