# Future Wave 1 School Run and Parcel Add-Ons Checklist

## Purpose

Provide a focused planning and execution checklist for the first future
documentation expansion wave after the core closure program.

This wave exists to introduce two new optional GreenRide add-ons through
explicit contracts instead of informal drift:
- `School Run`
- `Parcel / Courier / Logistics`

## Scope

This wave should cover:
- module and commercial anchoring for both add-ons
- School Run workflow, authority, tracking, and pricing/billing contracts
- Parcel workflow, proof/tracking, and pricing/size contracts
- required cross-cutting updates for:
  - tracking
  - notifications
  - reporting
  - frontend route/module impact

This wave should not:
- reopen the completed core closure batches
- treat enhancement ideas as approved implementation behavior before the docs
  exist
- collapse new add-on truth into the current base ride-booking model

## Current Status

Future Wave 1 is now substantially complete at the first-pass documentation
baseline.

Completed at this checkpoint:
- shared module and control anchoring
- School Run workflow, authority/configuration, and pricing/billing contracts
- Parcel workflow, proof/tracking, and pricing/size contracts
- the first cross-document alignment pass across tracking, notifications,
  reporting, frontend route ownership, module gating, and control docs

Remaining work is now residual follow-through only, such as:
- deeper School Run schedule and reporting detail
- deeper Parcel lifecycle and proof-edge detail
- later add-on-specific matrices where implementation genuinely needs them

## Ordered Checklist

### 1. Shared Module and Control Anchoring

- add both add-ons into the module/commercial/control layer
- record new documentation scope in the tracker and continuity docs

### 2. School Run Add-On Documentation

- define School Run workflow
- define authority and tenant configuration direction
- define pricing and billing direction
- define required cross-cutting impact

### 3. Parcel / Courier / Logistics Documentation

- define logistics-job workflow
- define parcel proof-of-delivery and tracking truth
- define parcel pricing and size model
- define required cross-cutting impact

### 4. Cross-Document Alignment

- verify new add-on boundaries do not corrupt existing booking, tracking,
  pricing, or ops truth
- refresh readiness/control docs only where the new wave genuinely affects them

## Finish Criteria

This future wave can be treated as substantially complete only when:
- both add-ons are explicitly anchored in the module/commercial model
- School Run and Parcel each have distinct workflow truth documented
- pricing, tracking, and proof boundaries are explicit enough to avoid drift
- cross-cutting docs are updated where the new modules materially affect them

Current checkpoint:
- these finish criteria are now met at the first-pass baseline level

## Stop Conditions

Stop and clarify before treating this wave as complete if:
- School Run is drifting back into “normal booking with a few extra fields”
- parcel tracking or proof-of-delivery is being collapsed into ride completion
- pricing or billing rules are being invented without documented policy
- module enablement is being used as a substitute for RBAC or workflow truth

## Related Documents

- `docs/superpowers/specs/2026-04-08-school-run-and-parcel-addons-design.md`
- `docs/superpowers/plans/2026-04-08-school-run-and-parcel-doc-wave.md`
- `docs/superpowers/specs/2026-04-08-enhancement-discovery-summary.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/session-continuity-notes.md`
