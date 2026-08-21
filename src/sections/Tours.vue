<script setup>
import { ref } from 'vue'

const scrollContainer = ref(null)

const tours = [
  {
    nombre: 'Ascenso al Cerro Tradicional Champaqui',
    duracion: '3 días / 2 noches',
    dificultad: 'Alta',
    precio: '$350.000',
    imagen: '/assets/tours/champaqui/gente-cascada-bandera.webp',
    slug: 'champaqui',
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
          { hora: '21:30', evento: 'Cena: empanadas carne al horno y ensalada' }
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
    reunion: 'Villa Alpina',
    pago: {
      alias: 'Trekking.cumbrecita',
      banco: 'Banco de Córdoba',
      titular: 'Roberto Carlos Molina'
    }
  },
  {
    nombre: 'Trekking Sierra de las Quijadas',
    duracion: '2 días / 1 noche',
    dificultad: 'Moderada',
    precio: '$180.000',
    imagen: '/assets/tours/quijadas/quijadas.webp',
    slug: 'quijadas',
    horarios: 'Sábados y Feriados',
    incluye: [
      'Alojamiento en camping',
      'Desayuno y almuerzo',
      'Guía habilitado',
      'Seguro de accidentes'
    ],
    itinerario: []
  },
  {
    nombre: 'Aventura en Villa General Belgrano',
    duracion: '1 día',
    dificultad: 'Baja',
    precio: '$45.000',
    imagen: '/assets/tours/villa-belgrano/villa-belgrano.webp',
    slug: 'villa-belgrano',
    horarios: 'Fines de semana',
    incluye: [
      'Transporte ida y vuelta',
      'Almuerzo',
      'Guía local'
    ],
    itinerario: []
  }
]

function getScrollAmount() {
  const card = scrollContainer.value?.firstElementChild
  if (!card) return 320
  return card.offsetWidth + 24
}

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
}
</script>

<template>
  <section id="tours" class="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-10 lg:px-20">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <div>
          <h2 class="font-heading text-4xl md:text-5xl text-brand-white mb-4">
            Nuestros Trekking
          </h2>
          <div class="h-1 w-24 bg-gradient-to-r from-brand-orange to-brand-gold"></div>
        </div>

        <!-- Navigation arrows -->
        <div class="flex gap-3 mt-6 md:mt-0">
          <button
            @click="scrollLeft"
            class="w-10 h-10 rounded-full border-2 border-brand-cream/30 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            @click="scrollRight"
            class="w-10 h-10 rounded-full border-2 border-brand-cream/30 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Horizontal scroll container -->
      <div
        ref="scrollContainer"
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
      >
        <article
          v-for="tour in tours"
          :key="tour.slug"
          class="w-[85vw] md:w-[calc((100%-3rem)/3)] snap-start flex-shrink-0 bg-brand-secondary rounded-2xl overflow-hidden group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
        >
          <!-- Image -->
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="tour.imagen"
              :alt="tour.nombre"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
            <span class="absolute top-4 right-4 bg-brand-orange text-brand-white text-xs font-bold px-3 py-1 rounded-full font-sans">
              {{ tour.dificultad }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="font-heading text-2xl text-brand-white mb-3 leading-tight">
              {{ tour.nombre }}
            </h3>

            <div class="flex flex-wrap gap-3 mb-4 text-sm text-brand-cream/70 font-sans">
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-brand-orange">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {{ tour.duracion }}
              </span>
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-brand-gold">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {{ tour.horarios }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-brand-orange font-heading text-2xl">
                {{ tour.precio }}
              </span>
              <span class="text-brand-cream/50 text-xs font-sans">por persona</span>
            </div>

            <button class="mt-5 w-full border-2 border-brand-orange text-brand-orange rounded-lg py-2.5 font-sans font-semibold hover:bg-brand-orange hover:text-brand-dark transition-colors duration-300 text-sm">
              Ver detalles
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
