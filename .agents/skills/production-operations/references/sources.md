# Production Operations sources and provenance

Prepared on 2026-11-10. The workflow, provider guides and examples are original English synthesis. No external skill, deployment script or provider template is bundled.

| Source | Use in this package |
| --- | --- |
| OpenAI's installed Skill Creator and Matt Pocock's [Writing for Agents](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) | Authoring methods for a compact entrypoint, conditional references, observable outcomes and validation. The Matt Pocock material is linked as authoring guidance. See the [upstream MIT notice](https://github.com/mattpocock/skills/blob/main/LICENSE). |
| This collection's PentaPRO, Software Delivery, Git Delivery, Cybersecurity and Diagnose Defect | Ownership boundaries and handoff to existing specifications, delivery, security and defect workflows. Each package retains its own provenance. |
| Provider documentation in the [AWS](providers/aws.md), [Azure](providers/azure.md), [Google Cloud](providers/gcp.md), [Cloudflare](providers/cloudflare.md) and [VPS](providers/vps.md) guides | Candidate deployment models, identity, release and recovery semantics, and current official MCP options. Verify the exact service, plan, region, version and feature availability for a real target. |
| [GitHub OIDC](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers), [Terraform plans](https://developer.hashicorp.com/terraform/cli/commands/plan), [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) and [Docker Compose](https://docs.docker.com/compose/how-tos/production/) | Short-lived CI access, reviewed infrastructure changes, workload rollout and host delivery controls. |
| [Google SRE Workbook](https://sre.google/workbook/table-of-contents/), [AWS reliability guidance](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html) and [OpenTelemetry security](https://opentelemetry.io/docs/security/) | Baseline and canary evidence, incident roles, recovery tests and telemetry protection. |
| [Model Context Protocol security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) | Tool trust, authorization and token boundaries. |

Linked materials retain their own licenses and terms. Documentation review establishes the cited behavior at the documented scope. Live login, deployment, telemetry and recovery require actual target-specific evidence.
