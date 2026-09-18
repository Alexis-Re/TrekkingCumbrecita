<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { formatPrecio } from '../utils/format.js'
import { crearMensajeReserva } from '../utils/whatsapp.js'
import TourPlaceholder from './TourPlaceholder.vue'
import DatePicker from './DatePicker.vue'

const props = defineProps({
  tour: { type: Object, default: null },
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const dificultadClass = computed(() =>
  props.tour?.dificultad === 'Alta'
    ? 'text-brand-orange'
    : props.tour?.dificultad === 'Media'
      ? 'text-brand-gold'
      : 'text-brand-green'
)

const currentIndex = ref(0)
const modalRef = ref(null)
const fechaReserva = ref('')
const cantidadPersonas = ref(1)
const fechaLocal = new Date()
const fechaMinima = [fechaLocal.getFullYear(), String(fechaLocal.getMonth() + 1).padStart(2, '0'), String(fechaLocal.getDate()).padStart(2, '0')].join('-')
const cantidadMaxima = computed(() => props.tour?.cupoMax || 15)
const cantidadValida = computed(() => Number.isInteger(cantidadPersonas.value) && cantidadPersonas.value >= 1 && cantidadPersonas.value <= cantidadMaxima.value)
let touchStartX = 0
let previousActiveElement = null

function ajustarCantidad(cambio) {
  const cantidadActual = Number(cantidadPersonas.value) || 1
  cantidadPersonas.value = Math.min(cantidadMaxima.value, Math.max(1, cantidadActual + cambio))
}

function reservarPorWhatsApp() {
  if (!props.tour || !fechaReserva.value || !cantidadValida.value) return
  window.open(crearMensajeReserva(props.tour, fechaReserva.value, cantidadPersonas.value), '_blank', 'noopener,noreferrer')
}

watch(() => props.open, (val) => {
  if (val) {
    currentIndex.value = 0
    fechaReserva.value = ''
    cantidadPersonas.value = 1
    document.body.style.overflow = 'hidden'
    previousActiveElement = document.activeElement
    nextTick(() => modalRef.value?.querySelector('button')?.focus())
  } else {
    document.body.style.overflow = ''
    previousActiveElement?.focus()
    previousActiveElement = null
  }
})

watch(cantidadPersonas, (value) => {
  const cantidad = Number(value)
  if (!Number.isFinite(cantidad)) cantidadPersonas.value = 1
  else cantidadPersonas.value = Math.min(cantidadMaxima.value, Math.max(1, Math.trunc(cantidad)))
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
            class="relative bg-brand-card rounded-2xl w-full max-w-2xl max-h-[85dvh] overflow-hidden border border-brand-cream/10 shadow-2xl"
            @click.stop
          >
            <!-- Close button -->
            <button
              @click="emit('close')"
              class="absolute top-4 right-[max(1rem,env(safe-area-inset-right))] z-10 w-11 h-11 rounded-full bg-brand-dark/60 backdrop-blur-sm text-brand-cream flex items-center justify-center hover:bg-brand-orange active:scale-95 transition-all duration-200"
              aria-label="Cerrar detalles"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Scrollable content -->
            <div class="overflow-y-auto max-h-[85dvh]">
              <!-- Gallery carousel -->
              <div
                v-if="tour.imagenes && tour.imagenes.length > 0"
                class="relative bg-brand-dark overflow-hidden [touch-action:pan-y] flex items-center justify-center min-h-[300px] md:min-h-[400px] max-h-[55dvh] md:max-h-[60dvh]"
                @touchstart="onTouchStart"
                @touchend="onTouchEnd"
              >
                <img
                  :src="tour.imagenes[currentIndex]"
                  :alt="`${tour.nombre} - imagen ${currentIndex + 1} de ${tour.imagenes.length}`"
                  class="max-w-full max-h-[55dvh] md:max-h-[60dvh] object-contain"
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

              <!-- Placeholder when no images -->
              <div
                v-else
                class="min-h-[200px] md:min-h-[260px]"
              >
                <TourPlaceholder
                  :tour="tour"
                  class="w-full h-full"
                />
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
                  <span v-if="tour.cupoMax" class="flex items-center gap-1.5 text-sm text-brand-cream/70 font-sans bg-brand-dark/40 px-3 py-1.5 rounded-full">
                    <svg class="w-4 h-4 text-brand-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    Cupo máx. {{ tour.cupoMax }} personas
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

                <!-- Reserva rápida -->
                <div class="hidden mb-8 rounded-xl border border-[#25D366]/25 bg-[#25D366]/5 p-4 md:p-5">
                  <h3 class="font-heading text-xl text-brand-white mb-1">Reservá tu lugar</h3>
                  <p class="text-brand-cream/65 text-sm font-sans mb-4">
                    Elegí una fecha y te escribimos por WhatsApp para confirmar disponibilidad.
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label for="fecha-reserva" class="block text-brand-cream/80 text-xs font-semibold font-sans mb-1.5">
                        Fecha preferida
                      </label>
                    </div>
                    <div>
                      <label for="cantidad-personas" class="block text-brand-cream/80 text-xs font-semibold font-sans mb-1.5">
                        Cantidad de personas
                      </label>
                      <span v-if="tour.cupoMax" class="block text-brand-cream/45 text-[11px] font-sans mt-1">
                        Cupo máximo: {{ tour.cupoMax }} personas
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    :disabled="!fechaReserva || !cantidadValida"
                    @click="reservarPorWhatsApp"
                    class="w-full min-h-12 rounded-lg bg-[#25D366] px-4 py-3 font-sans font-bold text-white shadow-lg shadow-[#25D366]/15 transition-all duration-300 hover:bg-[#1ebe5d] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <span class="inline-flex items-center justify-center gap-2">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                      </svg>
                      Reservar por WhatsApp
                    </span>
                  </button>
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
                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                      <span class="w-7 h-7 rounded-full bg-brand-orange text-brand-white text-xs font-bold flex items-center justify-center font-sans shrink-0">
                        {{ dia.dia }}
                      </span>
                      <span class="font-sans font-semibold text-brand-white text-sm">{{ dia.titulo }}</span>
                      <span v-if="dia.distancia" class="text-brand-cream/50 text-xs font-sans">· {{ dia.distancia }}</span>
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
                    <svg class="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Incluye
                  </h3>
                  <ul class="ml-9 space-y-2">
                    <li v-for="(item, i) in tour.incluye" :key="i" class="flex items-start gap-2 text-sm font-sans text-brand-cream/70">
                      <svg class="w-4 h-4 text-brand-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                <!-- Requisitos -->
                <div v-if="tour.requisitos && tour.requisitos.length > 0" class="mb-8">
                  <h3 class="font-heading text-xl text-brand-white mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    Requisitos para participar
                  </h3>
                  <ul class="ml-9 space-y-2">
                    <li v-for="(item, i) in tour.requisitos" :key="i" class="flex items-start gap-2 text-sm font-sans text-brand-cream/70">
                      <svg class="w-4 h-4 text-brand-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0l7.354 12.748ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <!-- Equipamiento -->
                <div v-if="tour.equipamiento && tour.equipamiento.length > 0" class="mb-8">
                  <h3 class="font-heading text-xl text-brand-white mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    Equipamiento a llevar
                  </h3>
                  <ul class="ml-9 space-y-2">
                    <li v-for="(item, i) in tour.equipamiento" :key="i" class="flex items-start gap-2 text-sm font-sans text-brand-cream/70">
                      <svg class="w-4 h-4 text-brand-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {{ item }}
                    </li>
                  </ul>
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

                <div class="mt-6 rounded-xl border border-[#25D366]/25 bg-[#25D366]/5 p-4 md:p-5">
                  <h3 class="font-heading text-xl text-brand-white mb-1">Reservá tu lugar</h3>
                  <p class="text-brand-cream/65 text-sm font-sans mb-4">
                    Elegí una fecha y cantidad para consultar disponibilidad por WhatsApp.
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label for="fecha-reserva-final" class="block text-brand-cream/80 text-xs font-semibold font-sans mb-1.5">Fecha preferida</label>
                      <DatePicker id="fecha-reserva-final" v-model="fechaReserva" :min-date="fechaMinima" />
                    </div>
                    <div>
                      <label for="cantidad-personas-final" class="block text-brand-cream/80 text-xs font-semibold font-sans mb-1.5">Cantidad de personas</label>
                      <div id="cantidad-personas-final" class="flex min-h-12 items-center overflow-hidden rounded-lg border border-brand-cream/15 bg-brand-dark/60 transition-colors focus-within:border-[#25D366]/70 focus-within:ring-1 focus-within:ring-[#25D366]/30" role="group" aria-label="Cantidad de personas">
                        <button type="button" class="flex h-12 w-12 shrink-0 items-center justify-center border-r border-brand-cream/10 text-xl text-brand-cream/80 transition-colors hover:bg-brand-cream/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30" :disabled="cantidadPersonas <= 1" aria-label="Disminuir cantidad de personas" @click="ajustarCantidad(-1)">−</button>
                        <output class="flex-1 text-center text-base font-semibold text-brand-cream" aria-live="polite" :aria-label="`${cantidadPersonas} ${cantidadPersonas === 1 ? 'persona' : 'personas'}`">{{ cantidadPersonas }}</output>
                        <button type="button" class="flex h-12 w-12 shrink-0 items-center justify-center border-l border-brand-cream/10 text-xl text-brand-cream/80 transition-colors hover:bg-brand-cream/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30" :disabled="cantidadPersonas >= cantidadMaxima" aria-label="Aumentar cantidad de personas" @click="ajustarCantidad(1)">+</button>
                      </div>
                      <span class="block text-brand-cream/45 text-[11px] font-sans mt-1">Hasta {{ cantidadMaxima }} personas</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  :disabled="!fechaReserva || !cantidadValida"
                  @click="reservarPorWhatsApp"
                  class="mt-6 w-full min-h-12 rounded-lg bg-[#25D366] px-4 py-3 font-sans font-bold text-white transition-all duration-300 hover:bg-[#1ebe5d] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Reservar esta experiencia por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
