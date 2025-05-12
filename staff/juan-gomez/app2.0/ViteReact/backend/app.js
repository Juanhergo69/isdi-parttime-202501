//Importa el framework Express para crear la aplicación web//
const express = require('express')
//Importa el middleware CORS para permitir peticiones cruzadas//
const cors = require('cors')
//Importa body-parser para procesar cuerpos de solicitudes HTTP//
const bodyParser = require('body-parser')
//Importa el módulo path para manejar rutas de archivos//
const path = require('path')

//Importa las rutas definidas en otros archivos//
const authRoutes = require('./routes/authRoutes')        //Rutas de autenticación
const userRoutes = require('./routes/userRoutes')        //Rutas de usuarios
const messageRoutes = require('./routes/messageRoutes') //Rutas de mensajes

//Crea una instancia de la aplicación Express//
const app = express()


// ========= CONFIGURACIÓN DE MIDDLEWARES ========= //

//Habilita CORS (Cross-Origin Resource Sharing) para todas las rutas//
app.use(cors())

//Configura body-parser para interpretar cuerpos JSON en las solicitudes//
app.use(bodyParser.json())

//Configura body-parser para interpretar datos de formularios URL-encoded//
app.use(bodyParser.urlencoded({ extended: true })) //extended: true permite objetos anidados//


// ========= REGISTRO DE RUTAS ========= //

//Todas las rutas de autenticación estarán bajo el prefijo /api//
app.use('/api', authRoutes)

//Todas las rutas de usuarios estarán bajo el prefijo /api/users//
app.use('/api/users', userRoutes)

//Todas las rutas de mensajes estarán bajo el prefijo /api/messages//
app.use('/api/messages', messageRoutes)


// ========= MANEJO DE ERRORES ========= //

//Middleware para manejo de errores (se ejecuta cuando hay errores en rutas anteriores)//
app.use((err, req, res, next) => {
    //Registra el error en la consola para depuración//
    console.error(err.stack)
    //Devuelve una respuesta de error 500 al cliente//
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    })
})


// ========= INICIO DEL SERVIDOR ========= //

//Define el puerto (usa la variable de entorno PORT o 3001 por defecto)//
const PORT = process.env.PORT || 3001

//Inicia el servidor en el puerto especificado//
app.listen(PORT, () => {
    //Mensaje de confirmación cuando el servidor inicia//
    console.log(`Server running on port ${PORT}`)
})

//Exporta la aplicación para poder usarla en tests u otros módulos//
module.exports = app