<template>
  <div class="observatory" @click="onShellClick">
    <span class="horizon"></span>
    <button class="obs-console" aria-label="Open Observer Log" @click.stop="openAbout">
      <span class="chip">
        <span class="no">LOG-01</span>
        <span class="lbl">Observer Log</span>
        <span class="go">▸</span>
      </span>
    </button>

    <div class="dome-wrap" aria-hidden="true">
      <span class="dome"></span>
      <span class="slit"></span>
      <span class="scope"></span>
      <span class="shutter l"></span>
      <span class="shutter r"></span>
    </div>
    <div class="obs-neck" aria-hidden="true"></div>
    <div class="obs-base">
      <span class="obs-win"></span>
      <span class="obs-win"></span>
      <span class="obs-win"></span>
      <span class="obs-door"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoryStore } from '~/stores/roryStore';

const roryStore = useRoryStore();

const onShellClick = (): void => {
  roryStore.onToggleDom();
};

const openAbout = (): void => {
  if (!roryStore.isDomOpen) roryStore.onToggleDom();
  roryStore.onOpenScreen('about');
};
</script>
