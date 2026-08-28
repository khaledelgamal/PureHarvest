# GEMINI.md — PureHarvest

## Project Overview

PureHarvest is an e-commerce web application for organic/fresh products. Built with React 19, TypeScript, Vite (rolldown-vite), Tailwind CSS v4, and Supabase as the backend.

## Quick Reference

| Tool       | Command          |
| ---------- | ---------------- |
| Dev server | `pnpm dev`       |
| Build      | `pnpm build`     |
| Lint       | `pnpm lint`      |
| Format     | `pnpm format`    |
| Storybook  | `pnpm storybook` |
| Tests (SB) | `pnpm vitest`    |

## Tech Stack

- **Framework**: React 19 + TypeScript 5.9
- **Bundler**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **State management**: Zustand (with `persist` middleware for cart)
- **Server state**: TanStack React Query v5
- **Routing**: React Router DOM v7 (data router with `createBrowserRouter`)
- **Backend**: Supabase (auth, database, storage)
- **Forms**: React Hook Form + Zod v4 validation
- **i18n**: i18next + react-i18next
- **Notifications**: Sonner
- **Icons**: Custom SVG icon components (in `src/icons/`)
- **Carousel**: Embla Carousel
- **Storybook**: v10 with Vitest addon + Playwright browser tests
- **Package manager**: pnpm

## Architecture — Feature-First Organization

This project follows the [feature-first (a.k.a. domain-driven) organizational pattern](https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1). Each feature (page, component group) is self-contained with its own `components/`, `hooks/`, and styles co-located inside it. Shared/cross-cutting code lives at the top-level `src/` directories.

### Directory Structure

```
src/
├── app/                  # App entry: App.tsx, QueryProvider
├── components/           # Shared reusable components (used across multiple pages)
│   ├── Buttons/          # Button group (Button, AddToCartButton, etc.)
│   │   └── Button/       # Each component gets its own folder
│   │       ├── Button.tsx
│   │       └── styles.ts
│   ├── Inputs/
│   ├── DropDown/
│   ├── LoadingSpinner/
│   ├── PriceDisplay/
│   ├── CartTotalsList/
│   ├── ImageCropModal/
│   └── components.type.ts  # Shared component types (variants, sizes)
├── constants/            # Global constants and shared style tokens
├── hooks/                # Shared hooks (useDebounce, useFormatPrice, useProfile)
├── i18n/                 # Internationalization config
├── icons/                # Custom SVG icon components
├── layouts/              # Layout wrappers
│   ├── AppLayout/        # Main app shell (header, footer, breadcrumbs)
│   ├── GuestRoute/       # Redirects authenticated users away
│   └── ProtectedRoute/   # Redirects unauthenticated users away
├── pages/                # Feature pages (each self-contained)
│   ├── Home/
│   │   ├── HomePage.tsx
│   │   └── components/   # Page-specific components
│   │       ├── Hero/
│   │       ├── DealOfTheMonth/
│   │       └── ...
│   ├── ShopPage/
│   │   ├── ShopPage.tsx
│   │   ├── components/   # Page-specific components
│   │   └── hooks/        # Page-specific hooks (useProducts)
│   ├── AboutUsPage/
│   │   ├── AboutUsPage.tsx
│   │   └── components/   # Page-specific components
│   │       └── components/  # Section-specific sub-components
│   └── ...
├── plugins/              # (Reserved for future plugins)
├── router/               # Route definitions and path constants
│   ├── router.tsx        # Route tree (createBrowserRouter)
│   ├── routePaths.ts     # Centralized route path constants
│   └── ScrollToTop.tsx
├── services/             # API / data layer
│   └── supabase/
│       ├── client.ts     # Supabase client instance
│       ├── types.ts      # Shared service types (ServiceResponse)
│       ├── products/     # Feature-grouped API module
│       │   ├── api.ts    # Supabase queries (productsAPI object)
│       │   ├── types.ts  # Domain types (Product, ProductFilters, etc.)
│       │   ├── adapters.ts  # Supabase → domain type mappers
│       │   ├── keys.ts   # TanStack Query key factories
│       │   └── index.ts  # Barrel export
│       ├── auth/
│       ├── blog/
│       ├── orders/
│       ├── profiles/
│       ├── wishlists/
│       └── contact/
├── store/                # Zustand stores (global client state)
│   ├── useAppStore.ts    # App-wide state (currency, etc.)
│   ├── useAuthStore.ts   # Auth state
│   └── useCartStore.ts   # Shopping cart (persisted to localStorage)
├── stories/              # Storybook stories
├── types/                # Shared TypeScript types
├── utils/                # Shared utility functions
│   └── validation/       # Zod schemas
├── utils.ts              # classNames() helper (clsx + twMerge)
├── index.css             # Global CSS / Tailwind directives
└── main.tsx              # Entry point
```

