# Role-Based Access Control (RBAC)

## Purpose

Defines who can do what inside GreenRide, and at which scope.

Every action in the system must be checked against the user's role and tenant boundary
before it is allowed to proceed.

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
| super_admin | Platform | Full access across all tenants. GreenRide platform team only. |
| tenant_owner | Tenant | Full access within their own tenant. Can manage all tenant settings. |
| tenant_admin | Tenant | Admin access within tenant. Cannot delete the tenant or change owner. |
| dispatcher | Tenant | Manages bookings and driver dispatch. No access to billing or settings. |
| office_staff | Tenant | Can view and create bookings. Cannot dispatch or change configuration. |
| driver | Tenant | Can view their own assigned jobs. Cannot access other bookings. |
| customer | Tenant | Can create and view their own bookings only. |

---

## Scope Rules

### Platform scope (`super_admin` only)

- create, suspend, and manage tenants
- view any tenant's data for support purposes
- manage platform-level configuration
- cannot be created by any tenant-level role

### Tenant scope (all other roles)

- all actions are scoped to `tenantId`
- a user from Tenant A cannot read, write, or act on Tenant B data under any circumstance
- the `tenantId` on every request must match the authenticated user's `tenantId`

---

## Permission Matrix

| Action | super_admin | tenant_owner | tenant_admin | dispatcher | office_staff | driver | customer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create tenant | yes | no | no | no | no | no | no |
| Manage tenant config | yes | yes | yes | no | no | no | no |
| Invite users | yes | yes | yes | no | no | no | no |
| View all bookings | yes | yes | yes | yes | yes | no | no |
| Create booking | yes | yes | yes | yes | yes | no | yes |
| Dispatch driver | yes | yes | yes | yes | no | no | no |
| View own jobs | yes | yes | yes | yes | yes | yes | no |
| View own bookings | yes | yes | yes | yes | yes | no | yes |
| Manage pricing rules | yes | yes | yes | no | no | no | no |
| View reports | yes | yes | yes | yes | no | no | no |
| Manage fleet | yes | yes | yes | no | no | no | no |

---

## Public Endpoints

Some endpoints are deliberately public (no auth required):

| Endpoint | Reason |
| --- | --- |
| POST /api/booking/quote | Guest customers need quotes before creating an account |

All other endpoints require a valid JWT and role check.

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

---

## Related Documents

- `docs/03-platform/security-model.md`
- `docs/03-platform/multi-tenancy.md`
- `backend/prisma/schema.prisma` — UserRole enum
