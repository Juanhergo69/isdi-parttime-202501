//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Obtiene todos los usuarios almacenados//
export const getUsers = () => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS) //Obtiene datos como JSON string//
    return usersJson ? JSON.parse(usersJson) : [] //Convierte a objeto JS o retorna array vacío//
}

//Exporta la función handleLogin para que pueda ser utilizada en otros módulos//
export const handleLogin = (formData) => {
    //Obtiene la lista de usuarios registrados desde el almacenamiento (localStorage)//
    const users = getUsers()
    
    //Busca un usuario en el array cuyo email coincida con el email proporcionado en el formulario//
    const user = users.find(user => user.email === formData.email)

    //Si no se encontró ningún usuario con ese email (!user es true)//
    if (!user) { 
        //Retorna un objeto indicando que://
        //- El login no fue exitoso (success: false)//
        //- Muestra error indicando que el email no está registrado//
        //- Debe redirigir al usuario a la página de registro (shouldRedirect: true)//
        return { 
            success: false,
            error: 'The email is not registered yet. Please, create an account first',
            shouldRedirect: true
        }
    }

    //Si la contraseña proporcionada no coincide con la contraseña almacenada del usuario//
    if (user.password !== formData.password) {
        //Retorna un objeto indicando que://
        //- El login no fue exitoso (success: false)//
        //- Muestra un error indicando que la contraseña es incorrecta//
        //- No debe redirigir (shouldRedirect: false) porque solo necesita reintentar//
        return { 
            success: false,
            error: 'Incorrect password, Please, try again',
            shouldRedirect: false
        }
    }

    //Si ambas validaciones pasaron (email existe y contraseña correcta)//
    //Retorna un objeto indicando que://
    //- El login fue exitoso (success: true)//
    //- Los datos del usuario encontrado (user: user)//
    //- Si marcó la opción "Remember me" (rememberSession: formData.rememberme)//
    return { 
        success: true, 
        user: user,
        rememberSession: formData.rememberme
    }
}