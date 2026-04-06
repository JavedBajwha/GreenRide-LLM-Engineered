# Cleanup Step 08 — Deletion Phase Plan

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No file deletion is authorised by this step alone.

---

## Purpose

This document defines the deletion phase plan for exploratory and duplicate files after canonical reconciliation has been completed and validated.

It is part of the controlled AI development system.

Its purpose is to ensure that file deletion happens:
- last
- deliberately
- one file at a time
- only after canonical targets are verified

---

## Preconditions (MANDATORY)

Deletion planning may only move toward execution if ALL are true:

1. cleanup-step-01 through cleanup-step-07 are complete
2. canonical target content has been reconciled conceptually
3. validation pass reports no conflicts
4. human architect explicitly authorises deletion phase execution
5. coding freeze remains active unless separately changed

If any condition is false:

```text
STOP — DO NOT DELETE ANY FILE
```

---

## Core Deletion Principle

Deletion is the **final act** of cleanup.

A file may only be deleted when:
- its responsibility has a surviving canonical owner
- its useful logic has been accounted for
- its canonical replacement is already confirmed
- no other cleanup step depends on it remaining for reference

---

## Deletion Classes

### Class 1 — Delete last, after canonical confirmation

These files are expected to be deleted only after canonical targets are confirmed:

```text
backend/src/app.next.ts
backend/src/app.v2.ts
backend/src/app.v3.ts
backend/src/routes/index.next.ts
backend/src/routes/index.v3.ts
backend/src/modules/booking/quote.routes.ts
backend/src/modules/booking/quote.routes.v2.ts
backend/src/modules/booking/quote.routes.v3.ts
backend/src/modules/booking/quote.controller.ts
backend/src/modules/booking/quote.controller.v2.ts
backend/src/modules/booking/quote.controller.v3.ts
backend/src/modules/booking/quote.service.ts
backend/src/modules/booking/quote.service.v2.ts
backend/src/modules/booking/quote.service.v3.ts
backend/src/modules/booking/quote.schema.ts
backend/src/modules/pricing/pricing.service.v2.ts
backend/src/modules/pricing/distance-estimator.service.ts
```

### Class 2 — Retained canonical files

These files are expected to survive as canonical targets:

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

---

## Deletion Order

Deletion must happen in this exact order:

### Phase A — App and route duplicates
1. app.next.ts
2. app.v2.ts
3. app.v3.ts
4. routes/index.next.ts
5. routes/index.v3.ts
6. quote.routes.ts
7. quote.routes.v2.ts
8. quote.routes.v3.ts

### Phase B — Controller and service duplicates
9. quote.controller.ts
10. quote.controller.v2.ts
11. quote.controller.v3.ts
12. quote.service.ts
13. quote.service.v2.ts
14. quote.service.v3.ts

### Phase C — Schema and pricing duplicates
15. quote.schema.ts
16. pricing.service.v2.ts
17. distance-estimator.service.ts

Deletion must not skip ahead.

---

## Deletion Validation Questions

Before deleting any individual file, the following must be true:

1. Is the canonical replacement already confirmed?
2. Has useful logic from this file been accounted for?
3. Is this file still referenced by any later cleanup step?
4. Would deleting this file create ambiguity about ownership?
5. Has the human architect authorised deletion to proceed?

If any answer is "no" or "unclear":

```text
STOP — DO NOT DELETE THIS FILE
```

---

## One-File Rule

Deletion must happen one file at a time.

After each deletion:
- confirm the expected canonical target still exists conceptually
- confirm no remaining cleanup dependency relied on the deleted file
- only then continue to the next file

Bulk deletion is forbidden.

---

## Rollback Safety Rule

If any deletion step reveals ambiguity, inconsistency, or unresolved dependency:

```text
STOP → REPORT ISSUE → HALT FURTHER DELETION
```

No attempt should be made to continue deleting “the rest” of the files.

---

## Controlled AI Rule

Any AI system must treat this deletion plan as a gated execution artifact only.

It must not:
- delete files before explicit deletion authorisation
- delete multiple files at once
- infer that approval of cleanup planning equals permission to delete

The correct AI behaviour before deletion authorisation is:

```text
STOP → REPORT DELETION PLAN ONLY
```

---

## Completion Condition for Step 8

Step 8 is complete when:

- deletion candidates are fully listed
- deletion order is defined
- validation questions are documented
- no file has been deleted yet

---

## Current Step State

```text
STEP 8: DELETION PLAN COMPLETE
FILES DELETED: NONE
CLEANUP EXECUTION: NOT STARTED
NEXT STEP: HUMAN AUTHORISATION CHECKPOINT
```

---

## Final Rule

This document exists to make deletion the safest and most controlled part of cleanup.

If any future action deletes files outside this order or without these checks, that action must be treated as drift and rejected by the controlled AI development system.

---

## Completion Record

This step was executed on 2026-04-06 as part of the Search & Quote slice implementation.

```text
STATUS: COMPLETE
EXECUTED: 2026-04-06
```
