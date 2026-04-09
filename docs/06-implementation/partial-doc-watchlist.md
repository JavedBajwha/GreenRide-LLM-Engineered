# Partial Document Watchlist

## Purpose

This file exists to stop `partial` documentation from disappearing into the
background once implementation begins.

It is not a replacement for:
- `documentation-gap-register.md`
- `documentation-master-tracker.md`
- `ai-build-readiness.md`

Instead, it turns partial gaps into a practical pre-slice checklist.

Use it when you want to answer:
- what important partial areas still exist
- what each partial area is mainly trying to protect
- whether implementation may proceed with placeholders
- when documentation must be reopened before coding continues

---

## How To Use This Watchlist

Before starting any coding slice:

1. identify the slice you are about to build
2. read the matching watchlist section below
3. list the relevant `GAP-*` entries in the implementation context
4. apply the handling mode for each relevant entry
5. reopen docs before coding if any relevant entry is marked `reopen-first`

During implementation:

- do not treat `partial` as if it means "invent the rest"
- do not treat `accepted-residual` as if it means "fully decided"
- if code starts to depend on undefined truth, money flow, permission, or
  lifecycle meaning, stop and reopen docs

After implementation:

- update the gap register if a partial area was materially tightened
- update this watchlist only if the handling mode or reopen trigger changed

---

## Handling Modes

| Mode | Meaning |
| --- | --- |
| `reopen-first` | Stop and tighten docs before implementation if the slice would choose unresolved truth, money, access, or lifecycle meaning. |
| `safe-with-placeholder` | Structure may be implemented if the unresolved part stays explicit, configurable, and non-authoritative. |
| `accepted-residual` | Do not reopen by default. Reopen only if the slice genuinely needs deeper meaning than the current baseline provides. |

---

## Auth-First Shortlist

Use this shortlist before starting `Auth + Session Foundations`.

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-001` | Auth contract shape exists; unresolved detail is mostly constants and later identity-provider expansion. | `safe-with-placeholder` | If implementation would choose hidden session behavior, login edge-case meaning, or final identity-expansion semantics. |
| `GAP-002` | RBAC already defines role and surface boundaries; endpoint ownership and deeper in-surface permissions are still incomplete. | `reopen-first` | If auth work would decide endpoint-level authority beyond the documented role/surface baseline. |
| `GAP-003` | Tenant scope is mandatory after login; schema/query alignment detail is still partial. | `reopen-first` | If implementation would guess tenant filters, support visibility, or cross-tenant exceptions. |
| `GAP-004` | Security model already blocks unsafe auth assumptions; privileged-role and session-policy detail is still partial. | `reopen-first` | If implementation would choose privileged-role behavior, revalidation meaning, or unsafe security defaults. |
| `GAP-074` | Encryption baseline now exists for password/token/secret handling, but stronger field-level and production key-management meaning is still later work. | `safe-with-placeholder` | If auth implementation would choose raw token storage, field-level encryption policy, or production secret-management semantics beyond the baseline. |
| `GAP-005` | Auth-sensitive actions must remain audit-visible. | `safe-with-placeholder` | If code would choose final retention/storage/policy meaning instead of a documented interim audit path. |
| `GAP-006` | Auth and session health need runtime visibility, but tooling/threshold detail is still open. | `safe-with-placeholder` | If implementation would hard-code observability thresholds or vendor-specific assumptions as policy truth. |
| `GAP-043` | Incident/emergency controls exist, but deeper policy remains later work. | `accepted-residual` | Reopen only if auth work touches emergency access or incident override behavior directly. |
| `GAP-045` | `super_admin` and `platform_ops` remain deliberately distinct. | `reopen-first` | If auth implementation would blur governance login with operations-execution authority or schema. |
| `GAP-016` | Validation evidence must be meaningful for auth, not just nominal. | `safe-with-placeholder` | If the slice needs test tooling or coverage rules beyond the current evidence baseline. |
| `GAP-017` | Demo/bootstrap data and repeatable validation data are not interchangeable. | `safe-with-placeholder` | If auth implementation would depend on invented seed fixtures or implicit local accounts. |
| `GAP-051` | Readiness claims must stay tied to real evidence and environment tier. | `accepted-residual` | Reopen only if the slice needs deeper auth-specific readiness criteria. |
| `GAP-018` | The readiness gate is good enough to start, but not a license to over-claim. | `accepted-residual` | Reopen only if a new contradiction appears in readiness or validation policy. |

---

## Phase 2: Platform Foundations

Primary concern:
- identity, access, scope, security, auditability, and runtime trust boundaries

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-001` | Auth/session system shape exists; unresolved detail is mostly later constants and expansion paths. | `safe-with-placeholder` | If code would choose hidden lifecycle meaning or unsupported auth capability. |
| `GAP-002` | RBAC defines who belongs on which surface, but not every endpoint-level permission. | `reopen-first` | If implementation needs deeper page/action/endpoint authority than current docs provide. |
| `GAP-003` | Tenant isolation remains independent from RBAC. | `reopen-first` | If code would infer or weaken tenant scope behavior. |
| `GAP-004` | Security model must stay stricter than convenience. | `reopen-first` | If implementation would choose ambiguous privileged-action or session-revalidation behavior. |
| `GAP-074` | Data-protection baseline exists, but deeper key-management and high-risk data-class detail remain partial. | `safe-with-placeholder` | If implementation would choose stronger encryption/storage semantics than the baseline currently approves. |
| `GAP-043` | Incident control policy exists in baseline form only. | `accepted-residual` | Reopen only when security incident or emergency-control implementation starts. |
| `GAP-045` | Platform governance and platform ops remain separate authority models. | `reopen-first` | If code would add or rely on `platform_ops` auth/schema meaning. |
| `GAP-005` | Audit logging must preserve traceability for trust-sensitive actions. | `safe-with-placeholder` | If implementation would choose final storage/retention/visibility policy. |
| `GAP-006` | Logging/observability shape exists, but tooling and thresholds stay open. | `safe-with-placeholder` | If implementation would hard-code monitoring policy as business truth. |

