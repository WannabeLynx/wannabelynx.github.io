<template>
  <canvas ref="canvas" class="fixed inset-0 z-0 block pointer-events-none" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;
let cleanup: (() => void) | null = null;

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, DPR = 1, t = 0, scrollY = 0, motion = !reduce;

  type Star = { x: number; y: number; r: number; depth: number; base: number; tw: number; sp: number; gold: boolean };
  let stars: Star[] = [];

  const build = () => {
    const n = Math.round((window.innerWidth * window.innerHeight) / 6500);
    stars = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (Math.random() * 1.1 + 0.25) * DPR,
      depth: Math.random() * 0.6 + 0.15,
      base: Math.random() * 0.5 + 0.2,
      tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.6 + 0.2,
      gold: i % 23 === 0,
    }));
  };

  const size = () => {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = el.width = window.innerWidth * DPR;
    H = el.height = window.innerHeight * DPR;
    el.style.width = window.innerWidth + 'px';
    el.style.height = window.innerHeight + 'px';
    build();
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const tw = motion ? Math.sin(t * s.sp + s.tw) * 0.35 + 0.65 : 1;
      const a = s.base * tw;
      let y = (s.y - scrollY * s.depth * DPR * 0.15) % H;
      if (y < 0) y += H;
      ctx.beginPath();
      ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold ? `rgba(243,201,105,${a})` : `rgba(234,240,250,${a})`;
      ctx.fill();
    }
    if (motion) { t += 0.016; raf = requestAnimationFrame(draw); }
  };

  const onScroll = () => { scrollY = window.scrollY; if (!motion) draw(); };
  const onResize = () => { size(); draw(); };

  size();
  draw();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };
});

onUnmounted(() => { cleanup?.(); });
</script>
