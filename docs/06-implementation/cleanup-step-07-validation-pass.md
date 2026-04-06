# Cleanup Step 07 — Validation Pass

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the global validation pass required before any cleanup action can move from planning into actual execution.

It ensures the controlled AI development system verifies the entire Search & Quote backend slice as one unified structure before any file is reconciled or removed.

---

## Scope

This validation pass covers all previously planned cleanup steps:

1. app layer
2. routing layer
3. booking controller layer
4. booking service layer
5. booking schema layer
6. pricing service layer

This step does not introduce new technical scope.
It validates that the already-defined scope is internally consistent.

---

## Preconditions

This validation pass may be considered complete only if all of the following exist:

- `cleanup-step-01-app-layer.md`
- `cleanup-step-02-routing-layer.md`
- `cleanup-step-03-booking-controller.md`
- `cleanup-step-04-booking-service.md`
- `cleanup-step-05-booking-schema.md`
- `cleanup-step-06-pricing-service.md`
- `canonical-cleanup-mapping.md`
- `search-and-quote-canonical-spec.md`
- all required decision approvals

If any item is missing, validation cannot complete.

---

## Validation Goals

The validation pass must confirm:

1. every canonical target has one and only one final responsibility
2. no canonical target depends on a forbidden versioned file in final structure
3. all exploratory sources are accounted for in the cleanup mapping
4. approved decisions are reflected consistently in each cleanup step
5. the Search & Quote canonical spec remains the highest functional authority
6. cleanup can proceed without introducing structural ambiguity

---

## Global Validation Checks

### Check 1 — Canonical target coverage

Confirm the following canonical targets are fully represented across the cleanup plan:

```text
backend/src/app.ts
backend/src/routes/index.ts
backend/src/modules/booking/booking.routes.ts
backend/src/modules/booking/booking.controller.ts
backend/src/modules/booking/booking.service.ts
backend/src/modules/booking/booking.schema.ts
backend/src/modules/pricing/pricing.service.ts
backend/src/lib/prisma.ts
```

No canonical target may be missing from the cleanup plan.

---

### Check 2 — Duplicate ownership elimination

Confirm no final responsibility is still split across multiple future canonical files.

Examples that must be true:
- app ownership exists only in `app.ts`
- routing ownership exists only in `routes/index.ts` and `booking.routes.ts`
- controller ownership exists only in `booking.controller.ts`
- service ownership exists only in `booking.service.ts`
- schema ownership exists only in `booking.schema.ts`
- pricing ownership exists only in `pricing.service.ts`

If any ownership remains duplicated conceptually, cleanup must stop.

---

### Check 3 — Decision alignment

Confirm the cleanup plan reflects all approved decisions:

- Decision 001 — distance stays inside pricing ownership
- Decision 002 — quote persistence remains in scope
- Decision 003 — booking.* naming is canonical
- Decision 004 — app.v3.ts is preferred app reference
- Decision 005 — quote.controller.v3.ts is preferred controller reference
- Decision 006 — quote.service.v3.ts is preferred service reference
- Decision 007 — pricing.service.ts is canonical pricing owner
- Decision 008 — cleanup requires explicit human authorisation

If any cleanup step conflicts with an approved decision, cleanup must stop.

---

### Check 4 — Canonical spec alignment

Confirm every cleanup step remains aligned with the canonical Search & Quote specification, especially:

- route path remains canonical
- request schema remains canonical
- response shape remains canonical
- pricing ownership remains external to booking service
- controller remains HTTP-only
- schema remains validation-only

If any cleanup plan drifts from the canonical spec, cleanup must stop.

---

### Check 5 — Versioned file survivability

Confirm all versioned and exploratory files are classified as:

- preferred source reference
- secondary reference
- legacy/delete-after-reconciliation

No versioned or exploratory file may remain undefined in the cleanup model.

If any such file is unclassified, cleanup must stop.

---

### Check 6 — Blocked actions preserved

Confirm every cleanup step still explicitly blocks:

- overwrite without later confirmation
- deletion before reconciliation
- renaming before canonical validation
- coding or feature expansion

If any step weakens these protections, validation fails.

---

## Validation Outcome States

The result of this step may only be one of:

### State A — Validation complete

All checks pass.
The system may move to the deletion-phase planning step, but still may not delete files unless explicitly authorised later.

### State B — Validation blocked

One or more checks fail.
Cleanup execution must not proceed until the issue is resolved in documentation first.

---

## Reconciliation Readiness Rule

Even if validation is complete, this does not mean cleanup actions happen immediately.

It means only:

```text
The cleanup plan is structurally ready for controlled execution.
```

Deletion, overwrite, or canonical file creation still require a later explicit step.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- deleting any file
- overwriting any canonical target
- renaming exploratory files
- implementing reconciled runtime code
- lifting coding freeze

---

## Controlled AI Rule

Any AI system must treat this document as a global consistency check only.

If asked to begin cleanup before this validation is complete and confirmed, the correct behaviour is:

```text
STOP → REPORT VALIDATION STATUS ONLY
```

---

## Completion Condition for Step 7

Step 7 is complete when:

- all cleanup steps are covered
- all approved decisions are reflected consistently
- no duplicate ownership remains in the planned structure
- no validation conflict is detected
- no runtime file has been changed yet

---

## Current Step State

```text
STEP 7: VALIDATION PASS PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: DELETION PHASE PLAN
```
