//Importa el módulo Express para crear el servidor web//
const express = require('express');

//Importa el módulo CORS para habilitar Cross-Origin Resource Sharing//
//Esto permite que el frontend se comunique con el backend aunque estén en dominios diferentes//
const cors = require('cors')

//Importa las rutas de autenticación desde el archivo authRoutes.js//
//'./routes/authRoutes' indica la ruta relativa al archivo de rutas//
const authRoutes = require('./routes/authRoutes')


//Importa las rutas de de autentificación desde el archivo postRoutes.js//
//'./routes/postRoutes' indica la ruta relativa del archivo de rutas//
const postRoutes = require('./routes/postRoutes')

//Crea una instancia de la aplicación Express//
//Esta será nuestro servidor backend//
const app = express()

//Configuración de Middlewares (funciones que procesan las peticiones antes de llegar a las rutas)//
//Habilita CORS para todas las rutas, permitiendo peticiones cruzadas entre dominios//
app.use(cors())

//Middleware para parsear el cuerpo de las peticiones en formato JSON//
//Convierte automáticamente los datos JSON recibidos en objetos JavaScript accesibles en req.body//
app.use(express.json())

//Middleware para parsear datos de formularios codificados en URL//
//extended: true permite el parsing de objetos complejos anidados//
app.use(express.urlencoded({ extended: true }))

//Configuración de Rutas//
//Monta las rutas de autenticación bajo el prefijo '/api/auth'//
//Todas las rutas definidas en authRoutes ahora empezarán con /api/auth//
app.use('/api/auth', authRoutes)

//Configuración de Rutas//
//Monta las rutas de autentificación bajo el prefijo '/api/'//
//Todas las rutas definidas en postRoutes ahora empezarán con /api///
app.use('/api', postRoutes)

//Inicialización del Servidor//
//Define el puerto donde correrá el servidor (3001 es común para desarrollo)//
const PORT = 3001

//Inicia el servidor y lo pone a escuchar en el puerto especificado//
//El callback se ejecuta cuando el servidor está listo//
app.listen(PORT, () => {
    //Muestra en consola la URL donde está corriendo el servidor//
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
})