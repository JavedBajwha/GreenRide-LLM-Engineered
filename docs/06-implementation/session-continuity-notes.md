# Session Continuity Notes

## Purpose

This file preserves important decisions made during documentation planning discussions so future work does not drift or silently reverse direction.

Use this file together with:
- `documentation-master-tracker.md`
- `documentation-gap-register.md`
- `documentation-roadmap.md`

---

## Current Session Decisions

### Baseline Facts — Current Repository State

Current baseline facts that future work must preserve unless intentionally changed:

- `backend/` is the only active implemented code area
- the Search & Quote backend slice is the only implemented application slice
- `frontend/` is still a placeholder, even though the frontend stack is approved
- `infrastructure/` is still a placeholder
- the named baseline UI mockup assets listed under `docs/assets/ui/README.md` are now uploaded, while other screens still rely on written UI contracts for provisional visuals
- backend build health was revalidated during the documentation review phase

These facts are anti-drift anchors and should be checked before major documentation changes.

### Decision 1 — Documentation First

Current rule:
- no coding
- no scaffolding
- no implementation work

Immediate focus is documentation completion only.

Reason:
- GreenRide is a large multi-tenant operational platform
- implementation before contract completion would create AI drift

---

### Decision 2 — Goal of Current Phase

Goal:
- make the documentation safe enough for AI to read and follow without inventing behavior

This means the docs must eventually be:
- consistent
- linked
- implementation-safe
- explicit about missing items

---

### Decision 3 — Review Method

Chosen method:
- review the app domain-by-domain
- keep a master checklist
- work in phases
- identify both missing documents and weak existing documents

---

### Decision 4 — Role-Based App Surface Model

Approved application surface model:

| Surface | Roles |
| --- | --- |
| Public / customer booking surface | guest customer, customer |
| Driver app surface | driver |
| Tenant operations surface | tenant_owner, tenant_admin, dispatcher, office_staff |
| Platform control surface | super_admin |

Rule:
- do not use one single link/app shell for every role
- separate major surfaces by role family
- use RBAC inside each surface where needed

---

### Decision 5 — Security and Logging Must Be Early

Security, logging, and auditability are part of the first documentation review pack.

This includes:
- auth
- session lifecycle
- RBAC
- multi-tenancy
- security model
- application logging
- audit logging
- observability
- abuse protection
- failure handling

---

### Decision 6 — Logging Must Be Split By Type

Logging must not be treated as one vague topic.

We will document:
- application logging
- audit logging
- observability (logs, metrics, traces, alerts)

---

### Decision 7 — Additional Required Documentation Areas

The following are now treated as required documentation topics:
- login / logout
- password reset / recovery / invite flow
- session and token lifecycle
- MFA for privileged roles
- abuse protection / rate limiting
- role-based app surfaces and redirects
- booking amendments and cancellations
- quote expiry and quote-to-booking rules
- no-show handling
- dispatch override auditability
- realtime/offline behavior

---

### Decision 8 — Dashboard Direction

Approved dashboard direction:
- dashboards must be separated by app surface / role family
- do not use one generic dashboard for every role
- dashboard UX should be widget-based, not one monolithic page
- tenant-facing customization should use controlled freedom, not a fully unrestricted page builder

Approved dashboard model:
- fixed dashboard zones
- approved widget catalog per surface
- role-based widget visibility
- tenant-level defaults
- per-user personal layout overrides where allowed

Current dashboard intent by surface:

| Surface | Dashboard Character |
| --- | --- |
| Public / Customer | simple, personal, booking-first |
| Driver | mobile-first, action-heavy, trip-focused |
| Tenant Operations | dispatch-first operational cockpit |
| Platform Control | governance, health, and oversight cockpit |

Rule:
- allow add/remove/reorder/resize only within approved rules
- do not allow unrestricted arbitrary page-builder behavior in the first documented model
- dashboard customization must still respect RBAC, responsive layout, and tenant boundaries

---

### Decision 9 — AI-Assisted Tenant Branding

Approved branding direction:
- tenant branding should be based on a shared design system, not unrestricted custom UI
- tenant uploads should support logo-driven branding guidance
- the platform should be able to analyse uploaded logo colors and recommend safe UI theme options

Approved model:
- upload logo
- extract dominant/supporting brand colors
- generate recommended theme options
- validate contrast and usability before approval
- allow tenant review and controlled adjustment
- save final approved branding as tenant theme configuration

Rule:
- AI acts as a branding advisor, not an unrestricted theme generator
- tenant theme choices must still respect accessibility, token mapping, responsive rules, and platform guardrails
- branding may influence colors, logo usage, and selected visual tokens, but must not break core layout or component behavior

---

### Decision 10 — Module-Based Commercial Model

Approved commercial direction:
- GreenRide should use a module-based SaaS commercial model
- superadmin should be able to build tenant packages from approved modules
- superadmin should be able to change package pricing and add-on pricing
- some add-ons may use fixed pricing, some may use quoted pricing, and some may later support quantity-based pricing

Approved structure:
- keep a small core platform module set always included
- use optional commercial modules for upsell and package variation
- use capability toggles inside modules for must-have feature variations that should not become separate paid products

Approved examples:
- `guest booking`, `return trips`, and `hourly booking` belong inside the Booking module as capabilities/settings
- Dispatch and Driver Operations stay in the always-included core baseline
- advanced dispatch and advanced driver-management features may become optional paid capability packs later

Commercial model rules:
- package = commercial bundle
- module = product capability area
- capability toggle = feature/configuration inside an enabled module
- tenant configuration = business rules inside enabled modules

Guardrails:
- do not make backbone platform areas fully removable if the product stops being a coherent taxi SaaS without them
- do not turn every small feature into a separately sold module
- superadmin may control module enablement, package composition, and pricing, but module gating must still respect tenant isolation, RBAC, and documented commercial rules

---

### Decision 11 — Reporting Module Direction

Approved reporting direction:
- reporting is a major product area and commercial module
- only very basic reporting should be included in the core baseline
- deeper reporting should be treated as a paid reporting/analytics module

Core reporting baseline should remain limited to simple operational summaries such as:
- total jobs
- jobs completed
- cancelled jobs
- active or upcoming jobs
- basic booking counts
- simple revenue totals for today, week, and month
- basic payment totals
- basic live dispatch counts shown in dashboards

Advanced reporting module should cover:
- deeper business reporting
- filtered historical analysis
- dispatch and driver analytics
- customer analysis
- export and scheduled reporting
- tenant reporting packs beyond basic operational summaries

Reporting separation rules:
- tenant reporting and platform reporting must remain separate
- dashboard widgets should show summary metrics only and must not replace full reporting
- observability must remain separate from business reporting

Commercial rule:
- advanced reporting may be enabled, disabled, packaged, or quoted by superadmin like other commercial modules
- essential platform/superadmin reporting remains part of the platform baseline

Reporting access and export rule:
- report downloads should not be open to every user
- export/view access should be available to superadmin, admin, and tenant admin according to scope
- report downloads must support filtering so authorised users can choose what period, records, and dimensions are included in the exported report
- export permissions must still respect RBAC, tenant boundaries, and report family ownership

Agreed reporting scope details:
- advanced reporting includes filtered/date-range analysis of core metrics
- advanced driver reporting includes accepted, rejected, completed, cancellation, punctuality, earnings, and active-hours metrics
- advanced dispatch reporting includes assignment-time, unassigned trends, reassignment, exception, no-driver-available, and override metrics
- advanced customer analysis includes repeat customers, booking frequency, average booking value, account-vs-guest usage, and cancellation patterns
- advanced booking reporting should support filters such as date range, booking status, driver, vehicle type, payment method, service type, route type, zone/area, and booking source
- driver performance reporting should support filters such as date range, driver, vehicle category, job status, service type, zone/area, and shift/status type where supported
- dispatch performance reporting should support filters such as date range, dispatcher, booking status, driver, service type, zone/area, exception type, and assignment outcome
- customer analysis should support filters such as date range, customer type, booking source, service type, payment method, and zone/area
- platform reporting should support filters such as date range, tenant, package, module, tenant status, and onboarding state
- dashboard widgets must declare whether their metric source is realtime, reporting, or observability
- realtime owns current-state operational widgets, reporting owns time-window business summaries, and observability owns technical/system-health metrics
- tenant_owner and tenant_admin are the default tenant reporting download roles
- dispatcher and office_staff may get view access to operational reporting where tenant policy allows, but export/download is not approved by default
- super_admin should use platform reporting rather than normal tenant reporting flows
- core reporting stays in the tenant baseline and should not disappear entirely when advanced reporting is not enabled
- advanced reporting gating must affect both route access and UI visibility
- module gating does not replace RBAC; both checks must pass
- tenants without advanced reporting may see limited upgrade hints inside reporting areas, but the UI should avoid excessive locked clutter
- platform baseline reporting should include tenant count, active tenants, tenant package distribution, module adoption, onboarding progress, and platform-wide booking volume
- approved first-version export formats are CSV, Excel, and PDF
- Word export is not part of the approved first-version reporting export set
- exports should be generated on demand from current filters only; reusable presets are not part of the first version
- scheduled reports belong to advanced reporting and are delivered by email on daily, weekly, or monthly schedules
- scheduled reports are enabled by default only for tenant_owner, tenant_admin, and super_admin
- tenant-scoped PDF reports use tenant branding and platform-scoped PDF reports use platform branding
- CSV and Excel exports are treated as structured data exports rather than branded documents
- generated report export files should be retained for 30 days and regenerated after expiry

---

### Decision 12 — Documentation Sequencing For Logic vs UI

Approved documentation sequence:

- do not leave all UI work until the very end
- do not design full UI before module/function rules are stable
- document modules/functions/business rules first
- then document the UI contract for that same domain
- leave final visual polish and refinement until later

Working sequence model:

1. lock module/function/business rules
2. lock route and role impact for that area
3. lock UI contract for that same area
4. move to the next domain

Current recommended order:

1. finish major module and platform contracts
2. then document UI in parallel by domain
3. leave final theme/polish/detail refinement until later

Current preferred UI documentation order:

1. superadmin / platform control UI
2. tenant operations UI
3. customer UI
4. driver UI

Reason:
- this reduces rework
- keeps UI aligned with business logic
- avoids late discovery of route, permission, and module-gating conflicts

---

### Decision 13 — Security, Maintenance, And Update Control Direction

Approved direction:

- security must not be treated as only auth and RBAC
- platform update, patching, rollback, and maintenance controls must be documented as part of operational safety
- superadmin should control containment and recovery actions, not raw code deployment from the business UI

Approved superadmin/platform control model:

- tenant-level maintenance mode should be supported
- module-level kill switches should be supported
- tenant-level access restriction/suspension should be supported
- platform-wide maintenance or emergency restriction controls should be supportable
- emergency actions must remain auditable

Approved boundaries:

- superadmin may control platform/tenant/module availability states
- superadmin may disable a broken module, suspend a tenant, or restrict risky flows during an incident
- superadmin should not perform raw code deployment, database migration, or infrastructure patching from the product UI

Responsibility split:

- `super_admin` is the highest platform-control role inside the application
- platform release, code patching, rollback execution, infrastructure patching, secret rotation, and technical security remediation belong to platform engineering / platform operations
- the same human may perform both responsibilities in a small organisation, but the roles must remain distinct in the documentation model
- super_admin manages containment and governance in the product
- platform engineering/ops manages the actual technical update and recovery process

Approved Platform Ops UI direction:

- Platform Ops should have a proper UI/portal for safe operational control
- this should be treated as a Platform Ops Console, distinct from normal `super_admin` platform-governance UI
- the Platform Ops Console should support controlled operational workflows for non-technical operators where possible
- the Platform Ops Console should not expose raw engineering-console power inside the normal product UI

Platform Ops Console may include:

- platform health overview
- incident and alert visibility
- tenant impact visibility
- release/version visibility
- maintenance-mode controls
- module kill switches
- tenant restriction/suspension controls
- approved rollback/recovery workflows
- emergency action audit trails

Platform Ops Console should not be treated as a place for:

- arbitrary shell or console command execution
- raw infrastructure patching
- ad hoc database migration execution
- unrestricted secret-management actions

Required future documentation areas:

- platform release and update model
- maintenance and emergency controls
- rollback and incident recovery
- security incident and emergency access rules

Reason:
- this creates a realistic SaaS operational model
- it supports fast containment during incidents
- it avoids pretending business UI is the deployment system

Agreed emergency-control direction:

- security incidents should use a severity-based model
- approved first severity levels are `SEV-1`, `SEV-2`, `SEV-3`, and `SEV-4`
- emergency controls should require review windows rather than blind auto-removal
- approved first review windows are:
  - `SEV-1`: every 1 hour
  - `SEV-2`: every 4 hours
  - `SEV-3`: every 24 hours
  - `SEV-4`: every 72 hours
- emergency controls do not auto-remove by default
- activation, extension, and removal of emergency controls must always require a reason/comment
- minimum emergency-control actions are:
  - activate control
  - extend control
  - remove control
  - view impact
  - view audit history
- `super_admin` should have visibility into emergency control state and incident status
- platform ops should hold operational execution authority for emergency containment actions by default

Agreed release / maintenance / rollback direction:

- Platform Ops UI should provide release visibility rather than raw deployment control
- first release visibility model should include:
  - current live version
  - previous version
  - release timestamp
  - release status
  - release notes
  - affected modules/components
- approved first release statuses are:
  - `planned`
  - `in_progress`
  - `live`
  - `rolled_back`
  - `failed`
- maintenance controls should require:
  - scope
  - reason
  - start time
  - review time
  - user-facing message
- rollback should use a two-step workflow:
  1. review rollback impact
  2. confirm rollback
- rollback review should show:
  - target version
  - current version
  - affected modules/components
  - affected tenants or scope
  - reason/comment
  - expected user impact
- approved first patch-containment actions include:
  - module disablement
  - tenant restriction
  - export/report freeze
  - public booking restriction
  - maintenance mode activation

---

### Decision 14 — Agreed Return Order For Remaining Major Gaps

Approved default order for the next major documentation passes:

1. Auth and session lifecycle
2. Core module taxonomy and superadmin commercial controls
3. Theme, branding, and responsive layout contract
4. Platform Ops Console and remaining security/emergency operational contract
5. Per-surface UI contracts
6. Testing, validation, and demo-data contracts

Reason:
- this keeps the documentation flow anchored in foundations before detailed UI work
- it preserves the rule that business logic and control models come before full surface design
- it gives future sessions a stable return path so work can resume without re-deciding priorities

Working rule:
- when resuming after a pause, return to the earliest unfinished item in this list
- only break sequence when a true blocker or higher-risk contradiction appears
- if UI discussions continue, keep them tied to the currently active logic domain rather than treating UI as a separate free-floating track

---

### Decision 15 — Auth and Session Lifecycle Baseline

Approved first-pass auth/session direction:

- create a canonical auth and session contract under `docs/03-platform/auth-and-session.md`
- keep auth separate from RBAC, while requiring both to pass for protected access
- use role-aware entry and redirect behavior rather than one generic post-login destination
- support email/password as the current baseline authentication model
- support short-lived access tokens plus revocable refresh/session records as the current session baseline
- support invite-based activation for managed tenant roles
- support password reset through one-time recovery tokens
- require MFA for:
  - `super_admin`
  - `tenant_owner`
  - `tenant_admin`

Agreed boundaries:

- guest/public access remains limited to explicitly documented public booking flows
- driver, tenant-ops, and platform-control surfaces always require authentication
- customer account creation details may still depend on booking-domain decisions, but authenticated customer accounts must use the same core session/recovery rules
- exact token/session TTL constants are still not final and remain an explicit follow-up item

Reason:
- auth was the first saved return-order item
- this creates one canonical place for login, logout, invite, password reset, MFA, and session lifecycle rules
- it reduces drift between security, RBAC, and frontend route docs

---

### Decision 16 — Module Taxonomy and Superadmin Commercial Controls Baseline

Approved first-pass commercial-contract direction:

- create a canonical module/commercial taxonomy under `docs/03-platform/module-commercial-model.md`
- create a canonical superadmin commercial-control contract under `docs/03-platform/superadmin-commercial-controls.md`
- keep a small core baseline always included for every tenant
- use optional commercial modules for upsell, packaging, and custom tenant commercial scope
- keep must-have operational variations as capability toggles inside modules rather than turning every feature into a separately sold product

Approved baseline distinctions:

- package = commercial bundle
- module = product capability area
- capability toggle = feature/configuration inside an enabled module
- tenant configuration = business rules inside enabled modules

