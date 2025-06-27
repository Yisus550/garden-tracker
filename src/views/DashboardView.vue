<script setup lang="ts">
import PlantStatsComponent from "../components/PlantStatsComponent.vue";
import PlantCardComponent from "../components/PlantCardComponent.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted } from "vue";
import { VueSpinnerHourglass } from "vue3-spinners";
import { useUserPlants } from "../composables/useUserPlants";

const { userPlants, isLoading, loadUserPlants } = useUserPlants();

const recentPlants = computed(() => {
  const plants = userPlants.value || [];
  return plants.slice(0, 3);
});

const totalPlants = computed(() => (userPlants.value || []).length);
const plantsInBloom = computed(() => {
  const total = (userPlants.value || []).length;
  return Math.floor(total * 0.4);
});
const fruitingPlants = computed(() => {
  const total = (userPlants.value || []).length;
  return Math.floor(total * 0.6);
});

onMounted(async () => {
  console.log('Dashboard mounted');
  try {
    await loadUserPlants();
    console.log('User plants loaded:', userPlants.value);
    console.log('Recent plants:', recentPlants.value);
  } catch (error) {
    console.error('Error loading plants in dashboard:', error);
  }
});
</script>

<template>
  <main
    class="flex flex-col w-screen p-10 place-content-start bg-garden-50 md:px-33 xl:px-80"
  >
    <section class="mb-4">
      <h2 class="text-3xl font-bold text-garden-800">Welcome back!</h2>
      <p class="text-sage-600">Here's what's growing in your garden</p>
    </section>

    <section
      class="flex flex-col items-center justify-between gap-6 my-4 lg:flex-row sm:gap-5"
    >
      <PlantStatsComponent title="Total Plants" :total="totalPlants" growthRate="8" />
      <PlantStatsComponent
        title="Plants in Bloom"
        :total="plantsInBloom"
        growthRate="12"
        icon="settings"
      />
      <PlantStatsComponent
        title="Fruiting Plants"
        :total="fruitingPlants"
        growthRate="5"
        icon="calendar"
      />
    </section>

    <div class="grid w-full grid-cols-1 gap-8 mt-4 md:grid-cols-2">
      <section class="flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xl font-semibold text-garden-800">Recent Plants</p>
          <button
            class="px-3 py-2 text-sm font-medium bg-white cursor-pointer rounded-xl text-sage-800"
          >
            View All
          </button>
        </div>

        <div class="mt-3">
          <div
            v-if="isLoading"
            class="flex items-center justify-center w-full h-64 text-sage-600"
          >
            <VueSpinnerHourglass
              size="48"
              color="#3a7c3a"
              :loading="isLoading"
            />
          </div>
          
          <div v-else-if="recentPlants.length === 0" class="flex items-center justify-center w-full h-32 text-sage-600">
            <div class="text-center">
              <p class="text-lg font-medium">No plants yet</p>
              <p class="text-sm">Add your first plant to get started!</p>
            </div>
          </div>
          
          <PlantCardComponent
            v-else
            v-for="plant in recentPlants"
            :key="plant.id"
            :plant="plant"
          />
        </div>
      </section>

      <section class="flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xl font-semibold text-garden-800">Quick Actions</p>
        </div>

        <div class="mt-5">
          <div
            class="p-6 mb-4 bg-white border rounded-xl place-content-center border-garden-200"
          >
            <div class="flex flex-col place-content-start text-sage-600">
              <h2 class="font-semibold">Today's Tasks</h2>

              <div class="mt-1">
                <div class="flex items-center justify-between mt-2 text-sm">
                  <p class="w-auto">Water Cherry Tomatoes</p>
                  <p class="font-medium text-garden-600 lg:block md:hidden">
                    Due now
                  </p>
                  <div
                    class="hidden font-medium rounded-full size-2 bg-garden-600 lg:hidden md:block"
                  ></div>
                </div>

                <div class="flex items-center justify-between mt-2 text-sm">
                  <p class="w-auto">Check lettuce</p>
                  <p class="font-medium text-amber-600 lg:block md:hidden">
                    Overdue
                  </p>
                  <div
                    class="hidden font-medium rounded-full size-2 bg-amber-600 lg:hidden md:block"
                  ></div>
                </div>

                <div class="flex items-center justify-between mt-2 text-sm">
                  <p class="w-auto">Fertilize herbs</p>
                  <p class="text-sage-400 lg:block md:hidden">Tomorrow</p>
                  <div
                    class="hidden font-medium rounded-full size-2 bg-sage-400 lg:hidden md:block"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-xl bg-garden-500">
            <h3 class="font-medium text-white">Ready to grow something new?</h3>
            <p class="mt-3 text-sm text-sage-100">
              Add a new plant to your collection and start tracking its journey.
            </p>
            <button
              class="flex items-center gap-4 px-3 py-2 mt-4 text-sm font-medium transition-colors bg-white rounded-xl hover:cursor-pointer hover:bg-sage-100"
              @click="$router.push('/plants/add-plant')"
            >
              <PlusIcon class="text-lg text-sage-800 size-4" />
              <span class="text-sage-800">Add Plant</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
