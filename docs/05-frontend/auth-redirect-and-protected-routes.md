# Auth Redirect and Protected Routes

## Purpose

Define how users enter GreenRide, where they land after authentication, and which route families are protected by role.

This document connects auth, RBAC, and frontend route ownership.

---

## Status

Draft, approved as the current documentation direction.

This document defines redirect and protected-route intent for future implementation-safe auth and frontend work.

---

## Scope

This document covers:
- role-based landing destinations
- protected route boundaries
- public vs authenticated route distinctions
- relationship between route protection and module-aware route gating

---

## Out of Scope

This document does not define:
- token implementation details
- password reset mechanics
- MFA mechanics
- backend middleware code

Those belong in auth and security contracts.

---

## Roles Affected

- guest customer
- customer
- driver
- office_staff
- dispatcher
- tenant_admin
- tenant_owner
- super_admin
- platform_ops as a later explicit auth-role alignment case

---

## Login / Entry Model

GreenRide should support:
- public booking access where explicitly allowed
- authenticated role entry for protected areas
- role-based redirect after successful login

The system must not force all users into one generic post-login destination.

---

## Canonical Post-Login Destinations

| Role | Default Landing Destination |
| --- | --- |
| customer | `/customer` |
| driver | `/driver` |
| office_staff | `/ops` |
| dispatcher | `/ops/dispatch` |
| tenant_admin | `/ops` |
| tenant_owner | `/ops` |
| super_admin | `/platform` |
| platform_ops | `/platform-ops` when explicitly implemented |

Guest customers remain in the public/customer booking surface until authenticated flow is required.

---

## Protected Route Boundaries

| Route Family | Protection Rule |
| --- | --- |
| `/` and approved public booking pages | public unless explicitly elevated into authenticated step |
| `/customer/*` | customer only |
| `/driver/*` | driver only |
| `/ops/*` | tenant_owner, tenant_admin, dispatcher, office_staff |
| `/platform/*` | super_admin only |
| `/platform-ops/*` | platform_ops only when the role is explicitly implemented and aligned |

---

## In-Surface RBAC Rules

Even within a shared route family, roles still differ.

Examples:
- `dispatcher` may access dispatch-focused routes inside `/ops`
- `office_staff` may access booking-management routes inside `/ops` but not dispatch controls where prohibited
- `tenant_admin` and `tenant_owner` may access tenant configuration pages inside `/ops`
- `super_admin` is the only role allowed into `/platform/*`
- `platform_ops` is the only role allowed into `/platform-ops/*` once that role is explicitly implemented

This means:
- route-family protection is not enough on its own
- feature- and page-level RBAC still applies inside each surface

---

## Canonical Rules

1. After authentication, redirect users to the correct role-based surface.
2. Do not send all authenticated users to one shared dashboard.
3. Protect route families by role family first, then apply page-level RBAC inside the surface.
4. Do not expose `/platform/*` to any tenant-scoped role.
5. Do not expose `/driver/*` to non-driver roles.
6. Public booking routes must stay explicitly documented as public rather than assumed.
7. Module-aware route gating is a separate layer and should follow the shared frontend gating contract.
8. A valid authenticated session must still be rejected from the wrong protected surface if the role family does not match.
9. `super_admin` and `platform_ops` must not be treated as the same protected-surface authority by default.

## Wrong-Surface and Session-State Handling

Canonical direction:
- unauthenticated access to a protected route should redirect or fail according to the protected-route pattern for that surface
- authenticated access to the wrong protected route family should fail as an authority problem, not silently succeed because a session exists
- suspended, restricted, or revoked sessions should not keep landing users inside a stale protected shell
- post-login redirect rules should remain consistent with the auth/session contract even when multiple protected surfaces exist in one frontend app

This matters especially for:
- tenant roles attempting platform routes
- `super_admin` visibility versus `platform_ops` execution authority
- customer sessions attempting authenticated operational shells

## Relationship to Module Gating

Protected-route logic and module-aware route gating are related but different.

Canonical direction:
- route protection checks role/family access first
- module-aware route gating checks whether the feature is enabled for the tenant/context
- blocked-module routes must fail cleanly with a module-unavailable state instead of broken page behavior

Module gating must never be used to grant access to a route family that RBAC and protected-route rules would otherwise reject.

This document does not define every gated route.
It defines how protection and module gating relate.

---

## Related Documents

- `docs/03-platform/rbac.md`
- `docs/03-platform/security-model.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`

---

## Stop Conditions

Stop and clarify before changing this document if:
- a role needs multiple primary landing surfaces
- a public route becomes role-protected
- a tenant role needs a platform route
- customer and guest flows need to diverge in a way not covered by current booking docs
