<template>
  <div class="console" :class="{ open: isScreenOpen }">
    <div class="console-scrim" @click="close"></div>

    <div class="c-panel" role="dialog" aria-modal="true" :aria-label="head.title">
      <div class="c-head">
        <div>
          <div class="desig mono">{{ head.desig }}</div>
          <h2>{{ head.title }}</h2>
          <div class="sub mono">{{ head.sub }}</div>
        </div>
        <button class="close-x" aria-label="Close" @click="close">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" /></svg>
        </button>
      </div>

      <div class="c-body">
        <!-- ABOUT -->
        <div v-if="displayType === 'about'" class="about-grid">
          <div>
            <div class="log">
              <p v-for="(p, i) in bio" :key="i">{{ p }}</p>
            </div>
            <div class="values">
              <div v-for="v in values" :key="v.k" class="val">
                <div class="k">{{ v.k }}</div>
                <div class="v">{{ v.v }}</div>
              </div>
            </div>
          </div>
          <div>
            <div class="readout">
              <div v-for="row in readout" :key="row.l" class="row">
                <span class="l">{{ row.l }}</span>
                <span class="r" :class="{ hi: row.hi }">{{ row.v }}</span>
              </div>
            </div>
            <figure class="portrait">
              <img :src="portrait" alt="Nino Bär and his telescope" loading="lazy" />
              <figcaption>FIG.01 — N. Bär &amp; Telescope</figcaption>
            </figure>
          </div>
        </div>

        <!-- PROJECTS -->
        <div v-else-if="displayType === 'projects'" class="proj-grid">
          <div v-for="p in projects" :key="p.no" class="proj">
            <div class="p-top"><span class="p-no">{{ p.no }}</span><span class="p-type">{{ p.type }}</span></div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="tags"><span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span></div>
            <div class="p-links">
              <a v-for="l in p.links" :key="l.label" :href="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a>
            </div>
          </div>
        </div>

        <!-- TECH -->
        <div v-else-if="displayType === 'tech'" class="tech-grid">
          <div v-for="cat in tech" :key="cat.category" class="tcat">
            <h3>{{ cat.category }}<span class="c">{{ pad(cat.items.length) }}</span></h3>
            <div v-for="(name, i) in cat.items" :key="name" class="trow">
              <span class="nm">{{ name }}</span>
              <span class="id">{{ cat.prefix }}·{{ pad(i + 1) }}</span>
            </div>
          </div>
        </div>

        <!-- CONTACT -->
        <div v-else-if="displayType === 'contact'" class="comm">
          <a v-for="l in links" :key="l.label" class="link-card" :href="l.url" target="_blank" rel="noopener">
            <span class="ic"><component :is="l.icon" /></span>
            <span class="meta"><span class="lbl">{{ l.label }}</span><span v-if="l.hint" class="h">{{ l.hint }}</span></span>
          </a>
          <div class="comm-note">
            <b>ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของผม</b> — Thank you for visiting. The message console isn't wired yet; the channels above are the live uplink.
          </div>
          <div class="c-foot">
            Built with Nuxt V4 &amp; Tailwind V4<br />
            <span class="star">✦</span> © {{ year }} Nino Bär — All rights reserved
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoryStore } from '~/stores/roryStore';
import Me from '../../../assets/images/Me.jpg';

const roryStore = useRoryStore();
const isScreenOpen = computed(() => roryStore.isScreenOpen);

const displayType = ref('');
watch(
  () => roryStore.screenType,
  (t) => { if (t) displayType.value = t; },
  { immediate: true },
);

const close = (): void => roryStore.onCloseScreen();

const HEADS: Record<string, { desig: string; title: string; sub: string }> = {
  about: { desig: 'LOG-01 · OBSERVER', title: 'Observer Log', sub: 'ABOUT // NINO BÄR' },
  projects: { desig: 'OBJ-02 · PAYLOAD', title: 'Payload Manifest', sub: 'PROJECTS // 04 OBJECTS CATALOGUED' },
  tech: { desig: 'SPEC-03 · SPECTRUM', title: 'Spectral Analysis', sub: 'TECH STACK // INSTRUMENT READOUT' },
  contact: { desig: 'COM-04 · UPLINK', title: 'Comms Uplink', sub: 'CONTACT // CHANNELS OPEN' },
};
const head = computed(() => HEADS[displayType.value] ?? { desig: '', title: '', sub: '' });

const pad = (n: number) => String(n).padStart(2, '0');
const portrait = Me;
const year = new Date().getFullYear();

