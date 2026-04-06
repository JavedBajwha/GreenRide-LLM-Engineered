# Decision 002 Approval

## Decision ID
002

## Title
Quote Persistence Scope

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
Search & Quote persists quote records in the database during the first slice.

Quote persistence remains in scope and is treated as canonical behaviour unless a later approved decision explicitly changes it.

## Reason
- aligns with the current schema model
- supports later conversion from quote to booking
- preserves traceability and operational history
- avoids a hidden shift from persisted to ephemeral behaviour during consolidation

## Impact
- canonical structure: no
- cleanup plan: yes
- implementation spec: yes

## Canonical Rule

```text
Search & Quote persists quote records in the database.
No AI system may change Search & Quote to ephemeral-only quote generation unless a later approved decision supersedes this one.
```

## Effect on Mapping
Exploratory service logic that persists quotes remains compatible with canonical direction, provided it is later consolidated into canonical file names and structure.

## Next Dependent Decision
Decision 003 — Canonical Naming: Quote vs Booking

## Controlled AI Rule
Any AI system must now treat quote persistence as approved canonical scope and must not remove persistence during cleanup or future implementation without a superseding approved decision.
