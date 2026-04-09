# Superadmin Commercial Controls

## Purpose

Define what `super_admin` can control in GreenRide’s commercial and package-management layer.

This document exists so AI and future implementation work do not invent:
- how superadmin creates or edits packages
- how per-tenant module enablement works
- how quoted add-ons are handled
- how commercial changes affect tenant access

---

## Status

Draft, approved as the current documentation direction.

This document defines the first-pass in-product commercial authority model for `super_admin`.

---

## Scope

This document covers:
- package creation and editing
- module inclusion/exclusion at package and tenant level
- fixed-price and quoted add-on control
- per-tenant commercial assignment
- tenant commercial request handling
- billing-provider boundary
- commercial gating relationship to tenant access
- commercial change edge-case behavior

---

## Out of Scope

This document does not define:
- raw payment processor integration
- accounting backend implementation
- customer-facing checkout UI for subscriptions
- platform-ops deployment or patching actions

Those belong to payment, billing, and platform-ops contracts.

---

## Roles Affected

- super_admin
- tenant_owner as a read-only or request stakeholder where later allowed
- tenant_admin as a read-only or request stakeholder where later allowed

---

## App Surfaces Affected

- platform control surface

---

## Related Documents

- `docs/03-platform/module-commercial-model.md`
- `docs/03-platform/tenant-onboarding.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/03-platform/rbac.md`
- `docs/03-services/analytics-and-reporting.md`

---

## Canonical Rules

1. `super_admin` is the highest in-product authority for package composition, module enablement, and commercial assignment.
2. `super_admin` may control pricing and quoted add-ons in the product model, but this does not make the product UI the raw billing processor.
3. Commercial assignment must be auditable.
4. Commercial changes must affect tenant access through documented module gating, not undocumented hidden behavior.
5. Commercial control does not override platform security, RBAC, tenant isolation, maintenance states, or emergency restrictions.
6. Tenant request visibility may exist, but tenant-scoped roles do not self-approve commercial entitlement changes by default.
7. The product UI may record commercial state, pricing references, and approval notes, but it is not the raw settlement or billing-provider console.

---

## Superadmin Commercial Responsibilities

`super_admin` should be able to:
- create and edit package definitions
- decide which optional modules belong in a package
- set or update fixed prices in the platform’s commercial model
- define quoted add-ons for individual tenants
- assign or change a tenant’s package
- enable or disable optional modules per tenant
- view tenant commercial state
- record reasons or notes for commercial changes where needed

`super_admin` should not be treated as:
- a raw infrastructure operator
- a direct code deployer
- an unrestricted payment-gateway console

`super_admin` is the in-product commercial authority.
That does not make `super_admin`:
- the external billing processor
- the accounting ledger of record
- the actor who bypasses operational restrictions or security controls

---

## Package Controls

### Package Creation

Package creation should support:
- package name
- package status
- included optional modules
- baseline commercial notes
- fixed-price entries where applicable

### Package Editing

Package editing should support:
- adding or removing optional modules
- changing fixed-price values
- changing package status
- recording effective commercial notes

The core baseline is always included and is not removed from a package definition.

### Package Status Expectations

Package status should distinguish at least:
- draft or internal-only package definitions
- active package definitions that may be assigned
- retired package definitions that remain visible historically but are not newly assigned

Retiring a package should not silently remove entitlements from tenants already using it.

---

## Tenant Commercial Assignment Controls

For each tenant, `super_admin` should be able to manage:
- assigned package
- active optional modules
- quoted add-ons
- commercial status
- onboarding/commercial readiness relationship

### Per-Tenant Actions

Approved first action set:
- assign package
- replace package
- add optional module
- remove optional module
- add quoted add-on
- edit quoted add-on price/terms note
- disable an optional module
- view commercial history

### Tenant Commercial Request Baseline

Tenant-scoped roles may later be allowed to request commercial changes, but not to self-approve them.

Approved first request pattern:
- tenant owner or tenant admin may submit a request for review where later enabled
- `super_admin` reviews and approves, rejects, or records an alternate commercial decision
- approved requests become auditable commercial changes only after explicit superadmin action

If no request workflow is enabled:
- tenant roles only see current commercial state
- commercial changes remain a platform-controlled action

### Optional Add-On Family Boundary

`School Run` and `Parcel / Courier / Logistics` are approved optional module
families in GreenRide's commercial model.

`super_admin` may:
- include these add-ons in packages
- approve tenant-specific enablement
- record quoted or custom commercial notes where later needed

