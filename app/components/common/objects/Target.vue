<template>
  <button class="target" :aria-label="`Open ${label}`" @click="onOpen">
    <span class="orbit"></span>
    <span v-if="doubleOrbit" class="orbit o2"></span>
    <span class="reticle">
      <span class="r1"></span><span class="r2"></span><span class="r3"></span><span class="r4"></span>
    </span>
    <slot />
    <span class="chip">
      <span class="no">{{ no }}</span>
      <span class="lbl">{{ label }}</span>
      <span class="go">▸</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useRoryStore } from '~/stores/roryStore';

const props = defineProps<{
  no: string;
  label: string;
  panel: string;
  doubleOrbit?: boolean;
}>();

const roryStore = useRoryStore();

const onOpen = (): void => {
  if (!roryStore.isDomOpen) roryStore.onToggleDom();
  roryStore.onOpenScreen(props.panel);
};
</script>
