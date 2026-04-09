# Dispatch Decision Contract

## Purpose

Define the canonical dispatch decision and assignment baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- conflicting manual vs automatic dispatch behavior
- assignment decisions that bypass the driver and vehicle readiness rules already documented elsewhere
- reassignment and override behavior that drift away from the main dispatch model
- fake "smart" dispatch steps with no explicit operational contract

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical dispatch decision contract for the dispatch domain.

---

## Scope

This document covers:
- dispatch-mode baseline
- assignment decision flow
- relationship between automatic and manual dispatch
- reassignment baseline
- decision outputs and guardrails

---

## Out of Scope

This document does not define:
- detailed candidate scoring algorithm
- dispatch map behavior
- geo/zone restriction contract
- realtime transport/event implementation
- full queue UI behavior

Those belong to later dispatch, location, and realtime contracts.

---

## Related Documents

- `docs/01-product/dispatch-system.md`
- `docs/02-applications/admin-dispatch-system.md`
- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/vehicle-management-and-attributes.md`

---

## Canonical Rules

1. GreenRide uses a hybrid dispatch model by default.
2. Automatic dispatch may attempt assignment where tenant policy allows and assignment conditions are good enough.
3. Manual dispatch and override must remain available where tenant policy allows.
4. Dispatch decisions must not bypass documented driver, vehicle, freshness, or area-rule constraints.
5. Reassignment is part of the dispatch model, not an afterthought.

---

## Dispatch Model Baseline

Approved direction:
- hybrid dispatch is the default practical model
- automatic dispatch may run first where configured and safe
- manual intervention remains available where policy allows

This means GreenRide should not be modelled as:
- purely manual by assumption
- purely autonomous by assumption

The platform must support both automated assistance and human operational judgement.

---

## Assignment Preconditions

Before a dispatch decision can produce assignment, the booking must be in the correct operational path.

Current baseline:
- the booking is confirmed and in dispatch-ready flow
- the dispatch path has access to the required booking context
- there is at least potential candidate availability or an explicit reason that no candidate exists
- service-area and location-rule evaluation has not already blocked the booking from the normal assignment path

Dispatch must not be treated as part of quote confirmation or pre-confirmation booking capture.

---

## Automatic Dispatch Baseline

Automatic dispatch means the platform attempts to choose a driver without requiring a dispatcher to make the first decision manually.

Canonical direction:
- auto-dispatch may run where tenant policy/config allows
- auto-dispatch must rely on documented candidate-readiness and suitability rules
- auto-dispatch should stop cleanly when conditions are not good enough or no suitable candidate exists

This prevents "automation" from being treated as permission to guess.

---

## Manual Dispatch Baseline

Manual dispatch means a dispatcher explicitly chooses the assignment path.

Canonical direction:
- manual dispatch may choose among operationally visible candidates
- manual dispatch may intervene where automation is unavailable, insufficient, or operationally weak
- manual actions must remain auditable

Manual dispatch is not a fallback hack.
It is a first-class part of the hybrid model.

---

## Override Boundary

Manual override is not the same thing as default assignment.

Approved direction:
- override may replace or interrupt the automatic path
- override may use visible-but-not-normal-auto candidates only when done explicitly by an authorised operator
- override must not silently weaken the default automatic safety model

This keeps human flexibility without making the rules meaningless.

---

## Assignment Decision Flow Baseline

Current canonical flow:
1. booking enters dispatch-ready path
2. dispatch mode/policy determines whether automatic attempt is allowed
3. candidate gate checks run against driver, vehicle, and freshness readiness
4. if a usable automatic path exists, the system produces an offer/assignment attempt
5. if no safe automatic path exists, the booking remains in a visible dispatch-needed state
6. manual intervention or later automatic retry may follow according to policy
7. if retry limits or confidence limits are reached, the booking must remain in an explicit unresolved dispatch path rather than appearing to be in a healthy continuing automatic cycle

This is the first backbone.
Later ranking and fallback contracts will refine the middle steps.

---

## Offer Versus Assignment Boundary

The dispatch decision contract must stay aligned with the driver lifecycle.

Canonical direction:
- dispatch decision may produce an offer/assignment attempt, but it must stay aligned with the documented driver commitment boundary rather than silently collapsing offer and assignment into the same thing
- where response is required, the `job_offered` boundary must remain real
- dispatch must not pretend a driver is fully committed before that boundary resolves

This prevents assignment semantics from drifting away from the driver contract.

---

## Reassignment Baseline

Reassignment is part of normal operations.

Typical triggers:
- driver rejects
- driver times out
- driver becomes unavailable
- dispatcher removes/replaces assignment
- booking changes invalidate the original assignment

Canonical direction:
- reassignment returns the booking to a valid dispatch decision path
- the previous driver must return to an explicit valid driver-lifecycle state rather than remain implied-assigned
- reassignment must be auditable
- the system must not leave the booking or previous driver in ambiguous assignment state
- repeated reassignment or re-offer failure must eventually resolve into explicit operational review rather than silent ongoing churn

---

## No-Candidate / No-Decision Baseline

Not every dispatch attempt will succeed.

Canonical direction:
- if no suitable candidate exists, the booking must remain clearly visible as unresolved
- failure to assign must not be hidden by fake pending states
- manual review/intervention should remain possible where policy allows

This is the core guardrail for operational honesty.

---

## Relationship to Driver and Vehicle Contracts

Dispatch decision does not define candidate readiness independently.

Current direction:
- driver lifecycle defines commitment boundary
- driver allocation/location rules define freshness and readiness boundary
- vehicle contract defines operational vehicle suitability baseline
- dispatch decision orchestrates these inputs into an assignment path
- if vehicle suitability is lost after an offer or assignment path has started, dispatch must return the booking to an explicit valid decision path rather than silently trusting the earlier match

This keeps the dispatch layer from silently reinventing upstream rules.

---

## Audit and Explainability Direction

Every critical dispatch decision path must remain explainable and auditable.

This includes:
- automated attempts
- manual assignments
- overrides
- reassignments
- unresolved no-candidate outcomes

The dispatch layer must not behave like a black box.

---

## Failure and Restriction Direction

- no-candidate situations must remain visible
- low-confidence automatic paths must remain visible as weaker than clean automatic assignment, not hidden as ordinary pending work
- degraded live data must reduce dispatch confidence rather than produce fake certainty
- area-rule restrictions or special-handling requirements must remain visible as operational causes, not hidden as generic dispatch weakness
- override must remain explicit
- dispatch must not bypass documented suitability/freshness boundaries just to produce an assignment quickly

---

## Invariants

1. Hybrid dispatch is the default baseline.
2. Auto-dispatch is allowed only where policy and readiness conditions allow it.
3. Manual dispatch/override remains a first-class operational path.
4. Dispatch decisions must stay aligned with driver, vehicle, and freshness contracts.
5. Reassignment is part of the dispatch contract, not an exception bolted on later.

---

## Important Rule

GreenRide dispatch should be fast and operationally flexible, but it must remain explainable, auditable, and bounded by real driver/vehicle readiness rather than optimistic guesswork.

---

## Stop Conditions

Stop and clarify before implementation if:
- the system is being treated as purely automatic by default
- manual override is being used to justify ignoring core readiness/suitability rules
- dispatch is treating offer, assignment, and commitment as the same thing with no explicit boundary
