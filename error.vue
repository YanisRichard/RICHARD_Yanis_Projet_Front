<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({ 
  error: {
    type: Object as () => NuxtError,
    default: null
  }
})


const handleError = () => {
  clearError({ redirect: '/' }); 
}
</script>

<template>
  <div v-if="error" class="p-error">
    Ma page d'erreur {{ error.statusCode }} personnalisée
    <br>
    message : {{ error.statusMessage }}
    <br>
    <Button @click="handleError">Retour à la page d'accueil</Button>
  </div>
</template>

<style lang="scss">
</style>