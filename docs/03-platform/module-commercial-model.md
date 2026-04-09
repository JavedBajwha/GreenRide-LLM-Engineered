# Module Taxonomy and Commercial Model

## Purpose

Define how GreenRide is packaged and sold as a multi-tenant SaaS product.

This document exists so AI and future implementation work do not invent:
- what counts as a core module
- what counts as a paid module
- what counts as a capability toggle
- how packages are assembled
- how module enablement affects tenant availability

---

## Status

Draft, approved as the current documentation direction.

This document centralises the module-based commercial model agreed during planning discussions.

---

## Scope

This document covers:
- module taxonomy
- module family boundaries
- core baseline modules
- optional commercial modules
- capability toggles inside modules
- package composition rules
- fixed-price, quoted, and future quantity-based commercial treatment
- module enablement relationship to tenant onboarding and UI gating

---

## Out of Scope

This document does not define:
- payment gateway implementation
- external billing provider integration
- invoice rendering details
- detailed superadmin UI workflows
- exact frontend upsell screen design

Those belong in payments, invoicing, and superadmin-control documents.

---

## Roles Affected

- super_admin
- tenant_owner
- tenant_admin
- platform ops as a visibility stakeholder only

---

## App Surfaces Affected

- public marketing and subscription entry surface
- tenant operations surface
- platform control surface

---

## Related Documents

- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/tenant-onboarding.md`
- `docs/03-platform/rbac.md`
- `docs/03-services/analytics-and-reporting.md`
- `docs/05-frontend/role-app-surface-map.md`

---

## Canonical Rules

1. GreenRide must use a module-based SaaS commercial model.
2. A small platform baseline must always be included for every tenant.
3. Not every feature becomes a separately sold module.
4. Capability toggles inside a module are different from commercial modules.
5. Package composition, module enablement, and pricing are related but not identical concepts.
6. Module gating never replaces RBAC, tenant isolation, or security controls.
7. Commercial flexibility must not make the product incoherent by removing backbone platform areas.

---

## Commercial Entry Model

GreenRide is intended to support a public marketing/subscription path where a taxi company can subscribe to the platform.

The commercial flow should support:
- public marketing visibility of the product
- a core subscription baseline
- optional add-on modules
- custom quoted add-ons where standard catalogue pricing is not sufficient
- per-tenant enablement after commercial approval

This means the platform must separate:
- what is marketed
- what is priced
- what is enabled

---

## Taxonomy

### Package

A package is a commercial bundle offered to a tenant.

It includes:
- the always-included core baseline
- zero or more optional modules
- applicable pricing rules

### Module

A module is a product capability area that may be part of the core baseline or sold as an optional commercial add-on.

### Capability Toggle

A capability toggle is a feature or behavior switch inside an enabled module.

It is not automatically a separately priced product.

### Tenant Configuration

Tenant configuration defines how an enabled module behaves for a specific tenant.

It does not decide whether the module exists commercially.

### Commercial Family Boundary

GreenRide should distinguish between:
- backbone platform modules that keep the product coherent
- optional commercial modules that expand capability
- internal capability toggles inside an enabled module

This boundary matters because:
- backbone areas must not be treated like optional upsells
- optional modules must gate cleanly across onboarding, route visibility, and reporting
- capability toggles should not silently become new sold products without an explicit commercial decision

---

## Core Baseline Modules

These modules form the minimum coherent GreenRide product and should remain included for every tenant.

| Core Module | Why It Stays In Core |
| --- | --- |
| Tenant identity and branding baseline | Every tenant needs identity, branding, and business profile basics |
| Auth and RBAC | Platform access control cannot be optional |
| Booking | GreenRide is not a taxi SaaS without booking capability |
| Dispatch core | Core taxi operations require dispatch basics |
| Driver operations core | Driver job intake and trip-state basics are fundamental |
| Pricing core | Booking and dispatch depend on fare logic |
| Tenant configuration | Tenant-specific behavior needs a platform-controlled config layer |
| Basic notifications | Core booking and operational communication needs a baseline |
| Security, audit, and tenancy baseline | Safety and isolation are non-optional |
| Core reporting baseline | Minimal operational and revenue summaries are always included |

### Baseline Backbone Rule

Core baseline modules are backbone product areas.

They may support tenant configuration and capability variation, but they are not treated as:
- removable upsell targets
- tenant-by-tenant commercial experiments
- optional access areas that disappear entirely from the product contract

---

## Capability Toggles Inside Core Modules

Some important features should remain inside existing modules instead of becoming separately sold commercial modules.

### Booking Module Capability Toggles

Examples:
- guest booking
- account booking
- return trips
- multi-stop trips
- hourly booking
- airport transfer mode
- booking extras
- booking form field requirements

### Dispatch and Driver Capability Toggles

Examples:
- manual dispatch
- auto-dispatch enablement when supported
- driver availability rules
- dispatch exception handling options
- driver navigation-support features

These should be configured as module capabilities or tenant settings, not treated as isolated commercial products by default.

---

## Optional Commercial Modules

These are good candidates for paid add-ons, package variation, or custom quote treatment.

| Optional Module | Typical Commercial Use |
| --- | --- |
| Advanced reporting and analytics | Paid reporting/analytics upgrade |
| Invoicing | Add-on for tenants needing invoice workflows |
| Corporate billing | Add-on for account-based commercial customers |
| WhatsApp notifications | Optional communications add-on |
| Advanced notification pack | Custom or premium communications controls |
| External integrations | Add-on or quoted integration scope |
| Embeddable booking widget / website integration | Optional external booking surface |
| WordPress delivery layer if supported later | Optional compatibility add-on, not baseline |
| Advanced dashboard customization | Optional premium UX/customization capability |
| AI-assisted branding | Optional premium branding assistance |
| Advanced dispatch automation | Optional premium automation layer |
| Advanced driver management | Optional premium driver/compliance/analytics layer |
| School Run | Optional tenant add-on for recurring or school-admin-managed transport workflows |
| Parcel / Courier / Logistics | Optional tenant add-on for logistics-job and proof-of-delivery workflows |

This list is a commercial baseline, not a claim that every module is already fully documented elsewhere.

### Future Wave Add-On Boundary

`School Run` and `Parcel / Courier / Logistics` are now approved optional
module families in the GreenRide commercial model.

Rules:
- enabling either add-on does not redefine the base booking, dispatch, driver,
  or passenger-trip truth models
- detailed workflow, pricing/billing, tracking, and proof rules for these
  add-ons must live in dedicated contracts
- module enablement for these add-ons must still remain subordinate to RBAC,
  tenant isolation, and documented tenant-configuration boundaries

### Module Family Matrix

| Family | Treatment | Current Examples |
| --- | --- | --- |
| Backbone baseline | always included for every tenant | auth and RBAC, booking, dispatch core, driver operations core, pricing core, tenant configuration, security/audit/tenancy baseline, core reporting baseline |
| Optional standard module | approved add-on with standard commercial treatment | advanced reporting and analytics, invoicing, corporate billing, embeddable booking widget |
| Optional quoted or premium module | approved add-on that often needs tenant-specific approval or scope review | external integrations, advanced notification pack, advanced dispatch automation, advanced driver management |
| Capability toggle inside a module | not a separate commercial module by default | guest booking, hourly booking, manual dispatch, auto-dispatch enablement, booking extras |

If a feature is treated as a separately sold item, the product should first decide whether it is:
- truly a module
- a premium package inclusion
- or just a capability toggle inside an already enabled module

Some approved future-wave add-ons may sit in the optional-module family before
their full workflow detail is documented. `School Run` and
`Parcel / Courier / Logistics` are the current approved examples.

---

## Commercial Pricing Types

GreenRide should support more than one pricing treatment.

### 1. Fixed Price

Use when:
- the module is standardised
- the commercial offer is stable

Examples:
- invoicing
- advanced reporting

### 2. Quoted Price

Use when:
- the module needs tenant-specific commercial approval
- setup or support scope varies

Examples:
- custom integrations
- premium notification packs
- bespoke enablement bundles

### 3. Quantity-Based Price

Future-supported direction, not yet finalised as the first implementation baseline.

Use when pricing depends on a measurable tenant quantity.

Examples:
- additional drivers
- additional staff seats
- high-volume communication usage

### Quantity-Based Charging Guardrails

Quantity-based charging is a later commercial extension, not a first-version assumption.

Rules:
- quantity-based charging must not be silently invented for backbone baseline access
- a quantity rule must define the counted unit explicitly before it affects pricing
- quantity-based pricing should not become an undocumented second RBAC system
- quantity-based pricing should not remove existing operational data or active users silently without an explicit enforcement contract
- usage-based or seat-based commercial limits need their own later enforcement and grace-period rules before implementation

---

## Package Composition Rules

1. Every package includes the core baseline.
2. Optional commercial modules may be added on top of the baseline.
3. A package may include both fixed-price and quoted modules.
4. A tenant may use a standard package or a custom composed package approved by superadmin.
5. Commercial approval does not bypass technical, RBAC, or tenant-boundary controls.

### Package Composition Boundary

Approved first package composition model:
- every tenant receives the backbone baseline
- optional standard modules may be attached through a package
- quoted or premium modules may be attached per tenant after explicit approval
- package composition decides commercial entitlement, but not final user-level permission

This means a package should not be treated as:
- the same thing as a role
- the same thing as tenant configuration
- the same thing as an active operational state

---

## Module Enablement and Gating Rules

### Enablement

A module must be explicitly enabled for a tenant before tenant users can use it.

### Gating

Module gating affects:
- route availability
- navigation visibility
- UI actions
- API actions where applicable

### Guardrails

- module gating must not remove required core baseline areas
- module gating must still respect RBAC
- module gating must still respect tenant isolation
- module gating must not silently expose disabled features through direct links or APIs
- module gating must not be treated as the workflow or authority model for
  `School Run` or `Parcel / Courier / Logistics`

---

## Onboarding Relationship

Tenant onboarding should support:
- choosing or assigning a commercial package
- enabling approved optional modules
- applying tenant-default capability settings inside enabled modules
- preparing a tenant to go live with the commercially approved scope

Onboarding must not assume every tenant receives every optional module.

### Onboarding and Commercial Sequencing

Commercial assignment should shape onboarding in this order:

1. create tenant and assign commercial baseline
2. attach approved optional modules or quoted items
3. apply tenant configuration only inside the commercially enabled scope
4. expose go-live checks against that approved scope

Rules:
- onboarding should not configure a module that has not been commercially enabled
- onboarding should not imply a tenant owns an optional module just because a setup screen exists
- a tenant that is still in setup may have a partially assigned package, but the approved commercial scope must remain explicit

---

## Data Model Links

This commercial model assumes the platform needs records for at least:
- packages
- modules
- tenant-module enablement
- quoted commercial items
- pricing assignments
- tenant subscription/commercial status

Exact schema ownership belongs to platform and billing-related implementation docs.

At minimum, the commercial model needs to distinguish records for:
- the global module catalogue
- package composition
- tenant commercial assignment
- tenant module enablement state
- quoted or exception-priced commercial items
- later quantity-based commercial rules if they are ever approved

---

## Security / Tenancy Rules

1. A commercially enabled module is still subject to RBAC and tenant scope rules.
2. `super_admin` controls commercial package/module assignment inside the product model.
3. Tenant-scoped roles do not assign platform commercial packages arbitrarily unless a later contract explicitly allows limited request workflows.
4. Module enablement changes that affect tenant access must be auditable.

---

## Failure / Exception Rules

- if a module is commercially disabled, affected routes and actions must be blocked cleanly
- if a tenant loses access to an optional module, the UI must show gated/unavailable states rather than broken pages
- if pricing for a quoted module changes, commercial approval and auditability must remain explicit
- if a module is under maintenance or emergency kill-switch restriction, that operational restriction overrides normal commercial enablement

---

## Stop Conditions

Stop and clarify before implementation if:
- a backbone module is proposed as fully removable
- every small feature starts being treated as a separate paid module
- quantity-based charging becomes a required first-version billing model
- tenant-scoped roles are allowed to self-assign commercial modules without a documented approval flow
