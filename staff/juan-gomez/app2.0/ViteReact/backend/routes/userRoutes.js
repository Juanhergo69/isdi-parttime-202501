//Importa el framework Express para crear rutas y manejar peticiones HTTP//
const express = require('express')

//Crea un nuevo enrutador de Express para definir rutas específicas//
const router = express.Router()

//Importa la librería multer para manejar uploads de archivos//
const multer = require('multer')

//Crea una instancia de multer configurada (en este caso sin almacenamiento persistente)//
const upload = multer()

//Importa el controlador de usuarios que contiene la lógica para manejar las rutas//
const userHandler = require('../handlers/userHandler')

//Define una ruta GET para obtener un usuario específico por su ID//
//:id es un parámetro variable que representa el ID del usuario//
//Cuando se recibe una petición GET a '/:id', ejecuta el método getUser del controlador//
router.get('/:id', userHandler.getUser)

//Define una ruta GET para obtener todos los usuarios//
//Cuando se recibe una petición GET a '/', ejecuta el método getAllUsers del controlador//
router.get('/', userHandler.getAllUsers)

//Define una ruta PUT para actualizar los datos de un usuario específico//
//:id es el parámetro que identifica al usuario a actualizar//
//Los nuevos datos deben enviarse en el cuerpo de la petición//
router.put('/:id', upload.single('avatar'), userHandler.updateUser)

//Define una ruta DELETE para eliminar un usuario específico//
//:id identifica al usuario que se va a eliminar//
router.delete('/:id', userHandler.deleteUser)

//Define una ruta DELETE para eliminar el avatar de un usuario específico//
router.delete('/:id/avatar', userHandler.deleteAvatar)

//Define una ruta PUT específica para actualizar solo el estado de un usuario//
//:id identifica al usuario cuyo estado se actualizará//
//El nuevo estado debe enviarse en el cuerpo de la petición//
router.put('/:id/status', userHandler.updateStatus)

//Exporta el enrutador configurado para que pueda ser utilizado por otros módulos//
module.exports = router