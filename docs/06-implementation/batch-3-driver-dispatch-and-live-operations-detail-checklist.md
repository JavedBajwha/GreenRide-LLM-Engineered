# Batch 3 Driver, Dispatch, and Live Operations Detail Checklist

## Purpose

Provide a focused execution checklist for the third closure batch in GreenRide's endgame documentation pass.

This checklist exists to reduce the remaining operational ambiguity across:
- driver lifecycle and trust state
- allocation and assignment behavior
- dispatch logic and dashboard behavior
- live location freshness and degraded mode
- navigation and connectivity failure handling
- vehicle and fleet interaction with live operations
- zone, geofence, and custom-location operational controls

---

## Scope

This batch covers the remaining `partial` follow-through in:

- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/dispatch-decision-contract.md`
- `docs/02-applications/dispatch-map-behavior.md`
- `docs/02-applications/driver-navigation-and-connectivity-rules.md`
- `docs/02-applications/vehicle-management-and-attributes.md`
- `docs/02-applications/dispatch-ranking-and-fallback.md`
- `docs/02-applications/zone-geofence-and-custom-location-management.md`
- linked route, booking, and frontend ops docs only where live-operations boundaries require it

This batch does not redesign the dispatch model.
It is focused on making the existing driver, dispatch, and live-operations model more exact and internally aligned.

---

## Ordered Checklist

### 1. Driver Lifecycle Alignment

- review remaining ambiguity around availability, acceptance, trip-start, and exception boundaries
- verify lifecycle wording stays consistent with allocation, dispatch, and live-location docs

Current pass progress:
- lifecycle wording now states more clearly that `job_offered` remains the real pre-commitment boundary and that freshness/connectivity context must not silently rewrite driver lifecycle truth

### 2. Allocation and Assignment Tightening

- review allocation, acceptance, reassignment, and unassignment wording
- tighten areas where stale state, timeout, or fallback behavior could still drift

Current pass progress:
- allocation and dispatch docs now state more clearly that stale or missing location reduces automatic trust, not operational visibility, and that cleared offers or removals must return both booking and driver to an explicit valid dispatch path

### 3. Dispatch Logic and Ranking Tightening

- review dispatch decision rules, ranking direction, and fallback wording
- verify degraded-mode and no-driver-available behavior are aligned with assignment rules

Current pass progress:
- dispatch decision and ranking docs now stay more explicitly aligned on gate-before-rank, explicit unresolved outcomes, and the difference between low confidence and no valid candidate
- dispatch, ranking, and allocation docs now state more clearly that retry and reassignment paths must remain bounded by explicit policy or confidence limits and must end in visible operational review rather than silent churn

### 4. Live Location and Freshness Tightening

- review freshness, stale-state, offline, and last-known-location language
- verify dispatch, driver, and customer-facing live-state trust boundaries stay aligned

Current pass progress:
- driver, allocation, dispatch, and map docs now state more clearly that stale or missing live-location context must not be displayed or consumed as if it were fresh operational truth

### 5. Navigation and Connectivity Tightening

- review driver navigation, degraded connectivity, and recovery wording
- verify connectivity failure does not silently rewrite lifecycle or dispatch truth

Current pass progress:
- navigation/connectivity docs now state more clearly that handoff failure, pending delivery, and last-known local context must not be treated as lifecycle truth or confirmed live platform acknowledgement

### 6. Vehicle / Fleet and Live-Ops Linkage

- review vehicle/fleet availability and suitability wording where it affects live operational decisions
- verify vehicle constraints do not drift into undocumented dispatch behavior

Current pass progress:
- vehicle, allocation, dispatch, and ranking docs now state more clearly that allocation readiness is driver-plus-vehicle readiness and that lost vehicle suitability must return the booking to explicit reassessment rather than silently preserve trust in the earlier assignment

### 7. Zone / Geofence / Custom-Location Operational Tightening

- review operational zone, geofence, and custom-location wording
- verify these controls stay aligned with dispatch behavior and do not silently override booking/pricing contracts

Current pass progress:
- zone, geofence, and custom-location docs now state more clearly that area rules may either block normal assignment or require visible special-handling, and that those outcomes must remain explicit outside map-only context

### 8. Cross-Document Alignment Check

- verify no stale contradictions remain across Batch 3 docs
- update tracker, gap register, and continuity notes with honest outcomes

Current review judgment:
- Batch 3 scope is now strong enough to proceed to a final completion check
- the remaining open items are detail-level partials, not major internal contradictions across the driver, dispatch, and live-operations trust model

Completion judgment:
- Batch 3 can now be treated as substantially complete
- no blocking contradiction remains across driver lifecycle, allocation readiness, dispatch decision flow, degraded ranking/fallback, map advisory boundaries, navigation/connectivity trust, vehicle suitability linkage, or area-rule operational meaning
- the remaining open items are still partial, but they are detail-level follow-through rather than closure blockers for this batch

---

## Finish Criteria

Batch 3 can be treated as substantially closed only when:

- driver, dispatch, and live-state docs are internally aligned
- freshness, reassignment, and degraded-mode rules are clearer
- vehicle and zone controls are linked cleanly into live operations
- remaining uncertainty is explicitly deferred rather than left implicit

---

## Stop Conditions

Stop and clarify before claiming this batch is closed if:

- driver lifecycle and dispatch-assignment rules still contradict each other
- stale or missing live-location data can still be interpreted as fresh operational truth
- reassignment and fallback behavior are still vague enough to drift into undocumented dispatch outcomes
- vehicle, zone, or custom-location controls still blur booking/pricing authority with live operational authority

Current review result:
- these stop conditions are not currently triggered at a blocking level

---

## Related Documents

- `docs/06-implementation/final-partial-closure-plan.md`
- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`
