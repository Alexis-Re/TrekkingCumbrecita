<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { acreditacion } from '../data/acreditacion.js'

const sectionRef = ref(null)
const isVisible = ref(false)
const statsVisible = ref(false)
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

const stats = [
  { target: 27, suffix: '+', label: 'Años de experiencia guiando' },
  { target: 5000, suffix: '+', label: 'Personas acompañadas en la montaña' },
  { target: 14, suffix: '', label: 'Experiencias desde 1 hasta 7 días' }
]

const animatedStats = ref(stats.map(() => ({ current: 0, started: false })))

function animateCount(index) {
  const stat = stats[index]
  const duration = 1800
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedStats.value[index].current = Math.round(eased * stat.target)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

watch(isVisible, (val) => {
  if (val) {
    statsVisible.value = true
    stats.forEach((_, i) => {
      setTimeout(() => animateCount(i), 400 + i * 200)
    })
  }
})

</script>

<template>
  <section id="identity" ref="sectionRef" class="relative bg-brand-dark overflow-hidden">

    <!-- BLOQUE 1: Sobre mí -->
    <div class="relative py-12 md:py-16">
      <img
        src="/assets/brand/pasiaje-grupo.webp"
        alt=""
        loading="lazy"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/60 to-brand-dark"></div>
      <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <!-- Mosaico de fotos -->
          <div
            class="grid grid-cols-2 grid-rows-3 gap-3 h-[300px] md:grid-cols-3 md:grid-rows-3 md:h-[450px] transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <div class="col-span-1 row-span-2 md:col-span-2 md:row-span-3 rounded-xl overflow-hidden">
              <img
                src="/assets/brand/robermolina.webp"
                alt="Rober Molina - Guía de trekking"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                src="/assets/tours/pueblo-escondido/gente-cascada-bandera.webp"
                alt="Grupo junto a una cascada en las sierras"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                src="/assets/tours/champaqui/colegio-champa.webp"
                alt="Grupo de estudiantes en el Cerro Champaquí"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="col-span-2 md:col-span-1 rounded-xl overflow-hidden">
              <img
                src="/assets/tours/champaqui/grupoespalkdas.webp"
                alt="Grupo de trekking en la montaña"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <!-- Texto + Valores -->
          <div>
            <div
              class="transition-all duration-700"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-3">
                Quién te acompaña
              </p>
              <h2 class="font-heading text-3xl md:text-4xl text-brand-white uppercase mb-4">
                Conocé a Rober
              </h2>
              <div class="h-1 w-16 bg-gradient-to-r from-brand-orange to-brand-gold mb-6"></div>

              <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-4">
                Soy guía de trekking y apasionado conocedor de los paisajes de Córdoba. Desde La Cumbrecita, acompaño a quienes buscan explorar la montaña, descubrir nuevos senderos y vivir experiencias auténticas en contacto con la naturaleza.
              </p>
               <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-8">
                 Hoy, con más de 27 años de experiencia, mi objetivo es compartir esa pasión con otros. Cada trekking es una oportunidad para crear recuerdos inolvidables y conectar con la naturaleza de forma segura y respetuosa.
               </p>

               <!-- Ficha pública: no expone DNI, foto ni firma de la credencial. -->
               <div class="mb-10 rounded-2xl border border-brand-cream/15 bg-brand-card/70 p-5 md:p-6">
                 <div class="flex items-start gap-3">
                   <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
                     <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3l8 4v5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" />
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4" />
                     </svg>
                   </div>
                   <div class="min-w-0">
                     <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                       Acreditación oficial
                     </p>
                     <h3 class="mt-1 font-heading text-xl uppercase leading-tight text-brand-white">
                       {{ acreditacion.titulo }}
                     </h3>
                     <p class="mt-1 text-sm leading-relaxed text-brand-cream/65">
                       {{ acreditacion.marcoLegal }} · Resolución {{ acreditacion.resolucion }}
                     </p>
                   </div>
                 </div>

                 <div class="mt-5 border-t border-brand-cream/10 pt-4">
                   <p class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-cream/55">
                     Alcance de la habilitación
                   </p>
                   <div class="space-y-3">
                     <div
                       v-for="habilitacion in acreditacion.habilitaciones"
                       :key="habilitacion.riesgo"
                       class="flex items-start justify-between gap-4 text-sm"
                     >
                       <span class="shrink-0 font-semibold text-brand-cream/90">{{ habilitacion.riesgo }}</span>
                       <span class="text-right text-brand-cream/65">{{ habilitacion.actividades }}</span>
                     </div>
                   </div>
                 </div>

               </div>
             </div>

           </div>

         </div>
      </div>
    </div>

    <!-- BLOQUE 2: Estadísticas -->
    <div class="border-y border-brand-cream/10 bg-brand-orange/5">
      <div class="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div class="grid grid-cols-3 divide-x divide-brand-cream/10">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="py-5 md:py-7 px-2 md:px-4 text-center transition-all duration-500"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: `${200 + index * 150}ms` }"
          >
            <span class="block font-heading text-2xl sm:text-3xl md:text-5xl text-brand-orange mb-1">
              {{ animatedStats[index].current }}{{ stat.suffix }}
            </span>
            <span class="text-brand-cream/60 text-xs md:text-sm leading-tight font-sans">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
