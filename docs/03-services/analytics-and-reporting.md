# Analytics And Reporting

## Purpose

This document defines the service area for business reporting, operational analytics, and trend visibility.

This service baseline should now be read together with:
- `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`

## In Scope

- tenant-facing reports
- platform-level reporting
- operational dashboards
- historical trend analysis
- KPI aggregation
- canonical report-family baseline
- report filter and scheduling direction

## Boundary

Analytics and reporting are distinct from observability.
Observability is for platform health and incident diagnosis.
Analytics and reporting are for business and operational insight.

## Current Status

This area is documented as a system concept only.
No reporting service or reporting schema has been scaffolded yet.

## Agreed Direction

Reporting is a major product area, but only a light baseline should be included for every tenant by default.

### Core reporting baseline

Core reporting should remain limited to simple operational and commercial summaries such as:

- total jobs
- completed jobs
- cancelled jobs
- active or upcoming jobs
- basic booking counts
- simple revenue totals for today, week, and month
- basic live dispatch counts shown in dashboards
- basic payment totals:
  - cash total
  - card total
  - invoice total

### Advanced reporting module

Advanced reporting should be treated as a paid module and may include:

- deeper business reporting
- filtered historical analysis
- driver performance reporting
- dispatch performance reporting
- customer analysis
- export and scheduled reporting

Advanced reporting should include both:

- deeper filtered analysis of the core metrics
- additional report families beyond the core baseline

## Canonical Report Families

Approved first report-family model:

| Scope | Family | Baseline |
| --- | --- | --- |
| tenant | booking summary and analysis | core summary, advanced filtered analysis |
| tenant | revenue and payment analysis | core summary, advanced filtered analysis |
| tenant | dispatch and operations performance | advanced by default |
| tenant | driver performance | advanced by default |
| tenant | customer analysis | advanced by default |
| tenant | school-run operational and billing analysis | advanced when the School Run add-on is enabled |
| tenant | parcel logistics and proof analysis | advanced when the Parcel add-on is enabled |
| platform | tenant portfolio and onboarding | platform baseline |
| platform | package/module adoption | platform baseline |
| platform | platform-wide commercial and activity summary | platform baseline |

This defines the first approved reporting families AI should work inside.

## Tenant Reporting Families

### Core tenant reporting

Core tenant reporting is limited to simple summaries:

- total jobs
- completed jobs
- cancelled jobs
- active jobs
- upcoming jobs
- today revenue
- this week revenue
- this month revenue
- awaiting dispatch
- assigned
- in progress
- exception count
- cash total
- card total
- invoice total

### Advanced tenant reporting

Advanced tenant reporting may include:

#### Booking reporting
- filtered/date-range analysis of core booking metrics
- booking status breakdown
- booking volume by service type
- booking volume by route type
- booking volume by payment method
- booking volume by booking source

#### Driver performance reporting
- jobs accepted
- jobs rejected
- jobs completed
- cancellation involvement
- punctuality / on-time performance
- earnings totals
- active hours / availability time

#### Dispatch performance reporting
- average assignment time
- unassigned booking count over time
- reassignment count
- exception count
- no-driver-available cases
- dispatcher override count

#### Customer analysis
- repeat customers
- booking frequency
- average booking value
- customer account vs guest usage
- cancellation patterns by customer type

#### School Run analysis
- School Run operational and billing analysis may exist only where the School
  Run add-on is enabled
- School Run reporting should stay tenant-scoped and clearly labeled rather
  than silently merged into ordinary booking reporting
- detailed School Run reporting matrices remain later documentation work

#### Parcel analysis
- Parcel logistics and proof analysis may exist only where the Parcel add-on
  is enabled
- Parcel reporting should stay tenant-scoped and clearly labeled rather than
  silently merged into passenger-booking or ride reporting
- detailed parcel reporting matrices remain later documentation work

## Platform Reporting Baseline

Essential platform/superadmin reporting may include:

- tenant count
- active tenants
- tenant package distribution
- module adoption
- onboarding progress
- platform-wide booking volume

Platform reporting should focus on governance, adoption, commercial distribution,
and high-level business oversight.
It should not quietly become tenant operational reporting, platform-ops
observability, or direct audit-log browsing.

## Reporting Access Matrix