---

## Phase 3: Role, Surface, and Route Structure

Primary concern:
- wrong-surface access, redirect safety, route-family ownership, and shell separation

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-007` | Role-to-surface separation exists, but deeper per-role visibility is still partial. | `reopen-first` | If implementation needs a deeper per-role screen or widget visibility matrix. |
| `GAP-008` | Route families and defaults exist, but route-by-route detail is still partial. | `reopen-first` | If implementation would invent routes, names, or protected-route behavior. |
| `GAP-020` | Shared shell versus surface shell boundaries are defined at baseline level. | `safe-with-placeholder` | If implementation would choose deeper shell ownership or navigation behavior not yet documented. |

---

## Phase 4: Customer Booking, Pricing, and Trust Boundaries

Primary concern:
- booking truth, pricing truth, consent, quote validity, and customer visibility

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-009` | Booking lifecycle exists, but later amendment/cancellation recovery remains partial. | `reopen-first` | If implementation needs undefined lifecycle meaning beyond the documented backbone. |
| `GAP-021` | Pricing model and fallback exist, but precedence detail remains partial. | `reopen-first` | If code would choose which price source wins or how overrides behave. |
| `GAP-070` | Saved locations are convenience data; custom routes are not free pricing truth. | `reopen-first` | If implementation would let saved places or route assets silently change pricing/dispatch logic. |
| `GAP-068` | Zone pricing baseline exists, but overlap and precedence detail is still partial. | `reopen-first` | If code would decide zone-combination or overlap behavior. |
| `GAP-069` | Price configuration authority exists, but editor/detail behavior remains partial. | `safe-with-placeholder` | If implementation can keep editor/config shape explicit without inventing policy semantics. |
| `GAP-022` | Route and vehicle eligibility exist, but deeper operational follow-through is partial. | `reopen-first` | If implementation would decide unclear route/vehicle fallback or operational availability meaning. |
| `GAP-026` | Customer tracking exists, but field-level detail and degraded behavior remain partial. | `safe-with-placeholder` | If implementation can preserve explicit degraded-state handling without inventing event/ETA meaning. |
| `GAP-030` | Booking forms and agreements exist, but field/legal matrices remain partial. | `reopen-first` | If implementation would choose required fields, operator differences, or consent semantics not yet defined. |
| `GAP-067` | Quote expiry baseline exists, but exact windows and final UX detail remain partial. | `safe-with-placeholder` | If implementation can expose configurable validity windows without inventing final policy. |
| `GAP-052` | Quote-to-booking commitment boundary exists, but path-specific detail remains partial. | `reopen-first` | If code would choose commitment meaning, payment-path outcomes, or booking identity detail. |
| `GAP-053` | Amendments/cancellations baseline exists, but fee/refund/late-ops detail remains partial. | `reopen-first` | If implementation touches repricing, fees, refunds, or permission edges. |
| `GAP-066` | Agreement and payment-consent baseline exists, but matrices/storage detail remain partial. | `reopen-first` | If implementation would choose legal, consent, or storage truth across booking/payment paths. |

---

## Phase 5: Driver and Fleet Domain

