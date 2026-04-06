# Quote Request API Contract

## Endpoint
POST /api/v1/quotes/search

## Request

Fields:
- pickupLocation
- dropoffLocation
- pickupDate
- pickupTime
- tripType
- passengerCount
- luggageCount
- tenantContext

## Response

Returns:
- requestId
- tenantContext
- journey details
- quoteOptions list

## Rules

- frontend and backend must follow this structure
- do not rename fields
- do not remove tenant context

## Purpose

Prevents API mismatch between frontend and backend.
