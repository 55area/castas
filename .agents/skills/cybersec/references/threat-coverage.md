# Threat Coverage and Verification

Use for threat models, substantial audits/readiness checks, or changes involving interacting trust boundaries. For a narrow review, apply only the relevant reasoning and summarize coverage briefly. Reuse the project's existing model and identifiers; do not require a new document, tool, diagram, or exhaustive checklist.

## Build a bounded coverage map

Start with the actual system and critical user/business outcomes. Inventory in-scope entry points, privileged operations, identities, data stores, external integrations, and delivery/recovery paths. Include background, administrative, import/export, and alternate client paths where present. Record scope exclusions separately from Not applicable; an inaccessible relevant surface remains Not assessed.

For each material threat, retain a stable identifier and connect: surface/asset → attacker capability and prerequisites → violated invariant/impact → actual or proposed controls → verification evidence or planned check → residual gap, owner, and next action. Link findings and test evidence instead of duplicating them. Distinguish proposed controls, implemented controls, and observed runtime enforcement.

Use these prompts to detect omissions, selecting applicable domain references for detail:

| Concern | Questions to investigate |
| --- | --- |
| Identity and authority | Can another user, tenant, service, or compromised privileged actor impersonate, recover, delegate, or exceed its authority? |
| Data and execution | Where can untrusted content become queries, commands, markup, files, native code, or privileged tool arguments? Where can sensitive data escape? |
| Business state | Can valid operations be reordered, replayed, raced, partially completed, or automated to violate a business rule? |
| Availability and cost | Can bounded input cause unbounded work, storage, queues, retries, locks, or third-party charges? What fails when a dependency is unavailable? |
| Delivery and administration | Can a contributor, dependency, build runner, updater, or recovery operator bypass the intended trust boundary? |
| Privacy and lifecycle | Do collection, secondary use, sharing, retention, deletion, or backups violate the project's data requirements? |
| Containment and recovery | After one control fails, what else becomes reachable, which evidence survives, and how can trusted operation resume? |
| Detection and accountability | For a material abuse or release risk, what event reaches the detection system, what context identifies the actor/action/resource, who responds, and can an authorized synthetic trigger prove delivery without exposing secrets? |

These are investigation prompts, not findings or a complete attack catalog. Apply additional project/domain requirements. An Assessed row describes work performed, not absence of risk; do not invent a security score or an “all attacks covered” percentage from checked rows.

## Examine combinations and failed assumptions

For high-impact outcomes, trace credible paths across components: initial access → acquired capability → next reachable boundary → impact. For each transition, establish the identity, resource, permission, and configuration needed. Separate observed links from assumptions; a hypothetical link does not confirm the entire chain. Recognize effective controls that break it and consolidate shared root causes without hiding combined impact.

Challenge dependence on a single defense or shared credential: what remains protected if an account, renderer, worker, dependency, or service is compromised? Examine fallback behavior when authorization, configuration, or security dependencies time out or fail. Sensitive actions must preserve their security invariant; choose denial, queuing, or constrained degraded operation according to the actual safety and availability requirements.

## Turn controls into verifiable behavior

- Pair a prohibited case with an allowed case. Verify both the denial and absence of unauthorized reads, writes, queued work, or sensitive output; an error response alone may hide side effects.
- Confirm the fixture can reach the intended enforcement point. Use an existing protected resource, a valid identity lacking the relevant permission, and an allowed actor for the same operation. An earlier routing, parsing, or login rejection can leave resource authorization untested. Check unexpected persistence, messages, and output after denial.
- For stateful workflows, select relevant expiry/revocation, replay, ordering, concurrency, cancellation, and partial-failure checks. Use the actual boundary, not only a helper's mock behavior.
- Choose checks by the claim: source tracing for enforcement, integration tests for component interactions, isolated parser/property tests or authorized bounded fuzzing for input spaces, and operational evidence for alerts/restoration. State what mocks and synthetic tests cannot establish. Tool availability does not expand authorization.
- Link repeatable regression checks to corrected invariants. Inspect sibling paths sharing the same root cause within scope; record broader follow-up without silently expanding the task.

For example, requesting a nonexistent invoice and observing 404 gives no evidence about access to another tenant's existing invoice. Create isolated tenant fixtures, establish that the owner can access its invoice, and exercise the same invoice with the other tenant's valid identity. Inspect the result and side effects according to the application's disclosure policy, which may deliberately use either 403 or 404.

## Structural guarantees and security models

Where recurring defects arise from duplicated rules or ambiguous ownership, consider a schema, restricted API, single authoritative writer, or executable invariant at the actual trust boundary. Prefer a mechanism that prevents the demonstrated bypass over another reminder. Static checks can enforce useful invariants within their assumptions. Inspect trusted construction/parsing, escape hatches, serialization, and independently deployed consumers before relying on that guarantee; a type name or earlier validation alone does not establish object authority or permission freshness. For queued or delegated work, establish whether policy requires current access at use or grants a bounded capability that remains valid; verify its scope, lifetime, and revocation semantics against the actual enforcement.

When a model or property harness supports a security conclusion, map its guards, writers and atomic actions to the assessed revision. State attacker capabilities, environmental assumptions, bounds, enabled properties and completed checks. For example, when policy requires current permission at delivery, a model that combines permission-check and export into one atomic action cannot rule out revocation between separate real operations. Distinguish a model discrepancy from a reachable attack; a bounded pass or an illustrative statechart alone does not establish runtime enforcement. Preserve current counterexamples and unavailable-property gaps rather than adjusting the model to obtain a clean verdict.

## Keep coverage useful over time

During design, propose controls and acceptance checks; during implementation, verify them; before release, reconcile critical gaps with the specified gate. Reassess affected rows after changes to trust boundaries, permissions, data, dependencies, deployment, advisories, or incident evidence. Preserve stable IDs, invalidate stale evidence, and record the next owner/action for unresolved risks. Recommend review triggers without creating recurring jobs or claiming continuous monitoring.
