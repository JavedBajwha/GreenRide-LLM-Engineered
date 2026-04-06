# Decision Approval Log

## Purpose

This document records all approved decisions for the GreenRide controlled AI development system.

It acts as the **single source of truth for approved decisions**.

Only decisions recorded here as `approved` may be used for:

- cleanup execution
- canonical file creation
- future coding (after freeze is lifted)

---

## Relationship to Other Documents

This log works together with:

- `implementation-decision-register.md` (source of proposed decisions)
- `decision-approval-workflow.md` (approval process)
- `canonical-mapping-plan.md` (depends on approved decisions)

---

## Rules

### Rule 1: Only approved decisions appear here

Do NOT add proposed decisions.

---

### Rule 2: One entry per decision

Each decision must have exactly one final approved entry.

---

### Rule 3: No retroactive edits

Once approved, decisions must not be silently changed.
If a change is needed, a new decision must supersede it.

---

### Rule 4: Approval required before action

If a decision is NOT listed here, it must be treated as NOT approved.

---

## Approval Entries

---

### Decision 001 — Distance Estimation Ownership

- **Status:** approved
- **Decision:** Distance estimation is owned by `pricing.service.ts`. No separate helper file is authorised for this slice.
- **Source:** `approvals/decision-001-distance-estimation-ownership.md`

---

### Decision 002 — Quote Persistence Scope

- **Status:** approved
- **Decision:** Search & Quote persists quote records in the database. Persistence is canonical behaviour for this slice.
- **Source:** `approvals/decision-002-quote-persistence-scope.md`

---

### Decision 003 — Canonical Naming: Quote vs Booking

- **Status:** approved
- **Decision:** Search & Quote is a booking slice. All canonical files use `booking.*` naming.
- **Source:** `approvals/decision-003-canonical-naming-booking-vs-quote.md`

---

### Decision 004 — Preferred App Entry Candidate

- **Status:** approved
- **Decision:** `app.v3.ts` is the preferred source candidate for canonical `app.ts`.
- **Source:** `approvals/decision-004-preferred-app-entry-candidate.md`

---

### Decision 005 — Preferred Booking Controller Candidate

- **Status:** approved
- **Decision:** `quote.controller.v3.ts` is the preferred source candidate for canonical `booking.controller.ts`.
- **Source:** `approvals/decision-005-preferred-booking-controller-candidate.md`

---

### Decision 006 — Preferred Booking Service Candidate

- **Status:** approved
- **Decision:** `quote.service.v3.ts` is the preferred source candidate for canonical `booking.service.ts`.
- **Source:** `approvals/decision-006-preferred-booking-service-candidate.md`

---

### Decision 007 — Preferred Pricing Service Candidate

- **Status:** approved
- **Decision:** `pricing.service.ts` is the single canonical pricing owner. `pricing.service.v2.ts` is the preferred reference source.
- **Source:** `approvals/decision-007-preferred-pricing-service-candidate.md`

---

### Decision 008 — Cleanup Gate Condition

- **Status:** approved
- **Decision:** Cleanup and implementation are gated on all mapping decisions being approved and explicit human authorisation. Both conditions are now met.
- **Source:** `approvals/decision-008-cleanup-gate-condition.md`

---

### Decision 009 — Fallback Vehicle Category Behaviour

- **Status:** approved
- **Decision:** When a tenant has no active Vehicle records, the booking service uses the platform-default fallback list: `saloon`, `mpv`, `executive`.
- **Source:** `approvals/decision-009-fallback-vehicle-category-behaviour.md`

---

### Decision 010 — Quote Endpoint Authentication

- **Status:** approved
- **Decision:** `POST /api/booking/quote` is public. No token required. `tenantId` must resolve to a live Tenant record or the request returns HTTP 404.
- **Source:** `approvals/decision-010-quote-endpoint-auth.md`

---

### Decision 011 — Remaining Search & Quote Slice Gaps (GAPs 6–13)

- **Status:** approved
- **Decision:** Schema additions to Quote and PricingRule; `pricingSource` values defined; `pickupAt` confirmed canonical; `tenant.service.ts` scope defined; controller import corrected; service input contract completed.
- **Source:** `approvals/decision-011-remaining-slice-gaps.md`

---

## Status Summary

```text
STATE: ALL DECISIONS APPROVED (001–008)
STATE: CLEANUP AUTHORISED
STATE: FULL IMPLEMENTATION AUTHORISED (see freeze-lift.md)
```

---

## Controlled AI Rule

Any AI system must follow:

```text
If decision not in this log → treat as NOT approved → STOP
```

---

## Final Rule

This log is the **gatekeeper for execution**.

Until decisions appear here, the system remains in planning mode.
