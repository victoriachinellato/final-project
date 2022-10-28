<template>
    <nav class="is-flex is-justify-content-space-between p-2 nav-bar">
        <div class="name-logo">
            <img src="../../images/logoleave.png" alt="" srcset="" class="logo" />
            <h1 class="is-size-3 pl-3">Progress</h1>
        </div>
        <router-link class="has-text-weight-bold router-link" :class="{'prueba': router.currentRoute.value.name === 'home'}" :to="{ name: 'home' }">Home</router-link>
        <router-link class="has-text-weight-bold router-link" :class="{'prueba': router.currentRoute.value.name === 'user'}" :to="{ name: 'user' }">Profile</router-link>
        <!-- <button @click="toAddATask" class="button add-button">Add a new task</button> -->
        <div class="logout-div">
            <img :src="authStore.user.photo" alt="" class="logout-img">
            <button class="button logout-button" @click="modalLogOut"> <i class="fa-solid fa-arrow-right-from-bracket is-size-5"></i></button>
        </div>
        

        <!-- log out modal -->
  <div class="modal" :class="{'is-active': toLogOut}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box modal-box">
    <h1 class="has-text-weight-bold is-size-5">Are you sure you want to log out?</h1>
    <div class=" m-5">
    <button class="button m-2" @click="onClick">Log Out </button>
    <button class="button m-2"  @click="modalLogOut">Cancel</button>
</div>
</div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>

        
    </nav>
</template>
<script setup>
import { logOut } from "../api/index";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { ref } from 'vue'

const router = useRouter()
const toAdd = ref()
const toLogOut = ref(false)
const authStore = useAuthStore();

console.log(router.currentRoute.value.name)

const img = authStore.user ? authStore.user.photo: ""

const modalLogOut = () => {
    return (toLogOut.value = !toLogOut.value)
}


const toAddATask = () => {
    return (toAdd.value = !toAdd.value)
}



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
    background-color: transparent;
    border: none;
}

.logout-button:hover {
    color: #0D0D0D;
    font-weight: 600;

}

.nav-bar {
    background: rgb(13,13,13);
background: linear-gradient(-8deg, rgba(13,13,13,1) 0%, rgba(2,115,115,1) 35%, rgba(169,217,208,1) 100%);
align-items: center;
}

.logo {
  width: 50px;
  
}

.router-link {
    color: hsl(0deg, 0%, 29%);
}

.router-link:hover {
   color: #0D0D0D;
}
.name-logo {
    display: flex;
    align-items: center;
}

.modal-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
}

.logout-div {
    display: flex;
    align-items: center;
    /* background-color: rgba(2,115,115,1); */
    background-color: rgba(169,217,208,.4);
    border-radius: 50px;
    height: 60px;
    

}

.prueba {
    
    text-decoration: underline;
    color: #0D0D0D;
}

.logout-img {
  width: auto;
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 10px;
  object-fit: cover;
  
}

</style>