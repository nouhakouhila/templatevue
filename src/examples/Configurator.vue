<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggleConfigurator"
    >
      <i class="py-2 fa fa-cog"></i>
    </a>
    <div class="shadow-lg card">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div :class="isRTL ? 'float-end' : 'float-start'">
          <h5 class="mt-3 mb-0">Paramétrage de la Société</h5>
        </div>
        <div
          class="mt-4"
          @click="toggleConfigurator"
          :class="isRTL ? 'float-start' : 'float-end'"
        >
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3" style="max-height: 400px; overflow-y: auto;">
        <div>
          <p><strong>Nom de la Société:</strong> {{ configuration.nomSociete }}</p>
          <p><strong>Téléphone:</strong> {{ configuration.tel }}</p>
          <p><strong>Fax:</strong> {{ configuration.fax }}</p>
          <p><strong>Adresse:</strong> {{ configuration.adresse }}</p>
          <p><strong>Email de Contact:</strong> {{ configuration.contact }}</p>
          <p><strong>Type d'Absence:</strong> {{ configuration.typeAbsence }}</p>
          <img :src="logo" alt="Logo de la société" class="img-fluid">
        </div>
      </div>
      <div class="mt-3">
        <button class="btn btn-primary" @click="goToModificationPage">Modifier</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const configuration = computed(() => store.state.configuration);
const logo = ref(configuration.value.logo);

const toggleConfigurator = () => store.commit("toggleConfigurator");

const router = useRouter();

const goToModificationPage = () => {
  router.push("/modifparam");
};

// Watcher pour mettre à jour l'URL du logo lorsque la configuration change
watch(configuration, (newConfig) => {
  logo.value = newConfig.logo;
}, { immediate: true });

onMounted(() => {
  const storedConfig = localStorage.getItem('configuration');
  if (storedConfig) {
    store.commit('updateConfiguration', JSON.parse(storedConfig));
  }
});
</script>

<style scoped>
.card-body p {
  margin-bottom: 1rem; /* Espacement entre les paragraphes */
  font-size: 1rem; /* Taille de police */
  color: #333; /* Couleur du texte */
  line-height: 1.5; /* Hauteur de ligne pour une meilleure lisibilité */
}
</style>
