//Importa funciones de validación desde el archivo de utilidades//
const { validateEmail, validatePassword, validateTitle, validateTextarea } = require('../utils/validators');

//Objeto que contiene middlewares de validación//
const validationMiddleware = {
    // Middleware para validar datos de registro
    validateRegister: (req, res, next) => {
        //Extrae email, password y confirmación de password del body//
        const { email, password, 'confirmation-password': confirmPassword } = req.body

        //Valida el formato del email usando la función validateEmail//
        if (!validateEmail(email)) {
            //Si no es válido, responde con error 400 y mensaje descriptivo//
            return res.status(400).json({
                success: false,
                error: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'
            })
        }

        //Valida que el password cumpla con los requisitos//
        if (!validatePassword(password)) {
            //Si no cumple, responde con error 400 y requisitos del password//
            return res.status(400).json({
                success: false,
                error: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'
            })
        }

        //Compara password con su confirmación//
        if (password !== confirmPassword) {
            //Si no coinciden, responde con error 400//
            return res.status(400).json({
                success: false,
                error: 'Passwords are not the same. Please, try again'
            })
        }

        //Si todas las validaciones pasan, continúa al siguiente middleware//
        next()
    },

    //Middleware para validar datos de login//
    validateLogin: (req, res, next) => {
        //Extrae email del body//
        const { email } = req.body

        //Valida el formato del email//
        if (!validateEmail(email)) {
            //Si no es válido, responde con error 400//
            return res.status(400).json({
                success: false,
                error: 'Invalid email format',
                shouldRedirect: false  //Flag para el cliente//
            })
        }

        //Si la validación pasa, continúa//
        next()
    },

    //Middleware para validar mensajes//
    validateMessage: (req, res, next) => {
        //Extrae título y mensaje del body//
        const { title, msg } = req.body

        //Verifica que ambos campos existan//
        if (!title || !msg) {
            //Si falta alguno, responde con error 400//
            return res.status(400).json({
                success: false,
                error: 'All fields are required. The message has not been stored'
            })
        }

        //Valida el título según sus reglas//
        if (!validateTitle(title)) {
            //Si no cumple, responde con error 400//
            return res.status(400).json({
                success: false,
                error: 'Title cannot exceed 5 words'
            })
        }

        //Valida el mensaje según sus reglas//
        if (!validateTextarea(msg)) {
            //Si no cumple, responde con error 400//
            return res.status(400).json({
                success: false,
                error: 'Message cannot exceed 100 words'
            })
        }

        //Si todas las validaciones pasan, continúa//
        next()
    }
}

//Exporta los middlewares para ser usados en las rutas//
module.exports = validationMiddleware