// Validación de congruencia de tours: node scripts/validate-tours.mjs
import { tours } from '../src/data/tours.js'
import { salidas, TIPO_SALIDA_DIA } from '../src/data/calendario.js'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DURACIONES = ['1 día', '6 hs', '7 hs', '2 días / 1 noche', '3 días / 2 noches', '7 días / 6 noches', 'Definir']
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
  for (const campo of ['requisitos', 'equipamiento']) {
    if (campo in t && !Array.isArray(t[campo])) errores.push(`${id}: ${campo} debe ser array`)
  }
  if ('cupoMax' in t && (typeof t.cupoMax !== 'number' || t.cupoMax < 1)) errores.push(`${id}: cupoMax debe ser número positivo`)
}

const slugsValidos = new Set(slugs)
const salidasUnicas = new Set()

function fechaISOValida(fecha) {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false
  const [anio, mes, dia] = fecha.split('-').map(Number)
  return new Date(Date.UTC(anio, mes - 1, dia)).toISOString().slice(0, 10) === fecha
}

for (const salida of salidas) {
  if (!salida || typeof salida !== 'object') {
    errores.push('calendario: cada salida debe ser un objeto')
    continue
  }

  const fechaValida = fechaISOValida(salida.fecha)
  if (!fechaValida) errores.push(`calendario: fecha inválida: "${salida.fecha}"`)

  if (salida.tipo != null && salida.tipo !== TIPO_SALIDA_DIA) {
    errores.push(`calendario ${salida.fecha}: tipo de salida desconocido: "${salida.tipo}"`)
  }

  if (salida.tipo === TIPO_SALIDA_DIA) {
    if (salida.slug != null) errores.push(`calendario ${salida.fecha}: salida genérica no debe tener slug de tour`)
    if (salida.fin != null) errores.push(`calendario ${salida.fecha}: salida de un día no debe tener fecha "fin"`)
  } else if (!slugsValidos.has(salida.slug)) {
    errores.push(`calendario ${salida.fecha}: tour inexistente para slug "${salida.slug}"`)
  }

  if (salida.fin != null) {
    if (!fechaISOValida(salida.fin)) {
      errores.push(`calendario ${salida.fecha}: fecha fin inválida: "${salida.fin}"`)
    } else if (fechaValida && salida.fin < salida.fecha) {
      errores.push(`calendario ${salida.fecha}: fecha fin anterior a la fecha de inicio`)
    }
  }

  const tipoOslug = salida.tipo === TIPO_SALIDA_DIA ? TIPO_SALIDA_DIA : salida.slug
  const claveUnica = `${salida.fecha}:${tipoOslug}`
  if (salidasUnicas.has(claveUnica)) errores.push(`calendario ${salida.fecha}: salida duplicada (${tipoOslug})`)
  salidasUnicas.add(claveUnica)
}

console.log(`Tours: ${tours.length} | disponibles: ${tours.filter((t) => t.disponible).length} | salidas de calendario: ${salidas.length}`)
if (advertencias.length) console.log('\nAdvertencias:\n  ' + advertencias.join('\n  '))
if (errores.length) {
  console.error('\nErrores:\n  ' + errores.join('\n  '))
  process.exit(1)
}
console.log('\nOK: sin errores de congruencia')
