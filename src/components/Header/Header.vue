<script lang="ts">
export default {
  name: 'Header_',
  props: {
    title: {
      type: String,
      required: true,
    },
    navigation: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>
    <nav v-if="navigation && navigation.length" class="header__nav">
      <ul>
        <li v-for="(item, index) in navigation" :key="index">
          <a :href="item.link">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #f5f5f5;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__title {
  font-family:Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  color: #333;
}
.header__nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}
.header__nav a {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-decoration: none;
  color: #007bff;
}
.header__nav a:hover {
  text-decoration: underline;
}
</style>
