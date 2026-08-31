export const formatPrecio = (precio) =>
  precio == null ? null : '$' + precio.toLocaleString('es-AR')
