// main.js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";

import '@fortawesome/fontawesome-free/css/all.css';

const appInstance = createApp(App);

// Initialiser l'état Vuex depuis le stockage local
store.dispatch('initFromLocalStorage');

appInstance.use(store);
appInstance.use(router);

appInstance.use(ArgonDashboard);
;
appInstance.mount("#app");
