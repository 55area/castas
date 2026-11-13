# Focused Discovery

Use when the intended outcome is unclear, answers conflict, or viable directions still need comparison. Skip renewed discovery for settled decisions and small, well-specified updates.

When the request is exploration only, keep findings and options in the conversation. If the user asks to capture them, consolidate confirmed facts, proposals, and unresolved questions into the relevant pillars. Agreement with a recommendation confirms only that decision within the user's authority. A request to create a specification already authorizes saving its drafts.

## Find the need and the next consequential question

Briefly reflect your understanding of the user, desired outcome, constraints, and exclusions. Present inferred intent as an interpretation the user can correct. A requested feature may be the right solution; investigate its purpose without assuming the user chose poorly.

Start with an open question when the underlying need is unclear. For a bounded choice, offer a short set of realistic options and explain your recommendation. Do not bias every question toward agreeing with the agent. Ask what the answer changes when that is not obvious.

Prioritize questions that change the value, scope, design or checks for the work that must be ready. Use the whole selected scope when required before coding. Ask a foundational decision alone when later questions depend on it. Otherwise batch a few independent questions. Recompute what is answerable after each round. Investigate accessible facts yourself and ask the user for consequential preferences and decisions that remain theirs.

For each question, state what depends on the answer and use a concrete scenario where it helps the user decide. Offer a supported recommendation for a real choice. When the issue is an unknown fact, ask for its source, a representative example, or a way to verify it. If an answer is unavailable, complete independent drafting and record which increment or gate the gap affects.

Turn vague qualities into examples: “scalable” needs a workload or growth scenario; “simple” needs a task the user should complete easily. Identify unacceptable outcomes even when the software technically works. Test important rules with a representative journey and a failure or boundary case, without manufacturing numeric targets.

## Build evidence before filling gaps

Read the relevant project notes, existing contracts, code/configuration, and recorded decisions before interviewing. Attribute each material claim to its source and revision/date. Separate what is observed, what a stakeholder believes, and what the agent derives. When sources disagree, identify the conflict and decision owner rather than silently treating the newest text as authoritative.

Establish who experiences the problem, their task and context, current workaround, and the evidence that this is worth changing. Ask for research only when it affects a real decision; absence of research is a hypothesis to validate, not permission to fabricate participants or findings. For proposed metrics, clarify population, definition, source, baseline availability, evaluation window, guardrails, and who will act on the result. Manual observations can be sufficient; analytics infrastructure is not a default.

Draft routine structure, requirement-derived checks, and supported facts automatically. Propose viable technical choices with rationale or make them within explicit delegation. Ask the user about missing product priorities, business rules, risk acceptance, commitments, and other consequential choices outside that authority. A proposed target stays proposed until settled; an accepted assumption still needs validation if its truth affects the outcome.

Screen applicable software profiles early enough to reveal constraints such as offline synchronization, consumer compatibility, data lineage, nondeterministic model behavior, hardware deadlines, or safety. Ask about the consequential constraint before selecting a solution. Unknown applicability is not a reason to mark the concern irrelevant.

When people use the same word for different concepts, test their meanings with a concrete example and its counterexample. Ask which meaning applies in each context and what behavior changes. Keep the canonical term, any context-specific variants, and the agreed boundary in PRODUCT. If documentation, code, or tests disagree, cite the discrepancy in PROJECT and check which behavior is intended before changing acceptance criteria.

## Explore only when alternatives matter

Match the user's preferred role when they express one: elicit their ideas, develop options together, or propose options for their review. Generate candidates before judging them, then compare a small shortlist against user value, constraints, feasibility, effort, and risk. Include a simpler or existing solution when credible. If ideas cluster around one approach, try a different perspective, such as replaying the journey from an operator's point of view or imagining how the options fail. For a tangled flow or boundary, use an illustrative sketch and a concrete scenario to test the distinction. Change techniques when ideas stop diverging or the question is ready for a decision. Do not demand a fixed number of ideas or reopen an accepted direction without a concrete reason.

