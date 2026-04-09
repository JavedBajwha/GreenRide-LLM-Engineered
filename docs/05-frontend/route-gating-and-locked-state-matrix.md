# Route Gating and Locked-State Matrix

## Purpose

Define the first implementation-safe route-gating and locked-state matrix for GreenRide frontend surfaces.

This document exists so AI and future implementation work do not invent:
- different blocked-route behavior for similar route families
- locked states that drift away from the shared gating model
- reporting pages that behave differently from their widgets and actions
- tenant/module gating rules applied inconsistently across surfaces

---

## Status

Draft, approved as the current documentation direction.

This document is the first concrete route-gating follow-through layer built on top of the shared frontend gating contract.

---

## Scope

This document covers:
- route-family-level gating defaults
- locked versus hidden versus blocked behavior by surface
- default blocked-route treatment
- reporting-route and export-action gating alignment
- embed-route gating direction

---

## Out of Scope

This document does not define:
- every single page-level permission edge case
- final visual design of locked states
- backend middleware implementation
- full package-pricing logic

Those belong to later RBAC, visual-detail, and implementation work.

---

## Related Documents

- `docs/05-frontend/module-aware-ui-and-route-gating.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/auth-redirect-and-protected-routes.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`
- `docs/05-frontend/reporting-route-and-state-matrix.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`

---

## Canonical Rules

1. RBAC and route-family protection are checked before module gating.
2. Core routes should usually stay `visible` when the user is in the correct surface.
3. Optional routes may be `hidden`, `locked_or_unavailable`, or `blocked_route` depending on surface purpose.
4. Direct access to a gated route must resolve to a clean blocked or unavailable page, never a half-working shell.
5. Route, navigation, widget, and action behavior must remain aligned.

---

## Default Blocked-Route Treatment

When a route is module-gated but the user has already passed auth and RBAC:
- do not render the normal working page
- do render a clear unavailable or not-enabled state where that pattern is approved
- do not turn module unavailability into a generic permission error

When RBAC fails:
- do not show module-upgrade messaging
- do show the normal permission/protected-route treatment

This keeps permission failure and module unavailability distinct.

---

## Route-Gating Matrix

| Route Family / Pattern | Surface | Default Protection | Default Module-Gating Expectation | Direct Route Behavior When Gated | Locked-State Pattern |
| --- | --- | --- | --- | --- | --- |
| `/`, `/quote`, `/quote/results`, `/booking/*` | Public / customer booking | public or step-elevated where documented | mostly core baseline; hide unsupported optional branches rather than tease heavily | if a public branch is unsupported, route should redirect or fail with a calm unavailable/unsupported-booking state | minimal unavailable state; avoid upgrade noise |
| `/tracking/:bookingRef` | Public/customer tracking | customer or controlled public access | tracking visibility depends on booking/tracking rules, not tenant upsell by default | if tracking is unavailable, show explicit tracking-unavailable or invalid-reference state | explicit status-first unavailable state |
| `/customer/*` core pages | Customer | customer | core account routes remain visible; optional add-ons may affect actions more than whole routes | blocked only where a specific feature is unavailable; base account shell should remain stable | calm unavailable state, no admin-style upsell |
| `/customer/saved-locations` | Customer | customer | visible in the baseline customer surface | if unavailable by policy, block with simple unavailable state rather than broken page | simple unavailable or hidden nav; never pricing-aware teaser |
| `/driver/*` | Driver | driver | mostly core driver workflow; not a tenant-upsell surface by default | route should fail as unavailable only for explicit policy or capability restrictions, not casual module gating | operational unavailable state only |
| `/ops` and `/ops/dispatch*` | Tenant Operations | tenant RBAC | core tenant operations baseline stays visible | should not be module-blocked like premium add-ons; unavailable states are for degraded data or narrower capability restrictions | operational fallback or unavailable state, not teaser |
| `/ops/bookings*`, `/ops/drivers`, `/ops/fleet`, `/ops/pricing`, `/ops/staff` | Tenant Operations | tenant RBAC by page | some pages may be core, others may depend on enabled modules or role detail | direct access should resolve to blocked-route or unavailable page if the module is off | controlled unavailable state, usually without heavy upsell |
| `/ops/reports*` | Tenant Operations | tenant RBAC plus report-family rules | strong candidate for `locked_or_unavailable` or `blocked_route` when advanced reporting is off | route should show a clean reporting-unavailable state, not a broken reports shell | locked/unavailable reporting state; may include upgrade-aware messaging where appropriate |
| report export actions under `/ops/reports*` | Tenant Operations | tenant RBAC plus export permission | more restricted than report visibility | action should be disabled or unavailable with clear reason | disabled action or unavailable panel, not hidden if user expects it |
| `/platform/*` | Platform Control | `super_admin` | not tenant-gated; module/package state may appear as data, not as access control for the surface itself | RBAC block if non-platform user; otherwise visible | permission failure only for non-platform users |
| `/platform-ops/*` | Platform Ops | `platform_ops` | not tenant commercial gating; authority and ops scope control access | RBAC block if unauthorised; do not show tenant upsell or package-unavailable states | permission or ops-authority state only |
| approved booking embed entry routes | External embed | public/controlled customer entry | only approved embed-capable booking entry should exist | unsupported embed routes must fail cleanly or not resolve | lightweight unavailable state, never internal-app shell |

---

## Surface Guidance

### Customer

- prefer `hidden` or calm `locked_or_unavailable` for optional capabilities
- avoid internal commercial language unless the user would reasonably expect the capability
- never let customer locked states look like tenant admin tooling

### Tenant Operations

- keep core operating routes stable
- use `locked_or_unavailable` for advanced reporting, exports, and optional add-ons where users are likely to expect the route
- use `hidden` where exposing the route would add noise without helping the operator

### Platform Control

- platform governance routes are not tenant-module-gated
- module/package state is visible as governed data, not as a reason to block the platform surface itself

### Platform Ops

- access is authority-based, not package-upsell-based
- use permission/authority treatment, not commercial locked states

---

## Reporting Bridge

Reporting is the strongest current use case for explicit locked-state behavior.

Approved direction:
- report widgets may appear as summaries even when deeper advanced reports are unavailable
- deeper report routes may be `locked_or_unavailable` when advanced reporting is off
- export actions may still be unavailable even when the report page itself is visible

This keeps widget summary, report view, and export rights aligned with the reporting-governance contract.

---

## Navigation Alignment Rule

Navigation must follow the same matrix.

Canonical direction:
- if a route is `hidden`, nav should usually hide it too
- if a route is `locked_or_unavailable`, nav may show it with an unavailable treatment where that helps orientation
- if a route is `blocked_route`, nav must not pretend the page is fully available

This avoids the “nav says yes, route says broken page” problem.

---

## Invariants

1. RBAC failure and module unavailability are different outcomes.
2. Core ops routes should not be treated like premium upsell routes.
3. Reporting pages and export actions may have different permission/gating outcomes.
4. Platform Control and Platform Ops are not tenant-module-gated surfaces.
5. Customer locked states should stay lighter and calmer than admin/ops locked states.

---

## Important Rule

GreenRide should use one shared gating language across the frontend, but route behavior must still reflect the purpose of the surface.

Consistency should come from the pattern, not from flattening all surfaces into one generic unavailable page.

---

## Stop Conditions

Stop and clarify before implementation if:
- a blocked route is about to render the normal working shell with key logic missing
- reporting export is being treated as automatically available because the report page is visible
- platform routes are being tenant-gated by package state
- customer locked states are being designed like internal admin upsell screens
