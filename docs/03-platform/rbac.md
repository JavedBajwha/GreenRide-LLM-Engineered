# Role-Based Access Control (RBAC)

## Purpose

Defines who can do what inside GreenRide, and at which scope.

Every action in the system must be checked against the user's role and tenant boundary
before it is allowed to proceed.

This document also links roles to:
- app surfaces
- top-level route families
- high-level ownership boundaries

---

## Core Principles

1. **Tenant first** — a user can only act within their own tenant, unless they are a `super_admin`
2. **Least privilege** — users get only the access their role requires
3. **Role determines capability** — what you can do is defined by your role, not by your identity
4. **No role escalation** — a user cannot grant themselves or others a higher role than their own

---

## Roles

Roles are defined in the `UserRole` enum in `backend/prisma/schema.prisma`.

| Role | Scope | Description |
| --- | --- | --- |
| super_admin | Platform | Platform-wide governance and approved support visibility across tenants. GreenRide platform team only. |
| tenant_owner | Tenant | Full access within their own tenant. Can manage all tenant settings. |
| tenant_admin | Tenant | Admin access within tenant. Cannot delete the tenant or change owner. |
| dispatcher | Tenant | Manages bookings and driver dispatch. No access to billing or settings. |
| office_staff | Tenant | Can view and create bookings. Cannot dispatch or change configuration. |
| driver | Tenant | Can view their own assigned jobs. Cannot access other bookings. |
| customer | Tenant | Can create and view their own bookings only. |

### Operational Role Note

Current implementation-facing schema references still centre on the `UserRole` enum above.

Documentation planning also uses `platform_ops` as a distinct operational access role for the separate Platform Ops surface.

That role is currently a documentation-level authority model and must not be silently implemented in code without explicit schema and auth alignment.

---

## Role-To-Surface Linkage

RBAC must align with the approved application surfaces.

| Role | Surface | Route Family | Ownership Boundary |
| --- | --- | --- | --- |
| guest customer | Public / Customer Booking Surface | `/` | public booking entry only where explicitly allowed |
| customer | Customer Surface | `/customer/*` | own customer account and bookings only |
| driver | Driver Surface | `/driver/*` | own driver workflow only |
| office_staff | Tenant Operations Surface | `/ops/*` | tenant booking/support scope only |
| dispatcher | Tenant Operations Surface | `/ops/*` | tenant dispatch scope only |
| tenant_admin | Tenant Operations Surface | `/ops/*` | tenant administration within tenant boundary |
| tenant_owner | Tenant Operations Surface | `/ops/*` | highest tenant-level authority within tenant boundary |
| super_admin | Platform Control Surface | `/platform/*` | platform governance across tenants |
| platform_ops | Platform Ops Surface | `/platform-ops/*` | operational safety, incident, maintenance, and recovery scope |

### Surface Rules

- customer and driver roles must never use tenant or platform control surfaces
- tenant-scoped roles must never use platform-governance or platform-ops execution surfaces
- `super_admin` is platform-governance scope, not default platform-ops execution scope
- `platform_ops` is operational-execution scope, not normal tenant/business governance scope
- a valid authenticated session alone is never enough to cross a route-family boundary

---

## Scope Rules

### Platform scope (`super_admin` only)

- create, suspend, and manage tenants
- view any tenant's data for support purposes
- manage platform-level configuration
- cannot be created by any tenant-level role

### Platform operations scope (`platform_ops`)

- operational incident visibility
- maintenance and emergency-control execution
- release visibility
- rollback/recovery workflow execution
- does not imply raw deployment or infrastructure-console authority inside the normal product UI

This scope remains distinct from normal `super_admin` governance scope.
It remains a documented authority model until schema/auth alignment is explicitly approved.

### Tenant scope (all other roles)

- all actions are scoped to `tenantId`
- a user from Tenant A cannot read, write, or act on Tenant B data under any circumstance
- the `tenantId` on every request must match the authenticated user's `tenantId`

### Public scope

- public booking entry is limited to explicitly documented guest/public routes only
- public access does not create tenant-admin, driver, or platform access

---

## Permission Matrix

| Action | super_admin | tenant_owner | tenant_admin | dispatcher | office_staff | driver | customer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create tenant | yes | no | no | no | no | no | no |
| Manage tenant config | yes | yes | yes | no | no | no | no |
| Invite users | yes | yes | yes | no | no | no | no |
| View all bookings | platform support visibility only where explicitly approved, not tenant-role default | yes | yes | yes | yes | no | no |
| Create booking | yes | yes | yes | yes | yes | no | yes |
| Dispatch driver | no default tenant-dispatch execution | yes | yes | yes | no | no | no |
| View own jobs | yes | yes | yes | yes | yes | yes | no |
| View own bookings | yes | yes | yes | yes | yes | no | yes |
| Manage pricing rules | yes | yes | yes | no | no | no | no |
| View reports | platform reporting only by default, not tenant-role default | yes | yes | yes | no | no | no |
| Manage fleet | no default tenant-fleet execution | yes | yes | no | no | no | no |

