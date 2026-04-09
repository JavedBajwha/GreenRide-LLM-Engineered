# Required Documentation Coverage

## Purpose

This file is the explicit coverage checklist for GreenRide documentation completion.

Unlike the master tracker, this file answers a simpler question:

**What must be documented before GreenRide is considered safe for AI-assisted implementation?**

Use this file to make missing areas obvious.

---

## Coverage Status Legend

| Status | Meaning |
| --- | --- |
| complete | Covered well enough for current implementation-safe use |
| partial | Exists, but still needs strengthening or linking |
| missing | Not adequately documented yet |

---

## 1. Platform Foundations

| Topic | Status | Notes |
| --- | --- | --- |
| Auth | partial | Canonical auth contract now includes timing-policy bands, concurrent-session rules, replacement-token invalidation, and stronger surface linkage, but still needs exact implementation constants and later expansion detail |
| Login | partial | Baseline documented in auth/session contract |
| Logout | partial | Baseline documented in auth/session contract |
| Password reset / recovery | partial | Baseline documented in auth/session contract |
| Invite flow | partial | Baseline documented in auth/session contract |
| Session lifecycle | partial | Access/refresh direction now exists, but final implementation constants still need approval |
| MFA for privileged roles | partial | Required roles and enforcement points are now documented in baseline form |
| RBAC | partial | Canonical RBAC contract now links roles to surfaces and route families, but deeper endpoint and in-surface detail still remains |
| Multi-tenancy | partial | Canonical enforcement contract now exists, but later schema/query implementation alignment still remains |
| Security model | partial | Canonical cross-cutting security contract now exists, but some implementation-policy detail still remains |
| Data protection and encryption baseline | partial | Canonical transport, at-rest, password, token, and secret-handling baseline now exists, but field-level encryption, key-management, and stronger export/media/production detail still need later documentation |
| Security incident and emergency controls | partial | Canonical incident/emergency contract now includes communication, handoff, and post-incident expectations, but deeper operational policy still remains |
| Superadmin vs platform-ops responsibility split | partial | Split is now documented, but still needs wider linking across role/surface docs |
| Abuse protection / rate limiting | partial | Canonical protection classes and response model now exist, but thresholds and tooling remain later decisions |
| Error handling / failure strategy | partial | Canonical failure-strategy contract now exists, but domain-specific failure details still remain |
| Application logging | partial | Canonical runtime-event and logging-boundary contract now exists, but tooling/detail refinement still remains |
| Audit logging | partial | Canonical accountability and audit-event contract now exists, but retention/storage/visibility detail still remains |
| Observability | partial | Canonical health, metric-family, trace, and alerting baseline now exists, but thresholds/tooling still remain |

---

## 2. Role-Based App Structure

| Topic | Status | Notes |
| --- | --- | --- |
| Role-to-app-surface map | partial | Draft exists |
| Frontend route inventory | partial | Draft exists |
| Auth redirects by role | partial | Draft exists |
| Protected route boundaries | partial | Draft exists |
| UI shell and navigation model | partial | Draft exists |
| In-surface RBAC expectations | partial | Present, but still needs review against role docs |
| Module-aware UI / route gating | partial | Canonical shared gating pattern and first route-gating matrix now exist, but deeper page-level matrices and final visual locked-state detail still need tightening |
| Surface state handling and degraded UI rules | partial | Canonical shared state-handling baseline now exists, but per-page detail and final visual/state-copy follow-through still need tightening |

---

## 3. Customer and Booking Domain

