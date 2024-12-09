<script lang="ts" setup="">
const { urlFor } = useSanityImage()  


const { data: Homepage } = await useSanityQuery<SanityDocument[]>(groq`
  *[_type == "homepage"][0]{
    title,
    hero {
      text,
      image {
        asset -> {
          _id,
          url
        }
      }
    }
  }
`);
console.log(Homepage);

useSeoMeta({
  title: 'Habits.com',
  ogTitle: 'Habits',
  description: 'Bienvenue sur Habits.com !',
  ogDescription: 'Vous êtes sur mon site :p', 
})

</script>

<template>
    <div>
      <div class="hero">
        <img class="hero__img" :src="urlFor(Homepage?.hero?.image)?.url()" alt="Hero Image">
        <h2 class="hero__title">{{ Homepage?.title }}</h2>
      </div>
      <div>
        <p class="hero__text">{{ Homepage?.hero.text }}</p>
        <ListParfums />
      </div>
    </div>

</template>

<style lang="scss">

h2 {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin: 2%;
  color: blue;
  text-align: center;

}

p {
  font-family: Arial, Helvetica, sans-serif;
  margin: 2%;
}

button{
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

.hero__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  z-index: 2;
  text-align: center;
  margin: 0;
}

</style>