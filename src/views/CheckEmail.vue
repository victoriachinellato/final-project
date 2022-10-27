<template>

<div class="container check-email-container">

<div class="box check-email">

<h1 class="is-size-3 m-3">Thanks!</h1>
<p class="m-3 is-size-4">Check your email in order to complete your registration</p>
<div class="login-logo"> 
    

<img src="../../images/logoleave.png" alt="" srcset="" class="logo" />
<router-link class="has-text-weight-bold m-3 is-size-5 my-link" :to="{ name: 'login' }">Log in</router-link>
</div>

</div>
</div>
</template>
<script setup>
</script>
<style scoped>
.check-email-container {
    display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f8f8f8;
}
.check-email {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.logo {
  width: 40px;
}

.my-link {
  /* color:#0D0D0D; */
  color: hsl(0deg, 0%, 29%);
  text-decoration: underline;
}

.my-link:hover {
  color:#0D0D0D;
  
}

.login-logo{
    display: flex;
    justify-content: center;
    
    align-items: center;
}
</style>