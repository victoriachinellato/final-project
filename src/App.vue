
<template>
  <h1>task app</h1>

  <router-view></router-view>

</template>
<script setup>
import { onMounted } from 'vue'
import {createClient} from '@supabase/supabase-js'
import NavBar from '../src/components/NavBar.vue'
import { login, newTask} from './api'
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'



// esto nos crea un objeto que nos permtite interactuar con supabase:
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
const authStore = useAuthStore();
const router = useRouter();

// esta funcion esta bien implementada
onMounted(async() => {
  if (!authStore.isAuth) {
    router.push( {name: 'login'})
  }
})
// onMounted(async() => {
//   const id = await login('victoriach@live.com.ar', 'finalproject');
//   console.log(id)
//   newTask({
//     user_id: id,
//     title: 'titulo',
//     description: 'Description de otro task'
//   })
 
// })

</script>
<style scoped>
</style>