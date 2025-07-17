<template>
  <div class="relative w-screen min-h-screen bg-black/95 lg:h-screen lg:overflow-hidden items-center justify-center flex flex-col" :class="{ 'overflow-hidden h-screen': !isDomOpen }">
    <div v-if="isDomOpen && !isScreenOpen" class="lg:hidden fixed top-2 right-2 z-1">
      <ScrollIndicator />
    </div>
    <div class="fixed inset-0 z-0">
      <StarsBackground />
    </div>

    <div class="flex flex-col items-center gap-y-80 lg:pt-0">
      <div
        class="
          scale-[0.8] mt-60
          lg:absolute lg:top-[20%] lg:right-[25%] lg:mt-0
        "
      >
        <Nebula />
      </div>

      <div
        class="
          scale-[0.8] mt-70 mr-auto flex
          lg:absolute lg:top-[30%] lg:left-[35%] lg:mt-0 lg:mr-0
        "
      >
        <Planet />
      </div>

      <div
        class="
          transition-transform duration-[1500ms] ease-in-out mt-70 mb-100
          lg:absolute lg:left-[10%] lg:bottom-[20%] lg:my-0
        "
        :class="{
          'lg:-translate-x-[150vw] opacity-0 lg:opacity-100': !isDomOpen,
          'lg:translate-x-0': isDomOpen,
        }"
      >
        <Satellite />
      </div>
    </div>

    <div
      class="
        fixed bottom-0 left-0 z-10 h-[70%] w-full
        bg-gradient-to-t from-black/95 to-transparent
        pointer-events-none lg:hidden
      "
    ></div>

    <div
      class="
        fixed -bottom-5 z-20
        lg:absolute lg:scale-100 lg:left-auto lg:translate-x-0 lg:bottom-0 lg:z-auto
      "
    >
      <Observatory />
    </div>

    <div
      class="fixed ml-auto inset-7 z-50 transition-transform duration-[1000ms] ease-in-out lg:absolute lg:inset-auto lg:bottom-4 lg:right-4"
      :class="{ 'translate-y-[150vh]': !isScreenOpen, 'translate-y-0': isScreenOpen }"
    >
      <Screen />
    </div>
  </div>
</template>

<script setup lang="ts">
import Satellite from '~/components/common/objects/Satellite.vue';
import Observatory from '~/components/common/objects/Observatory.vue';
import StarsBackground from '~/components/common/objects/StarsBackground.vue';
import Nebula from '~/components/common/objects/Nebula.vue';
import Planet from '~/components/common/objects/Planet.vue';
import Screen from '~/components/common/objects/Screen.vue';
import { useRoryStore } from '~/stores/roryStore';
import { computed } from 'vue';
import ScrollIndicator from '~/components/common/objects/ScrollIndicator.vue';

const roryStore = useRoryStore();
const isDomOpen: Ref<boolean> = computed(() => roryStore.isDomOpen);
const isScreenOpen: Ref<boolean> = computed(() => roryStore.isScreenOpen);
</script>