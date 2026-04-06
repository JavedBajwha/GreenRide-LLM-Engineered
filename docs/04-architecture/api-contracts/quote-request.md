# Quote Request API Contract

> **Superseded notice:** The endpoint path in this document has been updated.
> The path `POST /api/v1/quotes/search` is retired.
> The canonical path is `POST /api/booking/quote` as defined in
> `docs/06-implementation/search-and-quote-canonical-spec.md`.

## Endpoint

POST /api/booking/quote

## Request

Fields:

- tenantId (uuid, required)
- pickupLocation (string, required)
- dropoffLocation (string, required)
- pickupAt (ISO-8601 datetime string, required)
- tripType (one_way | return_trip | hourly | multi_stop, default: one_way)
- passengerCount (integer, default: 1)
- luggageCount (integer, default: 0)
- vehicleCategory (optional)

> `pickupDate` and `pickupTime` as separate fields are retired. Use `pickupAt`.
> `tenantContext` as a field name is retired. Use `tenantId`.

## Response

Returns:

- success (boolean)
- quotes (array of quote objects), each containing:
  - id
  - tenantId
  - vehicleCategory
  - pickupLocation
  - dropoffLocation
  - pickupAt
  - estimatedPrice
  - estimatedDistanceMiles
  - estimatedDurationMinutes
  - pricingSource

## Rules

- frontend and backend must follow this structure
- do not rename fields
- do not remove tenant context

## Purpose

Prevents API mismatch between frontend and backend.
