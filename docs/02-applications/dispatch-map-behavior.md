# Dispatch Map Behavior

## Purpose

Define the canonical dispatch-map baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- map-led dispatch that overrides authoritative booking and driver state
- hard dependency on live map data for core dispatch operations
- unclear stale-location handling inside the dispatch map
- unsupported assumptions that the map is always available, accurate, or required

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical dispatch-map contract for the dispatch domain.

---

## Scope

This document covers:
- dispatch-map role
- relationship between map and authoritative dispatch controls
- baseline map contents
- stale/degraded map behavior
- operational fallbacks when the map is unavailable or weak

---

## Out of Scope

This document does not define:
- map provider selection
- route rendering implementation
- ETA calculation source
- detailed candidate ranking logic
- customer-facing map behavior

Those belong to later maps, ranking, and customer-visibility contracts.

---

## Related Documents

- `docs/02-applications/admin-dispatch-system.md`
- `docs/02-applications/dispatch-decision-contract.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/03-services/realtime-system.md`

---

## Canonical Rules

1. The dispatch map is an advisory support tool, not the authoritative source of truth.
2. Core dispatch operations must remain usable without the map.
3. Stale or degraded map data must be explicit.
4. Booking state, driver state, and explicit dispatch controls remain authoritative over map visuals.
5. Map availability must not become a hidden precondition for core dispatch work.

---

## Map Role Baseline

Approved direction:
- the dispatch map supports operator awareness and decision-making
- it does not replace booking lists, queues, or explicit assignment controls
- it should help operators understand live operational context, not silently dictate operational truth

This is the safest first baseline.

---

## What the Map May Show

Current baseline map content may include:
- driver positions where available
- pickup points
- assigned trip context
- optional route/path context where later approved

The map is useful because it compresses live context visually.
But visual context must not be treated as the only source of operational truth.

---

## Authoritative Sources

The dispatch map is not authoritative over:
- booking lifecycle state
- driver lifecycle state
- assignment status
- freshness eligibility rules

Canonical direction:
- the authoritative operational record remains in booking, driver, allocation, and dispatch-state logic
- the map reflects that record where possible
- the map must not silently overrule explicit state/control information

---

## Relationship to Location Freshness

Map usefulness depends on location freshness.

Current direction:
- stale-location drivers may still appear on the map if operationally visible
- stale state must be explicit
- missing or weak live-location context must also be explicit rather than silently rendered as if the last map position were fresh
- stale map visuals must not be treated as trusted fresh dispatch guidance
- area restrictions or special-handling context must remain visible outside map-only cues so that operational meaning survives degraded map state

This aligns with the allocation contract:
- visibility can remain broader than automatic trust

---

## Core Dispatch Without Map

GreenRide must remain operational if the map is hidden, unavailable, or degraded.

Canonical rule:
- queues, booking lists, driver panels, and assignment controls must remain usable without the map
- core dispatch work must not collapse just because live map data is unavailable

This is essential for operational resilience.

---

## Degraded Map Behavior

If map data is weak, stale, delayed, or unavailable:
- the degraded state must be explicit
- the UI must not present stale visuals as current fact
- operators must still be able to work from the authoritative non-map controls

This means:
- no silent freezing
- no fake sense of precision
- no blocking of manual intervention

---

## Operational Use Boundary

The dispatch map may influence operator judgement.

But canonical direction is:
- the map supports judgement
- the map does not replace documented dispatch rules
- map context may justify manual override, but it does not redefine the dispatch-decision contract

This prevents visual heuristics from becoming undocumented business logic.

---

## Failure and Restriction Direction

- missing map data must not imply that bookings or drivers have disappeared
- stale positions must not be shown as if they were live without indication
- missing live updates must not be disguised by an apparently normal live marker
- dispatchers must still be able to assign, reassign, and intervene without the map
- degraded map state must reduce confidence explicitly rather than hiding the problem

---

## Invariants

1. The dispatch map is advisory support only.
2. Authoritative dispatch controls exist outside the map.
3. Stale/degraded map data must be explicit.
4. Core dispatch must remain usable without the map.
5. Visual map context must not silently become undocumented dispatch logic.

---

## Important Rule

GreenRide should use the dispatch map to improve operator awareness, but never make the map the hidden authority behind dispatch decisions.

---

## Stop Conditions

Stop and clarify before implementation if:
- the map is being treated as the only usable dispatch surface
- stale map data is being shown without clear indication
- visual map context is being used as if it automatically overrides explicit booking, driver, or dispatch state
