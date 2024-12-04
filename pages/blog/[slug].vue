<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Le post est introuvable'})
}

const { urlFor } = useSanityImage()

useSeoMeta({
  title: '${post.value.title} | Tracking App',
  description: 'Retrouvez nos dernières informations et notre actualité sur Habits.com !',
  ogTitle: post.value.title,
  ogDescription: 'Ce site est un site informatif', 
  ogImage: post.value.image && urlFor(post.value.image)?.url() ?
  urlFor(post.value.image)?.url() : '/meta-default.png',
})



</script>

<template>
  <div v-if="post" class="p-blog-plus">
    <h1>{{ post.title }}</h1>

    <div class="p-blog-slug__image">
      <SanityImage :asset-id="post.image.asset._ref" />
    </div>
    <div>
      <SanityContent v-bind="{ blocks: post.body }" />
    </div>
  </div>
</template>

<style lang="scss"></style>
