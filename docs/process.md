# PROCESS

## Scope and decisions

- The user authorized native Android implementation, corrections found in the first audit, and local release preparation. The web repository provides the behavior and content reference. The About wireframe there was corrected to match its executable score scale.
- The OpenSpec CLI archived two completed changes and consolidated their capabilities. `castas-native-android` governs the product and its Android interactions. `prepare-android-play-release` governs API compatibility, release packaging, and maintainer handoff.
- The PentaPRO files carry intent, technical decisions, test evidence, and operational handoff. OpenSpec owns the requirements and acceptance scenarios.
- [The closing audit](auditoria-fechamento-castas.md) records the previous emulator diagnosis, the corrections, reviewed scope, and lessons for future projects.

## Implementation and review

- Applied the local Teknolista PentaPRO, UI Design, Peer Review, Cybersecurity, and Android helpers for module structure, data, errors, and unit, integration and UI tests. WorkManager, Koin, and PR quiz were outside the change scope.
- Read Matt Pocock's implementation, TDD, design, debugging, and review guidance from the local copy in the web reference. The independent review split specification compliance and project standards. Test design covered observable behavior and concrete failure modes.
- Android security review followed local score data from UI to persistence, backup rules, and explicit clipboard export. It inspected the release boundary separately from debug behavior.
- The first build used API 35 and the first AVD attempt stalled. The closing evidence in [PROOF](proof.md) uses the API 36 toolchain, a host KVM preflight, and separate API 26 and API 36 images.

## Handoff

See [PRODUCTION](production.md) for physical devices, signing, and Play. Future behavior changes start with a new OpenSpec change and a small acceptance scenario.

## Cross-platform feature changes

The repository-root OpenSpec project is the single source of requirements for the web and Android apps. A user-facing feature change should include acceptance scenarios for both platforms in one change and be implemented in both before that shared change is considered complete. A platform-only change must state which app is in scope and why the other is excluded. Record intentional differences explicitly so they do not look like missing work.

The apps keep independent code and build systems; shared requirements do not imply shared runtime code. Keep questionnaire questions, scoring, result formatting, and translations aligned across the web source and Android bundled content. Verify the app or apps touched by each change and include a check of the other app when shared behavior or content changes.
