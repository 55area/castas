# Google Cloud

## Match the workload

| Workload | Candidates and decisive checks |
| --- | --- |
| HTTP or event service | Cloud Run service or Cloud Run functions as appropriate. Check ingress, invoker policy, runtime port, timeout, CPU/concurrency, scaling and VPC egress. |
| Finite work, scheduled task or pull consumer | Cloud Run Jobs for finite work, Cloud Run worker pools where available for continuous pull work, or GKE/Compute Engine for requirements outside the runtime contract. Verify job exit, retry behavior and scaling mechanism. |
| Kubernetes, custom compute or batch | GKE, Compute Engine managed instance groups or Batch. Check cluster/network context, workload identity, capacity, zonal failure and execution model. |
| Data and integration | Evaluate Cloud SQL/AlloyDB, Spanner, Firestore, Cloud Storage, Pub/Sub, Cloud Tasks and Eventarc as needed. Verify authenticated connectivity, connection limits, location and restore. |

## Establish access

Get project ID and, when needed, number, organization/folder or billing owner, region, enabled APIs, service and Artifact Registry IDs, network and service account identifiers. For interactive CLI access, the human completes the approved `gcloud auth login` flow. Verify `gcloud auth list --filter=status:ACTIVE`, then read the exact resource with `--project` and `--region` as applicable. Check impersonation and quota project when relevant. CLI login and Application Default Credentials (ADC) used by SDKs or IaC are distinct. Prove the identity through the same credential path the operation will use.

Use Workload Identity Federation for external CI where available, with claim conditions and a dedicated deployer or scoped service account impersonation. A federation pool or deployer can live in a different project from the workload. Set the deployment project explicitly in the auth action and deployment commands, then verify the effective principal and resource target separately. Limit `iam.serviceAccounts.actAs` to the runtime identities needed. Separate source-build, registry, service agent, deployer and workload permissions. Verify Secret Manager access and private connectivity from the actual service identity.

## Release and MCP

Use a pinned Artifact Registry image. On an existing Cloud Run service, prepare a revision without production traffic where suitable, check an authenticated tagged revision with the intended configuration, then set and verify revision weights. Capture the previous mapping and verify traffic after any rollback. Job executions and worker-pool revisions have separate controls. For a long-running migration, persist the Cloud Run Job execution ID and project/region and monitor that execution independently of the CI job. After a runner timeout, inspect execution status and the migration ledger before starting another execution. Use Cloud Logging, Cloud Monitoring and Cloud Audit Logs as authorized. Validate ingress and invoker policy independently before any public exposure.

Google publishes **product-specific remote MCP servers**, including Cloud Run and GKE. Select the current endpoint and release status from the catalog. For Cloud Run, the documented global endpoint is `https://run.googleapis.com/mcp`. Check enablement, OAuth scope, IAM and project/region before configuring the client. Prefer a read-only scope for inventory and verify the actual toolset. Use `gcloud`, Cloud Build/Cloud Deploy, or IaC for repeatable writes and unsupported actions.

[Google authentication](https://docs.cloud.google.com/docs/get-started/authentication) · [CI federation](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines) · [Cloud Run container contract](https://docs.cloud.google.com/run/docs/container-contract) · [GitHub auth action](https://github.com/google-github-actions/auth) · [Cloud Run Job execution](https://docs.cloud.google.com/run/docs/execute/jobs) · [Cloud Run IAM](https://docs.cloud.google.com/run/docs/reference/iam/roles) · [Cloud Run traffic and rollback](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration) · [Google Cloud MCP catalog](https://docs.cloud.google.com/mcp/supported-products) · [Cloud Run MCP](https://docs.cloud.google.com/run/docs/use-cloud-run-mcp)
