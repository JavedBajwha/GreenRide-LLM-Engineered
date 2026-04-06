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

1. draft
2. quoted
3. vehicle_selected
4. confirmed
5. assigned
6. in_progress
7. completed
8. cancelled

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
