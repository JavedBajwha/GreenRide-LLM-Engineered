# Quote Expiry and Quote-to-Booking Rules

## Purpose

Define the canonical quote-expiry model for GreenRide.

This document exists so AI and future implementation work do not invent:
- quotes that stay valid forever by accident
- silent confirmation against stale quote data
- inconsistent quote-to-booking behavior across customer, ops, pricing, and payment flows
- expired quotes being treated as committed bookings

---

## Status

Draft, approved as the current documentation direction.

This document is the canonical quote-expiry and quote-to-booking follow-through contract for the customer-booking domain.

---

## Scope

This document covers:
- quote validity and expiry baseline
- relationship between quote expiry and confirmation
- expiry outcomes
- relationship to repricing and requoting
- source-of-truth boundary for quote validity
- warning and recovery direction

---

## Out of Scope

This document does not define:
- exact expiry duration constants
- provider-specific cache/session behavior
- final UI copy for expired-quote warnings
- every repricing trigger

Those belong to later product-policy, UX, and implementation detail work.

---

## Related Documents

- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/06-implementation/search-and-quote-canonical-spec.md`

---

## Canonical Rules

1. A quote must have an explicit validity window.
2. An expired quote must not be treated as confirmation-ready.
3. Quote expiry does not create a new booking lifecycle state.
4. Confirmation against an expired quote must require requoting or other explicit revalidation.
5. Quote validity must be evaluated against platform-owned quote metadata, not guessed from UI state alone.

---

## Quote Validity Baseline

GreenRide should treat a quote as a time-bounded pricing and selection result, not an indefinitely reusable promise.

Canonical direction:
- a valid quote should carry a clear expiry boundary
- quote validity belongs to quote/process metadata, not the booking lifecycle state machine
- a quote may still be in the `quoted` or `vehicle_selected` stage and already be expired

Approved first UX direction:
- the platform may show warning or countdown behavior before expiry
- warning UX is supportive only; backend/platform validity remains authoritative
- warning state should not imply a booking already exists

This keeps quote truth separate from booking-state truth.

### Validity Duration Boundary

The platform must define a validity duration for quotes, but this document does not yet set the exact constant.

Current baseline reading:
- every quote should carry enough metadata to evaluate whether it is still within its approved validity window
- the existence of a validity window is required now
- the exact duration value remains explicitly partial until later policy detail is approved

This prevents fake certainty about timing constants while still blocking “valid forever” behavior.

---

## Relationship to Booking Confirmation

Quote expiry matters because `confirmed` is the quote-to-booking boundary.

Canonical direction:
- confirmation must use a still-valid quote context unless an explicit revalidation path is performed
- the system must not silently confirm a booking against stale quoted pricing or selection assumptions
- if a quote has expired, the platform must require requoting, revalidation, or other explicit recovery before confirmation

This keeps pricing preservation and booking commitment aligned.

---

## Expiry Outcome Baseline

If a quote expires before confirmation:

- the quote is no longer confirmation-ready
- the user or operator may need to re-run quote generation or explicit revalidation
- the platform must not silently preserve stale pricing by assumption
- the system may preserve in-progress form context, but not stale quote validity by default

Important boundary:
- expired quote does not equal cancelled booking
- expired quote does not equal exception
- expired quote does not mean a booking exists

### Warning Behaviour Baseline

Warning behaviour is supportive only and must stay secondary to platform-owned validity.

Approved baseline reading:
- the platform may show “expiring soon” or countdown-style warning behaviour before expiry
- warning behaviour should help the user or operator act before expiry, not imply that confirmation is guaranteed
- once expiry is reached, warning behaviour must not continue to present the quote as confirmation-ready
- if warning behaviour is stale or missing, backend-owned validity still wins

---

## Requote and Revalidation Direction

When quote validity is lost, the next valid path is not silent continuation.

Canonical direction:
- re-quote or revalidation must be explicit
- the resulting price or eligible vehicle set may change
- the next valid quote context becomes the basis for any later confirmation

### Revalidation Trigger Baseline

Current approved trigger direction:
- explicit revalidation may be used only where the platform can still prove the underlying quote basis remains acceptable for commitment
- if the platform cannot safely rely on the earlier quote basis, a fresh requote is required instead

Examples of conditions that may require explicit revalidation or fresh requote:
- quote validity window reached or passed
- pricing inputs changed
- eligibility inputs changed
- booking-path prerequisites changed
- the platform can no longer trust the earlier quote metadata as sufficient for confirmation

This document does not finalize every trigger as a product-policy matrix, but it does establish that revalidation is not a vague shortcut.

### Requote vs Confirmation-Allowance Baseline

Current baseline matrix:

| Situation | Confirmation Still Allowed | Explicit Revalidation | Fresh Requote Required |
| --- | --- | --- | --- |
| quote still inside validity window and booking-path prerequisites still satisfied | yes | no by default | no |
| quote near expiry but still valid | yes, if backend validity still says valid | optional supportive check only | no by default |
| quote expired but platform can still explicitly revalidate the underlying commitment basis under later approved rules | no until revalidation succeeds | yes | maybe, depending on whether revalidation succeeds |
| quote expired and the earlier quote basis can no longer be relied on safely | no | no as a substitute | yes |
| amendment changed quote-relevant inputs | no for the earlier quote basis | yes where the platform can still re-establish commitment readiness | yes where the earlier pricing/eligibility basis must be recalculated |

Guardrails:
- expired quotes are never confirmation-ready by default
- revalidation is an explicit recovery path, not silent continuation
- if revalidation does not succeed, confirmation remains blocked and a fresh requote is required
- confirmation is allowed only on a still-valid quote context or a successfully revalidated replacement basis

### Recovery Direction

If a quote expires during an in-progress booking flow:
- in-progress form context may be preserved where safe
- the stale quote itself must not remain confirmation-ready
- the user or operator should be guided into explicit requote or revalidation, not silent continuation

This means:
- quote expiry is a pricing/booking-boundary event
- not a hidden UI inconvenience

---

## Source-of-Truth Boundary

Quote expiry must be decided from platform-owned quote metadata.

Approved baseline direction:
- quote records or quote response metadata should carry enough validity information to determine whether the quote is still usable
- UI timers or client memory alone must not be treated as the source of truth
- later implementation may expose expiry countdown or warning UX, but backend-owned validity remains authoritative

---

## Relationship to Repricing

Quote expiry and repricing are related, but not identical.

Canonical direction:
- an expired quote normally leads to requoting or explicit revalidation
- repricing triggers may also exist even before expiry under separately documented rules
- expiry should not be treated as just another hidden repricing trigger with no visible boundary

This keeps the quote-expiry rule understandable instead of burying it inside generic pricing drift.

---

## Important Rule

GreenRide should treat quote expiry as an explicit validity boundary for quote-to-booking commitment, not as an invisible technical timeout.

---

## Stop Conditions

Stop and clarify before implementation if:
- quotes are being treated as permanently valid by default
- expired quotes are being confirmed without explicit requoting or revalidation
- client-side countdowns are being treated as the only source of truth
- quote expiry is being implemented as a new booking lifecycle state
