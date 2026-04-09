# Phase 8 Frontend Implementation Contracts Checklist

## Purpose

This checklist defines the main documentation work needed to make the remaining frontend implementation layer implementation-safe.

It exists to turn the current strong-but-fragmented frontend direction into a focused working list instead of leaving scaffold, shell ownership, widgets, embeds, and layout customization spread across route, UI-contract, and branding docs.

---

## Scope

This checklist is limited to the remaining frontend implementation-contract wave covering:
- frontend scaffold contract
- shared app shell ownership
- dashboard widgets and embeddable UI
- dashboard layout and customization model
- remaining route/module-gating refinement where needed

It does not cover:
- detailed service/provider implementation
- deeper reporting or payment internals
- final asset/mockup delivery

Those stay in linked later refinement work even where they intersect.

---

## Current Domain Read

What already exists:
- frontend tech-stack and architecture docs
- route inventory and shell/navigation model
- per-surface UI contracts
- theme/branding/responsive contract

What is still missing or still too weak:
- one canonical scaffold contract
- one explicit shared app-shell ownership contract
- one explicit dashboard-widget and embeddable-UI contract
- one explicit dashboard layout/customization contract
- tighter frontend linkage for module-aware route and shell behavior

The frontend layer is therefore directionally strong, but still not implementation-safe as a whole.

---

## Phase 8 Main Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| Frontend scaffold contract | partial | Canonical single-app, multi-surface scaffold baseline now exists, but later folder/package detail and deeper ownership mechanics still need refinement | `docs/05-frontend/frontend-scaffold-contract.md` |
| Shared app shell ownership | partial | Canonical shared-shell versus surface-shell ownership baseline now exists, but later shell-detail and route-level follow-through still need refinement | `docs/05-frontend/shared-app-shell-ownership.md` |
| Dashboard widgets and embeddable UI | partial | Canonical widget/embed baseline now exists, but final widget catalogs, embed delivery detail, and compatibility follow-through still need refinement | `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md` |
| Dashboard layout and customization model | partial | Canonical zone-based layout and guarded-customization baseline now exists, but final zone maps, widget-level permissions, and interaction detail still need refinement | `docs/05-frontend/dashboard-layout-and-customization.md` |
| Remaining route/module-gating refinement | partial | Canonical shared gating pattern now exists, but route-by-route matrices and some surface-specific locked-state detail still need later refinement | `docs/05-frontend/module-aware-ui-and-route-gating.md` plus linked route/auth docs |

---

## Recommended Working Order

1. Frontend scaffold contract
2. Shared app shell ownership
3. Dashboard widgets and embeddable UI
4. Dashboard layout and customization model
5. Remaining route/module-gating refinement where needed

This order keeps:
- application structure first
- shared shell boundaries second
- reusable/widget surfaces third
- dashboard behavior and customization after the shell and widget model are stable

---

## Completion Rule

Phase 8 documentation should not be treated as substantially complete until:
- each item above has a canonical document or clearly upgraded canonical home
- scaffold, shell, widget, embed, and layout rules stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/05-frontend/frontend-tech-stack.md`
- `docs/05-frontend/frontend-architecture.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/tenant-operations-ui-contract.md`
- `docs/05-frontend/customer-ui-contract.md`
- `docs/05-frontend/driver-ui-contract.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
