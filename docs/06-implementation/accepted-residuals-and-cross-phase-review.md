# Accepted Residuals and Cross-Phase Review

## Purpose

Record which remaining documentation gaps in GreenRide are accepted residuals rather than active shape blockers, and capture the cross-phase review needed to keep later implementation honest.

This document exists so the repo does not:
- leave low-priority review residue scattered as if it were still missing shape work
- pretend every remaining `partial` is equally blocking
- lose sight of which follow-through items are acceptable to defer

---

## Status

Current review baseline for accepted residuals.

This document is not a claim that GreenRide is fully complete.
It is a controlled statement about what remaining uncertainty is acceptable for now.

---

## Scope

This document covers:
- accepted residuals from completed documentation waves
- cross-phase drift risks
- what still needs future tightening
- what is safe to defer without misrepresenting readiness

---

## Out of Scope

This document does not:
- replace the domain contracts
- overrule explicit blockers
- mark external dependencies complete
- declare production readiness

---

## Canonical Rules

1. A residual may be accepted only if the canonical domain contract already exists.
2. Accepted residuals are later-detail or linkage work, not missing product shape.
3. External blockers remain blockers even if most of the repo is mature.
4. Accepted residuals must still be visible in the master tracker or readiness gate where relevant.

---

## Cross-Phase Review Summary

### Customer Booking Wave

Reviewed against:
- payment and consent
- realtime and visibility
- tenant ops handoff

Accepted residual direction:
- payment-provider-specific outcomes
- richer field-level tracking visibility
- exact guest/account UX differences

These are important, but they no longer block the booking-domain shape.

### Driver Wave

Reviewed against:
- dispatch
- realtime
- vehicle/fleet detail

Accepted residual direction:
- exact heartbeat thresholds
- offline-sync mechanics
- deeper capability/compliance matrices

These are follow-through details, not missing driver-model shape.

### Dispatch Wave

Reviewed against:
- realtime
- maps/address
- pricing-location linkage

Accepted residual direction:
- final ranking thresholds
- deeper map/provider specifics
- finer area-policy matrices

These are implementation-detail refinements, not missing dispatch structure.

### Service Wave

Reviewed against:
- payments
- notifications
- realtime
- maps/address

Accepted residual direction:
- provider/connector choice
- payload and transport detail
- richer audience/channel/provider matrices

These remain meaningful later work, but the service-layer boundaries are already documented.

### Frontend Contract Wave

Reviewed against:
- route gating
- widget catalogs
- zone maps
- shell boundaries
- compatibility stance

Accepted residual direction:
- page-level screen behavior
- widget-level metadata depth
- final visual/state copy
- plugin packaging and delivery mechanics

These are detailed follow-through items, not missing frontend shape.

### Future Wave 1 Add-On Baselines

Reviewed against:
- module and commercial anchoring
- route and surface ownership
- realtime and tracking boundaries
- notifications and reporting follow-through

Accepted residual direction:
- deeper School Run schedule and lifecycle matrices
- deeper parcel logistics lifecycle and proof-edge detail
- richer add-on-specific reporting and notification matrices
- later threshold and policy detail inside add-on-specific pricing models

These are now accepted residuals because both add-ons have baseline contracts.
They are not treated as missing product shape anymore.

---

## Accepted Residual Categories

The following categories are now accepted residuals rather than active low-grade blockers:

- cross-phase review follow-through for completed waves
- finer provider/connector choices
- exact constants and thresholds not yet approved
- deeper page-level UI detail where surface contracts already exist
- richer matrices inside already-approved domains
- deeper Future Wave 1 add-on matrices now that School Run and Parcel baseline
  contracts exist

They should still be refined later.
They are just no longer the right reason to claim the repo lacks system shape.

---

## Still-Active Non-Residual Blockers

These are not accepted residuals:
- any contradiction between linked domain contracts
- any future implementation that tries to treat residual detail as fully decided when it is not

## Residual Safety Rule

During implementation:

- partial documentation must not be treated as fully defined behaviour
- if a code path depends on a partial area:
  - the dependency must be made explicit
  - or implementation must stop and the documentation gap must be reopened

AI must not invent values, thresholds, or business logic across:
- pricing
- dispatch
- lifecycle transitions
- financial behaviour

## AI Implementation Protocol

During implementation:

AI may:
- implement explicitly defined behaviour
- implement structure where detail is partial
- leave configurable placeholders where needed

AI must not:
- invent values, thresholds, or decision logic
- assume meaning for partial areas
- merge concepts across defined boundaries
- optimise or redesign system behaviour

AI must stop and reopen docs if:
- implementation depends on undefined detail
- multiple interpretations are possible
- pricing, dispatch, lifecycle, or financial behaviour is unclear
- a decision would affect system truth or money flow

---

## Practical Meaning

GreenRide is now in a state where:
- system shape is largely documented
- major weak gaps are gone
- most remaining work is detail refinement
- readiness claims still need honesty about residual detail and external blockers

That means later implementation work can proceed with caution in documented areas, while still respecting unresolved detail.

For Future Wave 1 specifically:
- School Run and Parcel now have first-pass system shape documented
- deeper add-on detail remains residual follow-through, not missing-shape
  recovery
- any implementation that needs richer schedule, proof, reporting, or detailed
  lifecycle semantics must still reopen docs before guessing

---

## Related Documents

- `docs/06-implementation/current-gap-priority-review.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/ai-build-readiness.md`

---

## Stop Conditions

Stop and clarify before using this document to justify progress if:
- a residual is actually masking a missing domain contract
- an external dependency is being silently reclassified as “acceptable”
- a trust-critical implementation detail is being treated as fully decided when the repo still marks it as later detail
