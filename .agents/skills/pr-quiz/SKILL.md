---
name: pr-quiz
description: Create or regenerate a decision-comprehension quiz for a GitHub pull request when explicitly requested. Use for PR quizzes or their optional grading workflow; not code review, security assessment, test validation, or automatic action after creating a PR.
license: MIT
metadata:
  version: "1.3.0"
---

# PR Decision Quiz

Create a review aid about this PR's important design decisions and tradeoffs. This skill owns the quiz artifact only. Use `peer-review` for defect/test-effectiveness assessment and `cybersec` for security assessment; a correct quiz answer is not an independent review, authorization check or proof of software quality.

## Scope and authority

Do not activate merely because a PR exists or was just created. Use only when the user requests a quiz, regeneration or quiz-workflow setup. A request to draft questions permits a local draft/preview, not PR edits, comments, CI installation or branch-protection changes. When publishing is requested, publish the concrete quiz after local validation; do not ask for the same authority again. Work in the target repository and resolve this package's script/assets relative to its actual installed directory.

Never create a PR as a side effect. Resolve the requested number/repository or use `gh pr view --json number,title,baseRefName,headRefName,headRefOid,url` in the actual target checkout. Capture the repository, PR number and full head SHA, then read that revision’s diff and relevant owning contracts. If the requested PR or source is unavailable, report that limit rather than inventing questions.

## Write useful questions

Select the consequential decisions: responsibility boundaries, data ownership, caching/retry/offline policy, DI/navigation wiring, compatibility, rejected alternatives and consumer impact. Scale question count to meaningful distinct decisions (the helper supports 1–10); do not add trivia to reach a quota. Use the current source/diff as evidence; mark an intended-but-unimplemented decision as such rather than teaching the wrong implementation as correct.

Prefer four plausible options of similar length, with exactly one defensible correct answer and a short explanation. The helper accepts 2–6 options for existing callers. Do not test syntax, exact constants, naming trivia, private function control flow or unsupported general knowledge. If two answers are reasonable, clarify the decision or omit the question. If defects are found, report/route them; never disguise a blocker as a comprehension exercise.

Write local JSON with unique object-field names. Duplicate `questions`, `correct` or other fields are ambiguous and the helper rejects them before any GitHub call; reconcile the intended question/key rather than relying on the parser's last value.

Example:

```json
{
  "questions": [
    {
      "question": "Why is refresh status separate from the stored notes stream in this change?",
      "options": ["To retain saved notes when refresh fails", "To bypass storage errors", "To treat any timeout as success", "To make authorization a UI-only check"],
      "correct": 0,
      "explanation": "The UI observes saved records while refresh has its own pending/error outcome."
    }
  ]
}
```

This example is illustrative; use the actual PR's contracts and less obvious distractors where appropriate. Do not place secrets or private records in questions/explanations. The JSON, PR key and failure explanations disclose the answer; base64 is encoding, not secrecy.

## Preview and publish

From the target repository, substitute the installed skill path and actual PR number:

```sh
python3 /installed/path/pr-quiz/scripts/publish_quiz.py 123 /tmp/quiz.json --dry-run
python3 /installed/path/pr-quiz/scripts/publish_quiz.py 123 /tmp/quiz.json \
  --repo OWNER/REPO --head "$REVIEWED_SHA"
```

Dry-run is local and does not call GitHub. Publishing needs Python, `gh`, a resolved target repository and its actual write permission. Set REVIEWED_SHA to the full head SHA used to draft the quiz. Use HOST/OWNER/REPO for a GitHub Enterprise host when applicable. The script preserves surrounding PR text and replaces exactly one well-formed quiz block; a regenerated ID invalidates earlier quiz passes. Report the PR URL and question count, without displaying the key as an answer aid.

## Optional grading workflow

Only when setup is requested, inspect [the workflow template](assets/pr-quiz.yml) and adapt it to the target repository's policy. It belongs in `.github/workflows/pr-quiz.yml` there, not as an active workflow in this skill repository. The template handles PR metadata and answer comments through trusted base/default-branch code; it never checks out or executes PR-head code. Do not add head-code checkout, dynamic action code or secrets to this metadata workflow.

The asset pins the official [`github-script` v9.0.0 release](https://github.com/actions/github-script/releases/tag/v9.0.0) to its full commit identity. Check supported runner/runtime and organization policy before adopting or updating it; the action's [migration notes](https://github.com/actions/github-script#breaking-changes) describe Node 24 and runner requirements. Preserve literal rendering of questions/explanations and the separation of bot control markers from editable PR text. Review dependency updates; an immutable pin alone does not establish that its contents are safe. See [GitHub's secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use).

A pass is bound to the quiz ID, question/option/key content and current PR head SHA. For checkbox grading, the edit must belong to that head and quiz. For comment grading, copy the current command from the pending status and replace its option letters. The command includes a revision token that changes with the quiz content or head. Earlier bare commands are ignored by this workflow version. Regenerate malformed quizzes with the publisher. Ticking boxes or editing text outside the quiz leaves its identity intact. Authors are disallowed by default. Requested individual reviewers or prior reviewers are recognized by the template; team-reviewer and custom-role policies require an explicit adaptation. This is an educational convenience, not a tamper-proof approval system: PR content/answers are editable and the key is public. Enforce genuine review requirements independently.

For answer comments, verify the current token and sender eligibility before writing a status or result comment. Ignore stale, bare or ineligible submissions without changing the quiz result. PR metadata events still refresh status when the quiz is missing or malformed. Past reviewers include users who submitted a review, and the quiz eligibility rule is informational. The publisher pins the resolved PR URL and rechecks its head and body before editing. It confirms the head and quiz block after writing. Inspect an unconfirmed write before retrying. GitHub can still receive a concurrent update between the final read and the write, so coordinate with other body editors when needed. For a material handoff, retain the PR/head, quiz ID, draft versus published state and actually tested workflow scope. Keep code and security verdicts with their respective review workflows.

The workflow posts a result comment/status only after the user has authorized installing this behavior. Keep the quiz status informational. GitHub commit statuses are keyed by repository, SHA, and context. Two PRs sharing a head SHA can display the same status, and GitHub can coalesce or delay workflow events. Use the separate review requirements for merging. For fork PRs, use the trusted metadata-event setup without running untrusted head code; private/fork token permissions and organization policies must be checked in the real environment. An API failure or unsupported configuration remains an unverified gate, not a pass.

The template reads pull requests/reviews and writes issue comments and commit statuses; it needs no repository-content write permission or PR-approval permission. Check the target environment's actual [comment API permissions](https://docs.github.com/en/rest/issues/comments#create-an-issue-comment) rather than broadening all token permissions after an API failure.

Inspect current GitHub documentation for changes to event/permission/ruleset behavior: [workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), [commit statuses](https://docs.github.com/en/rest/commits/statuses), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
