# Payment Method and Currency Strategy

## Purpose

Define the canonical payment-method and currency baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- unsupported payment methods as if they were already approved
- inconsistent tenant-by-tenant money handling
- casual live currency conversion inside pricing or booking flows
- invoice/account-billing behavior that conflicts with booking and payment-path rules

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical payment-method and currency contract for the Phase 7 service domain.

---

## Scope

This document covers:
- first approved payment-method set
- tenant-configurable payment-method availability
- tenant-level operating-currency baseline
- relationship between booking currency, pricing currency, and payment currency
- boundary against ad hoc multi-currency conversion

---

## Out of Scope

This document does not define:
- final payment provider selection
- settlement-provider behavior
- FX provider behavior
- tax/VAT/legal accounting treatment
- full invoice issuance and collection workflow
- payment-method UX details by screen

Those belong to later provider, finance, invoicing, and frontend contracts.

---

## Related Documents

- `docs/03-services/payments-and-invoicing.md`
- `docs/01-product/pricing-engine.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/tenant-onboarding.md`
- `docs/03-services/analytics-and-reporting.md`

---

## Canonical Rules

1. The first approved GreenRide payment methods are `card`, `cash`, and `account_billing`.
2. Payment-method availability is tenant-configurable within approved platform options.
3. Each tenant has one primary operating currency.
4. Pricing and booking remain in the tenant operating currency by default.
5. Live multi-currency conversion must not be invented inside pricing or booking flows without a later explicit contract.
6. Account billing/invoice is a real approved payment path, not an undocumented exception.

---

## Approved Payment Method Baseline

The first approved payment methods are:
- `card`
- `cash`
- `account_billing`

Canonical direction:
- these are the supported business-level payment methods for the baseline product model
- future methods require explicit documentation approval
- AI and future implementation work must not assume wallets, bank transfer, Apple Pay, Google Pay, or other methods are already approved just because they are common elsewhere

---

## Tenant Configuration Baseline

Payment methods are tenant-configurable within platform-approved options.

Examples of valid tenant patterns:
- `card + cash`
- `card only`
- `card + account_billing`
- `cash + account_billing`

Important guardrails:
- availability must be explicit in tenant configuration
- unsupported methods must not appear in booking or ops flows
- account billing must not be inferred automatically from customer type alone

---

## Account Billing Baseline

`account_billing` is the approved baseline for invoice-style or later-billed payment flows.

Canonical direction:
- account billing is a first-class payment method, not a workaround
- account billing may satisfy a booking path where later invoice/account-billing eligibility is the approved confirmation requirement
- invoice/account-billing eligibility must still be validated explicitly

This keeps the method baseline aligned with the payments and invoicing contract.

---

## Currency Baseline

Each tenant should operate with one primary currency for baseline product behavior.

Current canonical direction:
- tenant pricing is defined in the tenant operating currency
- booking currency defaults to the tenant operating currency
- payment currency should remain aligned with the booking currency by default
- invoice and reporting totals should remain aligned with the same operating currency unless a later explicit finance contract extends this

This is the safest first money model for GreenRide.

---

## No Casual Multi-Currency Conversion

GreenRide must not invent live multi-currency conversion inside the booking or pricing flow as a baseline behavior.

Approved guardrail:
- no implicit FX conversion in quote calculation
- no casual currency switching at checkout by assumption
- no mixed-currency reporting logic by assumption

If later multi-currency support is required, it must define:
- source currency
- display currency
- payment currency
- invoice currency
- conversion timing
- rate source
- audit/reporting behavior

Until then, one tenant, one primary operating currency is the rule.

---

## Relationship to Pricing

The pricing engine already documents:
- tenant-scoped pricing
- currency awareness
- no casual multi-currency invention

This document tightens that into a direct operational rule:
- pricing should calculate in the tenant operating currency
- booking summaries should present the same currency by default
- later payment handling should not silently change the money basis

---

## Relationship to Booking Paths

Payment methods and payment paths are related but not identical.

Examples:
- a booking path may require successful `card` payment before confirmation
- a booking path may allow `cash` with no immediate payment before confirmation
- a booking path may require validated `account_billing` eligibility before confirmation

Rules:
- the booking path defines the confirmation requirement
- the payment method defines how the monetary obligation is handled
- the method must be valid for that tenant and booking path

---

## Restriction Direction

This baseline allows tenant-level method configuration first.

Later documentation may tighten:
- booking-type restrictions
- service-type restrictions
- customer/account restrictions
- zone-based restrictions

But current safe rule is:
- do not invent those restrictions unless explicitly configured and documented later

---

## Reporting and Invoice Alignment

Current reporting direction already assumes:
- cash totals
- card totals
- invoice totals

This document confirms those as valid first financial reporting buckets because the baseline payment methods are:
- `cash`
- `card`
- `account_billing`

---

## Important Rule

GreenRide should use a tenant-configurable method set on top of a single-currency tenant baseline, not an open-ended payment catalog with undocumented FX behavior.

---

## Stop Conditions

Stop and clarify before implementation if:
- a new payment method is being treated as approved without documentation
- booking or pricing is inventing live currency conversion by assumption
- account billing is being inferred without explicit tenant/path approval
- mixed-currency booking, payment, reporting, or invoicing behavior is being added without a dedicated later contract
