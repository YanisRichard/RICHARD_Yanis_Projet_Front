<script lang="ts" setup="">

const props = defineProps<{ action: 'login'|'register'}>()

const username = ref('')

const password = ref('')

const router = useRouter()

const error = ref<string|null>(null)

async function onSubmit(event: Event) {
    event.preventDefault()

    //Envoyer une equête POST sur l'API par la route auth/register avec le username & le password
    //Vérifier qu'on récupère bien un token JWT comme réponse
    //Vérifier que notre nouvel utilisateur a bien été créé
    try {
        const response = await fetch('http://localhost:4000/auth/register', {
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
    <h1>Page d'inscription</h1>
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
        <button type="submit">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
</style>