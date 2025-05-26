//Importa el módulo mongoose para interactuar con MongoDB//
const mongoose = require('mongoose')
//Importa la configuración de la base de datos desde el archivo constants
const { DB_CONFIG } = require('./constants')

//Variable para almacenar la conexión a la base de datos (singleton)//
let dbConnection = null

//Función para conectar a la base de datos//
const connectDB = () => {
    //Retorna una promesa para manejar la conexión asíncrona//
    return new Promise((resolve, reject) => {
        //Si ya existe una conexión, la retorna inmediatamente (patrón singleton)//
        if (dbConnection) {
            return resolve(dbConnection)
        }

        //Configura Mongoose para que falle en consultas con campos no definidos en el esquema//
        mongoose.set('strictQuery', true)

        //Construye la URL de conexión usando la URI y el nombre de la base de datos//
        const dbUri = `${DB_CONFIG.URI}/${DB_CONFIG.DB_NAME}`

        //Intenta conectar a MongoDB usando la URL construida//
        mongoose.connect(dbUri)
            .then(() => {
                //Si la conexión es exitosa, muestra mensaje y almacena la conexión//
                console.log('Connected to MongoDB with Mongoose')
                dbConnection = mongoose.connection
                resolve(dbConnection)
            })
            .catch(error => {
                //Si hay error, lo muestra y rechaza la promesa//
                console.error('MongoDB connection error:', error)
                reject(error)
            })
    })
}

//Función para obtener la conexión existente//
const getDB = () => {
    //Si no hay conexión, lanza un error//
    if (!dbConnection) throw new Error('Database not initialized. Call connectDB first.')
    //Retorna la conexión existente//
    return dbConnection
}

//Función para cerrar la conexión a la base de datos//
const closeDB = () => {
    return new Promise((resolve, reject) => {
        //Si hay una conexión activa//
        if (dbConnection) {
            //Intenta desconectar//
            mongoose.disconnect()
                .then(() => {
                    //Si se desconecta correctamente, muestra mensaje y limpia la variable//
                    console.log('MongoDB connection closed')
                    dbConnection = null
                    resolve()
                })
                .catch(error => {
                    //Si hay error al desconectar, lo muestra y rechaza la promesa//
                    console.error('Error closing MongoDB connection:', error)
                    reject(error)
                })
        } else {
            //Si no hay conexión, resuelve inmediatamente//
            resolve()
        }
    })
}

//Exporta las funciones para ser usadas en otros módulos//
module.exports = {
    connectDB,  //Para establecer la conexión//
    getDB,      //Para obtener la conexión existente//
    closeDB     //Para cerrar la conexión//
}