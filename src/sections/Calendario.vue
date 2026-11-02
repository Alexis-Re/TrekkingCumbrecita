<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CalendarGrid from '../components/CalendarGrid.vue'
import { salidas, salidasDelMes, marksDelMes, TIPO_SALIDA_DIA } from '../data/calendario.js'
import { feriadosDe } from '../data/feriados.js'
import { tours } from '../data/tours.js'
import { formatPrecio, ETIQUETA_TARIFA_DIFERENCIAL } from '../utils/format.js'
import { evaluarRecargo, precioConRecargo } from '../utils/recargo.js'
import { crearConsultaSalidaDia } from '../utils/whatsapp.js'
import { useTourModal } from '../composables/useTourModal.js'

const { abrirTour } = useTourModal()

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

const hoyClave = claveDe(hoy)
// Abre en la primera salida que aún no pasó (o en hoy si está en curso),
// así el calendario nunca arranca en un mes vacío.
const proximaSalida = salidas.find((salida) => (salida.fin ?? salida.fecha) >= hoyClave)
const fechaInicial = proximaSalida ? (proximaSalida.fecha > hoyClave ? proximaSalida.fecha : hoyClave) : hoyClave

const mes = ref(fechaInicial.slice(0, 7))
const fechaSeleccionada = ref(fechaInicial)

const tourPorSlug = new Map(tours.map((tour) => [tour.slug, tour]))
const FILTRO_SALIDA_DIA = Object.freeze({ tipo: TIPO_SALIDA_DIA })
const haySalidasDeUnDia = salidas.some((salida) => salida.tipo === TIPO_SALIDA_DIA)

// Chips de filtro por tour: derivados de los slugs que tienen salidas cargadas
// (sin duplicar datos). También se ofrece el filtro de salidas genéricas de un día.
// null = "Todas".
const filtro = ref(null)
const toursConSalidas = [...new Set(salidas.filter((salida) => salida.slug).map((salida) => salida.slug))].map((slug) => ({
  slug,
  nombre: tourPorSlug.get(slug)?.nombre ?? slug,
}))

// ¿La salida pasa por el filtro activo?
const pasaFiltro = (salida) => {
  if (!filtro.value) return true
  if (filtro.value === FILTRO_SALIDA_DIA) return salida.tipo === TIPO_SALIDA_DIA
  return salida.slug === filtro.value
}

// Tour activo en el filtro (null = Todas), para textos de estado vacío.
const tourFiltrado = computed(() =>
  typeof filtro.value === 'string' ? tourPorSlug.get(filtro.value) ?? null : null,
)
const filtroSalidaDiaActivo = computed(() => filtro.value === FILTRO_SALIDA_DIA)

// Marcas del mes, acotadas al tour filtrado (los feriados no se filtran).
const marks = computed(() => marksDelMes(mes.value, filtro.value))

// Agrega tour + evaluación del recargo (+18,4% en feriados / findes largos)
// calculado sobre el rango completo de la salida (fecha → fin).
const enriquecer = (salida) => {
  const tour = tourPorSlug.get(salida.slug)
  const esSalidaDia = salida.tipo === TIPO_SALIDA_DIA
  return {
    ...salida,
    tour,
    esSalidaDia,
    recargo: esSalidaDia ? { aplica: false, motivos: [] } : evaluarRecargo(salida.fecha, salida.fin),
  }
}

// Precio a mostrar: final con recargo cuando aplica, si no el base.
function precioDe(salida) {
  const base = salida.tour?.precio
  if (base == null) return null
  return salida.recargo.aplica ? precioConRecargo(base) : base
}

