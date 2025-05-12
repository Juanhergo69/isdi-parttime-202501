//Importa el framework Express para crear rutas//
const express = require('express')

//Crea un nuevo enrutador de Express para manejar rutas específicas//
const router = express.Router()

//Importa el controlador de autenticación que contiene la lógica de las rutas//
const authHandler = require('../handlers/authHandler')

//Define la ruta POST '/login' que manejará las solicitudes de inicio de sesión//
//Cuando se recibe una solicitud POST a '/login', ejecuta el método login del authHandler//
router.post('/login', authHandler.login)

//Define la ruta POST '/register' que manejará las solicitudes de registro de usuarios//
//Cuando se recibe una solicitud POST a '/register', ejecuta el método register del authHandler//
router.post('/register', authHandler.register)

//Define la ruta POST '/logout' que manejará las solicitudes de cierre de sesión//
//Cuando se recibe una solicitud POST a '/logout', ejecuta el método logout del authHandler//
router.post('/logout', authHandler.logout)

//Exporta el enrutador configurado para que pueda ser usado por la aplicación principal//
module.exports = router