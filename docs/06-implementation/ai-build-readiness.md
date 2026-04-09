# AI Build Readiness

Last refreshed: 2026-04-09

## Purpose

This document gives AI agents a simple readiness check before they start work.

It separates areas that are safe to work on now from areas that are still intentionally blocked.

It should be read as the final top-level gate above:
- environment assumptions
- testing expectations
- demo-data expectations
- operational-readiness checks
- accepted residual review

## Status Matrix

| Area | Status | Notes |
| --- | --- | --- |
| Repository navigation and control docs | ready | Entry docs, stop rules, repo structure, and service navigation now exist. |
| Backend slice continuation | ready | Build, dev boot, Prisma generate, and schema validation have been re-checked in the current workspace. |
| Frontend scaffolding | ready | The frontend stack is approved and the named baseline mockup assets now exist. Screens without a named mockup still rely on the written UI contracts. |
| Future Wave 1 add-on baselines | ready | First-pass School Run and Parcel contracts now exist, but deeper lifecycle, proof, reporting, and notification detail remains partial and must not be guessed. |
| Infrastructure and deployment automation | future work | No Docker, CI, or deployment scaffold exists yet, but that does not block ordinary application development. |
| Documentation maintenance | ready | Docs can be updated as long as they stay consistent with the current repo. |

---

## Readiness Meaning

`ready` in this document does not mean:
- fully complete
- fully tested forever
- safe to skip fresh validation

Approved meaning:
- the area is open for controlled work
- the minimum documentation boundary exists
- no current blocker explicitly forbids work in that area

`future work` means the repo does not yet approve normal AI assumption-making in that area.

`ready` also does not mean:
- residual detail has disappeared
- broad readiness can be claimed without naming evidence scope
- local-development readiness automatically carries into other environment tiers
- one narrow evidence run automatically proves unrelated slices, surfaces, or dataset purposes

## Mandatory Startup Checklist

Before any AI agent starts work, it must:

1. read `AGENTS.md`
2. read the overview control docs in `docs/00-overview/`
3. read `docs/06-implementation/environment-contract.md`
4. confirm the target work area is marked ready in this document
5. re-run relevant validation before claiming build or type-check health

If the work touches a trust-critical or operational-critical slice, the agent should also cross-check:
- `docs/06-implementation/testing-strategy.md`
- `docs/06-implementation/operational-readiness-checks.md`
- `docs/06-implementation/seed-and-demo-data-contract.md` where relevant
- `docs/06-implementation/accepted-residuals-and-cross-phase-review.md` where residual detail may affect implementation assumptions

---

## Readiness Gate Rules

An area should only be treated as ready for implementation work when:
- canonical docs exist for the slice
- no major contradiction blocks the slice
- environment assumptions are documented
- required validation expectations are known
- the current claim can point to the environment tier and evidence basis it relies on
- accepted residuals are being treated as residuals, not silently as fully decided implementation detail

An area should not be treated as ready merely because:
- code already exists
- an older run once passed locally
- a related nearby domain is documented
- the repo has no immediate stop rule for that area

## Residual Safety Rule

During implementation:

- partial documentation must not be treated as fully defined behaviour
- if a code path depends on a partial area:
  - the dependency must be made explicit in the implementation context
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

## AI Build Scope

### Safe Now

AI may implement directly where behaviour is already explicitly defined, including:
- auth/session enforcement structure
- RBAC and route/surface ownership enforcement
- tenant-scope enforcement structure
- booking confirmation-boundary structure
- driver/dispatch offer-versus-assignment structure
- frontend shell, route-family, and state-category structure
- readiness/evidence capture structure
- first-pass School Run and Parcel structure where the add-on contracts are
  explicit and the implementation does not need deeper policy meaning

### Safe With Explicit Placeholders

AI may implement structure with explicit configurable placeholders where shape is documented but exact detail remains partial, including:
- timing and threshold hooks
- provider abstraction points
- fixture/reset wiring
- UI copy or metadata placeholders
- configuration-backed values that are intentionally still unresolved
- deeper School Run scheduling or billing-calculation hooks not yet finalized
- deeper Parcel class-threshold, media-storage, or proof-transport hooks not
  yet finalized

These placeholders must remain visible and must not silently encode invented policy.

### Reopen Docs First

Implementation must stop and reopen docs before proceeding when code would require choosing unresolved meaning in:
- pricing decisions or precedence
- dispatch ranking, thresholds, or fallback policy
- lifecycle-transition meaning
- refunds, fees, credits, or other financial outcomes
- deeper School Run schedule, attendance-like, or reporting semantics beyond
  the documented baseline
- deeper Parcel logistics lifecycle, proof-verification, media-policy, or
  recipient-visibility semantics beyond the documented baseline
- any area where multiple plausible interpretations would change system truth or money flow

## Ready Work Right Now

- documentation cleanup and consistency updates
- backend planning for the next slice
- backend implementation only when the relevant contracts are complete and local validation has been rerun
- frontend scaffolding and feature work using the approved frontend stack
- docs-first Future Wave 1 implementation planning that stays inside the
  documented School Run and Parcel baselines

These remain subject to the more specific domain contracts and validation rules.

## Blocked Work Right Now

- deployment automation choices that require Docker, CI, or hosting assumptions not yet documented
- any claim that the repo is "clean", "passing", or "ready" without fresh validation

Additional blocked behavior:
- inventing staging or production runtime assumptions not documented in the environment contract
- declaring a trust-critical or operational-critical slice ready without current validation evidence
- treating the absence of explicit blockers as proof of readiness
- treating accepted residual detail as if it were already fully specified
- using a generic “validated locally” claim without naming the evidence basis and environment tier
- generalizing workspace-health checks, demo walkthroughs, or narrow fixture runs into broad whole-app readiness claims
- inventing values, thresholds, or business logic in partial pricing, dispatch, lifecycle, or financial areas

---

## Final Readiness Principle

GreenRide is ready for controlled AI-assisted work where the repo has:
- explicit docs
- explicit environment assumptions
- explicit validation expectations
- no unresolved blocker for that slice

Accepted residual detail does not automatically block work.
But it also must not be treated as if it were already fully specified.

Readiness claims should stay honest about:
- which environment tier they apply to
- which dataset or fixture basis they rely on where relevant
- which residual details remain deferred

It is not ready for assumption-heavy work where those conditions are missing.

## Why This Exists

GreenRide is designed for controlled AI-assisted implementation.
That only works if the repo states clearly where AI may proceed and where it must stop.
