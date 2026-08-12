<template>
  <nav
    :aria-label="t('variants.label')"
    class="switcher"
    :style="{ '--sw-accent-rgb': accent }"
  >
    <div ref="segEl" class="seg">
      <span class="pill" :style="{ transform: `translateX(${pill.x}px)`, width: `${pill.w}px` }"></span>
      <NuxtLink
        v-for="(variant, i) in variants"
        :ref="(el) => setLink(el, i)"
        :key="variant.key"
        :to="localePath(variant.to)"
        class="seg-link"
        :class="{ active: i === activeIndex }"
        :aria-current="i === activeIndex ? 'page' : undefined"
      >
        <span class="idx">{{ variant.idx }}</span>{{ t(`variants.${variant.key}`) }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

/* accent is per-variant so the switcher fits whichever page you're on */
const variants = [
  { key: 'modern', to: '/', name: 'index', idx: '01', accent: '243 201 105' }, // starlight gold
  { key: 'space', to: '/space', name: 'space', idx: '02', accent: '94 234 212' }, // cyan-ion
  { key: 'three', to: '/three', name: 'three', idx: '03', accent: '100 255 218' }, // three.js teal
] as const;

const baseRouteName = computed(() => String(route.name ?? '').split('___')[0]);
const activeIndex = computed(() => {
  const i = variants.findIndex((v) => v.name === baseRouteName.value);
  return i === -1 ? 0 : i;
});
const accent = computed(() => variants[activeIndex.value].accent);

/* sliding pill */
const segEl = ref<HTMLElement | null>(null);
const linkEls = ref<HTMLElement[]>([]);
const pill = ref({ x: 0, w: 0 });

const setLink = (el: unknown, i: number): void => {
  const node = el && typeof el === 'object' && '$el' in el ? (el as { $el: HTMLElement }).$el : (el as HTMLElement | null);
  if (node) linkEls.value[i] = node;
};

const measure = (): void => {
  const el = linkEls.value[activeIndex.value];
  const seg = segEl.value;
  if (!el || !seg) return;
  const r = el.getBoundingClientRect();
  const sr = seg.getBoundingClientRect();
  pill.value = { x: r.left - sr.left, w: r.width };
};

watch(activeIndex, () => nextTick(measure));
onMounted(() => {
  nextTick(measure);
  if (typeof document !== 'undefined' && document.fonts?.ready) document.fonts.ready.then(measure);
  window.addEventListener('resize', measure);
});
onBeforeUnmount(() => window.removeEventListener('resize', measure));
</script>

<style scoped>
.switcher {
  position: fixed;
  top: 24px;
  right: 26px;
  z-index: 60;
}
.seg {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  background: rgba(10, 14, 22, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(150, 180, 220, 0.16);
  clip-path: polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.pill {
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  background: linear-gradient(180deg, rgba(var(--sw-accent-rgb), 0.22), rgba(var(--sw-accent-rgb), 0.1));
  border: 1px solid rgba(var(--sw-accent-rgb), 0.55);
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
  box-shadow: 0 0 18px rgba(var(--sw-accent-rgb), 0.28), inset 0 0 12px rgba(var(--sw-accent-rgb), 0.15);
  pointer-events: none;
}
.seg-link {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  font-family: 'Manrope', system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: rgba(232, 240, 251, 0.4);
  transition: color 0.3s;
}
.seg-link .idx {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 9px;
  opacity: 0.6;
}
.seg-link:hover {
  color: rgba(232, 240, 251, 0.72);
}
.seg-link.active {
  color: rgb(var(--sw-accent-rgb));
}
.seg-link.active .idx {
  opacity: 0.9;
}
@media (prefers-reduced-motion: reduce) {
  .pill {
    transition: none;
  }
}
</style>
