<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonios } from '../data/testimonios.js'

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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(testimonio, index) in testimonios"
          :key="testimonio.nombre"
          class="bg-brand-secondary/60 border border-brand-cream/10 rounded-2xl p-7 relative group
                 hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5
                 transition-all duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${200 + index * 150}ms` }"
        >
          <div class="absolute -top-4 left-7 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center shadow-md shadow-brand-orange/30">
            <svg class="w-4 h-4 text-brand-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>
          </div>

          <p class="text-brand-cream/80 text-sm md:text-base leading-relaxed mb-6 italic mt-2">
            "{{ testimonio.texto }}"
          </p>

          <div class="border-t border-brand-cream/10 pt-4 flex items-center gap-3">
            <img
              :src="testimonio.foto"
              :alt="testimonio.nombre"
              class="w-10 h-10 rounded-full object-cover border-2 border-brand-orange/30"
            />
            <div>
              <span class="block font-sans font-semibold text-brand-white text-sm">
                {{ testimonio.nombre }}
              </span>
              <span class="block font-sans text-brand-orange text-xs mt-0.5">
                {{ testimonio.trekking }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