| Topic | Status | Notes |
| --- | --- | --- |
| Search and quote | partial | Strong first slice docs exist |
| Quote request / response | partial | Covered by canonical slice docs |
| Quote expiry | partial | Canonical quote-expiry baseline now exists, but exact validity windows, warning UX, and requote/revalidation detail still need later documentation |
| Route selection | partial | Canonical route-selection direction now exists, but pricing precedence still needs later tightening |
| Route eligibility / fallback | partial | Canonical fallback behavior now exists, but later pricing/dispatch implications still need tightening |
| Custom routes and saved locations | partial | Canonical saved-location versus custom-route baseline now exists, but detailed admin UX, scope matrices, and deeper pricing/dispatch follow-through still need later documentation |
| Vehicle eligibility / vehicle selection rules | partial | Canonical quote-stage category eligibility contract now exists, but final operational availability still belongs to later domains |
| Pricing model selection | partial | Canonical pricing-model selection baseline now exists, but detailed path precedence still needs later tightening |
| Pricing rule precedence | partial | Canonical pricing flow and fallback order now exist, but full zone/route/override precedence still needs later tightening |
| Pricing overrides / manual fare override | partial | Canonical guardrail now exists, but final permission and audit contract still needs later documentation |
| Flat rate pricing | partial | Fixed-route model exists conceptually, but explicit flat-rate contract is still weak |
| Hourly pricing | partial | Mentioned in pricing engine, but booking and dispatch implications still need explicit contract |
| Zone / area pricing | partial | Canonical zone/area pricing baseline now exists, but exact zone-combination rules, editor/detail UX, and deeper precedence matrices still need later documentation |
| Multi-currency pricing and display | partial | Canonical single-currency tenant baseline now exists, and casual FX conversion is explicitly disallowed, but any true multi-currency extension still needs a later dedicated contract |
| Price structure configuration | partial | Canonical pricing-configuration baseline now exists, but exact admin UX, schema detail, permissions, and audit/change workflow still need later documentation |
| Fare adjustments / repricing | partial | Canonical repricing guardrail now exists, but final trigger and policy detail still needs later documentation |
| Vehicle selection | partial | Present in customer booking flow docs |
| Booking forms | partial | Canonical booking-form structure and configuration guardrails now exist, but detailed field matrix still needs later tightening |
| Agreements and form builder | partial | Canonical agreement/consent and controlled form-configuration baseline now exists, but later legal/detail matrices still need documentation |
| Booking creation | partial | Canonical booking-creation and confirmation baseline now exists, but path-specific detail still needs later tightening |
| Guest booking flow | partial | Mentioned, needs clearer contract |
| Customer account booking flow | partial | Mentioned, needs clearer contract |
| Booking amendments | partial | Canonical amendment baseline now exists, but permission, repricing, and late-ops detail still need later tightening |
| Booking cancellations | partial | Canonical cancellation window now exists, but fee/refund, permission, and late-case policy detail still need later tightening |
| Booking tracking | partial | Canonical customer tracking/visibility baseline now exists, but detailed realtime and field-level visibility still needs later tightening |
| Customer route preview and trip visibility | partial | Canonical status-first-before-assignment and live-tracking-from-assigned baseline now exists, but ETA/map-source detail still needs later documentation |
| Booking lifecycle state machine | partial | Canonical state machine now exists, but amendment/cancellation recovery detail still needs later linked contracts |

---

## 4. Driver Domain

| Topic | Status | Notes |
| --- | --- | --- |
| Driver app surface | partial | Documented conceptually |
| Driver login/access | partial | Mentioned, not yet fully contracted |
| Drivers and driving operations | partial | Driver app exists conceptually, but full operational driving rules still need stronger contracts |
| Driver allocation / candidate selection | partial | Canonical allocation/location baseline now exists, but ranking, stale-threshold, and dispatch follow-through still need later tightening |
| Job offer / accept / reject | partial | Present conceptually |
| Driver availability | partial | Present conceptually |
| Active trip workflow | partial | Present conceptually |
| Driver live location rules | partial | Canonical fresh-vs-stale visibility and eligibility baseline now exists, but exact freshness thresholds and transport detail still need later tightening |
| Driver route guidance / navigation responsibility | partial | Canonical handoff-first navigation baseline now exists, but provider-specific and launch-detail behavior still needs later tightening |
| Driver stale location / heartbeat handling | partial | Canonical stale-location operational meaning now exists, but exact heartbeat thresholds and fallback detail still need later tightening |
| Driver history / earnings | partial | Present conceptually |
| Driver profile / documents | partial | Present conceptually |
| Offline / weak connectivity behavior | partial | Canonical degraded-connectivity baseline now exists, but offline-sync and delivery-confirmation detail still need later tightening |
| Driver lifecycle state machine | partial | Canonical driver lifecycle now exists, but later allocation, connectivity, and edge-case transitions still need tightening |
| Vehicle management and attributes | partial | Canonical vehicle/fleet baseline now exists, but capability matrix, compliance, and maintenance detail still need later tightening |

