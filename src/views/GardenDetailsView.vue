<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchGardenById } from "../api/firebase/garden";
import { ArrowLeftIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
import { VueSpinnerHourglass } from "vue3-spinners";
import type { GardenType } from "../types";
import PlantCardComponent from "../components/PlantCardComponent.vue";
import LeafComponent from "../components/ui/leafComponent.vue";
import useStore from "../store";

const route = useRoute();
const router = useRouter();
const store = useStore();

const garden = ref<GardenType | null>(null);
const isLoading = ref<boolean>(true);
const notFound = ref<boolean>(false);

const gardenId = computed(function() {
  return route.params.id as string;
});

const activePlants = computed(function() {
  if (!garden.value?.plants) return 0;
  return garden.value.plants.length;
});

const statusColor = computed(function() {
  if (!garden.value?.status) return 'text-gray-800 bg-gray-100';
  
  if (garden.value.status === 'active') {
    return 'text-green-800 bg-green-100';
  } else if (garden.value.status === 'planning') {
    return 'text-blue-800 bg-blue-100';
  } else {
    return 'text-yellow-800 bg-yellow-100';
  }
});

function goBack() {
  router.back();
}

function navigateToPlantDetails(plantId: string) {
  router.push(`/plants/details/${plantId}`);
}

watchEffect(async function() {
  if (gardenId.value) {
    try {
      isLoading.value = true;
      
      const storeGardens = store.getGardens;
      let foundGarden: GardenType | null = storeGardens.find(function(g) {
        return g.id === gardenId.value;
      }) || null;
      
      if (!foundGarden) {
        foundGarden = await fetchGardenById(gardenId.value);
      }
      
      garden.value = foundGarden;
      notFound.value = !foundGarden;
    } catch (error) {
      console.error("Error fetching garden:", error);
      notFound.value = true;
    } finally {
      isLoading.value = false;
    }
  }
});
</script>

<template>
  <main class="flex flex-col w-screen min-h-screen p-10 place-content-start bg-garden-50 md:px-33 xl:px-80">
    <section class="flex items-center gap-4 mb-6">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-3 py-2 text-garden-600 hover:text-garden-800 hover:bg-garden-100 rounded-lg transition-colors"
      >
        <ArrowLeftIcon class="size-5" />
        <span class="font-medium">Back</span>
      </button>
    </section>

    <div
      v-if="isLoading"
      class="flex items-center justify-center w-full h-64 text-sage-600"
    >
      <VueSpinnerHourglass size="48" color="#3a7c3a" :loading="isLoading" />
    </div>

    <div v-else-if="notFound" class="grid col-span-3 mt-12 place-items-center">
      <h3 class="text-xl font-bold text-garden-800">Garden Not Found</h3>
      <p class="text-sage-600">The garden you're looking for doesn't exist.</p>
    </div>

    <div v-else-if="garden" class="grid gap-6">
      <article class="bg-white border border-garden-200 rounded-xl p-8 shadow-sm">
        <div class="grid gap-6 md:grid-cols-3">
          <div class="md:col-span-2">
            <div class="flex items-center gap-4 mb-4">
              <div class="p-3 rounded-2xl bg-garden-100 w-fit">
                <LeafComponent size="8" color="text-garden-600" />
              </div>
              <h1 class="text-3xl font-bold text-garden-800">{{ garden.name }}</h1>
            </div>
            <p class="text-sage-700 text-lg mb-4">{{ garden.description }}</p>
            <div class="flex items-center gap-2">
              <UserGroupIcon class="size-5 text-garden-500" />
              <span class="font-medium">{{ activePlants }} plants in this garden</span>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <h3 class="font-semibold text-garden-700 mb-2">Status</h3>
              <p
                :class="`inline-block text-center rounded-full px-4 py-2 font-medium text-sm ${statusColor}`"
              >
                {{ garden.status }}
              </p>
            </div>
            
            <div class="grid gap-2">
              <div class="flex justify-between">
                <span class="text-sage-600">Total plants:</span>
                <span class="font-medium">{{ activePlants }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sage-600">Garden type:</span>
                <span class="font-medium capitalize">{{ garden.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-garden-800 mb-4">Plants in this Garden</h2>
        <div v-if="garden.plants && garden.plants.length > 0" class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <PlantCardComponent
            v-for="plant in garden.plants"
            :key="plant.id"
            :plant="plant"
            @click="navigateToPlantDetails(plant.id)"
          />
        </div>
        <div v-else class="flex items-center justify-center h-32 text-sage-500 border-2 border-dashed border-sage-200 rounded-lg">
          <div class="text-center">
            <p class="text-lg font-medium">No plants in this garden yet</p>
            <p class="text-sm">Add some plants to get started</p>
          </div>
        </div>
      </article>

      <article class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-garden-800 mb-4">Garden Statistics</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="text-center p-4 bg-garden-50 rounded-lg">
            <p class="text-2xl font-bold text-garden-600">{{ activePlants }}</p>
            <p class="text-sm text-sage-600">Total Plants</p>
          </div>
          <div class="text-center p-4 bg-lime-50 rounded-lg">
            <p class="text-2xl font-bold text-lime-600">{{ garden.status === 'active' ? 'Active' : garden.status === 'planning' ? 'Planning' : 'Inactive' }}</p>
            <p class="text-sm text-sage-600">Status</p>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <p class="text-2xl font-bold text-blue-600">0</p>
            <p class="text-sm text-sage-600">Care Events</p>
          </div>
        </div>
      </article>

      <article class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-garden-800 mb-4">Garden Timeline</h2>
        <div class="flex items-center justify-center h-32 text-sage-500 border-2 border-dashed border-sage-200 rounded-lg">
          <p>Garden activity timeline coming soon...</p>
        </div>
      </article>
    </div>
  </main>
</template>
