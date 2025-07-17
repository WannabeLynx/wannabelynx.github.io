<template>
  <Transition
    enter-active-class="transition-opacity duration-[5000ms] ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-[1500ms] ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isDomOpen"
      @click="onNebulaInfo"
      class="absolute inset-0 flex items-center justify-center w-full h-full duration-1000 hover:cursor-pointer hover:-rotate-3 hover:scale-[1.1]"
      @mouseenter="roryStore.setHoveringObject(true)"
      @mouseleave="roryStore.setHoveringObject(false)"
    >
      <div class="relative w-96 h-96">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_10px_rgba(255,255,255,0.8)] z-50"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-200/50 rounded-full filter blur-2xl animate-pulse z-40"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 bg-teal-500/30 rounded-[50%] filter blur-xl animate-[spin_20s_linear_infinite] z-30"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72 bg-purple-600/30 rounded-[50%] filter blur-xl animate-[spin_25s_linear_infinite_reverse] z-20"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-800/20 rounded-full filter blur-3xl opacity-70 z-10"></div>
        <div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-56 h-32 bg-red-500/60 rounded-[60%] filter blur-2xl opacity-60 animate-[pulse_8s_ease-in-out_infinite] z-20"></div>
        <div class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-40 bg-orange-500/50 rounded-[50%] filter blur-2xl opacity-50 animate-[pulse_10s_ease-in-out_infinite] z-20"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useRoryStore } from '~/stores/roryStore';

const roryStore = useRoryStore();
const isDomOpen = computed(() => roryStore.isDomOpen);

const onNebulaInfo = (): void => {
  roryStore.onOpenScreen('nebulaInfo');
};
</script>

