# System Map

## 1. Purpose

The system map provides a high-level view of how all major parts of GreenRide fit together.

It connects:

- product features
- applications
- platform services
- frontend structure
- UI system
- tenant configuration

This document helps readers understand the full system without needing to read every document in detail.

System context anchor for all docs.

---

## 2. Core System Hubs

The main documentation hubs are:

- [[feature-map]]
- [[dispatch-system]]
- [[pricing-engine]]
- [[booking-service]]

These connect the product, platform, and operational logic of GreenRide.

---

## 3. Applications Layer

This includes all main user-facing applications:

- [[customer-app]]
- [[driver-app]]
- [[admin-dispatch-system]]

Each application serves a different role but operates on the same platform.

---

## 4. Platform Layer

This layer defines the shared SaaS behaviour of the system:

- [[api-architecture]]
- [[multi-tenancy]]
- [[tenant-configuration]]
- [[tenant-onboarding]]
- [[platform-services]]
- [[rbac]]

RBAC defines role-based access across:
- platform-level users
- tenant-level users
- operational roles

---

## 5. Supporting Platform Systems

These systems support the operational behaviour of the platform:

- [[notifications-and-integrations]]
- [[payments-and-invoicing]]
- [[analytics-and-reporting]]
- [[realtime-system]]

---

## 6. Architecture Layer

These docs define the underlying system structure:

- [[data-model]]
- [[booking-service]]
- [[api-architecture]]
- [[component-architecture]]

---

## 7. Frontend & UI Layer (CRITICAL)

This layer defines how the system is presented to users.

### Core Docs

- [[frontend-architecture]]
- [[component-architecture]]
- [[ui-screen-map]]
- [[ui-assets-structure]]

### UI Assets

Stored in:

docs/assets/ui/

### What this layer defines

- screen layouts
- UI structure
- visual hierarchy
- interaction flows
- dashboard structures
- booking experience

### Important Rule

If a UI screen exists in:

→ [[ui-screen-map]]

Then:

- that mockup MUST be used as visual reference
- AI must NOT invent layout
- UI must align with mapped assets

---

## 8. Product Layer

These docs define the functional behaviour of the business:

- [[feature-map]]
- [[dispatch-system]]
- [[pricing-engine]]
- [[booking-domain]]

---

## 9. System Relationships (Simplified View)

Flow:

Customer App / Admin / Driver
        ↓
Frontend Architecture
        ↓
UI Screen Map + UI Assets
        ↓
API Architecture
        ↓
Booking Service + Pricing Engine + Dispatch
        ↓
Platform Services
        ↓
Multi-Tenancy + RBAC
        ↓
Data Model

---

## 10. Notes

Not every document needs heavy linking.

The priority is:

- clear system navigation
- strong architecture boundaries
- correct AI reading path
- meaningful Obsidian graph structure

Avoid:
- over-linking
- duplicate system definitions
- UI guesswork without references

---

## 11. AI Navigation Guide (UPDATED)

Start here if building GreenRide:

### Step 1 — Core Understanding

1. [[feature-map]]
2. [[system-map]]
3. [[customer-app]]

---

### Step 2 — Backend Core

4. [[booking-service]]
5. [[pricing-engine]]
6. [[dispatch-system]]

---

### Step 3 — Platform Foundation

7. [[multi-tenancy]]
8. [[rbac]]
9. [[tenant-configuration]]

---

### Step 4 — Architecture

10. [[api-architecture]]
11. [[data-model]]
12. [[realtime-system]]

---

### Step 5 — Frontend (MANDATORY FLOW)

13. [[frontend-architecture]]
14. [[component-architecture]]
15. [[ui-screen-map]]

Then:

→ check UI assets in `docs/assets/ui/`

---

### Rule

Frontend must NOT start before:

- system docs are understood
- UI screen map is reviewed

---

## 12. Summary

The system map is the central navigation hub of GreenRide.

It connects:

- product behaviour
- platform logic
- architecture structure
- frontend system
- UI reference layer

The addition of the UI layer ensures that:

- frontend implementation is controlled
- AI agents do not guess layouts
- system design and visual direction stay aligned

This document should always remain:

- clean
- structured
- and the primary entry point into the system
