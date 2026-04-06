# Cleanup Step 04 — Booking Service

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the booking service layer.

It ensures service cleanup is deterministic, bounded, and aligned with the approved Search & Quote specification, pricing ownership rules, and quote persistence decision.

---

## Files in Scope

```text
backend/src/modules/booking/quote.service.ts
backend/src/modules/booking/quote.service.v2.ts
backend/src/modules/booking/quote.service.v3.ts
```

---

## Approved Source Reference

Per approved Decision 006, the preferred source candidate is:

```text
backend/src/modules/booking/quote.service.v3.ts
```

This file is the primary reference source for eventual reconciliation into canonical `backend/src/modules/booking/booking.service.ts`.

This does **not** mean `quote.service.v3.ts` becomes canonical by itself.

---

## Canonical Target

The only allowed final target for the service layer is:

```text
backend/src/modules/booking/booking.service.ts
```

No alternate service file may survive cleanup.

---

## Canonical Responsibility of booking.service.ts

The canonical `booking.service.ts` file is allowed to own only the following responsibilities:

- orchestrate Search & Quote flow after validated input is received
- determine the set of eligible vehicle categories for the tenant, if that behaviour remains approved and documented
- call canonical pricing ownership for each allowed category
- create quote records if quote persistence remains in scope
- return canonical quote result objects for controller mapping

It must not own:

- raw Express request handling
- direct HTTP response creation
- request schema definitions
- pricing formula ownership
- route mounting
- versioned service variants
- undocumented fallback behaviour outside approved decisions and canonical spec

---

## Canonical Service Structure Plan

The reconciled `booking.service.ts` must structurally contain only:

1. imports for canonical pricing service and Prisma access, if persistence remains in scope
2. a single canonical quote generation orchestration function
3. controlled category resolution logic, only if approved and documented
4. optional quote persistence logic, only because persistence is approved
5. canonical quote result return structure for controller usage

No exploratory version suffixes, duplicated orchestration functions, or embedded pricing ownership may survive.

---

## Service Validation Questions

Before reconciliation is executed, the following must be true:

1. the preferred source delegates pricing to canonical pricing ownership rather than embedding formulas directly
2. quote persistence behaviour aligns with approved Decision 002
3. service output can be mapped cleanly to the canonical Search & Quote response schema
4. service does not own HTTP request parsing or Express response objects
5. service does not introduce alternate route or controller assumptions
6. any fallback vehicle-category behaviour is either already approved or clearly flagged for decision

If any answer is unclear, cleanup must stop.

---

## Category Resolution Rule

Service may determine vehicle categories only within approved boundaries.

Because canonical Search & Quote spec states that fallback category behaviour must not be invented silently, reconciliation must verify one of the following before service cleanup is executed:

- category resolution is fully derived from approved tenant vehicle data, or
- fallback category behaviour is separately approved and documented

If this is not true, cleanup must stop and report the blocked condition.

---

## Persistence Rule

Approved Decision 002 confirms quote persistence remains in scope.

That means canonical `booking.service.ts` may include quote record creation through Prisma.

However, persistence logic must remain limited to quote creation for the approved slice and must not silently expand into booking confirmation or unrelated workflow persistence.

---

## Reconciliation Intent

During actual cleanup execution, the process for service layer must be:

1. inspect legacy service file
2. inspect `quote.service.v2.ts` as secondary candidate
3. inspect `quote.service.v3.ts` as approved preferred source
4. compare preferred source with canonical Search & Quote spec
5. verify pricing ownership remains external to service
6. verify quote persistence aligns with approved scope
7. define final canonical `booking.service.ts` content plan
8. only after verification, authorise canonical replacement in a later explicit action

Deletion of exploratory service variants must happen only after canonical `booking.service.ts` is confirmed and later cleanup steps succeed.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- creating `booking.service.ts`
- replacing any existing file
- deleting any service variant
- changing pricing ownership
- changing persistence scope
- changing controller contract
- inventing new fallback category logic

---

## Controlled AI Rule

Any AI system must treat this document as service-layer verification guidance only.

If asked to modify service files before later confirmation, the correct behaviour is:

```text
STOP → REPORT SERVICE PLAN ONLY
```

---

## Completion Condition for Step 4

Step 4 is complete when:

- canonical service responsibility is documented
- preferred service source is identified
- persistence and pricing boundaries are preserved
- blocked actions remain preserved
- no service file has been changed yet

---

## Current Step State

```text
STEP 4: BOOKING SERVICE PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: BOOKING SCHEMA PLAN
```

---

## Completion Record

This step was executed on 2026-04-06 as part of the Search & Quote slice implementation.

```text
STATUS: COMPLETE
EXECUTED: 2026-04-06
```
