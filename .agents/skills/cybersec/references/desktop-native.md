# Desktop and Native Security

Identify the actual OS, packaging/update channel, privilege levels, supported runtime, and native or hybrid framework. Local-only applications still have trust boundaries; assess the stated attacker, not an assumed web-server model.

- Map untrusted documents, archives, project files, URLs, plugins, clipboard/import channels, local listeners, protocol handlers, and inter-process messages into privileged operations. Separate ordinary user privileges from elevated helpers or system services.
- For Electron or similar hybrids, inspect renderer isolation, native integration, sandboxing, preload/bridge exposure, navigation/window creation, and remote content. Validate IPC sender/frame identity, arguments, resource ownership, and permitted operations in the privileged process. Context isolation alone does not make an arbitrary native bridge safe.
- Constrain file operations to authorized resources. Check traversal, symlinks/hard links, archive extraction, temporary-file permissions, command construction, and check/use races where relevant. A UI file picker does not automatically authorize arbitrary paths submitted by a compromised renderer.
- Inspect local HTTP/socket services for authentication, binding, origin/request validation, and privilege crossing. A loopback address does not establish that every caller is the intended application.
- Verify installer/helper privileges, service permissions, credential-store use, plugin loading, dynamic library/search paths, and OS protection settings. Do not assume embedded app secrets can remain confidential from a user controlling that client.
- Trace update/distribution trust: expected signer/publisher, integrity, channel, downgrade/rollback policy, and where update metadata/artifacts are validated. Signing/notarization is partial distribution evidence, not proof that code is safe.
- For untrusted native parsing, inspect memory/size/integer boundaries, ownership/lifetimes, unsafe blocks, FFI, and native dependencies. Check length arithmetic before allocation and indexing, including overflow, truncation, signedness, and units such as bytes versus elements. Follow the actual buffer size through a boundary check to its use. Favor memory-safe components when feasible without requiring an unsupported rewrite.
- Verify applicable compiler, OS, sandbox, and hardware mitigations in the actual supported build. A newer CPU or enabled mitigation does not remove every RCE path or replace patches; the original article's shadow-stack discussion concerns a limited corruption class.
- Trace local data into caches, crash reports, diagnostics, exports, and backups. State the limits of protection once the relevant OS account or host is compromised.

Use synthetic files and disposable processes for permitted checks. Do not install/update a user's active application, enable elevated services, or test privileged helpers incidentally. Source inspection and mocked bridge tests do not establish behavior of the shipped signed installer or OS sandbox.

Primary guidance: [Electron security](https://www.electronjs.org/docs/latest/tutorial/security), [Windows security API practices](https://learn.microsoft.com/en-us/windows/win32/SecBP/best-practices-for-the-security-apis), [Apple app signing](https://support.apple.com/guide/security/sec3ad8e6e53/web).
