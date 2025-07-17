<template>
  <div class="relative h-full w-full overflow-hidden bg-black">
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
  </div>
</template>

<script setup lang="ts">

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
