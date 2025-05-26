//Importa la librería mongoose para interactuar con MongoDB//
const mongoose = require('mongoose');

//Importa la configuración de la base de datos desde el archivo constants.js//
const { DB_CONFIG } = require('../config/constants')

//Define el esquema (estructura) para los documentos de usuario en MongoDB//
const UserSchema = new mongoose.Schema({
    //Campo id: tipo String, obligatorio (required) y único (unique)//
    id: { type: String, required: true, unique: true },

    //Campo email: tipo String, obligatorio, único y se almacena en minúsculas (lowercase)//
    email: { type: String, required: true, unique: true, lowercase: true },

    //Campo password: tipo String y obligatorio//
    password: { type: String, required: true },

    //Campo userName: tipo String y obligatorio//
    userName: { type: String, required: true },

    //Campo avatar: tipo String, valor por defecto null (no obligatorio)//
    avatar: { type: String, default: null },

    //Campo status: tipo String, valor por defecto string vacío (no obligatorio)//
    status: { type: String, default: '' }
},
    //Opciones adicionales del esquema://
    {
        //Especifica el nombre de la colección en MongoDB (tomado de la configuración)//
        collection: DB_CONFIG.COLLECTIONS.USERS
    })

//Define el esquema para los documentos de mensaje en MongoDB//
const MessageSchema = new mongoose.Schema({
    //Campo userId: tipo String y obligatorio (identifica al usuario creador)//
    userId: { type: String, required: true },

    //Campo title: tipo String y obligatorio (título del mensaje)//
    title: { type: String, required: true },

    //Campo msg: tipo String y obligatorio (contenido del mensaje)//
    msg: { type: String, required: true },

    //Campo date: tipo String y obligatorio (fecha/hora del mensaje)//
    date: { type: String, required: true },

    //Campo image: tipo String, valor por defecto null (imagen adjunta en base64)//
    image: { type: String, default: null },

    //Campo likes: array de Strings, valor por defecto array vacío (IDs de usuarios que dieron like)//
    likes: { type: [String], default: [] },

    //Campo dislikes: array de Strings, valor por defecto array vacío (IDs de usuarios que dieron dislike)//
    dislikes: { type: [String], default: [] },

    //Campo favorite: array de Strings, valor por defecto array vacío (IDs de usuarios que marcaron como favorito)//
    favorite: { type: [String], default: [] }
},
    //Opciones adicionales del esquema://
    {
        //Especifica el nombre de la colección en MongoDB (tomado de la configuración)//
        collection: DB_CONFIG.COLLECTIONS.MESSAGES
    })

//Crea el modelo User a partir del esquema UserSchema//
//mongoose.model('NombreModelo', Esquema)//
const UserModel = mongoose.model('User', UserSchema)

//Crea el modelo Message a partir del esquema MessageSchema//
const MessageModel = mongoose.model('Message', MessageSchema)

//Exporta ambos modelos para que puedan ser utilizados en otros archivos//
module.exports = {
    UserModel,    //Modelo para interactuar con la colección de usuarios//
    MessageModel  //Modelo para interactuar con la colección de mensajes//
}