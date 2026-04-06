# Implementation Decision Register

## Purpose

This document records implementation decisions that must be resolved before coding freeze can be lifted.

It is part of the controlled AI development system.

Its purpose is to ensure that:
- blocked decisions are made explicitly
- AI agents do not guess unresolved architecture details
- cleanup and future implementation are based on approved choices
- structural drift is prevented before any code consolidation begins

This document is decision planning only.
It does **not** authorise coding, cleanup, deletion, or overwrite by itself.

---

## Relationship to Control Documents

This document must be read together with:

1. `coding-freeze.md`
2. `final-backend-structure.md`
3. `repo-cleanup-status.md`
4. `search-and-quote-canonical-spec.md`
5. `llm-execution-rules.md`
6. `canonical-mapping-plan.md`

If any decision here conflicts with those files, the conflict must be resolved explicitly before implementation.

---

## Decision Status Legend

- `open` = not yet decided
- `proposed` = draft recommendation exists
- `approved` = accepted as canonical direction
- `blocked` = dependent on another decision

---

## Decision 001 — Distance Estimation Ownership

### Status
`proposed`

### Problem
Exploratory backend work introduced `distance-estimator.service.ts`, but the canonical structure currently allows only:

```text
backend/src/modules/pricing/pricing.service.ts
```

The controlled system must decide whether distance estimation:
- remains folded inside `pricing.service.ts`, or
- is explicitly authorised as a separate helper/service within the pricing module

### Proposed Decision
For the Search & Quote slice, distance estimation should remain **owned by the pricing module** and be treated as a pricing concern.

However, to preserve canonical clarity during the frozen state, the canonical structure should **not yet be expanded** unless there is a clear need for a dedicated pricing helper file across multiple slices.

### Controlled Recommendation
Adopt this rule:

```text
Distance estimation belongs to pricing ownership.
During canonical consolidation, it should be folded into pricing.service.ts unless a later structure update explicitly authorises pricing helper files.
```

### Reasoning
- keeps canonical structure minimal
- avoids adding new files during consolidation
- avoids multiplying ownership boundaries too early
- reduces drift risk for AI agents

### Effect on Mapping
If approved, `distance-estimator.service.ts` becomes reference-only source material and does not survive as a canonical file.

---

## Decision 002 — Quote Persistence Scope

### Status
`proposed`

### Problem
Exploratory logic currently treats quote creation as persisted data.
The canonical Search & Quote spec allows persistence only if explicitly kept in scope.

The system must decide whether Search & Quote:
- persists quote rows in the database, or
- returns ephemeral quote results only during the first slice

### Proposed Decision
Quote persistence remains **in scope** for the Search & Quote slice.

### Controlled Recommendation
Adopt this rule:

```text
Search & Quote persists quote records during the first slice.
This behaviour is canonical until another spec deliberately changes it.
```

### Reasoning
- aligns with existing exploratory logic and current schema model
- preserves traceability for later booking conversion
- avoids hidden behaviour change during cleanup
- supports future analytics and booking reference workflows

### Effect on Mapping
If approved, canonical booking service behaviour may include quote persistence through Prisma.

---

## Decision 003 — Canonical Naming: Quote vs Booking

### Status
`proposed`

### Problem
Exploratory files use `quote.*` naming, but canonical structure uses:

- `booking.controller.ts`
- `booking.service.ts`
- `booking.routes.ts`
- `booking.schema.ts`

The system must decide whether Search & Quote lives under booking ownership or quote ownership.

### Proposed Decision
Search & Quote remains under **booking module ownership**.

### Controlled Recommendation
Adopt this rule:

```text
Search & Quote is a booking slice, not a standalone quote module.
Canonical file names remain booking.*
```

### Reasoning
- aligns with long-term booking flow ownership
- avoids creating a separate quote module prematurely
- keeps search → quote → booking as one coherent business slice
- reduces future restructuring when booking confirmation is added

### Effect on Mapping
If approved, all exploratory `quote.*` implementation files map conceptually into canonical `booking.*` files.

---

## Decision 004 — Preferred App Entry Candidate

### Status
`proposed`

### Problem
Multiple app entry variants exist:
- `app.next.ts`
- `app.v2.ts`
- `app.v3.ts`

