<template>
  <p :class="styles">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'p1' | 'p2' | 'p3'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  font?: 'lora' | 'manrope'
  color?: string
  underline?: boolean
  noWrap?: boolean
  breakWords?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'p1',
  weight: 'regular',
  font: 'lora',
  color: 'text-white',
  underline: false,
  noWrap: false,
  breakWords: false,
})

const sizes: Record<NonNullable<Props['size']>, string> = {
  p1: 'text-sm leading-[18px]',
  p2: 'text-base leading-normal',
  p3: 'text-lg leading-snug',
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