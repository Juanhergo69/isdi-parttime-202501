//Importa el modelo User para interactuar con la colección de usuarios en la base de datos//
const User = require('../models/User')
//Importa el modelo Message para interactuar con los mensajes de usuarios//
const Message = require('../models/Message')

//Define la clase UserService que contiene la lógica de negocio relacionada con usuarios//
class UserService {
    //Método estático para obtener un usuario por su ID//
    static getUserById(id) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Busca el usuario en la base de datos usando el método getById del modelo User//
            User.getById(id)
                .then(user => {
                    //Si no se encuentra el usuario, rechaza la Promise//
                    if (!user) {
                        return reject({
                            success: false,             //Indica fallo en la operación//
                            error: 'User not found'     //Mensaje de error//
                        });
                    }

                    //Crea un objeto de usuario completo con valores por defecto para evitar undefined//
                    const completeUser = {
                        id: user.id,                    //ID del usuario (siempre debe existir)//
                        email: user.email || '',        //Email o string vacío si no existe//
                        userName: user.userName || '',  //Nombre de usuario o string vacío//
                        avatar: user.avatar || null,    //Avatar o null si no existe//
                        status: user.status || ''       //Estado o string vacío//
                    };

                    //Resuelve la Promise con el usuario formateado//
                    resolve({
                        success: true,      //Indica operación exitosa//
                        user: completeUser  //Devuelve el usuario normalizado//
                    })
                })
                .catch(error => {
                    //Captura y registra cualquier error ocurrido durante la búsqueda//
                    console.error('Error in UserService.getUserById:', error)
                    //Rechaza la Promise con un mensaje de error genérico//
                    reject({
                        success: false,
                        error: 'Failed to retrieve user'
                    })
                })
        })
    }

    //Método estático para actualizar los datos de un usuario//
    static updateUser(id, updateData) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Intenta actualizar el usuario usando el método update del modelo User//
            const updatedUser = User.update(id, updateData)

            //Si no se encontró el usuario para actualizar (updatedUser es false)//
            if (!updatedUser) {
                //Rechaza la Promise con mensaje de error//
                return reject({
                    success: false,
                    error: 'User not found'
                })
            }

            //Si la actualización fue exitosa, resuelve la Promise con el usuario actualizado//
            resolve({
                success: true,      //Indica operación exitosa//
                user: updatedUser   //Devuelve el usuario actualizado//
            })
        })
    }

    //Método estático para eliminar un usuario y todos sus datos relacionados//
    static deleteUser(id) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Primero elimina todos los mensajes del usuario usando el modelo Message//
            Message.deleteAllByUserId(id)
                .then(() => {
                    //Luego elimina al usuario usando el modelo User//
                    return User.delete(id)
                })
                .then(deleted => {
                    //Verifica si el usuario fue encontrado y eliminado//
                    if (!deleted) {
                        //Rechaza si el usuario no existe//
                        return reject({
                            success: false,
                            error: 'User not found'
                        })
                    }

                    //Finalmente elimina todas las interacciones del usuario en otros mensajes//
                    return Message.removeUserFromAllInteractions(id)
                })
                .then(() => {
                    //Si todo fue exitoso, resuelve la Promise//
                    resolve({
                        success: true  //Indica eliminación completa exitosa//
                    })
                })
                .catch(error => {
                    //Captura y registra cualquier error ocurrido durante el proceso//
                    console.error('Error deleting user:', error)
                    //Rechaza con mensaje de error detallado//
                    reject({
                        success: false,
                        error: 'Failed to delete user and associated data'
                    })
                })
        })
    }

    //Método estático para actualizar solo el estado de un usuario//
    static updateUserStatus(id, status) {
        //Reutiliza el método updateUser pasando solo el campo status en el objeto de actualización//
        return this.updateUser(id, { status })
    }

    //Método estático para actualizar el avatar de un usuario//
    static updateUserAvatar(id, avatarBase64) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            try {
                //Actualiza el usuario con la nueva imagen de avatar (en formato Base64)//
                const updatedUser = User.update(id, { avatar: avatarBase64 })

                //Verifica si la actualización fue exitosa//
                if (updatedUser) {
                    //Resuelve con el usuario actualizado//
                    resolve({
                        success: true,
                        user: updatedUser
                    })
                } else {
                    //Rechaza si no se encontró el usuario//
                    reject({
                        success: false,
                        error: 'User not found'
                    })
                }
            } catch (error) {
                //Captura cualquier error inesperado y rechaza la Promise//
                reject({
                    success: false,
                    error: error.message  //Devuelve el mensaje de error original//
                })
            }
        })
    }

    //Método estático para eliminar el avatar de un usuario (establecerlo a null)//
    static deleteUserAvatar(id) {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            try {
                //Obtiene el usuario para verificar su existencia//
                const user = User.getById(id);
                if (!user) {
                    //Rechaza si el usuario no existe//
                    return reject({
                        success: false,
                        error: 'User not found'
                    })
                }

                //Actualiza el usuario estableciendo avatar a null//
                const updatedUser = User.update(id, { avatar: null })

                //Verifica si la actualización fue exitosa//
                if (updatedUser) {
                    //Resuelve con el usuario actualizado//
                    resolve({
                        success: true,
                        user: updatedUser
                    });
                } else {
                    //Rechaza si hubo un problema en la actualización//
                    reject({
                        success: false,
                        error: 'Failed to update user'
                    })
                }
            } catch (error) {
                //Captura cualquier error inesperado y rechaza la Promise//
                reject({
                    success: false,
                    error: error.message  //Devuelve el mensaje de error original//
                })
            }
        })
    }

    //Método estático para obtener todos los usuarios del sistema//
    static getAllUsers() {
        //Retorna una nueva Promise para manejar la operación asíncrona//
        return new Promise((resolve) => {
            //Obtiene todos los usuarios usando el modelo User//
            User.getAll()
                .then(users => {
                    //Normaliza los datos de usuarios para asegurar estructura consistente//
                    const safeUsers = Array.isArray(users)
                        ? users.map(user => ({
                            ...user,                      //Copia todas las propiedades del usuario//
                            avatar: user.avatar || null,  //Asegura avatar sea null si no existe//
                            status: user.status || ''     //Asegura status sea string vacío si no existe//
                        }))
                        : [];  //Si users no es array, devuelve array vacío//

                    //Resuelve la Promise con los usuarios normalizados//
                    resolve({
                        success: true,    //Indica operación exitosa//
                        users: safeUsers  //Devuelve array de usuarios seguros//
                    })
                })
                .catch(error => {
                    //Captura y registra cualquier error ocurrido//
                    console.error('Error in UserService.getAllUsers:', error)
                    //Resuelve con array vacío en caso de error (no rechaza la Promise)//
                    resolve({
                        success: false,                     //Indica fallo en la operación//
                        users: [],                          //Devuelve array vacío//
                        error: 'Failed to retrieve users'   //Mensaje de error//
                    })
                })
        })
    }
}

//Exporta la clase UserService para que pueda ser utilizada en otros módulos//
module.exports = UserService