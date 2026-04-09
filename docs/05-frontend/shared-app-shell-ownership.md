# Shared App Shell Ownership

## Purpose

Define the canonical ownership boundary between the shared app shell and surface-owned shells in GreenRide.

This document exists so AI and future implementation work do not invent:
- one generic shell for every role surface
- unclear ownership between global app infrastructure and surface-specific layouts
- duplicated shell plumbing across surfaces
- shared-shell abstractions that erase customer, driver, ops, or platform identity

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical shared-shell ownership contract for the Phase 8 frontend implementation wave.

---

## Scope

This document covers:
- what the shared app shell owns
- what each surface shell owns
- relationship between app scaffold and surface shells
- shell-level boundary rules
- ownership guardrails for cross-surface UI behavior

---

## Out of Scope

This document does not define:
- exact visual layout for each shell
- widget composition inside dashboards
- exact route-by-route permission detail
- final component tree names

Those belong to later shell-detail, dashboard, and route refinement contracts.

---

## Related Documents

- `docs/05-frontend/frontend-scaffold-contract.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/driver-ui-contract.md`

---

## Canonical Rules

1. The shared app shell owns cross-surface infrastructure, not a universal shell identity.
2. Each major app surface owns its own shell identity, navigation, and primary layout behavior.
3. Shared-shell abstractions must reduce duplication without flattening surface differences.
4. One frontend application does not imply one generic header, sidebar, or dashboard frame.
5. Surface-owned shell behavior must remain consistent with the approved route and app-surface model.

---

## Shared Shell Ownership Baseline

The shared app shell should own only cross-surface infrastructure and common app-level concerns.

Approved shared ownership examples:
- top-level app bootstrap boundary
- runtime/config bootstrapping
- theme and design-token plumbing
- auth/session boundary plumbing
- shared loading/error/session-expiry wrappers
- shared surface-agnostic primitives
- cross-surface module-gating helpers where appropriate

This is the safe baseline for what “shared shell” means.

---

## Surface-Owned Shell Baseline

Each major surface should own its own shell identity and primary navigation behavior.

Surface-owned shell concerns include:
- primary navigation model
- shell-specific header/sidebar/topbar patterns
- dashboard framing
- surface-specific layout rhythm
- action emphasis and operational density
- responsive priorities by surface

This means:
- customer shell stays booking-first and low-friction
- driver shell stays mobile-first and operational
- tenant ops shell stays dispatch-first
- platform control shell stays governance-oriented
- platform ops shell stays operational-safety oriented

---

## What The Shared Shell Must Not Own

The shared shell must not become the owner of:
- one universal sidebar for all surfaces
- one universal top navigation for all surfaces
- one universal dashboard frame for all surfaces
- one universal mobile layout pattern across all surfaces

Those would erase the surface model we already approved.

---

## Relationship to the Frontend Scaffold

The scaffold contract already defines:
- one frontend app
- multiple clearly separated surfaces

This document clarifies the next layer:
- the app may share infrastructure
- the surfaces do not surrender shell identity to a single generic app frame

That is the key structural boundary.

---

## Shared Infrastructure vs Shared UX

These are not the same thing.

Canonical direction:
- shared infrastructure is encouraged where it reduces duplication safely
- shared UX should only exist where the behavior is truly cross-surface and does not damage surface identity

Examples of safer shared UX primitives:
- auth/session interruption handling
- generic empty/loading/error containers
- shared theming hooks
- design-system primitives

Examples of surface-owned UX:
- dashboard chrome
- primary nav
- operational action rails
- role-context headers

---

## Cross-Surface Wrapper Direction

Cross-surface wrappers may exist, but they should remain thin.

Approved direction:
- wrappers may enforce app-level concerns consistently
- wrappers should not inject a one-size-fits-all shell experience
- wrappers must allow surface shells to remain distinct
- wrappers must not resolve redirects, blocked routes, or recovery states by silently dropping the user into a different surface shell

This helps implementation avoid over-abstracting layout too early.

---

## Relationship to RBAC and Module Gating

Shell ownership must support later RBAC and module-gating work cleanly.

Current guardrail:
- shared shell helpers may support access and gating mechanics
- final visibility and navigation decisions still belong to the relevant surface shell and route contracts
- shell abstraction must not hide permission or module behavior in undocumented global logic
- blocked-route and redirect handling must preserve route-family ownership instead of collapsing multiple surfaces into one fallback frame

---

## Important Rule

GreenRide should share app infrastructure broadly, but shell identity narrowly.

That is the cleanest way to keep one frontend app without collapsing customer, driver, ops, platform control, and platform ops into one generic product frame.

---

## Stop Conditions

Stop and clarify before implementation if:
- a shared shell abstraction starts forcing the same nav/frame across all surfaces
- surface-owned shell behavior starts moving into undocumented global layout logic
- the customer or driver shell begins to look like tenant/platform admin by inheritance
- one-app implementation pressure is being used to justify one-shell UX
