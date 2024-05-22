import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    configuration: {
      nomSociete: "OpenAI",
      tel: "+1 123 456 7890",
      fax: "+1 123 456 7891",
      adresse: "123 AI Street, AI City",
      contact: "contact@openai.com",
      typeAbsence: "Congé",
      logo: "",  // Assurez-vous que le logo est initialisé dans l'état
    },
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    updateConfiguration(state, newConfig) {
      state.configuration = { ...state.configuration, ...newConfig };
      localStorage.setItem("configuration", JSON.stringify(state.configuration));
    },
    sidebarMinimize(state) {
      state.isPinned = !state.isPinned;
      localStorage.setItem("isPinned", state.isPinned);
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      state.isNavFixed = !state.isNavFixed;
      localStorage.setItem("isNavFixed", state.isNavFixed);
    },
  },
  actions: {
    initFromLocalStorage({ commit }) {
      const storedConfig = localStorage.getItem("configuration");
      if (storedConfig) {
        commit("updateConfiguration", JSON.parse(storedConfig));
      }
      const isPinned = localStorage.getItem("isPinned");
      if (isPinned !== null) {
        commit("sidebarMinimize");
      }
      const isNavFixed = localStorage.getItem("isNavFixed");
      if (isNavFixed !== null) {
        commit("navbarFixed");
      }
    },
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  modules: {},
  getters: {},
});
