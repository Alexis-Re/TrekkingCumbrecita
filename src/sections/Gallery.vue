<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Lightbox from '../components/Lightbox.vue'

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

  // Evita que el encabezado quede oculto si el observer no dispara.
  visibilityFallback = window.setTimeout(() => {
    isVisible.value = true
    observer?.disconnect()
  }, 1500)
})

onUnmounted(() => {
  observer?.disconnect()
  clearTimeout(visibilityFallback)
})

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
  { src: '/assets/tours/pueblo-escondido/gente-bandera-puebloescondido.webp', titulo: 'Pueblo Escondido', lugar: 'Pueblo Escondido' },
  // Quebrada del Yatán
  { src: '/assets/tours/quebrada-yatan/aguila-paisaje.webp', titulo: 'Aves sobre el mar de nubes', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/cascada.webp', titulo: 'La cascada de la Quebrada', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/grupo-cascada.webp', titulo: 'El grupo frente a la cascada', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/paisaje-nubebajita.webp', titulo: 'Nubes bajas en la quebrada', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/aguila.webp', titulo: 'Águila en vuelo', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/cascada-paisaje.webp', titulo: 'Salto entre rocas', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/cascada-verde.webp', titulo: 'Cascada entre la vegetación', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/casita-paisaje.webp', titulo: 'Casita de piedra en la sierra', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/gente-cuevas.webp', titulo: 'Túnel en la oscuridad', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/grupo-descanso.webp', titulo: 'Descanso en el refugio', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/grupo-noche-descanso.webp', titulo: 'Noche en el refugio', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/grupo.webp', titulo: 'El grupo entre ruinas', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/hermosafoto.webp', titulo: 'Ruinas antiguas', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/noche-casapiedra.webp', titulo: 'Vía Láctea sobre la casa de piedra', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/paisaje.webp', titulo: 'Paisaje serrano', lugar: 'Quebrada del Yatán' },
  { src: '/assets/tours/quebrada-yatan/rober-campana-grupo.webp', titulo: 'Grupo en el portón con campana', lugar: 'Quebrada del Yatán' },
  // Champaquí (faltantes)
  { src: '/assets/tours/champaqui/champa -nievegrupo.webp', titulo: 'El grupo entre la nieve', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/champaqui/grupo-bandera-champa (2).webp', titulo: 'Bandera en la cumbre', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/champaqui/colegio-champa.webp', titulo: 'Grupo de estudiantes', lugar: 'Cerro Champaquí' },
  { src: '/assets/tours/champaqui/rober-paisajaso.webp', titulo: 'Vista épica desde la cumbre', lugar: 'Cerro Champaquí' },
  // Pueblo Escondido (faltantes)
  { src: '/assets/tours/pueblo-escondido/cascada.webp', titulo: 'Velo de la Novia de cerca', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/pueblo-escondido/gente-bandera-casa.webp', titulo: 'Con bandera frente a la casa antigua', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/pueblo-escondido/gente-bandera-cruz.webp', titulo: 'Partida desde La Cruz', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/pueblo-escondido/gente-subiendorotada.webp', titulo: 'Subida en equipo', lugar: 'Pueblo Escondido' },
  { src: '/assets/tours/pueblo-escondido/hombre-cascada-hielo.webp', titulo: 'Frente a la cascada congelada', lugar: 'Pueblo Escondido' },
  // La Cumbrecita (faltantes)
  { src: '/assets/tours/Cumbrecitariosubtecascada/cascada.webp', titulo: 'La Cascada Escondida', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/gente-cascada.webp', titulo: 'Bajo la cascada escondida', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-altura-paisaje.webp', titulo: 'Grupo en las alturas', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-enorme.webp', titulo: 'Formación en la montaña', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-montaña.webp', titulo: 'Grupo entre montañas', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-paisaje.altura.webp', titulo: 'Paisaje de altura', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-piedras-baño.webp', titulo: 'Baño entre las piedras', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-saltando.webp', titulo: 'Salto al río', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/grupo-subiendo-vininedo.webp', titulo: 'Subiendo el sendero', lugar: 'La Cumbrecita' },
  { src: '/assets/tours/Cumbrecitariosubtecascada/pasiaje-grupo.webp', titulo: 'El grupo y el paisaje', lugar: 'La Cumbrecita' }
]

