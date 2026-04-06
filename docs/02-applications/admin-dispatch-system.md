# Admin Dispatch System

## Purpose
Defines the operational control system used by tenant staff to manage bookings, assign drivers, monitor live operations, and intervene when required.

This is the core business operations layer of GreenRide.

---

## 1. Dispatch Model

GreenRide uses a **hybrid dispatch model**.

This means the platform supports:
- automatic assignment based on rules
- manual dispatcher override
- operational intervention for edge cases

This model is required for real-world taxi and private hire operations.

---

## 2. Primary Goals

The Admin / Dispatch System must allow tenant staff to:
- view all active and upcoming bookings
- monitor driver availability and location
- assign or reassign bookings
- override automated decisions
- track booking lifecycle in real time
- manage operational exceptions
- maintain service quality during disruptions

---

## 3. Main Dispatch Views

### 1. Live Dispatch Dashboard
Core operational screen showing:
- active bookings
- unassigned bookings
- available / busy drivers
- priority alerts
- operational KPIs

### 2. Live Map View
Shows:
- driver locations
- pickup points
- active trip status
- route context where supported

### 3. Booking Queue View
Shows:
- new bookings awaiting action
- scheduled jobs
- unassigned jobs
- problem bookings

### 4. Driver Panel
Shows:
- online/offline status
- current job
- availability
- location freshness
- compliance / issue flags where relevant

### 5. Assignment Control Panel
Allows:
- manual assign
- reassign
- remove assignment
- override auto-dispatch decisions

### 6. Incident / Exception View
Tracks:
- late driver
- no available driver
- cancelled job
- failed contact
- customer complaint / issue escalation

---

## 4. Core Dispatch Flows

### Flow A: Auto-dispatch
1. Booking is confirmed
2. Dispatch rules evaluate candidate drivers
3. Best match is selected based on tenant rules
4. Driver receives job offer or assignment
5. Booking state updates
6. Dispatcher can still override if needed

### Flow B: Manual dispatch
1. Booking enters dispatch queue
2. Dispatcher reviews job details
3. Dispatcher chooses driver manually
4. Driver is assigned
5. Booking and driver states update

### Flow C: Reassignment
1. Original driver rejects, times out, goes offline, or is removed
2. Job returns to queue or auto-dispatch process
3. Dispatcher or system selects new driver
4. Notifications and audit trail update

### Flow D: Exception handling
1. Issue occurs during booking lifecycle
2. Booking is flagged in operational dashboard
3. Dispatcher intervenes
4. Resolution action is recorded

---

## 5. Assignment Rules

Dispatch assignment should consider configurable tenant rules such as:
- nearest available driver
- highest-rated driver
- round-robin fairness
- driver vehicle type match
- airport / area preference
- VIP / corporate priority
- scheduled-job suitability
- shift or service zone constraints

These rules must support both:
- automated ranking
- manual override

---

## 6. Dispatcher Actions

Required actions:
- assign driver
- reassign driver
- cancel booking where permitted
- mark issue / escalate
- contact driver
- contact passenger where permitted
- change booking priority
- override automated dispatch decision

Optional advanced actions:
- pin booking to dispatcher watchlist
- pause auto-dispatch for a booking
- bulk review scheduled jobs
- apply tenant-specific routing rules

---

## 7. Operational States

### Booking operational states
- new
- quoted
- confirmed
- awaiting_dispatch
- offered_to_driver
- assigned
- driver_en_route
- arrived
- in_progress
- completed
- cancelled
- exception

### Driver operational states
- offline
- available
- offered_job
- assigned
- en_route
- arrived
- on_trip
- paused

Dispatch UI must always reflect authoritative backend state.

---

## 8. Auto-Dispatch Logic

Auto-dispatch must be rules-based and deterministic.

### Example sequence
1. Filter candidate drivers by tenant
2. Filter by vehicle suitability
3. Filter by availability
4. Apply distance / zone rules
5. Apply priority rules
6. Rank candidates
7. Offer or assign job
8. Wait for acceptance where required
9. Re-run process on timeout or rejection

### Rules
- every decision must be explainable
- every dispatch action must be auditable
- dispatcher override must always be possible where tenant policy allows

---

## 9. Manual Override Rules

Dispatch staff must be able to override automation when:
- customer is VIP
- special handling is needed
- driver suitability requires human judgement
- traffic / location context makes automated choice weak
- driver fails to respond
- exception handling is underway

Manual override actions must be recorded in audit logs.

---

## 10. Real-Time Requirements

The dispatch system must update in real time for:
- new booking arrival
- driver acceptance / rejection
- driver status changes
- location updates
- trip status changes
- cancellations
- exceptions and alerts

Dispatchers must not need to manually refresh the page for core live operations.

---

## 11. Live Map Rules

The live map is a support tool, not the only source of truth.

It should display:
- active drivers
- assigned trip context
- booking pickup locations
- optional route visibility

Rules:
- stale location data must be clearly indicated
- map must support dispatcher decision-making, not replace booking list controls
- core dispatch controls must remain usable even if map fails or is hidden

---

## 12. Queue Management

Bookings should be visible in operational queues such as:
- new bookings
- awaiting dispatch
- scheduled upcoming
- urgent / priority
- exception queue
- no-driver-available queue

Queue prioritisation must be configurable per tenant.

---

## 13. Alerts and Exception Handling

System should surface operational alerts such as:
- no candidate driver found
- driver timeout
- booking close to pickup time but still unassigned
- driver location stale
- job at risk of SLA breach
- repeated reassignment

Dispatchers must be able to resolve, snooze, or escalate alerts depending on policy.

---

## 14. Audit Requirements

Every critical dispatch action must be auditable, including:
- who assigned a driver
- who changed assignment
- who cancelled a booking
- who applied override
- why an exception was resolved in a certain way

Audit trail is mandatory for operational accountability.

---

## 15. Role and Access Rules

Not every admin user should have the same powers.

Typical dispatch-related roles may include:
- Owner
- Tenant Admin
- Dispatcher
- Office Staff
- Read-only Operations Viewer

Permissions must control:
- assignment actions
- cancellation rights
- override rights
- visibility into sensitive booking data

---

## 16. Key Integrations

The Admin / Dispatch System depends on:
- Booking Service
- Pricing Service
- Driver App / Driver State
- Realtime Service
- Notification Service
- RBAC / Access Control
- Reporting / Audit Service

---

## 17. Failure Scenarios

The system must handle:
- no available driver
- driver rejects job
- driver goes offline after assignment
- location feed delay
- duplicate dispatcher actions
- race conditions between auto-dispatch and manual assignment
- booking edited after assignment
- cancellation during dispatch process

The backend must remain authoritative and prevent invalid state transitions.

---

## 18. UI/UX Principles

The dispatch system must feel:
- fast
- dense but readable
- high-control
- operationally trustworthy

It should follow your approved dashboard UI direction:
- data-first layout
- cards, tables, and live map panels
- premium SaaS styling
- clear status badges and action controls

The dispatch system is an operations tool, not a marketing page.

---

## 19. Final Rule

This document is the source of truth for tenant operational dispatch.
No dispatch dashboard, assignment logic, or live operations feature should be implemented unless it aligns with this model.
