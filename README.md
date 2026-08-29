# Trekking Cumbrecita

Landing page de Trekking Cumbrecita: senderos y trekking guiado por el Valle de Calamuchita, Córdoba, Argentina.

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Formulario de contacto con **EmailJS** (`@emailjs/browser`)
- Optimización de imágenes en build con `vite-plugin-image-optimizer` (sharp + svgo)

## Requisitos

- Node.js `>= 20.19.0`

## Setup

```sh
npm install
```

Copiá las variables de entorno y completalas con tus credenciales de EmailJS:

```sh
cp .env.example .env
```

Variables necesarias:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Scripts

```sh
npm run dev        # servidor de desarrollo
npm run build      # build de producción → dist/
npm run preview    # previsualizar el build de producción
```

## Deploy (Vercel)

Vercel detecta el proyecto como Vite automáticamente (build `vite build`, output `dist/`).

Antes de deployar, configurá las variables de entorno de EmailJS en **Project Settings → Environment Variables** (las mismas tres de arriba, con prefijo `VITE_`). Sin ellas, el formulario de contacto fallará.
