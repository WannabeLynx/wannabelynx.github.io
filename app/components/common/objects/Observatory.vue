<template>
  <div class="relative flex items-end">
      <div id="leftBottom" class="w-30 h-5 border-2 border-r-0 border-black rounded-tl-sm bg-gray-custom-dark"></div>
      <div id="door" @click="toggleDome" class="w-10 border-2 border-black h-15 rounded-t-full z-10 cursor-pointer bg-gray-custom-darker"></div>
      <div id="rightBottom" class="w-30 h-5 border-2 border-l-0 border-black rounded-tr-sm bg-gray-custom-dark"></div>
      <div id="wall" class="w-68 h-30 border-2 border-b-0 border-t-0 absolute bottom-5 left-1 bg-gray-custom-dark"></div>

      <div
      id="leftWindow"
      class="w-10 h-10 border-2 absolute bottom-10 left-10 bg-gray-900"
      :class="{ 'duration-1000 shadow-[inset_0_0_10px_rgba(239,68,68,0.8)]': isOpen }"
      ></div>
      <div
      id="rightWindow"
      class="w-10 h-10 border-2 absolute bottom-10 right-10 bg-gray-900"
      :class="{ 'duration-1000 shadow-[inset_0_0_10px_rgba(239,68,68,0.8)]': isOpen }"
      ></div>

      <div
        v-if="!isOpen"
        id="bubble"
        class="absolute border-1 bg-white border-black p-2 rounded-full bottom-20 left-25.5 cursor-pointer animate-bounce
          after:content-[''] after:absolute after:w-0 after:h-0
          after:border-l-[10px] after:border-l-transparent
          after:border-r-[10px] after:border-r-transparent
          after:border-t-[12px] after:border-t-black
          after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2
          before:content-[''] before:absolute before:w-0 before:h-0
          before:border-l-[8px] before:border-l-transparent
          before:border-r-[8px] before:border-r-transparent
          before:border-t-[10px] before:border-t-gray-custom-light
          before:bottom-[-9px] before:left-1/2 before:-translate-x-1/2"
      >
        <Paragraph weight="bold" color="text-black">{{ $t('Click me') }}</Paragraph>
      </div>
      <div id="topWall" class="w-70 h-5 border-2 absolute bottom-35 rounded-sm bg-gray-custom-dark"></div>
      <div id="dome" class="w-68 h-30 border-2 border-b-0 absolute bottom-40 left-1 rounded-t-full bg-white"></div>

      <div
        id="domeInteriorLeft"
        class="w-13 h-[118px] bg-gray-800 absolute bottom-40 left-22 rounded-tl-[43%]"
        :class="{ 'duration-1000 shadow-[inset_15px_0_10px_rgba(239,68,68,0.7)]': isOpen }"
      ></div>
      <div
        id="domeInteriorRight"
        class="w-13 h-[118px] bg-gray-800 absolute bottom-40 right-22 rounded-tr-[43%]"
        :class="{ 'duration-1000 shadow-[inset_-15px_0_10px_rgba(239,68,68,0.7)]': isOpen }"
      ></div>

      <div
        id="leftDome"
        class="w-14 h-30 border-2 border-b-0 border-r-1 rounded-tl-[55%] bg-white absolute bottom-40 left-21 transition-transform duration-500 ease-in-out"
        :class="{ '-translate-x-[63%]': isOpen }"
      ></div>

      <div
        id="rightDome"
        class="w-14 h-30 border-2 border-b-0 border-l-1 rounded-tr-[55%] bg-white absolute bottom-40 right-21 transition-transform duration-500 ease-in-out"
        :class="{ 'translate-x-[63%]': isOpen }"
      ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useRoryStore } from '~/stores/roryStore';
import Paragraph from '../typographie/Paragraph.vue';

const roryStore = useRoryStore();

const isOpen: Ref<boolean> = computed(() => roryStore.isDomOpen);

const toggleDome = (): void => {
  roryStore.onToggleDom();
};
</script>