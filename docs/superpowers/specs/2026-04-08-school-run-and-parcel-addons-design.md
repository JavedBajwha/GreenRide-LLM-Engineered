# School Run and Parcel Add-Ons Design

## Purpose

Define the first approved design direction for two new optional GreenRide add-ons:
- `School Run`
- `Parcel / Courier / Logistics`

This document exists so these modules are introduced through explicit platform
and workflow contracts instead of being inferred from the current ride-booking
model.

## Current Decision

Both features should be added as separate optional add-ons in the existing
module/commercial model.

They are not silent expansions of the base transport product.

## Design Summary

### Shared Add-On Direction

Both add-ons should:
- remain optional tenant modules
- reuse the existing platform foundations
- stay subject to auth, RBAC, tenant isolation, audit/logging, module gating,
  and readiness rules
- avoid silently changing the truth model of the current ride-booking platform

Both add-ons should not:
- redefine the base auth or RBAC model
- weaken tenant-scope boundaries
- collapse module enablement into role authority
- treat partial policy areas as fully defined

## Add-On 1: School Run

### Product Shape

`School Run` should be designed as:
- a separate optional add-on
- primarily scheduled recurring transport
- with support for one-off school pickup/drop journeys where the tenant allows
  them

### Authority Model

Booking authority should be configurable by tenant direction:
- parent/guardian-led
- school/admin-led
- both

This is a tenant-configuration decision, not a separate global product split.

### Workflow Model

School Run should not be treated as a normal booking with a few extra fields.

Approved direction:
- use the booking engine as a foundation
- layer a distinct school-run workflow on top of that engine

This preserves reuse while allowing school-specific operational meaning.

### First-Pass School Controls

The first approved School Run design should include:
- guardian contacts
- roster linkage
- approved contacts
- special transport notes

It should not yet require a full attendance-control subsystem.

### Tracking Model

School Run should:
- reuse the shared ride-tracking foundation
- keep ride/trip truth aligned with existing transport tracking
- allow school-specific visibility or context on top of the ride model

School Run should not:
- redefine core driver/trip state meaning
- turn school visibility concerns into a separate parcel-style custody model

### Pricing and Billing Direction

School Run pricing should not be treated only as ordinary trip-by-trip ride
pricing.

Approved first direction:
- recurring arrangement pricing is the primary model
- one-off school journeys may still use one-off journey pricing where allowed
- standard billing cadence should support:
  - weekly
  - monthly
- optional bespoke/custom invoicing may exist as an advanced commercial mode

Pricing basis may be configured as:
- rider-based
- corridor/route-based
- mixed

Billing must also support calendar-aware partial-period handling.

Approved first direction:
- billable adjustment may be based on active service days
- billable adjustment may be based on active service weeks
- tenant billing rules determine which approved model applies

This prevents the platform from assuming a full weekly or monthly charge when a
school calendar only runs for part of the period.

## Add-On 2: Parcel / Courier / Logistics

### Product Shape

`Parcel / Courier / Logistics` should be designed as:
- a separate optional add-on
- a courier delivery and logistics management CMS
- not merely a parcel field set inside the ordinary booking model

### Workflow Model

Parcel should support optional booking-style intake at the edge where useful,
but its primary system truth should be a logistics-job lifecycle.

Approved direction:
- logistics lifecycle is primary
- booking-style intake is secondary and optional

This avoids forcing courier/logistics truth into passenger-transport lifecycle
language.

### First-Pass Parcel Proof Direction

The first approved parcel proof baseline should include:
- delivery outcome
- delivery timestamp
- recipient identity field
- proof note
- photo/signature placeholders
- failed-delivery reason
- redelivery / return direction

### Stronger Proof Option

A stronger proof layer may exist as an optional feature:
- OTP/code verification
- stricter handover confirmation

Approved authority direction:
- stronger proof remains platform-defined
- enable/disable authority defaults to `super_admin` and `tenant_owner`

It should not be freely redefined by tenant admin roles by default.

### Parcel Size and Pricing Direction

Parcel pricing should not reuse passenger-trip pricing truth.

Approved first direction:
- pricing should consider named parcel classes for operational simplicity
- pricing should also consider measured dimensions and weight for validation and
  pricing accuracy
- pricing should include zone/distance direction
- pricing should include service/handling level direction

This allows first-pass support for:
- small parcels
- larger boxes
- oversized items
- pallets
- handling-sensitive deliveries

Named classes should aid operational workflow.
Measured dimensions and weight should prevent the class system from becoming the
only source of pricing or suitability truth.

### Tracking Model

Parcel should:
- reuse shared tracking infrastructure where appropriate
- keep a separate parcel-tracking truth model

Parcel tracking may share:
- location/event infrastructure
- transport layers
- visibility components

Parcel tracking must not be collapsed into:
- taxi tracking
- driver-trip completion truth
- passenger-journey state meaning

## Platform Boundary Rules

### Shared Foundations To Reuse

Both add-ons should reuse:
- auth/session controls
- RBAC and surface ownership
- tenant isolation
- audit/logging
- shared tracking infrastructure
- frontend route/shell/module gating
- readiness and residual safety rules

### Boundaries That Must Stay Separate

The following meanings must stay distinct:
- school-run workflow truth vs ordinary ride-booking truth
- parcel logistics truth vs passenger-trip truth
- parcel proof-of-delivery vs ride completion
- module enablement vs RBAC authority

## Commercial and Module Direction

Both add-ons should be introduced through the existing module/commercial model.

Approved first direction:
- module enablement/disablement
- tenant-specific configuration

This design does not yet require separate internal feature tiers inside each
add-on.

## Documentation Strategy

These add-ons should be introduced through a new documentation expansion wave.

Recommended order:
1. add both modules into the module/commercial/control layer
2. define School Run as the first new add-on wave
3. define Parcel / Courier / Logistics as the second new add-on wave
4. update affected cross-cutting docs:
   - tracking
   - notifications
   - reporting
   - frontend route/surface docs

## Safe Implementation Meaning

When these add-ons are later implemented:
- shared foundations may be reused
- workflow-specific truth must not be guessed
- parcel proof and tracking must not be inferred from ride completion
- partial policy detail must follow the repo residual-safety and AI
  implementation protocol rules

## Open Follow-On Documentation Areas

This design intentionally leaves later documentation work for:
- detailed School Run lifecycle and schedule rules
- detailed School Run pricing, billing-calculation, and calendar-rule matrices
- school-run reporting/notification detail
- parcel logistics lifecycle detail
- parcel operational states beyond the first approved baseline
- parcel class, dimensions, handling, and pricing-rule matrices
- courier/logistics reporting/notification detail
- frontend surface and route impact for both add-ons

## Recommendation

Proceed by opening a new documentation wave for these two add-ons using this
design as the approved starting point.