Approved first-pass core baseline includes:
- tenant identity and branding baseline
- auth and RBAC
- booking
- dispatch core
- driver operations core
- pricing core
- tenant configuration
- basic notifications
- security/audit/tenancy baseline
- core reporting baseline

Approved first-pass optional commercial examples include:
- advanced reporting and analytics
- invoicing
- corporate billing
- WhatsApp notifications
- advanced notification pack
- external integrations
- embeddable booking widget / website integration
- advanced dashboard customization
- AI-assisted branding
- advanced dispatch automation
- advanced driver management

Approved commercial treatment:
- support fixed-price modules
- support quoted add-ons
- allow future quantity-based charging as a later direction, not a locked first-version requirement
- `super_admin` is the highest in-product authority for package composition, module enablement, fixed-price changes, and quoted add-ons

Reason:
- this was the second saved return-order item
- it moves package/module decisions out of discussion-only notes and into canonical platform docs
- it gives later reporting, gating, onboarding, and UI work a stable commercial foundation

---

### Decision 17 — Theme, Branding, and Responsive Layout Baseline

Approved first-pass theme/branding direction:

- create a canonical theming and responsive contract under `docs/05-frontend/theme-branding-and-responsive-layout.md`
- create a canonical AI-assisted branding contract under `docs/05-frontend/ai-assisted-branding.md`
- keep a shared token-based design system
- allow tenant branding only within platform-approved guardrails

Approved tenant-controlled baseline inputs:
- logo
- favicon
- primary color
- secondary color
- accent color
- company/display name
- support/contact details
- invoice/business details

Approved customization boundaries:
- tenants may change colors, logos, and brand text/details
- typography must stay within a small approved font set
- tenants may choose limited approved light/dark variants
- tenants may not change layout structure or core component behavior

Approved responsive direction:
- all four major app surfaces must be responsive
- customer and driver surfaces are mobile-priority
- tenant operations and platform control are desktop-first but responsive
- responsive behavior should use fixed breakpoint families and surface-specific layout rules rather than a vague “must be responsive” statement

Approved AI-assisted branding direction:
- AI is a branding advisor, not an unrestricted UI designer
- upload logo, extract palette, generate 3 safe theme options, validate, review, approve
- AI may recommend:
  - color palette mapping
  - light/dark variant
  - dashboard visual preset
- AI may not redesign components or layouts
- warn on risky branding choices and reject choices that violate minimum accessibility or clarity thresholds

Approved branding scope:
- tenant branding applies to tenant-scoped customer UI, tenant ops UI, emails, invoices, tenant PDF reports, and embedded booking widgets
- platform control and platform ops remain under platform branding

Reason:
- this was the third saved return-order item
- it moves theme, branding, AI-branding, and responsive behavior out of loose discussion and into canonical frontend docs
- it gives later per-surface UI contracts a stable visual-system baseline

---

### Decision 18 — Platform Ops Console and Operational Safety Baseline

Approved first-pass Platform Ops direction:

- create a canonical Platform Ops surface contract under `docs/05-frontend/platform-ops-console.md`
- create a canonical incident/emergency-control contract under `docs/03-platform/security-incident-and-emergency-access-rules.md`
- create a canonical release/maintenance/rollback contract under `docs/03-platform/release-maintenance-and-rollback.md`
- treat Platform Ops as a separate top-level operational surface rather than a subsection of normal platform governance

Approved Platform Ops surface:
- base route family: `/platform-ops/*`
- separate from `super_admin` platform control under `/platform/*`
- platform-branded, not tenant-branded

Approved first Platform Ops sections:
- health overview
- incidents and alerts
- tenant impact
- release visibility
- maintenance controls
- emergency controls
- rollback/recovery
- audit trail

Approved Platform Ops authority:
- execute maintenance controls
- execute emergency controls
- initiate rollback workflow
- view release history
- view tenant impact
- acknowledge incidents

Approved Platform Ops limits:
- no raw code deployment in the normal product UI
- no raw infrastructure patching in the normal product UI
- no unrestricted secret management
- no arbitrary shell access

Approved relationship with `super_admin`:
- `super_admin` gets visibility into Platform Ops state by default
- `super_admin` does not get default ops execution authority by default

Approved incident record baseline:
- severity
- status
- summary
- affected scope
- created time
- latest review time
- owner
- active controls
- resolution notes

Approved incident statuses:
- `open`
- `monitoring`
- `contained`
- `resolved`
- `closed`

Approved impact scope:
- platform-wide
- tenant-specific
- module-specific

Approved first health-overview baseline:
- service health
- queue/backlog health
- notification delivery health
- integration/provider health
- realtime health
- active incident count

Approved ops audit baseline:
- actor
- action
- scope
- reason
- timestamp
- resulting status

Reason:
- this was the fourth saved return-order item
- it moves the platform-ops and operational-safety model out of loose planning notes and into canonical platform/frontend contracts
- it prevents future drift between platform governance, ops execution, release visibility, and incident handling

---

### Decision 19 — Per-Surface UI Contract Baseline

Approved per-surface UI documentation order:

1. Platform Control
2. Platform Ops
3. Tenant Operations
4. Customer
5. Driver

Approved baseline sections for every per-surface UI contract:
- purpose of the surface
- primary users
- main jobs to be done
- top-level navigation
- dashboard or landing behavior
- key page families
- module-gating behavior
- responsive behavior
- empty/loading/error states

Approved first-pass surface identities:

### Platform Control

- governance-focused
- main jobs:
  - tenant governance
  - onboarding control
  - package/module commercial control
  - cross-tenant visibility
  - audit/support visibility
- navigation:
  - dashboard
  - tenants
  - onboarding
  - packages/modules
  - audit
  - platform reports
  - support tools
- dashboard focus:
  - tenant count/status
  - onboarding progress
  - package/module distribution
  - support/audit alerts
  - platform-level commercial visibility

### Platform Ops

- operational-safety focused
- landing focus:
  - live platform health
  - active incidents
  - current maintenance states
  - release status
  - active containment controls

### Tenant Operations

- dispatch-first operational cockpit
- main jobs:
  - dispatch and booking operations
  - driver/fleet oversight
  - pricing/service configuration
  - staff management
  - tenant reporting
- dashboard focus:
  - live KPIs
  - dispatch queue
  - driver availability
  - incidents/exceptions
  - quick actions
  - supporting trends

### Customer

- simple, personal, booking-first
- main jobs:
  - search and quote
  - booking creation
  - booking tracking
  - booking history
  - account/profile management
- landing focus:
  - next trip
  - active trip tracking
  - recent bookings
  - saved locations
  - quick rebook / quick booking

### Driver

- mobile-first and action-heavy
- main jobs:
  - go online/offline
  - receive and respond to jobs
  - manage active trip state
  - see navigation/trip context
  - view recent jobs and earnings
- landing focus:
  - current availability status
  - incoming/current job
  - primary trip actions
  - recent work summary
  - important alerts/messages

Reason:
- this was the fifth saved return-order item
- it moves the UI layer from loose surface descriptions to a consistent per-surface contract model
- it gives later detailed UI work a stable structure instead of inventing each surface separately

---

### Decision 20 — Testing, Validation, and Demo-Data Baseline

Approved first-pass testing/readiness direction:

- create a canonical testing strategy under `docs/06-implementation/testing-strategy.md`
- create a canonical seed/demo-data contract under `docs/06-implementation/seed-and-demo-data-contract.md`
- create a canonical operational-readiness contract under `docs/06-implementation/operational-readiness-checks.md`

Approved minimum testing layers per major slice:
- contract/schema validation
- service/unit tests
- integration/API tests
- role/RBAC checks
- happy-path UI/E2E coverage where a frontend surface exists

Approved first E2E happy-path baseline:
- customer booking happy path
- driver job acceptance / trip progression happy path
- tenant ops dispatch happy path
- platform control tenant/package management happy path
- platform ops incident/maintenance happy path

Approved demo-data baseline:
- platform demo tenant
- tenant staff users
- driver users
- customer users
- vehicles
- routes
- quotes/bookings in mixed states
- pricing rules
- reporting-friendly sample history

Approved tenant lifecycle states in demo data:
- `setup_in_progress`
- `ready_for_testing`
- `live`
- `suspended`

Approved reset and isolation rules:
- repeatable reset to known baseline
- deterministic sample IDs/states where practical
- no mixing of demo/test data with real production tenant data

Approved operational-readiness baseline:
- migrations/schema readiness
- env/config completeness
- auth/RBAC coverage
- logging/audit visibility
- critical flow validation
- module-gating validation
- tenant isolation checks

Approved slice-completion rule:
- a slice is not complete until it has:
  - required docs complete
  - required tests complete
  - demo-data support where relevant
  - readiness checks passed for that slice

Approved final readiness principle:
- a domain is only ready when:
  - canonical docs exist
  - major gaps are reduced to accepted residuals
  - validation expectations are defined
  - no unresolved contradiction blocks implementation

Reason:
- this was the sixth and final saved return-order item
- it moves readiness from vague intent into explicit validation and demo-data contracts
- it gives later AI-assisted implementation a much clearer completion and go/no-go standard

---

### Decision 21 — Phase 2 Tightening Pass

Approved next-step direction:

- create a focused Phase 2 tightening checklist under `docs/06-implementation/phase-2-platform-foundations-tightening-checklist.md`
- use it to close the remaining cross-cutting foundation gaps before going deeper into unfinished business domains

Approved remaining Phase 2 focus areas:
- RBAC linkage across surfaces, routes, and ownership
- multi-tenancy enforcement contract
- security model tightening
- abuse protection and rate limiting
- application logging detail
- audit logging contract
- observability tightening
- error handling and failure strategy linkage
- security incident and emergency control edge-case tightening

Reason:
- the large structural pass is now mostly complete
- the biggest remaining risk is still cross-cutting trust-model ambiguity
- this checklist gives future sessions a tighter foundation pass instead of jumping randomly into later domains

---

### Decision 22 — Multi-Tenancy Enforcement Baseline

Approved multi-tenancy tightening direction:

- treat multi-tenancy as an implementation-safe enforcement contract, not only a principle statement
- require explicit tenant-context resolution before tenant-scoped data access
- require tenant filtering on every tenant-scoped query and mutation
- keep RBAC and tenant isolation as separate controls that both must pass

Approved baseline multi-tenancy model:
- single database
- shared tables
- `tenantId` on tenant-scoped models
- platform-level tenant record at the `Tenant` model boundary

Approved enforcement layers:
- auth/session layer
- route/controller layer
- service input layer
- data-access/query layer

Approved guardrail:
- public endpoints may be exempt from authentication, but not from tenant validation

Reason:
- this closes one of the major remaining Phase 2 trust-boundary gaps
- it gives later booking, pricing, reporting, and customer-access work a stronger isolation foundation

### Decision 23 — Security Model Tightening Baseline

Approved security tightening direction:

- treat security as a cross-cutting control model, not a thin principle page
- keep authentication, RBAC, and tenant isolation as separate controls that all must pass
- make protected routes and protected APIs default to deny unless explicitly documented otherwise
- treat public access as an explicit exception that never bypasses tenant validation or input safety
- keep sensitive actions explicitly restricted and auditable

Approved security baseline areas:
- relationship between auth, RBAC, and multi-tenancy
- protected-route and protected-API expectations
- sensitive-operation controls
- data-protection baseline
- operational security boundaries
- audit/application logging expectations
- failure and incident security rules

Approved operational security boundary:
- `platform_ops` holds operational execution authority by default
- `super_admin` holds governance visibility by default, not automatic ops execution authority

Reason:
- this turns the security model into an implementation-safe foundation instead of a high-level reminder
- it links identity, access, tenant isolation, exports, incident controls, and operational recovery into one consistent trust model

### Decision 24 — Abuse Protection and Rate-Limiting Baseline

Approved abuse-protection direction:

- treat abuse protection as a canonical platform control, not an implementation afterthought
- require protection for both public and authenticated flows
- keep public access as an explicit exception that still requires tenant validation and abuse protection
- apply stricter protection to sensitive and expensive actions than to normal product reads
- keep abuse protection observable and reviewable through logging/observability

Approved first endpoint protection classes:
- public entry
- auth entry
- normal protected
- sensitive protected
- expensive protected

Approved first response model:
- allow
- slow down / throttle
- temporarily block

Approved first protected flow baseline:
- public quote and booking entry
- login and account recovery
- sensitive authenticated actions such as exports and role/module changes
- expensive product actions such as large report generation and repeated quote/pricing calculations

Reason:
- this closes one of the last obvious trust-boundary gaps in Phase 2
- it gives auth, public booking, reporting, and operational controls a shared protection baseline without inventing hard-coded thresholds too early

### Decision 25 — Application Logging Baseline

Approved application-logging direction:

- treat application logging as the canonical technical runtime diagnosis layer
- keep it separate from audit logging, observability policy, and business reporting
- require structured, high-signal, privacy-aware logs
- make tenant-aware diagnostics allowed where they materially help diagnosis and remain safe
- include security-relevant technical events such as auth failures, abuse triggers, and runtime issues during maintenance/emergency states

Approved first technical event families:
- lifecycle events
- request events
- validation events
- auth/session events
- abuse-protection events
- dependency events
- async/job events
- realtime events
- recovery/degradation events
- unexpected exception events

Approved guardrails:
- do not log passwords, raw tokens, payment-sensitive data, or unnecessary PII
- do not use application logging as a substitute for audit logging
- do not treat logs as business analytics

Reason:
- this gives Phase 2 a usable technical event boundary instead of scattered logging assumptions
- it prepares observability, security review, and incident investigation to build on a cleaner logging contract

### Decision 26 — Audit Logging Baseline

Approved audit-logging direction:

- treat audit logging as the accountability layer for sensitive and operationally important actions
- keep it separate from application logging and business reporting
- require sensitive state-changing actions to be audit-visible
- make audit entries answer who acted, what changed, when it happened, why it happened where required, and what scope was affected
- keep audit visibility itself tightly controlled by platform and tenant scope

Approved first audit event families:
- auth and access-control changes
- role and permission changes
- tenant governance actions
- commercial control actions
- tenant configuration changes
- reporting/export control actions
- operational incident actions
- platform-governance actions
- dispatch/admin-sensitive override actions where traceability is required

Approved minimum audit entry baseline:
- actor
- action
- scope
- timestamp
- resulting status or outcome

Reason:
- this closes the gap between stronger security/ops docs and the still-placeholder audit area
- it gives later support, compliance, incident review, and privileged-action work a clean accountability foundation

### Decision 27 — Observability Baseline

Approved observability direction:

- treat observability as the wider operational-visibility model, not just logging
- keep it responsible for logs, metrics, traces/correlation, alerts, and health visibility
- require tenant-aware diagnostics where they materially help incident isolation and investigation
- keep observability separate from business reporting and audit logging
- align observability outputs with Platform Ops health, incidents, maintenance, and recovery workflows

Approved first health visibility baseline:
- service health
- queue/backlog health
- notification delivery health
- integration/provider health
- realtime health
- active incident visibility

Approved first minimum metric families:
- availability/health
- request/runtime
- async/workers
- integration/provider
- auth/security-related runtime
- realtime
- export/report runtime

Reason:
- this gives the platform a usable operational-visibility contract instead of only a pillar summary
- it links logs, incidents, tenant impact, and Platform Ops into one clearer production model

### Decision 28 — Error Handling and Failure Strategy Baseline

Approved failure-strategy direction:

- treat failure handling as a core platform behavior, not a thin UX concern
- prefer safe failure over silent corruption or ambiguous state
- keep failures from bypassing auth, RBAC, tenant isolation, abuse protection, or operational restriction states
- preserve backend/source-of-truth authority during retries, fallbacks, and degraded states
- keep important failures observable and important recovery/containment actions traceable

Approved first failure categories:
- user input failures
- auth/access failures
- abuse/protection failures
- business rule failures
- integration failures
- realtime/operational failures
- infrastructure/runtime failures

Approved strategy baseline:
- controlled retry only where side effects remain safe
- fallback and degraded states should preserve correctness first
- maintenance and containment states must produce explicit restricted/degraded behavior rather than broken flows

Reason:
- this closes the gap between trust-boundary docs and the platform’s actual failure behavior
- it gives later booking, payments, notifications, dispatch, and realtime work a safer platform-wide failure contract

### Decision 29 — Security Incident Edge-Case Tightening

Approved incident-edge-case direction:

- incident handling should include communication, handoff, and post-incident review expectations, not only control activation
- missed review windows must stay visible as operational problems
- incident ownership handoff must preserve control visibility, review timing, and handoff notes
- overlapping containment states must resolve to the stricter effective restriction
- `resolved` and `closed` must remain meaningfully different states

Approved additional incident record expectations:
- communication state
- affected tenants/modules where relevant
- handoff notes
- post-incident review status

