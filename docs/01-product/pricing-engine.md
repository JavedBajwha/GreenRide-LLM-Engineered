# Pricing Engine

## Purpose

The Pricing Engine calculates booking prices based on rules and configuration.

## Responsibilities

- base fare calculation
- distance and time pricing
- vehicle pricing rules
- route overrides
- extras and add-ons
- surcharges
- discounts
- minimum fare

## Pricing Flow

1. determine pricing model
2. apply base fare
3. apply distance/time
4. apply vehicle rules
5. apply route overrides
6. apply extras
7. apply surcharges
8. apply discounts
9. enforce minimum fare
10. round final price

## Models

- distance-based
- time-based
- combined
- fixed route
- hourly

## Rules

- pricing must be consistent
- pricing must be tenant-specific
- booking service must not contain pricing logic
