<script setup lang="ts">
import LeafComponent from "./ui/leafComponent.vue";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";

type Props = {
  title: string;
  total: number;
  growthRate: string;
  icon?: "leaf" | "settings" | "calendar";
};
const { title, total, growthRate, icon = "leaf" } = defineProps<Props>();
</script>

<template>
  <article
    class="grid w-full grid-cols-2 p-6 transition-all bg-white shadow rounded-xl place-content-start hover:-translate-y-1 hover:shadow-lg"
  >
    <div class="flex flex-col items-start justify-center w-37">
      <p class="text-sm font-medium text-sage-800">{{ title }}</p>
      <p class="text-xl text-garden-800">
        <span class="font-bold">{{ total }}</span>
      </p>
      <p class="text-sm font-medium text-garden-600">
        +{{ growthRate }}% from last month
      </p>
    </div>
    <div class="flex items-center justify-end w-full">
      <div class="p-3 size-12 place-content-center rounded-2xl bg-garden-100">
        <LeafComponent
          v-if="icon === 'leaf'"
          size="6" color="text-garden-600"
        />
        <Cog6ToothIcon
          v-else-if="icon === 'settings'"
          class="size-6 text-garden-600"
        />
        <CalendarIcon
          v-else="icon === 'calendar'"
          class="size-6 text-garden-600"
        />
      </div>
    </div>
  </article>
</template>
