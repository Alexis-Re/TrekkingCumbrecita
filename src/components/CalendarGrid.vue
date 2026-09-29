<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  month: { type: String, required: true },
  minDate: { type: String, default: '' },
  // Mapa de fechas 'YYYY-MM-DD' -> { salidas: Number, feriado: String, rango?: { inicio, fin } }
  marks: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'change-month'])

const monthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function parseDate(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toDateKey(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const today = toDateKey(new Date())
const minDateObject = computed(() => parseDate(props.minDate))

const visibleMonth = computed(() => {
  const [year, month] = props.month.split('-').map(Number)
  return new Date(year, month - 1, 1)
})

const monthTitle = computed(() => `${monthLabels[visibleMonth.value.getMonth()]} ${visibleMonth.value.getFullYear()}`)

const calendarDays = computed(() => {
  const year = visibleMonth.value.getFullYear()
  const month = visibleMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const mondayIndex = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return [
    ...Array.from({ length: mondayIndex }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1))
  ]
})

const canGoPrevious = computed(() => {
  if (!minDateObject.value) return true
  return visibleMonth.value > startOfMonth(minDateObject.value)
})

function markFor(date) {
  return date ? props.marks[toDateKey(date)] : undefined
}

function isBeforeMinimum(date) {
  return Boolean(props.minDate) && toDateKey(date) < props.minDate
}

function shiftDay(date, delta) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta)
}

// Día cubierto por una salida multiday (rango con duración real).
function enRango(date) {
  const rango = markFor(date)?.rango
  return Boolean(rango && rango.inicio < rango.fin)
}

function mismaRango(a, b) {
  return Boolean(a && b && a.inicio === b.inicio && a.fin === b.fin)
}

// ¿La banda continúa desde/el día anterior dentro de la misma fila y mes visible?
function conectaIzq(date) {
  if (!enRango(date) || date.getDay() === 1) return false // lunes: inicia fila
  const previo = shiftDay(date, -1)
  if (isBeforeMinimum(previo)) return false
  if (!toDateKey(previo).startsWith(props.month)) return false
  return mismaRango(markFor(date).rango, markFor(previo)?.rango)
}

// ¿La banda continúa hacia el día siguiente dentro de la misma fila y mes visible?
function conectaDer(date) {
  if (!enRango(date) || date.getDay() === 0) return false // domingo: cierra fila
  const siguiente = shiftDay(date, 1)
  if (!toDateKey(siguiente).startsWith(props.month)) return false
  return mismaRango(markFor(date).rango, markFor(siguiente)?.rango)
}

function bandaVisible(date) {
  return Boolean(date) && enRango(date) && !isBeforeMinimum(date)
}

function bandaClase(date) {
  // La banda se extiende solo hacia la derecha para cubrir el gap (`gap-1`);
  // si se extendiera desde ambos lados, las capas translúcidas se solaparían
  // en el gap y quedaría una costura más brillante.
  return [
    'left-0',
    conectaIzq(date) ? '' : 'rounded-l-full',
    conectaDer(date) ? '-right-1' : 'right-0 rounded-r-full',
  ]
}

function isSelected(date) {
  return Boolean(date) && toDateKey(date) === props.modelValue
}

function isToday(date) {
  return Boolean(date) && toDateKey(date) === today
}

function dayClass(date) {
  if (isSelected(date)) return 'bg-brand-orange font-bold text-brand-white shadow-md shadow-brand-orange/20'
  if (isBeforeMinimum(date)) return 'cursor-not-allowed text-brand-cream/20'
  if (isToday(date)) return 'border border-brand-gold text-brand-gold hover:bg-brand-orange/20'
  return 'text-brand-cream hover:bg-brand-orange/20 hover:text-brand-white'
}

function fechaCorta(valor) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })
    .format(parseDate(valor))
    .replace('.', '')
}

function ariaLabel(date) {
  let label = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
  const mark = markFor(date)
  if (mark?.salidas) label += `, ${mark.salidas} ${mark.salidas === 1 ? 'salida disponible' : 'salidas disponibles'}`
  if (mark?.rango && mark.rango.inicio < mark.rango.fin)
    label += `, día de una salida del ${fechaCorta(mark.rango.inicio)} al ${fechaCorta(mark.rango.fin)}`
  if (mark?.feriado) label += `, feriado${mark.feriado ? ` (${mark.feriado})` : ''}`
  return label
}

function selectDate(date) {
  if (isBeforeMinimum(date)) return
  emit('update:modelValue', toDateKey(date))
}
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between gap-3">
      <button type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-brand-orange/20 hover:text-brand-white disabled:cursor-not-allowed disabled:opacity-25" :disabled="!canGoPrevious" aria-label="Mes anterior" @click="emit('change-month', -1)">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m15 19-7-7 7-7" /></svg>
      </button>
      <strong class="font-heading text-xl tracking-wide text-brand-white sm:text-2xl" aria-live="polite">{{ monthTitle }}</strong>
      <button type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-brand-orange/20 hover:text-brand-white disabled:cursor-not-allowed disabled:opacity-25" aria-label="Mes siguiente" @click="emit('change-month', 1)">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>

    <div class="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-brand-cream/50" aria-hidden="true">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>

    <div class="grid grid-cols-7 gap-1" role="grid" :aria-label="`Calendario de ${monthTitle}`">
      <span v-for="(date, index) in calendarDays" :key="date ? toDateKey(date) : `empty-${index}`" class="relative aspect-square" role="gridcell">
        <span
          v-if="bandaVisible(date)"
          class="pointer-events-none absolute inset-y-1 z-0 bg-brand-orange/35"
          :class="bandaClase(date)"
          aria-hidden="true"
        ></span>
        <button
          v-if="date"
          type="button"
          class="relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg font-sans text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/70"
          :class="dayClass(date)"
          :disabled="isBeforeMinimum(date)"
          :aria-label="ariaLabel(date)"
          :aria-selected="isSelected(date) ? 'true' : undefined"
          :aria-current="isToday(date) ? 'date' : undefined"
          @click="selectDate(date)"
        >
          <span>{{ date.getDate() }}</span>
          <span v-if="markFor(date)" class="flex items-center gap-1" aria-hidden="true">
            <span v-if="markFor(date).salidas" class="h-1.5 w-1.5 rounded-full" :class="isSelected(date) ? 'bg-brand-white' : 'bg-brand-gold'"></span>
            <span v-if="markFor(date).feriado" class="h-1.5 w-1.5 rounded-full" :class="isSelected(date) ? 'bg-brand-white/70' : 'bg-brand-cream/60'"></span>
          </span>
        </button>
      </span>
    </div>
  </div>
</template>
