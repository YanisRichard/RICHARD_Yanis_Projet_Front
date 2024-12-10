<script lang="ts" setup="">
const {data, refresh}= await useAsyncData('dashboard', async () => {
        const response = await fetch('http://localhost:4000/dashboard', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
        }
    })
    return await response.json()
})

function onHabitCreated () {
    console.log('Une nouvelle habitude a été créée')
    refresh()
}
</script>

<template>
  <div>
    <h1>Mon dashboard</h1>
    <pre>{{ data }}</pre>

    <h2>Habitudes globales</h2>
    <ul>
      <li v-for="(habit, index) in data.globalHabits" :key="index">
        {{ habit.title }} : {{ habit.description }}
      </li>
    </ul>
    <h2>Habitudes quotidiennes</h2>
    <ul>
      <li v-for="(habit, index) in data.personalHabits" :key="index">
        {{ habit.title }} : {{ habit.description }}
      </li>
    </ul>
    <AddHabitForm @habit:created="onHabitCreated" />
    
  </div>
</template>

<style lang="scss">
</style>