<script setup>
const scrollToTours = () => {
  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative min-h-[420px] h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/hero/hero.webp')"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark"></div>

    <div class="relative z-10 flex flex-col items-center text-center px-6 lg:px-16 max-w-3xl mx-auto pt-12 md:pt-0">
      <p class="font-sans text-sm md:text-lg tracking-[0.35em] uppercase text-brand-cream/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] mb-2">
        Trekking en Córdoba
      </p>
      <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight uppercase tracking-wide">
          Desconectá de la rutina para vivir algo diferente
      </h1>

      <div class="w-16 h-px bg-brand-cream/40 my-4 md:my-5"></div>

      <p class="text-sm md:text-base lg:text-lg text-brand-cream/90 max-w-lg leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
        Tu aventura comienza aquí. Con nosotros. Descubrí paisajes y recorridos naturales en nuestra provincia.
      </p>

      <div class="flex flex-col gap-3 mt-8 md:mt-10 min-w-[200px]">
        <button
          @click="scrollToTours"
          class="px-8 py-4 md:px-10 md:py-5 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-brand-dark transition-colors duration-300 text-sm md:text-base flex items-center justify-center gap-2"
        >
          Ver Experiencias
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          @click="scrollToContact"
          class="px-8 py-4 md:px-10 md:py-5 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-brand-dark transition-colors duration-300 text-sm md:text-base"
        >
          Reservar
        </button>
      </div>
    </div>

    <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-cream/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
