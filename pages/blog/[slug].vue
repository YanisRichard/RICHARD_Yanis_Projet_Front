<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

const { data: post, error } = useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});
console.log(error);

console.log(post);
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
