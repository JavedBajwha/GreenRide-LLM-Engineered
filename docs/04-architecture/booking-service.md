# Booking Service (Implementation View)

## Purpose

Defines how booking logic must be structured for implementation.

---

## Responsibilities

Booking Service is responsible for:
- creating bookings
- managing booking lifecycle
- storing booking data

It must not calculate pricing internally.

---

## Dependencies

- Pricing Engine
- Availability Service
- Notification Service

---

## Flow

1. receive quote request
2. call pricing engine
3. return quote
4. create booking on confirmation
5. assign driver
6. emit events

---

## Events

- booking_created
- booking_confirmed
- driver_assigned
- trip_started
- trip_completed

---

## Rules

- follow defined booking lifecycle
- keep pricing external
- do not mix responsibilities

---

## Important Rule

If behaviour is unclear, stop and check related docs before coding.