Reason:
- this closes the last major Phase 2 tightening item around incident-lifecycle realism
- it makes the incident model safer for real operational use instead of stopping at activation-only controls

### Decision 30 — Phase 4 Booking-Domain Working Order

Approved next main-track direction:

- treat the customer booking domain as the next major documentation wave after Phase 2 foundations
- work the booking domain through a focused checklist instead of scattered topic jumps
- use the following order:
  1. booking lifecycle state machine
  2. route selection and vehicle eligibility
  3. pricing and fare behavior tightening
  4. booking forms and agreements
  5. booking creation and confirmation flow tightening
  6. booking amendments and cancellations
  7. customer tracking and visibility

Reason:
- the current booking material is directionally useful but still fragmented
- this order keeps state, selection, pricing, and customer visibility aligned before later driver/dispatch domains build on top of them

### Decision 31 — Booking Lifecycle State Machine Baseline

Approved booking-lifecycle direction:

- use the Prisma-backed `BookingStatus` enum as the canonical booking lifecycle source
- keep booking lifecycle separate from UI step state and payment/process metadata
- treat `draft -> quoted -> vehicle_selected -> confirmed -> awaiting_dispatch -> assigned -> driver_en_route -> arrived -> in_progress -> completed` as the normal forward path
- treat `cancelled` and `exception` as controlled non-happy-path states
- do not invent pseudo states such as `details_added`, `extras_added`, `paid`, or `pending` as booking-lifecycle states

Approved lifecycle guardrails:
- `completed` and `cancelled` are terminal by default
- `confirmed` is the booking/quote boundary
- `awaiting_dispatch` is the booking/dispatch handoff state
- recovery from `exception` requires later explicit documentation rather than assumption

Reason:
- this gives the booking domain its first canonical state backbone
- it prevents customer flow steps and operational process metadata from drifting into fake lifecycle states

### Decision 32 — Route Selection and Vehicle Eligibility Baseline

Approved route/vehicle direction:

- route selection and vehicle eligibility must remain tenant-scoped
- quote generation resolves either a fixed-route pricing path or a dynamic-route pricing path
- quote-stage vehicle eligibility is category-level and must stay separate from final dispatch assignment
- booking/quote orchestration resolves eligible categories first, then pricing prices those categories
- an explicitly requested `vehicleCategory` may narrow results, but does not override eligibility

Approved fallback guardrail:

- the approved fallback category list remains:
  - `saloon`
  - `mpv`
  - `executive`
- this fallback applies only during quote generation when a tenant has no active vehicle records
- it must not be treated as guaranteed operational availability for booking confirmation or dispatch

Reason:
- this gives the booking domain a clean boundary between quote-stage category selection and later operational assignment
- it also prevents fixed-route, dynamic-route, and fallback category behavior from drifting independently across booking and pricing layers

### Decision 33 — Pricing and Fare Behavior Baseline

Approved pricing direction:

- pricing remains owned by the canonical pricing service
- pricing model selection must be explicit before final calculation proceeds
- category-aware pricing rule lookup follows:
  1. tenant + specific vehicle category
  2. tenant catch-all rule
  3. platform fallback defaults for the approved quote slice
- the canonical quote-slice `pricingSource` values remain:
  - `pricing_rule`
  - `fallback`

Approved pricing flow baseline:
1. determine pricing model/path
2. resolve applicable pricing rule where relevant
3. apply base fare
4. apply distance/time logic where relevant
5. apply vehicle-category effect where relevant
6. apply route logic where relevant
7. apply extras
8. apply surcharges
9. apply discounts
10. enforce minimum fare
11. round final result
12. record pricing provenance

Approved repricing/override guardrails:

- quoted price should be preserved through confirmation unless a documented repricing trigger applies
- repricing must not happen silently
- manual fare override is not a default path and must remain a later explicit permission/audit contract

Reason:
- this gives the booking domain its first explicit pricing-sequence and provenance baseline
- it reduces drift around rule precedence, fallback pricing, and repricing before later payment and dispatch work build on top of prices

### Decision 34 — Booking Forms and Agreements Baseline

Approved booking-form direction:

- booking forms are controlled business-input surfaces, not unrestricted form builders
- booking-form structure may be configurable within platform guardrails
- mandatory and optional fields must remain explicit
- backend validation remains the source of truth
- booking-form progress must not create new booking lifecycle states

Approved baseline field groups:
1. trip details
2. vehicle/service selection
3. passenger/contact details
4. extras/add-ons
5. notes or special instructions
6. agreement/consent capture where required

Approved agreement/consent direction:

- agreement capture must be explicit where required
- submission alone is not enough when the flow requires explicit acceptance
- tenant presentation may vary later, but agreement behavior remains platform-controlled

Reason:
- this gives the booking domain a first canonical input/consent contract instead of leaving forms implied by UI notes
- it prevents tenant customization and UI flow steps from drifting into uncontrolled business behavior

### Decision 35 — Booking Creation and Confirmation Baseline

Approved booking-creation direction:

- `confirmed` remains the canonical quote-to-booking boundary
- `draft`, `quoted`, and `vehicle_selected` remain pre-confirmation states
- booking creation must follow validated trip, customer, eligibility, and pricing context
- payment/process states such as `paid` and `pending` must not replace booking lifecycle states
- confirmation should produce a stable booking identity, committed booking record, and post-confirmation handoff-ready summary

Approved confirmation guardrails:

- confirmation requires valid trip details, valid selection, required customer/contact details, valid price context, required agreement capture, and any payment condition required by the active booking path
- confirmation must not assume payment success universally unless the path explicitly requires it
- dispatch/operational handoff starts only after confirmation

Reason:
- this turns the current customer flow from a step list into a clearer business-state contract
- it prevents quote persistence, payment progress, and confirmation from drifting into one another

### Decision 36 — Booking Amendments and Cancellations Baseline

Approved amendment/cancellation direction:

- amendments are allowed only before `assigned`
- cancellations are allowed until `arrived`, subject to later policy restrictions
- once a booking reaches `in_progress`, normal amendment/cancellation closes and later exception handling takes over
- amendment is a process action, not a canonical booking lifecycle state
- cancellation resolves through `cancelled`, not a custom process label

Approved revalidation and lifecycle guardrails:

- amendments that affect route, timing, service selection, or price-sensitive inputs must revalidate eligibility and pricing context
- later policy may make assigned/driver-en-route/arrived cancellations stricter, more visible, or fee-bearing, but this must not redefine the lifecycle model
- post-assignment changes belong to later operational handling rather than normal customer amendment flow

Reason:
- this gives the booking domain its first clean amendment/cancellation boundary without colliding with the lifecycle state machine
- it prevents late operational edits, fake amendment states, and inconsistent cancellation timing from drifting across customer and ops docs

### Decision 37 — Customer Tracking and Visibility Baseline

Approved customer-tracking direction:

- customer visibility is status-first before assignment
- live map-style tracking begins only from `assigned`
- `confirmed` and `awaiting_dispatch` should show booking summary, reference, timing, and waiting-for-assignment messaging rather than fake live tracking
- tracking must follow canonical booking state rather than inventing separate customer-trip states

Approved degraded-visibility guardrails:

- route preview and live tracking are not the same thing
- stale or unavailable live updates must be explicit
- cancelled, completed, and exception outcomes should show result/history visibility, not active tracking

Reason:
- this gives the booking domain a clean customer-visibility boundary that aligns with booking state and dispatch handoff
- it prevents unsupported map behavior and fake pre-assignment tracking from drifting into the customer surface

### Decision 38 — Phase 4 Customer-Booking Review Outcome

Approved review outcome:

- Phase 4 customer-booking documentation can now be treated as substantially complete
- the remaining work in this domain is refinement rather than missing core shape
- later payment, realtime, and ops contracts must follow through on the booking-domain boundaries already documented here

Approved next-domain order:
1. driver lifecycle state machine
2. driver allocation and location rules
3. driver navigation and degraded connectivity rules
4. vehicle management and attributes

Reason:
- the booking domain now has a stable end-to-end backbone
- the next highest-value gap is the driver domain, which connects directly into later dispatch and realtime work

### Decision 39 — Phase 5 Driver-Domain Working Order

Approved next-wave setup:

- Phase 5 driver-domain work should now proceed as the next main documentation wave
- the driver domain should follow the same focused-checklist approach used for Phase 4 booking work

Approved driver-domain order:
1. driver lifecycle state machine
2. driver allocation and location rules
3. driver navigation and degraded connectivity rules
4. vehicle management and attributes

Reason:
- this keeps driver work ordered from state, to live allocation behavior, to degraded-mode realities, to fleet detail
- it also creates a cleaner handoff into the later dispatch and realtime phases

### Decision 40 — Driver Lifecycle State Machine Baseline

Approved driver-lifecycle direction:

- driver state is separate from booking state
- the canonical driver states are:
  - `offline`
  - `available`
  - `job_offered`
  - `assigned`
  - `driver_en_route`
  - `arrived`
  - `in_progress`
  - `paused`
- `job_offered` must exist as a distinct pre-commitment state before assignment is fully accepted/committed

Approved lifecycle guardrails:

- rejected, timed-out, or withdrawn offers return the driver to `available`
- `paused` is an availability-control state, not a trip state
- a successfully completed trip normally returns the driver to `available`
- booking states must not be copied directly into the driver lifecycle by assumption

Reason:
- this gives the driver domain its first real state backbone
- it creates a cleaner boundary between driver availability, offer handling, assignment commitment, and trip execution

### Decision 41 — Driver Allocation and Location Baseline

Approved allocation/location direction:

- automatic allocation must use only allocation-ready drivers
- stale-location drivers may remain visible to dispatch, but must be excluded from normal auto-dispatch candidate selection
- driver allocation requires both operational eligibility and acceptable freshness state
- manual dispatch override may use a stale-location driver only as an explicit human decision

Approved visibility/eligibility guardrails:

- `available` is the normal starting state for allocation readiness
- `job_offered`, `assigned`, `driver_en_route`, `arrived`, `in_progress`, `paused`, and `offline` are not normal fresh allocation-ready states
- operational visibility is broader than automatic eligibility

Reason:
- this gives the driver domain a clean boundary between what dispatch can see and what auto-dispatch may trust
- it prevents stale live data from silently shaping assignment as if it were fresh and authoritative

### Decision 42 — Driver Navigation and Degraded Connectivity Baseline

Approved navigation/connectivity direction:

- driver navigation should be handoff-first, not embedded turn-by-turn by default
- GreenRide owns trip context, trip-state progression, and navigation launch support
- external navigation guidance remains outside the baseline GreenRide responsibility unless later explicitly approved

Approved degraded-connectivity guardrails:

- weak or missing connectivity must be explicit in the driver UI
- stale location is an operational concern, not only a cosmetic warning
- uncertain sync/delivery must not be presented as guaranteed success
- degraded connectivity must not erase basic trip context for the driver

Reason:
- this gives the driver domain a realistic mobile-operational baseline without inventing a full maps stack
- it also keeps driver-side degraded behavior aligned with allocation freshness and dispatch trust boundaries

### Decision 43 — Vehicle Management and Attributes Baseline

Approved vehicle/fleet direction:

- GreenRide should model vehicles as real tenant fleet records
- quote-stage selection may remain category-level, but operational fulfilment must rely on real vehicle records and suitability
- vehicle operational availability is separate from quote-stage category eligibility
- vehicle suitability must matter in dispatch, not only in quoting/pricing

Approved capability guardrails:

- operationally relevant vehicle attributes such as category/class, capacity, luggage suitability, accessibility suitability, premium suitability, and active/inactive status must remain explicit
- extras or service requirements with operational vehicle implications must not be treated as UI-only preferences
- approved quote-stage fallback categories must not be treated as proof of real dispatchable vehicle availability

Reason:
- this gives the driver/dispatch side a clean operational fleet baseline
- it also keeps the Phase 4 category-level booking model aligned with real vehicle fulfilment in later phases

### Decision 44 — Phase 5 Driver-Domain Review Outcome

Approved review outcome:

- Phase 5 driver-domain documentation can now be treated as substantially complete
- the remaining work in this domain is refinement rather than missing core shape
- later dispatch, realtime, and fleet-detail contracts must follow through on the driver-domain boundaries already documented here

Approved next-domain order:
1. dispatch decision contract
2. dispatch map behavior
3. dispatch ranking and degraded-mode fallback
4. zone, geofence, and custom location management

Reason:
- the driver domain now has a stable operational backbone
- the next highest-value gap is the dispatch domain, which depends directly on the driver and booking foundations already locked

### Decision 45 — Phase 6 Dispatch-Domain Working Order

Approved next-wave setup:

- Phase 6 dispatch-domain work should now proceed as the next main documentation wave
- the dispatch domain should follow the same focused-checklist approach used in the earlier waves

Approved dispatch-domain order:
1. dispatch decision contract
2. dispatch map behavior
3. dispatch ranking and degraded-mode fallback
4. zone, geofence, and custom location management

Reason:
- this keeps dispatch work ordered from assignment backbone, to map/support boundaries, to degraded logic, to geo-constraint detail
- it also creates a cleaner bridge into later maps, realtime, and location strategy work

### Decision 46 — Dispatch Decision Contract Baseline

Approved dispatch-decision direction:

- GreenRide uses a hybrid dispatch model by default
- auto-dispatch may attempt assignment first where tenant policy allows and conditions are good enough
- manual dispatch and manual override remain first-class operational paths where policy allows
- dispatch decisions must stay aligned with documented driver, vehicle, and freshness boundaries

Approved assignment guardrails:

- dispatch begins only once the booking is in dispatch-ready flow
- dispatch may produce an offer path or assignment path depending on the operational model
- where driver response is required, the `job_offered` boundary must remain real
- no-candidate outcomes must remain visible rather than hidden behind fake pending states
- reassignment is part of the core dispatch model, not a later bolt-on

Reason:
- this gives the dispatch domain its first clear assignment backbone
- it also prevents auto/manual/override behavior from drifting into contradictory operational models

### Decision 47 — Dispatch Map Behavior Baseline

Approved dispatch-map direction:

- the dispatch map is advisory support only, not the authoritative operational source
- booking state, driver state, assignment status, and explicit dispatch controls remain authoritative over map visuals
- core dispatch work must remain usable without the map

Approved degraded-map guardrails:

- stale or degraded map data must be explicit
- stale-location drivers may still be visible on the map, but that must not imply trusted fresh dispatch guidance
- degraded map state must not block manual intervention or non-map dispatch controls

Reason:
- this gives the dispatch domain a clean visual-support boundary without turning map visuals into hidden business logic
- it also aligns dispatch-map behavior with the earlier driver freshness and degraded-mode decisions

### Decision 48 — Dispatch Ranking and Degraded Fallback Baseline

Approved ranking/fallback direction:

- dispatch ranking should stay deterministic and explainable by default
- GreenRide should use a gate-and-rank model first rather than assuming a flexible weighted score engine
- candidate readiness/suitability/freshness gates run before ranking
- manual override remains outside the default automatic ranking path

Approved degraded-mode guardrails:

- degraded live data must reduce automatic confidence
- low-confidence automatic conditions may require fallback to visible manual review/intervention rather than optimistic forced assignment
- retry/re-offer behavior must remain controlled and must not loop indefinitely
- unresolved low-confidence and no-candidate outcomes must remain visible

Reason:
- this gives the dispatch domain a safer and more explainable automatic selection baseline
- it also prevents degraded live data from being treated as if dispatch confidence were unchanged

### Decision 49 — Zone, Geofence, and Custom-Location Baseline

Approved location-rule direction:

- zones, geofences, and custom locations should be treated first as operational/service-area rules
- location rules remain tenant-scoped
- dispatch suitability may depend on area/service constraints
- pricing may reference zone/location rules later, but that is not their primary meaning in this contract

Approved location guardrails:

- custom/saved locations must not bypass service-area or dispatch constraints
- zones/geofences must not be treated as hidden pricing logic by assumption
- unsupported or restricted area cases must remain visible rather than silently accepted

Reason:
- this gives the dispatch domain a clean operational geography baseline without collapsing into unfinished pricing precedence work
- it also creates a stronger bridge into later maps/address/location strategy documentation

### Decision 50 — Phase 6 Dispatch Domain Is Substantially Complete

Current review outcome:

- the Phase 6 dispatch-domain wave can now be treated as substantially complete
- the dispatch backbone is now anchored through decision, map boundary, ranking/fallback, and location-rule docs
- remaining work is refinement and later cross-phase follow-through, not missing core shape

Reason:
- this gives later payments, notifications, realtime, maps, and address work a much safer operational dispatch baseline to build on
- it also prevents the project from looping back into dispatch-core invention while later service domains are being tightened

