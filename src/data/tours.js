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

const reordenarGaleria = (imagenes, inicio, invertida = false) => {
  const rotada = [...imagenes.slice(inicio), ...imagenes.slice(0, inicio)]
  return invertida ? rotada.reverse() : rotada
}

const cumbrecitaGaleria = [
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
]

const cumbrecitaGaleriaAlternativa = reordenarGaleria(cumbrecitaGaleria, 4, true)
  .filter((_, index) => index !== 4)
const cumbrecitaGaleriaCorona = reordenarGaleria(cumbrecitaGaleria, 7)
const cumbrecitaGaleriaCircuito = reordenarGaleria(cumbrecitaGaleria, 2, true)

const lagunitaGaleria = [
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/01-construccion-monta-a.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/02-desde-dentro.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/03-gente-babndera-desdearriba.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/04-gente-bandera.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/05-gente-lagunita.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/06-gente-saludando-lagunita.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/07-grupo-cascada-lagunita.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/08-grupo-lagunita.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/09-lagunita-persona.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/10-rober-entrepiedras.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/11-vista-lateral.webp',
  '/assets/tours/circuito-cumbrecita-lagunita-ventana-garganta/12-vista-piedra.webp'
]

const travesiaCumbrecitaVillaAlpinaGaleria = [
  '/assets/tours/travesia-cumbrecita-villa-alpina/02-bandera-grupo.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/03-caba-a-1.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/04-caba-a-2.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/05-caba-a-3.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/06-grupo-cascadainterna.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/07-grupo-subterraneo.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/08-grupoe-subte.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/09-laguna.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/10-llocaba-llano.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/11-pareja-lagunita.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/12-rober-bandera-complejo.webp',
  '/assets/tours/travesia-cumbrecita-villa-alpina/13-rober-pareja-cascada.webp'
]

const champaquiGaleria = [
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
]

const champaquiGaleriaAlternativa = reordenarGaleria(champaquiGaleria, 5, true)

const yatanGaleria = [
  '/assets/tours/quebrada-yatan/aguila-paisaje.webp',
  '/assets/tours/quebrada-yatan/cascada.webp',
  '/assets/tours/quebrada-yatan/grupo-cascada.webp',
  '/assets/tours/quebrada-yatan/paisaje-nubebajita.webp',
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
]

const excursionNocturnaGaleria = [
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/01-img-20211125-222327623-hdr.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/02-img-20170811-wa0029.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/03-img-20251207-wa0003.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/04-img-20251207-wa0005.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/05-img-20260106-wa0002.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/06-img-20260106-wa0003.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/07-img-20260106-wa0009.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/08-img-20260106-wa0030.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/09-img-20260106-wa0033.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/10-img-20260106-wa0036.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/11-img-20260106-wa0039.webp',
  '/assets/tours/excursion-nocturna-cumbrecita-villa-alpina/12-img-20260616-wa0016.webp'
]

const salidaDelCruceGaleria = [
  cumbrecitaGaleria[3],
  cumbrecitaGaleria[7],
  yatanGaleria[0],
  yatanGaleria[3],
  yatanGaleria[14],
  lagunitaGaleria[10],
  lagunitaGaleria[11],
  champaquiGaleria[11],
  champaquiGaleria[2],
  champaquiGaleria[4]
]

const gigantesGaleria = [
  '/assets/tours/los-gigantes-cerro-mogote-cajones/grupo-cueva-grande.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/grupo-lagunita.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/laguna-cascada.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/grupo-arroyo-piedras.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-silla-cumbre.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-silla-cumbre-espalda.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-carro-viejo.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-carro-viejo-brazos.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-cueva-pasadizo.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/persona-pasadizo-rocas.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/grupo-bajando-rocas.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/grupo-caminando-sol.webp',
  '/assets/tours/los-gigantes-cerro-mogote-cajones/refugio-don-antonio.webp'
]

const rioSubterraneoInfo = {
  duracion: '7 hs',
  dificultad: 'Media',
  terreno: null,
  distancia: null,
  precio: 55000,
  precioDetalle: 'Efectivo o transferencia · $60.000 en 3 cuotas sin interés',
  disponible: true,
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
}

