# IT Operations, Identity, Networks, and Recovery

Use the actual organizational boundary, asset inventory, data sensitivity, supported lifecycle, and authorized access. A repository may document these controls without proving they are operating.

- Identify owners of endpoints, servers, SaaS, directories/identity providers, management systems, network devices, backups, and suppliers. Check missing assets, unsupported software, patch/configuration drift, and the path from inventory to remediation.
- Trace joiner/mover/leaver access, privileged accounts, service identities, federation, MFA/recovery, emergency access, supplier access, and session/credential revocation. Examine who can reset identity or change policy, not only the normal login flow.
- Inspect endpoint/server baseline hardening, local administrator rights, remote-management tools, disk/key protection, update delivery, application controls, malware detection, and lost-device response as applicable. A configured endpoint agent is not evidence of healthy coverage or effective alerts.
- Review exposed management interfaces, remote access/VPN, network segmentation, service identity, DNS/email controls, and inbound/outbound restrictions. Test lateral-movement assumptions against actual routes, credentials, and policy enforcement; an internal network is not an authorization boundary.
- For email and collaboration risks, assess phishing-resistant access/recovery and suspicious-action reporting appropriate to the environment. Do not send phishing simulations or test staff credentials without explicit target/method authorization.
- Trace sensitive data through SaaS shares, exports, endpoints, logging, storage, retention/deletion, encryption/key access, and third-party access. Record applicable obligations and responsible owners rather than asserting legal compliance.
- Examine logging integrity, alert delivery/triage ownership, evidence access/retention, containment plans, incident communications, and reporting/escalation. If active compromise is suspected, preserve available evidence and state limits; do not rotate, shut down, delete, or disclose incident material outside authority.
- Verify protected/isolated backups, restoration evidence, recovery objectives, and recovery when identities, CI, or management systems are compromised. A backup-success message alone does not establish restorability.
- Use bounded tabletop exercises and authorized alert/restore checks when useful. Track accepted risks with actual decision authority, compensating controls, and a review trigger.

Use NIST CSF outcomes to organize relevant Govern, Identify, Protect, Detect, Respond, and Recover coverage. This is a tailoring aid, not a certification or exhaustive technical checklist. Read-only policy review and inaccessible operational evidence must remain distinguishable.

Primary guidance: [NIST CSF](https://www.nist.gov/cyberframework), [NIST incident response](https://csrc.nist.gov/pubs/sp/800/61/r3/final), [CISA Secure by Design](https://www.cisa.gov/securebydesign).
