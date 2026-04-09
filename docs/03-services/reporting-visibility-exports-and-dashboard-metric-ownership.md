# Reporting Visibility, Exports, and Dashboard Metric Ownership

## Purpose

Define the canonical visibility, export, and dashboard-metric ownership model for GreenRide reporting.

This document exists so AI and future implementation work do not invent:
- tenant reporting that leaks into platform reporting
- dashboard widgets that silently become full reports
- exports that ignore role or scope boundaries
- metrics with unclear ownership between reporting, realtime, and observability

---

## Status

Draft, approved as the current documentation direction.

This document is the first canonical reporting-visibility, export, and metric-ownership contract for the reporting domain.

---

## Scope

This document covers:
- tenant versus platform reporting visibility
- export and download boundary rules
- dashboard metric ownership by source type
- relationship between widgets, reports, and raw exports
- scope and role guardrails for reporting surfaces
- first report-family visibility matrix
- widget-to-report linkage direction

---

## Out of Scope

This document does not define:
- every final report definition
- every widget in the final dashboard catalog
- exact export job infrastructure
- final scheduled-report workflow screens
- observability alerting or runtime diagnosis behavior

Those belong to later reporting-detail, dashboard-detail, and operational follow-through.

---

## Related Documents

- `docs/03-services/analytics-and-reporting.md`
- `docs/03-services/realtime-system.md`
- `docs/03-platform/observability.md`
- `docs/03-services/audit-logging.md`
- `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`
- `docs/05-frontend/dashboard-layout-and-customization.md`
- `docs/05-frontend/platform-control-ui-contract.md`
- `docs/05-frontend/platform-ops-console.md`
- `docs/05-frontend/reporting-route-and-state-matrix.md`

---

## Canonical Rules

1. Tenant reporting and platform reporting are different scopes and must remain separate.
2. Dashboard widgets are summaries, not full reporting surfaces.
3. Export access must respect role, scope, module, and report-family ownership.
4. Every dashboard metric must have an explicit source type.
5. Observability, audit, realtime, and reporting must not be treated as interchangeable data domains.
6. Reporting visibility must never weaken the underlying tenant-isolation model.
7. Saved filters, widget deep-links, and queued export or schedule work must preserve the authorised report family, scope, and surface context rather than broadening them later.

---

## Visibility Boundary

The most important reporting rule is scope separation.

Approved direction:
- tenant reporting is tenant-scoped business and operational visibility
- platform reporting is platform-scoped governance and commercial visibility
- platform roles should use platform reporting, not behave like normal tenant reporting users
- tenant roles should not see platform reporting unless a later explicit contract says otherwise

This prevents reporting scope drift and keeps reporting aligned with the RBAC and multi-tenancy model.

### Support and Cross-Tenant Visibility Guardrail

Platform support or governance visibility must stay explicit.

That means:
- `super_admin` platform reporting is not normal tenant reporting with a wider filter
- tenant reporting pages and exports must remain tenant-bounded even when a platform user can inspect the same tenant through an approved support workflow
- platform-ops tenant-impact visibility is not general tenant reporting access

---

## Tenant Reporting Baseline

Tenant reporting exists to help a tenant understand its own business and operations.

Canonical direction:
- tenant reports may include booking, revenue, payment, dispatch, and driver-performance visibility where approved
- tenant reporting remains scoped to the tenant’s own data
- tenant dashboards may surface summary metrics from tenant reporting, but summary widgets do not replace the report itself

Tenant reporting must remain tenant-owned and tenant-bounded.

---

## Platform Reporting Baseline

Platform reporting exists to help platform governance and oversight.

Canonical direction:
- platform reporting may include tenant counts, module adoption, onboarding progress, commercial distribution, and platform-wide business summaries
- platform reporting stays platform-scoped
- platform dashboards may show platform summaries, but must not quietly become tenant analytics views

This keeps `super_admin` reporting different from tenant operational reporting.

---

## Role and Export Boundary

Viewing a report and exporting it are not the same permission.

Approved direction:
- report visibility may be broader than export rights
- export rights must be more controlled than simple page visibility
- exports must still respect role, scope, report family, and module/package gating
- customer and driver personal-record access remains separate from tenant business reporting

This prevents “can see a widget” from becoming “can download the underlying data”.

### Report Family Visibility Matrix

Approved first visibility direction:

| Report Family | Scope | View Baseline | Export Baseline | Scheduling Baseline |
| --- | --- | --- | --- | --- |
| tenant core booking/revenue summary | tenant | tenant_owner, tenant_admin | tenant_owner, tenant_admin | no by default |
| tenant advanced booking analysis | tenant | tenant_owner, tenant_admin, limited operational viewers where later allowed | tenant_owner, tenant_admin | tenant_owner, tenant_admin |
| dispatch and driver performance | tenant | tenant_owner, tenant_admin, operational viewers where allowed | tenant_owner, tenant_admin | tenant_owner, tenant_admin |
| customer analysis | tenant | tenant_owner, tenant_admin | tenant_owner, tenant_admin | tenant_owner, tenant_admin |
| platform tenant/adoption/commercial summaries | platform | super_admin | super_admin | super_admin where later allowed |

Guardrail:
- this matrix defines family-level baseline rights only
- route availability, widget visibility, export rights, and scheduling rights must still be checked as separate action layers
- a report family being visible does not by itself mean every deeper action in that family is available

