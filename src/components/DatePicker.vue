<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'date-picker' },
  modelValue: { type: String, default: '' },
  minDate: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])

const pickerRef = ref(null)
const isOpen = ref(false)
const activeDate = ref(null)
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
const selectedDate = computed(() => parseDate(props.modelValue))
const visibleMonth = ref(startOfMonth(selectedDate.value || minDateObject.value || new Date()))

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
  const minimumMonth = startOfMonth(minDateObject.value || new Date())
  return visibleMonth.value > minimumMonth
})

function formattedValue(value) {
  const date = parseDate(value)
  if (!date) return 'Seleccioná una fecha'

  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date)
}

function isBeforeMinimum(date) {
  return toDateKey(date) < props.minDate
}

function isSelected(date) {
  return date && toDateKey(date) === props.modelValue
}

function isToday(date) {
  return date && toDateKey(date) === today
}

function selectDate(date) {
  if (!date || isBeforeMinimum(date)) return
  const value = toDateKey(date)
  emit('update:modelValue', value)
  activeDate.value = value
  isOpen.value = false
}

function changeMonth(offset) {
  const nextMonth = new Date(visibleMonth.value.getFullYear(), visibleMonth.value.getMonth() + offset, 1)
  const minimumMonth = startOfMonth(minDateObject.value || new Date())
  if (offset < 0 && nextMonth < minimumMonth) return
  visibleMonth.value = nextMonth
}

function openPicker() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    const baseDate = selectedDate.value || minDateObject.value || new Date()
    visibleMonth.value = startOfMonth(baseDate)
    nextTick(() => pickerRef.value?.querySelector('[data-selected="true"], [data-first-available="true"]')?.focus())
  }
}

function onOutsideClick(event) {
  if (!pickerRef.value?.contains(event.target)) isOpen.value = false
}

function onKeydown(event) {
  if (!isOpen.value) return
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

function focusDate(value) {
  activeDate.value = value
  nextTick(() => pickerRef.value?.querySelector(`[data-date="${value}"]`)?.focus())
}

function onDayKeydown(event, date) {
  const key = event.key
  if (key === 'Enter' || key === ' ') {
    event.preventDefault()
    selectDate(date)
    return
  }

  const day = new Date(date)
  if (key === 'Home') day.setDate(1)
  else if (key === 'End') day.setMonth(day.getMonth() + 1, 0)
  else {
    const movement = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[key]
    if (!movement) return
    day.setDate(day.getDate() + movement)
  }

  event.preventDefault()
  if (isBeforeMinimum(day)) day.setTime(minDateObject.value.getTime())
  visibleMonth.value = startOfMonth(day)
  focusDate(toDateKey(day))
}

watch(() => props.modelValue, (value) => {
  if (value) activeDate.value = value
})

onMounted(() => {
  document.addEventListener('click', onOutsideClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onOutsideClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="pickerRef" class="relative">
    <button
      :id="id"
      type="button"
      class="flex min-h-12 w-full items-center gap-3 rounded-lg border border-brand-cream/15 bg-brand-dark/60 px-3 text-left text-sm font-sans text-brand-cream transition-all duration-200 hover:border-brand-cream/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/35"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-controls="`${id}-panel`"
      @click="openPicker"
    >
      <svg class="h-4 w-4 shrink-0 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5z" />
      </svg>
      <span class="min-w-0 flex-1 capitalize" :class="modelValue ? 'text-brand-cream' : 'text-brand-cream/50'">{{ formattedValue(modelValue) }}</span>
      <svg class="h-4 w-4 shrink-0 text-brand-cream/50 transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-if="isOpen" :id="`${id}-panel`" class="absolute left-1/2 top-[calc(100%+0.5rem)] z-30 w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 rounded-xl border border-brand-cream/15 bg-brand-card p-3 shadow-2xl shadow-brand-dark/40 sm:left-0 sm:w-[20rem] sm:min-w-0 sm:translate-x-0 sm:p-4" role="dialog" aria-label="Selector de fecha">
      <div class="mb-4 flex items-center justify-between gap-3">
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-brand-orange/20 hover:text-brand-white disabled:cursor-not-allowed disabled:opacity-25" :disabled="!canGoPrevious" aria-label="Mes anterior" @click="changeMonth(-1)">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m15 19-7-7 7-7" /></svg>
        </button>
        <strong class="font-heading text-xl tracking-wide text-brand-white">{{ monthTitle }}</strong>
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-brand-orange/20 hover:text-brand-white" aria-label="Mes siguiente" @click="changeMonth(1)">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>

      <div class="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-brand-cream/50">
        <span v-for="day in weekDays" :key="day">{{ day }}</span>
      </div>

      <div class="grid grid-cols-7 gap-1" role="grid">
        <span v-for="(date, index) in calendarDays" :key="date ? toDateKey(date) : `empty-${index}`" class="aspect-square" role="gridcell">
          <button
            v-if="date"
            type="button"
            class="h-full w-full rounded-lg text-sm font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/70"
            :class="isSelected(date) ? 'bg-brand-orange font-bold text-brand-white shadow-md shadow-brand-orange/20' : isBeforeMinimum(date) ? 'cursor-not-allowed text-brand-cream/20' : isToday(date) ? 'border border-brand-gold text-brand-gold hover:bg-brand-orange/20' : 'text-brand-cream hover:bg-brand-orange/20 hover:text-brand-white'"
            :disabled="isBeforeMinimum(date)"
            :aria-label="formattedValue(toDateKey(date))"
            :aria-selected="isSelected(date)"
            :data-date="toDateKey(date)"
            :data-selected="isSelected(date) ? 'true' : undefined"
            :data-first-available="toDateKey(date) === props.minDate ? 'true' : undefined"
            @click="selectDate(date)"
            @keydown="onDayKeydown($event, date)"
          >
            {{ date.getDate() }}
          </button>
        </span>
      </div>

      <button type="button" class="mt-4 w-full border-t border-brand-cream/10 pt-3 text-center text-xs font-semibold text-brand-gold transition-colors hover:text-brand-orange" @click="selectDate(parseDate(minDate))">
        Desde hoy
      </button>
    </div>
  </div>
</template>
