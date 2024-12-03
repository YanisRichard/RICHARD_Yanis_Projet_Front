<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

</script>

<template>
    <div>
        page d'Accueil
        <Button>Bonjour</Button>

        {{ posts }}
        <ListParfums />
    </div>
</template>

<style lang="scss">

</style>