export const formatPrecio = (precio) =>
  precio == null ? null : '$' + precio.toLocaleString('es-AR')

// Nota junto al precio base cuando la fecha aún no aplica recargo.
// Usado en las cards (Tours.vue) y en el modal (TourModal.vue).
export const AVISO_TARIFA_DIFERENCIAL = 'Findes largos y feriados: tarifa diferencial'

// Etiqueta corta para badges de tarifa diferencial (calendario y modal).
export const ETIQUETA_TARIFA_DIFERENCIAL = 'Tarifa diferencial'
