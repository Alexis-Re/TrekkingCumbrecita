// Validación de congruencia de tours: node scripts/validate-tours.mjs
import { tours } from '../src/data/tours.js'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DURACIONES = ['1 día', '6 hs', '7 hs', '2 días / 1 noche', '3 días / 2 noches', 'Definir']
const NIVELES = ['Baja', 'Media', 'Alta', null]

const errores = []
const advertencias = []

const slugs = tours.map((t) => t.slug)
for (const slug of slugs) {
  if (slugs.filter((s) => s === slug).length > 1) {
    errores.push(`${slug}: slug duplicado`)
  }
}

for (const t of tours) {
  const id = t.slug || '(sin slug)'

  if (!t.nombre) errores.push(`${id}: falta nombre`)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug || '')) errores.push(`${id}: slug inválido (kebab-case)`)
  if (!DURACIONES.includes(t.duracion)) errores.push(`${id}: duración inválida: "${t.duracion}"`)
  if (!NIVELES.includes(t.dificultad)) errores.push(`${id}: dificultad inválida: ${t.dificultad}`)
  if (!NIVELES.includes(t.terreno)) errores.push(`${id}: terreno inválido: ${t.terreno}`)
  if (!['Media', 'Alta', null].includes(t.distancia)) errores.push(`${id}: distancia inválida: ${t.distancia}`)
  if (t.precio != null && typeof t.precio !== 'number') errores.push(`${id}: precio debe ser número o null`)
  if ('pago' in t) errores.push(`${id}: campo "pago" no debe existir`)
  if (!Array.isArray(t.incluye) || !Array.isArray(t.itinerario) || !Array.isArray(t.imagenes)) {
    errores.push(`${id}: incluye/itinerario/imagenes deben ser arrays`)
  }

  if (t.disponible === false) {
    if (t.precio !== null || t.duracion !== 'Definir' || t.dificultad !== null) {
      errores.push(`${id}: no disponible pero tiene datos cargados`)
    }
    continue
  }

  // Tour disponible: contenido mínimo esperado
  if (t.precio === null || t.duracion === 'Definir' || t.dificultad === null) {
    errores.push(`${id}: disponible pero con datos faltantes (precio/duración/dificultad)`)
  }
  if (!t.reunion) errores.push(`${id}: disponible sin punto de reunión`)
  if (!t.horarios) errores.push(`${id}: disponible sin horarios`)

  const imagenes = [t.imagen, ...t.imagenes].filter(Boolean)
  if (!imagenes.length) errores.push(`${id}: sin imagen`)
  for (const img of imagenes) {
    if (!existsSync(resolve(root, 'public', img.replace(/^\//, '')))) errores.push(`${id}: imagen inexistente: ${img}`)
  }
  if (t.imagen.endsWith('default.svg')) {
    advertencias.push(`${id}: usa imagen default — falta portada en public/assets/tours/${t.slug}/`)
  }
  if (!t.incluye.length) {
    advertencias.push(`${id}: sin lista "incluye" (el modal muestra placeholder)`)
  }
  if (!t.itinerario.length) {
    advertencias.push(`${id}: sin itinerario (el modal muestra placeholder)`)
  }
  for (const dia of t.itinerario) {
    if (!dia.dia || !dia.titulo || !Array.isArray(dia.horas) || !dia.horas.length) {
      errores.push(`${id}: día de itinerario incompleto`)
      break
    }
  }
}

console.log(`Tours: ${tours.length} | disponibles: ${tours.filter((t) => t.disponible).length}`)
if (advertencias.length) console.log('\nAdvertencias:\n  ' + advertencias.join('\n  '))
if (errores.length) {
  console.error('\nErrores:\n  ' + errores.join('\n  '))
  process.exit(1)
}
console.log('\nOK: sin errores de congruencia')
