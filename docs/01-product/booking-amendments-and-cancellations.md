# Booking Amendments and Cancellations

## Purpose

Define the canonical amendment and cancellation baseline for GreenRide bookings.

This document exists so AI and future implementation work do not invent:
- inconsistent edit/cancel windows across customer, ops, and dispatch surfaces
- silent amendment behavior after operational assignment has already started
- cancellation behavior that conflicts with the booking lifecycle state machine
- fake lifecycle states for "amended", "rescheduled", or similar process labels

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical amendment/cancellation contract for the customer-booking domain.

---

## Scope

This document covers:
- when amendments are allowed
- when cancellations are allowed
- what amendment work must revalidate
- lifecycle impact of amendment/cancellation
- baseline policy guardrails

---

## Out of Scope

This document does not define:
- refund and payment-provider-specific cancellation outcomes
- detailed cancellation fee policy
- dispatch reassignment behavior after late operational changes
- exception recovery after active-trip failure

Those belong to later payment, dispatch, and operations contracts.

---

## Related Documents

- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/03-services/payments-and-invoicing.md`
- `docs/03-services/refunds-and-financial-adjustments.md`
- `docs/02-applications/customer-booking-flow-full.md`

---

## Canonical Rules

1. Amendments are allowed only before `assigned`.
2. Cancellations are allowed until `arrived`, subject to later policy restrictions.
3. Once a booking reaches `in_progress`, normal amendment and cancellation are no longer allowed.
4. Amendment work must not invent new booking lifecycle states.
5. Cancellation must resolve through the canonical `cancelled` state, not a custom process state.
6. Operationally disruptive late changes must be treated more strictly than early quote-stage changes.

---

## Lifecycle Boundary

Current lifecycle backbone:

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

Approved amendment/cancellation boundary:
- amendments are allowed in pre-assignment states:
  - `draft`
  - `quoted`
  - `vehicle_selected`
  - `confirmed`
  - `awaiting_dispatch`
- cancellations remain allowed through:
  - `assigned`
  - `driver_en_route`
  - `arrived`
- from `in_progress` onward, normal amendment/cancellation closes and exception handling takes over where needed

---

## Amendment Baseline

An amendment means changing booking details after quote or confirmation work already exists.

Examples:
- changing pickup time
- changing route details
- changing passenger/contact details
- changing extras
- changing the selected vehicle/service option before assignment

Canonical direction:
- amendment is an allowed process action, not a booking lifecycle state
- the booking remains in a valid canonical lifecycle state while amendment work is processed
- the system must not create states such as:
  - `amended`
  - `rescheduled`
  - `updated`

---

## Amendment Revalidation Rule

When a booking is amended, the platform must revalidate any affected business inputs.

Current baseline revalidation areas:
1. trip details
2. route/vehicle eligibility
3. pricing context
4. agreement or consent if the changed path requires it
5. operational feasibility where the booking is already confirmed

Important guardrail:
- not every amendment requires the same level of revalidation
- but any amendment that changes route, timing, vehicle/service, or price-sensitive details must not bypass eligibility and pricing checks

Commitment-safe reading:
- if an amendment changes the quote, consent, billing, or price basis that would be required for `confirmed`, the platform must re-establish confirmation readiness explicitly
- this revalidation does not create a new lifecycle state
- preserved form progress or previously captured inputs do not by themselves prove the amended booking is still commitment-ready

---

## Amendment Severity Direction

Not all changes are operationally equal.

Baseline direction:
- early-stage amendments before confirmation are lighter-weight
- confirmed but unassigned bookings may still be amended, but they require stronger validation
- once a booking is assigned, amendment stops being a normal customer-booking behavior

Reason:
- after assignment, changes become operationally disruptive and should move into later ops/dispatch handling rather than staying a simple customer amendment flow

## Amendment Outcome Direction

The platform should distinguish between four different outcomes after a requested change:

1. validation only
2. revalidation with no new quote or confirmation boundary
3. explicit requote or repricing
4. explicit reconfirmation readiness before relying on the amended booking as a committed booking basis

Approved baseline reading:
- low-risk changes such as non-price-sensitive passenger/contact detail corrections may require validation only
- changes that affect eligibility, timing, route basis, selected service, or operational feasibility require revalidation
- changes that affect the quoted fare basis require explicit requote or repricing
- if the amended booking changes an input that was required for `confirmed`, the platform must explicitly re-establish confirmation readiness before treating the amended context as the committed booking basis

### Commitment-Sensitive Change Matrix Direction

Current baseline matrix:

| Change Type | Revalidation | Requote / Repricing | Reconfirmation Readiness |
| --- | --- | --- | --- |
| passenger/contact correction only | yes where needed | no by default | no by default |
| extras change with no fare effect | yes where needed | no by default | no by default |
| extras change with fare effect | yes | yes | yes if the confirmed price basis changes |
| pickup/dropoff, route, or trip timing change | yes | yes where quote basis changes | yes if the booking was already relying on the earlier confirmed quote basis |
| vehicle/service option change | yes | yes where fare or eligibility changes | yes if confirmation prerequisites are affected |
| payment-path, billing, or consent-affecting change | yes | not necessarily | yes |

Guardrails:
- this matrix is a commitment baseline, not a final per-role workflow
- revalidation, requote, and reconfirmation readiness are different outcomes and must not be collapsed into one vague "update succeeded" result
- if a confirmed booking loses a required commitment prerequisite through amendment, the platform must not pretend the earlier confirmation still proves the amended booking is ready without explicit re-establishment
- where reconfirmation readiness is required, the amended booking must satisfy the then-current confirmation requirements for its active booking path rather than relying on earlier pre-amendment satisfaction by assumption

## Amendment Financial Outcome Direction

Repricing after amendment and financial follow-through are related, but they are not the same decision.

Approved baseline reading:
- a repriced amendment may result in no financial follow-through if the confirmed financial basis is unchanged
- a repriced amendment may require additional-charge review where the approved payment path and policy require collection of the higher amount
- a repriced amendment may require credit or refund review where the approved payment path and policy require returning or reducing a previously committed financial amount
- invoice or account-billing paths may require balance adjustment or credit-note review instead of card-style refund language

### Amendment Repricing vs Financial Follow-Through Matrix

Current baseline matrix:

| Amendment Result | Revalidation | Requote / Repricing | Reconfirmation Readiness | Financial Follow-Through |
| --- | --- | --- | --- | --- |
| validated change with no fare effect | yes where needed | no | no by default | no by default |
| repriced change with same effective financial basis | yes | yes | yes where commitment prerequisites changed | no by default |
| repriced change with higher amount to be honoured | yes | yes | yes where commitment prerequisites changed | additional-charge review where payment path and policy require it |
| repriced change with lower amount or released amount | yes | yes | yes where commitment prerequisites changed | credit or refund review where payment path and policy require it |
| repriced invoice/account-billing change | yes | yes | yes where commitment prerequisites changed | invoice balance or credit-note review where policy requires it |

Guardrails:
- repricing does not by itself prove a charge, refund, credit, or waived amount has already been resolved
- financial follow-through must stay downstream from the amendment outcome and the approved payment path
- the booking lifecycle remains separate from all resulting finance outcomes
- reconfirmation readiness and financial follow-through must stay distinguishable: an amended booking may be financially reviewed yet still not be ready to rely on as the committed booking basis until the current path requirements are satisfied

---

## Cancellation Baseline

Cancellation means the booking is intentionally terminated before successful completion.

Canonical direction:
- cancellation resolves to `cancelled`
- cancellation is a lifecycle outcome, not just a UI event
- cancellation may be initiated by customer, tenant staff, or later operational actors according to role/policy

Current baseline window:
- cancellation is allowed until `arrived`
- later policy can make late cancellations more restricted, more visible, or fee-bearing

---

## Late Cancellation Guardrail

Bookings in these states may still be cancellable:
- `assigned`
- `driver_en_route`
- `arrived`

But those cancellations must be treated as stricter cases than early cancellations.

Canonical direction:
- late cancellation may trigger stronger policy handling
- late cancellation must remain explicit and auditable
- late cancellation must not silently behave like a normal early-stage customer edit

This document does not yet define fee/refund logic, but it locks the lifecycle boundary.

## Cancellation Outcome Direction

Cancellation does not use the same outcome model as amendment.

Approved baseline reading:
- cancellation does not lead to reconfirmation readiness
- cancellation does not lead to requote or repricing of the cancelled booking as a way to preserve normal booking flow
- cancellation leads to the canonical `cancelled` lifecycle outcome
- any refund, credit, waived fee, or no-refund result is a separate payment/finance outcome that follows the cancellation policy and payment path

### Cancellation-Sensitive Outcome Matrix Direction

Current baseline matrix:

| Situation | Revalidation | Requote / Repricing | Reconfirmation Readiness | Finance Outcome Review |
| --- | --- | --- | --- | --- |
| early cancellation before commitment-sensitive downstream effects | no by default | no | no | yes where payment path or policy requires it |
| late cancellation in `assigned`, `driver_en_route`, or `arrived` | no by default for lifecycle truth | no | no | yes, with stricter policy handling |
| amendment attempt rejected and booking remains active | yes where needed for the attempted change | yes where price basis was affected | yes where commitment prerequisites were affected | only if the approved payment path or policy says the failed/rolled-back change has a finance consequence |

Guardrails:
- cancellation closes the booking lifecycle through `cancelled`; it does not send the booking back through quote or confirmation flow
- refund-sensitive review is separate from lifecycle truth
- a cancellation decision must not be hidden inside vague wording such as "updated booking" or "reprocessed booking"

---

## After Trip Start

Once a booking reaches `in_progress`:
- no normal amendment flow remains
- no normal cancellation flow remains
- later problems must be handled through exception and operations contracts

This is the cleanest product boundary for the first canonical booking policy.

---

## Relationship to Pricing

Amendments may affect price.

Canonical direction:
- if an amendment changes price-relevant inputs, repricing must be explicit and rule-driven
- silent price drift is not allowed
- the pricing engine remains the source of truth for amended fare outcomes
- if an amendment invalidates the quote basis, the booking must return through explicit requote or revalidation before a later confirmation step can rely on the amended context

Cancellation may affect payments/refunds later, but:
- payment/refund detail does not redefine booking lifecycle
- payment/refund detail belongs to later payment contracts
- late cancellation may produce explicit financial outcomes such as refund due, partial refund, no refund, credit, or other approved adjustment, but those outcomes remain in the payment/finance layer rather than becoming booking states
- amendment repricing and cancellation finance review must not be collapsed into one generic "price changed" outcome

---

## Relationship to Customer and Ops Surfaces

This document sets the business baseline only.

Later UI and permission contracts must decide:
- which roles can request amendment
- which roles can approve or perform late changes
- what the customer sees when amendment is no longer available
- what restricted/late cancellation messaging looks like

Current direction:
- customer-facing amendment should stop before `assigned`
- later operational change handling belongs to tenant ops and dispatch surfaces

---

## Failure and Restriction Direction

- invalid amendment inputs must be rejected without inventing a fake amended state
- amendment attempts after the allowed window must be blocked or routed to later operational handling
- cancellation attempts after the allowed window must be blocked unless a later explicit exception path is documented
- failed amendment must not silently corrupt confirmation, dispatch, or price state
- if revalidation, requote, or reconfirmation is required, the platform must make that outcome explicit rather than leaving the amendment in a vague partially updated state

---

## Invariants

1. Amendment is a process action, not a booking lifecycle state.
2. Cancellation resolves through `cancelled`.
3. Amendments are allowed only before `assigned`.
4. Cancellations are allowed until `arrived`, subject to policy restrictions.
5. From `in_progress` onward, normal amendment/cancellation is closed.

---

## Important Rule

GreenRide should treat amendment and cancellation as controlled business actions layered onto the booking lifecycle, not as reasons to invent extra lifecycle states.

---

## Stop Conditions

Stop and clarify before implementation if:
- an amendment flow is being allowed after `assigned` as a normal customer capability
- `amended`, `rescheduled`, or similar labels are being added as canonical booking states
- cancellations after `in_progress` are being treated as normal booking cancellation rather than later exception/ops handling
