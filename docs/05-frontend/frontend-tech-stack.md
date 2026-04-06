# Frontend Tech Stack

## Status

DECISION REQUIRED before frontend implementation begins.

This document must be completed and approved before any frontend code is written.

---

## Decision Needed

The following must be confirmed by the human architect before an AI agent can scaffold
or build any frontend code.

### 1. Framework

Options:

- **Next.js 14** (App Router) — recommended for multi-tenant SaaS; supports SSR,
  easy API routes, strong TypeScript support
- **Vite + React** — lighter, simpler, SPA only; good for a pure client-side app
- **Remix** — strong data loading conventions, good for forms-heavy UX

### 2. Styling

Options:

- **Tailwind CSS** — recommended; utility-first, works well with component libraries,
  easy to theme per tenant
- **CSS Modules** — more verbose, no external dependency
- **Styled Components** — CSS-in-JS, adds bundle weight

### 3. Component Library

Options:

- **shadcn/ui** — recommended; built on Radix primitives, uses Tailwind, fully customisable,
  no opinionated design lock-in (good for tenant branding)
- **MUI** — full-featured but heavy and opinionated styling
- **Mantine** — good defaults, less customisable for branding

### 4. State Management

Options:

- **TanStack Query** (React Query) — recommended for server state; handles API calls,
  caching, and loading states cleanly
- **Zustand** — lightweight client state where needed alongside TanStack Query
- **Redux** — heavier, not needed for this scale

### 5. Package Manager

Options:

- **pnpm** — recommended; faster, better monorepo support
- **npm** — simpler, already used on the backend
- **yarn** — no specific advantage here

---

## Recommended Stack

If you want a recommendation:

```text
Framework:          Next.js 14 (App Router)
Language:           TypeScript
Styling:            Tailwind CSS
Component library:  shadcn/ui
Server state:       TanStack Query
Client state:       Zustand (where needed)
Package manager:    pnpm
```

This stack is:
- well-suited for multi-tenant branding (Tailwind tokens per tenant)
- strong TypeScript support end to end
- widely supported by AI coding agents
- production-proven for SaaS platforms

---

## Rule

No frontend files may be created until this document is updated with confirmed decisions
and approved by the human architect.

An AI agent must stop and flag this document as incomplete if asked to build frontend
code before these decisions are recorded here.
