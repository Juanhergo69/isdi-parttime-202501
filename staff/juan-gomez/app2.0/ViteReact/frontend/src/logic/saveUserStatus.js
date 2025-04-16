//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Obtiene todos los usuarios almacenados//
export const getUsers = () => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS) //Obtiene datos como JSON string//
    return usersJson ? JSON.parse(usersJson) : [] //Convierte a objeto JS o retorna array vacío//
}

//Función para guardar el estado del usuario//
export const saveUserStatus = (userId, status) => {
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return { ...user, status }
        }
        return user
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}