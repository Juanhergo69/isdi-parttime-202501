//Importa getMessages//
import { getMessages } from "./getMessages"
//Importa saveMessages//
import { saveMessages } from "./saveMessages"

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