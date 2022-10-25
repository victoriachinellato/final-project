<template>
    <nav class="is-flex is-justify-content-space-between p-2 nav-bar">
        <div>
            <h1 class="is-size-3">Task App</h1>
        </div>
        <!-- <button @click="toAddATask" class="button add-button">Add a new task</button> -->
        <button class="button logout-button" @click="onClick">LOG OUT</button>
        
    </nav>
</template>
<script setup>
import { logOut } from "../api/index";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { ref } from 'vue'

const toAdd = ref()

const toAddATask = () => {
    return (toAdd.value = !toAdd.value)
}

const router = useRouter();
const authStore = useAuthStore();
// LOG OUT
const onClick = async () => {
  let logOutResult = await logOut();
  if (logOutResult === true) {
    console.log("log out succesfull");
    router.push({ name: "login" });
    authStore.logout();
    console.log(authStore.id);
  } else {
    console.log("something went wrong");
  }
};
</script>
<style scoped>
.logout-button{
    background-color: #F2E7DC;
}

.nav-bar {
    background: rgb(13,13,13);
background: linear-gradient(-8deg, rgba(13,13,13,1) 0%, rgba(2,115,115,1) 35%, rgba(169,217,208,1) 100%);
}
</style>