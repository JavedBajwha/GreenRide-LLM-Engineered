# Repository Structure

## Current Repository Layout

```text
backend/
  src/
  prisma/

frontend/
  README.md

infrastructure/
  README.md

docs/
  00-overview/
  01-product/
  02-applications/
  03-platform/
  03-services/
  04-architecture/
  05-frontend/
  06-implementation/
  assets/
```

## Notes

- `backend/` is the only active code area today.
- `frontend/` is ready to be scaffolded using the approved frontend stack.
- `infrastructure/` remains intentionally light until deployment automation is actually needed.
- Backend file ownership remains governed by `final-backend-structure.md`.

## Rule

AI must not create new top-level folders.

## Controlled Expansion Rules

1. Frontend scaffolding must follow `docs/05-frontend/frontend-tech-stack.md`, `docs/05-frontend/frontend-architecture.md`, and `docs/05-frontend/ui-screen-map.md`.
2. Infrastructure files should be added only when deployment or orchestration work is intentionally started.
3. If the repository structure changes, update this file, `README.md`, and `docs/00-overview/current-state.md` in the same change.
