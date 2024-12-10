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
    username: {{ username }} password: {{ password }}
    <form @submit="onSubmit">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="username" id="username" />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div>
        <button type="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
</style>