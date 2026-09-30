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
npm run check:tours           # validate tours data (scripts/validate-tours.mjs)
npm run video -- <ruta>.mp4    # compress a video for web (scripts/compress-video.mjs)
```

No lint or typecheck commands are configured; `check:tours` validates tour data consistency.

## Project structure

```
scripts/
  validate-tours.mjs   # npm run check:tours — tour data sanity checks
  compress-video.mjs   # npm run video — H.264/AAC + faststart web compression (ffmpeg-static)
src/
  main.js              # app entry
  App.vue              # root component — renders sections in this order: Navbar, Hero, Tours, Identity, Testimonials, Gallery, Contact, Footer
  style.css            # Tailwind import + custom theme tokens
  sections/            # page-level layout sections (Hero.vue, Tours.vue, Identity.vue, Testimonials.vue, Gallery.vue, Contact.vue)
  components/          # reusable components (Navbar.vue, Footer.vue, TourModal.vue, Lightbox.vue, ScrollToTop.vue)
  composables/         # Vue composables (useTourModal.js — shared state of TourModal.vue)
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
- Tour videos: optional `video: { tipo: 'local', src, poster }` field in `tours.js` (also `tipo: 'youtube'` for an embed). The file lives in `public/assets/tours/<slug>/`; `TourModal.vue` shows it as the first media item with `preload="metadata"` and poster. Always compress new videos with `npm run video -- <ruta>` (H.264 + AAC + faststart; default CRF 26, use `--crf 30` for sources already heavily compressed, `--force` for files not tracked by git yet — the script overwrites in place, git is the backup)
- Images: `vite.config.js` has a build-only plugin (`redimensionar-imagenes-build`) that downscales any `dist/` image whose long edge exceeds 2560 px, running before `vite-plugin-image-optimizer`'s q80 pass. `public/` originals stay untouched — do not pre-resize or hand-optimize photos
- Contact/social links are hardcoded, not centralized: the email address lives in `src/utils/email.js` (`EMAIL`, plus `crearLinkMailto()` and `copiarEmail()` helpers used by `Contact.vue` and `Footer.vue`); WhatsApp number is in `Contact.vue`; Instagram and Facebook are in `Hero.vue`
- `composables/` holds shared view state; today only `useTourModal.js` (singleton `tourAbierto` + `fechaSalida`) — `Tours.vue` mounts `<TourModal>` and `Calendario.vue` opens it with the salida's date range
- Price surcharge (18,4%): `src/utils/recargo.js` is the single source — `evaluarRecargo(fecha, fin)` returns `{ aplica, motivos }` when any day of the range is a holiday **or** touches a long-weekend window (holiday on Friday → vie-sáb-dom; on Monday → sáb-dom-lun), and `precioConRecargo(precio)` applies `RECARGO = 0.184` once and rounds to the nearest hundred. The surcharge is applied to the price but **never shown as a percentage in the UI** — the visible copy says "tarifa diferencial" instead (texts centralized in `src/utils/format.js`: `AVISO_TARIFA_DIFERENCIAL` for cards/modal, `ETIQUETA_TARIFA_DIFERENCIAL` for badges). Shown in `Calendario.vue` (intro copy, legend pill, day panel badge, month list) and in `TourModal.vue` only when `fechaSalida` comes from the calendar; the WhatsApp message never includes it. Cards in `Tours.vue` show base price + `AVISO_TARIFA_DIFERENCIAL`

## Contact flow (WhatsApp, no backend)

- `Contact.vue` is a 2-step wizard; on submit it only builds a `https://wa.me/<number>?text=...` deep link (`encodeURIComponent`) and opens it — nothing is sent from the app, no API calls, no data stored
- User input goes into the message only via `encodeURIComponent` (do not concatenate raw input into URLs)
- Input caps enforced in markup: `nombre` `maxlength="60"`, `detalle` `maxlength="500"`
- WhatsApp number is hardcoded in `Contact.vue` (`WHATSAPP_NUMBER`); it is public by design (also present in the JSON-LD of `index.html`)
- Email contact: a `mailto:` deep link with prefilled subject/body (`crearLinkMailto()` in `src/utils/email.js`) plus a "Copiar email" button that uses the Clipboard API with a `textarea` + `execCommand` fallback — no form service, no CSP change. Encode `mailto` params with `encodeURIComponent` (never `URLSearchParams`, it emits `+` instead of `%20`)

## Media budget (Vercel Hobby)

- Full analysis in `docs/consumo-medios.md`: media inventory, per-visit bandwidth, "1 video per tour" scenario and how many visits fit in Vercel's free **100 GB/month**
- Rules of thumb: video ≈ 9-10 MB per 60 s (keep every file far below Vercel's 100 MB per-file cap); one full-scroll visit ≈ 15 MB; deploy ≈ 53 MB
- Verify real usage in the Vercel dashboard → Usage → Fast Data Transfer

## Security

- Security headers + CSP live in `vercel.json` (HSTS is set at the Vercel/domain level). CSP `connect-src` is `'self'` only; allowlist Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) and Cloudflare Insights (`static.cloudflareinsights.com`) in `script-src`. If adding a new external service, update the CSP accordingly
- No env vars are used: there are no `.env` / `.env.example` files and no `import.meta.env` reads. Do not reintroduce third-party form services (EmailJS, etc.) without updating the CSP and this file
- Old EmailJS credentials were once hardcoded in git history (commit `27c02f5`) and in `.env`; they are considered compromised and must be revoked in the EmailJS dashboard — never reuse them
