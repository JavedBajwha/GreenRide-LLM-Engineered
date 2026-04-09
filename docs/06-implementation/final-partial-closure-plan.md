# Final Partial Closure Plan

## Purpose

Turn the remaining `partial` documentation work into a finishable closing sequence instead of an open-ended refinement backlog.

This document groups the remaining follow-through into a small number of execution batches so GreenRide can move from:
- structurally documented

to:
- implementation-safer
- better cross-linked
- more honest about what is still undecided

---

## Current Baseline

Current gap-register state:
- `65` total gaps
- `65` `partial`
- `0` `low`
- `0` `weak`
- `0` `missing`

This means GreenRide is no longer blocked by missing domain shape or missing external inputs.

The remaining work is now:
- exact matrices
- exact constants and thresholds
- exact provider and connector choices
- deeper page-family and screen-family behavior
- deeper implementation-detail linkage between already-approved contracts

---

## Working Rule

This plan is not a license to mark everything complete quickly.

A batch may only be treated as substantially closed when:
- the canonical docs in that batch are internally aligned
- the biggest trust-sensitive ambiguities are reduced
- remaining uncertainty is explicit and acceptable
- the tracker, gap register, and readiness docs are updated honestly

---

## Closure Batches

### Batch 1 — Trust and Control Detail

Goal:
- reduce remaining ambiguity in the platform trust boundary

Main gaps:
- `GAP-001` Auth
- `GAP-002` RBAC
- `GAP-003` Multi-tenancy
- `GAP-004` Security
- `GAP-005` Audit logging
- `GAP-006` Application logging / observability
- `GAP-043` Security incident and emergency controls
- `GAP-045` Superadmin vs platform-ops responsibility split

Main finish criteria:
- exact role and authority linkage is clearer across auth, RBAC, routes, and ops
- retention/visibility/storage direction is consistent across audit and logs
- remaining trust-sensitive constants and policy edges are explicit

Why first:
- these contracts are foundational and cross-cutting
- they influence almost every later implementation decision

### Batch 2 — Booking and Pricing Commitment Detail

Goal:
- finish the commitment rules that decide when a quote becomes a booking and what pricing/consent rules govern that transition

Main gaps:
- `GAP-009` Booking lifecycle
- `GAP-021` Pricing and fare behavior
- `GAP-022` Route selection and vehicle eligibility
- `GAP-030` Booking forms and agreements
- `GAP-052` Booking creation and confirmation
- `GAP-053` Booking amendments and cancellations
- `GAP-066` Agreement and payment-consent follow-through
- `GAP-067` Quote expiry follow-through
- `GAP-068` Zone and area pricing follow-through
- `GAP-069` Price structure configuration follow-through
- `GAP-070` Custom routes and saved locations follow-through

Main finish criteria:
- pricing precedence is clearer
- quote-expiry and revalidation behavior is exact enough to build safely
- consent requirements by booking/payment path are explicit enough to audit
- amendment/cancellation/refund-sensitive edges are linked cleanly

Why second:
- this is the main product trust boundary
- it affects booking safety, payment handling, dispatch expectations, and tenant configuration

### Batch 3 — Driver, Dispatch, and Live Operations Detail

Goal:
- tighten the operational behavior around allocation, dispatch, stale data, degraded mode, and live-state trust

Main gaps:
- `GAP-010` Driver lifecycle
- `GAP-023` Driver allocation and live location
- `GAP-024` Dispatch logic
- `GAP-025` Dispatch dashboard behavior
- `GAP-027` Driver navigation and degraded connectivity
- `GAP-028` Vehicle and fleet management
- `GAP-054` Dispatch ranking and degraded fallback
- `GAP-055` Zone / geofence / custom location management

Main finish criteria:
- freshness, reassignment, and degraded-mode rules are clearer
- driver/dispatch/vehicle interactions are better aligned
- live operational state is less likely to drift into undocumented behavior

Why third:
- this batch depends on booking and pricing being stable enough
- it also feeds the frontend ops detail later

### Batch 4 — Payments, Notifications, Reporting, and Service Connectors

