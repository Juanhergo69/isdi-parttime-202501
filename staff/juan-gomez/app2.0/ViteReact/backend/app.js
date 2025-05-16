//Importa el módulo express para crear la aplicación del servidor web//
const express = require('express')
//Importa el módulo cors para habilitar Cross-Origin Resource Sharing//
const cors = require('cors')
//Importa body-parser para parsear el cuerpo de las peticiones HTTP//
const bodyParser = require('body-parser');
//Importa el módulo path para trabajar con rutas de archivos y directorios//
const path = require('path')
//Importa funciones de conexión a la base de datos desde el archivo de configuración//
const { connectDB, getDB, closeDB } = require('./config/db')

//Importa las rutas de autenticación desde el archivo correspondiente//
const authRoutes = require('./routes/authRoutes')
//Importa las rutas de usuario desde el archivo correspondiente//
const userRoutes = require('./routes/userRoutes')
//Importa las rutas de mensajes desde el archivo correspondiente//
const messageRoutes = require('./routes/messageRoutes')

//Crea una instancia de la aplicación express//
const app = express()

//========= CONFIGURACIÓN DE MIDDLEWARES =========//
//Habilita CORS para todas las rutas (permite peticiones desde otros dominios)//
app.use(cors())
//Configura el middleware para parsear cuerpos de petición en formato JSON//
app.use(bodyParser.json())
//Configura el middleware para parsear cuerpos de petición codificados en URL//
app.use(bodyParser.urlencoded({ extended: true }))

//========= CONEXIÓN A LA BASE DE DATOS =========//
//Intenta conectar con la base de datos usando la función connectDB//
connectDB()
    .then(() => {
        //Si la conexión es exitosa, muestra mensaje en consola//
        console.log('Database connected successfully')
    })
    .catch(error => {
        //Si hay error en la conexión, muestra error y termina el proceso//
        console.error('Database connection failed', error)
        process.exit(1) //Termina el proceso con código de error//
    })

//========= REGISTRO DE RUTAS =========//
//Monta las rutas de autenticación bajo el prefijo '/api'//
app.use('/api', authRoutes)
//Monta las rutas de usuario bajo el prefijo '/api/users'//
app.use('/api/users', userRoutes)
//Monta las rutas de mensajes bajo el prefijo '/api/messages'//
app.use('/api/messages', messageRoutes)

//========= MANEJO DE ERRORES =========//
//Middleware para manejo de errores (se ejecuta cuando hay errores en rutas anteriores)//
app.use((error, req, res, next) => {
    //Registra el error en la consola//
    console.error(error.stack)
    //Devuelve respuesta HTTP 500 con formato JSON//
    res.status(500).json({
        success: false,                 //Indica que la operación falló//
        error: 'Internal Server Error'  //Mensaje de error genérico//
    })
})

//========= INICIO DEL SERVIDOR =========//
//Define el puerto usando la variable de entorno PORT o 3001 por defecto//
const PORT = process.env.PORT || 3001

//Inicia el servidor en el puerto especificado//
app.listen(PORT, () => {
    //Muestra mensaje de confirmación cuando el servidor está listo//
    console.log(`Server running on port ${PORT}`)
})

//========= MANEJO DE CIERRE DE LA APLICACIÓN =========//
//Configura el manejo de la señal SIGINT (interrupción por teclado Ctrl+C)//
process.on('SIGINT', () => {
    //Intenta cerrar la conexión a la base de datos//
    closeDB()
        .then(() => {
            //Si se cierra correctamente, muestra mensaje y termina proceso//
            console.log('Database connection closed gracefully')
            process.exit(0) //Termina el proceso con código de éxito//
        })
        .catch(error => {
            //Si hay error al cerrar, muestra error y termina con código de error//
            console.error('Error closing database connection:', error)
            process.exit(1)
        })
})

//Configura el manejo de la señal SIGTERM (terminación normal del proceso)//
process.on('SIGTERM', () => {
    //Intenta cerrar la conexión a la base de datos//
    closeDB()
        .then(() => {
            //Si se cierra correctamente, muestra mensaje y termina proceso//
            console.log('Database connection closed gracefully')
            process.exit(0) //Termina el proceso con código de éxito//
        })
        .catch(error => {
            //Si hay error al cerrar, muestra error y termina con código de error//
            console.error('Error closing database connection:', error)
            process.exit(1)
        })
})

//Exporta la aplicación express para poder usarla en tests u otros módulos//
module.exports = app