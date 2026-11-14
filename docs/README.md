# Project documentation

This directory contains shared product references and project-level documentation. Platform implementation and build instructions stay with each app: [`web/README.md`](../web/README.md) and [`android/README.md`](../android/README.md).

## Product and process

- [Product overview](product.md)
- [Project structure and technical decisions](project.md)
- [Development process](process.md)
- [UI design](ui-design.md)
- [Developer note (Portuguese)](MAKINGOF.md)

## Product artifacts

- [`artifacts/`](artifacts/) contains the original questionnaire, scoring references, wireframes, and mockups.
- [`assets/`](assets/) contains the shared Castas icon, product imagery, and portable screenshots used as Android audit evidence.

## Android evidence and release

- [Android implementation audit](auditoria-castas-android.md)
- [Android closing audit](auditoria-fechamento-castas.md)
- [Verification record](proof.md)
- [JDK 25 and Gradle 9 migration verification](android-jdk25-gradle9-migration.md)
- [Production and Play checklist](production.md)

The single OpenSpec project is the repository-root [`openspec/`](../openspec/). It holds shared and platform-scoped specs and changes for both apps; the current Android capabilities remain Android-specific. New shared behavior must include acceptance scenarios for web and Android. The repository-root [`LICENSE`](../LICENSE) applies to both apps.
