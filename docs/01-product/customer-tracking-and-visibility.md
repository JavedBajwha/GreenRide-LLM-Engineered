# Customer Tracking and Visibility

## Purpose

Define the canonical customer-facing tracking and trip-visibility baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- fake live tracking before a booking has real driver context
- inconsistent customer visibility across booking states
- unsupported map behavior before assignment
- customer-facing tracking that conflicts with booking, dispatch, or realtime boundaries

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical customer tracking and visibility contract for the customer-booking domain.

---

## Scope

This document covers:
- what the customer can see before assignment
- what the customer can see after assignment
- when live map-style visibility begins
- how tracking relates to booking state
- baseline degraded/stale visibility behavior

---

## Out of Scope

This document does not define:
- websocket or transport implementation
- exact event names or realtime payloads
- dispatch map behavior
- driver-side navigation responsibility
- ETA-source or provider-specific map detail

Those belong to later realtime, dispatch, and maps contracts.

---

## Related Documents

- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/02-applications/customer-booking-flow-full.md`
- `docs/03-services/realtime-system.md`
- `docs/05-frontend/customer-ui-contract.md`

---

## Canonical Rules

1. Customer visibility is status-first before assignment.
2. Live map-style tracking begins only from `assigned` onward.
3. Customer tracking must follow canonical booking state, not invent separate trip states.
4. A booking with no assigned driver must not imply live vehicle tracking.
5. Stale or unavailable live updates must be explained clearly, not silently hidden.

---

## Visibility by Lifecycle Stage

### Pre-Confirmation

States:
- `draft`
- `quoted`
- `vehicle_selected`

Customer visibility baseline:
- booking-building context only
- no trip tracking
- no driver visibility
- no live map visibility

These are booking-creation stages, not tracking stages.

### Confirmed but Not Yet Assigned

States:
- `confirmed`
- `awaiting_dispatch`

Customer visibility baseline:
- confirmed booking summary
- booking ID/reference
- pickup/dropoff details
- selected service/vehicle category summary
- scheduled time or time window
- current status message
- simple guidance that the booking is confirmed and awaiting assignment

Important rule:
- this phase is status-first, not map-first
- no live driver tracking should be implied here

### Assigned and Active Pre-Pickup

States:
- `assigned`
- `driver_en_route`
- `arrived`

Customer visibility baseline:
- current booking status
- assigned driver details where supported
- assigned vehicle details where supported
- live map-style visibility where supported
- ETA/progress messaging where supported

This is the first point where live trip visibility is valid as a canonical customer concept.

### Active Trip

State:
- `in_progress`

Customer visibility baseline:
- active trip status
- live trip progress where supported
- ongoing driver/vehicle context where supported
- active trip summary/progress messaging

### Closed Outcomes

States:
- `completed`
- `cancelled`
- `exception`

Customer visibility baseline:
- final status/result summary
- booking history visibility
- no active live tracking

Later domains may define richer history/receipt/help behavior, but active tracking is over.

---

## Status-First Before Assignment

Approved direction:
- from `confirmed` through `awaiting_dispatch`, the customer sees booking status, summary, and expectation-setting information
- the UI must not pretend live vehicle tracking exists before a driver is actually assigned

This avoids:
- fake "driver coming soon" maps
- misleading empty tracking surfaces
- drifting into unsupported realtime behavior

---

## Live Visibility Boundary

Approved live-tracking boundary:
- live map-style customer tracking begins only at `assigned`

Meaning:
- no assigned driver means no canonical live vehicle view
- assignment is the business boundary where customer-visible driver context becomes valid

This boundary aligns with:
- the booking lifecycle state machine
- dispatch handoff
- the current realtime-system guardrail against inventing unsupported event behavior

---

## Customer-Visible Information Baseline

Before live tracking:
- booking reference
- route summary
- selected service/vehicle category summary
- timing/schedule summary
- current booking status
- booking-change and cancellation options if still allowed by policy

After live tracking begins:
- all of the above, plus
- assigned driver identity details where approved
- assigned vehicle details where approved
- live trip/approach visibility where supported

This is the current baseline, not the final full field matrix.

---

## Route Preview vs Live Tracking

Route preview and live tracking are not the same thing.

Baseline direction:
- a customer may see route/trip summary before assignment
- that does not imply live vehicle position or live map movement
- live map-style tracking begins only when a real assigned trip context exists

This prevents route preview from silently becoming fake live tracking.

---

## Degraded or Stale Live Updates

If live updates are delayed, stale, or temporarily unavailable:
- the UI must remain explicit
- stale tracking must be explained as delayed/unavailable
- the customer should still see the latest safe booking status and summary

The system must not:
- silently freeze the map as if it were current
- remove all status context when live updates degrade

Detailed stale thresholds belong to later realtime contracts.

---

## Relationship to Customer UI

The customer surface remains:
- mobile-priority
- task-driven
- status-led

Tracking behavior should therefore:
- emphasize current status and next expectation
- avoid overloading the customer with dispatch-internal detail
- expose live detail only when there is real live context to show

---

## Failure and Restriction Direction

- booking-not-found must not fall through to an empty tracking map
- unauthorised access must not expose booking or driver detail
- cancelled/completed bookings must not appear as active trackable trips
- unassigned bookings must not expose fake live driver panels

---

## Invariants

1. Before `assigned`, customer visibility is status-first, not live-map-first.
2. Live map-style tracking begins only from `assigned`.
3. Tracking must follow booking state rather than invent parallel customer-trip states.
4. Stale or unavailable live updates must be explicit.
5. Active live tracking ends once the booking is no longer active.

---

## Important Rule

Customer tracking in GreenRide is a controlled visibility layer on top of the booking lifecycle, not an excuse to invent unsupported realtime behavior.

---

## Stop Conditions

Stop and clarify before implementation if:
- a map-style customer tracking view is being shown before `assigned`
- route preview and live tracking are being treated as the same thing
- cancelled, completed, or exception bookings are still being treated as actively trackable trips
