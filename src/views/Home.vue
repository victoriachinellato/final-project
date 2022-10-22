<template>
  <h1>this is home</h1>
  
  <button class="button" @click="clickToFilter3">all tasks</button>
  <button class="button" @click="clickToFilter1">to do</button>
  <button class="button" @click="clickToFilter2">done tasks</button>
  

  <form class="box" @submit.prevent="onSubmit">
    <h1>Add a new task</h1>
    <input v-model="title" class="input" type="text" placeholder="Title" />
    <textarea
      v-model="description"
      class="textarea"
      placeholder="Description"
    ></textarea>
    <button class="button">Save</button>
  </form>
  <h1>my tasks:</h1>

  <div class="columns is-multiline">
    <div
      v-for="task in tasks"
      class="column is-12-mobile is-4-tablet is-3-desktop"
      :key="task.id"
    >
      <TasksCard :task="task"/>
    </div>
  </div>

  <button @click="onClick">LOG OUT</button>
  <!-- porque no puede ir el boton abajo del navbar? -->
 
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { logOut, getTasks, newTask, deleteTask } from "../api/index";
import NavBar from "../components/NavBar.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../store/task";
import TasksCard from "../components/TasksCard.vue";

const taskStore = useTaskStore();
const authStore = useAuthStore();
const router = useRouter();
const title = ref("");
const titleError = ref(false);
const description = ref("");
const descriptionError = ref(false);
const filter = ref()


const tasks = computed(() => {
        if (filter.value == 0)
            return taskStore.tasks.filter(task => task.is_completed)
        if (filter.value == 1)
            return taskStore.tasks.filter(task => !task.is_completed)
        return taskStore.tasks
    })

// OBTENER TAREAS:
const gettingTasks = async () => {
  const response = await getTasks();
  taskStore.setTasks(response);
  console.log(taskStore.tasks);
};

onMounted(async () => {
  await gettingTasks();
});

// AGREGAR TAREAS:

const onSubmit = async () => {
  if (title.value.length > 0) titleError.value = false;
  else titleError.value = true;
  if (description.value.length > 0) descriptionError.value = false;
  else descriptionError.value = true;
  console.log(title.value, description.value);

  //   si el usuario completo el campo:
  if (titleError.value === false && descriptionError.value === false) {
    let task = {
      user_id: authStore.id,
      title: title.value,
      description: description.value,
    };
    console.log(task);
    if ((await newTask(task)) === true) console.log("nueva tarea agregada");
    gettingTasks();
    title.value = "";
    description.value = "";
  } else console.log("from incompleto");
};

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

const clickToFilter1 = () => {
    console.log(filter.value)
    return filter.value = 0
   
}


const clickToFilter2 = () => {
    console.log(filter.value)
    return filter.value = 1
    
}

const clickToFilter3 = () => {
    console.log(filter.value)
    return filter.value = 3
    
}





</script>
<style scoped></style>
