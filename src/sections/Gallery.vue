<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Lightbox from '../components/Lightbox.vue'

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

const galeria = [
  { src: '/assets/tours/champaqui/grupo-bandera-champa.webp', titulo: 'Cumbre del Champaquí', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/champaqui/rober-nieve.webp', titulo: 'Nieve en las sierras', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/pueblo-escondido/gente-cascada-portrada.webp', titulo: 'Velo de la Novia', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-bañandose.webp', titulo: 'Baño en el río', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/champaqui/grupogrande-montaña-casarotada.webp', titulo: 'Refugio de montaña', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/pueblo-escondido/cascada-hielo.webp', titulo: 'Cascada congelada', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/champaqui/caminandogrupo-rocas-reflejo2.webp', titulo: 'Sendero entre rocas', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/pueblo-escondido/rober-casa_antigua-bandera-rotada.webp', titulo: 'Casa antigua minera', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/pueblo-escondido/gente-cuevas.webp', titulo: 'Cuevas del poblado', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/champaqui/grupo-nieve-altura.webp', titulo: 'Caminata en altura', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/champaqui/puente-arroyo-roberrotada.webp', titulo: 'Cruce de arroyo', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/pueblo-escondido/gente-bandera-puebloescondido.webp', titulo: 'Pueblo Escondido', lugar: 'Pueblo Escondido' }
]

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const abrirLightbox = (i) => {
  lightboxIndex.value = i
  lightboxOpen.value = true
}
</script>

<template>
  <section id="gallery" ref="sectionRef" class="relative py-16 md:py-20 bg-brand-dark overflow-hidden">
    <img
      src="/assets/brand/cascada.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark"></div>
    <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
      <div class="flex items-end justify-between gap-6 mb-10 md:mb-12">
        <div class="transition-all duration-700" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-2">
            Galería
          </p>
          <h3 class="font-heading text-3xl md:text-4xl text-brand-white uppercase">
            Así se vive la montaña
          </h3>
          <div class="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-cream/50 mt-4"></div>
        </div>

        <a
          href="https://www.instagram.com/trekking_cumbrecita/"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-2 border border-brand-cream/20 text-brand-cream/90 px-5 py-2.5 rounded-full font-sans text-sm font-semibold hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          Seguinos en Instagram
        </a>
      </div>

      <div class="columns-2 md:columns-3 gap-4">
        <figure
          v-for="(img, i) in galeria"
          :key="img.src"
          class="group relative mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          tabindex="0"
          role="button"
          :aria-label="`Abrir imagen: ${img.titulo}`"
          @click="abrirLightbox(i)"
          @keydown.enter="abrirLightbox(i)"
          @keydown.space.prevent="abrirLightbox(i)"
        >
          <img
            :src="img.src"
            :alt="img.titulo"
            loading="lazy"
            decoding="async"
            class="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span class="text-brand-cream/70 text-xs font-sans uppercase tracking-[0.12em] md:tracking-[0.2em]">
              {{ img.lugar }}
            </span>
            <h4 class="font-heading text-lg text-brand-white uppercase leading-tight">
              {{ img.titulo }}
            </h4>
          </div>

          <span class="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center text-brand-cream opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6m0 0v6m0-6l-9 9M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
            </svg>
          </span>
        </figure>
      </div>

      <a
        href="https://www.instagram.com/trekking_cumbrecita/"
        target="_blank"
        rel="noopener noreferrer"
        class="md:hidden inline-flex items-center gap-2 border border-brand-cream/20 text-brand-cream/90 px-5 py-3.5 rounded-full font-sans text-sm font-semibold hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-all duration-300 mt-6"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
        Seguinos en Instagram
      </a>
    </div>

    <Lightbox
      v-model:index="lightboxIndex"
      :images="galeria"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
    />
  </section>
</template>
