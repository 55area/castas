# DAO query and write semantics

Use when implementing a search query, changing a DAO conflict policy, or diagnosing lost related rows. Query parameters protect SQL value boundaries; they do not define the product's search or identity policy.

## Literal search versus patterns

Decide whether search means a literal substring, a wildcard pattern or full-text search, including blank input, case/accent handling and ordering. Bind values instead of concatenating SQL. If a literal substring is intended, escape LIKE's `%`, `_` and the chosen escape character separately. For example, with `!` as the escape character:

```kotlin
fun literalContainsPattern(input: String): String = buildString {
    append('%')
    for (character in input) {
        if (character == '!' || character == '%' || character == '_') append('!')
        append(character)
    }
    append('%')
}
```

Bind that result to the `:pattern` parameter of a query such as `WHERE title LIKE :pattern ESCAPE '!'`; keep a deterministic ordering for paged/tied results. Handle trimming and blank-query policy explicitly before building the pattern. Do not apply this helper to an FTS `MATCH` query, which has a different language and tokenization contract.

Test `%`, `_`, `!`, quotes, no match and the intended case/accent behavior against the actual DAO. Default SQLite LIKE folds ASCII case but does not provide full Unicode case folding. An in-memory fake using Kotlin string matching can therefore disagree with production SQLite. Verify the selected engine/extensions/collation rather than silently normalizing differently in UI, storage and tests.

Parameters bind values, not SQL identifiers or keywords. For user-selected sort columns/directions, choose a fixed query or an allowlisted structural choice; `ORDER BY :column` is not dynamic identifier binding.

## Update versus delete-and-reinsert

For a primary-key/unique conflict, SQLite's REPLACE algorithm removes conflicting rows before inserting the new row. An `ON DELETE CASCADE` relation can lose children even if the parent is reinserted with the same ID. Do not use Room `@Insert(onConflict = REPLACE)` as an automatic synonym for edit/update.

Use a supported `@Update`, `@Upsert` or deliberate transactional SQL operation according to the intended insert/update/conflict behavior. Room `@Upsert` decides existence by primary key; it does not promise to merge every secondary business-key conflict. Preserve stable identity across repeated create requests and verify any changed defaults, foreign keys, related rows and affected-row counts. A transaction alone does not undo an intentional cascade caused by the chosen conflict algorithm.

Primary references checked on 2026-11-06: [SQLite LIKE/ESCAPE and parameters](https://www.sqlite.org/lang_expr.html), [SQLite conflict algorithms](https://www.sqlite.org/lang_conflict.html) and [Room Upsert](https://developer.android.com/reference/androidx/room/Upsert). APIs and query behavior must match the consuming project's actual engine and Room version.
