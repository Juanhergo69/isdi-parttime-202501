//Importa el modelo de usuario desde el archivo de esquemas//
const { UserModel } = require('../models/schemas')
//Importa la clase User que contiene los métodos estáticos//
const User = require('../models/User')

//Objeto que contiene los middlewares de autenticación//
const authMiddleware = {
    //Middleware para verificar si el usuario está autenticado//
    isAuthenticated: (req, res, next) => {
        //Obtiene el ID de usuario del encabezado de la petición//
        const userId = req.headers['x-user-id']

        //Si no hay ID de usuario en los headers, responde con error 401//
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized'
            })
        }

        //Busca el usuario en la base de datos usando el ID//
        UserModel.findOne({ id: userId })
            .then(user => {
                //Si no se encuentra el usuario, responde con error 401//
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized'
                    })
                }

                //Sanitiza la información del usuario (elimina datos sensibles)//
                const sanitizedUser = User.toSafeUser(user)
                //Agrega el usuario sanitizado al objeto request//
                req.user = sanitizedUser
                //Pasa al siguiente middleware o controlador//
                next()
            })
            .catch(error => {
                //Si hay un error en la consulta, lo registra y responde con error 500//
                console.error('Authentication error:', error)
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                })
            })
    },

    //Middleware para verificar si el usuario es dueño del recurso//
    isOwner: (req, res, next) => {
        //Obtiene el ID de usuario del encabezado//
        const userId = req.headers['x-user-id']
        //Obtiene el ID del recurso de los parámetros o del cuerpo de la petición//
        const resourceUserId = req.params.userId || req.body.userId

        //Compara si el ID del usuario autenticado coincide con el ID del recurso//
        if (userId !== resourceUserId) {
            //Si no coinciden, responde con error 403 (prohibido)//
            return res.status(403).json({
                success: false,
                error: 'Forbidden'
            })
        }

        //Si todo está bien, pasa al siguiente middleware o controlador//
        next()
    }
}

//Exporta el objeto con los middlewares para ser usado en otras partes de la aplicación//
module.exports = authMiddleware