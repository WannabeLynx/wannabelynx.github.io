<template>
  <section id="stack" class="relative py-24 md:py-32 px-6 md:px-12">
    <GlowDivider color="primary" />
    <div class="max-w-6xl mx-auto">
      <header class="reveal mb-14">
        <span class="block font-mono text-[.7rem] tracking-[.24em] uppercase text-primary mb-3.5">03 — Instrument Readout</span>
        <h2 class="font-lora font-medium text-foreground text-4xl md:text-5xl leading-tight" style="text-wrap:balance">My Toolkit</h2>
        <div class="h-px mt-6" style="background:linear-gradient(90deg, var(--border), transparent)"></div>
      </header>

      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        <div v-for="category in techCategories" :key="category.category" class="reveal border border-[color:var(--border)] rounded-[2px] bg-[color:var(--popover)]">
          <h3 class="flex items-center justify-between px-5 py-4 border-b border-[color:var(--border)] font-mono text-[.72rem] tracking-[.22em] uppercase text-primary">
            {{ category.category }}
            <span class="text-foreground/40">{{ String(category.technologies.length).padStart(2, '0') }}</span>
          </h3>
          <div class="py-1.5">
            <div
              v-for="(tech, i) in category.technologies"
              :key="tech.name"
              class="group flex items-center gap-3.5 px-5 py-3 border-b border-[rgba(150,180,220,0.05)] last:border-b-0 transition-colors hover:bg-primary/[0.045]"
            >
              <span class="w-5 h-5 flex-none text-foreground/55 group-hover:text-primary transition-colors [&_svg]:w-5 [&_svg]:h-5">
                <component :is="getIconComponent(tech.iconName)" />
              </span>
              <span class="text-foreground text-[.95rem]">{{ tech.name }}</span>
              <span class="ml-auto font-mono text-[.64rem] tracking-[.14em] text-foreground/40">
                {{ category.prefix }}·{{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { GlowDivider } from 'rory-components';

const techCategories = [
  {
    category: 'Frontend',
    prefix: 'FE',
    technologies: [
      { name: 'Vue.js', iconName: 'component' },
      { name: 'Nuxt', iconName: 'layers' },
      { name: 'TypeScript', iconName: 'fileCode' },
      { name: 'Tailwind CSS', iconName: 'palette' },
      { name: 'Pinia', iconName: 'database' },
      { name: 'Vite', iconName: 'zap' },
    ],
  },
  {
    category: 'Tooling',
    prefix: 'TL',
    technologies: [
      { name: 'Git', iconName: 'gitBranch' },
      { name: 'npm / pnpm', iconName: 'box' },
      { name: 'ESLint', iconName: 'code2' },
      { name: 'Vitest', iconName: 'braces' },
      { name: 'Docker', iconName: 'box' },
      { name: 'CI / CD', iconName: 'terminal' },
    ],
  },
];

const svg = (children: any[]) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, children);

const iconMap: Record<string, () => ReturnType<typeof h>> = {
  braces: () => svg([h('path', { d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1' }), h('path', { d: 'M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' })]),
  box: () => svg([h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }), h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }), h('line', { x1: '12', x2: '12', y1: '22.08', y2: '12' })]),
  palette: () => svg([h('circle', { cx: '13.5', cy: '6.5', r: '.5' }), h('circle', { cx: '17.5', cy: '10.5', r: '.5' }), h('circle', { cx: '8.5', cy: '7.5', r: '.5' }), h('circle', { cx: '6.5', cy: '12.5', r: '.5' }), h('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' })]),
  database: () => svg([h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }), h('path', { d: 'M3 5V19A9 3 0 0 0 21 19V5' }), h('path', { d: 'M3 12A9 3 0 0 0 21 12' })]),
  gitBranch: () => svg([h('line', { x1: '6', x2: '6', y1: '3', y2: '15' }), h('circle', { cx: '18', cy: '6', r: '3' }), h('circle', { cx: '6', cy: '18', r: '3' }), h('path', { d: 'M18 9a9 9 0 0 1-9 9' })]),
  terminal: () => svg([h('polyline', { points: '4 17 10 11 4 5' }), h('line', { x1: '12', x2: '20', y1: '19', y2: '19' })]),
  layers: () => svg([h('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }), h('polyline', { points: '2 17 12 22 22 17' }), h('polyline', { points: '2 12 12 17 22 12' })]),
  zap: () => svg([h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })]),
  code2: () => svg([h('path', { d: 'm18 16 4-4-4-4' }), h('path', { d: 'm6 8-4 4 4 4' }), h('path', { d: 'm14.5 4-5 16' })]),
  component: () => svg([h('path', { d: 'M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' })]),
  fileCode: () => svg([h('path', { d: 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4' }), h('polyline', { points: '14 2 14 8 20 8' }), h('path', { d: 'm9 18 3-3-3-3' }), h('path', { d: 'm5 12-3 3 3 3' })]),
};

const getIconComponent = (name: string) => iconMap[name] || null;
</script>
