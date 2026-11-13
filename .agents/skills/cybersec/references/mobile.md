# Mobile Security

For native Android credential, storage, IPC, WebView and release-control implementation details, read [Android controls](android-controls.md) selectively. This extends the same assessment/hardening workflow; it does not establish another security skill, duplicate verdict or Android-only default for other platforms.

Identify Android/iOS, actual release/debug variants, supported OS/SDK versions, entitlements/permissions, backend contracts, and the threat model for a controlled device. Use MASVS for selected controls and MASTG for relevant verification, without treating every resilience measure as mandatory.

- Map exported/inter-app entry points, deep/app/universal links, URI grants, custom schemes, intent handlers, WebViews, JavaScript/native bridges, and local services. Validate sender, arguments, ownership, and navigation at the trusted boundary; an exported entry point alone is not proof of a vulnerability.
- On Android, inspect the merged release manifest, exported components/providers, PendingIntent behavior, runtime permissions, network-security configuration, backups, signing, and debug-only controls. Match conclusions to the supported API levels and build variant.
- On iOS, inspect entitlements, URL/universal-link handling, Keychain access/sharing, app groups/extensions, data protection, ATS exceptions, and provisioning/signing settings relevant to the actual build.
- Trace credentials and sensitive data into preferences/files/databases, backups, notifications, clipboard, screenshots, crash/analytics SDKs, logs, and exports. Check key lifecycle, logout/account-switch cleanup, biometric authorization semantics, and user consent where required.
- Verify TLS trust/hostname handling and actual cleartext endpoints, not only configuration names. Inspect custom trust bypasses and debug overrides leaking into release. Pinning can address specific threats but requires lifecycle/recovery design; its absence is not automatically a defect.
- Remote resource authorization belongs in the trusted backend; hiding UI, obfuscation, device attestation, or root/jailbreak checks do not replace it. Offline resources need their own OS/process/data access policy, not an invented server requirement.
- Check offline sync/conflict behavior, replay, transaction state, delayed client upgrades, cancellation, and background work when they can duplicate privileged effects or leak data. Separate privacy requirements from a generic claim of compliance.
- Review third-party SDK permissions, data destinations, native libraries, distribution integrity, and supported update paths. Judge reverse-engineering resistance against the actual threat, not a universal rule.

Use authorized test devices/emulators and synthetic accounts. Instrumentation can install software and alter device state; repository assessment does not authorize changes to a person's device. State when evidence is static, JVM/unit-only, debug-build-only, or lacks release/device verification.

Primary guidance: [MASVS](https://mas.owasp.org/MASVS/), [MASTG](https://mas.owasp.org/MASTG/).

## Client configuration, credential lifecycle and shared implementations

Generated BuildConfig/BuildKonfig fields and values read from local.properties may keep a credential out of Git while still embedding it in the APK/framework/binary. Identify whether the value is intentionally public client configuration or a privileged secret, and what an extractor could do with it. Restrict public client keys appropriately; keep privileged authority at a trusted service. Obfuscation or CI injection does not make a packaged secret confidential.

Trace token storage through actual implementation, keys/access control, backups, retention and logout. A DataStore/Room abstraction name alone does not establish encryption or credential protection; inspect an explicit encrypted configuration if one exists. Shared KMP interfaces require independent scrutiny of Android Keystore/iOS Keychain or other actual storage implementations. Verify that logout/account switch clears the intended persisted data, in-memory auth-provider caches and pending work. An old refresh completing after logout must not restore a former session or populate the new account's cache.

For HTTP logging, inspect headers, URL/query, bodies, errors and crash collection in each shipped platform/variant. LogLevel.ALL or printStackTrace may expose bearer/refresh tokens, credentials and personal records. Header sanitization alone cannot redact body/query secrets; test with synthetic markers at the actual sink. A debug logger may still export real user data, and a shared factory may accidentally enable it in release.

For authenticated requests, parse and validate the destination scheme, host and relevant port/path under the actual service policy; string contains/prefix checks on a base URL do not establish origin trust. Check credential attachment before requests, redirects/challenges and a refresh request's recursion behavior. Bound refresh/retry storms and concurrent token rotation; examine refresh failure, session invalidation and retry of non-idempotent operations. Use the actual library/version and configured behavior rather than assuming an Auth plugin solves these controls automatically.

Check sensitive values passed in navigation arguments, saved state, preview/sample fixtures and exception text. A type-safe route can still expose caller-controlled IDs or serializable secrets. Client cancellation, local confirmation and a quiz/check status do not establish server authorization, rollback or independent security review.

Primary implementation references: [Ktor client logging](https://ktor.io/docs/client-logging.html), [Ktor bearer authentication](https://ktor.io/docs/client-bearer-auth.html), [Android hardcoded secret risks](https://developer.android.com/privacy-and-security/risks/hardcoded-cryptographic-secrets), [DataStore](https://developer.android.com/topic/libraries/architecture/datastore). Apply verified guidance to the installed version and threat model.
