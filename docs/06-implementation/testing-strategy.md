# Testing Strategy

## Purpose

Define the minimum testing baseline for GreenRide implementation work.

This document exists so AI and future implementation work do not invent:
- inconsistent test expectations
- slice completion without validation
- missing cross-surface happy-path coverage

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- minimum test layers by slice
- frontend and backend validation expectations
- happy-path E2E baseline
- negative-path expectations
- slice criticality guidance
- slice-completion test rule
- evidence expectations
- slice-to-layer emphasis matrix

---

## Out of Scope

This document does not define:
- exact toolchain or framework selection
- CI pipeline implementation
- performance or load-test infrastructure

Those may be documented later if needed.

---

## Canonical Rules

1. A major slice is not complete because it exists; it is complete only after the documented validation baseline is met.
2. Test expectations should scale with slice criticality and user impact.
3. Auth, RBAC, tenant isolation, and critical operational flows require explicit validation.
4. Frontend happy-path coverage is required where a real frontend surface exists.

---

## Minimum Testing Layers Per Major Slice

Approved first baseline:
- contract/schema validation
- service/unit tests
- integration/API tests
- role/RBAC checks
- happy-path UI/E2E coverage where a frontend surface exists

This is the minimum completeness baseline for a major implemented slice.

### Slice-to-Layer Emphasis Matrix

| Slice Type | Must Be Strongest |
| --- | --- |
| trust-critical | integration, negative-path, audit visibility, tenant/RBAC validation |
| operational-critical | degraded-state validation, action safety, stale/live trust checks, role gating |
| workflow-critical | happy-path, business-rule correctness, repricing/state-transition checks |
| supporting | guardrail tests, route/state protection, configuration validation |

---

## Slice Criticality Guidance

Not every slice is equally risky.

Approved baseline:

| Slice Type | Examples | Minimum Expectation Emphasis |
| --- | --- | --- |
| trust-critical | auth, RBAC, tenant isolation, payment, emergency controls | strongest contract, integration, negative-path, and audit validation |
| operational-critical | dispatch, driver workflow, platform ops, realtime visibility | strongest stale/degraded, role, and operational-flow validation |
| workflow-critical | booking flow, pricing, customer tracking, tenant reporting | strong happy-path and business-rule validation plus repricing/failure checks |
| supporting | branding, dashboard customization, lower-risk configuration surfaces | baseline validation plus targeted guardrail checks |

This does not reduce the minimum layers.
It increases scrutiny where failure cost is higher.

---

## Backend Validation Expectations

Backend slices should validate:
- request/schema contracts
- service behavior
- integration/API boundaries
- tenant isolation behavior
- permission and role enforcement
- critical failure-path handling where the slice is sensitive

Where applicable, backend validation should also cover:
- idempotency or duplicate-action safety
- audit/logging visibility for sensitive actions
- fallback or degraded behavior when dependencies fail

---

## Frontend / E2E Validation Expectations

Where a real frontend surface exists, the first E2E happy-path baseline should include:
- customer booking happy path
- driver job acceptance and trip progression happy path
- tenant ops dispatch happy path
- platform control tenant/package management happy path
- platform ops incident/maintenance happy path

These are baseline flows, not the full future automation ceiling.

---

## Negative-Path Baseline

Happy-path validation is not enough for GreenRide.

Approved first negative-path baseline should cover, where relevant:
- permission denied or wrong-role access
- tenant-scope mismatch or tenant-restricted access
- gated/unavailable feature behavior
- stale or degraded operational data visibility
- invalid or expired quote / invalid booking reference
- payment failure or declined-path handling
- external dependency degradation where the UI still needs safe fallback behavior
- expired invite, recovery token, or restricted-auth-path handling for auth-sensitive slices
- failed export, stale widget, and blocked route behavior for reporting/frontend slices

These are not optional for trust-critical or operational-critical slices.

---

## Slice Completion Rule

A slice is not complete until it has:
- required docs complete
- required tests complete
- demo-data support where relevant
- readiness checks passed for that slice

This applies even if the feature visually appears “done.”

### Evidence-by-Slice Direction

Different slice types should leave different minimum evidence footprints.

Approved baseline:
- trust-critical slices should leave explicit evidence of role, tenant-scope, and sensitive-failure validation
- operational-critical slices should leave explicit evidence of stale/degraded handling and safe-action behavior
- workflow-critical slices should leave explicit evidence of happy-path completion plus key business-rule failure handling
- supporting slices should leave explicit evidence of guardrail validation and route/state protection

This keeps slice validation tied to risk instead of one generic "tests exist" claim.

---

## Evidence Rule

A slice should not be declared tested only because test files exist.

Approved direction:
- required layers should have named coverage intent
- validation should be tied back to the slice’s trust or operational risk
- when a layer is intentionally deferred, the gap should be explicit rather than silently omitted

### Evidence Baseline

Before a slice is called validated, the project should be able to point to:
- the documented slice scope
- which test layers were run
- which negative paths were intentionally covered
- which demo dataset or fixtures were used where relevant
- any known deferred validation and why it remains deferred

### Minimum Evidence Shape

The project should be able to describe evidence in a repeatable structure:
- slice name
- slice criticality
- layers exercised
- key positive paths covered
- key negative/degraded paths covered
- dataset/fixture basis
- unresolved validation deferments

This does not force one tooling stack.
It forces one clearer evidence shape.

### Evidence Portability Boundary

Validation evidence must not be generalized beyond the scope it actually exercised.

Approved direction:
- a backend-only validation pass does not by itself prove frontend-surface readiness
- a narrow repeatable fixture run does not by itself prove broad local-bootstrap coverage
- a demo/showcase walkthrough does not by itself prove repeatable validation evidence
- one happy-path run does not by itself prove negative-path, tenant-scope, RBAC, or degraded-state coverage
- evidence claims must stay tied to the exact slice, layer set, dataset basis, and environment tier that were actually exercised

---

## Related Documents

- `docs/06-implementation/seed-and-demo-data-contract.md`
- `docs/06-implementation/operational-readiness-checks.md`
- `docs/06-implementation/ai-build-readiness.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- a critical slice is expected to ship without RBAC or tenant-isolation validation
- a frontend surface is expected to count as complete with no happy-path validation
- a slice is being marked complete only because code exists
