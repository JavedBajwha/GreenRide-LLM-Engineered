# Driver Navigation and Connectivity Rules

## Purpose

Define the canonical driver navigation responsibility and degraded-connectivity baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- a full embedded turn-by-turn navigation stack by assumption
- weak/offline connectivity behavior that leaves the driver in ambiguous operational state
- stale-location behavior that is only a UI warning instead of an operational concern
- navigation assumptions that conflict with driver, dispatch, or realtime boundaries

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical navigation/connectivity contract for the driver domain.

---

## Scope

This document covers:
- driver navigation responsibility baseline
- navigation handoff direction
- degraded connectivity expectations
- stale-location awareness baseline
- safe operational behavior when live data is weak or unavailable

---

## Out of Scope

This document does not define:
- map provider choice
- external navigation-app compatibility matrix
- exact heartbeat interval or stale threshold numbers
- offline sync queue mechanics
- customer-facing map visibility rules

Those belong to later maps, realtime, and customer-visibility contracts.

---

## Related Documents

- `docs/02-applications/driver-app-full.md`
- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/03-services/realtime-system.md`
- `docs/05-frontend/driver-ui-contract.md`

---

## Canonical Rules

1. Driver navigation is handoff-first, not embedded turn-by-turn by default.
2. GreenRide provides trip context and navigation launch support, not a full in-app navigation stack by assumption.
3. Weak or missing connectivity must be explicit in the driver UI.
4. Degraded connectivity must not silently corrupt operational state or location confidence.
5. Stale location is an operational concern, not only a cosmetic UI state.

---

## Navigation Responsibility Baseline

Approved direction:
- GreenRide should show the driver:
  - pickup details
  - destination details
  - trip context
  - action/state controls
  - navigation launch action
- actual turn-by-turn route guidance should hand off to the device's map/navigation app by default

This is the first safe baseline.

It avoids:
- inventing embedded navigation infrastructure
- over-promising route guidance features
- tying driver execution to an undocumented in-app maps stack

---

## What GreenRide Owns

GreenRide owns the operational layer around the trip.

Current baseline responsibilities:
- job/pickup/dropoff context
- trip status progression
- driver state transitions
- navigation handoff entry point
- degraded/stale connectivity messaging

GreenRide does **not** automatically own:
- embedded turn-by-turn navigation
- full route rendering stack
- route recalculation engine

Those need separate later approval if ever brought in-platform.

---

## Navigation Handoff Boundary

Canonical direction:
- the driver app may launch external navigation with the known trip context
- the driver lifecycle and trip progression remain in GreenRide
- navigation guidance itself remains outside the baseline GreenRide responsibility
- navigation handoff success or failure must not by itself change assignment, arrival, or trip-progress truth

This means:
- navigation handoff failure should not erase trip context
- the driver can continue to see operational trip state even if external guidance is unavailable

---

## Connectivity Baseline

The driver app must expect unstable mobile connectivity.

Current baseline expectations:
- operational actions must acknowledge degraded connectivity clearly
- the UI must guard against duplicate taps/repeated action spam
- the driver must still see the latest safe local trip context where possible
- weak connectivity must not silently pretend that updates were definitely delivered

This is the minimum safe operational baseline.

---

## Stale Location Direction

Stale location is not just a visual inconvenience.

Approved direction:
- stale location must be visible to the driver when relevant
- stale location affects operational confidence
- stale location should align with dispatch-side freshness rules rather than becoming a separate driver-only interpretation

This document does not set the numeric threshold.
It sets the operational meaning.

---

## Weak/Offline Operational Behavior

When connectivity is weak or unavailable:
- the driver should still see current trip/job context where available locally
- the app should avoid presenting uncertain sync as successful completion
- critical trip actions must remain explicit about pending/uncertain delivery state if confirmation cannot be trusted
- the app must not leave the driver without basic trip context just because live updates degrade
- the app must not present last-known local context as if it were freshly acknowledged by the platform when that acknowledgement is uncertain

This is the current safety boundary.

---

## Relationship to Driver State

Connectivity and navigation are not canonical driver lifecycle states.

Examples of non-state conditions:
- weak signal
- stale location
- navigation app unavailable
- pending delivery confirmation

These are:
- connectivity conditions
- operational warnings
- sync conditions

They must not become canonical driver states by assumption.

This means:
- pending delivery confirmation is not a substitute for `assigned`, `arrived`, or `in_progress`
- connectivity weakness does not by itself move the driver into `offline` or any custom lifecycle state

---

## Relationship to Allocation

Connectivity and freshness affect more than the driver UI.

Current direction:
- stale location affects dispatch confidence and auto-allocation eligibility
- driver-side degraded connectivity messaging should remain consistent with the allocation freshness model
- a driver with weak connectivity may remain visible, but that does not imply trusted fresh auto-dispatch readiness

This keeps the driver app and dispatch side aligned.

---

## Failure and Restriction Direction

- navigation launch failure must not destroy trip context
- weak connectivity must not silently mark operational updates as successful when confirmation is uncertain
- stale location must not be hidden when it affects operational trust
- offline/degraded mode must reduce confidence explicitly rather than inventing fake certainty
- driver-side fallback to last-known context must remain visibly weaker than confirmed live platform state

---

## Invariants

1. Navigation is handoff-first by default.
2. GreenRide owns trip context and status progression, not full embedded route guidance by assumption.
3. Connectivity conditions are not driver lifecycle states.
4. Stale location is an operational concern.
5. Degraded connectivity must be explicit.

---

## Important Rule

GreenRide should help the driver execute trips safely under real mobile conditions without pretending it already owns a full navigation stack or perfect realtime connectivity.

---

## Stop Conditions

Stop and clarify before implementation if:
- embedded turn-by-turn navigation is being added by assumption
- stale/weak connectivity is being treated as a purely cosmetic warning
- uncertain sync or action delivery is being presented as guaranteed success