---

## Export Baseline

Exports are controlled reporting outputs, not unrestricted data extraction.

Canonical direction:
- exports should be generated from approved report families and approved filters
- export output remains scoped to the actor’s authorised reporting scope
- export behavior must remain aligned with retention, branding, and scheduling rules already documented in the reporting service baseline
- raw data export should not bypass tenant boundaries or role restrictions

Exports are part of reporting governance, not a shortcut around the product’s access model.

### Export and Scheduling Edge Rules

- export access should be checked at the time of generation, not assumed forever from page visibility
- scheduled delivery should fail cleanly if the actor, scope, or module entitlement is no longer valid
- a temporary file or link should expire cleanly instead of becoming a permanent document store
- regenerated exports should keep the same authorised scope, not broaden it
- queued export work must preserve the same tenant or platform scope that was authorised at request time
- a valid report family route does not by itself make export or schedule actions available
- saved filter definitions must stay bound to the approved report family and authorised scope they were created for
- a saved tenant-scoped filter must not be reused as a hidden cross-tenant or platform-scoped reporting definition
- schedule definitions must preserve the approved report family and filter scope rather than turning into unrestricted background queries

---

## Dashboard Metric Ownership Baseline

Every dashboard metric or widget must declare its source type explicitly.

Approved source types:
- reporting
- realtime
- observability
- audit
- static or configuration summary

### Widget-to-Report Linkage Direction

- a widget may link to a deeper report only if the actor is allowed to view that report family
- a widget that summarizes advanced reporting must not appear as a report shortcut when the advanced module is disabled
- widgets sourced from realtime, observability, or audit must not deep-link into reporting unless a reporting-owned summary exists for that metric
- widget deep-links may prefill only approved target-report filters and must not carry hidden scope expansion, export entitlement, or scheduling entitlement into the target page
- a widget in one surface must not deep-link into another surface's reporting route as a convenience shortcut

Canonical direction:
- reporting metrics represent business or operational summary data
- realtime metrics represent current live-state distribution
- observability metrics represent platform-health and technical-operational diagnostics
- audit is for accountability trail visibility, not KPI calculation
- static/configuration summaries represent system setup state rather than live or historical metrics
- raw application logs are not a dashboard source type and should only influence reporting or widgets through an explicitly defined higher-level summary contract

This keeps widgets explainable and prevents metric drift across domains.

---

## Widget vs Report Boundary

This boundary is critical.

Approved direction:
- a widget is a summary surface, not the full reporting contract
- a widget may link to a deeper report where allowed
- widget availability does not automatically imply report-page access
- report access does not automatically imply export access
- report-page access does not automatically imply schedule-management access

This creates a clean hierarchy:
1. widget summary
2. report view
3. export/download

Each layer may have tighter controls than the one before it.

---

## Metric Ownership Examples

Examples of safe ownership:

- `today_revenue` dashboard KPI: reporting
- `active_jobs_now` tenant dispatch summary: realtime or reporting summary, but must be explicitly declared
- `queue_backlog_health` in Platform Ops: observability
- `active_incident_count` in Platform Ops: observability or incident-domain summary, not tenant reporting
- `tenant_count` in Platform Control: reporting or configuration summary, depending on the data contract
- `recent_audit_events` support panel: audit, not reporting

The key rule is not the specific label.
The key rule is that ownership must be explicit and consistent.

### Metric Definition Baseline

Every dashboard metric should eventually define at least:
- metric name
- source type
- scope
- summary purpose
- whether it is widget-only or report-backed
- whether export is meaningful for the underlying data

---

## Personal Records Boundary

Customer and driver records need a separate boundary.

Approved direction:
- customer and driver may access their own personal records only where those flows are explicitly documented
- that is not the same thing as tenant business reporting
- personal-record export must not be treated as general reporting export

This prevents personal record access from being used as a loophole around tenant reporting controls.

### Personal Record Export Guardrail

If customer or driver personal-record export exists later:
- it remains governed by personal-record rules
- it does not inherit tenant business-report export rights automatically
- it must not expose broader tenant operational data than the actor is entitled to see

---

## Module and Package Boundary

Reporting must stay aligned with module gating.

Canonical direction:
- baseline summary visibility may exist without advanced reporting
- advanced report families, scheduled reporting, and richer export capability may depend on module/package enablement
- dashboards must not surface unavailable advanced metrics as if the module were enabled

This keeps reporting scope aligned with the commercial model.

---

## Invariants

1. Tenant reporting and platform reporting remain separate scopes.
2. Widgets are summaries, not full reports.
3. Export rights are tighter than simple report visibility.
4. Every metric/widget declares an explicit source type.
5. Reporting, realtime, observability, and audit are related but not interchangeable.

---

## Important Rule

GreenRide should show the right information at the right level:
- widget for summary
- report for analysis
- export for controlled extraction

The platform must not collapse those into one ambiguous permission or data model.

---

## Stop Conditions

Stop and clarify before implementation if:
- tenant users are being given platform reporting through normal tenant flows
- widgets are being treated as proof of report or export access
- observability metrics are being reused as business reporting with no explicit contract
- exports are being designed as unrestricted table dumps rather than authorised reporting outputs
