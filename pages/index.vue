<script lang="ts" setup="">
import type { SanityDocument } from '@sanity/client'
const { data: Homepage } = await useSanityQuery<SanityDocument>(groq`
  *[_type == "homepage"][0]`);
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
      <div v-if="Homepage" class="p-homepage">
        <Hero v-bind="{ title: Homepage.hero.title, text: Homepage.hero.text, stats: Homepage.hero.stats, image: Homepage.hero.image }" />
      </div>
    </div>
     
</template>

<style lang="scss">


</style>