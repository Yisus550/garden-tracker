<script setup lang="ts">
const { size, color } = defineProps<{
  size?: string;
  color?: string;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="`lucide lucide-leaf ${
      size ? 'w-' + size + ' h-' + size : 'w-8 h-8'
    } ${color ? color : 'text-white'}`"
    data-lov-id="src/components/AuthForm.tsx:39:12"
    data-lov-name="Leaf"
    data-component-path="src/components/AuthForm.tsx"
    data-component-line="39"
    data-component-file="AuthForm.tsx"
    data-component-name="Leaf"
    data-component-content="%7B%22className%22%3A%22w-8%20h-8%20text-white%22%7D"
  >
    <path
      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
    ></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
</template>
