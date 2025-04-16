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

//Función para manejar dislikes en mensajes (similar a toggleLike)//
export const toggleDislike = (messageId, userId) => {
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Busca el mensaje específico por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    if (message) {
        //Verifica si el usuario ya dio dislike//
        const userDislikeIndex = message.dislikes.indexOf(userId)
        //Verifica si el usuario ya dio like//
        const userLikeIndex = message.likes.indexOf(userId)

        //Si el usuario no había dado dislike antes//
        if (userDislikeIndex === -1) {
            //Agrega el dislike//
            message.dislikes.push(userId)
            //Si tenía like, lo remueve//
            if (userLikeIndex !== -1) {
                message.likes.splice(userLikeIndex, 1)
            }
        } else {
            //Si ya tenía dislike, lo remueve (toggle)//
            message.dislikes.splice(userDislikeIndex, 1)
        }
        //Guarda los cambios//
        saveMessages(messages)
    }
}

//Handler para dislikes//
export const handleDislike = (messageId, loggedUserId) => {
    //Ejecuta la función toggleDislike pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de dislike en el almacenamiento de datos//
    toggleDislike(messageId, loggedUserId);
    
    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}