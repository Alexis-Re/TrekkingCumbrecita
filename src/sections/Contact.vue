<script setup>
import { computed, ref } from 'vue'
import { tours } from '../data/tours.js'

const WHATSAPP_NUMBER = '5493546453047'

const opciones = [
  {
    id: 'reserva',
    titulo: 'Quiero reservar una salida',
    descripcion: 'Decime qué experiencia te interesa y para cuándo.',
    icono: 'calendar'
  },
  {
    id: 'elegir',
    titulo: 'Necesito ayuda para elegir',
    descripcion: 'Te recomiendo una salida según lo que estés buscando.',
    icono: 'compass'
  },
  {
    id: 'otra',
    titulo: 'Tengo otra consulta',
    descripcion: 'Escribime directamente y lo vemos juntos.',
    icono: 'chat'
  }
]

const preferencias = [
  'Cascadas, ríos y lugares para bañarse',
  'Una experiencia exigente de montaña',
  'Una salida de varios días',
  'Algo tranquilo para disfrutar el paisaje',
  'Todavía no estoy seguro/a'
]

const paso = ref(1)
const tipoConsulta = ref('')
const datos = ref({
  tour: '',
  fecha: '',
  personas: '2',
  nombre: '',
  preferencia: '',
  detalle: ''
})

const toursDisponibles = computed(() => tours.filter(tour => tour.disponible))
const fechaLocal = new Date()
const fechaMinima = [fechaLocal.getFullYear(), String(fechaLocal.getMonth() + 1).padStart(2, '0'), String(fechaLocal.getDate()).padStart(2, '0')].join('-')

const puedeAvanzar = computed(() => {
  if (tipoConsulta.value === 'reserva') {
    return Boolean(datos.value.tour && datos.value.fecha && datos.value.personas)
  }
  if (tipoConsulta.value === 'elegir') return Boolean(datos.value.preferencia)
  return true
})

const mensajeWhatsApp = computed(() => {
  const nombre = datos.value.nombre.trim()
  let mensaje = 'Hola Rober, vi la web de Trekking Cumbrecita y quería consultar.'

  if (tipoConsulta.value === 'reserva') {
    const fecha = datos.value.fecha.split('-').reverse().join('/')
    mensaje += `\n\nExperiencia: ${datos.value.tour}\nFecha tentativa: ${fecha}\nSomos: ${datos.value.personas} persona${datos.value.personas === '1' ? '' : 's'}.`
  } else if (tipoConsulta.value === 'elegir') {
    mensaje += `\n\nEstoy buscando: ${datos.value.preferencia}.`
  }

  if (nombre) mensaje += `\nMi nombre es: ${nombre}.`
  if (datos.value.detalle.trim()) mensaje += `\n\nConsulta: ${datos.value.detalle.trim()}`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
})

function elegirTipo(tipo) {
  tipoConsulta.value = tipo
  paso.value = tipo === 'otra' ? 2 : 2
}

function volver() {
  paso.value = Math.max(1, paso.value - 1)
}

</script>

