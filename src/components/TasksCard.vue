<template>
  

  <div class="card">
    <div v-if="!updateTask1" >
  <header :class="{ 'card-header header': true, 'done': !task.is_completed }" >
    
    <p class="card-header-title">
        {{ task.title }}
    </p>
    

   
    <label class="m-4">
        
        <i v-if=task.is_completed @click="clickToDone" class="radio fa-regular fa-circle-check ml-1 check-icon"></i>
        <i  v-if=!task.is_completed class="fa-solid fa-circle-check ml-1 check-icon"></i>
        
        

   
  </label>

  </header>
  <div :class="{ 'card-content': true, 'done': !task.is_completed }">
    <div class="content">
        {{ task.description }}
      <br>
      

      <div class="date">
      <time > {{dateAgo}}</time>
    </div>

      
    </div>
  </div>
  <footer class="card-footer">
    
    <div v-if=task.is_completed class="card-footer-item"> 
        <button v-if=task.is_completed @click="clickToUpdate" class="button no-border-buttons is-active">Edit</button>
    </div> 
    <div v-if=task.is_completed class="card-footer-item">

        <button class="button no-border-buttons" @click="modalDelete">Delete</button>
    <!-- <button v-if=task.is_completed  @click="deleteThisTask(task.id)" class="button no-border-buttons" >Delete</button> -->
    </div>
    <div v-if=!task.is_completed  class="card-footer-item">
        <button @click="clickToDone" class="button no-border-buttons">Do it again</button>
        <i class="fas fa-rotate-right ml-1"></i>
    </div>
  </footer>
</div>

<!-- modal: va con una ref de true or false -->
<div class="modal" :class="{'is-active': toDelete}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box modal-box">
    <h1 class="has-text-weight-bold is-size-5">Are you sure you want to delete this task?</h1>
    <div class=" m-5">
    <button class="button m-2" @click="deleteThisTask(task.id)">Delete</button>
    <button class="button m-2"  @click="modalDelete">Cancel</button>
</div>
</div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
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
        <div class="card-footer-item">
        <button @click="updateThisTask(task.id, newDescription.value, newTitle.value)"  class="button no-border-buttons">Save</button>
    </div>
    <div class="card-footer-item">
        <button @click="clickToUpdate" class="button no-border-buttons">Cancel</button>
        
    </div>
    
    <!-- <a href="#" @click="updateThisTask(task.id, newDescription.value, newTitle.value)" class="card-footer-item">Save</a>
    <a href="#" @click="clickToUpdate" class="card-footer-item">Cancel</a> -->
    
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
const toDelete = ref(false)

const modalDelete = () => {
    return (toDelete.value = !toDelete.value)
}

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
@import 'animate.css';
.done {
  text-decoration: line-through;
  color: grey;
  background-color: #f5f5f5!important; 
}

.succes-task {
    background-image: url("../../images/logoleave.png") !important;
    text-decoration: line-through;
    background-color: #A9D9D0 !important;
}


.checkbock {
    border: 2px solid green;
   
}

.header {
    background-color: #A9D9D0;
   
}

.no-border-buttons {
    border: none;
    
}

.no-border-buttons:hover {
    color: #0D0D0D;
    font-weight: 500;
}

.modal {
    z-index: 5;
}

.date {
    margin-top: 20px;
    font-size: small;
    font-weight: 200;

}

.check-icon {
    font-size: larger;
}




.modal-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
}


</style>
