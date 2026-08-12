<template>
  <div class="space-hud" :class="{ booted: isDomOpen, 'is-touch': isTouchDevice }">
    <StarsBackground />
    <CursorEffect v-if="!isTouchDevice" />

    <!-- HUD frame -->
    <div class="hud">
      <span class="bracket tl"></span><span class="bracket tr"></span>
      <span class="bracket bl"></span><span class="bracket br"></span>

      <div class="hud-top">
        <div class="hud-title mono">Observation Deck // <b>Nino Bär</b> · Frontend Dev</div>
        <div class="hud-coords mono">
          Sector <span>NB-04</span> · Cyan-Ion<br />
          Lat <span>47.66°N</span> · Lon <span>9.17°E</span>
        </div>
      </div>

      <div class="hud-lticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>

      <div class="hud-bottom">
        <div class="hud-legend mono">
          <b><span class="dotlive"></span>Systems nominal</b><b>Signal 98%</b>
        </div>
        <div class="mono">Nuxt · TypeScript · Tailwind</div>
      </div>
    </div>

    <button class="shutdown mono" @click="roryStore.onToggleDom()">◄ Power down observation</button>

    <div class="scene">
      <Target class="t-nebula" no="SPEC-03" label="Spectral Analysis" panel="tech" double-orbit>
        <Nebula />
      </Target>
      <Target class="t-planet" no="OBJ-02" label="Payload Manifest" panel="projects" double-orbit>
        <Planet />
      </Target>
      <Target class="t-sat" no="COM-04" label="Comms Uplink" panel="contact">
        <Satellite />
      </Target>

      <Observatory />

      <div class="boot">
        <button class="boot-btn mono" @click="roryStore.onToggleDom()">
          <span class="tri"></span>Initialize observation
        </button>
        <div class="boot-hint">▸ open the dome to begin · click any target to read the log</div>
      </div>
    </div>

    <!-- info console -->
    <Screen />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRoryStore } from '~/stores/roryStore';
import StarsBackground from '~/components/common/objects/StarsBackground.vue';
import CursorEffect from '~/components/common/effects/CursorEffect.vue';
import Target from '~/components/common/objects/Target.vue';
import Nebula from '~/components/common/objects/Nebula.vue';
import Planet from '~/components/common/objects/Planet.vue';
import Satellite from '~/components/common/objects/Satellite.vue';
import Observatory from '~/components/common/objects/Observatory.vue';
import Screen from '~/components/common/objects/Screen.vue';

useSeoMeta({
  title: 'Nino Bär — Frontend Developer · Space',
  ogTitle: 'Nino Bär · Space',
  ogUrl: 'https://wannabelynx.github.io/space',
});
useHead({ link: [{ rel: 'canonical', href: 'https://wannabelynx.github.io/space' }] });

const roryStore = useRoryStore();
const isDomOpen: Ref<boolean> = computed(() => roryStore.isDomOpen);

const isTouchDevice = ref(false);
onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
});
</script>
