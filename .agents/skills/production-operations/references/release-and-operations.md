# Release verification and live operations

## Choose a rollout and stopping conditions

Use direct rollout for small changes with acceptable downtime and known recovery. Use rolling, canary or blue/green when the runtime and risk justify keeping revisions available. Include spare capacity, traffic affinity, sessions, active connections and old/new compatibility. For consumers and jobs, control triggers, queues, schedules, partitions and concurrency separately from HTTP traffic. Check the cost of running both versions.

Record previous and intended revisions, the pre-change baseline, applicable acceptance checks, signal thresholds, minimum useful observations, comparison window, stop conditions and available actions. Verify the exact revision using runtime or artifact evidence. Check real ingress, authentication and critical read/write flows with a scoped test identity and cleanup. Trace representative dependency calls, persistence, async processing and retries where relevant. Use synthetic monitoring when organic traffic cannot supply useful evidence. Keep no-data or insufficient-sample results explicit. Measure DNS/TLS at the external path when those layers changed.

Hold or stop promotion when checks fail, telemetry is unavailable, or the agreed comparison is inconclusive. Reconcile pending and current deployments before mutating them again. Traffic rollback, configuration rollback, database repair and restore have separate effects. Verify the prior revision's effective dependencies, bindings and schema compatibility before routing traffic to it. Verify recovery on the restored path and confirm unintended consumers, jobs or retries are quiesced. Bound retries, wait time and escalation by project policy and the task's impact.

## Establish ongoing visibility

Use service-specific logs, metrics, traces and synthetic checks according to the operating contract. Choose signals that reflect user impact and likely failure modes, such as successful request rate, latency, queue age, job completion, saturation, database connections, replication lag and backup age. Attach revision and environment for comparison. Control sampling, retention, cardinality and access. Redact sensitive identifiers and payloads. Record SLI population, denominator, time window and thresholds when an SLO applies. Set actionable alert routing, severity, ownership and a linked procedure. Exercise the delivery path for a test alert when authorized. Track capacity headroom, quota and cost signals.

When the service has an error-budget policy, connect the decision to the agreed observation window and applicable budget or burn rate. For example, if a tagged candidate violates the stop threshold while the stable revision remains healthy, hold expansion, preserve the stable path, and verify queued work and stored data before selecting a recovery action. An observation window with insufficient traffic needs more evidence before promotion.

## Respond to an incident

1. Establish affected service, time, scope and symptoms. Check ongoing changes, dependencies, last known good state and the incident owner. Start a UTC timeline with source links and sanitized observations.
2. Stabilize within authority using the least disruptive viable action. Examples include stopping a rollout, switching a compatible revision, pausing a consumer or disabling a feature. Compare blast radius and recovery paths before action. Preserve evidence and coordinate customer or stakeholder updates through the authorized owner.
3. Verify mitigation from user-facing signals and data/queue consistency. Record residual impact and who monitors it. Separate root cause confidence from the evidence that the service recovered.
4. Follow up with a causal investigation, prevention and regression checks, runbook changes and owners. Feed release and recovery evidence back to the project records. Security incidents follow the project's incident and evidence-handling policy.

In the existing incident record, capture the affected window and customer impact, revision and evidence, containment and recovery checks, confirmed causes and contributing conditions, and corrective actions with owners and follow-up. Review conditions that made the failure possible and track whether each correction works.

[Google SRE canarying releases](https://sre.google/workbook/canarying-releases/) · [Google SRE incident management](https://sre.google/resources/practices-and-processes/incident-management-guide/) · [OpenTelemetry security](https://opentelemetry.io/docs/security/)
