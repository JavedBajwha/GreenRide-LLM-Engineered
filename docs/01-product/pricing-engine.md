# Pricing Engine

## Purpose

Define the canonical pricing and fare-behavior model for GreenRide.

This document exists so AI and future implementation work do not invent:
- inconsistent pricing-model selection
- unclear precedence between fixed routes, rules, surcharges, and fallback defaults
- unsafe repricing behavior
- ad hoc manual price override rules
- ambiguous pricing provenance in quote results

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe pricing contract for the customer-booking domain.

---

## Scope

This document covers:
- pricing responsibilities
- pricing model set
- pricing flow and rule precedence baseline
- pricing-source meaning
- repricing baseline
- manual override boundary
- tenant-scoped currency and configuration direction

---

## Out of Scope

This document does not define:
- final payment-provider behavior
- tax/VAT/legal invoicing treatment
- dispatch-time driver compensation logic
- geocoding/maps provider mechanics
- final zone/geofence contract

Those belong to later payments, operations, maps, and finance contracts.

---

## Related Documents

- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`
- `docs/01-product/price-structure-configuration.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/06-implementation/search-and-quote-canonical-spec.md`
- `docs/06-implementation/approvals/decision-011-remaining-slice-gaps.md`
- `docs/04-architecture/data-model.md`
- `backend/prisma/schema.prisma`

---

## Canonical Rules

1. Pricing must be tenant-scoped.
2. Pricing calculation belongs to the pricing service, not the booking service or controller.
3. Pricing model selection must be explicit before final price calculation proceeds.
4. Pricing must preserve a clear provenance through `pricingSource`.
5. Repricing must be controlled and must not silently invalidate a previously understood price.
6. Manual fare override, if allowed later, must be explicit, restricted, and auditable.
7. Each quote calculation must resolve to one authoritative core pricing path before extras, surcharges, discounts, minimum-fare enforcement, and rounding are applied.

---

## Pricing Responsibilities

The Pricing Engine is responsible for:
- pricing-model selection
- base fare calculation
- distance and time pricing
- vehicle-category pricing rules
- route-based pricing overrides where applicable
- extras and add-ons
- surcharges
- discounts
- minimum fare enforcement
- final rounding
- pricing provenance

Rules:
- booking service orchestrates pricing requests
- pricing service owns price calculation
- pricing behavior must remain consistent across quote, booking, and later operational review where the same price source is referenced

---

## Pricing Models

Approved pricing models from the schema/data-model direction:
- `fixed_route`
- `distance_based`
- `time_based`
- `combined`
- `hourly`

Trip type and pricing model are related but not identical.

For example:
- `hourly` trip type strongly suggests `hourly` pricing behavior
- `one_way` may still resolve to fixed-route or non-fixed pricing depending on tenant rules

---

## Model-Selection Baseline

Pricing must begin by selecting the applicable pricing path.

Current baseline direction:
1. determine whether the request matches an approved fixed-route pricing path
2. if not fixed-route, determine whether an explicit zone/area pricing rule applies
3. if no zone-pricing rule applies, use the applicable non-fixed tenant pricing model
4. if a tenant pricing rule is missing, use the approved pricing-rule fallback behavior already documented for the search-and-quote slice

This document intentionally keeps exact fixed-route-vs-zone-vs-distance precedence at baseline level.
The important rule now is:
- pricing model selection must not be left implicit or re-invented independently by each layer

Additional guardrails:
- route-path selection decides whether the request enters fixed-route pricing, explicit zone pricing, or generic non-fixed pricing
- a requested `vehicleCategory` may narrow eligible priced categories, but it does not independently select a different pricing path
- saved locations do not influence pricing-path selection by themselves
- custom routes affect pricing-path selection only where the approved pricing configuration explicitly references them
- unresolved overlap between fixed-route, zone-pricing, and generic-path configuration must be solved by explicit configuration and validation, not by runtime guesswork

---

## Category-Aware Pricing Rule Baseline

Approved search-and-quote direction already states:
- `PricingRule` lookup may be category-specific
- if not found, the tenant catch-all rule may be used
- if still not found, hardcoded platform defaults may be used for that slice

Current approved lookup order for category-aware quote pricing:
1. tenant + specific `vehicleCategory`
2. tenant + catch-all rule where `vehicleCategory` is null
3. hardcoded platform defaults

This is currently the canonical pricing-rule fallback order for the search-and-quote path.

---

## Pricing Flow Baseline

Approved pricing flow baseline:
1. determine pricing model/path
2. resolve applicable tenant/category pricing rule where relevant
3. apply base fare
4. apply distance and/or time pricing where relevant
5. apply vehicle-category pricing effect where relevant
6. apply route-based logic where relevant
7. apply extras/add-ons
8. apply surcharges
9. apply discounts
10. enforce minimum fare
11. round final result
12. record pricing provenance

This is the canonical baseline sequence until a later explicit pricing-precedence amendment changes it.

---

## Pricing Rule Precedence Baseline

The final detailed precedence contract still needs later tightening, but the current baseline is:

1. selected pricing model/path controls the broad calculation approach
2. tenant/category rule selection happens before fallback defaults
3. fixed-route pricing takes precedence where an approved fixed route applies
4. explicit zone/area pricing may take precedence over generic non-fixed pricing where configured
5. extras, surcharges, discounts, and minimum fare are applied after core model pricing
6. pricing provenance must reflect whether a tenant pricing rule or fallback defaults were used

Important current limitation:
- this document does **not** yet fully settle zone pricing, custom route precedence, or all repricing edge cases

That remains later work, but the engine must still follow one explicit order rather than improvising.

Minimum commitment-safe reading of that order:
- fixed-route pricing applies only where an approved fixed-route or explicitly pricing-aware custom-route definition matches the request
- zone pricing applies only where no approved fixed-route path applies and an explicit zone-pricing rule is configured for the request context
- generic non-fixed pricing applies only where neither fixed-route nor explicit zone pricing applies
- saved locations, named places, and requested vehicle-category narrowing must not be treated as hidden pricing overrides

### Core Pricing Path Exclusivity

For one quote or confirmation-ready pricing attempt, the engine must resolve one authoritative core path:
- fixed-route pricing
- explicit zone/area pricing
- generic non-fixed pricing

Canonical direction:
- these core paths are mutually exclusive for a single calculation attempt unless a later contract explicitly approves a mixed-path model
- extras, surcharges, discounts, minimum-fare enforcement, and rounding may layer on top of the selected core path
- a zone match must not be treated as an extra hidden surcharge layer on top of fixed-route pricing by default
- a requested vehicle category or convenience location signal must not quietly switch the already-selected core pricing path

This keeps pricing behavior explainable and prevents one request from being priced through multiple competing path authorities at once.

---

## `pricingSource` Baseline

Approved by:
- `docs/06-implementation/approvals/decision-011-remaining-slice-gaps.md`

Current canonical `pricingSource` values for the search-and-quote slice:
- `pricing_rule`
- `fallback`

Meanings:
- `pricing_rule`: a tenant pricing rule was found and applied
- `fallback`: no tenant pricing rule was found, so hardcoded platform defaults were used

Rules:
- no other `pricingSource` values are allowed for the current quote slice without a later explicit decision
- booking/quote layers must persist this value when quote persistence is in scope

---

## Minimum Fare, Surcharges, and Discounts

Current baseline direction:
- minimum fare enforcement is part of pricing ownership
- surcharges are applied after core model calculation
- discounts are applied before the final minimum-fare enforcement/rounding outcome is finalized, following the approved pricing flow sequence above

Examples of conceptually approved surcharge types from existing docs/config references:
- peak time
- night
- weekend
- airport
- extras such as child seat or meet and greet

The exact surcharge catalog and precedence still need later detailed documentation.

---

## Repricing Baseline

Repricing is allowed only under controlled conditions.

Current baseline direction:
- a quoted price should be preserved through confirmation unless a documented repricing trigger applies
- quote expiry is one explicit boundary that may require requoting or revalidation before confirmation
- changes after confirmation may trigger repricing depending on tenant rules
- repricing must not happen silently without a documented reason

Examples of likely repricing triggers that need later detailed contracts:
- route change
- pickup/dropoff change
- trip-type change
- extras change
- timing change where tenant policy allows repricing

This document does not finalize every trigger yet, but it does establish that repricing is controlled, not arbitrary.

Important boundary:
- quote-expiry warning behaviour does not by itself preserve pricing validity
- if the platform can no longer rely on the earlier quote basis safely, fresh quote calculation or explicit revalidation is required before confirmation

---

## Manual Fare Override Boundary

Manual fare override is not the default pricing path.

Baseline rule:
- manual override must not be assumed into normal quote or booking flow casually
- if later allowed, it must define:
  - who may override
  - when override is allowed
  - whether it replaces or annotates computed price
  - auditability requirements

Until that later contract exists:
- computed pricing remains the canonical baseline

---

## Currency Baseline

Current schema direction includes:
- booking currency field with default `GBP`

Current baseline pricing rule:
- pricing must remain tenant-scoped and currency-aware
- exact multi-currency behavior still belongs to later payment/currency documentation

This document therefore sets only the guardrail:
- AI must not invent casual multi-currency conversion logic inside pricing without a later explicit contract

---

## Configuration Boundary

Tenant pricing configuration may conceptually include:
- base fare
- per-distance rate
- per-time rate
- category-aware rules
- fixed-route pricing
- hourly pricing
- minimum fare
- surcharge settings

This document confirms those areas belong under tenant pricing configuration, but does not yet finalize the full tenant-admin configuration UX or schema detail.

The canonical configuration boundary now lives in:
- `docs/01-product/price-structure-configuration.md`

---

## Invariants

1. Pricing must be deterministic for the same approved inputs and rule set.
2. Booking service must not contain pricing formula logic.
3. Pricing-source provenance must be retained where the quote model supports it.
4. Quote-stage fallback pricing does not erase the distinction between tenant rules and platform defaults.
5. Repricing and override behavior must remain controlled and explainable.

---

## Failure and Exception Direction

- if no supported pricing path can be selected, pricing should fail safely rather than inventing a path
- if no tenant pricing rule is found in the approved search-and-quote slice, platform fallback defaults may be used and must be marked as `fallback`
- if pricing data is insufficient for a later domain path not yet explicitly documented, stop and clarify rather than improvising
- pricing failure must not silently produce a misleading confirmed booking price

---

## Important Rule

Pricing consistency matters more than squeezing every possible variation into the first contract.

If a later domain needs more pricing sophistication, it must extend the documented precedence model explicitly.

---

## Stop Conditions

Stop and clarify before implementation if:
- booking service is expected to own pricing logic
- fixed-route, hourly, and dynamic pricing are being mixed with no explicit precedence
- new `pricingSource` values are invented without a superseding decision
- repricing is happening silently with no documented trigger
- manual fare override is introduced with no permission/audit contract
- multi-currency conversion is being invented inside pricing with no explicit later decision
