<template>
  <div class="relative z-10 h-screen w-full overflow-hidden bg-[#070b14]">
    <ClientOnly>
      <ThreeShowcase />
      <template #fallback>
        <div class="flex h-full w-full items-center justify-center">
          <p class="font-mono text-sm tracking-widest text-white/40">LOADING OBSERVATORY…</p>
        </div>
      </template>
    </ClientOnly>

    <div class="pointer-events-none absolute left-6 top-6 z-10">
      <p class="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#f3c969]">
        Observatory — WIP
      </p>
      <h1 class="sr-only">Nino Bär — 3D Observatory built with three.js</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThreeShowcase from '~/components/three/ThreeShowcase.vue';

useSeoMeta({
  title: 'Nino Bär — Frontend Developer · 3D',
  ogTitle: 'Nino Bär · 3D',
  ogUrl: 'https://wannabelynx.github.io/three',
});
useHead({ link: [{ rel: 'canonical', href: 'https://wannabelynx.github.io/three' }] });
</script>
