# Multi-Tenancy

## Purpose

GreenRide is a multi-tenant SaaS platform used by multiple independent taxi companies.

Each tenant operates independently while sharing the same platform.

---

## Core Definition

A tenant represents a single taxi or private hire business.

Everything belongs to a tenant:
- bookings
- drivers
- vehicles
- pricing
- customers
- configuration

---

## Core Principles

### 1. Strong Isolation

Tenant A must never access Tenant B data.

### 2. Shared Platform

All tenants use the same product core.

### 3. Tenant Customisation

Each tenant can configure:
- branding
- pricing
- fleet
- rules

---

## Rules

- every request must resolve tenant context
- all queries must include tenant filtering
- no cross-tenant data leakage

---

## Important

Tenant isolation is a critical system boundary.

Breaking this = system failure.
