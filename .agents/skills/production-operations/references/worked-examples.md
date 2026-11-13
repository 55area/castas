# Worked examples

These examples use fictional targets and show the evidence to collect. Derive actual commands, roles and resource changes from the target repository and current provider instructions.

## An HTTP API with PostgreSQL on Cloud Run

**Request.** Prepare the pipeline and deploy the accepted revision to an existing staging project. The owner supplies the project and region, service, registry, approved GitHub environment, workload identity provider and deployer/runtime/migration service accounts. The owner configures any missing bootstrap permissions. The agent verifies the identity inside the runner. A private Cloud SQL path and a staging tenant are available.

| Stage | Action and evidence |
| --- | --- |
| Plan | Read the deployed revision and current schema. Review the pipeline trust, artifact, target service and explicit ingress. Confirm staging uses its own data and secrets. Record the old traffic mapping and whether the old revision can still use the expanded schema. |
| Build | Test the accepted commit, build and push one immutable image, and retain the digest and run ID. Use federated CI access and scoped identities for separate deployment and migration jobs. |
| Migrate | Run the compatible expansion with a one-off job against staging. Verify its execution, migration ledger, schema and business invariants before deploying dependent code. A timed-out runner leaves the migration outcome pending reconciliation. |
| Preview and promote | Create a staging revision with no default traffic on the existing service. Test the authenticated tagged path and check the image digest and persistence. Shift staging traffic only within the authorized scope. Check the normal staging URL, routed revision and error signals. |
| Abort or recover | Hold on a failed or inconclusive required check. Restore the prior revision weights if compatible, then verify the staging path and persisted data. Reconcile deployment desired state and leave schema cleanup for its own reviewed change. |

Without runner access, prepare and validate local pipeline changes and leave live staging evidence pending. Keep production promotion outside this example's scope.

## A container API on a VPS behind Cloudflare Tunnel

**Request.** Release a pinned API image to an existing single-host staging Compose stack with an authorized brief interruption. DNS and Tunnel already serve the intended name. The owner supplies SSH access with a verified host key, private registry access and the Compose service name. A runner can reach the host, and an existing deploy mechanism limits host permissions.

1. Verify the SSH host and identity. Read the live service state, current image digest, persistent mounts and available disk. Confirm backups and previous artifact availability before replacing a stateful dependency.
2. Build in CI, publish the image by digest, and validate the target manifest through the established deployment mechanism. Pull and update only the API service, preserving named data volumes and other services.
3. Verify the running image, internal readiness and the public API through its actual Cloudflare hostname. Exercise a scoped test transaction and confirm persistence. Check Tunnel connector health and TLS if that layer changed.
4. If abort criteria are met, use the prior compatible image and manifest, then repeat runtime and external checks. An unresolved migration or conflicting writer can require repair before any application rollback. Record the actual outage window and observed revision.

[Google Cloud](providers/gcp.md) · [VPS](providers/vps.md) · [Cloudflare](providers/cloudflare.md)
