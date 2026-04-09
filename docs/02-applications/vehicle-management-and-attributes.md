# Vehicle Management and Attributes

## Purpose

Define the canonical vehicle-management and vehicle-attribute baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- purely category-only operational vehicle handling
- inconsistent boundaries between quote-stage vehicle category and real dispatchable vehicle records
- unsupported assumptions around vehicle capabilities, extras, or operational suitability
- vehicle availability rules that drift away from driver and dispatch contracts

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical vehicle/fleet contract for the driver and operational domain.

---

## Scope

This document covers:
- tenant vehicle records baseline
- relationship between vehicle category and real vehicle records
- vehicle attributes that affect booking and dispatch suitability
- vehicle operational availability baseline
- vehicle capability direction for extras and suitability

---

## Out of Scope

This document does not define:
- detailed fleet CRUD UI
- maintenance scheduling workflows
- document-expiry automation
- full zone/geofence restrictions
- provider-specific maps/telematics integration

Those belong to later fleet, compliance, and operational-detail contracts.

---

## Related Documents

- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/dispatch-system.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/driver-app-full.md`

---

## Canonical Rules

1. Quote-stage selection may be category-level, but operational fulfilment depends on real tenant vehicle records.
2. Vehicles must be modelled as real tenant fleet records, not only category labels.
3. Vehicle suitability affects dispatch and operational assignment, not just pricing.
4. Vehicle attributes and capabilities must remain explicit rather than inferred ad hoc.
5. Vehicle operational availability is separate from quote-stage category eligibility.

---

## Category Versus Real Vehicle Boundary

This is the most important vehicle rule.

Approved direction:
- search-and-quote may return vehicle categories
- booking choice may remain category-oriented before operations begin
- dispatch and operational fulfilment must rely on real tenant vehicle records and their suitability

Meaning:
- `saloon`, `mpv`, and similar categories are useful customer-facing and pricing-facing abstractions
- they do not replace actual operational vehicle records

This keeps the booking and driver domains aligned.

---

## Tenant Vehicle Record Baseline

GreenRide should treat vehicles as real tenant fleet records.

Current baseline meaning:
- vehicles belong to a tenant
- vehicles have an operational category/class
- vehicles may be linked to a driver relationship where the tenant model supports that
- vehicles may carry attributes relevant to booking suitability and dispatch readiness

This is the first safe operational baseline.

---

## Vehicle Attribute Baseline

Current baseline vehicle attributes may include:
- vehicle category/class
- registration/identifier
- passenger capacity
- luggage capacity
- accessibility-related suitability where supported
- premium/executive suitability where supported
- active/inactive operational status

Later detail can expand the exact schema.
What matters now is that operationally relevant attributes must be explicit.

---

## Vehicle Capability Direction

Vehicle capabilities may affect whether a booking can be fulfilled safely.

Examples:
- higher luggage capacity
- accessibility suitability
- executive/premium suitability
- tenant-enabled extras that require compatible vehicle context

Canonical direction:
- booking-visible options and dispatch-visible suitability must not drift apart
- if an option or service implies a vehicle capability constraint, that constraint must be represented in operational logic rather than left as UI-only preference

This document does not define every capability matrix yet.
It defines the rule that capability must be explicit when it matters.

---

## Relationship to Quote Eligibility

Quote-stage vehicle eligibility remains category-level by approved booking-domain direction.

Canonical vehicle rule:
- quote eligibility may show categories even before exact operational vehicle selection is known
- later operational assignment must use real vehicle and driver suitability
- approved fallback category behavior for quoting does not imply that a real matching operational vehicle exists

This is the core bridge between Phase 4 and Phase 5.

---

## Operational Availability Baseline

A vehicle may exist as a tenant fleet record without being operationally available.

Current baseline direction:
- operational availability depends on more than category existence
- inactive or unsuitable vehicles must not be treated as clean dispatchable options
- driver assignment logic must consider whether the linked or candidate vehicle is suitable for the booking context
- a vehicle that becomes unavailable, inactive, or newly unsuitable during live operations must reduce assignment confidence explicitly rather than remaining silently dispatchable

This keeps actual trip fulfilment grounded in real fleet state rather than abstract category promises.

---

## Relationship to Driver and Dispatch

Vehicles sit between driver operations and dispatch decisions.

Current direction:
- driver suitability and vehicle suitability must both matter
- a driver may be visible without a suitable vehicle for a specific booking
- dispatch must not treat vehicle category alone as sufficient proof of operational fit
- allocation readiness must therefore be read as driver-plus-vehicle readiness, not driver readiness in isolation

This is especially important for:
- capacity-sensitive trips
- premium/executive trips
- accessibility-sensitive bookings
- extras/capability-sensitive bookings

---

## Extras and Capability Guardrail

Some booking extras/options may imply operational vehicle constraints.

Examples:
- luggage-related options
- accessibility-related requests
- premium-service expectations

Canonical direction:
- if an extra or service option affects fulfilment suitability, the system must not ignore that in operational assignment
- customer-facing option capture must not over-promise unsupported vehicle capability
- if a booking's committed operational requirements can no longer be met by the candidate or linked vehicle, the booking must return to explicit reassessment or reassignment flow rather than silently keeping the earlier assignment

This does not yet define the full extras-to-vehicle matrix.
It defines the guardrail that one must exist where needed.

---

## Failure and Restriction Direction

- quote-stage category availability must not be treated as guaranteed operational availability
- inactive or unsuitable vehicles must not be silently treated as dispatch-ready
- fallback quote categories must not leak into dispatch as if they were real vehicle records
- vehicle capability-sensitive bookings must not be fulfilled by ignoring explicit suitability constraints
- live operational assignment must not stay trusted when the underlying vehicle record is no longer a valid fulfilment match

---

## Invariants

1. Quote-stage category selection is not the same as final operational vehicle fulfilment.
2. Vehicles are real tenant fleet records, not only labels.
3. Vehicle suitability matters in dispatch, not only in quoting/pricing.
4. Vehicle operational availability is separate from category eligibility.
5. Capability-sensitive bookings must not ignore vehicle suitability constraints.

---

## Important Rule

GreenRide should use vehicle categories to simplify customer choice, but use real vehicle records and suitability to protect operational truth.

---

## Stop Conditions

Stop and clarify before implementation if:
- vehicle categories are being used as if they fully replace tenant fleet records
- quote-stage fallback categories are being treated as proof of real operational vehicle availability
- extras or service requirements with vehicle implications are being ignored in dispatch suitability
