# Route Selection and Vehicle Eligibility

## Purpose

Define the canonical route-selection and vehicle-eligibility model for GreenRide customer booking and quote generation.

This document exists so AI and future implementation work do not invent:
- unclear fixed-route vs dynamic-route behavior
- inconsistent vehicle-category eligibility rules
- misuse of the approved fallback category list
- different route/vehicle behavior between quote generation and later booking stages

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical route-selection and vehicle-eligibility contract for the customer-booking domain.

---

## Scope

This document covers:
- route-selection baseline for quote generation
- fixed-route vs dynamic-route direction
- vehicle-category eligibility during quote generation
- fallback category behavior
- scope boundaries between quote eligibility and real operational assignment

---

## Out of Scope

This document does not define:
- final pricing rule precedence
- dispatch candidate ranking
- real trip vehicle assignment logic
- zone/geofence management
- the saved-location versus custom-route contract
- maps/geocoding provider mechanics

Those belong to later pricing, dispatch, and maps contracts.

---

## Related Documents

- `docs/01-product/pricing-engine.md`
- `docs/01-product/custom-routes-and-saved-locations.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/06-implementation/search-and-quote-canonical-spec.md`
- `docs/06-implementation/approvals/decision-009-fallback-vehicle-category-behaviour.md`
- `docs/04-architecture/data-model.md`
- `backend/prisma/schema.prisma`

---

## Canonical Rules

1. Route selection and vehicle eligibility must be tenant-scoped.
2. Quote generation may return eligible vehicle categories before a final booking is confirmed.
3. Quote-stage vehicle eligibility is not the same thing as final dispatch assignment.
4. Fixed-route and dynamic-route behavior must remain explicit rather than inferred ad hoc.
5. The approved fallback vehicle-category list applies only where explicitly documented.
6. Search-and-quote may use a category-level eligibility model even when tenant fleet data is incomplete.

---

## Route Selection Baseline

GreenRide supports quote generation across multiple trip types:
- `one_way`
- `return_trip`
- `hourly`
- `multi_stop`

Baseline route-selection direction:
- every quote request must resolve as either a fixed-route pricing path or a dynamic journey/pricing path
- the system must not mix these paths implicitly without a later pricing-precedence contract

For now, the important product rule is:
- route path selection must be explicit at the pricing/quote logic level, even if the final precedence contract is still documented later

---

## Fixed Route vs Dynamic Route Direction

### Fixed Route

Use fixed-route behavior when:
- a tenant has an approved configured route that matches the requested journey sufficiently for fixed-route pricing

Baseline meaning:
- the quote may be priced from tenant-configured route logic rather than purely computed distance/time logic

### Dynamic Route

Use dynamic-route behavior when:
- no matching fixed-route pricing path applies
- the booking should be priced from the applicable non-fixed pricing model

Baseline meaning:
- quote generation uses the applicable dynamic pricing logic rather than a configured fixed route

### Current Guardrail

This document does **not** yet define the final precedence algorithm between:
- fixed route
- zone/area logic
- distance/time logic
- hourly pricing

That remains a later pricing-contract task.

What this document does define is:
- the route path must be consciously selected, not guessed differently by each layer
- route selection must not be silently rewritten later by category choice, saved-location convenience data, or ad hoc pricing fallbacks

---

## Vehicle Eligibility Baseline

During quote generation, the system resolves a set of eligible vehicle categories for the tenant and request context.

Baseline direction:
- eligibility at quote stage is category-oriented
- quote generation may return one or many eligible categories
- the `vehicleCategory` request field may narrow the result set when explicitly supplied

Quote-stage eligibility should consider:
- tenant scope
- trip type
- tenant fleet/category availability where applicable
- approved fallback behavior when no active vehicle records exist

This contract intentionally stays at the category level for quote generation.
Final driver/vehicle assignment belongs to later operational domains.

---

## Vehicle Category Source Baseline

