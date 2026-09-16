<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { tours } from '../data/tours.js'
import { formatPrecio } from '../utils/format.js'
import TourModal from '../components/TourModal.vue'
import TourPlaceholder from '../components/TourPlaceholder.vue'
import { crearConsultaTour } from '../utils/whatsapp.js'

const scrollContainer = ref(null)
const selectedTour = ref(null)

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())

const esDefinir = (tour) => !tour.disponible
const esPlaceholder = (tour) => tour.imagen === '/assets/tours/default.svg'

// Orden definido por el dueño; los no listados van al final respetando jerarquía
// (1° con fotos, 2° con info pero sin fotos, 3° sin nada)
const ordenDeseado = [
  'champaqui',
  'velo-novia-pueblo-escondido',
  'quebrada-yatan',
  'rio-subterraneo-cascada-escondida',
  'cascadas-salvajes-rio-subterraneo',
  'los-gigantes-cerro-mogote-cajones'
]
const jerarquiaTour = (tour) => (!esPlaceholder(tour) ? 0 : tour.disponible ? 1 : 2)
const toursOrdenados = computed(() =>
  [...tours].sort((a, b) => {
    const ia = ordenDeseado.indexOf(a.slug)
    const ib = ordenDeseado.indexOf(b.slug)
    if (ia !== -1 && ib !== -1) return ia - ib
    if (ia !== -1) return -1
    if (ib !== -1) return 1
    return jerarquiaTour(a) - jerarquiaTour(b)
  })
)

const dificultadClass = (tour) =>
  tour.dificultad === 'Alta'
    ? 'text-brand-orange'
    : tour.dificultad === 'Media'
      ? 'text-brand-gold'
      : 'text-brand-green'

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const cardWidth = scrollContainer.value.querySelector('article')?.offsetWidth || 300
  const gap = 24
  scrollContainer.value.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' })
}
</script>

<template>
  <section id="tours" ref="sectionRef" class="relative py-20 md:py-28 overflow-hidden">
    <img
      src="/assets/tours/tours-background.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-brand-dark/85"></div>
    <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
      <!-- Header -->
      <div class="mb-10 md:mb-14 transition-all duration-700" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
        <h2 class="font-heading text-4xl md:text-5xl text-brand-white mb-3">
          Experiencias de trekking
        </h2>
        <div class="h-1 w-24 bg-gradient-to-r from-brand-gold to-brand-cream/50 mb-4"></div>
        <p class="text-brand-cream/70 text-sm md:text-base max-w-md">
          Elegí tu próxima aventura en las sierras de Córdoba.
        </p>
      </div>

      <!-- Horizontal scroll container -->
      <div class="relative group/nav">
        <!-- Fade edges on mobile -->
        <div class="absolute left-0 top-0 bottom-6 w-4 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none md:hidden"></div>
        <div class="absolute right-0 top-0 bottom-6 w-4 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none md:hidden"></div>

        <!-- Navigation arrows -->
        <button
          @click="scroll(-1)"
          aria-label="Experiencia anterior"
          class="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-cream/10 backdrop-blur-sm border border-brand-cream/10 flex items-center justify-center text-brand-cream opacity-60 md:opacity-0 md:group-hover/nav:opacity-100 hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white active:scale-95 transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="scroll(1)"
          aria-label="Experiencia siguiente"
          class="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-cream/10 backdrop-blur-sm border border-brand-cream/10 flex items-center justify-center text-brand-cream opacity-60 md:opacity-0 md:group-hover/nav:opacity-100 hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white active:scale-95 transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex items-start gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
        >
          <article
            v-for="tour in toursOrdenados"
            :key="tour.slug"
            class="w-[85vw] sm:w-[80vw] md:w-[calc((100%-2rem)/3)] snap-start flex-shrink-0 bg-brand-card rounded-2xl overflow-hidden group transition-all duration-300 border border-brand-cream/15 hover:border-brand-cream/25 hover:shadow-lg hover:shadow-brand-orange/10"
          >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <TourPlaceholder
                v-if="esPlaceholder(tour)"
                :tour="tour"
                class="w-full h-full group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110 transition-all duration-500"
              />
              <img
                v-else
                :src="tour.imagen"
                :alt="tour.nombre"
                :loading="tour === toursOrdenados[0] ? 'eager' : 'lazy'"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110 transition-all duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent"></div>
              <span
                v-if="esDefinir(tour)"
                class="absolute top-3 left-3 bg-brand-orange text-brand-white text-xs font-bold px-3 py-1 rounded-full font-sans"
              >
                Próximamente
              </span>
              <template v-else>
                <span class="absolute top-3 right-3 max-w-[80%] bg-brand-dark/60 backdrop-blur-sm border border-brand-cream/10 text-xs font-bold px-3 py-1 rounded-full font-sans truncate" :class="dificultadClass(tour)">
                  {{ tour.dificultad }}
                  <template v-if="tour.terreno && tour.terreno !== tour.dificultad">
                    <span class="hidden sm:inline">· Terreno: {{ tour.terreno }}</span>
                  </template>
                  <template v-if="tour.distancia && tour.distancia !== tour.dificultad">
                    <span class="hidden sm:inline">· Dist: {{ tour.distancia }}</span>
                  </template>
                </span>
                <span class="absolute bottom-3 left-3 text-brand-white text-xs font-sans bg-brand-dark/60 backdrop-blur-sm px-2 py-1 rounded">
                  {{ tour.duracion }}
                </span>
              </template>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="font-heading text-xl md:text-2xl text-brand-white mb-3 leading-tight">
                {{ tour.nombre }}
              </h3>

              <div v-if="!esDefinir(tour)" class="flex items-center gap-1 mb-4 text-sm text-brand-cream/60 font-sans">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-brand-cream/40">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {{ tour.horarios }}
              </div>

              <div v-if="!esDefinir(tour)" class="mb-5">
                <div class="flex items-baseline gap-2">
                  <span class="text-brand-cream/90 font-heading text-2xl">
                    {{ formatPrecio(tour.precio) }}
                  </span>
                  <span class="text-brand-cream/50 text-xs font-sans">por persona</span>
                </div>
                <p v-if="tour.precioDetalle" class="text-brand-cream/50 text-xs font-sans mt-1">
                  {{ tour.precioDetalle }}
                </p>
              </div>

              <button
                v-if="!esDefinir(tour)"
                @click="selectedTour = tour"
                class="w-full min-h-11 border-2 border-brand-cream/20 text-brand-cream/80 rounded-lg py-3.5 font-sans font-semibold hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white hover:shadow-md hover:shadow-brand-orange/20 transition-all duration-300 text-sm"
              >
                Conocer la experiencia
              </button>
              <a
                v-if="!esDefinir(tour)"
                :href="crearConsultaTour(tour)"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Consultar por WhatsApp sobre ${tour.nombre}`"
                class="mx-auto mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/15 transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d]"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>

      <!-- Scroll hint mobile -->
       <div class="flex items-center justify-center gap-2 mt-4 md:hidden text-brand-cream/50 text-xs font-sans">
         <span>Deslizá para ver más experiencias</span>
         <svg class="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
         </svg>
       </div>
    </div>

    <TourModal
      :tour="selectedTour"
      :open="!!selectedTour"
      @close="selectedTour = null"
    />
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
