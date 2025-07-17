<template>
  <div class="bg-black h-full w-full items-center justify-center flex">
    <div class="relative flex items-end h-full">
      <div id="leftBottom" class="w-30 h-5 border-2 border-r-0 border-black rounded-tl-sm bg-white"></div>
      <div id="door" @click="toggleDome" class="w-10 border-2 border-black h-15 rounded-t-full z-10 cursor-pointer bg-gray-200"></div>
      <div id="rightBottom" class="w-30 h-5 border-2 border-l-0 border-black rounded-tr-sm bg-white"></div>
      <div id="wall" class="w-68 h-30 border-2 border-b-0 border-t-0 absolute bottom-5 left-1 bg-white"></div>

      <div
      id="leftWindow"
      class="w-10 h-10 border-2 absolute bottom-10 left-10 bg-gray-900"
      :class="{ 'shadow-[inset_0_0_10px_rgba(239,68,68,0.8)]': isOpen }"
      ></div>
      <div
      id="rightWindow"
      class="w-10 h-10 border-2 absolute bottom-10 right-10 bg-gray-900"
      :class="{ 'shadow-[inset_0_0_10px_rgba(239,68,68,0.8)]': isOpen }"
      ></div>

      <div id="topWall" class="w-70 h-5 border-2 absolute bottom-35 rounded-sm bg-white"></div>
      <div id="dome" class="w-68 h-30 border-2 border-b-0 absolute bottom-40 left-1 rounded-t-full bg-white"></div>

      <div
        id="domeInteriorLeft"
        class="w-13 h-[118px] bg-gray-800 absolute bottom-40 left-22 rounded-tl-[43%] shadow-[inset_15px_0_10px_rgba(239,68,68,0.7)]"
      ></div>
      <div
        id="domeInteriorRight"
        class="w-13 h-[118px] bg-gray-800 absolute bottom-40 right-22 rounded-tr-[43%] shadow-[inset_-15px_0_10px_rgba(239,68,68,0.7)]"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

// Function to toggle the dome's state
const toggleDome = () => {
  isOpen.value = !isOpen.value;
};
</script>