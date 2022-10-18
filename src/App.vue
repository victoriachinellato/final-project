
<template>
  <h1>task app</h1>
  <NavBar />
  <router-view></router-view>

</template>
<script setup>
import {createClient} from '@supabase/supabase-js'
import NavBar from '../src/components/NavBar.vue'
console.log(import.meta.env.BASE_URL)

// esto nos crea un objeto que nos permtite interactuar con supabase:
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
console.log(supabase)
</script>
<style scoped>
</style>