<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const nextSection = ref(null)
let sections = []

function updateNextSection() {
  if (!sections.length || window.scrollY <= 100) {
    nextSection.value = null
    visible.value = false
    return
  }

  const marker = 120
  const currentIndex = sections.reduce((lastIndex, section, index) => {
    return section.getBoundingClientRect().top <= marker ? index : lastIndex
  }, 0)

  nextSection.value = sections[currentIndex + 1] || null
  visible.value = Boolean(nextSection.value)
}

function scrollToNextSection() {
  nextSection.value?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  sections = [...document.querySelectorAll('section')]
  requestAnimationFrame(updateNextSection)
  window.addEventListener('scroll', updateNextSection, { passive: true })
  window.addEventListener('resize', updateNextSection)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateNextSection)
  window.removeEventListener('resize', updateNextSection)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      aria-label="Ir a la siguiente sección"
      @click="scrollToNextSection"
      class="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-brand-white shadow-lg shadow-brand-orange/25 hover:bg-brand-gold hover:shadow-brand-orange/40 active:scale-95 transition-all duration-300"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 9l7 7 7-7" />
      </svg>
    </button>
  </Transition>
</template>
