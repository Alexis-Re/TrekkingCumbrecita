# Trekking Cumbrecita

Landing page de Trekking Cumbrecita: senderos y trekking guiado por el Valle de Calamuchita, Córdoba, Argentina.

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite 8** + **Tailwind CSS v4**
- Canal de contacto vía **WhatsApp** (el formulario arma el mensaje y abre `wa.me`, sin backend ni servicios de terceros)
- Optimización de imágenes en build con `vite-plugin-image-optimizer` (sharp + svgo)

## Requisitos

- Node.js `>= 20.19.0`

## Setup

```sh
npm install
```

No se requieren variables de entorno.

## Scripts

```sh
npm run dev        # servidor de desarrollo
npm run build      # build de producción → dist/
npm run preview    # previsualizar el build de producción
npm run check:tours # valida los datos de src/data/tours.js
```

## Deploy (Vercel)

Vercel detecta el proyecto como Vite automáticamente (build `vite build`, output `dist/`). No necesita variables de entorno.
