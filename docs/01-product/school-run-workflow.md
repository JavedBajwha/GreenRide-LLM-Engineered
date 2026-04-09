# School Run Workflow

## Purpose

Define the canonical first-pass workflow model for the optional `School Run`
add-on in GreenRide.

This document exists so AI and future implementation work do not invent:
- School Run as just an ordinary booking with a few extra fields
- a separate hidden trip lifecycle that conflicts with the booking lifecycle
- unsupported authority assumptions for guardian-led versus tenant-led journeys
- parcel-style custody logic for school transport

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical School Run workflow contract.

---

## Scope

This document covers:
- the approved product shape for School Run
- recurring-first school transport direction
- optional one-off school journeys where tenant policy allows
- workflow layering on top of the existing booking engine
- baseline participant context for guardians, approved contacts, roster linkage,
  and transport notes
- the relationship between School Run workflow and the canonical booking
  lifecycle

---

## Out of Scope

This document does not define:
- a full school attendance-management subsystem
- final schedule-generation algorithms
- final roster schema or storage design
- safeguarding/compliance policy beyond the baseline workflow boundary
- final customer or ops UI screen detail
- detailed reporting matrices or notification catalogs

Those belong to later add-on refinement and cross-cutting contracts.

---

## Roles Affected

- `tenant_owner`
- `tenant_admin`
- `dispatcher`
- `office_staff`
- `driver`
- `customer`
- `super_admin` as commercial/module-governance scope only

---

## App Surfaces Affected

- public or customer booking surface where guardian-led entry is approved
- tenant operations surface for tenant-led administration and operations
- driver surface for assigned journey execution only
- platform control surface for commercial/module visibility only

---

## Related Documents

- `docs/03-platform/module-commercial-model.md`
- `docs/03-platform/school-run-authority-and-configuration.md`
- `docs/01-product/school-run-pricing-and-billing.md`
- `docs/01-product/booking-lifecycle-state-machine.md`
- `docs/01-product/customer-tracking-and-visibility.md`
- `docs/03-services/realtime-system.md`
- `docs/03-services/notifications-and-integrations.md`
- `docs/03-services/analytics-and-reporting.md`

---

## Canonical Rules

1. `School Run` is an optional add-on, not a silent expansion of ordinary ride
   booking.
2. School Run is recurring-first, even though one-off school journeys may be
   supported where tenant policy allows.
3. School Run reuses the booking engine and booking lifecycle as the
   operational trip backbone.
4. School Run workflow truth must remain distinct from ordinary booking truth,
   even when both ultimately execute through the same booking lifecycle states.
5. Guardian contacts, approved contacts, roster linkage, and special transport
   notes are School Run workflow context, not new booking lifecycle states.
6. School Run must not introduce a separate parcel-style custody model or
   parcel-style proof-of-delivery logic.
7. Module enablement does not by itself define School Run authority,
   visibility, or execution permissions.

---

## Product Shape

Approved first-pass School Run direction:
- separate optional add-on
- primarily scheduled recurring transport
- optional one-off school pickup/drop journeys where tenant configuration
  allows them

School Run should therefore be treated as:
- more structured than ordinary ad hoc booking
- still transport/trip based rather than attendance-system based
- layered on top of shared transport foundations rather than replacing them

---

## Workflow Layers

School Run uses two layers of product truth:

### 1. School Run Arrangement Layer

This layer captures the recurring or policy-bearing context for school
transport.

Approved first-pass context:
- rider or service participant context
- guardian contacts
- approved contacts
- roster linkage
- school-transport notes
- recurring service expectation where applicable

This layer gives School Run its operational meaning.

### 2. Journey Instance Layer

This layer represents the concrete transport execution for an actual journey.

Rules:
- each actual School Run journey must still execute through the canonical
  booking lifecycle
- the arrangement layer provides context for that journey
- the journey layer remains the operational truth for dispatch, driver work,
  customer tracking, and trip completion

This preserves reuse without collapsing School Run into ordinary booking.

---

## Approved Workflow Baseline

The current approved School Run workflow baseline is:

1. School Run add-on is commercially enabled for the tenant
2. tenant configuration selects the approved authority mode and School Run
   behavior inside that enabled scope
3. a School Run arrangement or approved one-off context is established
4. a concrete journey instance is prepared for transport execution
5. that journey instance moves through the canonical booking lifecycle
6. school-specific visibility, contact, and note context travels with the
   journey where approved
7. historical outcome remains tied to the journey record and the School Run
   arrangement context where relevant

This is an approved workflow backbone, not yet a final detailed state machine.

---

## Relationship to the Booking Lifecycle

School Run does not approve new booking lifecycle states.

Canonical direction:
- School Run may prepare or contextualize journeys differently
- once a concrete journey instance exists, the canonical booking lifecycle
  remains authoritative for trip execution
- School Run metadata must not silently replace states such as `confirmed`,
  `assigned`, `arrived`, or `completed`

Important rule:
- School Run workflow stages and arrangement context may exist alongside the
  booking lifecycle
- they must not be treated as replacement booking statuses

---

## Participant Context Boundary

The first approved School Run participant-context baseline includes:
- guardian contacts
- approved contacts
- roster linkage
- special transport notes

Rules:
- this context supports School Run workflow and visibility
- it does not by itself create new authority outside documented RBAC and tenant
  configuration
- it does not by itself imply that every contact is a valid notification
  audience or booking actor for every action

Detailed authority rules belong to the dedicated School Run authority contract.

---

## Tracking and Visibility Boundary

School Run should reuse the shared trip-tracking foundation.

Approved direction:
- live transport visibility remains tied to the canonical booking/trip state
- School Run may layer school-specific context on top of that transport truth
- School Run must not create a second live-state model that competes with the
  booking, dispatch, or driver domains

This means:
- no parcel-style custody chain
- no separate school-specific trip-state machine by default
- no fake visibility before the underlying trip context is valid

---

## Data Model Links

This workflow assumes the platform will later need records for at least:
- School Run arrangement context
- journey linkage back to that School Run context
- approved-contact and guardian context
- school-specific notes or operational flags where approved

Exact schema names and field structures remain open until later data-model
alignment.

---

## Security / Tenancy Rules

1. School Run remains tenant-scoped.
2. School Run authority must remain subordinate to RBAC and tenant boundaries.
3. `super_admin` commercial visibility does not make `super_admin` the default
   day-to-day School Run operator.
4. A tenant with the module disabled must not access School Run workflow routes
   or actions.
5. Guardian or approved-contact context must not be treated as a shortcut to
   broader tenant data access.

---

## Failure / Exception Rules

- if School Run is disabled for the tenant, School Run-specific workflow must
  remain gated rather than falling back silently to ordinary booking
- if required School Run arrangement or authority context is incomplete, the
  system must block School Run workflow continuation rather than guessing
- if a concrete journey instance exists, operational exceptions still resolve
  through the canonical booking, dispatch, and driver domains rather than an
  undocumented school-only exception model
- if a tenant wants school-specific behavior beyond this baseline, the docs
  must be extended before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- School Run is being reduced to ordinary booking with a few extra fields
- School Run is being given a new booking-state machine by assumption
- a new school-specific global role is being introduced without RBAC approval
- school visibility is being turned into parcel-style custody or proof logic
