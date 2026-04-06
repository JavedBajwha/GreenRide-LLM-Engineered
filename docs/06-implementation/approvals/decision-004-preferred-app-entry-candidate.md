# Decision 004 Approval

## Decision ID
004

## Title
Preferred App Entry Candidate

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
For consolidation planning only, `app.v3.ts` is the preferred source candidate for canonical `app.ts`.

This approval does **not** authorise overwrite of `app.ts` during the coding freeze.
It only identifies the preferred source for future controlled consolidation.

## Reason
- best aligned to the latest routing chain in exploratory work
- closest to current canonical route wiring expectations
- already identified as the preferred candidate in the canonical mapping plan
- reduces ambiguity during future cleanup planning

## Impact
- canonical structure: no
- cleanup plan: yes
- implementation spec: no

## Canonical Rule

```text
For planning and mapping purposes only, app.v3.ts is the preferred source candidate for canonical app.ts.
No AI system may overwrite app.ts or treat app.v3.ts as canonical runtime code while the freeze remains active.
```

## Effect on Mapping
`app.v3.ts` becomes the preferred reference source when canonical `app.ts` is eventually reconciled during approved cleanup.

## Next Dependent Decision
Decision 005 — Preferred Booking Controller Candidate

## Controlled AI Rule
Any AI system must now treat `app.v3.ts` as the preferred mapping source for canonical `app.ts`, but must not execute consolidation, overwrite, or cleanup unless later approvals explicitly permit that action.
