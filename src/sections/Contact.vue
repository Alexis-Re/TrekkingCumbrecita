<script setup>
import { computed, ref } from 'vue'
import { tours } from '../data/tours.js'
import WhatsAppIcon from '../components/WhatsAppIcon.vue'

const WHATSAPP_NUMBER = '5493546453047'

const opciones = [
  { id: 'reserva', titulo: 'Quiero reservar una salida', descripcion: 'Decime qué experiencia te interesa y para cuándo.', icono: 'calendar' },
  { id: 'elegir', titulo: 'Necesito ayuda para elegir', descripcion: 'Te recomiendo una salida según lo que estés buscando.', icono: 'compass' },
  { id: 'otra', titulo: 'Tengo otra consulta', descripcion: 'Escribime directamente y lo vemos juntos.', icono: 'chat' }
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
const datos = ref({ tour: '', fecha: '', personas: '2', nombre: '', preferencia: '', detalle: '' })
const toursDisponibles = computed(() => tours.filter(tour => tour.disponible))

const hoy = new Date()
const fechaMinima = [hoy.getFullYear(), String(hoy.getMonth() + 1).padStart(2, '0'), String(hoy.getDate()).padStart(2, '0')].join('-')

const puedeEnviar = computed(() => {
  if (tipoConsulta.value === 'reserva') return Boolean(datos.value.tour && datos.value.fecha && datos.value.personas)
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
  paso.value = 2
}

function volver() {
  paso.value = 1
}
</script>

<template>
  <section id="contacto" class="relative overflow-hidden border-t border-brand-cream/10 py-20 md:py-28">
    <img src="/assets/tours/pueblo-escondido/cascada.webp" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/75 to-brand-dark"></div>

    <div class="relative mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
      <div class="mb-12 max-w-2xl md:mb-16">
        <p class="mb-3 font-sans text-sm uppercase tracking-[0.3em] text-brand-orange">Contacto</p>
        <h2 class="mb-4 font-heading text-4xl uppercase leading-tight text-brand-white md:text-5xl lg:text-6xl">Organicemos tu próxima aventura</h2>
        <div class="mb-6 h-1 w-20 bg-gradient-to-r from-brand-gold to-brand-cream/50"></div>
        <p class="max-w-xl font-sans text-sm leading-relaxed text-brand-cream/70 md:text-base">Elegí qué necesitás y te llevo directo al canal más rápido para resolverlo.</p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
        <div class="lg:col-span-3">
          <div class="rounded-2xl border border-brand-cream/15 bg-brand-dark/75 p-5 backdrop-blur-sm sm:p-8">
            <div class="mb-8 flex items-center gap-3" aria-label="Progreso de la consulta">
              <span v-for="numero in 2" :key="numero" class="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold" :class="paso >= numero ? 'border-brand-orange bg-brand-orange text-brand-white' : 'border-brand-cream/20 text-brand-cream/40'">{{ numero }}</span>
              <span class="h-px w-10 bg-brand-cream/20"></span>
              <span class="text-xs uppercase tracking-wider text-brand-cream/45">Consulta rápida</span>
            </div>

            <div v-if="paso === 1">
              <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">¿En qué te ayudo?</h3>
              <p class="mb-6 font-sans text-sm text-brand-cream/60">Elegí una opción para empezar.</p>
              <div class="grid gap-3">
                <button v-for="opcion in opciones" :key="opcion.id" type="button" class="group flex min-h-20 items-center gap-4 rounded-xl border border-brand-cream/15 bg-brand-card/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/60 hover:bg-brand-card" @click="elegirTipo(opcion.id)">
                  <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                    <svg v-if="opcion.icono === 'calendar'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5z" /></svg>
                    <svg v-else-if="opcion.icono === 'compass'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75l4.5-1.5-1.5 4.5-4.5 1.5 1.5-4.5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m5.625 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-3.75 3.75h.008v.008H9.75v-.008zm2.625 0h.008v.008h-.008v-.008zm2.625 0h.008v.008H15v-.008zM3.75 6.75a3 3 0 013-3h10.5a3 3 0 013 3v8.5a3 3 0 01-3 3H12l-3.75 2.25v-2.25h-1.5a3 3 0 01-3-3v-8.5z" /></svg>
                  </span>
                  <span class="min-w-0 flex-1"><span class="block font-sans text-sm font-semibold text-brand-white">{{ opcion.titulo }}</span><span class="mt-1 block font-sans text-xs leading-relaxed text-brand-cream/55">{{ opcion.descripcion }}</span></span>
                  <span class="text-xl text-brand-cream/35 transition-transform group-hover:translate-x-1 group-hover:text-brand-orange" aria-hidden="true">›</span>
                </button>
              </div>
            </div>

            <div v-else>
              <button type="button" class="mb-5 text-xs font-semibold uppercase tracking-wider text-brand-orange hover:text-brand-gold" @click="volver">← Volver</button>
              <div v-if="tipoConsulta === 'reserva'">
                <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Consultá tu lugar</h3>
                <p class="mb-6 font-sans text-sm text-brand-cream/60">Con estos datos te confirmo disponibilidad por WhatsApp.</p>
                <label class="block font-sans text-sm text-brand-cream/80">Experiencia<select v-model="datos.tour" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none"><option value="" disabled>Elegí una experiencia</option><option v-for="tour in toursDisponibles" :key="tour.slug" :value="tour.nombre">{{ tour.nombre }}</option></select></label>
                <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label class="block font-sans text-sm text-brand-cream/80">Fecha tentativa<input v-model="datos.fecha" :min="fechaMinima" type="date" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none" /></label>
                  <label class="block font-sans text-sm text-brand-cream/80">Cantidad de personas<select v-model="datos.personas" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream focus:border-brand-orange/60 focus:outline-none"><option v-for="cantidad in 12" :key="cantidad" :value="String(cantidad)">{{ cantidad }} {{ cantidad === 1 ? 'persona' : 'personas' }}</option></select></label>
                </div>
              </div>
              <div v-else-if="tipoConsulta === 'elegir'">
                <h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Te ayudo a elegir</h3>
                <p class="mb-6 font-sans text-sm text-brand-cream/60">Contame qué tipo de aventura estás buscando.</p>
                <div class="space-y-3"><label v-for="preferencia in preferencias" :key="preferencia" class="flex cursor-pointer items-center gap-3 rounded-lg border border-brand-cream/15 bg-brand-card/70 p-4 font-sans text-sm text-brand-cream/85 hover:border-brand-orange/50"><input v-model="datos.preferencia" type="radio" name="preferencia" :value="preferencia" class="h-4 w-4 accent-brand-orange" />{{ preferencia }}</label></div>
              </div>
              <div v-else><h3 class="mb-2 font-heading text-3xl uppercase text-brand-white">Hablemos</h3><p class="mb-6 font-sans text-sm text-brand-cream/60">Mandame tu consulta y te respondo personalmente.</p></div>

              <div class="mt-6 space-y-5">
                <label class="block font-sans text-sm text-brand-cream/80">Tu nombre <span class="text-brand-cream/40">(opcional)</span><input v-model="datos.nombre" type="text" maxlength="60" autocomplete="name" placeholder="¿Cómo te llamás?" class="mt-2 min-h-12 w-full rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream placeholder-brand-cream/30 focus:border-brand-orange/60 focus:outline-none" /></label>
                <label class="block font-sans text-sm text-brand-cream/80">¿Algo más que quieras contarme? <span class="text-brand-cream/40">(opcional)</span><textarea v-model="datos.detalle" maxlength="500" rows="3" placeholder="Una duda puntual o información que quieras compartir..." class="mt-2 w-full resize-none rounded-lg border border-brand-cream/15 bg-brand-card px-4 py-3 text-base text-brand-cream placeholder-brand-cream/30 focus:border-brand-orange/60 focus:outline-none"></textarea></label>
              </div>

              <a v-if="puedeEnviar" :href="mensajeWhatsApp" target="_blank" rel="noopener noreferrer" class="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 font-sans text-base font-semibold text-brand-dark transition-colors duration-300 hover:bg-[#42df7a]"><WhatsAppIcon />{{ tipoConsulta === 'reserva' ? 'Consultar disponibilidad por WhatsApp' : 'Abrir WhatsApp y enviar consulta' }}</a>
              <p v-else class="mt-5 text-center font-sans text-xs text-brand-cream/50">Completá los datos principales para continuar.</p>
              <p class="mt-4 text-center font-sans text-xs leading-relaxed text-brand-cream/40">WhatsApp se abrirá con el mensaje listo para revisar. No guardamos estos datos en esta web.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:col-span-2">
          <h3 class="font-heading text-3xl uppercase text-brand-white">¿Preferís escribirme directamente?</h3>
          <p class="mb-7 mt-3 font-sans text-sm leading-relaxed text-brand-cream/65">Te respondo por WhatsApp en menos de 1 hora. También podés encontrarme por Instagram o email.</p>
          <div class="space-y-3">
            <a href="https://wa.me/5493546453047" target="_blank" rel="noopener noreferrer" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/60"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]"><WhatsAppIcon /></span><span><strong class="block font-sans text-sm text-brand-white">WhatsApp</strong><small class="font-sans text-xs text-brand-cream/50">Respuesta habitual en menos de 1 hora</small></span></a>
            <a href="mailto:cascadaelchorrillo.2018@gmail.com?subject=Consulta%20Trekking%20Cumbrecita" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg></span><span><strong class="block font-sans text-sm text-brand-white">Email</strong><small class="break-all font-sans text-xs text-brand-cream/50">cascadaelchorrillo.2018@gmail.com</small></span></a>
            <a href="https://www.instagram.com/trekking_cumbrecita/" target="_blank" rel="noopener noreferrer" class="flex min-h-14 items-center gap-3 rounded-xl border border-brand-cream/15 bg-brand-card/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1306C]/60"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E1306C]/15 text-[#E1306C]"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a4 4 0 100 8 4 4 0 000-8zm6.406-1.56a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg></span><span><strong class="block font-sans text-sm text-brand-white">Instagram</strong><small class="font-sans text-xs text-brand-cream/50">@trekking_cumbrecita</small></span></a>
          </div>
          <div class="mt-8 border-t border-brand-cream/10 pt-6">
            <p class="mb-3 font-sans text-xs uppercase tracking-wider text-brand-orange">Antes de salir</p>
            <div class="space-y-2 font-sans text-sm text-brand-cream/65">
              <details><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Qué tengo que llevar? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">Ropa cómoda, calzado de trekking, agua, protector solar y abrigo impermeable.</p></details>
              <details><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Qué pasa si llueve? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">Evaluamos el clima y te avisamos si la salida se reprograma.</p></details>
              <details><summary class="cursor-pointer list-none py-1 text-brand-cream/85">¿Cómo confirmo mi lugar? <span class="float-right text-brand-orange">+</span></summary><p class="pb-2 pt-1 text-xs leading-relaxed">Te informo disponibilidad, forma de reserva y todos los detalles por WhatsApp.</p></details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
