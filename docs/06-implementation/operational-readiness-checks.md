# Operational Readiness Checks

## Purpose

Define the minimum operational-readiness checks for GreenRide slices and environments.

This document exists so AI and future implementation work do not invent:
- vague readiness claims
- “works on my machine” completion standards
- release/readiness decisions without foundational validation

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- readiness baseline
- per-slice readiness expectations
- per-slice readiness matrix direction
- relationship to AI build readiness
- evidence freshness and rerun triggers
- environment-readiness boundary

---

## Out of Scope

This document does not define:
- full production deployment automation
- SRE/on-call operating procedures
- hosting-provider specifics

---

## Canonical Rules

1. A slice is not operationally ready only because code compiles.
2. Readiness must include data, auth, tenant, logging, and flow validation.
3. Readiness claims must be based on fresh validation, not historical assumptions.

---

## Approved First Readiness Baseline

Operational readiness should require:
- migrations/schema readiness
- env/config completeness
- auth/RBAC coverage
- logging/audit visibility
- critical flow validation
- module-gating validation
- tenant isolation checks

Readiness should also explicitly consider, where relevant:
- degraded or fallback behavior
- audit visibility for sensitive controls
- stale/live-data trust indicators on operational surfaces

### Environment Boundary

Current readiness work is approved only against the documented local-development contract.

Rules:
- local readiness does not imply staging readiness
- staging readiness does not imply production readiness
- if a slice later depends on environment-specific behavior, that environment contract must exist before the slice is called ready there
- any readiness claim should name the environment tier it applies to rather than using a generic “ready” label

---

## Slice-Level Readiness Rule

Each major slice should only be considered ready when:
- canonical docs exist
- required tests are complete
- required demo-data support exists where relevant
- readiness checks pass for that slice

---

## Per-Slice Readiness Matrix Direction

Approved first readiness matrix:

| Slice Type | Must Be Explicit Before Ready |
| --- | --- |
| auth/security/trust | auth flow, RBAC, tenant isolation, audit/log visibility, abuse/failure behavior |
| customer/booking | critical happy path, quote/booking validity, payment-path handling where relevant, customer-visible failure states |
| driver/dispatch/ops | stale/degraded behavior, operational source-of-truth visibility, role gating, queue/action safety |
| reporting/export | scope visibility, export permissions, module gating, report-to-widget consistency |
| frontend shell/design | route protection, module gating, state handling, responsive behavior, safe fallback branding/assets |

This gives readiness a clearer slice-specific shape.

### Rerun Triggers

Readiness should be rechecked when any of these change materially:
- canonical slice contract
- auth/RBAC or tenant-boundary logic
- pricing or booking-commitment logic
- route-gating or surface-state behavior
- export/reporting access rules
- environment assumptions
- dataset or fixture basis used for readiness validation
- degraded/fallback expectations for the slice

---

## Relationship to Final AI Readiness Gate

A domain should only be marked ready when:
- canonical docs exist
- major gaps are reduced to accepted residuals
- validation expectations are defined
- no unresolved contradiction blocks implementation

The final AI readiness gate must remain stricter than “docs exist.”

---

## Freshness Rule

Readiness claims must be based on current validation evidence.

Approved direction:
- old passing assumptions do not substitute for current readiness
- major doc or contract changes should trigger renewed readiness review for affected slices
- unresolved contradictions should block readiness even if partial implementation exists

### Readiness Evidence Baseline

A readiness claim should be able to point to:
- current docs used as the slice contract
- current test evidence
- current dataset or fixture baseline
- current environment assumptions
- current known blockers or accepted residual gaps

The claim should also be explicit enough to identify:
- the slice and slice-criticality being judged
- whether degraded, fallback, or stale-data behavior was included where relevant
- whether the evidence applies to broad local bootstrap data or a narrower repeatable fixture basis

### Minimum Readiness Claim Shape

An operational-readiness statement should be concrete enough to say:
- which slice is being judged
- which environment tier the claim applies to
- which docs were treated as the active contract
- which dataset or fixture basis was used
- which critical positive and degraded paths were checked
- which residual blockers or accepted deferments remain

This does not require a fixed template yet, but it prevents broad readiness claims that cannot be audited later.

### Readiness Claim Portability Boundary

Readiness evidence must not travel farther than the scope it actually proved.

Approved direction:
- a workspace-health check such as build/dev boot/schema validation does not by itself prove full slice-behavior readiness
- evidence for one slice does not by itself prove adjacent slices or untouched surfaces
- local-environment readiness does not by itself prove staging or production readiness
- a demo walkthrough or narrow fixture basis does not by itself prove broad local-bootstrap readiness
- readiness claims must stay anchored to the exact slice, environment tier, dataset basis, and path coverage actually exercised

---

## Related Documents

- `docs/06-implementation/testing-strategy.md`
- `docs/06-implementation/seed-and-demo-data-contract.md`
- `docs/06-implementation/environment-contract.md`
- `docs/06-implementation/ai-build-readiness.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- a slice is being called ready without tenant-isolation, auth, or critical-flow validation
- readiness depends on undocumented env/config assumptions
- final readiness is being declared while major contradictions still exist
