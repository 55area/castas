# Worked Example: Local Integer Total

**Entirely fictional.** This abbreviated example illustrates drafting and traceability; it is not a real project, research result, executed test, default policy, or complete production specification. IDs and numeric input values illustrate one behavior, not universal targets. Start real work from the [five pillar templates](../assets/penta-pro-template.md).

The example is displayed together for comparison. In a generated project, place each pillar in its matching `docs/` file and the shared state below in `docs/process.md`. Keep the product summary and glossary in `docs/product.md`.

## Scenario and document state

Fictional brief `BRIEF-001`: an analyst wants a local CLI that totals a file of whole integers without sending data over the network or modifying the input. Invalid lines must produce an error rather than a partial total. The owner requests a specification only and delegates parser organization to the agent; supported numeric ranges remain undecided.

| State | Example value |
| --- | --- |
| Document status | Draft; no acceptance recorded. |
| Increment | First local file-total operation, including invalid-input behavior. |
| Coverage | All five pillars below; service hosting, accounts, billing and telemetry are Not applicable to this local workflow. |
| Readiness | Blocked for implementation by OPEN-001/002 and the unresolved format assumption ASM-001; independent drafting can continue. |
| Authority | BRIEF-001 authorizes specification work and the stated technical choice; no implementation or release authority recorded. |
| Resume focus | Resolve numeric semantics and input/public-contract questions, then reconcile requirements, acceptance criteria and checks. |

## PRODUCT

`DISC-001` is an **untested hypothesis**: analysts will find a local total useful for checking manually prepared integer lists. Source is the fictional brief, not an interview study. Frequency, current error rate and time saved are unknown. `OBJ-001` is to help the analyst obtain the intended total while preserving the source file.

The principle **preserve input and fail visibly** is derived from BRIEF-001 and is expressed by REQ-002/003. The agent proposes a product stopping criterion for review. If representative analysts must pre-clean every file, revisit the workflow or input assumptions. This criterion is **Proposed** because the brief did not establish when the owner would stop or change direction.

| ID / type | Requirement and source | Confirmation / scope | Acceptance references |
| --- | --- | --- | --- |
| REQ-001 / functional | Total whole integers from one local file; BRIEF-001, DISC-001, OBJ-001. Numeric limits depend on OPEN-001. | Confirmed intent; Pending range semantics; selected increment. | AC-001, AC-002, AC-004 |
| REQ-002 / functional | Reject invalid lines without returning a partial total; BRIEF-001. | Confirmed intent; selected increment. | AC-003 |
| REQ-003 / constraint | Do not modify the input file or send its contents over the network; BRIEF-001. | Confirmed; selected increment. | AC-005 |

`FEAT-001`: proposed command `line-total <path>` reads UTF-8 text; each line contains one optional minus sign followed by decimal digits. The following exact format choices are **Proposed**, awaiting the owner’s decision, rather than invented confirmations:

| AC ID | Input / condition | Expected observable behavior |
| --- | --- | --- |
| AC-001 | Bytes representing `2\n-3\n6\n` | Exit 0; stdout is `{"sum":5}\n`; stderr is empty. |
| AC-002 | Empty file | Exit 0; stdout is `{"sum":0}\n`; stderr is empty. |
| AC-003 | Bytes representing `2\nx\n6\n` | Exit 2; empty stdout; stderr is `Invalid integer at line 2.\n`; no input content appears in the diagnostic. |
| AC-004 | Value or total outside the supported numeric range | Pending OPEN-001; no expected output invented. |
| AC-005 | Any accepted or rejected input fixture | Input bytes remain unchanged; no network request is attempted. |

`NG-001`: GUI, remote files, fractional amounts and editing source files are outside this increment. Decimal commas and currency conversion require a later product decision.

`MET-001` links to OBJ-001: observe whether a representative analyst can obtain the expected total for a supplied list and understand an invalid-line report. Baseline, participant access and review window are Pending. Guardrail: any input modification or unexpected data transmission fails REQ-003 regardless of usability feedback.