### Tenant reporting access

| Role | Core Tenant Reporting | Advanced Tenant Reporting | Export / Download |
| --- | --- | --- | --- |
| super_admin | no direct tenant-role access by default; platform scope instead | no direct tenant-role access by default; platform scope instead | no tenant export by tenant role; platform export via platform scope |
| tenant_owner | yes | yes, if advanced reporting module is enabled for the tenant | yes |
| tenant_admin | yes | yes, if advanced reporting module is enabled for the tenant | yes |
| dispatcher | view only where tenant policy allows and report family is operationally relevant | view only where tenant policy allows and report family is operationally relevant | not approved by default |
| office_staff | view only where tenant policy allows and report family is operationally relevant | view only where tenant policy allows and report family is operationally relevant | not approved by default |
| driver | no tenant reporting access | no tenant reporting access | no |
| customer | no tenant reporting access | no tenant reporting access | no |

### Platform reporting access

| Role | Platform Reporting | Platform Export / Download |
| --- | --- | --- |
| super_admin | yes | yes |
| tenant_owner | no | no |
| tenant_admin | no | no |
| dispatcher | no | no |
| office_staff | no | no |
| driver | no | no |
| customer | no | no |

Rules:

- tenant reporting must remain tenant-scoped
- platform reporting must remain platform-scoped
- tenant_owner and tenant_admin are the approved default reporting-download roles at tenant level
- dispatcher and office_staff may be granted view access to operational report families where tenant policy allows, but download/export is not approved by default
- customer and driver reporting access only applies to their own personal records where separately documented in customer/driver flows; that is not part of tenant business reporting
- super_admin reporting access should operate through platform reporting, not by acting as a tenant reporting user in normal product flow
- scheduled reporting and export generation must preserve the same authorised tenant or platform scope rather than broadening it in background processing
- the existence of a report family does not by itself grant schedule, export, or widget-deep-link rights for that family

### Separation rules

- tenant reporting and platform reporting must remain separate
- dashboard summary widgets must not be treated as full reporting
- observability is not business reporting
- essential platform/superadmin reporting remains part of the platform baseline rather than being tied to tenant upsell packages
- widget/report/export separation and metric source ownership must follow the dedicated reporting-visibility contract

### Access and export direction

- report downloads should not be available to every user
- reporting access must remain role-based and scope-based
- superadmin may access platform reporting within platform scope
- admin and tenant admin may access tenant reporting within tenant scope
- report downloads should support filters so authorised users can choose the time period, records, and dimensions included in the export
- export permissions must still respect RBAC, tenant boundaries, and report family ownership
- saved filters and report presets must stay inside the authorised report family and scope they were created for
- widget deep-links or support-navigation shortcuts may prefill approved filters only; they must not widen reporting scope or export/scheduling rights

## Export, Schedule, And Retention Direction

### Export formats

Approved first-version export formats:

- CSV
- Excel (`.xlsx`)
- PDF

Rules:

- CSV should be treated as raw structured data export
- Excel should be treated as spreadsheet-oriented structured export
- PDF should be treated as the formatted document/report output
- Word export is not part of the approved first-version reporting export set

### Export generation model

- exports should be generated on demand from the currently applied report filters
- reusable export presets are not part of the first version

Approved edge behavior:
- a failed export should remain visible as failed rather than disappearing silently
- expired export files should require regeneration rather than pretending the old file still exists
- regenerated exports should reflect current authorised filters and current underlying data state
- regenerated exports must remain inside the same approved report family and authorised scope rather than inheriting broader context from an older file or saved definition
- export generation must reject saved filters that no longer match the actor's current report-family, module, or scope entitlement

### Scheduled reporting

- scheduled reports belong to the advanced reporting module
- scheduled reports should be delivered by email
- approved schedule frequencies are:
  - daily
  - weekly
  - monthly

Default scheduled-report roles:

- `tenant_owner`
- `tenant_admin`
- `super_admin`

`dispatcher` and `office_staff` do not get scheduled-report access by default.

Rules:
- schedules belong to approved report families only
- schedules should use saved approved filter scope, not unrestricted query definitions
- disabling the required advanced-reporting entitlement should disable future scheduled delivery cleanly
- a valid report view does not by itself make scheduling available
- scheduling rights remain separate from report-view and export rights even inside the same report family
- saved schedule definitions must remain bound to the report family, scope, and approved filter set they were created from
- schedule execution must not widen tenant, platform, or report-family scope just because it runs later in background processing

