# Driver UI Contract

## Purpose

Define the first-pass UI contract for the Driver surface in GreenRide.

This document exists to prevent:
- desktop-biased driver workflows
- unsupported driver screens and states
- mixing driver work with tenant-ops behavior

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
- exact trip-state machine implementation
- navigation provider integration
- detailed offline-sync mechanics
- final button-level visual hierarchy

Those belong in driver-domain and later frontend-detail contracts.

---

## Primary Users

- `driver`

---

## Main Jobs To Be Done

- go online or offline
- receive and respond to jobs
- manage active trip state
- see navigation and trip context
- view recent jobs and earnings

---

## Top-Level Navigation

Approved first navigation groups:
- home
- jobs
- history/earnings
- profile

The navigation must remain operational and low-distraction.

---

## Dashboard / Landing Behavior

Driver landing behavior should focus on:
- current availability status
- incoming or current job
- primary trip actions
- recent work summary
- important alerts or messages

This surface should prioritize immediate driver action over passive browsing.

---

## Key Page Families

- driver home and status
- incoming job offer
- active job detail
- trip navigation/trip context
- recent jobs
- earnings/history
- profile

---

## Module-Gating Behavior

- core driver workflows remain part of the platform baseline
- premium driver-management features may add views or detail, but must not remove baseline trip workflow
- gated features must not expose broken navigation or dead-end routes

---

## Responsive Behavior

- mobile-priority
- tablet-safe
- desktop-capable only as a secondary surface

Primary actions must stay obvious and reachable on phone-sized screens.

---

## Empty, Loading, and Error States

- empty recent-jobs history should explain that no completed work exists yet
- no-active-job state should be explicit and calm
- stale-location or degraded-connectivity states must be explicit
- loading states must not hide critical trip-action context

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/02-applications/driver-app.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- driver UI is expected to merge with tenant-ops tools
- the driver surface stops being mobile-priority
- unsupported driver admin/configuration flows are proposed
