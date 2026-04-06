# Feature Map

## Purpose

Defines all major capabilities of the GreenRide platform at a high level.

This file is the entry point for understanding what the system must do.

---

## Core Feature Areas

### Booking

- Search and Quote
- Booking creation
- Guest checkout
- Account-based booking
- Multi-stop and return journeys

---

### Customer

- Profile management
- Booking history
- Saved addresses
- Preferences

---

### Driver

- Job management
- Status updates
- Navigation support
- Availability tracking

---

### Dispatch

- Booking management
- Driver assignment
- Live operations monitoring
- Manual and auto dispatch

---

### Payments

- Card payments
- Cash payments
- Corporate billing
- Invoice handling

---

### Notifications

- Email notifications
- SMS notifications
- WhatsApp (optional)
- Booking lifecycle updates

---

### Platform

- Multi-tenancy
- Tenant configuration
- Feature flags
- Role-based access

---

## Important Rule

Every feature listed here must map to:
- a backend service or module
- a frontend screen or flow
- a data model representation

If a feature cannot be mapped to implementation, it must not be assumed during coding.
