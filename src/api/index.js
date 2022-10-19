import {createClient} from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

// para el registro:
export const registro = async (email, password) => {
    const result = await supabase.auth.signUp({
    email,
    password
    // TODO: identificar el result y retornar lo que nos interesa (enviar mensaje si algo no esta bien completo, etc)
    })
    if (result.error) return false
    else return true;
}



// para el login
export const login = async (email, password) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (response.error) return false
    // el id que queremos guardar:
     else return response.data.user.id
    
  }



// para crear una nueva task:

// hay que hacer que las variables sean exportables para poder utilizarlas en otros lugares
export const newTask = async (task) => {
    const response = await supabase.from('task')
    .insert(task)
    //   user_id: id,
    //   title: 'titulo',
    //   description: 'descripcion del task'
    
    console.log(response)
  }
  

// para leer los datos:

// a esta variable no le damos parametros ya que al llamarla estariamos pidiendo TODA la info de ese usuario
export const getTasks = async () => {
    const response = await supabase
    .from('task')
    .select('*')
    .order('id', {ascending: false})
    console.log(response)
    // TODO retornar la informacion de los tasks, ej response.data
  }


//   para editar tareas:
export const updateTask = async (taskId, task) => {
    const response = await supabase
    .from ('task')
    .update(task)
    .eq('id', taskId)

    // TODO identificar el resultado y...
    console.log(response)
  }
  

  // para borrar tasks:
export const deleteTask = async (taskId) => {
    const response = await supabase
    .from('task')
    .delete()
    .eq('id', taskId)
    console.log(response)
  }

export const logOut = async () => {
    const response = await supabase.auth.signOut()
    // TODO identificar resultado y retornar lo que nos interesa, port ej true si ha ido bien y false si ha fallado
}
  






