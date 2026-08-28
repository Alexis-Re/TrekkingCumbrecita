<script setup>
const stats = [
  { number: '15+', label: 'Años de experiencia' },
  { number: '200+', label: 'Tours guiados' },
  { number: '500+', label: 'Clientes satisfechos' },
  { number: '1500+', label: 'Km recorridos' }
]

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

const testimonios = [
  {
    texto: 'Una experiencia inolvidable. Roberto te hace sentir seguro en cada paso y conocés lugares que no encontrarías solo.',
    nombre: 'María L.',
    trekking: 'Cerro Champaqui'
  },
  {
    texto: 'El mejor guía de la zona. Conoce cada rincón de las sierras y te cuenta la historia de cada place.',
    nombre: 'Carlos R.',
    trekking: 'Pueblo Escondido'
  },
  {
    texto: 'Volví a hacer otro trekking gracias a la buena experiencia. Totalmente recomendable para todos los niveles.',
    nombre: 'Ana G.',
    trekking: 'Velo de la Novia'
  }
]
</script>

<template>
  <section id="identity" class="relative bg-brand-dark overflow-hidden">

    <!-- BLOQUE 1: Header -->
    <div class="relative py-20 md:py-28">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style="background-image: url('/assets/brand/pasiaje-grupo.webp')"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/60 to-brand-dark"></div>
      <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20 text-center">
        <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-4">
          Sobre nosotros
        </p>
        <h2 class="font-heading text-5xl md:text-6xl lg:text-7xl text-brand-white uppercase leading-none mb-6">
          Conocé al guía
        </h2>
        <div class="h-1 w-24 bg-gradient-to-r from-brand-orange to-brand-gold mx-auto mb-8"></div>
        <p class="text-brand-cream/75 font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Soy guía de trekking y apasionado conocedor de los paisajes de Córdoba. Desde Cumbrecita, acompaño a quienes buscan explorar la montaña, descubrir nuevos senderos y vivir experiencias auténticas en contacto con la naturaleza.
        </p>
      </div>
    </div>

    <!-- BLOQUE 2: Estadísticas -->
    <div class="border-y border-brand-cream/10 bg-brand-orange/5">
      <div class="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-cream/10">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="py-8 md:py-10 px-4 text-center"
          >
            <span class="block font-heading text-4xl md:text-5xl text-brand-orange mb-1">
              {{ stat.number }}
            </span>
            <span class="text-brand-cream/60 text-xs md:text-sm font-sans">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- BLOQUE 3: Sobre mí -->
    <div class="relative py-20 md:py-28">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45" style="background-image: url('/assets/brand/cascada.webp')"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/60 to-brand-dark"></div>
      <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <!-- Mosaico de fotos -->
          <div class="grid grid-cols-3 grid-rows-3 gap-3 h-[350px] md:h-[450px]">
            <div class="col-span-2 row-span-3 rounded-xl overflow-hidden">
              <img
                src="/assets/brand/robertomolina.jpg"
                alt="Roberto Molina - Guía de trekking"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                src="/assets/tours/pueblo-escondido/gente-cascada-bandera.webp"
                alt="Trekking en Champaqui"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                src="/assets/tours/champaqui/colegio-champa.webp"
                alt="Grupo de colegio en Champaqui"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                src="/assets/tours/champaqui/grupoespalkdas.webp"
                alt="Grupo de trekking"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <!-- Texto + Valores -->
          <div>
            <h3 class="font-heading text-3xl md:text-4xl text-brand-white uppercase mb-4">
              Mi historia
            </h3>
            <div class="h-1 w-16 bg-gradient-to-r from-brand-orange to-brand-gold mb-6"></div>

            <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-4">
              Desde chico me enamoré de las sierras cordobesas. Cada sendero, cada cumbre y cada atardecer me enseñaron que la montaña es el mejor lugar para encontrarse a uno mismo.
            </p>
            <p class="text-brand-cream/80 font-sans text-sm md:text-base leading-relaxed mb-10">
              Hoy, con más de 15 años de experiencia, mi objetivo es compartir esa pasión con otros. Cada trekking es una oportunidad para crear recuerdos inolvidables y conectar con la naturaleza de forma segura y respetuosa.
            </p>

            <!-- Valores -->
            <div class="space-y-6">
              <div
                v-for="valor in valores"
                :key="valor.nombre"
                class="flex items-start gap-4 group"
              >
                <div class="flex-shrink-0 w-11 h-11 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-orange/20 group-hover:border-brand-orange/40">
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
                  <h4 class="font-heading text-lg text-brand-white uppercase tracking-wide mb-0.5">
                    {{ valor.nombre }}
                  </h4>
                  <p class="text-brand-cream/65 text-sm leading-relaxed">
                    {{ valor.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BLOQUE 5: Testimonios -->
    <div class="py-16 md:py-20 border-t border-brand-cream/10">
      <div class="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div class="text-center mb-12">
          <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-2">
            Testimonios
          </p>
          <h3 class="font-heading text-3xl md:text-4xl text-brand-white uppercase">
            Lo que dicen
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="testimonio in testimonios"
            :key="testimonio.nombre"
            class="bg-brand-secondary/50 border border-brand-cream/10 rounded-xl p-6 relative"
          >
            <svg class="w-8 h-8 text-brand-orange/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>
            <p class="text-brand-cream/75 text-sm leading-relaxed mb-6 italic">
              "{{ testimonio.texto }}"
            </p>
            <div class="border-t border-brand-cream/10 pt-4">
              <span class="block font-sans font-semibold text-brand-white text-sm">
                {{ testimonio.nombre }}
              </span>
              <span class="block font-sans text-brand-orange text-xs mt-0.5">
                {{ testimonio.trekking }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
