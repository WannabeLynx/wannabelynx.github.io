<template>
  <section id="projects" class="relative py-24 md:py-32 px-6 md:px-12">
    <GlowDivider color="primary" />
    <div class="max-w-6xl mx-auto">
      <header class="reveal mb-14">
        <span class="block font-mono text-[.7rem] tracking-[.24em] uppercase text-primary mb-3.5">02 — Star Catalog</span>
        <h2 class="font-lora font-medium text-foreground text-4xl md:text-5xl leading-tight" style="text-wrap:balance">Featured Projects</h2>
        <div class="h-px mt-6" style="background:linear-gradient(90deg, var(--border), transparent)"></div>
      </header>

      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        <div v-for="(project, index) in projects" :key="index" class="reveal">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { GlowDivider, Card } from 'rory-components';
import Polyrhytmic from '../../assets/images/Polyrhytmic.png';
import GuessGame from '../../assets/images/GuessGame.png';
import RoryGraphViewer from '../../assets/images/RoryGraphViewer.png';
import Storybook from '../../assets/images/Storybook.png';

const projects = [
  {
    desig: 'OBJ-01',
    type: 'Generative · Audio',
    title: 'Polyrhytmic',
    description: 'A tone triggers as each point completes its loop, creating a mesmerizing and generative musical pattern.',
    image: Polyrhytmic,
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/WannabeLynx/coderory.github.io',
    demo: 'https://coderory.com/',
  },
  {
    desig: 'OBJ-02',
    type: 'Game · Geography',
    title: "Rory's Flag & Domain Quiz",
    description: 'An interactive geography quiz where players identify countries by their flags or domain extensions on a world map.',
    image: GuessGame,
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/WannabeLynx/GuessGame',
    demo: '#',
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
    type: 'Library · Open Source',
    title: 'rory-components',
    description: 'My small components library, published to npm. Still adding more.',
    image: Storybook,
    tags: ['Vue', 'CSS', 'TypeScript'],
    github: 'https://github.com/WannabeLynx/RoryComponents',
    demo: 'https://www.npmjs.com/package/rory-components',
  },
];
</script>
