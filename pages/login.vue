<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" placeholder="Entrez votre nom d'utilisateur" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input  type="password"  id="password"  v-model="password"  placeholder="Entrez votre mot de passe"  required    />
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <button type="submit" class="login-button">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      // Validation simple
      if (this.username === "" || this.password === "") {
        this.errorMessage = "Veuillez remplir tous les champs.";
        return;
      }

      // Exemple de simulation de connexion
      if (this.username === "admin" && this.password === "1234") {
        alert("Connexion réussie!");
        this.errorMessage = "";
      } else {
        this.errorMessage = "Nom d’utilisateur ou mot de passe incorrect.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ff5722;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>