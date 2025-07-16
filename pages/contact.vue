<template>
  <div class="sm:h-screen h-full w-full flex flex-col sm:flex-row overflow-y-auto overflow-x-hidden grow-1 pr-10">
    <!-- Contact -->
    <div class="m-auto w-full pl-8 sm:pl-0 pr-12 flex-auto grow-0">
      <p class="text-whitetransparent font-kalam">&lt;form&gt</p>
      <div class="grid grid-cols-2">
        <input class="inputBase col-span-1" type="text" v-model="name" placeholder="Name" />
        <input class="inputBase col-span-1" type="email" v-model="email" placeholder="E-Mail" />
        <input class="inputBase col-span-2" type="text" v-model="subject" placeholder="Subject" />
        <textarea class="inputBase min-h-[80px] col-span-2" v-model="message" placeholder="Write your message here ..."></textarea>
      </div>
      <p class="text-whitetransparent font-kalam">&lt;/form&gt</p>
    </div>


    <!-- Social Links -->
    <div class="animate__animated animate__fadeInRightBig select-none m-auto w-full pl-8 pr-12 sm:pl-0 flex-auto">
      <div class="flex justify-center">
        <p class="text-whitetransparent font-kalam">&lt;li&gt</p>
      </div>
      <!-- LinkedIn -->
      <div class="flex py-3 pl-2 justify-center">
        <a href="https://www.linkedin.com/in/nino-baer/" class="button">
          <img class="h-6 w-6 sm:h-8 sm:w-8" src="~/assets/icons/linkedinIcon.svg" />
        </a>
        <p class="font-solway text-white pl-2">LinkedIn</p>
      </div>

      <!-- GitHub -->
      <div class="flex py-3 pl-2 justify-center">
        <a href="https://github.com/ninoLeon" class="button">
          <img class="h-6 w-6 sm:h-8 sm:w-8" src="~/assets/icons/githubIcon.svg" />
        </a>
        <p class="font-solway text-white pl-2">GitHub</p>
      </div>

      <!-- Instagram -->
      <div class="flex py-3 pl-2 justify-center">
        <a href="https://instagram.com/wannabelynx" class="button">
          <img class="h-6 w-6 sm:h-8 sm:w-8" src="~/assets/icons/instagramIcon.svg" />
        </a>
          <p class="font-solway text-white pl-2">Insta</p>
      </div>

      <!-- Steam -->
      <div class="flex py-3 pl-2 justify-center">
        <a href="https://steamcommunity.com/id/wannabelynx" class="button">
          <img class="h-6 w-6 sm:h-8 sm:w-8" src="~/assets/icons/steamIcon.svg" />
        </a>
        <p class="font-solway text-white pl-2">Steam</p>
      </div>
      <div class="flex justify-center">
        <p class="text-whitetransparent font-kalam">&lt;/li&gt</p>
      </div>

    </div>
  </div>
</template>

<script setup>
function onInsta() {
const router = useRouter();
router.push({ path: '/contact' });
}

</script>

<style>
.inputBase {
@apply bg-blacktransparent rounded-md text-white font-solway text-base sm:text-lg p-2 my-2 ml-2;
}

textarea:focus, input:focus, input[type]:focus, .uneditable-input:focus {   
  border-color: #0000ff;
  box-shadow: 0 1px 1px #ffe700 inset, 0 0 8px #0000ff;
  outline: 0 none;
}
</style>