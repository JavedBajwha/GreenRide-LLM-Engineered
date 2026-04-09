# Driver Allocation and Location Rules

## Purpose

Define the canonical driver allocation and live-location baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- allocation behavior that uses stale driver location as if it were trustworthy
- auto-dispatch rules that silently ignore driver freshness or eligibility
- inconsistent boundaries between driver visibility, auto-selection, and manual override
- map/location assumptions that belong to later provider-specific contracts

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical driver allocation and location contract for the driver domain.

---

## Scope

This document covers:
- allocation readiness baseline
- eligibility and freshness boundaries
- automatic candidate-selection guardrails
- manual override relationship
- operational visibility of fresh versus stale drivers

---

## Out of Scope

This document does not define:
- scoring/ranking algorithm detail
- exact stale thresholds or heartbeat intervals
- map provider behavior
- offline queue/sync mechanics
- final dispatch queue UX

Those belong to later dispatch, connectivity, and maps contracts.

---

## Related Documents

- `docs/01-product/dispatch-system.md`
- `docs/02-applications/admin-dispatch-system.md`
- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/03-services/realtime-system.md`
- `docs/05-frontend/driver-ui-contract.md`

---

## Canonical Rules

1. Automatic allocation must use only allocation-ready drivers.
2. Stale-location drivers may remain visible to dispatch, but must be excluded from normal auto-dispatch candidate selection.
3. Driver allocation requires both operational eligibility and usable freshness state.
4. Manual dispatch override may use a stale-location driver only as an explicit human decision.
5. Visibility is broader than auto-dispatch eligibility.

---

## Allocation Readiness Baseline

A driver should only be treated as allocation-ready when all required baseline conditions are true.

Current baseline:
1. driver belongs to the same tenant
2. driver state is operationally assignable
3. driver is not already committed to an incompatible active job
4. driver meets booking and vehicle suitability requirements
5. driver is not blocked by compliance or tenant restrictions
6. driver location/freshness state is acceptable for the allocation path

Operational reading:
- allocation readiness is not driver-only readiness
- if the candidate driver's usable vehicle context becomes inactive, unsuitable, or unavailable for the booking, the driver must stop being treated as allocation-ready for that assignment path

This document does not define the full ranking model.
It defines the baseline gate before ranking can even matter.

---

## Driver State Boundary for Allocation

Driver lifecycle remains the first boundary.

Current direction:
- `available` is the normal starting point for allocation readiness
- `job_offered` means the driver is already in an offer flow and should not be treated as a clean fresh candidate for another normal assignment
- `assigned`, `driver_en_route`, `arrived`, and `in_progress` are not allocation-ready
- `paused` and `offline` are not allocation-ready

This prevents the allocation layer from ignoring the driver lifecycle backbone.

---

## Fresh Versus Stale Location Boundary

Driver location freshness affects what the system may safely do.

Approved direction:
- fresh-location drivers may be considered for automatic candidate selection
- stale-location drivers may still be shown to dispatchers for awareness
- stale-location drivers must be excluded from normal auto-dispatch until freshness is restored or a dispatcher explicitly overrides
- missing live location must be treated at least as weak as stale location for automatic trust purposes unless a later explicit policy proves otherwise

This is the clean safety boundary for the first canonical allocation contract.

---

## Visibility Versus Eligibility

A driver may be visible in operations without being eligible for auto-dispatch.

Examples:
- stale location
- paused state
- temporary compliance concern
- already engaged in another incompatible workflow

Canonical rule:
- operational visibility does not imply allocation eligibility

This is especially important in dispatch views where the system should show reality without pretending every visible driver is a valid automatic candidate.

---

## Auto-Dispatch Candidate Baseline

Before a driver enters the candidate pool for automatic assignment, the system should check:
1. tenant match
2. state/availability compatibility
3. booking/vehicle suitability
4. restriction/compliance compatibility
5. acceptable location freshness

Only after those gates pass should later ranking or priority logic run.

This keeps auto-dispatch explainable and safe.

---

## Manual Override Boundary

Dispatchers may need to make operational decisions the system would not make automatically.

Approved direction:
- manual override can use drivers that are visible but not normal auto-dispatch candidates
- using a stale-location driver through override must remain explicit and auditable
- manual override must not silently rewrite the general auto-dispatch rule

This gives dispatch users operational flexibility without weakening the core automatic safety model.

---

## Live Location Role

Live location is an operational input, not the only source of truth.

Canonical direction:
- location may help determine suitability, freshness, and dispatch confidence
- allocation must not assume map/location is perfect or always available
- stale/missing location should degrade auto-dispatch trust before it degrades operational visibility

This aligns with the broader platform rule that maps and realtime support operations, but do not replace authoritative state.

---

## Reassignment Direction

Allocation rules also matter when a job leaves one driver and returns to the queue.

Current baseline:
- rejected offers
- timed-out offers
- withdrawn offers
- removed assignments

should return the booking to a valid dispatch path rather than leaving the previous driver in candidate limbo.

Current trust boundary:
- the cleared or removed driver must also return to an explicit valid driver-lifecycle state rather than remain operationally half-assigned
- stale or missing location must not be used as a shortcut for silent reassignment success
- repeated reject/timeout cycles must not be treated as harmless background churn once the dispatch path has reached its policy or confidence limit

Later dispatch contracts will define the deeper reassignment workflow.
This document only locks the allocation/input side.

---

## Failure and Degraded Direction

- no fresh eligible drivers should produce a visible dispatch problem, not a silent failure
- stale location should reduce automatic trust, not erase driver visibility entirely
- missing live data must not cause the platform to pretend the driver is fresh
- manual override use of degraded candidates must remain explicit

---

## Invariants

1. Auto-dispatch uses only allocation-ready drivers.
2. Freshness affects auto-dispatch eligibility.
3. Stale drivers may remain operationally visible.
4. Visibility is not the same as eligibility.
5. Manual override does not change the general auto-dispatch baseline.

---

## Important Rule

GreenRide should treat driver location as a confidence input for allocation, not as permission to ignore driver state, eligibility, or freshness boundaries.

---

## Stop Conditions

Stop and clarify before implementation if:
- stale-location drivers are being used in auto-dispatch as if they were fresh candidates
- visibility in the dispatch UI is being treated as automatic eligibility
- manual override behavior is being used to justify weaker default auto-dispatch rules
