# VPS and self-managed servers

## Match the host and process model

Use a supported OS/architecture and a reproducible host setup, with systemd or the existing service manager for binaries or Docker Compose for a small containerized stack. Use a managed database or off-host backups and a proven restore path for persistent state. Confirm CPU/memory/disk limits, filesystem/volume behavior, reboot and recovery console access, monitoring and patch windows. Choose multiple hosts, an external load balancer and appropriately redundant data only where the availability target calls for them. Apply the same host procedures to cloud VMs, with the provider guide for their control plane.

## Establish access

Get provider account/project and instance ID for control-plane work, host/IP, SSH port, deployment user, expected host-key fingerprint from a trusted source, and VPN/bastion or restricted runner. Ask the operator to install the public key or issue a short-lived SSH certificate, with the private key remaining in the approved SSH agent or broker. Use strict host-key verification. Confirm identity with `id`, host with `hostname`, and target service with a scoped read. Compare the provider instance ID where possible. Keep a working session and recovery console during authorized changes to SSH or firewall policy. Never bypass verification after an unexpected key change.

Keep cloud/vendor and OS credentials separate. Scope the deploy identity to the intended release mechanism. Membership in the rootful Docker group or unrestricted sudo generally grants host-level control. Use an approved narrow deploy mechanism or rootless setup where appropriate. Protect the host against untrusted CI workloads. Restrict management and database ports. Verify public ingress, IPv4/IPv6, TLS renewal and firewall exposure, including ports published by the container runtime. Keep secrets out of Compose source and rendered logs.

## Release and MCP

Build off-host where practical. Pull a pinned digest, preserve previous manifests and artifact availability, validate target configuration without printing secrets, and deploy through the authorized runner or SSH path. Restart or replace only intended services and verify the running artifact, service supervisor state, persistence and live ingress. Check how overlapping replicas bind ports, share storage and consume queues before calling the rollout zero-downtime. A single-host restart may require a maintenance window. Keep backups off-host and test restore on another host.

A provider MCP, such as **DigitalOcean's managed remote MCP**, can support scoped inventory or vendor API operations where its catalog exposes them. Verify token scopes and resource coverage. Use the vendor CLI/API for unsupported provisioning and OpenSSH or the approved runner for guest OS work. Apply reviewed host automation for repeatability.

[Docker Compose in production](https://docs.docker.com/compose/how-tos/production/) · [Docker daemon access](https://docs.docker.com/engine/install/linux-postinstall/) · [OpenSSH client configuration](https://man.openbsd.org/ssh_config) · [DigitalOcean MCP](https://docs.digitalocean.com/reference/mcp/configure-mcp/)
