// Feriados nacionales argentinos para el calendario público.
//
// Reglas aplicadas (Ley 27.399):
// - FIJOS: fechas inamovibles y días no laborables fijos → nunca se mueven.
// - TRASLADABLES: art. 6 — martes o miércoles se trasladan al lunes anterior;
//   jueves o viernes al lunes siguiente.
// - SEMANA SANTA: Jueves y Vierno Santo se derivan de la Pascua (algoritmo gregoriano).
// - TURISTICOS: art. 7 — hasta 3 por año los fija el Poder Ejecutivo; se cargan a mano
//   cuando se publican (2026: Resolución 164/2025 → 23/03, 10/07, 07/12.
//   2027: todavía sin publicar).
//
// No se incluyen: feriados locales de Córdoba / La Cumbrecita, ni días no laborables
// de otras comunidades (Pesaj, Año Nuevo Judío, etc.).

const FIJOS = [
  ['01-01', 'Año Nuevo', 'inamovible'],
  ['03-24', 'Día Nacional de la Memoria por la Verdad y la Justicia', 'inamovible'],
  ['04-02', 'Día del Veterano y de los Caídos en la Guerra de Malvinas', 'inamovible'],
  ['05-01', 'Día del Trabajador', 'inamovible'],
  ['05-25', 'Día de la Revolución de Mayo', 'inamovible'],
  ['06-20', 'Paso a la Inmortalidad del Gral. Manuel Belgrano', 'inamovible'],
  ['07-09', 'Día de la Independencia', 'inamovible'],
  ['12-08', 'Inmaculada Concepción de María', 'inamovible'],
  ['12-25', 'Navidad', 'inamovible']
]

const TRASLADABLES = [
  ['06-17', 'Paso a la Inmortalidad del Gral. Martín Miguel de Güemes'],
  ['08-17', 'Paso a la Inmortalidad del Gral. José de San Martín'],
  // Denominación según Ley 27.399 (el calendario oficial 2026 de argentina.gob.ar
  // lo muestra como "Día de la Raza"; acá se mantiene la de la ley).
  ['10-12', 'Día del Respeto a la Diversidad Cultural'],
  ['11-20', 'Día de la Soberanía Nacional']
]

const TURISTICOS = {
  2026: [
    ['03-23', 'Día no laborable con fines turísticos'],
    ['07-10', 'Día no laborable con fines turísticos'],
    ['12-07', 'Día no laborable con fines turísticos']
  ]
}

function clave(fecha) {
  return [fecha.getFullYear(), String(fecha.getMonth() + 1).padStart(2, '0'), String(fecha.getDate()).padStart(2, '0')].join('-')
}

function sumarDias(fecha, dias) {
  const copia = new Date(fecha)
  copia.setDate(copia.getDate() + dias)
  return copia
}

// Domingo de Pascua (algoritmo gregoriano)
function domingoDePascua(anio) {
  const a = anio % 19
  const b = Math.floor(anio / 100)
  const c = anio % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mes = Math.floor((h + l - 7 * m + 114) / 31)
  const dia = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(anio, mes - 1, dia)
}

// Regla de traslado del art. 6 de la Ley 27.399 (solo trasladables):
// martes o miércoles → lunes anterior; jueves o viernes → lunes siguiente.
// Si cae sábado o domingo NO se mueve por esta vía: se requiere una resolución
// especial (ej. Resolución 139/2025 llevó el 12/10/2025, domingo, al viernes 10/10).
function trasladar(fecha) {
  const dia = fecha.getDay()
  if (dia === 2) return sumarDias(fecha, -1) // martes → lunes anterior
  if (dia === 3) return sumarDias(fecha, -2) // miércoles → lunes anterior
  if (dia === 4) return sumarDias(fecha, 4) // jueves → lunes siguiente
  if (dia === 5) return sumarDias(fecha, 3) // viernes → lunes siguiente
  return fecha
}

// Devuelve el listado del año ordenado por fecha.
// Cada entrada: { fecha: 'YYYY-MM-DD', nombre, tipo }
// tipo: 'inamovible' | 'trasladable' | 'no-laborable' | 'turistico'
export function feriadosDe(anio) {
  const pascua = domingoDePascua(anio)

  const listado = [
    ...FIJOS.map(([mesDia, nombre, tipo]) => ({ fecha: `${anio}-${mesDia}`, nombre, tipo })),
    ...TRASLADABLES.map(([mesDia, nombre]) => {
      const [mes, dia] = mesDia.split('-').map(Number)
      return { fecha: clave(trasladar(new Date(anio, mes - 1, dia))), nombre, tipo: 'trasladable' }
    }),
    { fecha: clave(sumarDias(pascua, -48)), nombre: 'Carnaval', tipo: 'inamovible' },
    { fecha: clave(sumarDias(pascua, -47)), nombre: 'Carnaval', tipo: 'inamovible' },
    { fecha: clave(sumarDias(pascua, -3)), nombre: 'Jueves Santo', tipo: 'no-laborable' },
    { fecha: clave(sumarDias(pascua, -2)), nombre: 'Viernes Santo', tipo: 'inamovible' },
    ...(TURISTICOS[anio] || []).map(([mesDia, nombre]) => ({ fecha: `${anio}-${mesDia}`, nombre, tipo: 'turistico' }))
  ]

  return listado.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.nombre.localeCompare(b.nombre))
}
