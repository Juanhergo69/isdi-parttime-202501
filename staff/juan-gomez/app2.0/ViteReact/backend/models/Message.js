//Importa funciones auxiliares para leer y escribir mensajes en archivos//
const { getMessages, saveMessages } = require('../utils/fileUtils')

//Define la clase Message que maneja todas las operaciones con mensajes//
class Message {
    //Método estático para obtener todos los mensajes//
    static getAll() {
        //Obtiene y retorna todos los mensajes usando la función getMessages//
        return getMessages()
    }

    //Método estático para obtener mensajes de un usuario específico//
    static getByUserId(userId) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Filtra y retorna solo los mensajes del usuario especificado//
        return messages.filter(message => message.userId === userId)
    }

    //Método estático para obtener un mensaje por su fecha (que actúa como ID único)//
    static getById(date) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Busca y retorna el mensaje con la fecha coincidente//
        return messages.find(message => message.date === date)
    }

    //Método estático para crear un nuevo mensaje//
    static create(messageData) {
        //Obtiene todos los mensajes actuales//
        const messages = getMessages()
        //Crea un nuevo objeto mensaje con datos básicos y arrays vacíos para interacciones//
        const newMessage = {
            ...messageData,  //Copia todos los datos del mensaje//
            likes: [],       //Inicializa array de likes vacío//
            dislikes: [],    //Inicializa array de dislikes vacío//
            favorite: []     //Inicializa array de favoritos vacío//
        }
        //Agrega el nuevo mensaje al array de mensajes//
        messages.push(newMessage)
        //Guarda todos los mensajes en el archivo//
        saveMessages(messages)
        //Retorna el nuevo mensaje creado//
        return newMessage
    }

    //Método estático para actualizar un mensaje existente//
    static update(date, updateData) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Encuentra el índice del mensaje a actualizar//
        const messageIndex = messages.findIndex(message => message.date === date)

        //Si no encuentra el mensaje, retorna null//
        if (messageIndex === -1) return null

        //Crea una copia del mensaje original con los datos actualizados//
        const updatedMessage = {
            ...messages[messageIndex],  //Copia los datos existentes//
            ...updateData               //Aplica las actualizaciones//
        }

        //Reemplaza el mensaje antiguo con el actualizado//
        messages[messageIndex] = updatedMessage
        //Guarda los cambios en el archivo//
        saveMessages(messages)
        //Retorna el mensaje actualizado//
        return updatedMessage
    }

    //Método estático para eliminar un mensaje//
    static delete(date) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Filtra los mensajes, eliminando el que coincide con la fecha//
        const updatedMessages = messages.filter(message => message.date !== date)
        //Guarda los mensajes restantes//
        saveMessages(updatedMessages)
        //Retorna true si se eliminó un mensaje, false si no//
        return updatedMessages.length !== messages.length
    }

    //Método estático para manejar likes/dislikes//
    static toggleReaction(date, userId, reactionType) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Encuentra el índice del mensaje//
        const messageIndex = messages.findIndex(message => message.date === date)

        //Si no encuentra el mensaje, retorna null//
        if (messageIndex === -1) return null

        //Obtiene el mensaje específico//
        const message = messages[messageIndex];
        //Obtiene el array de reacciones (likes o dislikes)//
        const reactionArray = message[reactionType]
        //Determina el tipo de reacción opuesta//
        const oppositeReaction = reactionType === 'likes' ? 'dislikes' : 'likes'
        //Obtiene el array de la reacción opuesta//
        const oppositeArray = message[oppositeReaction]

        //Busca si el usuario ya tiene esta reacción//
        const userReactionIndex = reactionArray.indexOf(userId)

        if (userReactionIndex === -1) {
            //Si no tiene la reacción, la añade//
            reactionArray.push(userId)

            //Elimina la reacción opuesta si existe//
            const oppositeIndex = oppositeArray.indexOf(userId)
            if (oppositeIndex !== -1) {
                oppositeArray.splice(oppositeIndex, 1)
            }
        } else {
            //Si ya tiene la reacción, la quita//
            reactionArray.splice(userReactionIndex, 1)
        }

        //Guarda los cambios//
        saveMessages(messages)
        //Retorna todos los mensajes actualizados//
        return messages
    }

    //Método estático para manejar favoritos//
    static toggleFavorite(date, userId) {
        //Obtiene todos los mensajes//
        const messages = getMessages()
        //Encuentra el índice del mensaje//
        const messageIndex = messages.findIndex(message => message.date === date)

        //Si no encuentra el mensaje, retorna null//
        if (messageIndex === -1) return null

        //Obtiene el array de favoritos del mensaje//
        const favorites = messages[messageIndex].favorite
        //Busca si el usuario ya marcó como favorito//
        const userFavoriteIndex = favorites.indexOf(userId)

        if (userFavoriteIndex === -1) {
            //Si no está en favoritos, lo añade//
            favorites.push(userId)
        } else {
            //Si ya está en favoritos, lo quita//
            favorites.splice(userFavoriteIndex, 1)
        }

        //Guarda los cambios//
        saveMessages(messages)
        //Retorna todos los mensajes actualizados//
        return messages
    }
}

//Exporta la clase Message para ser usada en otros archivos//
module.exports = Message