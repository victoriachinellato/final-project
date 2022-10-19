<template>
  <div class="section">
    <div class="box">
      <h1>LOG IN</h1>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="email"
              :class="{ input: true, 'is-danger': emailError }"
              type="email"
              placeholder="email"
            />
            <p v-if="emailError" class="help is-danger">
              email adress not found?
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="password"
              :class="{ input: true, 'is-danger': passwordError }"
              type="password"
              placeholder="password"
            />
            <p v-if="passwordError" class="help is-danger">wrong password?</p>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              class="button is-link"
              type="submit"
              placeholder="Text input"
            />
          </div>
        </div>
      </form>
      <!-- DIRIGIR AL USUARIO A LA VIEW DE REGISTRO -->
      <div class="is-flex"><p>Not registered?</p>
      <router-link class="has-text-weight-bold" :to="{ name: 'registration' }"
        >Create an account</router-link></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, registro } from "../api/index";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);

const onSubmit = async () => {
  if (validarMail(email) === true) emailError.value = false;
  else emailError.value = true;
  if (password.value.length < 6) 
    passwordError.value = true;
  else passwordError.value = false;
  console.log("hasta aca bien");

  if (emailError.value === false && passwordError.value === false) {
    console.log("seguimos bien");

    // creo constante de login para almacenar su valor
    
    let loginResult = await login(email.value, password.value)

    if (loginResult === false) {
    
      console.log("hubo errores");
    } else {
      console.log("no hubo errores");
      // aca deberia llamar a isAuth y cambiarla?
      // como guardar el id?
      authStore.login(loginResult);
      console.log(authStore.id)

      // Nos redirige al home
      router.push({ name: "home" });
    }
  }
};

const validarMail = () => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    return true;
  } else return false;
};
</script>
<style scoped></style>
