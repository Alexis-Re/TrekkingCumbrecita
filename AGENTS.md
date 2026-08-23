# AGENTS.md — Trekking Cumbrecita

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Tailwind v4 uses `@import "tailwindcss"` and `@theme {}` in `src/style.css` — there is no `tailwind.config.js`
- Custom design tokens (colors, fonts) live in `src/style.css:3-15`; use these class names (`text-brand-dark`, `bg-brand-orange`, `font-heading`, etc.), not arbitrary values
- Colors extracted from client logo: dark brown (`#2D1810`), orange (`#E8751A`), gold (`#F5A623`), cream (`#C9A96E`), white (`#FFFFFF`)

## Commands

```sh
npm install        # install dependencies
npm run dev        # start dev server
npm run build      # production build → dist/
npm run preview    # preview production build
```

There are no lint, typecheck, or test commands configured.

## Project structure

```
src/
  main.js              # app entry
  App.vue              # root component (renders Hero, Tours, Identity)
  style.css            # Tailwind import + custom theme tokens
  sections/            # page-level layout sections (Hero.vue, Tours.vue, Identity.vue)
  components/          # reusable components (empty)
  composables/         # Vue composables (empty)
  data/                # static data (empty)
  assets/              # source assets (unused, scaffold leftovers)
public/
  assets/              # static assets served as-is
    hero/              # hero background images (hero.webp)
    brand/             # brand assets (robertomolina.jpg)
    navbar/            # navbar assets (logoTC.webp)
    tours/             # per-tour images (champaqui/)
  favicon.svg
  icons.svg
```

## Conventions

- Site language is **Spanish** (`index.html` has `lang="es"`)
- Section IDs referenced in scroll navigation: `#tours`, `#identity`
- Hero background image loaded via CSS `background-image` from `public/assets/hero/hero.webp`
- Animations use Tailwind utility classes with `transition-all duration-300`, `duration-500`
- Font families: `font-sans` (Inter) for body, `font-heading` (Bebas Neue) for headings
- Empty directories (`components/`, `composables/`, `data/`) are scaffolding — populate as the landing page grows
