<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('')
const menuButton = ref(null)
const firstMenuLink = ref(null)
let observedSections = []

const links = [
  { label: 'Experiencias', href: '#tours' },
  { label: 'Sobre nosotros', href: '#identity' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Contacto', href: '#contacto' }
]

function handleScroll() {
  scrolled.value = window.scrollY > 50

  const marker = Math.min(window.innerHeight * 0.35, 240)
  let currentSection = ''

  for (const section of observedSections) {
    if (section.getBoundingClientRect().top <= marker) currentSection = section.id
  }

  activeSection.value = currentSection
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeMobile()
}

function scrollTo(href) {
  activeSection.value = href.startsWith('#') ? href.slice(1) : ''
  closeMobile()
  if (href.startsWith('#')) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''

  if (mobileOpen.value) {
    nextTick(() => firstMenuLink.value?.focus())
  } else {
    menuButton.value?.focus()
  }
}

function closeMobile() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(e) {
  if (e.key === 'Escape') closeMobile()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  for (const id of ['tours', 'identity', 'gallery', 'contacto']) {
    const section = document.getElementById(id)
    if (section) observedSections.push(section)
  }

  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', onKeydown)
  observedSections = []
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    aria-label="Navegación principal"
    class="fixed inset-x-0 top-0 z-50 border-b border-transparent pt-[env(safe-area-inset-top)] transition-all duration-300"
    :class="scrolled
      ? 'border-brand-cream/10 bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-brand-dark/50'
      : 'bg-gradient-to-b from-brand-dark/60 to-transparent'"
  >
    <div class="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 transition-[min-height] duration-300 md:min-h-[80px] lg:px-12" :class="scrolled ? 'md:min-h-[68px]' : ''">

      <!-- Logo -->
      <a href="#" @click.prevent="scrollToTop" class="flex items-center gap-2 shrink-0" aria-label="Ir al inicio">
        <img
          src="/assets/navbar/logoTC.webp"
          alt="Trekking Cumbrecita"
          class="h-11 w-auto transition-all duration-300 hover:scale-105 md:h-14"
        />
      </a>

      <!-- Desktop links -->
      <div
        class="hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-sm transition-all duration-300 md:flex"
        :class="scrolled ? 'border-brand-cream/10 bg-brand-card/45' : 'border-brand-cream/15 bg-brand-dark/20'"
      >
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :aria-current="activeSection === link.href?.slice(1) ? 'location' : undefined"
          class="relative rounded-full px-3 py-2 font-sans text-xs tracking-[0.12em] uppercase transition-all duration-300 lg:px-4"
          :class="[
            !link.external && activeSection === link.href?.slice(1)
              ? 'bg-brand-orange/15 font-semibold text-brand-orange'
              : link.href === '#contacto'
                ? 'bg-brand-orange text-brand-white shadow-sm shadow-brand-orange/20 hover:bg-brand-gold'
                : 'text-brand-cream/90 hover:bg-brand-cream/10 hover:text-brand-white'
          ]"
          @click.prevent="!link.external && scrollTo(link.href)"
        >
          {{ link.label }}
          <span
            v-if="!link.external && activeSection === link.href?.slice(1)"
            class="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-gold lg:left-4 lg:right-4"
          ></span>
        </a>

      </div>

      <!-- Mobile hamburger -->
      <button
        ref="menuButton"
        @click="toggleMobile"
        class="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 active:scale-95 md:hidden"
        :class="mobileOpen
          ? 'border-brand-orange/60 bg-brand-orange/15 shadow-lg shadow-brand-orange/10'
          : 'border-brand-cream/30 bg-brand-dark/45 hover:border-brand-orange/50 hover:bg-brand-dark/70'"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
      >
        <span
          class="h-0.5 w-5 rounded-full bg-brand-cream transition-all duration-300 origin-center"
          :class="mobileOpen ? 'translate-y-2 rotate-45 bg-brand-orange' : ''"
        ></span>
        <span
          class="h-0.5 w-5 rounded-full bg-brand-cream transition-all duration-300"
          :class="mobileOpen ? 'opacity-0 scale-0' : ''"
        ></span>
        <span
          class="h-0.5 w-5 rounded-full bg-brand-cream transition-all duration-300 origin-center"
          :class="mobileOpen ? '-translate-y-2 -rotate-45 bg-brand-orange' : ''"
        ></span>
      </button>
    </div>

    <!-- Mobile menu -->
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-sm md:hidden"
        aria-hidden="true"
        @click="closeMobile"
      ></div>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
         class="relative z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-2xl border-t border-brand-cream/10 bg-brand-dark/98 px-5 pb-7 pt-3 shadow-2xl shadow-brand-dark/60 backdrop-blur-md md:hidden"
      >
        <div class="mb-2 flex items-center justify-between border-b border-brand-cream/10 px-3 pb-3">
          <span class="font-heading text-lg tracking-wide text-brand-white">Explorá Trekking Cumbrecita</span>
          <span class="h-1.5 w-1.5 rounded-full bg-brand-orange shadow-sm shadow-brand-orange/60" aria-hidden="true"></span>
        </div>
        <a
          v-for="(link, i) in links"
          :key="link.label"
          :ref="i === 0 ? firstMenuLink : undefined"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :aria-current="activeSection === link.href?.slice(1) ? 'location' : undefined"
          class="block min-h-12 rounded-xl py-3.5 font-sans text-sm tracking-[0.12em] uppercase transition-all duration-300 active:bg-brand-cream/10"
          :class="[
            !link.external && activeSection === link.href?.slice(1)
              ? 'bg-brand-orange/10 font-semibold text-brand-orange ring-1 ring-inset ring-brand-orange/20 pl-4'
              : 'pl-4 text-brand-cream/90 hover:bg-brand-cream/5 hover:text-brand-white'
          ]"
          :style="{ animationDelay: `${i * 60}ms` }"
          @click.prevent="!link.external && scrollTo(link.href)"
        >
          {{ link.label }}
        </a>

        <!-- Redes sociales -->
        <div class="mt-5 flex justify-center gap-3 border-t border-brand-cream/10 pt-5" :style="{ animationDelay: `${(links.length + 1) * 60}ms` }">
          <a
            href="https://www.instagram.com/trekking_cumbrecita/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center active:bg-brand-orange/20 active:border-brand-orange/50 active:scale-95 transition-all duration-300"
          >
            <svg class="w-5 h-5 text-brand-cream" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.439-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/rober.molina.16"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            class="w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center active:bg-brand-orange/20 active:border-brand-orange/50 active:scale-95 transition-all duration-300"
          >
            <svg class="w-5 h-5 text-brand-cream" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
#mobile-menu a,
#mobile-menu button,
#mobile-menu > div {
  animation: menu-item-in 0.35s ease-out both;
}

@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  #mobile-menu a,
  #mobile-menu button,
  #mobile-menu > div {
    animation: none;
  }
}
</style>
