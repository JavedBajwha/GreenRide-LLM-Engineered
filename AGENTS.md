# GreenRide Agent Guide

## Purpose

This repository is prepared for controlled AI-assisted implementation.
Documentation is the source of truth. If code and docs disagree, stop and resolve the conflict before building.

## Mandatory Read Order

1. `README.md`
2. `docs/00-overview/README.md`
3. `docs/00-overview/current-state.md`
4. `docs/00-overview/doc-map.md`
5. `docs/00-overview/working-rules.md`
6. `docs/00-overview/implementation-rules.md`
7. `docs/00-overview/ai-stop-rules.md`
8. `docs/06-implementation/README.md`
9. `docs/06-implementation/ai-build-readiness.md`
10. `docs/06-implementation/environment-contract.md`
11. `context.md`

## Current Repository Status

- The backend Search & Quote slice is the only implemented code slice.
- `frontend/` and `infrastructure/` are intentionally placeholders.
- Frontend scaffolding is allowed using the approved frontend stack and written UI contracts.
- Missing UI mockups only block pixel-accurate visual matching for the named screens in `docs/assets/ui/`.
- Build health must be re-validated against the current working tree before any AI claims the repo is clean or ready.

## Core Working Rules

- Do not invent fields, endpoints, roles, states, layouts, infrastructure defaults, or folders.
- Work one controlled slice at a time.
- Update docs when repository structure or implementation status changes.
- Do not scaffold frontend or infrastructure blindly.

## Safe Work Allowed Right Now

- documentation updates
- implementation planning and decision capture
- backend work only when the target slice is documented and the local workspace has been re-validated
- frontend scaffolding and feature work that follows the approved frontend docs

## Stop Immediately If

- documents conflict
- required environment variables are undefined
- file placement is unclear
- the approved frontend stack is contradicted
- exact screen matching is required but the corresponding UI mockup asset is missing
