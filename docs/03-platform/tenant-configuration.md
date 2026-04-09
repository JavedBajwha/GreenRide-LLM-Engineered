# Tenant Configuration

## 1. Purpose

Tenant configuration defines how a single shared GreenRide platform can behave differently for each taxi company without creating separate codebases.

Each tenant may have different:

- branding
- booking rules
- service offerings
- pricing behaviour
- payment options
- notification settings
- operational workflows
- enabled modules

The purpose of tenant configuration is to allow controlled flexibility while keeping the product maintainable, consistent, and scalable.

---

## 2. Why Tenant Configuration Matters

GreenRide is a multi-tenant SaaS platform.  
That means one platform serves many independent businesses.

Those businesses will not all operate in the same way.

For example:

- one tenant may focus on airport transfers
- another may focus on local minicab journeys
- one may accept cash and card
- another may be card-only
- one may allow guest booking
- another may require customer accounts
- one may offer executive chauffeur vehicles
- another may only offer standard fleet categories

Without tenant configuration, GreenRide would either become too rigid for real businesses or too fragmented to manage.

Tenant configuration solves this by defining where tenants are allowed to customise behaviour within platform-controlled boundaries.

---

## 3. Core Principles

### 3.1 Configuration, Not Forking

Tenant differences should be handled through configuration wherever possible, not through separate code branches.

### 3.2 Shared Product Baseline

All tenants use the same GreenRide product foundation, even if features and behaviour vary.

### 3.3 Controlled Flexibility

Tenants should be flexible within safe limits defined by the platform.

### 3.4 Clear Ownership

Platform-level settings and tenant-level settings must not be mixed up.

### 3.5 Predictable Behaviour

Configuration should produce predictable outcomes.  
A tenant should understand what a setting changes and what it does not change.

---

## 4. Scope of Tenant Configuration

Tenant configuration affects how a tenant’s GreenRide environment behaves.

This includes areas such as:

- customer booking experience
- branding and presentation
- available services
- pricing and fare rules
- payment methods
- account behaviour
- notifications
- dispatch and operational preferences
- feature enablement
- policy and business rules

It does not mean unlimited customisation of the entire platform.

---

## 5. Configuration Categories

## 5.1 Business Identity Configuration

This category defines how the tenant is represented.

Examples:

- tenant name
- legal business name
- display name
- support email
- support phone
- website domain
- invoice business details
- VAT or tax display details where needed

This information is used across customer-facing and operational areas.

---

## 5.2 Branding Configuration

Branding configuration defines the visual identity of the tenant.

Examples:

- logo
- favicon
- primary brand colour
- secondary colour
- accent colour
- email header branding
- invoice branding
- customer portal branding

Branding should be configurable, but within a shared design system so the platform remains consistent.

---

## 5.3 Booking Configuration

Booking configuration defines what kinds of bookings the tenant supports and how the booking flow behaves.

Examples:

- guest booking enabled or disabled
- account booking enabled
- one-way trips enabled
- return trips enabled
- multi-stop trips enabled
- hourly hire enabled
- airport transfer mode enabled
- minimum booking notice
- maximum advance booking window
- same-day booking rules
- mandatory fields in booking form
- optional extras shown during booking

This category has major impact on the customer app.

---

## 5.4 Service Configuration

This category defines what service types the tenant offers.

Examples:

- airport transfer services
- local transfer services
- executive travel
- chauffeur service
- school run services
- corporate transport
- accessible transport requests
- meet and greet availability
- child seat availability
- luggage handling options

Not every tenant will use every service mode.

If the `School Run` add-on is commercially enabled, school transport may appear
here as a supported service family, but add-on enablement alone does not define
School Run authority, recurring workflow, or billing truth.

---

## 5.5 Vehicle and Fleet Configuration

This category defines how the tenant presents and uses vehicle options.

Examples:

- available vehicle categories
- vehicle labels shown to customers
- capacity rules
- luggage display rules
- executive categories enabled
- wheelchair-accessible category enabled
- category ordering in quote results

The product may share category logic, but tenant availability remains configurable.

---

## 5.6 Pricing Configuration

Pricing configuration determines how quotes and fares are calculated or presented for a tenant.

The canonical product-side configuration boundary for this category now lives in:
- `docs/01-product/price-structure-configuration.md`

Examples:

- fixed route pricing
- zone pricing
- calculated fare mode
- hourly pricing
- minimum fare
- peak time surcharges
- night surcharges
- weekend pricing
- bank holiday pricing
- airport pickup surcharges
- waiting time rules
- extra stop pricing
- child seat surcharge
- promo code support
- corporate rate support

The pricing engine may be shared, but tenant rules remain tenant-specific.

---

## 5.7 Payment Configuration

This category determines how the tenant accepts and processes payment.

Examples:

