# Parcel Pricing And Size Model

## Purpose

Define the canonical first-pass pricing and size-model direction for the
optional `Parcel / Courier / Logistics` add-on.

This document exists so AI and future implementation work do not invent:
- parcel pricing as passenger-trip pricing with renamed fields
- class-only parcel pricing with no measured validation
- measured-dimension pricing with no operational class simplification
- unsupported assumptions about oversized or handling-sensitive delivery logic

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical Parcel pricing and size-model contract.

---

## Scope

This document covers:
- named parcel-class direction
- measured dimension and weight direction
- zone or distance pricing direction
- service and handling-level pricing direction
- first-pass support for larger and handling-sensitive deliveries
- the relationship between parcel pricing truth and the shared pricing system

---

## Out of Scope

This document does not define:
- final dimensional thresholds
- exact weight bands
- tax/VAT/legal invoice treatment
- final promo or discount behavior
- warehouse-storage pricing
- final compensation logic for parcel operators

Those belong to later pricing, finance, and operations refinement work.

---

## Roles Affected

- `tenant_owner`
- `tenant_admin`
- `office_staff`
- `dispatcher` as operational visibility stakeholder only
- `customer` where parcel-intake pricing visibility is later approved
- `super_admin` as commercial/module-governance scope only

---

## App Surfaces Affected

- tenant operations surface
- public or customer surface where parcel-intake pricing is later approved
- platform control surface for module/commercial governance only

---

## Related Documents

- `docs/01-product/parcel-logistics-workflow.md`
- `docs/03-services/parcel-proof-and-tracking-contract.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/03-platform/tenant-configuration.md`

---

## Canonical Rules

1. Parcel pricing must not reuse passenger-trip pricing truth by default.
2. Named parcel classes are approved for operational simplicity.
3. Measured dimensions and weight are approved for validation and pricing
   accuracy.
4. Parcel classes must not become the only source of pricing or suitability
   truth.
5. Parcel pricing must consider zone or distance direction.
6. Parcel pricing must consider service or handling level direction.
7. First-pass parcel pricing must support larger, oversized, pallet, and
   handling-sensitive deliveries without collapsing them into small-parcel
   logic.

---

## Pricing Model Direction

Approved first-pass parcel pricing direction combines:
- named parcel classes
- measured dimensions and weight
- zone or distance direction
- service or handling-level direction

This creates a pricing model that is:
- operationally understandable
- measurable
- separate from passenger transport fare logic

---

## Named Parcel Classes

Named classes are approved for operational simplicity.

First-pass supported examples:
- small parcels
- larger boxes
- oversized items
- pallets
- handling-sensitive deliveries

Rules:
- class labels aid operational triage and quoting
- class labels must not become the only source of suitability or pricing truth
- later work may define exact class catalogs and thresholds explicitly

---

## Measured Dimensions And Weight

Measured dimensions and weight are approved as part of parcel pricing truth.

Approved direction:
- dimensions and weight may validate whether a selected parcel class is
  appropriate
- dimensions and weight may materially affect pricing
- dimensions and weight must remain explicit rather than hidden assumptions

This prevents class-only pricing from becoming too coarse for real logistics.

---

## Zone, Distance, Service, And Handling Direction

Parcel pricing should also consider:
- zone or distance context
- service level
- handling level

Examples of direction that may affect price:
- local versus wider delivery zones
- standard versus faster service levels
- handling-sensitive requirements
- larger-item or pallet handling expectations

This keeps parcel pricing aligned with logistics realities rather than passenger
fare semantics.

---

## Relationship to Shared Pricing Systems

Parcel pricing may reuse shared pricing infrastructure where useful, but
parcel-pricing truth remains its own model.

Rules:
- parcel pricing must not silently reuse passenger-trip fare paths as the
  default
- parcel-specific class, size, and handling logic must remain visible in the
  pricing contract
- later parcel pricing-engine mechanics may be implemented on shared
  infrastructure without erasing parcel-domain meaning

---

## Suitability Boundary

Parcel size modeling is not only about price.

Approved direction:
- class, dimensions, and weight together may influence operational suitability
- handling requirements may influence both suitability and price
- unsupported parcel shapes or requirements must remain explicit rather than
  quietly accepted through a generic quote path

This keeps operational truth and pricing truth aligned.

---

## Data Model Links

This contract assumes the platform may later need records for:
- parcel class
- measured dimensions
- measured weight
- service-level selection
- handling-level selection
- parcel pricing result or provenance

Exact schema detail remains open.

---

## Security / Tenancy Rules

1. Parcel pricing remains tenant-scoped.
2. Module enablement does not by itself grant pricing-edit authority.
3. Tenant parcel pricing must stay inside documented parcel pricing models
   rather than undocumented manual heuristics.
4. Customer or public pricing visibility for parcel intake must remain inside
   the approved authority and surface boundaries.

---

## Failure / Exception Rules

- if class, size, or handling data is incomplete, the system must not pretend a
  validated parcel quote exists
- if a named class conflicts with measured dimensions or weight, the conflict
  must remain explicit rather than hidden
- if a parcel falls outside the approved first-pass size or handling scope, the
  docs must be extended before implementation
- if later requirements need threshold matrices or advanced surcharge rules,
  docs must expand before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- parcel pricing is being treated as renamed passenger pricing
- parcel class is being treated as the only pricing truth
- measured dimensions or weight are being ignored after capture
- pallet or oversized handling is being forced into small-parcel rules by
  assumption
