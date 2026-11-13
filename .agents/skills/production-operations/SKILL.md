---
name: production-operations
description: Plan, configure, deploy, verify, operate, or recover a hosted backend. Use for cloud or VPS infrastructure, deployment pipelines, runtime identities, rollouts, database cutovers, observability, or operational incidents.
license: MIT
metadata:
  version: "1.0.1"
---

# Production Operations

Carry a backend revision from its source and operating contract to evidence from the target environment. Use English for durable artifacts and the user's language for conversation. Reuse project-owned requirements, infrastructure, workflows, and evidence.

| Request | Result |
| --- | --- |
| Plan or compare | Workload fit, architecture and cost assumptions, access handoff, implementation sequence, checks, and recovery path. |
| Configure or bootstrap | Reviewable IaC and pipeline changes, validated configuration, and any separately authorized bootstrap results. |
| Deploy or cut over | Exact artifact and target, planned traffic/data changes, execution record, and observed service behavior. |
| Observe, mitigate, restore, or retire | Scoped observations or an authorized operation, effect verification, and unresolved risks with an owner. |

A plan or configuration request stays within that scope. Verify the target and authority for live writes, paid resources, public exposure, shared IAM, secrets, traffic, and data changes. An explicit deployment request can authorize its necessary effects within established scope and policy. Clarify only consequential gaps and continue independent work. Never solicit raw credentials in chat or print them into tool output. Verify the principal and target in the actual execution environment before using it. [Access and MCP](references/access-and-mcp.md)

1. **Identify the target and baseline.** Read deployment manifests, CI/CD triggers, contracts, migrations, topology, and runbooks. Resolve the environment, account, region or host, resource and revision, dependency and data boundaries, budget, exposure, and recovery expectations. Inspect the live baseline when authorized. Treat observed resources, declared IaC, and desired changes as separate states. Use [workload selection](references/workloads.md) for a new target or an uncertain fit.
2. **Establish access and a reversible sequence.** Scope human bootstrap, pipeline, runtime, and observation identities separately. Identify state ownership, expected resource changes, data compatibility, concurrency, verification and stop signals, and the viable recovery action. Reuse the [deployment brief](assets/deployment-brief.md) when a durable handoff is needed.
3. **Build and validate.** Use the project's tools. Pin the artifact to a commit and immutable version, scope secrets and permissions, and review infrastructure changes and workflow triggers before activating them. Exercise representative behavior in a safe environment. [Pipelines and infrastructure](references/pipelines-and-infrastructure.md) · [Data changes](references/data-changes.md)
4. **Execute authorized effects and verify.** Apply a reviewed change to the verified target and reconcile asynchronous or ambiguous outcomes before retrying. Observe the served revision, critical paths, data effects, and health signals over the agreed window. A successful deployment job only establishes what it actually observed. Stop promotion when the abort condition is met. Use the approved rollback, roll-forward, or containment path, and verify recovery separately. [Release and operations](references/release-and-operations.md)
5. **Close with evidence.** Record actions, revision, target, observed checks, remaining limits, and the next owner. Distinguish prepared, applied, serving, verified, and recovered. If a required check is blocked, identify the smallest step that would supply evidence. Reuse PROOF and PRODUCTION when PentaPRO governs the project. [Evidence and runbook template](assets/operations-record.md)

## Select the provider guide

- [AWS](references/providers/aws.md) for accounts, IAM, Lambda, ECS, EKS, EC2, and managed dependencies.
- [Azure](references/providers/azure.md) for Entra, Functions, Container Apps, App Service, AKS, and VMs.
- [Google Cloud](references/providers/gcp.md) for projects, Cloud Run, GKE, Compute Engine, and managed dependencies.
- [Cloudflare](references/providers/cloudflare.md) for Workers, Containers, bindings, edge ingress, and Tunnel.
- [VPS](references/providers/vps.md) for SSH, host provisioning, single-host or multi-host operation, and vendor APIs.

For a mixed deployment, verify each control plane and the boundary between them. Other providers can use the same workflow with their own current documentation and a verified mapping of identity, runtime, artifact, networking, storage, and release behavior.

PentaPRO owns the specification, Software Delivery coordinates dependent application changes, Git Delivery publishes Git changes, Cybersecurity owns security assessments, and Diagnose Defect investigates causes. Production Operations owns deployment and operational effects. The project's authorization and existing records govern all of them.

[Worked examples](references/worked-examples.md) for a managed API with a migration or a VPS behind Cloudflare.

[Source and provenance notes](references/sources.md)
