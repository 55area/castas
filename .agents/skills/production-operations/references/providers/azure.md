# Microsoft Azure

## Match the workload

| Workload | Candidates and decisive checks |
| --- | --- |
| Container API, worker or finite task | Container Apps for services and continuous consumers, Container Apps Jobs for finite work. Check ingress, probes, revisions, scaling triggers, execution history and private networking. |
| Web PaaS, .NET or other supported web runtime | App Service code or container deployment. Verify OS/runtime support, plan and deployment slot availability, sticky configuration, identity and warm-up. |
| Event or timer workload | Azure Functions. Verify hosting plan, duration, triggers, scale and shared storage behavior. |
| Kubernetes, Windows/Linux host or batch | AKS, Virtual Machines/scale sets, or Azure Batch. Check workload identity, routing, OS requirements, capacity, host access and patching. |
| Data and integration | Evaluate Azure Database for PostgreSQL, Azure SQL, Cosmos DB, Storage, Service Bus and Event Grid as appropriate. Verify private endpoint DNS and network access from the actual runtime. |

## Establish access

Get Entra tenant, subscription, region, resource group, resource IDs, registry, network/DNS and managed identity identifiers. For interactive access, the human completes `az login --tenant TENANT` in the approved execution environment or uses its approved identity broker. Verify `az account show --subscription SUBSCRIPTION --query '{id:id,tenantId:tenantId,user:user.name}'` and read a known resource in the scoped group. Pass subscription explicitly to resource commands. Inspect Azure Policy, resource locks and required resource provider registration through the established bootstrap path.

Use an Entra workload federation relationship for a CI service principal or user-assigned managed identity where supported, with narrowly scoped Azure RBAC. For GitHub Actions, hand off the tenant, subscription and client IDs and the protected environment or ref matched by the federated credential. Use managed identities for runtime and registry pull where supported. Control-plane resource access, data-plane access and access to Key Vault secrets are separate decisions. Grant the deployer attachment rights to the selected identity only where needed.

## Release and MCP

Promote an immutable ACR or approved registry artifact. For Container Apps, check single/multiple revision mode and configured traffic before the change. In multiple revision mode, verify named revision or label on a test path, then the effective traffic split and ready replicas. Treat application-wide configuration and secret changes separately from revision traffic. For App Service, confirm slot settings, network and identity behavior, warm up, test and swap under the supported plan. For jobs, verify the execution and business effect, and restrict job-start rights with access to overrides in mind. Use Azure Monitor/Application Insights or the project's stack and Azure Activity Log for control-plane evidence.

Microsoft's **Azure MCP Server** supports developer credential discovery, including Azure CLI, and scope controls such as read-only mode and tool/namespace filtering. Verify which credential won the chain and inspect the current service-specific tool list. For example, the documented Container Apps tool lists apps. Use `az`, Bicep/ARM, IaC or CI for deployments outside the installed tool set. Retain high-risk confirmations and avoid secret-reading tools for ordinary deployment inspection.

[Azure CLI authentication](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli) · [GitHub Actions and Entra federation](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect) · [Container Apps revisions](https://learn.microsoft.com/en-us/azure/container-apps/revisions) · [Container Apps jobs](https://learn.microsoft.com/en-us/azure/container-apps/jobs) · [App Service deployment slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots) · [Azure MCP tools](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/tools/) · [Container Apps MCP tool](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/tools/azure-container-apps)
