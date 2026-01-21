# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Type check and build for production
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting without changes
pnpm preview      # Preview production build
pnpm knip         # Find unused files, exports, and dependencies
```

### Local Preview for Agents

When spinning up a local dev server for the user to verify changes:
- Do NOT use `localhost` - it may not be accessible
- Do NOT use `pnpm dev` directly - use `npm run dev -- --host`
- Use the network IP address (e.g., `http://192.168.x.x:5173/`)

## Architecture Overview

This is a React dashboard built with Vite, TanStack Router (file-based routing), and ShadcnUI components.

### Core Stack
- **UI**: ShadcnUI (TailwindCSS v4 + RadixUI) with "new-york" style
- **Routing**: TanStack Router with file-based routing (routes auto-generated in `src/routeTree.gen.ts`)
- **State**: Zustand for auth state, TanStack Query for server state
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (GitHub commits, Claude usage tracking, daily stats)
- **Auth Options**: Built-in auth forms OR Clerk integration (under `/clerk/*` routes)

### Directory Structure

```
src/
├── routes/           # TanStack Router file-based routes
│   ├── __root.tsx    # Root layout (toaster, devtools, error boundaries)
│   ├── _authenticated/  # Protected routes (require auth)
│   └── (auth)/       # Public auth pages (sign-in, sign-up, etc.)
├── features/         # Feature modules (self-contained with components/data)
│   ├── dashboard/    # Main dashboard with GitHub/Claude stats
│   ├── tasks/        # Task management CRUD
│   ├── users/        # User management CRUD
│   └── settings/     # User settings pages
├── components/
│   ├── ui/           # ShadcnUI primitives (excluded from linting)
│   ├── layout/       # App shell (sidebar, header, nav)
│   └── data-table/   # Reusable TanStack Table components
├── context/          # React contexts (theme, direction, layout, search, font)
├── stores/           # Zustand stores (auth-store.ts)
├── hooks/            # Custom hooks (use-github-stats, use-claude-stats, etc.)
└── lib/              # Utilities (supabase client, cookies, utils)
```

### Routing Conventions

TanStack Router uses file/folder naming conventions:
- `_authenticated/` - Layout route that wraps protected pages with `AuthenticatedLayout`
- `(auth)/` - Pathless grouping for auth pages (doesn't affect URL)
- `$param` - Dynamic route segments
- Route files export `Route` via `createFileRoute()`

### Key Patterns

**Adding a new protected page:**
1. Create file in `src/routes/_authenticated/your-page.tsx`
2. Export Route with `createFileRoute('/_authenticated/your-page')`
3. Feature code goes in `src/features/your-feature/`

**ShadcnUI Components:**
- Some components have RTL modifications (see README for list)
- Run `npx shadcn@latest add <component>` for standard components
- Manually merge for customized ones (scroll-area, sonner, separator, sidebar, etc.)

**Environment Variables:**
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GITHUB_USERNAME=
VITE_CLERK_PUBLISHABLE_KEY=  # Only needed for Clerk routes
```

### Code Style

- ESLint enforces `no-console` (use toast for user feedback)
- TypeScript: Use `type` imports with inline syntax (`import { type Foo }`)
- Unused vars must be prefixed with `_`
- Prettier auto-sorts imports (see `.prettierrc` for order)
- Single quotes, no semicolons, 2-space indentation

### Database Schema (Supabase)

Tables track developer productivity metrics:
- `github_commits` - Individual commit records
- `github_repositories` - Repository metadata
- `github_languages` - Language breakdown per repo
- `claude_usage` - Claude API token usage
- `daily_stats` - Aggregated daily statistics
- `sync_status` - Data sync tracking
