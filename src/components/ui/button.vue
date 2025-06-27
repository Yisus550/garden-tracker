<script setup lang="ts">
const props = defineProps<{
  buttonType?: "primary" | "secondary";
}>();
</script>

<template>
  <button
    :class="`inline-flex items-center gap-4 px-3 rounded-lg py-1.5 transition-colors font-medium hover:cursor-pointer text-center justify-center ${
      props.buttonType === 'secondary'
        ? 'border border-garden-300 hover:bg-garden-50'
        : 'bg-garden-500 hover:bg-garden-600 text-white'
    }`"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
