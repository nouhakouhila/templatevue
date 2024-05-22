<template>
  <div id="app">
    <h1>Formulaire de Société</h1>
    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="nomSociete">Nom de la Société:</label>
          <input type="text" id="nomSociete" v-model="tempConfig.nomSociete" required />
        </div>
        <div>
          <label for="tel">Téléphone:</label>
          <input type="tel" id="tel" v-model="tempConfig.tel" required />
        </div>
        <div>
          <label for="fax">Fax:</label>
          <input type="tel" id="fax" v-model="tempConfig.fax" />
        </div>
        <div>
          <label for="adresse">Adresse:</label>
          <input type="text" id="adresse" v-model="tempConfig.adresse" required />
        </div>
        <div>
          <label for="contact">Email de Contact:</label>
          <input type="email" id="contact" v-model="tempConfig.contact" required />
        </div>
        <div>
          <label for="logo">Logo:</label>
          <input type="file" id="logo" @change="handleLogoUpload" accept="image/*" />
          <img v-if="tempConfig.logo" :src="tempConfig.logo" alt="Logo de la société" class="img-fluid">
        </div>
        <div>
          <label>Type d'Absence:</label>
          <div>
            <label>
              <input type="radio" value="Congé" v-model="tempConfig.typeAbsence" /> Congé
            </label>
            <label>
              <input type="radio" value="Maladie" v-model="tempConfig.typeAbsence" /> Maladie
            </label>
            <label>
              <input type="radio" value="Autre" v-model="tempConfig.typeAbsence" /> Autre
            </label>
          </div>
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const store = useStore();
const router = useRouter();

// État local temporaire pour le formulaire de société
const tempConfig = ref({ ...store.state.configuration });

const handleSubmit = () => {
  // Mettre à jour l'état global Vuex avec les modifications
  store.commit('updateConfiguration', { ...tempConfig.value });
  
  // Enregistrer les données modifiées dans le stockage local du navigateur
  localStorage.setItem('configuration', JSON.stringify(tempConfig.value));
  
  // Rediriger vers la page de configuration
  router.push("/configuration");
};

// Fonction pour gérer le chargement du logo
const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  // Mettre à jour l'état temporaire avec l'URL du fichier sélectionné
  tempConfig.value.logo = URL.createObjectURL(file);
};
</script>

<style scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-container {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

input[type="radio"] {
  margin-right: 5px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
