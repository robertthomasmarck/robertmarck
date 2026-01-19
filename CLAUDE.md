# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Flowbite Astro Admin Dashboard - a free, open-source admin dashboard template built with Astro, Tailwind CSS, and Flowbite components. It provides pre-built pages for dashboards, CRUD layouts, authentication, and error handling.

## Development Commands

```bash
pnpm install          # Install dependencies (npm/yarn also supported)
pnpm run dev          # Start dev server on http://localhost:2121
pnpm run build        # Build static site to /dist
pnpm run preview      # Preview production build
```

## Architecture

### Component Hierarchy

```
src/app/         → Application-wide layouts (LayoutSidebar, LayoutStacked, NavBar, Footer)
src/components/  → Atomic, reusable UI elements (buttons, inputs, toggles)
src/modules/     → Complex views composed of components (DashBoard, CrudProducts, forms)
src/pages/       → File-based routing (Astro pages)
src/services/    → Server-side data operations (products.ts, users.ts)
src/types/       → TypeScript interfaces (entities.ts)
src/lib/         → Utilities and helpers
data/            → Static JSON data sources (products.json, users.json)
```

### Two Layout Systems

- **Sidebar Layout** (`LayoutSidebar.astro`): Traditional sidebar navigation
- **Stacked Layout** (`LayoutStacked.astro`): Horizontal navigation bar

Both extend `LayoutCommon.astro` as the base.

### Data Flow

Static JSON (`data/*.json`) → Services (`src/services/*.ts`) → REST API (`src/pages/api/[...entity].ts`) → Pages/Modules

### Client-Side Interactivity

- `*.client.ts` files contain browser JavaScript (ApexCharts integration, CRUD modal logic)
- Flowbite provides interactive components (modals, drawers, tooltips)
- No frontend framework (React/Vue) - vanilla JS + Flowbite

### REST API

Single catch-all endpoint at `src/pages/api/[...entity].ts` handles `/api/products` and `/api/users`.

### Configuration

- **SSR Mode**: Uncomment `output: 'server'` in `astro.config.mjs` to enable
- **Randomization**: Toggle `RANDOMIZE` in `src/app/constants.ts` to use Faker-generated data
- **Remote Assets**: Dashboard images fetched from `https://flowbite-admin-dashboard.vercel.app`

## Code Style

- TypeScript with Astro's strictest settings
- ESLint with Airbnb + Prettier config
- Max 250 lines per file (ESLint enforced)
- Tailwind CSS utility classes only (no custom CSS)

## Key Dependencies

- **Astro** (v2.x) - SSG framework
- **Flowbite** (v2.1.1) - UI component library
- **Tailwind CSS** (v3.x) - Utility-first CSS
- **ApexCharts** - Dashboard charts
- **@faker-js/faker** - Test data generation
