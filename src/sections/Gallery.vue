<script setup>
import { ref } from 'vue'

const galeria = [
  '/assets/tours/champaqui/gente-cuevas.webp',
  '/assets/tours/champaqui/hombre-cascada-hielo.webp',
  '/assets/tours/pueblo-escondido/gente-cuevas.webp',
  '/assets/tours/pueblo-escondido/rober-casa_antigua-bandera.webp',
  '/assets/tours/pueblo-escondido/gente-bandera-cruz.webp',
  '/assets/tours/champaqui/gente-bandera-casa.webp',
  '/assets/tours/champaqui/gente-subiendojpg.webp',
  '/assets/tours/pueblo-escondido/gente-cascada-bandera.webp'
]

const galeriaContainer = ref(null)

const scrollGaleria = (direction) => {
  if (!galeriaContainer.value) return
  const cardWidth = galeriaContainer.value.querySelector('img')?.offsetWidth || 300
  galeriaContainer.value.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' })
}
</script>

<template>
  <section id="gallery" class="py-16 md:py-20 bg-brand-dark overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-2">
            Galería
          </p>
          <h3 class="font-heading text-3xl md:text-4xl text-brand-white uppercase">
            En la montaña
          </h3>
        </div>
        <div class="hidden md:flex gap-2">
          <button
            @click="scrollGaleria(-1)"
            class="w-10 h-10 rounded-full border border-brand-cream/20 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="scrollGaleria(1)"
            class="w-10 h-10 rounded-full border border-brand-cream/20 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref="galeriaContainer"
        class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        <img
          v-for="(img, i) in galeria"
          :key="i"
          :src="img"
          :alt="`Galería ${i + 1}`"
          class="w-[70vw] md:w-[280px] h-[200px] md:h-[220px] object-cover rounded-xl snap-start flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
        />
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
