# Phase 7 Payments, Notifications, and Realtime Checklist

## Purpose

This checklist defines the main documentation work needed to make the Phase 7 service domain implementation-safe.

It exists to turn the current strong-but-fragmented service concepts into a focused working list instead of leaving payment, notification, realtime, and maps/address rules spread across booking, dispatch, and platform references.

---

## Scope

This checklist is limited to the service-domain wave covering:
- payments and invoicing contract tightening
- payment-method and currency strategy
- notifications and event ownership
- realtime event and fallback behavior
- maps, geolocation, ETA, and address strategy

It does not cover:
- full frontend visual detail for payment or notification UI
- reporting module detail
- deeper commercial packaging refinements beyond module references

Those stay in linked later phases even where they intersect.

---

## Current Domain Read

What already exists:
- payments and invoicing service doc
- notifications and integrations service doc
- realtime system service doc
- booking, dispatch, and tracking docs that already depend on these services

What is still missing or still too weak:
- one implementation-safe payments/invoicing contract
- one explicit payment-method and currency strategy
- one explicit notification event and ownership contract
- one explicit realtime event and fallback contract
- one coherent maps/geolocation/ETA/address strategy

The service domain is therefore important and widely referenced, but still not safe enough as a whole for implementation without further tightening.

---

## Phase 7 Main Work

| Item | Status | Why It Still Matters | Target Doc |
| --- | --- | --- | --- |
| Payments and invoicing contract tightening | partial | Canonical payment-path baseline now exists, but provider choice, detailed failure paths, refund policy, and invoicing/payment-method detail still need refinement | `docs/03-services/payments-and-invoicing.md` |
| Payment-method and currency strategy | partial | Canonical method/currency baseline now exists, but restriction matrices, provider/settlement detail, and any later multi-currency extension still need refinement | `docs/03-services/payment-method-and-currency-strategy.md` |
| Notifications and event ownership | partial | Canonical event-ownership and delivery-orchestration baseline now exists, but channel matrices, template/detail rules, and integration-pack boundaries still need refinement | `docs/03-services/notifications-and-integrations.md` |
| Realtime event and fallback contract | partial | Canonical source-of-truth, event-family, and degraded-fallback baseline now exists, but transport detail, payload design, and richer live-state policies still need refinement | `docs/03-services/realtime-system.md` |
| Maps, geolocation, ETA, and address strategy | partial | Canonical supporting-layer baseline now exists, but provider choice, schema detail, address-resolution mechanics, and richer ETA/route policy still need refinement | `docs/03-services/maps-geolocation-and-address-strategy.md` |

---

## Recommended Working Order

1. Payments and invoicing contract tightening
2. Payment-method and currency strategy
3. Notifications and event ownership
4. Realtime event and fallback contract
5. Maps, geolocation, ETA, and address strategy

This order keeps:
- money and booking-commitment logic first
- notification ownership second
- live transport and map/address dependencies after that

---

## Completion Rule

Phase 7 documentation should not be treated as substantially complete until:
- each item above has a canonical document or clearly upgraded canonical home
- payment, notification, realtime, and maps/address rules stop obvious AI guessing
- the master tracker, gap register, and coverage checklist are updated together

---

## Related Documents

- `docs/03-services/payments-and-invoicing.md`
- `docs/03-services/notifications-and-integrations.md`
- `docs/03-services/realtime-system.md`
- `docs/01-product/booking-creation-and-confirmation.md`
- `docs/01-product/customer-tracking-and-visibility.md`
- `docs/02-applications/dispatch-map-behavior.md`
- `docs/06-implementation/documentation-master-tracker.md`
- `docs/06-implementation/documentation-gap-register.md`
- `docs/06-implementation/required-documentation-coverage.md`
