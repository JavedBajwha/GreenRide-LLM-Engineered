# Decision 006 Approval

## Decision ID
006

## Title
Preferred Booking Service Candidate

## Previous Status
proposed

## New Status
approved

## Approved By
Human architect / owner

## Decision
For consolidation planning only, `quote.service.v3.ts` is the preferred source candidate for canonical `booking.service.ts`.

This approval does **not** authorise overwrite of any canonical file during the coding freeze.
It only identifies the preferred service source for future controlled consolidation.

## Reason
- best aligned to the Search & Quote canonical specification
- includes richer quote result handling than earlier versions
- closest to the approved persistence and pricing direction
- reduces ambiguity during future cleanup planning

## Impact
- canonical structure: no
- cleanup plan: yes
- implementation spec: no

## Canonical Rule

```text
For planning and mapping purposes only, quote.service.v3.ts is the preferred source candidate for canonical booking.service.ts.
No AI system may overwrite booking.service.ts or treat quote.service.v3.ts as canonical runtime code while the freeze remains active.
```

## Effect on Mapping
`quote.service.v3.ts` becomes the preferred reference source when canonical `booking.service.ts` is eventually reconciled during approved cleanup.

## Next Dependent Decision
Decision 007 — Preferred Pricing Service Candidate

## Controlled AI Rule
Any AI system must now treat `quote.service.v3.ts` as the preferred mapping source for canonical `booking.service.ts`, but must not execute consolidation, overwrite, or cleanup unless later approvals explicitly permit that action.
