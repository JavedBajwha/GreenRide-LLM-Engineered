# Module-Aware UI and Route Gating

## Purpose

Define the canonical frontend rule for module-aware UI visibility and route gating in GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent module-gating behavior across surfaces
- disabled-module routes that break or half-render
- one blanket gating decision copied across all surfaces
- UI states that confuse RBAC failure with module unavailability

---

## Status

Draft, approved as the current documentation direction.

This document is the canonical frontend gating contract for the Phase 8 refinement pass.

---

## Scope

This document covers:
- shared frontend gating pattern
- relationship between RBAC and module gating
- allowed route/navigation/widget/action gating outcomes
- route behavior for disabled modules
- surface-owned gating decisions

---

## Out of Scope

This document does not define:
- exact package pricing logic
- the detailed route-gating matrix
- every locked-state visual treatment
- final reporting-package visibility rules

Those belong to module-commercial, reporting, and later per-surface refinement work.

---

## Related Documents

- `docs/03-platform/module-commercial-model.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/auth-redirect-and-protected-routes.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/shared-app-shell-ownership.md`
- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/03-services/analytics-and-reporting.md`

---

## Canonical Rules

1. GreenRide should use one shared frontend gating pattern across surfaces.
2. Module gating never replaces RBAC.
3. Surface owners decide what is core, gated, hidden, or teaser-visible.
4. Disabled-module routes must fail cleanly, not as broken partial pages.
5. Route, navigation, widget, and action gating must stay aligned.

---

## Shared Gating Pattern

The frontend should use one consistent module-aware gating model.

Approved gating outcomes:
- `visible`
- `hidden`
- `locked_or_unavailable`
- `blocked_route`

Baseline meanings:
- `visible`: feature is available normally
- `hidden`: feature is omitted from the current surface/context
- `locked_or_unavailable`: feature may appear with a clean unavailable or upgrade-aware state
- `blocked_route`: direct route access is denied with a clear module-unavailable state

This gives the frontend one reusable pattern without forcing every surface into identical content decisions.

---

## Relationship to RBAC

Module gating and RBAC are separate controls.

Canonical direction:
- RBAC answers whether the current user role may access the surface/page/action
- module gating answers whether the capability is enabled for the tenant/context

Rules:
- both checks may apply at once
- an RBAC-allowed feature may still be module-gated
- a module-enabled feature may still be RBAC-blocked
- the UI must distinguish permission failure from module unavailability

---

## Surface-Owned Decisions

The shared pattern is common, but the content decision belongs to the relevant surface and domain.

Surface-owned decisions include:
- which pages are core versus gated
- whether a disabled capability is hidden or shown as unavailable
- whether a widget is fixed, gated, or omitted
- whether a teaser or upgrade hint is appropriate for that surface

This keeps customer, ops, reporting, and platform surfaces from collapsing into one generic gating style.

---

## Navigation Gating

Navigation must respect module and package state consistently.

Approved direction:
- disabled modules must not leave broken navigation items
- gated nav items may be hidden or shown as unavailable depending on surface rules
- nav gating must remain aligned with route and page gating

Important guardrail:
- a nav item must not advertise access to a route that fails in a confusing way

---

## Route Gating

If a user reaches a gated route directly:
- the app must block normal access cleanly
- the route should show a clear module-unavailable state where that pattern is approved
- the app must not render a half-working page shell with missing logic
- blocked-route handling should remain inside the authoritative surface shell rather than falling back to a different surface frame

This is the minimum safe blocked-route behavior.

---

## Widget and Action Gating

The same gating model applies below full-page routes too.

Examples:
- widget unavailable because the module is off
- export action unavailable because advanced reporting is off
- embed controls unavailable because website-integration is off

Rules:
- gated widgets/actions must not silently disappear if that would confuse critical workflows
- but they also must not render as broken interactive elements

---

## Surface Guidance

### Customer

- keep gating calm and minimal
- avoid cluttering the customer journey with internal upgrade noise
- use clean unavailable states only where the user would reasonably expect the feature

### Tenant Operations

- core operational pages remain visible
- premium or optional capabilities may be unavailable or hidden depending on workflow fit
- reporting/export/add-on workflows are strong candidates for controlled gated states

### Platform Control

- tenant commercial modules may be visible as governance/commercial data
- platform governance pages themselves are not tenant-gated

### Platform Ops

- operational access is driven more by authority and ops scope than tenant commercial gating
- do not treat ops recovery tooling like a tenant upsell

### School Run Add-On Direction

- School Run is an optional add-on that may gate routes, navigation items,
  widgets, and actions inside existing customer and tenant-operations surfaces
- School Run gating must not invent a new top-level surface or route family
- if School Run is disabled, School Run-specific entry points must resolve as
  hidden, locked, or blocked according to the owning surface rules
- School Run module enablement must not be treated as blanket authority for all
  tenant users or customer-side actors

Important guardrail:
- School Run-specific blocked-route handling should stay inside the current
  authoritative surface shell rather than bouncing the user into a different
  app surface

### Parcel Add-On Direction

- Parcel is an optional add-on that may gate routes, navigation items,
  widgets, and actions inside existing customer, tenant-operations, and driver
  surfaces
- Parcel gating must not invent a new top-level surface or route family
- if Parcel is disabled, parcel-specific entry points must resolve as hidden,
  locked, or blocked according to the owning surface rules
- Parcel module enablement must not be treated as blanket authority for proof,
  recipient visibility, or tenant-side parcel management

Important guardrail:
- Parcel-specific blocked-route handling should stay inside the current
  authoritative surface shell rather than bouncing the user into a different
  app surface

---

## Reporting Bridge

The reporting docs already define:
- core baseline reporting
- advanced-reporting gating direction

This document adds the frontend rule:
- the shared gating pattern applies
- but reporting surfaces decide whether advanced reporting is hidden, locked, or blocked at route level
- route, widget, export, and action behavior must stay aligned

---

## Important Rule

GreenRide should share one gating pattern across the frontend, but not one blanket gating decision across all surfaces.

That is the cleanest way to keep the experience consistent without flattening the product model.

---

## Stop Conditions

Stop and clarify before implementation if:
- module gating is being used as a substitute for RBAC
- blocked routes are rendering as broken partial pages
- one surface’s gating style is being copied blindly into all other surfaces
- nav, route, widget, and action gating drift out of alignment
