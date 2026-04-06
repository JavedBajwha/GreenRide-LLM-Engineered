# Search & Quote Canonical Specification

## Status

This document is the canonical implementation specification for the Search & Quote slice.

It is a specification only.
It does **not** authorise coding by itself.

Coding remains frozen until cleanup mapping and execution rules are complete.

---

## Purpose

Define the exact responsibilities, contracts, file ownership, request schema, response schema, and stop conditions for the Search & Quote slice.

This document exists to prevent:
- duplicate implementations
- file naming drift
- route drift
- controller/service confusion
- response shape inconsistency
- uncontrolled AI coding

---

## Scope

This slice includes only:
- customer search request intake
- quote generation request validation
- pricing invocation
- quote response formatting

This slice does **not** include:
- booking confirmation
- payment
- dispatch
- driver assignment
- customer account creation
- route provider integration
- external maps integration

---

## Canonical Backend Files

Only the following backend files are allowed for this slice:

```text
backend/src/app.ts
backend/src/routes/index.ts
backend/src/modules/booking/booking.routes.ts
backend/src/modules/booking/booking.controller.ts
backend/src/modules/booking/booking.service.ts
backend/src/modules/booking/booking.schema.ts
backend/src/modules/pricing/pricing.service.ts
backend/src/lib/prisma.ts
```

No additional versioned alternatives are allowed.

Forbidden examples:
- `quote.controller.v2.ts`
- `quote.controller.v3.ts`
- `quote.routes.v2.ts`
- `quote.routes.v3.ts`
- `app.next.ts`
- `app.v2.ts`
- `app.v3.ts`

---

## Route Contract

### Canonical route

```text
POST /api/booking/quote
```

No alternative paths are allowed for this slice.

Forbidden examples:
- `/api/quote`
- `/api/v1/quotes/search`
- `/booking/quotes`

Those may be discussed later only if the API architecture is deliberately updated.

---

## Controller Responsibility

Canonical file:

```text
backend/src/modules/booking/booking.controller.ts
```

Controller responsibility is limited to:
- receiving HTTP request
- validating request body using canonical schema
- calling booking service
- returning canonical response shape
- mapping validation failure to HTTP 400
- mapping unexpected failure to HTTP 500

Controller must not:
- calculate price
- read pricing rules directly
- query vehicles directly
- implement business fallback logic
- build ad hoc response variants

---

## Service Responsibility

Canonical file:

```text
backend/src/modules/booking/booking.service.ts
```

Service responsibility is limited to:
- orchestrating quote generation flow
- reading eligible vehicle categories from tenant data
- calling pricing service for each category
- creating quote records if persistence is in scope
- returning canonical quote result objects

Service must not:
- parse raw HTTP request
- return Express response objects
- own schema validation
- embed pricing formula directly if pricing service owns it

---

## Pricing Responsibility

Canonical file:

```text
backend/src/modules/pricing/pricing.service.ts
```

Pricing service responsibility is limited to:
- reading pricing rule data
- applying pricing formula
- enforcing minimum fare
- applying vehicle category multiplier if part of approved model
- returning computed pricing result in canonical structure

Pricing service must not:
- read HTTP request objects
- mount routes
- create Express responses
- perform booking persistence

---

## Schema Responsibility

Canonical file:

```text
backend/src/modules/booking/booking.schema.ts
```

Schema responsibility is limited to:
- request validation shape
- type inference for validated input

Schema must not:
- import Prisma
- import controller
- import pricing service
- contain runtime business logic

---

## Request Schema (Canonical)

The canonical validated request object for Search & Quote is:

```json
{
  "tenantId": "uuid",
  "pickupLocation": "string",
  "dropoffLocation": "string",
  "pickupAt": "ISO-8601 datetime string",
  "tripType": "one_way | return_trip | hourly | multi_stop",
  "passengerCount": 1,
  "luggageCount": 0,
  "vehicleCategory": "optional"
}
```

### Field rules

