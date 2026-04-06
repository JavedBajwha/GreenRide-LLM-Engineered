# Decision 011 Approval

## Decision ID
011

## Title
Remaining Search & Quote Slice Gaps (GAPs 6–13)

## Status
approved

## Approved By
Human architect / owner (best-option instruction)

---

## Gap 6 — estimatedDistanceMiles persistence

**Decision:** Add `estimatedDistanceMiles Decimal? @db.Decimal(10,2)` to the `Quote` model.
Also rename `estimatedDuration Int?` to `estimatedDurationMinutes Int?` for consistency
with the canonical response field name.
Also add `pricingSource String?` to the `Quote` model so the pricing provenance is persisted.

**Reason:** Traceability. The distance that generated the price is stored permanently with
the quote. Field name alignment prevents drift between DB and response shape.

**Schema impact:** `backend/prisma/schema.prisma` — Quote model updated. Migration required.

---

## Gap 7 — PricingRule lookup by vehicle category

**Decision:** Add `vehicleCategory VehicleCategory?` to the `PricingRule` model with an index
on `(tenantId, vehicleCategory)`.

Pricing service lookup order for each category:
1. Find active rule where `tenantId` matches AND `vehicleCategory` matches — category-specific rule
2. If not found, find active rule where `tenantId` matches AND `vehicleCategory` is null — catch-all rule
3. If not found, use hardcoded platform defaults (baseFare 20, pricePerMile 2, pricePerMinute 0.5, minimumFare 15)

**Reason:** Allows tenants to define per-category pricing rules without requiring a
separate rule for every single vehicle. The catch-all fallback prevents errors for
tenants that have not yet set up category-specific pricing.

**Schema impact:** `backend/prisma/schema.prisma` — PricingRule model updated. Migration required.

---

## Gap 8 — pricingSource values

**Decision:** `pricingSource` is a string field in the Quote model and response.
The two canonical values are:

- `"pricing_rule"` — a PricingRule record was found and applied (category-specific or catch-all)
- `"fallback"` — no PricingRule was found; hardcoded platform defaults were used

No other values are allowed for this slice.

**Canonical Rule:**
```text
pricing.service.ts must return pricingSource: 'pricing_rule' when a rule was found,
and pricingSource: 'fallback' when platform defaults were used.
booking.service.ts must persist this value on the Quote record.
```

---

## Gap 9 — Old request schema (pickupDate + pickupTime vs pickupAt)

**Decision:** The canonical request field is `pickupAt` (ISO-8601 datetime string) as
defined in `search-and-quote-canonical-spec.md`.

The older `quote-request.md` used `pickupDate` and `pickupTime` as separate fields.
Those field names are retired. `docs/04-architecture/api-contracts/quote-request.md`
has already been updated to reflect the canonical path. The field names in that doc
must also be updated to match the canonical spec.

**Action:** Update `quote-request.md` field list to match the canonical spec exactly.

---

## Gap 10 — tenant.service.ts scope in the Search & Quote slice

**Decision:** For this slice, `tenant.service.ts` exposes one function:

```ts
validateActiveTenant(tenantId: string): Promise<Tenant>
```

Behaviour:
- queries the Tenant record by ID
- if not found or status is not `live`, throws a typed `TenantNotFoundError`
- if found and live, returns the Tenant record

The booking controller calls this before invoking the booking service.
On `TenantNotFoundError`, the controller returns HTTP 404 with:

```json
{ "success": false, "error": "Tenant not found or not active" }
```

This function is the full scope of tenant.service.ts for the Search & Quote slice.
No other tenant functionality is added until a later slice requires it.

---

## Gap 12 — Controller preferred source calls wrong service version

**Decision:** The preferred source `quote.controller.v3.ts` imports `generateQuotesV2`
from `quote.service.v2.ts`. This is a cross-version dependency that must not survive
into the canonical `booking.controller.ts`.

The canonical controller must call `generateQuotes` from `booking.service.ts`.

During cleanup reconciliation, this import must be corrected before the canonical
controller file is finalised.

**Canonical import rule for booking.controller.ts:**
```ts
import { generateQuotes } from '../booking/booking.service.js'
```

---

## Gap 13 — Service input contract incomplete

**Decision:** The canonical `booking.service.ts` must accept the full validated input,
not just pickup/dropoff/pickupAt.

Canonical service function signature:

```ts
generateQuotes(input: SearchQuoteInput): Promise<QuoteResult[]>
```

Where `SearchQuoteInput` is the full Zod-inferred type from `booking.schema.ts`,
including: `tenantId`, `pickupLocation`, `dropoffLocation`, `pickupAt`, `tripType`,
`passengerCount`, `luggageCount`, `vehicleCategory` (optional).

All fields accepted by the schema must be passed to the service and persisted on
the Quote record where the model has corresponding fields.

**Canonical rule:**
```text
booking.service.ts must not silently drop validated input fields.
Every field present in the Quote model must be populated from the input.
```

---

## Summary of schema changes

| Model | Change |
|---|---|
| Quote | Added `estimatedDistanceMiles Decimal?` |
| Quote | Renamed `estimatedDuration` → `estimatedDurationMinutes` |
| Quote | Added `pricingSource String?` |
| PricingRule | Added `vehicleCategory VehicleCategory?` |
| PricingRule | Added index on `(tenantId, vehicleCategory)` |

A single Prisma migration must be generated before the slice can run.

---

## Controlled AI Rule

Any AI system must treat all decisions in this document as approved and must not
deviate from them without a superseding decision record.
