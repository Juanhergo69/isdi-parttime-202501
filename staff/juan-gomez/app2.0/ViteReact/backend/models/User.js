//Importa las funciones para leer y escribir usuarios desde el archivo de utils//
const { getUsers, saveUsers } = require('../utils/fileUtils')

//Define la clase User que maneja todas las operaciones con usuarios//
class User {
    //Método estático para eliminar la password del objeto usuario//
    static toSafeUser(user) {
        const safeUser = { ...user }
        delete safeUser.password
        return safeUser
    }

    //Método estático para obtener todos los usuarios, eliminando la password//
    static getAll() {
        const users = getUsers()
        return users.map(user => User.toSafeUser(user))
    }

    //Método estático para buscar un usuario por su ID, eliminando la password//
    static getById(id) {
        //Obtiene todos los usuarios//
        const users = getUsers()
        const user = users.find(user => user.id === id)
        return user ? User.toSafeUser(user) : null
    }

    //Método estático para buscar un usuario por su email, completo con password//
    static getCompleteByEmail(email) {
        const users = getUsers()
        return users.find(user => user.email === email)

    }

    //Método estático para buscar un usuario por su email, eliminando la password//
    static getByEmail(email) {
        //Obtiene todos los usuarios//
        const users = getUsers()
        const user = users.find(user => user.email === email)
        return user ? User.toSafeUser(user) : null
    }

    //Método estático para crear un nuevo usuario//
    static create(userData) {
        //Obtiene todos los usuarios existentes//
        const users = getUsers()
        //Crea un nuevo objeto usuario combinando los datos recibidos//
        const newUser = {
            ...userData,    //Copia todas las propiedades del userData//
            id: Date.now().toString(),  //Asigna un ID único usando el timestamp actual//
        }
        //Agrega el nuevo usuario al array de usuarios//
        users.push(newUser)
        //Guarda el array actualizado en el archivo//
        saveUsers(users)
        //Retorna el nuevo usuario creado, eliminando la password//
        return User.toSafeUser(newUser)
    }

    //Método estático para actualizar un usuario existente//
    static update(id, updateData) {
        //Obtiene todos los usuarios//
        const users = getUsers()
        //Encuentra el índice del usuario a actualizar//
        const userIndex = users.findIndex(user => user.id === id)

        //Si no encuentra el usuario, retorna null//
        if (userIndex === -1) return null

        //Crea un objeto usuario actualizado combinando propiedades existentes y nuevas//
        const updatedUser = {
            ...users[userIndex],  //Copia las propiedades del usuario existente//
            ...updateData         //Sobrescribe con las propiedades actualizadas//
        }

        //Reemplaza el usuario antiguo con el actualizado en el array//
        users[userIndex] = updatedUser
        //Guarda los cambios en el archivo//
        saveUsers(users);
        //Retorna el usuario actualizado, eliminando la password//
        return User.toSafeUser(updatedUser)
    }

    //Método estático para eliminar un usuario//
    static delete(id) {
        //Obtiene todos los usuarios//
        const users = getUsers()
        //Filtra el array para eliminar el usuario con el ID especificado//
        const updatedUsers = users.filter(user => user.id !== id)
        //Guarda el array actualizado (sin el usuario eliminado)//
        saveUsers(updatedUsers)
        //Retorna true si se eliminó un usuario, false si no se encontró//
        return updatedUsers.length !== users.length
    }
}

//Exporta la clase User para ser utilizada en otros módulos//
module.exports = User