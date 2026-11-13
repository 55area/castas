# DevOps, Supply Chain, Cloud, and Workloads

Follow the actual source → dependency resolution → build → artifact → promotion/deployment chain. Identify who can change each stage, which identity executes it, and which environment/data that identity can reach.

## Source and build integrity

- Inspect manifests, resolved dependencies, registry sources, install/build hooks, external actions, generated artifacts, and update policy. Use ecosystem-appropriate lockfiles/resolution and reproducibility controls according to package/artifact type and repository policy. Missing a particular lockfile is not universally a finding.
- Pin sensitive build inputs to reviewed immutable identities/digests where supported. Also verify origin, integrity, permissions, and an update process; a pinned malicious dependency remains malicious. Private registries do not establish trust by themselves.
- For a new dependency, compare the resolved coordinate, publisher and registry with the expected upstream project or approved internal source. A plausible package name can be invented, a lookalike, or resolved from the wrong registry. Verify provenance before running its installer or hooks.
- Trace untrusted pull requests, workflow triggers, checkout refs, runner isolation/persistence, caches, artifacts, and script execution. Code from an untrusted contribution must not acquire release secrets or privileged credentials merely through a trusted workflow context.
- Trace metadata copied into bot comments, reports and artifacts as well as executable code. Escape it for the actual rendering sink and keep user text separate from machine-readable approval/control markers. A trusted bot repeating an attacker-supplied marker must not turn that text into an attestation. Cache passes against the exact artifact/revision and relevant policy identity, not an arbitrary substring in any bot message.
- Constrain workflow/job/token permissions, deployment environments, federated OIDC issuer/audience/subject conditions, branch protections, reviewers, and promotion rules. Validate the identity and source actually deployed, not only the source originally reviewed.
- For signatures, SBOMs, and provenance, verify artifact identity, expected trusted signer/builder, source revision, build parameters, and policy at consumption/promotion. Producing an attestation is not evidence it was enforced.

## Configuration, infrastructure, and isolation

- Read IaC, plans, effective policy, and deployment records as distinct evidence. Match cloud provider, account/project/tenant, region, and service versions; do not assume desired configuration proves deployed state.
- Inspect least-privilege IAM, federation/workload identity, administrative recovery, public/cross-account access, storage/database exposure, secret stores, KMS/key permissions, metadata-service reachability, and audit controls.
- Trace ingress/egress, remote administration, internal service identity, DNS/TLS, shared credentials, and lateral movement. Network placement and microservice boundaries do not prove isolation.
- For containers, assess actual user/capabilities, privileged mode, mounts/host access, image origin/update support, writable paths, syscall/MAC policy, and resource limits. Match controls to the application; non-root, containers, sandboxes, VMs, and microVMs each have limits.
- For Kubernetes, inspect RBAC, service-account tokens, admission/pod policy, secrets, control-plane access, node privileges, and network-policy enforcement by the actual CNI. A declared policy without enforcement or correct selectors may not isolate workloads.
- Include operational ownership, alerts, rollback/roll-forward, restoration, and compromised-build/credential recovery. Test what the affected security boundary requires rather than declaring readiness from a successful deployment.

Assessment commands must not apply IaC, create/delete resources, change IAM/firewalls, push images, retrieve live secrets, or contact shared clusters outside authority. Use static validation, plans with understood effects, or disposable authorized environments. Missing live access limits conclusions about effective configuration.

Primary guidance: [SLSA](https://slsa.dev/), [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use), [AWS IAM practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html), [Kubernetes security checklist](https://kubernetes.io/docs/concepts/security/security-checklist/). Use equivalent primary guidance for the actual provider/toolchain.
