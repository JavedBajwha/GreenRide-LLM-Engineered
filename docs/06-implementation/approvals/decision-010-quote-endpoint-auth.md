# Decision 010 Approval

## Decision ID
010

## Title
Authentication Requirement for the Quote Endpoint

## Previous Status
open (flagged as blocking gap — security model undefined for this endpoint)

## New Status
approved

## Approved By
Human architect / owner

## Decision

`POST /api/booking/quote` is a **publicly accessible endpoint**.

Authentication is **not required** to request quotes.

The endpoint must be usable by:
- guest customers with no account (no token)
- authenticated users who supply a valid bearer token (token accepted but not required)
- any caller with a valid tenantId (tenant context always required)

## Auth Rule for This Slice

| Caller type | Token required | Allowed |
|---|---|---|
| Guest / unauthenticated | No | Yes |
| Authenticated user with token | No (optional) | Yes |
| Any caller with valid tenantId | — | Yes |

The bearer token, if present, may be validated and attached as user context
for logging or future traceability. It must not block the request if absent.

## Tenant Validation Rule

The `tenantId` field in the request body is **always required** and must be
validated against the database before quote generation proceeds.

Specifically, the booking service (or a tenant validation step in the controller)
must confirm that a Tenant record with the supplied ID exists and has a status of
`live` before invoking pricing.

If the tenant does not exist or is not `live`, the endpoint must return:

```json
{
  "success": false,
  "error": "Tenant not found or not active"
}
```

with HTTP status **404**.

## Reason
- supports guest booking flow as defined in tenant-configuration.md
- does not block customers who have not yet created an account
- still enforces tenant boundary via tenantId validation
- keeps Search & Quote usable during tenant onboarding and testing phases
- consistent with `guestBookingEnabled` flag in TenantConfig model

## Impact
- canonical structure: no
- cleanup plan: no
- implementation spec: yes — `booking.controller.ts`, `booking.routes.ts`

## Canonical Rule

```text
POST /api/booking/quote does not require a bearer token.
Any caller may request quotes provided they supply a valid, active tenantId.
The tenantId must be validated against a live Tenant record before proceeding.
An absent or invalid token must never block the request.
```

## Effect on Implementation

- `booking.routes.ts`: no auth middleware on this route for this slice
- `booking.controller.ts`: validate tenantId resolves to a live tenant before calling service
- `.env.example`: JWT_SECRET is not required for this slice (not blocked by auth gap)
- `tenant.service.ts`: must expose a `validateTenant(tenantId)` function for use by the controller

## Scope Boundary

This decision applies only to the Search & Quote slice.

Future slices involving booking confirmation, payment, and dispatch will
define their own authentication requirements separately.

## Controlled AI Rule
Any AI system must treat this endpoint as public for the Search & Quote slice.
It must not add a mandatory auth middleware to this route without a superseding approved decision.
It must always include tenant validation before proceeding with quote generation.
