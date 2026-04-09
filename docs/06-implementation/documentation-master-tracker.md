# Documentation Master Tracker

## Purpose

This file is the control centre for GreenRide documentation completion.

Use it to track:
- what documentation already exists
- which documents are implementation-safe
- which documents need updates
- which documents are missing entirely
- which phase each documentation task belongs to

Use `required-documentation-coverage.md` alongside this tracker when you need a direct checklist of missing subject areas.

This file exists to prevent documentation drift during the documentation-completion
and baseline-maintenance phases.

---

## Current Working Rule

At this stage:

- documentation first when clarifying, tightening, or extending contracts
- no implicit coding or scaffolding
- no undocumented feature invention
- controlled implementation is allowed only when the target area is marked
  ready in the current readiness docs and the working session explicitly
  switches out of docs-only mode

The goal is to make GreenRide safe for controlled AI-assisted build work.

---

## Status Legend

| Status | Meaning |
| --- | --- |
| strong | Document exists and is mostly reliable |
| partial | Document exists but still needs strengthening or residual-honesty; safe implementation, if any, still depends on the readiness gate and stop rules |
| missing | No adequate document currently exists |
| blocked | Work cannot be finalised until another dependency is completed |

---

## Master Tracker

| Domain | Existing Docs | Status | Action | Target File | Priority | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| Documentation control layer | `docs/06-implementation/` control docs | strong | maintain | existing control docs | critical | 1 |
| Partial document watchlist | `docs/06-implementation/partial-doc-watchlist.md` | strong | use as the anti-drift pre-slice checklist so partial contracts stay visible during implementation | `docs/06-implementation/partial-doc-watchlist.md` | critical | control |
| Phase 2 tightening checklist | `docs/06-implementation/phase-2-platform-foundations-tightening-checklist.md`, completion review | strong | use as focused pass list and completion-review reference for platform-foundation gaps | `docs/06-implementation/phase-2-platform-foundations-tightening-checklist.md`, `docs/06-implementation/phase-2-platform-foundations-completion-review.md` | high | 2 |
| Phase 4 customer-booking checklist | `docs/06-implementation/phase-4-customer-booking-domain-checklist.md` | strong | use as focused pass list for the next booking-domain documentation wave | `docs/06-implementation/phase-4-customer-booking-domain-checklist.md` | high | 4 |
| Phase 4 customer-booking completion review | `docs/06-implementation/phase-4-customer-booking-completion-review.md` | strong | use as the current review baseline before moving into driver-domain work | `docs/06-implementation/phase-4-customer-booking-completion-review.md` | high | 4 |
| Phase 5 driver-domain checklist | `docs/06-implementation/phase-5-driver-domain-checklist.md` | strong | use as focused pass list for the next driver-domain documentation wave | `docs/06-implementation/phase-5-driver-domain-checklist.md` | high | 5 |
| Phase 5 driver-domain completion review | `docs/06-implementation/phase-5-driver-domain-completion-review.md` | strong | use as the current review baseline before moving into dispatch-domain work | `docs/06-implementation/phase-5-driver-domain-completion-review.md` | high | 5 |
| Phase 6 dispatch-domain checklist | `docs/06-implementation/phase-6-dispatch-domain-checklist.md` | strong | use as focused pass list for the next dispatch-domain documentation wave | `docs/06-implementation/phase-6-dispatch-domain-checklist.md` | high | 6 |
| Phase 6 dispatch-domain completion review | `docs/06-implementation/phase-6-dispatch-domain-completion-review.md` | strong | use as the current review baseline before moving into payments/notifications/realtime work | `docs/06-implementation/phase-6-dispatch-domain-completion-review.md` | high | 6 |
| Phase 7 payments/notifications/realtime checklist | `docs/06-implementation/phase-7-payments-notifications-realtime-checklist.md` | strong | use as focused pass list for the next service-domain documentation wave | `docs/06-implementation/phase-7-payments-notifications-realtime-checklist.md` | high | 7 |
| Phase 7 payments/notifications/realtime completion review | `docs/06-implementation/phase-7-payments-notifications-realtime-completion-review.md` | strong | use as the current review baseline before moving into the remaining frontend implementation-contract work | `docs/06-implementation/phase-7-payments-notifications-realtime-completion-review.md` | high | 7 |
| Phase 8 frontend-implementation-contracts checklist | `docs/06-implementation/phase-8-frontend-implementation-contracts-checklist.md` | strong | use as focused pass list for the remaining frontend implementation-contract documentation wave | `docs/06-implementation/phase-8-frontend-implementation-contracts-checklist.md` | high | 8 |
| Accepted residuals and cross-phase review | `docs/06-implementation/accepted-residuals-and-cross-phase-review.md` | strong | use as the residual-risk reference after the main documentation waves are structurally complete | `docs/06-implementation/accepted-residuals-and-cross-phase-review.md` | high | control |
| Final partial closure plan | `docs/06-implementation/final-partial-closure-plan.md` | strong | retain as the historical sequencing reference for the completed closure program | `docs/06-implementation/final-partial-closure-plan.md` | high | control |
| Batch 1 trust and control detail checklist | `docs/06-implementation/batch-1-trust-and-control-detail-checklist.md` | strong | retain as the historical checklist and review reference for the completed first closure batch | `docs/06-implementation/batch-1-trust-and-control-detail-checklist.md` | high | control |
| Batch 2 booking and pricing commitment detail checklist | `docs/06-implementation/batch-2-booking-and-pricing-commitment-detail-checklist.md` | strong | retain as the historical checklist and review reference for the completed second closure batch | `docs/06-implementation/batch-2-booking-and-pricing-commitment-detail-checklist.md` | high | control |
| Batch 3 driver, dispatch, and live operations detail checklist | `docs/06-implementation/batch-3-driver-dispatch-and-live-operations-detail-checklist.md` | strong | retain as the historical checklist and review reference for the completed third closure batch | `docs/06-implementation/batch-3-driver-dispatch-and-live-operations-detail-checklist.md` | high | control |
| Batch 4 payments, notifications, reporting, and service connectors checklist | `docs/06-implementation/batch-4-payments-notifications-reporting-and-service-connectors-checklist.md` | strong | retain as the historical checklist and review reference for the completed fourth closure batch | `docs/06-implementation/batch-4-payments-notifications-reporting-and-service-connectors-checklist.md` | high | control |
| Batch 5 frontend page-family and UX detail checklist | `docs/06-implementation/batch-5-frontend-page-family-and-ux-detail-checklist.md` | strong | retain as the historical checklist and review reference for the completed fifth closure batch | `docs/06-implementation/batch-5-frontend-page-family-and-ux-detail-checklist.md` | high | control |
| Batch 6 final validation and readiness detail checklist | `docs/06-implementation/batch-6-final-validation-and-readiness-detail-checklist.md` | strong | retain as the historical checklist and review reference for the completed sixth closure batch | `docs/06-implementation/batch-6-final-validation-and-readiness-detail-checklist.md` | high | control |
| Future Wave 1 School Run and Parcel add-ons checklist | `docs/06-implementation/future-wave-1-school-run-and-parcel-addons-checklist.md` | strong | retain as the baseline record for the completed first post-closure add-on documentation wave; later add-on detail now belongs to accepted residual follow-through | `docs/06-implementation/future-wave-1-school-run-and-parcel-addons-checklist.md` | high | future |
| School Run add-on workflow and authority pack | partial | dedicated first-pass contracts now exist for recurring school transport workflow, authority/configuration, and pricing/billing; keep tightening later schedule, reporting, and notification detail | `docs/01-product/school-run-workflow.md`, `docs/03-platform/school-run-authority-and-configuration.md`, `docs/01-product/school-run-pricing-and-billing.md` | high | future |
| Parcel / Courier / Logistics add-on workflow and proof pack | partial | dedicated first-pass contracts now exist for parcel logistics workflow, proof/tracking, and pricing/size; keep tightening later lifecycle depth, reporting, and notification detail | `docs/01-product/parcel-logistics-workflow.md`, `docs/03-services/parcel-proof-and-tracking-contract.md`, `docs/01-product/parcel-pricing-and-size-model.md` | high | future |
| Product overview | `docs/01-product/feature-map.md`, `context.md`, overview docs | strong | maintain and relink where needed | existing overview and product docs | high | 1 |
| Role model | `docs/03-platform/rbac.md`, Prisma `UserRole` enum | partial | review remaining endpoint-detail and schema-alignment edges | `docs/03-platform/rbac.md` | critical | 2 |
| Auth and session lifecycle | `docs/03-platform/auth-and-session.md`, partial references in security/RBAC docs | partial | review later exact implementation constants, identity-provider expansion, and deeper activation/self-registration follow-through | `docs/03-platform/auth-and-session.md` | critical | 2 |
| Multi-tenancy | `docs/03-platform/multi-tenancy.md`, `data-model.md` | partial | review remaining schema/query alignment edges | `docs/03-platform/multi-tenancy.md` | critical | 2 |
| Security model | `docs/03-platform/security-model.md` | partial | review remaining implementation-policy edges | `docs/03-platform/security-model.md` | critical | 2 |
| Data protection and encryption baseline | `docs/03-platform/data-protection-and-encryption-baseline.md` | partial | review later field-level encryption, key-management ownership, export/media retention detail, and stronger production secret-handling semantics | `docs/03-platform/data-protection-and-encryption-baseline.md` | critical | 2 |
| Security incident and emergency access controls | `docs/03-platform/security-incident-and-emergency-access-rules.md`, planning discussion notes | partial | review later operational-policy detail only | `docs/03-platform/security-incident-and-emergency-access-rules.md` | critical | 2 |
| Audit logging | `docs/03-services/audit-logging.md` | partial | refine retention, storage, and fine-grained visibility detail later | `docs/03-services/audit-logging.md` | critical | 2 |
| Application logging and observability | `docs/03-platform/application-logging.md`, `docs/03-platform/observability.md` | partial | refine tooling, thresholds, and deeper implementation detail later | `docs/03-platform/application-logging.md` and `docs/03-platform/observability.md` | critical | 2 |
| Abuse protection and rate limiting | `docs/03-platform/abuse-protection-and-rate-limiting.md` | partial | refine thresholds, tooling, and tuning policy later | `docs/03-platform/abuse-protection-and-rate-limiting.md` | high | 2 |
| Error handling and failure strategy | `docs/03-platform/error-handling-and-failure-strategy.md` | partial | extend through later domain-specific failure contracts | `docs/03-platform/error-handling-and-failure-strategy.md` | high | 2 |
| App surfaces by role | customer/driver/admin docs exist | partial | review and refine canonical role-to-app-surface map | `docs/05-frontend/role-app-surface-map.md` | critical | 3 |
| Frontend route inventory | partial via screen docs | partial | review and refine canonical route inventory | `docs/05-frontend/frontend-route-inventory.md` | critical | 3 |
| Login redirects and protected areas | newly documented at control level | partial | review and refine | `docs/05-frontend/auth-redirect-and-protected-routes.md` | high | 3 |
| UI shell and navigation model | fragmented across frontend docs | partial | create and refine canonical shell/navigation model | `docs/05-frontend/ui-shell-and-navigation-model.md` | high | 3 |
| Customer booking domain | booking docs, customer docs, quote slice docs | partial | tighten and connect | existing booking and customer docs plus new canonical contracts where needed | critical | 4 |
| Booking lifecycle state machine | `docs/01-product/booking-lifecycle-state-machine.md`, booking/customer flow docs | partial | review and tighten later amendment/exception recovery detail | `docs/01-product/booking-lifecycle-state-machine.md` | critical | 4 |
| Quote expiry and quote-to-booking rules | `docs/01-product/quote-expiry-and-quote-to-booking-rules.md`, pricing/booking confirmation docs | partial | review later exact validity constants, final warning UX, and deeper recovery/revalidation detail | `docs/01-product/quote-expiry-and-quote-to-booking-rules.md` | high | 4 |
| Zone and area pricing | `docs/01-product/zone-and-area-pricing.md`, pricing/location docs | partial | review later deeper overlap resolution, precedence matrices, and final tenant-editor detail | `docs/01-product/zone-and-area-pricing.md` | high | 4 |
| Price structure configuration | `docs/01-product/price-structure-configuration.md`, pricing/tenant-config docs | partial | review later editor UX, schema detail, finer permissions, and change-approval follow-through | `docs/01-product/price-structure-configuration.md` | high | 4 |
| Pricing and fare behavior | `docs/01-product/pricing-engine.md`, pricing/quote approvals | partial | review later detailed precedence, zone, override, and currency edges | `docs/01-product/pricing-engine.md` plus targeted canonical additions | critical | 4 |
| Route selection and vehicle eligibility | `docs/01-product/route-selection-and-vehicle-eligibility.md`, pricing/quote references | partial | review later pricing-precedence and operational-availability edges | `docs/01-product/route-selection-and-vehicle-eligibility.md` | high | 4 |
| Custom routes and saved locations | `docs/01-product/custom-routes-and-saved-locations.md`, route/location/customer docs | partial | review later ownership matrices, admin UX, and pricing/dispatch follow-through | `docs/01-product/custom-routes-and-saved-locations.md` | high | 4 |
| Booking forms and agreements | `docs/01-product/booking-forms-and-agreements.md`, booking/customer UI references | partial | review later detailed agreement matrix and ops-entry detail | `docs/01-product/booking-forms-and-agreements.md` | high | 4 |
| Agreement and payment-consent capture | `docs/01-product/booking-forms-and-agreements.md`, `docs/03-services/payments-and-invoicing.md`, booking confirmation doc | partial | review later legal-text governance, path-specific consent matrices, and storage/audit detail | `docs/01-product/booking-forms-and-agreements.md` plus linked payment docs | high | 4-7 |
| Booking amendments and cancellations | `docs/01-product/booking-amendments-and-cancellations.md`, booking/customer flow docs | partial | review later role permissions, fee/refund policy, repricing detail, and post-assignment operational handling | `docs/01-product/booking-amendments-and-cancellations.md` | high | 4 |
| Customer booking tracking and visibility | `docs/01-product/customer-tracking-and-visibility.md`, customer/realtime docs | partial | review later field-level visibility, ETA-source, and transport/event detail | `docs/01-product/customer-tracking-and-visibility.md` | high | 4 |
| Driver domain | `driver-app*.md` | partial | tighten and connect | existing driver docs plus new canonical contracts where needed | high | 5 |
| Driver lifecycle state machine | `docs/02-applications/driver-lifecycle-state-machine.md`, driver/dispatch docs | partial | review later unassignment/removal, connectivity, and completion-edge detail | `docs/02-applications/driver-lifecycle-state-machine.md` | high | 5 |
| Driver allocation and location rules | `docs/02-applications/driver-allocation-and-location-rules.md`, driver/dispatch/realtime docs | partial | review later ranking logic, freshness thresholds, reassignment detail, and dispatch follow-through | `docs/02-applications/driver-allocation-and-location-rules.md` | high | 5 |
| Driver navigation and connectivity rules | `docs/02-applications/driver-navigation-and-connectivity-rules.md`, driver/realtime docs | partial | review later heartbeat thresholds, provider detail, offline-sync mechanics, and delivery-confirmation detail | `docs/02-applications/driver-navigation-and-connectivity-rules.md` | high | 5 |
| Vehicle management and attributes | `docs/02-applications/vehicle-management-and-attributes.md`, booking/driver/dispatch docs | partial | review later capability matrices, compliance detail, maintenance/availability policy, and dispatch follow-through | `docs/02-applications/vehicle-management-and-attributes.md` | high | 5 |
| Dispatch domain | dispatch product doc is strong conceptually | partial | tighten into implementation contracts | existing dispatch docs plus new canonical contracts where needed | critical | 6 |
| Dispatch decision contract | `docs/02-applications/dispatch-decision-contract.md`, dispatch/ops docs | partial | review later ranking logic, queue ownership, exception paths, and degraded/detail follow-through | `docs/02-applications/dispatch-decision-contract.md` | critical | 6 |
| Dispatch map behavior | `docs/02-applications/dispatch-map-behavior.md`, dispatch/driver/realtime docs | partial | review later provider detail, ETA-source detail, richer map-layer behavior, and degraded follow-through | `docs/02-applications/dispatch-map-behavior.md` | high | 6 |
| Dispatch ranking and fallback rules | `docs/02-applications/dispatch-ranking-and-fallback.md`, dispatch/allocation docs | partial | review later ordering criteria, confidence thresholds, retry detail, and degraded follow-through | `docs/02-applications/dispatch-ranking-and-fallback.md` | high | 6 |
| Zone, geofence, and custom location management | `docs/02-applications/zone-geofence-and-custom-location-management.md`, booking/dispatch/pricing docs | partial | review later pricing usage, geocoding/address detail, area-policy matrices, and dispatch follow-through | `docs/02-applications/zone-geofence-and-custom-location-management.md` | high | 6 |
| Module taxonomy and commercial model | `docs/03-platform/module-commercial-model.md`, planning discussion notes | partial | review later final module-catalog boundaries, commercial enforcement rules, and deeper onboarding/editor follow-through | `docs/03-platform/module-commercial-model.md` | critical | 7 |
| Payments and invoicing | `docs/03-services/payments-and-invoicing.md`, `docs/03-services/refunds-and-financial-adjustments.md`, booking/payment references | partial | review later provider choice, payment-method detail, and deeper failure/integration behavior | `docs/03-services/payments-and-invoicing.md` and `docs/03-services/refunds-and-financial-adjustments.md` | high | 7 |
| Payment method matrix and currency strategy | `docs/03-services/payment-method-and-currency-strategy.md`, pricing/payment/tenant-config docs | partial | review later restriction matrices, provider/settlement detail, and any later multi-currency extension | `docs/03-services/payment-method-and-currency-strategy.md` | high | 7 |
| Superadmin package and tenant module controls | `docs/03-platform/superadmin-commercial-controls.md`, planning discussion notes | partial | review later self-service request detail, external billing automation links, and package-change enforcement follow-through | `docs/03-platform/superadmin-commercial-controls.md` | high | 7 |
| Notifications | `docs/03-services/notifications-and-integrations.md`, booking/auth/dispatch/ops references | partial | review later channel matrices, template/detail rules, and integration-pack boundaries | `docs/03-services/notifications-and-integrations.md` | high | 7 |
| Reporting and analytics | `docs/03-services/analytics-and-reporting.md` exists | partial | review later final report definitions, family-by-family detail, and deeper package/filter matrices | `docs/03-services/analytics-and-reporting.md` plus targeted reporting contracts | high | 7 |
| Reporting visibility, exports, and dashboard metric ownership | `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md`, `docs/05-frontend/reporting-route-and-state-matrix.md`, reporting/dashboard docs | partial | review later widget-by-widget metric mapping, finer permission matrices, and final report-link/detail matrices | `docs/03-services/reporting-visibility-exports-and-dashboard-metric-ownership.md` and `docs/05-frontend/reporting-route-and-state-matrix.md` | high | 7 |
| Realtime | `docs/03-services/realtime-system.md`, booking/driver/dispatch live-visibility references | partial | review later transport detail, payload design, subscriptions, and richer live-policy matrices | `docs/03-services/realtime-system.md` | high | 7 |
| Maps, geolocation, and ETA source | `docs/03-services/maps-geolocation-and-address-strategy.md`, booking/dispatch/tracking/location docs | partial | review later provider choice, ETA-source detail, and richer maps/geolocation policy matrices | `docs/03-services/maps-geolocation-and-address-strategy.md` | high | 7 |
| Address validation and route data strategy | `docs/03-services/maps-geolocation-and-address-strategy.md`, booking/pricing/location docs | partial | review later resolution mechanics, storage detail, and richer booking/ops follow-through | `docs/03-services/maps-geolocation-and-address-strategy.md` | high | 7 |
| Platform release, maintenance, and rollback model | `docs/03-platform/release-maintenance-and-rollback.md`, planning discussion notes | partial | review later rollout-policy detail, migration/rollback execution boundaries, and environment-specific operational detail | `docs/03-platform/release-maintenance-and-rollback.md` | high | 7 |
| Platform Ops Console surface | `docs/05-frontend/platform-ops-console.md`, ops/security/release docs | partial | refine later widget-level behavior, authority-detail follow-through, and richer cross-linking | `docs/05-frontend/platform-ops-console.md` | high | 8 |
| Frontend scaffold contract | `docs/05-frontend/frontend-scaffold-contract.md`, frontend stack/architecture docs | partial | review later folder/package detail, shared-foundation ownership depth, and shell-boundary follow-through | `docs/05-frontend/frontend-scaffold-contract.md` | critical | 8 |
| Shared app shell ownership | `docs/05-frontend/shared-app-shell-ownership.md`, shell and per-surface UI docs | partial | review later shell-detail, route-level follow-through, and abstraction boundaries | `docs/05-frontend/shared-app-shell-ownership.md` | high | 8 |
| Component / UI contract coverage | partial | partial | refine and link per-surface UI contracts for platform control, platform ops, tenant ops, customer, and driver | existing frontend docs plus targeted additions | medium | 8 |
| Per-surface UI contracts | platform control, platform ops, tenant ops, customer, and driver docs now exist | partial | refine later page-level behavior, widget/detail follow-through, and deeper surface-specific matrices | `docs/05-frontend/platform-control-ui-contract.md`, `docs/05-frontend/platform-ops-console.md`, `docs/05-frontend/tenant-operations-ui-contract.md`, `docs/05-frontend/customer-ui-contract.md`, `docs/05-frontend/driver-ui-contract.md` | high | 8 |
| Dashboard widgets and embeddable UI | `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md`, UI/shell/reporting/module docs | partial | review later widget catalogs, embed delivery detail, and compatibility follow-through | `docs/05-frontend/dashboard-widgets-and-embeddable-ui.md` | medium | 8 |
| Dashboard layout and customization model | `docs/05-frontend/dashboard-layout-and-customization.md`, widget/shell/surface docs | partial | review later zone maps, widget-level permissions, and interaction/detail follow-through | `docs/05-frontend/dashboard-layout-and-customization.md` | medium | 8 |
| Dashboard widget catalogs and zone maps | `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md`, widget/layout/surface docs | partial | extend later into optional-widget depth, widget permissions, and richer per-surface zone-map detail | `docs/05-frontend/dashboard-widget-catalogs-and-zone-maps.md` | medium | 8 |
| Module-aware UI and route gating | `docs/05-frontend/module-aware-ui-and-route-gating.md`, route/auth/shell docs | partial | review later route-by-route matrices, surface-specific locked-state behavior, and module-package follow-through | `docs/05-frontend/module-aware-ui-and-route-gating.md` | high | 8 |
| Route gating and locked-state matrix | `docs/05-frontend/route-gating-and-locked-state-matrix.md`, route/auth/gating docs | partial | extend later into page-level matrices, richer reporting-gating detail, and final locked-state visual follow-through | `docs/05-frontend/route-gating-and-locked-state-matrix.md` | high | 8 |
| Surface state handling and degraded UI rules | `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md`, ops/control surface docs | partial | extend later into page-level stale/degraded/detail behavior and final visual/state-copy follow-through | `docs/05-frontend/surface-state-handling-and-degraded-ui-rules.md` | high | 8 |
| Theme, branding, and responsive layout | `docs/05-frontend/theme-branding-and-responsive-layout.md`, fragmented earlier references | partial | review and tighten design-system links, screen-family detail, and deeper token implementation follow-through | `docs/05-frontend/theme-branding-and-responsive-layout.md` | medium | 8 |
| AI-assisted branding and theme recommendation | `docs/05-frontend/ai-assisted-branding.md`, planning discussion notes | partial | review and tighten extraction, approval workflow, and implementation edge cases | `docs/05-frontend/ai-assisted-branding.md` | medium | 8 |
| External website, WordPress, and WPML compatibility | `docs/05-frontend/external-website-wordpress-and-wpml-compatibility.md`, embed/theme/module docs | partial | review later plugin packaging, localization detail, and delivery mechanics | `docs/05-frontend/external-website-wordpress-and-wpml-compatibility.md` | medium | 8 |
| Current gap priority review | `docs/06-implementation/current-gap-priority-review.md` | strong | use as the current ranked view of remaining residual-tightening and post-closure priority areas | `docs/06-implementation/current-gap-priority-review.md` | high | control |
| Notification event catalog | `docs/03-services/notifications-and-integrations.md` | partial | review later optional-event expansion and finer per-audience/event detail | `docs/03-services/notifications-and-integrations.md` | medium | 7 |
| Notification channel rules | `docs/03-services/notifications-and-integrations.md` | partial | review later finer audience matrices, tenant override detail, and premium-channel follow-through | `docs/03-services/notifications-and-integrations.md` | medium | 7 |
| Custom notification controls | `docs/03-services/notifications-and-integrations.md` | partial | review later advanced notification-pack behavior and sensitive-template approval detail | `docs/03-services/notifications-and-integrations.md` | medium | 7 |
| Marketing and CRM integrations | `docs/03-services/notifications-and-integrations.md` | partial | review later connector-specific behavior and final consent-rule linkage | `docs/03-services/notifications-and-integrations.md` | medium | 7-8 |
| Testing strategy | `docs/06-implementation/testing-strategy.md` | partial | review and tighten tooling depth, domain-specific matrices, and verification evidence detail | `docs/06-implementation/testing-strategy.md` | critical | 9 |
| Seed / fixture / demo data contract | `docs/06-implementation/seed-and-demo-data-contract.md` | partial | review and tighten exact datasets, reset tooling, and cross-dataset reference detail | `docs/06-implementation/seed-and-demo-data-contract.md` | high | 9 |
| Environment and operations readiness | `environment-contract.md`, `operational-readiness-checks.md` | partial | expand later with frontend/runtime detail, staging/production detail, and deeper slice-level readiness expectations | `docs/06-implementation/environment-contract.md` and `docs/06-implementation/operational-readiness-checks.md` | high | 9 |
| Final AI build readiness gate | `ai-build-readiness.md` exists | partial | keep aligned with blockers, accepted residuals, and refresh after all phases complete | `docs/06-implementation/ai-build-readiness.md` | critical | 10 |

---

## Checklist

| Task | Status |
| --- | --- |
| Create documentation control layer | done |
| Build master inventory of existing vs missing docs | done |
| Approve documentation phases | done |
| Complete platform foundations documentation pack | substantially complete |
| Complete role/app surface and route documentation pack | substantially complete |
| Complete customer booking documentation pack | substantially complete |
| Complete driver documentation pack | substantially complete |
| Complete dispatch documentation pack | substantially complete |
| Complete payments / notifications / realtime documentation pack | substantially complete |
| Complete frontend implementation contract pack | substantially complete |
| Complete testing / operations documentation pack | substantially complete |
| Run final AI-readiness documentation review | substantially complete |

---

## Rule

When a domain is completed, update:

1. this tracker
2. the gap register
3. the roadmap if the phase order changes
4. the continuity notes if a significant decision was made

---

## Rule For New Documents

New implementation-safe documents should follow:

- `docs/06-implementation/documentation-contract-template.md`