- card payments enabled
- cash enabled
- corporate account billing enabled
- invoice generation enabled
- online prepayment required or optional
- payment provider linkage
- cancellation fee rules
- refund policy support

This category has strong implications for the booking and post-booking flow.

---

## 5.8 Notification Configuration

This category defines how the tenant communicates with users.

Examples:

- booking confirmation emails enabled
- SMS enabled
- WhatsApp notifications enabled
- reminder timing
- dispatch alerts
- review request messages
- corporate notification rules
- cancellation messaging

Notification behaviour may vary by tenant, but the platform should still use shared communication infrastructure.

---

## 5.9 Dispatch and Operations Configuration

This category defines how the tenant wants to operate day to day.

Examples:

- manual dispatch only
- auto-dispatch enabled
- hybrid dispatch
- preferred driver assignment strategy
- service zone restrictions
- booking priority rules
- VIP workflow handling
- shift-related operational rules

This category affects dispatch and driver operations significantly.

---

## 5.10 Account and Customer Policy Configuration

This category controls customer access and account behaviour.

Examples:

- guest checkout allowed
- account registration required or optional
- saved addresses enabled
- loyalty programme enabled
- referral programme enabled
- customer self-cancellation allowed
- cancellation window rules

---

## 5.11 Feature Enablement Configuration

The platform may support features that are not enabled for every tenant.

Examples:

- corporate portal enabled
- hotel concierge workflow enabled
- voucher system enabled
- driver earnings screen enabled
- advanced reporting enabled
- advanced audit logging enabled
- premium dispatch automation enabled
- School Run add-on enabled
- Parcel / Courier / Logistics add-on enabled

This allows plan-based and capability-based product control.

Add-on enablement exposes only the documented module scope. It does not by
itself define workflow truth, proof rules, or role authority inside an add-on.

---

## 5.12 Add-On Specific Configuration

This category covers optional modules that need deeper tenant-specific behavior
once they are commercially enabled.

Examples:

- School Run authority mode
- School Run roster linkage or approved-contact rules
- School Run special transport-note defaults
- Parcel / Courier / Logistics service or handling levels
- parcel-class and handling restrictions
- operational defaults that apply only inside the approved add-on scope

Rules:

- add-on-specific configuration exists only inside a commercially enabled
  module
- add-on-specific configuration must not replace RBAC
- add-on-specific configuration must not silently invent workflow truth that
  belongs in dedicated add-on contracts
- platform-defined security or proof boundaries remain authoritative even when
  tenant-level add-on settings are allowed

---

## 6. Platform vs Tenant Ownership

This distinction is critical.

### Platform-owned examples

- core application structure
- security model
- multi-tenant data isolation
- core data model patterns
- design system rules
- shared API behaviour

### Tenant-configurable examples

- branding
- enabled service types
- booking rules within supported limits
- pricing rules within supported limits
- notification preferences
- dispatch preferences

The platform should never allow tenant configuration to break core system integrity.

---

## 7. Safe Configuration Boundaries

Tenant configuration must be powerful, but not dangerous.

That means tenants should not be able to:

- bypass security rules
- break platform role boundaries
- create unsupported pricing logic without platform support
- alter core booking lifecycle definitions arbitrarily
- remove required audit behaviour
- override platform-wide compliance requirements

Configuration should adjust behaviour, not undermine the platform.

---

## 8. Operational Use of Tenant Configuration

Tenant configuration is not just a setup concern.  
It is a runtime concern.

It may influence:

- which booking fields are shown
- which quote types are available
- whether a feature is visible in UI
- which notifications are sent
- how dispatch decisions behave
- which payment paths appear
- what support and branding the customer sees

This means configuration must be:

- easy to retrieve
- clearly structured
- safe to apply dynamically where appropriate

---

## 9. Configuration UX Considerations

Tenants need a clear and safe way to manage their settings.

That means admin configuration UI should aim for:

- grouped settings by category
- strong defaults
- validation
- preview or explanation where helpful
- protection against destructive misconfiguration
- clear distinction between editable vs locked platform settings

Not every configuration item needs to be exposed to all tenant roles.

This connects strongly with [[rbac]].

---

## 10. Related Docs

Tenant configuration connects to:

- [[multi-tenancy]]
- [[tenant-onboarding]]
- [[pricing-engine]]
- [[dispatch-system]]
- [[payments-and-invoicing]]
- [[notifications-and-integrations]]
- [[rbac]]
- [[design-system]]

---

## 11. Summary

Tenant configuration is one of the most important capabilities in GreenRide.

It allows:

- shared platform operation
- tenant-specific behaviour
- product scalability without code forking
- safer multi-tenant flexibility

A well-structured tenant configuration model helps GreenRide remain:

- scalable
- maintainable
- operationally flexible
- commercially adaptable

This document defines the product-level concept.  
Detailed configuration schema, UI structure, and technical implementation can expand later.
