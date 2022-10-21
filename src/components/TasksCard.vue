<template>
    <article class="message">
        <!-- div de tarea -->
        <div v-if="!updateTask1">
          <div :class="{'message-header': true, 'done': doneTask}">
            <p>{{ task.title }}</p>
            <button
              @click="deleteThisTask(task.id)"
              class="delete"
              aria-label="delete"
            ></button>
          </div>
          
          <!-- class="message-body" -->
          <div  :class="{'message-body': true, 'done': doneTask}" > {{task.description }}</div>
          <button @click="clickToDone" class="button">done</button>
          <button @click="clickToUpdate" class="button">edit</button>
        </div>

        <!-- div para editar tarea -->

        <div v-if="updateTask1">
            <input v-model="newTitle" class="input" type="text" placeholder="New Title" />
            <textarea v-model="newDescription" class="textarea" placeholder="New Description"></textarea>
            <button @click="updateThisTask(task.id, newDescription.value, newTitle.value)" class="button">save</button>
          <button @click="clickToUpdate" class="button">cancel</button>
        </div>
      </article>
</template>
<script setup>
import { useTaskStore } from "../store/task";
import { ref } from 'vue'
import { updateTask, deleteTask, getTasks } from '../api/index'

const newTitle = ref("");
const newDescription = ref("");
const props = defineProps(['task'])
const taskStore = useTaskStore();
const updateTask1 = ref(false);
const doneTask = ref()

const gettingTasks = async () => {
  const response = await getTasks();
  taskStore.setTasks(response);
  
};

const deleteThisTask = async (id) => {
  if ((await deleteTask(id)) === true) {
    taskStore.deleteTask(id);
    // aca en lugar de llamar a getting tasks deberia hacer un delete de la task en la array?
    gettingTasks();
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
    }
    if (await updateTask(props.task.id, updatedTask2) === true) {
        updateTask1.value = !updateTask1.value
        gettingTasks();
    }
}

const clickToDone = () => {
    console.log(doneTask.value)
    return (doneTask.value = !doneTask.value)
   
}


</script>
<style scoped>
.done {
    text-decoration: line-through;
    color: grey;
    background-color: #f5f5f5;
    
    
}
</style>