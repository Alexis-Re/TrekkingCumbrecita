# Consumo de fotos y videos vs. Vercel (tier gratis)

> Medido el 28/9/2026 sobre el build de producción (`npm run build` → `dist/`).
> Los números de "antes" son el estado previo a las optimizaciones de este informe.

## 1. Límites del plan Hobby de Vercel

| Recurso | Incluido | Qué significa |
| --- | --- | --- |
| Fast Data Transfer | **100 GB / mes** | Todo lo que el CDN le manda al usuario (fotos, videos, JS, CSS). Es el límite que importa |
| Edge Requests | 1.000.000 / mes | Cada request estática o dinámica; con ~30-60 por visita alcanza para ~17.000-30.000 visitas |
| Archivo estático máximo | **100 MB** | Ningún video/archivo puede superarlo |
| Excedente | No se puede comprar | Al llegar al tope, el plan se pausa hasta dentro de 30 días |

Dónde mirar el consumo real: Vercel → proyecto → pestaña **Usage** → *Fast Data Transfer* (GB del mes).

## 2. Inventario de medios

| | Antes | Ahora | Δ |
| --- | --- | --- | --- |
| Imágenes `.webp` (128 archivos) | 60,3 MB en dist | **38,3 MB** | −37% |
| Videos `.mp4` | 19,2 MB (1 video) | **14,7 MB** (2 videos) | Champaquí 19,2 → 9,31 MB |
| Código (JS + CSS + HTML) | 0,35 MB | 0,35 MB | — |
| PDFs, SVGs, favicon | ~0,15 MB | ~0,15 MB | — |
| **Total del deploy** | **80,9 MB** | **53,5 MB** | **−34%** |

Notas:

- Los originales en `public/` (67,2 MB de webp) **no se tocan**: el redimensionado solo ocurre en `dist/` durante el build.
- El video de Champaquí quedó en 720×1280, 60 s, 9,31 MB (1,29 Mbps) con H.264 + AAC + `faststart`. A ese ritmo, **1 minuto de video ≈ 9-10 MB**.

## 3. Cuánto consume una visita (medido sobre `dist/`)

Componentes de una visita normal (scroll completo, sin abrir modales):

| Componente | MB |
| --- | --- |
| Código (JS + CSS + HTML) | 0,35 |
| Hero + logo + fondos de sección | 1,54 |
| Las 17 portadas de las cards | 4,73 |
| Galería (las 5 iniciales, lazy) | 1,85 |
| Testimonios + avatares | 4,93 |
| Identity | 1,18 |
| Footer + contacto | 0,40 |
| **Total** | **≈ 15,0** |

Escenarios:

| Escenario | MB/visita |
| --- | --- |
| A. Entra y solo ve el hero | ~2 |
| **B. Scroll completo, sin modales** | **~15** |
| C. B + abre 3 modales y recorre sus galerías | ~25 |
| D. B + reproduce 1 video (60 s) | ~24 |
| E. Ve absolutamente todo (todas las galerías: 36,7 MB únicas) | ~61 |

El modal abre el video con `preload="metadata"`: abrirlo cuesta unos KB; el consumo recién ocurre al reproducir.

## 4. Escenario: 1 video por tour (17 tours)

Suponiendo videos del estilo del Champaquí (60 s, ~9,5 MB):

| | MB |
| --- | --- |
| 17 videos × 9,5 MB | **≈ 160 MB** (con el bitrate original de 2,67 Mbps habrían sido 326 MB) |
| Deploy total proyectado (38,3 fotos + 160 videos + código) | ≈ 200 MB |
| Sesión que ve los 17 videos + todas las galerías | ≈ 212 MB |
| Sesión que abre 3 tours y ve esos 3 videos | ≈ 48 MB |
| Sesión normal con 1 video | ≈ 25 MB |

## 5. Visitas que entran en los 100 GB de Vercel

| Situación | MB/visita | Visitas/mes |
| --- | --- | --- |
| Hoy, escenario B | 15 | **≈ 6.700** |
| Hoy, escenario C (3 galerías) | 25 | ≈ 4.000 |
| Con 17 videos: cada visitante ve 1 video | 25 | ≈ 4.000 |
| Con 17 videos: 30% de los visitantes ve 1 video | 18 | ≈ 5.500 |
| Con 17 videos: el visitante lo ve todo | 212 | ≈ 470 |

Conclusión: el límite de 100 GB no es un problema para tráfico orgánico normal (~6.000 visitas/mes). El riesgo aparece si los videos se alargan (a 5 min ≈ 48 MB cada uno) o si se reproduce todo el catálogo en una sola sesión.

## 6. Optimizaciones aplicadas

1. **Redimensionado en build** (`vite.config.js` → plugin `redimensionar-imagenes-build`): toda imagen de `dist/` con lado largo > 2560 px se reduce a 2560 px (`fit: inside`) antes de la compresión q80 de `vite-plugin-image-optimizer`. 27 imágenes pasaron de 4080/8000 px a 2560 px. Los originales de `public/` quedan intactos.
2. **Compresión de videos** (`scripts/compress-video.mjs`, `npm run video -- <ruta>`): H.264 CRF 26 + AAC 96k + `faststart`, escala máxima 1920 px. Champaquí: 19,2 → 9,31 MB (−52%).
3. **Carga diferida**: portadas, galería e imágenes de secciones usan `loading="lazy"`; la galería arranca con 5 imágenes y carga por lotes.

## 7. Reglas para contenido nuevo

- **Fotos**: ideal cargarlas ya redimensionadas (≤ 2560 px de lado largo). Aunque el build recorta igual, subirlas chicas ahorra tiempo de build.
- **Videos**: siempre pasar por `npm run video -- public/assets/tours/<slug>/video.mp4`. 60 s ≈ 9-10 MB. Mantener cada archivo **muy por debajo de 100 MB** (límite duro de Vercel).
- **Alternativa a 0 GB**: subir el video a YouTube y usar `video: { tipo: 'youtube', src }` en `tours.js` — el CSP ya permite `frame-src youtube` y Vercel no transfiere esos bytes.
- Después de publicar, revisar **Usage → Fast Data Transfer** en Vercel para comparar estos números con el consumo real.
