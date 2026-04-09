# Phase 5 Driver Domain Checklist

## Purpose

This checklist defines the main documentation work needed to make the driver domain implementation-safe.

It exists to turn the current fragmented driver, allocation, live-location, and fleet-adjacent material into a focused working list instead of a loose collection of partially related notes.

---

## Scope

This checklist is limited to the driver domain:
- driver lifecycle and state progression
- driver availability and job response behavior
- driver allocation and location rules
- driver navigation responsibility
- degraded connectivity and stale-location handling
- vehicle/fleet attributes that directly affect driver and trip operations

It does not cover:
- full dispatch ranking and queue behavior
- payment/earnings settlement detail
- maps/provider implementation detail as a standalone service contract

Those stay in later phases even where they intersect.

---

## Current Domain Read

What already exists:
- driver app concepts
- driver UI contract direction
- dispatch concepts that reference driver assignment
- partial realtime references

What is still missing:
- one canonical driver lifecycle state machine
- explicit allocation and live-location rules
- navigation responsibility and connectivity rules
- explicit vehicle/fleet contract tied to operations

The driver domain is therefore directionally present, but not yet implementation-safe as a whole.

---

## Phase 5 Main Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| Driver lifecycle state machine | partial | Canonical driver lifecycle now exists, but later unassignment/removal, connectivity, and completion-edge detail still need refinement | `docs/02-applications/driver-lifecycle-state-machine.md` |
| Driver allocation and location rules | partial | Canonical allocation/location baseline now exists, but later ranking, stale-threshold, and deeper reassignment detail still need refinement | `docs/02-applications/driver-allocation-and-location-rules.md` |
| Driver navigation and degraded connectivity rules | partial | Canonical navigation/connectivity baseline now exists, but heartbeat thresholds, provider details, and offline-sync mechanics still need refinement | `docs/02-applications/driver-navigation-and-connectivity-rules.md` |
| Vehicle management and attributes | partial | Canonical vehicle/fleet baseline now exists, but deeper capability matrices, compliance, maintenance, and fleet-ops detail still need refinement | `docs/02-applications/vehicle-management-and-attributes.md` |

---

## Recommended Working Order

1. Driver lifecycle state machine
2. Driver allocation and location rules
3. Driver navigation and degraded connectivity rules
4. Vehicle management and attributes

This order keeps:
- state first
- allocation/live operational behavior second
- degraded-mode and device realities third
- fleet/asset detail after that

---

## Completion Rule

Phase 5 driver documentation should not be treated as substantially complete until:
- each item above has a canonical document or clearly upgraded canonical home
- driver state, allocation, and connectivity rules stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/02-applications/driver-app.md`
- `docs/02-applications/driver-app-full.md`
- `docs/05-frontend/driver-ui-contract.md`
- `docs/01-product/dispatch-system.md`
- `docs/03-services/realtime-system.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
