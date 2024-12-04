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

  //order(publishedAt desc)[2...4]{_id, title, image, "categories": categories[]->{_id, title, slug}, slug, publishedAt}, {}


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
        <div v-for="n in 2" :key="n" class="p-blog__page" @click="onPageClick(n)">Page {{ n }}</div>
      </div>

    </div>
  </main>
</template>

<style lang="scss">
main {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; // Couleur de fond pour le contraste
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

.p-blog__button {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  button.p-category-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #0056b3;
    }
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
}

li.p-blog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  a {
    text-decoration: none;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px;
    color: #333;
  }

  .p-blog__item-image {
    width:auto;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid #f0f0f0;
  }

  .p-blog__item-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 10px;

    .p-blog__item {
      background-color: #007bff;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  ul {
    grid-template-columns: 1fr;
  }

  .p-blog__item-image {
    height: 150px;
  }
}
</style>
