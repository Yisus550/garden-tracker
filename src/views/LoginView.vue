<script setup lang="ts">
import LeafComponent from "../components/ui/leafComponent.vue";
import LoginFormComponent from "../components/LoginFormComponent.vue";
</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen bg-sage-50">
    <div class="mb-8 text-center">
      <div class="p-4 mx-auto my-4 rounded-full bg-garden-500 size-16">
        <LeafComponent />
      </div>
      <h1 class="text-3xl font-semibold text-garden-800">Garden Journal</h1>
      <p class="font-medium text-sage-500">Track your growing journey</p>
    </div>

    <LoginFormComponent />
  </main>
</template>
