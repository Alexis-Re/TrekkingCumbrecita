<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonios } from '../data/testimonios.js'
import TestimonialCollageCard from '../components/TestimonialCollageCard.vue'

// Fotos de fondo decorativas por testimonio (fotos con "grupo/gente" en el nombre)
const fondosTestimonios = [
  '/assets/tours/champaqui/grupo-nieve-altura.webp',
  '/assets/tours/pueblo-escondido/gente-bandera-puebloescondido.webp',
  '/assets/tours/pueblo-escondido/gente-bandera-cruz.webp'
]

// El primer testimonio se muestra como card destacada del collage
const [destacada, ...compactos] = testimonios

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

      <!-- Collage asimétrico -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        <!-- Card destacada: 2 columnas en desktop -->
        <div
          class="md:col-span-2 transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 200ms"
        >
          <TestimonialCollageCard
            :testimonio="destacada"
            :imagen-fondo="fondosTestimonios[0]"
            destacada
          />
        </div>

        <!-- Cards compactas -->
        <div
          v-for="(testimonio, index) in compactos"
          :key="testimonio.nombre"
          class="transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${350 + (index + 1) * 150}ms` }"
        >
          <TestimonialCollageCard
            :testimonio="testimonio"
            :imagen-fondo="fondosTestimonios[index + 1] || fondosTestimonios[0]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
