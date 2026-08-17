<template>
  <Transition name="panel">
    <div
      v-if="exhibit"
      class="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-4 sm:p-8"
    >
      <div
        class="pointer-events-auto w-full max-w-xl rounded-lg border p-6 backdrop-blur-md sm:p-8"
        style="
          background: rgba(7, 11, 20, 0.82);
          border-color: rgba(243, 201, 105, 0.35);
          box-shadow: 0 0 40px rgba(243, 201, 105, 0.08);
        "
      >
        <div class="flex items-start justify-between gap-4">
          <span
            class="font-mono text-[0.7rem] uppercase tracking-[0.24em]"
            style="color: var(--primary, #f3c969)"
          >
            {{ exhibit.designation }} — {{ exhibit.category }}
          </span>
          <button
            type="button"
            class="shrink-0 rounded px-2 py-1 font-mono text-[0.7rem] tracking-widest transition-colors"
            style="color: rgba(234, 241, 250, 0.55)"
            @click="$emit('close')"
          >
            ESC ✕
          </button>
        </div>

        <h2 class="mt-3 font-lora text-2xl font-medium sm:text-3xl" style="color: #eaf0fa">
          {{ exhibit.title }}
        </h2>

        <p class="mt-3 text-sm leading-relaxed sm:text-base" style="color: rgba(234, 241, 250, 0.7)">
          {{ exhibit.description }}
        </p>

        <a
          v-if="exhibit.link"
          :href="exhibit.link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-5 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-all hover:gap-3"
          style="border-color: rgba(243, 201, 105, 0.45); color: #f3c969"
        >
          {{ exhibit.link.label }}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ExhibitData } from '~/composables/three/exhibits';

defineProps<{ exhibit: ExhibitData | null }>();
defineEmits<{ close: [] }>();
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.35s var(--ease-stellar), transform 0.35s var(--ease-stellar);
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
</style>
