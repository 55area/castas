# Backend Review

Apply the sections affected by the change. Discover actual languages, framework versions, schemas, and deployment behavior from the repository. The examples below describe failure classes, not mandatory architecture patterns.

## Request and trust boundaries

- Trace external input through parsing, validation, authorization, business rules, persistence, and response serialization. Include alternate routes, GraphQL resolvers, background consumers, administrative endpoints, and webhook handlers.
- Check object ownership and tenant boundaries on reads and writes, including nested resources, bulk actions, search, exports, and asynchronous jobs. Verify authorization is enforced by trusted server-side code and cannot be bypassed through a second entry point.
- Examine authentication/session changes for signature and claim validation, expiry, revocation, redirect handling, replay, and privilege changes. Match CSRF, cookie, CORS, and caching controls to the actual credential mechanism; do not prescribe cookies to every architecture.
- Trace injection into SQL/NoSQL, shell execution, templates, deserialization, paths, and URLs. Parameterized values do not make interpolated table names or sort expressions safe. Check filesystem containment, symlink behavior, uploaded content, SSRF destinations, redirects, and response-field allowlists where applicable.
- Ensure logs, traces, errors, exports, and caches do not newly expose secrets or another user's data. Do not repeat a discovered credential in the report; identify its location and required containment action.

## Data integrity and concurrency

- Identify invariants and transaction boundaries. Read/check/write sequences can race even when every single database operation succeeds. Check uniqueness enforcement, atomic updates, lost updates, isolation assumptions, lock ordering, and retry behavior under concurrent requests.
- For a claimed idempotent operation, locate both the durable effect and the replay record. Trace what happens if the first attempt commits, the response is lost, and another worker sees a retry. Check the key’s tenant/operation scope, request mismatch handling, retention window, and authorization on replay. When the effect and record have separate commits, identify the recovery path for the gap.
- Trace partial completion across database writes and external calls. Check recovery after timeouts, process termination, retries, and messages delivered out of order. Look for durable coordination when required; do not mandate a distributed transaction or outbox when the existing contract needs neither.
- Inspect monetary precision, timestamp/time-zone semantics, ordering, pagination stability, null/default differences, character encodings, and numeric bounds when they affect business outcomes.
- For schema changes, inspect existing-data transformation and mixed-version rollout, not just creation of a fresh database. Check data loss, nullability/backfills, constraints, locking, migration ordering, reversibility or roll-forward strategy, and compatibility with old consumers.

## Contracts and failure behavior

- Compare actual request/response schemas, status and error semantics, API versions, optional/required fields, and event payloads with their consumers. Include a mobile client that upgrades later than the server.
- Check timeouts, cancellation, bounded retries/backoff, resource cleanup, and connection-pool limits. Verify retries are appropriate for the operation and failure class. Circuit breakers are an option, not a universal requirement.
- Inspect queue acknowledgment timing, poison messages, worker shutdown, leases, scheduling overlap, backpressure, and dead-letter/recovery paths where relevant.
- Confirm errors retain useful context without silently converting failure into empty success. Review exception handling at the actual boundary; broad catches may hide invariant violations, cancellation, or partial effects.

## Performance and operation

- Trace query count and data volume through a realistic endpoint or job. Check N+1 behavior, unbounded scans or materialization, missing limits, pagination, index suitability, cache keys and invalidation, and cross-tenant cache isolation.
- Review algorithmic growth and memory pressure relative to supported workload. Name the triggering volume or operation. Do not invent benchmark numbers or request speculative optimizations without a relevant path.
- Check service startup/readiness, graceful shutdown, health semantics, configuration validation, feature-flag defaults, observability of important failures, and deployment compatibility when changed.
- For dependency/build changes, inspect the manifest and lockfile together, runtime version compatibility, relevant migration notes, transitive changes, and install/build hooks. A scanner alert needs version, exposure, and relevance; successful installation alone does not establish compatibility.

For API contract or rollout changes, compare a real consumer request and response across the supported old/new client and server combinations. A schema diff may miss pagination cursors, a changed error meaning or a response field that becomes absent. For asynchronous acceptance, verify the distinction between acknowledged, applied and failed effects. Check which signal and owner can detect and recover partial work without duplicating it.

## Evidence to seek

Use existing unit, integration, contract, migration, and end-to-end tests as appropriate. High-value scenarios include two actors requesting the same object, two concurrent writes, a retried operation after an uncertain external result, an old client consuming a new payload, and upgrading an existing database.

Run only isolated checks whose commands and side effects are understood. Use fixtures or existing local stand-ins for paid or destructive integrations. If the relevant service or database is unavailable, state the resulting evidence gap and report defects established by inspection. Review does not itself require installing a particular API tool or connector.