### Decision 51 — Phase 7 Service-Domain Working Order

Approved next-wave order:

1. payments and invoicing contract tightening
2. payment-method and currency strategy
3. notifications and event ownership
4. realtime event and fallback contract
5. maps, geolocation, ETA, and address strategy

Reason:
- this keeps booking commitment and money rules ahead of communication and live-transport detail
- it also gives later maps/address work a stronger booking, dispatch, and tracking baseline to connect to

### Decision 52 — Payment Path Baseline

Approved payment direction:

- GreenRide supports multiple booking payment paths
- payment is not universally required for booking confirmation
- each booking path must explicitly declare whether confirmation requires:
  - no immediate payment
  - successful payment
  - successful authorisation
  - later invoice/account-billing eligibility

Approved guardrails:

- payment state must not replace booking lifecycle state
- failed payment must block confirmation only where that booking path requires payment or authorisation first
- invoice/account billing is a real approved path type, not an ad hoc exception

Reason:
- this keeps payment logic aligned with the booking confirmation contract
- it also prevents AI and future implementation work from inventing one universal payment rule for all bookings

### Decision 53 — Payment Method and Currency Baseline

Approved payment-method direction:

- the first approved payment methods are:
  - `card`
  - `cash`
  - `account_billing`
- payment methods are tenant-configurable within approved platform options
- unsupported methods must not be assumed as available

Approved currency direction:

- each tenant has one primary operating currency
- pricing and booking remain in the tenant operating currency by default
- live multi-currency conversion must not be invented inside booking or pricing flows without a later explicit contract

Reason:
- this keeps pricing, booking, invoicing, and reporting aligned on one safe money baseline
- it also avoids premature FX and settlement complexity before provider and finance detail are documented

### Decision 54 — Notification Event Ownership Baseline

Approved notification direction:

- notifications are event-driven outputs, not free-floating UI actions
- business domains own the event
- the notification service owns outbound delivery orchestration

Approved ownership baseline:

- booking events own booking/customer notifications
- dispatch and driver events own operational notifications
- auth events own auth/access emails
- platform ops or incident events own maintenance/emergency communications

Approved guardrails:

- notification state must not replace business lifecycle state
- channel choice must remain explicit and tenant-aware
- provider behavior must not redefine event ownership or business truth

Reason:
- this keeps notification behavior aligned with booking, dispatch, auth, and ops source-of-truth contracts
- it also prevents message sending from turning into undocumented business logic

### Decision 55 — Realtime Source-of-Truth Baseline

Approved realtime direction:

- realtime is a distribution layer for current state changes
- canonical booking, driver, dispatch, and payment records remain authoritative
- realtime may improve speed and visibility, but it must not redefine lifecycle or business truth

Approved fallback guardrails:

- delayed, stale, or unavailable realtime must fall back to authoritative records
- degraded realtime must be explicit where it affects user trust or operator confidence
- connection presence must not be treated as business readiness or lifecycle truth

Reason:
- this keeps live updates aligned with booking, driver, dispatch, and payment contracts instead of creating a hidden second state machine
- it also makes degraded-mode behavior much safer and more explainable across customer, driver, and ops surfaces

### Decision 56 — Maps and Address Supporting-Layer Baseline

Approved maps/address direction:

- maps, geolocation, ETA, and address services are supporting computation and visibility layers
- they do not own booking, pricing, dispatch, or service-area business rules
- provider output must remain subordinate to explicit product contracts

Approved guardrails:

- route/distance/time estimation must not silently override fixed-route or pricing-path business logic
- address normalisation must not erase intended pickup/dropoff meaning
- service-area and zone rules remain authoritative over provider geometry/output
- map visuals remain supportive views, not hidden sources of truth

Reason:
- this keeps provider-derived outputs useful without letting them silently redefine business behavior
- it also creates a safer bridge between booking, pricing, dispatch, tracking, and later provider implementation detail

### Decision 57 — Phase 7 Service Domain Is Substantially Complete

Current review outcome:

- the Phase 7 payments/notifications/realtime wave can now be treated as substantially complete
- the service backbone is now anchored through payment-path, payment-method/currency, notification ownership, realtime boundary, and maps/address strategy docs
- remaining work is refinement and later provider/integration follow-through, not missing core shape

Reason:
- this gives the remaining frontend implementation-contract work a much safer service baseline to build on
- it also prevents the project from looping back into service-layer invention while later UI and integration detail is being tightened

### Decision 58 — Phase 8 Frontend-Contract Working Order

Approved next-wave order:

1. frontend scaffold contract
2. shared app shell ownership
3. dashboard widgets and embeddable UI
4. dashboard layout and customization model
5. remaining route/module-gating refinement where needed

Reason:
- this keeps structural frontend ownership ahead of widget and customization detail
- it also gives later dashboard and embed work a cleaner scaffold and shell boundary to build on

### Decision 59 — Frontend Scaffold Baseline

Approved scaffold direction:

- GreenRide should use one frontend application
- major role surfaces remain clearly separated inside that single app
- the scaffold should preserve these top-level surface families:
  - public/customer
  - driver
  - tenant operations
  - platform control
  - platform ops

Approved guardrails:

- shared foundations may be owned once at app level
- shared infrastructure must not collapse shell identity or surface boundaries
- one app does not mean one generic shell

Reason:
- this reduces duplicated frontend infrastructure while keeping route, shell, RBAC, and module boundaries aligned with the approved product model
- it also matches the current route and app-surface documentation better than a multi-app split

### Decision 60 — Shared App Shell Ownership Baseline

Approved shell-ownership direction:

- the shared app shell owns cross-surface infrastructure only
- each major surface owns its own shell identity, navigation, and primary layout behavior

Approved shared-shell examples:

- app bootstrap/runtime boundary
- theme and token plumbing
- auth/session boundary plumbing
- shared loading/error/session-expiry wrappers
- surface-agnostic primitives

Approved guardrails:

- one frontend app does not mean one generic shell
- shared abstractions must not erase surface identity
- shared infrastructure is allowed, shared shell identity is not automatic

Reason:
- this keeps the single-app scaffold aligned with the already approved surface model
- it also prevents customer, driver, ops, platform control, and platform ops from collapsing into one generic admin frame

### Decision 61 — Dashboard Widget and Embed Baseline

Approved widget direction:

- dashboard widgets are approved, surface-specific building blocks
- widgets should declare:
  - surface
  - source type
  - purpose
  - whether they are fixed, configurable, or gated

Approved embed direction:

- embeddable UI starts as booking widget / booking-entry surface only
- embeds are not a way to export tenant ops, platform control, platform ops, driver surfaces, or full dashboards by default

Approved guardrails:

- widget meaning must stay aligned with its surface
- embed scope must remain narrow and controlled
- embedding a surface elsewhere does not weaken auth, tenant scope, or module boundaries

Reason:
- this keeps dashboard reuse controlled instead of turning widgets into a generic component bucket
- it also prevents external embeds from becoming a second undocumented frontend platform

### Decision 62 — Dashboard Layout and Customization Baseline

Approved layout direction:

- dashboards use a zone-based layout model
- each surface owns an approved default arrangement
- per-user customization may exist later, but only within explicit guardrails

Approved guardrails:

- customization must not break core operational or governance layout needs
- different surfaces may allow different levels of customization
- protected zones must remain for critical widgets
- saved layouts must still respect widget gating, role, and module boundaries

Reason:
- this keeps dashboard personalization useful without sacrificing dispatch, governance, or operational-safety clarity
- it also builds cleanly on the surface-specific widget model rather than replacing it with full free-form layout chaos

### Decision 63 — Shared Frontend Module-Gating Pattern

Approved gating direction:

- the frontend should use one shared gating pattern:
  - visible
  - hidden
  - locked_or_unavailable
  - blocked_route
- module gating never replaces RBAC
- surface owners still decide what is core, gated, hidden, or teaser-visible

Approved route/frontend guardrails:

- nav, route, widget, and action gating must stay aligned
- blocked-module routes must fail cleanly with module-unavailable states
- the shared pattern is common, but the content decisions remain surface-owned

Reason:
- this keeps frontend unavailable-state behavior consistent without flattening all surfaces into one generic gating style
- it also closes the remaining Phase 8 control-layer gap around route/module-aware visibility

### Decision 64 — Phase 8 Frontend Implementation Contracts Completion

We agreed the Phase 8 frontend implementation-contract wave can now be treated as
substantially complete.

What is now anchored:

- frontend scaffold contract
- shared app shell ownership
- dashboard widgets and embeddable UI
- dashboard layout and customization model
- module-aware UI and route gating

What is still later refinement:

- route-by-route gating matrices
- widget catalogs and zone maps
- deeper platform ops UI detail
- branding/token/fallback edge cases
- WordPress and WPML compatibility stance

Reason:
- this means the frontend implementation layer now has a usable structural spine
- later work can stay focused on refinement instead of reopening the core frontend shape

### Decision 65 — WordPress and WPML Compatibility Stance

We agreed GreenRide should support WordPress as a host for the approved booking
embed, but not treat WordPress as a full alternative frontend platform.

We also agreed:

- external website support begins with the approved booking-entry embed only
- WordPress may host that embed and surrounding site content
- WPML may support surrounding page/site content, but it does not own GreenRide
  booking/business translations
- customer-account, ops, driver, platform-control, and platform-ops surfaces are
  not supported as WordPress-delivered embeds by default
- CMS/plugin behavior must not become a second source of truth for booking,
  pricing, dispatch, payment, or lifecycle logic

Reason:
- this keeps website integration useful without turning WordPress into a second
  undocumented app runtime
- it also prevents localization/plugin behavior from quietly owning GreenRide
  business logic

### Decision 66 — Notification Event Baseline

We agreed GreenRide should define an explicit minimum notification-event catalog
instead of leaving notification event names implicit across domains.

Approved first event baseline:

- `booking_confirmed`
- `booking_cancelled`
- `booking_updated`
- `driver_assigned`
- `driver_arriving`
- `trip_started`
- `trip_completed`
- `payment_receipt_or_invoice_ready`
- `auth_invite`
- `auth_password_reset`
- `maintenance_notice`
- `incident_or_service_disruption_notice`

We also agreed:

- `booking_updated` should only cover material customer-visible changes
- payment receipt/invoice notification does not replace payment/accounting state
- the catalog is a baseline event set, not a full final template list
- later channel matrices remain separate and still need documentation

Reason:
- this stops notifications from drifting into ad hoc event names across booking,
  auth, dispatch, and ops
- it also gives later channel/template work one explicit baseline to build from

### Decision 67 — Notification Channel Baseline

We agreed GreenRide should define a first explicit event-to-channel baseline
instead of leaving channel choice fully implicit.

Approved baseline direction:

- email is the default formal baseline channel
- SMS may be used for time-sensitive booking/trip notifications where enabled
- WhatsApp remains optional and tenant-enabled, not a default platform assumption

Approved first event-to-channel baseline:

- `auth_invite` -> email only
- `auth_password_reset` -> email only
- `payment_receipt_or_invoice_ready` -> email only by default
- `booking_confirmed` -> email baseline, SMS optional
- `booking_cancelled` -> email baseline, SMS optional
- `booking_updated` -> email baseline, SMS optional when materially time-sensitive
- `driver_assigned` -> SMS optional, WhatsApp optional
- `driver_arriving` -> SMS optional, WhatsApp optional
- `trip_started` -> SMS optional, WhatsApp optional, email optional by tenant policy
- `trip_completed` -> SMS optional, WhatsApp optional, email optional by tenant policy
- `maintenance_notice` -> email baseline, SMS optional for urgent/higher-severity cases
- `incident_or_service_disruption_notice` -> email baseline, SMS optional for urgent/higher-severity cases

Reason:
- this gives the notification system a usable baseline without pretending the
  full tenant-by-tenant matrix is already finished
- it also keeps formal records on email and urgent communications on faster
  channels only where explicitly enabled

### Decision 68 — Custom Notification Baseline

We agreed GreenRide should allow controlled tenant-level notification
customization, but only inside approved template and event boundaries.

Approved baseline direction:

- tenants may customize branding, sender/display details where allowed, approved
  copy sections, and channel enablement within approved rules
- tenants may not invent business events, redefine triggers, rewrite security or
  auth message structure freely, or create unrestricted outbound messaging flows
- richer override behavior belongs to an advanced notification pack, not the core
  baseline

Reason:
- this gives tenants useful communication control without letting notifications
  turn into a hidden business-rule or free-messaging engine
- it also fits the module-commercial model where advanced notification controls
  can exist as a premium layer later

### Decision 69 — Marketing and CRM Integration Baseline

We agreed GreenRide should treat Mailchimp-style marketing tools and CRM
connectors as optional outbound integrations, not as part of the core
transactional notification system.

Approved baseline direction:

- booking, auth, operational trip/dispatch, payment, maintenance, and incident
  communications stay inside GreenRide's approved notification model
- marketing/CRM tools may support newsletter sync, approved contact export/sync,
  campaign audience preparation, and other non-transactional communication use cases
- marketing/CRM tools must not become the source of truth for booking, auth,
  dispatch, payment, or incident state
- only approved, consent-safe contact/profile data should be shared by default,
  not unrestricted tenant/customer data or sensitive auth/security detail

Reason:
- this keeps transactional trust separate from marketing tooling
- it also prevents external campaign tools from quietly becoming part of the
  booking or identity lifecycle

### Decision 70 — Current Gap Priority Order

We agreed the next-best work should focus on the highest-value remaining
missing and weak contracts rather than staying indefinitely inside one branch.

Current recommended next order:

1. quote expiry
2. zone / area pricing
3. price structure configuration
4. custom routes and saved locations
5. agreements / payment consent follow-through
6. reporting tightening pass
7. frontend detail follow-through
8. testing/readiness tightening pass

Reason:
- this closes the remaining trust-sensitive missing contracts first
- it also addresses the most important remaining pricing ambiguity before
  returning to broader refinement areas

### Decision 71 — Agreement and Payment-Consent Baseline

We agreed GreenRide should treat agreement capture and payment consent as
explicit, path-aware trust requirements rather than implied form submission.

Approved baseline direction:

- booking terms, policy acknowledgement, payment consent, and billing
  acknowledgement are distinct requirement types
- where a booking path requires payment success, authorisation, or later billing
  acknowledgement before confirmation, the required consent must be captured
  explicitly before confirmation
- agreement and consent capture should be recorded in a structured, referenceable
  way tied to the booking attempt or booking record context
- payment outcome and payment consent are related, but not interchangeable

Reason:
- this closes one of the last trust-sensitive missing contracts in the booking /
  payment boundary
- it also gives later audit, payment, and dispute-handling work a clean consent
  reference model

### Decision 72 — Quote Expiry Baseline

We agreed GreenRide should treat a quote as a time-bounded pricing and selection
result, not an indefinitely reusable promise.

Approved baseline direction:

- a quote must have an explicit validity boundary
- quote expiry does not create a new booking lifecycle state
- an expired quote is no longer confirmation-ready
- confirmation against an expired quote must require explicit requoting or
  revalidation
- backend/platform-owned quote metadata remains the source of truth for quote
  validity, not UI timers alone

Reason:
- this closes one of the remaining missing booking/pricing contracts
- it also prevents stale quote data from silently crossing the quote-to-booking
  boundary

### Decision 73 — Zone and Area Pricing Baseline

We agreed GreenRide should treat zone/area pricing as an explicit tenant-configured
pricing path that references operational area constructs, not as an automatic
consequence of zone existence.

Approved baseline direction:

- zones remain operational/service-area constructs first
- pricing may explicitly reference approved zone definitions later
- fixed-route pricing takes precedence when an approved fixed route applies
- if no fixed route applies, an explicit zone/area pricing rule may take
  precedence over generic non-fixed pricing
- if neither fixed-route nor zone pricing applies, the pricing engine falls back
  to the generic non-fixed tenant pricing model

Reason:
- this closes another remaining missing pricing contract
- it also stops AI from blurring operational zones, pricing zones, and generic
  distance/time pricing into one ambiguous path

### Decision 74 — Price Structure Configuration Baseline

We agreed GreenRide should treat tenant price configuration as a controlled
ruleset, not an unrestricted fare-building tool.

Approved baseline direction:

- tenants may configure approved pricing groups such as pricing-path enablement,
  core rate structure, category-aware rules, route pricing, zone pricing,
  hourly pricing, surcharge rules, discount/promo support where approved,
  minimum fare rules, and extras/add-on pricing
- configuration defines pricing rules, but does not replace the pricing engine
- tenants may configure approved components, but may not invent arbitrary pricing
  logic, custom scripts, or undocumented pricing models by default

