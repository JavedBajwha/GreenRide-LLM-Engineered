# Zone, Geofence, and Custom Location Management

## Purpose

Define the canonical zone, geofence, and custom-location baseline for GreenRide operational logic.

This document exists so AI and future implementation work do not invent:
- conflicting meanings for zones between booking, pricing, and dispatch
- geofence behavior that silently becomes a map-provider feature assumption
- custom locations that bypass service-area or dispatch constraints
- location rules that mix operational restriction and pricing precedence with no boundary

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical location/zone/geofence contract for the dispatch and operations domain.

---

## Scope

This document covers:
- zones and geofences as operational/service-area rules
- custom/saved/operator-defined location concepts
- relationship between location rules and dispatch suitability
- service-area and operational-constraint baseline
- boundary between operations-first location rules and later pricing usage

---

## Out of Scope

This document does not define:
- map provider implementation
- geocoding/address normalisation mechanics
- final pricing precedence that uses zones
- the dedicated saved-location versus custom-route contract
- route rendering or ETA logic

Those belong to later maps, address strategy, pricing, and frontend contracts.

---

## Related Documents

- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/custom-routes-and-saved-locations.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/02-applications/dispatch-decision-contract.md`
- `docs/02-applications/dispatch-ranking-and-fallback.md`
- `docs/02-applications/vehicle-management-and-attributes.md`

---

## Canonical Rules

1. Zones/geofences/custom locations should be treated first as operational and service-area rules.
2. Location rules must be tenant-scoped.
3. Dispatch suitability may depend on service-area/location constraints.
4. Pricing may reference zone/location rules later, but operational meaning comes first in this contract.
5. Custom locations must not bypass service-area and suitability rules.

---

## Operational-First Boundary

This is the most important location rule.

Approved direction:
- zones and geofences first define where a tenant serves, restricts, or operationally treats work differently
- they do not automatically become the primary pricing model just because they exist
- pricing may later reference them where explicitly documented

This keeps the dispatch/location contract clean and prevents it from swallowing the pricing contract.

---

## Zone Baseline

A zone is an operationally meaningful area defined by the tenant/platform context.

Current baseline meaning:
- service coverage may vary by zone
- dispatch suitability may vary by zone
- special operational treatment may apply by zone

Examples:
- airport area handling
- restricted service area
- preferred operational area
- special queue/priority handling area

This document does not define the final full zone taxonomy.
It defines that zones are real operational constructs.

---

## Geofence Baseline

A geofence is a spatial operational boundary used to evaluate whether a booking, driver, or service condition falls within a relevant area.

Current baseline direction:
- geofence logic may support service-area checks
- geofence logic may support dispatch suitability or area rules
- geofence logic must not be assumed to depend on one specific maps implementation

This keeps the concept operational rather than provider-bound.

---

## Custom and Saved Location Direction

Custom or saved locations may exist as reusable tenant-defined or user-defined place references.

Examples:
- airport terminal pickup point
- hotel entrance
- depot/yard
- named corporate pickup location

Canonical direction:
- custom/saved locations may improve operational consistency
- they still remain subject to service-area and suitability rules
- a named custom location must not bypass tenant restrictions or dispatch constraints just because it is preconfigured

---

## Service-Area Baseline

Zones and geofences may define where a tenant can or should operate.

Current baseline direction:
- a booking may be serviceable, restricted, or require special treatment depending on area rules
- dispatch may use area rules when judging suitability or fallback paths
- service-area logic should remain explicit rather than hidden inside map or pricing assumptions

Operational reading:
- some area rules fully block normal assignment
- some area rules may leave the booking serviceable but lower-confidence or special-handling
- the platform must keep those two outcomes distinguishable rather than collapsing both into vague dispatch failure

This is the first safe service-area contract.

---

## Relationship to Dispatch

Location rules affect dispatch, but do not replace the dispatch decision contract.

Canonical direction:
- zones/geofences/custom locations may shape suitability gates or operator awareness
- they may affect candidate fitness or operational constraints
- they must not silently become undocumented ranking logic outside the dispatch contracts
- if location rules make a booking restricted, low-confidence, or special-handling, that outcome must remain explicit in the dispatch path rather than hidden behind map-only context

This keeps geo-logic aligned with the dispatch backbone.

---

## Relationship to Quote and Pricing

Quote and pricing may later use zone/location rules, but that is not their first meaning here.

Approved boundary:
- this contract defines operations/service-area meaning first
- pricing contracts may later define when and how zone rules affect fare logic
- booking/quote layers must not assume every zone rule is automatically a pricing rule

This is important because the pricing precedence contract is still only partial.

---

## Custom Location Guardrail

Named or saved locations must help operational consistency, not weaken control.

Canonical direction:
- custom locations may standardise known pickup/dropoff handling
- they must still resolve through tenant-scoped service-area logic
- they must not be treated as inherently valid for every route, service, or dispatch path
- operator-defined custom locations may improve consistency, but they do not waive area restrictions, serviceability limits, or special-handling rules

---

## Failure and Restriction Direction

- unsupported or restricted area requests must fail or route visibly rather than being silently accepted
- zone/geofence logic must not be hidden behind map-only visuals
- custom locations must not override operational restrictions
- if area rules make a booking low-confidence or unsuitable, that must remain visible for review/intervention
- area-rule visibility must stay available even when the map is degraded or unavailable

---

## Invariants

1. Location rules are tenant-scoped.
2. Zones/geofences are operational/service-area constructs first.
3. Pricing use of zones is later and explicit, not assumed here.
4. Custom/saved locations do not bypass service-area rules.
5. Dispatch suitability may depend on location constraints, but location does not replace the dispatch contract.

---

## Important Rule

GreenRide should use zones, geofences, and custom locations to make operations more consistent and controllable, not to hide operational restrictions inside ad hoc map behavior or pricing shortcuts.

---

## Stop Conditions

Stop and clarify before implementation if:
- zones are being treated as pricing-first with no operational/service-area contract
- geofence behavior is being invented as a provider-specific feature by assumption
- saved/custom locations are being allowed to bypass dispatch or service-area constraints
