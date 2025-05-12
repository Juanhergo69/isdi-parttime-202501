//Importa el modelo User para interactuar con los datos de usuario//
const User = require('../models/User')
//Importa funciones de validación desde el archivo de utils//
const { validateEmail, validatePassword } = require('../utils/validators')

//Define la clase AuthService que contiene la lógica de autenticación//
class AuthService {
    //Método estático para manejar el inicio de sesión//
    static login(email, password) {
        //Retorna una nueva Promesa para manejo asíncrono//
        return new Promise((resolve, reject) => {
            //Valida el formato del email usando la función importada//
            if (!validateEmail(email)) {
                //Si el email no es válido, rechaza la promesa con un error//
                return reject({
                    success: false,                 //Indica que la operación falló//
                    error: 'Invalid email format',  //Mensaje de error//
                    shouldRedirect: false           //Flag para el cliente//
                })
            }

            //Busca el usuario por email usando el modelo User//
            const user = User.getByEmail(email)

            //Verifica si el usuario existe//
            if (!user) {
                //Si no existe, rechaza la promesa//
                return reject({
                    success: false,
                    error: 'The email is not registered yet. Please, create an account first',
                    shouldRedirect: true  //Sugiere al cliente redirigir a registro//
                })
            }

            //Compara la contraseña proporcionada con la almacenada//
            if (user.password !== password) {
                //Si no coinciden, rechaza la promesa//
                return reject({
                    success: false,
                    error: 'Incorrect password, Please, try again',
                    shouldRedirect: false
                })
            }

            //Si todo es correcto, resuelve la promesa con éxito//
            resolve({
                success: true,          //Indica operación exitosa//
                user,                   //Devuelve los datos del usuario//
                rememberSession: false  //Flag para manejo de sesión persistente//
            })
        })
    }

    //Método estático para manejar el registro de nuevos usuarios//
    static register(email, password, confirmPassword) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Valida el formato del email//
            if (!validateEmail(email)) {
                return reject({
                    success: false,
                    error: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'
                })
            }

            //Valida que la contraseña cumpla los requisitos//
            if (!validatePassword(password)) {
                return reject({
                    success: false,
                    error: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'
                })
            }

            //Verifica que las contraseñas coincidan//
            if (password !== confirmPassword) {
                return reject({
                    success: false,
                    error: 'Passwords are not the same. Please, try again'
                })
            }

            //Verifica si el email ya está registrado//
            if (User.getByEmail(email)) {
                return reject({
                    success: false,
                    error: 'This mail is already in use'
                })
            }

            //Genera un nombre de usuario a partir del email (parte antes del @)//
            const userName = email.split('@')[0];
            //Capitaliza la primera letra del nombre de usuario//
            const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1)

            //Crea el nuevo usuario usando el modelo User//
            const newUser = User.create({
                email,
                password,
                userName: capitalizedUserName,
                avatar: null,
                status: ``//Valor inicial vacío//
            })

            //Si todo es correcto, resuelve la promesa con el nuevo usuario//
            resolve({
                success: true,
                user: newUser
            })
        })
    }
}

//Exporta la clase AuthService para ser usada en otros módulos//
module.exports = AuthService