Reason:
- this closes another remaining missing pricing contract
- it also gives pricing, tenant-configuration, and future admin UX work one
  shared configuration boundary to build from

### Decision 75 — Custom Routes and Saved Locations Baseline

We agreed GreenRide should treat saved locations and custom routes as different
concepts with different authority levels.

Approved baseline direction:

- saved locations are reusable named pickup/dropoff references used for booking
  convenience
- saved locations may exist at customer scope or as tenant-defined named places,
  but they do not define fare logic by themselves
- custom routes are tenant-approved reusable journey definitions or templates
- custom routes may influence pricing or operational handling only where
  explicitly configured
- neither saved locations nor custom routes may bypass tenant-scoped
  service-area, suitability, or dispatch constraints

Reason:
- this closes another remaining missing booking/pricing contract
- it also stops AI from blurring convenience place data with tenant-controlled
  route-rule data

### Decision 76 — Reporting Visibility, Export, and Metric-Ownership Baseline

We agreed GreenRide should treat reporting visibility, exports, and dashboard
metric ownership as one shared reporting-governance contract rather than as
separate implied rules.

Approved baseline direction:

- tenant reporting and platform reporting remain separate scopes
- widgets are summary surfaces, not full reporting surfaces
- report visibility does not automatically imply export access
- export rights must remain tighter than simple page visibility
- every dashboard metric or widget must declare an explicit source type such as
  reporting, realtime, observability, audit, or static/configuration summary
- observability, audit, realtime, and reporting must not be treated as
  interchangeable data domains

Reason:
- this closes the last standout reporting contract that was still cleanly
  missing
- it also gives reporting, dashboards, exports, and role visibility one shared
  boundary before later detail follow-through

### Decision 77 — Frontend Route-Gating and Locked-State Matrix Baseline

We agreed GreenRide should keep the shared frontend gating pattern at a general
level and add a separate route-gating matrix for concrete route-family behavior.

Approved baseline direction:

- RBAC and route-family protection are checked before module gating
- core routes usually stay visible when the user is in the correct surface
- optional routes may be hidden, locked/unavailable, or blocked depending on
  surface purpose
- reporting routes are the clearest first use case for locked/unavailable route
  treatment
- report visibility, widget visibility, and export-action availability may
  differ, but they must stay aligned
- Platform Control and Platform Ops remain authority-scoped surfaces rather than
  tenant-package-gated surfaces

Reason:
- this closes the highest-value frontend detail gap around route-by-route
  gating drift
- it also gives reporting, customer, tenant ops, and platform surfaces one
  shared blocked-route and unavailable-state baseline

### Decision 78 — Surface State-Handling and Degraded-UI Baseline

We agreed GreenRide should use one shared frontend state-handling contract for
loading, empty, stale, degraded, partial-data, unavailable, and permission
states instead of letting each surface improvise those meanings.

Approved baseline direction:

- loading, empty, stale, degraded, partial-data, locked/unavailable, permission
  denied, and not-found are distinct state families
- stale or degraded live data must never be presented as fresh truth
- operational surfaces should preserve source-of-truth context and safe critical
  controls where possible
- blocked or unavailable routes must not masquerade as generic runtime errors
- partial data must be explicit, not silently treated as complete

Reason:
- this closes another high-value frontend refinement gap around operational
  trust and degraded-state drift
- it also gives Platform Ops, Tenant Operations, and later surface-detail work
  one shared trust rule for uncertain UI state

### Decision 79 — Dashboard Widget Catalog and Zone-Map Baseline

We agreed GreenRide should stop at a first concrete dashboard inventory layer
instead of leaving widgets and zones at a purely conceptual level.

Approved baseline direction:

- each main dashboard surface gets an approved first widget catalog
- each main dashboard surface gets an approved first zone map
- protected operational and governance widgets stay in protected zones
- configurable widgets may move only within approved configurable zones
- widget placement must stay aligned with source ownership and surface purpose

Reason:
- this closes another frontend refinement gap where widget catalogs and zone
  maps were still too abstract
- it also gives later customization and dashboard-detail work a concrete default
  inventory to build from

### Decision 80 — Theme, Branding, and Responsive Tightening Baseline

We agreed GreenRide should tighten the theming contract beyond general direction
and anchor first token roles, first breakpoints, and branding fallback behavior.

Approved baseline direction:

- tenant branding flows through approved token roles, not arbitrary overrides
- semantic state colors remain platform-controlled even when brand colors vary
- the first responsive model uses four breakpoint bands: mobile, tablet,
  desktop, and wide
- tenant branding assets must have safe fallback behavior when logos or favicons
  are missing or invalid
- AI-assisted branding must respect token-role mapping, semantic safety, and
  fallback rules

Reason:
- this closes one of the last weak frontend areas around theme/branding drift
- it also makes the branding system much harder for later AI implementation to
  improvise unsafely

### Decision 81 — Platform Ops Authority and Page-Family Refinement

We agreed GreenRide should tighten the Platform Ops surface beyond a first-pass
outline and make its authority split and page-family behavior more concrete.

Approved baseline direction:

- Platform Ops page families should each have a clear operational job and
  expected behavior
- the surface should separate health overview, incident work, impact review,
  maintenance/emergency controls, recovery, and audit behavior explicitly
- `platform_ops` keeps execution authority for ops actions by default
- `super_admin` keeps visibility by default, not silent execution inheritance
- visibility may be broader than execution, but raw deployment and infra actions
  still stay outside the normal product UI

Reason:
- this closes one of the weaker remaining frontend surface gaps
- it also reduces the chance that later AI work blurs platform governance with
  operational recovery behavior

### Decision 82 — Testing, Demo-Data, and Readiness Tightening Baseline

We agreed GreenRide should tighten the validation pack beyond a generic minimum
and make testing, demo-data, and readiness more slice-aware and repeatable.

Approved baseline direction:

- testing should distinguish slice criticality, not just test-layer names
- trust-critical and operational-critical slices require stronger negative-path
  validation
- demo data should use named baseline datasets aligned to platform, tenant ops,
  customer booking, driver/dispatch, and reporting validation needs
- readiness should use a first per-slice matrix rather than one flat checklist
- readiness claims must rely on current evidence, not old passing assumptions

Reason:
- this closes one of the remaining weak validation/readiness areas
- it also makes later implementation work easier to verify consistently instead
  of relying on vague “tested enough” or “ready enough” claims

### Decision 83 — Environment and Final Readiness Gate Tightening

We agreed GreenRide should tighten the top-level readiness controls so
environment assumptions and final readiness claims have clearer boundaries.

Approved baseline direction:

- local development is the only currently approved runtime tier
- staging and production assumptions must not be invented from local defaults
- the AI readiness gate should define what `ready` really means instead of using
  it as a vague positive label
- readiness requires explicit docs, explicit environment assumptions, explicit
  validation expectations, and no current blocker for the slice
- blocked work should remain explicit, especially around deployment assumptions
  and missing visual assets

Reason:
- this strengthens the final control layer for all later implementation work
- it also reduces the chance of AI over-claiming readiness from partial or old
  evidence

### Decision 84 — Platform Update, Maintenance, and Rollback Tightening

We agreed GreenRide should tighten the operational update and recovery model so
release state, maintenance behavior, rollback failure handling, and
communication expectations are more implementation-safe.

Approved baseline direction:

- every represented release should have an explicit operational record baseline
- release state should follow visible lifecycle expectations instead of vague
  status labels
- maintenance should behave like a scoped lifecycle with start, review,
  extension, and explicit end behavior
- rollback failure must remain visible as an operational problem instead of
  being treated as silent recovery
- user-facing and governance-facing communication should stay truthful and
  scope-aware during maintenance, failed rollout, rollback, and recovery

Reason:
- this closes one of the remaining high-value weak operational gaps
- it reduces the chance of AI inventing unrealistic release or recovery
  behavior across Platform Ops, incidents, and user-facing restrictions

### Decision 85 — Module Taxonomy and Commercial Model Tightening

We agreed GreenRide should tighten the commercial module model so backbone
modules, optional modules, capability toggles, onboarding linkage, and future
quantity-based charging do not drift into inconsistent packaging logic.

Approved baseline direction:

- backbone baseline modules should stay commercially non-removable
- the model should distinguish backbone modules, optional standard modules,
  quoted or premium modules, and capability toggles
- onboarding should apply tenant configuration only inside the commercially
  approved scope
- quantity-based charging is a later commercial extension and must not silently
  become a second RBAC or access model
- commercial package composition should stay distinct from roles, tenant
  configuration, and operational state

Reason:
- this closes one of the remaining weak commercial-shape gaps
- it reduces the chance of AI inventing incoherent package, module, or quantity
  pricing behavior

### Decision 86 — Superadmin Commercial Controls Tightening

We agreed GreenRide should tighten the superadmin commercial authority model so
tenant request handling, billing boundaries, and risky entitlement changes are
safer and more implementation-ready.

Approved baseline direction:

- tenant-scoped roles may request commercial changes later, but do not
  self-approve entitlement changes by default
- the product UI may store entitlement and pricing references, but it is not
  the raw billing-provider console
- package status should distinguish draft, active, and retired definitions
- commercial changes should remain explicit about immediate, future-effective,
  or pending operational follow-through
- historical business, reporting, audit, and billing records must not vanish
  just because a module entitlement changes later

Reason:
- this closes another remaining weak commercial-control gap
- it reduces the chance of AI inventing unsafe package-assignment or billing
  behavior in platform control workflows

### Decision 87 — Frontend Role, Route, and Shell Boundary Tightening

We agreed GreenRide should tighten the shared frontend boundary layer so role
surfaces, route ownership, and shell identity are less likely to drift during
implementation.

Approved baseline direction:

- each role family should keep a canonical default surface landing
- route families should keep one authoritative surface owner even when they show
  shared domain data
- `/platform/*` and `/platform-ops/*` should stay distinct in both route
  ownership and shell identity
- the shared app shell may own infrastructure, but not one universal navigation
  identity across all surfaces
- cross-surface links may exist, but the destination shell should become
  authoritative immediately

Reason:
- this closes three remaining weak frontend-structure gaps together
- it reduces the chance of AI flattening customer, driver, tenant, platform,
  and ops experiences into one generic shell and route model

### Decision 88 — Auth and Session Tightening

We agreed GreenRide should tighten the auth/session contract so timing bands,
token replacement behavior, concurrent session rules, and frontend linkage are
more implementation-safe.

Approved baseline direction:

- auth timing should be expressed as policy bands even before exact constants
  are final
- invite and recovery token replacement should invalidate the older token
  immediately
- concurrent sessions may exist by default, but forced security events must be
  able to revoke them by scope
- session refresh should re-check account, tenant, and role state before
  continuing the session
- frontend auth redirects and protected-route docs should stay aligned with the
  platform-ops documentation boundary without silently implementing that role

Reason:
- this closes the last actual weak system-shape gap in the register
- it reduces the chance of AI inventing unrealistic token, reset, or role-entry
  behavior during implementation

### Decision 89 — Reporting Follow-Through Tightening

We agreed GreenRide should tighten the reporting domain beyond the first
baseline so report families, visibility, export behavior, and widget ownership
are less ambiguous during implementation.

Approved baseline direction:

- reporting should use explicit report families by tenant and platform scope
- report visibility, export, and scheduling should be treated as separate
  permission layers
- failed or expired exports should remain explicit instead of disappearing
  silently
- dashboard widgets should only deep-link into reports where the actor is
  entitled to see that report family
- every reporting metric should keep an explicit source type and metric
  definition baseline

Reason:
- this reduces one of the broadest remaining cross-cutting refinement risks
- it makes reporting, exports, widgets, and personal-record boundaries harder
  for AI to blur later

### Decision 90 — Testing and Readiness Follow-Through Tightening

We agreed GreenRide should tighten the validation-control layer so testing,
demo data, and readiness claims are backed by clearer evidence and dataset
boundaries.

Approved baseline direction:

- testing should define slice-to-layer emphasis, not just generic test layers
- validation claims should point to explicit evidence, datasets, and deferred
  gaps
- demo data should map named datasets to validation slices explicitly
- reset behavior should support both full baseline reset and focused dataset
  reset
- readiness should define environment boundaries, rerun triggers, and evidence
  expectations

Reason:
- this makes later implementation validation more honest and repeatable
- it reduces the chance of vague “tested enough” or “ready enough” claims

### Decision 91 — Pricing Follow-Through Tightening

We agreed GreenRide should tighten the pricing follow-through layer so tenant
pricing control, zone-pricing detail, and quote-expiry recovery behave more
like controlled product rules and less like implied behavior.

Approved baseline direction:

- pricing configuration should have explicit authority, workflow, and audit
  expectations
- zone pricing should include first combination and tenant-editor guardrails
- quote expiry should include warning and recovery direction while keeping
  backend validity authoritative
- pricing changes should affect future quoting cleanly without silently
  mutating historical or already-committed outcomes

Reason:
- this reduces a high-risk ambiguity area touching quotes, bookings,
  configuration, and pricing trust boundaries
- it also keeps later pricing UI and backend work aligned to the same control
  model

### Decision 92 — Notification and CRM Follow-Through Tightening

We agreed GreenRide should tighten the notification follow-through layer so
event audiences, customization scope, and marketing/CRM sharing boundaries are
less likely to drift during implementation.

Approved baseline direction:

- event ownership should include first audience-direction rules, not just event
  names and channels
- tenant customization should stay inside explicit template-scope boundaries
- higher-risk templates should remain under tighter approval control
- marketing/CRM sync should follow consent-safe data sharing rather than
  inheriting transactional eligibility
- field-level sharing should stay narrow by default

Reason:
- this reduces another cross-cutting ambiguity area touching booking, auth,
  ops, and external integrations
- it makes it harder for AI to blur transactional notifications with marketing
  workflows or over-expand template control

### Decision 93 — Reporting Route and Financial-Adjustment Follow-Through

We agreed GreenRide should tighten two remaining cross-cutting detail areas:
reporting route/state behavior in the frontend, and refund/manual-financial
adjustment behavior in the payment domain.

Approved baseline direction:

- reporting should have explicit route/state behavior for tenant routes,
  platform routes, export actions, schedule actions, and locked/unavailable
  reporting states
- reporting widgets should only deep-link where the actor can actually view the
  destination report family
- refunds and credits should stay financial outcomes rather than booking states
- invoice/account-billing adjustments should not be forced into card-refund
  language by default
- manual financial actions should stay exceptional, auditable, and preserve the
  original payment and consent record boundaries

Reason:
- this reduces two remaining detail areas where AI could still drift badly
  during implementation
- it also gives reporting and payment follow-through cleaner dedicated homes
  instead of burying everything in broader baseline docs

### Decision 94 — Accepted Residuals and Cross-Phase Review

We agreed GreenRide should stop treating every remaining low-grade follow-through
item as if it were still missing shape work, and instead record accepted
residuals explicitly.

Approved baseline direction:

- cross-phase review residue from completed waves should be consolidated into
  one accepted-residuals review
- accepted residuals are later-detail or linkage work, not missing domain shape
- accepted residuals do not erase explicit blockers or external dependencies
- readiness should acknowledge accepted residuals honestly instead of pretending
  every remaining `partial` is equally blocking

Reason:
- this gives the repo a more honest maturity model
- it removes stale low-grade review residue without faking completeness
- it makes the remaining `partial` items easier to treat as real detail work
  rather than tracker inertia

### Decision 95 — UI Mockup Assets Baseline Available

We confirmed that the named baseline UI mockup assets now exist under:

- `docs/assets/ui/`

Approved direction:

- the named mockups should now be treated as the preferred reference for exact
  visual matching on those screens
- screens without a named mockup still remain governed by the written frontend
  contracts and should be treated as provisional visually
- the old UI-assets blocker is no longer an active missing gap

Reason:
- this resolves the last explicit external missing dependency in the gap
  register
- it moves the repo one step closer to a documentation-complete state for
  controlled implementation

### Decision 96 — Final Partial Closure Plan

We agreed GreenRide should stop treating the remaining `partial` count as one
undifferentiated backlog and instead group it into a small number of finishable
closure batches.

Approved direction:

- remaining work should now be organised into six closure batches
- the batch order should be:
  - trust and control detail
  - booking and pricing commitment detail
  - driver, dispatch, and live operations detail
  - payments, notifications, reporting, and service connectors
  - frontend page-family and UX detail
  - final validation and readiness detail
- the closure plan should be the main control document for the repo endgame
- accepted residuals should stay visible, but should not be confused with
  missing system shape

Reason:
- this gives the repo a real endgame instead of an indefinite refinement list
- it turns the remaining `partial` work into a finishable sequence
- it keeps readiness and completion claims more honest

