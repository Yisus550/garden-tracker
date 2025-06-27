import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "./style.css";
import "vue3-toastify/dist/index.css";
import { VueSpinnersPlugin } from "vue3-spinners";

const app = createApp(App);
const pinia = createPinia();
const toastifyOptions = {
  position: "bottom-right",
  icon: false,
  hideProgressBar: true,
};

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, toastifyOptions as ToastContainerOptions);
app.use(VueSpinnersPlugin)
app.mount("#app");