---

## 5. Dispatch Domain

| Topic | Status | Notes |
| --- | --- | --- |
| Dispatch model | partial | Canonical dispatch-decision baseline now exists, but deeper ranking, exception, and queue detail still needs later tightening |
| Availability model | partial | Present conceptually, but global availability rules still need their own contract across vehicles, drivers, and booking windows |
| Dispatch map behavior | partial | Canonical dispatch-map baseline now exists, but provider detail, ETA/source detail, and richer layer behavior still need later tightening |
| Auto-dispatch | partial | Canonical dispatch-decision baseline now exists, but ranking, retry, and degraded-mode detail still needs later tightening |
| Manual dispatch | partial | Canonical dispatch-decision baseline now exists, but exact authority, queue, and override detail still needs later tightening |
| Reassignment | partial | Needs tighter implementation contract |
| Dispatch exceptions | partial | Needs tighter implementation contract |
| Incident handling | partial | Present conceptually |
| Dispatch queue ownership | partial | Needs stronger definition |
| Dispatch override rules | partial | Mentioned, still needs contract |
| Dispatch auditability | partial | Mentioned, still needs stronger contract |
| Driver ranking / dispatch candidate scoring | partial | Canonical gate-and-rank baseline now exists, but exact ordering criteria and confidence thresholds still need later tightening |
| Dispatch fallback when maps or live location fail | partial | Canonical degraded-mode fallback baseline now exists, but detailed thresholds and operational policy still need later tightening |
| Dispatch state / workflow consistency | partial | Still needs canonicalisation |
| Zone, geofence, and custom location management | partial | Canonical operational location-rule baseline now exists, but pricing usage, geocoding/address detail, and richer area-policy matrices still need later tightening |

---

## 6. Payments, Notifications, and Realtime

