# Design and refactor around a real contract

Use for a requested architecture improvement or a change that exposes costly coupling. Preserve the project's domain vocabulary, accepted decisions, stack, and supported behavior. PentaPRO can own broader architecture proposals without becoming a prerequisite for implementation.

## Find the responsibility

Trace a representative caller through validation, state ownership, effects, and failure handling. Look for a repeated change spreading across callers, hidden ordering requirements, duplicated policy, or a boundary that prevents meaningful tests. Change frequency and actual defects help prioritize. A pass-through adapter can still earn its place by translating protocols or enforcing a trust boundary.

An interface includes more than signatures. Record relevant invariants, ownership, errors, ordering, cancellation, concurrency, resource limits, and compatibility promises. Prefer a small understandable interface that hides cohesive complexity. Consolidate behavior that changes for the same reason, while keeping independent responsibilities separate. Fewer methods or files alone do not establish a better design.

Compare the current design with the simplest useful alternative. Consider the cost to callers, the location of policy, dependency direction, and how each can be verified. Introduce an abstraction for a concrete isolation, policy, or variation need. A second implementation is useful evidence of variation, not a mandatory prerequisite for an interface. Avoid a large replacement architecture just to make a small change testable.

## Change safely

1. State preserved behavior and intended changes separately. Use characterization checks for undocumented current behavior, but flag conflict with accepted requirements rather than endorsing a bug.
2. Place tests where the relevant behavior is observable. A substitute for a network provider can isolate retry policy, while an actual adapter test must still establish request serialization and response interpretation. Private tests may help a complex algorithm but cannot replace caller-level checks.
3. Sequence the smallest coherent moves. For a wide interface or persisted-data migration, consider expanding with a compatible form, migrating actual consumers, then retiring the old form when removal is authorized and evidence supports it. Define coexistence and rollback or roll-forward limits. Search results alone cannot establish absence of external consumers.
4. Verify callers and integration after each meaningful boundary change. Preserve ordering, error semantics, authorization, transaction scope, and cancellation unless the contract explicitly changes them. Remove redundant layers only after their responsibilities are accounted for.
5. Record a durable decision only when its rationale will prevent a future mistake. Use the existing glossary and decision records. A new document tree or vocabulary is not required.

For example, if several import paths each retry a charge, place retry ownership at the layer that knows the operation's identity and outcome. Prove one charge under the promised retry conditions and preserved legitimate failure handling. A smaller wrapper is useful only if it actually centralizes that contract.
