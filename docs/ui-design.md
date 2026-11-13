# UI Design

- Project / platform: Castas Android, Kotlin + Jetpack Compose.
- Scope: native counterparts to the seven web screens, including the questionnaire and result journey.
- Governing behavior: [OpenSpec capability](../openspec/specs/affective-polarization-test/spec.md).
- Source evidence: Castas wireframes and assets in [`artifacts/`](artifacts/), translated copy and current React implementation in [`../web/`](../web/).

## Experience foundations

Retain the web identity: near-black surfaces, a subtle dark-to-warm background gradient, white text, orange `#FF9000` emphasis, Castas icon, and the `💙` / `🤬` score metaphor. Compose layouts scroll vertically, use native controls, cap content width at 640 dp, and adapt to system font scaling. Brazilian Portuguese is the first-launch language; English and Spanish are available from the home screen.

## Screen index and flows

| ID | Screen | Purpose | State / route |
| --- | --- | --- | --- |
| UI-S01 | Home | Start a fresh test, open a saved result, change language, navigate to information | Result action disabled until a result exists |
| UI-S02 | Questionnaire | Show one question and four exclusive answers with dimension/question progress | 40 ordered questions, numbering 1–8 inside each dimension, separate total progress, and one answer during each transition |
| UI-S03 | Result | Show five scores, emoji grid, searchable native emoji dialog and copy action | Requires saved or just-completed result |
| UI-S04 | About | Explain the initiative and scoring | Scrollable text and source banner image |
| UI-S05 | Political fanatic | Display the source essay and image | Scrollable text |
| UI-S06 | Terms | Display terms content | Scrollable localized content |
| UI-S07 | Privacy | Display privacy content | Scrollable localized content |

Primary flow: UI-S01 → UI-S02 (fresh run) → UI-S03. Information destinations return with Android back navigation. The active questionnaire survives Activity recreation. Leaving the questionnaire or restarting after process death discards unfinished answers. A storage failure preserves the previous saved result and offers a localized retry.

## Shared interaction contract

- Primary controls use large touch targets, visible orange focus/selection, and clear content labels.
- The answer cards expose radio selection and advance after a single selection, matching the web flow.
- The progress text supplements the visual bar for assistive technology.
- The five score rows expose localized dimension and percentage semantics. Each visual grid row has five equal cells that scale to fit the available width. The chooser uses the reference catalog, localized search and a bundled EmojiCompat font, filtered for glyph support.
- Copying writes the localized result as sensitive content to Android Clipboard. The button confirms the action for two seconds, or until the emoji changes. The Android system may provide its own clipboard feedback.
- System text sizing and vertical scrolling preserve reachability on compact screens.

## Verification record

See [PROOF](proof.md) for the tested compact and expanded layouts, font scale, state recreation and result rendering.