Primary concern:
- driver lifecycle, live location confidence, connectivity, and vehicle suitability

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-010` | Driver lifecycle shape exists, but deeper edge-case transitions remain partial. | `reopen-first` | If implementation would choose lifecycle truth beyond the documented baseline. |
| `GAP-023` | Allocation/location trust rules exist, but thresholds and ranking detail remain partial. | `reopen-first` | If code would choose freshness thresholds or location-confidence policy. |
| `GAP-027` | Navigation is handoff-first; offline/connectivity detail remains partial. | `safe-with-placeholder` | If implementation can keep provider/offline detail explicit and non-authoritative. |
| `GAP-031` | Vehicle readiness affects booking and dispatch truth, but deeper matrices remain partial. | `reopen-first` | If code would invent capability, compliance, or maintenance policy meaning. |

---

## Phase 6: Dispatch and Operational Location Rules

Primary concern:
- dispatch truth, ranking, reassessment, and area-rule handling

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-011` | Dispatch baseline exists, but deeper ranking, exceptions, and queue ownership remain partial. | `reopen-first` | If implementation would choose ranking heuristics, retry behavior, or override policy. |
| `GAP-024` | Maps support dispatch, but map state is never authoritative by itself. | `safe-with-placeholder` | If implementation can keep provider/detail choices explicit and subordinate to business state. |
| `GAP-028` | Ranking/fallback baseline exists, but exact thresholds and ordering remain partial. | `reopen-first` | If code would choose scoring or fallback meaning. |
| `GAP-032` | Area rules may block or require special handling, but richer matrices remain partial. | `reopen-first` | If implementation would choose geofence or special-handling policy not documented. |

---

## Phase 7: Payments, Reporting, Notifications, Realtime, and Platform Service Detail

Primary concern:
- money flow, report/export authority, cross-service event ownership, and supporting-provider boundaries

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-012` | Payment-path shape exists, but provider/failure depth remains partial. | `reopen-first` | If implementation touches collection, refunds, credits, write-offs, or settlement semantics. |
| `GAP-074` | Encryption baseline exists, but export/media/high-risk secret handling still has deeper follow-through left. | `reopen-first` | If implementation would choose export-retention, payment-adjacent sensitive storage, file/media protection, or production secret-handling semantics beyond the baseline. |
| `GAP-013` | Notification ownership exists, but richer channel/template detail remains partial. | `safe-with-placeholder` | If implementation can keep channels/templates explicit without inventing audience/event policy. |
| `GAP-038` | Reporting families exist, but final definitions remain partial. | `reopen-first` | If code would choose metric meaning, report scope, or family boundaries. |
| `GAP-039` | Report access matrix exists in baseline form only. | `reopen-first` | If implementation would choose view/export/download authority. |
| `GAP-040` | Export/scheduling edges exist, but deeper lifecycle detail remains partial. | `reopen-first` | If code would choose regeneration, expiration, or entitlement-recheck semantics. |
| `GAP-041` | Widget/report metric linkage exists, but deep mapping remains partial. | `safe-with-placeholder` | If implementation can keep ownership explicit without inventing metric definitions. |
| `GAP-042` | Reporting gating exists, but final page-family detail remains partial. | `reopen-first` | If implementation would choose locked-state or entitlement behavior per route/page. |
| `GAP-014` | Realtime baseline exists, but transport/payload detail remains partial. | `safe-with-placeholder` | If implementation can keep transport/provider details explicit and subordinate to domain truth. |
| `GAP-025` | Maps/geolocation are support layers, not domain truth. | `safe-with-placeholder` | If implementation can defer provider-specific policy. |
| `GAP-029` | Address and route-support baseline exists, but resolution mechanics remain partial. | `safe-with-placeholder` | If implementation can expose adapter points without inventing final storage/resolution policy. |
| `GAP-033` | Payment method/currency baseline exists, but restriction matrices remain partial. | `reopen-first` | If implementation would choose method restrictions, settlement semantics, or multi-currency behavior. |
| `GAP-034` | Marketing/integration/embed baseline exists, but connector/detail depth remains partial. | `safe-with-placeholder` | If implementation can keep connector choices and delivery mechanics explicit. |
| `GAP-044` | Release/maintenance/rollback baseline exists, but deeper rollout policy remains partial. | `accepted-residual` | Reopen only when actual release/maintenance tooling work begins. |
| `GAP-046` | Module taxonomy/commercial model exists, but catalogue enforcement detail remains partial. | `reopen-first` | If implementation would choose commercial module boundaries or enforcement semantics. |
| `GAP-047` | Superadmin commercial controls exist, but deeper automation/self-service meaning remains partial. | `reopen-first` | If code would choose package-change workflow or billing-automation truth. |
| `GAP-062` | Notification event catalog exists at minimum baseline only. | `safe-with-placeholder` | If implementation can keep optional-event expansion out of scope. |
| `GAP-063` | Channel matrix exists in baseline form only. | `safe-with-placeholder` | If implementation can avoid inventing full per-audience channel policy. |
| `GAP-064` | Custom notification controls exist, but advanced pack detail remains partial. | `accepted-residual` | Reopen only when tenant-custom notification editing or approval features are built. |
| `GAP-065` | Marketing/CRM integration boundary exists, but connector-specific semantics remain partial. | `accepted-residual` | Reopen only when external marketing/CRM work actually starts. |

---

## Phase 8: Frontend Implementation Contracts

Primary concern:
- route gating, state handling, shell boundaries, embeds, widgets, branding, and per-surface behavior

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-049` | Platform Ops UI exists in baseline form, but deeper detail remains partial. | `accepted-residual` | Reopen only when that surface is actively implemented. |
| `GAP-050` | Per-surface UI contracts exist, but page-level depth remains partial. | `safe-with-placeholder` | If implementation can stay inside current page-family/state boundaries without inventing deeper behavior. |
| `GAP-071` | Shared degraded-state rules exist, but page-level specifics remain partial. | `safe-with-placeholder` | If implementation can preserve explicit stale/degraded/blocked states without inventing deeper semantics. |
| `GAP-060` | Module-aware route gating exists, but deeper page matrices remain partial. | `reopen-first` | If implementation would choose page-level entitlement behavior not yet documented. |
| `GAP-015` | Frontend scaffold baseline exists, but folder/package detail remains partial. | `safe-with-placeholder` | If implementation can preserve the approved single-app, multi-surface shape without inventing architecture drift. |
| `GAP-058` | Shared-shell ownership exists, but deeper route-level detail remains partial. | `safe-with-placeholder` | If implementation can stay inside the documented shell boundary. |
| `GAP-035` | Widget/embed baseline exists, but richer catalog/detail remains partial. | `accepted-residual` | Reopen only when widget or embed expansion beyond the baseline starts. |
| `GAP-059` | Dashboard layout baseline exists, but deeper customization detail remains partial. | `accepted-residual` | Reopen only when user-configurable layouts or permissions are being implemented. |
| `GAP-036` | Theme/branding/responsive baseline exists, but deeper token detail remains partial. | `safe-with-placeholder` | If implementation can keep unresolved theming detail configurable and non-authoritative. |
| `GAP-048` | AI-assisted branding is bounded, but detailed workflow remains partial. | `accepted-residual` | Reopen only when AI branding automation is actually implemented. |
| `GAP-037` | WordPress/WPML stance exists, but packaging and delivery remain partial. | `accepted-residual` | Reopen only when CMS/plugin delivery work begins. |

