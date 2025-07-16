<template>
  <div class="relative h-screen overflow-hidden md:flex">

    <!-- mobile menu bar -->
    <div class="bg-darkgray text-gray-100 flex justify-end md:hidden">
      <!-- mobile menu button -->
      <button ref="mobileMenuButton" class="p-4 focus:outline-none focus:bg-yellowblue-100" @click="onOpenSidebar()">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- sidebar -->
    <div ref="sidebar" class="bg-black text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

      <!-- logo -->
      <div>
        <NuxtLink class="block text-center" to="/">
          <p class="text-6xl font-bold text-yellowblue-100 font-kalam blue-shadow">W</p>
        </NuxtLink>
      
        <p class="block text-center font-solway tracking-tighter">WannabeLynx</p>
      </div>

      <!-- nav -->
      <nav>
        <ul class="font-solway divide-y divide-whitetransparent">
          <li>
            <NuxtLink class="linkBase" to="/about">{{ about }}</NuxtLink>
          </li>
          <li>
            <NuxtLink class="linkBase" to="/skills">{{ skills }}</NuxtLink>
          </li>
          <li>
            <NuxtLink class="linkBase" to="/astrophotography">{{ astrophography }}</NuxtLink>
          </li>
          <li>
            <NuxtLink class="linkBase" to="/contact">{{ contact }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- content -->
    <div class="flex-1 text-2xl font-bold h-screen overflow-y-auto bg-darkgray">
      <main>
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup>

const about = 'About';
const skills = 'My Skills';
const astrophography = 'Astrophotography';
const contact = 'Contact';

const sidebar = ref(null);

function onOpenSidebar() {
  sidebar.value.classList.toggle('-translate-x-full');
}

</script>

<style>
.linkBase {
  @apply block py-2.5 text-center transition duration-200 hover:bg-yellowblue-200 hover:text-yellowblue-100;
}
</style>