# API Architecture

## Purpose

Defines how services communicate in GreenRide.

---

## Principles

- REST-based APIs
- tenant-aware endpoints
- secure authentication

---

## Rules

- every endpoint must enforce tenant context
- request and response must follow defined contracts
- no hidden fields or undocumented behaviour

---

## Example

POST /api/booking/quote

Used for Search & Quote flow.

> **Note:** The earlier path `POST /api/v1/quotes/search` is retired.
> Canonical path is defined in `docs/06-implementation/search-and-quote-canonical-spec.md`.
