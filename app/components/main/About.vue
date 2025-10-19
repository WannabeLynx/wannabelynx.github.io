<template>
  <section class="relative py-24 px-6 md:px-12">
    <GlowDivider color="primary" />

    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl text-foreground mb-16 text-center">
        {{ title }}
      </h2>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <p v-for="(paragraph, index) in bio" :key="index" class="text-foreground/80 leading-relaxed">
            {{ paragraph }}
          </p>

          <div class="grid grid-cols-2 gap-4 pt-6">
            <Badge
              v-for="(value, index) in values"
              :key="index"
              variant="principle"
              :label="value.label"
              :icon-color-class="value.colorClass"
            >
              <template #icon>
                <component :is="getIconComponent(value.iconName)" />
              </template>
            </Badge>
          </div>
        </div>

        <GlowImage :src="imageUrl" :alt="imageAlt" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';
import {Badge, GlowImage, GlowDivider} from 'rory-components';

const Code2Icon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [ h('path', { d: 'm18 16 4-4-4-4' }), h('path', { d: 'm6 8-4 4 4 4' }), h('path', { d: 'm14.5 4-5 16' })]);

const PaletteIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [ h('circle', { cx: '13.5', cy: '6.5', r: '.5' }), h('circle', { cx: '17.5', cy: '10.5', r: '.5' }), h('circle', { cx: '8.5', cy: '7.5', r: '.5' }), h('circle', { cx: '6.5', cy: '12.5', r: '.5' }), h('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' })]);

const TelescopeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [ h('path', { d: 'm10.061 12.453-6.17 6.17a.5.5 0 0 1-.707-.707l6.17-6.17' }), h('path', { d: 'M15.42 21.25a.5.5 0 0 1-.707 0l-2.56-2.56a.5.5 0 0 1 0-.707l4.4-4.4a.5.5 0 0 1 .707 0l2.56 2.56a.5.5 0 0 1 0 .707z' }), h('path', { d: 'M16.25 12.9a.5.5 0 0 1 0 .707l-2.56 2.56a.5.5 0 0 1-.707 0l-4.4-4.4a.5.5 0 0 1 0-.707l2.56-2.56a.5.5 0 0 1 .707 0z' }), h('path', { d: 'M12.9 8.75a.5.5 0 0 1 .707 0l2.56 2.56a.5.5 0 0 1 0 .707l-4.4 4.4a.5.5 0 0 1-.707 0l-2.56-2.56a.5.5 0 0 1 0-.707z' }), h('path', { d: 'm12.453 10.061 6.17-6.17a.5.5 0 0 1 .707.707l-6.17 6.17' }), h('path', { d: 'M3 21 21 3' })]);

const SparklesIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [ h('path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z' }), h('path', { d: 'M5 3v4' }), h('path', { d: 'M19 17v4' }), h('path', { d: 'M3 5h4' }), h('path', { d: 'M17 19h4' })]);

const iconMap = {
  code: Code2Icon,
  palette: PaletteIcon,
  telescope: TelescopeIcon,
  sparkles: SparklesIcon,
};

const getIconComponent = (name: string) => {
  return iconMap[name] || null;
};

// --- Props ---
interface Value {
  iconName: 'code' | 'palette' | 'telescope' | 'sparkles';
  label: string;
  colorClass: 'text-primary' | 'text-secondary' | 'text-accent';
}

interface Props {
  title?: string;
  bio?: string[];
  values?: Value[];
  imageUrl?: string;
  imageAlt?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'About Me',
  bio: () => [
    "Hello! I'm Nino, a frontend developer from Germany with a passion for building exceptional digital experiences. My journey into web development started when I was fascinated by the intersection of technology and design.",
    "Fast-forward to today, and I've had the privilege of working on complex web applications, building scalable component libraries, and creating delightful user interfaces. My main focus these days is building accessible, performant products using modern web technologies.",
    "When I'm not coding, you'll find me stargazing, reading about astrophysics, or playing GeoGuessr."
  ],
  values: () => [
    { iconName: 'code', label: 'Clean Code', colorClass: 'text-primary' },
    { iconName: 'palette', label: 'User Experience', colorClass: 'text-secondary' },
    { iconName: 'telescope', label: 'Astronomy', colorClass: 'text-accent' },
    { iconName: 'sparkles', label: 'Innovation', colorClass: 'text-primary' },
  ],
  imageUrl: 'https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2Rpbmd8ZW58MXx8fHwxNzYwNzgwNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  imageAlt: 'Developer workspace',
});
</script>
