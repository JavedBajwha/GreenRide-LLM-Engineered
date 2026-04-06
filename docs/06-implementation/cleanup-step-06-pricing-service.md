# Cleanup Step 06 — Pricing Service

## Phase
Controlled Cleanup Execution

## Status
Planning and verification only.

No overwrite, deletion, rename, or code generation is authorised by this step alone.

---

## Purpose

This document defines the canonical reconciliation plan for the pricing service layer.

It ensures pricing cleanup is deterministic, bounded, and aligned with:
- approved Decision 001 (distance estimation ownership)
- approved Decision 007 (single canonical pricing owner)
- the canonical Search & Quote specification
- the final backend structure

---

## Files in Scope

```text
backend/src/modules/pricing/pricing.service.ts
backend/src/modules/pricing/pricing.service.v2.ts
backend/src/modules/pricing/distance-estimator.service.ts
```

---

## Approved Source References

Per approved Decision 007, the canonical pricing owner remains:

```text
backend/src/modules/pricing/pricing.service.ts
```

Per the approved decision set and mapping plan:
- `pricing.service.v2.ts` is approved as a preferred reference source for improved pricing behaviour
- `distance-estimator.service.ts` is non-canonical reference material only

This means reference logic may be folded conceptually into canonical pricing ownership later, but no separate helper file is allowed to survive as canonical structure for this slice.

---

## Canonical Target

The only allowed final target for pricing ownership is:

```text
backend/src/modules/pricing/pricing.service.ts
```

No alternate pricing service file may survive cleanup.
No separate distance estimation helper file may survive cleanup for this slice.

---

## Canonical Responsibility of pricing.service.ts

The canonical `pricing.service.ts` file is allowed to own only the following responsibilities:

- price calculation for Search & Quote
- reading approved pricing rule data from persistence layer where applicable
- applying base fare logic
- applying per-distance and per-duration logic if approved in slice scope
- enforcing minimum fare rules
- applying approved vehicle category multiplier logic
- owning distance estimation behaviour for this slice because Decision 001 approved that ownership
- returning structured pricing result objects for booking service consumption

It must not own:

- raw Express request handling
- route mounting
- controller response formatting
- booking orchestration
- schema validation ownership
- multiple canonical pricing files
- helper files that create separate pricing ownership boundaries for this slice

---

## Canonical Pricing Structure Plan

The reconciled `pricing.service.ts` must structurally contain only:

1. imports needed for pricing persistence access and approved dependencies
2. a canonical pricing calculation function for Search & Quote
3. any approved distance estimation logic folded into pricing ownership
4. canonical return structure for booking service consumption
5. no exploratory version suffixes
6. no external helper ownership that conflicts with Decision 001

---

## Canonical Pricing Behaviour Rules

The reconciled pricing service must remain aligned to the approved controlled system.

That means:

- there is only one pricing owner
- distance estimation belongs to pricing ownership
- pricing rules may be read from persistence if that remains in scope
- booking service consumes pricing output but does not own formulas
- no silent expansion into dispatch, payment, or unrelated booking lifecycle logic is allowed

---

## Pricing Validation Questions

Before reconciliation is executed, the following must be true:

1. the preferred reference logic can be folded into canonical `pricing.service.ts` without introducing a second pricing owner
2. any useful logic from `pricing.service.v2.ts` improves canonical behaviour without violating the Search & Quote spec
3. any useful logic from `distance-estimator.service.ts` can be folded into pricing ownership without keeping it as a separate canonical file
4. pricing output remains consumable by the canonical booking service plan
5. no HTTP-layer logic exists in the reconciled pricing target
6. no schema ownership is introduced into pricing

If any answer is unclear, cleanup must stop.

---

## Distance Ownership Rule

Approved Decision 001 already established:

```text
Distance estimation is owned by pricing.service.ts.
```

Therefore, during future reconciliation:

- useful logic from `distance-estimator.service.ts` may only survive if folded into canonical `pricing.service.ts`
- `distance-estimator.service.ts` must not survive as a separate canonical file
- no new helper file may be introduced for distance ownership during this slice cleanup

---

## Reconciliation Intent

During actual cleanup execution, the process for pricing layer must be:

1. inspect canonical pricing target placeholder / current file
2. inspect `pricing.service.v2.ts` as approved preferred reference for richer pricing behaviour
3. inspect `distance-estimator.service.ts` as non-canonical reference material only
4. compare all reference behaviour against canonical Search & Quote spec
5. verify all distance logic remains inside pricing ownership
6. define final canonical `pricing.service.ts` content plan
7. only after verification, authorise canonical replacement in a later explicit action

Deletion of `pricing.service.v2.ts` and `distance-estimator.service.ts` must happen only after canonical `pricing.service.ts` is confirmed and later cleanup steps succeed.

---

## Explicitly Blocked Actions in This Step

This step does **not** authorise:

- replacing `pricing.service.ts`
- deleting `pricing.service.v2.ts`
- deleting `distance-estimator.service.ts`
- creating a new helper file
- changing Decision 001 ownership
- changing Decision 007 canonical pricing ownership
- moving pricing logic into booking service

---

## Controlled AI Rule

Any AI system must treat this document as pricing-layer verification guidance only.

If asked to modify pricing files before later confirmation, the correct behaviour is:

```text
STOP → REPORT PRICING PLAN ONLY
```

---

## Completion Condition for Step 6

Step 6 is complete when:

- canonical pricing responsibility is documented
- approved pricing ownership remains preserved
- approved reference sources are identified
- non-canonical helper survival is explicitly blocked
- no pricing file has been changed yet

---

## Current Step State

```text
STEP 6: PRICING SERVICE PLAN COMPLETE
FILES CHANGED: NONE
FILES DELETED: NONE
NEXT STEP: VALIDATION PASS PLAN
```
