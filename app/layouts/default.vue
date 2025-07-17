
<template>
  <div class="flex flex-col h-screen">

    <header class="flex items-center justify-around h-15 bg-gray-800">
      <Heading>
        {{ $t('nav.home') }}
      </Heading>
      <Paragraph>
        {{ $t('nav.contact') }}
      </Paragraph>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer></footer>

  </div>
</template>

<script setup lang="ts">
import Paragraph from '~/components/common/typographie/Paragraph.vue';
import Heading from '~/components/common/typographie/Heading.vue';


</script>
