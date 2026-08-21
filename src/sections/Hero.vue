<script setup>
const scrollToTours = () => {
  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative h-[75vh] md:h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/hero/hero.webp')"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark"></div>

    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 max-w-7xl mx-auto gap-12 md:gap-16">
      <div class="text-center md:text-left">
        <p class="font-sans text-base md:text-lg tracking-[0.35em] uppercase text-brand-cream/90 [text-shadow:0_2px_10px_rgba(255,255,255,0.3)] mb-2">
          Trekking
        </p>
        <h1 class="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-brand-white leading-none uppercase">
          Cumbrecita
        </h1>

        <div class="w-24 h-px bg-brand-cream/60 my-8 mx-auto md:mx-0"></div>

        <p class="text-base md:text-lg text-brand-cream/90 max-w-lg leading-relaxed mx-auto md:mx-0">
          Descubrí senderos, paisajes y aventuras en Cumbrecita, en el corazón del Valle de Calamuchita.
        </p>
      </div>

      <div class="flex flex-col gap-4 min-w-[220px]">
        <button
          @click="scrollToTours"
          class="px-12 py-7 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-brand-dark transition-colors duration-300 text-base flex items-center justify-center gap-2"
        >
          Ver Experiencias
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          @click="scrollToContact"
          class="px-12 py-7 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-brand-dark transition-colors duration-300 text-base"
        >
          Reservar
        </button>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-brand-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
