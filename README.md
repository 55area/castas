<p align="center">
  <img src="docs/assets/icons/castas-icon.png" alt="Castas Logo" width="128">
</p>

<h1 align="center">Castas</h1>

<p align="center">
  <strong>Affective Polarization Test</strong><br>
  <em>Check your level of polarization through an interactive questionnaire.</em>
</p>

<p align="center">
  <a href="https://www.castas.top" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Website-castas.top-orange?style=flat-square" alt="Website">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/55area/castas?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&amp;logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&amp;logo=typescript" alt="TypeScript">
</p>

<p align="center">
  Castas is an affective polarization questionnaire available as a web application and a native Android app.
</p>

Both apps share the questionnaire's product requirements and the project documentation, while each keeps its own source, dependencies, and build configuration.

<p align="center">
  <a href="https://www.castas.top">www.castas.top</a> ·
  <a href="LICENSE">GPL-3.0</a>
</p>

## Choose an app

| Project | Location | Guide | Stack |
| --- | --- | --- | --- |
| Web | [`web/`](web/) | [`web/README.md`](web/README.md) | React, TypeScript, Vite |
| Android | [`android/`](android/) | [`android/README.md`](android/README.md) | Kotlin, Jetpack Compose, Gradle |

Each app can be built and developed independently. Install web dependencies from `web/` with `npm ci`; open `android/` in Android Studio or use its Gradle wrapper. See the project-specific guides for prerequisites and commands.

## Shared project files

- [`docs/`](docs/README.md) contains product and process documentation, design artifacts, and Android verification records.
- [`openspec/`](openspec/) is the canonical OpenSpec project for shared questionnaire behavior and platform-specific requirements.
- [`.agents/skills/`](.agents/skills/) contains the OpenSpec workflows and focused development skills used across the repository.
- [`LICENSE`](LICENSE) is the repository license for both applications.

## Repository layout

```text
castas/
├── .agents/skills/       # Shared agent skills
├── .github/workflows/    # Web deployment and Android CI
├── android/              # Android app, Gradle wrapper, and Android-specific guide
├── docs/                 # Shared documentation and product artifacts
├── openspec/             # Canonical shared and platform-specific specifications
├── web/                  # Web app, npm lockfile, and web-specific guide
├── LICENSE
└── README.md
```

## Product

The questionnaire has 40 statements across five dimensions and is available in Brazilian Portuguese, English, and Spanish. The apps calculate scores locally and provide a result that users may choose to share. Platform details and storage behavior are documented in each app's guide.

For the web app's features, scoring details, and deployment, see the [web guide](web/README.md). For Android installation and build instructions, see the [Android guide](android/README.md). The [developer note](docs/MAKINGOF.md) is in Portuguese.

## Keeping both apps aligned

The root [OpenSpec project](openspec/) is the source of product requirements for both apps. For a new or changed user-facing feature, its change should define acceptance scenarios for web and Android and cover both implementations. If a change is intentionally limited to one app, or the apps should behave differently, record that scope or difference explicitly. Keep shared questions, scoring, result formatting, and translations consistent, and verify each app affected by the change.