### Branding rules for exports

- tenant-scoped PDF exports should use tenant branding
- platform-scoped PDF exports should use platform branding
- CSV and Excel exports should be treated as structured data exports rather than branded documents

### Retention rule

- generated report export files should be retained for 30 days
- after the retention window, files should expire and be regenerated when needed

## Reporting Filter Direction

Advanced booking reporting should support filters such as:

- date range
- booking status
- driver
- vehicle type
- payment method
- service type
- route type
- zone / area
- booking source

### Driver performance reporting filters

Driver performance reporting should support filters such as:

- date range
- driver
- vehicle category
- job status
- service type
- zone / area
- shift / status type where supported

### Dispatch performance reporting filters

Dispatch performance reporting should support filters such as:

- date range
- dispatcher
- booking status
- driver
- service type
- zone / area
- exception type
- assignment outcome

### Customer analysis filters

Customer analysis should support filters such as:

- date range
- customer type

## Reporting Matrix Direction

Each final report should eventually map:
- family
- scope
- module requirement
- roles that may view
- roles that may export
- roles that may schedule
- widget summaries that may link into it
- booking source
- service type
- payment method
- zone / area

### Platform reporting filters

Platform reporting should support filters such as:

- date range
- tenant
- package
- module
- tenant status
- onboarding state

Additional report families may define more specific filters in their dedicated implementation contracts.

## Dashboard Metric Ownership Direction

Dashboard widgets must not treat all metrics as coming from one generic source.

Approved ownership model:

### Realtime owns current-state operational widgets

Examples:

- active jobs now
- awaiting dispatch now
- assigned now
- in progress now
- exception count now
- driver online count now
- live queue counts

### Reporting owns time-window business and operational summaries

Examples:

- total jobs over a selected period
- completed jobs over a selected period
- cancelled jobs over a selected period
- today / week / month revenue
- cash / card / invoice totals
- historical trends
- driver performance summaries
- customer analysis
- dispatch performance summaries

### Observability owns technical and system-health metrics

Examples:

- websocket or realtime degradation
- event lag
- notification failures
- integration errors
- background job failures
- system queue or backlog health
- service incident metrics

Rules:

- live dashboards must clearly distinguish current-state widgets from reporting summaries
- reporting filters must not be assumed to control realtime widgets unless explicitly documented
- technical health widgets must not be treated as business reporting
- widget specifications should declare whether the source is realtime, reporting, or observability

## Reporting Module Gating Direction

### Core reporting baseline

Core reporting remains part of the tenant baseline experience and should always exist for active tenants.

This includes:

- dashboard summary KPIs
- basic reporting views or summary sections

The product should not appear broken or empty simply because advanced reporting is not enabled.

### Advanced reporting module gating

If the advanced reporting module is not enabled for a tenant, the tenant should not get:

- advanced report screens
- deep drill-down analysis
- advanced filters
- export actions
- scheduled report setup

If the advanced reporting module is enabled, features remain subject to RBAC and report-family permissions.

### Route and UI behavior

Rules:

- module gating must affect both route access and UI visibility
- module gating does not replace RBAC; both checks must pass
- direct access to an advanced-report route without module entitlement should result in a clear module-unavailable state
- tenant UI may show a limited locked or upgrade hint inside reporting areas where commercially appropriate
- the main navigation should not be cluttered with excessive locked items
- platform reporting remains platform-scoped and is not controlled by tenant upsell modules

### Recommended route split

Examples:

- core reporting summaries remain available in the tenant baseline
- advanced reporting views may live under dedicated advanced reporting routes or gated sections
- export and scheduled reporting actions require both advanced reporting entitlement and the correct role

## Remaining Reporting Gaps

The following reporting details still need explicit implementation-safe contracts:

- whether dispatcher or office_staff download rights can be elevated by tenant policy
- personal-record export rules for customer and driver areas, if supported
- widget-by-widget ownership mapping across dashboards

## Rule

Do not invent exact metric definitions, report shapes, export behavior, dashboard metric ownership, or reporting package gating without a dedicated implementation contract.
