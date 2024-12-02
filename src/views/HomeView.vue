<script setup lang="ts">
import MyHeader from '@/components/Header/Header.vue'
import MyButton from '@/components/Button/Button.vue'
import MyLogin from '@/components/Login/Login.vue'
import MyFooter from '@/components/Footer/Footer.vue'

</script>

<template>
  <DefaultLayout>
    <MyHeader />
    <MyLogin />
    <MyFooter />
  </DefaultLayout>
</template>
