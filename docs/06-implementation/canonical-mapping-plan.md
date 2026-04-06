# Canonical Mapping Plan

## Purpose

This document maps exploratory implementation files to the final canonical structure without performing cleanup yet.

This is part of the controlled AI development system.

It exists to ensure:
- no accidental loss of useful logic
- no silent selection of competing files
- no uncontrolled overwrite of existing files
- no AI-driven guesswork during consolidation

This document is planning only.
It does **not** authorise deletion, renaming, or coding by itself.

---

## Current Repository Problem

The repository currently contains exploratory files that represent overlapping responsibilities.

Examples include:
- `app.next.ts`
- `app.v2.ts`
- `app.v3.ts`
- `quote.controller.v2.ts`
- `quote.controller.v3.ts`
- `quote.routes.v2.ts`
- `quote.routes.v3.ts`
- `quote.service.v2.ts`
- `quote.service.v3.ts`
- `pricing.service.ts`
- `pricing.service.v2.ts`

These files may contain useful logic, but they violate the canonical structure because multiple files compete for the same final responsibility.

---

## Canonical Targets

The final canonical targets remain:

```text
backend/src/app.ts
backend/src/routes/index.ts
backend/src/modules/booking/booking.routes.ts
backend/src/modules/booking/booking.controller.ts
backend/src/modules/booking/booking.service.ts
backend/src/modules/booking/booking.schema.ts
backend/src/modules/pricing/pricing.service.ts
```

No other target files are allowed for this slice.

---

## Mapping Principles

### Principle 1: Map before delete
No exploratory file may be deleted before its role is mapped.

### Principle 2: Select by responsibility, not by version number
A file is chosen because it best matches the canonical responsibility, not because it is newer or has a higher suffix.

### Principle 3: Prefer the file with the cleanest alignment to the canonical spec
If two files overlap, the preferred source is the one that best matches:
- canonical route
- canonical response shape
- canonical responsibility boundary
- canonical layer ownership

### Principle 4: Preserve useful logic, reject structural drift
Useful logic may be retained conceptually.
Versioned naming and structural drift must not survive.

### Principle 5: No silent merge decisions
If multiple files contribute meaningful behaviour, the merge plan must be documented before implementation.

---

## Proposed Mapping Table

| Exploratory file | Proposed canonical target | Status | Notes |
|---|---|---|---|
| `backend/src/app.next.ts` | `backend/src/app.ts` | candidate | wired app, but not final because multiple app variants exist |
| `backend/src/app.v2.ts` | `backend/src/app.ts` | candidate | wired variant, must compare against v3 path usage |
| `backend/src/app.v3.ts` | `backend/src/app.ts` | preferred candidate | best aligned to latest route chain, but still not canonical until approved |
| `backend/src/routes/index.next.ts` | `backend/src/routes/index.ts` | candidate | route aggregator using v2 routes |
| `backend/src/routes/index.v3.ts` | `backend/src/routes/index.ts` | preferred candidate | most aligned with latest quote route chain |
| `backend/src/modules/booking/quote.routes.ts` | `backend/src/modules/booking/booking.routes.ts` | legacy candidate | old route file, outdated controller reference |
| `backend/src/modules/booking/quote.routes.v2.ts` | `backend/src/modules/booking/booking.routes.ts` | candidate | uses v2 controller |
| `backend/src/modules/booking/quote.routes.v3.ts` | `backend/src/modules/booking/booking.routes.ts` | preferred candidate | uses v3 controller and best response chain |
| `backend/src/modules/booking/quote.controller.ts` | `backend/src/modules/booking/booking.controller.ts` | legacy candidate | outdated, single-quote logic |
| `backend/src/modules/booking/quote.controller.v2.ts` | `backend/src/modules/booking/booking.controller.ts` | candidate | validated controller, but not final pricing flow |
| `backend/src/modules/booking/quote.controller.v3.ts` | `backend/src/modules/booking/booking.controller.ts` | preferred candidate | best aligned to canonical success/error response shape |
| `backend/src/modules/booking/quote.service.ts` | `backend/src/modules/booking/booking.service.ts` | legacy candidate | early service with static logic |
| `backend/src/modules/booking/quote.service.v2.ts` | `backend/src/modules/booking/booking.service.ts` | candidate | dynamic pricing integration |
| `backend/src/modules/booking/quote.service.v3.ts` | `backend/src/modules/booking/booking.service.ts` | preferred candidate | includes distance-aware metrics and quote enrichment |
| `backend/src/modules/booking/quote.schema.ts` | `backend/src/modules/booking/booking.schema.ts` | preferred candidate | already aligned to schema-only responsibility |
| `backend/src/modules/pricing/pricing.service.ts` | `backend/src/modules/pricing/pricing.service.ts` | candidate | base dynamic pricing from PricingRule |
| `backend/src/modules/pricing/pricing.service.v2.ts` | `backend/src/modules/pricing/pricing.service.ts` | preferred candidate | best aligned to distance-aware pricing responsibility |
| `backend/src/modules/pricing/distance-estimator.service.ts` | unresolved | blocked | not in canonical structure; requires decision whether folded into pricing service spec or separately authorised |

---

## Blocked Decisions

The following decisions are not yet resolved and therefore block cleanup:

### 1. Distance estimator ownership
Current canonical structure allows only `pricing.service.ts` under pricing.

Question:
- should distance estimation logic be folded into `pricing.service.ts`
- or should canonical structure be updated to allow a dedicated helper file under pricing

Until that decision is made, `distance-estimator.service.ts` cannot be treated as canonical.

### 2. Quote naming vs booking naming
Canonical structure requires:
- `booking.controller.ts`
- `booking.service.ts`
- `booking.routes.ts`
- `booking.schema.ts`

Current exploratory files use `quote.*` naming.

This means the mapping is conceptual only until cleanup is authorised.

### 3. Persistence behaviour
Quote persistence is currently treated as in-scope by exploratory logic, but this must remain aligned with the canonical Search & Quote spec.

No cleanup should proceed if persistence scope is reconsidered.

---

## Controlled Consolidation Sequence

When freeze is eventually lifted, consolidation must happen in this order:

1. confirm this mapping plan
2. resolve blocked decisions
3. confirm canonical naming remains unchanged
4. create canonical target files by reconciling mapped logic
5. verify no duplicate ownership remains
6. only then remove exploratory files

No other sequence is allowed.

---

## Controlled AI Rules for Mapping

Any LLM reading this document must follow these rules:

- do not interpret “preferred candidate” as permission to overwrite files immediately
- do not delete non-canonical files yet
- do not create new versioned files
- do not merge logic without documenting source and target clearly
- do not alter canonical target names unless the structure doc changes first

---

## Mapping Status

```text
STATE: MAPPING DRAFTED
STATE: CLEANUP NOT APPROVED
STATE: CODING STILL FROZEN
```

---

## Final Rule

This document supports a controlled AI development system by making consolidation explicit.

If any future action skips mapping and jumps straight to overwrite/delete/build, that action must be treated as drift.
