# Decision 003 Approval

## Decision ID
003

## Title
Canonical Naming: Quote vs Booking

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
Search & Quote remains under **booking module ownership**.

Canonical file names for this slice must use:
- `booking.controller.ts`
- `booking.service.ts`
- `booking.routes.ts`
- `booking.schema.ts`

Exploratory `quote.*` files are reference material only and must be mapped into canonical `booking.*` names during controlled consolidation.

## Reason
- aligns with the long-term Search → Quote → Booking lifecycle
- avoids creating a separate quote-only module prematurely
- reduces future refactor cost when booking confirmation, payment, and dispatch are added
- preserves a single business slice under booking ownership

## Impact
- canonical structure: yes
- cleanup plan: yes
- implementation spec: yes

## Canonical Rule

```text
Search & Quote is a booking slice, not a standalone quote module.
All final implementation files for this slice must use booking.* canonical names.
```

## Effect on Mapping
All exploratory files using `quote.*` naming must map conceptually into canonical `booking.*` targets during consolidation.

## Next Dependent Decision
Decision 004 — Preferred App Entry Candidate

## Controlled AI Rule
Any AI system must now treat `booking.*` naming as canonical and must not preserve `quote.*` naming as final implementation structure unless a later approved decision supersedes this one.
