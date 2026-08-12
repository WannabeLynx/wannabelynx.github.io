<template>
  <nav class="index-rail" aria-label="Section index">
    <a href="#hero" class="rail-brand" aria-label="Top">
      NB<span class="brand-star" aria-hidden="true">✦</span>
    </a>

    <div class="rail-nav">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="rail-link"
        :class="{ active: active === item.id }"
        :aria-current="active === item.id ? 'true' : undefined"
      >
        <span class="dot" aria-hidden="true"></span>
        <span class="lbl"><span class="num">{{ item.n }}</span> · {{ item.label }}</span>
      </a>
    </div>

    <div class="rail-foot" aria-hidden="true">{{ progress }}%</div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const items = [
  { n: '00', label: 'Home', id: 'hero' },
  { n: '01', label: 'About', id: 'about' },
  { n: '02', label: 'Work', id: 'projects' },
  { n: '03', label: 'Stack', id: 'stack' },
  { n: '04', label: 'Contact', id: 'contact' },
];

const active = ref('hero');
const progress = ref('00');
let onScroll: (() => void) | null = null;

onMounted(() => {
  const sections = items
    .map((i) => document.getElementById(i.id))
    .filter((el): el is HTMLElement => !!el);

  onScroll = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = active.value;
    for (const s of sections) if (s.offsetTop <= y) cur = s.id;
    active.value = cur;
    const max = document.body.scrollHeight - window.innerHeight;
    progress.value = String(Math.min(99, Math.max(0, Math.round((window.scrollY / (max || 1)) * 100)))).padStart(2, '0');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => { if (onScroll) window.removeEventListener('scroll', onScroll); });
</script>

<style scoped>
.index-rail {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 88px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 0;
  border-right: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(4,7,14,.9), rgba(4,7,14,.55));
  backdrop-filter: blur(6px);
}
.rail-brand {
  position: relative;
  font-family: var(--font-lora);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--foreground);
  text-decoration: none;
  letter-spacing: .02em;
}
.brand-star { position: absolute; top: -8px; right: -11px; font-size: .6rem; color: var(--primary); }

.rail-nav { margin: auto 0; display: flex; flex-direction: column; position: relative; }
.rail-nav::before {
  content: ""; position: absolute; left: 50%; top: 6px; bottom: 6px;
  width: 1px; background: var(--border); transform: translateX(-.5px);
}
.rail-link {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 16px 0; text-decoration: none;
  color: var(--muted-foreground);
  font-family: var(--font-mono); font-size: .62rem; letter-spacing: .16em;
  transition: color .3s var(--ease-stellar);
}
.rail-link .dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: transparent; border: 1px solid var(--border); z-index: 1;
  transition: all .3s var(--ease-stellar);
}
.rail-link .lbl { writing-mode: vertical-rl; transform: rotate(180deg); text-transform: uppercase; }
.rail-link:hover { color: var(--foreground); }
.rail-link:hover .dot { border-color: var(--primary); }
.rail-link.active { color: var(--primary); }
.rail-link.active .dot { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 12px rgba(var(--primary-rgb), .7); }

.rail-foot { font-family: var(--font-mono); font-size: .58rem; letter-spacing: .1em; color: var(--muted-foreground); }

@media (max-width: 1024px) {
  .index-rail {
    flex-direction: row; top: 0; bottom: auto; left: 0; right: 0;
    width: 100%; height: 54px; padding: 0 16px;
    border-right: 0; border-bottom: 1px solid var(--border);
    justify-content: space-between;
  }
  .rail-nav { flex-direction: row; margin: 0; gap: .1rem; }
  .rail-nav::before { display: none; }
  .rail-link { flex-direction: row; padding: 8px 9px; }
  .rail-link .lbl { writing-mode: horizontal-tb; transform: none; }
  .rail-link .lbl { font-size: 0; }
  .rail-link .num { font-size: .62rem; }
  .rail-foot { display: none; }
}
</style>
