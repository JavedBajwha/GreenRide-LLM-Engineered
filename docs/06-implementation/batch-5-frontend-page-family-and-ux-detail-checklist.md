# Batch 5 Frontend Page-Family and UX Detail Checklist

## Purpose

Provide a focused execution checklist for the fifth closure batch in GreenRide's endgame documentation pass.

This checklist exists to reduce the remaining frontend ambiguity across:
- route families and surface separation
- shared shell and navigation behavior
- page-family and state-handling detail
- dashboard widgets, layouts, and embeddable UI
- degraded, blocked, stale, empty, and partial-data states
- branding, theme, responsive behavior, and external website/embed alignment

---

## Scope

This batch covers the remaining `partial` follow-through in:

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/shared-app-shell-ownership.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/05-frontend/dashboard-layout-and-customization.md`
- `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`
- `docs/05-frontend/route-gating-and-locked-state-matrix.md`
- `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`
- `docs/05-frontend/theme-branding-and-responsive-layout.md`
- `docs/05-frontend/external-website-wordpress-and-wpml-compatibility.md`
- `docs/05-frontend/ai-assisted-branding.md`
- linked UI asset and mockup references only where page-family clarity requires it

This batch does not redesign the product model or invent a new design system.
It is focused on making the existing frontend contracts more exact and internally aligned.

---

## Ordered Checklist

### 1. Surface Separation and Route-Family Tightening

- review route inventory, role-to-surface mapping, and route-family ownership together
- verify route separation, shell ownership, and module-aware gating stay aligned

Current pass progress:
- route inventory, app-surface mapping, shared-shell ownership, and gating docs now state more clearly that redirects, blocked-route handling, and recovery states must preserve authoritative surface-shell ownership rather than falling back through another surface frame

### 2. Page-Family Contract Tightening

- review customer, tenant, platform-control, and platform-ops page-family contracts
- tighten places where page behavior is still too generic to implement safely

Current pass progress:
- customer, tenant-operations, and platform-control UI contracts now state more clearly how their main page families should behave, including how stale, partial, blocked, and governance-versus-operations conditions must remain visible without collapsing surfaces together

### 3. Widget, Layout, and Embeddable UI Tightening

- review widget ownership, dashboard layout, zone maps, and embeddable UI boundaries together
- verify widgets, reports, and embed surfaces do not silently inherit broader authority

Current pass progress:
- widget, layout, zone-map, and external-hosting docs now state more clearly that saved layouts, widgets, embeds, and CMS host configurations cannot reintroduce broader route, report, export, or operational-action authority than the owning surface already allows

### 4. State Handling and Degraded UX Tightening

- review stale, degraded, blocked, empty, and partial-data behavior together
- verify frontend states remain subordinate to backend/domain truth instead of inventing new state meaning

Current pass progress:
- shared state-handling rules now distinguish session-expiry trust recovery from permission and not-found outcomes more clearly, and customer, tenant-ops, and platform-ops docs now preserve route/surface context more explicitly when records are missing, stale, degraded, or partial

### 5. Branding, Responsive, and External-Surface Tightening

- review theme, responsive behavior, WordPress/WPML stance, and AI-assisted branding guidance together
- verify external-surface and branding guidance stay subordinate to approved product and trust boundaries

Current pass progress:
- branding, responsive, AI-assisted theming, and external-hosting docs now state more clearly that tenant branding and AI theme recommendations may affect tenant-scoped identity and atmosphere, but must not blur surface identity, route ownership, shell authority, or the narrow scope of the approved external embed surface

### 6. Cross-Document Alignment Check

- verify no stale contradictions remain across Batch 5 docs
- update tracker, gap register, continuity notes, and current-state with honest outcomes

---

## Finish Criteria

Batch 5 can be treated as substantially closed only when:

- route-family and surface separation rules are internally aligned
- page-family behavior is clearer across major frontend surfaces
- widget, shell, layout, and embed boundaries are tighter
- degraded, blocked, stale, empty, and partial-data states are more explicit
- branding, responsive, and external-surface guidance is explicit enough to avoid frontend drift
- remaining uncertainty is explicitly deferred rather than left implicit

---

## Stop Conditions

Stop and clarify before claiming this batch is closed if:

- route families or shells still blur surface ownership
- frontend state handling can still be read as redefining backend/domain truth
- widgets or embeds still imply broader report, route, or authority access than approved
- branding or external-website guidance is still drifting into undocumented product behavior

---

## Related Documents

- `docs/06-implementation/final-partial-closure-plan.md`
- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`

---

## Completion Judgment

Batch 5 can now be treated as substantially complete.

Current judgment:
- no blocking contradiction remains across route-family ownership, shell identity, page-family behavior, widget/layout/embed authority, shared state handling, or branding/external-surface guidance
- frontend surface separation is now explicit enough that redirects, blocked routes, state recovery, and visual customization do not quietly collapse surfaces together
- remaining uncertainty is detail-level only, including deeper screen-level interaction detail, finer widget permissions, richer visual-spec depth, and exact implementation mechanics
