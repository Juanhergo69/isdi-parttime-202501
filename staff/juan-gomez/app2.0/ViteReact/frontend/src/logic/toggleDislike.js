//Importa getMessages//
import { getMessages } from "./getMessages"
//Importa saveMessages//
import { saveMessages } from "./saveMessages"

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