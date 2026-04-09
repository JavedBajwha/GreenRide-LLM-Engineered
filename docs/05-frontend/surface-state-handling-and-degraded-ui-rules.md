# Surface State Handling and Degraded UI Rules

## Purpose

Define the canonical frontend rules for loading, empty, stale, degraded, blocked, and partial-data states across GreenRide surfaces.

This document exists so AI and future implementation work do not invent:
- broken pages disguised as loading states
- stale live data presented as current truth
- degraded operational views that silently hide critical controls
- inconsistent blocked, unavailable, and permission-denied treatment across surfaces

---

## Status

Draft, approved as the current documentation direction.

This document is the first shared state-handling contract for frontend refinement work.

---

## Scope

This document covers:
- loading-state rules
- empty-state rules
- stale and degraded-state rules
- blocked/unavailable/permission-failure distinction
- partial-data treatment
- surface-specific emphasis for customer, tenant ops, platform control, and platform ops

---

## Out of Scope

This document does not define:
- final copy for every state
- final visual component library
- backend retry logic
- incident or release state machines themselves

Those belong to later visual-detail and implementation work.

---

## Related Documents

- `docs/03-platform/error-handling-and-failure-strategy.md`
- `docs/03-platform/observability.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/release-maintenance-and-rollback.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`

---

## Canonical Rules

1. The UI must distinguish loading, empty, stale, degraded, unavailable, and permission-failure states.
2. Stale or degraded live data must never be presented as fresh truth.
3. Degraded states must preserve critical context and controls where safe.
4. Blocked or unavailable routes must not masquerade as generic system errors.
5. Partial data should be explicit, not silently treated as complete.

---

## Shared State Vocabulary

Approved shared frontend state families:
- `loading`
- `empty`
- `stale`
- `degraded`
- `partial_data`
- `locked_or_unavailable`
- `permission_denied`
- `not_found`

Baseline meanings:
- `loading`: data or shell context is still being resolved
- `empty`: request succeeded but there is simply no content yet
- `stale`: last-known data is visible, but freshness is no longer guaranteed
- `degraded`: the surface still works partially, but capability or trust is reduced
- `partial_data`: some data is available, but an expected subset failed or is missing
- `locked_or_unavailable`: feature exists conceptually but is not enabled or not available in this context
- `permission_denied`: the user is not allowed to access the capability
- `not_found`: the target record or route target does not exist or is not reachable in the approved way

Guardrail:
- session-expiry or re-authentication recovery is not the same thing as `permission_denied` or `not_found`
- record-level `not_found` handling must preserve the current surface and route context rather than dropping the user into a generic global error state

---

## Loading Rules

Loading states must preserve orientation.

Canonical direction:
- keep the correct surface shell and page context visible where practical
- avoid blank screens that hide which surface the user is in
- avoid showing fake zeros or fake “healthy” summaries while real data is still loading
- for operational surfaces, keep headings, scope, and known filters visible during load

Loading is uncertainty, not success.

---

## Empty-State Rules

Empty states must explain absence, not imply failure.

Approved direction:
- distinguish “nothing here yet” from “something broke”
- include the object or queue that is empty
- include scope where relevant, such as tenant, report filter, or incident view
- do not use empty states to hide permission or gating failures

Examples:
- no active incidents
- no bookings in this filter
- no onboarding items yet
- no saved locations yet

---

## Stale-State Rules

Stale states are especially important for live surfaces.

Canonical direction:
- stale data may stay visible if it helps continuity
- stale data must be marked explicitly
- stale timestamps or freshness indicators should remain visible where the decision risk is meaningful
- stale data must not be styled as if it were confirmed current state

This is especially important for:
- dispatch queues
- driver availability
- live maps
- platform health summaries
- incident counters

---

## Degraded-State Rules

Degraded does not mean unusable.

Approved direction:
- preserve the safest useful subset of the surface
- keep source-of-truth records visible where available
- hide or disable only the parts that cannot be trusted or safely executed
- explain what is degraded and what still works

Examples:
- live updates delayed but booking records still usable
- map layer degraded but dispatch list still usable
- provider issue affecting notification health while incident controls still work

---

## Partial-Data Rules

Partial data must be explicit.

Canonical direction:
- allow mixed success only when the remaining visible data is still useful and not misleading
- identify which section failed or is missing
- do not collapse all page sections just because one panel failed
- do not silently omit a critical panel if that omission changes operator judgment

This is most relevant for dashboard and multi-panel views.

---

## Blocked, Unavailable, and Permission Failure

These must stay distinct.

Approved direction:
- `locked_or_unavailable`: feature exists but is not enabled or not available in this context
- `permission_denied`: user is not allowed to access the feature
- `not_found`: the target does not exist or cannot be reached through this route
- session-expiry or re-authentication states should be handled as trust-recovery flows, not as missing-record or permission outcomes

The UI should not blur:
- module gating into RBAC
- missing records into permission failure
- degraded runtime into commercial lock state

---

## Surface Emphasis

### Customer

- keep state handling simple and calm
- prefer clear, lightweight explanations
- avoid internal operational detail
- stale tracking or unavailable live updates should be explicit but not alarming

### Tenant Operations

- preserve operator context first
- degraded live data must stay explicit
- critical queues, incidents, and booking state should remain visible where safe
- do not hide operational problems behind generic loading or blank panels

### Platform Control

- distinguish governance emptiness from data failure
- preserve audit/commercial/platform context during loading
- permission and unavailable states should remain crisp and non-ambiguous

### Platform Ops

- degraded health visibility must itself be explicit
- stale health or incident summaries must be marked
- critical incident and containment context must remain visible where possible
- avoid “all green” presentation when the data source itself is impaired

---

## Priority Rule for Operational Surfaces

For Tenant Operations and Platform Ops:

1. preserve source-of-truth context
2. mark stale or degraded sections clearly
3. keep safe critical controls visible
4. disable only actions that are no longer trustworthy

This avoids turning degraded operations into blind operations.

---

## Widget and Dashboard Rule

Dashboards must not confuse summary-state and data-health-state.

Canonical direction:
- a KPI widget may be empty, stale, degraded, or partial independently of the rest of the dashboard
- widget-level state should not silently rewrite page-level health assumptions
- dashboards should avoid showing all cards as healthy when some inputs are stale or missing

---

## Invariants

1. Stale is not the same as loading.
2. Empty is not the same as broken.
3. Degraded is not the same as permission denied.
4. Partial data is not the same as complete data.
5. Operational surfaces must preserve trust cues, not just content.

---

## Important Rule

GreenRide should never make uncertain or degraded state look confidently normal.

That is the key trust rule behind all frontend state handling.

---

## Stop Conditions

Stop and clarify before implementation if:
- stale data is about to be shown without freshness cues
- a degraded surface is about to hide the only safe source-of-truth panel
- a locked route is being shown as a generic runtime error
- a page is about to show fake zeros or fake success while real data is still loading
