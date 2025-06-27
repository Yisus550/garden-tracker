<script setup lang="ts">
import LeafComponent from "./ui/leafComponent.vue";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import type { GardenType } from "../types";

const props = defineProps<GardenType>();
const router = useRouter();

function navigateToDetails() {
  router.push(`/garden/details/${props.id}`);
}
</script>

<template>
  <article
    @click="navigateToDetails"
    class="flex flex-col p-12 mb-4 transition-all bg-white border md:p-6 rounded-xl place-content-center hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer border-garden-200"
  >
    <div class="flex items-center justify-between w-full">
      <div class="p-3 rounded-2xl bg-garden-100 w-fit">
        <LeafComponent size="6" color="text-garden-600" />
      </div>

      <Cog6ToothIcon class="size-5 text-sage-500" />
    </div>

    <div class="flex flex-col items-start justify-between gap-4 mt-1">
      <h3 class="text-2xl font-bold text-garden-800">{{ props.name }}</h3>
      <p class="text-sage-500">{{ props.description }}</p>
      <div class="flex items-center justify-between w-full gap-4">
        <p class="text-xs text-sage-500">{{ props.plants.length || 0 }} plants</p>
        <div class="p-2 rounded-full bg-garden-100 w-fit">
          <p class="text-xs font-medium text-garden-600">{{ props.status }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
