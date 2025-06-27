<script setup lang="ts">
import Button from "../components/ui/button.vue";
import Input from "../components/ui/input.vue";
import Label from "../components/ui/label.vue";
import Select from "../components/ui/select.vue";
import TextArea from "../components/ui/textArea.vue";
import { ref, onMounted } from "vue";
import type { DraftPlantType } from "../types";
import { toast } from "vue3-toastify";
import router from "../router";
import { useUserPlants } from "../composables/useUserPlants";
import { useUserGardens } from "../composables/useUserGardens";
import { useAuthDebug } from "../composables/useAuthDebug";

const initialPlant: DraftPlantType = {
  name: "",
  species: "",
  variety: "",
  gardenId: "",
  plantedDate: "",
  notes: "",
};
const draftPlant = ref<DraftPlantType>(initialPlant);

const { createPlant } = useUserPlants();
const { userGardens, loadUserGardens } = useUserGardens();
const { logAuthState } = useAuthDebug();

async function handleSubmit() {
  try {
    await createPlant(draftPlant.value);
    toast.success(`${draftPlant.value.name} plant added successfully!`);
    draftPlant.value = { ...initialPlant };
    router.push("/plants");
  } catch (error) {
    toast.error("Failed to add plant. Please try again.");
    console.error("Error adding plant:", error);
  }
}

function handleCancel() {
  draftPlant.value = { ...initialPlant };
  router.push("/plants");
}

onMounted(async () => {
  console.log('AddNewPlant mounted');
  logAuthState();
  console.log('User gardens composable:', { userGardens: userGardens.value });
  await loadUserGardens();
  console.log('User gardens after load:', userGardens.value);
});
</script>

<template>
  <main
    class="flex flex-col items-center justify-start w-screen min-h-screen p-10 bg-garden-50 md:px-33"
  >
    <section class="grid max-w-xl mx-auto md:w-4xl">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold text-garden-800">Add New Plant</h2>
        <p class="text-garden-800">Start tracking a new plant in your garden</p>
      </div>

      <form
        class="flex flex-col gap-4 p-6 mt-8 bg-white rounded-xl"
        @submit.prevent="handleSubmit"
      >
        <p class="text-2xl text-garden-800">
          <span class="font-semibold">Plant Details</span>
        </p>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="plant-name">Plant Name *</Label>
            <Input
              type="text"
              id="plant-name"
              name="plant-name"
              placeholder="Tomato"
              required
              v-model="draftPlant.name"
            />
          </div>

          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="plant-species">Species *</Label>
            <Input
              type="text"
              id="plant-species"
              name="plant-species"
              placeholder="Solanum lycopersicum"
              required
              v-model="draftPlant.species"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="variety">Variety</Label>
            <Input
              type="text"
              id="variety"
              name="variety"
              placeholder="Cherry Tomato"
              v-model="draftPlant.variety"
            />
          </div>

          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="garden">Garden *</Label>
            <Select
              name="garden"
              id="garden"
              required
              v-model="draftPlant.gardenId"
            >
              <option v-for="garden in userGardens" :value="garden.id" :key="garden.id">
                {{ garden.name }}
              </option>
            </Select>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <Label for="planted-date">Planted Date *</Label>
          <Input
            type="date"
            id="planted-date"
            name="planted-date"
            required
            v-model="draftPlant.plantedDate"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <Label for="notes">Notes</Label>
          <TextArea
            id="notes"
            name="notes"
            placeholder="Any additional notes about the plant"
            v-model="draftPlant.notes"
          ></TextArea>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-6 place-content-center">
          <Button type="reset" buttonType="secondary" @click="handleCancel">Cancel</Button>
          <Button type="submit">Add Plant</Button>
        </div>
      </form>
    </section>
  </main>
</template>