| Topic | Status | Notes |
| --- | --- | --- |
| Module taxonomy and package model | partial | Canonical module-commercial model now includes module-family boundaries, onboarding sequencing, quantity-based guardrails, and stronger gating links, but still needs final catalogue and enforcement tightening |
| Superadmin package and module controls | partial | Canonical superadmin commercial controls now include request, billing-boundary, and commercial-edge-case baselines, but still need deeper workflow and automation follow-through |
| Fixed-price vs quoted add-ons | partial | Canonical commercial direction now exists, but public-price vs quoted boundaries still need review |
| Reporting and analytics module | partial | Direction is much clearer now, but final report contracts, metric definitions, and gating rules are still not implementation-safe |
| Core reporting baseline | partial | Core KPI/report list is now agreed, but final canonical definitions are still needed |
| Advanced reporting module | partial | Main advanced report families are now agreed, but final canonical definitions and boundaries are still needed |
| Tenant reporting | partial | Tenant report families are now outlined, but final role/report matrix and data definitions are still needed |
| Platform reporting | partial | Platform report families are now outlined, but final visibility and metric definitions are still needed |
| Reporting role/view/download matrix | partial | First role-access matrix is agreed, but policy-elevation and personal-record export rules still need final documentation |
| Dashboard metrics and widget data ownership | partial | Canonical widget/report/export and source-ownership baseline now exists, and first widget catalogs now exist, but deeper widget-by-widget mapping and data-definition detail still need later documentation |
| Reporting module gating and package visibility | partial | High-level module-gating direction is now agreed, but final route-by-route and UI-state rules still need documentation |
| Export / download rules | partial | Canonical export-governance baseline now exists, but full implementation-safe permissions, scheduling edges, and failure cases still need documentation |
| Reporting filter model | partial | First-pass filters for booking, driver, dispatch, customer, and platform reporting are agreed, but full edge-case coverage still needs documentation |
| Payments | partial | Canonical payment-path baseline now exists, but provider choice, failure-path depth, and payment-method detail still need later tightening |
| Multiple payment methods | partial | Canonical baseline now approves `card`, `cash`, and `account_billing`, but later restriction matrices still need documentation |
| Payment methods by zone or tenant | partial | Tenant-level method configuration is now explicit, but later zone/booking/customer restriction matrices still need documentation |
| Invoicing | partial | Canonical invoice/account-billing baseline now exists, but detailed issuance, settlement, and account-policy rules still need later tightening |
| Agreements / payment consent capture | partial | Canonical agreement and payment-consent baseline now exists, but exact legal text governance, storage detail, and path-specific consent matrices still need later documentation |
| Payment failure handling | partial | Baseline failure direction now exists, but provider-specific outcomes, retries, and recovery handling still need later tightening |
| Notifications | partial | Canonical event-ownership and delivery baseline now exists, but channel matrices and detailed event catalogs still need later tightening |
| Custom notifications | partial | Canonical controlled-customization baseline now exists, but detailed template scopes, approval workflow, and advanced notification-pack behavior still need later documentation |
| Mailchimp or marketing integrations | partial | Canonical marketing/CRM integration baseline now exists, but exact consent model, field-level sharing matrix, and connector-specific behavior still need later documentation |
| Third-party website integration | partial | External website hosting baseline now exists for the approved booking embed, but delivery mechanics and integration detail still need later tightening |
| WordPress plugin / embeddable widget strategy | partial | Canonical WordPress/WPML compatibility stance now exists, but plugin packaging, localization detail, and delivery mechanics still need later tightening |
| Notification events | partial | Canonical minimum event baseline now exists, but later per-event channel matrices, audience detail, and richer catalogs still need later documentation |
| Channel rules | partial | Canonical first event-to-channel baseline now exists, but full per-event audience matrices, tenant overrides, and optional-channel depth still need later documentation |
| Maps and geolocation | partial | Canonical supporting-layer boundary now exists, but provider choice, exact responsibilities, and richer policy detail still need later tightening |
| ETA / distance source of truth | partial | Canonical support-role baseline now exists, but exact data-source precedence and provider detail still need later tightening |
| Geocoding and address normalisation | partial | Canonical address-support baseline now exists, but final resolution mechanics, storage detail, and validation flow still need later tightening |
| Route calculation vs fixed-route lookup | partial | Canonical business-rule-vs-provider boundary now exists, but exact decision detail and pricing follow-through still need later tightening |
| Realtime tracking | partial | Canonical realtime source-of-truth and fallback baseline now exists, but transport detail and richer live-policy matrices still need later tightening |
| Customer trip visibility | partial | Canonical customer visibility baseline already exists and is now linked more clearly to realtime boundaries, but richer field-level/live-detail matrices still need later tightening |
| Realtime events | partial | Canonical event-family baseline now exists, but exact event names, schemas, and subscriptions still need later documentation |
| Realtime fallback behavior | partial | Canonical degraded/fallback baseline now exists, but final transport-specific behavior and UI-policy detail still need later tightening |
| Platform update / patch / rollback model | partial | Canonical release/maintenance/rollback contract now includes release-record, maintenance-lifecycle, rollback-failure, and communication baselines, but still needs deeper rollout-policy and execution-detail tightening |

---

## 7. Frontend Implementation Contracts

| Topic | Status | Notes |
| --- | --- | --- |
| Frontend stack approval | complete | Approved |
| Frontend architecture | partial | Good foundation, needs linking to new control docs |
| UI screen map | partial | Good guide, and named baseline mockup assets are now available, but broader screen-to-asset mapping and exact-match coverage still need tightening |
| Customer booking UI | partial | Exists, but still high-level |
| Component architecture | partial | Exists, but still high-level |
| Frontend scaffold contract | partial | Canonical single-app, multi-surface scaffold baseline now exists, but later folder/package detail and deeper ownership mechanics still need tightening |
| Shared app shell ownership | partial | Canonical shared-shell versus surface-shell ownership baseline now exists, but later shell-detail and route-level follow-through still need tightening |
| Platform Ops Console surface | partial | Separate Platform Ops surface now includes clearer page-family behavior and authority baseline, but deeper widget/detail follow-through still remains |
| Per-surface UI contracts | partial | First-pass UI contracts now exist for platform control, platform ops, tenant operations, customer, and driver, and deeper route/state/dashboard refinement has started, but later per-page detail still remains |
| Dashboard widgets | partial | Canonical surface-specific widget baseline and first widget catalogs now exist, but metadata depth, optional-widget expansion, and customization follow-through still need tightening |
| Dashboard layout and customization model | partial | Canonical zone-based layout, guarded-customization baseline, and first zone maps now exist, but widget permissions and interaction/detail follow-through still need tightening |
| Theme color picker / tenant branding controls | partial | Canonical theme/branding contract now includes first token-role, asset-fallback, and validation baselines, but implementation links and finer design-system depth still need tightening |
| AI-assisted branding from logo colors | partial | Canonical AI-assisted branding contract now includes stronger validation and fallback linkage, but workflow/detail tightening still remains |
| Responsive layout contract | partial | Canonical responsive direction now includes the first breakpoint set and stronger surface rules, but deeper screen-family detail still needs tightening |
| Integration widgets / embedded booking UI | partial | Canonical narrow embed baseline now exists, but delivery detail, auth/security edge cases, and compatibility follow-through still need tightening |
| WordPress / WPML compatibility stance | partial | Canonical compatibility stance now exists, but delivery mechanics, localization detail, and plugin packaging still need later tightening |
| Provisional vs asset-locked rules | partial | Mentioned, but should remain explicit |

