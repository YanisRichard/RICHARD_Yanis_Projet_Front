<script lang="ts" setup="">

const emit = defineEmits(['habit:created'])

const title = ref("");
const description = ref("");
const error = ref<string | null>(null);

async function onSubmit(event: Event) {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/habits", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${useCookie("api_tracking_jwt").value}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
    });

    if (!response.ok) throw new Error("Une erreur est survenue");

    await response.json;

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
