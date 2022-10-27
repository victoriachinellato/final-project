<template>
  
  <!-- nuevo layout -->


  <div class="login-container">
    <div class="box login-box">
      <form @submit.prevent="onSubmit">
        <div class="field is-fullwidth registration-logo">
          <img src="../../images/logoleave.png" alt="" srcset="" class="logo" />
          <label class="label is-size-2 has-text-centered ml-4">Registration</label>
        </div>
        <!-- name -->
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="name"
              :class="{ input: true, 'is-danger': nameError }"
              type="text"
              placeholder="Nombre"
            />
            <span class="icon is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
            <p v-if="nameError" class="help is-danger">Name is required</p>
          </div>
        </div>

        <div class="field ">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              :class="{ input: true, 'is-danger': emailError }"
              type="email"
              placeholder="email"
            />
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
            <p v-if="emailError" class="help is-danger">
              Insert a valid email address
            </p>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="password"
              :class="{ input: true, 'is-danger': passwordError }"
              type="password"
              placeholder="password"
            />
            <span class="icon is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
            <p v-if="passwordError" class="help is-danger">
              Password has to be at least 6 characters long
            </p>
          </div>
        </div>

        <div class="field mt-5">
          <div class="control">
            <button class="button is-fullwidth login-button is-primary"
              type="submit"
              placeholder="Log in"> Register
              
            </button>
          </div>
        </div>
      </form>

      <div class="is-flex is-fullwidth is-justify-content-center mt-5">
        <p class="mr-3">Have an account? </p>
        <router-link class="has-text-weight-bold my-link" :to="{ name: 'login' }">Log in</router-link>
        
      </div>


      
    </div>

    
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registro } from "../api/index";

const router = useRouter();
const name = ref("");
const nameError = ref(false);
const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);

// en onSubmit:
// 1. hay que chequear que todo haya sido completado bien, sino enviar mensaje de error
// 2. Crear el registro en SUPABASE
// 3. redirigir a pagina que diga que hay que verificar el mail
const onSubmit = async () => {
  // let error = false;
  if (name.value.length === 0) nameError.value = true;
  else nameError.value = false;
  if (validarMail(email.value) === true) emailError.value = false;
  else emailError.value = true;
  if (password.value.length === 0 || password.value.length < 6)
    passwordError.value = true;
  else passwordError.value = false;
  
  if (
    emailError.value === false &&
    nameError.value === false &&
    passwordError.value === false
  ) {
    console.log("no hay errores de tipeo");
    if ((await registro(email.value, password.value)) === true) {
      console.log("registro hecho?");
      router.push({ name: "checkemail" });
    } else {
      // es posible mostrar el tipo de error?
        // es necesario crear una vista cuando hubo un error?
      // esta bien que aparezca un error en consola cuando hubo error de supabase (ej: usuario ya registrado)
      console.log("hay errores");
    }
  }
};

// SI TODO LO QUE ESTA EN ONSUBMIT ESTA BIEN: HAY QUE LLAMAR A REGISTRO, donde va el if y registro(email, password)?
// UNA VEZ HECHO EL REGISTRO REDIRIGIR A CheckEmail
// como evitar que un mismo usuario se registre varias veces con el mismo email?

// funcion para validar email:

const validarMail = () => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    return true;
  } else return false;
};

// registro(name, password)
</script>
<style scoped>
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
.login-box {
  /* margin: 200px; */
  max-width: 350px;
  min-width: 40%;
 
 
  /* height: 50vh;
  width: 40vw; */
}


.login-button {
  background-color: #027373;
}

.my-link {
  /* color:#0D0D0D; */
  color: hsl(0deg, 0%, 29%);
  text-decoration: underline;
}

.my-link:hover {
  color:#0D0D0D;
  
}

.logo {
  width: 60px;
}

.registration-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
