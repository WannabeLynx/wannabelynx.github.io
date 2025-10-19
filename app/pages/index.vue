<template>
  <div class="relative z-10">
    <Hero />
    <About />
    <Projects />
    <TechStack />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/main/Hero.vue';
import About from '~/components/main/About.vue';
import Projects from '~/components/main/Projects.vue';
import TechStack from '~/components/main/TechStack.vue';
import Contact from '~/components/main/Contact.vue';
</script>