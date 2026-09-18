<script setup>
defineProps({
  testimonio: { type: Object, required: true },
  imagenFondo: { type: String, required: true }
})
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-2xl border border-brand-cream/10 shadow-lg shadow-brand-dark/30 break-inside-avoid mb-4 md:mb-5
           transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/10"
  >
    <!-- Foto del grupo como fondo -->
    <img
      :src="imagenFondo"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:brightness-110 transition-all duration-[1200ms] ease-out"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/75 to-brand-dark/45 pointer-events-none"></div>

    <!-- Comillas marca de agua -->
    <svg
      class="absolute top-4 right-4 w-12 h-12 text-brand-cream/10 pointer-events-none"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
    </svg>

    <div class="relative p-6 md:p-7">
      <!-- Chip 5.0 + estrellas -->
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-md border border-brand-cream/15 rounded-full pl-2.5 pr-3 py-1">
          <svg class="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.197-1.538-1.118l1.285-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .951-.69l1.285-3.958Z" />
          </svg>
          <span class="font-sans text-[11px] font-bold text-brand-white tracking-wide">5.0</span>
        </div>
        <div class="flex gap-0.5" role="img" aria-label="Calificación: 5 de 5 estrellas">
          <svg v-for="n in 5" :key="n" class="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.197-1.538-1.118l1.285-3.958a1 1 0 0 0-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .951-.69l1.285-3.958Z" />
          </svg>
        </div>
      </div>

      <!-- Cita -->
      <p class="text-brand-cream/90 text-sm md:text-[15px] leading-relaxed italic mb-6">
        "{{ testimonio.texto }}"
      </p>

      <!-- Firma con foto del grupo -->
      <div class="border-t border-brand-cream/10 pt-4 flex items-center gap-3">
        <img
          :src="testimonio.foto"
          :alt="testimonio.nombre"
          class="w-11 h-11 rounded-full object-cover ring-2 ring-brand-orange/40 ring-offset-2 ring-offset-brand-dark shrink-0"
        />
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
