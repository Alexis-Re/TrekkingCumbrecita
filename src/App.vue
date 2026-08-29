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
</script>

<template>
  <div class="overflow-x-hidden">
    <Navbar />
    <Hero />
    <Tours />
    <Identity />
    <Testimonials />
    <Gallery />
    <Contact />
    <Footer />
    <ScrollToTop />
  </div>
</template>
