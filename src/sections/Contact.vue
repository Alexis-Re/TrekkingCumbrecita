<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { tours } from '../data/tours.js'

// Configuración EmailJS
const SERVICE_ID = 'service_nvrwspv'
const TEMPLATE_ID = 'template_qoh1udn'
const PUBLIC_KEY = 'mAOUk3yOWFd69Jyw4'

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  tourInteres: '',
  mensaje: ''
})

const enviado = ref(false)
const errorEnvio = ref(false)
const cargando = ref(false)

const tourOptions = computed(() =>
  tours
    .filter(t => t.precio !== 'Definir')
    .map(t => ({ value: t.nombre, label: t.nombre }))
)

const mensajeLength = computed(() => form.value.mensaje.length)

const formRef = ref(null)

async function enviarFormulario() {
  if (!form.value.nombre.trim() || !form.value.email.trim()) return

  cargando.value = true
  errorEnvio.value = false

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.value, PUBLIC_KEY)
    enviado.value = true
    form.value = { nombre: '', email: '', telefono: '', tourInteres: '', mensaje: '' }
  } catch {
    errorEnvio.value = true
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section id="contacto" class="relative py-20 md:py-28 overflow-hidden border-t border-brand-cream/10">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/tours/champaqui/grupo-bandera-champa.webp')"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/60 to-brand-dark"></div>
    <div class="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">

      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <p class="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange mb-3">
          Contacto
        </p>
        <h2 class="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-white uppercase leading-tight mb-4">
          Reservá tu experiencia
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-brand-gold to-brand-cream/50 mx-auto mb-6"></div>
        <p class="text-brand-cream/70 text-sm md:text-base max-w-lg mx-auto">
          Escribinos para reservar tu lugar o para resolver cualquier consulta sobre nuestros recorridos.
        </p>
      </div>

      <!-- Contenido: Dos columnas -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

        <!-- Formulario (3 columnas) -->
        <div class="lg:col-span-3">
          <form
            v-if="!enviado"
            ref="formRef"
            @submit.prevent="enviarFormulario"
            class="space-y-5"
          >
            <!-- Nombre -->
            <div>
              <label for="nombre" class="block text-brand-cream/80 text-sm font-sans mb-1.5">
                Nombre completo
              </label>
              <input
                id="nombre"
                v-model="form.nombre"
                type="text"
                name="nombre"
                required
                placeholder="Tu nombre"
                class="w-full px-4 py-3 bg-brand-dark border border-brand-cream/15 rounded-lg text-brand-cream placeholder-brand-cream/30 font-sans text-sm focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/30 transition-colors"
              />
            </div>

            <!-- Email + Teléfono -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="email" class="block text-brand-cream/80 text-sm font-sans mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  class="w-full px-4 py-3 bg-brand-dark border border-brand-cream/15 rounded-lg text-brand-cream placeholder-brand-cream/30 font-sans text-sm focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/30 transition-colors"
                />
              </div>
              <div>
                <label for="telefono" class="block text-brand-cream/80 text-sm font-sans mb-1.5">
                  Teléfono <span class="text-brand-cream/40">(opcional)</span>
                </label>
                <input
                  id="telefono"
                  v-model="form.telefono"
                  type="tel"
                  name="telefono"
                  placeholder="+54 9 351 123-4567"
                  class="w-full px-4 py-3 bg-brand-dark border border-brand-cream/15 rounded-lg text-brand-cream placeholder-brand-cream/30 font-sans text-sm focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/30 transition-colors"
                />
              </div>
            </div>

            <!-- Tour de interés -->
            <div>
              <label for="tour" class="block text-brand-cream/80 text-sm font-sans mb-1.5">
                Recorrido de interés
              </label>
              <select
                id="tour"
                v-model="form.tourInteres"
                name="tour"
                class="w-full px-4 py-3 bg-brand-dark border border-brand-cream/15 rounded-lg text-brand-cream font-sans text-sm focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/30 transition-colors appearance-none"
                :class="form.tourInteres ? 'text-brand-cream' : 'text-brand-cream/30'"
              >
                <option value="" disabled>Elegí un recorrido</option>
                <option
                  v-for="tour in tourOptions"
                  :key="tour.value"
                  :value="tour.value"
                  class="bg-brand-dark text-brand-cream"
                >
                  {{ tour.label }}
                </option>
              </select>
            </div>

            <!-- Mensaje -->
            <div>
              <label for="mensaje" class="block text-brand-cream/80 text-sm font-sans mb-1.5">
                Mensaje <span class="text-brand-cream/40">(opcional)</span>
              </label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                name="mensaje"
                rows="4"
                maxlength="500"
                placeholder="Contanos si tenés alguna consulta, preferencia de fecha, cantidad de personas..."
                class="w-full px-4 py-3 bg-brand-dark border border-brand-cream/15 rounded-lg text-brand-cream placeholder-brand-cream/30 font-sans text-sm focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/30 transition-colors resize-none"
              ></textarea>
              <div class="text-right text-brand-cream/30 text-xs font-sans mt-1">
                {{ mensajeLength }} / 500
              </div>
            </div>

            <!-- Error -->
            <p v-if="errorEnvio" class="text-red-400 text-sm font-sans">
              Hubo un error al enviar. Intentá nuevamente o escribinos por WhatsApp.
            </p>

            <!-- Botón enviar -->
            <button
              type="submit"
              :disabled="cargando || !form.nombre.trim() || !form.email.trim()"
              class="w-full bg-brand-orange text-brand-white rounded-lg py-3 font-sans font-semibold hover:bg-brand-gold transition-colors duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ cargando ? 'Enviando...' : 'Enviar reserva' }}
            </button>
          </form>

          <!-- Mensaje de éxito -->
          <div v-else class="text-center py-16">
            <div class="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-heading text-2xl text-brand-white uppercase mb-2">
              ¡Mensaje enviado!
            </h3>
            <p class="text-brand-cream/70 text-sm font-sans mb-6">
              Te responderemos a la brevedad. ¡Gracias por elegirnos!
            </p>
            <button
              @click="enviado = false"
              class="text-brand-orange text-sm font-sans hover:underline"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>

        <!-- Contacto directo (2 columnas) -->
        <div class="lg:col-span-2 flex flex-col">
          <h3 class="font-heading text-2xl md:text-3xl text-brand-white uppercase mb-3">
            ¿Preferís escribirnos directo?
          </h3>
          <p class="text-brand-cream/65 text-sm font-sans mb-8 leading-relaxed">
            Respondemos por WhatsApp en menos de 1 hora. También podés escribirnos por Instagram o email.
          </p>

          <div class="space-y-3">
            <!-- WhatsApp -->
            <a
              href="https://wa.me/5493546453047"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] rounded-xl px-5 py-3.5 font-sans text-sm font-semibold hover:bg-[#25D366]/25 transition-all duration-300"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            <!-- Email -->
            <a
              href="mailto:trekkingcumbrecita@gmail.com"
              class="flex items-center gap-3 bg-brand-orange/10 border border-brand-orange/25 text-brand-orange rounded-xl px-5 py-3.5 font-sans text-sm font-semibold hover:bg-brand-orange/20 transition-all duration-300"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              trekkingcumbrecita@gmail.com
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/trekking_cumbrecita/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 bg-[#E1306C]/10 border border-[#E1306C]/25 text-[#E1306C] rounded-xl px-5 py-3.5 font-sans text-sm font-semibold hover:bg-[#E1306C]/20 transition-all duration-300"
            >
              <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @trekking_cumbrecita
            </a>
          </div>

          <!-- Ubicación -->
          <div class="mt-6 bg-brand-dark border border-brand-cream/15 rounded-xl p-5">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p class="text-brand-cream/80 text-sm font-sans leading-relaxed">
                <span class="font-semibold text-brand-cream">Ubicación:</span> Cumbrecita, Córdoba, Argentina. En el Valle de Calamuchita, rodeados de sierras y ríos.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
