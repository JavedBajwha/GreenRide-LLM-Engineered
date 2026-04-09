# Dashboard Layout and Customization

## Purpose

Define the canonical dashboard-layout and customization baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- totally free-form dashboards that break operational workflows
- one universal layout pattern across all surfaces
- user customization that overrides product-critical dashboard structure
- widget arrangement rules with no surface-aware guardrails

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical dashboard layout/customization contract for the Phase 8 frontend implementation wave.

---

## Scope

This document covers:
- dashboard layout baseline
- zone-based dashboard direction
- surface default ownership
- per-user customization baseline
- protected versus customizable layout areas

---

## Out of Scope

This document does not define:
- exact pixel grid
- drag/drop implementation mechanics
- final widget inventory per surface
- detailed permission matrix for every widget action

Those belong to later detailed dashboard and implementation contracts.

---

## Related Documents

- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/05-frontend/shared-app-shell-ownership.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/driver-ui-contract.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`

---

## Canonical Rules

1. Dashboard layout should be zone-based, not free-form by default.
2. Each surface owns an approved default dashboard arrangement.
3. Per-user customization may exist later, but only within explicit guardrails.
4. Customization must not break core operational or governance layout needs.
5. Different surfaces may allow different levels of customization.

---

## Zone-Based Layout Baseline

GreenRide dashboards should use a zone-based layout model.

Canonical direction:
- dashboards are composed through approved zones
- widgets are placed within those zones according to surface rules
- zones create structure without forcing every surface into the same exact frame

This is safer than full free-form layout from the start.
The first concrete per-surface zone maps now live in:
- `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`

---

## Surface Default Ownership

Each surface should have a product-owned default arrangement.

Approved baseline:
- customer surface has a customer-focused default dashboard arrangement
- driver surface has a driver-focused default arrangement
- tenant operations surface has an ops-focused default arrangement
- platform control surface has a governance-focused default arrangement
- platform ops surface has an operational-safety-focused default arrangement

This means product ownership defines the initial dashboard logic before personalization begins.

---

## Protected vs Customizable Areas

The layout model should distinguish:
- protected zones
- semi-flexible zones
- user-customizable zones

Baseline meanings:
- protected zones contain critical widgets that should stay anchored
- semi-flexible zones may allow limited change or replacement
- user-customizable zones may allow approved widget arrangement where later enabled

This is the cleanest safety boundary.

---

## Surface-Specific Customization Direction

Different surfaces should allow different levels of customization.

### Customer

Customer dashboards may allow more flexible personalization around:
- next trip summary
- recent bookings
- saved locations
- quick actions

### Driver

Driver dashboards may allow only light customization.

Reason:
- the surface is action-first and mobile-priority
- too much rearrangement can reduce operational clarity

### Tenant Operations

Tenant Operations should protect core dispatch and incident structure.

Examples of likely protected areas:
- live KPIs
- dispatch queue summary
- incidents/exceptions
- quick operational actions

Some secondary widgets may be configurable later, but the dispatch-first operating model must remain intact.

### Platform Control

Platform Control may allow moderate governance-oriented customization, but should still keep:
- tenant status visibility
- onboarding visibility
- package/module visibility
- audit/support awareness

### Platform Ops

Platform Ops should keep the strongest protected layout areas.

Examples of likely protected zones:
- health overview
- active incidents
- maintenance state
- active containment controls

Customization must not weaken operational response clarity.

---

## Tenant Default vs User Personalization

Current safe direction:
- product defines the baseline surface layout
- tenant-level defaults may later influence tenant-scoped surfaces where explicitly approved
- user personalization happens after that and only within allowed boundaries

This creates a clean order of authority:
1. platform baseline
2. tenant default where applicable
3. user customization where allowed

---

## Relationship to Widget Gating

Layout/customization must respect widget gating rules.

Canonical direction:
- gated widgets do not become available through customization alone
- hidden or unavailable widgets must not appear just because a saved layout references them
- layout persistence must still respect role, module, and package boundaries
- saved layouts must not reintroduce routes, deep-links, or actions that the current user or surface is no longer allowed to access
- customization must not turn a summary widget into broader report or export authority than the owning widget/report contract allows

This prevents layout state from bypassing product controls.

---

## Relationship to Responsive Behavior

Layout customization must not ignore responsive priorities.

Current direction:
- desktop-first ops/governance surfaces may have richer multi-zone layouts
- mobile-priority customer and driver surfaces should keep simpler, safer arrangements
- responsive collapse behavior must remain product-controlled even where widget arrangement is configurable later

This prevents personalization from breaking mobile safety.

---

## Important Rule

GreenRide should personalize dashboards within surface-aware guardrails, not hand full structural control to every user.

That is the cleanest way to support customization without weakening dispatch, governance, or safety-critical workflows.

---

## Stop Conditions

Stop and clarify before implementation if:
- full free-form dashboard layout is being introduced with no protected zones
- user customization is allowed to move or remove critical operational widgets
- one layout model is being forced across all surfaces without regard for surface purpose
- saved layouts are being allowed to bypass role/module/widget availability rules
