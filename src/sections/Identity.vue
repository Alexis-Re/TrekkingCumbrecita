<script setup>
const valores = [
  {
    nombre: 'Naturaleza',
    descripcion: 'Conectamos con el bosque, los ríos y las cumbres del Valle de Calamuchita.',
    icono: 'hoja'
  },
  {
    nombre: 'Aventura',
    descripcion: 'Cada sendero es una oportunidad para descubrir algo nuevo.',
    icono: 'montana'
  },
  {
    nombre: 'Seguridad',
    descripcion: 'Guías capacitados y equipamiento profesional en cada excursión.',
    icono: 'escudo'
  }
]
</script>

<template>
  <section id="identity" class="relative bg-brand-dark py-40 md:py-52 mt-12 md:mt-20 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-10 lg:px-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        <div class="order-2 lg:order-1 pl-8">
          <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-4">
            Identity
          </p>

          <h2 class="font-heading text-5xl md:text-6xl lg:text-7xl text-brand-white uppercase leading-none mb-2">
            Nuestra Esencia
          </h2>

          <div class="h-1 w-24 bg-gradient-to-r from-brand-orange to-brand-gold mb-8"></div>

          <p class="text-brand-cream/85 font-sans text-base md:text-lg leading-relaxed mb-12 max-w-lg pl-6 border-l-2 border-brand-orange/30">
            Yo soy guía de trekking y un apasionado conocedor de los paisajes de nuestra provincia. Desde Cumbrecita, acompaño a quienes buscan explorar la montaña, descubrir nuevos senderos y vivir experiencias auténticas en contacto con la naturaleza.
          </p>

          <div class="space-y-8">
            <div
              v-for="valor in valores"
              :key="valor.nombre"
              class="flex items-start gap-5 group"
            >
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-orange/20 group-hover:border-brand-orange/40">
                <svg v-if="valor.icono === 'hoja'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21V9" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12c1.5 0 3-1 3-3" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12c-1.5 0-3-1-3-3" />
                </svg>

                <svg v-else-if="valor.icono === 'montana'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 20l5.5-11L12 14l3.5-6L21 20H3z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 8l3 5" />
                </svg>

                <svg v-else-if="valor.icono === 'escudo'" class="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </div>

              <div>
                <h3 class="font-heading text-xl text-brand-white uppercase tracking-wide mb-1">
                  {{ valor.nombre }}
                </h3>
                <p class="text-brand-cream/70 text-sm leading-relaxed">
                  {{ valor.descripcion }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 rounded-2xl blur-xl"></div>
            <div class="relative rounded-xl shadow-2xl overflow-hidden w-full h-[400px] md:h-[500px]">
              <img
                src="/assets/brand/robertomolina.jpg"
                alt="Rober Molina - Trekking Cumbrecita"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-brand-orange/25 via-brand-gold/10 to-brand-dark/20 mix-blend-overlay"></div>
              <div class="absolute inset-0 bg-brand-orange/5 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
