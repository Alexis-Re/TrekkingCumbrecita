// Estado global del TourModal: una sola instancia para toda la app.
//
// Tours.vue monta el <TourModal> y Calendario.vue lo abre pasando la fecha de
// la salida (para que el modal aplique el recargo de feriados/findes largos).
// Refs a nivel de módulo → singleton compartido por todos los consumidores.

import { ref } from 'vue'

const tourAbierto = ref(null)
// Rango de la salida que disparó la apertura: { fecha: 'YYYY-MM-DD', fin?: 'YYYY-MM-DD' } | null
const fechaSalida = ref(null)

export function useTourModal() {
  function abrirTour(tour, rango = null) {
    if (!tour) return
    tourAbierto.value = tour
    fechaSalida.value = rango ? { fecha: rango.fecha, fin: rango.fin ?? null } : null
  }

  function cerrarTour() {
    tourAbierto.value = null
    fechaSalida.value = null
  }

  return { tourAbierto, fechaSalida, abrirTour, cerrarTour }
}
