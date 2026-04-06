# Data Model

## Source of Truth

The canonical data model is defined in:

```text
backend/prisma/schema.prisma
```

That file is the implementation-ready source of truth. Any discrepancy between this
document and the Prisma schema must be resolved in favour of the Prisma schema.

---

## Multi-Tenancy Strategy

- single database
- shared tables
- strict tenant isolation via `tenantId` on every model except `Tenant` itself
- all queries must filter by `tenantId` — no exceptions

---

## Core Models

| Model | Purpose |
| --- | --- |
| Tenant | A taxi or private hire business using GreenRide |
| TenantConfig | Per-tenant feature and behaviour configuration |
| User | Platform and tenant users (all roles) |
| Driver | Driver profile linked to a User |
| Vehicle | Fleet vehicle belonging to a tenant |
| Route | Named fixed routes with optional fixed pricing |
| Quote | A generated price quote for a journey |
| Booking | A confirmed customer booking |
| PricingRule | Tenant pricing configuration (category-aware) |
| DispatchJob | A dispatch assignment linking a Booking to a Driver |

---

## Key Enums

| Enum | Values |
| --- | --- |
| TenantStatus | created, setup_in_progress, ready_for_testing, live, suspended |
| UserRole | super_admin, tenant_owner, tenant_admin, dispatcher, office_staff, driver, customer |
| BookingStatus | draft, quoted, vehicle_selected, confirmed, awaiting_dispatch, assigned, driver_en_route, arrived, in_progress, completed, cancelled, exception |
| VehicleCategory | saloon, estate, mpv, executive, minibus, accessible |
| TripType | one_way, return_trip, hourly, multi_stop |
| PricingModel | fixed_route, distance_based, time_based, combined, hourly |
| DispatchMode | manual, automatic, hybrid |
| DispatchJobStatus | awaiting_dispatch, offered_to_driver, assigned, driver_accepted, driver_rejected, timed_out, cancelled, completed, exception |

---

## Rules

- every table must include `tenantId` (except `Tenant`)
- no cross-tenant queries allowed
- indexes required on `tenantId` for all tenant-scoped models
- if a required field is missing for a feature — stop and add it to the schema first, do not invent fields in code

---

## Important Rule

Do not use this document as implementation reference.

Read `backend/prisma/schema.prisma` directly for field names, types, and relations.
