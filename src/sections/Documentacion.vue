<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { documentos } from '../data/documentos.js'

const sectionRef = ref(null)
const isVisible = ref(false)
const openPanel = ref(null)
let observer = null

function togglePanel(panel) {
  openPanel.value = openPanel.value === panel ? null : panel
}

function openPreparacion() {
  openPanel.value = 'mochila'
  requestAnimationFrame(() => {
    sectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 },
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
  window.addEventListener('documentacion:abrir-preparacion', openPreparacion)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('documentacion:abrir-preparacion', openPreparacion)
})
</script>

<template>
  <section id="documentacion" ref="sectionRef" class="relative scroll-mt-24 overflow-hidden border-y border-brand-cream/10 bg-brand-dark py-10 md:py-14">
    <img
      src="/assets/documentacion/documento-ilustracion.svg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center opacity-10 md:opacity-20"
    />
    <div class="absolute inset-0 bg-brand-dark/80 md:bg-brand-dark/75"></div>

    <div class="relative z-10 mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
      <div
        class="mx-auto mb-7 max-w-2xl text-center transition-all duration-700 md:mb-9"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <p class="mb-2 font-sans text-xs tracking-[0.25em] uppercase text-brand-orange md:text-sm">
          Antes de salir
        </p>
        <h2 class="mb-3 font-heading text-3xl uppercase text-brand-white md:text-5xl">
          Prepará tu aventura
        </h2>
        <p class="text-sm leading-relaxed text-brand-cream/70 md:text-base">
          Documentación, equipo y recomendaciones para disfrutar la montaña con seguridad.
        </p>
      </div>

      <div class="mx-auto max-w-4xl">
        <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
          Documentación obligatoria
        </p>
        <div class="space-y-2">
          <article
            v-for="documento in documentos"
            :key="documento.id"
            class="overflow-hidden rounded-xl border border-brand-cream/15 bg-brand-card/90 transition-colors duration-300 hover:border-brand-orange/40"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <button
              type="button"
              class="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left text-brand-white transition-colors hover:bg-brand-cream/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange md:px-5"
              :aria-expanded="openPanel === `documento-${documento.id}`"
              :aria-controls="`contenido-${documento.id}`"
              @click="togglePanel(`documento-${documento.id}`)"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-orange/30 bg-brand-orange/10 text-brand-orange" aria-hidden="true">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block font-heading text-lg uppercase leading-tight text-brand-white md:text-xl">{{ documento.titulo }}</span>
                <span class="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-orange">{{ documento.formato }}</span>
              </span>
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cream/20 text-lg leading-none text-brand-orange transition-transform duration-300" :class="openPanel === `documento-${documento.id}` ? 'rotate-45' : ''" aria-hidden="true">+</span>
            </button>

            <div v-if="openPanel === `documento-${documento.id}`" :id="`contenido-${documento.id}`" class="border-t border-brand-cream/10 px-4 pb-4 pt-4 md:px-5">
              <p class="mb-4 text-sm leading-relaxed text-brand-cream/70">{{ documento.descripcion }}</p>
              <div class="grid grid-cols-2 gap-2">
                <a
                  :href="documento.archivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-cream/20 px-3 py-2 text-center text-xs font-semibold text-brand-cream transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Abrir
                </a>
                <a
                  :href="documento.archivo"
                  :download="documento.titulo"
                  class="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-orange px-3 py-2 text-center text-xs font-semibold text-brand-white transition-all duration-300 hover:bg-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  Descargar PDF
                </a>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-8 md:mt-10">
          <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
            Preparación general
          </p>
          <div class="space-y-2">
            <article class="overflow-hidden rounded-xl border border-brand-cream/15 bg-brand-card/80">
              <button type="button" class="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left text-brand-white transition-colors hover:bg-brand-cream/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange md:px-5" :aria-expanded="openPanel === 'mochila'" aria-controls="contenido-mochila" @click="togglePanel('mochila')">
                <span class="text-lg" aria-hidden="true">🎒</span>
                <span class="flex-1 font-heading text-lg tracking-wide md:text-xl">Mochila y equipo</span>
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cream/20 text-lg leading-none text-brand-orange transition-transform duration-300" :class="openPanel === 'mochila' ? 'rotate-45' : ''" aria-hidden="true">+</span>
              </button>
              <div v-if="openPanel === 'mochila'" id="contenido-mochila" class="border-t border-brand-cream/10 px-4 pb-5 pt-4 md:px-5">
                <ul class="grid gap-2 text-sm leading-relaxed text-brand-cream/70 md:grid-cols-2 md:gap-x-8">
                  <li>• Mochila de 30/40 litros para salidas de un día.</li>
                  <li>• Aproximadamente 50 litros para travesías de varios días.</li>
                  <li>• Calzado de trekking y un par de repuesto.</li>
                  <li>• Ropa térmica, abrigo e impermeable resistente.</li>
                  <li>• Protector solar, gorra y lentes.</li>
                  <li>• Linterna y mini botiquín personal.</li>
                </ul>
              </div>
            </article>

            <article class="overflow-hidden rounded-xl border border-brand-cream/15 bg-brand-card/80">
              <button type="button" class="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left text-brand-white transition-colors hover:bg-brand-cream/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange md:px-5" :aria-expanded="openPanel === 'hidratacion'" aria-controls="contenido-hidratacion" @click="togglePanel('hidratacion')">
                <span class="text-lg" aria-hidden="true">💧</span>
                <span class="flex-1 font-heading text-lg tracking-wide md:text-xl">Hidratación</span>
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cream/20 text-lg leading-none text-brand-orange transition-transform duration-300" :class="openPanel === 'hidratacion' ? 'rotate-45' : ''" aria-hidden="true">+</span>
              </button>
              <div v-if="openPanel === 'hidratacion'" id="contenido-hidratacion" class="border-t border-brand-cream/10 px-4 pb-5 pt-4 md:px-5">
                <ul class="space-y-2 text-sm leading-relaxed text-brand-cream/70">
                  <li>• Llevá siempre tu propia reserva de agua.</li>
                  <li>• Tomá pequeños sorbos de manera regular, sin esperar a tener sed.</li>
                  <li>• Podés usar sales, tabletas de electrolitos o bebidas isotónicas si ya las conocés y son adecuadas para vos.</li>
                  <li>• Si usás sales, preparalas según las indicaciones del envase.</li>
                </ul>
              </div>
            </article>

            <article class="overflow-hidden rounded-xl border border-brand-cream/15 bg-brand-card/80">
              <button type="button" class="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left text-brand-white transition-colors hover:bg-brand-cream/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange md:px-5" :aria-expanded="openPanel === 'comida'" aria-controls="contenido-comida" @click="togglePanel('comida')">
                <span class="text-lg" aria-hidden="true">🍫</span>
                <span class="flex-1 font-heading text-lg tracking-wide md:text-xl">Comida</span>
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cream/20 text-lg leading-none text-brand-orange transition-transform duration-300" :class="openPanel === 'comida' ? 'rotate-45' : ''" aria-hidden="true">+</span>
              </button>
              <div v-if="openPanel === 'comida'" id="contenido-comida" class="border-t border-brand-cream/10 px-4 pb-5 pt-4 md:px-5">
                <ul class="space-y-2 text-sm leading-relaxed text-brand-cream/70">
                  <li>• Consumí pequeñas cantidades antes de sentir agotamiento.</li>
                  <li>• Elegí dátiles, frutos secos, membrillo, barritas, turrones, gomitas o geles energéticos.</li>
                  <li>• Llevá almuerzo liviano o vianda según la experiencia.</li>
                  <li>• Guardá la comida del día en la parte superior de la mochila.</li>
                  <li>• No lleves platos ni cubiertos si la salida no los requiere.</li>
                </ul>
              </div>
            </article>

            <article class="overflow-hidden rounded-xl border border-brand-orange/20 bg-brand-orange/5">
              <button type="button" class="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left text-brand-white transition-colors hover:bg-brand-orange/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-orange md:px-5" :aria-expanded="openPanel === 'importante'" aria-controls="contenido-importante" @click="togglePanel('importante')">
                <span class="text-lg" aria-hidden="true">⚠️</span>
                <span class="flex-1 font-heading text-lg tracking-wide md:text-xl">Muy importante</span>
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-orange/30 text-lg leading-none text-brand-orange transition-transform duration-300" :class="openPanel === 'importante' ? 'rotate-45' : ''" aria-hidden="true">+</span>
              </button>
              <div v-if="openPanel === 'importante'" id="contenido-importante" class="border-t border-brand-orange/15 px-4 pb-5 pt-4 md:px-5">
                <p class="text-sm leading-relaxed text-brand-cream/75">
                  Durante los días previos acostumbrate de manera gradual a hidratarte y alimentarte durante la actividad. El equipo guía puede llevar hidratación de apoyo, pero cada participante debe llevar su propia reserva de agua y alimentos, y conocer cómo responde su cuerpo.
                </p>
                <p class="mt-3 border-t border-brand-orange/15 pt-3 text-xs leading-relaxed text-brand-cream/60">
                  La lista puede variar según la duración y las características de cada experiencia. Consultá los requisitos específicos dentro de cada tour.
                </p>
              </div>
            </article>
          </div>
        </div>

        <p class="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-brand-cream/50 md:mt-8 md:text-sm">
          La documentación debe ser leída y presentada antes de iniciar la actividad.
        </p>
      </div>
    </div>
  </section>
</template>