- `tenantId` is required
- `pickupLocation` is required
- `dropoffLocation` is required
- `pickupAt` is required
- `tripType` defaults to `one_way` if omitted at schema level
- `passengerCount` defaults to `1` if omitted at schema level
- `luggageCount` defaults to `0` if omitted at schema level
- `vehicleCategory` is optional only if the service is allowed to return multiple categories

---

## Response Schema (Canonical)

The canonical HTTP 200 response is:

```json
{
  "success": true,
  "quotes": [
    {
      "id": "uuid",
      "tenantId": "uuid",
      "vehicleCategory": "saloon",
      "pickupLocation": "string",
      "dropoffLocation": "string",
      "pickupAt": "ISO-8601 datetime",
      "estimatedPrice": 25.0,
      "estimatedDistanceMiles": 10,
      "estimatedDurationMinutes": 20,
      "pricingSource": "pricing_rule_or_fallback"
    }
  ]
}
```

### Canonical error response (validation)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": []
}
```

### Canonical error response (unexpected)

```json
{
  "success": false,
  "error": "Failed to generate quotes"
}
```

No alternative top-level response shapes are allowed.

---

## Quote Generation Flow (Canonical)

```text
HTTP request
→ schema validation
→ booking controller
→ booking service
→ determine allowed vehicle categories
→ pricing service per category
→ optional quote persistence
→ canonical response mapping
→ HTTP response
```

No step may be skipped silently.

---

## Vehicle Category Rule

If tenant vehicles exist and active vehicle categories can be derived safely, those categories may be used.

If tenant vehicles do not exist yet, the fallback category behaviour must be explicitly documented before coding.

Until that fallback behaviour is formally approved, AI agents must not invent new category lists.

---

## Pricing Rule Ownership

The booking service does not own pricing mathematics.

The pricing service owns:
- base fare logic
- per-mile logic
- per-minute logic
- minimum fare enforcement
- category multiplier application

If pricing requirements expand, they must be added to `pricing.service.ts` spec, not improvised in booking service.

---

## Persistence Rule

Quote persistence is allowed only if explicitly kept in scope.

If quote persistence remains in scope, the service may create quote records using Prisma.

If the team later decides to make quotes ephemeral first, this document must be updated before changing behaviour.

No silent switch between persisted and non-persisted quote flows is allowed.

---

## Canonical Function Signatures

These are specification-level signatures only.

### booking.controller.ts

```ts
createQuote(requestBody: SearchQuoteRequest): Promise<SearchQuoteHttpResponse>
```

### booking.service.ts

```ts
generateQuotes(input: SearchQuoteInput): Promise<QuoteResult[]>
```

### pricing.service.ts

```ts
calculateQuotePrice(input: PricingInput): Promise<PricingResult>
```

### booking.schema.ts

```ts
searchQuoteSchema
SearchQuoteInput
```

These signatures may be adapted syntactically during implementation, but not semantically.

---

## File Mapping Rule

Exploratory files already created in the repo are **not canonical**.

They must be treated as reference material only until cleanup mapping is finalised.

No AI agent may choose between `v2`, `v3`, or `next` files independently.

Only the canonical names in this document are allowed for final implementation.

---

## Stop Conditions

AI agents must STOP immediately if any of the following happens:

1. a new versioned file name is proposed
2. a response shape differs from this document
3. the route path differs from this document
4. pricing logic appears in controller or route layer
5. booking service starts reading raw Express request objects
6. schema file contains business logic
7. fallback category behaviour is unclear
8. persistence behaviour is unclear
9. a required field is missing from request or response contract
10. a new file is created that is not listed in the canonical structure

---

## Implementation Order

When coding freeze is lifted, implementation order for this slice must be:

1. confirm canonical file mapping
2. clean duplicate exploratory files by mapping, not improvisation
3. define final `booking.schema.ts`
4. define final `pricing.service.ts`
5. define final `booking.service.ts`
6. define final `booking.controller.ts`
7. wire `booking.routes.ts`
8. wire `routes/index.ts`
9. wire `app.ts`
10. test only after all canonical files exist

---

## Final Rule

This document overrides exploratory code.

If code conflicts with this document, the code is treated as drift until formally reconciled.
