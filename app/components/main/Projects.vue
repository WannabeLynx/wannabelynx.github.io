<template>
  <section class="relative py-24 px-6 md:px-12" id="Projects">
    <GlowDivider color="secondary" />

    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl md:text-5xl text-foreground mb-16 text-center">
        {{ title }}
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="(project, index) in projects"
          :key="index"
          :image-url="project.image"
          :title="project.title"
          :description="project.description"
          :tags="project.tags"
          :github-url="project.github"
          :demo-url="project.demo"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import  { GlowDivider, Card, GlowImage} from 'rory-components';

// --- Props ---

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

interface Props {
  title?: string;
  projects?: Project[];
}

withDefaults(defineProps<Props>(), {
  title: 'Featured Projects',
  projects: () => [
    {
      title: "Projekt 1",
      description: "This is a cool Project I made in a short time. Wow.",
      image: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjA2OTIwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Nuxt 3", "Pinia", "Tailwind", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      title: "Projekt 2",
      description: "This is a cool Project I made in a short time. Wow. This is a cool Project I made in a short time. Wow.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwNzg4MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Vue 3", "TypeScript", "Firebase", "Vuetify"],
      github: "#",
      demo: "#"
    },
    {
      title: "Projekt 3",
      description: "This is a cool Project I made in a short time. Wow. This is a cool Project I made in a short time. Wow. This is a cool Project I made in a short time. Wow.",
      image: "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2Rpbmd8ZW58MXx8fHwxNzYwNzgwNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Nuxt", "Chart.js", "OpenWeather API"],
      github: "#",
      demo: "#"
    }
  ],
});
</script>
