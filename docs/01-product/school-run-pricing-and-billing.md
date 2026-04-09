# School Run Pricing And Billing

## Purpose

Define the canonical first-pass pricing and billing direction for the optional
`School Run` add-on.

This document exists so AI and future implementation work do not invent:
- School Run pricing as only ordinary trip-by-trip ride pricing
- unsupported recurring billing assumptions
- full-period charges when the service period is only partially active
- authority drift between School Run pricing policy and the core pricing engine

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical School Run pricing and billing contract.

---

## Scope

This document covers:
- recurring-first School Run pricing direction
- one-off school journey pricing where tenant policy allows
- approved billing cadence direction
- approved pricing bases
- calendar-aware partial-period handling
- the relationship between School Run commercial arrangements and the shared
  pricing engine

---

## Out of Scope

This document does not define:
- payment-provider mechanics
- tax/VAT/legal invoicing policy
- final invoice templates
- attendance-based billing logic
- final refunds/credits policy for every school-specific exception
- final finance ledger schema

Those belong to later finance, invoicing, and implementation contracts.

---

## Roles Affected

- `tenant_owner`
- `tenant_admin`
- `office_staff`
- `dispatcher` as visibility stakeholder only where tenant policy allows
- `customer` where guardian-led commercial visibility exists
- `super_admin` as commercial/module-governance scope only

---

## App Surfaces Affected

- tenant operations surface
- public or customer surface where guardian-led pricing visibility is approved
- platform control surface for module/commercial governance only

---

## Related Documents

- `docs/01-product/pricing-engine.md`
- `docs/01-product/price-structure-configuration.md`
- `docs/03-platform/module-commercial-model.md`
- `docs/03-platform/school-run-authority-and-configuration.md`
- `docs/01-product/school-run-workflow.md`
- `docs/03-services/analytics-and-reporting.md`

---

## Canonical Rules

1. School Run pricing is recurring-first, not only trip-by-trip.
2. One-off school journeys may use one-off journey pricing where tenant policy
   allows them.
3. Weekly and monthly billing cadence must be supported.
4. Optional bespoke or custom invoicing may exist as an advanced mode, but it
   is not the baseline assumption.
5. The pricing basis must be explicit as rider-based, corridor or route-based,
   or mixed.
6. Partial-period billing must be calendar-aware.
7. School Run pricing rules must not invent new booking lifecycle states or
   replace the shared pricing-engine boundary for journey pricing logic.

---

## Pricing Model Direction

Approved first-pass School Run pricing direction:
- recurring arrangement pricing is the primary commercial model
- one-off school journeys are secondary and optional

This means School Run should not be documented as:
- only a normal ride quote with a school label
- only a subscription with no journey-level transport context

It is a recurring transport arrangement layered onto shared journey execution.

---

## Approved Pricing Bases

The tenant may use one of these approved basis models:

| Basis | Meaning |
| --- | --- |
| rider_based | pricing is primarily tied to the rider/service participant context |
| corridor_or_route_based | pricing is primarily tied to the approved school corridor or route context |
| mixed | both rider and corridor/route factors participate in pricing |

Rules:
- the tenant's School Run pricing basis must be explicit
- the platform must not guess between rider-based and corridor-based charging
- mixed pricing must still remain explainable and tenant-configured rather than
  heuristic

---

## Billing Cadence Direction

Approved first billing cadence support:
- weekly
- monthly

Optional later direction:
- bespoke/custom invoicing where later commercial and invoicing contracts allow

Guardrail:
- custom invoicing is an advanced mode, not the default fallback for unclear
  baseline pricing

---

## Partial-Period Handling

School Run billing must support calendar-aware partial-period treatment.

Approved first direction:
- billable adjustment may be based on active service days
- billable adjustment may be based on active service weeks
- tenant billing rules determine which of those approved models applies

Important rule:
- the system must not assume a full weekly or monthly charge when the approved
  service period covers only part of that billing period

This is a partial-period boundary, not an approved attendance/absence engine.

---

## Relationship to the Shared Pricing Engine

School Run pricing does not replace the core pricing-engine discipline.

Canonical direction:
- recurring arrangement pricing defines the School Run commercial basis
- one-off School Run journeys may still use the shared journey-pricing engine
  where tenant policy allows them
- where a concrete journey instance needs a price reference or exception
  explanation, pricing provenance should remain explicit rather than hidden

This keeps School Run commercially distinct without creating a second
undocumented pricing system.

---

## Journey-Level Exception Boundary

This document approves one-off School Run journeys where tenant policy allows
them.

Rules:
- one-off School Run journeys do not erase the recurring-first design direction
- one-off School Run journeys may use journey-level pricing rather than the
  recurring arrangement basis where explicitly allowed
- one-off journey pricing must stay explicit rather than being treated as an
  automatic fallback for incomplete recurring configuration

---

## Billing Visibility Boundary

School Run billing visibility must follow the approved authority model.

Baseline direction:
- tenant-side financial and configuration visibility belongs inside the tenant
  operations surface
- guardian/customer-side price visibility exists only where the configured
  School Run authority mode and customer flow explicitly allow it
- `super_admin` platform visibility remains governance/commercial scope rather
  than routine tenant finance execution

---

## Data Model Links

This contract assumes the platform may later need records for:
- School Run pricing basis and billing cadence at tenant scope
- recurring arrangement price context
- partial-period adjustment basis
- journey-level exception or one-off pricing linkage where approved

Exact schema and invoice-model detail remain open.

---

## Security / Tenancy Rules

1. School Run pricing remains tenant-scoped.
2. School Run commercial visibility must remain subordinate to RBAC and tenant
   authority.
3. Module enablement does not by itself grant financial visibility or pricing
   editing rights.
4. A tenant must not be able to bypass the approved pricing basis or
   partial-period rules through undocumented manual behavior.

---

## Failure / Exception Rules

- if the tenant has not configured an approved School Run pricing basis, the
  system must not guess one
- if recurring School Run pricing is incomplete, the platform must not silently
  fall back to ordinary ad hoc journey pricing for the entire add-on
- if one-off School Run journeys are not approved for the tenant, they must
  remain blocked rather than inferred from generic booking capability
- if a later finance requirement needs richer credits, refunds, or attendance
  adjustments, docs must be extended before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- School Run pricing is being treated as only ordinary ride pricing
- the system is assuming full-period charges with no partial-period rule
- attendance or absence billing logic is being invented without documentation
- a new finance or invoicing model is being assumed outside the approved
  cadence and basis rules
