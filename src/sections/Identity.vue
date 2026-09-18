<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { acreditacion } from '../data/acreditacion.js'
import { tours } from '../data/tours.js'

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
  { target: 27, suffix: '+', label: 'Años de experiencia guiando', icono: 'anios' },
  { target: 5000, suffix: '+', label: 'Personas acompañadas en la montaña', icono: 'personas' },
  { target: tours.filter((tour) => tour.disponible).length, suffix: '', label: 'Experiencias disponibles', icono: 'experiencias' },
  { target: 4.9, suffix: '/5', label: 'Valoración promedio', icono: 'valoracion', decimals: 1 }
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
    animatedStats.value[index].current = stat.decimals
      ? (eased * stat.target).toFixed(stat.decimals)
      : Math.round(eased * stat.target)

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
                <div id="acreditacion" class="scroll-mt-24 md:scroll-mt-28 mb-10 rounded-2xl border border-brand-cream/15 bg-brand-card/70 p-5 md:p-6">
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
                        :key="habilitacion.actividades"
                        class="text-sm"
                      >
                        <span class="text-brand-cream/65">{{ habilitacion.actividades }}</span>
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
     <div class="border-y border-brand-cream/10 bg-brand-orange/5 py-14 md:py-20">
       <div class="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
         <div
           class="mb-10 text-center transition-all duration-700 md:mb-14"
           :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
         >
           <p class="mb-3 font-sans text-sm tracking-[0.3em] uppercase text-brand-orange">
             Por qué elegirnos
           </p>
           <h2 class="mb-3 font-heading text-3xl uppercase text-brand-white md:text-4xl">
             Números que avalan la experiencia
           </h2>
           <p class="text-sm text-brand-cream/70 md:text-base">
             Más de dos décadas guiando por las sierras de Córdoba
           </p>
         </div>

         <div class="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-brand-cream/10">
           <div
             v-for="(stat, index) in stats"
             :key="stat.label"
             class="min-w-0 rounded-xl border border-brand-cream/10 bg-brand-dark/20 px-4 py-6 text-center transition-all duration-500 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-2 sm:py-8 md:px-4 md:py-12"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
             :style="{ transitionDelay: `${200 + index * 150}ms` }"
           >
             <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
               <svg v-if="stat.icono === 'anios'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3l2.6 5.27 5.82.85-4.21 4.1.99 5.8L12 16.28l-5.2 2.74.99-5.8-4.21-4.1 5.82-.85L12 3Z" />
               </svg>
               <svg v-else-if="stat.icono === 'personas'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.13a9.38 9.38 0 0 0 2.63.37 9.34 9.34 0 0 0 4.12-.95 4.13 4.13 0 0 0-7.53-2.49M15 19.13v-.01a6.75 6.75 0 0 0-.79-3.07m.79 3.07v.11A12.32 12.32 0 0 1 8.62 21c-2.33 0-4.51-.65-6.37-1.77v-.11a6.38 6.38 0 0 1 11.96-3.07M12 6.38a3.38 3.38 0 1 1-6.75 0 3.38 3.38 0 0 1 6.75 0Z" />
               </svg>
               <svg v-else-if="stat.icono === 'experiencias'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v15m6-12v15" />
               </svg>
               <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
               </svg>
             </div>
             <span class="mb-1 block font-heading text-4xl text-brand-orange md:text-5xl">
               {{ animatedStats[index].current }}{{ stat.suffix }}
             </span>
             <span class="mx-auto block max-w-[14rem] font-sans text-sm leading-snug text-brand-cream/70 md:text-base">
               {{ stat.label }}
             </span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
