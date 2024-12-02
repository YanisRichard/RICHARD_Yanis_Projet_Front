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
        } catch {
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
    <h2 class="login__h2">Connexion</h2>
    <form @submit.prevent="handleSubmit">
      <div class="login__divLabel">
        <label class="login__label" for="email">Email :</label> <br>
        <input
          id="email"
          v-model="email"
          type="email"
          class="login__input"
          placeholder="Entrez votre email"
        >
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="login__divLabel">
        <label class="login__label" for="password">Mot de passe :</label> <br>
        <input
          id="password"
          v-model="password"
          type="password"
          class="login__input"
          placeholder="Entrez votre mot de passe"
        >
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button class="login__button" type="submit">Se connecter</button>
      <p v-if="errors.general" class="error">{{ errors.general }}</p>
    </form>
  </div>
</template>


<style scoped>

.login {
  border: 1px;
  border-radius: 20px;
  background: linear-gradient(to bottom right, rgb(185, 101, 187), blue);
  max-width: 500px;
  padding: 20px;
}

.login__h2 {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #fff;
}

.login__label {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #fff;

}

.login__divLabel {
  padding-bottom: 10px;
}

.login__input {
  border-radius: 5px;
}

.login__button {
  background: #fff;
  color: blue;
  padding: 16px 32px;
  border: 1px solid gray;
  border-radius: 48px;
  text-decoration: none;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
button {
  margin-top: 1rem;
}
</style>
