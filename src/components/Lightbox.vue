<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  index: { type: Number, default: 0 },
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'update:index'])

const dialogRef = ref(null)
let touchStartX = 0
let previousActiveElement = null

const current = computed(() => {
  const img = props.images[props.index]
  if (!img) return null
  return typeof img === 'string'
    ? { src: img, titulo: '', lugar: '' }
    : img
})

function prev() {
  if (!props.images.length) return
  emit('update:index', props.index === 0 ? props.images.length - 1 : props.index - 1)
}

function next() {
  if (!props.images.length) return
  emit('update:index', props.index === props.images.length - 1 ? 0 : props.index + 1)
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
    const focusable = [...dialogRef.value?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []]
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

watch(() => props.open, (val) => {
  if (val) {
    previousActiveElement = document.activeElement
    document.body.style.overflow = 'hidden'
    nextTick(() => dialogRef.value?.querySelector('button')?.focus())
  } else {
    document.body.style.overflow = ''
    previousActiveElement?.focus()
    previousActiveElement = null
  }
})

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
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
        v-if="open && current"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
         :aria-label="current.titulo || current.lugar || 'Galería de imágenes'"
        @click.self="emit('close')"
      >
         <div class="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm" @click="emit('close')"></div>

        <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-brand-dark/60 backdrop-blur-sm border border-brand-cream/15 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-colors duration-200"
          aria-label="Cerrar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span
          v-if="images.length > 1"
          class="absolute top-5 left-5 z-20 bg-brand-dark/60 backdrop-blur-sm text-brand-cream/90 text-xs font-sans px-3 py-1.5 rounded-full"
        >
          {{ index + 1 }} / {{ images.length }}
        </span>

        <button
          v-if="images.length > 1"
          @click.stop="prev"
          class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-brand-dark/50 backdrop-blur-sm border border-brand-cream/15 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-colors duration-200"
          aria-label="Anterior"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="images.length > 1"
          @click.stop="next"
          class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-brand-dark/50 backdrop-blur-sm border border-brand-cream/15 text-brand-cream flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-brand-white transition-colors duration-200"
          aria-label="Siguiente"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="relative z-10 flex flex-col items-center gap-4 max-w-[90vw] [touch-action:pan-y]" @click.stop @touchstart="onTouchStart" @touchend="onTouchEnd">
          <img
            :src="current.src"
            :alt="current.titulo || current.lugar || 'Imagen de la galería'"
            decoding="async"
            class="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
          />
          <div v-if="current.titulo || current.lugar" class="text-center px-4">
            <span v-if="current.titulo" class="block font-heading text-xl md:text-2xl text-brand-white uppercase leading-tight">
              {{ current.titulo }}
            </span>
            <span v-if="current.lugar" class="block text-brand-cream/70 text-xs font-sans mt-1">
              {{ current.lugar }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
