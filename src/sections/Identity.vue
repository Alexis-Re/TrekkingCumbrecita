<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

const stats = [
  { number: '15+', label: 'Años de experiencia' },
  { number: '200+', label: 'Experiencias guiadas' },
  { number: '500+', label: 'Clientes satisfechos' },
  { number: '1500+', label: 'Km de senderos recorridos' }
]

const valores = [
  {
    nombre: 'Naturaleza',
    descripcion: 'Te acompaño a conectar con el bosque, los ríos y las cumbres del Valle de Calamuchita.',
    icono: 'hoja'
  },
  {
    nombre: 'Aventura',
    descripcion: 'Ríos, cascadas y cumbres: cada sendero propone una forma nueva de vivir las sierras.',
    icono: 'montana'
  },
  {
    nombre: 'Seguridad',
    descripcion: 'Guía habilitado y equipamiento profesional para que disfrutes cada salida con tranquilidad.',
    icono: 'escudo'
  }
]

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
            class="grid grid-cols-2 grid-rows-3 gap-3 h-[420px] md:grid-cols-3 md:grid-rows-3 md:h-[450px] transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          >
            <div class="col-span-1 row-span-2 md:col-span-2 md:row-span-3 rounded-xl overflow-hidden">
              <img
                src="/assets/brand/robertomolina.jpg"
                alt="Roberto Molina - Guía de trekking"
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
                Conocé a Roberto
              </h2>
              <div class="h-1 w-16 bg-gradient-to-r from-brand-orange to-brand-gold mb-6"></div>

              <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-4">
                Soy guía de trekking y apasionado conocedor de los paisajes de Córdoba. Desde La Cumbrecita, acompaño a quienes buscan explorar la montaña, descubrir nuevos senderos y vivir experiencias auténticas en contacto con la naturaleza.
              </p>
              <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-10">
                Hoy, con más de 15 años de experiencia, mi objetivo es compartir esa pasión con otros. Cada trekking es una oportunidad para crear recuerdos inolvidables y conectar con la naturaleza de forma segura y respetuosa.
              </p>
            </div>

            <!-- Valores -->
            <div class="space-y-6">
              <div
                v-for="(valor, index) in valores"
                :key="valor.nombre"
                class="flex items-start gap-4 group transition-all duration-500"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                :style="{ transitionDelay: `${200 + index * 150}ms` }"
              >
                <div class="flex-shrink-0 w-11 h-11 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-orange/20 group-hover:border-brand-orange/40">
                  <svg v-if="valor.icono === 'hoja'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21V9" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12c1.5 0 3-1 3-3" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12c-1.5 0-3-1-3-3" />
                  </svg>
                  <svg v-else-if="valor.icono === 'montana'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l5.5-11L12 14l3.5-6L21 20H3z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 8l3 5" />
                  </svg>
                  <svg v-else-if="valor.icono === 'escudo'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-heading text-lg text-brand-white uppercase tracking-wide mb-0.5">
                    {{ valor.nombre }}
                  </h3>
                  <p class="text-brand-cream/65 text-sm leading-relaxed">
                    {{ valor.descripcion }}
                  </p>
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
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-cream/10">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="py-5 md:py-7 px-3 md:px-4 text-center transition-all duration-500"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: `${200 + index * 150}ms` }"
          >
            <span class="block font-heading text-3xl md:text-5xl text-brand-orange mb-1">
              {{ stat.number }}
            </span>
            <span class="text-brand-cream/60 text-sm font-sans">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
