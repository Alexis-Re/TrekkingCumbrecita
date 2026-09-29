<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const canalesVisibles = ref(false)
const pieVisible = ref(false)
let observador

function handleScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Se oculta mientras las tarjetas de contacto o la barra inferior del footer
  // están a la vista, para no tapar el botón de copiar email ni el copyright
  const zonas = [
    document.getElementById('contacto-canales'),
    document.getElementById('footer-bottom')
  ].filter(Boolean)

  if (zonas.length && 'IntersectionObserver' in window) {
    observador = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.id === 'contacto-canales') canalesVisibles.value = entry.isIntersecting
        if (entry.target.id === 'footer-bottom') pieVisible.value = entry.isIntersecting
      }
    })
    zonas.forEach((zona) => observador.observe(zona))
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observador?.disconnect()
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-75"
  >
    <button
      v-if="visible && !canalesVisibles && !pieVisible"
      type="button"
      aria-label="Volver arriba"
      @click="scrollToTop"
      class="fixed bottom-[calc(max(1.5rem,env(safe-area-inset-bottom))+3.75rem)] right-[max(1.5rem,env(safe-area-inset-right))] z-50 w-12 h-12 rounded-full bg-brand-orange text-brand-white flex items-center justify-center shadow-lg shadow-brand-orange/25 hover:bg-brand-gold hover:shadow-brand-orange/40 active:scale-95 transition-all duration-300"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