const bio = [
  "Hello, I'm Nino — a Software Developer with 8 years of experience at cobra GmbH, a leading CRM software company.",
  "I began as an apprentice, building a strong foundation in backend development with C# and .NET. Today I'm a Frontend Developer building modern, dynamic web applications using Nuxt.js (Vue), TypeScript, and Tailwind CSS.",
  "When I'm not coding, you'll find me stargazing, reading about astrophysics, or playing GeoGuessr.",
];
const values = [
  { k: 'OBJ · A', v: 'Coding' },
  { k: 'OBJ · B', v: 'Astronomy' },
  { k: 'OBJ · C', v: 'Gaming' },
  { k: 'OBJ · D', v: 'Traveling' },
];
const readout = [
  { l: 'DESIGNATION', v: 'Nino Bär' },
  { l: 'ROLE', v: 'Frontend Developer', hi: true },
  { l: 'STATION', v: 'cobra GmbH · CRM' },
  { l: 'EXPERIENCE', v: '8 Years', hi: true },
  { l: 'ORIGIN', v: 'C# · .NET' },
  { l: 'FOCUS', v: 'Nuxt · TypeScript' },
];

const projects = [
  {
    no: 'OBJ-01', type: 'Game · Geography', title: "Rory's Flag & Domain Quiz",
    desc: 'An interactive geography quiz where players identify countries by their flags or domain extensions on a world map.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Demo', url: 'https://coderory.com/guessgame' }],
  },
  {
    no: 'OBJ-02', type: 'Generative · Audio', title: 'Polyrhytmic',
    desc: 'A tone triggers as each point completes its loop, creating a mesmerizing and generative musical pattern.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Demo', url: 'https://coderory.com/polyrhythmic' }],
  },
  {
    no: 'OBJ-03', type: 'Chrome Extension · DX', title: 'GraphQL Viewer',
    desc: 'A Chrome extension I built for work to help better visualize GraphQL data.',
    tags: ['HTML', 'JavaScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/WannabeLynx/RoryGraphQLViewer' },
      { label: 'Store', url: 'https://chromewebstore.google.com/detail/rorys-graphql-viewer/fmolodpnmbjgejgbfmjnbhojiokoiijd' },
    ],
  },
  {
    no: 'OBJ-04', type: 'Library · Open Source', title: 'Rory Components',
    desc: 'My small components library, published to npm. Still adding more.',
    tags: ['Vue', 'CSS', 'TypeScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/WannabeLynx/RoryComponents' },
      { label: 'npm', url: 'https://www.npmjs.com/package/rory-components' },
    ],
  },
];

const tech = [
  { category: 'Frontend', prefix: 'FE', items: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Pinia', 'Vite'] },
  { category: 'Tooling', prefix: 'TL', items: ['Git', 'npm / pnpm', 'ESLint', 'Vitest', 'Docker', 'CI / CD'] },
];

const stroke = (children: unknown[]) =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, children);

const GithubIcon = () => stroke([h('path', { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4.8 4.8 4.8 0 0 0 18.9 1S17.7.6 15 2.5a13.4 13.4 0 0 0-7 0C5.3.6 4.1 1 4.1 1A4.8 4.8 0 0 0 4 4.8 5.2 5.2 0 0 0 2.6 8.4c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 17.7V22' })]);
const LinkedinIcon = () => stroke([h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z' }), h('rect', { x: '2', y: '9', width: '4', height: '12' }), h('circle', { cx: '4', cy: '4', r: '2' })]);
const MailIcon = () => stroke([h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }), h('path', { d: 'm22 7-10 6L2 7' })]);
const InstagramIcon = () => stroke([h('rect', { x: '2.5', y: '2.5', width: '19', height: '19', rx: '5' }), h('circle', { cx: '12', cy: '12', r: '4.2' }), h('circle', { cx: '17.4', cy: '6.6', r: '1', fill: 'currentColor', stroke: 'none' })]);
const SteamIcon = () => stroke([h('circle', { cx: '12', cy: '12', r: '10' }), h('circle', { cx: '15', cy: '9', r: '2.6' }), h('circle', { cx: '8.5', cy: '14.5', r: '2' }), h('path', { d: 'm10.5 13.5 3-3M2.5 13l4 2' })]);

const links = [
  { label: 'GitHub', hint: '@WannabeLynx', url: 'https://github.com/WannabeLynx', icon: GithubIcon },
  { label: 'LinkedIn', hint: 'nino-baer', url: 'https://linkedin.com/in/nino-baer/', icon: LinkedinIcon },
  { label: 'Email', hint: 'ninoleonbaer@gmail.com', url: 'mailto:ninoleonbaer@gmail.com', icon: MailIcon },
  { label: 'Instagram', hint: '@wannabelynx', url: 'https://www.instagram.com/wannabelynx', icon: InstagramIcon },
  { label: 'Steam', hint: 'wannabelynx', url: 'https://steamcommunity.com/id/wannabelynx', icon: SteamIcon },
];

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>
