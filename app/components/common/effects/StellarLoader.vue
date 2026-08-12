<template>
  <div
    v-if="visible"
    class="stellar-loader"
    :class="{ done }"
    role="progressbar"
    aria-label="Loading portfolio"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(pct)"
    :style="coverStyle"
  >
    <canvas ref="starsCanvas" class="loader-stars" aria-hidden="true" />

    <div class="instrument">
      <!-- reticle -->
      <div class="reticle" aria-hidden="true">
        <svg viewBox="0 0 220 220" role="img" aria-label="Telescope reticle calibrating">
          <g class="spin-cw">
            <circle class="ring-line" cx="110" cy="110" r="100"
                    stroke="rgba(150,180,220,.20)" stroke-width="1" stroke-dasharray="1.5 9" />
          </g>
          <g class="spin-ccw">
            <circle class="ring-line" cx="110" cy="110" r="82"
                    stroke="rgba(243,201,105,.30)" stroke-width="1" stroke-dasharray="1 7" />
            <line v-for="(t, i) in ticks" :key="i"
                  :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
                  :class="['tick', { cardinal: t.cardinal }]" />
          </g>
          <circle class="ring-line" cx="110" cy="110" r="58"
                  stroke="rgba(150,180,220,.14)" stroke-width="1" />
          <g stroke="rgba(243,201,105,.5)" stroke-width="1">
            <line x1="110" y1="34" x2="110" y2="92" />
            <line x1="110" y1="128" x2="110" y2="186" />
            <line x1="34" y1="110" x2="92" y2="110" />
            <line x1="128" y1="110" x2="186" y2="110" />
          </g>
          <g class="orbit">
            <circle cx="110" cy="10" r="2.6" fill="var(--primary)" />
            <circle cx="110" cy="10" r="6" fill="none" stroke="rgba(243,201,105,.35)" stroke-width="1" />
          </g>
        </svg>
        <div class="core">
          <span class="core-bloom" />
          <span class="core-star">✦</span>
        </div>
      </div>

      <!-- readout -->
      <div class="readout">
        <div class="readout-head">
          <b>NB</b><span>·</span>Stellar Cartography
          <span class="star">✦</span>
        </div>
        <div class="log" aria-live="polite">
          <div v-for="line in logView" :key="line.label"
               :class="['log-line', line.passed ? 'passed' : 'current']">
            <span class="mark">{{ line.mark }}</span>
            <span>{{ line.label }}<span v-if="line.current && !allDone" class="cursor">_</span></span>
          </div>
        </div>
        <div class="meter">
          <div class="track"><div class="fill" :style="{ width: pct + '%' }" /></div>
          <div class="pct">{{ pctLabel }}<span class="sign">%</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoryStore } from '~/stores/roryStore';

const rory = useRoryStore();
const REPLAY: 'load' | 'session' | 'once' = 'load';

const visible = ref(true);
const done = ref(false);
const allDone = ref(false);
const pct = ref(0);

const coverStyle = {
  position: 'fixed',
  inset: '0',
  zIndex: '99999',
  display: 'grid',
  placeItems: 'center',
  background: 'radial-gradient(120% 90% at 50% 38%, #0b1223 0%, #070b14 62%)',
} as const;

const steps = [
  { label: 'Initializing observatory' },
  { label: 'Loading typefaces' },
  { label: 'Acquiring starfield' },
  { label: 'Rendering catalog' },
  { label: 'Calibrating scroll' },
  { label: 'Alignment complete' },
];
const stepAt = [0, 20, 44, 68, 88, 100]; // % thresholds
const curStep = ref(0);

const pctLabel = computed(() =>
  String(Math.min(100, Math.round(pct.value))).padStart(2, '0')
);

const logView = computed(() => {
  const out: { label: string; mark: string; passed: boolean; current: boolean }[] = [];
  for (let i = 0; i <= curStep.value; i++) {
    const passed = i < curStep.value;
    out.push({ label: steps[i].label, mark: passed ? '✓' : '►', passed, current: i === curStep.value });
  }
  return out.slice(-3);
});

