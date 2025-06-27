<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchPlantById } from "../api/firebase/plants";
import { ArrowLeftIcon, CalendarIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";
import { VueSpinnerHourglass } from "vue3-spinners";
import type { PlantType } from "../types";
import useStore from "../store";

const route = useRoute();
const router = useRouter();
const store = useStore();

const plant = ref<PlantType | null>(null);
const isLoading = ref<boolean>(true);
const notFound = ref<boolean>(false);

const plantId = computed(() => route.params.id as string);

const daysSincePlanted = computed(() => {
  if (!plant.value?.plantedDate) return 0;
  const plantedDate = new Date(plant.value.plantedDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - plantedDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const lastWateredDaysAgo = ref(2);
const status = ref("healthy");

function goBack() {
  router.back();
};

watchEffect(async () => {
  if (plantId.value) {
    try {
      isLoading.value = true;
      
      const storeGardens = store.getGardens;
      let foundPlant: PlantType | null = null;
      
      for (const garden of storeGardens) {
        const plantInGarden = garden.plants.find(p => p.id === plantId.value);
        if (plantInGarden) {
          foundPlant = plantInGarden;
          break;
        }
      }
      
      if (!foundPlant) {
        foundPlant = await fetchPlantById(plantId.value);
      }
      
      plant.value = foundPlant;
      notFound.value = !foundPlant;
    } catch (error) {
      console.error("Error fetching plant:", error);
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
      <h3 class="text-xl font-bold text-garden-800">Plant Not Found</h3>
      <p class="text-sage-600">The plant you're looking for doesn't exist.</p>
    </div>

    <div v-else-if="plant" class="grid gap-6">
      <article class="bg-white border border-garden-200 rounded-xl p-8 shadow-sm">
        <div class="grid gap-6 md:grid-cols-3">
          <div class="md:col-span-2">
            <h1 class="text-3xl font-bold text-garden-800 mb-2">{{ plant.name }}</h1>
            <div class="grid gap-3 text-sage-600">
              <div>
                <h3 class="font-semibold text-garden-700 mb-1">Species</h3>
                <p>{{ plant.species }}</p>
              </div>
              <div v-if="plant.variety">
                <h3 class="font-semibold text-garden-700 mb-1">Variety</h3>
                <p>{{ plant.variety }}</p>
              </div>
              <div class="flex items-center gap-2">
                <CalendarIcon class="size-5 text-garden-500" />
                <div>
                  <span class="font-medium">Planted:</span>
                  {{ new Date(plant.plantedDate).toLocaleDateString() }}
                  <span class="text-sm text-sage-500">({{ daysSincePlanted }} days ago)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <h3 class="font-semibold text-garden-700 mb-2">Status</h3>
              <p
                :class="`inline-block text-center rounded-full px-4 py-2 font-medium text-sm ${
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
            
            <div class="grid gap-2">
              <div class="flex justify-between">
                <span class="text-sage-600">Last watered:</span>
                <span class="font-medium">{{ lastWateredDaysAgo }} days ago</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sage-600">Days growing:</span>
                <span class="font-medium">{{ daysSincePlanted }}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article v-if="plant.notes" class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <DocumentTextIcon class="size-5 text-garden-500" />
          <h2 class="text-xl font-semibold text-garden-800">Notes</h2>
        </div>
        <p class="text-sage-700 leading-relaxed">{{ plant.notes }}</p>
      </article>

      <article class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-garden-800 mb-4">Care Timeline</h2>
        <div class="flex items-center justify-center h-32 text-sage-500 border-2 border-dashed border-sage-200 rounded-lg">
          <p>Care timeline coming soon...</p>
        </div>
      </article>

      <article class="bg-white border border-garden-200 rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-garden-800 mb-4">Growth Statistics</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="text-center p-4 bg-garden-50 rounded-lg">
            <p class="text-2xl font-bold text-garden-600">{{ daysSincePlanted }}</p>
            <p class="text-sm text-sage-600">Days Growing</p>
          </div>
          <div class="text-center p-4 bg-lime-50 rounded-lg">
            <p class="text-2xl font-bold text-lime-600">{{ Math.floor(daysSincePlanted / 7) }}</p>
            <p class="text-sm text-sage-600">Weeks Old</p>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <p class="text-2xl font-bold text-blue-600">{{ lastWateredDaysAgo }}</p>
            <p class="text-sm text-sage-600">Days Since Watered</p>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>
