# Zone and Area Pricing

## Purpose

Define the canonical zone/area pricing baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- zone pricing as an implicit side effect with no explicit pricing path
- conflicting precedence between fixed routes, zone pricing, and generic distance/time pricing
- zones that are always pricing rules just because they exist operationally
- customer quote behavior that drifts away from tenant-configured area pricing rules

---

## Status

Draft, approved as the current documentation direction.

This document is the canonical zone/area pricing contract for the customer-booking and pricing domain.

---

## Scope

This document covers:
- zone/area pricing meaning in fare logic
- relationship between zone pricing and operational zone rules
- zone-pricing path selection baseline
- high-level precedence against fixed-route and generic pricing paths
- quote-stage implications
- zone-combination direction
- tenant-editor guardrails

---

## Out of Scope

This document does not define:
- final tenant zone editor UX
- exact polygon/geofence modeling
- every zone conflict-resolution edge case
- final surcharge catalog by zone

Those belong to later tenant-configuration, maps/location, and pricing-detail work.

---

## Related Documents

- `docs/01-product/pricing-engine.md`
- `docs/02-applications/zone-geofence-and-custom-location-management.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/03-platform/tenant-configuration.md`

---

## Canonical Rules

1. Zone/area pricing must be explicit when used; it must not be inferred ad hoc from map/location data alone.
2. Zones remain operational/service-area constructs first, but pricing may explicitly reference them.
3. Fixed-route pricing takes precedence over zone pricing when an approved fixed route applies.
4. Zone pricing takes precedence over generic non-fixed pricing only when the tenant has explicitly configured zone pricing for the request context.
5. If no explicit fixed-route or zone-pricing path applies, the pricing engine falls back to the applicable generic pricing model.
6. Zone matches and area references must not become hidden post-hoc pricing overrides once another authoritative core pricing path has already been selected.

---

## Zone Pricing Meaning

Zone pricing means the tenant has explicitly configured fare behavior based on one or more approved operational areas.

Baseline meaning:
- the quote may be priced from zone/area rules rather than generic distance/time logic
- zone pricing is still tenant-scoped and rule-driven
- zone pricing is not just “any booking inside a zone gets a random special fare”

This keeps zone pricing as a real pricing path rather than a vague adjustment layer.

---

## Relationship to Operational Zones

Zones already exist as operational/service-area constructs.

Canonical boundary:
- operational zone meaning comes first
- pricing may reference approved zone definitions later
- the existence of a zone does not automatically mean the tenant uses zone pricing there

This prevents the operations/location contract from being silently reinterpreted as pricing logic.

---

## Pricing-Path Selection Baseline

Current approved pricing-path direction should now be read as:

1. determine whether the request matches an approved fixed-route pricing path
2. if not fixed-route, determine whether an explicit zone/area pricing rule applies
3. if no zone-pricing rule applies, use the applicable generic non-fixed tenant pricing model
4. if a tenant pricing rule is missing, use the approved fallback behavior already documented for the search-and-quote slice

This is the first explicit baseline for where zone pricing sits in the pricing path.

---

## Zone Pricing Usage Direction

Zone pricing may be used where the tenant has approved fare behavior such as:
- pickup in a priced zone
- dropoff in a priced zone
- pickup/dropoff pair across approved zones
- area-specific service handling that carries a defined fare effect

This document does not finalize every supported zone combination.
It sets the baseline that zone pricing must be explicitly configured and consciously selected.

### Zone-Combination Baseline

Approved first combination direction:
- a tenant may price by pickup zone only, dropoff zone only, or approved pickup/dropoff zone pair
- if more than one zone rule could match, the tenant configuration must resolve that through an explicit precedence rule rather than ambiguous overlap
- zone pricing should not stack multiple unrelated zone fares unless a later contract explicitly allows it
- unresolved zone overlap must be treated as a configuration problem, not solved by undocumented runtime heuristics

---

## Quote-Stage Direction

Zone pricing is a quote-stage pricing concern, not just an ops concern.

Canonical direction:
- if a zone-pricing path applies, quote generation should surface the resulting fare basis through the normal pricing path
- zone pricing should remain compatible with vehicle-category selection and later confirmation rules
- quote generation must not silently mix zone pricing with fixed-route pricing in the same request path without an explicit rule
- if an approved fixed-route path already owns the request, zone pricing does not silently re-enter later as a second core path or hidden override layer

---

## Precedence Guardrail

The current high-level precedence baseline is:

1. fixed-route pricing if an approved fixed route applies
2. explicit zone/area pricing if configured and applicable
3. generic non-fixed pricing model
4. approved fallback defaults where no tenant rule exists

This is not yet the final deep precedence matrix.
It is the minimum explicit rule needed to stop pricing drift.

### Tenant-Editor Guardrails

If a tenant editor for zone pricing exists later, it should require:
- explicit zone or area references
- explicit fare effect or rule selection
- explicit precedence where overlap is possible
- validation that the referenced pricing zones are actually approved pricing inputs
- validation that zone pricing does not quietly conflict with a higher-precedence fixed-route path for the same request pattern unless an explicit later rule allows that relationship

---

## Important Rule

GreenRide should treat zone/area pricing as an explicit tenant-configured pricing path that references operational area constructs, not as an automatic consequence of zone existence.

---

## Stop Conditions

Stop and clarify before implementation if:
- zone pricing is being applied just because a map/geofence match exists
- fixed-route and zone pricing are being applied together with no explicit rule
- operational zones are being assumed to always imply pricing zones
- generic distance/time pricing is bypassing an explicitly configured zone-pricing path
