<template>
  <Transition
    enter-active-class="transition-opacity duration-[800ms] ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-[800ms] ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isDomOpen" class="relative h-full w-full overflow-hidden bg-black">
      <!-- Static Stars -->
      <div
        class="absolute top-0 left-0 h-px w-px bg-transparent"
        :style="{
          boxShadow: '73vw 8vh #FFF, 91vw 42vh #FFF, 5vw 46vh #FFF, 62vw 33vh #FFF, 15vw 91vh #FFF, 82vw 76vh #FFF, 45vw 12vh #FFF, 99vw 23vh #FFF, 30vw 60vh #FFF, 55vw 80vh #FFF, 20vw 20vh #FFF, 80vw 5vh #FFF'
        }"
      ></div>
      <div
        class="animate-twinkle-slow absolute top-0 left-0 h-px w-px bg-transparent"
        :style="{
          boxShadow: '10vw 30vh #FFF, 40vw 70vh #FFF, 90vw 10vh #FFF, 60vw 90vh #FFF, 5vw 5vh #FFF, 95vw 95vh #FFF, 50vw 50vh #FFF, 25vw 75vh #FFF'
        }"
      ></div>
      <div
        class="animate-twinkle-fast absolute top-0 left-0 h-px w-px bg-transparent"
        :style="{
          boxShadow: '18vw 58vh #FFF, 78vw 88vh #FFF, 38vw 18vh #FFF, 88vw 48vh #FFF, 28vw 78vh #FFF, 68vw 8vh #FFF, 48vw 38vh #FFF, 98vw 68vh #FFF'
        }"
      ></div>

      <!-- ✨ Shooting Stars Container ✨ -->
      <ShootingStar
        v-for="star in shootingStars"
        :key="star.id"
        :start-x="star.startX"
        :start-y="star.startY"
        :end-x="star.endX"
        :end-y="star.endY"
        :duration="star.duration"
        :delay="star.delay"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoryStore } from '~/stores/roryStore';
import ShootingStar from '../effects/ShootingStar.vue';

interface ShootingStarData {
  id: number;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  duration: string;
  delay: string;
}

const roryStore = useRoryStore();
const isDomOpen = computed(() => roryStore.isDomOpen);

const shootingStars = ref<ShootingStarData[]>([]);
let intervalId: number;

const createShootingStar = () => {
  const id = Date.now();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Create curved trajectory
  const startFromTop = Math.random() > 0.5;
  const goesRight = Math.random() > 0.5;

  let startX: number, startY: number, endX: number, endY: number;

  if (startFromTop) {
    startY = -50;
    startX = Math.random() * screenWidth;
    if (goesRight) {
      endX = startX + (screenWidth * 0.3) + (Math.random() * screenWidth * 0.4);
      endY = screenHeight * 0.6 + (Math.random() * screenHeight * 0.2);
    } else {
      endX = startX - (screenWidth * 0.3) - (Math.random() * screenWidth * 0.4);
      endY = screenHeight * 0.6 + (Math.random() * screenHeight * 0.2);
    }
  } else {
    if (goesRight) {
      startX = -50;
      startY = Math.random() * screenHeight * 0.7;
      endX = screenWidth * 0.6 + (Math.random() * screenWidth * 0.4);
      endY = startY + (screenHeight * 0.2) + (Math.random() * screenHeight * 0.3);
    } else {
      startX = screenWidth + 50;
      startY = Math.random() * screenHeight * 0.7;
      endX = screenWidth * 0.4 - (Math.random() * screenWidth * 0.4);
      endY = startY + (screenHeight * 0.2) + (Math.random() * screenHeight * 0.3);
    }
  }

  const newStar: ShootingStarData = {
    id,
    startX: `${startX}px`,
    startY: `${startY}px`,
    endX: `${endX}px`,
    endY: `${endY}px`,
    duration: `${1.5 + Math.random() * 2}s`,
    delay: `${Math.random() * 3}s`
  };

  shootingStars.value.push(newStar);

  const totalAnimationTime = (parseFloat(newStar.duration) + parseFloat(newStar.delay)) * 1000;
  setTimeout(() => {
    shootingStars.value = shootingStars.value.filter(s => s.id !== id);
  }, totalAnimationTime);
};

onMounted(() => {
  intervalId = window.setInterval(createShootingStar, 4000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
@keyframes twinkle {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

.animate-twinkle-slow {
  animation: twinkle 2s infinite alternate;
}

.animate-twinkle-fast {
  animation: twinkle 3s infinite alternate;
}
</style>
