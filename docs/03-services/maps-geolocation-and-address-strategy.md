# Maps, Geolocation, ETA, and Address Strategy

## Purpose

Define the canonical maps, geolocation, ETA, and address-strategy baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- map/provider output as the owner of business rules
- ETA, distance, and route data that silently override pricing, dispatch, or service-area logic
- inconsistent address handling across booking, ops, and tracking surfaces
- geolocation or map visuals that become a hidden source of truth

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical maps/address strategy contract for the Phase 7 service domain.

---

## Scope

This document covers:
- maps/provider responsibility boundary
- address resolution and normalisation direction
- ETA/distance/route-data support role
- geolocation usage baseline
- relationship between map/address outputs and business-rule authority

---

## Out of Scope

This document does not define:
- final provider selection
- final API/SDK implementation detail
- final event payloads for live map updates
- full fixed-route pricing precedence
- full zone-pricing contract
- exact UI layouts for maps or address pickers

Those belong to later provider, pricing, realtime, and frontend contracts.

---

## Related Documents

- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/customer-tracking-and-visibility.md`
- `docs/02-applications/dispatch-map-behavior.md`
- `docs/02-applications/zone-geofence-and-custom-location-management.md`
- `docs/03-services/realtime-system.md`

---

## Canonical Rules

1. Maps, geolocation, ETA, and address services are supporting computation and visibility layers, not owners of business rules.
2. Booking, pricing, dispatch, and service-area rules remain authoritative over provider-derived outputs.
3. Address handling must be tenant-safe and operationally usable across booking and ops flows.
4. ETA, distance, and route data may inform decisions, but they must not silently override explicit business-rule contracts.
5. Map visuals are supportive views, not hidden sources of truth.
6. Provider choice remains open until a later explicit contract approves it.

---

## Supporting-Layer Boundary

This is the most important rule in the document.

Approved direction:
- map/address services support the platform with lookup, estimation, and visual context
- they do not own booking lifecycle, service eligibility, pricing precedence, or dispatch authority
- provider output must remain subordinate to the approved product contracts

This keeps GreenRide from drifting into “the map says so, therefore the business rule changed.”

---

## What This Layer Supports

Current baseline support responsibilities:
- address lookup and normalisation support
- route, distance, and time estimation support
- location-coordinate support where needed
- live visual context for customer and ops maps where approved
- geolocation support for driver/customer/device context where explicitly used

These are support functions, not primary business ownership.

---

## What This Layer Does Not Own

Maps/address services do not own:
- booking confirmation truth
- quote/fare truth
- fixed-route versus dynamic-route business selection
- zone/service-area restriction truth
- dispatch decision truth

Rules:
- if provider output and business-rule contracts conflict, the business-rule contract wins
- later implementation must not silently trust raw provider output over explicit tenant/platform rules

---

## Address Strategy Baseline

Addresses should move through a controlled platform path rather than staying as inconsistent free text everywhere.

Current canonical direction:
- booking and ops flows may collect human-readable address input
- the platform should support address resolution/normalisation into a stable internal representation where needed
- the platform should preserve operationally meaningful address context rather than reducing everything to raw coordinates only

This creates the first safe address baseline without locking an implementation vendor too early.

---

## Address Normalisation Guardrail

Address normalisation is a support step, not a license to rewrite business meaning.

Approved direction:
- normalisation may improve consistency for lookup, routing, and operational use
- normalisation must not silently invalidate the user’s intended pickup/dropoff meaning
- later flows should preserve enough original/user-facing context for ops and customer review where needed

This avoids “cleaned” addresses becoming misleading addresses.

---

## Geolocation Baseline

Geolocation may support customer, driver, and ops experiences, but only within explicit product boundaries.

Current direction:
- customer/device geolocation may help with input convenience or pickup context where supported
- driver geolocation supports operational location visibility and allocation confidence through driver/realtime contracts
- geolocation signals do not replace explicit booking details, dispatch state, or service-area rules

This keeps convenience and operational telemetry separate from business truth.

---

## ETA, Distance, and Route-Data Baseline

ETA, distance, and route data are support values.

Canonical direction:
- these values may support quote estimation, trip visibility, and operator awareness where approved
- they must remain explicit support inputs, not undocumented owners of pricing or dispatch outcomes
- provider-derived route/time data must not silently override configured fixed-route or service-area logic
- provider-derived ETA, distance, or route support values must not be surfaced through notifications, reporting, or live views as if they were stronger than the underlying approved business state

This gives us a clean estimation boundary.

---

## Route Calculation vs Fixed-Route Lookup

GreenRide already defines:
- explicit fixed-route versus dynamic-route path selection
- pricing-path selection as a business-rule concern

Maps/address strategy direction:
- route calculation data may support the dynamic path
- configured fixed-route logic remains a business-rule path, not something raw route calculation silently replaces
- map/provider calculations must not auto-cancel an approved fixed-route contract by assumption

This keeps route computation subordinate to route-path selection.

---

## Relationship to Service Areas and Zones

Zones, geofences, and service-area rules are already defined as operations-first constructs.

Canonical direction:
- maps/address services may help determine whether a request falls within a relevant area
- service-area and restriction outcomes still belong to the location/service-rule contract
- provider geometry or route output must not silently replace tenant-defined service-area meaning

This keeps operational geography and provider geometry aligned without merging them.

---

## Relationship to Dispatch and Customer Maps

Dispatch map behavior already states:
- the dispatch map is advisory

Customer tracking already states:
- live map-style visibility begins only after assignment

Maps/address strategy direction:
- this supporting layer may provide the visual/location data used by those surfaces
- those surfaces still obey their own business boundaries
- provider/map capability must not create earlier customer tracking or stronger dispatch authority than the domain contracts allow
- provider/map capability must not create stronger notification, reporting, or export truth than the owning business/state contract allows

---

## Failure and Degraded Direction

- missing map/provider data must not erase authoritative booking, driver, or dispatch records
- degraded address resolution must remain visible where it affects confidence
- uncertain ETA/distance values must not be shown as if they are guaranteed fact
- provider failure must degrade support capability, not redefine business truth
- normalised address, route, ETA, and map-support values must remain visibly subordinate when they are reused in notification, reporting, or export surfaces

This is the minimum safe degraded-mode rule.

---

## Important Rule

GreenRide should use maps, geolocation, ETA, and address services to support estimation, visibility, and operational convenience, but never let provider output silently overrule booking, pricing, dispatch, or service-area contracts.

---

## Stop Conditions

Stop and clarify before implementation if:
- provider output is being treated as authoritative over business rules
- route calculation is silently overriding fixed-route business logic
- address normalisation is erasing the intended pickup/dropoff meaning
- geolocation or map presence is being treated as equivalent to booking, dispatch, or service-area truth
