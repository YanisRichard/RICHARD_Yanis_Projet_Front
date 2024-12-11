<script lang="ts" setup="">

const username = ref('')

const password = ref('')

const router = useRouter()

const error = ref<string|null>(null)

async function onSubmit(event: Event) {
    event.preventDefault()


    try {            
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        if (!response.ok) throw new Error('Une erreur est survenue')

        const data = await response.json()

        const cookieJwt = useCookie('api_tracking_jwt')
        cookieJwt.value = data.token

        await router.push('app/dashboard')

         } catch (err) {
            error.value = 'Mon message d\'erreur'
        }
}

</script>

<template>
  <div>
    <form class="c-form__login" @submit="onSubmit">
      <div>
        <label class="c-form__label" for="username">Username</label>
        <input class="c-form__input" v-model="username" type="username" id="username" />
      </div>
      <div>
        <label class="c-form__label" for="password">Mot de passe</label>
        <input class="c-form__input" v-model="password" type="password" id="password" />
      </div>
      <div>
        <button class="c-form__button" type="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.c-form__login {
  background-color: #ff6b35; // Orange vibrant
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  & > div {
    display: flex;
    flex-direction: column;
  }
}

.c-form__label {
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  font-family: Arial, Helvetica, sans-serif
}

.c-form__input {
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
  font-family: sans-serif;

  &:focus {
    outline: none;
    border-color: white;
    background-color: rgba(255, 255, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
}

.c-form__button {
  background-color: white;
  color: #ff6b35;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>