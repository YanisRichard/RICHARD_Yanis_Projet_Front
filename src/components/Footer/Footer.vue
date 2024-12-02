<script lang="ts">
export default {
  name: "Footer1",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Habits.com </p>
      <nav class="footer-nav">
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Politique de confidentialité</a>
      </nav>
    </div>
  </footer>
</template>



<style scoped>
.footer {
  background: linear-gradient(to right, rgb(185, 101, 187), blue);
  color: #fff;
  padding: 1rem 0;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.footer-nav {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.footer-nav a {
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 0 0.5rem;
}
.footer-nav a:hover {
  text-decoration: underline;
}
</style>
