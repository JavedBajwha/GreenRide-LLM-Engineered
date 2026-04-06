# Cleanup Execution Checklist

## Purpose

This document converts the canonical cleanup mapping into a strict, step-by-step execution checklist.

It ensures cleanup is:
- controlled
- reversible (mentally verified before action)
- non-destructive until explicitly confirmed

This document does **not** start cleanup.
It only defines how cleanup must be executed when authorised.

---

## Preconditions (MANDATORY)

Cleanup execution may only begin if ALL are true:

- Decision 001–008 are approved
- canonical-cleanup-mapping.md exists and is complete
- no unresolved decisions remain
- human architect explicitly says: "Start cleanup phase"

If ANY condition is false:

```text
STOP — DO NOT EXECUTE CLEANUP
```

---

## Execution Principles

### Principle 1 — No bulk actions

Never delete or overwrite multiple files at once.

---

### Principle 2 — One file at a time

Each file must be processed independently.

---

### Principle 3 — Verify before modify

No file is changed before its content is reviewed against the canonical spec.

---

### Principle 4 — Deletion is LAST

Files are only deleted after:
- canonical file exists
- logic is verified
- duplication is eliminated

---

### Principle 5 — No assumption

If any uncertainty exists:

```text
STOP → REPORT → WAIT FOR INSTRUCTION
```

---

## Execution Order

Cleanup must follow this exact sequence:

```text
STEP 1 → app layer
STEP 2 → routing layer
STEP 3 → booking controller
STEP 4 → booking service
STEP 5 → booking schema
STEP 6 → pricing service
STEP 7 → validation pass
STEP 8 → deletion phase
```

No deviation allowed.

---

## Step-by-Step Checklist

---

### STEP 1 — App Layer

- review: app.ts, app.v3.ts, app.v2.ts, app.next.ts
- confirm: app.v3.ts is best source
- define: canonical app.ts content plan
- DO NOT overwrite yet

---

### STEP 2 — Routing Layer

- review all index routes
- confirm preferred source
- define canonical routes/index.ts

---

### STEP 3 — Booking Controller

- review all quote.controller.* files
- confirm v3 as base
- identify missing logic (if any)
- define canonical booking.controller.ts

---

### STEP 4 — Booking Service

- review all quote.service.* files
- confirm v3 as base
- verify pricing integration
- define canonical booking.service.ts

---

### STEP 5 — Booking Schema

- review quote.schema.ts
- map to booking.schema.ts
- confirm alignment with persistence decision

---

### STEP 6 — Pricing Service

- review pricing.service.ts and v2
- review distance-estimator
- merge logic conceptually into one pricing owner

---

### STEP 7 — Validation Pass

Before ANY deletion:

- ensure no duplicate responsibility remains
- ensure all canonical files are defined
- ensure naming rules are followed

If any issue:

```text
STOP — DO NOT PROCEED
```

---

### STEP 8 — Deletion Phase

ONLY after validation:

- mark files for deletion
- confirm with human
- delete ONE file at a time

---

## Blocked Actions During Execution

Even during cleanup:

- no new features
- no refactoring beyond mapping
- no optimisation
- no schema redesign

---

## Controlled AI Rule

AI must behave as follows:

```text
FOLLOW CHECKLIST EXACTLY
NO SHORTCUTS
NO ASSUMPTIONS
```

---

## Status

```text
STATE: CLEANUP EXECUTION PLAN READY
STATE: EXECUTION NOT STARTED
STATE: WAITING FOR HUMAN AUTHORISATION
```

---

## Final Rule

If this checklist is not followed exactly, the cleanup must be treated as invalid and rolled back conceptually.
