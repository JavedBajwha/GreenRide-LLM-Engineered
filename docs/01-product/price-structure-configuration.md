# Price Structure Configuration

## Purpose

Define the canonical tenant price-structure configuration baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- pricing configuration as a free-form fare builder with no product guardrails
- inconsistent tenant-admin control over base fares, surcharges, and model selection
- pricing configuration that bypasses the documented pricing-path and precedence contracts
- uncontrolled tenant pricing flexibility that breaks quote consistency

---

## Status

Draft, approved as the current documentation direction.

This document is the canonical price-structure configuration contract for the customer-booking and pricing domain.

---

## Scope

This document covers:
- what tenants are allowed to configure in pricing
- controlled configuration groups
- boundary between configuration and pricing execution
- guardrails for safe pricing flexibility
- pricing-control authority baseline
- pricing-change workflow direction
- pricing audit/change expectations

---

## Out of Scope

This document does not define:
- final tenant-admin UI layout
- exact database schema for every pricing rule object
- every permission boundary by tenant role
- final audit/event model for pricing changes

Those belong to later tenant-config, RBAC, and implementation detail work.

---

## Related Documents

- `docs/01-product/pricing-engine.md`
- `docs/01-product/zone-and-area-pricing.md`
- `docs/01-product/route-selection-and-vehicle-eligibility.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/rbac.md`
- `docs/03-services/audit-logging.md`

---

## Canonical Rules

1. Tenant pricing must be configurable, but only within platform-approved pricing structures.
2. Configuration defines pricing rules; configuration does not replace the pricing engine.
3. Tenants may configure approved pricing components, not invent arbitrary pricing logic.
4. Pricing configuration must stay tenant-scoped.
5. Pricing configuration must remain compatible with the documented pricing-path and precedence rules.
6. Pricing configuration must not leave the engine to guess between competing core pricing paths for the same request context.

---

## Configuration Boundary

GreenRide should treat price-structure configuration as a controlled ruleset, not an unrestricted fare-building tool.

Canonical direction:
- tenants may configure approved pricing components
- the pricing engine executes those approved rules
- configuration must not become a scripting or arbitrary formula system by default

This keeps pricing flexible without making the product impossible to reason about.

---

## Approved Pricing Configuration Groups

The first approved tenant pricing-configuration groups are:

1. pricing path enablement
2. core rate structure
3. category-aware pricing rules
4. route pricing
5. zone/area pricing
6. hourly pricing
7. surcharge rules
8. discount/promo support where approved
9. minimum fare rules
10. extras and add-on pricing

These groups create the baseline configuration map for tenant pricing.

---

## 1. Pricing Path Enablement

Tenants may configure which approved pricing paths are used where supported, such as:
- fixed-route pricing
- zone/area pricing
- calculated fare mode
- hourly pricing

Guardrail:
- enabling a path does not erase the documented pricing precedence order
- enabling multiple approved paths must still preserve one authoritative core pricing path per request context under the documented precedence rules

---

## 2. Core Rate Structure

Tenants may configure approved core rate components such as:
- base fare
- per-distance rate
- per-time rate

These are the main inputs for non-fixed, non-zone pricing paths where applicable.

---

## 3. Category-Aware Pricing Rules

Tenants may configure pricing rules by vehicle category where the pricing model supports it.

Canonical direction:
- category-aware rule selection must still follow the approved lookup order
- category pricing configuration does not replace eligibility rules

---

## 4. Route Pricing

Tenants may configure approved fixed-route pricing where the product supports route-specific fare behavior.

Guardrail:
- route pricing remains a structured pricing path, not a free-text exception list
- saved locations must not be promoted into route-pricing definitions just because they are reusable

---

## 5. Zone and Area Pricing

Tenants may configure approved zone/area pricing where the product supports it.

Guardrail:
- zone pricing must remain aligned with the explicit zone-pricing contract
- operational zones do not become pricing zones automatically
- named places and saved locations do not become priced zones automatically

---

## 6. Hourly Pricing

Tenants may configure hourly pricing where the product supports hourly trip behavior.

Guardrail:
- hourly pricing remains part of the approved model set, not an ad hoc override

---

## 7. Surcharge Rules

Tenants may configure approved surcharge families such as:
- peak time
- night
- weekend
- bank holiday
- airport pickup
- waiting time
- extra stop
- approved extras like child seat

Guardrail:
- surcharge configuration must remain inside approved product categories
- tenants must not invent arbitrary surcharge engines by default

---

## 8. Discount / Promo Support

Where later approved, tenants may configure supported discount or promo behavior.

Guardrail:
- discounts remain subordinate to the main pricing path and minimum-fare rules

---

## 9. Minimum Fare Rules

Tenants may configure minimum fare behavior where supported.

Guardrail:
- minimum fare remains an explicit pricing-engine responsibility even though the threshold is tenant-configured

---

## 10. Extras and Add-On Pricing

Tenants may configure approved extra/add-on pricing where the booking model supports those extras.

Guardrail:
- extra pricing must remain tied to approved extras, not arbitrary free-text charges

---

## Not Allowed by Default

Not supported by default:
- arbitrary formula builders
- custom scripts in pricing configuration
- tenant-defined pricing models outside the approved model set
- hidden pricing overrides with no audit or explicit path
- configuration that bypasses the pricing engine
- configuration that turns saved locations or customer convenience data into implicit pricing authority

This is the most important configuration safety boundary.

---

## Relationship to Tenant Configuration

Tenant configuration is the control surface for approved pricing rules.

Canonical direction:
- tenant configuration may expose the approved pricing groups
- the platform still owns what is configurable and how it is validated
- tenant configuration must not allow destructive or contradictory pricing setup by default

## Pricing-Control Authority Baseline

Approved first control direction:
- `tenant_owner` and `tenant_admin` are the default pricing-configuration roles
- narrower tenant roles may receive view-only or limited operational visibility later where explicitly documented
- pricing configuration is tenant-scoped and must not cross tenant boundaries

## Pricing-Change Workflow Direction

Pricing configuration should behave like a controlled change workflow, not a loose settings page.

Approved baseline:
1. edit approved pricing inputs
2. validate the resulting configuration against product guardrails
3. save the tenant-scoped change
4. use the updated configuration only for future applicable quote generation

Rules:
- an invalid pricing setup should fail validation before it becomes active
- saved changes should not retroactively rewrite historical booked fares unless a later explicit repricing contract allows it
- active quotes and confirmed bookings should not be silently mutated just because a tenant edited a pricing rule later
- configuration validation should reject unresolved overlap where the same request context could match competing fixed-route, zone-pricing, or generic-path rules without an explicit documented precedence outcome
- configuration validation should reject convenience-location data being used as hidden pricing-path selectors outside the approved route and zone contracts

## Pricing Audit and Change Expectations

Pricing changes should record at least:
- actor
- tenant scope
- changed pricing group
- reason or note where required
- timestamp
- resulting active state

---

## Important Rule

GreenRide should let tenants configure approved pricing structures, not invent pricing logic outside the platform’s documented rule set.

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant pricing config is being treated as a scripting system
- new pricing models are being added with no explicit product contract
- zone, route, and generic pricing are being configured with no link to the documented precedence model
- extras or surcharges are being turned into arbitrary custom charges outside approved product categories
