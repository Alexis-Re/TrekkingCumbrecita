<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { testimonios } from '../data/testimonios.js'
import TestimonialCollageCard from '../components/TestimonialCollageCard.vue'

// Fotos de fondo por testimonio (imágenes con "grupo/gente" en el nombre)
const fondosTestimonios = [
  '/assets/tours/champaqui/grupo-nieve-altura.webp',
  '/assets/tours/pueblo-escondido/gente-bandera-puebloescondido.webp',
  '/assets/tours/pueblo-escondido/gente-bandera-cruz.webp',
  '/assets/tours/Cumbrecitariosubtecascada/grupo-bañandose.webp',
  '/assets/tours/quebrada-yatan/grupo-cascada.webp',
  '/assets/tours/champaqui/champa -nievegrupo.webp',
  '/assets/tours/quebrada-yatan/grupo-noche-descanso.webp',
  '/assets/tours/Cumbrecitariosubtecascada/grupo-enorme.webp'
]

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null
let visibilityFallback = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        clearTimeout(visibilityFallback)
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)

  // Evita que la sección quede oculta si el observer no dispara.
  visibilityFallback = window.setTimeout(() => {
    isVisible.value = true
    observer?.disconnect()
  }, 1500)
})

onUnmounted(() => {
  observer?.disconnect()
  clearTimeout(visibilityFallback)
})

// Carga progresiva: primero 5, luego duplica el lote (5 → 10 → ...)
const INICIAL = 5
const limiteVisible = ref(INICIAL)

const visibles = computed(() => testimonios.slice(0, limiteVisible.value))
const hayMas = computed(() => limiteVisible.value < testimonios.length)
const restantes = computed(() => testimonios.length - limiteVisible.value)

// Materiales variados de fondo para tarjetas repetidas al duplicar
function fondoPara(index) {
  return fondosTestimonios[index % fondosTestimonios.length]
}

function verMas() {
  if (hayMas.value) {
    limiteVisible.value = Math.min(limiteVisible.value * 2, testimonios.length)
  } else {
    limiteVisible.value = INICIAL
  }
}
</script>

<template>
  <section
    ref="sectionRef"
    class="relative py-20 md:py-28 overflow-hidden"
  >
    <img
      src="/assets/tours/Cumbrecitariosubtecascada/grupo-enorme.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark"></div>

    <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
      <div
        class="text-center mb-14 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-3">
          Testimonios
        </p>
        <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-white uppercase leading-none mb-4">
          Lo que dicen quienes nos eligieron
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-brand-orange to-brand-gold mx-auto"></div>
      </div>

      <!-- Masonry de testimonios -->
      <div class="columns-1 sm:columns-2 md:columns-3">
        <TestimonialCollageCard
          v-for="(testimonio, index) in visibles"
          :key="testimonio.nombre"
          :testimonio="testimonio"
          :imagen-fondo="fondoPara(index)"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          class="transition-all duration-700"
          :style="{ transitionDelay: `${150 + (index % INICIAL) * 120}ms` }"
        />
      </div>

      <!-- Ver más / Ver menos -->
      <div v-if="testimonios.length > INICIAL" class="flex justify-center mt-4">
        <button
          type="button"
          @click="verMas"
          class="min-h-11 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-sm font-semibold transition-all duration-300 active:scale-95"
          :class="hayMas
            ? 'bg-brand-card border border-brand-cream/15 text-brand-cream hover:border-brand-orange/40 hover:text-brand-cream'
            : 'bg-brand-orange text-brand-white shadow-md shadow-brand-orange/25 hover:bg-brand-gold'"
        >
          <svg class="w-4 h-4" :class="hayMas ? '' : 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          {{ hayMas ? `Ver más testimonios (quedan ${restantes})` : 'Mostrar menos' }}
        </button>
      </div>
    </div>
  </section>
</template>
