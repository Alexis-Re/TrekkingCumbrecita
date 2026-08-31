# Contenido pendiente de tours

Checklist de contenido para completar `src/data/tours.js`. Cuando un tour tenga todo ✓, queda validado con `npm run check:tours`.

## Plantilla por tour

```
incluye:      lista de ítems (base: ver tours similares de la misma duración)
itinerario:   por día → título + lista de "hora + evento"
imagen:       public/assets/tours/<slug>/portada.webp (mínimo 1)
imagenes:     galería opcional en la misma carpeta
```

## Pendientes

### Tanda A — 1 día (La Cumbrecita)
- [ ] `garganta-del-diablo-cerro-corona-pozo-cabras` — 6 hs · $55.000 · 09:15 · Puente de ingreso
- [ ] `cascadas-salvajes-rio-subterraneo` — 7 hs · $55.000 · 08:30 · Puente de ingreso

### Tanda B — 2 días / 1 noche
- [ ] `quebrada-yatan` — $250.000 · 09:00 · Casa de Roberto Molina
- [ ] `paraiso-guanacos-casita-de-cristal` — $270.000 · 08:30 · Parador Julio Cesar
- [ ] `los-gigantes-cerro-mogote-cajones` — $270.000 · 08:30 · Parador el Cóndor Altas Cumbres
- [ ] `circuito-cumbrecita-lagunita-corona-garganta-2d` — $270.000 · 09:15 · Casa de Roberto Molina

### Tanda C — 3 días / 2 noches
- [ ] `circuito-cumbrecita-lagunita-corona-garganta-3d` — $270.000 · 09:15 · Casa de Roberto Molina
- [ ] `dos-gigantes-champaqui-totora` — $370.000 · 09:15 · Villa Alpina
- [ ] `altas-cumbres-nacientes-mina-clavero` — $470.000 · 08:30 · Parador Julio Cesar, Villa Cura Brochero

### Definir (no disponibles)
- [ ] `casita-de-cristal-cinco-saltos` — falta: duración, dificultad, terreno/distancia, precio, horarios, reunión, incluye, itinerario, imágenes
- [ ] `circuito-cumbrecita-lagunita-ventana-garganta` — falta: ídem anterior

## Bases para copiar estructura (ya completos)

| Duración | Tour de referencia |
|---|---|
| 1 día | `rio-subterraneo-cascada-escondida` |
| 2 días / 1 noche | `velo-novia-pueblo-escondido` |
| 3 días / 2 noches | `champaqui` |

## Convenciones

- Duración: `'1 día'`, `'6 hs'`, `'7 hs'`, `'2 días / 1 noche'`, `'3 días / 2 noches'`
- Dificultad / terreno: `'Baja' \| 'Media' \| 'Alta'`; distancia: `'Media' \| 'Alta'`; `null` si no aplica
- Precio: número sin formato (`55000`) — la UI lo formatea con `formatPrecio()`
- Hora de salida sola en `horarios` (ej. `'09:15'`), texto libre solo si no aplica (ej. `'Consultar fechas y horarios'`)
- No incluir el campo `pago`

## Cómo cargar contenido

1. Pasame la info del tour (texto suelto, notas, lo que sea) → yo la normalizo al esquema.
2. Solta las fotos en `public/assets/tours/<slug>/` y avisame → actualizo `imagen`/`imagenes`.
3. Corré `npm run check:tours` para validar congruencia.
