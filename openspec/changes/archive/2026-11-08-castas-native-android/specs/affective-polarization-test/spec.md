# Spec Delta

## Purpose

Provides Castas users with a native Android experience for the existing affective polarization test, its informational pages, and its locally retained, shareable result.

## ADDED Requirements

### Requirement: Native Android experience
The application SHALL present Castas as an Android-native application and SHALL NOT render its user experience using web pages or a cross-platform web framework.

#### Scenario: Open the application
- **WHEN** a user launches Castas
- **THEN** the home screen is rendered with native Android interface elements

### Requirement: Home and information screens
The application SHALL provide home, political fanatic, about, terms of use, and privacy policy screens with content equivalent to the reference Castas web application.

#### Scenario: Navigate to an informational screen
- **WHEN** a user selects an informational link from the home screen
- **THEN** the corresponding content is displayed with a way to return home

### Requirement: Supported languages
The application SHALL provide complete user-facing translations in Brazilian Portuguese, English, and Spanish, and SHALL initially select Brazilian Portuguese.

#### Scenario: Change the application language
- **WHEN** the user chooses a supported language on the home screen
- **THEN** all screens and questionnaire content use that language

### Requirement: Questionnaire flow
The application SHALL present the 40 reference questions individually, in five dimensions of eight questions, with the four reference response labels and one selectable answer per question.

#### Scenario: Answer and advance
- **WHEN** the user selects one response
- **THEN** the application accepts exactly one response for that displayed question, advances, and shows the question number within the dimension (1–8) and separate overall progress (1–40)

#### Scenario: Restart an incomplete test
- **WHEN** the user leaves an incomplete test and starts a new test
- **THEN** the new test begins at question one without resuming prior answers

#### Scenario: Recreate the activity during a test
- **WHEN** the active activity is recreated for a configuration change while the app process survives
- **THEN** the questionnaire retains its accepted answers and current question

#### Scenario: Process is recreated during a test
- **WHEN** the Android process is recreated with an unfinished questionnaire route
- **THEN** the questionnaire starts at question one without restoring individual answers

#### Scenario: Complete the final question
- **WHEN** the user answers question 40
- **THEN** the application calculates the five dimension scores and displays the result screen

### Requirement: Result calculation and persistence
The application SHALL score each dimension as the rounded percentage of its eight responses, where response values are 3, 2, 1, and 0 in descending agreement order, and SHALL retain the completed result locally on the device.

#### Scenario: Reopen a completed result
- **WHEN** a result has been completed and the application is reopened
- **THEN** the saved scores are available on the result screen and the home screen enables the result action

#### Scenario: A completed result cannot be written
- **WHEN** storage rejects the completed result
- **THEN** the app keeps any previous result, offers a retry, and only navigates to the new result after the write succeeds

#### Scenario: Storage cannot be read
- **WHEN** local preferences cannot be loaded
- **THEN** the app displays a localized error and a retry action

#### Scenario: No completed result exists
- **WHEN** no completed result is stored
- **THEN** the result action on the home screen is disabled

### Requirement: Result visualization and emoji selection
The result screen SHALL display five dimension scores and a five-by-five emoji grid, with the row for each dimension determined by the reference score ranges. The user SHALL be able to search the reference emoji catalog in a native picker and replace the positive emoji without changing negative emojis. The picker SHALL omit emoji sequences unsupported by the Android renderer.

#### Scenario: Choose a positive emoji
- **WHEN** the user selects a replacement positive emoji
- **THEN** all positive cells in the grid use that emoji and the negative cells remain unchanged

### Requirement: Share a result
The application SHALL let users copy a localized, formatted result containing the emoji grid, dimension percentages, and test URL, and SHALL indicate success on the share control without showing a popup.

#### Scenario: Copy the result
- **WHEN** the user activates the result share control
- **THEN** the current result text is copied as sensitive content to the Android clipboard and the control indicates it was copied for two seconds or until the positive emoji changes

### Requirement: Adaptive and accessible interface
The application SHALL keep content usable across supported Android screen sizes and system text sizes, and SHALL expose meaningful labels, selected states, and progress information to accessibility services.

#### Scenario: Use a narrow screen or enlarged text
- **WHEN** a user views any screen on a narrow device or with enlarged system text
- **THEN** content remains readable and actions remain reachable without horizontal clipping

#### Scenario: Navigate with an accessibility service
- **WHEN** a user navigates a questionnaire or result screen with an accessibility service
- **THEN** controls expose their purpose and state and progress is available as text

### Requirement: Local-only test data
The application SHALL NOT transmit questionnaire answers or results to a remote service and SHALL store no individual answer history after a test is abandoned.

#### Scenario: Abandon a questionnaire
- **WHEN** a user exits before completing all questions
- **THEN** no answers are persisted as a completed result

#### Scenario: Complete a questionnaire
- **WHEN** a user completes all questions
- **THEN** only the completed result needed to render the result screen is retained locally
