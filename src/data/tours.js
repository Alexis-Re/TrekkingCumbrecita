// Esquema de tour:
// - nombre: String
// - slug: String (único, kebab-case)
// - duracion: '1 día' | '6 hs' | '7 hs' | '2 días / 1 noche' | '3 días / 2 noches' | 'Definir'
// - dificultad: 'Baja' | 'Media' | 'Alta' | null (null = Definir)
// - terreno: 'Baja' | 'Media' | 'Alta' | null
// - distancia: 'Media' | 'Alta' | null
// - precio: Number | null (null = Definir) — formatear con formatPrecio() en UI
// - disponible: Boolean (false = Próximamente, no abre modal ni aparece en el formulario)
// - requisitos: String[] (condiciones para participar — opcional)
// - equipamiento: String[] (lista de equipo que debe llevar el participante — opcional)
// - cupoMax: Number (cupos máximos por salida — opcional)
export const tours = [
  {
    nombre: 'Cumbrecita: Río Subterráneo y Cascada Escondida',
    duracion: '7 hs',
    dificultad: 'Media',
    terreno: null,
    distancia: null,
    precio: 55000,
    precioDetalle: 'Efectivo o transferencia · $60.000 en 3 cuotas sin interés',
    disponible: true,
    imagen: '/assets/tours/Cumbrecitariosubtecascada/grupo-saltando.webp',
    slug: 'rio-subterraneo-cascada-escondida',
    imagenes: [
      '/assets/tours/Cumbrecitariosubtecascada/grupo-saltando.webp',
      '/assets/tours/Cumbrecitariosubtecascada/cascada.webp',
      '/assets/tours/Cumbrecitariosubtecascada/gente-cascada.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-altura-paisaje.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-bañandose.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-enorme.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-montaña.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-paisaje.altura.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-piedras-baño.webp',
      '/assets/tours/Cumbrecitariosubtecascada/grupo-subiendo-vininedo.webp',
      '/assets/tours/Cumbrecitariosubtecascada/pasiaje-grupo.webp'
    ],
    horarios: 'Sábados, domingos y feriados · 09:00',
    incluye: [
      'Guía habilitado',
      'Seguro médico',
      'Vianda de marcha',
      'Comunicación por radio VHF'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Río Subterráneo y Cascada Escondida',
        horas: [
          { hora: '09:00', evento: 'Encuentro en Panadería de La Cumbrecita' },
          { hora: '09:15', evento: 'Inicio del trekking hacia el Río Subterráneo' },
          { hora: '11:00', evento: 'Ingreso al Río Subterráneo (primer tramo)' },
          { hora: '12:30', evento: 'Descanso y vianda de marcha' },
          { hora: '13:00', evento: 'Continuación hacia la Cascada Escondida (segundo tramo)' },
          { hora: '14:30', evento: 'Llegada a la Cascada Escondida – baño y descanso' },
          { hora: '15:30', evento: 'Regreso' },
          { hora: '16:00', evento: 'Fin de la actividad' }
        ]
      }
    ],
    reunion: 'Panadería de La Cumbrecita'
  },
  {
    nombre: 'La Cumbrecita: Garganta del Diablo + Cerro Corona + Pozo de las Cabras',
    duracion: '6 hs',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: null,
    precio: 55000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'garganta-del-diablo-cerro-corona-pozo-cabras',
    imagenes: [],
    horarios: '09:15',
    incluye: [],
    itinerario: [],
    reunion: 'Puente de ingreso a La Cumbrecita'
  },
  {
    nombre: 'La Cumbrecita: Cascadas Salvajes + Río Subterráneo',
    duracion: '7 hs',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 55000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'cascadas-salvajes-rio-subterraneo',
    imagenes: [],
    horarios: '08:30',
    incluye: [],
    itinerario: [],
    reunion: 'Puente de ingreso a La Cumbrecita'
  },
  {
    nombre: 'Ascenso al Cerro Tradicional Champaquí',
    duracion: '3 días / 2 noches',
    dificultad: 'Alta',
    terreno: null,
    distancia: null,
    precio: 370000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/champaqui/rober-paisajaso.webp',
    slug: 'champaqui',
    imagenes: [
      '/assets/tours/champaqui/grupo-bandera-champa.webp',
      '/assets/tours/champaqui/grupo-bandera-champa (2).webp',
      '/assets/tours/champaqui/grupogrande-montaña-casarotada.webp',
      '/assets/tours/champaqui/colegio-champa.webp',
      '/assets/tours/champaqui/grupo-nieve-altura.webp',
      '/assets/tours/champaqui/grupo.champa-nieve.webp',
      '/assets/tours/champaqui/champa -nievegrupo.webp',
      '/assets/tours/champaqui/rober-nieve.webp',
      '/assets/tours/champaqui/caminandogrupo-rocas-reflejo2.webp',
      '/assets/tours/champaqui/puente-arroyo-roberrotada.webp',
      '/assets/tours/champaqui/grupoespalkdas.webp',
      '/assets/tours/champaqui/rober-paisajaso.webp'
    ],
    horarios: 'Viernes, Sábado, Domingo y Feriados',
    incluye: [
      'Refugio de montaña',
      'Todas las comidas (desayuno, almuerzo, merienda y cena)',
      'Seguro y guía habilitado',
      'Caballo de rescate en caso de esguince',
      'Comunicación por radio VHF'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Encuentro y ascenso',
        horas: [
          { hora: '09:00', evento: 'Reunión, presentación de planillas y armado de mochilas' },
          { hora: '09:40', evento: 'Inicio del trekking' },
          { hora: '13:00', evento: 'Almuerzo en el Puesto de Moisés López (empanadas)' },
          { hora: '13:45', evento: 'Continuación hacia los refugios' },
          { hora: '17:30', evento: 'Llegada y descanso' },
          { hora: '18:00', evento: 'Mate cocido, pan y mermelada' },
          { hora: '21:00', evento: 'Cena: guiso de arroz y descanso' }
        ]
      },
      {
        dia: 2,
        titulo: 'Ascenso a la cumbre',
        horas: [
          { hora: '07:15', evento: 'Desayuno' },
          { hora: '08:15', evento: 'Ascenso a la cumbre del Cerro Champaquí (2.790 msnm)' },
          { hora: '12:30', evento: 'Llegada a la cima – fotos, descanso y almuerzo con vianda de marcha' },
          { hora: '14:00', evento: 'Regreso a refugios' },
          { hora: '18:30', evento: 'Merienda' },
          { hora: '21:30', evento: 'Cena: empanadas de carne al horno y ensalada' }
        ]
      },
      {
        dia: 3,
        titulo: 'Descenso y cierre',
        horas: [
          { hora: '06:30', evento: 'Desayuno' },
          { hora: '07:30', evento: 'Descenso hacia Villa Alpina' },
          { hora: '13:00', evento: 'Almuerzo de cierre con asado en Villa Alpina' },
          { hora: '14:30', evento: 'Fin de la actividad' }
        ]
      }
    ],
    reunion: 'Villa Alpina'
  },
  {
    nombre: 'Travesía Velo de la Novia + Pueblo Escondido',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/pueblo-escondido/gente-cascada-portrada.webp',
    slug: 'velo-novia-pueblo-escondido',
    imagenes: [
      '/assets/tours/pueblo-escondido/gente-cascada-portrada.webp',
      '/assets/tours/pueblo-escondido/gente-bandera-cruz.webp',
      '/assets/tours/pueblo-escondido/gente-bandera-casa.webp',
      '/assets/tours/pueblo-escondido/cascada.webp',
      '/assets/tours/pueblo-escondido/cascada-hielo.webp',
      '/assets/tours/pueblo-escondido/gente-cascada-bandera.webp',
      '/assets/tours/pueblo-escondido/gente-subiendorotada.webp',
      '/assets/tours/pueblo-escondido/gente-cuevas.webp',
      '/assets/tours/pueblo-escondido/hombre-cascada-hielo.webp',
      '/assets/tours/pueblo-escondido/rober-casa_antigua-bandera-rotada.webp',
      '/assets/tours/pueblo-escondido/gente-bandera-puebloescondido.webp'
    ],
    horarios: 'Consultar fechas y horarios',
    incluye: [
      'Vianda de marcha Día 1',
      'Merienda',
      'Cena',
      'Desayuno',
      'Almuerzo en Pueblo Escondido',
      'Seguro médico',
      'Coordinación y guiado',
      'Ingreso a los campos'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Trekking al Velo de la Novia',
        horas: [
          { hora: '06:30', evento: 'Encuentro en La Cruz' },
          { hora: '07:00', evento: 'Salida rumbo al Puesto de Los Prados' },
          { hora: '09:00', evento: 'Inicio del trekking hacia el Velo de la Novia (10 km ida)' },
          { hora: '13:00', evento: 'Almuerzo en el camino' },
          { hora: '14:00', evento: 'Regreso al puesto (10 km regreso)' },
          { hora: '17:00', evento: 'Merienda' },
          { hora: '20:00', evento: 'Cena' },
          { hora: '21:00', evento: 'Pernocte' }
        ]
      },
      {
        dia: 2,
        titulo: 'Circuito Pueblo Escondido',
        horas: [
          { hora: '07:00', evento: 'Desayuno' },
          { hora: '08:00', evento: 'Traslado al Parador Loica' },
          { hora: '09:00', evento: 'Inicio del trekking hacia Pueblo Escondido' },
          { hora: '10:30', evento: 'Visita: Salto del Tigre' },
          { hora: '11:30', evento: 'Visita: Cerro Áspero' },
          { hora: '12:30', evento: 'Visita: Mina Superior' },
          { hora: '13:00', evento: 'Almuerzo en Pueblo Escondido' },
          { hora: '14:00', evento: 'Exploración del antiguo poblado minero' },
          { hora: '15:30', evento: 'Regreso' },
          { hora: '17:30', evento: 'Fin de la excursión' }
        ]
      }
    ],
    reunion: 'La Cruz'
  },
  {
    nombre: 'Paraíso de los Guanacos + Casita de Cristal',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'paraiso-guanacos-casita-de-cristal',
    imagenes: [],
    horarios: '08:30',
    incluye: [],
    itinerario: [],
    reunion: 'Parador Julio Cesar'
  },
  {
    nombre: 'Los Gigantes + Cerro Mogote + Los Cajones',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'los-gigantes-cerro-mogote-cajones',
    imagenes: [],
    horarios: '08:30',
    incluye: [],
    itinerario: [],
    reunion: 'Parador el Cóndor Altas Cumbres'
  },
  {
    nombre: 'La Quebrada del Yatán',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 250000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/quebrada-yatan/aguila-paisaje.webp',
    slug: 'quebrada-yatan',
    imagenes: [
      '/assets/tours/quebrada-yatan/aguila-paisaje.webp',
      '/assets/tours/quebrada-yatan/cascada.webp',
      '/assets/tours/quebrada-yatan/grupo-cascada.webp',
      '/assets/tours/quebrada-yatan/paisaje-nubebajita.webp',
      '/assets/tours/quebrada-yatan/aguila-paisaje.webp',
      '/assets/tours/quebrada-yatan/aguila.webp',
      '/assets/tours/quebrada-yatan/cascada-paisaje.webp',
      '/assets/tours/quebrada-yatan/cascada-verde.webp',
      '/assets/tours/quebrada-yatan/casita-paisaje.webp',
      '/assets/tours/quebrada-yatan/gente-cuevas.webp',
      '/assets/tours/quebrada-yatan/grupo-descanso.webp',
      '/assets/tours/quebrada-yatan/grupo-noche-descanso.webp',
      '/assets/tours/quebrada-yatan/grupo.webp',
      '/assets/tours/quebrada-yatan/hermosafoto.webp',
      '/assets/tours/quebrada-yatan/noche-casapiedra.webp',
      '/assets/tours/quebrada-yatan/paisaje.webp',
      '/assets/tours/quebrada-yatan/rober-campana-grupo.webp'
    ],
    horarios: '09:00',
    incluye: [],
    itinerario: [],
    reunion: 'Casa de Roberto Molina, La Cumbrecita'
  },
  {
    nombre: 'Circuito La Cumbrecita (2 días / 1 noche): La Lagunita + Cerro Corona + Garganta del Diablo',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'circuito-cumbrecita-lagunita-corona-garganta-2d',
    imagenes: [],
    horarios: '09:15',
    incluye: [],
    itinerario: [],
    reunion: 'Casa de Roberto Molina, La Cumbrecita'
  },
  {
    nombre: 'Circuito La Cumbrecita (3 días / 2 noches): La Lagunita + Cerro Corona + Garganta del Diablo',
    duracion: '3 días / 2 noches',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'circuito-cumbrecita-lagunita-corona-garganta-3d',
    imagenes: [],
    horarios: '09:15',
    incluye: [],
    itinerario: [],
    reunion: 'Casa de Roberto Molina, La Cumbrecita'
  },
  {
    nombre: 'Los Dos Gigantes: Cerro Champaquí + Cerro La Totora',
    duracion: '3 días / 2 noches',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 370000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'dos-gigantes-champaqui-totora',
    imagenes: [],
    horarios: '09:15',
    incluye: [],
    itinerario: [],
    reunion: 'Villa Alpina'
  },
  {
    nombre: 'Circuito Altas Cumbres: Nacientes Río Mina Clavero + Arco de Piedra + Ríos Subterráneos',
    duracion: '3 días / 2 noches',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: null,
    precio: 470000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'altas-cumbres-nacientes-mina-clavero',
    imagenes: [],
    horarios: '08:30',
    incluye: [],
    itinerario: [],
    reunion: 'Parador Julio Cesar, Villa Cura Brochero'
  },
  {
    nombre: 'La Salida del Cruce',
    duracion: '7 días / 6 noches',
    dificultad: 'Alta',
    terreno: 'Alta',
    distancia: 'Alta',
    precio: 650000,
    precioDetalle: 'Seña para reservar · 6 cuotas sin tarjeta: 5 × $100.000 + $150.000 el día de la salida · Abonado en su totalidad 10 días antes de la salida · Mula aparte',
    disponible: true,
    cupoMax: 8,
    imagen: '/assets/tours/default.svg',
    slug: 'salida-del-cruce',
    imagenes: [],
    horarios: 'Consultar fechas y horarios',
    incluye: [
      'Dos guías habilitados',
      'Seguro médico',
      'Meriendas, cenas y almuerzos según itinerario',
      'Noche en refugios y vivac/carpa en La Lagunita',
      'Cena de cordero asado en el refugio (día 4)',
      'No incluye mula (se contrata aparte, abona en efectivo el día previo a la salida)'
    ],
    requisitos: [
      'Muy buen entrenamiento físico',
      'Experiencia previa: haber dormido en carpa o haber realizado el Cerro Champaquí más de una vez',
      'Tener entre 18 y 65 años (mayores de 65: entrenamiento excelente)',
      'Pesar menos de 100 kg (en los Ríos Subterráneos se ingresa por lugares muy estrechos)',
      'Contar con vestimenta y equipo adecuado para montaña',
      'Tolerancia a jornadas de hasta 10 hs de actividad y 10–20 km por día',
      'Tolerancia a cambios climáticos bruscos: de altas temperaturas a lluvia y baja temperatura en períodos cortos',
      'Gusto por la vida en la naturaleza y estar lejos del confort cotidiano'
    ],
    equipamiento: [
      'Carpa para dormir en La Lagunita (por si no te animás al vivac) + nailon fino del tamaño de la carpa por si llueve',
      'Mochila de 50 litros',
      '3 mudas de ropa',
      'Traje de baño',
      '2 pares de zapatillas de trekking (uno puesto y otro de repuesto por si se moja)',
      'Crocs u ojotas',
      'Bolsa de dormir',
      'Plato, vaso, tenedor, cuchillo y cuchara',
      'Un termo cada 2 personas',
      'Campera o capa impermeable',
      '2 bolsas de consorcio grandes para cubrir la mochila en caso de lluvia',
      'Mini botiquín (2 vendas, toallitas húmedas, alcohol en gel, elementos de higiene)',
      'Protector solar, gorra, lentes de sol y agua',
      'Almuerzo liviano y vianda de marcha',
      'Linterna frontal',
      'Opcional: bastones de trekking'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Encuentro, Cerro Wank y Río Subterráneo',
        distancia: '12 km · 8 hs aprox.',
        horas: [
          { hora: '09:00', evento: 'Encuentro en La Cumbrecita y armado de mochilas' },
          { hora: '10:30', evento: 'Comienza el trekking al Cerro Wank y Río Subterráneo' },
          { hora: '13:00', evento: 'Ingreso al río' },
          { hora: '14:30', evento: 'Almuerzo: vianda de marcha (la lleva cada integrante)' },
          { hora: '15:30', evento: 'Continúa el trekking hacia Paso de Garay' },
          { hora: '18:30', evento: 'Arribo a Paso de Garay' },
          { hora: '19:00', evento: 'Merienda seca: té, café, mate cocido, leche, galletas, criollos, budines y dulce' },
          { hora: '21:30', evento: 'Cena' }
        ]
      },
      {
        dia: 2,
        titulo: 'Quebrada del Yatán',
        distancia: '7 km · 10 hs aprox.',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Trekking a la Quebrada del Yatán' },
          { hora: '11:30', evento: 'Llegada a la Quebrada del Yatán' },
          { hora: '13:00', evento: 'Bajada al río para el almuerzo' },
          { hora: '15:00', evento: 'Retomamos el regreso a Paso de Garay' },
          { hora: '18:00', evento: 'Llegada al puesto' },
          { hora: '19:00', evento: 'Merienda' },
          { hora: '21:30', evento: 'Cena' }
        ]
      },
      {
        dia: 3,
        titulo: 'La Lagunita',
        distancia: '11 km · 6 hs aprox.',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Comienza el trekking a La Lagunita' },
          { hora: '14:00', evento: 'Almuerzo: vianda de marcha en La Lagunita' },
          { hora: '18:00', evento: 'Merienda' },
          { hora: '21:30', evento: 'Cena' }
        ]
      },
      {
        dia: 4,
        titulo: 'Refugio de Marcos Domínguez y Cerro La Totora',
        distancia: '20 km · 12 hs aprox.',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Comienza el trekking al puesto de Marcos Domínguez' },
          { hora: '12:30', evento: 'Parada para almorzar vianda de marcha' },
          { hora: '17:30', evento: 'Llegada al refugio de Marcos Domínguez' },
          { hora: '18:00', evento: 'Merienda: mate cocido con pan casero y mermelada' },
          { hora: '19:30', evento: 'Retomamos el trekking al Cerro La Totora' },
          { hora: '20:45', evento: 'Llegada a la cumbre: fotos y videos, vista de los valles iluminados' },
          { hora: '21:20', evento: 'Regreso al refugio' },
          { hora: '22:30', evento: 'Cena: cordero asado con ensalada, pan y postres' }
        ]
      },
      {
        dia: 5,
        titulo: 'Cerro Champaquí',
        distancia: '10,5 km · 9 hs aprox.',
        horas: [
          { hora: '08:30', evento: 'Desayuno' },
          { hora: '09:30', evento: 'Comienza el trekking al Cerro Champaquí' },
          { hora: '13:30', evento: 'Cumbre (aprox.) y almuerzo: vianda de marcha' },
          { hora: '15:00', evento: 'Retorno al refugio de Nelio Escalante' },
          { hora: '18:30', evento: 'Merienda: mate cocido con pan y mermelada' },
          { hora: '21:30', evento: 'Cena: fideos con salsa' }
        ]
      },
      {
        dia: 6,
        titulo: 'Río Subterráneo El Socavón y Villa Alpina',
        distancia: '14,7 km · 10 hs aprox.',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Comienza el trekking al Río Subterráneo El Socavón' },
          { hora: '11:00', evento: 'Ingreso al río' },
          { hora: '13:30', evento: 'Salida del río' },
          { hora: '14:15', evento: 'Almuerzo en lo de Moisés López: empanadas' },
          { hora: '15:00', evento: 'Retomamos el trekking a Villa Alpina' },
          { hora: '19:00', evento: 'Merienda: mate cocido con mermelada' },
          { hora: '21:30', evento: 'Cena: asado con ensalada y pan' }
        ]
      },
      {
        dia: 7,
        titulo: 'Regreso a La Cumbrecita',
        distancia: '11,5 km · 6 hs aprox.',
        horas: [
          { hora: '08:00', evento: 'Desayuno' },
          { hora: '09:00', evento: 'Comienza el trekking a La Cumbrecita' },
          { hora: '10:30', evento: 'Parada para visitar el Río Subterráneo de La Puente' },
          { hora: '11:30', evento: 'Retomamos el trekking a La Cumbrecita' },
          { hora: '14:00', evento: 'Llegada al Puente de ingreso. Fin de la actividad' }
        ]
      }
    ],
    reunion: 'La Cumbrecita'
  },
  {
    nombre: 'Running Camp en la Montaña',
    duracion: '3 días / 2 noches',
    dificultad: 'Alta',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 360000,
    precioDetalle: 'Modalidad Premium (refugio): $360.000 · Opción cabañas: consultar',
    disponible: true,
    imagen: '/assets/tours/default.svg',
    slug: 'running-camp-montana',
    imagenes: [],
    horarios: 'Consultar fechas y horarios',
    incluye: [
      'Entrenamientos guiados todos los días (entre 15 y 20 km diarios)',
      'Jornada intensa con desafío de hasta 25 km',
      'Todas las comidas incluidas',
      'Fogón nocturno, asado y momentos de grupo',
      'Charlas sobre entrenamiento y rendimiento',
      'Guías habilitados',
      'Alojamiento en refugio (traer bolsa de dormir) · Opción cabañas'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Entrenamiento e Intiyaco',
        horas: [
          { hora: 'Todo el día', evento: 'Entrenamiento guiado y recorrido por Intiyaco: paraje único con río y senderos dentro de forestaciones' }
        ]
      },
      {
        dia: 2,
        titulo: 'Día de desafío (hasta 25 km)',
        distancia: '25 km aprox.',
        horas: [
          { hora: 'Todo el día', evento: 'Salida exigente con opción a La Cumbrecita o Villa Alpina' }
        ]
      },
      {
        dia: 3,
        titulo: 'Entrenamiento regenerativo + asado de cierre',
        horas: [
          { hora: '07:00 – 11:00', evento: 'Entrenamiento regenerativo' },
          { hora: 'Mediodía', evento: 'Asado de cierre y momentos de grupo' }
        ]
      }
    ],
    reunion: 'Consultar punto de encuentro'
  },
  {
    nombre: 'Casita de Cristal + Cinco Saltos',
    duracion: 'Definir',
    dificultad: null,
    terreno: null,
    distancia: null,
    precio: null,
    precioDetalle: null,
    disponible: false,
    imagen: '/assets/tours/default.svg',
    slug: 'casita-de-cristal-cinco-saltos',
    imagenes: [],
    horarios: null,
    incluye: [],
    itinerario: [],
    reunion: null
  },
  {
    nombre: 'Circuito La Cumbrecita: La Lagunita + Cerro La Ventana + Garganta del Diablo',
    duracion: 'Definir',
    dificultad: null,
    terreno: null,
    distancia: null,
    precio: null,
    precioDetalle: null,
    disponible: false,
    imagen: '/assets/tours/default.svg',
    slug: 'circuito-cumbrecita-lagunita-ventana-garganta',
    imagenes: [],
    horarios: null,
    incluye: [],
    itinerario: [],
    reunion: null
  }
]
