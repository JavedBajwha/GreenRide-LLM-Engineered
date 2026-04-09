# Refunds and Financial Adjustments

## Purpose

Define the first canonical follow-through contract for refunds, credits, and manual financial adjustments in GreenRide.

This document exists so AI and future implementation work do not invent:
- refund behavior that silently rewrites booking truth
- manual financial actions that bypass auditability
- invoice-style adjustments treated like card refunds
- vague financial statuses with no relationship to booking, payment, and consent records

---

## Status

Draft, approved as the current documentation direction.

This document extends the payment baseline into refund and adjustment follow-through.

---

## Scope

This document covers:
- refund outcome categories
- relationship between cancellation/change policy and refund behavior
- invoice/account-billing adjustment direction
- manual financial adjustment guardrails
- audit and record-preservation rules

---

## Out of Scope

This document does not define:
- final refund percentages or fee schedules
- provider-specific refund API mechanics
- accounting-ledger implementation
- taxation detail

Those belong to later payment-provider, finance, and accounting-detail work.

---

## Related Documents

- `docs/03-services/payments-and-invoicing.md`
- `docs/01-product/booking-amendments-and-cancellations.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/03-services/audit-logging.md`

---

## Canonical Rules

1. Refund and adjustment outcomes are financial outcomes, not booking lifecycle states.
2. Refund behavior must remain tied to an approved payment path and change/cancellation policy.
3. Manual financial actions must be explicit, auditable, and exceptional.
4. Original payment and consent records must remain referenceable after later financial changes.
5. Invoice/account-billing adjustments must not be forced into card-refund language when the model does not fit.

---

## Financial Outcome Categories

Approved first financial outcomes:
- no refund
- refund due
- partially refunded
- fully refunded
- credit or adjustment due
- write-off or waived adjustment where later authorised
- additional charge collection or settlement correction where later policy requires it

These outcomes exist in the payment/finance layer.
They do not replace:
- `cancelled`
- `completed`
- `exception`

Important boundary:
- not every later financial change is a refund
- not every credit or invoice correction is a waived charge
- the platform must keep collection, refund, credit, and settlement-correction directions distinguishable rather than flattening them into one generic adjusted state

---

## Relationship to Booking Change Policy

GreenRide should treat refund decisions as downstream from approved booking-change policy.

Canonical direction:
- the booking-change policy decides whether a cancellation or amendment has a financial consequence
- the payment/finance layer records the resulting financial outcome
- the booking record stays the source of truth for booking lifecycle, while the finance layer records the money consequence
- amendment repricing, cancellation review, and later financial adjustment are related but not identical decisions and should stay distinguishable in documentation and implementation
- a newly calculated amended fare does not by itself prove that the corresponding collection, refund, credit, or invoice adjustment has already been completed

---

## Card / Authorisation Path Direction

For pay-now or authorise-now paths:
- refund or release behavior should remain explicit
- partial and full refund should stay distinguishable
- authorisation release or capture-adjustment should not be described as a booking-state change

Later provider mechanics may vary, but the product boundary should stay the same.

---

## Invoice / Account-Billing Direction

Invoice or account-billing paths may need:
- credit note behavior
- reduced balance
- waived charge
- later account adjustment

These should remain explicit invoice/account-billing outcomes rather than being squeezed into a card-refund model by assumption.

---

## Manual Financial Adjustment Boundary

Manual financial actions may later include:
- manual refund approval
- manual partial adjustment
- waived cancellation fee
- credit-note issuance
- balance correction

Rules:
- these are exceptional interventions
- they must require an authorised actor
- they must capture a reason
- they must be auditable
- they must not silently replace the original payment outcome or consent record
- they must not hide whether the intervention was refund-led, credit-led, charge-led, or invoice-led

---

## Record Preservation Rules

After a refund or manual financial adjustment:
- original booking identity remains intact
- original payment path remains referenceable
- original consent/acknowledgement boundary remains referenceable
- financial outcome history should show what changed and why

This prevents later money adjustments from erasing earlier trust-boundary evidence.

---

## Audit Baseline

Financial adjustments should record at least:
- actor
- booking or financial record scope
- adjustment type
- prior and resulting outcome where relevant
- reason or note
- timestamp

---

## Invariants

1. Refunds and credits are financial outcomes.
2. Booking lifecycle truth remains with the booking domain.
3. Original consent and payment records stay referenceable.
4. Manual financial changes are exceptional and audited.
5. Invoice/account-billing adjustments may differ from card-refund behavior.

---

## Stop Conditions

Stop and clarify before implementation if:
- refunds are being treated as booking lifecycle states
- manual finance actions are being added with no audit boundary
- card-refund language is being forced onto invoice/account-billing paths without fit
- later financial changes would overwrite the original consent or payment record
