# AGENTS.md — Trekking Cumbrecita

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Tailwind v4 uses `@import "tailwindcss"` and `@theme {}` in `src/style.css` — there is no `tailwind.config.js`
- Custom design tokens live in `src/style.css:3-14`; use these class names (`text-brand-dark`, `bg-brand-orange`, `font-heading`, etc.), not arbitrary values
- Only runtime dependency besides Vue is `@emailjs/browser`
- `README.md` is the untouched Vite scaffold; do not rely on it for project context

## Commands

```sh
npm install        # install dependencies
npm run dev        # start dev server
npm run build      # production build → dist/
npm run preview    # preview production build
```

No lint, typecheck, or test commands are configured.

## Project structure

```
src/
  main.js              # app entry
  App.vue              # root component — renders sections in this order: Navbar, Hero, Tours, Identity, Testimonials, Gallery, Contact, Footer
  style.css            # Tailwind import + custom theme tokens
  sections/            # page-level layout sections (Hero.vue, Tours.vue, Identity.vue, Testimonials.vue, Gallery.vue, Contact.vue)
  components/          # reusable components (Navbar.vue, Footer.vue, TourModal.vue, Lightbox.vue, ScrollToTop.vue)
  composables/         # Vue composables (scaffold — empty)
  data/                # static data (tours.js, testimonios.js)
  assets/              # scaffold leftovers (vite.svg, hero.png) — unused by the site
public/
  assets/              # static assets served as-is
    hero/              # hero background image
    brand/             # brand assets
    navbar/            # logo
    tours/             # per-tour images (champaqui/, pueblo-escondido/, Cumbrecitariosubtecascada/, default.svg)
  favicon.webp         # favicon referenced by index.html (favicon.svg also exists but is unused)
  icons.svg
```

## Conventions

- Site language is **Spanish** (`index.html` has `lang="es"`)
- Section IDs referenced in scroll navigation: `#tours`, `#identity`, `#gallery`, `#contacto`
- Hero background image is an `<img>` tag in `Hero.vue`, not CSS `background-image`
- Tours section background: `public/assets/tours/tours-background.webp` (also `<img>` tag)
- Animations use Tailwind utility classes with `transition-all duration-300` / `duration-500`
- Font families: `font-sans` (Inter) for body, `font-heading` (Bebas Neue) for headings
- Tours marked `precio: 'Definir'` render with a "Próximamente" badge/button, use `default.svg`, and do not open the modal
- `src/data/tours.js` is the single source of truth for tours; per-tour images live in `public/assets/tours/<slug>/`. The Contact form's interest `<select>` filters out `precio: 'Definir'` tours
- Contact/social links are hardcoded, not centralized: WhatsApp number, email, and Instagram are in `Contact.vue`; Instagram and Facebook are in `Hero.vue`
- `composables/` is scaffolding — populate only as the landing page grows

## EmailJS contact form

- Contact form in `src/sections/Contact.vue` sends via `emailjs.sendForm()`
- Credentials are loaded from environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`)
- Copy `.env.example` to `.env` and fill with real credentials before running/building
- `.env` is ignored by Git; never commit credentials
- Form fields sent: `nombre`, `email`, `telefono`, `tour`, `mensaje` — EmailJS template variables must match these exact `name` attributes
