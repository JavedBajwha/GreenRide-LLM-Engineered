# Payments And Invoicing

## Purpose

Define the canonical payments and invoicing baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- one universal payment rule for every booking path
- payment states that silently replace booking lifecycle states
- provider-specific assumptions with no approved product contract
- invoicing behavior that conflicts with booking confirmation or later amendment/cancellation rules

## In Scope

- payment-path baseline for booking confirmation
- payment state direction
- invoicing/account-billing baseline
- refund and cancellation-fee relationship baseline
- boundary between booking state and payment state
- manual financial intervention boundary
- payment-consent governance linkage

## Current Status

Draft, approved as the current documentation direction.

This document is the first canonical payment and invoicing contract for the Phase 7 service domain.

## Out of Scope

This document does not define:
- a final payment provider
- detailed payment-method matrix by tenant/zone
- multi-currency strategy
- payment event transport or webhook mechanics
- final refund-policy percentages or fee schedules

Those belong to later payment-method, currency, and integration contracts.

## Related Documents

- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/booking-amendments-and-cancellations.md`
- `docs/01-product/pricing-engine.md`
- `docs/03-platform/security-model.md`
- `docs/03-services/audit-logging.md`
- `docs/03-services/refunds-and-financial-adjustments.md`

## Canonical Rules

1. GreenRide supports multiple booking payment paths.
2. Payment is not universally required for booking confirmation.
3. Each booking path must explicitly declare its confirmation payment requirement.
4. Payment state must not replace booking lifecycle state.
5. Provider choice remains open until explicitly approved in a later contract.
6. Refund and invoicing behavior must stay aligned with booking confirmation and cancellation boundaries.

## Payment-Path Baseline

The platform should not assume that every booking follows the same payment rule.

Approved direction:
- some bookings may confirm without immediate payment
- some bookings may require successful payment before confirmation
- some bookings may require successful authorisation before confirmation
- some bookings may confirm through later invoice/account-billing eligibility

This is the core payment rule for GreenRide.

## Relationship to Booking Confirmation

The booking contract already defines:
- `confirmed` as the quote-to-booking boundary
- payment/process state as separate from booking lifecycle state

Canonical payment direction:
- the booking path must define whether payment success, authorisation, or billing eligibility is required before confirmation
- where payment is mandatory for the path, failed payment must block confirmation
- where payment is not mandatory for the path, payment failure or absence must not silently invent a fake booking state

This keeps payment logic aligned with the booking lifecycle backbone.

## Allowed Confirmation Requirement Types

Current approved confirmation requirement categories:
1. no immediate payment required
2. successful payment required
3. successful authorisation required
4. later invoice/account-billing eligibility required

Important guardrail:
- a booking path must choose its requirement explicitly
- AI and future implementation work must not guess the requirement from UI shape alone

## Payment Consent Baseline

GreenRide should treat payment consent as an explicit trust requirement where the booking path depends on payment, authorisation, or later billing acknowledgement.

Canonical direction:
- payment consent belongs to the booking/payment boundary
- payment consent is separate from payment outcome
- required payment consent must exist before confirmation where the active booking path depends on it

This prevents payment flows from relying on implied or invisible acceptance.

## Payment-Path Consent Direction

Baseline direction by confirmation requirement type:

1. `no immediate payment required`
   - payment consent is not universally required by default
   - only non-payment booking agreements apply unless later path rules say otherwise

2. `successful payment required`
   - explicit charge/payment consent must be captured before confirmation
   - payment success without the required consent must not be treated as a valid confirmation path

3. `successful authorisation required`
   - explicit authorisation consent must be captured before confirmation
   - authorisation outcome does not replace consent capture

4. `later invoice/account-billing eligibility required`
   - explicit billing acknowledgement must be captured where the path depends on later billing terms
   - billing eligibility validation does not replace that acknowledgement where required

## Payment Consent Record Boundary

Payment consent should be referenceable later by payment, booking, and audit flows.

Approved baseline direction:
- required payment consent should be linked to the booking attempt or booking record context
- the platform should be able to reference what type of payment consent was accepted and when
- manual financial intervention must not erase or replace the original consent boundary by assumption

### Payment-Consent Governance Boundary

The platform should be able to distinguish:
- booking terms acceptance
- policy acknowledgement
- charge or authorisation consent
- later invoice/account-billing acknowledgement

This payment document depends on the booking-agreement contract for capture categories, but payment flows must still respect those categories instead of flattening them into one generic “accepted” flag.

This document still does not define provider-specific token, webhook, or legal-record storage detail.

## Payment State Boundary

Examples of payment/process states that are not booking lifecycle states:
- payment_pending
- authorised
- paid
- failed
- refunded

Rules:
- payment state influences booking-path progression and financial handling
- payment state does not redefine the booking lifecycle
- booking state remains the source of truth for booking lifecycle

## Invoicing Baseline

GreenRide should support later invoice/account-billing paths as a real payment mode, not as an undocumented exception.

Current baseline direction:
- invoicing belongs to approved billing/account paths
- invoice/account billing may satisfy the confirmation requirement where the booking path allows it
- invoice issuance and settlement remain financial records, not booking lifecycle states

This creates a clean bridge to later account-billing and payment-method documentation.

## Refund and Cancellation Relationship

Refunds and cancellation fees belong to the payment domain, but they do not redefine cancellation lifecycle.

Canonical direction:
- booking cancellation still resolves through `cancelled`
- payment outcomes such as refund_due, partially_refunded, or no_refund are financial outcomes, not booking states
- late-cancellation financial treatment must remain explicit and policy-driven later
- amendment repricing and cancellation finance review are different follow-through paths and must not be flattened into one generic payment adjustment result

### Refund Baseline

Approved first refund direction:
- refund behavior must be tied to an approved payment path and cancellation/change policy
- full refund, partial refund, and no-refund outcomes should remain explicit financial outcomes
- additional charge collection, refund review, credit handling, and invoice/account adjustment must remain distinct financial outcomes rather than one generic "payment updated" result
- a refund decision must not silently rewrite the original booking or payment-consent record
- invoice/account-billing paths may require credit-note or later settlement handling instead of card-style refund behavior
- an amended booking that is repriced does not automatically imply a refund; any refund, additional charge, credit, or waived adjustment must still follow the approved payment path and policy
- repricing outcome and financial follow-through should remain distinguishable so the platform does not treat "new fare calculated" as proof that collection, refund, or adjustment is already complete

### Financial Outcome Separation Boundary

The platform should keep at least these follow-through directions distinct:
- additional charge to collect
- refund review or refund due
- credit or adjustment due
- invoice/account-billing settlement correction
- no further financial action

Canonical direction:
- these are downstream financial outcomes, not booking-state outcomes
- one financial outcome must not be inferred automatically from another
- invoice issuance, invoice settlement, refund review, and later adjustment handling must remain distinguishable in documentation and implementation

### Manual Financial Intervention Boundary

Manual financial actions may exist later for authorised operational or finance actors, but:
- they must be auditable
- they must not silently override the booking-state backbone
- they must not erase the original payment outcome or payment-consent boundary
- they should remain explicit exceptional interventions, not the default payment path

This keeps the cancellation contract and the payment contract aligned.

## Failure Direction

- failed payment must block confirmation where that booking path requires payment success
- failed payment must not silently create a confirmed booking if the path requires payment or authorisation first
- payment uncertainty must remain visible rather than being treated as success by assumption
- invoice/account-billing eligibility must be validated explicitly rather than assumed from customer type alone
- a generic "payment updated" or "finance adjusted" result must not hide whether the real follow-through was collection, refund review, credit handling, or invoice correction

## Security and Audit Direction

- payment actions are sensitive financial operations
- payment-related state transitions and manual financial interventions must be auditable
- required payment-consent capture should be auditable where the payment path depends on it
- provider/integration failure must not silently corrupt booking commitment or invoice state

This document does not define the final event model, but it locks the trust boundary.

## Important Rule

GreenRide should treat payment as a path-specific booking requirement and financial service layer, not as a universal booking-state shortcut.

## Stop Conditions

Stop and clarify before implementation if:
- confirmation is being treated as always requiring payment success with no path-specific rule
- payment state is being used as a substitute booking lifecycle
- invoice/account-billing is being added as an ad hoc exception without explicit path approval
- a provider-specific flow is being invented as the platform default without approved documentation
