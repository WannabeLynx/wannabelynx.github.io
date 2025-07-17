<template>
  <component :is="props.size" :class="styles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'h1' | 'h2' | 'h3' | 'h4'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  font?: 'lora' | 'manrope'
  color?: string
  underline?: boolean
  noWrap?: boolean
  breakWords?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'h2',
  weight: 'bold',
  font: 'manrope',
  color: 'text-white',
  underline: false,
  noWrap: false,
  breakWords: false,
})

const sizes: Record<NonNullable<Props['size']>, string> = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
}

const fontWeights: Record<NonNullable<Props['weight']>, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const fonts: Record<NonNullable<Props['font']>, string> = {
  lora: 'font-lora',
  manrope: 'font-manrope',
}

const styles = computed(() => [
  sizes[props.size],
  fontWeights[props.weight],
  fonts[props.font],
  props.color,
  {
    'underline': props.underline,
    'whitespace-nowrap': props.noWrap,
    'break-words': props.breakWords,
  },
])
</script>