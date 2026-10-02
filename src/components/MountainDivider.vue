<script setup>
defineProps({
  flip: { type: Boolean, default: false }
})
</script>

<template>
  <div class="relative w-full h-[40px] md:h-[60px] overflow-hidden">
    <!--
      ridge-mask disuelve el borde recto de la base para evitar una costura dura.
      Al estar la máscara y el rotate-180 en el mismo <svg>, en modo flip la máscara
      (que apunta a la base en coordenadas locales) queda hacia arriba en pantalla.
    -->
    <svg
      class="ridge-mask absolute bottom-0 left-0 w-full"
      :class="flip ? 'rotate-180' : ''"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 32C672 36 768 36 864 30C960 24 1056 12 1152 12C1248 12 1344 24 1392 30L1440 36V60H0Z"
        class="fill-brand-gold/25"
      />
      <path
        d="M0 60L48 54C96 48 192 36 288 32C384 28 480 32 576 38C672 44 768 52 864 48C960 44 1056 28 1152 22C1248 16 1344 20 1392 22L1440 24V60H0Z"
        class="fill-brand-cream/30"
        opacity="0.5"
      />
    </svg>
  </div>
</template>
