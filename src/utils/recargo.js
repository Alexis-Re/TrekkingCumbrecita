// Recargo por fecha alta: +18,4% en feriados y findes largos.
//
// Regla:
// - Aplica si CUALQUIER día del rango de la salida (fecha → fin, inclusive) es
//   feriado nacional (ver src/data/feriados.js).
// - Aplica también si el rango toca la ventana de un "finde largo": cuando el
//   feriado cae un viernes → ventana vie-sáb-dom; cuando cae un lunes →
//   ventana sáb-dom-lun. Así una salida sáb-dom con lunes puente lleva
//   recargo aunque no pise el día feriado.
// - Se aplica UNA sola vez sobre el precio base y se redondea a la centena
//   más cercana.
//
// Se usa desde Calendario.vue (fechas confirmadas) y TourModal.vue (cuando la
// fecha viene del calendario).

import { feriadosDe } from '../data/feriados.js'

export const RECARGO = 0.184

function parsear(valor) {
  const [anio, mes, dia] = valor.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

function clave(fecha) {
  return [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, '0'),
    String(fecha.getDate()).padStart(2, '0')
  ].join('-')
}

function sumarDias(fecha, dias) {
  const copia = new Date(fecha)
  copia.setDate(copia.getDate() + dias)
  return copia
}

// Claves 'YYYY-MM-DD' de inicio a fin (inclusive). Sin `fin`, o si `fin` es
// anterior a inicio, solo el día de inicio.
function diasDelRango(inicio, fin) {
  const dias = []
  const desde = parsear(inicio)
  const hasta = fin && fin >= inicio ? parsear(fin) : desde
  const actual = new Date(desde)
  while (actual <= hasta) {
    dias.push(clave(actual))
    actual.setDate(actual.getDate() + 1)
  }
  return dias
}

// Feriados de los años que pueden afectar el rango: se incluye el año anterior
// al inicio porque una ventana de finde largo (vie o lun) puede cruzar el año
// nuevo.
function feriadosDelRango(inicio, fin) {
  const anioInicio = Number(inicio.slice(0, 4))
  const anioFin = Number((fin || inicio).slice(0, 4))
  const anios = new Set([anioInicio - 1, anioInicio, anioFin])
  return [...anios].sort().flatMap((anio) => feriadosDe(anio))
}

// Evalúa la regla del recargo sobre el rango completo de una salida.
// Devuelve { aplica: Boolean, motivos: [{ tipo: 'feriado' | 'finde-largo', nombre, fecha }] }
export function evaluarRecargo(inicio, fin) {
  const motivos = []
  if (!inicio) return { aplica: false, motivos }

  const dias = new Set(diasDelRango(inicio, fin))
  const vistos = new Set()

  const agregar = (motivo) => {
    const id = `${motivo.tipo}:${motivo.nombre}`
    if (vistos.has(id)) return
    vistos.add(id)
    motivos.push(motivo)
  }

  for (const feriado of feriadosDelRango(inicio, fin)) {
    // 1) El feriado cae dentro del rango de la salida.
    if (dias.has(feriado.fecha)) {
      agregar({ tipo: 'feriado', nombre: feriado.nombre, fecha: feriado.fecha })
    }

    // 2) Finde largo: viernes o lunes feriado → ventana de 3 días.
    const fecha = parsear(feriado.fecha)
    const diaSemana = fecha.getDay()
    let ventana = null
    if (diaSemana === 5) ventana = [fecha, sumarDias(fecha, 1), sumarDias(fecha, 2)] // vie → vie/sáb/dom
    else if (diaSemana === 1) ventana = [sumarDias(fecha, -2), sumarDias(fecha, -1), fecha] // lun → sáb/dom/lun
    if (!ventana) continue

    if (ventana.some((dia) => dias.has(clave(dia)))) {
      agregar({ tipo: 'finde-largo', nombre: feriado.nombre, fecha: feriado.fecha })
    }
  }

  return { aplica: motivos.length > 0, motivos }
}

// Precio final con recargo, redondeado a la centena más cercana.
export function precioConRecargo(precio) {
  if (precio == null) return null
  return Math.round((precio * (1 + RECARGO)) / 100) * 100
}
