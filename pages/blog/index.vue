<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const filter = ref('')

const {data: categories} = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "category"
  && defined(slug.current)
]`)

const {data: posts} = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "post"
  && defined(slug.current)
  && ($filter =='' ||$filter in (categories[]->slug.current))
  ]|order(publishedAt desc)[0...2]{_id, title, image, "categories": categories[]->{_id, title, slug},
  slug, publishedAt}`, {filter: filter});  


function onCategoryClick (category:SanityDocument) {
  filter.value = category.slug.current
}

const page = ref(1)

function onPageClick (index: number) {
  page.value = index
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
        <div v-for="(category, index) in categories" :key="index" :class="[
          'p-blog__category',
        {'-is-active': filter === category.slug.current}
        ]" @click="onCategoryClick(category)">
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
      <br>
      On affiche la page {{ page }}
      <div class="p-blog__pagination">
        <div v-for="n in 5" :key="n" class="p-blog__page" @click="onPageClick(n)">Page {{ n }}</div>
      </div>

    </div>
  </main>
</template>

<style lang="scss">

</style>
