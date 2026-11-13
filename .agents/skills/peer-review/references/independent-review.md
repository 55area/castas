# Independent and Multi-Model Review

## Establish independence

Use a reviewer that did not implement the change, with fresh task context. The implementer may prepare a factual packet, but its summary and test claims are inputs to verify. Give the reviewer access to the actual source and contracts, not just an explanation of why the author believes the patch is correct.

Use the available orchestration mechanism within its permission and cost limits. Do not create user-visible chats, send messages to other chats, or select a different model without the host's required user authorization. When no independent execution is available, prepare a portable handoff for a separate session. A self-review can proceed when allowed, but must be labeled and cannot silently satisfy a required independent-review gate.

If this session is already the independently assigned reviewer, perform the review directly. Do not recursively create reviewers. Multiple independent lenses are useful for high-risk or mixed-domain changes when justified and allowed; they are not a required ceremony for every patch.

## Handoff packet

Use the handoff template linked directly from `SKILL.md` as an output aid. Include:

- Exact target and source access: repository, base/head or local snapshot, relevant files, and exclusions. A SHA alone does not transfer uncommitted files.
- User outcome, scope, accepted constraints, requirement and invariant IDs, and authoritative contract locations.
- Relevant repository conventions, runtime/framework versions, platform support, and known operational context.
- Review-policy source/revision and execution capabilities, including whether linked references and local checks are available.
- Available verification evidence, labeled as executed, CI-reported, or an unverified author claim.
- Review focus, output format, independence requirement, allowed checks, time/cost limits, and escalation point.

Omit the implementer's internal reasoning and full conversation. Accepted design rationale and relevant decisions remain useful context. Avoid anchoring prompts such as asking the reviewer to confirm a suspected bug or reassuring it that another model already approved. For a re-review, previous findings are intentionally supplied so fixes can be verified; still inspect affected paths independently.

## Select a model deliberately

Keep model selection outside the portable skill. Verify that the selected reviewer can access the source and reason about the changed domain within the available context and tools. Preserve an explicit model choice and report the actual session when known.

A fresh session of the same capable model can still be independent of the implementation session. Different models can diversify some failure modes while sharing others. Repository access, domain competence, a clear packet, and verification matter more than assigning authority based on a model name.

Fresh context means removing the implementer's conversational momentum while preserving the contracts and evidence needed to judge the change. Do not use an empty-context reviewer deprived of requirements. A different vendor is an optional evaluated choice, not a prerequisite or a guarantee of finding different bugs. Challenge behavior and try to refute candidates; an adversarial lens does not justify a finding quota or presumed defects.

Distinguish a custom skill from a host's built-in review command. Codex documents `review_model` for built-in reviews and separate controls for detached review delivery. Those settings do not by themselves establish which model/context executes an ordinary `$peer-review` skill request. Verify the actual reviewer session; see [Codex review documentation](https://learn.chatgpt.com/docs/code-review?surface=app). Changing host configuration requires the user's authorization.

For model/process changes, compare the same representative review cases and track validated defects found, false positives, material misses, review time, and cost. Escalate difficult authentication/data integrity, concurrency, platform, or architectural decisions to a suitably capable reviewer. Keep the lightest arrangement that meets the project's evidence and risk requirements. Do not claim measured superiority without such a comparison.

## Synthesize multiple reviewers

Give each specialist the relevant raw material and scope before exposing it to other reviewers' conclusions. Then a coordinator validates candidates against source and contract evidence, including test-gap claims. Majority agreement is not proof; minority findings are not discarded by vote.

Normalize locations, verify reachable triggers, reject refuted candidates, record unresolved material gaps, and deduplicate by root cause. Assign severity after contextual validation. If a review lens fails, show the missing coverage rather than treating an empty output as a pass. Report a clean review only for completed agreed coverage.

## Close the loop

