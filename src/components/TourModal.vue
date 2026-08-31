<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { formatPrecio } from '../utils/format.js'

const props = defineProps({
  tour: { type: Object, default: null },
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const dificultadClass = computed(() =>
  props.tour?.dificultad === 'Alta'
    ? 'text-red-400'
    : props.tour?.dificultad === 'Media'
      ? 'text-brand-gold'
      : 'text-green-400'
)

const currentIndex = ref(0)
const modalRef = ref(null)
let touchStartX = 0
let previousActiveElement = null

watch(() => props.open, (val) => {
  if (val) {
    currentIndex.value = 0
    document.body.style.overflow = 'hidden'
    previousActiveElement = document.activeElement
    nextTick(() => modalRef.value?.querySelector('button')?.focus())
  } else {
    document.body.style.overflow = ''
    previousActiveElement?.focus()
    previousActiveElement = null
  }
})

function prev() {
  if (!props.tour?.imagenes) return
  currentIndex.value = currentIndex.value === 0
    ? props.tour.imagenes.length - 1
    : currentIndex.value - 1
}

function next() {
  if (!props.tour?.imagenes) return
  currentIndex.value = currentIndex.value === props.tour.imagenes.length - 1
    ? 0
    : currentIndex.value + 1
}

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const distance = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(distance) > 50) distance > 0 ? prev() : next()
}

