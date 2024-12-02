<script lang="ts">
export default {
  name: 'Header2',
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
    <h1 class="header__title">Habits.com</h1>
    <nav v-if="navigation && navigation.length" class="header__nav">
      <ul>
        <li>Accueil</li>
        <li>Calendrier</li>
        <li>Compte</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #f5f5f5;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.header__title {
  font-family:Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgb(210, 114, 212);

}

.header__nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
  position: relative;
  background: linear-gradient(to right, rgb(185, 101, 187), blue);
  height: 100px;
  width: 650px;
  align-items: center ;
  justify-content: flex-end;
  padding-right: 40px;
  gap: 10%;
}

.header__nav ul:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  left: 0px;
  border-style: solid;
  border-width: 100px 0 0 30px;
  border-color: transparent transparent transparent #f5f5f5;
}

.header__nav li {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif ;
  color: white;
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
