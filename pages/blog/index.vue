<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, image, "categories": categories[]->{_id, title, slug}, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main>
    <div>
      <h2>Page de blog</h2>
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="p-blog">
          <NuxtLink :to="`/blog/${post.slug.current}`">
            <p>{{ post.title }}</p>
          </NuxtLink>
          <img
v-if="post.image && urlFor(post.image)"  
          class="p-blog__item-image"  :src="urlFor(post.image)?.url()" 
          alt="Alt"> <!-- Ne pas oublier le v-if, pour prendre en compte les cas où les articles ont des images --> 
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss"></style>