Goal:
- finish the broad cross-service matrices that affect trust, communications, exports, and external integrations

Main gaps:
- `GAP-011` Payments and invoicing
- `GAP-012` Notifications and integrations
- `GAP-013` Realtime
- `GAP-014` Maps and geolocation
- `GAP-019` Reporting and exports
- `GAP-029` Analytics and reporting boundaries
- `GAP-031` Refunds and financial adjustments
- `GAP-032` Maps / geolocation / ETA / address strategy
- `GAP-033` Payment methods and currency strategy
- `GAP-034` Notification integrations and external embeds
- `GAP-062` Notification event catalog follow-through
- `GAP-063` Notification channel-matrix follow-through
- `GAP-064` Custom notification follow-through
- `GAP-065` Marketing and CRM integration follow-through

Main finish criteria:
- payment, refund, and invoicing rules align cleanly
- reporting visibility/export/schedule matrices are tighter
- notification event/channel/audience logic is deeper and less inferential
- provider/connectors are either chosen or explicitly deferred

Why fourth:
- these are broad service-layer contracts that sit on top of the stronger product and ops foundations

### Batch 5 — Frontend Page-Family and UX Detail

Goal:
- convert the current frontend shape into more implementation-safe page-family and state-handling detail

Main gaps:
- `GAP-007` Role-based UI separation
- `GAP-008` Frontend route inventory
- `GAP-020` UI shell and navigation
- `GAP-026` Customer booking tracking and visibility
- `GAP-035` Dashboard widgets and embeddable UI
- `GAP-036` Theme, branding, and responsive layout
- `GAP-037` WordPress and WPML compatibility stance
- `GAP-049` Platform Ops Console surface
- `GAP-050` Per-surface UI contracts
- `GAP-058` Shared app shell ownership
- `GAP-059` Dashboard layout and customization model
- `GAP-060` Module-aware UI and route gating
- `GAP-071` Surface state handling and degraded UI follow-through
- `GAP-015` Frontend scaffold contract
- `GAP-048` AI-assisted branding and theme recommendation

Main finish criteria:
- deeper page-family behavior is explicit
- state handling is clearer across stale, degraded, empty, blocked, and partial-data cases
- widget, shell, route, and visual-contract linkage is tighter
- WordPress/embed/UI-asset alignment is more precise where mockups exist

Why fifth:
- most frontend structure already exists
- the remaining work is deeper page-family and interaction detail, not system shape

### Batch 6 — Final Validation and Readiness Detail

Goal:
- close the remaining ambiguity around evidence, seed/reset behavior, readiness criteria, and implementation-safe claims

Main gaps:
- `GAP-016` Testing strategy
- `GAP-017` Seed/demo data
- `GAP-018` Final AI readiness gate
- `GAP-051` Operational readiness checks

Main finish criteria:
- test evidence expectations are stronger by slice
- reset/dataset/tooling detail is explicit enough for repeatable validation
- readiness language is tied to real evidence instead of generic confidence

Why last:
- this batch depends on the other domains being stable enough to validate honestly

---

## Recommended Execution Order

1. Batch 1 — Trust and Control Detail
2. Batch 2 — Booking and Pricing Commitment Detail
3. Batch 3 — Driver, Dispatch, and Live Operations Detail
4. Batch 4 — Payments, Notifications, Reporting, and Service Connectors
5. Batch 5 — Frontend Page-Family and UX Detail
6. Batch 6 — Final Validation and Readiness Detail

Reasoning:
- this order follows dependency strength
- it reduces trust-sensitive ambiguity before UX/detail polish
- it keeps the final readiness pass honest instead of premature

---

## Practical Meaning

GreenRide is now in an endgame state where:
- foundations are largely documented
- major structural gaps are gone
- the remaining work is still real, but it is batchable

This is the right point to stop thinking in terms of “missing phases” and start thinking in terms of:
- closure batches
- accepted residuals
- evidence-backed readiness

---

## Related Documents

- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/accepted-residuals-and-cross-phase-review.md`
- `docs/06-implementation/ai-build-readiness.md`
