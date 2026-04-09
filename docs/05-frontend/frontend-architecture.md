# Frontend Architecture

## Purpose

Defines frontend structure for GreenRide.

## Goals

- modular architecture
- tenant-aware UI
- reusable components
- separation of logic and UI

## Rules

- follow UI screen map
- use component architecture
- do not invent product flows or unsupported screen structures
- follow booking flow docs
- use mockup assets when they exist
- when a mockup does not exist, build from the screen map, design system, and feature docs, and treat the result as provisional visual interpretation

## First Slice

Search & Quote is the first implementation target.

Preferred UI assets:
- Customer_Booking_UI.png
- Customer_Booking_UI_2.png

## Related Frontend Control Docs

- `role-app-surface-map.md`
- `frontend-route-inventory.md`
- `auth-redirect-and-protected-routes.md`
- `ui-shell-and-navigation-model.md`
