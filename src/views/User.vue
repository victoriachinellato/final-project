<template>
  <NavBar />
  <!-- create profile -->
  <div v-if="!authStore.user">
    <div class="box edit-box">
      <h1 class="is-size-3 m-3">Create your profile</h1>
      <form @submit.prevent="toSave">
        <p class="has-text-centered has-text-weight-semibold ">User name:</p>
        <input class="input M-3" v-model="name" type="text" />
        <p class="has-text-centered has-text-weight-semibold ">New user picture:</p>
        <div class="file is-flex is-justify-content-center">
          <label class="file-label M-3">
            <input
              class="file-input"
              @change="handleFileUpload"
              type="file"
              ref="file"
            />

            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label"> Choose a file… </span>
            </span>
          </label>
        </div>
        <div>
            <img  class="profile-image" :src="img" alt="" />
            </div>

        <button class="button" :class="{ 'is-loading': isloading }" type="submit">Save</button>
      </form>
    </div>
  </div>

  <div v-if="authStore.user" class="user-container">

     <!-- perfil de usuario -->
    <div class="card box m-5 profile-card">
        <div class="profile-box">
          <!-- imagen -->
            <figure class="image profile-image-box">
              <img
                class="profile-image"
                :src="authStore.user.photo"
                alt="Placeholder image"
              />
            </figure>
          <!-- contenido -->
          <div class="profile-content ml-4">
            <p class="title is-4 mt-4 is-size-3 has-text-centered ">{{ authStore.user.name }}</p>
            <time class="is-fle has-text-centered " datetime="2016-1-1 m-0"
              >Member since:
              <p class="the-date is-size-5">{{ date }}</p>
              </time
            >
            <button @click="toEditProfile" class="button edit-profile-button is-underlined is-size-6 mt-4">Edit profile</button>
          </div>
        </div>
      
    </div>

    <div v-if="toEdit" class="box edit-box">
      <h1 class="is-size-3 m-3 ">Edit your Profile</h1>
      <form @submit.prevent="toSave">
        <p class="has-text-centered has-text-weight-semibold ">New user name:</p>
        <input class="input m-3" v-model="name" type="text" />
        <p class="has-text-centered has-text-weight-semibold ">New user picture:</p>
        <div class="file is-flex is-justify-content-center">
          <label class="file-label m-3">
            <input
              class="file-input"
              @change="handleFileUpload"
              type="file"
              ref="file"
            />
    

            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label"> Choose a file… </span>
            </span>
          </label>
        </div>
        <div>
            <img  class="profile-image" :src="img" alt="" />
            </div>
            <div class="buttons-div">
        <button
          class="button save-button"
          :class="{ 'is-loading': isloading }"
          type="submit"
        >
          Save
        </button>
        <button @click="toEditProfile" class="button">Cancel</button>
    </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import NavBar from "../components/NavBar.vue";
import { useAuthStore } from "../store/auth";
import { saveUser, updateUser, getUser } from "../api";
import { ref, onMounted} from "vue";
import { formatRelativeTime, justDate } from "../helpers/dates";
import moment from "moment";
import { useRouter } from "vue-router";
const router = useRouter();
const toEdit = ref(false);
const isloading = ref(false);

const file = ref(null);
const img = ref("");

const name = ref("");
const picture = ref("");
const authStore = useAuthStore();

const date = authStore.user
  ? moment(authStore.user.created_at).format("MMM Do, YYYY")
  : "";


  onMounted(async() => {
  if (!authStore.isAuth) {
    router.push( {name: 'login'})
  }
})


console.log(authStore.user);

const toEditProfile = () => {
  return (toEdit.value = !toEdit.value);
};
const handleFileUpload = () => {
  const reader = new FileReader();
  reader.onloadend = () => {
    // Esta variable es la que se guarda en supabase
    // console.log(reader.result);
    img.value = reader.result;
  };

  reader.readAsDataURL(file.value.files[0]);
};

const toSave = async () => {
  isloading.value = true;
  let newUser = {
    name: name.value,
    photo: img.value,
    user_id: authStore.id,
  };
  let user = {
    name: name.value,
    photo: img.value,
  };

  if (authStore.user) {
    console.log("hay user");
    await updateUser(authStore.user.id, user);
  } else await saveUser(newUser);

  const response = await getUser();
  authStore.saveUser(response[0]);
  console.log(response);
  isloading.value = false;
  toEdit.value = false;
};
</script>
<style scoped>


.buttons-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile-box {
  display: flex;
  
  
}

.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 40px !important;
  margin-right: 40px !important;
 
 
}

.user-container {
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f8f8f8;
}

.edit-profile-button {
    border: none;
}

.edit-profile-button:hover{
    text-decoration: underline;
    color: black;
}

.profile-image-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 200px;
}

.save-button {
    padding-left: 25px;
    padding-right: 25px;
}
.the-date {
    font-weight: 700;
}
.edit-box {
  max-width: 350px;
  min-width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
 
}
</style>
