<script setup lang="ts">
const props = defineProps<{
  type: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    class="w-full px-3 py-2 bg-white border-2 border-sage-300 rounded-xl active:border-garden-300 focus:border-garden-300"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :required="props.required"
    :value="modelValue"
    v-bind="$attrs"
    @input="
      emits('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
