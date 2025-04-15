//Importamos getMessages//
import { getMessages } from "./getMessages"

//Función para manejar la eliminación de mensajes//
export const deleteMessage = (messageId) => {
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Filtra para excluir el mensaje cuyo campo date coincide con messageId//
    const updatedMessages = messages.filter(msg => msg.date !== messageId)
    //Guarda la lista de mensajes actualizados (eliminando el mensaje que se ha filtrado) en localStorage//
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
}