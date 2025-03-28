//Importa funciones para manejar mensajes desde utils.js//
import { saveMessages, getMessages } from './utils.js'

//Función para almacenar un nuevo mensaje//
export const storeMsg = (loggedUserUserId, title, msg, date, image = null) => {
    //Valida que título y mensaje no estén vacíos//
    if (!title || !msg) {
        createModal('All fields are required. The message has not been stored')
        return
    }

    //Obtiene todos los mensajes existentes//
    const messages = getMessages()

    //Crea objeto con los datos del nuevo mensaje//
    const objectUserMsg = {
        userId: loggedUserUserId,    //ID del usuario que crea el mensaje//
        title: title,                //Título del mensaje//
        msg: msg,                    //Contenido del mensaje//
        date: date.toLocaleString(), //Fecha formateada como string//
        likes: [],                   //Array para likes (inicia vacío)//
        dislikes: [],                //Array para dislikes (inicia vacío)//
        image: image                 //Imagen adjunta (opcional)//
    }

    //Agrega el nuevo mensaje al array//
    messages.push(objectUserMsg)
    //Guarda todos los mensajes actualizados//
    saveMessages(messages)
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

//Función para manejar dislikes en mensajes (similar a toggleLike)//
export const toggleDislike = (messageId, userId) => {
    const messages = getMessages()
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