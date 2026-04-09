# Frontend Route Inventory

## Purpose

Define the canonical top-level frontend route families for GreenRide.

This document is a routing inventory, not a detailed UI spec.

It exists to prevent:
- invented route structures
- duplicate page ownership
- mixing unrelated role areas together

---

## Status

Draft, provisional routing inventory.

This document establishes the current approved route direction for documentation work.
Detailed screen refinement remains subject to later frontend and domain documentation phases.

---

## Scope

This document covers:
- top-level route families
- route ownership by app surface
- page families by surface
- relationship between route inventory and module-aware route gating
- default landing routes by surface
- cross-surface route ownership boundaries

---

## Out of Scope

This document does not define:
- component-level UI structure
- exact screen visuals
- backend API implementation details

---

## Canonical Route Families

| Surface | Route Family | Notes |
| --- | --- | --- |
| Public / customer booking | `/` | Public entry and booking discovery |
| Customer account area | `/customer/*` | Authenticated customer pages |
| Driver app | `/driver/*` | Driver-only operational pages |
| Tenant operations | `/ops/*` | Tenant staff operational and admin pages |
| Platform control | `/platform/*` | Platform-only control pages |
| Platform ops | `/platform-ops/*` | Platform operational safety and recovery pages |

### Default Surface Landing Routes

Approved first surface landing routes:

| Surface | Default Route |
| --- | --- |
| Public / customer booking | `/` |
| Customer account area | `/customer` |
| Driver app | `/driver` |
| Tenant operations | `/ops` or `/ops/dispatch` depending on role |
| Platform control | `/platform` |
| Platform ops | `/platform-ops` |

Guardrail:
- default landing and redirect behavior must keep the user inside the canonical route family for that surface
- a successful login, support jump, or blocked-route recovery must not reuse another surface shell as a convenience fallback

---

## Route Inventory

### Public / Customer Booking Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/` | Public booking entry / landing | public |
| `/quote` or equivalent public quote route | Search and quote flow entry | public |
| `/quote/results` | Quote results and vehicle selection | public or provisional customer flow |
| `/booking/details` | Passenger details and extras | public or customer depending on final auth flow |
| `/booking/payment` | Payment step | public or customer depending on final auth flow |
| `/booking/confirmation` | Booking confirmation | public or customer depending on final auth flow |
| `/tracking/:bookingRef` or equivalent | Trip tracking entry | customer or controlled public access |

### Customer Account Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/customer` | Customer dashboard / home | customer |
| `/customer/bookings` | Booking history | customer |
| `/customer/bookings/:id` | Booking detail | customer |
| `/customer/profile` | Customer profile | customer |
| `/customer/saved-locations` | Saved addresses / favourites | customer |

### Driver Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/driver` | Driver home / status | driver |
| `/driver/jobs/incoming` | Incoming job offer | driver |
| `/driver/jobs/:id` | Active job / trip detail | driver |
| `/driver/history` | Trip history / earnings | driver |
| `/driver/profile` | Driver profile / assigned vehicle / document visibility | driver |

### Tenant Operations Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/ops` | Tenant operations dashboard | tenant_owner, tenant_admin, dispatcher, office_staff |
| `/ops/dispatch` | Live dispatch dashboard | tenant_owner, tenant_admin, dispatcher |
| `/ops/dispatch/map` | Live map | tenant_owner, tenant_admin, dispatcher |
| `/ops/bookings` | Booking management | tenant_owner, tenant_admin, dispatcher, office_staff |
| `/ops/bookings/:id` | Booking detail / actions | tenant_owner, tenant_admin, dispatcher, office_staff |
| `/ops/drivers` | Driver panel / roster | tenant_owner, tenant_admin, dispatcher |
| `/ops/fleet` | Fleet / vehicle management | tenant_owner, tenant_admin |
| `/ops/pricing` | Pricing rules | tenant_owner, tenant_admin |
| `/ops/staff` | Tenant staff management | tenant_owner, tenant_admin |
| `/ops/reports` | Tenant reports | tenant_owner, tenant_admin, dispatcher where allowed |
| `/ops/incidents` | Incident / exception queue | tenant_owner, tenant_admin, dispatcher |

