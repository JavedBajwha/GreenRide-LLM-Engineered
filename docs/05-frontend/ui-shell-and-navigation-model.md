# UI Shell and Navigation Model

## Purpose

Define the canonical UI shell structure and navigation model for GreenRide across each app surface.

This document exists to prevent:
- inconsistent shell layouts between role surfaces
- invented navigation groups
- platform controls appearing in tenant or driver areas
- frontend drift before exact mockup assets are available

---

## Status

Draft, provisional navigation and shell contract.

This document defines the current approved UI structure direction for documentation work.
Visual refinement and exact screen matching remain subject to available UI assets and later frontend phases.

---

## Scope

This document covers:
- shell structure by app surface
- primary navigation families
- navigation ownership by role family
- cross-surface separation rules
- default shell entry behavior
- shared-shell versus surface-owned responsibility boundaries

---

## Out of Scope

This document does not define:
- detailed component visuals
- exact pixel layout
- backend API behavior
- full per-screen interactions

Those belong in frontend, domain, and UI-specific documents.

---

## App Surfaces Affected

| Surface | Base Route |
| --- | --- |
| Public / Customer Booking Surface | `/` and `/customer/*` |
| Driver App Surface | `/driver/*` |
| Tenant Operations Surface | `/ops/*` |
| Platform Control Surface | `/platform/*` |
| Platform Ops Surface | `/platform-ops/*` |

---

## Canonical Shell Model

### Shared vs Surface-Owned Shell Responsibility

The shared app shell may own:
- runtime bootstrap
- auth/session wrappers
- theme/token plumbing
- shared loading/error/session-expiry primitives

The shared app shell must not own:
- one universal sidebar across all surfaces
- one universal header that erases surface identity
- one universal dashboard frame for customer, driver, tenant ops, and platform surfaces

Each major surface owns:
- its shell identity
- its primary navigation model
- its default landing structure
- its core layout priorities

### 1. Public / Customer Booking Surface

Shell characteristics:
- simple public-facing shell
- booking-first layout
- minimal distraction
- lightweight top navigation where needed
- customer account navigation only after authenticated entry

Primary navigation groups:
- book
- track
- account
- bookings
- profile

### 2. Driver App Surface

Shell characteristics:
- operational shell
- mobile-first
- high-action, low-distraction
- clear active-job context
- fast access to status and current trip

Primary navigation groups:
- home
- jobs
- history / earnings
- profile

### 3. Tenant Operations Surface

Shell characteristics:
- operational admin shell
- clear left-nav or structured dashboard navigation
- dispatch-first awareness
- dense but controlled information architecture

Primary navigation groups:
- dashboard
- dispatch
- bookings
- drivers
- fleet
- pricing
- staff
- reports
- incidents

Not every role sees every group.
In-surface RBAC still controls access.

### 4. Platform Control Surface

Shell characteristics:
- platform governance shell
- cross-tenant controls
- strong separation from tenant operations shell

Primary navigation groups:
- platform dashboard
- tenants
- onboarding
- audit
- health
- platform configuration

### 5. Platform Ops Surface

Shell characteristics:
- operational safety shell
- high-signal incident and health visibility
- explicit recovery and containment tools
- strong separation from business/governance navigation

Primary navigation groups:
- health
- incidents
- impact
- releases
- maintenance
- emergency controls
- recovery
- audit trail

---

## Default Shell Entry Behavior

| Surface | Default Entry Behavior |
| --- | --- |
| Public / Customer Booking Surface | enters through booking-first public shell; customer account shell appears only after authenticated customer entry |
| Driver App Surface | opens into driver operational shell with immediate status/job context |
| Tenant Operations Surface | opens into tenant ops shell with dashboard or dispatch-first landing depending on role |
| Platform Control Surface | opens into governance shell with platform dashboard landing |
| Platform Ops Surface | opens into ops shell with health/incident/restriction context visible immediately |

Default entry behavior should remain aligned with the role-app surface map and route inventory.

## Cross-Surface Navigation Rules

- navigation should primarily move inside the current authoritative surface
- cross-surface links may exist for approved support or visibility handoffs
- cross-surface links must not make the destination feel like it belongs to the current shell
- shell chrome should change when the user enters a different surface family
- users must not see mixed tenant/platform/platform-ops navigation groups inside one shell

---

## Canonical Navigation Rules

1. Each app surface has its own shell identity.
2. Do not reuse the same navigation model across all role surfaces.
3. Customer and public booking navigation must stay simple and low-friction.
4. Driver navigation must stay operational and mobile-first.
5. Tenant operations navigation must prioritise dispatch and booking operations.
6. Platform control navigation must remain fully separated from tenant operations.
7. Platform ops navigation must remain fully separated from platform governance navigation.
8. In-surface RBAC still applies after shell-level separation.
9. Shared shell infrastructure must not erase surface-owned navigation identity.
10. When a user crosses into another surface family, the destination shell must become authoritative immediately.

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/auth-redirect-and-protected-routes.md`
- `docs/05-frontend/frontend-architecture.md`
- `docs/05-frontend/ui-screen-map.md`
- `docs/01-product/design-system.md`

---

## Stop Conditions

Stop and clarify before changing this model if:
- a role needs a new shell type
- platform and tenant navigation are proposed to merge
- driver shell stops being operationally focused
