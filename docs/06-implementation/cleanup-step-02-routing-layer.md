# Cleanup Step 02 — Routing Layer

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the routing layer.

---

## Files in Scope

```text
backend/src/routes/index.ts
backend/src/routes/index.next.ts
backend/src/routes/index.v3.ts
backend/src/modules/booking/quote.routes.ts
backend/src/modules/booking/quote.routes.v2.ts
backend/src/modules/booking/quote.routes.v3.ts
```

---

## Approved Source Reference

Preferred references:

```text
backend/src/routes/index.v3.ts
backend/src/modules/booking/quote.routes.v3.ts
```

---

## Canonical Targets

```text
backend/src/routes/index.ts
backend/src/modules/booking/booking.routes.ts
```

---

## Canonical Responsibilities

### routes/index.ts
- central route aggregator
- mounts booking routes

### booking.routes.ts
- defines booking endpoints
- connects controller to router

---

## Canonical Routing Plan

Final structure must be:

```text
/api → routes/index.ts
       → /booking → booking.routes.ts
```

---

## Validation Rules

Before reconciliation:

- no duplicate route mounts
- no versioned route chains survive
- booking routes must be single source

---

## Reconciliation Intent

1. analyse index.v3.ts
2. analyse quote.routes.v3.ts
3. map to canonical structure
4. define final routing plan

---

## Blocked Actions

- no route changes
- no file rename
- no deletion

---

## Controlled AI Rule

```text
STOP → REPORT ROUTING PLAN ONLY
```

---

## Completion State

```text
STEP 2: ROUTING PLAN COMPLETE
FILES CHANGED: NONE
NEXT: BOOKING CONTROLLER
```
