# Booking Creation and Confirmation

## Purpose

Define the canonical booking-creation and confirmation model for GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent boundaries between quote, draft, and confirmed booking
- ad hoc creation timing for booking records
- payment-state assumptions that silently redefine booking confirmation
- mismatched behavior between customer UI, backend, and operational handoff

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical booking-creation and confirmation contract for the customer-booking domain.

---

## Scope

This document covers:
- the quote-to-booking boundary
- booking creation direction
- confirmation requirements baseline
- relationship between payment/progress state and booking state
- confirmation outputs and post-confirmation handoff

---

## Out of Scope

This document does not define:
- payment-provider-specific success/pending/failure contract
- amendment or cancellation policy
- dispatch candidate selection
- final customer tracking visibility rules

Those belong to later payment, booking-change, dispatch, and customer-visibility contracts.

---

## Related Documents

- `docs/02-applications/customer-booking-flow-full.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/booking-forms-and-agreements.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`

---

## Canonical Rules

1. A quote is not the same thing as a confirmed booking.
2. `confirmed` is the canonical quote-to-booking boundary.
3. Booking creation must follow validated trip, customer, and pricing context.
4. Payment/process states must not silently replace booking lifecycle states.
5. Confirmation must produce a stable booking identity and handoff-ready record.
6. Post-confirmation work such as dispatch begins only after confirmation, not before.

---

## Quote vs Booking Boundary

The current lifecycle backbone already defines:
- `draft`
- `quoted`
- `vehicle_selected`
- `confirmed`

Baseline meaning:
- `draft`, `quoted`, and `vehicle_selected` are still pre-confirmation states
- `confirmed` is the point where the platform treats the record as a committed booking

This is the most important booking-creation rule.

---

## Booking Creation Baseline

Current customer-flow docs imply that booking creation happens late in the flow.

Canonical direction now:
- the platform may hold working quote/draft context before final confirmation
- a committed booking record should exist by the time the flow reaches `confirmed`
- pre-confirmation progress must not be treated as operationally confirmed booking state

This keeps the system aligned with:
- the booking lifecycle state machine
- the pricing preservation rule
- the later dispatch handoff model

---

## Preconditions for Confirmation

A booking should not move to `confirmed` until the current booking path has satisfied its required inputs.

Current baseline requirement groups:
1. valid trip details
2. valid eligible vehicle/service selection
3. required passenger/contact details
4. valid pricing context
5. required agreement/consent capture where the flow requires it
6. any required payment consent or billing acknowledgement for that booking path
7. any required payment/charge condition for that booking path

Important guardrail:
- not every booking path must imply the same payment rule
- but the path must define whether payment is a prerequisite for confirmation
- the quote context used for confirmation must still be valid unless an explicit revalidation path is performed
- if an already confirmed booking is amended in a way that requires renewed confirmation readiness, the amended context must satisfy the then-current booking-path requirements before it is relied on as the committed booking basis

Until payment-domain detail is documented later, the current rule is:
- confirmation must not assume payment success unless the active booking path explicitly requires it
- confirmation must not assume payment consent or billing acknowledgement has happened unless the active booking path explicitly requires and records it
- confirmation must not assume a previously quoted price remains valid forever

### Confirmation Requirement Matrix Direction

Approved first matrix:

| Path Type | Consent Requirement | Financial Requirement Before `confirmed` |
| --- | --- | --- |
| no immediate payment required | required booking/policy agreements only | none by default |
| successful payment required | required booking/policy agreements plus payment consent | successful payment |
| successful authorisation required | required booking/policy agreements plus authorisation consent | successful authorisation |
| later invoice/account billing | required booking/policy agreements plus billing acknowledgement where applicable | validated billing/account eligibility |

This keeps confirmation logic explicit and path-aware.

### Confirmation Context Matrix Direction

The same confirmation boundary may be reached through more than one entry context.

Approved first context matrix:

| Entry Context | Identity / Entry Difference | Confirmation Requirement Difference | Authority Difference |
| --- | --- | --- | --- |
| guest self-service | no authenticated customer account assumed by default; required contact detail must be captured in-flow | same active booking-path requirements apply; guest entry does not waive pricing, consent, or financial prerequisites | no special override authority implied |
| authenticated account user | authenticated customer context may prefill or reuse supported profile data where the product allows it | same active booking-path requirements apply; account context does not replace required pricing, consent, or financial prerequisites | no special override authority implied by account status alone |
| operator-assisted / operator-created booking | tenant operator may enter booking details through an ops surface with denser controls or assisted workflow | the booking must still satisfy the active booking-path requirements before `confirmed`; operator entry does not waive pricing, quote-validity, consent, or financial prerequisites unless a later explicit policy says so | operator assistance may change who enters or reviews data, but it does not by itself create a different confirmation boundary |

Important boundary:
- this matrix defines the current confirmation baseline only
- it does not yet finalize every guest/account/operator field matrix or every operator permission edge
- if later role policy allows narrower operational exceptions, that must be documented explicitly rather than inferred from the existence of an operator surface

---

## Relationship to Payment State

Payment state and booking state are related but not identical.

Examples of process/payment states that are **not** canonical booking states:
- `paid`
- `pending`
- payment-authorised
- payment-failed

Rules:
- payment outcomes may influence whether confirmation is allowed
- payment outcomes must not become substitute booking lifecycle states
- the booking state machine remains the source of truth for booking lifecycle

---

## Customer Flow Baseline

The current end-to-end customer flow remains directionally valid:

Search
-> Quote
-> Vehicle Selection
-> Passenger Details
-> Extras
-> Payment where the active booking path requires it
-> Confirmation
-> Tracking

Canonical clarification:
- some of these are UI/process stages
- only some map directly to booking lifecycle states

The critical mapping is:
- quote result work leads into `quoted`
- vehicle selection leads into `vehicle_selected`
- confirmation leads into `confirmed`

Intermediate UI steps like passenger details, extras, and payment are enabling steps, not canonical booking states.

Important boundary:
- payment is a path-dependent enabling step, not a universal lifecycle step for every booking path
- preserved form progress does not by itself preserve confirmation readiness if quote validity or required consent state has changed

---

## Confirmation Outputs

When the platform confirms a booking, the system should produce at least:
- a stable booking identity
- a committed booking record
- the confirmed booking state
- a post-confirmation summary suitable for customer and ops consumption
- handoff readiness for the next operational stage

Current existing docs already imply:
- booking ID generation
- summary display
- notifications

This document confirms those as post-confirmation outputs rather than optional UI flourishes.

---

## Post-Confirmation Handoff

After `confirmed`, the next booking-lifecycle direction is:
- `awaiting_dispatch`

Baseline meaning:
- confirmation completes the customer-booking commitment step
- operational assignment is the next domain responsibility

Dispatch must not be assumed to start before confirmation.

---

## Price Preservation Rule

The current pricing and booking docs already imply:
- quoted price should be preserved through confirmation unless a documented repricing trigger applies

Canonical booking-creation rule:
- confirmation should anchor the booking to the then-valid price context
- later repricing must remain explicit and rule-driven

This prevents:
- silent price drift during confirmation
- confirmation against an unclear fare basis

---

## Failure and Exception Direction

- invalid or incomplete preconditions must block confirmation
- failed payment, where payment is mandatory for the path, must block confirmation rather than creating a fake confirmed state
- pricing failure must not produce a misleading confirmed booking
- expired-quote recovery must return the flow through explicit requote or revalidation before confirmation can proceed
- confirmation remains allowed only while the quote context is still valid or after an explicit revalidation path has succeeded; warning UX alone is never enough
- confirmation failure must not jump directly into operational states
- if something goes wrong after the booking becomes confirmed, later lifecycle/error contracts govern the next valid state

---

## Invariants

1. `confirmed` is the booking/quote boundary.
2. Payment/process states are not canonical booking states.
3. A booking must not enter dispatch-ready flow before confirmation.
4. Confirmation requires a valid booking input and price context.
5. Confirmation should produce a stable booking record and identity.

---

## Important Rule

Booking creation is not just “saving form data.”

Confirmation is the product boundary where GreenRide turns a priced intention into a committed booking.

---

## Stop Conditions

Stop and clarify before implementation if:
- `paid` or `pending` are being used as booking lifecycle states
- a booking can become operationally active before `confirmed`
- confirmation is allowed with invalid or stale price context
- the system treats quote persistence alone as equivalent to a committed booking
- payment requirements are being assumed universally instead of documented per booking path
