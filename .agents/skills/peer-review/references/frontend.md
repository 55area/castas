# Frontend Review

Detect the actual framework, rendering model, supported browsers, design system, and interaction contract. Apply the relevant checks to React, Vue, Angular, Svelte, server-rendered HTML, or another stack without imposing a replacement framework.

## User journeys and state

- Trace the changed journey from navigation or input through data access to the result. Cover relevant loading, empty, success, failure, denied, stale/offline, retry, cancellation, and partial-success states.
- Examine fast repeated actions, slow responses arriving out of order, navigating away, changing an identifier while a request is pending, and logging out during an operation. Check cleanup, stale closures, subscriptions, timers, and request ownership.
- Check optimistic updates against failure rollback, server validation, duplicate actions, cache invalidation, and reconciliation. A disabled button is not server-side protection against duplicate effects.
- Verify one authoritative state model for the changed behavior. Watch for derived state that drifts, cache keys missing identity/filters, stale data surviving an account switch, unstable list identity, and mutable updates that bypass the framework's change tracking.
- For hooks, effects, watchers, and reactive subscriptions, inspect actual dependencies and lifecycle semantics. Do not demand memoization everywhere, ban all effects, or claim a rendering problem without showing its trigger and consequence.

## Forms, navigation, and contracts

- Check keyboard submission, browser validation, field-level errors, preserving valid input after failure, pending actions, destructive confirmation, and recovery. Match copy and validation to the agreed behavior.
- Compare URL state, route parameters, pagination, browser back/forward, deep links, and unsaved changes. Check whether refetching or remounting repeats an external effect.
- Inspect request/response shapes and error assumptions against actual server contracts. Client validation and hidden UI controls do not replace server authorization.
- For SSR, hydration, streaming, and server/client component boundaries, check deterministic initial output, browser-only APIs, serialization, and sensitive values crossing into client bundles or public caches. Verify framework behavior for the pinned version.

## Accessibility and visual behavior

- Check semantic controls, accessible names, label/error associations, keyboard operation, focus order, focus management after dialogs/navigation, and status announcements. A styled `div` with click handling may exclude keyboard users.
- Check dialog focus containment and restoration, escape behavior, screen-reader state, meaningful images, form instructions, and disabled/read-only behavior as relevant.
- Inspect supported layouts with real content: narrow screens, zoom, large text, long translated strings, right-to-left text when supported, overflow, sticky elements, and touch controls.
- Use the project's actual design system and requirements. Visual preference alone is not a defect. Automated accessibility checks provide partial evidence; they do not establish that a full journey works with assistive technology.

## Security and browser behavior

- Trace untrusted content into raw HTML, script/URL contexts, template escape hatches, markdown rendering, file downloads, and external navigation. Verify sanitization at the sink and the actual trust boundary.
- Inspect credential/token exposure, private data in URLs or storage, cross-window messaging origin checks, open redirects, CSP changes, and service-worker/cache behavior where changed.
- Confirm authorization expectations across frontend and backend. A route guard can improve UX while leaving the underlying data endpoint exposed; report the actual boundary failure.

## Performance and evidence

- Look for avoidable serial request waterfalls, repeated subscriptions, runaway rendering, large synchronous work on the main thread, unnecessary bundle growth, and unbounded lists. Explain the affected journey and realistic scale; measure when a performance conclusion depends on timing.
- Inspect resource-loading and layout changes for broken asset paths, layout shifts, image sizing, hydration cost, and behavior on constrained connections/devices according to project targets.
- Read behavioral tests for the changed outcome. A shallow render, snapshot, or mock assertion may miss a user-visible failure; it may also be appropriate evidence for a narrower contract. Judge what is asserted.
- When feasible and relevant, exercise the running UI using existing browser tools: the main path, a meaningful failure, keyboard interaction, and affected viewports. Check console/network evidence without exposing private data. Build success alone does not establish visual or interactive correctness.
- If browser execution is unavailable, report the limitation and distinguish source-established findings from unverified visual behavior. Do not invent screenshots, accessibility results, or browser compatibility.
