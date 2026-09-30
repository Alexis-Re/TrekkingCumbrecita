import { feriadosDe } from '../data/feriados.js'

// Utilidades de fechas para reservas: duración del tour, rango de días que
// cubre una salida y detalle de feriados dentro de ese rango.
//
// Se usan en dos lugares y deben dar siempre el mismo resultado:
// - `Tours.vue` (parser de duración para los filtros)
// - `whatsapp.js` / `TourModal.vue` (nota de feriado en el mensaje y en el DatePicker)

const cacheFeriados = new Map()

function feriadosDelAnio(anio) {
  if (!cacheFeriados.has(anio)) cacheFeriados.set(anio, feriadosDe(anio))
  return cacheFeriados.get(anio)
}

export function parsearFecha(fechaISO) {
  const [anio, mes, dia] = String(fechaISO).split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export function claveDe(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

function sumarDias(date, dias) {
  const copia = new Date(date)
  copia.setDate(copia.getDate() + dias)
  return copia
}

// '2 días / 1 noche' → 2 · '1 día' → 1 · '6 hs' o 'Definir' → null
// Devuelve null (no 1) cuando el texto no menciona días, para que el filtro de
// duración de Tours.vue pueda distinguir una jornada de horas de "1 día".
export function diasDeTour(duracion = '') {
  const coincidencia = String(duracion).match(/(\d+)\s*d[ií]a/i)
  return coincidencia ? Number(coincidencia[1]) : null
}

// Claves 'YYYY-MM-DD' que cubre una salida que empieza en `fechaISO`.
// Cantidad de días = duración del tour (mínimo 1, por si el texto no la tiene).
export function rangoTour(fechaISO, dias) {
  const cantidad = Math.max(1, Number(dias) || 1)
  const inicio = parsearFecha(fechaISO)
  return Array.from({ length: cantidad }, (_, i) => claveDe(sumarDias(inicio, i)))
}

function esFinde(fechaISO) {
  const dia = parsearFecha(fechaISO).getDay()
  return dia === 0 || dia === 6
}

// Detalle de feriados dentro del rango que cubre la salida.
//
//   feriados          feriados que caen dentro del rango (fecha, nombre, tipo)
//   todosNoLaborables cada día del rango es sábado, domingo o feriado
//   esPuente          ≥2 días y todo el rango es no laborable con al menos un
//                     feriado → "fin de semana largo" / puente: el tour completo
//                     cae dentro de los días no laborables.
export function detalleFeriado(fechaISO, duracion) {
  const dias = diasDeTour(duracion) ?? 1
  const rango = rangoTour(fechaISO, dias)
  const feriados = []

  for (const clave of rango) {
    const anio = Number(clave.slice(0, 4))
    for (const feriado of feriadosDelAnio(anio)) {
      if (feriado.fecha === clave) feriados.push(feriado)
    }
  }

  const todosNoLaborables = rango.every((clave) => esFinde(clave) || feriados.some((f) => f.fecha === clave))

  return {
    fecha: fechaISO,
    dias,
    rango,
    feriados,
    hayFeriado: feriados.length > 0,
    todosNoLaborables,
    esPuente: dias >= 2 && todosNoLaborables && feriados.length > 0
  }
}
