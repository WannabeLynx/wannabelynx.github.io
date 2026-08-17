<template>
  <section id="projects" ref="root" class="relative py-24 md:py-32 px-6 md:px-12">
    <GlowDivider color="primary" />
    <div class="max-w-6xl mx-auto">
      <header class="reveal mb-8 flex items-end justify-between gap-6" :class="{ in: revealed }">
        <div>
          <span class="block font-mono text-[.7rem] tracking-[.24em] uppercase text-primary mb-3.5">02 — Star Catalog</span>
          <h2 class="font-lora font-medium text-foreground text-4xl md:text-5xl leading-tight" style="text-wrap:balance">Featured Projects</h2>
        </div>
      </header>

      <div class="h-px mb-8" style="background:linear-gradient(90deg, var(--border), transparent)"></div>

      <div
        ref="track"
        class="carousel-track reveal flex gap-6 overflow-x-auto snap-x snap-mandatory pb-3"
        :class="{ in: revealed, grabbing: isGrabbing }"
        @scroll.passive="onScroll"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
        @pointerenter="onEnter"
        @pointerleave="onLeave"
        @dragstart.prevent
      >
        <div
          v-for="(project, index) in projects"
          :key="index"
          data-slide
          class="slide snap-center shrink-0 w-[80vw] sm:w-[340px]"
          :style="slideStyle(index)"
        >
          <Card
            :image-url="project.image"
            :title="project.title"
            :description="project.description"
            :tags="project.tags"
            :github-url="project.github"
            :demo-url="project.demo"
            :designation="project.desig"
            :type="project.type"
          />
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="Project slides">
        <button
          v-for="(project, index) in projects"
          :key="index"
          type="button"
          class="dot"
          :class="{ active: index === activeIndex }"
          role="tab"
          :aria-selected="index === activeIndex"
          :aria-label="`Go to ${project.title}`"
          @click="goTo(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { GlowDivider, Card } from 'rory-components';
import Polyrhytmic from '../../assets/images/Polyrhytmic.png';
import GuessGame from '../../assets/images/GuessGame.png';
import RoryGraphViewer from '../../assets/images/RoryGraphViewer.png';
import Storybook from '../../assets/images/Storybook.png';
import DualSub from '../../assets/images/DualSub.png';

const projects = [
  {
    desig: 'OBJ-01',
    type: 'Game · Geography',
    title: "Rory's Flag & Domain Quiz",
    description: 'An interactive geography quiz where players identify countries by their flags or domain extensions on a world map.',
    image: GuessGame,
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://coderory.com/guessgame',
  },
  {
    desig: 'OBJ-02',
    type: 'Generative · Audio',
    title: 'Polyrhytmic',
    description: 'A tone triggers as each point completes its loop, creating a mesmerizing and generative musical pattern.',
    image: Polyrhytmic,
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://coderory.com/polyrhythmic',
  },
  {
    desig: 'OBJ-03',
    type: 'Chrome Extension · DX',
    title: 'GraphQL Viewer',
    description: 'A Chrome extension I built for work to help better visualize GraphQL data.',
    image: RoryGraphViewer,
    tags: ['HTML', 'JavaScript'],
    github: 'https://github.com/WannabeLynx/RoryGraphQLViewer',
    demo: 'https://chromewebstore.google.com/detail/rorys-graphql-viewer/fmolodpnmbjgejgbfmjnbhojiokoiijd',
  },
  {
    desig: 'OBJ-04',
    type: 'Chrome Extension · DX',
    title: 'Netflix - Dual Subtitles',
    description: 'A Chrome extension I built to have dual subtitles in Netflix. Uses the official subtitles tracks.',
    image: DualSub,
    tags: ['HTML', 'JavaScript'],
    github: 'https://github.com/WannabeLynx/DualSub',
    demo: 'https://chromewebstore.google.com/detail/dual-subtitles-%E2%80%93-two-lang/lobapcibapolfiefnpgdfaggejpbbhje?authuser=0&hl=de',
  },
  {
    desig: 'OBJ-05',
    type: 'Library · Open Source',
    title: 'Rory Components',
    description: 'My small components library, published to npm. Still adding more.',
    image: Storybook,
    tags: ['Vue', 'CSS', 'TypeScript'],
    github: 'https://github.com/WannabeLynx/RoryComponents',
    demo: 'https://www.npmjs.com/package/rory-components',
  },
];

const AUTO_MS = 4200;

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const activePos = ref(0);
const isGrabbing = ref(false);
const revealed = ref(false);

const activeIndex = computed(() =>
  Math.max(0, Math.min(projects.length - 1, Math.round(activePos.value))),
);
const canPrev = computed(() => activeIndex.value > 0);
const canNext = computed(() => activeIndex.value < projects.length - 1);

let center0 = 0; // content-x of the first card's centre
let step = 0;    // distance between adjacent card centres
let reduced = false;

function slideStyle(i: number) {
  const t = Math.min(Math.abs(i - activePos.value), 1);
  return {
    opacity: (1 - 0.72 * t).toFixed(3),
    transform: `scale(${(1 - 0.12 * t).toFixed(3)})`,
    zIndex: String(100 - Math.round(t * 50)),
  };
}