---

## Phase 9: Testing, Data, and Readiness Evidence

Primary concern:
- honest evidence, repeatability, and environment-aware verification

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-016` | Testing strategy is strong enough to start, but deeper tooling/matrices remain partial. | `safe-with-placeholder` | If the slice needs domain-specific verification detail beyond the current baseline. |
| `GAP-017` | Seed/demo/bootstrap data must stay purpose-specific. | `safe-with-placeholder` | If implementation would depend on invented fixtures or ambiguous dataset purpose. |
| `GAP-051` | Operational readiness checks exist, but deeper slice-specific detail remains partial. | `accepted-residual` | Reopen only when a slice needs more specific readiness criteria. |
| `GAP-018` | The final readiness gate is usable, but not a blanket completion claim. | `accepted-residual` | Reopen only if the readiness model itself becomes contradictory or insufficient. |

---

## Future Wave 1 Add-Ons

Primary concern:
- prevent School Run and Parcel from being silently collapsed back into the base passenger model

| Gap | Main Point To Remember | Mode | Reopen Trigger |
| --- | --- | --- | --- |
| `GAP-073` | School Run has baseline workflow/authority/pricing docs; deeper lifecycle and reporting remain partial. | `accepted-residual` | Reopen only when implementation needs richer schedule, notification, or reporting semantics. |
| `GAP-072` | Parcel has baseline workflow/proof/pricing docs; deeper lifecycle and proof edge cases remain partial. | `accepted-residual` | Reopen only when implementation needs richer parcel lifecycle, media, or recipient-visibility semantics. |

---

## Anti-Drift Rules

1. A slice may not quietly ignore a relevant watchlist entry just because the
   doc exists.
2. `partial` never means "fill in the rest however you like".
3. If unresolved detail changes:
   - money
   - system truth
   - lifecycle transitions
   - access or tenant scope
   then the doc must be reopened first.
4. `accepted-residual` means defer by default, not forget forever.
5. Update this file when:
   - a handling mode changes
   - a reopen trigger changes
   - a new partial area becomes important for an upcoming slice

---

## Relationship To Other Control Docs

- `documentation-gap-register.md` remains the full inventory of active gaps
- `documentation-master-tracker.md` remains the control inventory of documents
- `ai-build-readiness.md` remains the implementation gate
- this file is the operational memory layer that keeps partial docs visible
  during implementation
