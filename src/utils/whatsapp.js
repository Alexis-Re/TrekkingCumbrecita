const WHATSAPP_NUMBER = '5493546453047'

export function crearMensajeReserva(tour, fecha, cantidad) {
  const [year, month, day] = fecha.split('-')
  const fechaFormateada = `${day}/${month}/${year}`
  const mensaje = `Hola Rober, quiero reservar el trekking ${tour.nombre} para el ${fechaFormateada}. Somos ${cantidad} personas.`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export function crearConsultaTour(tour) {
  const mensaje = `Hola Rober, quiero consultar por el trekking ${tour.nombre}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}
