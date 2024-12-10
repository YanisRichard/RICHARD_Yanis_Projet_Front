<script lang="ts" setup="">
const { data, refresh } = await useAsyncData("dashboard", async () => {
  const response = await fetch("http://localhost:4000/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${useCookie("api_tracking_jwt").value}`,
    },
  });
  return await response.json();
});

async function deleteHabit(habit, type: "global" | "personal") {
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
      if (type === "global") {
        data.value.globalHabits = data.value.globalHabits.filter(
          (h) => h.id !== habit.id
        );
      } else {
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
</script>

<template>
  <div>
    <h1>Mon dashboard</h1>
    <h2>Habitudes globales</h2>
    <ul>
      <li
        v-for="(habit, index) in data.globalHabits"
        :key="index"
        class="flex justify-between items-center"
      >
        {{ habit.title }} : {{ habit.description }}
        <button
          @click="deleteHabit(habit, 'global')"
          class="text-red-500 hover:text-red-700"
        >
          ✖️
        </button>
      </li>
    </ul>

    <h2>Habitudes quotidiennes</h2>
    <ul>
      <li
        v-for="(habit, index) in data.personalHabits"
        :key="index"
        class="flex justify-between items-center"
      >
        {{ habit.title }} : {{ habit.description }}
        <button
          @click="deleteHabit(habit, 'personal')"
          class="text-red-500 hover:text-red-700"
        >
          ✖️
        </button>
      </li>
    </ul>

    <AddHabitForm @habit:created="onHabitCreated" />
  </div>
</template>

<style lang="scss"></style>
