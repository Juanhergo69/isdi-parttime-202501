//Importa el modelo User desde el archivo correspondiente para interactuar con la colección de usuarios en la base de datos//
const User = require('../models/User')

//Importa funciones de validación desde el archivo de utils para validar formato de email y contraseña//
const { validateEmail, validatePassword } = require('../utils/validators')

//Define la clase AuthService que encapsula la lógica de autenticación (login y registro)//
class AuthService {
    //Método estático para manejar el proceso de inicio de sesión//
    //Recibe email y password como parámetros y retorna una Promise//
    static login(email, password) {
        //Crea y retorna una nueva Promise para manejar operaciones asíncronas//
        return new Promise((resolve, reject) => {
            //Valida el formato del email usando la función validateEmail//
            if (!validateEmail(email)) {
                //Si el email no es válido, rechaza la Promise con un objeto de error//
                return reject({
                    success: false,                 //Indica que la operación falló//
                    error: 'Invalid email format',  //Mensaje de error descriptivo//
                    shouldRedirect: false           //Indica que no debe redirigir al usuario//
                })
            }

            //Busca el usuario completo por email en la base de datos (incluyendo password)//
            User.getCompleteByEmail(email)
                .then(user => {
                    //Verifica si no se encontró ningún usuario con ese email//
                    if (!user) {
                        //Rechaza la Promise si el usuario no existe//
                        return reject({
                            success: false,
                            error: 'The email is not registered yet. Please, create an account first',
                            shouldRedirect: true  //Sugiere redirigir a página de registro//
                        })
                    }

                    //Compara la contraseña proporcionada con la almacenada en la base de datos//
                    if (user.password !== password) {
                        //Rechaza si las contraseñas no coinciden//
                        return reject({
                            success: false,
                            error: 'Incorrect password, Please, try again',
                            shouldRedirect: false
                        })
                    }

                    //Si todo es correcto, resuelve la Promise con los datos del usuario//
                    //usando User.toSafeUser para eliminar información sensible como password//
                    resolve({
                        success: true,  // Indica operación exitosa
                        user: User.toSafeUser(user),  //Devuelve usuario sin datos sensibles//
                        rememberSession: false        //Indica si se debe recordar la sesión//
                    })
                })
                .catch(error => {
                    //Captura cualquier error durante el proceso de búsqueda del usuario//
                    console.error('Login error:', error)          //Log del error en consola//
                    reject({
                        success: false,
                        error: 'An error occurred during login',  //Mensaje genérico para el cliente//
                        shouldRedirect: false
                    })
                })
        })
    }

    //Método estático para manejar el registro de nuevos usuarios//
    //Recibe email, password, confirmPassword y userName como parámetros//
    static register(email, password, confirmPassword, userName) {
        //Crea y retorna una nueva Promise para manejar el registro asíncrono//
        return new Promise((resolve, reject) => {
            //Primera validación: formato del email//
            if (!validateEmail(email)) {
                return reject({
                    success: false,
                    error: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'
                })
            }

            //Segunda validación: fortaleza de la contraseña//
            if (!validatePassword(password)) {
                return reject({
                    success: false,
                    error: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'
                })
            }

            //Tercera validación: coincidencia entre password y confirmPassword//
            if (password !== confirmPassword) {
                return reject({
                    success: false,
                    error: 'Passwords are not the same. Please, try again'
                })
            }

            //Verifica si ya existe un usuario con el mismo email (case-insensitive)//
            User.getCompleteByEmail(email)
                .then(existingUser => {
                    //Debug: imprime el usuario existente (si lo hay)//
                    console.log('Existing user check:', existingUser)

                    //Si existe un usuario con ese email, rechaza el registro//
                    if (existingUser) {
                        return reject({
                            success: false,
                            error: 'This mail is already in use'
                        })
                    }

                    //Capitaliza la primera letra del nombre de usuario para consistencia//
                    const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1)

                    //Crea el nuevo usuario en la base de datos con los datos proporcionados//
                    return User.create({
                        email: email.toLowerCase(),     //Guarda el email en minúsculas//
                        password,                       //Contraseña ya validada//
                        userName: capitalizedUserName,  //Nombre capitalizado//
                        avatar: null,                   //Avatar inicialmente nulo//
                        status: ''                      //Estado inicial vacío//
                    });
                })
                .then(newUser => {
                    //Si el registro es exitoso, resuelve la Promise con el usuario sanitizado//
                    resolve({
                        success: true,                           //Indica registro exitoso//
                        user: AuthService.sanitizeUser(newUser)  //Devuelve usuario sin password//
                    })
                })
                .catch(error => {
                    //Captura cualquier error durante el proceso de registro//
                    console.error('Registration error:', error);        //Log del error//
                    reject({
                        success: false,
                        error: 'An error occurred during registration'  //Mensaje genérico//
                    })
                })
        })
    }

    //Método estático auxiliar para eliminar información sensible del objeto usuario//
    //Recibe un objeto user y retorna una copia sin el campo password//
    static sanitizeUser(user) {
        //Crea una copia superficial del objeto usuario usando spread operator//
        const sanitized = { ...user }
        //Elimina la propiedad password del objeto copiado//
        delete sanitized.password
        //Retorna el objeto sanitizado//
        return sanitized
    }
}

//Exporta la clase AuthService para que pueda ser utilizada en otros módulos//
module.exports = AuthService