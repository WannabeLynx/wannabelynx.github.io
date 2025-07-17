<template>
  <div class="relative h-screen w-screen items-center justify-center flex duration-[1500ms]" :class="isDomOpen ? 'bg-black' : 'bg-black/95'">
    <Transition
      enter-active-class="transition-opacity duration-[1500ms] ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-[1500ms] ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <StarsBackground v-if="isDomOpen" />
    </Transition>

    <div
      class="absolute left-[10%] bottom-[20%] transition-transform duration-[1500ms] ease-in-out"
      :class="{ '-translate-x-[150vw]': !isDomOpen, 'translate-x-0': isDomOpen }"
    >
      <Satellite />
    </div>
    <div class="absolute bottom-0">
      <Observatory />
    </div>
    <Transition
      enter-active-class="transition-opacity duration-[3500ms] ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-[1500ms] ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isDomOpen" class="scale-[0.6] absolute top-[20%] right-[25%]">
        <Nebula />
      </div>
    </Transition>
    <Transition
      enter-active-class="transition-opacity duration-[3000ms] ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-[1500ms] ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isDomOpen" class="absolute top-[30%] left-[25%] scale-[0.5]">
        <Planet />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Satellite from '~/components/common/objects/Satellite.vue';
import Observatory from '~/components/common/objects/Observatory.vue';
import StarsBackground from '~/components/common/objects/StarsBackground.vue';
import Nebula from '~/components/common/objects/Nebula.vue';
import Planet from '~/components/common/objects/Planet.vue';
import { useRoryStore } from '~/stores/roryStore';

const roryStore = useRoryStore();
const isDomOpen: Ref<boolean> = computed(() => roryStore.isDomOpen);
</script>