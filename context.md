# GreenRide Context (MASTER FILE)

## Project Overview

GreenRide is a multi-tenant SaaS platform for taxi and private hire companies.
It includes customer booking, dispatch operations, driver workflows, payments, realtime tracking, notifications, tenant-aware configuration, and platform-level governance.

## Current Repository Role

This repository is the active **LLM-engineered working repo**.
It contains architecture documents, implementation control documents, and the live codebase.

## Current Phase

We are in **active implementation**.

The first backend slice — Search & Quote — is complete and live on `main`.

## What Is Built

### Backend — Search & Quote slice (complete)

- Express + TypeScript + Prisma backend scaffold
- Full database schema covering all core entities
- `POST /api/booking/quote` endpoint — fully operational
- Canonical file structure enforced, all exploratory files removed
- Zero TypeScript errors, passes type-check

### Files in place

```text
backend/src/app.ts
backend/src/main.ts
backend/src/routes/index.ts
backend/src/modules/booking/booking.controller.ts
backend/src/modules/booking/booking.routes.ts
backend/src/modules/booking/booking.schema.ts
backend/src/modules/booking/booking.service.ts
backend/src/modules/pricing/pricing.service.ts
backend/src/modules/tenant/tenant.service.ts
backend/src/lib/prisma.ts
backend/prisma/schema.prisma
```

## What Is Not Yet Built

- Tenant onboarding API
- Authentication and JWT
- RBAC enforcement middleware
- Booking confirmation (quote → confirmed booking)
- Driver app flows
- Dispatch system
- Payments
- Notifications
- Frontend (customer app, admin/dispatch app, driver app)
- Infrastructure (Docker, deployment)

## Build Order (Remaining)

1. Auth — JWT login, token middleware, role resolution
2. Tenant onboarding API — create and configure tenants
3. Booking confirmation — quote selection → confirmed booking
4. Driver flows — status, job acceptance, trip lifecycle
5. Dispatch — assignment, manual and auto modes
6. Payments — Stripe or equivalent integration
7. Notifications — email, SMS
8. Frontend — customer app, admin app, driver app
9. Infrastructure — Docker, CI/CD, environments

## Working Preferences

- step-by-step progress, one slice at a time
- no silent redesigns
- no assumption-heavy coding
- full decisions documented before coding
- preserve all terminology established in the docs

## Important Rule

If something necessary for implementation is missing, stop and flag it rather than guess.
