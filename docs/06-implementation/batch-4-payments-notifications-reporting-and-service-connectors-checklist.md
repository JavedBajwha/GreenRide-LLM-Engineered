# Batch 4 Payments, Notifications, Reporting, and Service Connectors Checklist

## Purpose

Provide a focused execution checklist for the fourth closure batch in GreenRide's endgame documentation pass.

This checklist exists to reduce the remaining cross-service ambiguity across:
- payments and invoicing
- refunds and financial adjustments
- notification ownership, eventing, channels, and customization
- reporting, exports, analytics, and dashboard-report boundaries
- realtime, maps, geolocation, address, ETA, and connector boundaries
- external notification, CRM, and marketing integrations

---

## Scope

This batch covers the remaining `partial` follow-through in:

- `docs/03-services/payments-and-invoicing.md`
- `docs/03-services/refunds-and-financial-adjustments.md`
- `docs/03-services/notifications-and-integrations.md`
- `docs/03-services/analytics-and-reporting.md`
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`
- `docs/03-services/realtime-system.md`
- `docs/03-services/maps-geolocation-and-address-strategy.md`
- linked frontend reporting and embed docs only where service-boundary clarity requires it

This batch does not redesign the payment, reporting, or notification models.
It is focused on making the existing service-layer contracts more exact and internally aligned.

---

## Ordered Checklist

### 1. Payments and Refund Linkage

- review remaining ambiguity between payment outcome, invoicing, refund review, credit handling, and financial adjustment wording
- verify payment and refund docs stay aligned without collapsing distinct finance outcomes together

Current pass progress:
- payment and refund docs now state more clearly that charge collection, refund review, credit handling, waived/write-off outcomes, and invoice/account settlement correction must remain distinct downstream finance outcomes rather than a generic financial update state

### 2. Notification Event / Channel / Audience Tightening

- review event ownership, event catalog, channel rules, and audience direction together
- tighten areas where transactional, operational, and optional marketing communications could still drift

Current pass progress:
- notification docs now state more clearly that audience eligibility is event-owned, that auth and operational communications cannot be widened casually, and that transactional eligibility does not imply marketing/CRM audience eligibility

### 3. Custom Notification and Integration Boundary Tightening

- review template-scope, approval, and external connector wording
- verify tenant customization and external integrations do not silently redefine business triggers or trust boundaries

Current pass progress:
- notification docs now state more clearly that approval workflow, template variables, and external connectors cannot widen event scope, audience authority, or transactional-event ownership by default

### 4. Reporting / Export / Analytics Boundary Tightening

- review reporting ownership, export visibility, schedule/report boundaries, and metric-source direction
- verify dashboard summaries, reports, observability, and audit remain clearly separated

Current pass progress:
- reporting docs now state more clearly that report-family existence does not by itself grant export, scheduling, or widget-deep-link rights, and that those action layers remain independently controlled even inside the same reporting family

### 5. Realtime / Maps / Address / ETA Boundary Tightening

- review realtime source-of-truth, maps/advisory boundaries, and address/ETA/source wording
- verify transport, mapping, and visibility layers do not silently become business-truth owners

Current pass progress:
- realtime and maps/address docs now state more clearly that ETA, route, address-normalisation, and live-support values remain subordinate support data even when reused in notifications, reporting, or live visibility surfaces

### 6. Cross-Document Alignment Check

- verify no stale contradictions remain across Batch 4 docs
- update tracker, gap register, and continuity notes with honest outcomes

---

## Finish Criteria

Batch 4 can be treated as substantially closed only when:

- payment, refund, and invoicing docs are internally aligned
- notification ownership, event, channel, and customization rules are clearer
- reporting/export/analytics boundaries are tighter
- realtime, maps, address, and connector boundaries are explicit enough to avoid service-layer drift
- remaining uncertainty is explicitly deferred rather than left implicit

---

## Stop Conditions

Stop and clarify before claiming this batch is closed if:

- payment and refund docs still blur charge, refund, credit, or invoice-adjustment outcomes
- transactional notifications and marketing/CRM communication are still blending together
- reporting, observability, dashboard summaries, and exports still contradict each other
- realtime or map layers can still be interpreted as owning business truth

---

## Related Documents

- `docs/06-implementation/final-partial-closure-plan.md`
- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`

---

## Completion Judgment

Batch 4 can now be treated as substantially complete.

Current judgment:
- no blocking contradiction remains across payments, refunds, notifications, reporting, realtime, or maps/address support boundaries
- finance outcomes are now kept distinct enough to avoid generic payment-state drift
- notification event ownership, audience scope, template boundaries, and external integration boundaries are now aligned enough to avoid trust-boundary drift
- reporting, export, scheduling, widget, and source-type boundaries are now aligned enough to avoid reporting-scope drift
- realtime and map/address support layers are now aligned enough to avoid service-support data being treated as stronger business truth

Remaining uncertainty is detail-level and explicitly partial rather than an unresolved structural contradiction.
