# Phase 4 Customer Booking Domain Checklist

## Purpose

This checklist defines the main documentation work needed to make the customer booking domain implementation-safe.

It exists to turn the current fragmented booking, quote, pricing, route, and customer-visibility material into a focused working list instead of a loose set of partially related docs.

---

## Scope

This checklist is limited to the customer-booking domain:
- search and quote
- booking lifecycle
- route and vehicle selection
- pricing and repricing behavior
- booking forms and agreements
- booking creation, amendment, cancellation, and tracking
- customer trip visibility

It does not cover:
- deeper driver lifecycle work
- deeper dispatch contracts
- payments/notifications/realtime as standalone service domains

Those stay in later phases even where they intersect.

---

## Current Domain Read

What already exists:
- booking domain concepts
- pricing engine concepts
- customer booking flow concepts
- search-and-quote canonical slice docs

What is still missing:
- one canonical booking lifecycle state machine
- route-selection and vehicle-eligibility contracts
- pricing rule precedence and repricing rules
- booking forms and agreement/consent rules
- booking amendment/cancellation rules
- customer tracking/visibility contract

The booking domain is therefore usable as a directional foundation, but not yet implementation-safe as a whole.

---

## Phase 4 Main Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| Booking lifecycle state machine | partial | Canonical lifecycle state machine now exists, but later exception-recovery and linked downstream detail still need refinement | `docs/01-product/booking-lifecycle-state-machine.md` |
| Route selection and vehicle eligibility | partial | Canonical route/eligibility baseline now exists, but later pricing-precedence and operational-availability edges still need refinement | `docs/01-product/route-selection-and-vehicle-eligibility.md` |
| Pricing and fare behavior tightening | partial | Pricing concepts exist, but rule precedence, overrides, zone behavior, repricing, and currency expectations are not centralised | `docs/01-product/pricing-engine.md` plus targeted canonical additions |
| Booking forms and agreements | partial | Canonical booking-form and agreement baseline now exists, but field-matrix and ops-entry detail still need refinement | `docs/01-product/booking-forms-and-agreements.md` |
| Booking creation and confirmation flow tightening | partial | Canonical booking-creation/confirmation baseline now exists, but path-specific payment and later operational detail still need refinement | `docs/01-product/booking-creation-and-confirmation.md` plus `docs/02-applications/customer-booking-flow-full.md` |
| Booking amendments and cancellations | partial | Canonical amendment/cancellation baseline now exists, but role-specific permissions, fee/refund policy, and later ops handling still need refinement | `docs/01-product/booking-amendments-and-cancellations.md` |
| Customer tracking and visibility | partial | Canonical customer tracking/visibility baseline now exists, but detailed field matrix, ETA source, and realtime transport detail still need refinement | `docs/01-product/customer-tracking-and-visibility.md` |

---

## Recommended Working Order

1. Booking lifecycle state machine
2. Route selection and vehicle eligibility
3. Pricing and fare behavior tightening
4. Booking forms and agreements
5. Booking creation/confirmation flow tightening
6. Booking amendments and cancellations
7. Customer tracking and visibility

This order keeps:
- state first
- selection/pricing logic second
- input and capture rules third
- post-creation lifecycle behaviors after that

---

## Completion Rule

Phase 4 customer-booking documentation should not be treated as substantially complete until:
- each item above has a canonical document or a clearly upgraded canonical home
- the lifecycle, pricing, and visibility rules stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/01-product/booking-domain.md`
- `docs/01-product/pricing-engine.md`
- `docs/02-applications/customer-booking-flow-full.md`
- `docs/06-implementation/search-and-quote-canonical-spec.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
