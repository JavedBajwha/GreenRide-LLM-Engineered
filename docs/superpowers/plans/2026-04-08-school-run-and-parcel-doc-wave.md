# School Run and Parcel Add-Ons Documentation Wave Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new optional add-ons, `School Run` and `Parcel / Courier / Logistics`, to the GreenRide documentation system without weakening existing platform truth, module boundaries, or residual-safety rules.

**Architecture:** This is a docs-first expansion wave. Start with shared module/commercial and control-layer updates, then document `School Run` as the first add-on wave, then document `Parcel / Courier / Logistics` as the second add-on wave, and finally tighten the cross-cutting tracking, reporting, notification, and frontend impact docs. Keep shared foundations reused and workflow truth separate.

**Tech Stack:** Markdown docs in `docs/`, existing control layer in `docs/06-implementation/`, existing module/commercial docs, tracking/reporting/frontend contracts.

---

## File Structure

### Shared control and module layer

- Modify: `docs/03-platform/module-commercial-model.md`
  - add both add-ons to the approved module/commercial model
- Modify: `docs/03-platform/superadmin-commercial-controls.md`
  - define enable/config authority impact for both add-ons
- Modify: `docs/03-platform/tenant-configuration.md`
  - add tenant-facing configuration direction for both add-ons
- Modify: `docs/06-implementation/documentation-master-tracker.md`
  - add the new documentation wave to the control layer
- Modify: `docs/06-implementation/documentation-gap-register.md`
  - record new gaps/additions for the add-ons
- Modify: `docs/06-implementation/session-continuity-notes.md`
  - save the new design/planning decisions
- Modify: `docs/06-implementation/current-state.md`
  - update the fast handoff with the active add-on documentation wave

### School Run docs

- Create: `docs/01-product/school-run-workflow.md`
  - define recurring-first school transport workflow
- Create: `docs/03-platform/school-run-authority-and-configuration.md`
  - define guardian/school authority direction and tenant configuration impact
- Create: `docs/01-product/school-run-pricing-and-billing.md`
  - define recurring arrangement pricing, billing cadence, and calendar-aware partial-period rules
- Modify: `docs/03-services/realtime-system.md`
  - clarify School Run tracking reuse of ride-tracking foundations if needed
- Modify: `docs/03-services/notifications-and-integrations.md`
  - add school-run communication boundary implications if needed
- Modify: `docs/03-services/analytics-and-reporting.md`
  - add school-run reporting boundary implications if needed
- Modify: `docs/05-frontend/frontend-route-inventory.md`
  - add route-family impact if new surface/routes are approved
- Modify: `docs/05-frontend/module-aware-ui-and-route-gating.md`
  - add gating implications for the School Run add-on

### Parcel / Courier / Logistics docs

- Create: `docs/01-product/parcel-logistics-workflow.md`
  - define logistics-job lifecycle and booking-style intake edge
- Create: `docs/03-services/parcel-proof-and-tracking-contract.md`
  - define proof-of-delivery and parcel-tracking truth
- Create: `docs/01-product/parcel-pricing-and-size-model.md`
  - define parcel classes, dimensions/weight, and shipment-pricing direction
- Modify: `docs/03-services/realtime-system.md`
  - clarify shared tracking infrastructure vs parcel-tracking truth
- Modify: `docs/03-services/notifications-and-integrations.md`
  - add parcel event/communication boundary implications if needed
- Modify: `docs/03-services/analytics-and-reporting.md`
  - add parcel reporting boundary implications if needed
- Modify: `docs/05-frontend/frontend-route-inventory.md`
  - add route-family impact if new parcel/logistics routes are approved
- Modify: `docs/05-frontend/module-aware-ui-and-route-gating.md`
  - add gating implications for the parcel add-on

### Review and alignment

- Modify: `docs/06-implementation/accepted-residuals-and-cross-phase-review.md`
  - classify any accepted residuals introduced by the new add-ons
- Modify: `docs/06-implementation/ai-build-readiness.md`
  - refresh AI build scope if the new add-ons change what is safe now vs reopen-docs-first

## Task 1: Anchor the new add-ons in the control and module layer

