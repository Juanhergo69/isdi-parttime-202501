//Importa el módulo express para crear rutas//
const express = require('express')

//Crea un nuevo enrutador de Express para definir rutas//
const router = express.Router()

//Importa el controlador de posts que contiene la lógica para manejar las solicitudes//
const postController = require('../controllers/postController')

//Define una ruta POST para '/posts' que usará la función createPost del controlador//
//Esta ruta manejará la creación de nuevos posts/mensajes//
router.post('/posts', postController.createPost)

//Define una ruta PUT para '/posts/like' que usará la función toggleLike del controlador//
//Esta ruta manejará la acción de dar/quitar like a un post//
router.put('/posts/like', postController.toggleLike)

//Define una ruta PUT para '/posts/dislike' que usará la función toggleDislike del controlador//
//Esta ruta manejará la acción de dar/quitar dislike a un post//
router.put('/posts/dislike', postController.toggleDislike)

//Define una ruta PUT para '/posts/favorite' que usará la función toggleFavorite del controlador//
//Esta ruta manejará la acción de marcar/desmarcar un post como favorito//
router.put('/posts/favorite', postController.toggleFavorite)

//Define una ruta GET para '/posts' que usará la función getPosts del controlador//
//Esta ruta manejará la obtención de todos los posts/mensajes//
router.get('/posts', postController.getPosts)

//Exporta el enrutador configurado para ser usado en la aplicación principal//
module.exports = router