# Castas Web

The Castas web app is a responsive questionnaire for exploring affective polarization. It has 40 questions in five dimensions, detailed scores, a customizable emoji grid, shareable results, and Brazilian Portuguese, English, and Spanish translations.

The result shows a percentage for each dimension and a 5 × 5 emoji grid. Users can replace the default blue heart, copy a formatted result, and resume their last completed result in the same browser. The interface is responsive for desktop and mobile.

| Dimension | What it explores |
| --- | --- |
| Emotional Hostility | Irritation and negative reactions to opposing groups |
| Moral Devaluation | Seeing political opponents as ignorant or malicious |
| Social Distance | Discomfort with close relationships across political groups |
| Democratic Delegitimization | Viewing opponents as threats to democracy |
| Identity Segregation | Living in a political bubble |

Answers are scored 3, 2, 1, and 0 from strong agreement to strong disagreement. For each dimension, the score is `round((sum of 8 answers / 24) × 100)`. The default row uses five blue hearts at 0%, then replaces one more heart with an angry face at 1–24%, 25–50%, 51–74%, 75–99%, and 100%.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- npm

## Development

Run these commands from `web/`:

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The production build runs TypeScript validation before Vite. `npm run lint` checks TypeScript and TSX files with ESLint; `npm run lint:fix` applies ESLint's automatic fixes. The app uses React 18, TypeScript, Vite, Tailwind CSS, React Router, i18next, Framer Motion, Emoji Picker React, and Lucide React.

## Structure

```text
web/
├── public/       # Static files served as-is
├── src/
│   ├── components/
│   ├── data/     # Questions and dimensions
│   ├── hooks/
│   ├── i18n/     # PT-BR, English, and Spanish
│   ├── pages/
│   └── utils/    # Scoring and share formatting
├── package.json
└── package-lock.json
```

The web app does not require an account or a project backend. Completed results are stored in the browser's local storage; the app does not use tracking cookies or store individual responses on a server. The Android app has its own storage and build setup in [`../android/`](../android/).

The canonical product requirements and shared project docs live in [`../openspec/`](../openspec/) and [`../docs/`](../docs/). The repository-level [README](../README.md) explains the monorepo layout; the shared license is [`../LICENSE`](../LICENSE).

## Deployment

GitHub Actions deploys this application to GitHub Pages when changes are pushed to `main`. The workflow installs dependencies from this directory and publishes `dist/`. Configure GitHub Pages to use **GitHub Actions** as its source. The live site is [castas.top](https://www.castas.top).
