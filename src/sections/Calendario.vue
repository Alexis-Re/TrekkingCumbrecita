<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CalendarGrid from '../components/CalendarGrid.vue'
import { salidas, salidasDelMes, marksDelMes } from '../data/calendario.js'
import { feriadosDe } from '../data/feriados.js'
import { tours } from '../data/tours.js'

const pad = (numero) => String(numero).padStart(2, '0')

function parsear(valor) {
  const [anio, mes, dia] = valor.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

function claveDe(fecha) {
  return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}`
}

function capitalizar(texto) {
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : texto
}

const hoy = new Date()
const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

const mes = ref(`${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}`)
const fechaSeleccionada = ref(claveDe(hoy))

const tourPorSlug = new Map(tours.map((tour) => [tour.slug, tour]))

const marks = computed(() => marksDelMes(mes.value))

const salidasMes = computed(() =>
  salidasDelMes(mes.value).map((salida) => ({ ...salida, tour: tourPorSlug.get(salida.slug) })),
)

const feriadosMes = computed(() => {
  const anio = Number(mes.value.slice(0, 4))
  return feriadosDe(anio).filter((feriado) => feriado.fecha.startsWith(mes.value))
})

const salidasDelDia = computed(() =>
  salidas
    .filter((salida) => {
      // La salida cubre el día seleccionado si cae entre `fecha` y `fin` (inclusive).
      const fin = salida.fin ?? salida.fecha
      return salida.fecha <= fechaSeleccionada.value && fechaSeleccionada.value <= fin
    })
    .map((salida) => ({ ...salida, tour: tourPorSlug.get(salida.slug) })),
)

const feriadosDelDia = computed(() => {
  const anio = Number(fechaSeleccionada.value.slice(0, 4))
  return feriadosDe(anio).filter((feriado) => feriado.fecha === fechaSeleccionada.value)
})

const fechaLarga = computed(() =>
  capitalizar(
    new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(
      parsear(fechaSeleccionada.value),
    ),
  ),
)

function diaCorto(valor) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(parsear(valor)).replace('.', '')
}

function diaSemanaCorto(valor) {
  return capitalizar(
    new Intl.DateTimeFormat('es-AR', { weekday: 'short' }).format(parsear(valor)).replace('.', ''),
  )
}

function cambiarMes(delta) {
  const [anio, mesActual] = mes.value.split('-').map(Number)
  const nuevoMes = new Date(anio, mesActual - 1 + delta, 1)
  mes.value = `${nuevoMes.getFullYear()}-${pad(nuevoMes.getMonth() + 1)}`
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 },
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section id="calendario" ref="sectionRef" class="relative overflow-hidden bg-brand-dark py-12 md:py-16">
    <img
      src="/assets/tours/casita-cristal-cinco-saltos/paisake.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-brand-dark/85"></div>
    <div class="topo-pattern pointer-events-none absolute inset-0" aria-hidden="true"></div>

    <div class="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
      <div
        class="mx-auto mb-8 max-w-2xl text-center transition-all duration-700 md:mb-10"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <p class="mb-2 font-sans text-xs tracking-[0.25em] uppercase text-brand-orange md:text-sm">
          Planificá tu salida
        </p>
        <h2 class="mb-3 font-heading text-3xl uppercase text-brand-white md:text-5xl">Calendario de salidas</h2>
        <p class="text-sm leading-relaxed text-brand-cream/70 md:text-base">
          Fechas confirmadas y feriados nacionales: elegí un día en el calendario y sumate a la próxima aventura.
        </p>
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <div
          class="min-w-0 rounded-2xl border border-brand-cream/15 bg-brand-card/80 p-4 transition-all duration-700 md:p-6"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
          <CalendarGrid
            v-model="fechaSeleccionada"
            :month="mes"
            :min-date="claveDe(hoy)"
            :marks="marks"
            @change-month="cambiarMes"
          />

          <div
            class="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-brand-cream/10 pt-4 text-xs text-brand-cream/70"
          >
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-brand-gold" aria-hidden="true"></span>
              Salidas confirmadas
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-2.5 w-5 rounded-full bg-brand-orange/35" aria-hidden="true"></span>
              Salida de varios días
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-brand-cream/60" aria-hidden="true"></span>
              Feriados
            </span>
          </div>
        </div>

        <div class="flex min-w-0 flex-col gap-4">
          <article
            aria-live="polite"
            class="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-4 transition-all duration-700 md:p-5"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Día seleccionado
            </p>
            <p class="mb-3 font-heading text-xl uppercase tracking-wide text-brand-white md:text-2xl">
              {{ fechaLarga }}
            </p>

            <ul v-if="salidasDelDia.length" class="space-y-2">
              <li
                v-for="salida in salidasDelDia"
                :key="`${salida.fecha}-${salida.slug}`"
                class="flex items-start gap-2 text-sm text-brand-white"
              >
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" aria-hidden="true"></span>
                <span>
                  {{ salida.tour?.nombre ?? salida.slug }}
                  <a
                    href="#tours"
                    class="ml-1 font-semibold text-brand-orange underline decoration-brand-orange/40 underline-offset-2 transition-colors hover:text-brand-gold"
                  >
                    ver tour
                  </a>
                </span>
              </li>
              <li
                v-for="feriado in feriadosDelDia"
                :key="feriado.fecha + feriado.nombre"
                class="flex items-start gap-2 text-sm text-brand-cream"
              >
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cream/60" aria-hidden="true"></span>
                <span>Feriado: {{ feriado.nombre }}</span>
              </li>
            </ul>

            <ul v-else-if="feriadosDelDia.length" class="space-y-2">
              <li
                v-for="feriado in feriadosDelDia"
                :key="feriado.fecha + feriado.nombre"
                class="flex items-start gap-2 text-sm text-brand-cream"
              >
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cream/60" aria-hidden="true"></span>
                <span>Feriado: {{ feriado.nombre }}</span>
              </li>
            </ul>

            <p v-if="!salidasDelDia.length && !feriadosDelDia.length" class="text-sm leading-relaxed text-brand-cream/70">
              Sin salidas agendadas ni feriados este día. Revisá otros días del mes.
            </p>
          </article>

          <article
            class="rounded-2xl border border-brand-cream/15 bg-brand-card/80 p-4 transition-all duration-700 md:p-5"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Salidas del mes
            </p>

            <ul v-if="salidasMes.length" class="space-y-2">
              <li v-for="salida in salidasMes" :key="`${salida.fecha}-${salida.slug}`">
                <a
                  href="#tours"
                  class="group flex items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-dark/40 px-3 py-2.5 transition-all duration-300 hover:border-brand-orange/50 hover:bg-brand-orange/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange"
                    aria-hidden="true"
                  >
                    <span class="font-heading text-lg leading-none">{{ parsear(salida.fecha).getDate() }}</span>
                    <span class="text-[9px] uppercase leading-none">
                      {{ diaCorto(salida.fecha).split(' ')[1] }}
                    </span>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block truncate text-sm font-semibold text-brand-white" :title="salida.tour?.nombre">
                      {{ salida.tour?.nombre ?? salida.slug }}
                    </span>
                    <span v-if="salida.fin" class="block text-xs text-brand-cream/60">
                      {{ diaSemanaCorto(salida.fecha) }}, {{ diaCorto(salida.fecha) }} → {{ diaCorto(salida.fin) }}
                    </span>
                    <span v-else class="block text-xs text-brand-cream/60">{{ diaSemanaCorto(salida.fecha) }}, {{ diaCorto(salida.fecha) }}</span>
                  </span>
                  <svg
                    class="h-4 w-4 shrink-0 text-brand-orange transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m9 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
            </ul>

            <p v-else class="text-sm leading-relaxed text-brand-cream/70">
              Todavía no hay salidas cargadas para este mes.
              <a href="#tours" class="font-semibold text-brand-orange underline underline-offset-2 hover:text-brand-gold">
                Ver todos los tours
              </a>
            </p>
          </article>

          <article
            class="rounded-2xl border border-brand-cream/15 bg-brand-card/80 p-4 transition-all duration-700 md:p-5"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Feriados del mes
            </p>

            <ul v-if="feriadosMes.length" class="space-y-2">
              <li
                v-for="feriado in feriadosMes"
                :key="feriado.fecha + feriado.nombre"
                class="flex items-center justify-between gap-3 border-b border-brand-cream/10 pb-2 text-sm last:border-b-0 last:pb-0"
              >
                <span class="flex min-w-0 items-center gap-2 text-brand-cream">
                  <span class="h-2 w-2 shrink-0 rounded-full bg-brand-cream/60" aria-hidden="true"></span>
                  <span class="truncate">{{ feriado.nombre }}</span>
                </span>
                <span class="shrink-0 text-xs text-brand-cream/50">{{ diaCorto(feriado.fecha) }}</span>
              </li>
            </ul>

            <p v-else class="text-sm leading-relaxed text-brand-cream/70">
              Sin feriados nacionales este mes.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
