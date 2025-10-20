<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Nebula Background -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        :style="{ backgroundImage: `url('${backgroundImageUrl}')` }"
      />
      <!-- Gradient Overlay using theme colors -->
      <div class="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
    </div>

    <!-- Animated Stars -->
    <div class="absolute inset-0 z-0">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        :style="star.style"
      />
    </div>

    <!-- Content -->
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

const greeting = 'Hi, my name is';
const name = 'Nino Bär';
const tagline = 'I build things for the web.';
const description = 'Frontend Developer specializing in <span class="text-primary">Nuxt</span>, <span class="text-primary">Vue</span>, and <span class="text-primary">TypeScript</span>. Creating elegant, performant web experiences inspired by the cosmos.';
const buttonText = 'View My Work';
const backgroundImageUrl = 'https://images.unsplash.com/photo-1642635715930-b3a1eba9c99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWJ1bGElMjBzcGFjZSUyMHN0YXJzfGVufDF8fHx8MTc2MDcwMDY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const scrollToProjects = () => {
  document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
};

// Generate styles for 50 stars
const stars = computed(() => {
  return Array.from({ length: 50 }, () => ({
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.7 + 0.3,
    },
  }));
});
</script>
