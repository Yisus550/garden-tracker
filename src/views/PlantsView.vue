<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { PlusIcon } from "@heroicons/vue/24/solid";
import Input from "../components/ui/input.vue";
import PlantCardComponent from "../components/PlantCardComponent.vue";
import { VueSpinnerHourglass } from "vue3-spinners";
import { useUserPlants } from "../composables/useUserPlants";

const { userPlants, isLoading, loadUserPlants } = useUserPlants();
const searchQuery = ref<string>("");

const filteredPlants = computed(() => {
  if (!searchQuery.value.trim()) {
    return userPlants.value;
  }

  return userPlants.value.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      plant.species?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      plant.variety?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  await loadUserPlants();
});
</script>

<template>
  <main
    class="flex flex-col w-screen min-h-screen p-10 place-content-start bg-garden-50 md:px-33 xl:px-80"
  >
    <section class="flex items-center justify-between gap-2 mb-4">
      <div class="flex flex-col gap-2 mb-4">
        <h2 class="text-3xl font-bold text-garden-800">My Plants</h2>
        <p class="text-sage-600">Track and manage all your plants</p>
      </div>
      <RouterLink
        to="/plants/add-plant"
        class="flex items-center gap-4 px-3 rounded-lg py-1.5 bg-garden-500 hover:cursor-pointer hover:bg-garden-600 transition-colors"
      >
        <PlusIcon class="text-white size-4" />
        <span class="hidden font-semibold text-white sm:block">Add Plant</span>
        <span class="font-semibold text-white sm:hidden">Add</span>
      </RouterLink>
    </section>

    <section class="grid gap-4">
      <div class="w-full md:w-5/12">
        <Input
          type="text"
          placeholder="Search plants..."
          v-model="searchQuery"
        />
      </div>

      <div
        :class="`grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 ${
          isLoading ? 'mx-auto' : ''
        }`"
      >
        <div
          v-if="isLoading"
          class="flex items-center justify-center w-full h-64 text-sage-600"
        >
          <VueSpinnerHourglass size="48" color="#3a7c3a" :loading="isLoading" />
        </div>
        <PlantCardComponent
          v-if="filteredPlants.length > 0"
          v-for="plant in filteredPlants"
          :key="plant.id"
          :plant="plant"
        />

        <div v-else class="grid col-span-3 mt-12 place-items-center">
          <h3 class="text-xl font-bold text-garden-800">
            {{
              searchQuery ? "No plants match your search" : "No plants found"
            }}
          </h3>
          <p class="text-sage-600">
            {{
              searchQuery
                ? "Try a different search term"
                : "Add new plants to start"
            }}
          </p>
        </div>
      </div>
    </section>
    <RouterView />
  </main>
</template>
