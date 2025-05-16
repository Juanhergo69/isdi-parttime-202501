//Importa la configuración de la base de datos desde las constantes//
const { DB_CONFIG } = require('../config/constants')
//Importa la función para obtener la conexión a la base de datos//
const { getDB } = require('../config/db')

//Define la clase Message que contendrá todos los métodos estáticos para interactuar con los mensajes//
class Message {
    //Método estático para obtener todos los mensajes//
    static getAll() {
        //Retorna una nueva promesa para manejar operaciones asíncronas//
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes en la base de datos//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Busca todos los documentos en la colección//
                .find()
                //Convierte los resultados a un array//
                .toArray()
                .then(messages => {
                    //Normaliza los mensajes para asegurar estructura consistente//
                    const normalizedMessages = messages.map(msg => ({
                        userId: msg.userId,           //ID del usuario que creó el mensaje//
                        title: msg.title,             //Título del mensaje//
                        msg: msg.msg,                 //Contenido del mensaje//
                        date: msg.date,               //Fecha del mensaje//
                        image: msg.image || null,     //Imagen adjunta (null si no existe)//
                        likes: msg.likes || [],       //Array de likes (vacío si no existe)//
                        dislikes: msg.dislikes || [], //Array de dislikes (vacío si no existe)//
                        favorite: msg.favorite || []  //Array de favoritos (vacío si no existe)//
                    }))
                    //Resuelve la promesa con los mensajes normalizados//
                    resolve(normalizedMessages)
                })
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para obtener mensajes por ID de usuario//
    static getByUserId(userId) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Busca mensajes que coincidan con el userId//
                .find({ userId })
                //Convierte los resultados a array//
                .toArray()
                //Resuelve con los mensajes encontrados//
                .then(resolve)
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para obtener un mensaje por su fecha (que actúa como ID único)//
    static getById(date) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Busca un único mensaje que coincida con la fecha//
                .findOne({ date })
                //Resuelve con el mensaje encontrado//
                .then(resolve)
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para crear un nuevo mensaje//
    static create(messageData) {
        return new Promise((resolve, reject) => {
            //Crea un nuevo objeto de mensaje con valores por defecto para arrays de interacción//
            const newMessage = {
                ...messageData,     //Copia todas las propiedades del mensaje recibido//
                likes: [],          //Inicializa array de likes vacío//
                dislikes: [],       //Inicializa array de dislikes vacío//
                favorite: []        //Inicializa array de favoritos vacío//
            }

            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Inserta el nuevo mensaje en la colección//
                .insertOne(newMessage)
                //Resuelve con el mensaje creado//
                .then(() => resolve(newMessage))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para actualizar un mensaje existente//
    static update(date, updateData) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Busca y actualiza el mensaje con la fecha especificada//
                .findOneAndUpdate(
                    { date },                         //Filtro por fecha//
                    { $set: updateData },             //Datos a actualizar//
                    { returnDocument: 'after' }       //Devuelve el documento actualizado//
                )
                //Resuelve con el mensaje actualizado//
                .then(result => resolve(result.value))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para eliminar un mensaje//
    static delete(date) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Elimina el mensaje con la fecha especificada//
                .deleteOne({ date })
                //Resuelve con true si se eliminó, false si no//
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

                    //Obtiene el array de reacciones del tipo especificado//
                    const reactionArray = message[reactionType] || []
                    //Determina el tipo de reacción opuesta//
                    const oppositeReaction = reactionType === 'likes' ? 'dislikes' : 'likes'
                    //Obtiene el array de reacciones opuestas//
                    const oppositeArray = message[oppositeReaction] || []

                    //Prepara el objeto de actualización//
                    const updateQuery = {
                        $set: {
                            //Preserva todos los campos importantes del mensaje//
                            title: message.title,
                            msg: message.msg,
                            image: message.image,
                            date: message.date,
                            userId: message.userId
                        }
                    }

                    //Si el usuario ya había reaccionado de esta manera//
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
                    return getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                        .updateOne({ date }, updateQuery)
                })
                //Después de actualizar, obtiene todos los mensajes actualizados//
                .then(() => this.getAll())
                //Resuelve con la lista completa de mensajes//
                .then(messages => resolve(messages))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para manejar favoritos//
    static toggleFavorite(date, userId) {
        return new Promise((resolve, reject) => {
            //Primero obtiene el mensaje por su fecha//
            this.getById(date)
                .then(message => {
                    //Si no existe el mensaje, resuelve con null//
                    if (!message) return resolve(null)

                    //Prepara el objeto de actualización//
                    const updateQuery = {
                        $set: {
                            //Preserva todos los campos del mensaje//
                            title: message.title,
                            msg: message.msg,
                            image: message.image,
                            date: message.date,
                            userId: message.userId
                        }
                    }

                    //Si el usuario ya tenía el mensaje como favorito//
                    if (message.favorite.includes(userId)) {
                        //Prepara operación para quitar de favoritos//
                        updateQuery.$pull = { favorite: userId }
                    } else {
                        //Prepara operación para añadir a favoritos//
                        updateQuery.$addToSet = { favorite: userId }
                    }

                    //Ejecuta la actualización en la base de datos//
                    return getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                        .updateOne({ date }, updateQuery)
                })
                //Después de actualizar, obtiene todos los mensajes actualizados//
                .then(() => this.getAll())
                //Resuelve con la lista completa de mensajes//
                .then(messages => resolve(messages))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para eliminar todos los mensajes de un usuario//
    static deleteAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            // Accede a la colección de mensajes
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Elimina todos los mensajes del usuario especificado//
                .deleteMany({ userId })
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

    //Método estático para remover un usuario de todas las interacciones//
    static removeUserFromAllInteractions(userId) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de mensajes//
            getDB().collection(DB_CONFIG.COLLECTIONS.MESSAGES)
                //Actualiza todos los mensajes//
                .updateMany(
                    {},  //Filtro vacío para aplicar a todos los documentos//
                    {
                        //Operación para remover el userId de todos los arrays de interacción//
                        $pull: {
                            likes: userId,      //Remueve de likes//
                            dislikes: userId,   //Remueve de dislikes//
                            favorite: userId    //Remueve de favoritos//
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

//Exporta la clase Message para ser utilizada en otros módulos//
module.exports = Message