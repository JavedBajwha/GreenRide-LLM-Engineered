# GreenRide LLM Engineered

GreenRide is a multi-tenant taxi and private hire SaaS platform.

This repository is the active working repo for **LLM-engineered implementation**. It combines:

- architecture and product documentation imported from the earlier clean docs repo
- implementation control documents to reduce AI drift
- the future backend, frontend, and infrastructure codebase

## Repository Intent

This repo exists to make GreenRide buildable by AI coding agents without losing architectural control.

The earlier documentation set was strong for product and system understanding, but too loose for deterministic implementation. This repo keeps the good material and adds stricter execution guidance.

## Imported From

Primary source imported into this repo:
- `JavedBajwha/GreenRide_Docs_Clean`

That repo remains preserved as a historical and architectural reference.
This repo is now the main working space.

## Start Here

Read these first, in order:

1. `docs/00-overview/README.md`
2. `docs/00-overview/current-state.md`
3. `docs/00-overview/doc-map.md`
4. `docs/00-overview/working-rules.md`
5. `docs/00-overview/implementation-rules.md`
6. `docs/00-overview/ai-stop-rules.md`
7. `docs/06-implementation/README.md`
8. `context.md`

## Repository Structure

### Architecture and Product Docs
- `docs/00-overview/` → control files, navigation, operating rules
- `docs/01-product/` → product capabilities, feature mapping, domain logic
- `docs/02-applications/` → customer, driver, and admin application docs
- `docs/03-platform/` → platform and API-level architecture
- `docs/03-services/` → cross-cutting services
- `docs/04-architecture/` → service boundaries, data model, environments
- `docs/05-frontend/` → frontend architecture, UI rules, component design
- `docs/assets/ui/` → approved visual references

### Implementation Control Docs
- `docs/06-implementation/` → repo structure, environment contract, migration strategy, slice execution rules

### Code Areas
- `backend/` → API, services, data access, background jobs
- `frontend/` → user-facing web apps and shared frontend packages
- `infrastructure/` → Docker, local environments, deployment scaffolding

## Current Goal

The immediate goal is to convert the existing architecture docs into implementation-safe guidance, beginning with:

- stricter rules for AI coding agents
- environment and dependency contracts
- migration strategy
- repo structure
- Search & Quote as the first controlled build slice

## Operating Principle

If a required contract is missing, ambiguous, or contradicted by another document:

**Stop, flag it, and resolve it before coding.**

AI agents must not silently invent:

- database fields
- API behaviours
- tenant isolation rules
- role permissions
- pricing logic
- dispatch states
- file structures
- infrastructure defaults

## Summary

GreenRide-LLM-Engineered is the active repo for controlled AI-assisted implementation.
It keeps the earlier design work, adds missing execution constraints, and becomes the main source of truth for future build work.
