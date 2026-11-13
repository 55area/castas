# Source research and adaptation

Research date: 2026-11-05. This is an original English synthesis of methods, not an upstream installer or concatenation of skills. No upstream scripts, images, datasets, brand kits or substantial instruction passages are bundled. Source terms remain with their owners; see [third-party notices](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md).

## Scope and limits

Refreshed the complete, non-truncated GitHub trees of all nine repositories already named in THIRD-PARTY-NOTICES.md. Downloaded their 147 SKILL.md entrypoints and screened names/descriptions/purposes to identify screen/UI/UX candidates; read the relevant entrypoints and selected supporting resources. Counts include internal packages and fixtures and do not mean 147 independent UX skills. Additional collections were sampled for relevant UI/design material, not exhaustively audited. Retrieved source is research evidence only; upstream code was not executed. This is not a security audit, legal determination, model benchmark or production usability study.

## Existing repository coverage

| Repository / pinned snapshot | Entrypoints screened | UI/UX relevance and disposition |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7) | 15 | No dedicated UI/UX skill. Brainstorming and verification-before-completion inform focused discovery, options and evidence; no universal mandatory workflow or Git actions imported. |
| [mattpocock/skills](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | 39 | prototype (including UI.md) directly addresses UI variants; grill-with-docs supplies progressive clarification and durable decisions. Preserve real product context and compare structural alternatives; no mandatory variant count, throwaway branch or automatic promotion. |
| [owainlewis/blueprint](https://github.com/owainlewis/blueprint/tree/fb5a850965039d434343fa1b74f8c7f47eb2bd96) | 11 | html-doc presents specifications rather than designing product UI. Retain canonical Markdown and distinguish content from presentation; no renderer/toolchain imported. spec/requirements provide adjacent specification guidance. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/tree/301b02b12bff98e4688e6984af6556802322bbde) | 25 | frontend-ui-engineering and browser-testing-with-devtools are directly relevant; accessibility checklist and performance guidance are adjacent. Adapt reference-led contracts, state coverage and rendered inspection; reject fixed breakpoints, line-count rules and universal aesthetic bans. |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD/tree/022be9314e4facd16826104a9f8033e1c5ed4fdc) | 37 | bmad-ux and bmad-agent-ux-designer directly address UX; brainstorming/elicitation are adjacent. Adapt appearance/behavior separation, system inheritance, flow-to-screen coverage and iterative capture. Replace two spines/memlog with one cumulative docs/ui-design.md; no BMAD runtime, mandatory persona or reviewer orchestration. |
| [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec/tree/3e4d5f0769e2857c8eb54f149cbf5e4f703fa04c) | 16 | No dedicated UI/UX skill among the change-management workflows. Reuse the concept of explicit assumptions/changes and reconciliation; no OpenSpec CLI or artifact tree dependency. |
| [github/spec-kit](https://github.com/github/spec-kit/tree/04fca3d96a5dfcf942a5f70069a42ad84d336fed) | 2 | No dedicated screen-design skill in the two internal skill entrypoints. Specification/clarification/checklist command templates are adjacent; preserve scope and measurable acceptance without importing a second specification framework. |
| [jeffev/hollowtest](https://github.com/jeffev/hollowtest/tree/29995ce12bf40757055b2b406f15439cb9d480b2) | 1 | No UI-design skill. Test-effectiveness lessons apply to verification, including browser tests; a rendered smoke check cannot prove interaction behavior. No JS-only CLI or universal mutation requirement. |
| [awesome-skills/code-review-skill](https://github.com/awesome-skills/code-review-skill/tree/4850184dfd7765ea7b3c5c4e9b6cf8e0815ee7cb) | 1 | One review skill, with frontend/Kotlin supporting guidance rather than a separate UI-design workflow. Keep platform/evidence distinctions; avoid duplicating this repository's existing Peer Review. |

The PERFECT gist and Silva97/TabNews/Freedev articles already cited in the notices are adjacent conceptual/security readings, not additional repositories of UI skills. No new UI workflow is attributed to them.

## Additional primary skill sources

| Repository / pinned snapshot | Inspected or selected material and adaptation |
| --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills/tree/ca45fc496a3436251f191354091d557da31c15b5) | Selected frontend-design, canvas-design, algorithmic-art, brand-guidelines, theme-factory and web-artifacts-builder. Adapt intentional direction, typography/content, visual critique and asset/system consistency. Do not import Anthropic branding, compulsory art style, fixed section counts or asset generators. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62) | Web design guidelines plus inspected React/composition/React Native entrypoints. Adapt semantics, focus, forms, navigation and impact-led performance; keep framework advice conditional. No React Native-to-Compose substitution or universal framework requirements. |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/b7d5353e0130feb8c5574ef1251f8a1db1873ccb) | Selected UI/UX Pro Max, design, design-system, brand, banner-design and ui-styling entrypoints (CLI copies deduplicated conceptually). Adapt platform detection, shared defaults/overrides and scoped guidance. Do not copy databases, scripts, palettes or fixed priority/size/timing rules. |
| [bencium/bencium-claude-code-design-skill](https://github.com/bencium/bencium-claude-code-design-skill/tree/5de46a39b4640fa419560cd0b67e4c4b50dac802) | Selected controlled/innovative/impact designer and design-audit/relationship-design entrypoints. Adapt alternatives, accessible hierarchy and refinement. No ask-before-every-choice gate, mandatory aesthetic direction or implied research outcomes. |
| [accesslint/claude-marketplace](https://github.com/accesslint/claude-marketplace/tree/2e9d7336678302d0bc08848e92542560295b34d3) | All five accessibility skill entrypoints examined for audit/scan/inspection/diff/fix distinctions and evidence grades. Adapt explicit coverage, manual-check limits and impact separate from confidence. Do not import plugin dependencies or treat DOM/keyboard simulation as actual assistive-technology use. |
| [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills/tree/dc2be825d8b439caea78e9eaa8fb3ac23b0ff3e9) | Android and web entrypoints and relevant platform sections inspected; other platform packages inventoried, not adopted. Adapt platform units, navigation/insets, accessibility and state restoration; verify APIs against official docs. Reject universal Material/dynamic-color mandates and unverified example APIs. |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable/tree/c8891a9ae865d6ee311836ae5199bfce0fe115b1) | Canonical .agents entrypoint plus selected new-work, shape, polish, harden, critique and Android references inspected; other host copies are duplicates. Adapt purpose-specific expression, refinement vs redesign, incumbent evidence, content extremes and rendered checks. No launcher, detector, hooks, scoring system or mandatory extra documents. |
| [ibelick/ui-skills](https://github.com/ibelick/ui-skills/tree/00db7d656719c399c091f3ea138c6f42a7fa4d98) | UI entrypoints inspected for baseline, accessibility, motion, design extraction and improve-ui; canvas entrypoints screened. Adapt governing-source tracing, small focused passes and evidence-based design extraction. Reject stack lock-in, arbitrary bans, forced read-only planning for authorized implementation and blanket accessibility exclusions. |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/d900840716eb262e1feb17c6f4406c9ce0e06bcf) | All seven design/skills entrypoints inspected: accessibility-review, design-critique, design-handoff, design-system, research-synthesis, user-research and ux-copy. Adapt handoff detail, content, research/evidence separation and consistency. No fabricated participants, universal sample sizes, scores or mandatory connectors. |

## Discovery pages supplied by the user

These pages were opened as discovery aids. Their rankings, popularity figures and performance claims are not quality evidence. Recommendations were checked against primary source instructions; advertised private/store-only skill contents are not represented as inspected.

- [Kimi: UI/UX design skills](https://www.kimi.ai/resources/ui-ux-design-skills-for-agents): public descriptions of design-system-builder and landing-page-scaffold; full store packages not obtained. Conceptually relevant reference extraction and coherent foundations; no fixed five-section landing template adopted.
- [Snyk: UI/UX skills](https://snyk.io/articles/top-claude-skills-ui-ux-engineers/): discovery of Anthropic, Vercel, UI/UX Pro Max, Bencium and AccessLint. Current repositories differ from some article paths/rules; primary sources take precedence.
- [Zima: AI design skills/tools](https://shop.zimaspace.com/blogs/tech-ai-hub/10-best-ai-design-skills-tools-for-better-ui-ux): discovery of Impeccable and UI Skills. Other listed tools such as Hallmark, Open Design, Taste, GSAP and design-md-chrome were screened at article level, not claimed as fully inspected or incorporated packages.
- [AgenticSkills design category](https://agenticskills.io/category/design): directory discovery including platform-design-skills and Anthropic design plugin. Other listed entries were not all investigated; directory ranks are not benchmarks.

## Primary platform guidance

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): web accessibility criteria, target-size distinctions and conformance limits.
- [WAI-ARIA APG modal dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): modal focus and interaction behavior; ARIA alone does not implement it.
- [web.dev responsive design](https://web.dev/learn/design): content/layout adaptation, internationalization and input.
- [Android accessibility defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults): native touch targets and semantics.
- [Android adaptive layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive): available-window adaptation.
- [Android state saving](https://developer.android.com/develop/ui/compose/state-saving): distinct restoration mechanisms and their limits.
- [Compose UI testing](https://developer.android.com/develop/ui/compose/testing): semantics, actions, assertions and synchronization.
- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): UI restrictions are distinct from authorization enforcement; consulted in the 1.1.1 maintenance review.
- [MDN XSS guidance](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS): context-specific escaping, sanitization and rendering boundaries; consulted in the 1.1.1 maintenance review.
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md): inspected live during research; useful browser/UI concerns, not adopted as unquestioned mandates.

## Deliberate synthesis

The package adds a single cumulative screen contract, stable IDs and explicit decision/evidence states; routes conditional platform knowledge; preserves actual project authority; handles uncertainty, recovery and cross-screen changes; and records tool/device limitations. It combines visual craft with functional interaction rather than maximizing decoration or checklist volume. Packaging and internal-link checks do not establish that this synthesis outperforms other skills. Future trials must use representative tasks and target models/hosts.

## User-supplied Android/KMP bundle — 2026-11-05

Reviewed the 20 entrypoints in the user-supplied PL Coding Skills Bundle and relevant supporting material. At this research stage, the additions were independently written. The subsequent native Android integration imported four UI procedure references from the local bundle. See the [source map and redistribution status](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#pl-coding-android-and-pr-quiz-skills). Historical trials retain their recorded versions.

## Local design consolidation — version 1.4.0

2026-11-06: re-inspected all 18 files of the local `android-skills/design` package for the user's requested consolidation and retirement. The [file-level transfer inventory](design-consolidation.md) maps its entrypoint, seven references, script and nine assets to existing coverage, focused additions or deliberate exclusions. Discovery field/context detail, meaningful direction comparisons, visual critique, state-gallery review, token-derived specimens and reproducible local artifacts were the relevant lessons.

The source checker was exercised in bounded in-memory experiments: a missing declared foreground, unknown usage and translucent background could evade meaningful contrast evaluation. Its runtime also depended on remote fonts/icons and did not fully implement modal focus behavior. No source implementation, styles, template or token data was copied. Optional local tools/examples/tests are original repository code, with their own explicit supported contract and verification record. Source investigation is not a claim of source-tool safety or complete functionality.

The existing cumulative document, platform guidance, evidence levels and user authorization remain intact. No fixed option counts, global theme/state permutations, automatic publication, mandatory new documentation tree or unsupported accessibility guarantees were adopted. This authorized follow-up changes/removes the local source copy after destination checks; the earlier historical source-state observation does not describe its current presence. See [notices](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#local-design-skill-consolidation--2026-11-06).


## pstack synthesis — version 1.3.0

2026-11-06: screened names and descriptions of all 58 skill entrypoints under [cursor/plugins pstack](https://github.com/cursor/plugins/tree/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills), then read relevant bodies and selected supporting references. The non-truncated tree was pinned to `2776ddd2355d6d6c8747d3964600f28daf62f049`; this is not an audit of the entire plugins repository. Relevant sources: [create-verification-skill](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/create-verification-skill/SKILL.md), [maintain-verification-skill](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/maintain-verification-skill/SKILL.md), [statechart](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/statechart/SKILL.md), [principle-experience-first](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-experience-first/SKILL.md).

Adapted identified-instance readiness, serial or isolated UI driving, action plus durable-outcome evidence, owned cleanup that retains evidence, and honest state/transition abstraction. Existing flow coverage, identity inheritance, native/web distinctions and authority rules were retained. No mandatory live pass for documentation-only work, new feature-map tree, Cursor/Grok/Tailscale setup, fixed prototype count or automatic user-session control was imported.

This is independently written conceptual guidance. No upstream scripts, templates, model files or substantial instruction text were copied or executed. See [third-party notices](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#cursor-pstack-research) for the common research scope, license and exclusions. Historical trials retain their original scope; no new cross-model or production-effectiveness result is claimed.


## Android implementation consolidation — 1.5.0

2026-11-06: Four local Android UI entrypoints (Compose architecture, components, MVI presentation and navigation) were incorporated as conditional references under references/android. The source bundle is attributed to Philipp Lackner and [PL Coding's Claude Code Skills page](https://www.pl-coding.com/claude-skills); see the [third-party notice](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#pl-coding-android-and-pr-quiz-skills) for provenance and redistribution limits. UI Design remains generic and owns the single UI contract; the four former names are not discoverable skills. Project architecture and actual versions govern their examples. Earlier design-prototype work remains intact. The [integration map](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/SKILL-ROUTING.md) records source disposition and activation boundaries. No publishing, host installation or new runtime correctness claim follows from the import.

## Local-input and stack maintenance — 1.5.2

2026-11-06: bounded regression probes established ambiguous duplicate JSON declarations and an oversized-integer traceback in the original optional helper. Focused reader/range corrections and two added tests preserve the existing trusted-local-input contract; the helper remains neither an HTML sanitizer nor a conformance audit. Android presentation/navigation wording now explicitly keeps the project's chosen DI, presentation and module structure. The existing examples do not authorize a stack migration. The evaluation record separates the **22** executed helper tests from authored instruction cases and older runtime trials.

## Elephant & Goldfish Model — 1.5.3

2026-11-07: adapted the [Comprehension reviewer's](https://github.com/google/elephant-goldfish-model/blob/e9e1f06aa4e26e95cd4ed37210a0632202c429e9/agents/comprehension.md) reconstruction technique to reconstruct a screen journey from its entry to its result and recovery. It separates a cue a user can discover from an explanation only a spec reader sees. The finding's scope follows the actual material inspected. See [research scope and attribution](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#elephant--goldfish-model-research).
