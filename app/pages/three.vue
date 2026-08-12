<template>
  <div class="relative z-10 h-screen w-full overflow-hidden">
    <ClientOnly>
      <ThreeShowcase />
      <template #fallback>
        <div class="flex h-full w-full items-center justify-center">
          <p class="text-sm tracking-widest text-white/40">LOADING 3D…</p>
        </div>
      </template>
    </ClientOnly>

    <div class="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
      <h1 class="text-2xl font-semibold text-white md:text-3xl">
        Built with <span class="text-[#64FFDA]">three.js</span>
      </h1>
      <p class="mt-2 text-sm text-white/50">Move your cursor — the camera follows.</p>
      <p class="mt-2 text-sm text-white/50">Work in progress.</p>
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
