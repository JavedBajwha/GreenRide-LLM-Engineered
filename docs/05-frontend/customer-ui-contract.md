# Customer UI Contract

## Purpose

Define the first-pass UI contract for the Customer surface in GreenRide.

This document exists to prevent:
- overcomplicating the customer experience with admin-style UI
- inventing unsupported customer account screens
- mixing public booking flow and authenticated customer account behavior carelessly

---

## Status

Draft, approved as the current documentation direction.

---

## Scope

This document covers:
- purpose of the surface
- primary users
- main jobs to be done
- top-level navigation
- dashboard behavior
- key page families
- module-gating behavior
- responsive behavior
- empty, loading, and error states

---

## Out of Scope

This document does not define:
- exact booking-form interaction details
- quote/pricing logic
- detailed live-tracking implementation
- final visual layout assets

Those belong in booking and later frontend-detail contracts.

---

## Primary Users

- guest customer for public entry points
- `customer` for authenticated account areas

---

## Main Jobs To Be Done

- search and quote
- booking creation
- booking tracking
- booking history
- account and profile management

---

## Top-Level Navigation

Approved first navigation groups:
- book
- track
- bookings
- saved locations
- profile

Public entry remains simple.
Authenticated account navigation appears only where relevant.

---

## Dashboard / Landing Behavior

Customer landing behavior should focus on:
- next trip
- active trip tracking
- recent bookings
- saved locations
- quick rebook or quick booking actions

The customer area should feel personal and task-driven, not analytical.
Saved locations remain booking-convenience data here, not customer-defined pricing or route-rule logic.

---

## Key Page Families

- public booking entry
- search and quote
- quote results and selection
- booking details
- payment
- confirmation
- trip tracking
- customer home
- booking history
- saved locations
- profile

Page-family guardrail:
- public booking pages and authenticated customer-account pages may feel visually related, but they must still preserve their distinct route ownership and customer-context meaning
- recovery, expired-session, and unavailable states must return the user to the correct customer or public page family rather than dropping them into an unrelated surface shell

---

## Module-Gating Behavior

- customer-facing baseline booking and account functions remain core
- optional modules may influence available actions, such as invoice access or embedded booking variations
- saved locations may speed booking entry, but they must not silently become pricing-aware custom routes in the customer surface
- gated capabilities must fail cleanly without exposing broken routes

---

## Responsive Behavior

- mobile-priority
- tablet-safe
- desktop-capable

Booking and tracking flows must remain strong on phone-sized screens.

---

## Empty, Loading, and Error States

- empty booking history should explain that no bookings exist yet
- loading states should preserve booking progress context
- expired-session, booking-not-found, and restricted-access states must be explicit
- tracking views must explain stale or unavailable live updates rather than silently degrading
- booking-not-found should preserve whether the user came from public tracking, customer history, or a direct reference path instead of collapsing into one generic error

---

## Related Documents

- `docs/05-frontend/role-app-surface-map.md`
- `docs/05-frontend/frontend-route-inventory.md`
- `docs/05-frontend/ui-shell-and-navigation-model.md`
- `docs/01-product/custom-routes-and-saved-locations.md`
- `docs/02-applications/customer-app.md`

---

## Stop Conditions

Stop and clarify before implementation if:
- customer and tenant/admin flows begin to merge
- the customer surface stops being mobile-priority
- public and authenticated customer flows become indistinguishable without explicit routing rules
