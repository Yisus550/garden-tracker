import { ref } from "vue";
import {
  createUser,
  validateUserCredentials,
} from "./users";
import type { UserDataType, UserType } from "../../types";
import useStore from "../../store";

export function useAuth() {
  const store = useStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string): Promise<UserDataType> => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const user = await validateUserCredentials(email, password);
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      store.setUser(user);
      
      return user;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Unknown error occurred";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: UserType) => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error("All fields are required.");
      }

      const user = await createUser(userData);
      
      store.setUser(user);
      
      return user;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Unknown error occurred";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    store.logout();
  };

  return {
    isLoading,
    error,
    login,
    register,
    logout,
  };
}
