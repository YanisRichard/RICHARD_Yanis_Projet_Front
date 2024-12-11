<script lang="ts" setup="">
defineProps<{ value: string, text: string}>()
</script>

<template>
    <div class="c-stat-card">
        <span class="c-stat-card__value">{{ value }}</span>
        <span class="c-stat-card__text">{{ text }}</span>
    </div>
</template>

<style lang="scss">
.c-stat-card {
  background: linear-gradient(135deg, #ff9800, #ff5722); /* Dégradé orange */
  border-radius: 12px;
  padding: 1.5rem;
  margin: 20px;
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s; /* Animation au survol */
  display: flex;
  flex-direction: column;
  width: 23%; /* Ne dépasse pas un quart de l'écran */
  min-width: 200px; /* Taille minimale */
  height: auto; /* Ajuste automatiquement la hauteur */
  box-sizing: border-box;
}

.c-stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Plus grande ombre au survol */
}



.c-stat-card__text {
  font-size: 1rem;
  font-weight: 300;
  opacity: 0.9;
}

.c-stat-card__value {
  font-size: 2rem;
  font-weight: 300;
  opacity: 0.9;
}


</style>