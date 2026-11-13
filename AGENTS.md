# Repository instructions

Castas is a monorepo with two independently built apps: `web/` and `android/`. Read the repository README and the relevant app README before changing an app. Keep each app's source, dependency lockfile, and build outputs within its directory; shared product requirements, documentation, skills, and license belong at the repository root.

## Specification-driven work

- The repository-root `openspec/` is the only OpenSpec project. Never initialize or create a nested OpenSpec directory under either app.
- For exploratory or underspecified feature requests, use the `openspec-explore` skill. For a defined new feature, create its artifacts with `openspec-propose`; a proposal records decisions and acceptance criteria but does not authorize implementation by itself.
- Implement an accepted change with `openspec-apply-change`. Archive only after its tasks, acceptance criteria, and required checks are complete.
- A user-facing behavior or content change shared by web and Android belongs in one OpenSpec change with acceptance scenarios for both apps. Tasks may be grouped by app. State any platform-only scope or intentional difference explicitly.
- Keep scoring, questions, result formatting, and translations aligned. Review both implementations when shared behavior or content changes, even when a task is limited to one app.

## Skills

- Discover project skills under `.agents/skills/` and use the smallest relevant set. OpenSpec skills own their corresponding OpenSpec operations; use Teknolista skills as focused helpers for product, Android, web, testing, security, or review concerns.
- `skills-lock.json` records the pinned Teknolista skill sources. Keep it in sync when that collection changes. OpenSpec-generated skills record their generator version in their metadata; check compatibility with the installed `openspec` CLI before relying on generated instructions after a CLI upgrade.
- Do not invoke every installed skill by default. Follow the app guides and run the checks applicable to the changed app and shared behavior. Report checks actually run and any platform or device coverage not obtained.

## Application checks

- Web commands run from `web/`; `npm ci` uses `web/package-lock.json` and `npm run build` performs TypeScript checking and the Vite build.
- Android commands run from `android/` with its Gradle wrapper. Use `android/README.md` for the JDK/SDK matrix, JVM tests, lint, release assembly, and device-test commands.
- Do not move generated build outputs, local SDK configuration, signing credentials, or app-specific dependencies into shared root directories.
