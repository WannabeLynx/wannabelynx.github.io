<template>
  <div 
    class="shooting-star-container"
    :style="{
      left: startX,
      top: startY,
      '--start-x': '0px',
      '--start-y': '0px', 
      '--end-x': `calc(${endX} - ${startX})`,
      '--end-y': `calc(${endY} - ${startY})`,
      '--duration': duration,
      '--delay': delay
    }"
  >
    <!-- Main shooting star body -->
    <div class="shooting-star-body">
      <div class="star-core"></div>
    </div>
    
    <!-- Particle trail -->
    <div 
      v-for="(particle, index) in 8" 
      :key="index"
      class="particle"
      :style="{
        '--particle-delay': `${parseFloat(delay) + index * 0.02}s`,
        '--particle-opacity': Math.max(0.1, 0.8 - (index * 0.1)),
        '--particle-size': Math.max(1, 4 - (index * 0.3)),
        '--particle-offset-x': `${(Math.random() - 0.5) * 10}px`,
        '--particle-offset-y': `${(Math.random() - 0.5) * 10}px`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  duration: string;
  delay: string;
}

defineProps<Props>();
</script>

<style scoped>
.shooting-star-container {
  position: absolute;
  width: 6px;
  height: 6px;
  pointer-events: none;
}

.shooting-star-body {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: curved-motion var(--duration) var(--delay) ease-out forwards;
  will-change: transform;
}

.star-core {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0.8) 60%, transparent 80%);
  border-radius: 50%;
  box-shadow: 
    0 0 8px #ffffff,
    0 0 16px #ffffff,
    0 0 24px rgba(255,255,255,0.8);
  animation: core-glow var(--duration) var(--delay) ease-out forwards;
}

.particle {
  position: absolute;
  width: calc(var(--particle-size) * 1px);
  height: calc(var(--particle-size) * 1px);
  background: radial-gradient(circle, rgba(255,255,255,var(--particle-opacity)) 0%, transparent 70%);
  border-radius: 50%;
  animation: particle-motion var(--duration) var(--particle-delay) ease-out forwards;
  will-change: transform, opacity;
  transform: translate(var(--particle-offset-x), var(--particle-offset-y));
}

@keyframes curved-motion {
  0% {
    transform: translate(var(--start-x), var(--start-y));
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--end-x), var(--end-y));
    opacity: 0;
  }
}

@keyframes particle-motion {
  0% {
    transform: translate(
      calc(var(--start-x) + var(--particle-offset-x)), 
      calc(var(--start-y) + var(--particle-offset-y))
    ) scale(0);
    opacity: 0;
  }
  15% {
    opacity: var(--particle-opacity);
    transform: translate(
      calc(var(--start-x) + var(--particle-offset-x)),
      calc(var(--start-y) + var(--particle-offset-y))
    ) scale(1);
  }
  85% {
    opacity: var(--particle-opacity);
  }
  100% {
    transform: translate(
      calc(var(--end-x) + var(--particle-offset-x)),
      calc(var(--end-y) + var(--particle-offset-y))
    ) scale(0);
    opacity: 0;
  }
}

@keyframes core-glow {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}
</style>