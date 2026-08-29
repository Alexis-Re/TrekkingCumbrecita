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
        class="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5"
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
      class="fixed inset-0 top-16 z-40 bg-brand-dark/20 md:hidden"
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
        class="relative z-50 md:hidden bg-brand-dark/95 backdrop-blur-sm border-t border-brand-cream/10 px-6 pt-4 pb-6"
      >
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="block min-h-11 py-3.5 font-sans text-sm tracking-wide uppercase border-b border-brand-cream/10 transition-colors duration-300"
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
    </Transition>
  </nav>
</template>
