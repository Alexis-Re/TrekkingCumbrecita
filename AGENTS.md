# AGENTS.md — Trekking Cumbrecita

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Tailwind v4 uses `@import "tailwindcss"` and `@theme {}` in `src/style.css` — there is no `tailwind.config.js`
- Custom design tokens (colors, fonts) live in `src/style.css:3-15`; use these class names (`text-brand-dark`, `bg-brand-orange`, `font-heading`, etc.), not arbitrary values
- Colors extracted from client logo: dark brown (`#2D1810`), orange (`#E8751A`), gold (`#F5A623`), cream (`#C9A96E`), white (`#FFFFFF`), card brown (`#3D2B1F`)
- Contact form sends email via **EmailJS** (`@emailjs/browser`); credentials live in `src/sections/Contact.vue`

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
  App.vue              # root component (renders Navbar, Hero, Tours, Identity, Gallery, Contact)
  style.css            # Tailwind import + custom theme tokens
  sections/            # page-level layout sections (Hero.vue, Tours.vue, Identity.vue, Gallery.vue, Contact.vue)
  components/          # reusable components (Navbar.vue, TourModal.vue)
  composables/         # Vue composables (empty)
  data/                # static data (tours.js)
  assets/              # source assets (unused, scaffold leftovers)
public/
  assets/              # static assets served as-is
    hero/              # hero background images (hero.webp)
    brand/             # brand assets (robertomolina.jpg)
    navbar/            # navbar assets (logoTC.webp)
    tours/             # per-tour images (champaqui/, pueblo-escondido/, Cumbrecitariosubtecascada/, default.svg)
  favicon.svg
  icons.svg
```

## Conventions

- Site language is **Spanish** (`index.html` has `lang="es"`)
- Section IDs referenced in scroll navigation: `#tours`, `#identity`, `#gallery`, `#contacto`
- Hero background image loaded via CSS `background-image` from `public/assets/hero/hero.webp`
- Animations use Tailwind utility classes with `transition-all duration-300`, `duration-500`
- Font families: `font-sans` (Inter) for body, `font-heading` (Bebas Neue) for headings
- Tours marked `precio: 'Definir'` render with a "Próximamente" badge/button and use `default.svg`; do not open the modal
- `composables/` is scaffolding — populate as the landing page grows
