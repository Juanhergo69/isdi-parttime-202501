//Importa el modelo Message de Mongoose definido en el archivo schemas.js//
const { MessageModel } = require('./schemas')

//Define la clase Message que contiene métodos estáticos para interactuar con la colección de mensajes//
class Message {
    //Método estático para obtener todos los mensajes de la base de datos//
    static getAll() {
        //Retorna una nueva Promesa para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Busca todos los documentos en la colección MessageModel//
            MessageModel.find({})
                //Si la búsqueda es exitosa, mapea los resultados a objetos JavaScript simples//
                .then(messages => resolve(messages.map(msg => msg.toObject())))
                //Si hay un error, rechaza la promesa con el error//
                .catch(reject)
        })
    }

    //Método estático para obtener mensajes por ID de usuario//
    static getByUserId(userId) {
        return new Promise((resolve, reject) => {
            //Busca mensajes donde el campo userId coincida con el parámetro//
            MessageModel.find({ userId })
                //Resuelve la promesa con los mensajes encontrados//
                .then(resolve)
                //Rechaza la promesa si hay error//
                .catch(reject)
        })
    }

    //Método estático para obtener un mensaje por su fecha (identificador único)//
    static getById(date) {
        return new Promise((resolve, reject) => {
            //Busca un único mensaje donde el campo date coincida con el parámetro//
            MessageModel.findOne({ date })
                //Resuelve la promesa con el mensaje encontrado (o null si no existe)//
                .then(resolve)
                //Rechaza la promesa si hay error//
                .catch(reject)
        })
    }

    //Método estático para crear un nuevo mensaje//
    static create(messageData) {
        return new Promise((resolve, reject) => {
            //Crea una nueva instancia de MessageModel con los datos proporcionados//
            const newMessage = new MessageModel({
                //Copia todas las propiedades de messageData//
                ...messageData,
                //Inicializa arrays vacíos para interacciones//
                likes: [],
                dislikes: [],
                favorite: []
            })
            //Guarda el nuevo mensaje en la base de datos//
            newMessage.save()
                //Si se guarda correctamente, resuelve con el mensaje convertido a objeto simple//
                .then(() => resolve(newMessage.toObject()))
                //Si hay error, rechaza la promesa//
                .catch(reject)
        })
    }

    //Método estático para actualizar un mensaje existente//
    static update(date, updateData) {
        return new Promise((resolve, reject) => {
            //Busca y actualiza un mensaje en una sola operación atómica//
            MessageModel.findOneAndUpdate(
                { date },               //Criterio de búsqueda: campo date igual al parámetro//
                { $set: updateData },   //Operación de actualización: establece los nuevos valores//
                { new: true }           //Opción: devuelve el documento actualizado en lugar del original//
            )
                //Resuelve con el documento actualizado (convertido a objeto) o null si no se encontró//
                .then(result => resolve(result ? result.toObject() : null))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para eliminar un mensaje//
    static delete(date) {
        return new Promise((resolve, reject) => {
            //Elimina un mensaje donde el campo date coincida con el parámetro//
            MessageModel.deleteOne({ date })
                //Resuelve con true si se eliminó un documento, false si no//
                .then(result => resolve(result.deletedCount > 0))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para manejar reacciones (like/dislike)//
    static toggleReaction(date, userId, reactionType) {
        return new Promise((resolve, reject) => {
            //Primero obtiene el mensaje por su fecha//
            this.getById(date)
                .then(message => {
                    //Si no existe el mensaje, resuelve con null//
                    if (!message) return resolve(null)

                    //Obtiene el array de reacciones del tipo especificado (o array vacío si no existe)//
                    const reactionArray = message[reactionType] || [];
                    //Determina el tipo de reacción opuesta (like/dislike)//
                    const oppositeReaction = reactionType === 'likes' ? 'dislikes' : 'likes'
                    //Obtiene el array de reacciones opuestas//
                    const oppositeArray = message[oppositeReaction] || []

                    //Prepara el objeto de actualización//
                    const updateQuery = {}

                    //Si el usuario ya había reaccionado con este tipo//
                    if (reactionArray.includes(userId)) {
                        //Prepara operación para quitar la reacción//
                        updateQuery.$pull = { [reactionType]: userId }
                    } else {
                        //Prepara operación para añadir la reacción//
                        updateQuery.$addToSet = { [reactionType]: userId }
                        //Si el usuario tenía la reacción opuesta//
                        if (oppositeArray.includes(userId)) {
                            //Prepara operación para quitar la reacción opuesta//
                            updateQuery.$pull = { [oppositeReaction]: userId }
                        }
                    }

                    //Ejecuta la actualización en la base de datos//
                    return MessageModel.updateOne({ date }, updateQuery)
                })
                //Después de actualizar, obtiene todos los mensajes actualizados//
                .then(() => this.getAll())
                //Resuelve con la lista completa de mensajes//
                .then(messages => resolve(messages))
                //Rechaza si hay error en cualquier paso//
                .catch(reject)
        })
    }

    //Método estático para manejar favoritos (similar a toggleReaction pero solo para favorites)//
    static toggleFavorite(date, userId) {
        return new Promise((resolve, reject) => {
            //Obtiene el mensaje por su fecha//
            this.getById(date)
                .then(message => {
                    //Si no existe el mensaje, resuelve con null//
                    if (!message) return resolve(null)

                    //Prepara el objeto de actualización//
                    const updateQuery = {}

                    //Si el usuario ya tenía el mensaje como favorito//
                    if (message.favorite.includes(userId)) {
                        //Prepara operación para quitar de favoritos//
                        updateQuery.$pull = { favorite: userId }
                    } else {
                        //Prepara operación para añadir a favoritos//
                        updateQuery.$addToSet = { favorite: userId }
                    }

                    //Ejecuta la actualización en la base de datos//
                    return MessageModel.updateOne({ date }, updateQuery)
                })
                //Después de actualizar, obtiene todos los mensajes actualizados//
                .then(() => this.getAll())
                //Resuelve con la lista completa de mensajes//
                .then(messages => resolve(messages))
                //Rechaza si hay error en cualquier paso//
                .catch(reject)
        })
    }

    //Método estático para eliminar todos los mensajes de un usuario específico//
    static deleteAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            //Elimina todos los mensajes donde el campo userId coincida con el parámetro//
            MessageModel.deleteMany({ userId })
                .then(result => {
                    //Registra en consola cuántos mensajes se eliminaron//
                    console.log(`Deleted ${result.deletedCount} messages for user ${userId}`)
                    //Resuelve con true indicando éxito//
                    resolve(true)
                })
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para remover un usuario de todas las interacciones en todos los mensajes//
    static removeUserFromAllInteractions(userId) {
        return new Promise((resolve, reject) => {
            //Actualiza todos los mensajes en la colección//
            MessageModel.updateMany(
                {}, //Filtro vacío para aplicar a todos los documentos//
                {
                    //Operación para remover el userId de todos los arrays de interacción//
                    $pull: {
                        likes: userId,    //Remueve de likes//
                        dislikes: userId, //Remueve de dislikes//
                        favorite: userId  //Remueve de favoritos//
                    }
                }
            )
                .then(result => {
                    //Registra en consola cuántos mensajes se actualizaron//
                    console.log(`Removed user ${userId} from interactions in ${result.modifiedCount} messages`)
                    //Resuelve con true indicando éxito//
                    resolve(true)
                })
                //Rechaza si hay error//
                .catch(reject)
        })
    }
}

//Exporta la clase Message para que pueda ser utilizada en otros módulos//
module.exports = Message