import { defineStore } from "pinia";
import { updateTask } from "../api";

export const useTaskStore = defineStore("task", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      //  aca se van a guardar los task que nos de supabase
      tasks: [],
    };
  },
  actions: {
    setTaks() {
      // TODO guardar en el estado las task que nos da supabase
    },
    updateTask(id, task) {
      // TODO modificar el estado de la task
    //   encontrar el indice de la task con ese id y cambiar su contenido con task
    },

    deleteTask(id){
        // modificar el estado borrando esa task
        // encontramos el indice de ese id y eliminamos ese indice de la array
    },
    addTask(task){
        // TODO modificar el estado de la task haciendo un push de la task
        // comprobar que tenemos el id al insertar el registro, en caso de no tenerlo tendriamos que hacer el getTask
    }
  },
});
