//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
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

//Función para manejar favoritos en mensajes//
export const toggleFavorite = (messageId, userId) => {
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Busca el mensaje específico por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    if (message) {
        //Verifica si el usuario ya dio favorito//
        const userFavoriteIndex = message.favorite.indexOf(userId)
        //Si el usuario no había dado favorito antes//
        if (userFavoriteIndex === -1) {
            //Agrega el favorito//
            message.favorite.push(userId)
        } else {
            //Si ya tenía favorito, lo remueve//
            message.favorite.splice(userFavoriteIndex, 1)
        }
        //Guarda los cambios//
        saveMessages(messages)
    }
}

//Handler para favoritos//
export const handleFavorite = (messageId, loggedUserId) => {
    //Ejecuta la función toggleFavorite pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de favorite en el almacenamiento de datos//
    toggleFavorite(messageId, loggedUserId)
    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}