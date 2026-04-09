# Dispatch Ranking and Fallback

## Purpose

Define the canonical dispatch ranking and degraded-mode fallback baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- opaque weighted scoring systems with no operational contract
- candidate ordering that bypasses the readiness gates already documented elsewhere
- degraded-mode behavior that silently pretends dispatch confidence is unchanged
- retry/re-offer behavior that loops unpredictably

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical dispatch ranking and fallback contract for the dispatch domain.

---

## Scope

This document covers:
- candidate ranking baseline
- deterministic gate-and-rank direction
- rejection/re-offer baseline
- degraded-mode fallback direction
- relationship between ranking and manual override

---

## Out of Scope

This document does not define:
- map provider detail
- exact distance/ETA formula
- geofence/location contract
- realtime transport/event implementation
- queue UI detail

Those belong to later maps, location, realtime, and UI contracts.

---

## Related Documents

- `docs/02-applications/dispatch-decision-contract.md`
- `docs/02-applications/dispatch-map-behavior.md`
- `docs/02-applications/driver-allocation-and-location-rules.md`
- `docs/02-applications/driver-lifecycle-state-machine.md`
- `docs/02-applications/vehicle-management-and-attributes.md`

---

## Canonical Rules

1. Dispatch ranking should remain deterministic and explainable.
2. Candidate gates run before ranking.
3. Ranking must not bypass readiness, suitability, or freshness boundaries.
4. Degraded live data must reduce automatic confidence and may force fallback to manual review.
5. Re-offer/retry behavior must remain controlled rather than looping indefinitely.

---

## Ranking Model Baseline

Approved direction:
- use a simple gate-and-rank model first
- do not assume a flexible weighted scoring engine by default

Meaning:
- candidate eligibility is resolved first
- only then are valid candidates ordered
- the ordering logic must remain explainable enough for operators and later audit

This is the safest baseline for an operations-heavy product.

---

## Candidate Gate First

Ranking is not the first step.

Before ranking, the dispatch path must already have filtered candidates using:
- tenant match
- driver state/availability compatibility
- vehicle suitability
- compliance/restriction compatibility
- freshness/location trust boundary

Only gated candidates are rankable candidates.

This keeps ranking from becoming a hidden override of upstream safety rules.

Operational reading:
- if the vehicle side of a candidate stops satisfying the booking after gating, the candidate must leave the trusted ranking pool rather than keep its earlier rank by inertia

---

## Ordered Ranking Baseline

Once the candidate pool is gated, the system may apply an ordered ranking sequence.

Current baseline examples may include:
1. suitability compatibility first
2. freshness/location confidence
3. distance/proximity considerations where later approved
4. tenant-priority ordering rules
5. deterministic tie-break behavior

This is intentionally simple.
Later detail can refine the exact ranking sequence, but the model should stay ordered and explainable.

---

## Explainability Rule

Dispatch ranking must remain explainable.

Canonical direction:
- operators should be able to understand why one candidate was preferred over another at a meaningful level
- the platform must not behave like an undocumented black-box score engine

This matters for:
- trust
- override judgement
- auditability
- debugging operational edge cases

---

## Rejection and Re-Offer Baseline

The dispatch system must handle rejected or unanswered offers cleanly.

Current baseline direction:
- rejected, timed-out, or withdrawn candidates leave the current offer path
- the booking re-enters a valid dispatch-decision path
- the previous driver must not remain implied-assigned after the offer path is cleared
- the system may retry with the next valid ranked candidate where policy allows

Important guardrail:
- retries/re-offers must not loop indefinitely
- retries must remain bounded by explicit policy or confidence limits, not by vague optimism that the next attempt will eventually work
- repeated failure must eventually surface as an explicit unresolved dispatch problem

---

## Degraded-Mode Fallback Baseline

Automatic ranking confidence may degrade when live operational inputs are weak.

Examples:
- stale driver location
- missing live updates
- reduced confidence in proximity context
- map degradation that removes useful visual support

Canonical direction:
- degraded inputs should reduce automatic confidence
- where confidence drops too far, the system should stop pretending automation is equally strong
- fallback may mean leaving the booking visible for manual review/intervention rather than forcing an optimistic automatic choice
- missing live-location context should be treated as degraded input rather than silently promoted to fresh proximity confidence
- repeated reject/timeout paths should also reduce confidence in further automatic retry rather than silently behaving as if each retry is equally strong

This is the core degraded-mode guardrail.

---

## No-Candidate and Low-Confidence Boundary

Two distinct cases must remain visible:

1. no valid candidate exists
2. valid candidates exist, but automatic confidence is not good enough

These are related but not identical.

Canonical direction:
- both cases should remain operationally visible
- neither case should be hidden behind fake "pending dispatch" confidence
- when retry limits or confidence limits are reached, the booking should remain clearly unresolved rather than looking like an ordinary still-healthy automatic cycle

This keeps dispatch honest under imperfect conditions.

---

## Relationship to Manual Override

Manual override remains outside the default automatic ranking path.

Canonical direction:
- manual override may choose differently from the automatic order
- manual override may use operator judgement when ranking is weak or degraded
- manual override must stay explicit and auditable

This keeps human judgement available without weakening the automatic baseline.

---

## Relationship to Dispatch Map

Map context may support operator awareness, but it is not the ranking authority.

Canonical direction:
- map context may help explain why confidence is lower
- map visuals must not silently override the documented gate-and-rank rules
- degraded map state should make operators more cautious, not create hidden map-led dispatch logic

---

## Failure and Restriction Direction

- degraded live data must reduce trust rather than produce fake certainty
- ranking must not continue as if all inputs were healthy when they are not
- repeated reject/timeout paths must not spin forever
- unresolved low-confidence outcomes must remain visible for operational action

---

## Invariants

1. Ranking happens after candidate gating.
2. Ranking stays deterministic and explainable by default.
3. Degraded inputs reduce automatic confidence.
4. Re-offer/retry must remain controlled.
5. Manual override remains explicit and separate from default ranking behavior.

---

## Important Rule

GreenRide should rank candidates in a way operators can trust and understand, and it should fail honestly when live operational confidence is too weak for a safe automatic choice.

---

## Stop Conditions

Stop and clarify before implementation if:
- ranking is being treated as a black-box scoring engine by default
- degraded inputs are being ignored as if automatic confidence were unchanged
- retries/re-offers are being allowed to loop with no explicit unresolved outcome
