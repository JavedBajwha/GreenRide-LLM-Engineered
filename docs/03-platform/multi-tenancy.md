# Multi-Tenancy

## Purpose

Define the canonical multi-tenancy model for GreenRide.

This document exists so AI and future implementation work do not invent:
- weak tenant-boundary rules
- inconsistent tenant-context resolution
- cross-tenant data access shortcuts
- tenant-scoping assumptions that are not explicitly approved

---

## Status

Draft, approved as the current documentation direction.

This document is the first implementation-safe multi-tenancy contract for GreenRide.

---

## Scope

This document covers:
- tenant definition
- tenant-scoped ownership
- tenant-context resolution
- enforcement layers
- query and API scoping rules
- failure behavior when tenant scope is invalid

---

## Out of Scope

This document does not define:
- pricing behavior by tenant
- package/module commercial logic
- tenant onboarding workflow detail
- tenant-specific UI design

Those belong in pricing, commercial, onboarding, and frontend contracts.

---

## Related Documents

- `docs/03-platform/rbac.md`
- `docs/03-platform/security-model.md`
- `docs/03-platform/auth-and-session.md`
- `docs/04-architecture/data-model.md`

---

## Canonical Rules

1. GreenRide is a single-platform multi-tenant SaaS product.
2. Tenant isolation is a hard system boundary, not a convenience rule.
3. Every tenant-scoped request must resolve tenant context before data access.
4. Every tenant-scoped data read and write must enforce tenant filtering.
5. RBAC and tenant isolation are separate controls and both must pass.
6. A valid authenticated session does not bypass tenant scope.
7. Cross-tenant data leakage is a system failure.
8. Reporting, exports, support visibility, and operational visibility must not become informal shortcuts around tenant isolation.

---

## Tenant Definition

A tenant represents one taxi or private-hire business using GreenRide.

Tenants share the platform product core, but remain isolated in:
- data
- configuration
- branding
- operational activity
- reporting scope
- user access

---

## Tenant-Owned Areas

The following areas are tenant-scoped unless explicitly documented otherwise:
- bookings
- quotes
- drivers
- vehicles
- pricing rules
- customers
- tenant configuration
- reporting data
- operational logs where tenant context applies

Platform-wide governance data remains outside tenant scope.

Platform visibility into tenant-owned areas must remain explicitly authorised and must not redefine those areas as platform-owned by default.

---

## Data Strategy

Approved baseline multi-tenancy strategy:
- single database
- shared tables
- strict tenant isolation via `tenantId` on tenant-scoped models

This aligns with:
- `docs/04-architecture/data-model.md`

Rules:
- every tenant-scoped model must carry `tenantId`
- the `Tenant` model itself is the platform-level tenant record and is the root of tenant identity
- tenant-scoped indexes should support tenant-filtered access patterns

---

## Tenant Context Resolution

Every tenant-scoped request must resolve tenant context explicitly.

### Authenticated Tenant Users

For authenticated tenant users:
- tenant context comes from the authenticated identity/session context
- request access must stay within that tenant scope

### Customer Access

For authenticated customers:
- tenant context must still resolve explicitly
- customer scope remains limited to the tenant owning the booking/account context

### Public Guest Access

For approved public booking/quote flows:
- tenant context must still be resolved before business processing continues
- public access must never imply platform-wide or multi-tenant discovery

### Platform Scope

`super_admin` is platform-scoped.
Platform governance may view across tenants only where explicitly documented.

`platform_ops` is documented as a distinct operational role model and must not be assumed into code silently.

### Support and Visibility Rule

Platform support or governance visibility does not remove the need to resolve scope explicitly.

Rules:
- tenant-scoped actors always resolve exactly one tenant context
- platform-governance views may inspect multiple tenants only where the contract explicitly allows cross-tenant visibility
- platform-ops visibility into tenant impact does not become unrestricted tenant-data browsing
- support convenience must not become a hidden bypass for tenant filtering