<template>
  <section id="contacto" class="relative overflow-hidden border-t border-brand-cream/10 py-20 md:py-28">
    <img
      src="/assets/tours/pueblo-escondido/cascada.webp"
      alt=""
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/75 to-brand-dark"></div>

    <div class="relative mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
      <div class="mb-12 max-w-2xl md:mb-16">
        <p class="mb-3 font-sans text-sm uppercase tracking-[0.3em] text-brand-orange">Contacto</p>
        <h2 class="mb-4 font-heading text-4xl uppercase leading-tight text-brand-white md:text-5xl lg:text-6xl">
          Organicemos tu próxima aventura
        </h2>
        <div class="mb-6 h-1 w-20 bg-gradient-to-r from-brand-gold to-brand-cream/50"></div>
        <p class="max-w-xl font-sans text-sm leading-relaxed text-brand-cream/70 md:text-base">
          Elegí qué necesitás y te llevo directo al canal más rápido para resolverlo.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
        <div class="lg:col-span-3">
          <div class="rounded-2xl border border-brand-cream/15 bg-brand-dark/75 p-5 backdrop-blur-sm sm:p-8">
            <div class="mb-8 flex items-center gap-3" aria-label="Progreso de la consulta">
              <span
                v-for="numero in 2"
                :key="numero"
                class="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors"
                :class="paso >= numero ? 'border-brand-orange bg-brand-orange text-brand-white' : 'border-brand-cream/20 text-brand-cream/40'"
              >{{ numero }}</span>
              <span class="h-px w-10 bg-brand-cream/20"></span>
              <span class="text-xs uppercase tracking-wider text-brand-cream/45">Consulta rápida</span>
            </div>

            <div v-if="paso === 1">
              <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">¿En qué te ayudo?</h3>
              <p class="mb-6 font-sans text-sm text-brand-cream/60">Elegí una opción para empezar.</p>
              <div class="grid gap-3">
                <button
                  v-for="opcion in opciones"
                  :key="opcion.id"
                  type="button"
                  class="group flex min-h-20 items-center gap-4 rounded-xl border border-brand-cream/15 bg-brand-card/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/60 hover:bg-brand-card"
                  @click="elegirTipo(opcion.id)"
                >
                  <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                    <svg v-if="opcion.icono === 'calendar'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5z" /></svg>
                    <svg v-else-if="opcion.icono === 'compass'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75l4.5-1.5-1.5 4.5-4.5 1.5 1.5-4.5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m5.625 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-3.75 3.75h.008v.008H9.75v-.008zm2.625 0h.008v.008h-.008v-.008zm2.625 0h.008v.008H15v-.008zM3.75 6.75a3 3 0 013-3h10.5a3 3 0 013 3v8.5a3 3 0 01-3 3H12l-3.75 2.25v-2.25h-1.5a3 3 0 01-3-3v-8.5z" /></svg>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block font-sans text-sm font-semibold text-brand-white">{{ opcion.titulo }}</span>
                    <span class="mt-1 block font-sans text-xs leading-relaxed text-brand-cream/55">{{ opcion.descripcion }}</span>
                  </span>
                  <svg class="h-5 w-5 shrink-0 text-brand-cream/35 transition-transform group-hover:translate-x-1 group-hover:text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            <div v-else>
              <button type="button" class="mb-5 text-xs font-semibold uppercase tracking-wider text-brand-orange hover:text-brand-gold" @click="volver">← Volver</button>

              <div v-if="tipoConsulta === 'reserva'">
                <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Consultá tu lugar</h3>
                <p class="mb-6 font-sans text-sm text-brand-cream/60">Con estos datos te confirmo disponibilidad por WhatsApp.</p>
                <div class="space-y-5">
                  <label class="block font-sans text-sm text-brand-cream/80">
                    Experiencia
                    <select v-model="datos.tour" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none focus:ring-1 focus:ring-brand-orange/30">
                      <option value="" disabled>Elegí una experiencia</option>
                      <option v-for="tour in toursDisponibles" :key="tour.slug" :value="tour.nombre">{{ tour.nombre }}</option>
                    </select>
                  </label>
                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label class="block font-sans text-sm text-brand-cream/80">Fecha tentativa<input v-model="datos.fecha" :min="fechaMinima" type="date" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none focus:ring-1 focus:ring-brand-orange/30" /></label>
                    <label class="block font-sans text-sm text-brand-cream/80">Cantidad de personas<select v-model="datos.personas" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none focus:ring-1 focus:ring-brand-orange/30"><option v-for="cantidad in 12" :key="cantidad" :value="String(cantidad)">{{ cantidad }} {{ cantidad === 1 ? 'persona' : 'personas' }}</option></select></label>
                  </div>
                </div>
              </div>

              <div v-else-if="tipoConsulta === 'elegir'">
                <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Te ayudo a elegir</h3>
                <p class="mb-6 font-sans text-sm text-brand-cream/60">Contame qué tipo de aventura estás buscando.</p>
                <div class="space-y-3">
                  <label v-for="preferencia in preferencias" :key="preferencia" class="flex cursor-pointer items-center gap-3 rounded-lg border border-brand-cream/15 bg-brand-card/70 p-4 font-sans text-sm text-brand-cream/85 transition-colors hover:border-brand-orange/50 has-[:checked]:border-brand-orange/70 has-[:checked]:bg-brand-orange/10"><input v-model="datos.preferencia" type="radio" name="preferencia" :value="preferencia" class="h-4 w-4 accent-brand-orange" />{{ preferencia }}</label>
                </div>
              </div>

              <div v-else>
                <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Hablemos</h3>
                <p class="mb-6 font-sans text-sm text-brand-cream/60">Mandame tu consulta y te respondo personalmente.</p>
              </div>

              <div class="mt-6 space-y-5">
                <label class="block font-sans text-sm text-brand-cream/80">Tu nombre <span class="text-brand-cream/40">(opcional)</span><input v-model="datos.nombre" type="text" maxlength="60" autocomplete="name" placeholder="¿Cómo te llamás?" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream placeholder-brand-cream/30 focus:border-brand-orange/60 focus:outline-none focus:ring-1 focus:ring-brand-orange/30" /></label>
                <label class="block font-sans text-sm text-brand-cream/80">¿Algo más que quieras contarme? <span class="text-brand-cream/40">(opcional)</span><textarea v-model="datos.detalle" maxlength="500" rows="3" placeholder="Por ejemplo: nivel de experiencia, si vienen con chicos o una duda puntual..." class="mt-2 w-full resize-none rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream placeholder-brand-cream/30 focus:border-brand-orange/60 focus:outline-none focus:ring-1 focus:ring-brand-orange/30"></textarea></label>
              </div>

              <a v-if="puedeAvanzar" :href="mensajeWhatsApp" target="_blank" rel="noopener noreferrer" class="mt-7 flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 font-sans text-base font-semibold text-brand-dark transition-colors duration-300 hover:bg-[#42df7a]">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                {{ tipoConsulta === 'reserva' ? 'Consultar disponibilidad por WhatsApp' : 'Abrir WhatsApp y enviar consulta' }}
              </a>
              <p v-else class="mt-5 text-center font-sans text-xs text-brand-cream/50">Completá los datos principales para continuar.</p>
              <p class="mt-4 text-center font-sans text-xs leading-relaxed text-brand-cream/40">WhatsApp se abrirá con el mensaje listo para revisar. No guardamos estos datos en esta web.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:col-span-2">
          <h3 class="font-heading text-3xl uppercase text-brand-white">¿Preferís escribirme directamente?</h3>
          <p class="mb-7 mt-3 font-sans text-sm leading-relaxed text-brand-cream/65">Te respondo por WhatsApp en menos de 1 hora. También podés encontrarme por Instagram o email.</p>
          <div class="space-y-3">
            <a href="https://wa.me/5493546453047" target="_blank" rel="noopener noreferrer" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/60"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></span><span><strong class="block font-sans text-sm text-brand-white">WhatsApp</strong><small class="font-sans text-xs text-brand-cream/50">Respuesta habitual en menos de 1 hora</small></span></a>
            <a href="mailto:cascadaelchorrillo.2018@gmail.com?subject=Consulta%20Trekking%20Cumbrecita" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg></span><span><strong class="block font-sans text-sm text-brand-white">Email</strong><small class="break-all font-sans text-xs text-brand-cream/50">cascadaelchorrillo.2018@gmail.com</small></span></a>
            <a href="https://www.instagram.com/trekking_cumbrecita/" target="_blank" rel="noopener noreferrer" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1306C]/60"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E1306C]/15 text-[#E1306C]"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a4 4 0 100 8 4 4 0 000-8zm6.406-1.56a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg></span><span><strong class="block font-sans text-sm text-brand-white">Instagram</strong><small class="font-sans text-xs text-brand-cream/50">@trekking_cumbrecita</small></span></a>
          </div>

          <div class="mt-8 border-t border-brand-cream/10 pt-6">
            <p class="mb-3 font-sans text-xs uppercase tracking-wider text-brand-orange">Antes de salir</p>
            <div class="space-y-2 font-sans text-sm text-brand-cream/65">
              <details class="group"><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Qué tengo que llevar? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">Ropa cómoda, calzado de trekking, agua, protector solar y abrigo impermeable. Según la salida pueden hacer falta elementos adicionales.</p></details>
              <details class="group"><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Qué pasa si llueve? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">La seguridad es prioridad. Evaluamos el clima y te avisamos si la salida se reprograma.</p></details>
              <details class="group"><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Cómo confirmo mi lugar? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">Te informo disponibilidad, forma de reserva y todos los detalles por WhatsApp.</p></details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
