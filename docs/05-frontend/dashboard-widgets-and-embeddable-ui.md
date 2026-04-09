# Dashboard Widgets and Embeddable UI

## Purpose

Define the canonical dashboard-widget and embeddable-UI baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- widgets as random reusable blocks with no ownership model
- dashboard composition that ignores surface identity
- embeddable UI as a full exported copy of the product
- external widget behavior that bypasses route, branding, or security boundaries

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical widget and embeddable-UI contract for the Phase 8 frontend implementation wave.

---

## Scope

This document covers:
- dashboard-widget baseline
- widget catalog direction by surface
- widget ownership metadata baseline
- embeddable UI boundary
- relationship between widgets, dashboards, and external booking surfaces

---

## Out of Scope

This document does not define:
- exact final widget visuals
- final dashboard layout customization rules
- WordPress-specific technical delivery detail
- detailed reporting metric definitions
- final external integration SDK/API shape

Those belong to later dashboard-layout, reporting, and integration compatibility contracts.

---

## Related Documents

- `docs/05-frontend/shared-app-shell-ownership.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/driver-ui-contract.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`
- `docs/03-services/analytics-and-reporting.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`
- `docs/03-platform/module-commercial-model.md`

---

## Canonical Rules

1. Dashboard widgets are approved, surface-specific building blocks, not arbitrary reusable boxes.
2. Widget meaning must stay aligned with the surface that uses it.
3. Each widget must declare its surface, purpose, and source type.
4. Embeddable UI is a narrow external surface, not a full exported copy of the application.
5. External embeds must not bypass platform security, branding, or product-scope boundaries.

---

## Dashboard Widget Baseline

GreenRide should use a defined widget model for dashboards and summary surfaces.

Canonical direction:
- widgets are intentionally approved building blocks
- widgets are not just “any component placed on a dashboard”
- the widget model should support consistency, ownership, and later customization safely

This creates a cleaner dashboard contract than ad hoc cards everywhere.

---

## Widget Ownership Metadata

Each widget should declare at least:
- surface
- source type
- purpose
- whether it is fixed, configurable, or gated

Source type should align with the already approved metric-ownership model:
- realtime
- reporting
- observability
- audit
- static or configuration summary where appropriate

This keeps widget behavior explainable instead of ambiguous.

---

## Surface-Specific Widget Catalog Direction

Widgets belong to a catalog by surface, not one universal global catalog.

Current approved surface families:
- customer widgets
- driver widgets
- tenant operations widgets
- platform control widgets
- platform ops widgets

Canonical direction:
- each surface may reuse patterns
- but widget purpose must still remain surface-appropriate
- a tenant-ops dispatch widget is not the same thing as a customer trip-summary widget just because both are cards

---

## Fixed vs Configurable vs Gated Widgets

The widget model should distinguish:
- fixed widgets
- configurable widgets
- gated widgets

Baseline meanings:
- fixed widgets always appear in the approved surface/dashboard baseline
- configurable widgets may be added, removed, or repositioned where later layout/customization rules allow
- gated widgets require module/package/role conditions before they appear

This creates a clean bridge into later dashboard customization work.

---

## Widget Boundary by Surface

Examples of likely first widget classes:

Customer:
- next trip
- active trip summary
- recent bookings
- saved locations

Driver:
- availability status
- current/incoming job
- recent work summary
- important alerts/messages

Tenant Operations:
- live KPIs
- dispatch queue summary
- driver availability
- incidents/exceptions
- quick actions

Platform Control:
- tenant count/status
- onboarding progress
- package/module distribution
- support/audit alerts

Platform Ops:
- service health
- incident count
- maintenance state
- release status
- active containment controls

These are catalog directions only.
The first concrete per-surface catalogs now live in:
- `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`

---

## Embeddable UI Baseline

Embeddable UI should start narrow.

Approved direction:
- embeddable UI begins as booking widget / booking-entry surface only
- it is not a way to export tenant ops, platform control, platform ops, or driver surfaces
- it is not a way to embed full dashboards by default

This is the core embed boundary.

---

## What Embeds Are For

Current safe embed purpose:
- external booking entry
- quote initiation
- lightweight booking flow entry where supported

Canonical direction:
- embeds may expose a controlled customer-facing booking surface
- embeds must remain aligned with the same booking/business-rule contracts as the main customer flow
- embeds are an external delivery surface, not a new product model

---

## What Embeds Must Not Become

Embeds must not become:
- tenant ops dashboards on third-party sites
- platform admin surfaces on external sites
- driver workflow surfaces
- unrestricted export of the internal app shell

This prevents widget/embed scope from ballooning into a second app architecture.

---

## Branding and Module Relationship

Current direction:
- tenant-facing embeds may use tenant branding where allowed
- embed availability may depend on module/package enablement
- gating must remain explicit

Important guardrail:
- branding and module enablement do not expand the functional scope of embeds beyond the approved embed surface

---

## Security and Access Boundary

Embeddable UI must still respect:
- auth boundaries where required
- tenant scoping
- module/package gating
- booking and payment-path rules

Canonical direction:
- embedding a surface elsewhere does not weaken product security or route rules
- external delivery should remain a controlled surface, not a shortcut around the main app
- embeds must not deep-link or expand into internal customer-account, tenant-ops, platform-control, or platform-ops routes unless a later explicit contract approves that route family
- widget or embed availability must not be mistaken for approval to expose deeper report, export, or action authority

---

## Relationship to Dashboard Layout

This document defines:
- what widgets are
- how they are categorized
- what embeds are allowed to be

It does not yet define:
- final layout zones
- drag/drop customization
- tenant default versus per-user arrangement rules

Those belong to the later dashboard layout/customization contract.

---

## Important Rule

GreenRide should use widgets as controlled surface-specific building blocks and embeds as narrow external booking surfaces, not as a second undocumented frontend platform.

---

## Stop Conditions

Stop and clarify before implementation if:
- widgets are being treated as a generic component bucket with no ownership metadata
- embeds are expanding beyond booking entry without explicit approval
- internal admin or driver surfaces are being proposed as embeddable by default
- widget reuse is erasing the differences between customer, ops, platform, and ops-console surfaces
