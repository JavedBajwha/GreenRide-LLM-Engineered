# Cleanup Step 05 — Booking Schema

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the booking schema layer.

It ensures schema cleanup is deterministic, bounded, and aligned with the approved Search & Quote specification, request contract, and persistence scope.

---

## Files in Scope

```text
backend/src/modules/booking/quote.schema.ts
```

At the current exploratory stage, only one schema source file is known for this slice.

Even so, this step remains necessary because canonical naming requires:

```text
backend/src/modules/booking/booking.schema.ts
```

---

## Approved Source Reference

Per the canonical mapping and approved naming direction, the preferred source candidate is:

```text
backend/src/modules/booking/quote.schema.ts
```

This file is the primary reference source for eventual reconciliation into canonical `backend/src/modules/booking/booking.schema.ts`.

This does **not** mean `quote.schema.ts` becomes canonical by itself.

---

## Canonical Target

The only allowed final target for the schema layer is:

```text
backend/src/modules/booking/booking.schema.ts
```

No alternate schema file may survive cleanup.

---

## Canonical Responsibility of booking.schema.ts

The canonical `booking.schema.ts` file is allowed to own only the following responsibilities:

- define the canonical Search & Quote request validation schema
- define canonical inferred input types derived from that schema
- preserve default field rules already approved in the canonical specification

It must not own:

- Prisma access
- pricing calculations
- controller logic
- service orchestration
- route definitions
- response formatting logic
- versioned schema variants

---

## Canonical Schema Structure Plan

The reconciled `booking.schema.ts` must structurally contain only:

1. validation library import(s)
2. canonical request schema definition for Search & Quote
3. canonical inferred input type(s)
4. no unrelated runtime logic

No exploratory naming, version suffixes, embedded business logic, or controller/service imports may survive.

---

## Canonical Request Contract Alignment

The reconciled schema must remain aligned to the approved Search & Quote canonical specification.

That means the schema must support the canonical request fields:

```json
{
  "tenantId": "uuid",
  "pickupLocation": "string",
  "dropoffLocation": "string",
  "pickupAt": "ISO-8601 datetime string",
  "tripType": "one_way | return_trip | hourly | multi_stop",
  "passengerCount": 1,
  "luggageCount": 0,
  "vehicleCategory": "optional"
}
```

If the exploratory schema differs from this contract, the canonical Search & Quote spec wins.

---

## Schema Validation Questions

Before reconciliation is executed, the following must be true:

1. the approved source validates all required canonical request fields
2. default values remain aligned to the canonical Search & Quote spec
3. schema does not own any business logic
4. schema does not depend on controller or service imports
5. final naming can move cleanly from `quote.schema.ts` to `booking.schema.ts`

If any answer is unclear, cleanup must stop.

---

## Persistence Alignment Rule

Approved Decision 002 confirms that quote persistence remains in scope.

However, persistence scope does not expand schema ownership.

That means canonical schema still validates request shape only.
It does not validate persistence implementation details unless those are part of the input contract.

---

## Reconciliation Intent

During actual cleanup execution, the process for schema layer must be:

1. inspect `quote.schema.ts`
2. compare schema fields to canonical Search & Quote request contract
3. confirm defaults remain aligned to approved spec
4. confirm schema is validation-only
5. define final canonical `booking.schema.ts` content plan
6. only after verification, authorise canonical replacement in a later explicit action

Deletion of `quote.schema.ts` must happen only after canonical `booking.schema.ts` is confirmed and later cleanup steps succeed.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- creating `booking.schema.ts`
- replacing any existing file
- deleting `quote.schema.ts`
- changing request contract
- adding response validation ownership to schema
- adding business logic into schema

---

## Controlled AI Rule

Any AI system must treat this document as schema-layer verification guidance only.

If asked to modify schema files before later confirmation, the correct behaviour is:

```text
STOP → REPORT SCHEMA PLAN ONLY
```

---

## Completion Condition for Step 5

Step 5 is complete when:

- canonical schema responsibility is documented
- preferred schema source is identified
- canonical request contract alignment is preserved
- blocked actions remain preserved
- no schema file has been changed yet

---

## Current Step State

```text
STEP 5: BOOKING SCHEMA PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: PRICING SERVICE PLAN
```

---

## Completion Record

This step was executed on 2026-04-06 as part of the Search & Quote slice implementation.

```text
STATUS: COMPLETE
EXECUTED: 2026-04-06
```
