<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('')

const links = [
  { label: 'Experiencias', href: '#tours' },
  { label: 'Sobre nosotros', href: '#identity' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Contacto', href: '#contacto' }
]

function handleScroll() {
  scrolled.value = window.scrollY > 50

  const sections = ['tours', 'identity', 'gallery', 'contacto']
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 150) {
      activeSection.value = id
      return
    }
  }
  activeSection.value = ''
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeMobile()
}

function scrollTo(href) {
  closeMobile()
  if (href.startsWith('#')) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
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
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-brand-dark/80 backdrop-blur-sm shadow-lg'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto pl-3 pr-3 lg:pl-12 lg:pr-10 flex items-center justify-between h-16 md:h-[80px]">

      <!-- Logo -->
      <a href="#" @click.prevent="scrollToTop" class="flex items-center gap-2 shrink-0">
        <img
          src="/assets/navbar/logoTC.webp"
          alt="Trekking Cumbrecita"
          class="h-12 md:h-16 w-auto transition-transform duration-300 hover:scale-110"
        />
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="font-sans text-sm tracking-wide uppercase transition-colors duration-300"
          :class="[
            !link.external && activeSection === link.href?.slice(1)
              ? 'text-brand-orange font-semibold'
              : 'text-brand-cream/90 hover:text-brand-orange'
          ]"
          @click.prevent="!link.external && scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="toggleMobile"
        class="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full border border-brand-cream/30 bg-brand-dark/40 backdrop-blur-sm active:scale-95 transition-transform duration-200"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
      >
        <span
          class="w-6 h-0.5 bg-brand-cream rounded transition-all duration-300 origin-center"
          :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="w-6 h-0.5 bg-brand-cream rounded transition-all duration-300"
          :class="mobileOpen ? 'opacity-0 scale-0' : ''"
        ></span>
        <span
          class="w-6 h-0.5 bg-brand-cream rounded transition-all duration-300 origin-center"
          :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"
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
        class="relative z-50 md:hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-cream/10 rounded-b-2xl shadow-2xl shadow-brand-dark/50 px-6 pt-2 pb-7"
      >
        <a
          v-for="(link, i) in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="block min-h-12 py-3.5 font-sans text-base tracking-wide uppercase rounded-lg transition-colors duration-300 active:bg-brand-cream/10"
          :class="[
            i > 0 ? 'border-t border-brand-cream/10' : '',
            !link.external && activeSection === link.href?.slice(1)
              ? 'text-brand-orange font-semibold border-l-2 border-brand-orange pl-3'
              : 'text-brand-cream/90 hover:text-brand-orange pl-3.5'
          ]"
          :style="{ animationDelay: `${i * 60}ms` }"
          @click.prevent="!link.external && scrollTo(link.href)"
        >
          {{ link.label }}
        </a>

        <button
          @click="scrollTo('#contacto')"
          :style="{ animationDelay: `${links.length * 60}ms` }"
          class="w-full mt-5 px-8 py-3.5 bg-brand-orange/90 text-brand-white font-semibold rounded-lg shadow-lg shadow-brand-orange/25 active:bg-brand-orange active:scale-[0.98] transition-all duration-300 text-base"
        >
          Consultar disponibilidad
        </button>

        <!-- Redes sociales -->
        <div class="flex justify-center gap-4 mt-5" :style="{ animationDelay: `${(links.length + 1) * 60}ms` }">
          <a
            href="https://www.instagram.com/trekking_cumbrecita/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="w-10 h-10 rounded-full border border-brand-cream/30 flex items-center justify-center active:bg-brand-orange/20 active:border-brand-orange/50 transition-all duration-300"
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
            class="w-10 h-10 rounded-full border border-brand-cream/30 flex items-center justify-center active:bg-brand-orange/20 active:border-brand-orange/50 transition-all duration-300"
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
</style>
