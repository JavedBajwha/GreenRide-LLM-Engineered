# Parcel Logistics Workflow

## Purpose

Define the canonical first-pass workflow model for the optional
`Parcel / Courier / Logistics` add-on in GreenRide.

This document exists so AI and future implementation work do not invent:
- parcel delivery as just a passenger booking with a few extra fields
- passenger-trip lifecycle truth for logistics jobs
- parcel proof or redelivery behavior as an afterthought of ride completion
- unsupported warehouse or hub complexity that the current product has not
  approved

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical Parcel logistics workflow contract.

---

## Scope

This document covers:
- the approved product shape for the Parcel add-on
- logistics-job-first workflow direction
- optional booking-style intake at the edge
- first-pass workflow baseline for delivery, failed-delivery, redelivery, and
  return direction
- the relationship between parcel workflow truth and the rest of the platform

---

## Out of Scope

This document does not define:
- warehouse management
- hub routing
- multi-stop courier optimization
- detailed parcel state enums
- final delivery routing algorithms
- final customer or tenant UI detail

Those belong to later Parcel refinement work if approved.

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

- public or customer surface where parcel-intake entry is later approved
- tenant operations surface for parcel management and oversight
- driver surface for assigned parcel execution only
- platform control surface for commercial/module visibility only

---

## Related Documents

- `docs/03-platform/module-commercial-model.md`
- `docs/03-services/parcel-proof-and-tracking-contract.md`
- `docs/01-product/parcel-pricing-and-size-model.md`
- `docs/03-services/realtime-system.md`
- `docs/03-services/notifications-and-integrations.md`
- `docs/03-services/analytics-and-reporting.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/module-aware-ui-and-route-gating.md`

---

## Canonical Rules

1. `Parcel / Courier / Logistics` is an optional add-on, not a silent
   expansion of passenger transport.
2. Parcel workflow truth is a logistics-job lifecycle, not a passenger-trip
   lifecycle.
3. Booking-style parcel intake may exist at the edge, but it is secondary to
   the logistics-job model.
4. Parcel proof-of-delivery must remain separate from ride completion truth.
5. Redelivery and return direction are first-pass parcel concepts, not later
   hidden support notes.
6. Module enablement does not by itself define parcel authority or proof
   authority.
7. The current add-on baseline must not invent warehouse or hub complexity that
   has not been approved.

---

## Product Shape

Approved first-pass Parcel direction:
- separate optional add-on
- courier delivery and logistics management capability
- not merely a parcel field set inside the ordinary booking model

This means the add-on should be treated as:
- transport-adjacent
- operationally distinct from passenger journey execution
- layered onto shared platform foundations without collapsing into taxi trip
  truth

---

## Workflow Layers

Parcel uses two related but distinct layers:

### 1. Intake Layer

This is the request-capture layer.

Approved direction:
- intake may look booking-like where useful
- intake may happen through customer/public or tenant-ops entry where later
  approved
- intake alone is not the authoritative parcel lifecycle

### 2. Logistics Job Layer

This is the authoritative operational layer for the parcel add-on.

Rules:
- once accepted into parcel operations, the request becomes a logistics job
- logistics-job truth governs assignment, delivery attempt, proof, and outcome
- the parcel job must not be forced into passenger-trip language such as
  passenger onboard or trip completed

This preserves a clean operational boundary for the add-on.

---

## Approved Workflow Baseline

The first approved Parcel workflow baseline is:

1. Parcel add-on is commercially enabled for the tenant
2. parcel intake is captured through an approved entry path
3. an accepted request becomes a logistics job
4. the logistics job is prepared for operational assignment and execution
5. delivery execution proceeds under parcel-job truth
6. a delivery attempt produces either successful proof or an explicit failed
   outcome
7. failed-delivery cases may continue into redelivery or return direction where
   required

This is the approved workflow backbone, not yet a final low-level state model.

---

## First-Pass Lifecycle Meaning

The current approved lifecycle meaning is:

- intake context exists before logistics acceptance
- logistics-job context exists once parcel operations own the request
- delivery attempt is the authority point for outcome capture
- closed outcome may be delivered, failed-delivery, redelivery-pending, or
  return-directed depending on the case

Rules:
- later work may refine exact state names
- current implementation work must not invent a passenger-trip enum and treat
  it as parcel truth

---

## Relationship to Existing Transport Truth

Parcel workflow must stay separate from ordinary ride-booking truth.

Canonical direction:
- shared platform infrastructure may still be reused
- dispatch-like operational concepts may still apply where relevant
- driver movement or vehicle use does not turn the parcel job into a passenger
  trip

Important rule:
- parcel logistics truth may reference movement, assignment, or delivery
  attempts
- it must not collapse into passenger pickup/dropoff or ride-completion
  semantics by default

---

## Proof and Outcome Boundary

Parcel proof and delivery outcome are primary workflow concepts.

Approved first-pass baseline:
- delivery outcome
- delivery timestamp
- recipient identity field
- proof note
- photo/signature placeholders
- failed-delivery reason
- redelivery or return direction

Detailed proof rules live in the dedicated proof/tracking contract.

---

## Data Model Links

This workflow assumes the platform may later need records for:
- parcel intake context
- logistics jobs
- delivery attempts
- proof or failed-delivery outcome context
- redelivery or return direction

Exact schema names and field definitions remain open.

---

## Security / Tenancy Rules

1. Parcel logistics remains tenant-scoped.
2. Parcel-job visibility and actions must remain subordinate to RBAC and tenant
   boundaries.
3. `super_admin` commercial visibility does not make `super_admin` the default
   parcel operator.
4. A tenant with the module disabled must not access parcel-specific workflow
   routes or actions.
5. Parcel proof and recipient identity data must not widen access beyond the
   authorised surface and role.

---

## Failure / Exception Rules

- if the Parcel add-on is disabled, parcel workflow must remain gated rather
  than falling back silently to ordinary booking
- if parcel intake is captured but logistics acceptance is incomplete, the
  system must not pretend a full parcel job already exists
- if a delivery attempt fails, the workflow must remain explicit about
  failed-delivery versus redelivery or return direction
- if a tenant needs richer warehouse, routing, or multi-leg logistics behavior,
  docs must expand before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- parcel delivery is being reduced to passenger-trip truth
- ride completion is being treated as proof-of-delivery
- warehouse or hub complexity is being invented without approval
- redelivery or return behavior is being hidden inside generic exception logic
