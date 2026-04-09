# Seed and Demo Data Contract

## Purpose

Define the approved baseline for seed, fixture, and demo data in GreenRide.

This document exists so AI and future implementation work do not invent:
- unrealistic demo states
- inconsistent fixture coverage
- unsafe mixing of demo data and real tenant data

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- baseline demo-data content
- required lifecycle states
- reset behavior
- named baseline datasets
- validation-oriented data coverage
- safety boundaries between demo/test data and real data
- dataset-to-slice coverage mapping
- reset-mode direction

---

## Out of Scope

This document does not define:
- exact seed script implementation
- tooling for data loading
- anonymisation strategy for any future real-data import workflow

---

## Canonical Rules

1. Demo data must support realistic validation of the major product surfaces.
2. Demo data must be resettable to a known baseline.
3. Demo/test data must not mix into real production tenant data.
4. Deterministic states and IDs should be used where practical to keep validation repeatable.

---

## Required Demo-Data Baseline

Approved first baseline includes:
- platform demo tenant
- tenant staff users
- driver users
- customer users
- vehicles
- routes
- quotes and bookings in mixed states
- pricing rules
- reporting-friendly sample history

This baseline exists to support realistic validation across booking, operations, reporting, and governance surfaces.

---

## Named Baseline Dataset Direction

Approved first dataset grouping:
- `platform_baseline`
- `tenant_ops_baseline`
- `customer_booking_baseline`
- `driver_dispatch_baseline`
- `reporting_baseline`

Expected meaning:
- `platform_baseline`: platform control and platform ops visibility data
- `tenant_ops_baseline`: staff users, bookings, incidents, pricing, and ops-facing structures
- `customer_booking_baseline`: quote, booking, amendment, cancellation, and tracking-ready records
- `driver_dispatch_baseline`: driver users, vehicles, offers, assignments, and trip progression states
- `reporting_baseline`: time-distributed history suitable for KPI, filters, and exports

This keeps demo data aligned with actual validation use instead of one vague global seed.

### Dataset Purpose Boundary

Named datasets should stay explicit about purpose:
- baseline bootstrap data for ordinary local development
- validation-oriented fixtures for repeatable slice checks
- demo/showcase data for guided walkthroughs

Rules:
- these purposes may reuse overlapping records, but they must not be treated as interchangeable by default
- a showcase-friendly dataset is not automatically a trustworthy validation fixture
- a narrow validation fixture is not automatically sufficient for broad local bootstrap or demo use

### Dataset Coverage Mapping

| Dataset | Primary Validation Use |
| --- | --- |
| `platform_baseline` | platform control, platform ops, governance visibility, audit/incident/release flows |
| `tenant_ops_baseline` | staff login, dispatch, booking management, pricing config, tenant reporting |
| `customer_booking_baseline` | quote expiry, booking creation, confirmation, amendment, cancellation, tracking |
| `driver_dispatch_baseline` | offer, assignment, driver lifecycle, degraded connectivity, dispatch fallback |
| `reporting_baseline` | filters, exports, dashboard metrics, tenant/platform reporting separation |

---

## Required Tenant Lifecycle States

Demo data should include tenants in these states:
- `setup_in_progress`
- `ready_for_testing`
- `live`
- `suspended`

This supports validation of onboarding, restricted access, and go-live readiness behavior.

---

## Reset and Repeatability Rules

Seed/demo data should support:
- repeatable reset to a known baseline
- deterministic sample IDs or states where practical
- stable references for test and demo workflows

Where practical, named baseline users, tenants, and booking references should stay stable enough to support repeatable docs, demos, and automated checks.

### Reset Modes

Approved first reset direction:
- full baseline reset for clean local/demo recovery
- dataset-focused reset where a narrower validation target needs only one or two baseline groups

Rules:
- dataset-focused reset must still preserve required cross-dataset references
- reset should not depend on manual cleanup steps that are undocumented
- repeated reset must converge to the same known state
- any claimed reset target should name the dataset group or purpose it restores

### Validation Fixture Direction

Where a slice claims repeatable validation support, the supporting dataset direction should be explicit enough to identify:
- the named dataset group or narrow fixture basis
- the reset mode used before validation
- the stable references expected by the slice

This does not require exact tooling yet, but it prevents readiness claims from relying on vague “seeded enough” assumptions.

### Dataset Evidence Portability Boundary

Dataset evidence must not be stretched beyond the purpose the dataset was prepared for.

Approved direction:
- a demo/showcase dataset does not by itself prove repeatable validation support
- a narrow validation fixture does not by itself prove broad local bootstrap readiness
- one dataset group proving one slice or surface does not by itself prove unrelated slices or surfaces
- readiness claims should name the exact dataset group and purpose they rely on instead of implying that any seeded environment proves the whole app

---

## Safety Rules

- demo/test data must stay separated from real production tenant data
- no production workflow should assume demo data is present
- demo datasets must not weaken tenant-isolation expectations

Demo data should also avoid:
- hidden reliance on manual patch-up after reset
- one-off local-only assumptions that cannot be reproduced in another environment

### Environment Separation Rule

Demo and fixture datasets should be clearly marked by purpose:
- local developer bootstrap
- automated validation fixtures
- demo/showcase datasets

These purpose labels should remain visible in readiness evidence so later validation claims can distinguish:
- broad local bootstrap data
- slice-focused repeatable fixtures
- presentation-oriented demo data

---

## Related Documents

- `docs/06-implementation/testing-strategy.md`
- `docs/06-implementation/operational-readiness-checks.md`
- `docs/03-platform/tenant-onboarding.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- demo data needs to be mixed with real tenant data
- demo data is expected to replace proper test setup isolation
- tenant lifecycle states used in seeds conflict with the canonical tenant-state model
