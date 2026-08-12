<template>
  <div class="min-h-screen bg-[#070B14] text-[#EAF0FA] font-manrope overflow-x-hidden">
    <VariantSwitcher />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import VariantSwitcher from '~/components/common/VariantSwitcher.vue';
</script>
