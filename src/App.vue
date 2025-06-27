<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import NavbarComponent from "./components/NavbarComponent.vue";
import { useUserSession } from "./composables/useUserSession";
import useStore from "./store";
import { computed, watch } from "vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const { initializeSession } = useUserSession();

const isAuthenticated = computed(() => store.getIsAuthenticated);

initializeSession();

watch(
  isAuthenticated,
  (authenticated) => {
    if (!authenticated && route.path !== '/') {
      router.push('/');
    } else if (authenticated && route.path === '/') {
      router.push('/dashboard');
    }
  },
  { immediate: true }
);
</script>

<template>
  <NavbarComponent v-if="route.path !== '/'" />
  <RouterView />
</template>

<style scoped></style>
