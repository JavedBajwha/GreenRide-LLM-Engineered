# Notifications And Integrations

## Purpose

Define the canonical notifications and outbound-communication baseline for GreenRide.

This document exists so AI and future implementation work do not invent:
- notifications as free-floating UI side effects
- unclear ownership between booking, auth, dispatch, and ops domains
- ad hoc channel behavior with no event boundary
- provider-specific assumptions with no approved contract

## In Scope

- notification event ownership baseline
- outbound communication channels baseline
- notification-service responsibility boundary
- delivery-state direction
- integration boundary for outbound communication providers

## Current Status

Draft, approved as the current documentation direction.

This document is the first canonical notification and outbound-communication contract for the Phase 7 service domain.

## Out of Scope

This document does not define:
- final provider choices
- final queueing or webhook structure
- detailed retry timings
- tenant-specific template editor behavior
- marketing/CRM connector strategy
- embeddable website/widget integrations

Those belong to later integration, notification-pack, and frontend contracts.

## Related Documents

- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/parcel-logistics-workflow.md`
- `docs/01-product/school-run-workflow.md`
- `docs/03-services/parcel-proof-and-tracking-contract.md`
- `docs/03-platform/school-run-authority-and-configuration.md`
- `docs/02-applications/dispatch-decision-contract.md`
- `docs/03-platform/auth-and-session.md`
- `docs/03-platform/security-incident-and-emergency-access-rules.md`
- `docs/03-platform/error-handling-and-failure-strategy.md`

## Canonical Rules

1. Notifications are event-driven outputs, not free-floating UI actions.
2. Business domains own the event; the notification service owns outbound delivery handling.
3. Notification state must not replace business lifecycle state.
4. Channel use must remain explicit rather than assumed from provider capability.
5. Provider choice remains open until a later explicit contract approves it.
6. Delivery failure must remain visible and must not silently rewrite business truth.

## Event Ownership Baseline

The notification service should not invent business events.

Canonical direction:
- booking events own booking notifications
- dispatch and driver events own operational notifications
- auth events own auth-related emails and access communications
- platform ops or incident events own maintenance/emergency communications

This is the core ownership rule for GreenRide notifications.

## Notification Service Responsibility

The notification service is responsible for:
- receiving approved business events
- selecting the allowed outbound channel(s) for that event
- preparing message delivery work
- tracking delivery state where supported
- exposing delivery failure for later retry/follow-up behavior

Rules:
- the service does not create the business event itself
- the service does not redefine booking, auth, dispatch, or incident state
- the service should remain a delivery/orchestration layer, not a hidden business-rule engine

## Approved Channel Baseline

Current approved outbound communication channel set:
- email
- SMS
- WhatsApp or similar tenant-enabled messaging channel

Important guardrail:
- channel availability should remain explicit
- AI and future implementation work must not assume every tenant or event uses every channel

## Event-Family Baseline

Current approved event-family baseline:
1. booking/customer communications
2. dispatch/driver operational communications
3. auth/access communications
4. incident, maintenance, and operational-status communications

Examples:
- booking confirmation
- booking cancellation
- driver offer or operational prompt
- invite or password-reset email
- maintenance or incident notice

This creates a clean event map before later detailed message catalogs.

## School Run Communication Boundary

If the `School Run` add-on is enabled:
- School Run communications must still remain event-owned rather than template
  or UI owned
- School Run customer or guardian communications should remain subordinate to
  approved booking/customer and operational event ownership until a later
  School Run event catalog is documented
- School Run-approved contacts must not be treated as a free-form broadcast
  audience by assumption

Important guardrails:
- School Run enablement does not by itself approve new message audiences
- School Run visibility context must still respect tenant authority, contact
  validity, and notification-scope rules
- later School Run-specific events may be added, but they must not silently
  replace the baseline event-ownership model

## Parcel Communication Boundary

If the `Parcel / Courier / Logistics` add-on is enabled:
- parcel communications must remain subordinate to explicit parcel-job and
  proof or outcome events rather than generic booking or trip messaging
- parcel proof, failed-delivery, redelivery, and return direction must not be
  collapsed into generic passenger-trip communications
- parcel recipient or customer visibility must remain scope-aware rather than
  assumed from parcel existence alone

Important guardrails:
- the Parcel add-on does not by itself approve a full parcel event catalog
- parcel communications must not borrow passenger-trip event meaning where the
  underlying logistics-job truth is different
- later parcel-specific events may be added, but they must remain domain-owned
  and explicit

## Canonical Notification Event Baseline

GreenRide should define an explicit minimum notification-event catalog instead of leaving
 event names implicit across booking, auth, dispatch, and ops flows.

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

Event intent notes:
- `booking_updated` should be used only for material customer-visible booking changes, not
  every internal mutation
- `payment_receipt_or_invoice_ready` covers the communication event, not the accounting
  lifecycle itself
- maintenance and incident notices remain platform/ops-owned communication events rather
  than generic marketing messages

This is the approved baseline catalog, not the final exhaustive template list.

## Event Catalog Guardrails

Rules for the baseline event catalog:
- event names should remain domain-owned and explicit
- notification events must not be invented ad hoc from UI screens
- the event catalog does not imply every tenant uses every event or every channel
- later work may add more events, but should not silently rename or replace this baseline
- provider/template configuration must remain subordinate to the event catalog

## Relationship to Business State

Notification delivery does not become business truth.

Rules:
- a booking is not confirmed just because a confirmation email was sent
- a job is not assigned just because a driver notification was sent
- an invite is not accepted just because the invite email was delivered
- a maintenance event is not resolved just because a notice was sent

Business state remains owned by its domain contracts.

## Delivery-State Direction

Examples of communication-layer outcomes:
- queued
- sent
- delivered where supported
- failed

Rules:
- delivery outcomes belong to notification handling, not booking/auth/dispatch lifecycle
- delivery uncertainty must remain visible rather than treated as guaranteed success
- later retry and escalation logic must build on this boundary rather than replacing it

## Channel-Selection Direction

This document does not finalize full per-event channel matrices yet, but it locks these guardrails:
- not every event uses every channel
- channel choice must be explicit and tenant-aware
- premium or optional channels such as WhatsApp must not be assumed into baseline tenant behavior without enablement

## Canonical Channel Baseline

GreenRide should define a first explicit channel baseline for the approved notification
event catalog.

Baseline channel rules:
- email is the default formal baseline channel
- SMS may be used for time-sensitive booking/trip communications where tenant-enabled
- WhatsApp or similar messaging remains optional and must be explicitly enabled
- not every event requires every channel

Approved first event-to-channel direction:

| Event | Baseline Channel Direction |
| --- | --- |
| `auth_invite` | email only |
| `auth_password_reset` | email only |
| `payment_receipt_or_invoice_ready` | email only by default |
| `booking_confirmed` | email baseline, SMS optional |
| `booking_cancelled` | email baseline, SMS optional |
| `booking_updated` | email baseline, SMS optional where the change is materially time-sensitive |
| `driver_assigned` | SMS optional, WhatsApp optional, email not required by default |
| `driver_arriving` | SMS optional, WhatsApp optional, email not required by default |
| `trip_started` | SMS optional, WhatsApp optional, email optional by tenant policy |
| `trip_completed` | SMS optional, WhatsApp optional, email optional by tenant policy |
| `maintenance_notice` | email baseline, SMS optional for urgent or higher-severity cases |
| `incident_or_service_disruption_notice` | email baseline, SMS optional for urgent or higher-severity cases |

## Channel Guardrails

Rules for this first channel baseline:
- email should carry the formal baseline for auth and financial-record communications
- faster channels should be reserved for time-sensitive operational/customer updates where enabled
- WhatsApp must be treated as an optional tenant-enabled channel, not a platform default
- later work may refine audience/channel detail, but should not contradict this baseline without explicit approval
- tenant notification configuration may narrow or extend allowed channels only within the approved product/module model

## Audience Baseline

Approved first audience direction:
- customer-facing booking and trip communications target the booking customer/contact context
- driver-operational communications target the assigned or candidate driver context
- auth communications target the invited or recovering account owner only
- maintenance and incident communications target the affected audience by scope rather than every user indiscriminately

This means channel choice and audience choice both stay event-owned.

### Audience Guardrails

Rules for the first audience baseline:
- the existence of a booking, driver, or tenant record does not by itself make that record a valid audience for every event
- operational driver communications must not be reused as customer communications by default
- auth and recovery communications must stay limited to the identity owner or intended recipient, not broader tenant or ops audiences
- maintenance and incident communications should be scope-targeted and severity-aware rather than platform-wide by assumption
- marketing or CRM audiences must not be inferred from transactional event eligibility

This keeps event, audience, and channel boundaries aligned.

## Custom Notification Baseline

GreenRide should allow controlled tenant-level notification customization, but only within
approved template and event boundaries.

Canonical direction:
- custom notifications must remain attached to approved events
- tenants may customize approved template content and presentation within guardrails
- tenants may not turn the notification layer into a free-form outbound messaging tool

This keeps notifications configurable without letting them become a hidden business-rule engine.

## What Tenants May Customize

Approved baseline customization areas:
- tenant branding inside approved templates
- sender/display details where the platform allows them
- approved copy sections inside platform-owned templates
- tenant channel enablement within approved channel rules
- reminder and communication preferences where tenant configuration already allows them

These are safe customization controls because they do not redefine business-event ownership.

### Template Scope Baseline

Approved first template-scope direction:
- subject/header wording where the channel supports it
- approved body copy sections
- tenant branding elements
- sender/display identity where allowed

Not approved by default:
- rewriting the event meaning
- removing required legal/security language
- injecting arbitrary dynamic fields outside approved template variables

## What Tenants May Not Customize Freely

Not supported by default:
- inventing new business events
- changing booking, auth, dispatch, payment, or incident triggers
- redefining delivery logic outside approved channel rules
- rewriting security/auth message structure freely
- taking control of maintenance/emergency message authority
- creating unrestricted “send anything to anyone” flows from admin UI

This is the core custom-notification boundary.

## Advanced Notification Pack Boundary

Higher-flexibility notification controls belong to an advanced or premium notification layer,
not the core baseline.

Likely examples of later premium/custom controls:
- deeper template override controls
- richer tenant-specific communication variants
- wider optional-channel behavior
- more advanced reminder or audience rules

Important guardrail:
- even an advanced notification pack should remain subordinate to approved events,
  security rules, and delivery boundaries

### Approval Workflow Direction

If deeper tenant template overrides exist later:
- changes should remain reviewable
- higher-risk templates such as auth, payment, and incident communications should remain under tighter platform control
- approval workflow should distinguish routine branding/copy changes from sensitive trust-boundary communications
- approval or publication of a template override must not be treated as approval to widen event scope, recipient scope, or trigger authority

## Customization Guardrails

Rules for baseline custom notifications:
- template customization must remain template-bound, not logic-bound
- business triggers stay platform-owned
- channel selection stays bounded by approved event/channel rules
- auth, security, and incident communications need stricter platform control than routine booking messaging
- tenant customization must not weaken auditability, compliance, or clarity
- audience scope must remain event-owned and must not be widened by template or channel customization alone
- approved template variables must remain subordinate to the event contract and must not become a hidden free-form data-sharing path

## Marketing and CRM Integration Baseline

GreenRide should treat Mailchimp-style marketing tools and CRM connectors as optional
outbound integrations, not as part of the core transactional notification system.

Canonical direction:
- transactional communications stay owned and delivered through GreenRide's approved
  notification model
- marketing/CRM integrations are optional add-ons for non-transactional communication and
  audience sync behavior
- external marketing tools must not become the source of truth for booking, auth,
  dispatch, payment, or incident state

This keeps trust-sensitive product communications separate from promotional or CRM tooling.

## Supported Marketing/CRM Use Direction

Likely approved first use cases:
- newsletter audience sync
- approved contact export or sync
- campaign audience preparation
- non-transactional marketing communication workflows outside the core product event model

These are integration-layer use cases, not replacements for core platform notifications.

## Data-Sharing Boundary

Marketing/CRM integrations should share only approved, consent-safe data.

Approved baseline direction:
- contact/profile data that is safe and approved for marketing/CRM sync
- limited segmentation or status fields where explicitly approved later

### Consent Boundary

Marketing/CRM sync should depend on approved consent-safe data sharing.

Rules:
- transactional notification eligibility does not automatically imply marketing consent
- marketing sync should respect later contact-consent rules explicitly
- lack of marketing consent must not block core transactional/system communications

### Field-Level Sharing Baseline

Approved first safe-sharing categories:
- display/contact identity fields needed for approved campaign sync
- approved tenant/customer segmentation markers
- limited engagement or audience-group fields where later approved

Not approved by default:
- full booking history dumps
- payment-security data
- auth/security event history
- internal platform-ops or incident state

Not supported by default:
- unrestricted full tenant/customer data dumps
- sensitive auth/security data
- live operational dispatch/trip state as a default feed
- payment-security detail
- internal incident/emergency control data

Important guardrail:
- later integrations may expand approved fields explicitly, but must not assume broad data
  export by default

## Transactional vs Marketing Boundary

Core transactional/system communications remain inside GreenRide, including:
- booking communications
- auth and access communications
- operational trip/dispatch notices
- payment receipt or invoice communications
- maintenance and incident notices

Marketing/CRM tools do not replace these.

This means:
- Mailchimp or similar tools are not the owner of booking confirmation
- CRM/campaign tools are not the owner of password reset or invite delivery
- external marketing tools must not silently inherit system-notification responsibility

## Commercial Boundary

Marketing/CRM integrations fit the existing optional integration/commercial model.

Canonical direction:
- these integrations are optional add-on or quoted integration scope
- they should not be assumed into the baseline tenant package
- richer connector behavior belongs to the external integrations or premium communication layer, not the core notification baseline

## Integration Boundary

External communication providers should be treated as outbound delivery adapters.

Canonical direction:
- provider adapters belong to the notification integration layer
- provider behavior must not redefine event ownership
- external connectors must not become the authority that decides whether a transactional event exists
- external connectors must not widen audience eligibility or convert transactional events into marketing events by default
- provider failure must not silently corrupt business truth

This keeps integrations subordinate to the business-event model.

## Failure Direction

- notification failure must be recorded and made visible for retry or follow-up behavior
- failure to deliver a message must not silently roll back or fake-complete the business event
- channel/provider issues must remain distinguishable from business-state failure

## Important Rule

GreenRide should treat notifications as domain-owned events delivered through a shared outbound communication service, not as random message sends attached wherever a developer notices a screen action.

## Stop Conditions

Stop and clarify before implementation if:
- notifications are being triggered directly from UI flow with no domain event boundary
- the notification service is inventing business events on its own
- delivery status is being used as a substitute for booking, auth, dispatch, or incident state
- provider-specific behavior is being treated as the platform default without approval
