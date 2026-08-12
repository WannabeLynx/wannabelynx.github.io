<template>
  <nav
    :aria-label="t('variants.label')"
    class="fixed top-4 right-4 z-[60]"
  >
    <div
      class="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 shadow-lg shadow-black/30 backdrop-blur-md"
    >
      <NuxtLink
        v-for="variant in variants"
        :key="variant.key"
        :to="localePath(variant.to)"
        :aria-current="isActive(variant) ? 'page' : undefined"
        class="rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200"
        :class="isActive(variant)
          ? 'bg-[#64FFDA] text-[#050810]'
          : 'text-white/70 hover:bg-white/10 hover:text-white'"
      >
        {{ t(`variants.${variant.key}`) }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const variants = [
  { key: 'modern', to: '/', name: 'index' },
  { key: 'space', to: '/space', name: 'space' },
  { key: 'three', to: '/three', name: 'three' },
] as const;

const baseRouteName = computed(() => String(route.name ?? '').split('___')[0]);

const isActive = (variant: { name: string }) =>
  baseRouteName.value === variant.name;
</script>
