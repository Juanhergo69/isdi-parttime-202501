//Importa la configuración de la base de datos desde las constantes//
const { DB_CONFIG } = require('../config/constants')
//Importa la función para obtener la conexión a la base de datos//
const { getDB } = require('../config/db')

//Define la clase User que contendrá métodos para interactuar con usuarios//
class User {
    //Método estático para crear una versión segura del usuario (sin contraseña)//
    static toSafeUser(user) {
        //Crea una copia del objeto usuario para no modificar el original//
        const safeUser = { ...user };
        //Elimina la propiedad password del objeto copiado//
        delete safeUser.password;
        //Retorna el usuario seguro (sin contraseña)//
        return safeUser
    }

    //Método estático para obtener todos los usuarios//
    static getAll() {
        //Retorna una promesa para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Accede a la colección de usuarios en la base de datos//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Busca todos los documentos en la colección//
                .find()
                //Convierte los resultados a un array//
                .toArray()
                .then(users => {
                    //Normaliza los usuarios para asegurar estructura consistente//
                    const normalizedUsers = users.map(user => ({
                        id: user.id || '',             //ID del usuario (cadena vacía si no existe)//
                        email: user.email || '',       //Email (cadena vacía si no existe)//
                        userName: user.userName || '', //Nombre de usuario (cadena vacía si no existe)//
                        avatar: user.avatar || null,   //Avatar (null si no existe)//
                        status: user.status || ''      //Estado (cadena vacía si no existe)//
                    }));
                    //Resuelve la promesa con los usuarios normalizados//
                    resolve(normalizedUsers);
                })
                // Rechaza la promesa si hay error
                .catch(reject)
        })
    }

    //Método estático para obtener un usuario por su ID//
    static getById(id) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de usuarios//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Busca un usuario con el ID especificado//
                .findOne({ id })
                .then(user => {
                    //Si no se encuentra el usuario, resuelve con null//
                    if (!user) return resolve(null)

                    //Normaliza los datos del usuario encontrado//
                    const normalizedUser = {
                        id: user.id,                   //ID del usuario//
                        email: user.email || '',       //Email (cadena vacía si no existe)//
                        userName: user.userName || '', //Nombre de usuario (cadena vacía si no existe)//
                        avatar: user.avatar || null,   //Avatar (null si no existe)//
                        status: user.status || ''      //Estado (cadena vacía si no existe)//
                    }

                    //Resuelve con el usuario normalizado//
                    resolve(normalizedUser)
                })
                //Rechaza si hay error//
                .catch(reject);
        })
    }

    // Método estático para obtener un usuario completo por email (incluyendo contraseña)
    static getCompleteByEmail(email) {
        return new Promise((resolve, reject) => {
            // Accede a la colección de usuarios
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                // Busca un usuario con el email especificado
                .findOne({ email })
                .then(user => {
                    // Si no se encuentra el usuario, resuelve con null
                    if (!user) {
                        return resolve(null)
                    }
                    //Resuelve con el usuario encontrado (incluye todos los campos)//
                    resolve(user)
                })
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para obtener un usuario por email (versión segura)//
    static getByEmail(email) {
        return new Promise((resolve, reject) => {
            //Llama al método para obtener usuario completo por email//
            this.getCompleteByEmail(email)
            //Accede a la colección de usuarios (nota: hay un error aquí, falta el .then)//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Busca usuario con email que coincida con la expresión regular//
                .findOne({ email: { $regex: emailRegex } })
                //Si encuentra usuario, devuelve versión segura, sino null//
                .then(user => resolve(user ? User.toSafeUser(user) : null))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para crear un nuevo usuario//
    static create(userData) {
        return new Promise((resolve, reject) => {
            //Prepara el nuevo usuario con datos recibidos//
            const newUser = {
                ...userData,                     //Copia todas las propiedades del usuario//
                id: Date.now().toString()        //Asigna un ID basado en timestamp actual//
            }

            //Accede a la colección de usuarios//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Inserta el nuevo usuario en la colección//
                .insertOne(newUser)
                //Si se inserta correctamente, devuelve versión segura del usuario//
                .then(result => resolve(User.toSafeUser(newUser)))
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para actualizar un usuario existente//
    static update(id, updateData) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de usuarios//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Busca y actualiza el usuario con el ID especificado//
                .findOneAndUpdate(
                    { id },                         //Filtro por ID//
                    { $set: updateData },           //Datos a actualizar//
                    { returnDocument: 'after' }     //Devuelve el documento actualizado//
                )
                .then(result => {
                    //Si se encontró y actualizó el usuario//
                    if (result.value) {
                        //Devuelve versión segura del usuario actualizado//
                        resolve(User.toSafeUser(result.value))
                    } else {
                        //Si no se encontró el usuario, devuelve null//
                        resolve(null)
                    }
                })
                //Rechaza si hay error//
                .catch(reject)
        })
    }

    //Método estático para eliminar un usuario//
    static delete(id) {
        return new Promise((resolve, reject) => {
            //Accede a la colección de usuarios//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Elimina el usuario con el ID especificado//
                .deleteOne({ id })
                //Resuelve con true si se eliminó, false si no//
                .then(result => resolve(result.deletedCount > 0))
                //Rechaza si hay error//
                .catch(reject)
        })
    }
}

//Exporta la clase User para ser utilizada en otros módulos//
module.exports = User