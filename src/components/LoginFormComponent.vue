<script setup lang="ts">
import { ref } from "vue";
import type { LoginActionType, UserType } from "../types";
import { useRouter } from "vue-router";
import { useAuth } from "../api/firebase/auth";
import { toast } from "vue3-toastify";
import Input from "./ui/input.vue";
import Button from "./ui/button.vue";

const initUser = {
  name: "",
  email: "",
  password: "",
};

const action = ref<LoginActionType>("Login");
const draftUser = ref<UserType>(initUser);
const router = useRouter();
const { login, register } = useAuth();

const handleSubmit = async () => {
  console.log('Login form submission started');
  
  try {
    if (action.value === "Login") {
      console.log('Attempting login with:', draftUser.value.email);
      const user = await login(
        draftUser.value.email,
        draftUser.value.password
      );
      
      console.log('Login successful, user:', user);
      toast.success("Logged in successfully!");
      draftUser.value = initUser;
      router.push("/dashboard");
      localStorage.setItem("user", JSON.stringify(user));
      console.log('User saved to localStorage:', user);
      return;
    }

    if (action.value === "Register") {
      console.log('Attempting registration with:', draftUser.value.email);
      const user = await register(draftUser.value);
      console.log('Registration successful, user:', user);
      toast.success("Registered successfully!");
      draftUser.value = initUser;
      router.push("/dashboard");
      localStorage.setItem("user", JSON.stringify(user));
      console.log('User saved to localStorage:', user);
    }
  } catch (err) {
    console.error('Authentication error:', err);    
    toast.error("Error during authentication. Please try again.");
    console.error(err);
  }
};
</script>

<template>
  <form
    class="p-6 bg-white rounded-lg shadow w-sm"
    @submit.prevent="handleSubmit"
  >
    <div class="flex items-center justify-between mb-6 text-center">
      <div class="w-full max-w-md mx-auto">
        <button
          type="button"
          @click="() => (action = 'Login')"
          :class="[
            action === 'Login' ? 'text-earth-900' : 'text-sage-200',
            'font-semibold hover:cursor-pointer transition-colors',
          ]"
        >
          Login
        </button>
      </div>

      <div class="w-full max-w-md mx-auto">
        <button
          type="button"
          @click="() => (action = 'Register')"
          :class="[
            action === 'Register' ? 'text-earth-900' : 'text-sage-200',
            'font-semibold hover:cursor-pointer transition-colors',
          ]"
        >
          Register
        </button>
      </div>
    </div>

    <div>
      <p class="mb-8 text-2xl">
        <span class="font-semibold text-garden-800">{{
          action === "Login" ? "Welcome back" : "Create Account"
        }}</span>
      </p>

      <div class="grid grid-cols-1 gap-4 my-4">
        <div v-if="action === 'Register'" class="grid gap-2">
          <label for="name" class="font-semibold text-earth-900">Name</label>
          <Input
            v-model="draftUser.name"
            type="text"
            id="name"
            class="w-full px-3 py-2 border-2 border-sage-300 rounded-xl active:border-garden-300 focus:border-garden-300"
            placeholder="Paola Hernandez"
          />
        </div>

        <div class="grid gap-2">
          <label for="email" class="font-semibold text-earth-900">Email</label>
          <Input
            v-model="draftUser.email"
            type="email"
            id="email"
            class="w-full px-3 py-2 border-2 border-sage-300 rounded-xl active:border-garden-300 focus:border-garden-300"
            placeholder="paola86@example.com"
          />
        </div>

        <div class="grid gap-2">
          <label for="password" class="font-semibold text-earth-900"
            >Password</label
          >
          <Input
            v-model="draftUser.password"
            type="password"
            id="password"
            class="w-full px-3 py-2 border-2 border-sage-300 rounded-xl active:border-garden-300 focus:border-garden-300"
            placeholder="*******"
          />
        </div>
      </div>
    </div>

    <Button
      type="submit"
      class="text-white font-semibold bg-garden-500 rounded-md px-8 py-1.5 w-full hover:cursor-pointer hover:bg-garden-600 transition-colors"
      >{{ action }}</Button
    >
  </form>
</template>
