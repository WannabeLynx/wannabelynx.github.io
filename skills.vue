<template>
  <div class="md:h-screen h-full w-full flex flex-col md:flex-row overflow-y-auto overflow-x-hidden grow-1 pr-10">

    <!-- Grid-Left -->
    <div class="m-auto ml-5 w-full pl-5 pr-12 text-lg md:text-3xl flex-auto grow-0">     
      <!-- Back-End -->
      <p class="mt-5 font-solway text-white text-lg md:text-3xl">{{ backend }}</p>
      <div class="progressBarBg">
        <div class="progressBar" style="width: 90%"></div>
      </div>
  
      <!-- Front-End -->
      <p class="mt-5 font-solway text-white text-lg md:text-3xl">{{ frontend }}</p>
      <div class="progressBarBg">
        <div class="progressBar" style="width: 70%"></div>
      </div>
  
      <!-- C# -->
      <p class="mt-5 font-solway text-white text-lg md:text-3xl">{{ csharp }}</p>
      <div class="progressBarBg">
        <div class="progressBar" style="width: 80%"></div>
      </div>
  
      <!-- vue -->
      <p class="mt-5 font-solway text-white text-lg md:text-3xl">{{ vue }}</p>
      <div class="progressBarBg">
        <div class="progressBar" style="width: 65%"></div>
      </div>
    </div>

    <!-- Grid-Right -->
    <div class="m-auto w-full pl-8 pr-12 md:pl-0 flex-auto justify-start">
      <p class="text-6xl text-yellowblue-100 font-kalam mt-10 md:mt-0">{{ title }}</p>
      <p class="text-6xl text-yellowblue-100 font-kalam ml-6">{{ title2 }}</p>
      <p class="text-white text-base md:text-2xl pr-5">
        {{ test }}
      </p>
    </div>

  </div>
</template>

<script setup>

const title = 'Skills';
const title2 = '& Experience';
const frontend = 'Front-end';
const backend = 'Back-end';
const vue = 'Vue';
const csharp = 'C#';

const test = 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase.'

</script>

<style>
.progressBarBg {
  @apply mt-3 bg-whitetransparent h-1 rounded-lg pr-14;
}
.progressBar {
 @apply bg-yellowblue-200 h-1 rounded-lg pr-14;
}
</style>