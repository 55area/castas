# Execution, isolation, and resumption

Read the branches that apply to the task. These controls do not require multi-agent execution or a new tracker.

## Workspaces and parallel tasks

Inspect the current branch, worktree identity, uncommitted work, and host-managed workspace before creating another checkout. Use isolation when needed to protect unrelated work or run incompatible experiments. Respect project/host conventions. A linked worktree shares repository configuration and hooks, and neither it nor a directory copy isolates credentials, ports, databases, or external services.

When creating a worktree is authorized, choose an unused branch and destination at the intended baseline. A location inside the project must be ignored at that exact path. Prefer an external disposable location when altering ignore rules is unnecessary. Preserve another person's worktree and never infer ownership from a directory name. If isolation is required and unavailable, report the blocked operation instead of silently operating in place. Cleanup requires established ownership and no unpreserved changes or artifacts.

Use parallel agents only when authorized and supported, and when tasks have independent outputs or explicit non-overlapping write ownership. Supply each worker the task, canonical contracts, baseline, allowed paths/actions, relevant decisions, checks, and report location. Let downstream tasks wait for their actual prerequisites. Use sequential execution when tools, shared state, or coupling make parallelism unsafe.

Inspect returned changes, not just worker summaries. Reconcile contracts and run checks on the integrated result before completion. Shared files, fixtures, databases and generated artifacts need one owner at a time. Do not automatically merge branches or delete worker artifacts. A worker cannot grant a sibling additional authority.

## Resumable automation

For a requested automated workflow, define its input and accepted output, authority, task identity, concurrency ownership, time/cost/retry limits, and terminal states. Separate pending, running, verified, failed, and waiting-on-decision work. Record the revision and evidence behind a completion claim. A previous ledger entry needs reconciliation with actual artifacts before resuming or skipping work.

Use a stable operation identity and inspect actual state after an interrupted external write before retrying. Prevent duplicate dispatch, publication, and effects. A retry limit ends with a recorded unresolved task and next action, not success. Escalate when attempts stop yielding new evidence or the authorized scope/budget is exhausted. A model's self-review cannot waive a required gate. Keep credentials in the existing secret mechanism and restrict runner access to the work it needs.

A skills installation does not provision this runtime, subscribe to events, select models, or authorize unattended publication. Configure those only for a concrete requested automation. Start with bounded representative trials and compare results before widening autonomy.

## Human-only prerequisites

Finish independent work first. Identify the exact missing action, who can perform it, its destination and observable completion signal. Check current official instructions before describing a dashboard. Let the human enter secrets directly into the intended secret store. Record names and locations, not values.

Create a reusable checklist or script only when requested or justified by repeated setup. Inspect and test its safe parts. Avoid shell interpolation of user input, preserve existing configuration, make retries safe, and place irreversible actions behind actual authorization. Report what remains unexecuted. Do not generate an interactive wizard for work the available tools can already complete.

## Improve the next run

For a requested retrospective, use the actual session/check evidence to identify the failure. Prefer fixing a missing or ineffective deterministic check over adding another instruction. Put durable project conventions in their existing home and link them from the smallest useful pointer. Change tools, hooks or pipelines only within scope, and verify a positive and negative control for a new gate. Success in one run is a candidate lesson, not a universal rule.
