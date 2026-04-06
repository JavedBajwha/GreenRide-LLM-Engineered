# Repository Cleanup Status

## Purpose

Identify which files are valid and which must be ignored.

---

## Current Situation

Multiple exploratory files were created:

- app.next.ts
- app.v2.ts
- app.v3.ts
- quote.controller.v2.ts
- quote.controller.v3.ts
- quote.routes.v2.ts
- quote.routes.v3.ts
- quote.service.v2.ts
- quote.service.v3.ts

These are NOT canonical.

---

## Canonical Decision

Only ONE version must survive per responsibility.

---

## Action Plan (DO NOT CODE YET)

### Phase 1 – Selection

We will decide:

- which controller version is final
- which service version is final
- which pricing version is final

---

### Phase 2 – Mapping

Map selected versions into canonical structure:

```
booking.controller.ts
booking.service.ts
pricing.service.ts
```

---

### Phase 3 – Removal (later)

After confirmation:

- delete all v2/v3/next files
- keep only canonical files

---

## Important Rule

Do NOT delete anything yet.

Deletion only happens after:

- structure is locked
- specs are complete
- mapping is confirmed

---

## Current Status

```
STATE: DRIFT IDENTIFIED
STATE: CLEANUP IN PROGRESS
STATE: CODING FROZEN
```