## PROOF

| Check / trace | Planned procedure and oracle | Result / evidence |
| --- | --- | --- |
| CHECK-001: DISC-001 → OBJ-001 → REQ-001 → AC-001/002 → FEAT-001 / DEC-001 | Run the two exact fixtures above through the future CLI; compare exit status and both output streams byte-for-byte. | Unverified; none. |
| CHECK-002: REQ-002 → AC-003 | Run the invalid-line fixture; compare the three outputs with AC-003. | Unverified; none. |
| CHECK-003: REQ-003 → AC-005 | Compare input bytes before/after each fixture and observe attempted network calls in an isolated test environment. | Unverified; none. |
| CHECK-004: REQ-001 → AC-004 | Choose boundary/overflow fixtures after OPEN-001 is resolved; derive expected results independently of the implementation. | Unverified; procedure incomplete. |
| VAL-001: DISC-001 → OBJ-001 / MET-001 | Plan a walkthrough of valid and invalid files with a representative analyst; record task outcome, confusion, limitations and whether to revise the proposal. | Unverified; no participant recruited or session run. |

Illustrative evidence record shape for CHECK-001: **subject revision:** not available; **environment:** to be selected with platform support; **fixtures/oracle:** AC-001/002 above; **execution:** Not run; **actual output:** Not observed; **result:** Unverified; **evidence location:** None. Use the [evidence pattern](specification-patterns.md#check-and-evidence-record) when actual execution occurs.

## PROJECT

`DEC-001`: **Accepted within the fictional delegation**. The agent chooses separate parsing and CLI-output functions so arithmetic cases can be checked independently of terminal formatting. Alternative: one combined function; simpler initially, but harder to test in isolation. Authority is BRIEF-001's parser-organization delegation. This settles no output format, numeric range, or implementation authorization.

| ID / kind | Statement and impact | Owner / resolution / needed by |
| --- | --- | --- |
| ASM-001 / assumption | UTF-8, one integer per line describes the analyst's actual files. Unverified; different formats could change the parser and scope. | Product owner supplies a non-sensitive representative example before input-format acceptance. No authority to treat the assumption as true. |
| OPEN-001 / question | Should integers have arbitrary precision or an explicit bounded range, and what happens on overflow? Blocks REQ-001/AC-004 and implementation readiness. | Product owner; decide before implementation. Agent can explain alternatives without choosing product semantics outside delegation. |
| OPEN-002 / question | Confirm proposed CLI/diagnostic formats, encoding, supported runtime/platform and behavior for unreadable files. These affect the public contract and checks. | Product owner and technical maintainer; resolve before implementation readiness. |

The artifact registry points to these inline records; no separate ADR, API schema, database, or runbook files are needed yet. A real implementation would add its repository and supported-platform references once known.

## PRODUCTION

Release plan, still Proposed: distribute a versioned local package after supported-platform checks and the applicable acceptance checks pass. Record the actual artifact, install/removal instructions, known limitations, release owner and authority. No artifact exists yet. Removal must preserve user input files; a discovered incorrect total or data modification stops distribution pending investigation.

After an authorized pilot, evaluate MET-001 with the analyst using non-sensitive examples. Decide whether to retain the workflow, revise diagnostics, or revisit DISC-001. Record actual findings and limitations; no telemetry or claimed improvement is needed to fill this example. Performance and broader usability targets remain unset until evidence or an authorized decision supports them.

## PROCESS

The agent may complete independent specification sections and prepare the question options. Implementation remains blocked by unresolved numeric and public-contract decisions; the hypothetical owner has also not requested coding. Specification acceptance, increment readiness, implementation authorization, verification and release authorization are separate records.

Next action: resolve OPEN-001/002 and ASM-001, update affected acceptance criteria and checks, then reassess readiness. A later grant of implementation authority would persist within its scope; no repeated approval is needed for already authorized work.
