<template>
  <section id="about" class="relative py-24 md:py-32 px-6 md:px-12">
    <GlowDivider color="primary" />
    <div class="max-w-6xl mx-auto">
      <header class="reveal mb-14">
        <span class="block font-mono text-[.7rem] tracking-[.24em] uppercase text-primary mb-3.5">01 — Observer's Log</span>
        <h2 class="font-lora font-medium text-foreground text-4xl md:text-5xl leading-tight" style="text-wrap:balance">About Me</h2>
        <div class="h-px mt-6" style="background:linear-gradient(90deg, var(--border), transparent)"></div>
      </header>

      <div class="grid md:grid-cols-[1.1fr_.9fr] gap-12 md:gap-16 items-start">
        <div class="reveal">
          <div class="log flex flex-col gap-5 border-l border-[color:var(--border)] pl-7">
            <p v-for="(p, i) in bio" :key="i" class="relative text-foreground/65 max-w-[52ch]" style="text-wrap:pretty">{{ p }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-10">
            <Badge
              v-for="(value, i) in values"
              :key="i"
              variant="principle"
              :label="value.label"
              :designation="value.desig"
            >
              <template #icon>
                <component :is="value.iconName" />
              </template>
            </Badge>
          </div>
        </div>

        <div class="reveal">
          <GlowImage :src="image.url" :alt="image.alt" caption="FIG.01 — N. Bär & Telescope" tag="Observer" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Badge, GlowImage, GlowDivider } from 'rory-components';
import Me from '../../assets/images/Me.jpg';
import { GlobeAsiaAustraliaIcon, CodeBracketIcon, PaperAirplaneIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline';

const bio = [
  "Hello, I'm Nino — a Software Developer with 8 years of experience at cobra computer's brainware GmbH, a leading CRM software company.",
  "I began as an apprentice, building a strong foundation in backend development with C# and .NET. Today I'm a Frontend Developer building modern, dynamic web applications using Nuxt.js (Vue), TypeScript, and Tailwind CSS.",
  "When I'm not coding, you'll find me stargazing, reading about astrophysics, or playing GeoGuessr.",
];

const values = [
  { iconName: CodeBracketIcon, label: 'Coding', desig: 'OBJ · A' },
  { iconName: GlobeAsiaAustraliaIcon, label: 'Astronomy', desig: 'OBJ · B' },
  { iconName: ComputerDesktopIcon, label: 'Gaming', desig: 'OBJ · C' },
  { iconName: PaperAirplaneIcon, label: 'Traveling', desig: 'OBJ · D' },
];

const image = { url: Me, alt: 'Me and my telescope' };
</script>

<style scoped>
.log p::before {
  content: "▸";
  position: absolute;
  left: -1.65rem;
  top: .35rem;
  font-size: .8rem;
  color: var(--primary);
  opacity: .7;
}
</style>
