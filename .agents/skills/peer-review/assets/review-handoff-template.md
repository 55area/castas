# Independent Peer Review Handoff

Use this packet to request a fresh review. Replace placeholders; do not send the implementer's full conversation or hidden reasoning.

- **Goal:** [User outcome and intended behavior]
- **Review target:** [PR / exact base and head / local snapshot / explicit files or snippet; state when history is unavailable]
- **Source access:** [Repository or workspace and how the reviewer obtains the actual content, including uncommitted files]
- **Scope and exclusions:** [Included work and limits]
- **Requirements and invariants:** [Authoritative text or accessible paths/IDs; note any missing specification]
- **Accepted design and constraints:** [Relevant decisions, platform versions, compatibility, and operational needs]
- **Material mechanisms and tradeoffs:** [State/data authority, retry/fallback strategy, dependency lifetimes, changed consumers and relevant rejected alternatives; link evidence and keep author explanations distinguishable from verified facts]
- **Change map:** [For cross-file work, which parts must be read together and how input, transformations, effects and consumers connect; reconcile with the actual diff]
- **Repository guidance:** [Applicable conventions and actual validation commands]
- **Review policy and depth:** [Trusted policy source/revision, scoped rules, and agreed depth]
- **Verification evidence:** [Applicable required gates and selected checks, artifact/revision, results and unmet gate consequences; distinguish independently observed, matching CI and author-reported evidence]
- **Review focus:** [Backend / frontend / Android / test effectiveness / mixed surfaces and specific risk areas]
- **Execution boundaries:** [Accessible references, inspection-only or executable checks, disposable environments, time/cost limits, and restricted side effects]
- **Reviewer/model:** [Explicit selection if provided; confirm availability through the host]
- **Previous findings:** [Only for a re-review, including disputed claims and evidence]
- **Review and integration coordination:** [When relevant: known owners or unresolved ownership, related changes/base revisions, shared decisions, integration procedure, pending evidence and next action; distinguish branch checks from combined-state checks]
- **Output:** [Requested report contract or the bundled report template]

Review independently using the actual source, caller/consumer context, requirements, and tests. Stay within the agreed target. Validate reachable triggers and consequences, separate defects from questions, and report verification limitations. Do not edit the reviewed source or post a remote review unless separately authorized. If you already are the assigned reviewer, review directly rather than delegating again. Return a clear verdict and coverage statement; an empty finding list is valid when supported by completed review.
