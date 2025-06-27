import { createWebHistory, createRouter } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import GardenView from "../views/GardenView.vue";
import GardenDetailsView from "../views/GardenDetailsView.vue";
import AddNewPlant from "../views/AddNewPlant.vue";
import PlantsView from "../views/PlantsView.vue";
import PlantDetailsView from "../views/PlantDetailsView.vue";
import AddNewGarden from "../views/AddNewGarden.vue";
import useStore from "../store";

const requireAuth = () => {
  const store = useStore();
  const isAuthenticated = store.getIsAuthenticated;
  const user = store.getUser;
  
  console.log('Route guard check:', { isAuthenticated, user });
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return { name: 'login' };
  }
  return true;
};

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: requireAuth,
  },
  {
    path: "/garden",
    name: "garden",
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        name: "garden-list",
        index: true,
        component: GardenView,
      },
      {
        path: "add-garden",
        name: "add-garden",
        component: AddNewGarden,
      },
      {
        path: "details/:id",
        name: "garden-details",
        component: GardenDetailsView,
      },
    ],
  },
  {
    path: "/plants",
    name: "plants",
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        name: "plants-list",
        index: true,
        component: PlantsView,
      },
      {
        path: "add-plant",
        name: "add-plant",
        component: AddNewPlant,
      },
      {
        path: "details/:id",
        name: "plant-details",
        component: PlantDetailsView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
