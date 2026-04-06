# Decision 001 Approval

## Decision ID
001

## Title
Distance Estimation Ownership

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
Distance estimation belongs to pricing ownership and must remain inside `pricing.service.ts` during canonical consolidation.

No separate helper file is authorised in the canonical backend structure for this slice.

## Reason
- preserves the minimal canonical structure
- reduces AI drift risk
- avoids introducing new file ownership during the frozen phase
- keeps the pricing module responsible for pricing-related calculation inputs

## Impact
- canonical structure: yes
- cleanup plan: yes
- implementation spec: yes

## Canonical Rule

```text
Distance estimation is owned by pricing.service.ts.
Any exploratory helper file is reference material only and must not survive as a canonical file unless a future structure decision explicitly changes this.
```

## Effect on Mapping
`backend/src/modules/pricing/distance-estimator.service.ts` remains non-canonical reference material.

## Next Dependent Decision
Decision 002 — Quote Persistence Scope

## Controlled AI Rule
Any AI system must now treat Decision 001 as approved and must not propose a separate pricing helper file for Search & Quote unless a later decision supersedes this approval.
