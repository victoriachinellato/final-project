<template>
  <!-- <article class="message">
   

    <div v-if="!updateTask1">
      <div :class="{ 'message-header': true, 'done': !task.is_completed }">
        <p>{{ task.title }}</p>
        <button
          @click="deleteThisTask(task.id)"
          class="delete"
          aria-label="delete"
        ></button>
      </div>

      
      <div :class="{ 'message-body': true, done: !task.is_completed }">
        {{ task.description }}
      </div>
      <button v-if=task.is_completed @click="clickToDone" class="button">done</button>
      <button v-if=task.is_completed @click="clickToUpdate" class="button">edit</button>
      <button v-if=!task.is_completed @click="clickToDone" class="button">Re Do</button>
    </div>

    

    <div v-if="updateTask1">
      <input
        v-model="newTitle"
        class="input"
        type="text"
        placeholder="New Title"
      />
      <textarea
        v-model="newDescription"
        class="textarea"
        placeholder="New Description"
      ></textarea>
      <button
        @click="updateThisTask(task.id, newDescription.value, newTitle.value)"
        class="button"
      >
        save
      </button>
      <button @click="clickToUpdate" class="button">cancel</button>
    </div>
  </article> -->


  <!-- nuevo template  -->


  <div class="card">
    <div v-if="!updateTask1" >
  <header :class="{ 'card-header header': true, 'done': !task.is_completed }" >
    
    <p class="card-header-title">
        {{ task.title }}
    </p>
    

    <!-- <input class="checkbox" type="checkbox" id="checkbox" v-model="checked"> -->
    <label v-if=task.is_completed class="radio m-4">
    <input @click="clickToDone"
    
    type="radio" name="rsvp" class="is-large checkbox">
    <!-- Done -->
  </label>
  </header>
  <div :class="{ 'card-content': true, done: !task.is_completed }">
    <div class="content">
        {{ task.description }}
      <br>

      <div class="date">
      <time > {{dateAgo}}</time>
    </div>

      <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
    </div>
  </div>
  <footer class="card-footer">
    
    <div v-if=task.is_completed @click="clickToUpdate" class="card-footer-item"> Edit</div> 
    <div v-if=task.is_completed  @click="deleteThisTask(task.id)" class="card-footer-item">Delete</div>
    <div v-if=!task.is_completed  @click="clickToDone" class="card-footer-item">Re do</div>
  </footer>
</div>

<!-- editar tarea -->
<div v-if="updateTask1" class="card">
    <header class="card-header header">
        <input v-model="newTitle"
        class="input m-4"
        type="text"
        placeholder="New Title">
    </header>

    <div class="card-content">
        <textarea
        v-model="newDescription"
        class="textarea "
        placeholder="New Description"
      ></textarea>
    </div>

    <footer class="card-footer">
    
    <a href="#" @click="updateThisTask(task.id, newDescription.value, newTitle.value)" class="card-footer-item">Save</a>
    <a href="#" @click="clickToUpdate" class="card-footer-item">Cancel</a>
    
  </footer>


</div>
</div>
</template>
<script setup>
import { useTaskStore } from "../store/task";
import { ref } from "vue";
import { updateTask, deleteTask, getTasks } from "../api/index";
import { formatRelativeTime } from '../helpers/dates'

const dateAgo = ref(formatRelativeTime(props.task.created_at))
const props = defineProps(["task"]);
const newTitle = ref(props.task.title);
const newDescription = ref(props.task.description);
const taskStore = useTaskStore();
const updateTask1 = ref(false);
const doneTask = ref();

const gettingTasks = async () => {
  const response = await getTasks();
  taskStore.setTasks(response);
};

const deleteThisTask = async (id) => {
  if ((await deleteTask(id)) === true) {
    taskStore.deleteTask(id);
  }
};

const clickToUpdate = () => {
  console.log(updateTask1.value);
  return (updateTask1.value = !updateTask1.value);
};

const updateThisTask = async () => {
  let updatedTask2 = {
    title: newTitle.value,
    description: newDescription.value,
    // BONUS: 
    // para modificar fecha: crear variable de new Date()
  };
  if ((await updateTask(props.task.id, updatedTask2)) === true) {
    updateTask1.value = !updateTask1.value;
    taskStore.updateTask(props.task.id, updatedTask2);
  }
};

const clickToDone = async () => {
    let updatedTask2 = {
        is_completed: !props.task.is_completed
    }
  console.log(doneTask.value);
  if ((await updateTask(props.task.id, updatedTask2)) === true) {
    taskStore.doneTask(props.task.id, !props.task.is_completed);
    
  }
  

};
</script>
<style scoped>
.done {
  text-decoration: line-through;
  color: grey;
  background-color: #f5f5f5!important; 
}

.checkbock {
    border: 2px solid green;
   
}

.header {
    background-color: #A9D9D0;
}

/* .buttonn {
    border: none;
    
    
} */

.date {
    margin-top: 20px;
    font-size: small;
    font-weight: 200;

}
</style>
