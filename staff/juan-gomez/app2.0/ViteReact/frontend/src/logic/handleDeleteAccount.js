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

//Función para borrar cuenta de usuario//
export const handleDeleteAccount = () => {
    //1. Obtenemos todos los datos necesarios//
    const users = getUsers()
    const messages = getMessages()
    const userId = getLoggedUserId()

    if (!userId) { //Si no existe id de usuario//
        throw new Error('No user logged in') //Mostrar error//
    }

    //2. Eliminar al usuario//
    const updatedUsers = users.filter(user => user.id !== userId) //Filtramos//
    saveUsers(updatedUsers) //Guardamos lista de usuarios//

    //3. Eliminar mensajes del usuario//
    const updatedMessages = messages.filter(message => message.userId !== userId)

    //4. Eliminar interacciones del usuario//
    const finalMessages = updatedMessages.map(message => ({
        ...message,
        likes: message.likes.filter(like => like !== userId),
        dislikes: message.dislikes.filter(dislike => dislike !== userId)
    }))
    saveMessages(finalMessages)

    //5. Limpiar almacenamiento//
    localStorage.removeItem('id')
    sessionStorage.removeItem('id')

    return true
}