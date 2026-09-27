# AGENTS.md — Trekking Cumbrecita

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Tailwind v4 uses `@import "tailwindcss"` and `@theme {}` in `src/style.css` — there is no `tailwind.config.js`
- Custom design tokens live in `src/style.css:3-14`; use these class names (`text-brand-dark`, `bg-brand-orange`, `font-heading`, etc.), not arbitrary values
- Only runtime dependency besides Vue: none (no EmailJS — the contact flow is a WhatsApp deep link, no backend/third-party form service)
- `README.md` covers setup/deploy for this project; do not rely on it for code conventions

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
  assets/              # empty (scaffold leftovers removed)
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
- `src/data/tours.js` is the single source of truth for tours; per-tour images live in `public/assets/tours/<slug>/`. The Contact form's tour `<select>` filters out tours with `disponible: false`
- Contact/social links are hardcoded, not centralized: WhatsApp number, email, and Instagram are in `Contact.vue`; Instagram and Facebook are in `Hero.vue`
- `composables/` is scaffolding — populate only as the landing page grows

## Contact flow (WhatsApp, no backend)

- `Contact.vue` is a 2-step wizard; on submit it only builds a `https://wa.me/<number>?text=...` deep link (`encodeURIComponent`) and opens it — nothing is sent from the app, no API calls, no data stored
- User input goes into the message only via `encodeURIComponent` (do not concatenate raw input into URLs)
- Input caps enforced in markup: `nombre` `maxlength="60"`, `detalle` `maxlength="500"`
- WhatsApp number is hardcoded in `Contact.vue` (`WHATSAPP_NUMBER`); it is public by design (also present in the JSON-LD of `index.html`)

## Security

- Security headers + CSP live in `vercel.json` (HSTS is set at the Vercel/domain level). CSP `connect-src` is `'self'` only; allowlist Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) and Cloudflare Insights (`static.cloudflareinsights.com`) in `script-src`. If adding a new external service, update the CSP accordingly
- No env vars are used: there are no `.env` / `.env.example` files and no `import.meta.env` reads. Do not reintroduce third-party form services (EmailJS, etc.) without updating the CSP and this file
- Old EmailJS credentials were once hardcoded in git history (commit `27c02f5`) and in `.env`; they are considered compromised and must be revoked in the EmailJS dashboard — never reuse them
