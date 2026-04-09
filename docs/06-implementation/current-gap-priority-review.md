# Current Gap Priority Review

## Purpose

Provide a ranked view of the most important remaining documentation gaps so GreenRide can keep closing the highest-value areas instead of drifting between partially related topics.

This review is a prioritisation aid, not a replacement for the master tracker or the coverage checklist.

---

## Current Conclusion

GreenRide is now much stronger structurally than it was earlier in the documentation-first phase.

All six closure batches are now treated as substantially complete.

The remaining work is no longer about inventing the system shape or completing another broad closure pass.
It is now mainly about:
- targeted residual tightening inside already-approved domains
- deepening follow-through matrices and page-level or provider-level edge cases where needed
- keeping readiness claims honest as implementation begins or future expansion work starts

Future Wave 1 has now moved from planned expansion into documented baseline
shape for both School Run and Parcel. The control-layer refresh is also
complete, so the remaining work there is now residual follow-through rather
than missing-shape recovery or checkpoint cleanup.

The closure plan remains useful as historical sequencing context, but it is no longer the default active execution file for the repo's current state.

---

## Highest-Priority Remaining Residual Areas

### 1. Reporting and Service Follow-Through

Reporting is now materially stronger, but still has meaningful refinement left:
- final report definitions
- finer visibility/export/scheduling matrices
- widget-by-widget report linkage
- service-layer cross-check with notifications, realtime, and personal-record boundaries

Why this is still high priority:
- reporting remains broad and cross-cutting
- it still influences exports, widgets, dashboards, and module gating

### 2. Pricing Completion Gaps

These are still some of the most important unresolved product rules because they affect quote accuracy, booking commitment, dispatch expectations, and tenant configuration.

Most important remaining pricing gaps:
- deeper price structure configuration follow-through
- deeper zone / area pricing follow-through
- quote expiry and recovery follow-through

Why this is high priority:
- pricing still influences booking, route selection, payment, and reporting
- even where a baseline now exists, the remaining detail still affects quote safety and tenant configuration integrity

### 3. Payment Consent and Agreement Capture

`Agreements / payment consent capture` now has a baseline, but it is still one of the most trust-sensitive follow-through areas.

Why this is high priority:
- it sits at the trust boundary between booking commitment, payment handling, and legal/compliance expectations
- this is a bad area to leave implicit

### 4. Frontend Detail Follow-Through

The frontend contract wave is substantially complete, but some important implementation-detail gaps remain:
- route-by-route gating matrices
- deeper per-surface state handling
- widget catalogs and zone maps
- deeper Platform Ops UI refinement

Why this is high priority:
- the frontend shape is now stable, so the next risk is detail drift inside that stable shape

### 5. Testing / Readiness Follow-Through

These are now stronger than before, but still need later tightening around:
- exact datasets
- richer slice-level readiness evidence
- tooling depth and domain-specific validation matrices

Why this is high priority:
- these gaps affect whether later implementation work is actually safe to verify and ship

### 6. Future Wave 1 Add-On Follow-Through

Both add-ons now have first-pass contracts, but important refinement still
remains around:
- deeper School Run schedule and reporting detail
- deeper Parcel lifecycle and proof-edge detail
- add-on-specific residual follow-through only where implementation needs more
  exact meaning

Why this now matters:
- the add-on shape is documented, so the remaining risk is not missing shape
  but over-claiming how complete those add-on domains are
- this is best handled as controlled residual follow-through rather than a new
  broad design wave

---

## Remaining Missing Contracts

There are no longer any standout core subjects in the current coverage checklist sitting at a clean `missing` state.

The remaining work is now mostly:
- report/service follow-through
- pricing and booking trust-boundary follow-through
- frontend detail tightening
- testing and readiness refinement
- Future Wave 1 add-on follow-through
- accepted residual management rather than missing-shape recovery

This is a good shift. The repo is now mostly in refinement territory rather than shape-invention territory.

---

## Recommended Next Order

Recommended next working order now follows the post-closure state:

1. targeted residual tightening in reporting, pricing, and payment-consent-sensitive areas
2. targeted frontend page-family and degraded-state tightening where implementation needs more exact page-level guidance
3. targeted testing, seed/demo-data, and readiness-evidence tightening where implementation proof needs deeper repeatability detail
4. Future Wave 1 residual follow-through for School Run and Parcel only where
   implementation needs deeper exact meaning
5. controlled implementation work in documented safe-now areas, with docs reopened only when a real ambiguity appears

Reasoning:
- the broad closure sequence is already complete enough for the current documentation-first stage
- the remaining work is best handled as targeted residual tightening instead of reopening whole batches
- this keeps the repo honest about what is safe now versus what still needs deeper follow-through

---

## Final Judgment

The next best move is to keep working in targeted residual-refinement mode rather than reopening already-closed closure batches by default.

The most useful control references now are:

- `docs/06-implementation/accepted-residuals-and-cross-phase-review.md`
- `docs/06-implementation/ai-build-readiness.md`
- `docs/06-implementation/current-state.md`

---

## Residual Review Note

The former low-priority cross-phase review items are now consolidated into:

- `docs/06-implementation/accepted-residuals-and-cross-phase-review.md`

They should now be treated as accepted residual follow-through rather than active low-grade shape blockers.
