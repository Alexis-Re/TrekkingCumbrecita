<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const scrollToTours = () => {
  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/hero/hero.webp')"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary"></div>

    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <h1
        :class="[
          'font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
      >
        Trekking Cumbrecita
      </h1>

      <p
        :class="[
          'text-lg md:text-xl text-cream mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
      >
        Explorá los senderos más hermosos del Valle de Calamuchita
      </p>

      <div
        :class="[
          'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
      >
        <button
          @click="scrollToTours"
          class="px-8 py-4 bg-yellow text-primary font-semibold rounded-lg hover:bg-gold transition-colors duration-300 text-lg"
        >
          Explorar Tours
        </button>
        <button
          @click="scrollToContact"
          class="px-8 py-4 border-2 border-cream text-cream font-semibold rounded-lg hover:bg-cream hover:text-primary transition-colors duration-300 text-lg"
        >
          Reservar Ahora
        </button>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
