# Frontend Scaffold Contract

## Purpose

Define the canonical frontend scaffold baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- multiple disconnected frontend apps when the product model expects one shared app
- mixed route and shell ownership with no clear surface boundaries
- duplicated frontend infrastructure across role surfaces
- scaffold structures that conflict with the approved route, shell, and branding model

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical frontend scaffold contract for the Phase 8 frontend implementation wave.

---

## Scope

This document covers:
- top-level frontend scaffold baseline
- one-app versus multi-app direction
- route-surface structure baseline
- shared foundation ownership baseline
- relationship between scaffold, shells, and app surfaces

---

## Out of Scope

This document does not define:
- exact folder names for every component
- detailed dashboard widget implementation
- exact shell layout visuals
- final deployment topology
- detailed package extraction rules for every future shared utility

Those belong to later frontend shell, widget, layout, and implementation contracts.

---

## Related Documents

- `docs/05-frontend/frontend-tech-stack.md`
- `docs/05-frontend/frontend-architecture.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/05-frontend/theme-branding-and-responsive-layout.md`

---

## Canonical Rules

1. GreenRide should use one frontend application, not multiple independent frontend apps by default.
2. Major role surfaces must remain clearly separated inside that single application.
3. Shared frontend foundations should be owned once at the application level wherever possible.
4. Route, shell, RBAC, and module-gating boundaries must preserve surface separation even inside one app.
5. The scaffold must reflect the approved top-level surface model, not invent a different app split.

---

## One-App Baseline

Approved direction:
- GreenRide should use one Next.js application
- that one application should contain the approved major route/surface families
- the scaffold should not split customer, driver, tenant ops, platform control, and platform ops into separate frontend apps by default

This is the core scaffold decision.

---

## Approved Surface Families

The single frontend app should preserve these top-level surface families:
- public/customer
- driver
- tenant operations
- platform control
- platform ops

Canonical direction:
- surfaces remain structurally distinct
- shared infrastructure does not mean merged UX or merged shell behavior
- the scaffold must make it hard to blur those boundaries accidentally

---

## Why One App

Current approved reasons for the one-app baseline:
- shared branding and theme foundations stay easier to control
- shared auth/session handling stays easier to centralize
- shared design-system and component ownership stays cleaner
- route, shell, and module-aware logic can still stay strongly separated by surface
- duplicated tooling, config, and build drift are reduced

This matches the rest of the current documentation model better than a multi-app split.

---

## Shared Foundation Ownership

The scaffold should centralize shared frontend foundations where appropriate.

Examples of shared foundation areas:
- app bootstrap/runtime configuration
- theme/design-token foundations
- auth/session boundary helpers
- shared API client/query setup
- shared UI primitives/design-system layer
- shared feature flags/module-gating helpers

Important guardrail:
- shared foundations should not collapse role-surface boundaries
- shared code is allowed; shared shell identity is not automatically allowed

---

## Surface Separation Guardrail

Even in one frontend app:
- customer/public shell must remain distinct
- driver shell must remain distinct
- tenant ops shell must remain distinct
- platform control shell must remain distinct
- platform ops shell must remain distinct

This means the scaffold should support:
- separate route families
- separate shell ownership
- separate navigation models
- separate RBAC/module gating behavior by surface

One app does not mean one generic shell.

---

## Route-Structure Baseline

The scaffold should align to the approved route model rather than inventing a new one.

Current top-level route families:
- `/`
- `/customer/*`
- `/driver/*`
- `/ops/*`
- `/platform/*`
- `/platform-ops/*`

Canonical direction:
- scaffold structure should respect these route families as primary surface boundaries
- internal route grouping may support maintainability later, but it must not hide or distort the approved surface model

---

## Relationship to Shell Ownership

This document defines the app-level scaffold only.

It does not say every surface shares the same layout behavior.

Canonical direction:
- one application owns the top-level runtime and shared foundations
- surface-specific shell ownership remains separate
- later shell contracts must define which shell concerns are shared and which stay surface-owned

This is why scaffold and shell ownership are separate checklist items.

---

## Relationship to Module and RBAC Boundaries

The scaffold must support:
- route protection
- role-aware redirects
- in-surface RBAC
- module-aware feature and route gating

Current guardrail:
- these concerns must not be implemented as scattered ad hoc checks with no structural ownership
- the scaffold should make those boundaries easy to apply consistently later

---

## Provisional Structure Direction

Without locking every final folder yet, the scaffold should be capable of organizing:
- route-level surface entry points
- shared foundation libraries
- surface-specific feature areas
- shared design-system primitives
- module-aware and role-aware control helpers

This is a structure direction, not a final code tree.

---

## Important Rule

GreenRide should be scaffolded as one frontend application with strongly separated app surfaces, not as one generic shell and not as multiple disconnected frontend apps by default.

---

## Stop Conditions

Stop and clarify before implementation if:
- a proposal splits the product into multiple frontend apps by default
- a proposal collapses all role surfaces into one shell because the app is shared
- route structure starts to conflict with the approved surface model
- shared infrastructure starts to erase surface-specific ownership boundaries
