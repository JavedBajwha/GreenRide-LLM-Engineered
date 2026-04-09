# Driver App (Full)

## Purpose
Defines the complete production-level driver application for GreenRide.

This app supports the operational journey from receiving jobs through trip completion, with real-time updates, navigation support, earnings visibility, and document/status management.

---

## 1. Driver App Goals

The Driver App must allow drivers to:
- receive new jobs in real time
- accept or reject jobs where allowed
- navigate to pickup and destination
- update trip status at each operational step
- view earnings and trip history
- manage profile, vehicle, and compliance documents where applicable

The Driver App is operational, not decorative.
It must prioritise clarity, speed, and real-time accuracy.

---

## 2. Primary Driver Journey

Available → Job Offered → Assigned → Driver En Route → Arrived → In Progress → Available

Secondary flows:
- rejected job
- no response timeout
- cancelled booking
- reassignment
- driver goes offline

---

## 3. Main Driver Screens

### 1. Authentication / Access
- login
- password reset or secure access method
- device/session validation if enabled

### 2. Driver Home / Status Screen
- current availability status
- quick view of active job
- next scheduled jobs
- earnings snapshot

### 3. Incoming Job Offer Screen
- pickup summary
- dropoff summary
- pickup time
- estimated fare or fare model
- time to accept
- accept / reject actions

### 4. Active Job Screen
- passenger name (if allowed)
- pickup details
- destination details
- trip notes
- status progression buttons
- call/message contact actions if permitted
- navigation launch action

### 5. Navigation / Route Support Screen
- navigation handoff support first, with embedded map support only if later explicitly approved
- ETA awareness
- reroute support where relevant

### 6. Earnings / History Screen
- completed trips
- daily or weekly earnings summary
- payout visibility where supported

### 7. Profile / Vehicle / Documents Screen
- driver profile
- assigned vehicle
- licence / insurance / badge expiry visibility if supported
- support contact or issue reporting

---

## 4. Core Functional Areas

### A. Job Intake
Driver must receive jobs quickly and clearly.

This includes:
- push or realtime job delivery
- clear countdown / response timing if the dispatch model requires acceptance
- obvious accept / reject interaction

### B. Status Updates
Driver must be able to move a job through operational states such as:
- accepted
- en route
- arrived
- trip started
- completed

These states must stay aligned with [[booking-service]] and [[dispatch-system]].

### C. Availability Control
Driver must be able to set availability states such as:
- offline
- available
- busy
- paused

Tenant-specific limitations may apply.

### D. Realtime Location
When enabled, the driver app is a major source of live operational data.

That means it should support:
- location updates
- trip progress context
- driver status freshness

### E. Operational Communication
Where allowed, the driver should have access to:
- passenger contact action
- dispatcher contact action
- issue escalation action

### F. Earnings and History
The app should support driver confidence by showing:
- completed trip list
- earnings summary
- trip details history
- adjustment or payout information if the business model includes it

---

## 5. Driver State Model

Driver app state should be consistent with operational dispatch.

Typical states include:
- offline
- available
- job_offered
- assigned
- driver_en_route
- arrived
- in_progress
- paused

These states must not become disconnected from backend truth.

---

## 6. Job Lifecycle Interaction

The driver app participates in the dispatch and trip lifecycle.

Example:
1. booking is assigned or offered
2. driver receives job
3. driver accepts or job times out
4. driver begins navigation to pickup
5. driver marks arrival
6. driver starts trip
7. driver completes trip
8. booking state, driver state, and realtime view update together

This means the app depends on:
- [[dispatch-system]]
- [[booking-service]]
- [[realtime-system]]

---

## 7. Rejection / Timeout / Cancellation Cases

The app must support failure and exception scenarios, including:
- driver rejects job
- driver does not respond in time
- job cancelled before pickup
- booking reassigned away
- navigation unavailable
- stale connectivity

The app must handle these safely and clearly.

It must not leave the driver in ambiguous state.

---

## 8. Connectivity Requirements

The Driver App is likely to be used in unstable network conditions.

Therefore it should aim for:
- resilient status updates
- retry-aware actions
- clear feedback when connectivity is weak
- local UI protection against duplicate taps / repeated action spam
- visible distinction between last-known local context and confirmed live platform acknowledgement when sync is uncertain

Exact offline strategy can be expanded later, but operational resilience must be part of the design.

---

## 9. Security and Access Considerations

The Driver App should follow the platform security model.

This includes:
- authenticated access
- driver identity verification
- tenant-scoped data only
- least-privilege access
- safe handling of passenger data

The driver should only see what is necessary to perform the trip.

---

## 10. UX Principles

The Driver App must feel:
- fast
- readable
- high-contrast where useful
- touch-friendly
- distraction-aware
- operationally trustworthy

It should not be overloaded with admin-style complexity.

The driver needs:
- clear next action
- clear status
- minimal friction
- strong real-time trust

---

## 11. Related Docs

This doc connects strongly to:
- [[dispatch-system]]
- [[admin-dispatch-system]]
- [[booking-service]]
- [[realtime-system]]
- [[notifications-and-integrations]]
- [[rbac]]

---

## 12. Summary

The Driver App is the operational mobile edge of GreenRide.

It turns dispatch decisions into real trip execution.

It must support:
- job intake
- status progression
- live operational awareness
- clear communication
- earnings visibility
- driver availability control

This document defines the complete functional scope of the driver application.
UI mockups, state diagrams, and technical architecture can expand from this foundation.
