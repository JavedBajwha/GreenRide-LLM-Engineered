# Booking Forms and Agreements

## Purpose

Define the canonical booking-form and agreement/consent model for GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent booking-input structures across customer and ops flows
- unclear mandatory vs optional booking fields
- unsafe freeform form-builder behavior
- missing or ad hoc agreement/consent capture

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical booking-form and agreement contract for the customer-booking domain.

---

## Scope

This document covers:
- booking-form purpose and boundaries
- baseline field groups
- configurable vs fixed form behavior
- extras and notes treatment
- agreement/consent capture baseline
- relationship between booking forms, booking state, and tenant configuration
- consent requirement matrix direction
- agreement-text governance baseline

---

## Out of Scope

This document does not define:
- payment-method-specific legal copy
- final privacy-policy/legal text wording
- invoice or post-booking finance forms
- internal ops backoffice form layout detail

Those belong to payments, legal/compliance, finance, or later UI-detail contracts.

---

## Related Documents

- `docs/02-applications/customer-booking-flow-full.md`
- `docs/05-frontend/customer-booking-ui.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/security-model.md`
- `docs/03-services/audit-logging.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/pricing-engine.md`

---

## Canonical Rules

1. Booking forms capture booking input; they do not invent new booking lifecycle states.
2. Booking-form structure may be configurable within platform guardrails, not fully freeform.
3. Mandatory and optional fields must be explicit.
4. Agreement/consent capture must be deliberate where required, not implied by submission alone.
5. Booking-form configuration must remain tenant-scoped.
6. Validation ownership belongs to the backend/source-of-truth, even when UI controls the entry experience.
7. Preserved form progress does not by itself keep a quote or booking attempt confirmation-ready if quote validity, consent, or pricing context changed.
8. Consent captured against one booking-path or quote context must not be replayed blindly if explicit requote, revalidation, or booking-path change alters the dependent commitment basis.

---

## Booking Form Purpose

Booking forms exist to capture the information needed to:
- request a quote
- progress toward confirmation
- collect customer/passenger information
- collect extras or operational notes
- collect required agreement/consent where the product requires it

Booking forms should not be treated as:
- arbitrary page builders
- freeform survey systems
- legal-document engines

---

## Booking Form Baseline Structure

The current booking journey implies the following major input groups:

1. trip details
2. vehicle/service selection
3. passenger/contact details
4. extras/add-ons
5. notes or special instructions
6. agreement/consent capture where required

This structure should stay recognisable across customer and operator-assisted booking entry, even if the exact layout differs.

---

## Baseline Field Groups

### 1. Trip Details

Baseline trip-detail inputs may include:
- pickup location
- dropoff location
- pickup date/time
- trip type
- passenger count
- luggage count

These fields feed quote and booking logic and must remain strongly validated.

### 2. Vehicle / Service Selection

Baseline selection inputs may include:
- selected vehicle category
- selected service type where supported

This stage depends on prior quote/eligibility output and must not override eligibility rules.

### 3. Passenger / Contact Details

Baseline customer/passenger inputs may include:
- name
- phone
- email

These are the minimum currently implied by the existing booking-flow docs.

### 4. Extras / Add-Ons

Baseline extras may include:
- child seat
- meet and greet
- luggage-related options
- other tenant-enabled optional extras

Extras affect pricing and operational context and must therefore remain structured, not arbitrary free text.

### 5. Notes / Special Instructions

Notes may be supported as optional structured free text, but should remain:
- optional by default unless tenant policy explicitly requires them
- validation-bounded
- not a substitute for structured required fields

---

## Mandatory vs Optional Field Direction

Baseline rule:
- some fields are platform-required
- some fields are tenant-configurable within limits
- some fields are optional enhancements

### Platform-Required Baseline

At minimum, the platform should expect:
- core trip details required for quote generation
- enough customer/contact detail to support booking confirmation where the booking path requires it

### Tenant-Configurable Baseline

Tenant configuration may influence:
- which optional booking fields appear
- which extras are shown
- whether some additional contact/operational fields are mandatory

This aligns with:
- `docs/03-platform/tenant-configuration.md`

### Guardrail

Tenant configuration must not remove the minimum platform-required fields needed for a valid quote/booking path.

---

