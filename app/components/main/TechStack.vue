<template>
  <section class="relative py-24 px-6 md:px-12">
    <GlowDivider color="accent" />

    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl text-foreground mb-16 text-center">
        {{ title }}
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(category, categoryIndex) in techCategories" :key="categoryIndex" class="space-y-6">
          <h3
            class="text-2xl text-center pb-3 border-b-2 transition-all duration-300"
            :class="category.colorClass"
          >
            {{ category.category }}
          </h3>

          <div class="space-y-3">
            <Badge
              v-for="(tech, techIndex) in category.technologies"
              :key="techIndex"
              variant="skill"
              :label="tech.name"
              :icon-color-class="category.iconColorClass"
              :icon-bg-color-class="category.iconBgColorClass"
              :icon-border-color-class="category.iconBorderColorClass"
            >
              <template #icon>
                <component :is="getIconComponent(tech.iconName)" />
              </template>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { GlowDivider, Badge } from 'rory-components';

// --- Local Icon Components (Vue version of Lucide icons) ---

const BracesIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1' }), h('path', { d: 'M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' })]);
const BoxIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }), h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }), h('line', { x1: '12', x2: '12', y1: '22.08', y2: '12' })]);
const PaletteIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('circle', { cx: '13.5', cy: '6.5', r: '.5' }), h('circle', { cx: '17.5', cy: '10.5', r: '.5' }), h('circle', { cx: '8.5', cy: '7.5', r: '.5' }), h('circle', { cx: '6.5', cy: '12.5', r: '.5' }), h('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' })]);
const DatabaseIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }), h('path', { d: 'M3 5V19A9 3 0 0 0 21 19V5' }), h('path', { d: 'M3 12A9 3 0 0 0 21 12' })]);
const GitBranchIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('line', { x1: '6', x2: '6', y1: '3', y2: '15' }), h('circle', { cx: '18', cy: '6', r: '3' }), h('circle', { cx: '6', cy: '18', r: '3' }), h('path', { d: 'M18 9a9 9 0 0 1-9 9' })]);
const FigmaIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' }), h('path', { d: 'M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' }), h('path', { d: 'M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' }), h('path', { d: 'M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' }), h('path', { d: 'M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' })]);
const TerminalIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('polyline', { points: '4 17 10 11 4 5' }), h('line', { x1: '12', x2: '20', y1: '19', y2: '19' })]);
const LayersIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }), h('polyline', { points: '2 17 12 22 22 17' }), h('polyline', { points: '2 12 12 17 22 12' })]);
const ZapIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })]);
const Code2Icon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'm18 16 4-4-4-4' }), h('path', { d: 'm6 8-4 4 4 4' }), h('path', { d: 'm14.5 4-5 16' })]);
const ComponentIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z' }), h('path', { d: 'M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z' })]);
const FileCodeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4' }), h('polyline', { points: '14 2 14 8 20 8' }), h('path', { d: 'm9 18 3-3-3-3' }), h('path', { d: 'm5 12-3 3 3 3' })]);

const iconMap: Record<string, ReturnType<typeof h>> = {
  braces: BracesIcon, box: BoxIcon, palette: PaletteIcon, database: DatabaseIcon, gitBranch: GitBranchIcon, figma: FigmaIcon, terminal: TerminalIcon, layers: LayersIcon, zap: ZapIcon, code2: Code2Icon, component: ComponentIcon, fileCode: FileCodeIcon,
};

const getIconComponent = (name: string) => iconMap[name] || null;

// --- Props ---

interface Technology {
  name: string;
  iconName: string;
}

interface TechCategory {
  category: string;
  colorClass: string;
  iconColorClass: string;
  iconBgColorClass: string;
  iconBorderColorClass: string;
  technologies: Technology[];
}

interface Props {
  title?: string;
  techCategories?: TechCategory[];
}

withDefaults(defineProps<Props>(), {
  title: 'My Toolkit',
  techCategories: () => [
    {
      category: "Frontend",
      colorClass: "text-primary border-primary/25",
      iconColorClass: "text-primary",
      iconBgColorClass: "bg-primary/20",
      iconBorderColorClass: "border-primary/25",
      technologies: [
        { name: "Vue.js", iconName: 'component' },
        { name: "Nuxt", iconName: 'layers' },
        { name: "TypeScript", iconName: 'fileCode' },
        { name: "Tailwind CSS", iconName: 'palette' },
        { name: "Pinia", iconName: 'database' },
        { name: "Vite", iconName: 'zap' }
      ]
    },
    {
      category: "Tooling",
      colorClass: "text-secondary border-secondary/25",
      iconColorClass: "text-secondary",
      iconBgColorClass: "bg-secondary/20",
      iconBorderColorClass: "border-secondary/25",
      technologies: [
        { name: "Git", iconName: 'gitBranch' },
        { name: "npm/pnpm", iconName: 'box' },
        { name: "ESLint", iconName: 'code2' },
        { name: "Vitest", iconName: 'braces' },
        { name: "Docker", iconName: 'box' },
        { name: "CI/CD", iconName: 'terminal' }
      ]
    },
    {
      category: "Design",
      colorClass: "text-accent border-accent/25",
      iconColorClass: "text-accent",
      iconBgColorClass: "bg-accent/20",
      iconBorderColorClass: "border-accent/25",
      technologies: [
        { name: "Figma", iconName: 'figma' },
        { name: "Adobe XD", iconName: 'palette' },
        { name: "Sketch", iconName: 'layers' },
        { name: "Design Systems", iconName: 'component' }
      ]
    }
  ],
});
</script>
