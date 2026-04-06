# Customer Booking Flow (Full)

## Purpose
Defines the complete end-to-end customer booking journey for GreenRide.

This document connects UI, logic, API, and state into one continuous flow.

---

## 1. Full Flow Overview

Search → Quote → Vehicle Selection → Passenger Details → Extras → Payment → Confirmation → Tracking

---

## 2. Step 1: Search & Quote

### User Actions
- enter pickup/dropoff
- select date/time
- set passengers/luggage
- click search

### System
- validate input
- call pricing service
- return vehicle options

### Output State
- quote results

---

## 3. Step 2: Vehicle Selection

### User Actions
- review vehicle options
- select one

### System
- store selected vehicle
- update summary

### Output State
- vehicle_selected

---

## 4. Step 3: Passenger Details

### User Actions
- enter name
- phone
- email
- optional notes

### System
- validate fields
- attach to booking draft

### Output State
- details_added

---

## 5. Step 4: Extras

### User Actions
- select extras (child seat, meet & greet, etc.)

### System
- recalculate price
- update summary

### Output State
- extras_added

---

## 6. Step 5: Payment

### User Actions
- choose payment method
- confirm payment

### System
- create booking record
- call payment service

### Output State
- paid / pending

---

## 7. Step 6: Confirmation

### System
- generate booking ID
- show summary
- send notifications

### Output State
- confirmed

---

## 8. Step 7: Tracking

### User Actions
- view driver details
- track vehicle

### System
- update status in real-time
- push notifications

### Output State
- assigned → in_progress → completed

---

## 9. State Transitions

States are canonical — they match the `BookingStatus` enum in `backend/prisma/schema.prisma`.
Do not invent new states. All transitions must use the values below.

- draft
- quoted
- vehicle_selected
- confirmed
- awaiting_dispatch
- assigned
- driver_en_route
- arrived
- in_progress
- completed
- cancelled
- exception

---

## 10. Failure Scenarios

- pricing fails
- no vehicles available
- payment failure
- driver not assigned

System must allow retry or fallback.

---

## 11. Rules

- no step can be skipped
- booking must always have valid state
- price must always reflect latest selections

---

## Final Note

This document represents the complete customer journey.
All frontend, backend, and services must align with this flow.
