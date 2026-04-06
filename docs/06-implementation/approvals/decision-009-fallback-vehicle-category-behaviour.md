# Decision 009 Approval

## Decision ID
009

## Title
Fallback Vehicle Category Behaviour

## Previous Status
open (flagged as stop condition in search-and-quote-canonical-spec.md)

## New Status
approved

## Approved By
Human architect / owner

## Decision

When a tenant has no active Vehicle records in the database, the booking service must fall back to a hardcoded platform-default category list.

The approved fallback category list is:

```text
saloon
mpv
executive
```

This list is the canonical fallback for the Search & Quote slice.

It must not be extended or modified by an AI agent without a superseding approved decision.

## Reason
- consistent with the exploratory code in `quote.service.v3.ts`
- provides a usable quote result for newly onboarded tenants with no fleet yet configured
- avoids returning an empty response or an error for tenants in early setup
- keeps the fallback minimal and representative of the most common UK taxi categories

## Impact
- canonical structure: no
- cleanup plan: no
- implementation spec: yes — `booking.service.ts`

## Canonical Rule

```text
When a tenant has no active Vehicle records, the booking service must use
the platform-default fallback category list: ['saloon', 'mpv', 'executive'].

No AI system may change this list, remove the fallback, or replace it with
an empty result or an error response unless a later approved decision
supersedes this one.
```

## Scope Boundary

This fallback applies only to category resolution during quote generation.

It does not affect:
- booking confirmation
- dispatch vehicle assignment
- vehicle availability for actual trips

## Effect on Implementation
`booking.service.ts` must implement the following logic:

1. query active vehicles for the tenant
2. derive distinct categories from those vehicles
3. if the derived list is empty, use `['saloon', 'mpv', 'executive']`
4. proceed with pricing for each category in the resolved list

## Controlled AI Rule
Any AI system must now treat the fallback category list as approved and must not
invent an alternative list or skip the fallback branch.
