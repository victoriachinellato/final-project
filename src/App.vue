
<template>
  <h1>task app</h1>
  <NavBar />
  <router-view></router-view>

</template>
<script setup>
import NavBar from '../src/components/NavBar.vue'
console.log(import.meta.env.BASE_URL)
</script>
<style scoped>
</style>