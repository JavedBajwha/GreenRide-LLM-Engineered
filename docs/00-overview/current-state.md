# Current State

## Repository Status

GreenRide is in **active implementation**.

The first backend slice (Search & Quote) remains the canonical implemented backend slice.
The repository has also been refreshed for AI build readiness documentation.

---

## What Is Complete

### Search & Quote backend slice

- canonical backend file structure in place, all exploratory files removed
- `POST /api/booking/quote` exists as the first canonical endpoint
- Prisma schema covering all core entities (Tenant, User, Driver, Vehicle, Route, Quote, Booking, PricingRule, DispatchJob)
- 11 decisions approved and logged (001–011a)
- coding freeze lifted (`freeze-lift.md`)
- AI entry guidance, environment contract, and service navigation docs are now present

---

## What Is Ready For AI Work

1. documentation maintenance and decision capture
2. backend slice-by-slice continuation once the local workspace is re-validated
3. frontend scaffolding using approved frontend architecture and stack docs
4. auth planning and contract work

---

## What Is Not Yet Ready

1. Pixel-accurate frontend implementation for screens without a named mockup asset — only the named baseline screens in `docs/assets/ui/` are asset-backed today
2. Docker, CI, and deployment automation — these are not scaffolded yet
3. Any claim that the repo is clean, passing, or build-ready without fresh validation

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

1. **UI mockup coverage** — named baseline images now exist in `docs/assets/ui/`, but screens without a named asset still cannot claim exact visual matching
2. **Production and deployment contract** — Docker, CI, and deployment automation are still future work
3. **Environment-specific database credentials** — local `DATABASE_URL` values must match the actual developer database

---

## What Is Still Strong From Before

- product scope and feature coverage
- customer, driver, and dispatch application understanding
- platform concepts (multi-tenancy, tenant configuration)
- UI direction, screen mapping, and named baseline mockup references
- high-level system relationships

---

## Current Build Focus

Next slice to prepare: **Auth** (JWT login, middleware, role resolution).

Must be documented and contracted before coding begins.
