<template>
  <div class="absolute inset-0 select-none">
    <canvas ref="canvasRef" class="block h-full w-full" />

    <!-- crosshair while walking -->
    <div
      v-if="isLocked"
      class="pointer-events-none absolute left-1/2 top-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style="background: rgba(243, 201, 105, 0.9); box-shadow: 0 0 8px rgba(243, 201, 105, 0.6)"
    />

    <!-- start / controls hint (shown when idle) -->
    <Transition name="fade">
      <div
        v-if="!isLocked && !openExhibit"
        class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      >
        <p class="font-lora text-2xl font-medium text-white/90 md:text-3xl">Enter the Observatory</p>
        <p class="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-white/45">
          Click to look · W A S D to move · E to inspect
        </p>
      </div>
    </Transition>

    <!-- proximity prompt -->
    <Transition name="fade">
      <div
        v-if="isLocked && activeExhibit && !openExhibit"
        class="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-sm"
        style="background: rgba(7, 11, 20, 0.7); border-color: rgba(243, 201, 105, 0.4)"
      >
        <kbd
          class="grid h-6 w-6 place-items-center rounded border font-mono text-xs"
          style="border-color: rgba(243, 201, 105, 0.6); color: #f3c969"
          >E</kbd
        >
        <span class="text-sm text-white/80">Inspect {{ activeExhibit.title }}</span>
      </div>
    </Transition>

    <InfoPanel :exhibit="openExhibit" @close="museum?.close()" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, shallowRef, computed } from 'vue';
import InfoPanel from './InfoPanel.vue';
import { useMuseum, type MuseumHandles } from '~/composables/three/useMuseum';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const museum = shallowRef<MuseumHandles | null>(null);

const isLocked = computed(() => museum.value?.isLocked.value ?? false);
const activeExhibit = computed(
  () => museum.value?.exhibits.find((e) => e.id === museum.value?.activeId.value) ?? null,
);
const openExhibit = computed(
  () => museum.value?.exhibits.find((e) => e.id === museum.value?.openId.value) ?? null,
);

onMounted(() => {
  if (canvasRef.value) museum.value = useMuseum(canvasRef.value);
});
onBeforeUnmount(() => museum.value?.dispose());
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s var(--ease-stellar);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
