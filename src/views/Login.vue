<template>
  <!-- <div class="section">
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
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
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
      

      <div class="is-flex">
        <p>Not registered?</p>
        <router-link class="has-text-weight-bold" :to="{ name: 'registration' }"
          >Create an account</router-link
        >
      </div>
    </div>
  </div> -->

  <!-- nuevo layout -->
  <div class="login-container">
    <!-- <div class="welcome is-flex m-6">
      <img src="../../images/logoleave.png" alt="" srcset="" class="logo" />
      <div class="m-4">
        <h2 class="is-size-4">Welcome to Done</h2>
        <p>Log in to Sync</p>
      </div>
    </div> -->

    <div class="box login-box">

      <div class="welcome is-flex">
      <img src="../../images/logoleave.png" alt="" srcset="" class="logo" />
      <div class="m-4">
        <h2 class="is-size-4">Welcome to Done</h2>
        <p>Log in to Sync</p>
      </div>
    </div>
      <div>
      <form @submit.prevent="onSubmit">
        <div class="field is-fullwidth">
          <!-- <label class="label is-size-2 has-text-centered">Log in</label> -->
        </div>

        <div class="field mt-5">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              :class="{ input: true, 'is-danger': emailError }"
              type="email"
              placeholder="Email"
            />
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
            <p v-if="emailError" class="help is-danger">
              email adress not found?
            </p>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="password"
              :class="{ input: true, 'is-danger': passwordError }"
              type="password"
              placeholder="Password"
            />
            <span class="icon is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
            <p v-if="passwordError" class="help is-danger">this field is obligatory</p>
            <p v-if="errorMessage" class="help is-danger">
              wrong e-mail or password
            </p>
          </div>
        </div>

        <div class="field mt-5">
          <div class="control">
            <button
              class="button is-fullwidth is-primary"
              type="submit"
              placeholder="Log in"
            >
              Log in
            </button>
          </div>
        </div>
      </form>

      <div class="is-flex is-fullwidth is-justify-content-center mt-5">
        <p class="mr-3">Not registered?</p>
        <router-link
          class="has-text-weight-bold register-link"
          :to="{ name: 'registration' }"
          >Create an account</router-link
        >
      </div>
    </div>
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
const errorMessage = ref(false);

const onSubmit = async () => {
  if (validarMail(email) === true) emailError.value = false;
  else emailError.value = true;
  if (password.value.length < 1) passwordError.value = true;
  else passwordError.value = false;
  console.log("hasta aca bien");

  if (emailError.value === false && passwordError.value === false) {
    console.log("seguimos bien");

    // creo constante de login para almacenar su valor

    let loginResult = await login(email.value, password.value);

    if (loginResult === false) {
      console.log("hubo errores");
      return errorMessage.value = true;
    } else {
      console.log("no hubo errores");
      // aca deberia llamar a isAuth y cambiarla?
      // como guardar el id?
      authStore.login(loginResult);
      console.log(authStore.id);

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
<style scoped>
.login-box {
  /* margin: 200px; */
  max-width: 350px;
  min-width: 40%;
 
 
  /* height: 50vh;
  width: 40vw; */
}

.login-container {
  /* max-width: 350px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  /* background-color: #ededed; */
  background-color: #f8f8f8;
}

.login-button {
  background-color: #027373;
  
}

.logo {
  width: 80px;
}
/* .register-link{
  */

.welcome {
  align-items: center;
  font-weight: 700;
}
</style>
