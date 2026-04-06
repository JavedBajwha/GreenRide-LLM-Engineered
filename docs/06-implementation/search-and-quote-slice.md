# Search & Quote Slice (Implementation)

## Goal

Build the first working vertical slice of GreenRide.

---

## Scope

- Search form UI
- Quote API call
- Quote results display

---

## Frontend

Components:
- SearchQuoteForm
- QuoteResultCard
- SearchQuotePage

---

## Backend

Endpoint:
POST /api/v1/quotes/search

---

## Data Flow

Form → API → response → map → UI

---

## Rules

- follow API contract exactly
- no hardcoded data once API exists
- no UI guessing

---

## Stop Conditions

If missing:
- API field
- response field
- pricing logic

→ STOP

---

## Output

Working Search & Quote flow.