// deterministic reticle ticks (no Math.random → SSR-safe)
const ticks = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  const cardinal = i % 6 === 0;
  const r1 = cardinal ? 74 : 78, r2 = 88;
  return {
    x1: +(110 + Math.cos(a) * r1).toFixed(2),
    y1: +(110 + Math.sin(a) * r1).toFixed(2),
    x2: +(110 + Math.cos(a) * r2).toFixed(2),
    y2: +(110 + Math.sin(a) * r2).toFixed(2),
    cardinal,
  };
});

const starsCanvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;
let starRaf = 0;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let onKey: ((e: KeyboardEvent) => void) | null = null;
let onWinLoad: (() => void) | null = null;
let starCleanup: (() => void) | null = null;
let scrollLocked = false;

const lockScroll = (on: boolean) => {
  if (typeof document === 'undefined') return;
  document.documentElement.style.overflow = on ? 'hidden' : '';
  scrollLocked = on;
};

function revealScroll() {
  if (typeof window === 'undefined') return;
  let y = 0;
  const hash = window.location.hash;
  if (hash.length > 1) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) y = Math.max(0, el.getBoundingClientRect().top + window.scrollY);
  }
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  html.style.scrollBehavior = prev;
}

function finish() {
  if (done.value) return;
  done.value = true;
  allDone.value = true;
  pct.value = 100;
  curStep.value = steps.length - 1;
  cancelAnimationFrame(raf);
  lockScroll(false);
  revealScroll();
  rory.setSiteLoaded();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  hideTimer = setTimeout(() => {
    visible.value = false;
    cancelAnimationFrame(starRaf);
  }, reduce ? 380 : 1250); // outlast the CSS fade (1.1s)
}

onMounted(() => {
  // Own the scroll position so a hard refresh never restores the previous one.
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch { /* noop */ }

  try {
    if (REPLAY === 'session' && sessionStorage.getItem('nb_loader_seen')) { visible.value = false; rory.setSiteLoaded(); requestAnimationFrame(revealScroll); return; }
    if (REPLAY === 'once' && localStorage.getItem('nb_loader_seen')) { visible.value = false; rory.setSiteLoaded(); requestAnimationFrame(revealScroll); return; }
    if (REPLAY === 'session') sessionStorage.setItem('nb_loader_seen', '1');
    if (REPLAY === 'once') localStorage.setItem('nb_loader_seen', '1');
  } catch { /* storage blocked — just show it */ }

  window.scrollTo(0, 0);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lockScroll(true);

  let fontsReady = false;
  let winLoaded = document.readyState === 'complete';
  const imgs = Array.from(document.images);
  const imgTotal = imgs.length;
  let imgDone = imgs.filter((i) => i.complete).length;

  if ((document as Document).fonts?.ready) {
    (document as Document).fonts.ready.then(() => { fontsReady = true; });
  } else {
    fontsReady = true;
  }

  const onImg = () => { imgDone = Math.min(imgTotal, imgDone + 1); };
  imgs.forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', onImg, { once: true });
      img.addEventListener('error', onImg, { once: true });
    }
  });

  if (!winLoaded) {
    onWinLoad = () => { winLoaded = true; };
    window.addEventListener('load', onWinLoad, { once: true });
  }

  // starfield
  const cv = starsCanvas.value;
  if (cv) {
    const cx = cv.getContext('2d');
    if (cx) {
      let W = 0, H = 0, DPR = 1, t = 0;
      type S = { x: number; y: number; r: number; base: number; tw: number; sp: number; gold: boolean };
      let stars: S[] = [];
      const build = () => {
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = cv.width = window.innerWidth * DPR;
        H = cv.height = window.innerHeight * DPR;
        cv.style.width = window.innerWidth + 'px';
        cv.style.height = window.innerHeight + 'px';
        const n = Math.round((window.innerWidth * window.innerHeight) / 9000);
        stars = Array.from({ length: n }, (_, k) => ({
          x: Math.random() * W, y: Math.random() * H,
          r: (Math.random() * 1.1 + 0.25) * DPR,
          base: Math.random() * 0.5 + 0.2,
          tw: Math.random() * Math.PI * 2, sp: Math.random() * 0.6 + 0.2,
          gold: k % 23 === 0,
        }));
      };
      const drawStars = () => {
        cx.clearRect(0, 0, W, H);
        for (const s of stars) {
          const a = s.base * (reduce ? 1 : Math.sin(t * s.sp + s.tw) * 0.35 + 0.65);
          cx.beginPath();
          cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          cx.fillStyle = s.gold ? `rgba(243,201,105,${a})` : `rgba(234,240,250,${a})`;
          cx.fill();
        }
        if (!reduce) { t += 0.016; starRaf = requestAnimationFrame(drawStars); }
      };
      const onResize = () => { build(); if (reduce) drawStars(); };
      build();
      drawStars();
      window.addEventListener('resize', onResize);
      starCleanup = () => window.removeEventListener('resize', onResize);
    }
  }

  // ── progress engine ────────────────────────────────────────────────
  const start = performance.now();
  const MIN = reduce ? 700 : 2800; // on-screen time
  const MAX = 13000;               // safety

  const readinessCeil = () => {
    let target = 6;
    if (fontsReady) target += 22;
    target += imgTotal ? (imgDone / imgTotal) * 48 : 48;
    if (winLoaded) target = Math.max(target, 94);
    return Math.min(99, target);
  };

  const frame = (now: number) => {
    if (done.value) return;
    const elapsed = now - start;
    const ready = fontsReady && winLoaded && imgDone >= imgTotal;

    const timed = Math.min(99, (elapsed / MIN) * 99);
    let target = Math.min(readinessCeil(), timed);
    if ((ready && elapsed >= MIN) || elapsed >= MAX) target = 100;

    let next = pct.value + (target - pct.value) * 0.12;
    if (target === 100) next = Math.max(next, pct.value + 0.7);
    if (next > target) next = target;
    pct.value = next;

    const rp = Math.round(next);
    for (let i = stepAt.length - 1; i >= 0; i--) {
      if (rp >= stepAt[i] && i > curStep.value) { curStep.value = i; break; }
    }

    if (next >= 99.5 && target === 100) { finish(); return; }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  cancelAnimationFrame(starRaf);
  if (hideTimer) clearTimeout(hideTimer);
  if (onKey) window.removeEventListener('keydown', onKey);
  if (onWinLoad) window.removeEventListener('load', onWinLoad);
  starCleanup?.();
  if (scrollLocked) lockScroll(false);
});
</script>

