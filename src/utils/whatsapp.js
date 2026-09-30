import { detalleFeriado } from './fechas.js'

const WHATSAPP_NUMBER = '5493546453047'

// 12/10 (sin año) — para nombrar un feriado dentro del mensaje
function fechaCorta(fechaISO) {
  const [, mes, dia] = fechaISO.split('-')
  return `${dia}/${mes}`
}

// 12/10/2026 — fecha de la reserva
function fechaCompleta(fechaISO) {
  const [anio, mes, dia] = fechaISO.split('-')
  return `${dia}/${mes}/${anio}`
}

// Nombres de feriado sin repetir, unidos con " y " (Carnaval cae 2 días seguidos)
function nombresFeriados(feriados) {
  return [...new Set(feriados.map((feriado) => feriado.nombre))].join(' y ')
}

// Mensaje de reserva por WhatsApp.
//
// Además de la fecha, informa los feriados que caen dentro del rango del tour:
// - rango normal → "el 12/10 es feriado: <nombre>" (o "ese día" si es 1 día)
// - puente / fin de semana largo → "el tour completo cae en el fin de semana
//   largo" y se agrega la nota de tarifa diferencial.
// Los tours multiday dicen "del X al Y" en vez de solo la fecha de inicio.
export function crearMensajeReserva(tour, fecha, cantidad) {
  const info = detalleFeriado(fecha, tour.duracion)
  const [inicio, fin] = [info.rango[0], info.rango[info.rango.length - 1]]
  const periodo = info.dias > 1 ? `del ${fechaCompleta(inicio)} al ${fechaCompleta(fin)}` : `para el ${fechaCompleta(fecha)}`

  let nota = ''
  if (info.esPuente) {
    const detalle = info.feriados.length === 1
      ? `feriado del ${fechaCorta(info.feriados[0].fecha)} — ${info.feriados[0].nombre}`
      : `feriados: ${info.feriados.map((feriado) => `${fechaCorta(feriado.fecha)} ${feriado.nombre}`).join(' · ')}`
    nota = ` (el tour completo cae en el fin de semana largo: ${info.dias} días, ${detalle})`
  } else if (info.hayFeriado) {
    if (info.dias === 1) {
      nota = ` (ese día es feriado: ${nombresFeriados(info.feriados)})`
    } else if (info.feriados.length === 1) {
      nota = ` (el ${fechaCorta(info.feriados[0].fecha)} es feriado: ${info.feriados[0].nombre})`
    } else {
      nota = ` (los días ${info.feriados.map((feriado) => fechaCorta(feriado.fecha)).join(' y ')} son feriados: ${nombresFeriados(info.feriados)})`
    }
  }

  const tarifa = info.esPuente ? ' Sé que en puentes aplica la tarifa diferencial.' : ''
  const mensaje = `Hola Rober, quiero reservar el trekking ${tour.nombre} ${periodo}${nota}. Somos ${cantidad} personas.${tarifa}`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export function crearConsultaTour(tour) {
  const mensaje = `Hola Rober, quiero consultar por el trekking ${tour.nombre}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}
