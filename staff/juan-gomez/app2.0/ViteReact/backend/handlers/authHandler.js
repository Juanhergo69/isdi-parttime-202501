//Importa el servicio de autenticación que contiene la lógica de negocio//
const AuthService = require('../services/authService')

//Define el controlador de autenticación que manejará las rutas relacionadas con auth//
const authHandler = {
    //Método para manejar el login de usuarios//
    login: (req, res) => {
        //Extrae email, password y rememberme del cuerpo de la solicitud//
        const { email, password, rememberme } = req.body

        //Llama al servicio de autenticación para realizar el login//
        AuthService.login(email, password)
            .then(({ success, user }) => {
                //Si es exitoso, responde con éxito, datos del usuario y preferencia de sesión//
                //(En un sistema real aquí se generaría un token JWT o cookie de sesión)//
                res.json({ success, user, rememberSession: rememberme })
            })
            .catch(error => {
                //Si hay error, responde con status 400 y el error//
                res.status(400).json(error)
            })
    },

    //Método para manejar el registro de nuevos usuarios//
    register: (req, res) => {
        //Extrae los datos necesarios del cuerpo de la solicitud//
        const { email, password, confirmPassword, userName } = req.body

        //Llama al servicio de autenticación para registrar al usuario//
        AuthService.register(email, password, confirmPassword, userName)
            .then(({ success, user }) => {
                //Si es exitoso, responde con éxito y datos del usuario creado//
                res.json({ success, user })
            })
            .catch(error => {
                //Si hay error, responde con status 400 y el error//
                res.status(400).json(error)
            })
    },

    //Método para manejar el logout de usuarios//
    logout: (req, res) => {
        //(En un sistema real aquí se invalidaría la sesión/token)//
        //Responde confirmando que el logout fue exitoso//
        res.json({ success: true })
    }
}

//Exporta el controlador para ser usado en las rutas//
module.exports = authHandler