export const tours = [
  {
    ...rioSubterraneoInfo,
    nombre: 'Cumbrecita: Río Subterráneo y Cascada Escondida',
    imagen: cumbrecitaGaleria[0],
    slug: 'rio-subterraneo-cascada-escondida',
    imagenes: cumbrecitaGaleria
  },
  {
    nombre: 'La Cumbrecita: Garganta del Diablo + Cerro Corona + Pozo de las Cabras',
    duracion: '6 hs',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Media',
    precio: 55000,
    precioDetalle: 'Seña para reservar · 3 cuotas sin interés',
    disponible: true,
    imagen: cumbrecitaGaleriaCorona[0],
    slug: 'garganta-del-diablo-cerro-corona-pozo-cabras',
    imagenes: cumbrecitaGaleriaCorona,
    horarios: 'Sábados, domingos y feriados · Salida 09:00',
    incluye: [],
    itinerario: [
      {
        dia: 1,
        titulo: 'Garganta del Diablo y Pozo de las Cabras',
        horas: [
          { hora: '09:00', evento: 'Salida desde la Panadería de La Cumbrecita' },
          { hora: '10:45', evento: 'Visita a la Capilla, Mirador del Indio y vistas de Casas Viejas' },
          { hora: '12:00', evento: 'Llegada a la Cascada Garganta del Diablo · descanso' },
          { hora: '13:30', evento: 'Regreso por el río' },
          { hora: '15:30', evento: 'Visita al Pozo de las Cabras · descanso' },
          { hora: '—', evento: 'Regreso al pueblo y fin de la actividad' }
        ]
      }
    ],
    reunion: 'Panadería de La Cumbrecita'
  },
  {
    ...rioSubterraneoInfo,
    nombre: 'La Cumbrecita: Wild Waterfalls + Río Subterráneo',
    duracion: '7 hs',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 60000,
    precioDetalle: 'Efectivo o transferencia · $70.000 en 3 cuotas sin interés · Se reserva con el 50% de seña',
    imagen: cumbrecitaGaleriaAlternativa[0],
    slug: 'cascadas-salvajes-rio-subterraneo',
    imagenes: cumbrecitaGaleriaAlternativa,
    horarios: 'Sábados, domingos y feriados · Salida 08:30 · Inicio 08:45',
    requisitos: [
      'Edad de 12 a 60 años con buen estado físico',
      'Mayores de 60 años: entrenamiento excelente',
      'Peso máximo: 90 kg por zonas de paso reducido'
    ],
    equipamiento: [
      'Linterna',
      'Ropa cómoda o deportiva de trekking',
      'Traje de baño',
      'Mochila de 30/40 litros (una cada dos personas)',
      'Protector solar, gorra y lentes',
      'Agua, termo, mate, almuerzo liviano y vianda de marcha',
      'Mini botiquín personal',
      'Bastones de trekking (opcional)'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Wild Waterfalls + Río Subterráneo',
        horas: [
          { hora: '08:45', evento: 'Salida desde la Panadería de La Cumbrecita' },
          { hora: '09:45', evento: 'Recorrido por el Cerro Wank y el Río Subterráneo' },
          { hora: '12:30', evento: 'Visita a las cascadas de la Novia, El Tabaquillo, El Abedul, del Claro y Las Dos Rocas' },
          { hora: '14:00', evento: 'Vista panorámica de la Cascada Abanico' },
          { hora: '15:45', evento: 'Regreso por la Iglesia de la Gruta y la Plaza de Doña Victoria Giménez' },
          { hora: '16:30', evento: 'Fin aproximado de la actividad' }
        ]
      }
    ],
    reunion: 'Panadería de La Cumbrecita'
  },
  {
    nombre: 'ACENSO AL CERRO CHAMPAQUI',
    duracion: '3 días / 2 noches',
    dificultad: 'Alta',
    terreno: null,
    distancia: null,
    precio: 370000,
    precioDetalle: 'Finde largo/feriado: $450.000 · Refugio superior',
    disponible: true,
    imagen: champaquiGaleria[11],
    slug: 'champaqui',
    imagenes: champaquiGaleria,
    video: {
      tipo: 'local',
      src: '/assets/tours/champaqui/cerro-champaqui.mp4',
      poster: champaquiGaleria[11]
    },
    horarios: 'Viernes, Sábado, Domingo y Feriados',
    incluye: [
      'Refugio de montaña',
      'Todas las comidas (desayuno, almuerzo, merienda y cena)',
      'Seguro y guía habilitado',
      'Caballo de rescate en caso de esguince',
      'Comunicación por radio VHF'
    ],
    equipamiento: [
      'Bolsa de dormir'
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
    imagen: '/assets/tours/casita-cristal-cinco-saltos/grupo.webp',
    slug: 'paraiso-guanacos-casita-de-cristal',
    imagenes: [
      '/assets/tours/casita-cristal-cinco-saltos/grupo.webp',
      '/assets/tours/casita-cristal-cinco-saltos/rober-bandera-casitacristal.webp',
      '/assets/tours/casita-cristal-cinco-saltos/bandera.webp',
      '/assets/tours/casita-cristal-cinco-saltos/perdsona-casa.webp',
      '/assets/tours/casita-cristal-cinco-saltos/paisake.webp',
      '/assets/tours/casita-cristal-cinco-saltos/casa-paisaje.webp',
      '/assets/tours/casita-cristal-cinco-saltos/casaantigua.webp',
      '/assets/tours/casita-cristal-cinco-saltos/construccion.webp',
      '/assets/tours/casita-cristal-cinco-saltos/contruccion-antigua.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada2.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada3.webp',
      '/assets/tours/casita-cristal-cinco-saltos/piedras.webp',
      '/assets/tours/casita-cristal-cinco-saltos/placa-refugio.webp'
    ],
    horarios: 'Sábados, domingos y feriados · 08:30',
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
    imagen: gigantesGaleria[0],
    slug: 'los-gigantes-cerro-mogote-cajones',
    imagenes: gigantesGaleria,
    horarios: 'Sábados, domingos y feriados · 08:00',
    incluye: [
      'Guía habilitado',
      'Trekking de 2 días / 1 noche',
      'Alojamiento',
      'Merienda del día 1',
      'Cena',
      'Desayuno',
      'Vianda de marcha',
      'Merienda del día 2',
      'Visita a cascadas, ollas y puestos serranos abandonados',
      'Recorrido por Cajones de Achala y Cerro Mogote'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Camino del Peregrino y cascadas secretas',
        horas: [
          { hora: '08:00', evento: 'Encuentro en el Parador El Cóndor, Altas Cumbres' },
          { hora: '09:20', evento: 'Traslado por el Camino del Peregrino hasta los puestos serranos' },
          { hora: '10:00', evento: 'Trekking por cascadas escondidas, ollas naturales y puestos serranos abandonados' },
          { hora: '12:00', evento: 'Recorrido de aproximadamente 10 km entre ida y vuelta' },
          { hora: '12:30', evento: 'Almuerzo' },
          { hora: '—', evento: 'Merienda, cena y alojamiento' }
        ]
      },
      {
        dia: 2,
        titulo: 'Cajones de Achala y Cerro Mogote',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Inicio del trekking por los Cajones de Achala y el Cerro Mogote' },
          { hora: '11:00', evento: 'Llegada al Cerro Mogote y vianda de marcha' },
          { hora: '13:30', evento: 'Recorrido por los Cajones de Achala' },
          { hora: '16:00', evento: 'Regreso al refugio' }
        ]
      }
    ],
    reunion: 'Parador el Cóndor Altas Cumbres'
  },
  {
    nombre: 'La Cumbrecita: Quebrada del Yatán + Paso de Garay',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 270000,
    precioDetalle: null,
    disponible: true,
    imagen: yatanGaleria[1],
    slug: 'cumbrecita-quebrada-yatan-paso-garay',
    imagenes: yatanGaleria,
    horarios: 'Consultar fechas · 09:00',
    incluye: [
      'Guía habilitado',
      'Trekking de 2 días / 1 noche',
      'Carga de la mochila en mula',
      'Alojamiento en Paso de Garay',
      'Merienda seca del día 1',
      'Cena',
      'Desayuno seco',
      'Vianda de marcha del día 2'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'La Cumbrecita, Quebrada del Yatán y Paso de Garay',
        horas: [
          { hora: '09:00', evento: 'Encuentro en Casa de Rober, La Cumbrecita, y armado de mochilas para la carga de la mula' },
          { hora: '10:30', evento: 'Comienzo del trekking' },
          { hora: '—', evento: 'Recorrido por el Río del Medio, Puentes Colgantes, Iglesia La Gruta y Arroyo El Tambito' },
          { hora: '—', evento: 'Ingreso a la Quebrada del Yatán y continuación hacia Paso de Garay' },
          { hora: '18:30', evento: 'Arribo aproximado a Paso de Garay' },
          { hora: '19:20', evento: 'Merienda seca' },
          { hora: '21:00', evento: 'Cena y pernocte en Paso de Garay' }
        ]
      },
      {
        dia: 2,
        titulo: 'Paso de Garay, cascadas, Cerro Wank y La Cumbrecita',
        horas: [
          { hora: '08:00', evento: 'Desayuno seco' },
          { hora: '09:00', evento: 'Comienzo del trekking de regreso desde Paso de Garay' },
          { hora: '—', evento: 'Regreso por la zona de las cascadas, Cerro Wank, Arroyo El Tambito y el Riachuelo' },
          { hora: '—', evento: 'Almuerzo: vianda de marcha' },
          { hora: '17:00', evento: 'Arribo aproximado a La Cumbrecita y fin de la travesía' }
        ]
      }
    ],
    reunion: 'Casa de Rober Molina, La Cumbrecita'
  },
  {
    nombre: 'Los Dos Gigantes: Cerro Champaquí + Cerro La Totora',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 370000,
    precioDetalle: null,
    disponible: true,
    imagen: champaquiGaleriaAlternativa[0],
    slug: 'dos-gigantes-champaqui-totora',
    imagenes: champaquiGaleriaAlternativa,
    horarios: 'Viernes, sábados, domingos y feriados · Salida 09:00',
    incluye: [
      'Guía habilitado',
      'Trekking de 3 días / 2 noches',
      'Alojamiento en puesto serrano',
      'Meriendas',
      'Cenas',
      'Desayunos',
      'Viandas de marcha',
      'Almuerzo del tercer día',
      'Ascenso al Cerro Champaquí',
      'Ascenso nocturno al Cerro La Totora, sujeto a condiciones climáticas',
      'Visita a cascadas de la zona',
      'Recorrido por antiguos puestos serranos'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Villa Alpina y Puesto Marcos Domínguez',
        horas: [
          { hora: '09:00', evento: 'Encuentro en Villa Alpina' },
          { hora: '12:00', evento: 'Trekking por antiguos puestos serranos y el Camino Norte' },
          { hora: '13:30', evento: 'Paso por el antiguo cementerio de la zona y llegada al Puesto Marcos Domínguez' },
          { hora: '17:00', evento: 'Merienda y alojamiento' },
          { hora: '18:30', evento: 'Ascenso nocturno al Cerro La Totora, sujeto a condiciones climáticas' },
          { hora: '21:30–22:00', evento: 'Cena y alojamiento' }
        ]
      },
      {
        dia: 2,
        titulo: 'Cumbre del Cerro Champaquí',
        horas: [
          { hora: '07:30', evento: 'Desayuno y ascenso al Cerro Champaquí' },
          { hora: '11:30–12:00', evento: 'Llegada a la cumbre y vianda de marcha' },
          { hora: '15:30', evento: 'Descenso hacia el puesto con visita a cascadas de la zona' },
          { hora: '17:00', evento: 'Merienda, cena y alojamiento' }
        ]
      },
      {
        dia: 3,
        titulo: 'Regreso a Villa Alpina',
        horas: [
          { hora: '07:00', evento: 'Desayuno e inicio del regreso a Villa Alpina' },
          { hora: '11:00', evento: 'Parada en el Puesto de Moisés López' },
          { hora: '13:20', evento: 'Almuerzo incluido' },
          { hora: '16:30', evento: 'Continuación del trekking hasta Villa Alpina y fin de la travesía' }
        ]
      }
    ],
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
     imagen: '/assets/tours/altas-cumbres-nacientes-mina-clavero/arco-piedra-grupo.webp',
    slug: 'altas-cumbres-nacientes-mina-clavero',
    imagenes: [
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/tarucapampa.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/kayak.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/horno.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/gente-piedras-lago.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/kayak-rio-interno.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/cascada-interna.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/arco-piedra-grupo.webp',
      '/assets/tours/altas-cumbres-nacientes-mina-clavero/arco-piedra-bandera.webp'
    ],
    horarios: 'Viernes, sábados, domingos y feriados · 08:30',
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
    precio: 1000000,
    precioDetalle: 'Seña para reservar · 6 cuotas sin tarjeta · Abonado en su totalidad 10 días antes de la salida · Mula aparte',
    disponible: true,
    cupoMax: 8,
    imagen: salidaDelCruceGaleria[0],
    slug: 'salida-del-cruce',
    imagenes: salidaDelCruceGaleria,
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
    nombre: 'Excursión Nocturna: La Cumbrecita → Villa Alpina',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: null,
    precio: 250000,
    precioDetalle: 'Próxima fecha a confirmar · 3 cuotas sin interés',
    disponible: true,
    imagen: excursionNocturnaGaleria[1],
    slug: 'excursion-nocturna-cumbrecita-villa-alpina',
    imagenes: excursionNocturnaGaleria,
    horarios: 'Consultar fecha · Salida 18:00',
    incluye: [
      'Guía habilitado',
      'Noche en refugio de montaña',
      'Vianda de marcha',
      'Desayuno en refugio',
      'Recorrido por las Cascadas de Villa Alpina'
    ],
    equipamiento: [
      'Linterna frontal',
      'Bolsa de dormir',
      'Ropa y calzado adecuados para trekking nocturno'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Travesía nocturna: La Cumbrecita → Villa Alpina',
        horas: [
          { hora: '18:00', evento: 'Salida desde el Puente de Ingreso a La Cumbrecita' },
          { hora: '—', evento: 'Recorrido por Cerro Cristal, Arroyo de las Mojarras, Cascada El Chorrillo y Arroyo La Puente' },
          { hora: '01:00', evento: 'Llegada aproximada a Villa Alpina · Noche en refugio de montaña' }
        ]
      },
      {
        dia: 2,
        titulo: 'Cascadas de Villa Alpina',
        horas: [
          { hora: '07:00', evento: 'Desayuno en el refugio' },
          { hora: '07:30', evento: 'Inicio del recorrido a las Cascadas de Villa Alpina' },
          { hora: '—', evento: 'Caminata entre bosques serranos, arroyos y saltos de agua' },
          { hora: '15:00', evento: 'Finalización aproximada en Villa Alpina' },
          { hora: '—', evento: 'Regreso por cuenta propia en vehículo o caminando hasta La Cumbrecita' }
        ]
      }
    ],
    reunion: 'Puente de Ingreso a La Cumbrecita'
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
    nombre: 'Travesía Cumbrecita – Villa Alpina: Cerro Wank + Río Subterráneo + Cascadas Escondidas',
    duracion: '2 días / 1 noche',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 250000,
    precioDetalle: 'Se reserva con seña del 50%',
    disponible: true,
    imagen: travesiaCumbrecitaVillaAlpinaGaleria[11],
    slug: 'travesia-cumbrecita-villa-alpina',
    imagenes: travesiaCumbrecitaVillaAlpinaGaleria,
    horarios: 'Consultar fechas y horarios',
    incluye: [
      '1 noche de albergue en Villa Alpina (luz por generador, agua caliente y baño)',
      'Desayunos, meriendas y cenas',
      'Almuerzo de cierre el día 2',
      'Traslado en vehículo al albergue al final del día 1'
    ],
    equipamiento: [
      'Linterna frontal (obligatoria para el Río Subterráneo)',
      'Bolsa de dormir',
      'Plato y cubiertos',
      'Vianda de marcha para los almuerzos de los días 1 y 2',
      'Ropa adecuada para dos días'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Cumbrecita → Villa Alpina',
        horas: [
          { hora: '09:00', evento: 'Encuentro en la Panadería de La Cumbrecita' },
          { hora: '09:20', evento: 'Inicio del trekking por el pueblo hasta el Lago de los Patos' },
          { hora: '11:15', evento: 'Llegada al Cerro Wank: descanso y fotos con vistas al Valle de Calamuchita' },
          { hora: '11:45', evento: 'Continuación hacia el Río Subterráneo' },
          { hora: '12:15', evento: 'Arribo e ingreso al Río Subterráneo (grupos de 10 a 15 personas) · Es obligatorio llevar linterna frontal' },
          { hora: '13:30', evento: 'Trekking a las Cascadas Escondidas: almuerzo con vianda de marcha en el lugar' },
          { hora: '15:30', evento: 'Retorno por el Valle del Abedul, vistas panorámicas de Casas Viejas y llegada a Villa Alpina' },
          { hora: '17:30', evento: 'Fin de la excursión y traslado en vehículo al albergue en Villa Alpina (arribo aprox. 19:00)' },
          { hora: '19:00', evento: 'Merienda' },
          { hora: '21:30', evento: 'Cena y descanso' }
        ]
      },
      {
        dia: 2,
        titulo: 'Trekking a las cascadas',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:30', evento: 'Trekking a las dos cascadas (llegada 11:00)' },
          { hora: '11:00', evento: 'Tiempo de baño y almuerzo con vianda de marcha' },
          { hora: '13:30', evento: 'Regreso pasando por la Olla, con posibilidad de bañarse' },
          { hora: '15:30', evento: 'Llegada al refugio: tiempo libre' },
          { hora: '17:30', evento: 'Merienda' },
          { hora: '21:00', evento: 'Cena' }
        ]
      }
    ],
    reunion: 'Panadería de La Cumbrecita'
  },
  {
    nombre: 'Salida del Día Villa Alpina: 2 Cascadas y Olla',
    duracion: '1 día',
    dificultad: 'Alta',
    terreno: 'Media',
    distancia: 'Media',
    precio: 75000,
    precioDetalle: 'Se reserva con seña del 50% · Cupos limitados a 15 personas',
    disponible: true,
    cupoMax: 15,
    imagen: '/assets/tours/default.svg',
    slug: 'villa-alpina-2-cascadas-olla',
    imagenes: [],
    horarios: 'Sábados, domingos y feriados · Encuentro 07:30',
    incluye: [
      'Estacionamiento',
      'Ingreso al predio',
      'Cierre con empanadas o pizza (no incluye bebidas)'
    ],
    equipamiento: [
      'Pantalones largos (obligatorio: hay mucha zarzamora en el sendero)',
      'Traje de baño',
      'Protector solar',
      '1 litro de agua (se puede recargar en los arroyos)'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: '2 Cascadas y Olla de Villa Alpina',
        horas: [
          { hora: '07:30', evento: 'Encuentro en el ingreso a Villa Alpina (camino de ripio) · Traslado en vehículo 20 km y se deja el auto en el estacionamiento' },
          { hora: '08:45', evento: 'Comienza el trekking por sendero y campo traviesa (actividad de turismo aventura 100%)' },
          { hora: '11:00', evento: 'Llegada a las 2 cascadas: baño y descanso, nos quedamos un largo rato en el lugar' },
          { hora: '13:00', evento: 'Comienza el regreso hacia la Olla de Villa Alpina' },
          { hora: '14:30', evento: 'Llegada a la Olla: paramos a disfrutar hasta las 15:30' },
          { hora: '15:30', evento: 'Retorno hacia los autos' },
          { hora: '15:30-16:30', evento: 'Cierre de la excursión con empanadas o pizza (no incluye bebidas)' }
        ]
      }
    ],
    reunion: 'Ingreso a Villa Alpina (camino de ripio)'
  },
  {
    nombre: 'Casita de Cristal + Cinco Saltos',
    duracion: '1 día',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Media',
    precio: 85000,
    precioDetalle: null,
    disponible: true,
    imagen: '/assets/tours/casita-cristal-cinco-saltos/paisake.webp',
    slug: 'casita-de-cristal-cinco-saltos',
    imagenes: [
      '/assets/tours/casita-cristal-cinco-saltos/paisake.webp',
      '/assets/tours/casita-cristal-cinco-saltos/casa-paisaje.webp',
      '/assets/tours/casita-cristal-cinco-saltos/casaantigua.webp',
      '/assets/tours/casita-cristal-cinco-saltos/construccion.webp',
      '/assets/tours/casita-cristal-cinco-saltos/contruccion-antigua.webp',
      '/assets/tours/casita-cristal-cinco-saltos/bandera.webp',
      '/assets/tours/casita-cristal-cinco-saltos/rober-bandera-casitacristal.webp',
      '/assets/tours/casita-cristal-cinco-saltos/perdsona-casa.webp',
      '/assets/tours/casita-cristal-cinco-saltos/grupo.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada2.webp',
      '/assets/tours/casita-cristal-cinco-saltos/cascada3.webp',
      '/assets/tours/casita-cristal-cinco-saltos/piedras.webp',
      '/assets/tours/casita-cristal-cinco-saltos/placa-refugio.webp'
    ],
    horarios: 'Salidas de jornada completa · Encuentro 07:30',
    incluye: [
      'Vianda de marcha'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'Trekking Casita de Cristal + Cinco Saltos',
        distancia: '12 km aprox. · 8 a 10 hs',
        horas: [
          { hora: '07:30', evento: 'Encuentro en el Parador Santa Rita, Altas Cumbres' },
          { hora: '08:30', evento: 'Inicio del trekking por el camino serrano hacia la Casita de Cristal, ubicada aproximadamente a 7 km de la ruta' },
          { hora: '09:30', evento: 'Recorrido por paisajes de las Altas Cumbres, puestos abandonados y cascadas' },
          { hora: '11:00', evento: 'Parada de aproximadamente 1 hora y media en la Casita de Cristal para disfrutar del lugar y compartir la vianda de marcha' },
          { hora: '14:30', evento: 'Regreso pasando por un puesto abandonado hasta el sector de Cinco Saltos' },
          { hora: '15:00-15:30', evento: 'Opción de continuar hasta la cascada más alta del circuito, según las condiciones del terreno y del grupo' },
          { hora: '17:30-18:00', evento: 'Regreso al Parador Santa Rita, donde dejamos los vehículos' }
        ]
      }
    ],
    reunion: 'Parador Santa Rita – Altas Cumbres (12 km antes de Mina Clavero)'
  },
  {
    nombre: 'Circuito La Cumbrecita: La Lagunita + Cerro La Ventana + Garganta del Diablo',
    duracion: '3 días / 2 noches',
    dificultad: 'Media',
    terreno: 'Media',
    distancia: 'Alta',
    precio: 350000,
    precioDetalle: null,
    disponible: true,
    imagen: lagunitaGaleria[8],
    slug: 'circuito-cumbrecita-lagunita-ventana-garganta',
    imagenes: lagunitaGaleria,
    horarios: 'Viernes, Sábados y Domingos · 09:00',
    incluye: [
      'Raciones de marcha (salado y dulce)',
      'Merienda, cena y desayuno en los refugios',
      'Guía habilitado'
    ],
    itinerario: [
      {
        dia: 1,
        titulo: 'La Lagunita y Olla del Río Paso de Garay',
        horas: [
          { hora: '09:00', evento: 'Encuentro en la Casa de Rober, La Cumbrecita · Salida del trekking' },
          { hora: '09:30', evento: 'Recorrido hacia La Lagunita y Olla del Río Paso de Garay, pasando por Puesto Viejo y Puesto de Juvencio' },
          { hora: '17:00', evento: 'Llegada al refugio (aprox.) · Cena y pernocte' }
        ]
      },
      {
        dia: 2,
        titulo: 'Cerro La Ventana',
        horas: [
          { hora: '07:30', evento: 'Desayuno' },
          { hora: '08:20', evento: 'Salida hacia el Cerro La Ventana' },
          { hora: '11:00', evento: 'Arribo: almuerzo con vianda de marcha, fotos y videos' },
          { hora: '13:00', evento: 'Regreso al refugio · Merienda y descanso' },
          { hora: '21:00', evento: 'Cena y pernocte' }
        ]
      },
      {
        dia: 3,
        titulo: 'Garganta del Diablo, Cerro Corona y Nacimiento del Río del Medio',
        horas: [
          { hora: '07:30', evento: 'Desayuno en el puesto' },
          { hora: '09:30', evento: 'Recorrido por Garganta del Diablo, Cerro Corona y Nacimiento del Río del Medio' },
          { hora: '12:30', evento: 'Almuerzo en marcha' },
          { hora: '16:00', evento: 'Regreso al pueblo (llegada aprox.) · Fin de la actividad' }
        ]
      }
    ],
    reunion: 'Casa de Rober Molina, La Cumbrecita'
  }
]

// Requisitos mínimos para cualquier salida. Los requisitos específicos de cada
// tour se conservan y se agregan después de esta base sin duplicarlos.
const requisitosBase = [
  'Linterna frontal',
  'Mini botiquín personal',
  'Un termo cada 2 personas',
  'Un impermeable de buena calidad',
  'En invierno, una muda de ropa térmica'
]

const requisitosEspeciales = {
  champaqui: ['Bolsa de dormir']
}

for (const tour of tours) {
  tour.requisitos = [...new Set([
    ...requisitosBase,
    ...(requisitosEspeciales[tour.slug] || []),
    ...(tour.requisitos || [])
  ])]

  if (tour.slug === 'travesia-cumbrecita-villa-alpina') {
    tour.requisitos = tour.requisitos.filter((requisito) => requisito !== 'Linterna frontal')
  }
}
