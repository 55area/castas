## Why

Google Play requires API 36 for new Android phone apps. Castas also needs runtime evidence for its declared Android 8.0 minimum and a reproducible release candidate for the maintainer to sign and submit.

## What Changes

- Compile and target API 36 while preserving minSdk 26.
- Resolve compatible Gradle dependencies, run lint, verify Android 8.0 and Android 16, and inspect the unsigned release bundle and its generated APKs.
- Document signing, asset provenance, app-store declarations, internal testing, and the host emulator preflight.

## Capabilities

### New Capabilities

- `android-release-readiness`: Supported Android versions and verifiable local release packaging.

## Impact

Android build, SDK, CI, release artifacts and project documentation. The maintainer owns signing credentials, distribution rights and Play submission.
