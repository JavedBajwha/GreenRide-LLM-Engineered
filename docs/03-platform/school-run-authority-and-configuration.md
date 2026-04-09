# School Run Authority And Configuration

## Purpose

Define the canonical first-pass authority and tenant-configuration boundary for
the optional `School Run` add-on.

This document exists so AI and future implementation work do not invent:
- a new school-specific global role with no approved RBAC basis
- module enablement as a substitute for workflow authority
- uncontrolled mixing of guardian-led and tenant-led actions
- School Run admin flows outside the approved app surfaces

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical School Run authority and configuration contract.

---

## Scope

This document covers:
- approved School Run authority modes
- the relationship between module enablement and authority
- tenant configuration direction for School Run
- role and surface ownership boundaries for School Run actions
- approved first-pass responsibility split between customer-side and
  tenant-side School Run actions

---

## Out of Scope

This document does not define:
- a final school-portal product surface
- dedicated school-admin account types
- detailed safeguarding/compliance workflow
- final invite/account model for every approved contact
- exact screen-by-screen configuration UI

Those belong to later RBAC, onboarding, or School Run refinement work.

---

## Roles Affected

- `super_admin`
- `tenant_owner`
- `tenant_admin`
- `dispatcher`
- `office_staff`
- `driver`
- `customer`

---

## App Surfaces Affected

- public or customer surface where guardian-led actions are allowed
- tenant operations surface for tenant-side School Run management
- driver surface for assigned journey visibility only
- platform control surface for commercial/module governance only

---

## Related Documents

- `docs/03-platform/rbac.md`
- `docs/03-platform/module-commercial-model.md`
- `docs/03-platform/superadmin-commercial-controls.md`
- `docs/03-platform/tenant-configuration.md`
- `docs/01-product/school-run-workflow.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`

---

## Canonical Rules

1. School Run authority must be explicit and tenant-configured.
2. School Run module enablement does not by itself grant workflow authority.
3. No new school-specific global role is approved by this contract.
4. School-admin-led School Run behavior must use existing tenant-scoped roles
   unless a later RBAC decision explicitly approves additional role types.
5. Guardian-led School Run behavior must stay inside customer/public
   authority boundaries and must not create tenant-ops authority.
6. Driver authority remains trip-execution only; drivers do not gain School Run
   administrative control by default.
7. Platform governance and commercial visibility remain distinct from tenant
   operational execution.

---

## Approved Authority Modes

The tenant may configure one of these approved School Run authority modes:

| Mode | Meaning |
| --- | --- |
| parent_or_guardian_led | guardian/customer-side initiation and management is the primary path |
| school_or_admin_led | tenant-side operational/admin actors are the primary path |
| both | both approved paths may coexist under explicit tenant rules |

These modes define workflow direction.
They do not create new RBAC roles by themselves.

---

## Role Baseline

### `super_admin`

Approved scope:
- package/module enablement visibility
- commercial entitlement control
- platform-governance visibility where separately allowed

Not approved as default scope:
- day-to-day tenant School Run execution
- routine roster or guardian-contact management inside a tenant's operations

### `tenant_owner` and `tenant_admin`

Approved baseline scope:
- choose School Run authority mode for the tenant
- manage tenant-level School Run configuration
- govern who may use School Run functionality inside tenant operations
- manage or approve roster/contact policy where later exposed

### `office_staff` and `dispatcher`

Approved baseline scope:
- participate in tenant-side School Run workflows where tenant policy allows
- manage or act on School Run journeys inside the tenant operations surface

Guardrail:
- these roles do not gain platform-level commercial authority
- these roles do not automatically gain every School Run configuration right

### `customer`

Approved baseline scope:
- act only in guardian-led or shared-authority modes
- remain limited to their own approved School Run context
- not become a tenant-operations actor

### `driver`

Approved baseline scope:
- see and execute assigned journey context only
- view approved rider/contact notes as later documentation allows

Not approved:
- School Run configuration
- roster administration
- guardian/contact governance

---

## Surface Ownership Direction

No new top-level School Run app surface is approved by this contract.

Current approved surface direction:
- guardian-led School Run interactions may live inside the public/customer
  route families where separately approved
- school/admin-led School Run interactions belong inside the tenant operations
  surface
- driver execution remains inside the driver surface
- commercial/module governance remains inside platform control

This keeps School Run aligned with the existing surface model.

---

## Tenant Configuration Direction

The first approved School Run tenant-configuration baseline includes:
- authority mode
- allowance or prohibition of one-off school journeys
- operational note and approved-contact policy direction
- roster-linked behavior where later exposed
- billing/pricing basis direction through the dedicated pricing contract

Rules:
- tenant configuration may shape School Run behavior only inside the
  commercially enabled add-on scope
- tenant configuration must not bypass RBAC
- tenant configuration must not invent new route families or surfaces
- tenant configuration must not silently widen who may see or act on School Run
  data

---

## Approved Contact Boundary

Approved contacts are School Run workflow context, not a new product-wide role
family.

Rules:
- approved-contact status does not by itself create a normal authenticated app
  role
- approved contacts must not be treated as tenant-ops users by assumption
- any later login, portal, or self-service design for school contacts requires
  explicit new documentation

This prevents School Run contacts from becoming a hidden new auth model.

---

## Data Model Links

This authority/configuration contract assumes later implementation may need
records for:
- School Run authority mode at tenant scope
- journey or arrangement linkage to approved School Run context
- approved-contact and guardian relationship context
- role-aware configuration or visibility flags inside tenant scope

Exact schema and storage design remain open.

---

## Security / Tenancy Rules

1. School Run actions remain tenant-scoped.
2. Module enablement, route gating, and RBAC must all agree before privileged
   School Run actions are allowed.
3. Customer/guardian access must remain limited to the actor's approved School
   Run context only.
4. Tenant-side School Run admin actions must stay inside `/ops/*`, not drift
   into public/customer or driver surfaces.
5. If a tenant wants a new actor type beyond the current RBAC model, docs must
   reopen before implementation.

---

## Failure / Exception Rules

- if the tenant has no approved School Run authority mode, School Run admin or
  entry flows must not guess one
- if a user has the right route family but not the right School Run authority,
  access must fail through normal RBAC and module-gating rules
- if tenant policy allows both guardian-led and tenant-led School Run work,
  each action still needs an authoritative owner rather than ambiguous shared
  ownership
- if future requirements demand dedicated school accounts or external school
  portals, this contract must be extended before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- a new school-specific global role is being invented
- School Run authority is being inferred from module enablement alone
- guardian/customer authority is being allowed to cross into tenant admin scope
- tenant-side School Run execution is being proposed outside the tenant
  operations surface