### Decision 97 — Batch 1 Trust and Control Checklist

We agreed the first closure batch should be saved as its own focused checklist
before refinement work continues.

Approved direction:

- Batch 1 should have a dedicated control document
- that checklist should cover:
  - auth and session tightening
  - RBAC and authority tightening
  - multi-tenancy enforcement tightening
  - security-model tightening
  - audit/logging/observability tightening
  - incident and emergency-control tightening
  - final cross-document alignment
- the checklist should define finish criteria and stop conditions, not just a
  loose topic list

Reason:
- this reduces the chance of missing trust-critical follow-through
- it gives the first closure batch a saved backbone
- it keeps the endgame sequence measurable and easier to resume safely

### Decision 98 — Batch 1 Auth and RBAC Linkage Tightening

We agreed the first active pass inside Batch 1 should tighten the relationship
between auth/session, RBAC, protected routes, and role-surface boundaries before
moving deeper into the rest of the trust layer.

Approved direction:

- a valid authenticated session must not be treated as enough to cross into the
  wrong protected surface
- session revalidation must happen when trust-sensitive account, tenant, or
  authority changes occur
- refresh/session replacement must invalidate the replaced session chain rather
  than silently creating hidden parallel continuity
- `super_admin` visibility into platform state must not be mistaken for
  `platform_ops` execution authority
- module gating must not be used as a substitute for route-family access
  control

Reason:
- this closes one of the highest-risk remaining ambiguity areas in Batch 1
- it makes auth, RBAC, and frontend protected-route behavior say the same thing
- it reduces the chance of unsafe access assumptions during later
  implementation

### Decision 99 — Batch 1 Multi-Tenancy Scope Tightening

We agreed the next active Batch 1 pass should tighten the places where
multi-tenancy tends to drift most easily: reporting, exports, support
visibility, and background processing.

Approved direction:

- reporting and export visibility must not become shortcuts around tenant
  isolation
- platform support/governance visibility must remain explicit rather than
  behaving like broad tenant-data browsing
- background jobs, scheduled reports, queued exports, and tenant-scoped
  notification jobs must preserve the same authorised tenant or platform scope
  as the direct request path
- platform reporting is not the same thing as tenant reporting with a wider
  filter

Reason:
- this closes one of the main remaining cross-tenant drift risks in Batch 1
- it links the trust boundary more cleanly across multi-tenancy, security, and
  reporting
- it makes later implementation less likely to leak scope through async or
  support-oriented paths

### Decision 100 — Batch 1 Security-Model Tightening

We agreed the next active Batch 1 pass should tighten privileged-action rules
and resolve the remaining RBAC/security conflict around `super_admin` versus
`platform_ops`.

Approved direction:

- `platform_ops` must stay documented as an authority model and must not be
  silently treated as an already implemented schema/auth role
- privileged actions should explicitly require trust revalidation or step-up
  where the auth/security contract requires it
- a stale but still refreshable session must not automatically remain
  sufficient for high-impact privileged actions
- the RBAC default matrix must not imply that `super_admin` is a default
  tenant-dispatch, tenant-fleet, or tenant-ops execution role
- `super_admin` support and governance visibility should remain distinct from
  `platform_ops` operational execution

Reason:
- this resolves a real conflict between the RBAC matrix and the newer
  governance-versus-ops direction
- it strengthens the security contract around privileged action safety
- it keeps still-undecided `platform_ops` detail honestly partial rather than
  implying it is already fully implemented

### Decision 101 — Batch 1 Audit, Logging, and Observability Tightening

We agreed the next active Batch 1 pass should tighten the boundaries between
application logging, audit logging, observability, and reporting.

Approved direction:

- application logging should stay bounded operational diagnostic data, not a
  durable business record or reporting surface
- audit logging should stay the more durable accountability record for
  sensitive and operationally important actions
- observability should remain an operational telemetry and health model, not a
  substitute for raw logs, audit history, or business reporting
- reporting must not use raw application logs as a dashboard source type unless
  an explicit higher-level summary contract exists
- trust-sensitive workflows should clearly split:
  - technical execution detail
  - accountable user/control action
  - operational awareness and health visibility

Reason:
- this reduces one of the main remaining trust-boundary blur risks in Batch 1
- it makes retention, storage, visibility, ownership, and purpose boundaries
  more explicit
- it aligns logging/audit/observability behavior more cleanly with reporting
  and ops workflows

### Decision 102 — Batch 1 Incident and Emergency-Control Tightening

We agreed the next active Batch 1 pass should tighten incident handoff,
escalation, review accountability, and the split between governance visibility
and operational execution.

Approved direction:

- incident ownership handoff must preserve acknowledgement history, active
  controls, and review accountability
- escalation should increase visibility and urgency without automatically
  broadening execution authority
- overlap between incident containment, maintenance, and rollback must resolve
  to one clear effective restriction model
- `super_admin` governance visibility and review pressure must remain distinct
  from `platform_ops` execution authority
- Platform Ops UI should make visibility-only versus execution-capable states
  clearer

Reason:
- this closes one of the remaining soft trust-boundary areas in Batch 1
- it aligns incident handling more cleanly with maintenance, rollback, and the
  Platform Ops surface
- it reduces the chance that later implementation blurs governance awareness
  with live operational control

### Decision 103 — Batch 1 Cross-Document Alignment Check

We agreed the final Batch 1 pass should not rescan the whole repo, but should
check only the Batch 1 trust/control docs for real contradictions and authority
leaks.

Approved result:

- the remaining Batch 1 docs are now aligned enough to treat as one coherent
  trust/control set
- `super_admin` wording now better matches the governance/support-visibility
  model rather than implying unrestricted operational execution
- release/maintenance docs now better preserve the rule that `platform_ops`
  remains a documented authority target until schema/auth alignment is approved
- no wider Batch 1 contradictions were found that required broader rewrites

Reason:
- this closes the final alignment pass for Batch 1 without inventing new scope
- it confirms the batch is now substantially coherent rather than just
  individually improved

### Decision 104 — Batch 1 Completion Judgment

We agreed the final Batch 1 review should end with an explicit yes/no judgment
instead of leaving completion implied.

Approved result:

- Batch 1 can now be treated as substantially complete
- remaining Batch 1 items are still partial in the gap register, but they no
  longer represent internal contradiction or major trust-boundary confusion
- the remaining Batch 1 work is later-detail follow-through, not a blocker to
  moving into Batch 2

Reason:
- this makes the closure-plan status more honest and easier to resume later
- it records that Batch 1 is complete enough to stop without pretending every
  detail is final

### Decision 105 — Batch 2 Booking and Pricing Commitment Checklist

We agreed the next closure batch should be Batch 2 and should start with its
own dedicated checklist before deeper refinement work begins.

Approved direction:

- Batch 2 should have a focused control document
- that checklist should cover:
  - booking lifecycle alignment
  - pricing and precedence tightening
  - quote validity and revalidation
  - agreements and payment-consent tightening
  - booking confirmation boundary tightening
  - amendment/cancellation/repricing tightening
  - pricing configuration and location-asset tightening
  - final Batch 2 cross-document alignment
- Batch 2 should stay inside booking and pricing commitment detail and should
  not expand into driver or dispatch work
- Batch 2 should tighten the existing model rather than redesign the pricing
  model

Reason:
- this gives Batch 2 the same saved control backbone Batch 1 had
- it reduces the chance of drifting across booking, pricing, payments, and
  later dispatch concerns
- it keeps the next refinement wave measurable and easier to resume safely

### Decision 106 — Batch 2 Commitment Boundary Tightening

We agreed the first active Batch 2 pass should tighten the commitment boundary
between quote, form progress, agreement capture, and confirmed booking.

Approved direction:

- expired quotes must block movement into `confirmed` until explicit requote or
  revalidation succeeds
- missing required agreement, consent, or booking-path financial prerequisites
  must block confirmation without creating a new lifecycle state
- payment should remain path-dependent rather than being implied as a universal
  lifecycle step
- preserved form progress or earlier consent capture must not by itself keep a
  booking attempt confirmation-ready when quote validity or booking-path context
  has changed

Reason:
- this tightens the main trust boundary at the start of Batch 2
- it keeps lifecycle, confirmation, quote-expiry, and agreement docs aligned
- it reduces the chance of AI treating UI progress as booking commitment

### Decision 107 — Batch 2 Pricing Precedence and Location-Asset Tightening

We agreed the next Batch 2 pass should tighten only the pricing-precedence and
reusable-location boundaries without redesigning the pricing model.

Approved direction:

- route-path selection controls whether the request enters fixed-route, explicit
  zone-pricing, or generic non-fixed pricing
- requested `vehicleCategory` may narrow eligible priced categories, but it
  does not independently choose a different pricing path
- saved locations remain convenience data and must not become hidden pricing
  authority
- custom routes affect pricing only where approved pricing configuration or
  pricing contracts explicitly reference them

Reason:
- this narrows one of the softer remaining Batch 2 ambiguity areas
- it keeps pricing-engine, route-selection, configuration, and reusable-location
  docs aligned without expanding into dispatch or redesign work

### Decision 108 — Batch 2 Amendment, Cancellation, and Repricing Tightening

We agreed the next Batch 2 pass should tighten only the amendment,
cancellation, and repricing boundary without expanding into dispatch.

Approved direction:

- amendment revalidation may remove confirmation readiness when quote, consent,
  billing, or price-sensitive inputs change, but it must not invent a new
  lifecycle state
- preserved progress or previously captured inputs do not by themselves prove
  an amended booking is still commitment-ready
- if an amendment invalidates the quote basis, later confirmation must return
  through explicit requote or revalidation
- late-cancellation money effects remain explicit payment or finance outcomes,
  not booking lifecycle states

Reason:
- this tightens one of the remaining Batch 2 commitment-sensitive edges
- it keeps booking-change, confirmation, quote-expiry, pricing, and refund docs
  aligned without broadening into operational dispatch behavior

### Decision 109 — Batch 2 Amendment Outcome Boundary Tightening

We agreed the next narrow Batch 2 pass should make amendment outcomes more
explicit without redesigning pricing or refund policy.

Approved direction:

- amendment handling must distinguish between validation only, revalidation,
  explicit requote/repricing, and explicit reconfirmation-readiness outcomes
- not every booking change requires the same response
- if a change affects quote basis, fare basis, consent, billing, or other
  confirmation prerequisites, the platform must not treat the earlier confirmed
  state as automatically sufficient for the amended context
- the platform must make revalidation, requote, and reconfirmation outcomes
  explicit rather than leaving the amendment in a vague partially updated state

Reason:
- this closes another soft Batch 2 ambiguity area
- it keeps amendment, confirmation, pricing, and refund-sensitive edges aligned
  without broadening into dispatch or redesigning the pricing model

### Decision 110 — Batch 2 Cancellation and Finance Outcome Tightening

We agreed the next narrow Batch 2 pass should make cancellation and
refund-sensitive follow-through more explicit without redesigning pricing or
refund policy.

Approved direction:

- cancellation closes lifecycle truth through `cancelled`; it does not return
  the booking through quote or confirmation flow
- cancellation finance review is separate from lifecycle truth
- amendment repricing and cancellation finance handling must not be flattened
  into one generic "payment adjustment" outcome
- an amended booking that is repriced does not automatically imply a refund;
  refund, credit, additional charge, or waived adjustment still depends on the
  approved payment path and policy

Reason:
- this tightens another Batch 2 refund-sensitive edge without changing the core
  booking or pricing model
- it keeps amendment, cancellation, payment, and finance docs aligned while
  staying out of dispatch and provider-specific detail

### Decision 111 — Batch 2 Amendment Financial Outcome Tightening

We agreed the next narrow Batch 2 pass should make amended-fare financial
follow-through more explicit without redesigning pricing or refund policy.

Approved direction:

- repricing after amendment and downstream financial follow-through are separate
  decisions
- a newly calculated amended fare does not by itself prove that collection,
  refund, credit, or invoice adjustment is already complete
- amended bookings may require no financial action, additional-charge review,
  credit/refund review, or invoice/account adjustment review depending on the
  approved payment path and policy

Reason:
- this closes one more soft refund-sensitive edge in Batch 2
- it keeps amendment, confirmation, pricing, payment, and finance docs aligned
  without broadening into dispatch or provider-specific behavior

### Decision 112 — Batch 2 Reconfirmation Requirement Tightening

We agreed the next narrow Batch 2 pass should make the reconfirmation rule
more explicit for amended bookings without redesigning pricing or payment
models.

Approved direction:

- where an amended booking requires renewed confirmation readiness, it must
  satisfy the then-current booking-path requirements rather than relying on
  earlier pre-amendment satisfaction by assumption
- reconfirmation readiness and later financial follow-through remain separate
  decisions even when both are triggered by the same amended change

Reason:
- this closes another soft commitment edge in Batch 2
- it keeps amendment, confirmation, pricing, and payment docs aligned without
  broadening into dispatch or provider-specific behavior

### Decision 113 — Batch 2 Confirmation Context Matrix Tightening

We agreed the next narrow Batch 2 pass should make the confirmation baseline
more explicit across guest, authenticated-account, and operator-assisted entry
contexts without inventing new business rules.

Approved direction:

- guest, authenticated account, and operator-assisted entry may differ in UX
  density, data reuse, and who enters the booking
- those entry-context differences do not by themselves change the underlying
  confirmation boundary
- the active booking-path requirements for pricing, quote validity, agreement,
  consent, billing acknowledgement, and financial prerequisites still apply
  unless a later explicit policy documents a narrower difference
- operator-assisted entry does not by itself imply pricing or consent waiver

Reason:
- this closes another soft Batch 2 ambiguity area
- it keeps confirmation and form docs aligned without broadening into dispatch,
  RBAC redesign, or invented operator privilege rules

### Decision 114 — Batch 2 Quote Validity and Revalidation Tightening

We agreed the next narrow Batch 2 pass should make quote-validity and recovery
rules more explicit without inventing exact timing constants.

Approved direction:

- every quote must carry a real validity window, but the exact duration remains
  explicitly partial until later policy detail is approved
- warning behaviour before expiry is supportive only and must not be treated as
  the source of truth or as proof that confirmation is still allowed
- confirmation is allowed only on a still-valid quote context or after explicit
  revalidation succeeds
- if the platform can no longer safely rely on the earlier quote basis,
  revalidation is not enough and a fresh requote is required

Reason:
- this closes another soft Batch 2 ambiguity area
- it keeps quote-expiry, confirmation, and pricing docs aligned without
  broadening into UX-copy detail or inventing timing constants

### Decision 115 — Batch 2 Review Readiness Judgment

We agreed the next step should be a full Batch 2 review rather than another
narrow sub-pass.

Approved judgment:

- Batch 2 is now ready for a final completion check
- the remaining Batch 2 items are still partial, but they read as accepted
  detail follow-through rather than unresolved structural contradictions
- the next honest step is a final Batch 2 completion check, not another
  speculative tightening pass unless a new contradiction is found

Reason:
- this avoids inventing more product rules just to force false completeness
- it records that the booking/pricing commitment pack is now coherent enough to
  evaluate for substantial completion

### Decision 116 — Batch 2 Completion Judgment

We agreed the Batch 2 final completion check should stay narrow and only close
the batch if no blocking contradiction remained inside the booking and pricing
commitment pack.

Approved judgment:

- Batch 2 can now be treated as substantially complete
- no blocking contradiction remains across:
  - booking confirmation boundary
  - pricing-precedence baseline
  - quote-expiry versus requote/revalidation
  - amendment, cancellation, repricing, and downstream finance linkage
- the remaining Batch 2 open items are still partial, but they are detail-level
  follow-through rather than structural blockers for closing the batch

Reason:
- this records an honest closure judgment without pretending every later policy
  constant, field matrix, or role exception is already finalized
- it lets the next closure batch start from a stable Batch 2 baseline

### Decision 117 — Batch 3 Driver, Dispatch, and Live Operations Checklist

We agreed to move into Batch 3 after treating Batch 2 as substantially
complete.

Approved direction:

- Batch 3 should begin with a dedicated checklist in the control layer
- the batch stays focused on:
  - driver lifecycle
  - allocation and assignment
  - dispatch logic and ranking
  - live-location freshness and degraded mode
  - navigation/connectivity
  - vehicle/fleet linkage to live operations
  - zone, geofence, and custom-location operational controls
- Batch 3 should not redesign the dispatch model
- later work should tighten operational trust and fallback behavior without
  broadening into unrelated payment, frontend, or reporting detail

Reason:
- this preserves the same control discipline used for Batch 1 and Batch 2
- it gives the next operational refinement pass a saved execution spine before
  any narrower tightening work begins

