# PRODUCTION

## Local testing

Open the `android/` Gradle project in Android Studio. Use its SDK Manager for platform 36, build-tools 35.0.0, and Platform-Tools, select JDK 21 as the Gradle JDK, and sync. Device Manager can use an API 26 phone and an API 36 tablet. On Linux, verify KVM in the same host shell that starts the AVD. Keep AVD writable data on a filesystem with sufficient free space.

Run [the preflight](../android/tools/android-preflight.sh) without arguments for the acceleration check and with the explicit ADB serial to confirm guest boot and API. A sandbox can hide `/dev/kvm` even when the host can use it. Software GPU rendering with SwiftShader can still use KVM for the guest CPU. When ADB sees a device before boot finishes, wait for `sys.boot_completed=1`. If host acceleration is unavailable, use a dedicated physical test phone or a runner with working virtualization.

To test on a phone, enable developer options and USB debugging, connect with a data cable, confirm the device's RSA prompt and install the debug APK with the [README command](../android/README.md). An existing installation signed by a different key cannot be updated by the debug APK. Uninstalling erases its local result. Restore the device's debugging preferences after testing.

## Local release candidate

The Gradle release task generates `android/app/build/outputs/bundle/release/app-release.aab`. The repository intentionally has no production signing secrets. Validate the bundle with Bundletool, verify APK split ZIP alignment and arm64/x86_64 ELF load segments, and smoke test a locally signed APK set on a disposable device. An ephemeral local test signature is unsuitable for a store submission or an update of a real installation.

Castas only saves the last completed result and the preferred language. It excludes that storage from cloud backup and device transfer via the manifest and Android 12+ extraction rules. A copied result resides on the system clipboard and can leave the device when pasted into another app. The app marks the clip sensitive where the platform honors it. Users can clear app storage in Android settings.

## Maintainer handoff

1. Confirm ownership of package ID `com.teknolista.castas`, asset rights, third-party notices, and the corresponding GPL source distribution for the exact submitted release. The icon and two photos reproduce the referenced Castas web assets. The repository identifies their source, but their standalone redistribution rights require the maintainer's confirmation.
2. Confirm the version code. Create or select the actual upload key through the maintainer's signing process, keep its passwords and backup outside Git, and enroll in Play App Signing. Use Android Studio's **Generate Signed Bundle / APK** flow to produce the upload AAB.
3. Complete the Play Console listing, screenshots, rating, privacy policy URL and Data safety declaration. Publish a public privacy policy matching the Android behavior in the [bundled PT-BR](../android/app/src/main/assets/text-pt-BR.json), [EN](../android/app/src/main/assets/text-en.json) and [ES](../android/app/src/main/assets/text-es.json) texts. Confirm the required policies and declarations for the actual account and package.
4. Upload to internal testing. Install the Play-signed artifact on a physical Android phone, verify update and local data retention, then complete any account-specific closed testing. Use staged distribution when appropriate and keep a hotfix path with a higher version code.

Draft listing in Portuguese. **Title** Castas. **Short description** Teste de polarização afetiva com resultado no próprio dispositivo. **Full description** Responda a 40 perguntas e veja seu resultado em cinco dimensões. O Castas funciona offline, oferece português, inglês e espanhol e permite copiar o resultado quando você quiser compartilhar. O teste tem finalidade informativa.

Sources [Play target API](https://support.google.com/googleplay/android-developer/answer/11926878), [app signing](https://developer.android.com/studio/publish/app-signing), [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469), [closed testing](https://support.google.com/googleplay/android-developer/answer/14151465), [16 KiB page sizes](https://developer.android.com/guide/practices/page-sizes).
