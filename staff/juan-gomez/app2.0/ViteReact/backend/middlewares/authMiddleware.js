//Importa el modelo User para interactuar con los datos de usuario//
const User = require('../models/User')

//Objeto que contiene los middlewares de autenticación//
const authMiddleware = {
    //Middleware para verificar si el usuario está autenticado//
    isAuthenticated: (req, res, next) => {
        //Obtiene el ID del usuario desde los headers de la solicitud//
        const userId = req.headers['x-user-id']

        //Verifica si el header de usuario existe//
        if (!userId) {
            //Si no existe, responde con error 401 (No autorizado)//
            return res.status(401).json({
                success: false,
                error: 'Unauthorized'
            })
        }

        //Busca el usuario en la base de datos por su ID//
        const user = User.getById(userId)

        //Verifica si el usuario existe//
        if (!user) {
            //Si no existe, responde con error 401 (No autorizado)//
            return res.status(401).json({
                success: false,
                error: 'Unauthorized'
            })
        }

        //Se asigna constante sanitizedUser sobre el objeto usuario//
        const sanitizedUser = { ...user }
        //Se elimina el campo password sobre sanitizedUser//
        delete sanitizedUser.password
        //Adjunta el objeto de sanitizedUser a la solicitud para uso en rutas posteriores//
        req.user = sanitizedUser
        //Llama a next() para continuar con el siguiente middleware/ruta//
        next()
    },

    //Middleware para verificar si el usuario es dueño del recurso solicitado//
    isOwner: (req, res, next) => {
        //Obtiene el ID del usuario desde los headers//
        const userId = req.headers['x-user-id']
        //Obtiene el ID del recurso desde los parámetros o cuerpo de la solicitud//
        const resourceUserId = req.params.userId || req.body.userId

        //Compara ambos IDs//
        if (userId !== resourceUserId) {
            //Si no coinciden, responde con error 403 (Prohibido)//
            return res.status(403).json({
                success: false,
                error: 'Forbidden'
            })
        }

        //Si coinciden, continúa con el siguiente middleware/ruta//
        next()
    }
}

//Exporta los middlewares para ser usados en las rutas//
module.exports = authMiddleware