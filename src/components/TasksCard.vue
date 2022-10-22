<template>
  <article class="message">
    <!-- div de tarea -->
    <div v-if="!updateTask1">
      <div :class="{ 'message-header': true, 'done': !task.is_completed }">
        <p>{{ task.title }}</p>
        <button
          @click="deleteThisTask(task.id)"
          class="delete"
          aria-label="delete"
        ></button>
      </div>

      <!-- class="message-body" -->
      <div :class="{ 'message-body': true, done: !task.is_completed }">
        {{ task.description }}
      </div>
      <button v-if=task.is_completed @click="clickToDone" class="button">done</button>
      <button v-if=task.is_completed @click="clickToUpdate" class="button">edit</button>
      <button v-if=!task.is_completed @click="clickToDone" class="button">Re Do</button>
    </div>

    <!-- div para editar tarea -->

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
  </article>
</template>
<script setup>
import { useTaskStore } from "../store/task";
import { ref } from "vue";
import { updateTask, deleteTask, getTasks } from "../api/index";

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
  background-color: #f5f5f5;
}
</style>
