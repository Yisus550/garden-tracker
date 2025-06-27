<script setup lang="ts">
import { ref } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div
    class="grid p-1.5 ml-4 rounded-lg not-sr-only lg:sr-only place-content-center bg-garden-500"
  >
    <Bars3Icon class="text-white cursor-pointer size-6" @click="toggleMenu" />
  </div>

  <div
    v-if="isOpen"
    class="fixed top-0 left-0 z-50 w-full h-full transition-all bg-black opacity-50"
    @click="toggleMenu"
  ></div>

  <div
    v-if="isOpen"
    :class="`fixed top-0 left-0 z-50 w-full h-full transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`"
    @click="toggleMenu"
  >
    <div
      class="absolute top-0 right-0 w-64 h-full p-4 bg-white shadow-lg"
      @click.stop
    >
      <ul class="space-y-4">
        <li>
          <RouterLink
            to="/dashboard"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/garden"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Garden
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/plants"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Plants
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
