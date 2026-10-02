<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './sections/Hero.vue'
import Tours from './sections/Tours.vue'
import Calendario from './sections/Calendario.vue'
import Documentacion from './sections/Documentacion.vue'
import Identity from './sections/Identity.vue'
import Gallery from './sections/Gallery.vue'
import Contact from './sections/Contact.vue'
import Footer from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import NextSection from './components/NextSection.vue'
import MountainDivider from './components/MountainDivider.vue'
</script>

<template>
  <div class="overflow-x-hidden">
    <Navbar />
    <Hero />
    <Tours />
    <MountainDivider />
    <Calendario />
    <MountainDivider />
    <Documentacion />
    <MountainDivider />
    <Identity />
    <MountainDivider flip />
    <Gallery />
    <MountainDivider />
    <Contact />
    <Footer />
    <ScrollToTop />
    <NextSection />
  </div>
</template>
