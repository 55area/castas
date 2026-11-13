---
name: http-api
description: Implement or change HTTP API server endpoints and their upstream integrations against a concrete contract. Use for server handler, error, authorization, retry, compatibility, or migration behavior. Requirements discovery, MCP implementation, and independent review have separate workflows.
license: MIT
metadata:
  version: "1.2.0"
---

# Implement HTTP API changes

1. Locate the authoritative interface and real consumers. If the project tracks accepted changes separately from its published contract, read the applicable change and acceptance criteria alongside the baseline. Otherwise use the request, existing interface, callers, and tests to establish the intended behavior. Trace routing, identity, resource/tenant authorization, validation, domain logic, persistence, and response mapping. Establish supported callers and versions. If a material ambiguity remains, identify the affected callers and settle it before changing their contract.
2. Define the changed request, response, errors, and effects using the existing contract format. Check absent versus null, defaults, enum changes, pagination/order, size limits, and retry/cancellation where they affect callers. Keep status, machine-readable error, and cache semantics consistent with the documented API and HTTP semantics. Preserve established wire names and negotiate any breaking change through the actual project policy.
3. Reuse existing middleware, schema validation, and data access boundaries. Enforce permissions at the resource/effect boundary, including asynchronous work. For a write that can be retried or run concurrently, define the invariant, transaction or precondition, retry behavior after an ambiguous response, and deduplication scope where needed. Exercise concurrent duplicates and interrupted or partial writes when relevant. Use the existing resilience and recovery conventions for upstream dependencies.
4. Implement the smallest useful behavior through the normal route. Update the canonical contract and examples with the implementation when scoped. Regenerate tracked clients only through the existing project workflow when needed. For an incompatible data or contract change, establish coexistence, rollout order, and viable recovery before relying on the change.
5. Verify through a real handler and representative state. Include a permitted control and exercise invalid input, authorization, compatibility, retries, and failures where the changed contract depends on them. Check the resulting state as well as the response. Isolate external effects. Distinguish schema checks, mock-backed tests, and verified provider/consumer behavior.

Use the project's version of its contract tooling and frameworks. Refer to [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html) and the [OpenAPI specification](https://spec.openapis.org/oas/) where applicable. If the project chooses a standard problem-details format, use [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) and preserve existing error contracts for supported clients. Existing GraphQL and RPC APIs retain their own contract and transport conventions.

For an endpoint that promises idempotency, scope the key by operation and the caller or tenant defined by the contract. Check authorization before returning a stored outcome. Bind the key to the request's meaning so reusing it with different input yields the documented conflict. Coordinate the durable outcome and effect through a transaction or an equivalent recovery protocol. For a downstream side effect, use the provider's idempotency or reconciliation mechanism if available. Exercise a lost response after the effect, concurrent duplicates, and conflicting key reuse. Inspect the resulting state and count effects. [AWS guidance on safe retries](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

For integrations that accept a caller-controlled URL or follow redirects, enforce the intended destination and credential policy at the actual outbound request, including resolved addresses and redirect hops. Use the project's constrained client or egress boundary; disable redirects when it cannot enforce that policy. Bound response bytes, decompression and total request time where relevant. Verify a permitted destination and a rejected destination with controlled endpoints, checking that no credentials or effects reach the rejected target. See [OWASP SSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).

When changing [limits, caching, or the lifecycle of a public endpoint](references/lifecycle.md), check the behavior with supported callers and intermediaries.

Return changed contracts and code, affected consumers and migration implications, and executed verification with gaps. A plan or review request retains its requested scope.
