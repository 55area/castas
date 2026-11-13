## Context

The initial build uses AGP 8.7.3 and targets API 35. The minimum API is 26. AndroidX contributes native ELF libraries. Release signing and the Play Console are outside the local toolchain.

## Decisions

- Use AGP 8.9.3 with Gradle 8.11.1 and JDK 21 for the API 36 build. Pin the wrapper distribution checksum. Exercise the merged manifest, lint NewApi, and both endpoint emulators.
- Build a locally unsigned release AAB. For local installation, generate an APK set signed with a temporary test key outside the repository. Verify native alignment and runtime separately. The Play Console owner supplies the upload key and the applicable metadata.
- Keep a CI build gate and a separate device preflight. Check emulator acceleration, ADB transport and guest boot in the environment that runs the emulator.
