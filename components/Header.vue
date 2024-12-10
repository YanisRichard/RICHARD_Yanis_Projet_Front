<script lang="ts">
export default {
  name: "Header2",
  props: {
    title: {
      type: String,
      required: true,
    },
    navigation: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <header class="header">
    <h1 class="header__title">Habits.com</h1>
    <nav class="header__nav">
      <a href="/">Accueil</a>
      <a href="/blog">Blog</a>
      <a href="/login">Se Connecter</a>
      <a href="/register">S'Inscrire</a>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  background-color: #f5f5f5;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  &__title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    color: #ff5722;
  }

  &__nav {
    display: flex; /* Utiliser flexbox pour une ligne horizontale */
    gap: 2rem; /* Espacement entre les liens */
    
    a {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-decoration: none;
      color: #ff5722; /* Couleur des liens */
      font-size: 1rem;

      &:hover {
        text-decoration: underline; /* Effet au survol */
      }
    }
  }
}
</style>