The controlled system must identify which one is the preferred source for eventual canonical consolidation into `app.ts`.

### Proposed Decision
`app.v3.ts` is the preferred source candidate.

### Controlled Recommendation
Adopt this rule:

```text
For consolidation planning only, app.v3.ts is the preferred source candidate for canonical app.ts.
This is not permission to overwrite app.ts yet.
```

### Reasoning
- best aligned to the latest routing chain in exploratory work
- closest to current canonical route wiring expectations
- already identified as preferred in mapping plan

### Effect on Mapping
If approved, `app.v3.ts` becomes the reference source for eventual `app.ts` reconciliation.

---

## Decision 005 — Preferred Booking Controller Candidate

### Status
`proposed`

### Problem
Multiple controller variants exist.
The controlled system must decide which exploratory file is the best source candidate for canonical `booking.controller.ts`.

### Proposed Decision
`quote.controller.v3.ts` is the preferred source candidate.

### Controlled Recommendation
Adopt this rule:

```text
For consolidation planning only, quote.controller.v3.ts is the preferred source candidate for canonical booking.controller.ts.
```

### Reasoning
- best aligned to canonical success/error response shape
- uses validated flow direction rather than older single-quote logic
- already identified as preferred in mapping plan

---

## Decision 006 — Preferred Booking Service Candidate

### Status
`proposed`

### Problem
Multiple service variants exist.
The controlled system must decide which one best aligns to canonical `booking.service.ts`.

### Proposed Decision
`quote.service.v3.ts` is the preferred source candidate.

### Controlled Recommendation
Adopt this rule:

```text
For consolidation planning only, quote.service.v3.ts is the preferred source candidate for canonical booking.service.ts.
```

### Reasoning
- includes distance-aware enrichment compared with earlier versions
- better aligned to richer quote result expectations
- already identified as preferred in mapping plan

---

## Decision 007 — Preferred Pricing Service Candidate

### Status
`proposed`

### Problem
Both `pricing.service.ts` and `pricing.service.v2.ts` exist.
A canonical consolidation source must be identified.

### Proposed Decision
`pricing.service.v2.ts` is the preferred source candidate.

### Controlled Recommendation
Adopt this rule:

```text
For consolidation planning only, pricing.service.v2.ts is the preferred source candidate for canonical pricing.service.ts.
```

### Reasoning
- includes pricing-rule usage plus distance-aware inputs
- better aligned to future realistic pricing flow
- already identified as preferred in mapping plan

---

## Decision 008 — Cleanup Gate Condition

### Status
`proposed`

### Problem
The repo must not slide from planning into accidental cleanup or coding.

### Proposed Decision
Cleanup remains blocked until all decisions in this register that affect mapping are explicitly marked `approved`.

### Controlled Recommendation
Adopt this rule:

```text
No cleanup, overwrite, deletion, or canonical file creation may begin until all mapping-critical decisions are approved.
```

### Reasoning
- protects against silent loss of logic
- prevents AI from interpreting drafts as approval
- preserves the controlled AI development model

---

## Current Decision Summary

| ID | Topic | Status |
| --- | --- | --- |
| 001 | Distance estimation ownership | approved |
| 002 | Quote persistence scope | approved |
| 003 | Canonical naming quote vs booking | approved |
| 004 | Preferred app source | approved |
| 005 | Preferred controller source | approved |
| 006 | Preferred booking service source | approved |
| 007 | Preferred pricing service source | approved |
| 008 | Cleanup gate condition | approved |
| 009 | Fallback vehicle category behaviour | approved |
| 010 | Quote endpoint authentication | approved |
| 011 | Remaining slice gaps (schema, pricing, contracts) | approved |
| 011a | Pre-implementation plan amendments | approved |

See `decision-approval-log.md` for full detail on each approved decision.

---

## Controlled AI Rule

All decisions in this register are approved. The freeze is lifted.

Coding may proceed slice by slice per `freeze-lift.md` and `llm-execution-rules.md`.

---

## Final Rule

If a future implementation action depends on a decision in this register that is not yet approved, the correct behaviour is:

```text
STOP → FLAG → REQUEST DECISION
```
