# Current State

## Repository Status

GreenRide is in **active implementation**.

The first backend slice (Search & Quote) is complete and pushed to `main`.

---

## What Is Complete

### Search & Quote backend slice

- canonical backend file structure in place, all exploratory files removed
- `POST /api/booking/quote` — working endpoint
- Prisma schema covering all core entities (Tenant, User, Driver, Vehicle, Route, Quote, Booking, PricingRule, DispatchJob)
- 11 decisions approved and logged (001–011a)
- coding freeze lifted (`freeze-lift.md`)
- zero TypeScript errors

---

## What Is Still Being Built

In priority order:

1. Auth — JWT, login, token middleware, role resolution
2. Tenant onboarding API
3. Booking confirmation (quote → booking)
4. Driver flows
5. Dispatch system
6. Payments
7. Notifications
8. Frontend — customer app, admin/dispatch app, driver app
9. Infrastructure

---

## Known Gaps Requiring Input Before Next Slice

1. **UI mockup assets** — `docs/assets/ui/` folder referenced throughout docs but images not yet in repo
2. **Frontend tech stack** — framework, CSS, state management not yet decided
3. **RBAC document** — referenced by 7 docs but does not exist yet

---

## What Is Still Strong From Before

- product scope and feature coverage
- customer, driver, and dispatch application understanding
- platform concepts (multi-tenancy, tenant configuration)
- UI direction and screen mapping (once assets are added)
- high-level system relationships

---

## Current Build Focus

Next slice to prepare: **Auth** (JWT login, middleware, role resolution).

Must be documented and contracted before coding begins.
