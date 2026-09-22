<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { stats, badges, avatars } from '../data/socialProof.js'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'

const scrollToTours = () => {
  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToBadgeTarget = (target) => {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

const parallaxY = ref(0)
const loaded = ref(false)

function handleScroll() {
  const maxShift = window.innerHeight * 0.2
  parallaxY.value = Math.min(window.scrollY * 0.35, maxShift)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  requestAnimationFrame(() => {
    loaded.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section class="relative min-h-svh flex items-center justify-center overflow-hidden">
    <img
      src="/assets/hero/hero.webp"
      alt=""
      fetchpriority="high"
      decoding="async"
      class="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
      :style="{ transform: `translateY(${parallaxY}px)` }"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark"></div>

    <div class="relative z-10 flex flex-col items-center text-center px-6 lg:px-16 max-w-3xl mx-auto pt-20 md:pt-16 pb-10 md:pb-6">
      <p
        class="font-sans text-xs sm:text-sm md:text-lg tracking-[0.2em] sm:tracking-[0.35em] uppercase text-brand-cream/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] mb-2 transition-all duration-700 ease-out"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        Trekking Cumbrecita
      </p>
      <h1
        class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-white leading-none uppercase tracking-wide transition-all duration-700 ease-out delay-150"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
         Córdoba más allá del circuito turístico
      </h1>

      <div
        class="w-16 h-px bg-brand-cream/40 my-3 md:my-5 transition-all duration-700 ease-out delay-300"
        :class="loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
      ></div>

      <p
        class="text-sm md:text-base lg:text-lg text-brand-cream/90 max-w-lg leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out delay-300"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
         Explorá ríos subterráneos, cascadas escondidas y grandes cumbres con el guía Rober Molina. Solo enfócate en DISFRUTAR.
      </p>

      <div
        class="flex flex-col gap-3 mt-6 md:mt-10 min-w-[200px] transition-all duration-700 ease-out delay-500"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <button
          @click="scrollToTours"
          class="group min-h-12 px-8 py-3.5 md:px-10 md:py-5 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-brand-dark transition-colors duration-300 text-base md:text-lg flex items-center justify-center gap-2"
        >
           Elegí tu aventura
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <!-- Social proof -->
      <div
        class="flex flex-col items-center gap-3 md:gap-4 mt-5 md:mt-7 transition-all duration-700 ease-out delay-700"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <!-- Avatars + texto -->
        <div class="flex items-center gap-3">
          <div class="flex -space-x-2.5">
            <img
              v-for="(avatar, i) in avatars"
              :key="avatar.src"
              :src="avatar.src"
              :alt="avatar.alt"
              loading="lazy"
              decoding="async"
              class="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-brand-dark/80"
              :style="{ zIndex: avatars.length - i }"
            />
          </div>
          <p class="text-xs md:text-sm text-brand-cream/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] text-left leading-snug">
            <span class="font-semibold text-brand-white">Miles de historias</span> compartidas en la montaña
          </p>
        </div>

        <!-- Stats -->
        <div class="flex items-center justify-center gap-4 md:gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="font-heading text-lg md:text-2xl text-brand-white leading-none">
              {{ stat.valor }} <span class="text-brand-orange">{{ stat.sufijo }}</span>
            </p>
            <p class="text-[10px] md:text-xs text-brand-cream/70 mt-0.5 md:mt-1">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Badges -->
        <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <component
            :is="badge.target ? 'button' : 'span'"
            v-for="badge in badges"
            :key="badge.label"
            :type="badge.target ? 'button' : undefined"
            :aria-label="badge.target ? `Ver ${badge.label.toLowerCase()}` : undefined"
            class="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-brand-cream/20 bg-brand-dark/40 backdrop-blur-sm text-[10px] md:text-xs text-brand-cream/90 transition-colors duration-300"
            :class="badge.target ? 'cursor-pointer hover:bg-brand-orange/20 hover:border-brand-orange/50 hover:text-brand-white' : ''"
            @click="badge.target && scrollToBadgeTarget(badge.target)"
          >
            <svg v-if="badge.icono === 'guia'" class="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <svg v-else-if="badge.icono === 'seguro'" class="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg v-else class="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            {{ badge.label }}
          </component>
        </div>

      </div>

      <!-- Redes sociales -->
      <div
        class="flex justify-center gap-4 mt-4 md:mt-6 transition-all duration-700 ease-out delay-[750ms]"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <a
          href="https://www.instagram.com/trekking_cumbrecita/"
          target="_blank"
          rel="noopener noreferrer"
          class="group w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:border-[#d62976] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d62976] active:scale-95 transition-all duration-300"
        >
           <svg class="w-5 h-5 text-brand-cream transition-colors duration-300 group-hover:text-white group-focus-visible:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="https://www.facebook.com/rober.molina.16"
          target="_blank"
          rel="noopener noreferrer"
          class="group w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] active:scale-95 transition-all duration-300"
        >
           <svg class="w-5 h-5 text-brand-cream transition-colors duration-300 group-hover:text-white group-focus-visible:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href="https://wa.me/5493546453047"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          class="group w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center text-brand-cream hover:bg-[#25D366] hover:border-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] active:scale-95 transition-all duration-300"
        >
           <span class="transition-colors duration-300 group-hover:text-white group-focus-visible:text-white"><WhatsAppIcon /></span>
        </a>
      </div>
      <!-- Scroll indicator -->
      <div
        class="hidden md:flex flex-col items-center gap-0.5 mt-4 md:mt-6 transition-all duration-700 ease-out delay-[850ms]"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <span class="text-[10px] md:text-xs tracking-[0.2em] uppercase text-brand-cream/60">Deslizá para descubrir</span>
        <div class="animate-bounce">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-cream/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
