# Component Architecture

## Purpose

Defines how frontend components must be structured for GreenRide.

---

## Core Principle

Separate:
- UI (presentational)
- logic (hooks/services)

---

## Structure

features/booking/
  components/
  hooks/
  services/
  types/
  utils/

---

## Rules

- no API calls inside UI components
- all API calls go through services
- hooks manage state
- components render only

---

## Example Flow

User action → hook → service → API → response → state → UI

---

## Anti Patterns

- API call inside component
- duplicated state
- mixed responsibilities

---

## Naming

- SearchQuoteScreen
- VehicleCard
- useSearchQuote

---

## Final Rule

Every component must have clear responsibility and placement.