## Configurable Form Behavior

GreenRide may support configurable booking forms, but with guardrails.

Allowed baseline direction:
- show/hide approved optional fields
- mark approved configurable fields as required or optional where safe
- reorder approved sections or fields later if explicitly allowed
- show tenant-enabled extras/options

Not allowed by default:
- arbitrary custom HTML fields
- arbitrary scripting
- tenant-defined field types that bypass platform validation
- legal/consent behavior that is disconnected from platform rules

This means the system is a controlled form configuration model, not an unrestricted form builder.

---

## Agreement and Consent Baseline

Agreement/consent capture may be required in booking flows where the product or tenant policy demands it.

Current baseline direction:
- consent/agreement capture must be explicit where required
- submission alone is not enough if the form requires explicit acceptance
- agreement capture should be tied to the booking attempt/record context where relevant

Examples of where agreement capture may matter later:
- booking terms acceptance
- cancellation-policy acknowledgement
- payment/charge acknowledgement where the payment domain requires it
- special service acknowledgements

This document sets the guardrail, not the final legal matrix.

---

## Agreement Capture Rules

Baseline rules:
- agreements should be presented clearly, not hidden in ambiguous UX
- required agreements must be captured before the flow proceeds to the state that depends on that acceptance
- agreement capture should be recorded in a way later domains can reference
- tenant-level text/configuration may vary later, but agreement capture behavior must remain platform-controlled

Important boundary:
- tenants may influence presentation or enabled agreement requirements within approved limits
- tenants should not invent entirely custom legal flow logic outside platform guardrails

## Agreement and Payment-Consent Requirement Types

GreenRide should distinguish between:
- booking agreement acceptance
- policy acknowledgement
- payment or charge consent
- invoice/account-billing acknowledgement where the booking path requires it

Examples of approved requirement types:
- booking terms acceptance
- cancellation-policy acknowledgement
- charge authorisation acknowledgement for pay-now or authorise-now paths
- later-billing acknowledgement for approved account-billing or invoice paths

Important boundary:
- these may appear together in one flow
- but they should not be treated as one vague checkbox with no meaning
- they also should not be treated as proof that confirmation is allowed unless the active quote, booking path, and pricing context are still valid

## Payment Consent Boundary

Payment consent is a specific kind of agreement capture, not a free extra note in the payment step.

Canonical direction:
- where a booking path requires payment success or authorisation before confirmation, the required payment consent must be captured explicitly before confirmation
- where a booking path uses later invoice/account billing, the required billing acknowledgement must be captured explicitly if that path depends on it
- submission alone is not enough where explicit payment consent is required
- preserved form state or earlier checkbox capture must not be treated as permanently valid if the booking path revalidates or the quote context changes

This keeps payment trust boundaries aligned with booking confirmation rules.

## Consent Matrix Direction

Approved first requirement matrix:

| Booking Path Type | Booking Terms | Policy Acknowledgement | Payment / Charge Consent | Billing Acknowledgement |
| --- | --- | --- | --- | --- |
| no immediate payment required | required where booking flow says so | where applicable | not required by default | no |
| successful payment required | required where booking flow says so | where applicable | yes | no |
| successful authorisation required | required where booking flow says so | where applicable | yes, authorisation-specific | no |
| later invoice/account billing | required where booking flow says so | where applicable | no immediate charge consent by default | yes where later billing terms apply |

This is a baseline direction, not final legal copy.
It exists so AI does not collapse all consent needs into one generic checkbox.

## Consent Capture Record Baseline

Agreement and payment-consent capture should be recorded in a structured way that later domains can reference.

Approved baseline capture attributes:
- agreement or consent type
- agreement/policy/version reference where applicable
- acceptance status
- accepted timestamp
- capture surface/context
- actor identity or booking contact context where applicable
- booking path type where the requirement depends on that path
- quote or pricing-context reference where the acceptance depends on the then-current commitment basis
- booking attempt or booking record linkage

Important guardrail:
- consent capture must be referenceable later by booking, payment, audit, and dispute-handling flows
- but this document does not require provider-specific or legal-document storage mechanics yet

## Consent Reuse and Reconfirmation Boundary

Earlier consent capture may remain usable only while the dependent confirmation basis is still the same in all material ways.

