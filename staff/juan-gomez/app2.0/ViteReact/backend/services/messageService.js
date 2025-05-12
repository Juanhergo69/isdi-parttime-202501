//Importa el modelo Message para interactuar con los datos de mensajes//
const Message = require('../models/Message')
//Importa funciones de validación desde el archivo de utils//
const { validateTitle, validateTextarea } = require('../utils/validators')

//Define la clase MessageService que contiene la lógica de negocio para mensajes//
class MessageService {
    //Método estático para obtener todos los mensajes//
    static getAllMessages() {
        //Retorna una nueva Promesa para manejo asíncrono//
        return new Promise((resolve) => {
            //Obtiene todos los mensajes usando el modelo Message//
            const messages = Message.getAll()
            //Resuelve la promesa con los mensajes//
            resolve({ success: true, messages })
        })
    }

    //Método estático para obtener mensajes de un usuario específico//
    static getMessagesByUser(userId) {
        //Retorna una nueva Promesa//
        return new Promise((resolve) => {
            //Obtiene mensajes filtrados por userId usando el modelo//
            const messages = Message.getByUserId(userId)
            //Resuelve la promesa con los mensajes del usuario//
            resolve({ success: true, messages })
        })
    }

    //Método estático para crear un nuevo mensaje//
    static createMessage(userId, title, msg, image = null) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Valida que título y mensaje no estén vacíos//
            if (!title || !msg) {
                return reject({
                    success: false,
                    error: 'All fields are required. The message has not been stored'
                })
            }

            //Valida que el título cumpla con los requisitos//
            if (!validateTitle(title)) {
                return reject({
                    success: false,
                    error: 'Title cannot exceed 5 words'
                })
            }

            //Valida que el mensaje cumpla con los requisitos//
            if (!validateTextarea(msg)) {
                return reject({
                    success: false,
                    error: 'Message cannot exceed 100 words'
                })
            }

            // Crea el nuevo mensaje usando el modelo Message
            const newMessage = Message.create({
                userId,                             //ID del usuario que crea el mensaje//
                title,                              //Título del mensaje validado//
                msg,                                //Contenido del mensaje validado//
                date: new Date().toLocaleString(),  //Fecha actual formateada//
                image                               //Imagen adjunta (opcional)//
            })

            //Resuelve la promesa con el nuevo mensaje creado//
            resolve({
                success: true,
                message: newMessage,
                //Mensaje de notificación condicional basado en si hay imagen//
                notification: image
                    ? 'Message stored successfully with image!'
                    : 'Message stored successfully!'
            })
        })
    }

    //Método estático para eliminar un mensaje//
    static deleteMessage(date) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Intenta eliminar el mensaje usando el modelo//
            const deleted = Message.delete(date)
            //Si no se encontró el mensaje (deleted = false)//
            if (!deleted) {
                return reject({
                    success: false,
                    error: 'Message not found'
                })
            }
            //Si se eliminó correctamente//
            resolve({ success: true })
        })
    }

    // Método estático para alternar "like" en un mensaje
    static toggleLike(date, userId) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Usa el modelo para alternar la reacción "like"//
            const messages = Message.toggleReaction(date, userId, 'likes')
            //Si no se encontró el mensaje//
            if (!messages) {
                return reject({
                    success: false,
                    error: 'Message not found'
                })
            }
            //Si la operación fue exitosa//
            resolve({
                success: true,
                messages //Devuelve todos los mensajes actualizados//
            })
        })
    }

    //Método estático para alternar "dislike" en un mensaje//
    static toggleDislike(date, userId) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Usa el modelo para alternar la reacción "dislike"//
            const messages = Message.toggleReaction(date, userId, 'dislikes')
            if (!messages) {
                return reject({
                    success: false,
                    error: 'Message not found'
                })
            }
            resolve({
                success: true,
                messages
            })
        })
    }

    //Método estático para alternar "favorito" en un mensaje//
    static toggleFavorite(date, userId) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Usa el modelo para alternar el estado "favorite"//
            const messages = Message.toggleFavorite(date, userId)
            if (!messages) {
                return reject({
                    success: false,
                    error: 'Message not found'
                });
            }
            resolve({
                success: true,
                messages
            })
        })
    }
}

//Exporta la clase MessageService para ser usada en otros módulos//
module.exports = MessageService