# Realtime System

## Purpose

Define the canonical realtime and live-update baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- realtime as an independent source of business truth
- hidden secondary state machines outside booking, driver, dispatch, or payment domains
- unsupported live-visibility guarantees under degraded conditions
- transport-specific assumptions with no approved contract

## In Scope

- realtime source-of-truth boundary
- live event-distribution baseline
- customer, driver, and dispatch live-update relationship
- degraded realtime/fallback direction
- visibility boundary between canonical state and live transport

## Current Status

Draft, approved as the current documentation direction.

This document is the first canonical realtime contract for the Phase 7 service domain.

## Out of Scope

This document does not define:
- final transport choice
- websocket/polling protocol detail
- exact event names or payload schemas
- final presence model
- map provider or ETA-source detail

Those belong to later transport, maps, and implementation contracts.

## Related Documents

- `docs/01-product/customer-tracking-and-visibility.md`
- `docs/01-product/parcel-logistics-workflow.md`
- `docs/01-product/school-run-workflow.md`
- `docs/03-services/parcel-proof-and-tracking-contract.md`
- `docs/02-applications/driver-navigation-and-connectivity-rules.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/dispatch-map-behavior.md`
- `docs/03-platform/error-handling-and-failure-strategy.md`
- `docs/03-platform/observability.md`

## Canonical Rules

1. Realtime is a distribution layer for current state changes, not an independent source of business truth.
2. Canonical booking, driver, dispatch, and payment records remain authoritative.
3. Realtime may improve speed and visibility, but it must not redefine lifecycle or business state.
4. Delayed, stale, or unavailable realtime must fall back to authoritative records rather than inventing certainty.
5. Realtime degradation must be explicit where it affects user trust or operator confidence.
6. Transport choice remains open until a later explicit contract approves it.

## Source-of-Truth Boundary

This is the most important realtime rule.

Approved direction:
- business domains own the authoritative record
- realtime publishes timely updates about those authoritative records
- realtime does not create a separate hidden truth about booking, driver, dispatch, or payment state

This keeps live behavior aligned with the rest of the system instead of splitting truth across two layers.

## What Realtime Is For

The realtime layer exists to improve visibility and responsiveness for:
- customer trip-status and assigned-trip visibility where supported
- driver job and trip updates where supported
- dispatch live operational awareness where supported
- other approved live operational surfaces

Canonical direction:
- realtime helps surfaces see state changes faster
- it does not replace authoritative reads from the domain record

## What Realtime Does Not Own

Realtime does not own:
- booking lifecycle truth
- driver lifecycle truth
- dispatch decision truth
- payment/invoice truth

Rules:
- if realtime says one thing and the authoritative record says another, the authoritative record wins
- later implementation must not silently trust transport freshness more than canonical record integrity

## Event-Family Baseline

Current approved realtime event-family baseline:
1. booking-status visibility events
2. driver-status and job-context events
3. driver-location freshness-dependent events
4. dispatch operational-visibility events

This baseline is intentionally event-family level, not final event-name detail.

## Customer Visibility Relationship

Customer tracking already defines:
- status-first before assignment
- live map-style visibility only from `assigned` onward

Realtime direction:
- realtime may distribute changes that power customer visibility
- customer-facing live visibility still depends on the canonical business boundary
- realtime must not create fake pre-assignment tracking just because a transport exists

## School Run Reuse Boundary

If the `School Run` add-on is enabled:
- School Run journeys may reuse the same realtime distribution foundation as
  ordinary transport journeys
- School Run-specific context may layer on top of that transport visibility
- realtime must still follow the canonical booking, dispatch, and driver truth
  for the underlying journey instance

Important guardrails:
- School Run does not create a separate parcel-style live-custody model
- School Run does not approve a second trip-state machine inside the realtime
  layer
- School Run visibility must remain subordinate to the same freshness and
  degraded-state rules that govern ordinary transport visibility

## Parcel Tracking Boundary

If the `Parcel / Courier / Logistics` add-on is enabled:
- shared realtime infrastructure may distribute parcel-job and parcel-tracking
  updates
- location and event transport may still be reused
- parcel tracking must remain owned by parcel-job and proof-tracking truth
  rather than passenger-trip truth

Important guardrails:
- parcel visibility must not be presented as taxi or passenger live-tracking
- parcel delivery outcome and proof must not be inferred from ride-style trip
  completion
- degraded parcel-tracking updates must remain explicit rather than pretending
  a delivery handover or outcome is fully confirmed

## Driver and Dispatch Relationship

Driver and dispatch domains already define:
- fresh versus stale location meaning
- advisory map boundary
- degraded connectivity awareness

Realtime direction:
- the realtime layer may distribute those live updates
- freshness and operational trust still come from the domain rules, not from transport optimism
- degraded live transport must not silently imply fresh trusted state
- realtime distribution of ETA, location, or route-support context must not silently promote those support values into stronger business truth than the underlying domain record allows

## Degraded Realtime Direction

If realtime is delayed, stale, weak, or unavailable:
- the degraded condition must be explicit where relevant
- the app should fall back to the latest safe authoritative record
- operators and users must not be shown fake “live” certainty

Examples:
- customer tracking may show latest safe status without pretending the map is current
- driver UI may show pending/uncertain sync rather than assuming action delivery succeeded
- dispatch may continue from authoritative queues/panels even if live updates degrade
- reporting or notification surfaces must not present delayed live-support values as if they were fresher than the authoritative state they summarize

## Fallback Baseline

Current safe fallback model:
- authoritative reads remain available outside the realtime transport
- core workflows must remain operational without live transport perfection
- degraded realtime reduces immediacy/confidence, not the existence of system truth

This is the minimum safe resilience rule.

## Presence and Connection Boundary

This document does not approve a final presence model.

Current guardrail:
- connection presence must not be confused with business readiness
- being connected is not the same as being allocation-ready, assigned, or operationally trusted

This keeps transport/session presence separate from domain truth.

## Failure Direction

- realtime failure must not silently rewrite business state
- missing live updates must not imply disappearance of bookings or drivers
- stale live context must not be shown as current fact without indication
- transport uncertainty must remain distinguishable from domain-state failure

## Important Rule

GreenRide should use realtime to distribute authoritative state changes quickly, not to create an undocumented second state system that competes with the real records.

## Stop Conditions

Stop and clarify before implementation if:
- realtime is being treated as the primary source of truth
- live transport is inventing state transitions outside domain contracts
- degraded realtime is being hidden as if updates were current
- connection presence is being treated as equivalent to operational readiness or business state
