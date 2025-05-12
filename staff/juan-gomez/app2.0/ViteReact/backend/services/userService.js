//Importa el modelo User para interactuar con datos de usuarios//
const User = require('../models/User')
//Importa el modelo Message para interactuar con mensajes de usuarios//
const Message = require('../models/Message')

//Define la clase UserService que contiene la lógica de negocio para usuarios//
class UserService {
    //Método estático para obtener un usuario por su ID//
    static getUserById(id) {
        //Retorna una nueva Promesa para manejo asíncrono//
        return new Promise((resolve, reject) => {
            //Busca el usuario usando el modelo User//
            const user = User.getById(id)

            //Si el usuario no existe//
            if (!user) {
                //Rechaza la promesa con un error//
                return reject({
                    success: false,
                    error: 'User not found'
                })
            }

            //Si el usuario existe, resuelve con los datos del usuario//
            resolve({
                success: true,
                user
            })
        })
    }

    //Método estático para actualizar los datos de un usuario//
    static updateUser(id, updateData) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //Intenta actualizar el usuario usando el modelo//
            const updatedUser = User.update(id, updateData)

            //Si no se encontró el usuario para actualizar//
            if (!updatedUser) {
                return reject({
                    success: false,
                    error: 'User not found'
                })
            }

            //Si la actualización fue exitosa//
            resolve({
                success: true,
                user: updatedUser
            })
        })
    }

    //Método estático para eliminar un usuario y todos sus datos relacionados//
    static deleteUser(id) {
        //Retorna una nueva Promesa//
        return new Promise((resolve, reject) => {
            //1. Eliminar al usuario de la base de datos//
            const deleted = User.delete(id)

            //Si no se pudo encontrar/eliminar el usuario//
            if (!deleted) {
                return reject({
                    success: false,
                    error: 'User not found'
                })
            }

            //2. Eliminar todos los mensajes del usuario//
            //Obtiene todos los mensajes del usuario//
            const userMessages = Message.getByUserId(id)
            //Elimina cada mensaje usando su fecha como identificador//
            userMessages.forEach(msg => Message.delete(msg.date))

            //3. Eliminar todas las interacciones del usuario en otros mensajes//
            //Obtiene todos los mensajes existentes//
            const allMessages = Message.getAll()

            //Crea una nueva versión de los mensajes sin las interacciones del usuario//
            const updatedMessages = allMessages.map(message => ({
                ...message, //Copia todas las propiedades del mensaje//
                //Filtra el ID del usuario de los likes//
                likes: message.likes.filter(like => like !== id),
                //Filtra el ID del usuario de los dislikes//
                dislikes: message.dislikes.filter(dislike => dislike !== id),
                //Filtra el ID del usuario de los favoritos//
                favorite: message.favorite.filter(fav => fav !== id)
            }))

            //Guarda los mensajes actualizados en el archivo//
            //Nota: Importa directamente fileUtils para evitar dependencia circular//
            require('../utils/fileUtils').saveMessages(updatedMessages)

            //Resuelve la promesa indicando éxito//
            resolve({
                success: true
            })
        })
    }

    //Método estático para actualizar solo el estado de un usuario//
    static updateUserStatus(id, status) {
        //Reutiliza el método updateUser pasando solo el campo status//
        return this.updateUser(id, { status })
    }

    //Método estático para actualizar el avatar de un usuario//
    static updateUserAvatar(id, avatarBase64) {
        return new Promise((resolve, reject) => {
            try {
                const updatedUser = User.update(id, { avatar: avatarBase64 });

                if (updatedUser) {
                    resolve({
                        success: true,
                        user: updatedUser
                    });
                } else {
                    reject({
                        success: false,
                        error: 'User not found'
                    });
                }
            } catch (error) {
                reject({
                    success: false,
                    error: error.message
                });
            }
        });
    }


    //Método estático para eliminar el avatar de un usuario//
    static deleteUserAvatar(id) {
        return new Promise((resolve, reject) => {
            try {
                const user = User.getById(id);
                if (!user) {
                    return reject({
                        success: false,
                        error: 'User not found'
                    });
                }

                // Actualizar el usuario eliminando el avatar
                const updatedUser = User.update(id, { avatar: null });

                if (updatedUser) {
                    resolve({
                        success: true,
                        user: updatedUser
                    });
                } else {
                    reject({
                        success: false,
                        error: 'Failed to update user'
                    });
                }
            } catch (error) {
                reject({
                    success: false,
                    error: error.message
                });
            }
        });
    }

    //Método estático para obtener todos los usuarios//
    static getAllUsers() {
        //Retorna una nueva Promesa//
        return new Promise((resolve) => {
            //Obtiene todos los usuarios usando el modelo//
            const users = User.getAll()
            //Resuelve con la lista de usuarios//
            resolve({
                success: true,
                users
            })
        })
    }
}

//Exporta la clase UserService para ser usada en otros módulos//
module.exports = UserService