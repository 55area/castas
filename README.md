<p align="center">
  <img src=".etc/assets/icons/castas-icon.png" alt="Castas Logo" width="128"/>
</p>

<h1 align="center">Castas</h1>

<p align="center">
  <strong>Affective Polarization Test</strong><br>
  <em>Check your level of polarization through an interactive questionnaire.</em>
</p>

<p align="center">
  <a href="https://www.castas.top" target="_blank">
    <img src="https://img.shields.io/badge/Website-castas.top-orange?style=flat-square" alt="Website">
  </a>
  <a href="https://github.com/teknolista/castas/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/teknolista/castas?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript" alt="TypeScript">
</p>

---

<p align="right"><a href="MAKINGOF.md">🇧🇷 Nota do Desenvolvedor</a></p>

## About

**Castas** is a web application designed to assess the level of affective polarization in individuals through a simple online questionnaire. The purpose of this app is to offer a diagnostic tool for one of the most challenging phenomena in modern democracies.

When polarization divides society into groups that begin to see each other as morally incompatible, coexistence and mobility between these groups diminish. Over time, rigid social barriers emerge, forming informal "castes" that deepen inequality and segregation.

## Main Features

- **40-Question Test**: Organized in 5 dimensions with 8 questions each
- **Detailed Results**: Progress bars showing percentage for each dimension
- **Emoji Grid Visualization**: 5x5 grid using 💙 and 🤬 to represent scores
- **Custom Emoji Selection**: Full emoji picker to personalize your result
- **Shareable Results**: Copy results to clipboard in a formatted text
- **Multilingual Support**: Complete translations for Portuguese (BR), English, and Spanish
- **Privacy First**: No tracking, no cookies, results stored locally only
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Tailwind CSS** | Styling |
| **React Router** | SPA Navigation |
| **i18next** | Internationalization |
| **Framer Motion** | Animations |
| **Emoji Picker React** | Emoji Selection |
| **Lucide React** | Icons |

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/teknolista/castas.git

# Navigate to the project folder
cd castas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
castas/
├── .github/workflows/       # GitHub Actions for deployment
│   └── deploy.yml
├── .etc/                    # Project specifications and assets
│   ├── artifacts/           # Wireframes, documents, mockups
│   └── assets/              # Icons and images
├── public/                  # Static assets served directly
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EmojiPicker.tsx      # Emoji picker with Emoji Picker React
│   │   ├── EmojiGrid.tsx        # 5x5 emoji grid display
│   │   ├── LanguageSelector.tsx # Language dropdown
│   │   └── ProgressBar.tsx      # Score progress bars
│   ├── pages/               # Page components
│   │   ├── Home.tsx             # Landing page
│   │   ├── Test.tsx             # Question flow
│   │   ├── Result.tsx           # Results display
│   │   ├── About.tsx            # About page
│   │   ├── PoliticalFanatic.tsx # Political fanatic text
│   │   ├── TermsOfUse.tsx       # Terms of use
│   │   └── PrivacyPolicy.tsx    # Privacy policy
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.ts   # localStorage management
│   │   └── useTestState.ts      # Test state management
│   ├── data/                # Test questions and dimensions
│   │   ├── questions.ts         # 40 test questions
│   │   └── dimensions.ts        # 5 dimension definitions
│   ├── i18n/                # Translation files
│   │   ├── index.ts             # i18next configuration
│   │   ├── pt-BR.json           # Portuguese (Brazil)
│   │   ├── en.json              # English
│   │   └── es.json              # Spanish
│   ├── utils/               # Utility functions
│   │   └── scoring.ts           # Score calculation logic
│   ├── lib/                 # Library utilities
│   │   └── utils.ts             # cn() helper function
│   ├── App.tsx              # Main app with routes
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + theme
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Test Dimensions

The test measures affective polarization across 5 dimensions:

| Dimension | Portuguese | Description |
|-----------|------------|-------------|
| A | Emotional Hostility | Irritation and negative reactions to opposing groups |
| B | Moral Devaluation | Seeing opponents as ignorant or malicious |
| C | Social Distance | Discomfort with close relationships across groups |
| D | Democratic Delegitimization | Viewing opponents as threats to democracy |
| E | Identity Segregation | Living in a political bubble |

## Scoring System

Each question uses a 4-point Likert scale:
- **3 points**: Strongly agree
- **2 points**: Somewhat agree  
- **1 point**: Somewhat disagree
- **0 points**: Strongly disagree

Score calculation: `round((sum of 8 questions / 24) × 100)`

Emoji representation based on percentage:
| Score | Emoji Pattern |
|-------|---------------|
| 0% | 💙💙💙💙💙 |
| 1-24% | 💙💙💙💙🤬 |
| 25-50% | 💙💙💙🤬🤬 |
| 51-74% | 💙💙🤬🤬🤬 |
| 75-99% | 💙🤬🤬🤬🤬 |
| 100% | 🤬🤬🤬🤬🤬 |

## Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch triggers:
1. Build the application
2. Deploy to GitHub Pages

### Manual Setup

1. Create a repository on GitHub
2. Enable GitHub Pages in Settings → Pages → Source: **GitHub Actions**
3. Push your code:

```bash
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/castas.git
git push -u origin main
```

The site will be available at: `https://your-username.github.io/castas/`

## Data Privacy

- **No personal data** is collected
- **No cookies** are used for tracking
- Test results are stored **only in your browser's localStorage**
- **No server-side** storage of individual responses
- Users can clear all data by clearing browser storage

## License

This project is licensed under the **GPL v3.0 License**.

See [LICENSE](.etc/LICENSE) for more details.

---

<p align="center"><small>
Copyleft © 2026 <a href="https://x.com/teknolista">Raul Bras</a> 🇧🇷 Published under the GPL v3.0 license. <br>
Made in Brazil, in the Land of Oz (SP) , with 🌭 🍕 and AI 🤖.
</small></p>
