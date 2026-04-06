# Data Model (Implementation Ready - v1)

## Purpose

Defines the database structure for GreenRide in a way that is safe for implementation.

This version expands the earlier conceptual model into something closer to a real schema.

---

## Multi-Tenancy Strategy

- single database
- shared tables
- strict tenant isolation via `tenant_id`

---

## Core Entities

### Tenant
- id (uuid)
- name (string)
- slug (string, unique)
- created_at (timestamp)
- updated_at (timestamp)

---

### User
- id (uuid)
- tenant_id (uuid)
- role (enum)
- name (string)
- email (string, unique per tenant)
- created_at
- updated_at

---

### Booking
- id (uuid)
- tenant_id (uuid)
- customer_id (uuid)
- pickup_address (string)
- dropoff_address (string)
- pickup_datetime (timestamp)
- status (enum)
- total_price (decimal)
- created_at
- updated_at

---

### Driver
- id (uuid)
- tenant_id (uuid)
- name (string)
- status (enum)
- created_at
- updated_at

---

### Vehicle
- id (uuid)
- tenant_id (uuid)
- type (string)
- capacity (int)
- created_at
- updated_at

---

## Relationships

- Tenant → Users (1:N)
- Tenant → Bookings (1:N)
- Tenant → Drivers (1:N)
- Tenant → Vehicles (1:N)

- Booking → Driver (optional)
- Booking → Vehicle (optional)

---

## Enums (Baseline)

### BookingStatus
- draft
- quoted
- confirmed
- assigned
- in_progress
- completed
- cancelled

### UserRole
- super_admin
- tenant_admin
- dispatcher
- driver
- customer

---

## Rules

- every table MUST include tenant_id (except Tenant)
- no cross-tenant queries allowed
- indexes required on tenant_id
- all relations must include tenant constraint

---

## Important Implementation Rule

If a required field is missing for a feature:
→ STOP and define it here first

Do NOT invent fields in code.

---

## Next Upgrade

This model will evolve into a full Prisma schema in the next step.