The implementing agent evaluates each finding and either fixes it within authorization or explains a concrete refutation/accepted trade-off. Do not blindly implement reviewer suggestions. Clarify a blocking ambiguity while continuing unrelated authorized work when safe.

Classify disagreements by consequence: a reachable contract violation or unmet required gate needs resolution; an optional style preference stays non-blocking unless a project rule makes it consequential. The implementer is not the sole authority to dismiss a demonstrated blocker as style or accept its risk. Preserve the evidence and use the project's responsible decision-maker for unresolved material disagreements.

Re-review the resulting snapshot. Mark findings `Resolved`, `Still present`, `Refuted`, or `Accepted risk` with supporting evidence and the responsible decision-maker for accepted risk. Repeat affected checks and inspect for new defects introduced by the fix. Use a stated limit or escalate a persistent disagreement instead of looping indefinitely. A review verdict never substitutes for required CI, human approval, integration checks, or deployment authority.

Read relevant replies and previous automatic findings before closing the loop. Check each claim against the latest source; a dismissed thread is not proof that behavior changed. Update the existing finding's status when possible rather than reporting the same unresolved root cause as a new issue. Keep proposed comments as drafts until publication is authorized, and verify the current repository, revision, file, and lines before posting.

### Focus the next pass

1. Identify the last reviewed snapshot and compare it with the current one. Start with open findings, the new delta and the affected guards, consumers, tests and configuration. If the earlier snapshot is unavailable, establish what can be verified on the current one and label the comparison gap.
2. Carry forward a prior conclusion only if its behavior, contracts, dependencies and evidence still apply. Expand coverage if the fix changes a shared invariant, the base or policy changes the review assumptions, or important coverage was missing. Report a newly substantiated in-scope blocker even if its line was untouched in this round.
3. Keep the same finding ID for a recurring root cause. When a fix handles one instance of a shared flaw, check sibling paths in the affected scope and record remaining instances under that finding. For example, after a tenant guard is fixed on the detail route, verify the export route if it relies on the same access rule.
4. If a blocker survives repeated passes and the latest pass adds no meaningful evidence or progress, summarize what failed, the invariant still at risk and the next decision or experiment. Hand it back to the responsible owner before another equivalent round. Honor the project's agreed limits and carry forward unresolved blockers and required gates.

## Coordinate related changes

Use for a requested batch review, related PRs, or review-process planning. An ordinary single-change review need not inventory the team's queue or open additional tasks.

- Establish each change's outcome, acceptance, exclusions and actual base/head. Identify shared behavior, contracts, state and dependencies even when the changed files do not overlap. Resolve a material shared product decision before treating dependent work as independently ready; keep unrelated review moving.
- Prefer coherent, verifiable behavior as the review unit. Suggest splitting unrelated scope when it obscures assessment, but do not impose line-count limits or fragment one behavior into many dependent PRs merely to make diffs smaller. Splitting, rewriting or rescheduling work requires the relevant authority.
- Record the known review owner, integration owner or procedure, dependency order, missing evidence and next action in the existing handoff or tracker. Keep an unknown owner explicit rather than assigning someone or inventing a commitment. Review completion, required human approval and integration readiness are distinct states.
- For queue planning, use actual reviewer capacity, risk, waiting work and project policy. Propose an agreed work-in-progress limit only when useful; there is no universal number. If an established limit is reached, prioritize existing verification and pending reviews within scope rather than automatically launching more implementation. Do not change queue policy, automation or other people's assignments without authorization.
- Evaluate a workflow experiment by time to accepted integration, review waiting time, rework and defects found when combining changes. Compare reasonably similar tasks and separate observations from causal claims. Agent activity, PR count and a small favorable sample do not establish increased productivity. Collect only available, relevant measurements; process instrumentation is not required for an ordinary review.

Return a scoped integration gap when the combined revision or required evidence is unavailable. Do not silently convert isolated approvals into approval of a later combination, or perform Git integration to manufacture missing evidence.
