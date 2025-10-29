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
                <component class="w-6" :is="value.iconName" />
              </template>
            </Badge>
          </div>
        </div>

        <GlowImage :src="image.url" :alt="image.alt" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';
import {Badge, GlowImage, GlowDivider} from 'rory-components';
import Me from '../../assets/images/Me.jpg'
import { GlobeAsiaAustraliaIcon, CodeBracketIcon, PaperAirplaneIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const title = 'About Me';
const bio = [
  "Hello, I'm Nino. I'm a Software Developer with 8 years of experience at cobra computer's brainware GmbH, a leading CRM software company.",
  " I began my journey as an apprentice, building a strong foundation in backend development with C# and .NET. Today, I'm a Frontend Developer focused on building modern, dynamic web applications using Nuxt.js (Vue.js), TypeScript, and Tailwind CSS.",
  "When I'm not coding, you'll find me stargazing, reading about astrophysics, or playing GeoGuessr."
]

const values = [
  { iconName: CodeBracketIcon, label: 'Coding', colorClass: 'text-primary' },
  { iconName: GlobeAsiaAustraliaIcon, label: 'Astronomy', colorClass: 'text-secondary' },
  { iconName: ComputerDesktopIcon, label: 'Gaming', colorClass: 'text-accent' },
  { iconName: PaperAirplaneIcon, label: 'Traveling', colorClass: 'text-primary' },
]

const image = {
  url: Me,
  alt: 'Me and my Telescope'
}
</script>
