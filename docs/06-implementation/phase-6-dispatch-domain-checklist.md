# Phase 6 Dispatch Domain Checklist

## Purpose

This checklist defines the main documentation work needed to make the dispatch domain implementation-safe.

It exists to turn the current strong-but-broad dispatch concepts into a focused working list instead of leaving dispatch logic spread across booking, driver, and admin-ops references.

---

## Scope

This checklist is limited to the dispatch domain:
- dispatch decision and assignment baseline
- dispatch map role and limits
- candidate ranking and degraded-mode fallback
- zone, geofence, and custom location management where dispatch depends on them

It does not cover:
- deeper realtime event contracts
- payment or reporting logic
- full frontend visual detail for dispatch UI

Those stay in later phases even where they intersect.

---

## Current Domain Read

What already exists:
- dispatch system product doc
- admin dispatch system doc
- driver lifecycle baseline
- driver allocation and location baseline

What is still missing:
- one canonical dispatch decision contract
- explicit dispatch map behavior boundaries
- explicit candidate ranking and degraded-mode fallback rules
- one coherent location/zone/geofence contract for dispatch-sensitive operations

The dispatch domain is therefore conceptually strong, but not yet implementation-safe as a whole.

---

## Phase 6 Main Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| Dispatch decision contract | partial | Canonical dispatch-decision baseline now exists, but later ranking detail, queue ownership, and deeper exception-path behavior still need refinement | `docs/02-applications/dispatch-decision-contract.md` |
| Dispatch map behavior | partial | Canonical dispatch-map baseline now exists, but provider detail, ETA/source detail, and richer map-layer behavior still need refinement | `docs/02-applications/dispatch-map-behavior.md` |
| Dispatch ranking and degraded-mode fallback | partial | Canonical ranking/fallback baseline now exists, but exact ordering criteria, confidence thresholds, and richer retry detail still need refinement | `docs/02-applications/dispatch-ranking-and-fallback.md` |
| Zone, geofence, and custom location management | partial | Canonical location-rule baseline now exists, but pricing usage, geocoding detail, and richer area-policy matrices still need refinement | `docs/02-applications/zone-geofence-and-custom-location-management.md` |

---

## Recommended Working Order

1. Dispatch decision contract
2. Dispatch map behavior
3. Dispatch ranking and degraded-mode fallback
4. Zone, geofence, and custom location management

This order keeps:
- dispatch decision backbone first
- map/support-tool boundary second
- degraded and ranking behavior third
- geo/location rule detail after that

---

## Completion Rule

Phase 6 dispatch documentation should not be treated as substantially complete until:
- each item above has a canonical document or clearly upgraded canonical home
- dispatch decision, visibility, and fallback rules stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/01-product/dispatch-system.md`
- `docs/02-applications/admin-dispatch-system.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