function measure() {
  const el = track.value;
  if (!el) return;
  const slides = el.querySelectorAll<HTMLElement>('[data-slide]');
  if (!slides.length) return;
  const cardW = slides[0].getBoundingClientRect().width;
  const pad = Math.max(0, (el.clientWidth - cardW) / 2);
  el.style.paddingLeft = `${pad}px`;
  el.style.paddingRight = `${pad}px`;
  const trackLeft = el.getBoundingClientRect().left;
  const r0 = slides[0].getBoundingClientRect();
  center0 = r0.left - trackLeft + el.scrollLeft + r0.width / 2;
  if (slides.length > 1) {
    const r1 = slides[1].getBoundingClientRect();
    step = (r1.left - trackLeft + el.scrollLeft + r1.width / 2) - center0;
  } else {
    step = cardW;
  }
  onScroll();
}

function onScroll() {
  const el = track.value;
  if (!el || !step) return;
  activePos.value = (el.scrollLeft + el.clientWidth / 2 - center0) / step;
}

function goTo(i: number) {
  const el = track.value;
  if (!el || !step) return;
  const idx = Math.max(0, Math.min(projects.length - 1, i));
  el.scrollTo({ left: center0 + idx * step - el.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
}

function go(dir: number) {
  goTo(activeIndex.value + dir);
}

// auto-rotate
let autoTimer: ReturnType<typeof setInterval> | null = null;
let dir = 1;
let hovering = false;
let dragging = false;

function autoStep() {
  const n = projects.length;
  if (n < 2) return;
  if (activeIndex.value >= n - 1) dir = -1;
  else if (activeIndex.value <= 0) dir = 1;
  goTo(activeIndex.value + dir);
}
function startAuto() {
  stopAuto();
  if (reduced || hovering || dragging || projects.length < 2) return;
  autoTimer = setInterval(autoStep, AUTO_MS);
}
function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}

function onEnter() { hovering = true; stopAuto(); }
function onLeave() { hovering = false; if (!dragging) startAuto(); }

// mouse drag
let pointerDown = false;
let startX = 0;
let startScroll = 0;
let pid = 0;

function onDown(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;
  pointerDown = true;
  startX = e.clientX;
  startScroll = track.value?.scrollLeft ?? 0;
  pid = e.pointerId;
}
function onMove(e: PointerEvent) {
  if (!pointerDown || !track.value) return;
  const dx = e.clientX - startX;
  if (!dragging && Math.abs(dx) > 5) {
    dragging = true;
    isGrabbing.value = true;
    stopAuto();
    try { track.value.setPointerCapture(pid); } catch { /* noop */ }
  }
  if (dragging) track.value.scrollLeft = startScroll - dx;
}
function onUp() {
  if (!pointerDown) return;
  pointerDown = false;
  if (dragging) {
    dragging = false;
    isGrabbing.value = false;
    try { track.value?.releasePointerCapture(pid); } catch { /* noop */ }
    goTo(Math.round(activePos.value)); // snap to nearest centre
  }
  if (!hovering) startAuto();
}

let onResize: (() => void) | null = null;
let onVis: (() => void) | null = null;
let revealObserver: IntersectionObserver | null = null;

onMounted(async () => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  await nextTick();
  measure();

  if (root.value && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true;
        revealObserver?.disconnect();
        revealObserver = null;
      }
    }, { threshold: 0.12 });
    revealObserver.observe(root.value);
  } else {
    revealed.value = true;
  }

  onResize = () => measure();
  window.addEventListener('resize', onResize);
  onVis = () => (document.hidden ? stopAuto() : startAuto());
  document.addEventListener('visibilitychange', onVis);
  startAuto();
});

onUnmounted(() => {
  stopAuto();
  revealObserver?.disconnect();
  if (onResize) window.removeEventListener('resize', onResize);
  if (onVis) document.removeEventListener('visibilitychange', onVis);
});
</script>

<style scoped>
.carousel-track {
  scrollbar-width: none;
  -ms-overflow-style: none;
  user-select: none;
  cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g fill='none' stroke='%23F3C969' stroke-width='1.4'><circle cx='16' cy='16' r='9' opacity='.85'/><path d='M16 2v6M16 24v6M2 16h6M24 16h6'/></g><circle cx='16' cy='16' r='1.4' fill='%23F3C969'/></svg>") 16 16, grab;
  /* neighbours fade into the background at the edges */
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 13%, #000 87%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 13%, #000 87%, transparent 100%);
}
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-track.grabbing {
  scroll-snap-type: none;
  cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g fill='none' stroke='%23F3C969' stroke-width='1.7'><circle cx='16' cy='16' r='6.5'/><path d='M16 4v3.5M16 24.5v3.5M4 16h3.5M24.5 16h3.5'/></g><circle cx='16' cy='16' r='2.6' fill='%23F3C969'/></svg>") 16 16, grabbing;
}
.carousel-track :deep(a) { cursor: pointer; }

.slide {
  transform-origin: center;
  will-change: transform, opacity;
}

.nav-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--muted-foreground);
  background: transparent;
  cursor: pointer;
  transition: color .3s var(--ease-stellar), border-color .3s var(--ease-stellar), opacity .3s var(--ease-stellar);
}
.nav-btn:hover:not(:disabled) {
  color: var(--foreground);
  border-color: rgba(var(--primary-rgb), .5);
}
.nav-btn:disabled { opacity: .3; cursor: default; }

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: all .35s var(--ease-stellar);
}
.dot:hover { border-color: rgba(var(--primary-rgb), .6); }
.dot.active {
  width: 22px;
  border-radius: 3px;
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 10px rgba(var(--primary-rgb), .6);
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track { scroll-behavior: auto; }
}
</style>