Rules:
- commercial enablement exposes only the approved module scope and any related
  gated routes, navigation entries, settings, or reporting areas
- commercial enablement does not by itself grant blanket authority for
  guardian, roster, parcel-proof, or other workflow-sensitive actions
- detailed workflow configuration and execution authority inside these add-ons
  must still follow RBAC, tenant configuration, and the dedicated add-on
  contracts

---

## Fixed-Price and Quoted Add-On Controls

### Fixed-Price Controls

Use for standard commercial modules with catalogue-like pricing.

Examples:
- advanced reporting
- invoicing

### Quoted Add-On Controls

Use when a tenant-specific price needs to be agreed and recorded.

Examples:
- WhatsApp notification pack
- custom integration
- bespoke commercial arrangement

Quoted add-ons should record at least:
- tenant
- module/add-on name
- quoted amount
- note or rationale
- effective status

### Billing-Provider Boundary

The product UI may store:
- internal commercial prices
- quoted amounts
- entitlement notes
- effective dates or commercial status markers

The product UI should not be assumed to own:
- external card capture
- external invoice settlement
- tax calculation engines
- subscription payment retries
- billing-provider customer portal behavior

If external billing exists later, the external provider may support settlement, but entitlement changes inside GreenRide must still remain explicit and auditable.

---

## Tenant Access Impact Rules

Commercial changes must flow into tenant access rules clearly.

### When a Module Is Enabled

The tenant may gain:
- new visible routes
- new navigation entries
- new actions
- new reporting/export rights if the module governs them

### When a Module Is Disabled

The tenant must lose:
- gated routes
- gated UI actions
- gated exports or other premium actions

Rules:
- show controlled unavailable states rather than broken pages
- do not expose disabled features through direct route access
- commercial enablement still requires RBAC to allow the user action

### Commercial Change Edge Cases

If a commercial change affects a tenant that already has active use of the module:
- the change must remain explicit about whether it is immediate, future-effective, or pending operational follow-through
- historical records created while the module was enabled must remain intact unless a later retention policy says otherwise
- existing reporting, audit, and billing records must not disappear just because future entitlement changes
- active maintenance, emergency restriction, or suspension states still override normal commercial access

If a module is removed commercially:
- future access should gate cleanly
- direct route access should block cleanly
- existing business records should remain visible only where later reporting/retention rules allow

If a package is replaced:
- the resulting enabled-module set must be explicit
- gained and lost entitlements must be auditable
- tenant onboarding or go-live checks should reflect the new approved scope

---

## Onboarding Relationship

Superadmin commercial controls should support onboarding by allowing:
- package selection during tenant setup
- optional module selection during setup
- quoted add-on assignment before go-live
- later commercial adjustments after onboarding

Onboarding and commercial assignment should be linked, but not treated as the same concept.

---

## Reporting and Visibility Relationship

Superadmin should have commercial visibility over:
- which tenants use which packages
- which optional modules are enabled
- which tenants have quoted add-ons
- which tenants have advanced reporting enabled

Platform reporting should remain separate from tenant reporting even when superadmin can see commercial distribution.

### Audit and Reason Expectations

Commercial changes should record at least:
- actor
- tenant or package scope
- action type
- changed entitlement or price reference
- reason or note
- timestamp
- effective state

---

## Audit Requirements

The following actions must be audit-visible:
- package creation
- package edit
- package assignment to tenant
- package replacement
- optional module enablement
- optional module disablement
- quoted add-on creation
- quoted add-on change

---

## Security / Tenancy Rules

1. Only `super_admin` may perform package and per-tenant commercial assignment in the current baseline model.
2. Tenant-scoped roles may not self-enable commercial modules.
3. Commercial access does not bypass emergency controls, maintenance states, or kill switches.
4. Commercial control remains platform-scoped; tenant roles only see what their tenant is allowed to use.

---

## Failure / Exception Rules

- if a package change removes an optional module, gated UI and routes must respond cleanly
- if a quoted add-on is pending agreement, it must not be treated as active automatically
- if a module is commercially active but operationally killed or under maintenance, the operational restriction wins
- if a tenant package is changed during onboarding, the tenant should not be left in an undefined partial commercial state

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant roles need direct self-service purchasing or checkout
- package changes must trigger external billing-provider automation not yet documented
- quantity-based billing becomes required in the first version
- non-superadmin roles are expected to approve or assign commercial modules directly
