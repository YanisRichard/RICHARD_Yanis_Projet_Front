<script lang="ts" setup="">
import type { Habit } from "~/@types/habits";

const { data, refresh } = await useAsyncData<{
  globalHabits: Habit[];
  personalHabits: Habit[];
}>("dashboard", async () => {
  const response = await fetch("http://localhost:4000/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${useCookie("api_tracking_jwt").value}`,
    },
  });
  return await response.json();
});

async function deleteHabit(habit: Habit, type: "global" | "personal") {
  try {
    const response = await fetch(`http://localhost:4000/habits/${habit.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useCookie("api_tracking_jwt").value}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Mise à jour locale sans refetch complet
      if (type === "global" && data.value) {
        data.value.globalHabits = data.value.globalHabits.filter(
          (h) => h.id !== habit.id
        );
      } else if (data.value) {
        data.value.personalHabits = data.value.personalHabits.filter(
          (h) => h.id !== habit.id
        );
      }
    } else {
      console.error("Erreur lors de la suppression de l'habitude");
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}

function onHabitCreated() {
  console.log("Une nouvelle habitude a été créée");
  refresh();
}

onMounted(() => {
  $on("habit:created", onHabitCreated);
});
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Mon dashboard</h1>
    <h2 class="dashboard__subtitle">Habitudes globales</h2>
    <ul>
      <li
        v-for="(habit, index) in data.globalHabits"
        :key="index"
        class="dashboard__list-element"
      >
        {{ habit.title }} : {{ habit.description }}
        <button
          class="dashboard__button"
          @click="deleteHabit(habit, 'global')"
        >
          ✖️
        </button>
      </li>
    </ul>

    <h2 class="dashboard__subtitle">Habitudes quotidiennes</h2>
    <ul>
      <li
        v-for="(habit, index) in data.personalHabits"
        :key="index"
        class="dashboard__list-element"
      >
        {{ habit.title }} : {{ habit.description }}
        <button
          class="dashboard__button"
          @click="deleteHabit(habit, 'personal')"
        >
          ✖️
        </button>
      </li>
    </ul>

    <AddHabitForm />
  </div>
</template>

<style lang="scss">
.dashboard {
  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: brown;
  }

  &__subtitle {
    font-size: 1.8rem;
    color: #ff5a26;
    margin: 1.5rem 1rem 1rem;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5rem;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  &__list-element {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s ease;
    &:hover {
    background-color: #f0f0f0;
    }
  }

  &__button{
    color: #ff4136; // équivalent de text-red-500
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 1.2rem;
    padding: 0.25rem;
    border-radius: 4px;

    &:hover {
      color: #cc0000; // équivalent de hover:text-red-700
      transform: scale(1.1);
    }

    &:focus {
      outline: 2px solid rgba(255, 0, 0, 0.2);
    }
  }
}
</style>
