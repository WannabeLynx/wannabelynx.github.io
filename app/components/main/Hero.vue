<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-28 md:pt-24 pb-20">
    <div class="w-full max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
      <div>
        <p class="font-lora italic text-lg text-foreground/60 mb-4">{{ greeting }}</p>

        <h1 class="relative font-lora font-semibold text-foreground leading-[.95] tracking-tight text-6xl md:text-7xl lg:text-8xl" style="text-wrap:balance">
          <span class="absolute -left-[8%] -top-[40%] w-[70%] h-[180%] -z-10 pointer-events-none"
                style="background:radial-gradient(ellipse at center, rgba(243,201,105,.16), transparent 62%); filter:blur(8px)"></span>
          {{ name }}<span class="text-primary align-super text-[.5em] ml-1">✦</span>
        </h1>

        <p class="font-lora italic text-foreground/70 mt-6 text-3xl md:text-4xl lg:text-5xl">{{ tagline }}</p>

        <p class="text-foreground/60 mt-5 text-lg max-w-[34ch]" style="text-wrap:pretty">
          Frontend Developer specializing in <span class="text-primary">Nuxt</span> and <span class="text-primary">TypeScript</span>.
        </p>

        <div class="mt-9">
          <Button variant="glow" size="lg" @click="scrollToProjects">
            View my work <span class="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
          </Button>
        </div>
      </div>

      <!-- constellation -->
      <div class="hidden md:block">
        <svg class="constellation w-full h-auto overflow-visible" :class="{ drawn }" viewBox="0 0 360 300" role="img" aria-label="Career facts constellation">
          <polyline class="cline" points="60,70 150,40 250,110 300,60" fill="none" stroke="rgba(150,180,220,.22)" stroke-width="1" />
          <polyline class="cline" points="150,40 180,150 90,210" fill="none" stroke="rgba(150,180,220,.22)" stroke-width="1" />
          <polyline class="cline" points="180,150 300,200" fill="none" stroke="rgba(150,180,220,.22)" stroke-width="1" />

          <circle cx="150" cy="40" r="10" fill="rgba(243,201,105,.18)" />
          <circle cx="150" cy="40" r="3.2" fill="var(--primary)" />
          <text x="160" y="34" class="cfact key">Frontend</text>

          <circle cx="60" cy="70" r="2.4" fill="var(--foreground)" />
          <text x="14" y="66" class="cfact">Vue · Nuxt</text>

          <circle cx="300" cy="60" r="9" fill="rgba(243,201,105,.18)" />
          <circle cx="300" cy="60" r="3" fill="var(--primary)" />
          <text x="240" y="52" class="cfact key">8 Years</text>

          <circle cx="250" cy="110" r="2.4" fill="var(--foreground)" />
          <text x="258" y="114" class="cfact">TypeScript</text>

          <circle cx="180" cy="150" r="2.6" fill="var(--foreground)" />
          <text x="190" y="154" class="cfact">@ cobra CRM</text>

          <circle cx="90" cy="210" r="2.4" fill="var(--foreground)" />
          <text x="30" y="228" class="cfact">C# · .NET</text>

          <circle cx="300" cy="200" r="9" fill="rgba(243,201,105,.18)" />
          <circle cx="300" cy="200" r="3" fill="var(--primary)" />
          <text x="232" y="222" class="cfact key">Astronomy</text>
        </svg>
      </div>
    </div>

    <!-- scroll -->
    <div class="absolute left-1/2 bottom-9 -translate-x-1/2 flex flex-col items-center gap-2.5">
      <span class="w-px h-8 stellar-anim" style="background:linear-gradient(var(--primary), transparent); animation:stellar-drop 2.4s var(--ease-stellar) infinite"></span>
      <span class="font-mono text-[.6rem] tracking-[.28em] uppercase text-foreground/40">Scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from 'rory-components';

const greeting = 'สวัสดีครับ ผมชื่อ';
const name = 'Nino Bär';
const tagline = 'I build things for the web.';

const drawn = ref(false);
onMounted(() => { requestAnimationFrame(() => { drawn.value = true; }); });

const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.cfact { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .12em; fill: var(--muted-foreground); text-transform: uppercase; }
.cfact.key { fill: var(--foreground); }
</style>
