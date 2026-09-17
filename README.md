# PureHarvest — Modern Organic E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://pureharvest-shop.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-UI_Catalog-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)

---

## Overview

**PureHarvest** is a production-grade, fully responsive e-commerce web application specialized in organic grocery and fresh agricultural produce.

Designed based on a curated, modern [Figma Community e-commerce design](https://www.figma.com/community/file/1348512198352618529/ecobazar-organic-ecommerce-shop-website), the project was engineered from the ground up to showcase front-end architecture, deep domain modeling, clean software design principles, and seamless developer experience:

- **Fractal Feature-Based Architecture:** Scalable, domain-driven code organization inspired by [Alexis Mangin's architectural blueprint](https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1).
- **Decoupled Custom Design System:** Built without heavy off-the-shelf component libraries; every button, input, modal, and drawer is crafted from scratch using Tailwind CSS.
- **Component Catalog with Storybook:** Isolated UI component development and living visual documentation.
- **Full Localization (i18n):** Complete bilingual support in English (`en`) and French (`fr`).
- **Rigorous Real-World Usability Testing:** Tested and refined iteratively across viewports through an academic UX audit.

---

## Key Features

### E-Commerce & Shopping Experience

- **Product Catalog & Dynamic Filtering:** Filter goods by category, price range, minimum rating, and text queries, with active tag indicators.
- **Rich Product Details:**
  - Multi-image thumbnail gallery with high-resolution view.
  - Real-time stock status, pricing breakdown, and dynamic quantity selector.
  - Tabbed information sections: Product Description, Specifications, Video Showcase, and Customer Reviews.
  - Instant Add-to-Cart and Wishlist triggers.
- **Cart & Drawer System:**
  - Interactive slide-out cart drawer for quick order adjustments.
  - Dedicated Shopping Cart page featuring item breakdowns, live tax/shipping calculations, and voucher inputs.
- **Checkout Flow:** Full billing address management, order recap, and multi-option payment selections.
- **Flash Deals & Promo Timers:** Home-page promo banners and countdown timers for monthly organic food deals.

### Account & User Management

- **Authentication:** Secure sign-in, sign-up, and OAuth callback handling integrated with Supabase Auth.
- **User Dashboard:**
  - Order history with detailed status tracking (Placed, Packaging, On The Road, Delivered).
  - Address management (Billing & Shipping).
  - Profile customization with in-browser image cropping before upload.
  - Password update module with validation.

### Content & Community

- **Blog System:** Organic lifestyle articles, tag filtering, and nested reader comments.
- **Customer Testimonials:** Smooth carousel/slider showcasing real customer stories using Embla Carousel.
- **Support & FAQs:** Accessible accordion-based answers to frequent questions and direct contact messaging.

### Internationalization (i18n)

- Complete localization supporting **English (`en`)** and **French (`fr`)**.
- Seamless switching of all content, notifications, form validation messages, and system text.

---

## Architecture & Engineering Philosophy

### 1. Fractal / Feature-Based Architecture

Following [Alexis Mangin's guide on organizing large-scale React applications](https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1), the project departs from standard "type-based" folders (e.g. global `actions/`, `reducers/`, `containers/`) in favor of a self-contained, modular feature hierarchy:

- **Self-Contained Domains:** Each feature/scene (e.g., `ShopPage`, `ProductDetailsPage`, `AccountPages`) owns its respective components, custom hooks, API service adapters, types, and sub-views.
- **Strict Hierarchy Rules:**
  - **Global Components (`src/components/`):** Universal primitives (Buttons, Inputs, Spinners, DropDowns) usable anywhere.
  - **Feature-Scoped Components (`src/pages/[Feature]/components/`):** Dedicated UI components encapsulated strictly within their parent scene.
  - **Services & Adapters (`src/services/`):** Abstract data-fetching layer acting as an adapter between the server API (Supabase) and the UI layer, preventing vendor lock-in.
- **High Scalability & Maintainability:** Adding, removing, or refactoring features happens in isolation without risking regression across unrelated pages.

### 2. Custom Component System (No Heavy UI Kits)

Rather than relying on monolithic UI component libraries, all interactive components were custom-crafted with **Tailwind CSS** to maintain strict control over bundle size, accessibility, and pixel-perfect Figma adherence.

### 3. Isolated Development with Storybook

Key components are decoupled from application state and documented within **Storybook**. This includes:

- **Buttons:** `Button`, `AddToCartButton`, `AddToWishlistButton`, `QuickViewButton`, `CloseButton`, `DeleteButton`, `SocialButton`.
- **Form Inputs:** `TextFieldInput`, `PasswordFieldInput`, `QuantityInput`, `CheckboxInput`, `RadioButtonInput`, `RangeInput`, `SelectInput`.
- **Indicators & Layout:** `PriceDisplay`, `LoadingSpinner`, `DropDown`, `AppLogo`.

---

## Project Structure

```text
pureharvest/
├── .storybook/              # Storybook configuration & preview settings
├── public/
│   ├── fonts/               # Local Poppins & custom font assets
│   ├── images/              # Optimized product & UI imagery
│   └── locales/             # i18n JSON translations (en, fr)
│       ├── en/
│       └── fr/
├── src/
│   ├── app/                 # App root providers & wrappers
│   ├── components/          # Reusable shared UI components
│   │   ├── Buttons/
│   │   ├── Inputs/
│   │   ├── DropDown/
│   │   ├── LoadingSpinner/
│   │   └── PriceDisplay/
│   ├── constants/           # Global design tokens, currencies, keys
│   ├── hooks/               # Application-wide reusable utility hooks
│   ├── i18n/                # i18next setup and language configurations
│   ├── icons/               # Modular SVG icon components & partner logos
│   ├── layouts/             # AppLayout, Navbar, TopBar, Footers, Route Guards
│   ├── pages/               # Domain-driven feature views
│   │   ├── Home/
│   │   ├── ShopPage/
│   │   ├── ProductDetailsPage/
│   │   ├── ShoppingCartPage/
│   │   ├── CheckoutPage/
│   │   ├── WishlistPage/
│   │   ├── AccountPages/
│   │   ├── AuthPages/
│   │   ├── BlogPage/
│   │   └── AboutUsPage/
│   ├── router/              # React Router v6 configuration & paths
│   ├── services/            # Supabase API services, adapters & query hooks
│   │   └── supabase/
│   │       ├── auth/
│   │       ├── products/
│   │       ├── orders/
│   │       ├── profiles/
│   │       └── wishlists/
│   ├── store/               # Global Zustand state stores (Cart, Auth, App)
│   ├── stories/             # Storybook stories for UI verification
│   ├── types/               # Shared TypeScript typings
│   └── utils/               # Sanitizers, formatting, and validation schemas
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Tech Stack

| Layer                    | Technology                                                                                                             |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Framework & Core**     | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)                                          |
| **Build Tool**           | [Vite](https://vitejs.dev/)                                                                                            |
| **Styling**              | [Tailwind CSS](https://tailwindcss.com/)                                                                               |
| **Component Workshop**   | [Storybook 10](https://storybook.js.org/)                                                                              |
| **State Management**     | [Zustand](https://github.com/pmndrs/zustand) (Client) & [TanStack Query v5](https://tanstack.com/query) (Server State) |
| **Routing**              | [React Router v7](https://reactrouter.com/)                                                                            |
| **Internationalization** | [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)                                      |
| **Backend & Database**   | [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)                                                          |
| **Form & Validation**    | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)                                              |
| **Carousels & Media**    | [Embla Carousel](https://www.embla-carousel.com/), `react-image-crop`                                                  |
| **Deployment**           | [Vercel](https://vercel.com/)                                                                                          |

---

## Quality Assurance & Iterative UX Refinement

To ensure the interface performs as seamlessly in practice as it does in Figma, the application underwent a thorough real-world usability audit conducted by an academic researcher:

1. **Viewport & Responsive Breakpoints:** Edge-case layout anomalies on specific mobile widths and high-density screens were identified and corrected.
2. **Bilingual Text Shifts:** In French (`fr`), longer string lengths occasionally caused unexpected button wraps and misaligned flex containers; these were restructured using adaptive Tailwind classes.
3. **Friction Points in Cart & Checkout:** Micro-interactions (quantity stepping, drawer dismissals, and input feedback states) were reworked after testing to deliver smooth, accessible navigation.

---

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine:

- **Node.js** >= 18.x
- **npm** >= 9.x (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khaledelgamal/pureharvest.git
   cd pureharvest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

---

## Available Scripts

- `npm run dev` — Starts the Vite development server.
- `npm run build` — Compiles TypeScript and creates an optimized production bundle.
- `npm run preview` — Locally previews the production build.
- `npm run storybook` — Launches the Storybook UI catalog on `http://localhost:6006`.
- `npm run build-storybook` — Generates a static production build of the Storybook documentation.
- `npm run lint` — Runs ESLint to check for code quality and type consistency.

---

## Live Demo

You can explore the live, fully responsive deployment on Vercel:
[View PureHarvest Live](https://pureharvest-shop.vercel.app/) _(Accessible on desktop, tablet, and mobile)_

---

## License

This project is licensed under the [MIT License](LICENSE).
