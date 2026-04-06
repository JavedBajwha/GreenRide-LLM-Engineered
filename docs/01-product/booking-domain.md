# Booking Domain

## Purpose
Defines the core business logic for bookings, including lifecycle, pricing, and rules.

---

## 1. Core Entities

### Booking
- id
- tenant_id
- customer_details
- pickup_location
- dropoff_location
- datetime
- vehicle_type
- price
- status

### Pricing
- base_fare
- distance_rate
- time_rate
- surge_multiplier
- extras_cost

---

## 2. Booking Lifecycle

States match the canonical `BookingStatus` enum in `backend/prisma/schema.prisma`.

1. draft
2. quoted
3. vehicle_selected
4. confirmed
5. awaiting_dispatch
6. assigned
7. driver_en_route
8. arrived
9. in_progress
10. completed
11. cancelled
12. exception

---

## 3. Pricing Logic

### Formula
price = base_fare + (distance * distance_rate) + (time * time_rate)

### Modifiers
- peak hours → surge_multiplier
- weekend → surcharge
- airport → fixed fee

### Extras
- child seat
- extra luggage
- meet & greet

---

## 4. Booking Rules

- every booking belongs to one tenant
- every booking must have a valid state
- quoted price must be preserved at confirmation time
- booking changes after confirmation may trigger repricing depending on tenant rules

---

## 5. Failure Cases

- invalid route
- no vehicle available
- pricing unavailable
- payment failure

System must support retry or graceful fallback.

---

## 6. Implementation Note

Booking logic must remain consistent across:
- customer UI
- booking service
- pricing engine
- dispatch system
