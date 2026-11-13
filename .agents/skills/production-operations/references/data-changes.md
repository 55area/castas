# Data migrations, backups, and recovery

## Stage a compatible migration

- Map readers and writers across the old and new application versions, workers, delayed clients and downstream jobs. Track database, schema, region, credential and migration ledger independently of application versions. Test with representative schema and data volume. Estimate lock duration, replication lag, storage headroom and downtime. Protect test data according to its sensitivity.
- For overlapping versions, expand first with compatible changes, deploy compatible readers and writers, backfill and reconcile, then remove the old shape after all consumers and the rollback window have cleared. Check defaults, nullability, indexes, constraints, encoding and old-write behavior. When coexistence is impossible, use a reviewed maintenance or cutover plan with quiescence, routing, downtime and a defined point of no return.
- Run migration with a bounded, audited identity and one coordinating execution per target. Use an appropriate lock and ledger. For long or retriable changes, checkpoint bounded batches and handle concurrent writes explicitly. Check current schema and committed data after errors or connection loss before retrying. A runner timeout does not prove the database aborted.
- Define reconciliation before cutover. Use counts, key coverage, checksums where meaningful and business invariants such as tenant ownership or totals. Track mismatches and unresolved writes separately. Verify the old revision can still use the new data before treating code rollback as viable. When writes cannot be reversed safely, prepare a tested forward repair or a restore with an explicit loss and reconciliation plan.

## Prove recovery

Inventory the state needed to restore service, including database and objects, encryption keys and access, infrastructure/configuration, replication, credentials and integration state. Record the recovery point objective (RPO), recovery time objective (RTO), backup retention, owner, restore target and verification criteria. Match backup/PITR scope to the failure mode. A host snapshot alone may be insufficient for database consistency or cross-service recovery.

Rehearse in an isolated destination with production side effects disabled. Verify the restore point, schema, sample and business invariants, decryptability, permissions, startup and critical service flows. Record measured loss and recovery time with their scope. For a live restore or failover, establish who can authorize routing or destructive effects, how new writes are fenced or reconciled, and how the previous primary is prevented from accepting stale writes. Check recovered behavior and consistency before clearing the incident. Preserve or dispose of rehearsal data under the applicable retention policy.

For retirement, inventory dependent consumers, integrations and DNS, preserve any required exports and audit history, validate deactivation and retention requirements, then remove scoped infrastructure and access in dependency order. Verify billing, routes and data effects afterward. Keep destructive changes within their authorized scope.

[AWS Well-Architected recovery guidance](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html)
