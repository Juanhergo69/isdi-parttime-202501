//Importa la configuración de la base de datos desde las constantes//
const { DB_CONFIG } = require('../config/constants')
//Importa la función para obtener la conexión a la base de datos//
const { getDB } = require('../config/db')
//Importa bcrypt//
const bcrypt = require('bcrypt')
//Genera factor de costo (10 ofrece buen rendimiento y seguridad)//
const SALT_WORK_FACTOR = 10

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

    //Método estático para hashear una contraseña de forma segura//
    static hashPassword(password) {
        //Retorna una nueva Promesa para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Genera un salt (valor aleatorio) para el hashing//
            //SALT_WORK_FACTOR determina la complejidad del hash (coste computacional)//
            bcrypt.genSalt(SALT_WORK_FACTOR)

                //Cuando la generación del salt se completa exitosamente://
                .then(salt => {
                    //Usa el salt generado para crear el hash de la contraseña//
                    return bcrypt.hash(password, salt)
                })

                //Cuando el hashing de la contraseña se completa://
                .then(hash => {
                    //Resuelve la Promesa con el hash resultante//
                    //(este es el valor que debe almacenarse en la base de datos)//
                    resolve(hash)
                })

                //Si ocurre algún error durante el proceso://
                .catch(reject) //Rechaza la Promesa propagando el error//
        })
    }

    //Método estático para comparar una contraseña en texto plano con un hash almacenado//
    static comparePassword(candidatePassword, hashedPassword) {
        // Retorna una nueva Promesa para manejar la operación asíncrona
        return new Promise((resolve, reject) => {
            //Usa el método compare de bcrypt para comparar://
            //- candidatePassword: Contraseña proporcionada (texto plano)//
            //- hashedPassword: Contraseña hasheada almacenada en la base de datos//
            bcrypt.compare(candidatePassword, hashedPassword)

                //Cuando la comparación se completa://
                .then(isMatch => {
                    //Resuelve la Promesa con el resultado booleano de la comparación://
                    //- true: si las contraseñas coinciden//
                    //- false: si no coinciden//
                    resolve(isMatch)
                })

                //Si ocurre algún error durante la comparación://
                .catch(reject) //Rechaza la Promesa propagando el error//
        })
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

    //Método estático para obtener un usuario completo por email (incluyendo contraseña)//
    static getCompleteByEmail(email) {
        // Retorna una nueva Promesa para manejar la operación asíncrona
        return new Promise((resolve, reject) => {
            //Obtiene la conexión a la base de datos y accede a la colección de usuarios//
            //usando la configuración definida en DB_CONFIG.COLLECTIONS.USERS//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)

                //Busca un único documento que coincida con el criterio://
                //{ email: email.toLowerCase() } - convierte el email a minúsculas para búsqueda case-insensitive//
                .findOne({ email: email.toLowerCase() })

                //Cuando la búsqueda se completa://
                .then(user => {
                    //Resuelve la Promesa con el objeto de usuario completo encontrado//
                    //(incluye todos los campos, incluso la contraseña hasheada)//
                    resolve(user)
                })

                //Si ocurre algún error durante el proceso://
                .catch(reject) //Rechaza la Promesa propagando el error recibido//
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
        //Retorna una nueva Promesa para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Primero hasheamos la contraseña del usuario//
            this.hashPassword(userData.password)
                //Cuando el hashing se completa exitosamente://
                .then(hashedPassword => {
                    //Creamos un objeto newUser combinando://
                    const newUser = {
                        ...userData,                //Todos los datos originales del usuario//
                        password: hashedPassword,   //Reemplaza la contraseña por el hash//
                        id: Date.now().toString()   //Asigna un nuevo ID basado en el timestamp actual//
                    }

                    //Accedemos a la colección de usuarios en la base de datos//
                    getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                        //Insertamos el nuevo documento de usuario//
                        .insertOne(newUser)
                        //Cuando la inserción se completa exitosamente://
                        .then(() => {
                            //Resolvemos la Promesa con una versión segura del usuario//
                            //(eliminando información sensible como la contraseña)//
                            resolve(User.toSafeUser(newUser))
                        })
                        //Si hay error en la inserción, rechazamos la Promesa//
                        .catch(reject)
                })
                //Si hay error en el hashing de la contraseña, rechazamos la Promesa//
                .catch(reject)
        })
    }

    //Método estático para actualizar un usuario existente//
    static update(id, updateData) {
        //Retorna una nueva Promesa para manejar operaciones asíncronas//
        return new Promise((resolve, reject) => {
            //Verifica si el objeto updateData contiene una propiedad 'password'//
            if (updateData.password) {
                //Si hay contraseña, la hasheamos antes de guardar//
                this.hashPassword(updateData.password)
                    //Cuando el hashing se completa con éxito://
                    .then(hashedPassword => {
                        //Creamos un nuevo objeto con todos los datos de actualización//
                        //pero reemplazando la contraseña en texto plano por el hash//
                        const updatedData = {
                            ...updateData,             //Copia todas las propiedades existentes//
                            password: hashedPassword   //Sobreescribe la contraseña con el hash//
                        }

                        //Llamamos al método que realiza la actualización en la base de datos//
                        //pasando el ID y los datos actualizados (con contraseña hasheada)//
                        this.performUpdate(id, updatedData)
                            //Si la actualización es exitosa, resolvemos la Promesa//
                            .then(resolve)
                            //Si hay error en la actualización, rechazamos la Promesa//
                            .catch(reject)
                    })
                    //Si hay error en el hashing de la contraseña, rechazamos la Promesa//
                    .catch(reject)
            } else {
                //Si NO hay contraseña en los datos de actualización://
                //Llamamos directamente al método de actualización//
                //pasando el ID y los datos originales sin modificar//
                this.performUpdate(id, updateData)
                    //Si la actualización es exitosa, resolvemos la Promesa//
                    .then(resolve)
                    //Si hay error en la actualización, rechazamos la Promesa//
                    .catch(reject)
            }
        })
    }

    //Método estático para realizar la operación de actualización en la base de datos//
    static performUpdate(id, updateData) {
        //Retorna una nueva Promesa para manejar la operación asíncrona//
        return new Promise((resolve, reject) => {
            //Accede a la colección de usuarios en la base de datos//
            getDB().collection(DB_CONFIG.COLLECTIONS.USERS)
                //Ejecuta la operación findOneAndUpdate de MongoDB//
                .findOneAndUpdate(
                    //Filtro: Busca el documento con el id proporcionado//
                    { id },
                    //Operación de actualización: $set actualiza solo los campos especificados//
                    { $set: updateData },
                    //Devuelve el documento después de la actualización//
                    { returnDocument: 'after' }
                )
                //Maneja el resultado de la operación de actualización//
                .then(result => {
                    //Verifica si se encontró y actualizó un documento (result.value existe)//
                    if (result.value) {
                        //Si existe, resuelve la Promesa con la versión "segura" del usuario//
                        //(eliminando información sensible como la contraseña)//
                        resolve(User.toSafeUser(result.value))
                    } else {
                        //Si no se encontró el documento, resuelve con null//
                        resolve(null)
                    }
                })
                //Captura cualquier error durante el proceso//
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