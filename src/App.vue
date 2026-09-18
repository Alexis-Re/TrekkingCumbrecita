<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './sections/Hero.vue'
import Tours from './sections/Tours.vue'
import Identity from './sections/Identity.vue'
import Testimonials from './sections/Testimonials.vue'
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
    <MountainDivider color="brand-dark" />
    <Identity />
    <MountainDivider color="brand-dark" flip />
    <Testimonials />
    <MountainDivider color="brand-dark" />
    <Gallery />
    <Contact />
    <Footer />
    <ScrollToTop />
    <NextSection />
  </div>
</template>
