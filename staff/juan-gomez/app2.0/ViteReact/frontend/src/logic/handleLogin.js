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

//Crea y muestra un modal con mensaje//
export const createModal = (message, onCloseCallback) => {
    //Crea elemento div para el modal//
    const modal = document.createElement('div');
    modal.className = 'modal' //Clase CSS para estilos//

    //HTML interno del modal. Muestra el mensaje recibido//
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p> 
        </div>
    `

    //Agrega el modal al body del documento//
    document.body.appendChild(modal)

    //Función para cerrar el modal//
    const closeModal = () => {
        modal.remove() //Elimina el modal del DOM//
        if (onCloseCallback) onCloseCallback() //Ejecuta callback si existe//
    }

    //Cierra al hacer click en cualquier parte del modal//
    modal.addEventListener('click', closeModal)
    //Cierra automáticamente después de 6 segundos//
    setTimeout(closeModal, 6000)

    return modal //Devuelve el modal creado//
}

//Exporta la función handleLogin para que pueda ser utilizada en otros módulos//
export const handleLogin = (formData) => {
    //Obtiene la lista de usuarios registrados desde el almacenamiento (localStorage)//
    const users = getUsers()
    
    //Busca un usuario en el array cuyo email coincida con el email proporcionado en el formulario//
    const user = users.find(user => user.email === formData.email)

    //Si no se encontró ningún usuario con ese email (!user es true)//
    if (!user) {
        // Muestra un modal de error indicando que el email no está registrado
        createModal('The email is not registered yet. Please, create an account first')
        
        //Retorna un objeto indicando que://
        //- El login no fue exitoso (success: false)//
        //- Debe redirigir al usuario a la página de registro (shouldRedirect: true)//
        return { 
            success: false,
            shouldRedirect: true
        }
    }

    //Si la contraseña proporcionada no coincide con la contraseña almacenada del usuario//
    if (user.password !== formData.password) {
        //Muestra un modal de error indicando que la contraseña es incorrecta//
        createModal('Incorrect password, Please, try again')
        
        //Retorna un objeto indicando que://
        //- El login no fue exitoso (success: false)//
        //- No debe redirigir (shouldRedirect: false) porque solo necesita reintentar//
        return { 
            success: false,
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