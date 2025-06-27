<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import LeafComponent from "./ui/leafComponent.vue";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import useStore from "../store";
import { computed } from "vue";
import HamburgerComponent from "./HamburgerComponent.vue";
import { useAuth } from "../api/firebase/auth";
import { useUserSession } from "../composables/useUserSession";

const route = useRoute();
const router = useRouter();
const store = useStore();
const { logout } = useAuth();
const { clearSession } = useUserSession();

const userName = computed(() => store.getUser?.name || "Guest");

const handleLogout = () => {
  logout();
  clearSession();
  router.push("/");
};
</script>

<template>
  <nav
    class="flex items-center w-screen p-3 bg-white border-b border-b-garden-200 md:px-33 xl:px-80"
  >
    <div class="flex items-center justify-start gap-8">
      <div class="flex items-center gap-3">
        <div
          class="hidden p-1 bg-garden-500 rounded-xl size-8 place-content-center sm:grid"
        >
          <LeafComponent size="4" />
        </div>
        <p class="text-xl text-garden-800">
          <span class="font-semibold">Garden Journal</span>
        </p>
      </div>

      <div class="flex items-center justify-start gap-4 sr-only lg:not-sr-only">
        <RouterLink
          to="/dashboard"
          :class="`flex items-center gap-2 text-sm ${
            route.path === '/dashboard'
              ? 'bg-garden-100 text-garden-500'
              : 'text-sage-500 hover:bg-garden-50'
          } rounded-lg p-2 hover:cursor-pointer transition-all`"
        >
          <CalendarIcon
            :class="`size-4 ${
              route.path === '/dashboard' ? 'text-garden-500' : 'text-sage-500'
            }`"
          />
          <span class="font-semibold">Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/garden"
          :class="`flex items-center gap-2 text-sm ${
            route.path.includes('/garden')
              ? 'bg-garden-100 text-garden-500'
              : 'text-sage-500 hover:bg-garden-50'
          } rounded-lg p-2 hover:cursor-pointer transition-all`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="`lucide lucide-leaf w-4 h-4 ${
              route.path === '/garden' ? 'text-garden-500' : 'text-sage-500'
            }`"
            data-lov-id="src/components/AuthForm.tsx:39:12"
            data-lov-name="Leaf"
            data-component-path="src/components/AuthForm.tsx"
            data-component-line="39"
            data-component-file="AuthForm.tsx"
            data-component-name="Leaf"
            data-component-content="%7B%22className%22%3A%22w-8%20h-8%20text-white%22%7D"
          >
            <path
              d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            ></path>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
          </svg>
          <span class="font-semibold">Garden</span>
        </RouterLink>

        <RouterLink
          to="/plants"
          :class="`flex items-center gap-2 text-sm ${
            route.path.includes('/plants')
              ? 'bg-garden-100 text-garden-500'
              : 'text-sage-500 hover:bg-garden-50'
          } rounded-lg p-2 hover:cursor-pointer transition-all`"
        >
          <Cog6ToothIcon
            :class="`size-4 ${
              route.path === '/plants' ? 'text-garden-500' : 'text-sage-500'
            }`"
          />
          <span class="font-semibold">Plants</span>
        </RouterLink>
      </div>
    </div>

    <div class="flex items-center justify-end w-auto gap-2 ml-auto sm:gap-4">
      <p class="sr-only 2xl:not-sr-only text-sage-500">
        Welcome back, {{ userName }}!
      </p>

      <button
        @click="handleLogout"
        class="px-3 py-1.5 bg-white border border-garden-300 rounded-lg hover:cursor-pointer hover:bg-garden-50 transition-all"
      >
        Logout
      </button>
    </div>

    <HamburgerComponent />
  </nav>
</template>