Search-and-quote canonical direction already states:
- booking service reads eligible vehicle categories from tenant data
- pricing runs for each resolved category

Baseline rule:
- the booking/quote orchestration layer resolves eligible categories first
- pricing then prices the resolved categories
- pricing service should not independently invent a different eligibility set

---

## Approved Fallback Vehicle Category Rule

Approved by:
- `docs/06-implementation/approvals/decision-009-fallback-vehicle-category-behaviour.md`

Canonical fallback list:
- `saloon`
- `mpv`
- `executive`

When it applies:
- during quote generation
- when a tenant has no active Vehicle records available to derive category options

When it does **not** apply automatically:
- booking confirmation
- dispatch vehicle assignment
- operational trip execution

This fallback exists to keep early-setup tenants quotable.
It does not prove that an actual dispatchable vehicle exists for the trip.

---

## Quote-Stage vs Operational Eligibility Boundary

This boundary is critical.

### Quote Stage

At quote stage, the platform may return:
- eligible categories derived from tenant fleet categories
- or the approved fallback category list if no active tenant vehicles exist

### Booking / Dispatch Stage

Later stages must not assume that:
- every quoted category is dispatch-ready
- fallback categories guarantee real operational availability

This means:
- quote eligibility is a pricing/selection contract
- operational assignment is a later availability/dispatch contract

---

## Trip-Type Direction

Trip type influences route and pricing path selection.

Approved trip types from schema/API contracts:
- `one_way`
- `return_trip`
- `hourly`
- `multi_stop`

Baseline rule:
- the request `tripType` must remain part of route and vehicle-category eligibility context
- later pricing contracts may refine exact model-selection behavior per trip type

This document does not yet define trip-type-specific fare precedence in detail.

---

## Request Narrowing Rule

If the quote request explicitly includes `vehicleCategory`:
- the system may narrow quote generation to that category if it is eligible
- if it is not eligible, the request should not silently pretend eligibility

How the system responds on non-eligible requested categories can be tightened later with pricing/failure contracts, but the core rule is:
- explicit requested category does not override eligibility rules
- explicit requested category does not force a different pricing path than the route-selection result

## Reusable Location Asset Boundary

This document must stay aligned with the custom-routes and saved-locations contract.

Baseline direction:
- saved locations may help resolve known pickup/dropoff places, but they do not by themselves select fixed-route or zone-pricing behavior
- custom routes may influence route-path selection only where the tenant has explicitly configured them as pricing-aware route assets
- a named route or saved place must not be treated as proof that pricing precedence changed unless the pricing contracts explicitly say so

---

## Invariants

1. Route and vehicle eligibility are tenant-scoped.
2. Quote-stage vehicle eligibility is category-level, not final driver assignment.
3. Fallback category behavior is allowed only in the explicitly approved quote-generation case.
4. Search-and-quote must not invent a different fallback list.
5. Route path selection and category eligibility must happen before pricing results are finalized.
6. Requested vehicle category and reusable location assets may narrow or support the request context, but they do not by themselves override route-path selection.

---

## Failure and Exception Direction

- if a route cannot be resolved into a supported pricing path, quoting should fail safely rather than inventing a path
- if a requested category is not eligible, the system should not silently treat it as eligible
- if no tenant fleet categories exist, quote generation may use the approved fallback list
- if later booking or dispatch cannot honor a previously quoted category, that must be handled by later booking/dispatch contracts rather than hidden here

---

## Important Rule

Quote-stage category availability is not the same thing as guaranteed operational fulfilment.

This distinction must stay explicit across later booking, driver, and dispatch work.

---

## Stop Conditions

Stop and clarify before implementation if:
- fixed-route and dynamic-route paths are being mixed with no explicit rule
- pricing service is expected to invent vehicle eligibility independently of booking/quote orchestration
- the fallback category list is being reused outside quote generation without an explicit decision
- quote eligibility is being treated as proof of real dispatch availability
- new vehicle categories are being added to the fallback list without a superseding approved decision
