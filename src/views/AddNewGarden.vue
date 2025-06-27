<script setup lang="ts">
import Button from "../components/ui/button.vue";
import Input from "../components/ui/input.vue";
import Label from "../components/ui/label.vue";
import Select from "../components/ui/select.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import router from "../router";
import type { DraftGardenType } from "../types";
import { useUserGardens } from "../composables/useUserGardens";

const { createGarden } = useUserGardens();

const initialGarden: DraftGardenType = {
  name: "",
  status: "planning",
  description: "",
};
const draftGarden = ref(initialGarden);

async function handleSubmit() {
  try {
    await createGarden(draftGarden.value);
    toast.success(`${draftGarden.value.name} garden added successfully!`);
    draftGarden.value = { ...initialGarden };
    router.push("/garden");
  } catch (error) {
    toast.error("Failed to add garden. Please try again.");
    console.error("Error adding garden:", error);
  }
}

function handleCancel() {
  draftGarden.value = { ...initialGarden };
  router.push("/garden");
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-start w-screen min-h-screen p-10 bg-garden-50 md:px-33"
  >
    <section class="grid max-w-xl mx-auto md:w-4xl">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold text-garden-800">Add New Garden</h2>
        <p class="text-garden-800">Start tracking a new garden in your space</p>
      </div>

      <form
        class="flex flex-col gap-4 p-6 mt-8 bg-white rounded-xl"
        @submit.prevent="handleSubmit"
      >
        <p class="text-2xl text-garden-800">
          <span class="font-semibold">Garden Details</span>
        </p>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="garden-name">Garden Name *</Label>
            <Input
              type="text"
              id="garden-name"
              name="garden-name"
              placeholder="Herb Garden"
              required
              v-model="draftGarden.name"
            />
          </div>

          <div class="flex flex-col w-full gap-2 md:w-1/2">
            <Label for="status">Status *</Label>
            <Select
              id="status"
              name="status"
              v-model="draftGarden.status"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Planning</option>
            </Select>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="description">Description *</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="A garden with herbs and vegetables"
            v-model="draftGarden.description"
          />
        </div>

        <div class="grid grid-cols-2 gap-2 mt-6 place-content-center">
          <Button type="reset" buttonType="secondary" @click="handleCancel">Cancel</Button>
          <Button type="submit">Add Garden</Button>
        </div>
      </form>
    </section>
  </main>
</template>
