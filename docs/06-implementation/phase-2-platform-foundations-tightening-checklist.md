# Phase 2 Platform Foundations Tightening Checklist

## Purpose

This checklist defines the remaining tightening work needed before Phase 2 can be treated as substantially complete.

It exists to convert the remaining platform-foundation gaps into a focused execution list instead of leaving them spread across the tracker and gap register.

---

## Scope

This checklist is limited to the cross-cutting trust and control model:
- RBAC linkage
- multi-tenancy enforcement
- security model tightening
- security incident/emergency tightening
- abuse protection/rate limiting
- application logging
- audit logging
- observability
- error/failure strategy linkage

It does not cover later business-domain work such as booking, dispatch, payments, or frontend-only detail.

---

## Phase 2 Remaining Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| RBAC linkage across surfaces, routes, and ownership | partial | Role-to-surface and route-family linkage is now documented, but deeper endpoint ownership and in-surface permission detail still need later tightening | `docs/03-platform/rbac.md` plus route/surface docs |
| Multi-tenancy enforcement contract | partial | Enforcement model, tenant context resolution, and tenant-filtering rules are now documented, but later schema/query implementation detail still needs alignment work | `docs/03-platform/multi-tenancy.md` |
| Security model tightening | partial | Security now has a stronger canonical contract and cross-links, but abuse controls, logging detail, observability linkage, and some operational edge cases still need follow-up tightening | `docs/03-platform/security-model.md` |
| Security incident and emergency control edge cases | partial | Incident communication, handoff, post-incident review expectations, and overlap/missed-review rules are now documented, but deeper operational policy detail still remains outside the product contract | `docs/03-platform/security-incident-and-emergency-access-rules.md` |
| Abuse protection and rate limiting | partial | Canonical protection classes and response model now exist, but exact thresholds, tooling, and runtime policy tuning still remain implementation decisions | `docs/03-platform/abuse-protection-and-rate-limiting.md` |
| Application logging detail | partial | Technical event families, structured-context rules, and security/privacy boundaries are now documented, but observability linkage and implementation detail still need later refinement | `docs/03-platform/application-logging.md` |
| Audit logging contract | partial | Audit event families, minimum entry fields, and accountability boundaries are now documented, but retention, storage, and finer visibility rules still need later decisions | `docs/03-services/audit-logging.md` |
| Observability tightening | partial | Health areas, metric families, trace/correlation expectations, and ops/incident linkage are now documented, but thresholds and tooling remain later implementation choices | `docs/03-platform/observability.md` |
| Error handling and failure strategy linkage | partial | Failure categories, retry/fallback rules, and linkage to auth, tenancy, logging, and operational restrictions are now documented, but deeper domain-specific failure handling still belongs to later docs | `docs/03-platform/error-handling-and-failure-strategy.md` |

---

## Recommended Tightening Order

1. RBAC linkage
2. Multi-tenancy enforcement
3. Security model tightening
4. Abuse protection and rate limiting
5. Application logging
6. Audit logging
7. Observability
8. Error handling and failure strategy
9. Security incident/emergency edge-case tightening

This order keeps identity, access, and boundary rules ahead of supporting diagnostics and incident refinement.

---

## Completion Rule

Phase 2 should not be treated as complete until:
- every item above has a canonical document
- `missing` items are removed or intentionally blocked
- `partial` items are tightened enough to stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
- `docs/06-implementation/documentation-roadmap.md`

---

## Rule

Use this checklist as the focused working list for the next Phase 2 pass.
If new foundation concerns appear, add them here before treating the phase as stable.
