# Tenant Operations UI Contract

## Purpose

Define the first-pass UI contract for the Tenant Operations surface in GreenRide.

This document exists to prevent:
- turning tenant operations into a generic admin UI
- losing the dispatch-first operating model
- mixing tenant work with platform governance or platform ops

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- purpose of the surface
- primary users
- main jobs to be done
- top-level navigation
- dashboard behavior
- key page families
- module-gating behavior
- responsive behavior
- empty, loading, and error states
- degraded and stale operational state handling

---

## Out of Scope

This document does not define:
- exact dispatch-state logic
- route-by-route permission matrix
- final widget layout
- detailed booking/dispatch component visuals

Those belong in dispatch, booking, and later UI detail contracts.

---

## Primary Users

- `tenant_owner`
- `tenant_admin`
- `dispatcher`
- `office_staff`

---

## Main Jobs To Be Done

- dispatch and booking operations
- driver and fleet oversight
- pricing and service configuration
- staff management
- tenant reporting

---

## Top-Level Navigation

Approved first navigation groups:
- dashboard
- dispatch
- bookings
- drivers
- fleet
- pricing
- staff
- reports
- incidents

Not every role sees every group.
In-surface RBAC still applies.

---

## Dashboard / Landing Behavior

Tenant Operations dashboard must remain a dispatch-first operational cockpit.

Approved first dashboard focus:
- live KPIs
- dispatch queue
- driver availability
- incidents and exceptions
- quick actions
- supporting trends

This surface should prioritise current operations over passive administration.

---

## Key Page Families

- operations dashboard
- live dispatch dashboard
- booking queue and booking detail
- live dispatch map
- driver panel
- fleet and vehicle management
- pricing and service configuration
- staff management
- tenant reporting
- incidents and exception views

### Page-Family Behavior

#### Operations Dashboard

Primary job:
- provide a dispatch-first operational overview

Expected behavior:
- should foreground live queue state, driver readiness, incident pressure, and quick actions
- should keep supporting trends subordinate to current operational work
- partial-data or stale panels must identify what is degraded rather than pretending the full dashboard is current

#### Booking and Dispatch Pages

Primary job:
- support fast operational action without hiding trust conditions

Expected behavior:
- booking detail, booking queue, dispatch dashboard, and live map should preserve route and shell context while moving between related pages
- blocked or unavailable actions must explain whether the cause is role restriction, module unavailability, or stale/degraded operational context
- degraded live inputs must weaken confidence visibly rather than looking like clean realtime truth

#### Configuration and Reporting Pages

Primary job:
- support tenant administration without collapsing into platform governance behavior

Expected behavior:
- pricing, fleet, staff, and reporting pages should remain tenant-scoped and should not inherit platform-style governance framing
- locked or unavailable reporting states must remain aligned with reporting and route-gating rules rather than rendering a broken report shell

---

## Module-Gating Behavior

- tenant module enablement may change what navigation groups, pages, and actions appear
- module gating must not replace RBAC
- gated routes must fail cleanly with unavailable states rather than broken navigation
- core tenant operations baseline remains available even when premium modules are disabled

---

## Responsive Behavior

- desktop-first
- tablet-safe
- responsive on smaller screens
- some dense desktop views may collapse columns, side panels, or secondary rails

Operational safety matters more than perfect mobile parity.
Reduced-detail mobile/tablet layouts are acceptable where documented.

---

## Empty, Loading, and Error States

- empty queues should say what is empty and why
- loading states must preserve operational context
- incident or data failure states must not hide critical controls without explanation
- if live data is stale or degraded, the UI must say so explicitly
- record-not-found outcomes should preserve tenant, filter, and queue context so operators do not lose the operational trail that led to the page

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`
- `docs/02-applications/admin-dispatch-system.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant operations is expected to merge with platform control
- dispatch ceases to be the primary operational center
- the surface must become phone-first instead of desktop-first operationally
