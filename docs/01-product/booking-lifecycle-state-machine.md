# Booking Lifecycle State Machine

## Purpose

Define the canonical booking lifecycle state machine for GreenRide.

This document exists so AI and future implementation work do not invent:
- alternative booking states
- invalid transition paths
- UI-only pseudo states treated as canonical booking state
- inconsistent customer, ops, dispatch, and driver behavior around the same booking

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical booking lifecycle state machine for the customer-booking domain.

---

## Scope

This document covers:
- canonical booking states
- allowed transition direction
- state meanings
- invariants and stop conditions
- separation between booking state and UI step state

---

## Out of Scope

This document does not define:
- payment-provider-specific status detail
- dispatch candidate ranking behavior
- driver lifecycle state machine
- customer tracking detail by surface
- booking amendment/cancellation policy detail

Those belong to later booking, dispatch, driver, payment, and customer-visibility contracts.

---

## Related Documents

- `docs/01-product/booking-domain.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/booking-forms-and-agreements.md`
- `docs/02-applications/customer-booking-flow-full.md`
- `docs/06-implementation/search-and-quote-canonical-spec.md`
- `backend/prisma/schema.prisma`

---

## Canonical Rule

The canonical booking states must match the `BookingStatus` enum in:
- `backend/prisma/schema.prisma`

Approved canonical states:
- `draft`
- `quoted`
- `vehicle_selected`
- `confirmed`
- `awaiting_dispatch`
- `assigned`
- `driver_en_route`
- `arrived`
- `in_progress`
- `completed`
- `cancelled`
- `exception`

Do not invent new booking states without an explicit documented decision.

---

## Important Separation

Not every UI step is a booking state.

Examples of UI/process steps that are **not** canonical booking states:
- `details_added`
- `extras_added`
- `paid`
- `pending`
- intermediate form-completion progress

Those may exist as:
- UI step state
- payment state
- process metadata

But they must not replace or expand the canonical booking lifecycle by assumption.

---

## State Meanings

### `draft`

Meaning:
- a booking object or working record exists
- the booking is not yet a stable quote or confirmed booking

Used for:
- in-progress booking creation
- temporary data capture before a committed quote/booking result

### `quoted`

Meaning:
- the system has produced a valid quote result for the booking request
- the quote exists, but a final vehicle/service selection is not yet committed

### `vehicle_selected`

Meaning:
- a customer or operator has selected the preferred vehicle/service option from the quote stage
- booking capture is moving toward confirmation

### `confirmed`

Meaning:
- the booking is accepted as a real booking record
- required confirmation conditions have been met for the current booking path

### `awaiting_dispatch`

Meaning:
- the booking is confirmed
- the booking is waiting for operational assignment

### `assigned`

Meaning:
- a driver has been assigned to the booking

### `driver_en_route`

Meaning:
- the assigned driver is en route to the pickup point

### `arrived`

Meaning:
- the driver has arrived at pickup

### `in_progress`

Meaning:
- the trip has started

### `completed`

Meaning:
- the booking/trip is finished successfully enough to close the active operational lifecycle

### `cancelled`

Meaning:
- the booking is no longer active because it was cancelled before successful completion

### `exception`

Meaning:
- the booking has entered an exceptional or unresolved operational state that requires special handling or review

---

## High-Level Transition Model

Approved normal forward path:

`draft`
-> `quoted`
-> `vehicle_selected`
-> `confirmed`
-> `awaiting_dispatch`
-> `assigned`
-> `driver_en_route`
-> `arrived`
-> `in_progress`
-> `completed`

Exceptional exits:
- from pre-completion states, a booking may move to `cancelled`
- from operationally problematic states, a booking may move to `exception`

---

## Allowed Transition Baseline

| From | Allowed Next States |
| --- | --- |
| `draft` | `quoted`, `cancelled`, `exception` |
| `quoted` | `vehicle_selected`, `cancelled`, `exception` |
| `vehicle_selected` | `confirmed`, `cancelled`, `exception` |
| `confirmed` | `awaiting_dispatch`, `cancelled`, `exception` |
| `awaiting_dispatch` | `assigned`, `cancelled`, `exception` |
| `assigned` | `driver_en_route`, `cancelled`, `exception` |
| `driver_en_route` | `arrived`, `cancelled`, `exception` |
| `arrived` | `in_progress`, `cancelled`, `exception` |
| `in_progress` | `completed`, `exception` |
| `completed` | none |
| `cancelled` | none by default |
| `exception` | later recovery/closure behavior must be explicitly documented before allowing normal-state re-entry |

This table is the canonical baseline until a later explicit amendment contract changes it.

---

## Invariants

1. Every booking belongs to exactly one tenant.
2. Every booking must always have one canonical booking status.
3. `completed` and `cancelled` are terminal by default.
4. `confirmed` means the booking is no longer only a quote-stage artifact.
5. Dispatch/driver operational work must not start before the booking reaches the correct operational state.
6. Customer/UI steps must not silently introduce new booking lifecycle states.

---

## State Boundaries

### Quote vs Booking Boundary

The quote phase is not the same as a fully confirmed booking.

Baseline direction:
- `quoted` and `vehicle_selected` still belong to the pre-confirmation lifecycle
- `confirmed` marks the point where the system treats the record as a committed booking
- quote expiry, missing required agreement capture, or missing required financial preconditions must block movement into `confirmed` rather than creating an alternate booking state

### Booking vs Dispatch Boundary

Dispatch work begins only after confirmation.

Baseline direction:
- `awaiting_dispatch` is the handoff state into operational assignment
- dispatch contracts may add richer logic later, but must not invent a different booking-state backbone casually

### Booking vs Driver Boundary

Driver operational progress is reflected through booking lifecycle states only where the booking state machine explicitly allows it.

Driver-domain detail belongs elsewhere, but the booking state machine remains the shared source of truth for booking-level status.

---

## Failure and Exception Direction

- invalid or incomplete pre-confirmation capture should not advance the booking state prematurely
- expired quote context should keep the booking in a pre-confirmation state until explicit revalidation succeeds
- missing required agreement, consent, or booking-path financial prerequisites should block confirmation rather than implying a separate lifecycle state
- failed confirmation should not silently jump to operational states
- operational problems may route a booking into `exception`
- cancellation before completion should route to `cancelled`
- recovery out of `exception` requires a later explicit contract rather than assumption

---

## Stop Conditions

Stop and clarify before implementation if:
- UI step names are being promoted into canonical booking states
- a booking can skip directly from pre-confirmation to late operational states without an explicit decision
- `completed` or `cancelled` are treated as casually reversible
- `exception` is treated as a free-form bucket with no later recovery policy
- a later domain wants different state names than the schema-backed `BookingStatus` enum
