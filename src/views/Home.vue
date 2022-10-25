<template>
    <NavBar />
  <!-- <h1>this is home</h1>
  
  <button class="button" @click="clickToFilter3">all tasks</button>
  <button class="button" @click="clickToFilter1">to do</button>
  <button class="button" @click="clickToFilter2">done tasks</button> -->
  <div class="is-flex is-justify-content-center p-5">
    <progress class="progress progress-bar" value="0.2" max="1">25%</progress><br>
    <div>{{progress}}</div>
  </div>
 
  <div class="is-flex is-flex-direction-column  is-justify-content-center is-align-items-center">
    <button @click="toAddATask" class="button is-fullwidth m-5 add-button p-0">Add a new task</button>

    <form v-if="toAdd" class="box m-5m add-task-form" @submit.prevent="onSubmit">
    
    <input v-model="title" class="input " type="text" placeholder="Title" />
    <textarea
      v-model="description"
      class="textarea mt-4"
      placeholder="Description"
    ></textarea>
    <button class="button mt-4">Save</button>
  </form>
</div>

  
  <div class="is-flex is-justify-content-center">
    <div class="tabs is-centered ">
  <ul>
    <li @click="clickToFilter1" :class="{'px-5 is-size-5': true, 'is-active': filter === 0}"><a>To do</a></li>
    <li @click="clickToFilter2" :class="{'px-5 is-size-5': true, 'is-active': filter === 1}"><a>Done</a></li>
    <li @click="clickToFilter3" :class="{'px-5 is-size-5': true, 'is-active': filter === 3}"><a>All</a></li>
  </ul>
  <div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
      <span>by time</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
      </div>
    </div>
  </div>
</div>
</div>
    
<!-- <button @click="toAddATask" class="button m-5 add-button">Add a new task</button> -->

</div>
  

<div class="container tasks-section">
  <div class="columns is-multiline is-flex is-justify-content-center">
    <div
      v-for="task in tasks"
      class="column is-12-mobile is-4-tablet is-3-desktop"
      :key="task.id"
    >
    
      <TasksCard :task="task"/>
    
    </div>
  </div>
</div>

 
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
const toAdd = ref()
const progressPorcentaje = ref()
const toDo = ref()
const done = ref()
const progressBar = ref()




const toAddATask = () => {
    return (toAdd.value = !toAdd.value)
}

const progress = computed(() => {
    toDo.value = taskStore.tasks.filter(task => task.is_completed)
    done.value = taskStore.tasks.filter(task => !task.is_completed)
    return (done.value.length / toDo.value.length).toString()
})
console.log(progress.value)



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
<style scoped>
.tasks-section {
    margin: 30px;
    
}

.add-button {
    background-color:#027373;
   width: 40vw;
    color: #0D0D0D;
    padding: 30px;
    font-weight: 600;
}

.add-task-form {
    width: 40vw;
}

.progress-bar {
    width: 80vw;
}
</style>