**Files:**
- Modify: `docs/03-platform/module-commercial-model.md`
- Modify: `docs/03-platform/superadmin-commercial-controls.md`
- Modify: `docs/03-platform/tenant-configuration.md`
- Modify: `docs/06-implementation/documentation-master-tracker.md`
- Modify: `docs/06-implementation/documentation-gap-register.md`
- Modify: `docs/06-implementation/session-continuity-notes.md`
- Modify: `docs/06-implementation/current-state.md`

- [ ] **Step 1: Review current module/commercial/control files**

Run:
```bash
sed -n '1,260p' docs/03-platform/module-commercial-model.md
sed -n '1,260p' docs/03-platform/superadmin-commercial-controls.md
sed -n '1,260p' docs/03-platform/tenant-configuration.md
```

Expected: the current module, commercial, and tenant-config model is visible enough to place both add-ons cleanly.

- [ ] **Step 2: Add both add-ons to the commercial/module model**

Write the minimum doc changes needed so:
- `School Run` is recognized as an optional tenant add-on
- `Parcel / Courier / Logistics` is recognized as an optional tenant add-on
- enablement/configuration does not replace RBAC

- [ ] **Step 3: Update the control layer**

Add the new documentation wave to:
- `documentation-master-tracker.md`
- `documentation-gap-register.md`
- `session-continuity-notes.md`
- `current-state.md`

Expected: the repo can resume the new add-on wave after restart with minimal scanning.

- [ ] **Step 4: Verify alignment**

Run:
```bash
rg -n "School Run|Parcel|Courier|Logistics" docs/03-platform docs/06-implementation
```

Expected: both add-ons are anchored in the module/control layer and visible in repo memory.

- [ ] **Step 5: Commit**

```bash
git add docs/03-platform/module-commercial-model.md docs/03-platform/superadmin-commercial-controls.md docs/03-platform/tenant-configuration.md docs/06-implementation/documentation-master-tracker.md docs/06-implementation/documentation-gap-register.md docs/06-implementation/session-continuity-notes.md docs/06-implementation/current-state.md
git commit -m "docs: anchor school run and parcel addons in control layer"
```

## Task 2: Document the School Run add-on

**Files:**
- Create: `docs/01-product/school-run-workflow.md`
- Create: `docs/03-platform/school-run-authority-and-configuration.md`
- Create: `docs/01-product/school-run-pricing-and-billing.md`
- Modify: `docs/03-services/realtime-system.md`
- Modify: `docs/03-services/notifications-and-integrations.md`
- Modify: `docs/03-services/analytics-and-reporting.md`
- Modify: `docs/05-frontend/frontend-route-inventory.md`
- Modify: `docs/05-frontend/module-aware-ui-and-route-gating.md`

- [ ] **Step 1: Write the School Run workflow contract**

Include:
- recurring-first transport direction
- optional one-off school journeys
- booking-engine reuse with separate workflow truth
- guardian/roster/approved-contact/note baseline

- [ ] **Step 2: Write the School Run authority/config contract**

Include:
- parent-led, school-led, or both
- tenant-configuration direction
- authority vs module enablement separation

- [ ] **Step 3: Write the School Run pricing and billing contract**

Include:
- recurring arrangement pricing as primary
- one-off journey pricing where allowed
- weekly and monthly cadence support
- optional bespoke/custom invoicing mode
- rider-based, corridor-based, and mixed pricing basis
- calendar-aware partial-period handling using active days or active weeks

- [ ] **Step 3: Update cross-cutting docs only where real impact exists**

Tighten:
- realtime/tracking implications
- notifications implications
- reporting implications
- frontend route/gating implications

Do not invent UI or event detail beyond the approved design.

- [ ] **Step 4: Verify School Run boundary integrity**

Run:
```bash
rg -n "School Run|school-run|guardian|roster" docs
```

Expected: School Run is documented as a separate add-on and not collapsed into ordinary ride-booking truth.

- [ ] **Step 5: Commit**

```bash
git add docs/01-product/school-run-workflow.md docs/03-platform/school-run-authority-and-configuration.md docs/01-product/school-run-pricing-and-billing.md docs/03-services/realtime-system.md docs/03-services/notifications-and-integrations.md docs/03-services/analytics-and-reporting.md docs/05-frontend/frontend-route-inventory.md docs/05-frontend/module-aware-ui-and-route-gating.md
git commit -m "docs: add school run addon contracts"
```