Important reading rule:
- this matrix expresses default authority intent, not a claim that `super_admin` should operate as a tenant-scoped day-to-day role
- where `super_admin` has support or governance visibility, that must still follow documented platform-scope and support-visibility rules rather than normal tenant-ops execution
- `platform_ops` operational execution remains documented elsewhere as a distinct authority model and is intentionally not added to this schema-facing matrix until explicit schema/auth alignment exists

---

## Route Family Ownership Matrix

This matrix links RBAC to the approved top-level route families.

| Route Family | Primary Roles | Notes |
| --- | --- | --- |
| `/` | guest customer, customer where flow allows | public booking and discovery only |
| `/customer/*` | customer | authenticated customer area |
| `/driver/*` | driver | driver-only operational routes |
| `/ops/*` | tenant_owner, tenant_admin, dispatcher, office_staff | tenant-scoped operational/admin routes |
| `/platform/*` | super_admin | platform governance routes |
| `/platform-ops/*` | platform_ops | platform operational safety routes |

RBAC must be enforced at both:
- route-family boundary
- in-surface page/action level

### Wrong-Surface Access Rule

When an authenticated user reaches the wrong protected route family:
- the request must still fail through RBAC/protected-route enforcement
- the system must not treat "already logged in" as sufficient authority
- module gating must not be used as a substitute for route-family access control

---

## Public Endpoints

Some endpoints are deliberately public (no auth required):

| Endpoint | Reason |
| --- | --- |
| POST /api/booking/quote | Guest customers need quotes before creating an account |
| POST /api/auth/login | Auth entry endpoint must be reachable before a session exists |
| POST /api/auth/refresh | Session renewal endpoint must be reachable before a new access token exists |

All other endpoints require a valid JWT and role check.

Public route and endpoint access must remain explicitly documented.
Do not infer public access from convenience or UI similarity.

---

## Token Structure

JWT tokens must carry:

- `sub` — user ID
- `tenantId` — the tenant this user belongs to
- `role` — the user's role (from `UserRole` enum)
- `exp` — expiry

The auth middleware must:

1. validate the token signature
2. confirm the token is not expired
3. attach `{ userId, tenantId, role }` to the request context
4. reject with HTTP 401 if token is missing or invalid
5. reject with HTTP 403 if the role does not permit the action

If platform-ops access is implemented later, the auth/session model and schema must be updated explicitly rather than assumed from this RBAC document alone.

---

## Tenant Isolation Enforcement

RBAC is not a substitute for tenant isolation.

Even if a user has a high role, every Prisma query must still include `tenantId`
as a filter. Role checks determine capability. Tenant filters determine data scope.
Both must be applied independently.

---

## Rules for Implementation

- auth middleware must run before any route that is not explicitly public
- role checks must happen inside the controller or a dedicated guard, not inside services
- services must never receive a request object — they receive validated, typed input only
- `super_admin` bypasses tenant filtering, all other roles do not
- do not invent new roles without a documented decision
- route-family ownership must stay aligned with `docs/05-frontend/role-app-surface-map.md`
- page-level access inside `/ops/*`, `/platform/*`, and `/platform-ops/*` still requires narrower checks than route-family access alone

---

## Control Ownership Boundaries

High-level ownership split:

| Control Area | Primary Role |
| --- | --- |
| tenant booking and dispatch operations | tenant-scoped roles inside `/ops/*` |
| customer self-service | `customer` |
| driver trip workflow | `driver` |
| platform governance and commercial control | `super_admin` |
| operational incident, maintenance, and rollback execution | `platform_ops` |

This split exists to stop governance, tenant operations, and operational recovery from being treated as one generic admin permission set.

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/multi-tenancy.md`
- `docs/03-platform/auth-and-session.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/auth-redirect-and-protected-routes.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `backend/prisma/schema.prisma` — UserRole enum

---

## Stop Conditions

Stop and clarify before implementation if:
- platform control and platform ops are proposed as the same role by default
- a tenant-scoped role needs platform route access
- a public route starts acting like a protected tenant or platform area
- `platform_ops` is implemented in code without explicit schema and auth alignment
