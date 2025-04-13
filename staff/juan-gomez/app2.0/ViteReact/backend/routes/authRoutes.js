//Importa el módulo 'express' para crear rutas y manejar peticiones HTTP//
const express = require('express');

//Crea un nuevo enrutador de Express que permite definir rutas//
//El enrutador es como una "mini-aplicación" de Express//
const router = express.Router();

//Importa el controlador de autenticación que contiene la lógica para login y registro//
//'../controllers/authController' es la ruta relativa al archivo del controlador//
const authController = require('../controllers/authController');

//Define una ruta POST para '/login' que será manejada por el método 'login' del controlador//
//Cuando se haga una petición POST a /login, se ejecutará authController.login//
router.post('/login', authController.login);

//Define una ruta POST para '/register' que será manejada por el método 'register' del controlador//
//Cuando se haga una petición POST a /register, se ejecutará authController.register//
router.post('/register', authController.register);

//Exporta el enrutador configurado para que pueda ser usado en otras partes de la aplicación//
//Esto permite que este archivo sea importado y las rutas sean accesibles//
module.exports = router;