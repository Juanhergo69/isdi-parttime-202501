//Capitaliza la primera letra de un string//
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1) //Coje primer caracter (mayúscula) + resto del string//
}

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

//Guarda la lista de usuarios en localStorage//
export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Convierte a JSON y guarda//
}

//Obtiene todos los mensajes almacenados//
export const getMessages = () => {
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return messagesJson ? JSON.parse(messagesJson) : [] //Retorna mensajes o array vacío//
}

//Guarda la lista de mensajes en localStorage//
export const saveMessages = (messages) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
}

//Obtiene el ID del usuario logueado (de localStorage o sessionStorage)//
export const getLoggedUserId = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || //Busca en localStorage//
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID)) //Si no, busca en sessionStorage//
}

//Función para guardar el estado del usuario//
export const saveUserStatus = (userId, status) => {
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return { ...user, status }
        }
        return user
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}

//Función para obtener el estado del usuario//
export const getUserStatus = (userId) => {
    const users = getUsers();
    const user = users.find(u => u.id === userId)
    return user?.status || ''
}

//Valida formato de email con expresión regular//
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //texto@texto.texto//
    return emailRegex.test(email); //Retorna true si cumple el patrón//
}

//Valida fortaleza de contraseña//
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    //Requiere: 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y mínimo 6 caracteres//
    return passwordRegex.test(password)
}

//Valida que un título no exceda 5 palabras//
export const validateTitle = (title) => {
    const words = title.split(/\s+/).filter(word => word.length > 0) //Divide y filtra palabras vacías//
    return words.length <= 5 //True si tiene 5 palabras o menos//
}

//Valida que un texto no exceda 100 palabras//
export const validateTextarea = (textarea) => {
    const words = textarea.split(/\s+/).filter(word => word.length > 0)
    return words.length <= 100 //True si tiene 100 palabras o menos//
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


