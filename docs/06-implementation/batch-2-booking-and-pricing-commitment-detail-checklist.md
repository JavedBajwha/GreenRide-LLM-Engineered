# Batch 2 Booking and Pricing Commitment Detail Checklist

## Purpose

Provide a focused execution checklist for the second closure batch in GreenRide's endgame documentation pass.

This checklist exists to reduce the remaining commitment-sensitive ambiguity across:
- booking state commitment
- pricing precedence
- quote validity and requoting
- agreement and payment-consent capture
- booking confirmation boundaries
- amendment and cancellation consequences
- tenant-controlled pricing structure detail

---

## Scope

This batch covers the remaining `partial` follow-through in:

- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/pricing-engine.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/booking-forms-and-agreements.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/booking-amendments-and-cancellations.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/01-product/price-structure-configuration.md`
- `docs/01-product/custom-routes-and-saved-locations.md`
- linked payment and reporting docs only where commitment or pricing boundaries require it

This batch does not redesign the pricing model.
It is focused on making the existing booking and pricing commitment model more exact and internally aligned.

---

## Ordered Checklist

### 1. Booking Lifecycle Alignment

- review remaining ambiguity around commitment, exception, and post-confirmation state boundaries
- verify lifecycle wording stays consistent with confirmation, amendment, and cancellation docs

Current pass progress:
- lifecycle wording now states more clearly that expired quotes and missing required agreement/financial prerequisites block movement into `confirmed`

### 2. Pricing and Precedence Tightening

- review pricing precedence wording across pricing, route selection, zone pricing, and configuration docs
- tighten areas where pricing-source or override behavior could still drift

Current pass progress:
- pricing docs now state more clearly that route-path selection controls the pricing path, while requested vehicle-category narrowing, saved locations, and named places do not become hidden pricing overrides
- custom routes are now tied more explicitly to pricing only where approved configuration or pricing contracts reference them

### 3. Quote Validity and Revalidation Tightening

- review quote-expiry and requote/revalidation language
- verify expired-quote behavior is consistent with booking confirmation and pricing docs

Current pass progress:
- booking confirmation and lifecycle docs now state more clearly that expired-quote recovery must return through explicit requote or revalidation
- quote-expiry docs now state more clearly that exact timing constants remain partial, that warning behaviour is supportive only, and that confirmation is allowed only on still-valid or successfully revalidated quote context

### 4. Agreements and Payment-Consent Tightening

- review agreement, consent, and booking-path distinctions
- verify payment consent, booking consent, and billing acknowledgement stay separate where required

Current pass progress:
- form and agreement docs now tie preserved form state and consent capture more clearly to current quote validity and confirmation readiness
- confirmation and form docs now distinguish more clearly between guest, authenticated account, and operator-assisted entry contexts while keeping the same underlying confirmation boundary unless a later explicit policy says otherwise

### 5. Booking Confirmation Boundary Tightening

- review quote-to-booking commitment language
- verify booking confirmation, pricing commitment, and payment-path rules stay aligned

Current pass progress:
- confirmation flow now states more clearly that payment is path-dependent rather than a universal lifecycle step
- confirmation docs now state more clearly that guest, account, and operator-assisted bookings may differ in entry context and authority surface, but do not by themselves imply different confirmation prerequisites

### 6. Amendment / Cancellation / Repricing Tightening

- review amendment/cancellation timing and repricing linkage
- verify later fee/refund-sensitive edges stay explicit rather than implied

Current pass progress:
- amendment docs now state more clearly that revalidation can remove confirmation readiness without inventing a new lifecycle state
- late cancellation now points more explicitly to payment/finance outcomes without letting refund language rewrite booking lifecycle truth
- amendment docs now distinguish more clearly between validation-only changes, revalidation, explicit requote/repricing, and explicit reconfirmation-readiness outcomes
- cancellation docs now distinguish more clearly between cancellation lifecycle closure and separate finance follow-through, while payment docs now state more clearly that amendment repricing does not automatically imply refund behavior
- amendment docs now distinguish more clearly between repricing itself and later financial follow-through such as additional-charge, credit/refund, or invoice-adjustment review
- amendment and confirmation docs now state more clearly that where renewed confirmation readiness is required, the amended booking must satisfy the then-current booking-path requirements rather than relying on pre-amendment satisfaction by assumption

### 7. Pricing Configuration and Location Asset Tightening

- review zone/area pricing, price structure configuration, and custom routes/saved locations together
- verify convenience location data does not become hidden pricing logic

Current pass progress:
- configuration and reusable-location docs now state more clearly that saved locations remain convenience data and cannot be promoted into implicit route-pricing or zone-pricing authority

### 8. Cross-Document Alignment Check

- verify no stale contradictions remain across Batch 2 docs
- update tracker, gap register, and continuity notes with honest outcomes

Current review judgment:
- Batch 2 scope is now strong enough to proceed to a final completion check
- the remaining open items are detail-level partials, not major internal contradictions across the booking/pricing commitment model

Completion judgment:
- Batch 2 can now be treated as substantially complete
- no blocking contradiction remains across confirmation boundary, pricing precedence baseline, quote-expiry recovery, or amendment/cancellation/repricing linkage
- the remaining open items are still partial, but they are detail-level follow-through rather than closure blockers for this batch

---

## Finish Criteria

Batch 2 can be treated as substantially closed only when:

- the booking commitment docs are internally aligned
- pricing precedence and quote revalidation are clearer
- consent and confirmation boundaries are more exact
- amendment/cancellation/repricing edges are linked cleanly
- remaining uncertainty is explicitly deferred rather than left implicit

---

## Stop Conditions

Stop and clarify before claiming this batch is closed if:

- booking confirmation and pricing commitment still contradict each other
- expired quotes can still be interpreted as confirmation-ready without revalidation
- consent and payment-path rules are still blended together ambiguously
- custom routes, saved locations, or zone pricing still blur convenience data with pricing authority

Current review result:
- these stop conditions are not currently triggered at a blocking level

---

## Related Documents

- `docs/06-implementation/final-partial-closure-plan.md`
- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`
