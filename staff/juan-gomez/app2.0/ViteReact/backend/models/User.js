//Importa el modelo de usuario desde el archivo de esquemas//
const { UserModel } = require('./schemas')
//Importa la librería bcrypt para el hashing de contraseñas//
const bcrypt = require('bcrypt')
//Define el factor de coste para el salt de bcrypt (a mayor número, más seguro pero más lento)//
const SALT_WORK_FACTOR = 10

//Define la clase User que contendrá métodos estáticos para manejar usuarios//
class User {
    //Método estático para crear una versión segura del objeto usuario (sin información sensible)//
    static toSafeUser(user) {
        //Si no hay usuario, retorna null//
        if (!user) return null
        //Convierte el documento mongoose a objeto si es necesario//
        const userObject = user.toObject ? user.toObject() : user
        //Crea una copia del objeto usuario//
        const safeUser = { ...userObject }
        //Elimina la contraseña del objeto seguro//
        delete safeUser.password
        //Elimina la propiedad __v (versión de mongoose) del objeto seguro//
        delete safeUser.__v
        //Elimina el _id del objeto seguro//
        delete safeUser._id
        //Retorna el objeto usuario seguro//
        return safeUser
    }

    //Método estático para hashear una contraseña//
    static hashPassword(password) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Genera un salt usando el factor de coste definido//
            bcrypt.genSalt(SALT_WORK_FACTOR)
                //Usa el salt para hashear la contraseña//
                .then(salt => bcrypt.hash(password, salt))
                //Resuelve la promesa con el hash resultante//
                .then(resolve)
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para comparar una contraseña candidata con un hash//
    static comparePassword(candidatePassword, hashedPassword) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Usa bcrypt para comparar las contraseñas//
            bcrypt.compare(candidatePassword, hashedPassword)
                //Resuelve la promesa con el resultado de la comparación (true/false)//
                .then(resolve)
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para obtener todos los usuarios//
    static getAll() {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Busca todos los usuarios en la base de datos//
            UserModel.find({})
                //Mapea los usuarios a su versión segura y resuelve la promesa//
                .then(users => resolve(users.map(user => this.toSafeUser(user))))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para obtener un usuario por su ID//
    static getById(id) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Busca un usuario por su ID//
            UserModel.findOne({ id })
                //Si existe el usuario, retorna su versión segura, sino null//
                .then(user => resolve(user ? this.toSafeUser(user) : null))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para obtener un usuario completo por su email (incluyendo información sensible)//
    static getCompleteByEmail(email) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Busca un usuario por email (convertido a minúsculas)//
            UserModel.findOne({ email: email.toLowerCase() })
                //Resuelve la promesa con el usuario encontrado//
                .then(resolve)
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para obtener un usuario por su email (versión segura)//
    static getByEmail(email) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Obtiene el usuario completo por email//
            this.getCompleteByEmail(email)
                //Si existe el usuario, retorna su versión segura, sino null//
                .then(user => resolve(user ? this.toSafeUser(user) : null))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para crear un nuevo usuario//
    static create(userData) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Hashea la contraseña del usuario//
            this.hashPassword(userData.password)
                .then(hashedPassword => {
                    //Crea un nuevo usuario con los datos proporcionados//
                    const newUser = new UserModel({
                        //Copia todos los datos del usuario//
                        ...userData,
                        //Reemplaza la contraseña por el hash//
                        password: hashedPassword,
                        //Asigna un ID basado en el timestamp actual//
                        id: Date.now().toString()
                    })
                    //Guarda el nuevo usuario en la base de datos//
                    return newUser.save()
                })
                //Retorna la versión segura del usuario creado//
                .then(newUser => resolve(this.toSafeUser(newUser)))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para actualizar un usuario//
    static update(id, updateData) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Si la actualización incluye una contraseña//
            if (updateData.password) {
                //Hashea la nueva contraseña//
                this.hashPassword(updateData.password)
                    .then(hashedPassword => {
                        //Realiza la actualización con la contraseña hasheada//
                        return this.performUpdate(id, {
                            ...updateData,
                            password: hashedPassword
                        })
                    })
                    //Resuelve la promesa con el resultado//
                    .then(resolve)
                    //Rechaza la promesa si hay algún error//
                    .catch(reject)
            } else {
                //Si no hay contraseña, realiza la actualización directamente//
                this.performUpdate(id, updateData)
                    //Resuelve la promesa con el resultado//
                    .then(resolve)
                    //Rechaza la promesa si hay algún error//
                    .catch(reject)
            }
        })
    }

    //Método estático para realizar la actualización en la base de datos//
    static performUpdate(id, updateData) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Busca y actualiza el usuario por ID//
            UserModel.findOneAndUpdate(
                { id },         //Criterio de búsqueda//
                updateData,     //Datos a actualizar//
                { new: true }   //Opción para retornar el documento actualizado//
            )
                //Retorna la versión segura del usuario actualizado o null si no existe//
                .then(updatedUser => resolve(updatedUser ? this.toSafeUser(updatedUser) : null))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }

    //Método estático para eliminar un usuario//
    static delete(id) {
        //Retorna una nueva promesa//
        return new Promise((resolve, reject) => {
            //Elimina el usuario por ID//
            UserModel.deleteOne({ id })
                //Resuelve la promesa con true si se eliminó un documento, false si no//
                .then(result => resolve(result.deletedCount > 0))
                //Rechaza la promesa si hay algún error//
                .catch(reject)
        })
    }
}

//Exporta la clase User para ser usada en otros módulos//
module.exports = User