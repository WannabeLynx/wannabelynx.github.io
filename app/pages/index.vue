<template>
  <div class="relative">
    <ClientOnly>
      <Starfield />
    </ClientOnly>
    <IndexRail />

    <div class="relative z-10 stage">
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Starfield from '~/components/common/effects/Starfield.vue';
import IndexRail from '~/components/common/objects/IndexRail.vue';
import Hero from '~/components/main/Hero.vue';
import About from '~/components/main/About.vue';
import Projects from '~/components/main/Projects.vue';
import TechStack from '~/components/main/TechStack.vue';
import Contact from '~/components/main/Contact.vue';

let io: IntersectionObserver | null = null;

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io?.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io?.observe(el));
});

onUnmounted(() => io?.disconnect());
</script>

<style scoped>
.stage { margin-left: 88px; }
@media (max-width: 1024px) {
  .stage { margin-left: 0; margin-top: 54px; }
}
</style>
