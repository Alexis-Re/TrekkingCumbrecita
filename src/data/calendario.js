import { feriadosDe } from './feriados.js'

export const TIPO_SALIDA_DIA = 'salida-dia'

// Salidas organizadas — única fuente de fechas para la sección Calendario.
//
// Formato de cada entrada:
//   Tour: { fecha: 'YYYY-MM-DD', fin?: 'YYYY-MM-DD', slug: '<slug existente en tours.js>' }
//   Salida genérica de un día: { fecha: 'YYYY-MM-DD', tipo: TIPO_SALIDA_DIA }
//
// `fin` (opcional) = último día de una salida multiday. Si existe, la grilla marca
// todos los días del rango y el panel del día muestra la salida en cualquiera de
// ellos. Sin `fin` se marca solo el día de inicio.
//
// El nombre, imagen y precio de los tours se resuelven desde `src/data/tours.js`.
// Las salidas genéricas no tienen recorrido ni precio asignado: se consultan por WhatsApp.
//
// ⚠️ Cargar solo fechas REALES confirmadas. Los meses sin salidas quedan vacíos
// a propósito: la sección muestra "Todavía no hay salidas cargadas para este mes".
// Nunca agregar fechas de ejemplo.
export const salidas = [
  // Octubre 2026 — feriado: 12/10 (Día del Respeto a la Diversidad Cultural, lunes)
  { fecha: '2026-10-10', fin: '2026-10-12', slug: 'champaqui' },
  { fecha: '2026-10-16', fin: '2026-10-18', slug: 'cumbrecita-quebrada-yatan-paso-garay' },
  { fecha: '2026-10-24', fin: '2026-10-25', slug: 'travesia-cumbrecita-villa-alpina' },

  // Noviembre 2026 — feriado por el Día de la Soberanía Nacional: lunes 23/11
  // Salidas genéricas de un día: recorrido y precio a consultar.
  { fecha: '2026-11-02', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-04', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-06', fin: '2026-11-08', slug: 'champaqui' },
  { fecha: '2026-11-09', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-11', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-13', fin: '2026-11-15', slug: 'champaqui' },
  { fecha: '2026-11-16', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-18', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-20', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-22', fin: '2026-11-23', slug: 'excursion-nocturna-cumbrecita-villa-alpina' },
  { fecha: '2026-11-25', tipo: TIPO_SALIDA_DIA },
  { fecha: '2026-11-27', tipo: TIPO_SALIDA_DIA },
]

// Salidas de un mes ('YYYY-MM'), ordenadas por fecha.
// `filtro` puede ser el slug de un tour, { tipo: 'salida-dia' } o null (todas).
function coincideFiltro(salida, filtro) {
  if (!filtro) return true
  if (typeof filtro === 'string') return salida.slug === filtro
  return salida.tipo === filtro.tipo
}

export function salidasDelMes(month, filtro = null) {
  return salidas
    .filter((salida) => salida.fecha.startsWith(month) && coincideFiltro(salida, filtro))
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
//   { 'YYYY-MM-DD': { salidas, salidasConfirmadas, salidasPosibles, feriado, rango? } }
// `rango` solo aparece en los días cubiertos por una salida multiday y contiene
// el rango completo (fecha de inicio y fin de la salida), para que la grilla
// pinte la banda que conecta las celdas.
// `month` tiene formato 'YYYY-MM'. Si un día tiene dos feriados (fechas solapadas)
// los nombres se unen con ' · '.
// `filtro` opcional: slug de un tour o { tipo: 'salida-dia' }. También acepta
// null para todas las salidas. (TourModal sigue pasando el slug del tour.)
// Los feriados nunca se filtran.
export function marksDelMes(month, filtro = null) {
  const [anio, mes] = month.split('-').map(Number)
  const prefijo = `${anio}-${String(mes).padStart(2, '0')}`
  const marks = {}

  for (const feriado of feriadosDe(anio)) {
    if (!feriado.fecha.startsWith(prefijo)) continue
    const slot = (marks[feriado.fecha] ||= {})
    slot.feriado = slot.feriado ? `${slot.feriado} · ${feriado.nombre}` : feriado.nombre
  }

  for (const salida of salidas) {
    if (!coincideFiltro(salida, filtro)) continue
    const multiday = Boolean(salida.fin && salida.fin > salida.fecha)
    // Marca todos los días del rango (multiday con `fin`), solo si caen en el mes.
    for (const dia of diasDeSalida(salida)) {
      if (!dia.startsWith(prefijo)) continue
      const slot = (marks[dia] ||= {})
      slot.salidas = (slot.salidas || 0) + 1
      const tipoMarca = salida.tipo === TIPO_SALIDA_DIA ? 'salidasPosibles' : 'salidasConfirmadas'
      slot[tipoMarca] = (slot[tipoMarca] || 0) + 1
      // Rango completo para que CalendarGrid dibuje la banda de conexión.
      if (multiday) slot.rango ||= { inicio: salida.fecha, fin: salida.fin }
    }
  }

  return marks
}
