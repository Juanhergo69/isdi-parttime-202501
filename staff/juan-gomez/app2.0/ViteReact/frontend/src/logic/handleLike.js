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

//Función para manejar likes en mensajes//
export const toggleLike = (messageId, userId) => {
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Busca el mensaje específico por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    if (message) {
        //Verifica si el usuario ya dio like//
        const userLikeIndex = message.likes.indexOf(userId)
        //Verifica si el usuario ya dio dislike//
        const userDislikeIndex = message.dislikes.indexOf(userId)

        //Si el usuario no había dado like antes//
        if (userLikeIndex === -1) {
            //Agrega el like//
            message.likes.push(userId)
            //Si tenía dislike, lo remueve//
            if (userDislikeIndex !== -1) {
                message.dislikes.splice(userDislikeIndex, 1)
            }
        } else {
            //Si ya tenía like, lo remueve (toggle)//
            message.likes.splice(userLikeIndex, 1)
        }
        //Guarda los cambios//
        saveMessages(messages)
    }
}

//Handler para likes//
export const handleLike = (messageId, loggedUserId) => {
    //Ejecuta la función toggleLike pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de like en el almacenamiento de datos//
    toggleLike(messageId, loggedUserId)

    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}