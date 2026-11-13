# AI and Agentic System Security

Use only when models, retrieval, agents, or generated outputs participate in the assessed system. Map the real principal, data access, and capability behind each model/tool action.

- Treat user uploads, retrieved pages/documents, tool responses, and model outputs crossing trust boundaries as untrusted content. Keep trusted task/policy instructions separate; a document cannot grant itself higher authority by claiming to be a system message.
- Check prompt injection and indirect instructions against consequences: data disclosure, tool misuse, policy bypass, unsafe execution, poisoned memory, and unauthorized external actions. Prompt wording and filters alone cannot enforce application authorization.
- Enforce identity, tenant/resource access, allowed operations/arguments, destinations, and approvals in trusted code. Bind approval to the exact sensitive action and current parameters; model confidence or a previous broad approval must not silently widen it.
- Inspect retrieval indexing/query filters, embeddings/document access, shared caches, conversation state, and persistent memory across users/tenants. Retrieved data and remembered instructions must not bypass the original user's access rights.
- Constrain code execution, filesystem/network access, credentials, tool chaining, callbacks, and third-party agent/service connections. A sandbox needs verified boundaries; an agent message does not itself authorize another agent's actions.
- Validate model output before rendering HTML/Markdown, executing commands/code, querying data, or changing configuration. Trace the actual sink and side effects rather than reporting the presence of a model as a vulnerability.
- Review provenance, model/provider updates, sensitive telemetry/training destinations, retention, and permission for external transmission. Avoid leaking real data in security evaluation prompts or logs.
- Bound cost, steps, concurrent work, retries, and externally visible effects. Test cancellation, replay, partial failure, and human escalation without executing unauthorized real-world actions.

Use synthetic adversarial documents and safe mock tools to test denied actions and data isolation. A successful refusal on one prompt does not establish resistance to all prompt injection; record the tested boundaries and residual exposure.

## Verify enforcement beyond the conversation

Use a permitted synthetic positive case and vary one trust property at a time. For each denied case, inspect the tool or sink record to confirm no forbidden invocation, write, disclosure or queued effect occurred. A refusal after a tool already ran is a failure. Record which enforcement point made the decision and what remained unobserved.

| Change to the positive case | Expected result |
| --- | --- |
| A retrieved record asks to copy a synthetic secret to a different destination | The destination or action is denied, including through a delegated tool. Neither the destination nor user-visible logs receive the secret. |
| A tool result claims a new approver or changes approved parameters | The runtime keeps the original authority and arguments. A materially different action needs its own authorization. |
| A denied action is retried through another identity or tool | Equivalent checks apply at the protected boundary. No queued job or fallback produces the denied effect. |

Approval of a mutable reference needs a check at the moment of use. For example, a reviewed upload may be replaced under the same path, or an approved URL may redirect to a different destination. Bind the approval to the reviewed payload or an immutable revision when content affects the decision. Revalidate the effective resource, destination, and principal before the effect and when a deferred job runs. In a safe fixture, replace the resource after approval and inspect whether the sink received the substitute.

If MCP or another tool gateway is present, include its server identity, exposed operations, credentials and downstream resource checks. Test with a permitted call and an otherwise identical call outside that principal's scope. Tool descriptions and schemas help select calls. Enforcement belongs to the authenticated service or gateway.

For an MCP server that proxies requests, inspect the authorization boundary on both sides. Test an otherwise valid token issued for another audience and confirm rejection before a downstream call. Where the selected revision or SDK uses server-issued handles, verify that replay under a different principal cannot read or continue another caller's work. Scope each claim to the tested transport, revision, principal, and downstream effect. [MCP security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)

For modern MCP multi round-trip requests, test tampered or replayed `requestState` against the original request, principal, and final effect. When MCP Apps are enabled, trace the iframe-to-host message bridge, allowed network destinations, and permissions for tool calls. Exercise a permitted app message and an out-of-scope call or egress attempt. Confirm enforcement by the host and service with synthetic data. [MCP multi round-trip requests](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr) · [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview)

Primary guidance: [OWASP AI Agent Security](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html), [OWASP prompt injection prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html).