Recommend a direction with its trade-offs and consequential assumptions. Keep only materially different options and why they were selected, deferred, or ruled out. Record product options in PRODUCT and design options in PROJECT. Distinguish who proposed an option from who decided on it when that distinction affects authority or follow-up. Respect delegated choices and escalate material decisions outside that authority.

### Challenge the working concept

Before elaborating a consequential direction, write a short working hypothesis: which actor has which problem, what change is expected to help, and what observation would make the direction worth pursuing or cause it to change. Keep goals, exclusions, hard constraints and untested premises visible. Ask for correction when a different interpretation would change the decision.

Select the perspectives that could overturn the proposal. Start with the strongest concrete objection and ask which evidence would change the recommendation. Use only relevant prompts:

| Perspective | Question to investigate |
| --- | --- |
| Necessity and reuse | What happens if we keep the current workflow or reuse an existing capability? Which confirmed need would remain unmet? |
| User or developer experience | Walk the same task with realistic input and a failure. What work, errors or ambiguity move to the user or caller? |
| Costs and capacity | Which workload, quota or budget could invalidate the option? What is known about the limit and how would we observe it? |
| Migration and recovery | How do old clients or existing data behave during partial rollout? Which effects can actually be reversed? |
| Operations and maintenance | Who can detect and diagnose failure, and which new state, dependency or manual work must they maintain? |
| Conflicting goals | Can separating timing, scope or ownership satisfy both needs? Compare the revised option using the same evidence and explain the cost it introduces. |

Capture the consequence, smallest useful discriminator, and decision or open question in the existing records. Carry observed rejection reasons into PROJECT or PRODUCT with their actual attribution. If evidence is missing, keep the candidate open or defer it explicitly. During exploration-only work, keep this synthesis in the conversation. During specification work, use the pillar records directly.

For a risky assumption, identify the cheapest useful evidence: repository inspection, a user example, research, a sketch, or a bounded prototype. Define the question and stopping condition. Creating executable prototypes follows actual task authorization; illustrative output is not production validation. Link surviving assumptions and their checks to PROJECT and PROOF, and park deferred ideas outside the current scope.

If successive experiments or fixes fail while assuming the same fact, state that premise and seek an observation that distinguishes it from a credible alternative before repeating the approach. Update the affected assumption and decision from the evidence; repeated failure alone does not authorize a redesign or settle a product choice.

## Consolidate and check the handoff

Reflect consequential conclusions in plain language, including what they change for the current behavior or next increment. Keep user answers separate from proposals. Invite correction where interpretation matters; avoid repeated acceptance rituals for settled or delegated choices. If answers stop reducing uncertainty, reframe the problem or propose a bounded investigation rather than extending the interview indefinitely.

When a specification is requested and the user is unavailable, use existing delegation for routine choices, retain consequential unresolved questions as blockers, and complete independent specification work. Return a resumable draft with those questions still open.

Use the [saved-draft review](specification-review.md) to check what a reader can recover from the artifacts, including which consequential choices are still open.

Check that objectives and hypotheses lead to requirements, acceptance criteria, feasible checks, and a way to evaluate the intended outcome. Reconcile contradictions, missing authoritative links, unexplained deferrals, and stale evidence. After a material clarification, update supported records and recheck affected dependencies and readiness. For a saved specification, record shared coverage and the next action in `process.md`, linking remaining questions in `project.md`, so another session can resume without repeating the interview or treating a draft as accepted. Follow an existing single-file layout when that is authoritative.

## Asynchronous discovery

When the needed knowledge belongs to another stakeholder and a questionnaire is requested, identify the recipient, the decision their answers inform, and the context they need. Draft only questions that resolve that gap, most consequential first, with room for uncertainty and partial answers. Reuse answered questions and link the result to the existing open decisions. Drafting the questionnaire does not authorize sending it or inventing answers.
