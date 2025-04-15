//Importamos getMessages//
import { getMessages } from "./getMessages"
//Importamos saveMessages//
import { saveMessages } from "./saveMessages"

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