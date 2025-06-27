<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import type { PlantType } from "../types";

type Props = {
  plant: PlantType;
};

const { plant } = defineProps<Props>();
const router = useRouter();

const plantedDaysAgo = "514";
const lastWateredDaysAgo = "2";
const status = "healthy";

function navigateToDetails() {
  router.push(`/plants/details/${plant.id}`);
}
</script>

<template>
  <article
    @click="navigateToDetails"
    class="grid p-12 mb-4 transition-all bg-white border md:p-6 sm:grid-cols-3 lg:grid-cols-3 rounded-xl place-content-center hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer border-garden-200"
  >
    <div class="grid col-span-2 text-sm place-content-start text-sage-600">
      <p class="text-base font-semibold">{{ plant.name }}</p>
      <p>{{ plant.species }}</p>
      <div class="flex items-center gap-2 my-2">
        <CalendarIcon class="size-4" />
        <p>Planted {{ plantedDaysAgo }} days ago</p>
      </div>
      <p>Last watered: {{ lastWateredDaysAgo }} days ago</p>
    </div>

    <div
      class="flex items-start justify-end mt-6 lg:justify-start 2xl:justify-end"
    >
      <p
        :class="`text-center rounded-full px-3 py-0.5 font-medium text-sm hover:bg-orange-100 hover:text-lime-800 transition-colors ${
          status === 'healthy'
            ? 'text-lime-800 bg-lime-100'
            : status === 'flowering'
            ? 'text-purple-800 bg-purple-100'
            : 'text-yellow-800 bg-yellow-100'
        }`"
      >
        {{ status }}
      </p>
    </div>
  </article>
</template>
