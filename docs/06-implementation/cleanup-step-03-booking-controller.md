# Cleanup Step 03 — Booking Controller

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the booking controller layer.

It ensures controller cleanup is deterministic, bounded, and aligned with the approved Search & Quote specification.

---

## Files in Scope

```text
backend/src/modules/booking/quote.controller.ts
backend/src/modules/booking/quote.controller.v2.ts
backend/src/modules/booking/quote.controller.v3.ts
```

---

## Approved Source Reference

Per approved Decision 005, the preferred source candidate is:

```text
backend/src/modules/booking/quote.controller.v3.ts
```

This file is the primary reference source for eventual reconciliation into canonical `backend/src/modules/booking/booking.controller.ts`.

This does **not** mean `quote.controller.v3.ts` becomes canonical by itself.

---

## Canonical Target

The only allowed final target for the controller layer is:

```text
backend/src/modules/booking/booking.controller.ts
```

No alternate controller file may survive cleanup.

---

## Canonical Responsibility of booking.controller.ts

The canonical `booking.controller.ts` file is allowed to own only the following responsibilities:

- receive the HTTP request body
- validate request payload using canonical schema ownership
- call canonical booking service
- map success response to the canonical Search & Quote response shape
- map validation failures to HTTP 400
- map unexpected failures to HTTP 500

It must not own:

- pricing calculations
- Prisma queries
- vehicle discovery logic
- route mounting
- schema definitions
- versioned controller variants
- ad hoc response formats outside the canonical spec

---

## Canonical Controller Structure Plan

The reconciled `booking.controller.ts` must structurally contain only:

1. imports for request/response boundary types
2. import for canonical booking schema
3. import for canonical booking service
4. controller function for Search & Quote request handling
5. validation failure mapping
6. unexpected failure mapping
7. canonical success response mapping

No exploratory naming, version suffixes, or temporary response variants may survive.

---

## Controller Validation Questions

Before reconciliation is executed, the following must be true:

1. the preferred source follows the approved success/error response pattern
2. validation happens at controller boundary rather than service boundary
3. controller delegates quote generation to service rather than implementing business logic directly
4. controller does not own price calculation
5. controller does not depend on non-canonical file names in the final result

If any answer is unclear, cleanup must stop.

---

## Reconciliation Intent

During actual cleanup execution, the process for controller layer must be:

1. inspect legacy controller file
2. inspect `quote.controller.v2.ts` as secondary candidate
3. inspect `quote.controller.v3.ts` as approved preferred source
4. compare preferred source with canonical Search & Quote spec
5. define final canonical `booking.controller.ts` content plan
6. verify controller contains controller-only responsibilities
7. only after verification, authorise canonical replacement in a later explicit action

Deletion of exploratory controller variants must happen only after canonical `booking.controller.ts` is confirmed and later cleanup steps succeed.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- creating `booking.controller.ts`
- replacing any existing file
- deleting any controller variant
- changing service behaviour
- changing schema ownership
- changing response shape

---

## Controlled AI Rule

Any AI system must treat this document as controller-layer verification guidance only.

If asked to modify controller files before later confirmation, the correct behaviour is:

```text
STOP → REPORT CONTROLLER PLAN ONLY
```

---

## Completion Condition for Step 3

Step 3 is complete when:

- canonical controller responsibility is documented
- preferred controller source is identified
- blocked actions are preserved
- no controller file has been changed yet

---

## Current Step State

```text
STEP 3: BOOKING CONTROLLER PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: BOOKING SERVICE PLAN
```

---

## Completion Record

This step was executed on 2026-04-06 as part of the Search & Quote slice implementation.

```text
STATUS: COMPLETE
EXECUTED: 2026-04-06
```