<style scoped>
.stellar-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: radial-gradient(120% 90% at 50% 38%, #0b1223 0%, var(--background, #070b14) 62%);
  transition:
    opacity 1.1s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 1.1s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 1.1s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1));
}
.stellar-loader.done {
  opacity: 0;
  transform: scale(1.045);
  filter: blur(6px);
  pointer-events: none;
}

.loader-stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

.instrument {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(26px, 5vh, 46px);
  padding: 24px;
  width: min(92vw, 440px);
}

/* reticle */
.reticle { position: relative; width: clamp(190px, 46vw, 262px); aspect-ratio: 1; }
.reticle svg { width: 100%; height: 100%; overflow: visible; display: block; }
.ring-line { fill: none; }
.spin-cw  { transform-origin: 110px 110px; animation: sl-spin 54s linear infinite; }
.spin-ccw { transform-origin: 110px 110px; animation: sl-spin 40s linear infinite reverse; }
.orbit    { transform-origin: 110px 110px; animation: sl-spin 9s linear infinite; }
@keyframes sl-spin { to { transform: rotate(360deg); } }
.tick { stroke: rgba(150, 180, 220, .28); stroke-width: 1; }
.tick.cardinal { stroke: rgba(243, 201, 105, .55); stroke-width: 1.2; }

.core { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
.core-bloom {
  position: absolute; width: 58%; aspect-ratio: 1; border-radius: 50%;
  background: radial-gradient(circle, rgba(243, 201, 105, .28), transparent 66%);
  filter: blur(6px);
  animation: sl-breathe 3.4s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1)) infinite;
}
.core-star {
  position: relative;
  font-family: var(--font-lora, 'Lora', serif);
  font-size: clamp(28px, 7vw, 40px);
  line-height: 1;
  color: var(--primary, #f3c969);
  text-shadow: 0 0 14px rgba(243, 201, 105, .55);
  animation: sl-breathe 3.4s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1)) infinite;
}
@keyframes sl-breathe { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }

