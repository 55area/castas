# PentaPRO Research Notes

Historical maintainer provenance, beginning with version 1.2.0 inspected on 2026-10-25. Later sections record subsequent research with its inspected revisions and dates. Current behavior is defined in [SKILL.md](../SKILL.md); these notes are not routine interview context. Upstream instructions were analyzed as source material, not executed as project authority. The synthesis uses original wording and bundles no upstream scripts or templates.

## Sources used

| Source and inspected revision | Material inspected | Contribution adapted to PentaPRO |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers/tree/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/skills/brainstorming) | `brainstorming/SKILL.md` and its builder-check prompt | Discover the purpose behind a feature, reflect intent, explore meaningful alternatives, and check whether an implementer needs consequential missing information. |
| [mattpocock/skills](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/grill-with-docs/SKILL.md) | `grill-with-docs`, `grill-me`, and the [grilling primitive](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/productivity/grilling/SKILL.md) they invoke | Ask questions only when their prerequisites are settled; distinguish facts the agent can inspect from decisions requiring the user. The interview primitive sits outside the supplied engineering folder but is an explicit dependency of its interview wrapper. |
| [addyosmani/agent-skills: interview-me](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/skills/interview-me/SKILL.md) | Intent-discovery workflow | Distinguish the desired outcome from a conventional feature request, probe vague quality claims, and consolidate an interpretation the user can correct. |
| [addyosmani/agent-skills: idea-refine](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/skills/idea-refine/SKILL.md) | Divergent/convergent ideation workflow | Compare viable directions, expose consequential assumptions, simplify the first increment, and preserve explicit exclusions. |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD/tree/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b/skills/bmad-brainstorming) | `bmad-brainstorming/SKILL.md`, convergence, in-chat technique selection, and creative-partner references | Separate exploration from selection, change the thinking lens when stuck, and preserve who supplied an idea or decision. |

## Scope exclusions