---

## 8. Testing, Data, and Operational Readiness

| Topic | Status | Notes |
| --- | --- | --- |
| Testing strategy | partial | Canonical testing strategy now includes slice criticality and negative-path baselines, but tooling and deeper domain-level matrices still need refinement |
| Validation expectations by slice | partial | Slice-completion validation rule is now documented, but still needs expansion by domain |
| Seed / fixture / demo data | partial | Canonical seed/demo-data contract now includes named baseline datasets and stronger repeatability rules, but implementation detail still needs tightening |
| Environment contract | partial | Environment tier boundaries and expansion rules now exist, but frontend/runtime and staging/production detail still need later documentation |
| Operational readiness checks | partial | Canonical readiness baseline now includes a first per-slice readiness matrix, but deeper environment- and slice-specific detail still needs tightening |
| Final AI readiness gate | partial | Readiness gate is now strong enough for controlled AI-assisted work, but it still depends on residual-honesty, fresh validation, and later environment/readiness tightening |

---

## Critical Areas To Keep Visible From Review Discussions

These are important reminders from review discussions and must not be forgotten,
even where a first-pass contract now exists:

- login
- logout
- password reset / recovery
- invite flow
- MFA
- booking tracking
- booking amendments
- booking cancellations
- quote expiry
- route selection
- route fallback rules
- vehicle eligibility
- pricing model selection
- pricing rule precedence
- pricing overrides / manual fare override
- flat rate pricing
- hourly pricing
- zone / area pricing
- multi-currency pricing and display
- price structure configuration
- fare adjustments / repricing
- booking forms
- agreements and form builder
- booking lifecycle state machine
- customer route preview and trip visibility
- drivers and driving operations
- driver allocation
- driver live location rules
- driver route guidance / navigation responsibility
- driver stale location / heartbeat handling
- driver lifecycle state machine
- availability model
- dispatch decision contract
- dispatch map behavior
- driver ranking / dispatch candidate scoring
- dispatch fallback when maps or live location fail
- multiple payment methods
- payment methods by zone or tenant
- agreements / payment consent capture
- custom notifications
- Mailchimp or marketing integrations
- third-party website integration
- WordPress plugin / embeddable widget strategy
- maps and geolocation
- ETA / distance source of truth
- geocoding and address normalisation
- route calculation vs fixed-route lookup
- customer trip visibility
- dashboard widgets
- theme color picker / tenant branding controls
- AI-assisted branding from logo colors
- responsive layout contract
- integration widgets / embedded booking UI
- WordPress / WPML compatibility stance
- application logging
- audit logging
- observability
- abuse protection / rate limiting
- security incident and emergency controls
- module-aware UI / route gating
- realtime fallback behavior
- platform update / patch / rollback model
- module taxonomy and package model
- superadmin package and module controls
- fixed-price vs quoted add-ons
- reporting and analytics module
- core reporting baseline
- advanced reporting module
- tenant reporting
- platform reporting
- dashboard metrics and widget data ownership
- reporting module gating and package visibility
- export / download rules
- testing strategy

---

## Rule

GreenRide documentation is not ready for AI-assisted implementation until all critical missing areas above are either:

1. fully documented, or
2. explicitly blocked with clear stop rules
