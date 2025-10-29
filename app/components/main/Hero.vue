<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        :style="{ backgroundImage: `url('${backgroundImageUrl}')` }"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
    </div>

    <div class="absolute inset-0 z-0">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        :style="star.style"
      />
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
      <div class="space-y-6">
        <div v-if="greeting" class="inline-block">
          <span class="text-primary tracking-wider">{{ greeting }}</span>
        </div>

        <h1 v-if="name" class="text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight">
          {{ name }}
        </h1>

        <h2 v-if="tagline" class="text-3xl md:text-5xl! lg:text-6xl! text-foreground/70">
          {{ tagline }}
        </h2>

        <p v-if="description" class="text-lg md:text-xl! text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          <span v-html="description"></span>
        </p>

        <div v-if="buttonText" class="pt-8">
          <Button
            variant="glow"
            size="lg"
            @click="scrollToProjects()"
          >
            {{ buttonText }}
          </Button>
        </div>
      </div>
      <ScrollIndicator class="mt-40" variant="starfield" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Button, ScrollIndicator } from 'rory-components';
import NebulaBackground from '../../assets/images/NasaMolecularCloud.png'

const greeting = "สวัสดีครับ ผมชื่อ";
const name = 'Nino Bär';
const tagline = 'I build things for the web.';
const description = 'Frontend Developer specializing in <span class="text-primary">Nuxt</span> and <span class="text-primary">TypeScript</span>.';
const buttonText = 'View My Work';
const backgroundImageUrl = NebulaBackground;

const scrollToProjects = () => {
  document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
};

const stars = computed(() => {
  return Array.from({ length: 50 }, () => ({
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.4 + 0.1,
    },
  }));
});
</script>
