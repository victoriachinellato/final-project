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

    // no deberia tomar como paramtero el resultado de gettingtasks?
    setTasks(tasks) {
      this.tasks = tasks

      // TODO guardar en el estado las task que nos da supabase
    },
    updateTask(id, task) {



      // TODO modificar el estado de la task
    //   encontrar el indice de la task con ese id y cambiar su contenido con task
    },

    deleteTask(id){
      // splice

        // POR QUE SE MODIFICA EL ESTADO DE EL TASKSTORE CUANDO BORRO UNA TASK SI N HAY CODIGO ACA

        // modificar el estado borrando esa task
        // encontramos el indice de ese id y eliminamos ese indice de la array
    }
 
  },
  persist: {
    enabled: true,
    
  },
});
