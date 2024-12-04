<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, image, "categories": categories[]->{_id, title, slug}, slug, publishedAt}`;

const CATEGORIES_QUERY = groq`*[
  _type == "category"
  && defined(slug.current)
]`;

const filter = ref('')

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { data: categories } = await useSanityQuery<SanityDocument[]>(CATEGORIES_QUERY);

function onCategoryClick (category:SanityDocument) {
  filter.value = category.slug.current
}

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main>
    <div>
      <h1>Les articles</h1>
      <!--Liste de boutons  -->
      <div class="p-blog__categories">
        filter : {{filter }}
        <div v-for="(category, index) in categories" :key="index" class="p-blog__category" @click="onCategoryClick(category)">
          <button class="category__button"> 
            {{ category.title }}
          </button>
        </div>
      </div>

      
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="p-blog">
          <NuxtLink :to="`/blog/${post.slug.current}`">
            <p>{{ post.title }}</p>
          </NuxtLink>
          <div class="p-blog__item-categories">
            <div v-for="(category, index) in post.categories" :key="index" class="p-blog__item">
              {{ category.title }}
            </div>
          </div>
          <img v-if="post.image && urlFor(post.image)"  
          class="p-blog__item-image"  :src="urlFor(post.image)?.url()" 
          alt="Alt"> <!-- Ne pas oublier le v-if, pour prendre en compte les cas où les articles ont des images --> 
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss">

</style>