---

## Enforcement Layers

Tenant isolation must exist in multiple layers, not only one.

### 1. Auth / Identity Layer

- authenticated tenant users carry tenant context
- auth/session refresh must not bypass tenant restrictions

### 2. Route / Controller Layer

- controllers/guards must reject access when tenant scope is absent or mismatched
- public flows must explicitly validate tenant context before processing

### 3. Service Layer

- services receive validated tenant-scoped input
- services must not assume tenant access from UI route alone

### 4. Data Access Layer

- tenant-scoped queries must include tenant filtering
- writes must never attach records to the wrong tenant

This is the most important rule:
- tenant isolation must survive even if one higher layer makes a mistake

### 5. Reporting / Export Layer

- report generation must preserve the authorised tenant or platform scope used to request it
- export generation must check scope again at generation time rather than assuming a previously visible page is still authorised
- scheduled reporting must fail cleanly if actor, tenant, or module scope is no longer valid
- widget summaries must not broaden the actor's underlying reporting scope
- saved report filters, schedule definitions, and export jobs must stay bound to the authorised tenant or platform scope they were created for
- cross-surface deep-links and support flows must not smuggle a broader reporting scope into tenant-bound report actions

---

## Request and Query Rules

### Required Baseline

- every tenant-scoped request must resolve tenant context before data access
- every tenant-scoped query must include tenant filtering
- every tenant-scoped mutation must validate ownership boundary before writing

### Public Endpoint Rule

Public endpoints are exceptions to authentication, not exceptions to tenant isolation.

That means:
- a public quote endpoint may skip login
- it must not skip tenant validation

### Super Admin Rule

`super_admin` may have cross-tenant governance visibility where explicitly documented.

This does not mean:
- tenant-scoped roles can cross tenant boundaries
- platform views can be reused casually for tenant-facing features
- platform reporting can be treated as a tenant-reporting shortcut
- support visibility can ignore tenant filtering discipline

### Export and Background-Job Rule

Tenant isolation still applies when work moves out of the immediate request path.

That includes:
- export generation
- scheduled reports
- queued reporting jobs
- async notification jobs carrying tenant-scoped content

Background processing must preserve the same explicit tenant or platform scope that would have been required in the direct request path.
Saved filters, queued exports, and scheduled reports do not create a new wider scope merely because the request becomes asynchronous later.

---

## RBAC Relationship

RBAC answers:
- who is allowed to do something

Multi-tenancy answers:
- which tenant’s data they may do it against

Both controls must pass independently.

Examples:
- a dispatcher may be allowed to view bookings, but only for their own tenant
- a tenant admin may manage pricing, but only for their own tenant
- a customer may view a booking, but only their own booking inside the correct tenant scope

---

## Failure / Exception Rules

- if tenant context cannot be resolved, the request must fail
- if tenant context is mismatched, the request must fail
- if a tenant is suspended or otherwise blocked, tenant-scoped access may be restricted according to auth/security rules
- if a public flow has no valid tenant context, it must not proceed into booking or pricing logic
- if data ownership is ambiguous, stop and clarify rather than inferring tenant scope

---

## Security / Privacy Rules

1. No tenant may read another tenant’s operational or customer data.
2. No tenant branding, reporting, or configuration should bleed into another tenant’s surface.
3. Logs, reports, and exports that include tenant-aware context must still preserve tenant boundaries.
4. Cross-tenant visibility is reserved for documented platform-level authority only.
5. Cross-tenant summaries for platform governance must not silently expose tenant-detail records beyond the approved platform scope.

---

## Important Rule

Tenant isolation is a critical system boundary.

Breaking this is a system failure.

---

## Stop Conditions

Stop and clarify before implementation if:
- a tenant-scoped request can proceed without explicit tenant resolution
- a service or query is proposed without tenant filtering for tenant-owned data
- a public endpoint is treated as exempt from tenant validation
- platform-wide access is being granted to a tenant-scoped role