### Decision 118 — Batch 3 Offer, Freshness, and Reassignment Tightening

We agreed the first real Batch 3 pass should stay narrow and focus on the core
operational trust boundary across driver lifecycle, allocation, dispatch, map,
and fallback docs.

Approved direction:

- `job_offered` remains the real pre-commitment driver boundary and must not be
  silently collapsed into full assignment
- stale or missing live-location context reduces automatic dispatch trust, but
  does not by itself rewrite driver lifecycle truth
- cleared offers, removals, and reassignment paths must return both the booking
  and the previous driver to explicit valid states rather than leaving implied
  assignment residue
- degraded or missing map/location inputs must remain visible as weak context,
  not disguised as fresh operational certainty

Reason:
- this closes the first real Batch 3 contradiction and trust gap without
  redesigning the dispatch model
- it aligns lifecycle, allocation, dispatch, map, and fallback language before
  deeper Batch 3 refinement continues

### Decision 119 — Batch 3 Navigation and Connectivity Trust Tightening

We agreed the next narrow Batch 3 pass should tighten the driver-side
navigation and degraded-connectivity boundary without inventing provider detail
or offline-sync mechanics.

Approved direction:

- navigation remains handoff-first by default
- navigation handoff failure must not by itself change assignment, arrival, or
  trip-progress truth
- pending delivery confirmation and last-known local context must remain
  visibly weaker than confirmed live platform acknowledgement
- weak connectivity, stale location, and local fallback context are operational
  trust conditions, not new driver lifecycle states

Reason:
- this keeps driver-side operational truth aligned with lifecycle, allocation,
  and realtime rules
- it closes another soft Batch 3 trust gap without redesigning navigation or
  transport architecture

### Decision 120 — Batch 3 Vehicle and Live-Operations Linkage Tightening

We agreed the next narrow Batch 3 pass should tighten the vehicle-side live
operations boundary without redesigning dispatch or fleet policy.

Approved direction:

- allocation readiness must be read as driver-plus-vehicle readiness, not
  driver readiness in isolation
- vehicle category must not stand in for live operational vehicle suitability
- if the usable vehicle context becomes inactive, unavailable, or newly
  unsuitable after gating or assignment has started, the booking must return to
  explicit reassessment or reassignment flow
- ranking and dispatch must not preserve trust in an earlier candidate simply
  because it ranked well before vehicle suitability changed

Reason:
- this closes a live-operations gap between vehicle, allocation, dispatch, and
  ranking docs
- it keeps operational fulfilment grounded in real vehicle suitability rather
  than static category assumptions

### Decision 121 — Batch 3 Area-Rule and Dispatch Visibility Tightening

We agreed the next narrow Batch 3 pass should tighten the operational
relationship between area rules and dispatch behavior without redesigning the
zone or pricing model.

Approved direction:

- area rules may either block normal assignment or keep the booking serviceable
  with explicit special-handling or lower-confidence treatment
- those outcomes must remain visible in the dispatch path rather than hidden as
  generic dispatch weakness
- map visuals may support awareness, but area-rule meaning must remain visible
  even when the map is degraded or unavailable
- custom or saved operational locations do not waive service-area restrictions
  or special-handling requirements

Reason:
- this closes another soft Batch 3 ambiguity between operational location
  controls and dispatch behavior
- it keeps area rules operationally meaningful without letting them drift into
  hidden map-only logic or pricing-first interpretation

### Decision 122 — Batch 3 Retry and Reassignment Boundary Tightening

We agreed the next narrow Batch 3 pass should tighten retry and reassignment
behavior without inventing exact attempt counts or timing constants.

Approved direction:

- retry and re-offer paths may exist, but they must remain bounded by explicit
  policy or confidence limits
- repeated reject, timeout, or cleared-offer paths must not silently churn as
  if each new attempt were equally healthy
- once retry or confidence limits are reached, the booking must remain clearly
  unresolved for operational review rather than appearing to be in a normal
  continuing automatic cycle
- the previous driver must still return to an explicit valid lifecycle state
  whenever the earlier offer/assignment path is cleared

Reason:
- this closes another soft Batch 3 ambiguity between fallback, reassignment,
  and operational honesty
- it keeps dispatch, ranking, and allocation docs aligned without inventing
  exact retry counts or timeout constants

### Decision 123 — Batch 3 Review Readiness Judgment

We agreed the next step should be a Batch 3 review judgment rather than another
narrow speculative pass unless a new contradiction was found.

Approved judgment:

- Batch 3 is now ready for a final completion check
- the remaining Batch 3 items are still partial, but they read as accepted
  detail follow-through rather than unresolved structural contradictions
- the next honest step is a final Batch 3 completion check, not another
  speculative tightening pass unless a new contradiction appears

Reason:
- this avoids inventing more operational rules just to force false completeness
- it records that the driver, dispatch, and live-operations pack is now
  coherent enough to evaluate for substantial completion

### Decision 124 — Batch 3 Completion Judgment

We agreed the Batch 3 final completion check should stay narrow and only close
the batch if no blocking contradiction remained inside the driver, dispatch,
and live-operations pack.

Approved judgment:

- Batch 3 can now be treated as substantially complete
- no blocking contradiction remains across:
  - driver lifecycle and offer/assignment boundary
  - allocation readiness and live-location trust
  - dispatch decision, reassignment, and unresolved-review behavior
  - ranking, degraded confidence, and bounded retry direction
  - advisory map boundaries
  - navigation/connectivity trust
  - vehicle suitability linkage
  - area-rule operational meaning
- the remaining Batch 3 open items are still partial, but they are detail-level
  follow-through rather than structural blockers for closing the batch

Reason:
- this records an honest closure judgment without pretending every threshold,
  timeout constant, or offline-sync detail is already finalized
- it lets the next closure batch start from a stable live-operations baseline

### Decision 125 — Batch 4 Payments, Notifications, Reporting, and Service Connectors Checklist

We agreed to move into Batch 4 after treating Batch 3 as substantially
complete.

Approved direction:

- Batch 4 should begin with a dedicated checklist in the control layer
- the batch stays focused on:
  - payments and invoicing
  - refunds and financial adjustments
  - notification ownership, events, channels, and customization
  - reporting, exports, analytics, and dashboard-report boundaries
  - realtime, maps, geolocation, address, ETA, and connector boundaries
  - external notification, CRM, and marketing integrations
- Batch 4 should not redesign the payment, reporting, or notification models
- later work should tighten service-layer trust and ownership boundaries without
  broadening into unrelated frontend or readiness detail

Reason:
- this preserves the same control discipline used for Batch 1 to Batch 3
- it gives the next service-layer refinement pass a saved execution spine
  before any narrower tightening work begins

### Decision 126 — Batch 4 Payment and Financial Outcome Separation Tightening

We agreed the first narrow Batch 4 pass should tighten the separation between
payment, refund, credit, charge, and invoice-adjustment outcomes without
inventing provider or accounting detail.

Approved direction:

- collection, refund review, credit handling, waived/write-off outcomes, and
  invoice/account settlement correction must remain distinct financial outcomes
- those outcomes remain downstream finance behavior, not booking lifecycle
  states
- a generic "payment updated" or "finance adjusted" result must not hide what
  actually happened
- manual financial intervention must preserve that distinction rather than
  flattening all later adjustments into one vague status

Reason:
- this closes the first soft Batch 4 ambiguity in the payment/refund slice
- it strengthens service-layer trust boundaries without redesigning payment
  models or inventing provider-specific mechanics

### Decision 127 — Batch 4 Notification Audience Boundary Tightening

We agreed the next narrow Batch 4 pass should tighten notification audience
boundaries without expanding into provider, template, or CRM implementation
detail.

Approved direction:

- audience eligibility remains event-owned
- auth and recovery communications stay limited to the identity owner or
  intended recipient
- driver-operational communications do not become customer communications by
  default
- maintenance and incident communications remain scope-targeted rather than
  platform-wide by assumption
- transactional event eligibility does not imply marketing or CRM audience
  eligibility

Reason:
- this closes a soft Batch 4 ambiguity across event, channel, audience, and
  customization boundaries
- it keeps notification ownership and data-sharing trust boundaries cleaner
  without redesigning the notification model

### Decision 128 — Batch 4 Reporting Action-Layer Boundary Tightening

We agreed the next narrow Batch 4 pass should tighten reporting/export/schedule
boundaries without redesigning reporting families or frontend route detail.

Approved direction:

- report-family existence does not by itself grant export rights
- report-family existence does not by itself grant scheduling rights
- widget visibility does not by itself grant deep-link or export rights
- report view, export, and scheduling remain separate action layers even inside
  the same reporting family

Reason:
- this closes a soft Batch 4 ambiguity in the reporting slice
- it keeps report ownership, export control, and widget/report boundaries
  aligned without expanding into full page-family redesign

### Decision 129 — Batch 4 Realtime and Maps Support-Data Boundary Tightening

We agreed the next narrow Batch 4 pass should tighten the boundary around
realtime, ETA, route, map, and address-support values without inventing
provider or transport detail.

Approved direction:

- realtime remains a distribution layer, not stronger business truth
- ETA, route, distance, location, and address-normalisation outputs remain
  support data subordinate to the owning domain contracts
- when those support values appear in live visibility, notifications,
  reporting, or exports, they must not be presented as stronger than the
  underlying approved business state
- degraded transport or provider behavior reduces confidence in support data,
  not the authority of the underlying business record

Reason:
- this closes a soft Batch 4 ambiguity across realtime, maps, and address
  boundaries
- it keeps support layers from silently becoming business-rule owners when
  reused in multiple surfaces

### Decision 130 — Batch 4 Custom Notification and Integration Boundary Tightening

We agreed the next narrow Batch 4 pass should tighten the remaining custom
notification, approval-workflow, and external-integration boundary without
redesigning the notification model.

Approved direction:

- template approval must not be treated as approval to widen trigger or
  audience authority
- approved template variables must stay subordinate to the event contract and
  must not become a hidden data-sharing path
- external connectors remain delivery/integration adapters rather than owners
  of transactional event truth
- external connectors must not widen audience eligibility or silently convert
  transactional events into marketing events

Reason:
- this closes the remaining soft Batch 4 ambiguity in the notification slice
- it keeps customization and external integration subordinate to the approved
  event-owned notification model

### Decision 131 — Batch 4 Completion Judgment

We reviewed the Batch 4 service-layer scope as a whole and confirmed it can now
be treated as substantially complete without inventing further model detail.

Approved direction:

- no blocking contradiction remains across payments, refunds, notifications,
  reporting, realtime, or maps/address support boundaries
- remaining uncertainty is detail-level only, including provider choice,
  method/currency specifics, and deeper operational implementation detail
- Batch 4 should now move forward to the next closure batch rather than
  continuing speculative micro-passes in the same service slice

Reason:
- the Batch 4 docs are now internally aligned enough for honest closure at the
  current documentation stage
- further progress in this slice would otherwise risk churning wording instead
  of closing real contradictions

### Decision 132 — Batch 5 Frontend Page-Family and UX Detail Checklist

We agreed to move into Batch 5 using the same narrow-pass rhythm and control
discipline used in Batch 2 and Batch 3.

Approved direction:

- Batch 5 should be driven from a dedicated checklist
- work should stay in narrow frontend slices rather than broad rescans
- control docs and the fast handoff file should be kept in sync only when real
  progress happens

Reason:
- this keeps Batch 5 consistent with the working method that already held up
  across the earlier closure batches
- it reduces restart risk and avoids open-ended frontend drift

### Decision 133 — Batch 5 Surface and Shell Ownership Tightening

We agreed the first narrow Batch 5 pass should tighten frontend surface
separation by aligning route-family ownership, shell ownership, and blocked-route
/redirect behavior.

Approved direction:

- redirects and default landings must keep users inside the canonical route
  family for the authoritative surface
- blocked-route recovery must not silently fall back through another surface
  shell
- shared shell infrastructure may assist with routing and wrappers, but it must
  not blur which surface shell owns the resulting page

Reason:
- this closes an early Batch 5 ambiguity across route ownership, shell
  ownership, and gating behavior
- it keeps frontend surface separation aligned with the stronger trust and
  routing boundaries already established in earlier batches

### Decision 134 — Batch 5 Page-Family Contract Tightening

We agreed the next narrow Batch 5 pass should tighten the main frontend
page-family contracts without inventing new screens or redesigning the product
model.

Approved direction:

- customer page families must preserve the distinction between public booking
  and authenticated account context even when the UI feels related
- tenant-operations page families must make stale, partial, blocked, and
  degraded operational conditions more explicit
- platform-control page families must preserve governance identity and must not
  drift into platform-ops execution behavior

Reason:
- this closes a real Batch 5 softness where page families existed but still
  needed clearer behavioral expectations to become safer for implementation

### Decision 135 — Batch 5 Widget, Layout, and Embed Authority Tightening

We agreed the next narrow Batch 5 pass should tighten widget, layout, embed,
and external-hosting boundaries without redesigning dashboards or the external
website model.

Approved direction:

- widgets remain summaries and must not grant broader route, report, export, or
  operational-action authority by themselves
- saved layouts must not reintroduce routes, deep-links, or actions that are no
  longer allowed for the current user or surface
- embeds, CMS hosts, and plugin configurations must stay inside the approved
  narrow embed surface and must not reopen broader route families or deeper
  product authority

Reason:
- this closes the main Batch 5 softness across dashboard ownership,
  customization persistence, and external-surface follow-through

### Decision 136 — Batch 5 State Handling and Trust-Recovery Tightening

We agreed the next narrow Batch 5 pass should tighten frontend state handling
around stale, degraded, partial, missing-record, and session-recovery behavior
without redesigning the underlying domain flows.

Approved direction:

- session-expiry or re-authentication recovery must stay distinct from
  `permission_denied` and `not_found`
- record-level not-found handling should preserve current surface and route
  context rather than collapsing into generic global errors
- operational surfaces must keep stale, degraded, partial-data, and blocked
  causes explicit without duplicating or contradicting local state-handling
  rules

Reason:
- this closes the main Batch 5 softness in the shared trust-state handling
  layer
- it keeps surface recovery behavior aligned with the stronger route and shell
  ownership work already completed

### Decision 137 — Batch 5 Branding and External-Surface Identity Tightening

We agreed the next narrow Batch 5 pass should tighten branding, responsive, and
external-surface guidance without redesigning the design system or expanding
the external website model.

Approved direction:

- tenant branding and AI-assisted theme recommendations may influence
  tenant-scoped identity and atmosphere, but must not blur surface identity,
  route ownership, or shell authority
- responsive collapse must preserve trust cues and surface identity instead of
  flattening all surfaces into one generic pattern
- surrounding CMS/host branding must not make the narrow external booking embed
  look like a full customer-account or operational surface

Reason:
- this closes the remaining Batch 5 softness in the branding and
  external-surface slice
- it keeps visual customization subordinate to the stronger surface-boundary
  work already completed earlier in the batch

### Decision 138 — Batch 5 Completion Judgment

We reviewed the Batch 5 frontend scope as a whole and confirmed it can now be
treated as substantially complete without inventing further frontend model
detail.

Approved direction:

- no blocking contradiction remains across route-family ownership, shell
  identity, page-family behavior, widget/layout/embed authority, shared state
  handling, or branding/external-surface guidance
- remaining uncertainty is detail-level only, including deeper screen behavior,
  richer visual-spec detail, finer widget permissions, and exact implementation
  mechanics
- Batch 5 should now move to the next closure batch rather than continuing
  speculative frontend micro-passes

Reason:
- the Batch 5 docs are now internally aligned enough for honest closure at the
  current documentation stage
- further progress in this slice would risk wording churn more than real
  contradiction reduction

### Decision 139 — Batch 6 Final Validation and Readiness Detail Checklist

We agreed to move into Batch 6 using the same checklist-first, narrow-pass
rhythm used in the earlier closure batches.

Approved direction:

- Batch 6 should be driven from a dedicated checklist
- work should stay in narrow readiness slices rather than broad rescans
- control docs and the fast handoff file should be kept in sync only when real
  progress happens

Reason:
- this keeps the final readiness wave consistent with the working method that
  already held up in Batch 1 to Batch 5
- it keeps final readiness claims tied to documented evidence rather than loose
  confidence language

### Decision 140 — Batch 6 Testing Evidence Shape Tightening

We agreed the first narrow Batch 6 pass should tighten testing strategy around
evidence expectations rather than expanding into tooling selection.

Approved direction:

- slice validation should leave a repeatable evidence shape
- evidence should stay tied to slice criticality and risk
- “tests exist” is not enough to support a readiness claim

