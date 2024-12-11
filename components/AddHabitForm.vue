<script lang="ts" setup="">
const title = ref("");
const description = ref("");
const error = ref("")

async function onSubmit(event: Event) {
  event.preventDefault();

  try {
    await useTrackingApi('/habits', {
        method: 'POST',
        body: { title: title.value, description: description.value}
    })

    $trigger('habit:created')

  } catch (err) {
    console.log(err)
    error.value = "Mon message d'erreur";
  }
}
</script>

<template>
  <div>
    <form @submit="onSubmit">
      <div class="c-title__habitForm">
        <label for="title">Titre Habitude</label>
        <input v-model="title" type="text" id="title" />
      </div>
      <div class="c-description__habitForm">
        <label for="description">Description de l'habitude</label>
        <input v-model="description" type="text" id="description" />
      </div>
      <div>
        <button type="submit">Ajouter la tâche</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
// Palette de couleurs automnales
$autumn-brown: #8B4513;     // Marron terre
$autumn-orange: #D2691E;    // Orange cuivré
$autumn-gold: #DAA520;      // Or doré
$autumn-rust: #B7410E;      // Rouille
$autumn-cream: #FFF8DC;     // Crème claire
$autumn-forest-green: #228B22; // Vert forêt

form {
    background-color: $autumn-cream;
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.c-title__habitForm, 
.c-description__habitForm {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;

    label {
        color: $autumn-brown;
        margin-bottom: 0.5rem;
        font-weight: 600;
        transition: color 0.3s ease;
    }

    input {
        padding: 0.75rem;
        border: 2px solid $autumn-orange;
        border-radius: 8px;
        background-color: white;
        color: $autumn-rust;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            border-color: $autumn-gold;
            box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.2);
        }

        &::placeholder {
            color: $autumn-orange;
            opacity: 0.7;
        }
    }
}

button[type="submit"] {
    width: 100%;
    background-color: $autumn-forest-green;
    color: $autumn-cream;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: darken($autumn-forest-green, 10%);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    &:active {
        transform: translateY(1px);
        background-color: darken($autumn-forest-green, 15%);
    }
}

</style>