/* readout */
.readout {
  width: 100%;
  border: 1px solid var(--border, rgba(150, 180, 220, .16));
  border-radius: var(--radius, 2px);
  background: var(--card, rgba(12, 18, 32, .6));
  backdrop-filter: blur(6px);
  padding: 16px 18px 18px;
}
.readout-head {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-mono, 'IBM Plex Mono', monospace);
  font-size: .62rem; letter-spacing: .24em; text-transform: uppercase;
  color: var(--muted-foreground, rgba(234, 241, 250, .55));
  padding-bottom: 12px; margin-bottom: 12px;
  border-bottom: 1px solid var(--border, rgba(150, 180, 220, .16));
}
.readout-head b { color: var(--foreground, #eaf0fa); font-weight: 600; letter-spacing: .12em; }
.readout-head .star { color: var(--primary, #f3c969); margin-left: auto; font-size: .7rem; }

.log {
  font-family: var(--font-mono, 'IBM Plex Mono', monospace);
  font-size: .66rem; letter-spacing: .1em; text-transform: uppercase;
  min-height: 3.9em;
  display: flex; flex-direction: column; justify-content: flex-end; gap: 4px;
}
.log-line { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.log-line .mark { width: .9em; text-align: center; flex: none; }
.log-line.passed { color: var(--muted-foreground, rgba(234, 241, 250, .55)); }
.log-line.passed .mark { color: var(--secondary, #74e3c8); }
.log-line.current { color: var(--foreground, #eaf0fa); }
.log-line.current .mark { color: var(--primary, #f3c969); }
.cursor { color: var(--primary, #f3c969); animation: sl-blink 1s steps(1) infinite; }
@keyframes sl-blink { 50% { opacity: 0; } }

.meter { display: flex; align-items: center; gap: 14px; margin-top: 16px; }
.track {
  position: relative; flex: 1; height: 2px;
  background: rgba(150, 180, 220, .14); border-radius: 2px;
}
.fill {
  position: absolute; inset: 0 auto 0 0; width: 0;
  background: linear-gradient(90deg, rgba(243, 201, 105, .5), var(--primary, #f3c969));
  border-radius: 2px;
}
.fill::after {
  content: ""; position: absolute; right: -1px; top: 50%;
  width: 5px; height: 5px; transform: translateY(-50%); border-radius: 50%;
  background: var(--primary, #f3c969);
  box-shadow: 0 0 8px 1px rgba(243, 201, 105, .8);
}
.pct {
  font-family: var(--font-mono, 'IBM Plex Mono', monospace);
  font-variant-numeric: tabular-nums;
  font-size: 1.5rem; letter-spacing: .02em;
  color: var(--primary, #f3c969);
  min-width: 3.4ch; text-align: right;
}
.pct .sign { font-size: .8rem; color: var(--muted-foreground, rgba(234, 241, 250, .55)); margin-left: 2px; }

.skip {
  position: fixed; bottom: 22px; right: 24px; z-index: 3;
  background: none;
  border: 1px solid var(--border, rgba(150, 180, 220, .16));
  border-radius: var(--radius, 2px);
  color: var(--muted-foreground, rgba(234, 241, 250, .55));
  font-family: var(--font-mono, 'IBM Plex Mono', monospace);
  font-size: .58rem; letter-spacing: .22em; text-transform: uppercase;
  padding: 7px 12px; cursor: pointer;
  transition:
    color .3s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1)),
    border-color .3s var(--ease-stellar, cubic-bezier(0.22, 1, 0.36, 1));
}
.skip:hover { color: var(--foreground, #eaf0fa); border-color: rgba(243, 201, 105, .5); }
.skip .k { color: var(--primary, #f3c969); }

@media (prefers-reduced-motion: reduce) {
  .spin-cw, .spin-ccw, .orbit, .core-bloom, .core-star, .cursor { animation: none !important; }
  .stellar-loader { transition: opacity .3s ease; }
  .stellar-loader.done { transform: none; filter: none; }
}
</style>
