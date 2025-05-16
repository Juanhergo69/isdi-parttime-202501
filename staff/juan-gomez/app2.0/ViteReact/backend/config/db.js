//Importa la clase MongoClient del paquete 'mongodb' para interactuar con MongoDB//
const { MongoClient } = require('mongodb')

//Importa la configuración de la base de datos desde el archivo constants.js//
const { DB_CONFIG } = require('./constants')

//Variable para almacenar la instancia del cliente de MongoDB//
let client

//Variable para almacenar la instancia de la base de datos//
let db

//Función para establecer la conexión con la base de datos MongoDB//
const connectDB = () => {
    //Retorna una nueva Promesa para manejar la conexión de forma asíncrona//
    return new Promise((resolve, reject) => {
        //Si ya existe una conexión a la base de datos, resuelve la promesa con la instancia existente//
        if (db) {
            return resolve(db)
        }

        //Intenta conectar con el servidor MongoDB usando la URI de conexión//
        MongoClient.connect(DB_CONFIG.URI)
            .then((mongoClient) => {
                //Almacena el cliente de MongoDB en la variable 'client'//
                client = mongoClient
                //Obtiene la base de datos específica usando el nombre definido en DB_CONFIG//
                db = client.db(DB_CONFIG.DB_NAME)
                //Mensaje de confirmación de conexión exitosa//
                console.log('Connected to MongoDB')
                //Resuelve la promesa con la instancia de la base de datos//
                resolve(db)
            })
            .catch(error => {
                //Si hay un error en la conexión, muestra el error en consola//
                console.error('MongoDB connection error:', error)
                //Rechaza la promesa con el error//
                reject(error)
            })
    })
}

//Función para obtener la instancia de la base de datos//
const getDB = () => {
    //Si no hay una instancia de base de datos, lanza un error//
    if (!db) throw new Error('Database not initialized. Call connectDB first.')
    //Retorna la instancia de la base de datos//
    return db
}

//Función para cerrar la conexión con la base de datos//
const closeDB = () => {
    //Verifica si existe una instancia del cliente//
    if (client) {
        //Cierra la conexión y retorna una promesa//
        return client.close()
            .then(() => {
                //Mensaje de confirmación de cierre de conexión//
                console.log('MongoDB connection closed')
                //Limpia las variables de instancia//
                db = null
                client = null
            })
            .catch(error => {
                //Si hay un error al cerrar la conexión, lo muestra en consola//
                console.error('Error closing MongoDB connection:', error)
                //Propaga el error//
                throw error
            })
    }
    //Si no hay cliente, retorna una promesa resuelta//
    return Promise.resolve()
}

//Exporta las funciones para que puedan ser utilizadas en otros módulos//
module.exports = {
    connectDB,  //Función para conectar a la base de datos//
    getDB,      //Función para obtener la instancia de la base de datos//
    closeDB     //Función para cerrar la conexión con la base de datos//
}