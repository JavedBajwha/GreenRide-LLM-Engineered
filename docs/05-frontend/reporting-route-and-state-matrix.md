# Reporting Route and State Matrix

## Purpose

Define the first implementation-safe route, state, and action matrix for reporting-related frontend behavior in GreenRide.

This document exists so AI and future implementation work do not invent:
- reporting routes that ignore scope or module boundaries
- export actions that behave like simple page buttons
- locked reporting states that drift away from reporting ownership rules
- platform and tenant reporting screens that feel interchangeable

---

## Status

Draft, approved as the current documentation direction.

This document is the first route/state follow-through layer specific to reporting.

---

## Scope

This document covers:
- reporting route-family behavior
- tenant versus platform reporting route boundaries
- report-view versus export-action behavior
- locked, unavailable, empty, stale, and failed-export state direction
- relationship between report pages and dashboard widgets

---

## Out of Scope

This document does not define:
- final report visuals
- backend export-job infrastructure
- exact schedule-management UI
- every future report page

Those belong to later UI-detail and implementation work.

---

## Related Documents

- `docs/03-services/analytics-and-reporting.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`

---

## Canonical Rules

1. Tenant reporting and platform reporting must stay in separate route families and separate shells.
2. Report-page visibility, export rights, and schedule rights are different action layers.
3. A visible reporting widget does not automatically make the deeper report route available.
4. A visible report route does not automatically make export or scheduling available.
5. Reporting unavailable states must remain clearly different from permission failures and data failures.
6. Incoming deep-link or saved-filter state must be normalised to the target route's authorised surface, report family, and scope before the page treats it as active.

---

## Route Matrix

| Route / Area | Surface | Baseline Access | Module Expectation | When View Is Unavailable | Export Behavior |
| --- | --- | --- | --- | --- | --- |
| `/ops/reports` | Tenant Operations | tenant reporting viewers | core summaries may exist without advanced reporting | show reporting-home with only approved baseline summaries or a clean unavailable state | exports hidden or disabled unless explicitly allowed |
| `/ops/reports/core/*` | Tenant Operations | tenant reporting viewers | core reporting baseline | show empty/report-unavailable state if no data or role lacks the family | export only where the family and role allow it |
| `/ops/reports/advanced/*` | Tenant Operations | tenant_owner, tenant_admin, narrower viewers where later allowed | advanced reporting required | show module-unavailable or locked reporting state, not broken page | export and scheduling unavailable if the advanced module is off |
| `/ops/reports/schedules` | Tenant Operations | tenant_owner, tenant_admin by default | advanced reporting required | show schedule-unavailable or permission-restricted state | create/edit schedule blocked where the actor lacks scheduling rights |
| `/platform/reports` | Platform Control | super_admin | platform baseline, not tenant-package-gated | show empty or loading/error state, not tenant-module upsell | export only where the platform report family allows it |
| `/platform/reports/*` | Platform Control | super_admin | platform reporting family rules | show report-family unavailable or empty state where appropriate | export remains family-specific and superadmin-only by default |

---

## State Handling Baseline

### Empty State

Use when:
- the actor is allowed to view the report family
- the report ran successfully
- there is simply no matching data

The UI should explain:
- what report family is empty
- which filters or scope produced the result
- whether adjusting filters is the likely next step

### Locked / Module-Unavailable State

Use when:
- the route is valid for the surface
- the actor passed auth and RBAC for the surface
- the required reporting module or report family entitlement is not enabled

The UI should:
- keep the reporting shell intact
- explain that the deeper reporting capability is unavailable
- avoid pretending the missing state is a runtime error

### Permission-Denied State

Use when:
- the actor is in the correct surface family
- but the report family or action is outside their allowed role scope

This should not look like:
- a module upsell
- a generic blank report

### Data-Failure State

Use when:
- the report or export operation fails unexpectedly

The UI should:
- preserve scope context
- show whether the failure is at the report view or export layer
- avoid implying that no data exists when the real problem is failure

### Filter / Scope-Rejected State

Use when:
- the actor can access the report route generally
- but an incoming deep-link, saved filter, or schedule context includes a filter/scope combination that is no longer authorised or no longer valid for that report family

The UI should:
- keep the actor inside the correct reporting shell
- explain that the requested saved state could not be fully applied
- fall back to the nearest safe authorised filter set instead of widening scope silently

### Export-In-Progress / Failed / Expired State

Export states should remain explicit:
- `preparing`
- `ready`
- `failed`
- `expired`

A failed or expired export should not quietly vanish in a way that looks like it never existed.

---

## Widget Bridge Rules

- a reporting widget may deep-link only into a report family the actor can view
- a widget summarizing an advanced report family must not deep-link into a working advanced route if the module is unavailable
- a widget sourced from realtime, observability, or audit must not land on a reporting page unless there is an approved reporting-owned summary/report bridge
- widget deep-links may prefill only approved target-report filters and must not carry hidden export, scheduling, or cross-surface scope rights
- a widget deep-link that targets a now-unavailable report family or filter set should resolve into a safe authorised report state, not a broader fallback route

---

## Scheduling State Direction

Scheduled reporting should have its own state language:
- no schedules configured
- schedule active
- schedule paused or unavailable
- schedule failed

Schedule failure should not imply that the report family itself is unavailable.

---

## Invariants

1. Reporting routes stay scope-owned by their surface.
2. Locked reporting is different from forbidden reporting.
3. Export and scheduling are stricter than page visibility.
4. Widgets may summarize reports, but do not override route/action permissions.
5. Failed reporting actions must stay explicit.
6. Saved filters and incoming deep-link state must stay inside authorised reporting scope.

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant reporting is being routed through platform shells
- export is being enabled because the report page exists
- advanced reporting routes are rendered normally when the module is unavailable
- report failure is being shown as empty data instead of explicit failure
