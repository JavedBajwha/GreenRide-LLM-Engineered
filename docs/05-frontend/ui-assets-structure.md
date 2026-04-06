# UI Assets Structure

## 1. Purpose

The UI Assets Structure defines how all visual and design-related resources are organised in the GreenRide frontend.

This includes:

- images
- icons
- logos
- fonts
- branding assets
- design tokens
- theme configuration
- tenant-specific overrides

The purpose of this structure is to ensure:

- consistency across the application
- clean organisation of assets
- scalable multi-tenant theming
- separation between shared UI system and tenant branding

---

## 2. High-Level Structure

/frontend
  /public
    /assets
      /images
      /icons
      /logos
      /illustrations
  /src
    /assets
    /theme

---

## 3. Public Assets

Location:
frontend/public/assets

Purpose:
Used for static, globally accessible assets.

### 3.1 Images

Examples:

- backgrounds
- banners
- marketing images
- placeholders

### 3.2 Icons

Examples:

- UI icons
- navigation icons
- status icons

Prefer consistent icon system, not mixed styles.

### 3.3 Logos

Examples:

- default platform logo
- tenant logos
- fallback logos

---

## 4. Internal Assets

Location:
frontend/src/assets

Purpose:
Used inside application logic and components.

Examples:

- SVG imports
- animation assets
- component-specific visuals

---

## 5. Theme System Structure

Location:
frontend/src/theme

This is the most important part for multi-tenancy.

Structure:

/theme
  /tokens
  /themes
  /tenant
  /provider

---

## 6. Design Tokens

Location:
theme/tokens

Tokens define base design values.

Examples:

- colours
- spacing
- typography
- border radius
- shadows

These must never be hardcoded in components.

---

## 14. Summary

UI Assets Structure ensures that GreenRide frontend remains:

- scalable
- maintainable
- consistent
- multi-tenant ready

It separates:

- design system
- shared assets
- tenant branding

This is critical for building a professional SaaS platform.
