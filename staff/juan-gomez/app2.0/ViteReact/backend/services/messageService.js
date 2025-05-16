//Importa el modelo Message desde el archivo correspondiente para interactuar con los mensajes en la base de datos//
const Message = require('../models/Message')

//Importa funciones de validación desde el archivo de utils para validar título y contenido de mensajes//
const { validateTitle, validateTextarea } = require('../utils/validators')

//Define la clase MessageService que encapsula la lógica de negocio relacionada con mensajes//
class MessageService {
    //Método estático para obtener todos los mensajes del sistema//
    static getAllMessages() {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve) => {
            //Llama al método getAll del modelo Message para obtener todos los mensajes//
            Message.getAll()
                .then(messages => {
                    //Normaliza los datos de los mensajes para asegurar estructura consistente//
                    const formattedMessages = Array.isArray(messages)
                        ? messages.map(msg => ({
                            ...msg,  //Copia todas las propiedades existentes del mensaje//
                            //Asegura que likes sea un array (o lo inicializa como array vacío)//
                            likes: Array.isArray(msg.likes) ? msg.likes : [],
                            //Asegura que dislikes sea un array (o lo inicializa como array vacío)//
                            dislikes: Array.isArray(msg.dislikes) ? msg.dislikes : [],
                            //Asegura que favorite sea un array (o lo inicializa como array vacío)//
                            favorite: Array.isArray(msg.favorite) ? msg.favorite : []
                        }))
                        : [];  //Si messages no es array, devuelve array vacío//

                    //Resuelve la Promise con los mensajes formateados//
                    resolve({
                        success: true,               //Indica que la operación fue exitosa//
                        messages: formattedMessages  //Devuelve los mensajes procesados//
                    })
                })
                .catch(error => {
                    //Captura y registra cualquier error ocurrido durante la obtención de mensajes//
                    console.error('Error in MessageService.getAllMessages:', error)
                    //Resuelve con un objeto indicando fallo pero sin rechazar la Promise//
                    resolve({
                        success: false,                       //Indica que la operación falló//
                        messages: [],                         //Devuelve array vacío de mensajes//
                        error: 'Failed to retrieve messages'  //Mensaje de error genérico//
                    })
                })
        })
    }

    //Método estático para obtener mensajes de un usuario específico//
    static getMessagesByUser(userId) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve) => {
            //Obtiene los mensajes del usuario usando el método getByUserId del modelo//
            const messages = Message.getByUserId(userId)
            //Resuelve la Promise con los mensajes encontrados//
            resolve({
                success: true,  //Indica operación exitosa//
                messages        //Devuelve los mensajes del usuario//
            })
        })
    }

    //Método estático para crear un nuevo mensaje//
    static createMessage(userId, title, msg, image = null) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Valida que tanto título como mensaje no estén vacíos//
            if (!title || !msg) {
                //Rechaza la Promise si falta alguno de los campos requeridos//
                return reject({
                    success: false,
                    error: 'All fields are required. The message has not been stored'
                })
            }

            //Valida que el título cumpla con los requisitos usando la función validateTitle//
            if (!validateTitle(title)) {
                //Rechaza si el título no cumple con los requisitos//
                return reject({
                    success: false,
                    error: 'Title cannot exceed 5 words'
                })
            }

            //Valida que el contenido del mensaje cumpla con los requisitos//
            if (!validateTextarea(msg)) {
                //Rechaza si el mensaje no cumple con los requisitos//
                return reject({
                    success: false,
                    error: 'Message cannot exceed 100 words'
                })
            }

            //Crea el nuevo mensaje usando el modelo Message//
            const newMessage = Message.create({
                userId,                             //ID del usuario que crea el mensaje//
                title,                              //Título del mensaje ya validado//
                msg,                                //Contenido del mensaje ya validado//
                date: new Date().toLocaleString(),  //Fecha actual formateada como string local//
                image                               //Imagen adjunta (puede ser null)//
            })

            //Resuelve la Promise con el nuevo mensaje creado//
            resolve({
                success: true,          //Indica operación exitosa//
                message: newMessage,    //Devuelve el nuevo mensaje creado//
                //Mensaje de notificación que varía según si hay imagen o no//
                notification: image
                    ? 'Message stored successfully with image!'
                    : 'Message stored successfully!'
            })
        })
    }

    //Método estático para eliminar un mensaje por su fecha de creación//
    static deleteMessage(date) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Intenta eliminar el mensaje usando el método delete del modelo//
            const deleted = Message.delete(date)
            //Verifica si no se pudo eliminar (mensaje no encontrado)//
            if (!deleted) {
                //Rechaza la Promise si el mensaje no existe//
                return reject({
                    success: false,
                    error: 'Message not found'
                })
            }
            //Resuelve la Promise si la eliminación fue exitosa//
            resolve({ success: true })
        })
    }

    //Método estático para alternar el "like" de un usuario en un mensaje//
    static toggleLike(date, userId) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Llama al método toggleReaction del modelo para gestionar el like//
            Message.toggleReaction(date, userId, 'likes')
                .then(messages => {
                    //Verifica si no se encontró el mensaje//
                    if (!messages) {
                        //Rechaza si el mensaje no existe//
                        return reject({
                            success: false,
                            error: 'Message not found'
                        })
                    }

                    //Obtiene todos los mensajes con sus datos completos (incluyendo imágenes)//
                    Message.getAll()
                        .then(completeMessages => {
                            //Combina los mensajes actualizados con sus datos completos//
                            const mergedMessages = messages.map(msg => {
                                //Encuentra el mensaje completo correspondiente//
                                const completeMsg = completeMessages.find(m => m.date === msg.date)
                                //Retorna un nuevo objeto combinando datos completos con reacciones actualizadas//
                                return {
                                    ...completeMsg,        //Copia todas las propiedades del mensaje completo//
                                    likes: msg.likes,      //Usa los likes actualizados//
                                    dislikes: msg.dislikes //Usa los dislikes actualizados//
                                }
                            })

                            //Resuelve la Promise con los mensajes combinados//
                            resolve({
                                success: true,
                                messages: mergedMessages
                            })
                        })
                        .catch(reject)   //Pasa cualquier error al reject de la Promise principal//
                })
                .catch(reject)           //Pasa cualquier error al reject de la Promise principal//
        })
    }

    //Método estático para alternar el "dislike" de un usuario en un mensaje//
    static toggleDislike(date, userId) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Similar a toggleLike pero para dislikes//
            Message.toggleReaction(date, userId, 'dislikes')
                .then(messages => {
                    if (!messages) {
                        return reject({
                            success: false,
                            error: 'Message not found'
                        });
                    }

                    //Obtiene todos los mensajes completos para combinar datos//
                    Message.getAll()
                        .then(completeMessages => {
                            //Combina datos como en toggleLike//
                            const mergedMessages = messages.map(msg => {
                                const completeMsg = completeMessages.find(m => m.date === msg.date)
                                return {
                                    ...completeMsg,
                                    likes: msg.likes,
                                    dislikes: msg.dislikes
                                }
                            })

                            resolve({
                                success: true,
                                messages: mergedMessages
                            })
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    //Método estático para alternar el estado "favorito" de un mensaje para un usuario//
    static toggleFavorite(date, userId) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Llama al método toggleFavorite del modelo//
            Message.toggleFavorite(date, userId, 'favorite')
                .then(messages => {
                    if (!messages) {
                        return reject({
                            success: false,
                            error: 'Message not found'
                        })
                    }

                    //Obtiene todos los mensajes completos para combinar datos//
                    Message.getAll()
                        .then(completeMessages => {
                            //Combina datos incluyendo ahora también el campo favorite//
                            const mergedMessages = messages.map(msg => {
                                const completeMsg = completeMessages.find(m => m.date === msg.date)
                                return {
                                    ...completeMsg,
                                    likes: msg.likes,
                                    dislikes: msg.dislikes,
                                    favorite: msg.favorite  //Añade el campo favorite actualizado//
                                };
                            });

                            resolve({
                                success: true,
                                messages: mergedMessages
                            });
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }
}

//Exporta la clase MessageService para que pueda ser utilizada en otros módulos//
module.exports = MessageService