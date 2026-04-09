# Migration Strategy

## Purpose

This document defines how GreenRide should handle schema and structural migrations during controlled AI-assisted implementation.

## Current Status

- the Prisma schema exists in `backend/prisma/schema.prisma`
- no committed Prisma migration history is present in this repository yet
- schema changes must therefore be treated as deliberate contract changes, not casual edits

## Rules

1. Do not change the schema first and explain it later.
2. Any schema change must be backed by updated documentation before runtime work continues.
3. When database migrations begin, they must be generated from approved schema changes and committed intentionally.
4. If a feature depends on a new table, field, enum, or relation, update the relevant architecture and implementation docs before creating the migration.
5. Do not invent migration naming conventions or rollout rules on the fly.

## Practical Guidance

- for now, treat schema changes as part of controlled slice planning
- keep `backend/prisma/schema.prisma` aligned with the documented data model
- add migration files only after the next schema-affecting slice is approved

## Stop Condition

If a requested feature needs schema changes but the required contract is missing or conflicting, stop and resolve the docs first.
