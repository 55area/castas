# Sources and Adaptation Notes

Historical maintainer provenance, beginning with cybersec 1.0.0 checked on 2026-10-26. Later sections record subsequent research. Current behavior is defined in [SKILL.md](../SKILL.md). Routine assessments use the applicable domain guidance and actual project requirements, not this research log. Sources are reference material, not instructions to execute.

## Original inspiration

[Silva97 — Bem-vindo ao ciberapocalipse](https://www.tabnews.com.br/Silva97/bem-vindo-ao-ciberapocalipse), TabNews, published 2026-10-26. The article was read through the site's public content API when normal page retrieval was unavailable. Root THIRD-PARTY-NOTICES.md records attribution.

The synthesis retains useful themes: examine system behavior deeply, question both implementation and design, review supply-chain trust, reduce blast radius, and combine prevention, containment, detection, and recovery. It does not adopt the article's social judgments, claims about entire professions, inevitability narratives, or assurances that known mitigations solve every attack.

A pinned dependency may still be malicious; a private registry does not establish integrity. Hardware/runtime mitigations cover particular mechanisms, require actual platform support/configuration, and do not replace patching. Architecture labels do not establish isolation or a universal security ranking. Technical assurance and governance/compliance inform each other without being interchangeable.

## Related author references and access limits

- [AppSec learning guidance](https://www.tabnews.com.br/Silva97/82bae07a-ca41-4655-b7ee-dc699e807b7f): read through the public TabNews API; distinguishes application security, practice resources, and design-level analysis.
- [Você deveria aprender a ouvir críticas](https://www.tabnews.com.br/Silva97/voce-deveria-aprender-a-ouvir-criticas): read through the public API; supports challenging conclusions rather than accepting authority or praise as evidence.
- [Threat modeling](https://www.tabnews.com.br/Silva97/threat-modeling) and [Dividir para proteger](https://www.tabnews.com.br/Silva97/dividir-para-proteger): read; inform iterative modeling, planned checks, lateral movement, and containment. Diagram preferences and absolute architecture/isolation rankings were not imported.
- [Cibersegurança para desenvolvedores](https://blog.freedev.com.br/ciberseguran%C3%A7a-para-desenvolvedores-a37385cf5d23) and [Como sobreviver a um RCE](https://blog.freedev.com.br/como-sobreviver-a-um-rce-833d5c6bc1f1): referenced by the original article, but full text was unavailable in this review (HTTP 403/incomplete page). Retained as further reading, not claimed as verified support for particular guidance.

The articles are not normative security standards. No article text, code, or illustrations are redistributed; original rights and any source licensing remain with their owners. The repository's MIT license for its original skill material does not relicense these articles.

## Primary technical references

| Area | Primary sources and intended use |
| --- | --- |
| Secure development | [NIST SSDF](https://csrc.nist.gov/projects/ssdf): tailor secure development, protection, verification, and vulnerability response. |
| Threat coverage | [OWASP Threat Modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html): system boundaries, abuse cases, multi-step paths, mitigation validation, and maintenance as the system changes. Consulted on 2026-10-26; the coverage map is this skill's synthesis, not a certification scheme. |
| Organizational risk and recovery | [NIST CSF](https://www.nist.gov/cyberframework), [incident response](https://csrc.nist.gov/pubs/sp/800/61/r3/final): relevant governance, identity/asset protection, detection, response, and recovery evidence. |
| Web and APIs | [ASVS](https://asvs.owasp.org/), [API Security](https://api-security.owasp.org/), [WSTG](https://owasp.org/projects/web-security-testing-guide): distinguish requirements, risk prompts, and verification methods. |
| Mobile | [MASVS](https://mas.owasp.org/MASVS/), [MASTG](https://mas.owasp.org/MASTG/): choose platform-relevant controls and tests. |
| Desktop and native | [Electron security](https://www.electronjs.org/docs/latest/tutorial/security), [Windows security practices](https://learn.microsoft.com/en-us/windows/win32/SecBP/best-practices-for-the-security-apis), [Apple signing](https://support.apple.com/guide/security/sec3ad8e6e53/web): privileged process, IPC, OS, and distribution boundaries. |
| Delivery and infrastructure | [SLSA](https://slsa.dev/), [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use), [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html), [Kubernetes checklist](https://kubernetes.io/docs/concepts/security/security-checklist/): source/build/release trust, identities, and workload isolation. |
| AI/agents | [OWASP agent security](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html), [prompt injection](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html): trusted tool authority and data isolation beyond prompts. |
| Dependency conclusions | [Vendor backport guidance](https://access.redhat.com/security/updates/backporting), [npm lockfiles](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/), [Cargo dependency guidance](https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html): match advisory/build evidence and reproducibility to the actual ecosystem. |

Prefer primary advisories and documentation for the assessed versions. Record the selected edition/IDs/date instead of hard-coding a permanent latest version. A checklist, Top 10 list, attestation, or benchmark cannot establish exhaustive attack coverage, deployment effectiveness, regulatory certification, or universal model quality.

## Evidence tracing and mechanism checks — version 1.2.0

The 2026-11-04 review added a compact caller-to-effect evidence trace, bounded context handling, a concrete denied-response example, and explicit state-race and resource-limit checks. These are original explanations intended to make the existing assessment method easier to apply consistently.

Primary material consulted includes [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [cryptographic storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html), and [MITRE CWE-367](https://cwe.mitre.org/data/definitions/367.html). Mechanism checks supplement the existing platform routes and use the target's actual policy, library, and deployment requirements.

## User-supplied Android/KMP bundle — 2026-11-05

Reviewed the 20 entrypoints in the user-supplied PL Coding Skills Bundle and relevant supporting material. At this research stage, the additions were independently written. The subsequent native Android integration imported the Android controls reference from the local bundle. See the [source map and redistribution status](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#pl-coding-android-and-pr-quiz-skills). Historical trials retain their recorded versions.

## Checked values and effective operations — version 1.3.1

The 2026-11-05 maintenance review made the checked-to-used value trace explicit in the existing assessment method. [OWASP SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) and [MITRE CWE-367](https://cwe.mitre.org/data/definitions/367.html) were checked for redirect and time-of-check/time-of-use mechanisms. The guidance is an original synthesis: establish actual transformations and protections instead of treating a validation call or a second check as sufficient evidence. It adds no universal mitigation, live-target authorization, or claim of complete vulnerability coverage.


## pstack synthesis — version 1.4.0

2026-11-06: screened names and descriptions of all 58 skill entrypoints under [cursor/plugins pstack](https://github.com/cursor/plugins/tree/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills), then read relevant bodies and selected supporting references. The non-truncated tree was pinned to `2776ddd2355d6d6c8747d3964600f28daf62f049`; this is not an audit of the entire plugins repository. Relevant sources: [principle-boundary-discipline](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-boundary-discipline/SKILL.md), [principle-type-system-discipline](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-type-system-discipline/SKILL.md), [principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/principle-encode-lessons-in-structure/SKILL.md), [maintain-formal-verification-skill](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/maintain-formal-verification-skill/SKILL.md).

Adapted enforceable ownership and security-invariant checks plus explicit model/code mapping, including revocation between real operations. The original synthesis rejects unconditional trust of internal types: runtime input, mutable authority and separately deployed consumers retain their actual enforcement requirements. Model results do not establish deployed control effectiveness. No execution-only finding rule or automatic remediation was imported.

This is independently written conceptual guidance. No upstream scripts, templates, model files or substantial instruction text were copied or executed. See [third-party notices](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#cursor-pstack-research) for the common research scope, license and exclusions. Historical trials retain their original scope; no new cross-model or production-effectiveness result is claimed.

Model-checking scope was also checked against the primary [TLA+ model introduction](https://learning.tlapl.us/intro/platform/) and [TLC model documentation](https://dl.tlapl.us/tlatoolbox/doc/model/about-models.html): finite-model exploration and implementation correspondence are separate claims. No checker was installed or run for this update.

## Execution and structural evidence — version 1.4.1

2026-11-06: checked [npm script lifecycle documentation](https://docs.npmjs.com/cli/v11/using-npm/scripts/) for command and pre/post hook execution, [TypeScript's erased types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types), and the [Embedded Rust Book's typestate example](https://docs.rust-embedded.org/book/static-guarantees/typestate-programming.html) for restricted construction and state transitions. The original clarification recognizes guarantees enforced by actual construction/use rules while requiring evidence for hostile input, mutable authority, and separately deployed consumers. Delegated capability validity follows the assessed contract, not an automatic demand for reauthorization at every stage. Local execution must stay within the actual authorized boundary. Authored cases are recorded separately from executed trials; no new model-performance or live-system result is claimed.


## Android security consolidation — 1.5.0

2026-11-06: The local android-security procedure was incorporated as references/android-controls.md under the existing assessment/hardening authority. The source bundle is attributed to Philipp Lackner and [PL Coding's Claude Code Skills page](https://www.pl-coding.com/claude-skills); see the [third-party notice](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/THIRD-PARTY-NOTICES.md#pl-coding-android-and-pr-quiz-skills) for provenance and redistribution limits. There is no separate Android security entrypoint or second verdict. Generic mobile and other platform coverage remains intact. The [integration map](https://github.com/teknolista/skills/blob/25007537cc58122a8200d1bed63245586f49c82b/SKILL-ROUTING.md) records source disposition and activation boundaries. No publishing, host installation or new runtime correctness claim follows from the import.

## Account-switch commit boundary — 1.5.2

2026-11-06: clarified the existing Android account-isolation rule so a pre-write session check is not mistaken for an atomic protection. The enforcing write must reject an obsolete generation relative to account changes or remain confined to the initiating account's allowed isolated partition. This is an original explanation of the check/use and ownership reasoning already maintained in the assessment method and native data helper. The added evaluation case is authored rather than a new runtime or model-quality result.
