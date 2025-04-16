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
//Función para manejar la eliminación de mensajes//
export const deleteMessage = (messageId) => {
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Filtra para excluir el mensaje cuyo campo date coincide con messageId//
    const updatedMessages = messages.filter(msg => msg.date !== messageId)
    //Guarda la lista de mensajes actualizados (eliminando el mensaje que se ha filtrado) en localStorage//
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
}