const salidasMes = computed(() => salidasDelMes(mes.value, filtro.value).map(enriquecer))
const salidasConfirmadasMes = computed(() => salidasMes.value.filter((salida) => !salida.esSalidaDia))
const salidasDiaMes = computed(() => salidasMes.value.filter((salida) => salida.esSalidaDia))
const salidasDiaAgrupadas = computed(() => {
  const grupos = new Map()

  for (const salida of salidasDiaMes.value) {
    const dia = diaSemanaCorto(salida.fecha)
    if (!grupos.has(dia)) grupos.set(dia, [])
    grupos.get(dia).push(salida)
  }

  return [...grupos].map(([dia, fechas]) => ({ dia, fechas }))
})

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
    .filter(pasaFiltro)
    .map(enriquecer),
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
  <section id="calendario" ref="sectionRef" class="relative overflow-hidden bg-brand-dark py-16 md:py-20">
    <img
      src="/assets/tours/casita-cristal-cinco-saltos/paisake.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/75 to-brand-dark"></div>
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
          Las salidas en feriados o findes largos aplican tarifa diferencial.
        </p>
      </div>

      <!-- Filtro por tour o tipo de salida -->
      <div
        class="mb-5 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filtrar salidas"
      >
        <button
          type="button"
          class="rounded-full border px-3.5 py-1.5 text-xs font-sans font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange md:text-sm"
          :class="filtro === null
            ? 'border-brand-orange bg-brand-orange text-brand-white shadow-md shadow-brand-orange/20'
            : 'border-brand-cream/20 text-brand-cream/70 hover:border-brand-orange/50 hover:text-brand-white'"
          :aria-pressed="filtro === null"
          @click="filtro = null"
        >
          Todas
        </button>
        <button
          v-for="tour in toursConSalidas"
          :key="tour.slug"
          type="button"
          class="rounded-full border px-3.5 py-1.5 text-xs font-sans font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange md:text-sm"
          :class="filtro === tour.slug
            ? 'border-brand-orange bg-brand-orange text-brand-white shadow-md shadow-brand-orange/20'
            : 'border-brand-cream/20 text-brand-cream/70 hover:border-brand-orange/50 hover:text-brand-white'"
          :aria-pressed="filtro === tour.slug"
          @click="filtro = tour.slug"
        >
          {{ tour.nombre }}
        </button>
        <button
          v-if="haySalidasDeUnDia"
          type="button"
          class="rounded-full border px-3.5 py-1.5 text-xs font-sans font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange md:text-sm"
          :class="filtroSalidaDiaActivo
            ? 'border-brand-orange bg-brand-orange text-brand-white shadow-md shadow-brand-orange/20'
            : 'border-brand-cream/20 text-brand-cream/70 hover:border-brand-orange/50 hover:text-brand-white'"
          :aria-pressed="filtroSalidaDiaActivo"
          @click="filtro = FILTRO_SALIDA_DIA"
        >
          Salidas de un día
        </button>
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
              <span class="h-2 w-2 rounded-full border border-brand-orange" aria-hidden="true"></span>
              Posibles salidas de un día
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-2.5 w-5 rounded-full bg-brand-orange/35" aria-hidden="true"></span>
              Salida de varios días
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-brand-cream/60" aria-hidden="true"></span>
              Feriados
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[10px] font-semibold text-brand-orange" aria-hidden="true">
                {{ ETIQUETA_TARIFA_DIFERENCIAL }}
              </span>
              Feriados y findes largos
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
                :key="`${salida.fecha}-${salida.slug ?? salida.tipo}`"
                class="flex items-start gap-2 text-sm text-brand-white"
              >
                <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold" aria-hidden="true"></span>
                <span class="min-w-0 flex-1">
                  <span class="block font-semibold">{{ salida.esSalidaDia ? 'Salida de un día' : salida.tour?.nombre ?? salida.slug }}</span>
                  <span v-if="salida.esSalidaDia" class="mt-1 block text-xs text-brand-cream/60">
                    Recorrido y precio a consultar
                  </span>
                  <span v-else class="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span class="font-heading text-lg leading-none text-brand-orange">
                      {{ formatPrecio(precioDe(salida)) || 'Consultar precio' }}
                    </span>
                    <span class="text-brand-cream/50 text-xs font-sans">por persona</span>
                    <span
                      v-if="salida.recargo.aplica"
                      class="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[10px] font-sans font-semibold text-brand-orange"
                    >
                      {{ ETIQUETA_TARIFA_DIFERENCIAL }} · feriado/finde largo
                    </span>
                  </span>
                  <a
                    v-if="salida.esSalidaDia"
                    :href="crearConsultaSalidaDia(salida.fecha)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-1 inline-block font-sans text-xs font-semibold text-brand-orange underline decoration-brand-orange/40 underline-offset-2 transition-colors hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  >
                    Consultar salida
                  </a>
                  <button
                    v-else
                    type="button"
                    class="mt-1 font-sans text-xs font-semibold text-brand-orange underline decoration-brand-orange/40 underline-offset-2 transition-colors hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                    @click="abrirTour(salida.tour, { fecha: salida.fecha, fin: salida.fin })"
                  >
                    Reservar esta salida
                  </button>
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
              <template v-if="filtroSalidaDiaActivo">
                No hay una salida de un día programada para esta fecha. Probá con otro día o sacá el filtro para ver todas las salidas.
              </template>
              <template v-else-if="tourFiltrado">
                {{ tourFiltrado.nombre }} no sale este día. Probá con otro día o sacá el filtro para ver todas las salidas.
              </template>
              <template v-else>
                Sin salidas agendadas ni feriados este día. Revisá otros días del mes.
              </template>
            </p>
          </article>

          <article
            class="rounded-2xl border border-brand-cream/15 bg-brand-card/80 p-4 transition-all duration-700 md:p-5"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Salidas del mes
            </p>

            <div v-if="salidasMes.length" class="space-y-3">
              <ul v-if="salidasConfirmadasMes.length" class="space-y-2">
                <li v-for="salida in salidasConfirmadasMes" :key="`${salida.fecha}-${salida.slug}`">
                  <button
                    type="button"
                    class="group flex w-full items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-dark/40 px-3 py-2.5 text-left transition-all duration-300 hover:border-brand-orange/50 hover:bg-brand-orange/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                    @click="abrirTour(salida.tour, { fecha: salida.fecha, fin: salida.fin })"
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
                    <span class="shrink-0 text-right">
                      <span class="block font-heading text-base leading-none text-brand-white">
                        {{ formatPrecio(precioDe(salida)) || 'Consultar' }}
                      </span>
                      <span v-if="salida.recargo.aplica" class="mt-1 block text-[10px] font-sans font-semibold text-brand-orange">
                        {{ ETIQUETA_TARIFA_DIFERENCIAL }}
                      </span>
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
                  </button>
                </li>
              </ul>

              <div
                v-if="salidasDiaAgrupadas.length"
                class="rounded-xl border border-brand-orange/20 bg-brand-dark/35 p-3 md:p-4"
              >
                <div class="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <div>
                    <p class="text-sm font-semibold text-brand-white">Posibles salidas de un día</p>
                    <p class="text-xs text-brand-cream/60">Recorrido y precio a consultar</p>
                  </div>
                  <span class="rounded-full bg-brand-orange/15 px-2.5 py-1 text-[10px] font-semibold text-brand-orange">
                    {{ salidasDiaMes.length }} {{ salidasDiaMes.length === 1 ? 'fecha' : 'fechas' }}
                  </span>
                </div>

                <div class="space-y-2">
                  <div v-for="grupo in salidasDiaAgrupadas" :key="grupo.dia" class="flex items-center gap-2.5">
                    <span class="w-8 shrink-0 text-xs font-semibold text-brand-cream/60">{{ grupo.dia }}</span>
                    <div class="flex flex-wrap gap-1.5">
                      <a
                        v-for="salida in grupo.fechas"
                        :key="salida.fecha"
                        :href="crearConsultaSalidaDia(salida.fecha)"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="`Consultar salida de un día del ${diaCorto(salida.fecha)}`"
                        :title="`Consultar salida del ${diaCorto(salida.fecha)}`"
                        class="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-brand-orange/25 bg-brand-orange/10 px-2 text-xs font-semibold text-brand-orange transition-colors hover:border-brand-orange/50 hover:bg-brand-orange/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                      >
                        {{ parsear(salida.fecha).getDate() }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p v-else class="text-sm leading-relaxed text-brand-cream/70">
              <template v-if="filtroSalidaDiaActivo">
                No hay salidas de un día cargadas para este mes.
                <button
                  type="button"
                  class="font-semibold text-brand-orange underline underline-offset-2 hover:text-brand-gold"
                  @click="filtro = null"
                >
                  Ver todas las salidas
                </button>
              </template>
              <template v-else-if="tourFiltrado">
                {{ tourFiltrado.nombre }} no tiene salidas cargadas para este mes.
                <button
                  type="button"
                  class="font-semibold text-brand-orange underline underline-offset-2 hover:text-brand-gold"
                  @click="filtro = null"
                >
                  Ver todas las salidas
                </button>
              </template>
              <template v-else>
                Todavía no hay salidas cargadas para este mes.
                <a href="#tours" class="font-semibold text-brand-orange underline underline-offset-2 hover:text-brand-gold">
                  Ver todos los tours
                </a>
              </template>
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
