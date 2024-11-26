<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Login',
  props: {
    onLogin: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const email = ref('');
    const password = ref('');
    const errors = ref({
      email: '',
      password: '',
      general: '',
    });

    const validate = () => {
      errors.value.email = email.value ? '' : 'L’email est requis.';
      errors.value.password = password.value ? '' : 'Le mot de passe est requis.';
      return !errors.value.email && !errors.value.password;
    };

    const handleSubmit = async () => {
      if (validate()) {
        try {
          await props.onLogin(email.value, password.value);
        } catch (err) {
          errors.value.general = 'Connexion échouée. Veuillez vérifier vos identifiants.';
        }
      }
    };

    return { email, password, errors, handleSubmit };
  },
});
</script>

<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email :</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Entrez votre email"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="errors.general" class="error">{{ errors.general }}</p>
    </form>
  </div>
</template>


<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
button {
  margin-top: 1rem;
}
</style>
