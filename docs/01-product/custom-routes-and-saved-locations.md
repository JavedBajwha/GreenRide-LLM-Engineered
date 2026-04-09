# Custom Routes and Saved Locations

## Purpose

Define the canonical difference between saved locations and custom routes in GreenRide.

This document exists so AI and future implementation work do not invent:
- saved addresses that silently become pricing rules
- customer convenience data that bypasses operational controls
- tenant route templates that behave like arbitrary map shortcuts
- conflicting meanings for reusable locations across booking, pricing, and dispatch

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical custom-routes and saved-locations contract for the booking and location domain.

---

## Scope

This document covers:
- saved locations as reusable place references
- custom routes as tenant-approved reusable journey definitions
- customer-level versus tenant-level ownership boundaries
- relationship to pricing, service-area rules, and dispatch constraints
- guardrails that keep convenience data separate from business-rule data

---

## Out of Scope

This document does not define:
- final pricing-editor UX
- fixed-route precedence mechanics
- map/geocoding provider behavior
- detailed customer saved-location UI flows
- detailed dispatch ranking logic

Those belong to later pricing, frontend, maps, and dispatch follow-through.

---

## Related Documents

- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/01-product/price-structure-configuration.md`
- `docs/02-applications/zone-geofence-and-custom-location-management.md`
- `docs/05-frontend/customer-ui-contract.md`

---

## Canonical Rules

1. Saved locations and custom routes are different concepts and must not be treated as interchangeable.
2. Saved locations are convenience references first, not pricing or dispatch rules.
3. Custom routes are tenant-approved operational or pricing-aware journey definitions.
4. Neither saved locations nor custom routes may bypass tenant-scoped service-area, suitability, or dispatch constraints.
5. Pricing impact must be explicit. It is never implied by the mere existence of a saved place or named route.

---

## Saved Locations Baseline

Saved locations are reusable named pickup or dropoff references.

Examples:
- home
- office
- hotel entrance
- airport terminal pickup point
- corporate reception desk

Baseline direction:
- saved locations exist to speed booking entry and reduce repeated address input
- they may be user-defined or tenant-provided depending on the surface and use case
- they remain place references, not route definitions
- they do not define fare logic by themselves

Saved locations are convenience data.
They help users select known places faster, but they do not create a special pricing or dispatch path on their own.

---

## Saved-Location Ownership Boundary

Saved locations may exist at more than one scope, but the scopes must stay explicit.

Approved baseline:
- customer saved locations may exist for personal reuse in the customer surface
- tenant-defined named locations may exist where the tenant needs controlled reusable places such as depots, terminals, schools, or corporate pickup points
- platform/global location ownership should not be assumed unless explicitly documented later

This keeps personal convenience data separate from tenant-controlled operational location data.

---

## Custom Routes Baseline

Custom routes are tenant-approved reusable journey definitions or route templates.

Examples:
- airport to city-centre route
- hotel shuttle route
- school transfer corridor
- corporate office to depot route

Baseline direction:
- custom routes are stronger than saved locations
- they define an approved reusable journey pattern, not just a saved place
- they may participate in pricing or operational handling only where explicitly configured
- they are tenant-controlled, not arbitrary customer-created route logic

Custom routes are business-rule data, not simple convenience data.

---

## Pricing Boundary

This boundary is critical.

Approved direction:
- saved locations do not define fare logic by themselves
- custom routes may affect pricing only where the pricing contract explicitly references them
- fixed-route, zone, and generic dynamic pricing precedence still belongs to the pricing contracts
- a custom route is not automatically the winning pricing path just because it exists as a reusable journey definition
- saved locations must not be treated as proof that a fixed route, zone rule, or special fare applies

This prevents a saved address from quietly becoming a fare override and prevents custom routes from inventing undocumented pricing behavior.

---

## Service-Area and Dispatch Boundary

Neither saved locations nor custom routes override operational controls.

Canonical direction:
- all saved locations still resolve through tenant-scoped service-area and restriction logic
- all custom routes still remain subject to suitability, availability, and dispatch rules
- a named route or location must not be treated as automatically serviceable just because it is preconfigured

This keeps reusable location assets aligned with operational reality.

---

## Customer Boundary

Customer-facing saved locations should remain simple.

Approved baseline:
- customers may use saved locations to speed booking entry and rebooking
- customers should not create arbitrary pricing-aware custom routes
- any customer-facing route reuse should remain within approved product guardrails rather than becoming a custom route builder

This keeps the customer experience lightweight and avoids exposing business-rule configuration through the customer surface.

---

## Tenant and Operator Boundary

Tenants and operators may manage stronger reusable location assets than customers.

Approved baseline:
- tenants may define approved named locations for operational consistency
- tenants may define approved custom routes where the product explicitly supports them
- these assets remain tenant-scoped and controlled
- they must still obey the pricing, service-area, and dispatch contracts

This gives operations useful reusable structures without turning location management into an uncontrolled rule engine.

---

## Invariants

1. Saved locations are reusable place references.
2. Custom routes are reusable tenant-approved journey definitions.
3. Saved locations do not define fare logic by themselves.
4. Custom routes affect pricing or operations only where explicitly configured.
5. Neither concept bypasses tenant-scoped service-area, suitability, or dispatch rules.

---

## Important Rule

GreenRide should use saved locations to improve booking convenience and custom routes to support explicit tenant-approved operational or pricing patterns.

The platform must not blur those two concepts together.

---

## Stop Conditions

Stop and clarify before implementation if:
- saved locations are being used as implicit fare or dispatch overrides
- customers are being allowed to create arbitrary pricing-aware routes
- custom routes are being treated as valid even when service-area or dispatch rules would reject them
- tenant-defined named places and customer personal saved places are being merged into one uncontrolled data model
