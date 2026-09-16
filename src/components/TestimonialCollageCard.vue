<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonio: { type: Object, required: true },
  imagenFondo: { type: String, required: true },
  destacada: { type: Boolean, default: false }
})

const iniciales = computed(() =>
  props.testimonio.nombre
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)
</script>

<template>
  <!-- ═══ Variante DESTACADA: foto full-bleed, cita al pie ═══ -->
  <article
    v-if="destacada"
    class="group relative overflow-hidden rounded-3xl min-h-[320px] md:min-h-[420px] h-full flex flex-col justify-end
           border border-brand-cream/15 shadow-lg shadow-brand-dark/40
           transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10"
  >
    <img
      :src="imagenFondo"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/55 to-brand-dark/10 pointer-events-none"></div>

    <!-- Insignia 5.0 -->
    <div class="absolute top-4 left-4 flex items-center gap-2 bg-brand-dark/60 backdrop-blur-md border border-brand-cream/15 rounded-full pl-3 pr-4 py-1.5">
      <div class="flex gap-0.5" role="img" aria-label="Calificación: 5 de 5 estrellas">
        <svg v-for="n in 5" :key="n" class="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.197-1.538-1.118l1.285-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .951-.69l1.285-3.958Z" />
        </svg>
      </div>
      <span class="font-sans text-xs font-bold text-brand-white tracking-wide">5.0 · Recomendado</span>
    </div>

    <!-- Comillas marca de agua -->
    <svg
      class="absolute top-3 right-4 w-16 h-16 text-brand-cream/15 pointer-events-none"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
    </svg>

    <!-- Contenido al pie -->
    <div class="relative p-6 md:p-8">
      <p class="text-brand-cream text-base md:text-lg leading-relaxed italic mb-5 font-medium">
        "{{ testimonio.texto }}"
      </p>
      <div class="flex items-center gap-3">
        <img
          :src="testimonio.foto"
          :alt="testimonio.nombre"
          class="w-12 h-12 rounded-full object-cover ring-2 ring-brand-orange/50 ring-offset-2 ring-offset-brand-dark shrink-0"
        />
        <div>
          <span class="block font-sans font-semibold text-brand-white">
            {{ testimonio.nombre }}
          </span>
          <span class="block font-sans text-brand-gold text-xs mt-0.5">
            Hizo el {{ testimonio.trekking }}
          </span>
        </div>
      </div>
    </div>
  </article>

  <!-- ═══ Variante COMPACTA: fondo con blur, cita centrada ═══ -->
  <article
    v-else
    class="group relative overflow-hidden rounded-3xl h-full flex flex-col justify-between
           border border-brand-cream/10 shadow-lg shadow-brand-dark/30
           transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/10"
  >
    <img
      :src="imagenFondo"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover opacity-15 blur-[2px] scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/75 to-brand-dark/85 pointer-events-none"></div>

    <!-- Comillas -->
    <svg
      class="absolute top-5 right-5 w-10 h-10 text-brand-cream/10 pointer-events-none"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
    </svg>

    <div class="relative p-6 md:p-7 flex flex-col h-full">
      <!-- Chip 5.0 -->
      <div class="self-start flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-md border border-brand-cream/15 rounded-full pl-2.5 pr-3.5 py-1 mb-5">
        <svg class="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.197-1.538-1.118l1.285-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .951-.69l1.285-3.958Z" />
        </svg>
        <span class="font-sans text-[11px] font-bold text-brand-white tracking-wide">5.0</span>
      </div>

      <p class="text-brand-cream/85 text-sm md:text-[15px] leading-relaxed italic flex-1 mb-6">
        "{{ testimonio.texto }}"
      </p>

      <div class="border-t border-brand-cream/10 pt-4 flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-full bg-brand-dark/60 backdrop-blur-sm border border-brand-orange/40 flex items-center justify-center font-heading text-brand-gold text-sm shrink-0"
          aria-hidden="true"
        >
          {{ iniciales }}
        </span>
        <div class="min-w-0">
          <span class="block font-sans font-semibold text-brand-white text-sm truncate">
            {{ testimonio.nombre }}
          </span>
          <span class="block font-sans text-brand-gold text-xs mt-0.5 truncate">
            {{ testimonio.trekking }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