const categorias = ['Todos', 'Cerro Champaquí', 'Pueblo Escondido', 'Quebrada del Yatán', 'La Cumbrecita']
const filtroActivo = ref('Todos')

const galeriaFiltrada = computed(() => {
  if (filtroActivo.value === 'Todos') return galeria
  return galeria.filter(img => img.lugar === filtroActivo.value)
})

// Carga progresiva: primero 5, luego duplica el lote (10 → 20 → 40 → ...)
const INICIAL = 5
const limiteVisible = ref(INICIAL)

const visibles = computed(() => galeriaFiltrada.value.slice(0, limiteVisible.value))
const hayMas = computed(() => limiteVisible.value < galeriaFiltrada.value.length)
const restantes = computed(() => galeriaFiltrada.value.length - limiteVisible.value)

function verMas() {
  if (hayMas.value) {
    limiteVisible.value = Math.min(limiteVisible.value * 2, galeriaFiltrada.value.length)
  } else {
    limiteVisible.value = INICIAL
  }
}

watch(filtroActivo, () => {
  limiteVisible.value = INICIAL
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const abrirLightbox = (i) => {
  const filteredSrc = galeriaFiltrada.value[i].src
  const originalIndex = galeria.findIndex(img => img.src === filteredSrc)
  lightboxIndex.value = originalIndex >= 0 ? originalIndex : i
  lightboxOpen.value = true

  // Precarga la siguiente imagen para que el swipe no muestre hueco
  const siguiente = galeria[(originalIndex + 1) % galeria.length]
  if (siguiente) new Image().src = siguiente.src
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
      <div class="mb-10 md:mb-12">
        <div class="transition-all duration-700" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-2">
            Galería
          </p>
          <h2 class="font-heading text-3xl md:text-4xl text-brand-white uppercase">
            Así se vive la montaña
          </h2>
          <div class="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-cream/50 mt-4"></div>

          <!-- Instagram, discreto -->
          <a
            href="https://www.instagram.com/trekking_cumbrecita/"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-1.5 text-brand-cream/50 text-xs font-sans tracking-wide hover:text-brand-orange active:text-brand-orange transition-colors duration-300"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            <span class="underline decoration-brand-cream/20 underline-offset-2 hover:decoration-brand-orange/50">@trekking_cumbrecita</span>
          </a>
        </div>
      </div>

      <!-- Filtros -->
      <div
        class="flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <button
          v-for="cat in categorias"
          :key="cat"
          @click="filtroActivo = cat"
          class="min-h-11 flex items-center px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-300"
          :class="filtroActivo === cat
            ? 'bg-brand-orange text-brand-white shadow-md shadow-brand-orange/25'
            : 'bg-brand-card border border-brand-cream/15 text-brand-cream/70 hover:border-brand-orange/40 hover:text-brand-cream'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="columns-2 md:columns-3 gap-3 md:gap-4">
        <figure
          v-for="(img, i) in visibles"
          :key="img.src"
          class="group relative mb-3 md:mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange transition-all duration-500"
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
            class="w-full h-auto block group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span class="text-brand-orange text-xs font-sans uppercase tracking-[0.12em] md:tracking-[0.2em] mb-0.5">
              {{ img.lugar }}
            </span>
            <h3 class="font-heading text-lg text-brand-white uppercase leading-tight">
              {{ img.titulo }}
            </h3>
          </div>

          <span class="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-orange/80 backdrop-blur-sm flex items-center justify-center text-brand-white opacity-80 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-110 transition-all duration-300 shadow-lg shadow-brand-orange/30" aria-hidden="true">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6m0 0v6m0-6l-9 9M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
            </svg>
          </span>
        </figure>
      </div>

      <!-- Ver más / Ver menos -->
      <div v-if="galeriaFiltrada.length > INICIAL" class="flex justify-center mt-2 mb-8">
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
          {{ hayMas ? `Ver más imágenes (quedan ${restantes})` : 'Mostrar menos' }}
        </button>
      </div>
    </div>

    <Lightbox
      v-model:index="lightboxIndex"
      :images="galeria"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
    />
  </section>
</template>