Reason:
- this closes the first real Batch 6 softness in the readiness layer
- it makes later readiness and completion language easier to audit honestly

### Decision 141 — Batch 6 Seed and Fixture Purpose Tightening

We agreed the next narrow Batch 6 pass should tighten seed, fixture, and
demo-data purpose boundaries rather than drifting into tooling implementation.

Approved direction:

- local bootstrap data, repeatable validation fixtures, and showcase/demo
  datasets must remain distinct in purpose
- readiness claims should name the dataset basis and reset mode they rely on
- “seeded enough” is not an acceptable readiness claim

Reason:
- this reduces a real repeatability risk in the final readiness layer
- it links seed/demo guidance more cleanly to operational-readiness evidence
  expectations

### Decision 142 — Batch 6 Operational Readiness Claim Tightening

We agreed the next narrow Batch 6 pass should tighten operational-readiness and
environment-boundary language rather than drifting into deployment or provider
design.

Approved direction:

- readiness claims should name the environment tier they apply to
- readiness claims should name the dataset or fixture basis they rely on
- degraded, fallback, or stale-data coverage should be explicit where relevant
- broad “validated locally” wording is not enough

Reason:
- this makes readiness judgments easier to audit honestly
- it reduces premature readiness claims based on vague local confidence

### Decision 143 — Batch 6 Final AI Readiness Gate Tightening

We agreed the next narrow Batch 6 pass should tighten the top-level AI
readiness gate against the current documented state rather than inventing new
readiness claims.

Approved direction:

- `ready` must stay tied to the environment tier and evidence basis actually in
  scope
- accepted residuals must remain visible as residuals
- broad “validated locally” confidence language is not enough for the final gate

Reason:
- this aligns the top-level readiness gate with the tighter testing, seed, and
  operational-readiness rules already saved in Batch 6
- it reduces the risk of premature “AI can proceed” claims

### Decision 144 — Batch 6 Completion Judgment

We agreed the final Batch 6 pass should judge the readiness pack as a whole
without broadening into new implementation detail.

Approved direction:

- Batch 6 can now be treated as substantially complete
- no blocking contradiction remains across the Batch 6 readiness documents
- remaining Batch 6 uncertainty should stay visible as residual detail rather
  than be treated as missing readiness shape

Reason:
- this closes the final documentation-readiness batch honestly
- it keeps the repo’s readiness claims aligned with the narrower evidence and
  residual rules established earlier in Batch 6

### Decision 145 — Overall Closure Judgment

We agreed the final repo-level check should judge the control layer and closure
state as a whole without reopening completed batches.

Approved direction:

- all six closure batches can now be treated as substantially complete
- no active `missing` or `weak` documentation gap remains
- the remaining gaps are accepted `partial` residuals, not shape blockers
- the repo is now suitable for controlled AI-assisted implementation work where
  the documented boundaries are respected

Reason:
- this aligns the control layer with the actual completion state reached across
  Batch 1 to Batch 6
- it prevents the tracker from understating progress after the final readiness
  wave completed

### Decision 146 — AI Build Scope Buckets

We agreed the repo should say more clearly not just the safety rules, but which
implementation types are safe now, safe only with placeholders, or should
reopen docs first.

Approved direction:

- the AI readiness gate should include explicit build-scope buckets
- safe-now work should stay limited to already defined structure and behaviour
- placeholder-safe work should keep unresolved policy visible
- pricing, dispatch, lifecycle, and financial policy choices should reopen docs
  instead of being guessed in implementation

Reason:
- this turns the residual-safety discussion into a practical implementation
  operating model
- it reduces ambiguity about what “controlled AI build” actually permits

### Decision 147 — Future Wave 1 Add-On Documentation Anchoring

We agreed the first enhancement wave should be made into a real planned
documentation item rather than left only in enhancement-discovery notes.

Approved direction:

- create a future-wave checklist for `School Run` and `Parcel / Courier /
  Logistics`
- keep that wave anchored in the implementation control layer
- treat it as post-closure expansion work, not as a reopening of the completed
  core documentation batches

Reason:
- this preserves the new add-on work as real planned scope
- it allows later restart/recovery without losing the agreed expansion order

### Decision 148 — Consent Reuse and Reconfirmation Boundary Tightening

We agreed the booking-form and agreement contract should say more clearly that
earlier consent capture cannot be replayed blindly after explicit requote,
revalidation, or booking-path change where the dependent commitment basis has
changed.

Approved direction:

- required agreement and consent capture should remain tied to the relevant
  booking-path and quote/commitment context
- structured consent evidence should include booking-path and
  quote/pricing-context linkage where that dependency matters
- when a requote, revalidation, or booking-path change alters the
  commitment-sensitive basis, dependent consent must be explicitly rechecked,
  reconfirmed, or recaptured before `confirmed`
- operator-assisted recovery may help the workflow continue, but it does not by
  itself waive reconfirmation where the underlying dependent basis changed

Reason:
- this reduces trust-boundary drift between quote validity, confirmation
  readiness, and payment/billing consent handling
- it keeps the product docs aligned with the repo rule that preserved UI state
  must not silently remain confirmation-ready when the underlying booking basis
  changed

### Decision 149 — Core Pricing Path Exclusivity Tightening

We agreed the pricing and pricing-configuration contracts should say more
clearly that one quote attempt must resolve to one authoritative core pricing
path, and that overlap between fixed-route, zone-pricing, and generic pricing
must be resolved by documented precedence and configuration validation rather
than runtime guesswork.

Approved direction:

- each quote calculation must resolve one authoritative core pricing path
  before extras, surcharges, discounts, minimum-fare enforcement, and rounding
  are layered on top
- fixed-route pricing, explicit zone-pricing, and generic non-fixed pricing are
  mutually exclusive core paths by default for one calculation attempt
- zone matches and area references must not become hidden post-hoc override
  layers once another core path already owns the request
- tenant pricing configuration should reject unresolved overlap where the same
  request context could match competing core paths without an explicit
  documented precedence outcome

Reason:
- this reduces remaining AI drift risk in pricing precedence and
  configuration-validation behavior
- it keeps the pricing engine, zone-pricing contract, and tenant pricing
  configuration docs aligned around explainable path selection instead of
  heuristic conflict resolution

### Decision 150 — Reporting Scope Preservation Tightening

We agreed the reporting and export contracts should say more clearly that saved
filters, widget deep-links, queued exports, and scheduled reports may carry
approved context forward, but must never widen reporting scope, surface
ownership, report-family ownership, or export/scheduling rights.

Approved direction:

- saved reporting filters and schedule definitions must remain bound to the
  authorised report family and scope they were created for
- widget deep-links may prefill only approved target-report filters and must
  not carry hidden export, scheduling, or cross-surface scope rights
- queued export and scheduled-report work must preserve the same authorised
  tenant or platform scope that existed at request time and fail cleanly if
  that scope is no longer valid
- frontend reporting routes should normalise incoming deep-link or saved-filter
  state to the target route's authorised family and scope rather than widening
  access silently

Reason:
- this reduces residual drift risk in reporting/export behavior where saved
  state and asynchronous generation could otherwise blur role, family, or scope
  boundaries
- it keeps the reporting service, frontend reporting routes, and tenant
  isolation docs aligned around the same scope-preservation rule

### Decision 151 — Readiness Evidence Portability Tightening

We agreed the testing, dataset, operational-readiness, and top-level
AI-readiness docs should say more clearly that validation evidence only proves
the scope it actually exercised, and must not be stretched into broader claims
without naming that boundary explicitly.

Approved direction:

- backend workspace-health checks do not by themselves prove full slice behavior
  or frontend readiness
- a narrow repeatable fixture run does not by itself prove broad local-bootstrap
  readiness
- a demo/showcase walkthrough does not by itself prove repeatable validation
  evidence
- local-environment evidence does not by itself prove staging or production
  readiness
- readiness claims must stay anchored to the exact slice, environment tier,
  dataset basis, and path coverage actually exercised

Reason:
- this reduces one of the last easy ways for AI to over-claim readiness from
  real but narrow evidence
- it keeps testing, dataset, readiness, and top-level build-gate language
  aligned around the same evidence-scope rule

### Decision 152 — Post-Closure Control-State Sync

We agreed the implementation control layer should stop talking as if Batch 6 or
the closure-batch checklists are still the default active workstream now that
all six closure batches are already treated as substantially complete.

Approved direction:

- `current-state.md` should describe the repo as being in post-closure residual
  tightening mode rather than active batch execution
- the default active control references should shift to current-state,
  accepted-residuals, current-gap-priority-review, AI build readiness, and
  continuity rather than the completed closure-batch checklist set
- the master tracker should keep closure plans and batch checklists as strong
  historical references without wording them as the current active pass list

Reason:
- this keeps restart and handoff behavior aligned with the repo's real
  post-closure state
- it reduces control-layer drift where old batch-language could otherwise make
  the documentation state look earlier than it really is

### Decision 153 — Frontend Stack and UI-Asset Wording Sync

We agreed the remaining top-level navigation and execution docs should stop
implying that frontend stack approval is still unresolved or that every screen
listed in the screen map automatically has a mandatory exact-match mockup
asset.

Approved direction:

- stop rules should block frontend work only when the approved stack is
  contradicted or unresolved choices are being invented for the target work
- context and overview docs should state that only screens without named assets
  remain provisional for pixel-accurate matching
- the system map should say that named assets are the preferred exact-match
  references, while non-asset-backed screens must follow the written UI
  contracts provisionally

Reason:
- this removes another small but important source of stale pre-approval wording
- it keeps stack approval, UI-asset coverage, and screen-map guidance aligned
  across the repo's top-level docs

### Decision 154 — Future Wave 1 Shared Module and Control Anchoring

We agreed the first execution pass inside Future Wave 1 should anchor
`School Run` and `Parcel / Courier / Logistics` in the shared
module/commercial and control layer before writing any add-on-specific workflow
contracts.

Approved direction:

- the module-commercial model should recognise both add-ons as approved
  optional module families
- superadmin commercial controls should say more clearly that commercial
  enablement does not replace RBAC or workflow-sensitive authority inside these
  add-ons
- tenant configuration should distinguish ordinary service toggles from
  add-on-specific configuration scope
- the control docs should mark Future Wave 1 as active and track the dedicated
  missing add-on contracts explicitly

Reason:
- this lets restart and handoff behavior preserve the approved add-on scope
  without pretending the detailed workflow contracts already exist
- it reduces drift where AI might either ignore the approved add-ons or
  prematurely collapse them into the base booking or passenger-trip models

### Decision 155 — School Run Add-On Documentation Baseline

We agreed the first add-on pack inside Future Wave 1 should document
`School Run` as a recurring-first transport workflow layered on the shared
booking and trip foundations rather than as a new role system or a lightly
modified normal booking flow.

Approved direction:

- `School Run` should use a dedicated workflow contract that keeps arrangement
  context separate from the canonical booking lifecycle
- authority modes should be explicit as guardian-led, tenant-led, or both,
  without inventing a new school-specific global role
- School Run pricing and billing should be recurring-first, support weekly and
  monthly cadence, and remain calendar-aware for partial periods
- realtime, notifications, reporting, and frontend route/gating docs should be
  tightened only enough to show School Run's cross-cutting boundaries without
  pretending the whole add-on is now fully exhausted

Reason:
- this preserves the approved product expansion while avoiding two common drift
  paths: collapsing School Run into ordinary booking, or inventing a separate
  school-platform product model that the repo has not approved
- it gives the repo a restart-safe baseline before the Parcel add-on pack
  begins

### Decision 156 — Parcel Add-On Documentation Baseline

We agreed the second add-on pack inside Future Wave 1 should document
`Parcel / Courier / Logistics` as a logistics-job workflow with separate proof,
tracking, and pricing truth rather than as passenger-booking or passenger-trip
behavior with renamed fields.

Approved direction:

- `Parcel / Courier / Logistics` should use a dedicated workflow contract that
  keeps logistics-job truth primary and booking-style intake secondary
- parcel proof-of-delivery and parcel tracking should remain separate from ride
  completion and passenger-tracking truth
- parcel pricing should combine named classes with measured dimensions or
  weight, plus zone or distance and service or handling direction
- realtime, notifications, reporting, and frontend route/gating docs should be
  tightened only enough to show the parcel add-on boundary without pretending
  deeper logistics depth is already fully documented

Reason:
- this preserves the approved expansion while avoiding the main drift path for
  the add-on: collapsing parcel delivery into passenger transport semantics
- it gives the repo a stable post-add-on baseline before the Future Wave 1
  review and readiness-refresh pass

### Decision 157 — Future Wave 1 Baseline Review and Residual Handoff

We agreed the first Future Wave 1 review pass should stop treating School Run
and Parcel as an active missing-contract wave once both add-on baseline packs
and the control refresh were finished.

Approved direction:

- Future Wave 1 should now be treated as substantially complete at the
  first-pass documentation baseline
- the checklist should remain as the historical baseline record for that wave,
  not as the default active pass list
- current-state and priority-review docs should describe the remaining work as
  residual add-on follow-through rather than missing-shape recovery
- School Run and Parcel docs should be reopened only when implementation or
  later refinement genuinely needs deeper schedule, proof, lifecycle, or
  reporting detail

Reason:
- this keeps the repo honest about what has actually been documented already
- it avoids both reopening the wave unnecessarily and overstating how deep the
  add-on detail currently goes

### Decision 158 — Documentation Baseline Lock and Restart Handoff Sync

We agreed the next docs-only step should not reopen a new product wave, but
should instead lock the repository's restart path to the true
post-Future-Wave-1 state.

Approved direction:

- `.continue-here.md` and `.planning/HANDOFF.json` should match the current
  control docs rather than the earlier enhancement-discovery pause
- no mandatory documentation wave should remain open by default
- future sessions should treat School Run and Parcel as first-pass documented
  baselines, not as active missing-shape work
- coding should remain blocked until a working session explicitly switches out
  of documentation-only mode

Reason:
- this prevents future AI sessions from resuming from stale discovery-era
  instructions
- it gives the repo a stable, low-drift checkpoint between documentation
  readiness and any later coding phase

### Decision 159 — Full Documentation Audit and Control-Layer Alignment

We agreed a full-document review should judge whether any meaningful
control-layer inconsistency still remained before moving to the next step.

Approved direction:

- the master tracker should stop speaking as if the repo is under a blanket
  no-coding / no-scaffolding repository rule
- control docs should distinguish between:
  - docs-only session mode by user choice
  - repo-level readiness for controlled implementation
- the coverage checklist should stop calling already-documented domains
  "critical missing" when they are now first-pass documented but still partial
- readiness wording should stay honest that GreenRide is ready for controlled
  AI-assisted work without pretending every partial area is fully exhausted

Reason:
- this removes a real but subtle source of restart and interpretation drift
- it keeps the repo honest about the difference between missing shape,
  accepted residual detail, and user-chosen docs-only workflow

### Decision 160 — Partial-Doc Watchlist and Reopen-Trigger Model

We agreed the remaining risk was no longer mainly missing core contracts, but
that partial docs could drift into the background and be forgotten once coding
starts.

Approved direction:

- create a dedicated `partial-doc-watchlist.md` in the implementation control
  layer
- group partial gaps by slice so the list is usable before coding, not just as
  a giant archive
- for each partial area, record:
  - the main point to remember
  - the handling mode
  - the trigger that forces reopening docs
- treat handling modes as:
  - `reopen-first`
  - `safe-with-placeholder`
  - `accepted-residual`
- keep the gap register as the full inventory, but use the watchlist as the
  practical anti-drift checklist before implementation

Reason:
- this gives future implementation sessions a simple way to keep partial docs
  visible without rereading the entire gap register every time
- it reduces the chance that later AI work quietly invents details in partially
  documented areas just because the docs already "exist"

### Decision 161 — Data Protection and Encryption Baseline

We agreed that encryption and data protection should be tightened before deeper
coding continues, but only at a baseline-policy level rather than as a full
infrastructure or compliance architecture.

Approved direction:

- create a dedicated security contract for:
  - transport protection
  - at-rest protection minimums
  - password and token handling
  - secret exposure rules
  - sensitive export, proof, and media protection baseline
- keep the document narrow and implementation-safe
- do not invent cloud-vendor, KMS, HSM, or full production key-rotation design
- add reopen triggers so later slices stop before choosing stronger encryption
  semantics that the current baseline does not yet define

Reason:
- encryption was important enough to deserve a dedicated contract rather than a
  few lines inside the broader security model
- this closes a real trust-boundary gap without forcing premature
  infrastructure design

---

## Working Reminder

If future work starts to:
- invent routes
- invent states
- invent role behavior
- invent security rules
- invent integration details

stop and resolve the documentation gap first.
