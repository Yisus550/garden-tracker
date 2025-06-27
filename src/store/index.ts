import { defineStore } from "pinia";
import type { GardenType, PlantType, UserDataType } from "../types";

const useStore = defineStore("main", {
  state: () => ({
    user: null as UserDataType | null,
    plants: [] as PlantType[],
    gardens: [] as GardenType[],
    isAuthenticated: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getPlants: (state) => state.plants,
    getGardens: (state) => state.gardens,
    getUserId: (state) => state.user?.id || null,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    setUser(user: UserDataType | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    setPlants(plants: PlantType[]) {
      this.plants = plants;
    },
    setGardens(gardens: GardenType[]) {
      this.gardens = gardens;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.plants = [];
      this.gardens = [];
    },
  },
});

export default useStore;
