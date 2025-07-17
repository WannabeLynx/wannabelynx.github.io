<template>
  <div>
    <div class="flex items-center -rotate-33">
      <div class="relative w-15 h-4 bg-gray-custom-dark border-y-2 border-[#888]">
        <div :class="panelClasses" class="bottom-4 right-5 flex items-center justify-center"><Paragraph class="rotate-90">{{ isOpen ? $t('nav.home') : '' }}</Paragraph></div>
        <div :class="panelClasses" class="top-4 right-5 flex items-center justify-center"><Paragraph class="rotate-90">{{ isOpen ? $t('nav.projects') : '' }}</Paragraph></div>
      </div>

      <div  @click="togglePanels" class="relative z-10 flex items-center justify-center w-20 h-[60px] bg-gray-custom-lighter rounded-[10px] border-2 border-gray-custom-light shadow-[0_0_15px_rgba(200,200,255,0.3)] select-none">
        <div class="absolute w-5 h-5 bg-gray-custom-light rounded-full -top-3 border-2 border-[#777]"></div>
        <Paragraph
          weight="bold"
          :color="isOpen ? 'text-red-400 [text-shadow:0_0_12px_theme(colors.red.500/80%)] animate-pulse' : 'text-gray-700'"
        >
          {{ isOpen ? $t('satellite.open') : $t('satellite.closed') }}
        </Paragraph>
      </div>

      <div class="relative w-15 h-4 bg-gray-custom-dark border-y-2 border-[#888]">
        <div :class="panelClasses" class="bottom-4 left-5 flex items-center justify-center"><Paragraph class="rotate-90">{{ isOpen ? $t('nav.about') : '' }}</Paragraph></div>
        <div :class="panelClasses" class="top-4 left-5 flex items-center justify-center"><Paragraph class="rotate-90">{{ isOpen ? $t('nav.contact') : '' }}</Paragraph></div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import Paragraph from '../typographie/Paragraph.vue';

const isOpen: Ref<boolean> = ref(false);

const buttonText: Ref<string> = ref('Click Me');

const togglePanels = (): void => {
  isOpen.value = !isOpen.value;
  if (buttonText.value === 'Click Me') {
    buttonText.value = 'ISS';
  }
};

const panelClasses = computed(() => [
  'absolute w-[50px] bg-[#1a2a4a] border-2 border-[#4a6a9a] rounded-[5px] shadow-[inset_0_0_10px_rgba(100,150,255,0.5)] overflow-hidden transition-[height] duration-[1.5s] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]',
  isOpen.value ? 'h-[100px]' : 'h-0'
]);
</script>
