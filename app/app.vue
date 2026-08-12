<template>
  <div class="min-h-screen bg-[#070B14] text-[#EAF0FA] font-manrope overflow-x-hidden">
    <StellarLoader />
    <div class="site-stage" :style="stageStyle">
      <VariantSwitcher />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import VariantSwitcher from '~/components/common/VariantSwitcher.vue';
import StellarLoader from '~/components/common/effects/StellarLoader.vue';
import { useRoryStore } from '~/stores/roryStore';

const rory = useRoryStore();

const stageStyle = computed(() =>
  rory.loadingSite ? { visibility: 'hidden' as const } : undefined,
);

useHead({
  style: [{ innerHTML: 'html,body{background-color:#070b14}' }],
  noscript: [{
    innerHTML:
      '<style>.stellar-loader{display:none!important}' +
      '.site-stage{visibility:visible!important}</style>',
  }],
});

onMounted(() => {
  window.setTimeout(() => rory.setSiteLoaded(), 14000);
});
</script>
