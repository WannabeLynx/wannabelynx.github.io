<template>
  <div class="md:h-screen h-full w-full overflow-y-auto overflow-x-hidden ml-5">
    <div class="h-screen flex flex-col justify-center select-none">

      <!-- Intro -->
      <p class="text-whitetransparent font-kalam">&lt;h1&gt</p>
      
      <!-- Hi -->
      <div class="flex font-solway text-white tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        <p class="">H</p>
        <p class="hover:text-yellowblue-100 shake">i</p> 
      </div>

      <!-- I'm Nino, -->
      <div class="font-solway tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        <div class="flex text-white">
          <p class="">I'm N</p>
          <p class="shake hover:text-yellowblue-100">i</p>
          <p class="">no,</p>
        </div>

        <!-- Web Developer -->
        <span class="flex text-white">
          <p class="font-kalam blue-shadow text-yellowblue-100 -mt-1 md:-mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">w</p>
          <p class="">eb developer</p>
        </span>
      </div>
      <p class="text-whitetransparent font-kalam">&lt;/h1&gt</p>

      <!-- Contact Button -->
      <p class=" text-whitetransparent font-kalam mt-10 ml-5">&lt;button&gt</p>
      <div class="my-2 ml-8 ">
        <button @click="onContact()" class="glow-on-hover p-5">
          <NuxtLink>
            <p class="text-yellowblue-100 font-solway">
              Contact Me!
            </p>
          </NuxtLink>
        </button>
      </div>
      <p class="text-whitetransparent font-kalam ml-5">&lt;/button&gt</p>
    </div>


    <div class="select-none">
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> TEST</p>
      <p class="text-8xl text-white"> LOL</p>
    </div>
  </div>
</template>

<script setup>

function onContact() {
  const router = useRouter();
  router.push({ path: '/contact' });
}

</script>