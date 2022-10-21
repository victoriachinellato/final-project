import { defineStore } from 'pinia'
import { login } from '../api'

export const useAuthStore = defineStore('auth', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // nos indicara si el usuario esta autenticadp
      isAuth: false,
    //   guardaremos el login de supabase al ahcer el login
      id: undefined,
      email: undefined
    }
  }, 
  actions: {
    login(id) {
        this.id = id
        this.isAuth = true
        // TODO cambiar el estado de atentificacion e id del usuario
    },
    logout() {
      this.id = undefined,
      this.isAuth = false
        
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },

})