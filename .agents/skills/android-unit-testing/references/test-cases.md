# Contract-driven test cases

Select cases from the actual domain; this is a prompt catalogue, not a requirement to write every case for every function. State the observable expectation first. Use distinct tests for independent behaviors and table-driven cases for one behavior across inputs.

## Text

- Empty/blank input, trimming policy, tabs/newlines, long values, and exact limits.
- UTF-16 code units versus code points versus user-perceived graphemes. Kotlin String length counts UTF-16 code units: a product's “character limit” must define its intended unit. Test emoji, modifiers, ZWJ sequences, and combining marks when truncation/counting matters; avoid splitting surrogate pairs or graphemes according to that contract.
- RTL and non-Latin scripts, normalization-equivalent forms, homoglyphs, control characters, zero-width characters, and bidi overrides when security or matching behavior matters.
- Parameterless Kotlin `lowercase()`/`uppercase()` use invariant locale rules. Locale-specific behavior requires an explicit locale-aware API. Test Turkish casing on those paths, and one-to-many mappings such as `ß` to `SS` where length or matching matters.
- Numeric-looking strings, locale decimal separators, format-string metacharacters, escaped input, and path-like input according to the parser/validation boundary. Do not assume every field should normalize distinct Unicode sequences.

## Arithmetic and collections

- Zero, negatives, min/max, immediately adjacent bounds, overflow of offsets/totals, and unit mismatches.
- `abs(Int.MIN_VALUE)` remains negative; integer division truncates and remainder is not mathematical modulo.
- Floating-point behavior depends on static types and APIs: primitive IEEE comparison treats NaN differently from boxed/generic equality. Test actual `equals`, collection membership, sorting, and deduplication semantics rather than asserting they all behave the same.
- Exact decimal/money rounding policy, precision loss, NaN/infinities if accepted by the boundary, and signed zero where observable.
- Empty/single/page-boundary collections, duplicates, tie ordering, mutable references escaping, large inputs, and nullable/malformed wire data at its actual deserialization boundary.

## Time

- Same instant twice, backward wall-clock adjustments, expiration exactly at the boundary, and elapsed duration measured by monotonic time.
- DST transitions, leap days, timezone/locale mismatch, negative/future timestamps, and midnight rollover when relevant.
- Fake clocks and deterministic schedulers; no dependence on the test machine's real timezone or current date.

## State and collaborators

- Initial state, duplicate submissions, cancellation/retry, action while already loading, out-of-order results, stale responses, and navigation/disposal while work is pending.
- Errors with distinct UI/retry behavior, success with degenerate payloads, unexpected exceptions that should remain visible, and a stream that completes or fails before its first value.
- Restored/absent/malformed saved fields, constraints on sensitive data, and restored pending operations.
- Local persistence failure after network success, failed refresh with existing cache, concurrent writes, and conflicts according to the repository contract.

For each test, explain the observable contract and the defect it would catch. Do not expose private fields or enlarge production APIs solely to observe implementation details. Shared implementation failure does not make independent product guarantees redundant.
