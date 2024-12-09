<script lang="ts" setup="">
defineProps<{
  title: string;
  text: string;
  stats: { value: string; text: string }[];
}>();
const { urlFor } = useSanityImage();

const { data: Homepage } = await useSanityQuery<SanityDocument[]>(groq`
  *[_type == "homepage"][0]`);
console.log(Homepage);
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <img class="hero__img" :src="urlFor(Homepage?.hero?.image)?.url()" alt="Hero Image">
      <div class="hero__overlay">
      <h1 class="hero__title">{{ Homepage?.hero.title }}</h1>
      <p class="hero__text">{{ Homepage?.hero.text }}</p>
      </div>
    </div>
  </section>
  <section>
    <div class="c-hero__stats">
      <div
        v-for="(stat, index) in Homepage.hero.stats" :key="index" class="c-hero__stat">
        <StatCard v-bind="stat" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">

h1 {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin: 2%;
  color: white;
  text-align: center;
}

p {
  font-family: Arial, Helvetica, sans-serif;
  margin: 2%;
}

button {
  margin: 2%;
}

.hero {
  position: relative;
  width: 100%;
  height: 400px; /* Hauteur de la bannière */
  overflow: hidden;
}

.hero__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Recadre l'image */
  z-index: 1;
}

.hero__overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: white;
}

.hero__title {
  font-size: 2.5rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  margin: 0;
}

.hero__text {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.c-hero__stats {
  display: flex; /* Active le mode Flexbox */
  flex-wrap: wrap; /* Permet aux cards de passer à la ligne si nécessaire */
  justify-content: center; 
  gap: 1rem;
}

.c-hero__stat {
  flex: 1 1 calc(20% - 1rem); /* Chaque card prend 25% de la largeur avec un espace */
  max-width: calc(20% - 1rem); /* Limite la largeur pour respecter la ligne */
  box-sizing: border-box; /* Inclut padding et border dans les calculs de largeur */
  display: flex;
  flex-direction: column; /* Pour une meilleure organisation interne */
  align-items: center; /* Centrer le contenu à l'intérieur des cards */
}
</style>
