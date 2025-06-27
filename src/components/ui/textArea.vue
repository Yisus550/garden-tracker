<script setup lang="ts">
const props = defineProps<{
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <textarea
    class="w-full px-3 py-2 border-2 border-sage-300 rounded-xl active:border-garden-300 focus:border-garden-300"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :required="props.required"
    v-bind="$attrs"
    @input="
      emits('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
    rows="4"
    maxlength="500"
  />
</template>
