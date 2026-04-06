# Decision 005 Approval

## Decision ID
005

## Title
Preferred Booking Controller Candidate

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
For consolidation planning only, `quote.controller.v3.ts` is the preferred source candidate for canonical `booking.controller.ts`.

This approval does **not** authorise overwrite of any canonical file during the coding freeze.
It only identifies the preferred controller source for future controlled consolidation.

## Reason
- best aligned to the canonical success/error response shape
- already uses validated flow direction rather than the older single-quote logic
- closest match to the Search & Quote canonical specification
- reduces ambiguity during future cleanup planning

## Impact
- canonical structure: no
- cleanup plan: yes
- implementation spec: no

## Canonical Rule

```text
For planning and mapping purposes only, quote.controller.v3.ts is the preferred source candidate for canonical booking.controller.ts.
No AI system may overwrite booking.controller.ts or treat quote.controller.v3.ts as canonical runtime code while the freeze remains active.
```

## Effect on Mapping
`quote.controller.v3.ts` becomes the preferred reference source when canonical `booking.controller.ts` is eventually reconciled during approved cleanup.

## Next Dependent Decision
Decision 006 — Preferred Booking Service Candidate

## Controlled AI Rule
Any AI system must now treat `quote.controller.v3.ts` as the preferred mapping source for canonical `booking.controller.ts`, but must not execute consolidation, overwrite, or cleanup unless later approvals explicitly permit that action.