## Key Conventions

### Component Organization (Feature-First Pattern)

1. **Each component lives in its own folder**, named in PascalCase matching the component:

   ```
   ComponentName/
   ├── ComponentName.tsx   # Component file
   ├── styles.ts           # Tailwind class maps (if needed)
   └── ...                 # Any other co-located files
   ```

2. **Page-specific components nest inside the page folder** under `components/`:

   ```
   pages/ShopPage/
   ├── ShopPage.tsx
   ├── components/        # Only used by ShopPage
   │   ├── ProductList/
   │   └── ShopFilterSection/
   └── hooks/             # Only used by ShopPage
       └── useProducts.ts
   ```

3. **Shared components** go in `src/components/` — only if used by more than one page.

4. **Sub-components** can nest further when a component has section-specific children:

   ```
   AboutUsPage/components/AboutUsPage.tsx
   AboutUsPage/components/components/FeaturesSection/
   ```

5. **Do NOT import page-specific components from another page.** If a component is needed across pages, promote it to `src/components/`.

### Naming Conventions

- **Components**: PascalCase (folders and files) — `Button.tsx`, `ShopPage.tsx`
- **Hooks**: camelCase prefixed with `use` — `useProducts.ts`, `useDebounce.ts`
- **Stores**: camelCase prefixed with `use` — `useCartStore.ts`
- **Types**: `.type.ts` or `.types.ts` suffix for standalone type files — `components.type.ts`, `auth.types.ts`
- **Styles**: `styles.ts` for Tailwind class maps co-located with their component
- **Services**: Feature-grouped folders with `api.ts`, `types.ts`, `adapters.ts`, `keys.ts`, `index.ts`
- **Icons**: PascalCase with `Icon` suffix — `SearchIcon.tsx`, `ArrowIcon.tsx`
- **Constants**: camelCase — `companyInfo.ts`, `currencies.ts`

### Path Aliases

Use the `@/` path alias for all imports from `src/`:

```ts
import { Button } from '@/components/Buttons/Button/Button';
import useCartStore from '@/store/useCartStore';
```

### Styling

- **Tailwind CSS v4** — utility-first classes directly in JSX
- Use `classNames()` from `@/utils` (wraps `clsx` + `tailwind-merge`) for conditional/merged classes
- Co-locate complex style maps in a `styles.ts` file next to the component (see `Button/styles.ts`)
- Global style tokens (section padding, container widths) live in `src/constants/global.styles.ts`

### State Management

- **Server state**: TanStack React Query — queries live in page-level hooks (e.g., `useProducts.ts`) calling service APIs
- **Client state**: Zustand stores in `src/store/`
- **Form state**: React Hook Form + Zod schemas

### Services Layer (Supabase)

Each service module (`src/services/supabase/<feature>/`) follows this structure:

| File          | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `api.ts`      | Supabase queries, exported as an API object     |
| `types.ts`    | Domain types (camelCase, frontend-friendly)     |
| `adapters.ts` | Mappers from Supabase snake_case → domain types |
| `keys.ts`     | TanStack Query key factory functions            |
| `index.ts`    | Barrel re-export                                |

API functions return `ServiceResponse<T>` (`{ data: T; error: null } | { data: null; error: { message: string } }`).

### Routing

- Routes are defined centrally in `src/router/router.tsx` using `createBrowserRouter`
- Path constants live in `src/router/routePaths.ts` — always reference these instead of hardcoding strings
- Route guards: `ProtectedRoute` (auth required) and `GuestRoute` (non-auth only) are layout wrappers
- Each route has a `handle.breadcrumb` for the breadcrumb system

### Component Exports

- Most components use **default exports** (`export default ComponentName`)
- Named exports are used for shared utilities, hooks, and smaller components (e.g., `export const Button`)

### Code Style (Prettier)

- Semicolons: yes
- Single quotes: yes
- Trailing commas: all
- Print width: 100
- Tab width: 2
- Arrow parens: avoid
- End of line: LF

### i18n

- Uses `i18next` with HTTP backend for loading translation files
- Wrap user-facing text with `useTranslation()` hook: `const { t } = useTranslation();`

### Testing

- **Storybook v10** for component documentation and visual testing
- **Vitest** with Storybook addon for story-based tests
- **Playwright** as the browser provider for integration tests
- Stories live in `src/stories/` (grouped by `components/` and `icons/`)