Canonical direction:
- preserved agreement or consent evidence may remain usable only if the active booking path, required agreement version, and dependent quote/commitment basis still match the current confirmation attempt
- if explicit requote or revalidation changes the financial, billing, or other consent-sensitive commitment basis, the platform must not treat earlier dependent consent as automatically sufficient by default
- where the earlier acceptance is no longer sufficient, the platform must require explicit reconfirmation or recapture before `confirmed`
- operator-assisted review may help the flow recover, but it does not by itself waive reconfirmation where the underlying dependent basis changed

Important boundary:
- this rule does not say every quote refresh forces every agreement to be recaptured
- it does say that commitment-sensitive consent must remain tied to the booking-path and quote context it depended on, rather than being replayed as timeless truth

## Agreement Text Governance Baseline

The platform should distinguish between:
- platform-owned agreement types and capture behavior
- tenant-configurable presentation or enabled variants within approved limits
- legal/policy version references tied to the accepted agreement

Rules:
- tenants may not invent entirely new consent types outside approved platform categories by default
- required agreement types should stay platform-controlled even when tenant presentation varies
- acceptance should reference the applicable agreement or policy version where the flow depends on it

## Pre-Confirmation Consent Rule

Before a booking may reach `confirmed`, the active booking path must have captured:
- all required booking agreements
- all required policy acknowledgements
- all required payment or billing consent for that path

This applies alongside:
- valid trip details
- valid pricing context
- valid passenger/contact detail
- any required payment outcome for the active path

That means payment outcome and payment consent are related, but not interchangeable.

If explicit requote, revalidation, or booking-path change alters the commitment-sensitive basis:
- payment or billing consent tied to the earlier basis must be rechecked against the current confirmation attempt
- confirmation must not rely on an older dependent consent record by assumption

---

## Customer vs Operator Entry

The product may later support both:
- customer self-service booking forms
- operator-assisted booking entry inside tenant operations

Baseline rule:
- these may differ in UX density and available controls
- but they should still align to the same underlying booking-input contract and validation ownership

This prevents customer and ops booking creation from drifting into different business models.

### Entry-Context Baseline

Current approved entry contexts:
- guest self-service public entry
- authenticated customer account entry
- operator-assisted tenant entry

Current baseline reading:
- guest entry may require more direct capture of contact and agreement inputs because no account context is assumed by default
- authenticated customer entry may reuse supported account/profile data where the product allows it
- operator-assisted entry may expose denser controls or internal workflow assistance

Guardrails:
- these entry-context differences do not by themselves change the underlying confirmation boundary
- required pricing, quote-validity, agreement, consent, billing acknowledgement, and financial prerequisites still depend on the active booking path
- operator-assisted entry does not by itself waive consent or pricing requirements unless a later explicit authority policy documents such a difference

---

## Validation Ownership

Validation must remain backend-owned.

Rules:
- UI may guide and pre-validate
- backend remains the source of truth for required fields and acceptable values
- tenant configuration may change approved optionality only within documented guardrails
- extras and notes must not bypass pricing or operational validation just because the form rendered them

---

## Relationship to Booking State

Booking forms and their intermediate completion steps are not canonical booking states.

Examples:
- passenger details entered
- extras chosen
- agreements accepted

These may exist as:
- UI progress
- process metadata
- validation state

But they must not create new booking lifecycle states unless explicitly documented elsewhere.

---

## Invariants

1. Booking forms are tenant-scoped but platform-governed.
2. Required fields must stay explicit.
3. Extras should remain structured rather than arbitrary text.
4. Agreement capture must be explicit where required.
5. Backend validation remains authoritative.

---

## Failure and Exception Direction

- invalid form data must not proceed into quote or booking logic
- missing required agreement/consent must block the dependent step when agreement is required
- notes or optional text must not replace required structured inputs
- tenant configuration must not create a form that blocks the minimum viable quote/booking path

---

## Important Rule

GreenRide should support configurable booking capture, but not an uncontrolled form-builder product.

The booking form is a controlled business input surface.

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant configuration is expected to create arbitrary field types or custom scripts
- agreement/consent is assumed without explicit capture where required
- UI progress steps are being promoted into booking lifecycle states
- backend validation is being weakened to match ad hoc tenant form customization
