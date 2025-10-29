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
import  { GlowDivider, Card } from 'rory-components';
import Polyrhytmic from '../../assets/images/Polyrhytmic.png';
import GuessGame from '../../assets/images/GuessGame.png';
import RoryGraphViewer from '../../assets/images/RoryGraphViewer.png';
import Storybook from '../../assets/images/Storybook.png';

const title = 'Featured Projects';
const projects = [
  {
    title: "Polyrhytmic",
    description: "A tone triggers as each point completes its loop, creating a mesmerizing and generative musical pattern.",
    image: Polyrhytmic,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/WannabeLynx/coderory.github.io",
    demo: "https://coderory.com/"
  },
  {
    title: "Rory's Flag & Domain Quiz",
    description: "An interactive geography quiz game where players identify countries by their flags or domain extensions on a world map. Test your knowledge of world geography through visual clues!",
    image: GuessGame,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/WannabeLynx/GuessGame",
    demo: "#"
  },
  {
    title: "Chrome Extension GraphQL Viewer",
    description: "A simple Chrome extension I build for my work to help to better visualize GraphQL data.",
    image: RoryGraphViewer,
    tags: ["Html", "JavaScript"],
    github: "https://github.com/WannabeLynx/RoryGraphQLViewer",
    demo: "https://chromewebstore.google.com/detail/rorys-graphql-viewer/fmolodpnmbjgejgbfmjnbhojiokoiijd"
  },
  {
    title: "Storybook Components Library",
    description: "My small components library. Still adding more Stuff.",
    image: Storybook,
    tags: ["Vue", "CSS", "TypeScript"],
    github: "https://github.com/WannabeLynx/RoryComponents",
    demo: "https://www.npmjs.com/package/rory-components"
  }
];
</script>
