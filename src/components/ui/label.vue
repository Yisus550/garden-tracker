<script setup lang="ts">
const props = defineProps({
  for: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <label
    class="text-sm font-medium text-earth-900"
    :for="props.for"
    v-bind="$attrs"
    ><slot></slot
  ></label>
</template>
