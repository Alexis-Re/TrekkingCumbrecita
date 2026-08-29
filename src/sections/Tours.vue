<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { tours } from '../data/tours.js'
import TourModal from '../components/TourModal.vue'

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

const esDefinir = (tour) => tour.precio === 'Definir'

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
          class="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-cream/10 backdrop-blur-sm border border-brand-cream/10 flex items-center justify-center text-brand-cream opacity-60 md:opacity-0 md:group-hover/nav:opacity-100 hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="scroll(1)"
          aria-label="Experiencia siguiente"
          class="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-cream/10 backdrop-blur-sm border border-brand-cream/10 flex items-center justify-center text-brand-cream opacity-60 md:opacity-0 md:group-hover/nav:opacity-100 hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
        >
          <article
            v-for="tour in tours"
            :key="tour.slug"
            class="w-[85vw] sm:w-[80vw] md:w-[calc((100%-2rem)/3)] snap-start flex-shrink-0 bg-brand-card rounded-2xl overflow-hidden group transition-all duration-300 border border-brand-cream/15 hover:border-brand-cream/25"
          >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="tour.imagen"
                :alt="tour.nombre"
                :loading="tour === tours[0] ? 'eager' : 'lazy'"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent"></div>
              <span
                v-if="esDefinir(tour)"
                class="absolute top-3 left-3 bg-brand-orange text-brand-white text-xs font-bold px-3 py-1 rounded-full font-sans"
              >
                Próximamente
              </span>
              <template v-else>
                <span class="absolute top-3 right-3 bg-brand-dark/60 backdrop-blur-sm border border-brand-cream/10 text-brand-cream/90 text-xs font-bold px-3 py-1 rounded-full font-sans">
                  {{ tour.dificultad }}
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
                    {{ tour.precio }}
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
                class="w-full min-h-11 border-2 border-brand-cream/20 text-brand-cream/80 rounded-lg py-3.5 font-sans font-semibold hover:bg-brand-cream/10 transition-colors duration-300 text-sm"
              >
                Conocer la experiencia
              </button>
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
