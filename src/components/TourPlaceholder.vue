<script setup>
defineProps({
  tour: { type: Object, required: true }
})

const esMultiDia = (duracion) =>
  duracion?.includes('días') || duracion?.includes('noches')
</script>

<template>
  <div
    class="relative w-full h-full overflow-hidden"
    :class="esMultiDia(tour.duracion)
      ? 'bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-card'
      : 'bg-gradient-to-br from-brand-card via-brand-dark to-brand-secondary'"
  >
    <!-- Patrón de montañas decorativo -->
    <svg
      class="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path d="M0 225L80 120L140 160L200 80L260 140L320 90L400 225H0Z" fill="currentColor" class="text-brand-cream" />
      <path d="M0 225L60 150L120 180L180 110L240 160L300 120L360 170L400 225H0Z" fill="currentColor" class="text-brand-orange" />
    </svg>

    <!-- Líneas de contorno topográficas -->
    <svg
      class="absolute inset-0 w-full h-full opacity-[0.04]"
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
    >
      <path d="M0 180Q100 160 200 170T400 165" class="text-brand-cream" />
      <path d="M0 150Q100 130 200 140T400 135" class="text-brand-cream" />
      <path d="M0 120Q100 100 200 110T400 105" class="text-brand-cream" />
      <path d="M0 90Q100 70 200 80T400 75" class="text-brand-cream" />
    </svg>

    <!-- Contenido central -->
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6">
      <!-- Icono de montaña -->
      <div class="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-1">
        <svg class="w-6 h-6 text-brand-orange/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l5.5-11L12 14l3.5-6L21 20H3z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 8l3 5" />
        </svg>
      </div>

      <!-- Info del tour -->
      <div class="flex flex-wrap items-center justify-center gap-1.5">
        <span
          v-if="tour.duracion && tour.duracion !== 'Definir'"
          class="text-[11px] font-sans font-bold text-brand-cream/70 bg-brand-cream/10 px-2 py-0.5 rounded-full uppercase tracking-wider"
        >
          {{ tour.duracion }}
        </span>
        <span
          v-if="tour.dificultad"
          class="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
          :class="tour.dificultad === 'Alta'
            ? 'text-brand-orange bg-brand-orange/10'
            : tour.dificultad === 'Media'
              ? 'text-brand-gold bg-brand-gold/10'
              : 'text-brand-green bg-brand-green/10'"
        >
          {{ tour.dificultad }}
        </span>
      </div>

      <span class="font-heading text-base text-brand-cream/35 uppercase tracking-wider text-center leading-tight max-w-[85%]">
        {{ tour.nombre }}
      </span>

      <span v-if="tour.reunion" class="text-[10px] font-sans text-brand-cream/25 flex items-center gap-1 mt-0.5">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {{ tour.reunion }}
      </span>
    </div>

    <!-- Badge "Foto próximamente" -->
    <span class="absolute top-3 left-3 text-[10px] font-sans font-semibold text-brand-cream/40 bg-brand-dark/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
      Foto próximamente
    </span>

    <!-- Borde inferior decorativo -->
    <div class="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
  </div>
</template>
