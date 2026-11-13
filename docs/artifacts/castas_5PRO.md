# Castas: Software Specification Document

This document can be used to simplify software specification by brainstorming in five key topics: product, provisioning, project, process, and programming. These five topics act like “mental buckets,” guiding users to think about different dimensions of software creation instead of just describing features. By forcing people to separate their ideas into categories, you reduce the risk of vague or incomplete specifications. This is not a full PRD (Product Requirements Document), but it’s a massive improvement over a vague paragraph.

---

# PRODUCT

This software to be developed is called Castas, an online test to assess the level of affective polarization in people, through a simple online questionnaire.

## Description

The purpose of this app is to offer a diagnostic tool for one of the most challenging phenomena in modern democracies: affective polarization.

Polarization is the process by which a society divides into groups with increasingly opposing positions — generally political, ideological, religious, or cultural. This division tends to reduce dialogue space and increase the perception of "us versus them".

The term "caste" historically refers to the social system of India, where traditional stratification structured relatively closed groups with low social mobility. In a broader (metaphorical) sense, "castes" can mean rigid social groups with strong barriers between them.

The target audience of this application is Brazilian citizens, but with the possibility of internationalization to other languages/countries. Anyone will be able to access the application to take the test.

## Data Model

This application will not use a database, but will store the test result in the user's own browser, in their localStorage. A single table will be maintained, whose structure is found in the file `documents/data-struct.md`.

## Foundation

The application will be published in the domain www.castas.top. When accessing this domain, the main page of the application will be displayed. Once the main page is open, the user will be able to start the test immediately, without needing to log in or perform any other configuration. To answer the questions, the user must select the option that best represents their personal values and life choices.

The main page, designated homepage, should have a layout as described in the wireframe `wireframes/homepage.md`. A mockup was created with the final appearance of the page, in `mockups/homepage.png`. Analyze this mockup and reverse-engineer its visual design and formula. Extract the layout pattern, color strategy like palette, mood, illustration style, typography system, and content structure.

There is a dropdown box at the top-left of the homepage, so that the user can select their language, initially displaying the text "🇧🇷 Português" because the site will initially be presented in Brazilian Portuguese. The application must support multilingual functionality from the outset, with full translation coverage for all user-facing content. This includes all pages, interface elements, labels, messages, and textual content. The system shall initially provide complete translations in three languages: Portuguese, English, and Spanish. Language selection must be consistently applied across the entire user experience, ensuring that no content remains untranslated in any supported language. The architecture should be designed to accommodate future expansion to additional languages without significant refactoring. For now, translate all pages, messages, and content that are in Portuguese into English and Spanish. Put the dropdown box to select the language only on the homepage. The initial language displayed when the user opens the application will be Portuguese.

In the homepage wireframe file, the font sizes and styles of each paragraph, title, and button are between braces { and } at the beginning of each paragraph. Ensure that all typography strictly follows the font-size scale defined  between braces using rem units. All font sizes must be consistent with the predefined homepage mockup.

Links are between brackets [ and ] with the URL following between ( and ), following markdown convention. With the exception of the dropdown box for changing the language, all titles and paragraphs on the homepage are centered.

Pay attention to the buttons in homepage; they should all have the same style. The button linking to the `political-fanatic.md` page should have the same style and appearance as the buttons for starting the test and viewing the result.

I want to build a visually clean and modern UI for the app in dark and orange tones and a few accents, with comfortable typography and some good use of gradients, smooth page transitions and smooth animations. Ensures basic accessibility: contrast, visible focus, aria-label on buttons.

The styles to be applied to the website are shown below, where the main page is within a box with borders defined as follows. The styles for text, buttons, and links are also specified below.

Homepage box:
	background-color: #000;
	box-shadow: 0 0 40px 5px rgba(255, 255, 255, .15);
	width: 80%;

Text:
	color: #fff;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

Links:
	color: #f90;

Buttons:
	color: #fff;
	background: #1f1f1f;
	border: 3px solid #ff9000;

The other pages of the application will be opened from the homepage, at the locations of their respective links and buttons mapped in the homepage wireframe, and their respective wireframes are listed below.

- `wireframes/political-fanatic.md`: Text about the political fanatic.
- `wireframes/test.md`: Page to answer the test questions.
- `wireframes/result.md`: Page displayed after the test is completed, with the result.
- `wireframes/about.md`: Introductory page of Castas, about this initiative.
- `wireframes/terms-of-use.md`: Terms of Use of the website.
- `wireframes/privacy-policy.md`: Privacy Policy of the website.

#### Icon & Images:

The application uses icons and images located in the documentation `assets/` directory and these product artifacts. These files must be copied to the application's codebase, in the appropriate locations according to their type and use. Below are the images used on their respective pages:

- `homepage.md`: The favicon icon for the site to be used is located in `../assets/icons/favicon.ico`.
- `about.md`: The image `../assets/images/about-banner.jpg` is displayed at the top of the page. This image should be displayed at the top of the page, as indicated in the markdown, and should be centered.
- `political-fanatic.md`: The image `../assets/images/ariano-suassuna.jpg` is displayed at the bottom of the page. This image should be displayed at the end of the text, as indicated in the markdown, and should be centered.
 
#### Rules & Constraints:

- If the user is accessing the homepage for the first time and has not yet started and completed the test, then the button to see the result should remain disabled. Only enable this button when the user completes the test. Since the result will be saved in the browser's localStorage, when opening the homepage, localStorage should be checked to see if there is a saved result, so that the button to view the result can be enabled.

## Features

### 001 Start Test

When the user clicks the [Start Test] button, the page `wireframes/test.md` will be presented with the first question of the first dimension for the user to answer. The 40 questions of the test, divided into 5 dimensions, are in the file `documents/test-questions.md`. Each question is presented individually, and when the user selects an answer option, they will be taken to the next question.

With each transition to the next question, the dimension number should also be updated on the page when moving to the next dimension, the question number, and the overall progress.

Each answer option has a score according to the Likert scale, and the values are detailed in `documents/likert-scale.md`. The value of each answer must be computed according to the Score Calculation topic also in the `likert-scale.md` file.

#### Rules & Constraints:

- Use radio buttons to display the options, so the user can select only one.
- If the user abandons the test and starts it again, they must restart the test from the first question. Only when the user answers all 40 questions and the result is calculated, the response data will be saved in localStorage.
- After answering the last question, the result will be calculated and saved in the browser's localStorage. The result page will then be shown with the results of the user.

### 002 Display Result

At the end of the test, when the user has answered all 40 questions, the screen `wireframes/result.md` will be presented. The score for each dimension should be presented in a progress bar, with the percentage value at the end or to the right of the bar.

Also, a grid of 5 rows and 5 columns should be presented, with the representation of emojis 💙 and 🤬 for each of the 5 dimensions, and how it will be presented, with the number of each emoji, will be determined according to the percentage of the dimension. This mapping between the percentage of each dimension and the arrangement of emojis is also detailed in the `likert-scale.md` file.

#### Rules & Constraints:

- Whenever opening the result page, the score saved in localStorage will be retrieved for result presentation. In addition to the progress bars, the emoji grid should also be formatted to allow copying and sharing.
- When the user click

### 003 Share Result

Still on the result page, next to the structure of 5 lines of emojis, 2 buttons will be displayed:

- [💙 Alterar Emoji ] Opens a component to select an emoji. When choosing another emoji, this selected emoji will replace the 💙 emoji in the 5 lines of result. The 5-line structure should be immediately changed to display the newly selected emoji, only changing the 💙 emoji, not changing the 🤬 emojis.

- [🗐 Compartilhar] Will copy to the clipboard the grid of 5 lines and 5 columns of emojis, along with text, as detailed in the file `documents/result-format.md`. If the user chose a new emoji, then the grid represented with the newly selected emoji will be copied to the clipboard.

#### Rules & Constraints:

- After the user clicks the "🗐 Compartilhar" button, the button label should change to "✅ Copiado!" to indicate that the result has been copied to the clipboard. Don't show alerts or popups.

---

# PROVISIONING

## System Architecture Overview

This web application follows a Single Page Application (SPA) architecture, where content is dynamically rendered on the client for each page transition.

## Technical Stack

### Frontend & UI/UX

- Programming Language: TypeScript
- Frameworks: React, React Router
- Web Components: Shadcn/UI, Emoji Picker React
- Styling Engine: Tailwind CSS, Framer Motion
- Visual Identity: Clean, modern, dark mode, and Linear-inspired

The application layout should be responsive so that it can be accessed from both a desktop and a mobile phone.

## Target Platforms

The web application will be deployed on GitHub Pages, in branch gh-pages of the same repo of codebase.

## Technical Constraints

The files containing html, css, and js must be minified at the end of the build to reduce load time and improve the overall performance of the application.

---

# PROJECT

## Purpose & Strategy

The objective of the project is the development and deployment of the Castas application. Only the features detailed in PRODUCT should be implemented.

The project is oriented for good code quality and best practices for web development. The constitution should be intricately detailed with principles focused on performant code, testing standards, user experience consistency, and safety requirements. All code should be written focusing on multi-step testing, rapid development, lightweight builds, and fast loading of the application.

Add principles for clean code, simple UX, responsive design for mobile access and minimal dependencies.

## Skills & Capabilities Integration

For development, the possibility of incorporating SKILLS for development should be evaluated, aiming at improving quality and reducing token consumption in programming. Recommended skills to use are the code simplifier skill, the code review skill and the security review skill.


## Multi-Agent System (MAS) Governance

For development, the possibility of adopting distinct personas of agents for development should be evaluated, aiming at improving quality and reducing token consumption in programming.

---

# PROCESS

The development of the application should be carried out in a single phase, since all features have already been detailed in PRODUCT.

## Tasks

All tasks related to programming should be listed for validation before starting coding. Ask for my approval and only then continue.

## Agents

Identify which tasks should be implemented for each agent and also indicate which tasks should be implemented in sequence and which can be done at the same time, in parallel.

---

# PROGRAM

For development, NodeJS, latest version, will be adopted as the runtime for TypeScript/JavaScript. The Vite tool will also be used for build and testing. To validate the TypeScript and CSS code, use ESLint for TypeScript and Stylelint for CSS, in conjunction with the code formatter Prettier.

Whenever possible, use clean code best practices to obtain more efficient and readable code. Keep it simple. I want something simple & functional. Prioritize speed & simplicity.

Prefer English throughout the coding, for coding conventions and identifier naming, as well as for comments.

---
