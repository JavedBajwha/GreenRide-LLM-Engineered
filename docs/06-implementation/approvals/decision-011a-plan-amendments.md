# Decision 011a — Plan Amendments (Pre-Implementation Review)

## Decision ID
011a

## Title
Four Pre-Implementation Fixes to the Locked Slice Execution Plan

## Status
approved

## Approved By
Human architect / owner

---

## Amendment 1 — vehicleCategory request filter

**Problem:** The execution plan said "pass all input fields" but did not specify what
happens when the customer supplies an optional `vehicleCategory` in the request.
The exploratory service silently ignores it and always returns all categories.

**Fix:** If `vehicleCategory` is present in the validated input, the booking service
must restrict quote generation to that single category. The category loop is bypassed.
If `vehicleCategory` is absent, the service resolves all applicable categories
(from tenant vehicles or the platform fallback list).

**Canonical rule:**
```text
input.vehicleCategory present → generate one quote for that category only
input.vehicleCategory absent  → generate quotes for all resolved categories
```

---

## Amendment 2 — Decimal to number conversion

**Problem:** Prisma returns Decimal objects (decimal.js instances) for fields declared
with `@db.Decimal`. The canonical response requires plain JSON numbers.
Returning Prisma records directly would serialise Decimals as objects, breaking clients.

**Fix:** The booking service must explicitly convert all Decimal fields to Number
before constructing the QuoteResult objects.

Fields affected:
- `quote.estimatedPrice` → `Number(quote.estimatedPrice)`
- `quote.estimatedDistanceMiles` → `Number(quote.estimatedDistanceMiles)`

No other code layer (controller, route) may rely on Decimal serialisation.

---

## Amendment 3 — estimatedDurationMinutes rename in cleanup

**Problem:** The Prisma field was renamed from `estimatedDuration` to
`estimatedDurationMinutes`. Any exploratory code that reads this field by name
from a persisted quote record would get `undefined` after cleanup unless the
rename is explicit in all relevant files.

**Fix:** During cleanup reconciliation, any remaining reference to `estimatedDuration`
must be updated to `estimatedDurationMinutes`. The canonical implementation writes
`estimatedDurationMinutes` directly — it does not inherit the old name.

---

## Amendment 4 — Tenant status: ready_for_testing allowed

**Problem:** Decision 010 approved tenant validation against `live` status only.
A tenant in `ready_for_testing` state is a legitimate pre-launch state in the
onboarding flow. Blocking quote generation for those tenants makes it impossible
for a tenant to test their own booking flow before going live.

**Fix:** `tenant.service.ts` allows quote generation for tenants with status
`live` OR `ready_for_testing`. All other statuses (`created`, `setup_in_progress`,
`suspended`) return the 404 response.

**Canonical rule:**
```text
Allowed tenant statuses for quote generation: live, ready_for_testing
Blocked statuses: created, setup_in_progress, suspended
```

---

## Controlled AI Rule

These four amendments supersede conflicting guidance in Decision 010 and Decision 011
where applicable. All canonical code must follow these amendments.