function onKeydown(e) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'Tab') {
    const focusable = [...modalRef.value?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && tour"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalles de ${tour.nombre}`"
        @click.self="emit('close')"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" @click="emit('close')"></div>

        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
          appear
        >
          <div
            ref="modalRef"
            class="relative bg-brand-card rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-brand-cream/10 shadow-2xl"
            @click.stop
          >
            <!-- Close button -->
            <button
              @click="emit('close')"
              class="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-brand-dark/60 backdrop-blur-sm text-brand-cream flex items-center justify-center hover:bg-brand-orange transition-colors duration-200"
              aria-label="Cerrar detalles"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Scrollable content -->
            <div class="overflow-y-auto max-h-[85vh]">
              <!-- Gallery carousel -->
              <div
                v-if="tour.imagenes && tour.imagenes.length > 0"
                class="relative bg-brand-dark overflow-hidden [touch-action:pan-y] flex items-center justify-center min-h-[300px] md:min-h-[400px] max-h-[55vh] md:max-h-[60vh]"
                @touchstart="onTouchStart"
                @touchend="onTouchEnd"
              >
                <img
                  :src="tour.imagenes[currentIndex]"
                  :alt="`${tour.nombre} - imagen ${currentIndex + 1} de ${tour.imagenes.length}`"
                  class="max-w-full max-h-[55vh] md:max-h-[60vh] object-contain"
                />

                <!-- Arrows -->
                <button
                  v-if="tour.imagenes.length > 1"
                  @click.stop="prev"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-dark/50 backdrop-blur-sm text-brand-cream flex items-center justify-center hover:bg-brand-orange transition-colors duration-200"
                  aria-label="Imagen anterior"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  v-if="tour.imagenes.length > 1"
                  @click.stop="next"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-dark/50 backdrop-blur-sm text-brand-cream flex items-center justify-center hover:bg-brand-orange transition-colors duration-200"
                  aria-label="Imagen siguiente"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Dots -->
                <div
                  v-if="tour.imagenes.length > 1"
                  class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
                >
                  <span
                    v-for="(_, i) in tour.imagenes"
                    :key="i"
                    class="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                    :class="i === currentIndex ? 'bg-brand-orange' : 'bg-brand-cream/30'"
                  ></span>
                </div>

                <!-- Image counter -->
                <span class="absolute top-3 left-3 bg-brand-dark/60 backdrop-blur-sm text-brand-cream text-xs px-2 py-1 rounded font-sans">
                  {{ currentIndex + 1 }} / {{ tour.imagenes.length }}
                </span>
              </div>

              <!-- Content -->
              <div class="p-6 md:p-8">
                <!-- Header -->
                <h2 class="font-heading text-3xl md:text-4xl text-brand-white mb-4">
                  {{ tour.nombre }}
                </h2>

                <div class="flex flex-wrap gap-3 mb-6">
                  <span v-if="tour.duracion !== 'Definir'" class="flex items-center gap-1.5 text-sm text-brand-cream/70 font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full">
                    <svg class="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {{ tour.duracion }}
                  </span>
                  <span v-if="tour.dificultad" class="flex items-center gap-1.5 text-sm font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full"
                        :class="dificultadClass">
                    {{ tour.dificultad }}
                  </span>
                  <span v-if="tour.terreno" class="flex items-center gap-1.5 text-sm text-brand-cream/70 font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full">
                    Terreno: {{ tour.terreno }}
                  </span>
                  <span v-if="tour.distancia" class="flex items-center gap-1.5 text-sm text-brand-cream/70 font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full">
                    Distancia: {{ tour.distancia }}
                  </span>
                  <span v-if="tour.horarios" class="flex items-center gap-1.5 text-sm text-brand-cream/70 font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full">
                    <svg class="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {{ tour.horarios }}
                  </span>
                </div>

                <div class="mb-8">
                  <div class="flex items-baseline gap-2">
                    <span class="text-brand-orange font-heading text-3xl">{{ formatPrecio(tour.precio) }}</span>
                    <span class="text-brand-cream/50 text-sm font-sans">por persona</span>
                  </div>
                  <p v-if="tour.precioDetalle" class="text-brand-cream/55 text-sm font-sans mt-1">
                    {{ tour.precioDetalle }}
                  </p>
                </div>

                <!-- Itinerary -->
                <div v-if="tour.itinerario && tour.itinerario.length > 0" class="mb-8">
                  <h3 class="font-heading text-xl text-brand-white mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 6.75V15m6-6v8.25m.503-10.406a2.25 2.25 0 1 1 3.042 0l1.026 2.06a.75.75 0 0 0 .713.364h2.16a.75.75 0 0 1 .75.75v2.16a.75.75 0 0 0 .364.713l2.06 1.026a2.25 2.25 0 1 1-1.542 3.59l-1.026-2.06a.75.75 0 0 0-.713-.364h-2.16a.75.75 0 0 1-.75-.75V12.75a.75.75 0 0 0-.364-.713L14.25 11a2.25 2.25 0 1 1 3.042 0" />
                    </svg>
                    Itinerario
                  </h3>
                  <div v-for="dia in tour.itinerario" :key="dia.dia" class="mb-5 last:mb-0">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="w-7 h-7 rounded-full bg-brand-orange text-brand-white text-xs font-bold flex items-center justify-center font-sans">
                        {{ dia.dia }}
                      </span>
                      <span class="font-sans font-semibold text-brand-white text-sm">{{ dia.titulo }}</span>
                    </div>
                    <div class="ml-9 space-y-1.5">
                      <div v-for="(h, i) in dia.horas" :key="i" class="flex gap-3 text-sm font-sans">
                        <span class="text-brand-orange font-medium min-w-[45px]">{{ h.hora }}</span>
                        <span class="text-brand-cream/70">{{ h.evento }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Incluye -->
                <div v-if="tour.incluye && tour.incluye.length > 0" class="mb-8">
                  <h3 class="font-heading text-xl text-brand-white mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Incluye
                  </h3>
                  <ul class="ml-9 space-y-2">
                    <li v-for="(item, i) in tour.incluye" :key="i" class="flex items-start gap-2 text-sm font-sans text-brand-cream/70">
                      <svg class="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <!-- Placeholder mientras se completa el contenido -->
                <div
                  v-if="!tour.itinerario?.length || !tour.incluye?.length"
                  class="mb-8 rounded-xl border border-brand-cream/15 bg-brand-dark/40 p-5"
                >
                  <h3 class="font-heading text-lg text-brand-white mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Detalles en preparación
                  </h3>
                  <p class="text-brand-cream/70 text-sm font-sans mb-4">
                    Estamos terminando de cargar el itinerario y lo que incluye esta experiencia.
                    Escribinos y te pasamos toda la info al instante.
                  </p>
                  <a
                    href="https://wa.me/5493546453047"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-sm font-sans font-semibold text-brand-gold hover:text-brand-orange transition-colors duration-300"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                </div>

                <!-- Info extra -->
                <div class="border-t border-brand-cream/10 pt-6 space-y-3">
                  <div v-if="tour.reunion" class="flex items-center gap-2 text-sm font-sans">
                    <svg class="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span class="text-brand-cream/70">Encuentro:</span>
                    <span class="text-brand-white font-medium">{{ tour.reunion }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
