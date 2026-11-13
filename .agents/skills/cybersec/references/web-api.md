# Web, API, and Service Security

Select the changed/exposed surfaces and actual stack. When verification against ASVS is in scope, record the selected edition, level or subset, applicable requirement IDs, and evidence or coverage gaps. Use the edition required by the project. ASVS 5.0.0 is a reference for web application and service controls. Use OWASP Top 10:2025 to screen risks and WSTG for applicable test methods. Report only the checks actually performed.

## Identity, business rules, and data

- Trace authentication, token/session validation, expiry, revocation, account recovery, privileged MFA, and identity changes through the actual entry points. A signed token or authenticated actor does not establish resource authorization.
- Enforce remote operations at a trusted server/service boundary. Follow object, property, function, and tenant authorization across reads, writes, bulk actions, exports, background jobs, alternate routes, and caches. Follow effective guards before reporting a missing check.
- When work crosses a queue or cache, trace which principal and resource scope travel with it. Inspect cache keys and shared result access, worker privileges, and what happens if membership or permission changes before delivery. Establish the project's revocation or delegated-capability semantics before deciding whether a later check is required.
- Model abuse of legitimate features: invitation/recovery takeover, payment/refund transitions, coupon/credit replay, workflow bypass, account enumeration, sensitive search, and automated consumption. Verify the project's business invariant and realistic attacker prerequisites.
- Check transaction/race windows, idempotency, ordering, and uncertain external outcomes. Authenticate webhook source/payload and constrain replays; IP allowlists or an obscure callback URL alone are not authenticity checks.
- Trace sensitive fields into responses, logs, analytics, URLs, browser storage, shared caches, backups, and downstream APIs. Inspect schema/migration compatibility and data lifecycle controls, including delayed clients.

## Credentials and cryptographic controls

- For password verification, inspect the actual password-hashing API, per-password salt, configured work factor, and upgrade path. A fast general-purpose hash exposes low-entropy passwords to inexpensive guessing. Select current vetted password-hashing guidance for the deployment constraints and measure resource cost before changing parameters.
- Trace security tokens from generation to use, expiry, invalidation, and logs. Use cryptographically secure randomness where unpredictability is required. Verify signed tokens against the expected issuer, audience, permitted algorithm, key, and time constraints for the protocol.
- For encryption, inspect a maintained library's authenticated-encryption use, nonce requirements, key access, rotation, and recovery. A database dump protected by encryption may still be readable to an attacker who also gains its application key. Name the attacker capability the control is meant to resist. Consult the actual library and platform guidance before proposing cryptographic changes.

Use these checks for equivalent credential and cryptographic paths in desktop, mobile, or infrastructure when they are in scope. [Password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [cryptographic storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html).

## Untrusted inputs and browser boundaries

- Follow input into SQL/NoSQL, command arguments, filesystem/archive paths, templates, deserialization, uploads, and URL fetches. Check actual parameterization/encoding/containment; validation at an unrelated layer may not protect the sink.
- For SSRF, assess allowed destinations, DNS resolution/rebinding, redirects, private/link-local/metadata targets, protocol support, and egress policy appropriate to the fetcher. Do not require a denylist when a sound allowlist or constrained service enforces the contract.
- For XSS and client/server rendering, examine context-sensitive output handling, raw HTML/Markdown, URLs, sanitization, hydration, and private values reaching public bundles or caches. CSP is one layer, not a substitute for safe rendering.
- Match cookies, CSRF defenses, CORS, same-origin isolation, postMessage origin checks, OAuth redirects, and session storage to the credential mechanism and supported browser behavior. Do not demand cookie-specific controls for every API.
- Check resource limits and abuse controls for expensive parsing, searches, uploads, decompression, authentication, and automation. Rate limits should reflect the identity/boundary and workload, not an invented universal number.
- Check when limits take effect. A file-size rejection after fully buffering the upload, or an expansion limit after decompression, can leave memory or CPU exhaustion reachable. Trace upstream limits, streaming bounds, parser depth, and cancellation before concluding that a limit is missing.

## Evidence

High-value checks include two identities accessing the same resource, allowed versus denied properties/actions, replayed/reordered requests, malicious content at the final rendering sink, cross-account cache reuse, and recovery after partial effects. Use isolated fixtures or established local services. Record which browser/API/runtime boundaries were actually exercised; a build or scanner alone does not establish end-to-end security.

Primary guidance: [ASVS](https://asvs.owasp.org/), [OWASP Top 10:2025](https://top10.owasp.org/2025/0x00_2025-Introduction/), [API Security](https://api-security.owasp.org/), [WSTG](https://owasp.org/projects/web-security-testing-guide).
