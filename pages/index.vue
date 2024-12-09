<script lang="ts" setup="">
const { data: Homepage } = await useSanityQuery<SanityDocument[]>(groq`
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
        <Hero v-bind="{...Homepage.hero}" />
      </div>
    

    </div>
     
</template>

<style lang="scss">


</style>