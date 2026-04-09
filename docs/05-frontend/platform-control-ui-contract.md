# Platform Control UI Contract

## Purpose

Define the first-pass UI contract for the Platform Control surface in GreenRide.

This document exists to prevent:
- mixing governance UI with platform-ops execution UI
- inventing unsupported platform-admin screens
- blurring package/commercial controls with tenant-ops workflows

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- purpose of the surface
- primary users
- main jobs to be done
- top-level navigation
- dashboard behavior
- key page families
- module-gating behavior
- responsive behavior
- empty, loading, and error states

---

## Out of Scope

This document does not define:
- low-level platform-ops workflows
- raw infrastructure tooling
- detailed component visuals
- exact per-widget layout specs

Those belong in Platform Ops and later detailed UI contracts.

---

## Primary Users

- `super_admin`

---

## Main Jobs To Be Done

- tenant governance
- onboarding control
- package and module commercial control
- cross-tenant visibility
- audit and support visibility

---

## Top-Level Navigation

Approved first navigation groups:
- dashboard
- tenants
- onboarding
- packages/modules
- audit
- platform reports
- support tools

---

## Dashboard / Landing Behavior

Platform Control dashboard should focus on:
- tenant count and status
- onboarding progress
- package and module distribution
- support and audit alerts
- platform-level commercial visibility

This is a governance dashboard, not an operational incident console.

---

## Key Page Families

- platform dashboard
- tenant list
- tenant detail and support actions
- onboarding controls
- package and module management
- platform audit visibility
- platform reporting
- support tools

### Page-Family Behavior

#### Platform Dashboard

Primary job:
- provide governance-first orientation

Expected behavior:
- should foreground tenant status, onboarding, package/module distribution, support pressure, and platform reporting summaries
- should not present incident-response or recovery execution controls as if they belong to the governance landing page

#### Tenant and Support Pages

Primary job:
- allow platform governance and approved support visibility without turning Platform Control into a tenant-ops surface

Expected behavior:
- tenant detail and support pages may expose tenant context, but they must preserve platform-shell identity and must not feel like embedded tenant-ops pages
- support visibility and support actions must stay distinct from platform-ops execution authority

#### Audit and Reporting Pages

Primary job:
- provide governed visibility into platform-wide information

Expected behavior:
- platform audit and reporting pages should remain platform-scoped and must not read like tenant analytics or Platform Ops health dashboards
- empty, unavailable, and partial-data states must preserve governance context rather than falling back to generic admin blanks

---

## Module-Gating Behavior

- Platform Control remains platform-scoped and is not tenant-themed
- tenant commercial modules do not gate the Platform Control surface itself
- some platform pages may vary by future internal permissions, but not by tenant package enablement

---

## Responsive Behavior

- desktop-first
- tablet-safe
- responsive on smaller screens
- not primarily optimised for phone-first workflows

Wide governance tables and overview cards may compress or stack, but the surface remains desktop-oriented.

---

## Empty, Loading, and Error States

- empty tenant states should explain what has not yet been onboarded
- loading states should preserve platform-shell context
- error states should clearly distinguish data failure from permission failure
- no page should silently fail into a blank governance screen

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`
- `docs/03-platform/superadmin-commercial-controls.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- platform governance is expected to merge with platform-ops execution
- tenant-scoped roles are expected to use this surface
- the surface must inherit tenant branding
