<script lang="ts" setup="">
const title = ref("");
const description = ref("");

const emit = defineEmits(['habit:created'])


async function onSubmit(event: Event) {
  event.preventDefault();

  try {
    await useTrackingApi('/habits', {
        method: 'POST',
        body: { title: title.value, description: description.value}
    })

    emit('habit:created')

  } catch (err) {
    error.value = "Mon message d'erreur";
  }
}
</script>

<template>
  <div>
    Titre: {{ title }} Description: {{ description }}
    <form @submit="onSubmit">
      <div>
        <label for="title">Titre Habitude</label>
        <input v-model="title" type="text" id="title" />
      </div>
      <div>
        <label for="description">Description de l'habitude</label>
        <input v-model="description" type="text" id="description" />
      </div>
      <div>
        <button type="submit">Ajouter la tâche</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>
