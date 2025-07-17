<template>
  <div class="flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg">
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="22" height="34" rx="11" stroke="white" stroke-width="2"/>
      <rect x="10" y="8" width="4" height="8" rx="2" fill="white" class="animate-scroll-bounce"/>
    </svg>
  </div>
</template>

<style scoped>
@keyframes scroll-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.3;
  }
}

.animate-scroll-bounce {
  animation: scroll-bounce 2.2s ease-in-out infinite;
}
</style>
