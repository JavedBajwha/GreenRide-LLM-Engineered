# Final Backend Structure (Canonical)

This is the **single source of truth** for backend structure.

No alternative versions (v2, v3, next) are allowed.

---

## Root

```
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
```

---

## Rules

### 1. No Versioned Files

Forbidden:
- *.v2.ts
- *.v3.ts
- *.next.ts

---

### 2. Single Ownership

Each responsibility must exist in ONE place only:

| Responsibility | File |
|------|------|
| API entry | app.ts |
| Routing root | routes/index.ts |
| Booking controller | booking.controller.ts |
| Booking logic | booking.service.ts |
| Validation | booking.schema.ts |
| Pricing logic | pricing.service.ts |

---

### 3. Module Isolation

- booking module MUST NOT implement pricing logic
- pricing module MUST NOT access HTTP layer

---

### 4. Strict Imports

Allowed direction:

```
controller → service → prisma
controller → schema
service → pricing
```

Forbidden:

```
service → controller
schema → service
```

---

## Enforcement Rule

If any file is created outside this structure:

```
STOP → FLAG → DO NOT CONTINUE
```