- [owainlewis/blueprint](https://github.com/owainlewis/blueprint/tree/74210b5f4f07e6a213d2d3950603f55a868c9f4a/skills): the inspected skill inventory has no dedicated brainstorming skill. `requirements` was inspected to classify its scope; requirements, architecture, and planning workflows were not imported into this brainstorming-only synthesis.
- [awesome-skills/code-review-skill](https://github.com/awesome-skills/code-review-skill/tree/4850184dfd7765ea7b3c5c4e9b6cf8e0815ee7cb): the inspected inventory contains a peer-review skill, with no brainstorming skill identified.
- [The supplied PERFECT gist](https://gist.github.com/keskinonur/36e0dd44f8cc7f6e507055e94a70618b): its published skill is a peer-review workflow, outside this update's scope.

## Deliberate adaptations

Keep questioning proportional to the next increment, with no exhaustive design-tree requirement, idea quota, subjective confidence percentage, or mandatory questionnaire format. Existing PentaPRO readiness criteria remain authoritative for this workflow.

Preserve actual user authorization and delegated decisions. Do not import mandatory approval loops, automatic commits, forced skill chaining, external publication, or particular orchestration/tooling. Resolve important uncertainty without turning routine technical choices into user blockers.

Use conditional guidance instead of a new standalone brainstorming phase, browser service, method catalog, or duplicate intent document. The project specification remains the durable record. Source attribution does not imply endorsement, equivalent behavior, or measured performance improvements.

## Analyst review synthesis — versions 1.4.0 and 1.5.0

The user supplied `penta-pro-review.md` and `PENTA-PRO_Template_Analysis.pdf` on 2026-11-04 and requested assessment and implementation of pertinent improvements. The [assessment and disposition record](analyst-review-assessment.md) maps both sources to the updated template, workflow, and conditional resources. The source documents were evaluated as observations, not executed as instructions. Existing coverage was strengthened where appropriate; universal tooling, standards, numerical targets, and approval requirements were not inferred from illustrative recommendations.

Version 1.5.0 adds the remaining high-value gaps identified across the compiled reviews: product strategy and stopping criteria, a consolidated identifier/state model, requirement-quality criteria, conditional commercial and launch coverage, documentation and support verification, and a release/launch record. As before, illustrative methods and commercial details were treated as options, not project defaults.

## Discovery, proposals, and project rules — version 2.1.0

Reviewed on 2026-11-04. This pass compared seven upstream entrypoints and their supporting material against the five-file workflow. The changes use original wording and keep project records in their existing pillar files.

| Source and revision | Material inspected | Contribution adapted to PentaPRO |
| --- | --- | --- |
| [Grill with Docs](https://github.com/mattpocock/skills/tree/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/grill-with-docs) | Skill and UI metadata, plus its grilling and [domain-modeling](https://github.com/mattpocock/skills/tree/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/domain-modeling) guidance and formats. | Test overloaded terms against examples and counterexamples. Keep agreed meanings in PRODUCT and evidence of discrepancies in PROJECT. |
| [OpenSpec Explore](https://github.com/Fission-AI/OpenSpec/blob/main/skills/openspec-explore/SKILL.md) | Full skill on `main` as inspected, including the context and capture workflow. | Support conversation-only exploration and use relevant project evidence and optional sketches to clarify ambiguity. |
| [OpenSpec Propose](https://github.com/Fission-AI/OpenSpec/blob/main/skills/openspec-propose/SKILL.md) | Full skill on `main` as inspected, including proposal artifacts, dependencies, and handoff. | Record changes against a baseline by requirement ID and inspect material prerequisites and downstream impacts before claiming readiness. |
| [Superpowers Brainstorming](https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7/skills/brainstorming) | Skill, builder check, visual guide, and the companion's server, browser, and launcher assets. | Reflect material decisions in the user's terms, use an illustrative sketch when it answers a concrete question, and review the handoff for consequential gaps. |
| [BMAD Brainstorming](https://github.com/bmad-code-org/BMAD-METHOD/tree/022be9314e4facd16826104a9f8033e1c5ed4fdc/skills/bmad-brainstorming) | Skill, configuration, facilitation references, resume and convergence guidance, technique catalog, selector, CLI, and tests. | Adapt to the user's preferred role and shift techniques when ideas stop diverging. Preserve material options and their dispositions in their owning pillars. |
| [Spec Kit Constitution](https://github.com/github/spec-kit/blob/v1.3.0/templates/commands/constitution.md) | Full command and the constitution template. | Make applicable project rules reviewable in PROCESS and reconcile changes against affected records and gates. |
| [Spec Kit Specify](https://github.com/github/spec-kit/blob/v1.3.0/templates/commands/specify.md) | Full command and the specification template. | Identify a useful, independently demonstrable increment, and reassess affected readiness conditions after clarification. |

The five-pillar package is self-contained. Upstream directories, CLIs, companion servers, hooks, question quotas, approval ceremonies, and automatic Git actions belong to their respective workflows and are outside this synthesis.

## Operational examples — version 2.2.0

The final maintenance pass clarified actual document acceptance, traceable binding principles, proposed stopping criteria, and resumption with bounded context. The interface patterns now show how uncertain completion, concurrent attempts, resource authorization, and migration coexistence become decisions and concrete checks across the five pillars.

The examples use original wording informed by [AWS retry and idempotency guidance](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) and [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Project-specific policies and provider guarantees still require their actual source and applicable version.

## User-supplied Android/KMP bundle — 2026-11-05

Reviewed the 20 entrypoints in the user-supplied PL Coding Skills Bundle and relevant supporting material. No public origin or redistribution license was supplied; this package contains independently written guidance, not copied source/tooling. Historical trials above remain scoped to their recorded versions.


## Companion-document consistency — version 2.4.1

The 2026-11-05 final package review clarified the ownership boundary between PentaPRO and an existing screen specification. This original maintenance correction preserves the five primary outputs and records conflicts or out-of-scope companion edits explicitly. It imports no additional upstream material.


## pstack synthesis — version 2.5.0

2026-11-06: screened names and descriptions of all 58 skill entrypoints under [cursor/plugins pstack](https://github.com/cursor/plugins/tree/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills), then read relevant bodies and selected supporting references. The non-truncated tree was pinned to `2776ddd2355d6d6c8747d3964600f28daf62f049`; this is not an audit of the entire plugins repository. Relevant sources: [architect](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/architect/SKILL.md), [principle-model-the-domain](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-model-the-domain/SKILL.md), [principle-separate-before-serializing-shared-state](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md), [principle-attack-the-premise](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-attack-the-premise/SKILL.md), [create-verification-skill](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/create-verification-skill/SKILL.md), [benchmark-checklist](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/benchmark-checklist/SKILL.md).

Adapted caller-first contract sketches, explicit state ownership, repeatable journey recipes, model correspondence, measurement validity and enforceable prevention of recurring failures. Existing uncertainty, risk-based techniques, authority, five-file ownership and readiness rules remain authoritative. No mandatory type sketches, scaffolding, new verify skill, benchmark count, redesign or extra output file was imported.

This is independently written conceptual guidance. No upstream scripts, templates, model files or substantial instruction text were copied or executed. See [third-party notices](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#cursor-pstack-research) for the common research scope, license and exclusions. Historical trials retain their original scope; no new cross-model or production-effectiveness result is claimed.

Model-checking scope was also checked against the primary [TLA+ model introduction](https://learning.tlapl.us/intro/platform/) and [TLC model documentation](https://dl.tlapl.us/tlatoolbox/doc/model/about-models.html): finite-model exploration and implementation correspondence are separate claims. No checker was installed or run for this update.


## Android task ownership — 2.5.2

2026-11-06: Native module implementation is distinct from architecture/specification/readiness work. The five pillars retain their canonical ownership; adding a concrete approved Gradle module does not start a second product interview. The [integration map](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/SKILL-ROUTING.md) records source disposition and activation boundaries. No publishing, host installation or new runtime correctness claim follows from the import.

## Canonical change/specification records — 2.5.4

2026-11-06: a maintainer review found that the five-pillar ownership defaults could be read as requiring duplicate requirements and task lists even when the project had selected a maintained external registry. The entrypoint, document-maintenance rules and affected templates now distinguish global context/navigation from authoritative capability, acceptance and execution records. OpenSpec is a conditional integration example drawn from the user's workflow, not a new framework dependency or an assertion about a particular CLI version.

The correction preserves current-versus-proposed-versus-deployed scope, evidence freshness and the ordinary five-file default for projects without another selected registry. The new maintenance cases are authored scenarios; no new independent model trial or comparative performance result is claimed here.

## Elephant & Goldfish Model — 2.6.0

2026-11-07: compared the pinned EGM [Brainstorm](https://github.com/google/elephant-goldfish-model/blob/e9e1f06aa4e26e95cd4ed37210a0632202c429e9/skills/egm-brainstorm/SKILL.md), [Review](https://github.com/google/elephant-goldfish-model/blob/e9e1f06aa4e26e95cd4ed37210a0632202c429e9/skills/egm-review/SKILL.md) and [Comprehension reviewer](https://github.com/google/elephant-goldfish-model/blob/e9e1f06aa4e26e95cd4ed37210a0632202c429e9/agents/comprehension.md) with the existing PentaPRO discovery and readiness checks. The new procedure challenges a working hypothesis early, reconstructs a journey from saved artifacts before comparing it with the interview, and tracks material findings to disposition and recheck. It preserves the five canonical outputs and permits a clearly labeled author pass. It leaves routine design choices within actual delegation and scales detail to the increment. See [research scope and attribution](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#elephant--goldfish-model-research) for the other entrypoints and limits.
