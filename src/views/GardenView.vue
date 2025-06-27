<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { onMounted } from "vue";
import GardenCardComponent from "../components/GardenCardComponent.vue";
import { useUserGardens } from "../composables/useUserGardens";

const { userGardens, isLoading, loadUserGardens } = useUserGardens();

onMounted(async () => {
  await loadUserGardens();
});
</script>

<template>
  <main
    class="flex flex-col w-screen min-h-screen p-10 place-content-start bg-garden-50 md:px-33 xl:px-80"
  >
    <section class="flex items-center justify-between gap-2 mb-4">
      <div class="flex flex-col gap-2 mb-4">
        <h2 class="text-3xl font-bold text-garden-800">My Gardens</h2>
        <p class="text-sage-600">Organize your plants by garden spaces</p>
      </div>
      <RouterLink
        to="/garden/add-garden"
        class="flex items-center gap-4 px-3 rounded-lg py-1.5 bg-garden-500 hover:cursor-pointer hover:bg-garden-600 transition-colors"
      >
        <PlusIcon class="text-white size-4" />
        <span class="hidden font-semibold text-white sm:block">New Garden</span>
        <span class="font-semibold text-white sm:hidden">New</span>
      </RouterLink>
    </section>

    <section class="grid gap-4">
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

        <GardenCardComponent
          v-if="userGardens.length > 0"
          v-for="garden in userGardens"
          :key="garden.id"
          v-bind="garden"
        />

        <div v-else class="grid col-span-3 mt-12 place-items-center">
          <h3 class="text-xl font-bold text-garden-800">No gardens found</h3>
          <p class="text-sage-600">Add new garden to start.</p>
        </div>
      </div>
    </section>
  </main>
</template>
