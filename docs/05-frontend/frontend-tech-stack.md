# Frontend Tech Stack

## Status

APPROVED for frontend implementation on 2026-04-07.

This document now defines the approved frontend stack for GreenRide.

---

## Approved Stack

The following choices are approved for AI-assisted frontend work.

### 1. Framework

- **Next.js** with App Router

### 2. Styling

- **Tailwind CSS**

### 3. Component Library

- **shadcn/ui**

### 4. State Management

- **TanStack Query** for server state
- **Zustand** for lightweight client state where needed

### 5. Package Manager

- **npm**

---

## Approved Summary

```text
Framework:          Next.js (App Router)
Language:           TypeScript
Styling:            Tailwind CSS
Component library:  shadcn/ui
Server state:       TanStack Query
Client state:       Zustand (where needed)
Package manager:    npm
```

## Why This Stack

- consistent with the existing backend package manager and lockfile
- well-suited for multi-tenant branding (Tailwind tokens per tenant)
- strong TypeScript support end to end
- widely supported by AI coding agents
- production-proven for SaaS platforms

---

## Rule

Frontend files may now be created using this stack.

If a future change needs a different framework, styling system, or package manager, this
document must be updated first.