## Task 3: Document the Parcel / Courier / Logistics add-on

**Files:**
- Create: `docs/01-product/parcel-logistics-workflow.md`
- Create: `docs/03-services/parcel-proof-and-tracking-contract.md`
- Create: `docs/01-product/parcel-pricing-and-size-model.md`
- Modify: `docs/03-services/realtime-system.md`
- Modify: `docs/03-services/notifications-and-integrations.md`
- Modify: `docs/03-services/analytics-and-reporting.md`
- Modify: `docs/05-frontend/frontend-route-inventory.md`
- Modify: `docs/05-frontend/module-aware-ui-and-route-gating.md`

- [ ] **Step 1: Write the parcel/logistics workflow contract**

Include:
- logistics-job lifecycle as primary
- booking-style intake as optional edge
- delivery outcome, failed-delivery, redelivery/return direction

- [ ] **Step 2: Write the parcel proof/tracking contract**

Include:
- recipient identity
- proof note
- photo/signature placeholders
- optional stronger proof via OTP/code or stricter handover
- stronger-proof enable authority defaults
- separate parcel-tracking truth vs ride-tracking truth

- [ ] **Step 3: Write the parcel pricing and size contract**

Include:
- named parcel classes
- measured dimensions and weight
- zone/distance direction
- service/handling level direction
- support for larger items and pallets without collapsing them into small-parcel logic

- [ ] **Step 3: Update cross-cutting docs only where real impact exists**

Tighten:
- shared tracking infrastructure vs parcel truth
- notification implications
- reporting implications
- frontend route/gating implications

Do not invent warehouse or hub complexity beyond the approved first-pass design.

- [ ] **Step 4: Verify parcel truth separation**

Run:
```bash
rg -n "Parcel|Courier|Logistics|proof of delivery|OTP|handover" docs
```

Expected: parcel/courier/logistics is documented as a separate add-on with distinct proof and tracking truth.

- [ ] **Step 5: Commit**

```bash
git add docs/01-product/parcel-logistics-workflow.md docs/03-services/parcel-proof-and-tracking-contract.md docs/01-product/parcel-pricing-and-size-model.md docs/03-services/realtime-system.md docs/03-services/notifications-and-integrations.md docs/03-services/analytics-and-reporting.md docs/05-frontend/frontend-route-inventory.md docs/05-frontend/module-aware-ui-and-route-gating.md
git commit -m "docs: add parcel logistics addon contracts"
```

## Task 4: Cross-document review and readiness refresh

**Files:**
- Modify: `docs/06-implementation/accepted-residuals-and-cross-phase-review.md`
- Modify: `docs/06-implementation/ai-build-readiness.md`
- Modify: `docs/06-implementation/documentation-gap-register.md`
- Modify: `docs/06-implementation/session-continuity-notes.md`
- Modify: `docs/06-implementation/current-state.md`

- [ ] **Step 1: Review both add-ons against control rules**

Check for:
- module enablement vs RBAC drift
- School Run vs ordinary ride-booking truth drift
- parcel-tracking vs ride-tracking drift
- proof-of-delivery vs ride-completion drift

- [ ] **Step 2: Refresh accepted residual and readiness docs**

Update only if needed:
- accepted residual review
- AI build readiness
- gap register
- continuity
- current-state

- [ ] **Step 3: Verify repo-level clarity**

Run:
```bash
rg -n "School Run|Parcel|Courier|Logistics" docs/06-implementation docs/01-product docs/03-platform docs/03-services docs/05-frontend
```

Expected: the new add-ons are documented, discoverable, and aligned with the control layer.

- [ ] **Step 4: Commit**

```bash
git add docs/06-implementation/accepted-residuals-and-cross-phase-review.md docs/06-implementation/ai-build-readiness.md docs/06-implementation/documentation-gap-register.md docs/06-implementation/session-continuity-notes.md docs/06-implementation/current-state.md
git commit -m "docs: align addon wave with readiness controls"
```
