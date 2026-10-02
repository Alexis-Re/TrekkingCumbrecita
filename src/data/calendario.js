import { feriadosDe } from './feriados.js'

// Salidas organizadas — única fuente de fechas para la sección Calendario.
//
// Formato de cada entrada:
//   { fecha: 'YYYY-MM-DD', fin?: 'YYYY-MM-DD', slug: '<slug existente en tours.js>', nota?: String }
//
// `fin` (opcional) = último día de una salida multiday. Si existe, la grilla marca
// todos los días del rango y el panel del día muestra la salida en cualquiera de
// ellos. Sin `fin` se marca solo el día de inicio.
//
// El nombre, imagen y precio se resuelven desde `src/data/tours.js` por `slug`,
// así no se duplica información entre archivos.
//
// ⚠️ Cargar solo fechas REALES confirmadas. Los meses sin salidas quedan vacíos
// a propósito: la sección muestra "Todavía no hay salidas cargadas para este mes".
// Nunca agregar fechas de ejemplo.
export const salidas = [
  // Octubre 2026 — feriado: 12/10 (Día del Respeto a la Diversidad Cultural, lunes)
  { fecha: '2026-10-10', fin: '2026-10-12', slug: 'champaqui' },
  { fecha: '2026-10-16', fin: '2026-10-18', slug: 'cumbrecita-quebrada-yatan-paso-garay' },
  { fecha: '2026-10-24', fin: '2026-10-25', slug: 'travesia-cumbrecita-villa-alpina' },
]

// Salidas de un mes ('YYYY-MM'), ordenadas por fecha.
// `slug` opcional: filtra las salidas de un tour específico (null = todas).
export function salidasDelMes(month, slug = null) {
  return salidas
    .filter((salida) => salida.fecha.startsWith(month) && (!slug || salida.slug === slug))
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
}

// Claves 'YYYY-MM-DD' que cubre una salida: todos los días de `fecha` a `fin`
// (inclusive). Sin `fin`, o si `fin` es anterior a `fecha`, solo el día de inicio.
function diasDeSalida(salida) {
  const dias = [salida.fecha]
  if (!salida.fin || salida.fin < salida.fecha) return dias

  const [anioFin, mesFin, diaFin] = salida.fin.split('-').map(Number)
  const [anio, mes, dia] = salida.fecha.split('-').map(Number)
  const hasta = new Date(anioFin, mesFin - 1, diaFin)

  const actual = new Date(anio, mes - 1, dia)
  actual.setDate(actual.getDate() + 1)
  while (actual <= hasta) {
    dias.push(
      `${actual.getFullYear()}-${String(actual.getMonth() + 1).padStart(2, '0')}-${String(actual.getDate()).padStart(2, '0')}`,
    )
    actual.setDate(actual.getDate() + 1)
  }
  return dias
}

// Devuelve las marcas de un mes en el formato que espera CalendarGrid:
//   { 'YYYY-MM-DD': { salidas: Number, feriado: String, rango?: { inicio, fin } } }
// `rango` solo aparece en los días cubiertos por una salida multiday y contiene
// el rango completo (fecha de inicio y fin de la salida), para que la grilla
// pinte la banda que conecta las celdas.
// `month` tiene formato 'YYYY-MM'. Si un día tiene dos feriados (fechas solapadas)
// los nombres se unen con ' · '.
// `slug` opcional: marca solo las salidas de un tour específico (usado por el
// TourModal para mostrar únicamente las fechas de ese tour). Los feriados
// nunca se filtran.
export function marksDelMes(month, slug = null) {
  const [anio, mes] = month.split('-').map(Number)
  const prefijo = `${anio}-${String(mes).padStart(2, '0')}`
  const marks = {}

  for (const feriado of feriadosDe(anio)) {
    if (!feriado.fecha.startsWith(prefijo)) continue
    const slot = (marks[feriado.fecha] ||= {})
    slot.feriado = slot.feriado ? `${slot.feriado} · ${feriado.nombre}` : feriado.nombre
  }

  for (const salida of salidas) {
    if (slug && salida.slug !== slug) continue
    const multiday = Boolean(salida.fin && salida.fin > salida.fecha)
    // Marca todos los días del rango (multiday con `fin`), solo si caen en el mes.
    for (const dia of diasDeSalida(salida)) {
      if (!dia.startsWith(prefijo)) continue
      const slot = (marks[dia] ||= {})
      slot.salidas = (slot.salidas || 0) + 1
      // Rango completo para que CalendarGrid dibuje la banda de conexión.
      if (multiday) slot.rango ||= { inicio: salida.fecha, fin: salida.fin }
    }
  }

  return marks
}
