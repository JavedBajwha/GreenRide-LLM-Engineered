# Parcel Proof And Tracking Contract

## Purpose

Define the canonical first-pass proof-of-delivery and parcel-tracking boundary
for the optional `Parcel / Courier / Logistics` add-on.

This document exists so AI and future implementation work do not invent:
- parcel proof as equivalent to ride completion
- parcel tracking as a copy of passenger tracking
- stronger proof rules without approved authority controls
- parcel visibility that ignores tenant, role, or scope boundaries

---

## Status

Draft, approved as the current documentation direction for Future Wave 1.

This is the first canonical Parcel proof and tracking contract.

---

## Scope

This document covers:
- first-pass parcel proof baseline
- stronger proof option boundary
- parcel-tracking truth versus shared realtime infrastructure
- outcome and failed-delivery proof direction
- security and authority rules around parcel proof

---

## Out of Scope

This document does not define:
- final transport protocol or provider
- final media storage design
- exact OTP generation mechanics
- final recipient identity validation rules
- customer-facing UI layouts

Those belong to later security, media, transport, and UI refinement work.

---

## Roles Affected

- `tenant_owner`
- `tenant_admin`
- `dispatcher`
- `office_staff`
- `driver`
- `customer`
- `super_admin` for stronger-proof governance defaults only

---

## App Surfaces Affected

- tenant operations surface
- driver surface
- public or customer surface only where parcel-visibility features are later
  approved
- platform control surface for stronger-proof governance defaults only

---

## Related Documents

- `docs/01-product/parcel-logistics-workflow.md`
- `docs/01-product/parcel-pricing-and-size-model.md`
- `docs/03-services/realtime-system.md`
- `docs/03-services/notifications-and-integrations.md`
- `docs/03-services/analytics-and-reporting.md`
- `docs/03-platform/rbac.md`
- `docs/03-platform/tenant-configuration.md`

---

## Canonical Rules

1. Parcel proof-of-delivery is not the same thing as ride completion.
2. Parcel tracking is a distinct parcel-tracking truth model.
3. Shared realtime and location infrastructure may be reused, but reused
   infrastructure does not collapse parcel truth into passenger-trip truth.
4. Stronger proof is optional and platform-governed.
5. Delivery failure, redelivery, and return direction must remain explicit in
   parcel proof handling.
6. Proof data must remain role-aware, tenant-scoped, and auditable.

---

## First-Pass Proof Baseline

The approved first-pass parcel proof baseline includes:
- delivery outcome
- delivery timestamp
- recipient identity field
- proof note
- photo or signature placeholders
- failed-delivery reason
- redelivery or return direction

Rules:
- these fields define the minimum parcel proof boundary
- the presence of proof data does not invent a broader parcel state machine
- proof capture must remain tied to an authoritative parcel-job and delivery
  attempt context

---

## Stronger Proof Option

A stronger proof layer may exist as an optional feature.

Approved first examples:
- OTP or code verification
- stricter handover confirmation

Authority direction:
- stronger-proof defaults remain platform-defined
- enable or disable authority defaults to `super_admin` and `tenant_owner`
- `tenant_admin` does not freely redefine stronger-proof policy by default

This keeps higher-trust handover policy controlled rather than casually
reconfigured.

---

## Tracking Truth Boundary

Parcel tracking should reuse shared tracking infrastructure where appropriate,
but keep a separate parcel-tracking truth model.

Parcel tracking may share:
- location and event infrastructure
- transport layers
- visibility components

Parcel tracking must not be collapsed into:
- taxi tracking
- driver-trip completion truth
- passenger-journey state meaning

This is the core boundary for parcel live visibility.

---

## Relationship to Shared Realtime Infrastructure

Approved direction:
- shared realtime infrastructure may distribute parcel updates
- shared maps, location freshness, and event transport may still be reused
- parcel-tracking semantics remain owned by the parcel domain

Important rule:
- transport reuse does not authorize copying customer passenger-tracking rules
  directly into parcel delivery behavior

---

## Visibility Boundary

Parcel proof and tracking visibility must remain scope-aware.

Baseline direction:
- tenant-side operational users may see parcel proof and tracking only where
  their role and tenant scope allow it
- driver visibility is limited to assigned parcel-job execution context
- customer or recipient visibility is not assumed universally and must be
  separately approved by later flow documentation

This prevents parcel visibility from becoming broader than the approved actor
model.

---

## Audit Requirements

Parcel proof capture and stronger-proof outcomes are audit-sensitive.

Minimum approved direction:
- proof outcome changes must remain attributable
- failed-delivery and return-direction outcomes must remain reviewable
- stronger-proof enablement changes must remain auditable as governance actions

Detailed audit event catalogs remain later work.

---

## Data Model Links

This contract assumes the platform may later need records for:
- parcel tracking state or visibility context
- delivery-attempt outcome records
- proof artifacts or placeholders
- stronger-proof policy flags
- recipient identity or handover confirmation context

Exact schema design remains open.

---

## Security / Tenancy Rules

1. Parcel proof and tracking remain tenant-scoped.
2. Stronger-proof policy must not be widened by tenant roles that lack the
   approved authority.
3. Recipient identity and proof artifacts must not be exposed outside the
   authorised parcel context.
4. Module enablement does not by itself grant access to proof-sensitive data.
5. Shared tracking infrastructure must still respect parcel-domain ownership
   and tenant scope.

---

## Failure / Exception Rules

- if proof capture fails or remains incomplete, the system must not pretend a
  successful delivery outcome exists
- if stronger proof is required, weaker proof must not silently substitute for
  it
- if delivery fails, the failed-delivery reason and follow-on direction must
  remain explicit
- if later requirements need richer signature, media, or identity-validation
  rules, docs must expand before implementation

---

## Stop Conditions

Stop and clarify before implementation if:
- proof-of-delivery is being treated as equivalent to ride completion
- parcel tracking is being copied directly from passenger tracking
- OTP or stronger handover rules are being invented without the documented
  authority boundary
- proof-sensitive data is being exposed as a generic operational detail