### Platform Control Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/platform` | Platform control dashboard | super_admin |
| `/platform/tenants` | Tenant list and management | super_admin |
| `/platform/tenants/:id` | Tenant detail / support actions | super_admin |
| `/platform/onboarding` | Tenant onboarding controls | super_admin |
| `/platform/audit` | Platform-wide audit visibility | super_admin |
| `/platform/reports` | Platform-level reporting and commercial distribution views | super_admin |
| `/platform/support` | Cross-tenant support and visibility tools | super_admin |

### Platform Ops Routes

| Route Pattern | Purpose | Access |
| --- | --- | --- |
| `/platform-ops` | Platform Ops home / health overview | platform_ops |
| `/platform-ops/incidents` | Incident and alert queue | platform_ops |
| `/platform-ops/incidents/:id` | Incident detail / active controls | platform_ops |
| `/platform-ops/impact` | Tenant and module impact view | platform_ops |
| `/platform-ops/releases` | Release history and release visibility | platform_ops |
| `/platform-ops/maintenance` | Maintenance control views | platform_ops |
| `/platform-ops/emergency-controls` | Emergency control management | platform_ops |
| `/platform-ops/recovery` | Rollback and recovery workflows | platform_ops |
| `/platform-ops/audit` | Ops action audit trail | platform_ops |

### School Run Route-Family Direction

No new top-level School Run route family is approved.

Current approved direction:
- guardian-led School Run flows must remain inside the public booking or
  `/customer/*` families where separately approved
- tenant-led School Run management and operational pages must remain inside
  `/ops/*`
- driver execution remains inside `/driver/*`
- platform governance/commercial visibility remains inside `/platform/*`

This keeps School Run aligned with the existing surface model instead of
creating a silent new application shell.

### Parcel Route-Family Direction

No new top-level Parcel route family is approved.

Current approved direction:
- parcel-intake entry, where later approved, must remain inside the public
  booking or `/customer/*` families
- tenant-led parcel management and proof-review pages must remain inside
  `/ops/*`
- driver parcel execution remains inside `/driver/*`
- platform governance/commercial visibility remains inside `/platform/*`

This keeps Parcel aligned with the existing surface model instead of creating a
silent logistics-only application shell.

### Route Ownership Boundary Rules

- `/customer/*` remains customer-account owned even when booking, payment, and tracking concepts overlap with public or tenant workflows
- `/driver/*` remains driver-owned even when trip-state data overlaps with dispatch and booking records
- `/ops/*` remains tenant-owned and must not absorb platform governance or platform-ops execution routes
- `/platform/*` remains governance/commercial/support owned and must not become the incident-execution surface
- `/platform-ops/*` remains operational execution owned and must not become a general commercial or tenant-admin surface

If a page needs to show shared domain data:
- the route still belongs to one authoritative surface
- cross-links may exist, but duplicate ownership should be avoided

---

## Canonical Rules

1. The route families above are the canonical top-level structure for documentation work.
2. Do not place driver, tenant operations, and platform control pages under one shared route family.
3. Keep platform control and platform ops as distinct top-level route families.
4. Public booking routes and authenticated customer routes must remain distinct even if the UI later feels similar.
5. Exact route names may be refined later, but route family ownership must remain stable unless explicitly reapproved.
6. Route inventory and module-aware gating must stay aligned so disabled modules never degrade into broken route behavior.
7. Shared domain entities do not justify merging route families across surfaces.
8. Default landing routes must stay aligned with the role-to-surface mapping.
9. School Run route expansion, when later approved, must stay inside the
   existing route families above rather than inventing a new top-level surface.
10. Parcel route expansion, when later approved, must stay inside the existing
    route families above rather than inventing a new top-level surface.

## Relationship to Module Gating

This inventory defines route ownership first.

Module-aware route gating is layered on top of that ownership.

Canonical direction:
- route family ownership stays stable
- some routes inside a surface may still be core, gated, hidden, or blocked depending on module/package state
- direct access to a gated route must fail cleanly rather than rendering a half-working page
- blocked or redirected routes should resolve inside the authoritative surface shell rather than bouncing through another surface frame

This document does not define every gating decision.
It defines how route ownership and gating relate.

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/03-platform/rbac.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/02-applications/customer-app.md`
- `docs/02-applications/customer-booking-flow-full.md`
- `docs/02-applications/driver-app-full.md`
- `docs/02-applications/admin-dispatch-system.md`

---

## Stop Conditions

Stop and clarify before changing this route inventory if:
- a route family merges two role surfaces
- platform pages are proposed under tenant routes
- customer and public booking flows become ambiguous
