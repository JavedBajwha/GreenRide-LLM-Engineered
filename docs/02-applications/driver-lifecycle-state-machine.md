# Driver Lifecycle State Machine

## Purpose

Define the canonical driver lifecycle state machine for GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent driver states across app, dispatch, and backend logic
- assignment behavior that treats a driver as committed before they actually respond
- app-only driver statuses that drift away from operational truth
- unclear transition rules around accept, reject, timeout, active trip, and offline behavior

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical driver lifecycle state machine for the driver domain.

---

## Scope

This document covers:
- canonical driver operational states
- allowed transition direction
- job-offer and active-trip boundaries
- separation between driver state and booking state
- invariants and stop conditions

---

## Out of Scope

This document does not define:
- exact allocation/candidate ranking logic
- stale location and heartbeat thresholds
- offline sync implementation
- navigation provider detail
- payout or earnings state detail

Those belong to later driver allocation, connectivity, maps, and payment-related contracts.

---

## Related Documents

- `docs/02-applications/driver-app-full.md`
- `docs/01-product/dispatch-system.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/03-services/realtime-system.md`
- `docs/05-frontend/driver-ui-contract.md`

---

## Canonical Rule

Driver state is a separate operational state machine from booking state.

The driver lifecycle must remain consistent with booking and dispatch behavior, but:
- driver state is not the same thing as booking state
- booking states must not be copied directly into driver state
- app-only labels must not silently become canonical driver states

Approved canonical driver states:
- `offline`
- `available`
- `job_offered`
- `assigned`
- `driver_en_route`
- `arrived`
- `in_progress`
- `paused`

Do not invent additional driver states without an explicit documented decision.

---

## Important Separation

The driver lifecycle is not the same as:
- booking lifecycle
- UI screen names
- connectivity/transport state
- payout or earnings state

Examples of things that are **not** canonical driver lifecycle states:
- `accepting`
- `rejected`
- `timed_out`
- `completed_today`
- `online_with_bad_signal`

Those may exist as:
- action outcomes
- event results
- UI condition
- telemetry/context metadata

But they must not silently expand the canonical driver lifecycle.

---

## State Meanings

### `offline`

Meaning:
- the driver is not available for operational assignment
- the platform should not treat the driver as dispatch-ready

### `available`

Meaning:
- the driver is operationally available to receive a new job offer
- the driver is online and not currently committed to an active trip workflow

### `job_offered`

Meaning:
- the driver has received a job offer
- the driver has not yet accepted or rejected it
- the platform must not yet treat the driver as fully committed to the job

This is the key boundary between availability and assignment commitment.

### `assigned`

Meaning:
- the driver has accepted or otherwise been committed to the booking according to the active dispatch path
- the driver is now operationally tied to the booking

### `driver_en_route`

Meaning:
- the driver is actively heading to pickup

### `arrived`

Meaning:
- the driver has reached the pickup point

### `in_progress`

Meaning:
- the passenger trip has started
- the driver is currently executing the trip

### `paused`

Meaning:
- the driver is not currently available for new assignment, but is not fully offline
- pause is an operational availability control state, not a trip state

---

## High-Level Transition Model

Approved normal forward path:

`offline`
-> `available`
-> `job_offered`
-> `assigned`
-> `driver_en_route`
-> `arrived`
-> `in_progress`
-> `available`

Additional availability transitions:
- `available` -> `paused`
- `paused` -> `available`
- `available` -> `offline`
- `paused` -> `offline`

Offer outcome exits:
- `job_offered` -> `available` on reject, timeout, or withdrawn offer

This is the canonical baseline until later allocation/connectivity contracts refine the edge cases.

---

## Allowed Transition Baseline

| From | Allowed Next States |
| --- | --- |
| `offline` | `available` |
| `available` | `job_offered`, `paused`, `offline` |
| `job_offered` | `assigned`, `available`, `offline` only if the offer is explicitly cleared first |
| `assigned` | `driver_en_route`, `available` only through later explicit removal/unassignment handling |
| `driver_en_route` | `arrived`, `available` only through later explicit removal/unassignment handling |
| `arrived` | `in_progress`, `available` only through later explicit removal/unassignment handling |
| `in_progress` | `available` |
| `paused` | `available`, `offline` |

This table is the canonical baseline.

Where a transition depends on later documented handling, do not invent the mechanics yet.

---

## Offer Boundary

The `job_offered` state must exist as a distinct boundary.

Approved meaning:
- a driver can receive an offer without yet being fully assigned
- accept, reject, timeout, or withdrawn-offer behavior all resolve around this state
- stale or missing live-location context may reduce dispatch confidence, but it does not by itself rewrite the driver's canonical lifecycle state

Reason:
- this keeps driver commitment aligned with real operational behavior
- it prevents dispatch logic from pretending assignment is complete before a response exists

---

## Relationship to Booking State

The driver lifecycle and booking lifecycle move together, but they are not mirrors.

Examples:
- booking `awaiting_dispatch` does not mean the driver is in a special booking-like pending state
- booking `assigned` aligns with driver commitment, but the driver still has its own lifecycle
- booking `completed` does not require a separate permanent `completed` driver state; the driver returns to operational availability

Canonical direction:
- once a trip is successfully completed, the driver returns to `available` unless another explicit availability control applies

---

## Active Trip Boundary

Once the driver enters `in_progress`:
- the driver is actively executing the trip
- the driver is not eligible for new standard assignment
- the next normal lifecycle outcome is return to `available`

This avoids inventing extra canonical driver states such as:
- `trip_completed_pending_sync`
- `dropping_off`
- `post_trip`

Those may exist as internal events or UI moments later, but not as default lifecycle states.

---

## Failure and Edge Direction

- rejected offers return the driver to `available`
- timed-out offers return the driver to `available`
- withdrawn/reassigned offers must not leave the driver stuck in `job_offered`
- if an offer is cleared, withdrawn, or expires without commitment, the driver must return to an explicit valid availability state rather than remain in ambiguous assignment limbo
- active-trip problems belong to later connectivity/exception contracts, not ad hoc new driver states
- offline is not a silent failure state; it is an explicit availability state

---

## Invariants

1. Driver state is separate from booking state.
2. `job_offered` exists as a real pre-commitment state.
3. A driver must not be treated as fully committed before assignment acceptance/commitment occurs.
4. `paused` is an availability-control state, not a trip state.
5. A completed successful trip normally returns the driver to `available`.

---

## Important Rule

The driver lifecycle should model operational commitment and trip execution, not every UI event, transport condition, or payout outcome.

---

## Stop Conditions

Stop and clarify before implementation if:
- the driver is being treated as assigned before the `job_offered` boundary resolves
- booking states are being copied directly into driver state without explicit justification
- new driver states are being added for timeout, rejection, weak signal, or screen-level UI moments
