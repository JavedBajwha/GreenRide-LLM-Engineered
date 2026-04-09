# Role App Surface Map

## Purpose

Define the canonical application surfaces for GreenRide by role family.

This document exists to stop AI agents from:
- putting every role into one generic app shell
- inventing role-to-page mappings
- mixing platform pages with tenant operations pages

---

## Status

Draft, approved as the current routing direction for documentation work.

This document defines the high-level application surface model.
Detailed per-screen and per-route refinement continues in later documentation phases.

---

## Scope

This document covers:
- the top-level application surfaces
- which roles belong to which surfaces
- the purpose of each surface
- the high-level page families expected in each surface
- default landing and redirect intent by role family
- boundary rules between surfaces

---

## Out of Scope

This document does not define:
- detailed API contracts
- detailed component layouts
- exact screen-level interaction rules
- exact state machine rules

Those belong in domain-specific and frontend-specific documents.

---

## Roles Affected

- `super_admin`
- `tenant_owner`
- `tenant_admin`
- `dispatcher`
- `office_staff`
- `driver`
- `customer`
- guest customer

---

## App Surfaces Affected

| Surface | Base Route | Primary Roles | Purpose |
| --- | --- | --- | --- |
| Public / Customer Booking Surface | `/` and `/customer/*` | guest customer, customer | Search, quote, booking, payment, confirmation, tracking, customer account |
| Driver App Surface | `/driver/*` | driver | Job intake, status updates, trip lifecycle, availability, earnings, profile |
| Tenant Operations Surface | `/ops/*` | tenant_owner, tenant_admin, dispatcher, office_staff | Tenant operations, dispatch, booking operations, fleet, pricing, staff tasks |
| Platform Control Surface | `/platform/*` | super_admin | Cross-tenant governance, tenant management, platform-level controls |
| Platform Ops Surface | `/platform-ops/*` | platform_ops | Operational safety, incident response, release visibility, maintenance, rollback, and recovery workflows |

---

## Canonical Role Mapping

| Role | Canonical Surface | Notes |
| --- | --- | --- |
| guest customer | Public / Customer Booking Surface | Public booking and quote actions allowed where explicitly permitted |
| customer | Public / Customer Booking Surface | Account and booking history live in customer area |
| driver | Driver App Surface | Must not use tenant operations or platform control pages |
| office_staff | Tenant Operations Surface | Limited tenant operational access |
| dispatcher | Tenant Operations Surface | Dispatch-focused tenant operational access |
| tenant_admin | Tenant Operations Surface | Tenant admin functions within tenant boundary |
| tenant_owner | Tenant Operations Surface | Highest tenant-level authority within tenant boundary |
| super_admin | Platform Control Surface | Platform-wide authority across tenants |
| platform_ops | Platform Ops Surface | Operational execution authority for incidents, maintenance, and recovery workflows |

### Default Entry / Redirect Intent

Approved first redirect intent after successful login:

| Role | Default Destination |
| --- | --- |
| customer | `/customer` |
| driver | `/driver` |
| office_staff | `/ops` |
| dispatcher | `/ops/dispatch` |
| tenant_admin | `/ops` |
| tenant_owner | `/ops` |
| super_admin | `/platform` |
| platform_ops | `/platform-ops` |

These are default landing expectations, not proof that every route inside the surface is always visible to every role.

They also do not mean:
- every authenticated role can open every protected surface
- `super_admin` and `platform_ops` should share execution authority by default
- one successful login should bypass route-family ownership rules
- redirect recovery or convenience fallback should reuse another surface shell

---

## High-Level Page Families

### 1. Public / Customer Booking Surface

Expected page families:
- public landing / booking entry
- search and quote
- quote results / vehicle selection
- booking details
- payment
- booking confirmation
- trip tracking
- customer login / account access
- customer profile
- booking history
- saved locations

### 2. Driver App Surface

Expected page families:
- driver login / access
- driver home / status
- incoming job offer
- active job
- navigation / route support
- earnings / trip history
- profile / vehicle / documents

### 3. Tenant Operations Surface

Expected page families:
- operations dashboard
- booking queue
- live dispatch dashboard
- live map
- driver panel
- assignment controls
- incident / exception view
- booking management
- pricing and service configuration
- fleet / vehicle management
- tenant staff management
- reporting relevant to tenant operations

### 4. Platform Control Surface

Expected page families:
- platform dashboard
- tenant management
- tenant onboarding / suspension / support actions
- cross-tenant audit / support controls
- platform-level configuration

### 5. Platform Ops Surface

Expected page families:
- health overview
- incidents and alerts
- tenant impact
- release visibility
- maintenance controls
- emergency controls
- rollback / recovery
- ops audit trail

---

## Surface Boundary Rules

Cross-surface redirect and shell guardrail:
- redirects, support jumps, and blocked-route recovery must preserve authoritative surface ownership
- shared shell infrastructure may assist with routing, but it must not blur which surface shell owns the resulting page
- a user denied or gated inside one surface should not land inside another surface shell unless a separate approved route transition exists

### Public / Customer Boundary

- public booking pages may support guest or provisional booking actions where explicitly documented
- authenticated customer account pages must remain under the customer surface, not under tenant or platform surfaces
- customer users must not be redirected into tenant or platform shells for normal booking/account work

### Driver Boundary

- driver pages remain operational and driver-owned
- driver users must not use tenant-ops pages as a substitute driver app
- driver shell and route families must stay separate even when underlying booking/trip data is related

### Tenant Operations Boundary

- tenant roles operate only inside their tenant-scoped surface
- tenant roles must not inherit platform control or platform ops visibility through convenience links or mixed shells
- tenant operations may expose tenant reports, but not platform-global governance or platform-ops recovery workflows

### Platform Control Boundary

- `super_admin` owns platform governance and commercial/admin workflows
- platform control may show support or visibility views into tenant state, but it is not the same surface as platform ops
- platform control should not absorb incident execution, maintenance execution, or rollback execution by default
- platform-control visibility into ops state must not be mistaken for platform-ops execution authority

### Platform Ops Boundary

- `platform_ops` owns operational execution for incidents, maintenance, containment, and recovery
- platform ops may see tenant-impact context, but does not become a tenant-ops shell
- platform ops should remain distinct from business/governance navigation and from normal tenant package/module management
- if `platform_ops` is not yet implemented in schema/auth, docs must still treat it as a distinct future surface rather than silently folding it into `super_admin`

---

## Canonical Rules

1. Do not place every role into one shared generic application shell.
2. Separate major app surfaces by role family.
3. Use RBAC inside each surface where role-specific restrictions still apply.
4. Do not allow driver or customer roles to access tenant operations or platform control areas.
5. Do not allow tenant-level roles to access platform-only controls.
6. Do not merge platform governance and platform-ops execution into one generic surface.
7. Public endpoints and public customer pages must remain explicitly documented rather than implied.
8. Default login redirects should follow the canonical role-to-surface mapping unless a later exception is explicitly documented.
9. Cross-surface support links may exist, but they must not blur authoritative surface ownership.

---

## Related Documents

- `docs/03-platform/rbac.md`
- `docs/03-platform/security-model.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/02-applications/customer-app.md`
- `docs/02-applications/customer-booking-flow-full.md`
- `docs/02-applications/driver-app.md`
- `docs/02-applications/driver-app-full.md`
- `docs/02-applications/admin-dispatch-system.md`

---

## Stop Conditions

Stop and clarify before changing this model if:
- a new role is introduced
- a role needs a new top-level surface
- a tenant role needs platform-level access
- a public page needs authenticated-only behavior
