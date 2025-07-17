<template>
  <div class="pointer-events-none fixed inset-0 z-[9999]">

    <div
      v-if="showRocket"
      class="rocket"
      :style="{
        top: `${rocketPos.y}px`,
        left: `${rocketPos.x}px`,
        transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`
      }"
    >
      <SvgoRocket class="stroke-white text-xl" />
    </div>

    <TransitionGroup
      tag="div"
      name="exhaust"
      class="relative h-full w-full"
    >
      <div
        v-for="p in exhaustParticles"
        :key="p.id"
        class="exhaust-particle"
        :style="{
          top: `${p.y}px`,
          left: `${p.x}px`,
          transform: `scale(${p.scale})`,
          opacity: p.opacity,
          background: p.color
        }"
      ></div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface ExhaustParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

const exhaustParticles = ref<ExhaustParticle[]>([]);
let particleId = 0;
const MAX_PARTICLES = 30;
const FADE_SPEED = 0.06;

const lastMousePos = ref({ x: 0, y: 0 });
const previousMousePos = ref({ x: 0, y: 0 });
const showRocket = ref(false);
const rocketPos = ref({ x: 0, y: 0 });
const currentAngle = ref(0);

let animationFrameId: number;
let mouseMovementTimeout: number;

const updateMousePosition = (event: MouseEvent) => {
  previousMousePos.value = { ...lastMousePos.value };
  lastMousePos.value = { x: event.clientX, y: event.clientY };

  // Calculate movement delta
  const deltaX = lastMousePos.value.x - previousMousePos.value.x;
  const deltaY = lastMousePos.value.y - previousMousePos.value.y;

  // Update angle if lots of movement
  if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
    const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    let angleDiff = newAngle - currentAngle.value;
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;

    currentAngle.value += angleDiff * 0.3;

    if (currentAngle.value > 360) currentAngle.value -= 360;
    if (currentAngle.value < 0) currentAngle.value += 360;
  }

  rocketPos.value = {
    x: lastMousePos.value.x,
    y: lastMousePos.value.y
  };

  showRocket.value = true;

  // No move no rocket :(
  clearTimeout(mouseMovementTimeout);
  mouseMovementTimeout = setTimeout(() => {
    showRocket.value = false;
  }, 150);
};

const createExhaustParticle = () => {
  if (!showRocket.value) return;

  // Calculate particle start pos
  const angle = (currentAngle.value - 90) * (Math.PI / 180);
  const exhaustDistance = 15;
  const exhaustX = rocketPos.value.x - Math.cos(angle) * exhaustDistance;
  const exhaustY = rocketPos.value.y - Math.sin(angle) * exhaustDistance;

  // Random offset for particle
  const randomOffset = 8;
  const offsetX = (Math.random() - 0.5) * randomOffset;
  const offsetY = (Math.random() - 0.5) * randomOffset;

  // Create particle with random props
  const colors = [
    'radial-gradient(circle, rgba(255,69,0,0.8) 0%, rgba(255,140,0,0.4) 50%, transparent 70%)',
    'radial-gradient(circle, rgba(255,140,0,0.8) 0%, rgba(255,215,0,0.4) 50%, transparent 70%)',
    'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 70%)',
  ];

  exhaustParticles.value.unshift({
    id: particleId++,
    x: exhaustX + offsetX,
    y: exhaustY + offsetY,
    scale: Math.random() * 0.8 + 0.4,
    opacity: Math.random() * 0.8 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    velocityX: (Math.random() - 0.5) * 2,
    velocityY: Math.random() * 3 + 1
  });
};

const updateParticles = () => {
  // Update existing particles
  for (let i = 0; i < exhaustParticles.value.length; i++) {
    const p = exhaustParticles.value[i];
    p.scale -= FADE_SPEED;
    p.opacity -= FADE_SPEED;
    p.x += p.velocityX;
    p.y += p.velocityY;
    p.velocityY += 0.1; // gravity
  }

  // Remove old particles
  exhaustParticles.value = exhaustParticles.value.filter(p => p.opacity > 0 && p.scale > 0);

  if (exhaustParticles.value.length > MAX_PARTICLES) {
    exhaustParticles.value.splice(MAX_PARTICLES);
  }

  if (showRocket.value) {
    createExhaustParticle();
  }

  animationFrameId = requestAnimationFrame(updateParticles);
};

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition);
  animationFrameId = requestAnimationFrame(updateParticles);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition);
  cancelAnimationFrame(animationFrameId);
  clearTimeout(mouseMovementTimeout);
});
</script>

<style scoped>
.rocket {
  position: absolute;
  will-change: transform;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.exhaust-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: none;
  will-change: transform, opacity;
  margin-top: -4px;
  margin-left: -4px;
}

.exhaust-enter-active,
.exhaust-leave-active {
  transition: all 0.3s ease;
}

.exhaust-enter-from {
  opacity: 0;
  transform: scale(0);
}

.exhaust-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>