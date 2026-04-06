# Canonical Cleanup Mapping

## Purpose

This document defines the exact cleanup mapping from exploratory files to canonical targets for the Search & Quote backend slice.

It is part of the controlled AI development system.

This document is planning only.
It does **not** authorise file deletion, overwrite, rename, or coding by itself.

---

## Preconditions

This mapping may be used only because the following are already true:

- core implementation decisions are approved
- canonical backend structure is locked
- canonical Search & Quote specification exists
- coding freeze remains active
- cleanup is recognised as a separate phase requiring explicit authorisation

If any of these conditions stop being true, this mapping must not be used for execution.

---

## Canonical Targets

Only these files may exist as final canonical targets for this slice:

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

## Mapping Table

| Current file | Canonical target | Mapping status | Cleanup action later |
|---|---|---|---|
| `backend/src/app.ts` | `backend/src/app.ts` | existing canonical placeholder | reconcile with approved preferred source |
| `backend/src/app.next.ts` | `backend/src/app.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/app.v2.ts` | `backend/src/app.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/app.v3.ts` | `backend/src/app.ts` | approved preferred source | use as primary reference during reconciliation |
| `backend/src/routes/index.ts` | `backend/src/routes/index.ts` | existing canonical placeholder | reconcile with approved preferred source |
| `backend/src/routes/index.next.ts` | `backend/src/routes/index.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/routes/index.v3.ts` | `backend/src/routes/index.ts` | preferred reference candidate | use as reference during reconciliation |
| `backend/src/modules/booking/quote.routes.ts` | `backend/src/modules/booking/booking.routes.ts` | legacy candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.routes.v2.ts` | `backend/src/modules/booking/booking.routes.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.routes.v3.ts` | `backend/src/modules/booking/booking.routes.ts` | preferred reference candidate | use as reference during reconciliation |
| `backend/src/modules/booking/quote.controller.ts` | `backend/src/modules/booking/booking.controller.ts` | legacy candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.controller.v2.ts` | `backend/src/modules/booking/booking.controller.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.controller.v3.ts` | `backend/src/modules/booking/booking.controller.ts` | approved preferred source | use as primary reference during reconciliation |
| `backend/src/modules/booking/quote.service.ts` | `backend/src/modules/booking/booking.service.ts` | legacy candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.service.v2.ts` | `backend/src/modules/booking/booking.service.ts` | non-canonical candidate | delete after reconciliation |
| `backend/src/modules/booking/quote.service.v3.ts` | `backend/src/modules/booking/booking.service.ts` | approved preferred source | use as primary reference during reconciliation |
| `backend/src/modules/booking/quote.schema.ts` | `backend/src/modules/booking/booking.schema.ts` | approved preferred source | rename/reconcile into canonical schema target |
| `backend/src/modules/pricing/pricing.service.ts` | `backend/src/modules/pricing/pricing.service.ts` | canonical target | retain as final pricing owner |
| `backend/src/modules/pricing/pricing.service.v2.ts` | `backend/src/modules/pricing/pricing.service.ts` | approved preferred reference | fold approved logic into canonical target during reconciliation |
| `backend/src/modules/pricing/distance-estimator.service.ts` | `backend/src/modules/pricing/pricing.service.ts` | non-canonical reference only | fold useful logic into pricing service, then delete |
| `backend/src/lib/prisma.ts` | `backend/src/lib/prisma.ts` | canonical target | retain |

---

## Cleanup Classes

### Class A — Canonical targets
These files are allowed to survive:
- `app.ts`
- `routes/index.ts`
- `booking.routes.ts`
- `booking.controller.ts`
- `booking.service.ts`
- `booking.schema.ts`
- `pricing.service.ts`
- `prisma.ts`

### Class B — Preferred source files
These files are reference sources for future consolidation:
- `app.v3.ts`
- `quote.controller.v3.ts`
- `quote.service.v3.ts`
- `pricing.service.v2.ts`
- `quote.schema.ts`

### Class C — Secondary candidates
These may be inspected only if preferred sources are incomplete:
- `app.next.ts`
- `app.v2.ts`
- `routes/index.next.ts`
- `quote.routes.v2.ts`
- `quote.controller.v2.ts`
- `quote.service.v2.ts`

### Class D — Legacy / delete-after-reconciliation
These are not expected to survive cleanup:
- `quote.routes.ts`
- `quote.controller.ts`
- `quote.service.ts`
- any remaining versioned exploratory file after canonical reconciliation

---

## Cleanup Execution Rules

When cleanup is later authorised, execution must follow this order:

1. create canonical target content plan
2. reconcile source logic into canonical target files
3. verify each canonical target against canonical spec
4. verify no responsibility is duplicated
5. only then mark exploratory source files for deletion
6. perform deletions last

No other order is allowed.

---

## Reconciliation Rules

### Rule 1: Preserve canonical names
The cleanup phase must not preserve `quote.*`, `v2`, `v3`, or `next` as final names.

### Rule 2: Merge by responsibility, not by chronology
A file is chosen because it best satisfies the canonical role, not because it is the newest.

### Rule 3: Canonical spec wins
If exploratory logic conflicts with the canonical Search & Quote spec, the spec wins.

### Rule 4: Pricing ownership remains singular
Useful logic from `pricing.service.v2.ts` or `distance-estimator.service.ts` may only survive if folded into canonical `pricing.service.ts`.

### Rule 5: Freeze remains active
This mapping does not lift freeze. It only prepares a safe cleanup sequence.

---

## Blocked Actions

The following remain blocked unless the human architect explicitly starts cleanup execution:

- deleting exploratory files
- renaming files in the repo
- overwriting canonical placeholders
- consolidating logic into runtime files
- changing route wiring
- changing controller/service behaviour

---

## Controlled AI Rule

Any AI system must interpret this mapping as a planning artifact only.

It must not:
- treat mapping as execution permission
- delete files automatically
- overwrite canonical targets automatically
- silently ignore secondary candidates

If cleanup has not been explicitly opened by the human owner, the correct behaviour is:

```text
STOP → REPORT MAPPING ONLY
```

---

## Status

```text
STATE: CLEANUP MAPPING COMPLETE
STATE: CLEANUP EXECUTION NOT STARTED
STATE: CODING STILL FROZEN
```

---

## Final Rule

This document exists to make cleanup deterministic.

If any future action skips this mapping and directly deletes, renames, or overwrites files, that action must be treated as drift and rejected by the controlled AI development system.
