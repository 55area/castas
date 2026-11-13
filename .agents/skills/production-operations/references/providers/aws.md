# AWS

## Match the workload

| Workload | Candidates and decisive checks |
| --- | --- |
| Short HTTP or event handler | Lambda with API Gateway, ALB, or event source as appropriate. Verify timeout, concurrency, retry and payload limits, and whether downstream connections survive scaling. |
| Container API or worker | ECS on Fargate or EC2, including ECS Express Mode where its service model fits. Use an ALB/NLB appropriate to the protocol. Check startup, health, target deregistration, networking, capacity and task placement. Verify current App Runner eligibility for any existing App Runner footprint. |
| Kubernetes, custom OS or specialized batch | EKS, EC2/Auto Scaling or AWS Batch. Check cluster identity, node/fleet capacity, image architecture, network path and retry semantics. |
| Data and integration | Evaluate RDS/Aurora, DynamoDB, S3, SQS/EventBridge, or managed brokers according to the contract. Verify private routes, service endpoints or NAT, DNS, quotas, and restore separately. |

## Establish access

Get account and partition, region, named profile or assumed role, registry/repository, VPC/subnets/security groups, resource IDs, and DNS ownership. A human can sign into IAM Identity Center with `aws sso login --profile PROFILE` after the SSO profile is configured. For a new profile, obtain the SSO start or issuer URL, SSO region, assigned account and permission set from the organization. Verify the actual runner with `aws sts get-caller-identity --region REGION` and a scoped resource read. Add `--profile PROFILE` when the deployment uses that profile. A federated CI job can receive temporary credentials through its environment. Check the returned account and ARN. CLI environment overrides and IaC provider/backend identities may differ.

Use CI federation to assume the deployment role, scoped to the trusted issuer/audience and repository/environment subject. Limit `iam:PassRole` to intended identities and services. In ECS, the task execution role handles platform operations such as pulling images and delivering logs, and the task role covers application AWS API calls. Scope Lambda execution roles, EKS workload identities, migration access, and Secrets Manager/Parameter Store and KMS rights separately as applicable.

## Release and MCP

Publish immutable versions or ECR image digests. For ECS, register a task definition revision, inspect deployment strategy and target health, then verify the running task definition and image digest as well as the live API. Verify deployment failure detection configuration and the existence of a previously completed deployment before relying on automatic rollback. For Lambda, verify that callers or event sources invoke the intended alias/version before relying on weighted alias routing. Check asynchronous consumers separately. Use CloudWatch and CloudTrail for bounded signals and audit evidence.

The managed **AWS MCP Server** offers documentation and authenticated AWS API tooling. AWS documents OAuth for supported clients on regional endpoints such as `https://aws-mcp.us-east-1.api.aws/mcp` and a SigV4 proxy that uses AWS credentials, with a read-only option for the proxy path. Verify the supported endpoint and downstream IAM action scope. MCP region and workload region can differ. Use AWS CLI/API or the existing IaC/CI system for reviewed deploys and unsupported actions.

[AWS CLI SSO](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) · [ECS deployment failure detection](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-failure-detection.html) · [App Runner availability](https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html) · [AWS MCP setup](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/getting-started-aws-mcp-server.html) · [AWS MCP and IAM](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/security_iam_service-with-iam.html)
