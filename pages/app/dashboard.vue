<script lang="ts" setup="">



const response = await fetch('http://localhost:4000/dashboard', {
    method: 'GET',
    //les headers envoients des infos à l'api
    headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
    }
})

const data= await response.json()
</script>

<template>
    <div>
        <h1>Mon dashboard</h1>
        <div>{{ data }}</div>
    </div>
</template>

<style>
</style>