# Final Backend Structure (Canonical)

This is the **single source of truth** for backend structure.

No alternative versions (v2, v3, next) are allowed.

---

## Root

```text
backend/
  src/
    app.ts
    main.ts
    routes/
      index.ts
    modules/
      booking/
        booking.controller.ts
        booking.service.ts
        booking.schema.ts
        booking.routes.ts
      pricing/
        pricing.service.ts
      tenant/
        tenant.service.ts
    lib/
      prisma.ts
  prisma/
    schema.prisma
```

---

## Rules

### 1. No Versioned Files

Forbidden:

- `*.v2.ts`
- `*.v3.ts`
- `*.next.ts`

### 2. Single Ownership

Each responsibility must exist in ONE place only:

| Responsibility | File |
| --- | --- |
| API entry | app.ts |
| Routing root | routes/index.ts |
| Booking controller | booking.controller.ts |
| Booking logic | booking.service.ts |
| Validation | booking.schema.ts |
| Pricing logic | pricing.service.ts |
| Tenant validation | tenant.service.ts |
| Prisma client | lib/prisma.ts |

### 3. Module Isolation

- booking module must not implement pricing logic
- pricing module must not access HTTP layer
- tenant module must not implement booking logic

### 4. Strict Imports

Allowed direction:

```text
controller → service → prisma
controller → schema
controller → tenant.service
service → pricing.service
```

Forbidden:

```text
service → controller
schema → service
pricing.service → booking.service
```

---

## Enforcement Rule

If any file is created outside this structure:

```text
STOP → FLAG → DO NOT CONTINUE
```
