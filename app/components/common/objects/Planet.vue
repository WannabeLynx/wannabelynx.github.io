<template>
  <Transition
    enter-active-class="transition-opacity duration-[3500ms] ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-[1500ms] ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isDomOpen"
      @click="onPlanetInfo"
      class="absolute flex items-center justify-center"
      @mouseenter="roryStore.setHoveringObject(true)"
      @mouseleave="roryStore.setHoveringObject(false)"
    >
      <div class="relative cursor-pointer transition-all duration-1000 hover:scale-95 hover:rotate-5 hover:drop-shadow-lg">
        <div class="absolute w-[212px] h-[212px] rounded-full border-4 border-indigo-900 bg-[linear-gradient(0deg,#4f46e5_0%,#a855f7_100%)]">
          <div class="absolute top-[30px] left-[80px] w-[50px] h-[12px] rounded-lg bg-fuchsia-800/80">
            <div class="absolute -top-2 left-0 w-[30px] h-[9px] rounded-lg bg-fuchsia-800/80"></div>
          </div>

          <div class="absolute top-[60px] left-[121px] w-[50px] h-[12px] rounded-lg bg-indigo-800/80">
            <div class="absolute top-3 left-3 w-[30px] h-[9px] rounded-lg bg-indigo-800/80"></div>
          </div>

          <div class="absolute top-[75px] left-[21px] w-[50px] h-[12px] rounded-lg bg-purple-500/80">
            <div class="absolute top-3 left-3 w-[43px] h-[9px] rounded-lg bg-purple-500/80"></div>
            <div class="absolute top-[21px] left-3 w-[73px] h-[12px] rounded-lg bg-purple-500/80"></div>
          </div>

          <div class="absolute top-[112px] left-[121px] w-[50px] h-[12px] rounded-lg bg-violet-700/80">
            <div class="absolute top-3 left-3 w-[43px] h-[9px] rounded-lg bg-violet-700/80"></div>
            <div class="absolute top-[21px] -left-3 w-[73px] h-[12px] rounded-lg bg-violet-700/80"></div>
          </div>

          <div class="absolute top-[182px] left-[70px] w-[50px] h-[12px] rounded-lg bg-indigo-900/80">
            <div class="absolute -top-2 left-[21px] w-[30px] h-[9px] rounded-lg bg-indigo-900/80"></div>
          </div>

          <div class="absolute top-[12px] left-[53px] w-[60px] h-[150px] border-t-[9px] border-t-purple-200/80 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent rounded-[132px/100px] -rotate-45 opacity-50"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useRoryStore } from '~/stores/roryStore';

const roryStore = useRoryStore();
const isDomOpen = computed(() => roryStore.isDomOpen);

const onPlanetInfo = (): void => {
  roryStore.onOpenScreen('planetInfo');
};
</script>