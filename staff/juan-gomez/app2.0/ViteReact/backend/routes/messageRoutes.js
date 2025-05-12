//Importa el framework Express para crear rutas//
const express = require('express')

//Crea un objeto router de Express para definir rutas específicas//
const router = express.Router()

//Importa la librería multer para manejar uploads de archivos//
const multer = require('multer')

//Crea una instancia de multer configurada (en este caso sin almacenamiento persistente)//
const upload = multer()

//Importa el controlador de mensajes que contiene la lógica de las rutas//
const messageHandler = require('../handlers/messageHandler')

//Ruta GET para obtener todos los mensajes//
//Cuando se hace una petición GET a '/', ejecuta getAllMessages del controlador//
router.get('/', messageHandler.getAllMessages)

//Ruta GET para obtener mensajes de un usuario específico//
//:userId es un parámetro variable en la URL//
router.get('/user/:userId', messageHandler.getUserMessages)

//Ruta POST para crear un nuevo mensaje//
//upload.single('image') procesa un archivo adjunto con campo 'image' en el formulario//
router.post('/', upload.single('image'), messageHandler.createMessage)

//Ruta DELETE para eliminar un mensaje por su fecha (identificador único)//
//:date es un parámetro variable en la URL//
router.delete('/:date', messageHandler.deleteMessage)

//Ruta POST para alternar like en un mensaje específico//
//:date identifica el mensaje, el cuerpo debe contener userId//
router.post('/:date/like', messageHandler.toggleLike)

//Ruta POST para alternar dislike en un mensaje específico//
//:date identifica el mensaje, el cuerpo debe contener userId//
router.post('/:date/dislike', messageHandler.toggleDislike)

//Ruta POST para alternar favorito en un mensaje específico//
//:date identifica el mensaje, el cuerpo debe contener userId//
router.post('/:date/favorite', messageHandler.toggleFavorite)

//Exporta el router configurado para ser usado en la aplicación principal//
module.exports = router