<template>
  <div
    class="w-full h-full p-4 relative border border-transparent hover:bg-gray-600 bg-gray-700 rounded-lg shadow shadow-gray-500 hover:border-white lg:w-140 lg:h-80"
    @mouseenter="roryStore.setHoveringObject(true)"
    @mouseleave="roryStore.setHoveringObject(false)"
  >
    <div class="h-8 w-8 flex items-center justify-center rounded-full absolute z-2 bg-gray-700 shadow shadow-black -top-2 -right-2 p-1">
      <div
        class="bg-red-500 z-1 rounded-full cursor-pointer h-full w-full flex items-center justify-center transition-all duration-300 group hover:shadow-inner hover:shadow-black/70"
        @mousedown="buttonPress = true"
        @mouseup="handleMouseUp"
        @mouseleave="buttonPress = false"
      >
        <SvgoX
          class="flex duration-300 group-hover:rotate-90 group-hover:translate-y-0.75 text-gray-600 stroke-3"
          :class="{ 'duration 300 !translate-y-1': buttonPress }"
        />
      </div>
    </div>
    <div class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
      {{ roryStore.screenType }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoryStore } from '~/stores/roryStore';

const roryStore = useRoryStore();
const buttonPress = ref(false);

const handleMouseUp = (): void => {
  buttonPress.value = false;
  roryStore.onCloseScreen();
};
</script>