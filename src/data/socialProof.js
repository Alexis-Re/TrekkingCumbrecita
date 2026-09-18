import { tours } from './tours.js'
import { testimonios } from './testimonios.js'

const experienciasDisponibles = tours.filter((t) => t.disponible).length

export const stats = [
  { valor: '+27', sufijo: 'años', label: 'de experiencia guiando' },
  { valor: '+5000', sufijo: 'personas', label: 'acompañadas en la montaña' },
  { valor: `${experienciasDisponibles}`, sufijo: 'experiencias', label: 'desde 1 día hasta 7 días' }
]

export const badges = [
  { icono: 'guia', label: 'Prestador habilitado', target: 'acreditacion' },
  { icono: 'seguro', label: 'Seguro médico incluido' },
  { icono: 'radio', label: 'Comunicación VHF' }
]

export const testimonioDestacado = testimonios[0]

export const avatars = [
  { src: '/assets/tours/champaqui/grupo-bandera-champa.webp', alt: 'Grupo en la cumbre del Champaquí' },
  { src: '/assets/tours/pueblo-escondido/gente-cascada-bandera.webp', alt: 'Grupo en cascada, Pueblo Escondido' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-saltando.webp', alt: 'Grupo en Río Subterráneo' },
  { src: '/assets/tours/quebrada-yatan/grupo-cascada.webp', alt: 'Grupo en Quebrada del Yatán' }
]
