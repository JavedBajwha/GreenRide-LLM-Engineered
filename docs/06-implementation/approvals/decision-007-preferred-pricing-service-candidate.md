# Decision 007 Approval

## Decision ID
007

## Title
Preferred Pricing Service Candidate

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
`pricing.service.ts` remains the canonical pricing owner for the Search & Quote slice.

Exploratory pricing variants and helper patterns may exist as reference material, but the final canonical pricing responsibility remains consolidated into `backend/src/modules/pricing/pricing.service.ts`.

This approval does **not** authorise cleanup or overwrite during the coding freeze.
It only confirms canonical ownership and future consolidation direction.

## Reason
- aligns with Decision 001 that distance estimation stays within pricing ownership
- preserves one clear authority for price calculation
- reduces drift risk by avoiding multiple pricing service variants
- keeps the controlled AI development system structurally simple and deterministic

## Impact
- canonical structure: yes
- cleanup plan: yes
- implementation spec: yes

## Canonical Rule

```text
Pricing calculation for Search & Quote is owned by backend/src/modules/pricing/pricing.service.ts.
No additional pricing service file becomes canonical unless a later approved decision explicitly changes the structure.
```

## Effect on Mapping
Exploratory pricing logic may be used as source material during approved consolidation, but only one final canonical pricing file may survive: `pricing.service.ts`.

## Next Dependent Decision
Decision 008 — Cleanup Gate Condition

## Controlled AI Rule
Any AI system must now treat `pricing.service.ts` as the only canonical pricing target and must not introduce additional pricing service variants, helper ownership boundaries, or alternate canonical pricing files unless a later approved decision supersedes this one.
