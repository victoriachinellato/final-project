import {createClient} from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

// para el registro:
export const registro = async (email, password) => {
    const result = await supabase.auth.signUp({
    email,
    password
    // TODO: identificar el result y retornar lo que nos interesa (enviar mensaje si algo no esta bien completo, etc)
    })
    console.log(result)
    if (result.error) return false
    else return true;
}

// esto te da el usuario
export const getUser = async () => {
  const response = await supabase
    .from('users')
    .select('*')
    if (response.error) return false
    else return response.data;
}

export const saveUser = async (user) => {
  console.log(user)
  const response = await supabase
  .from('users')
  // esto te actualiza si existe y sino lo crea
  .insert(user)
  console.log(response)
  if (response.error) return false
  
  else return true;
  
}

export const updateUser = async (userId, user) => {
  const response = await supabase
    .from ('users')
    .update(user)
    .eq('id', userId)
    if (response.error) return false
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
    console.log(response)
    if (response.error) return false
    else return true;

  }
  

// para leer los datos:

// a esta variable no le damos parametros ya que al llamarla estariamos pidiendo TODA la info de ese usuario
export const getTasks = async () => {
    const response = await supabase
    .from('task')
    .select('*')
    .order('id', {ascending: false})
    if (response.error) return false
    // el .data de donde sale?
    else return response.data;
    // TODO retornar la informacion de los tasks, ej response.data
  }


//   para editar tareas:
export const updateTask = async (taskId, task) => {
    const response = await supabase
    .from ('task')
    .update(task)
    .eq('id', taskId)

    if (response.error) return false
    else return true;  
    // TODO identificar el resultado y...
    
  }
  

  // para borrar tasks:
export const deleteTask = async (taskId) => {
    const response = await supabase
    .from('task')
    .delete()
    .eq('id', taskId)
    console.log(response)
    if (response.error) return false
    else return true; 
  }

export const logOut = async () => {
    const response = await supabase.auth.signOut()
    if (response.error) return false
    else return true; 
    // TODO identificar resultado y retornar lo que nos interesa, port ej true si ha ido bien y false si ha fallado
}
  






