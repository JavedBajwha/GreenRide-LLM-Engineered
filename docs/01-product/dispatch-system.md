# Dispatch System

## 1. Purpose

The Dispatch System is responsible for assigning bookings to drivers and managing the operational flow between booking confirmation and trip completion.

It is one of the most important operational parts of GreenRide because it connects:

- customer bookings
- available drivers
- vehicle suitability
- live operations
- tenant-specific dispatch rules

The dispatch system must support both manual and automatic assignment so that taxi companies can operate efficiently while still allowing human control when needed.

---

## 2. Why the Dispatch System Matters

A taxi platform is not complete when a booking is created.  
A booking only becomes operationally useful when it is successfully assigned to the right driver at the right time.

The dispatch system exists to ensure that:

- bookings are assigned reliably
- suitable drivers are selected
- dispatch staff can intervene when needed
- the platform can support both simple and advanced operational models
- tenant-specific business rules are respected

Without a defined dispatch system, driver assignment becomes inconsistent, slow, and difficult to scale.

---

## 3. Core Responsibilities

The dispatch system is responsible for:

- identifying which bookings need assignment
- identifying which drivers are available and eligible
- supporting assignment decisions
- recording assignment state changes
- supporting reassignment where needed
- exposing operational visibility to dispatch users
- respecting tenant-specific assignment rules
- working with realtime updates where live tracking is enabled

It is not responsible for core booking creation or full pricing calculation, though it depends on booking and pricing information.

---

## 4. Dispatch Modes

GreenRide should support at least two dispatch modes.

### 4.1 Manual Dispatch

A dispatcher manually selects a driver for a booking.

Used when:

- tenant prefers human control
- VIP or sensitive jobs require manual review
- the system cannot confidently auto-assign
- exceptions need operator judgement

### 4.2 Automatic Dispatch

The platform selects a driver automatically using predefined tenant rules.

Used when:

- tenant wants faster assignment
- operations are large-volume
- booking rules are predictable enough for automation

### 4.3 Hybrid Dispatch

Most real-world tenants will need a hybrid model.

That means:

- platform attempts automatic assignment when possible
- dispatch staff can override, reassign, or intervene

This should be treated as the default practical model unless a tenant config explicitly limits behaviour.

---

## 5. Dispatch Inputs

The dispatch system requires inputs from multiple parts of the platform.

### Booking Inputs

From [[booking-service]]:

- booking id
- tenant id
- pickup time
- pickup location
- dropoff location
- vehicle class or required vehicle type
- booking status
- service notes
- passenger constraints where relevant

### Driver Inputs

From [[driver-app]] and operational services:

- driver id
- current status
- live location
- vehicle relationship
- eligibility / compliance status
- availability state
- shift / working state if supported

### Tenant Inputs

From [[tenant-configuration]]:

- dispatch mode
- eligibility rules
- preferred assignment logic
- manual override permissions
- service area restrictions
- priority rules

---

## 6. Dispatch Outputs

The dispatch system may produce:

- driver assignment
- assignment status update
- reassignment event
- dispatch alert
- operational queue change
- audit log entry
- notification trigger

These outputs may affect:

- [[admin-dispatch-system]]
- [[driver-app]]
- [[realtime-system]]
- [[notifications-and-integrations]]
- [[audit-logging]]

---

## 7. Eligibility Logic

Before a driver can be assigned, the driver must be considered eligible.

Eligibility may include:

- driver is active
- driver is not already blocked by another incompatible booking
- driver works for the same tenant
- driver has required vehicle type
- driver is within acceptable distance or service zone
- driver has valid compliance status
- driver has not exceeded tenant-specific limits

The precise selection logic may vary by tenant, but the concept of eligibility must always exist.

---

## 8. Assignment Strategy Examples

Tenant-specific strategies may include:

- nearest eligible driver
- highest rated available driver
- round-robin fairness model
- priority driver pool
- vehicle suitability first
- premium assignment rules for VIP bookings

These should not all be hardcoded globally.  
They should be shaped by [[tenant-configuration]].

---

## 9. Operational Visibility

Dispatch is not only an automation problem. It is also a visibility problem.

Dispatch users need to see:

- unassigned bookings
- assigned bookings
- bookings at risk
- available drivers
- busy drivers
- delayed pickups
- exceptions requiring intervention

This operational view belongs primarily in [[admin-dispatch-system]] but depends on dispatch state being well modelled.

---

## 10. Reassignment

The system must support reassignment.

Reassignment may be required if:

- driver rejects the job
- driver becomes unavailable
- driver is delayed
- dispatcher manually changes the assignment
- customer or operational changes invalidate the first assignment

Reassignment should be traceable and auditable.

---

## 11. State Considerations

Dispatch interacts with booking lifecycle.

Example assignment-related states may include:

- confirmed but unassigned
- assignment pending
- assigned
- driver acknowledged
- en route
- arrived

Precise booking state ownership should remain aligned with [[booking-service]], but dispatch-specific operational transitions must be represented consistently.

---

## 12. Failure Cases

The dispatch system must handle failure scenarios such as:

- no eligible driver found
- live driver data unavailable
- assignment conflict
- reassignment loop
- tenant rules impossible to satisfy
- delayed acknowledgement from driver

The platform must not silently fail in these cases.

Instead, it should:

- expose unassigned state clearly
- surface alerts where needed
- support manual intervention
- preserve auditability

---

## 13. Related Docs

This document connects strongly to:

- [[booking-service]]
- [[admin-dispatch-system]]
- [[driver-app]]
- [[realtime-system]]
- [[tenant-configuration]]
- [[rbac]]
- [[audit-logging]]

---

## 14. Summary

The Dispatch System is the operational engine that converts confirmed bookings into active service delivery.

It must:

- support manual and automatic assignment
- respect tenant-specific dispatch rules
- expose operational visibility
- support reassignment and intervention
- remain tightly connected to booking, driver, tenant, and realtime systems

This document defines the product-level dispatch behaviour.  
Detailed UI behaviour belongs in [[admin-dispatch-system]].  
Detailed service / implementation behaviour can later be expanded in architecture and operational docs.
