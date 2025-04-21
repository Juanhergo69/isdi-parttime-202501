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
    //Obtiene todos los usuarios almacenados actualmente//
    const users = getUsers()

    //Crea un nuevo array de usuarios con el estado actualizado//
    const updatedUsers = users.map(user => {
        //Busca el usuario específico por ID//
        if (user.id === userId) {
            //Si encuentra al usuario, devuelve una copia con el nuevo estado//
            return { ...user, status }
        }
        //Para otros usuarios, los devuelve sin cambios//
        return user
    })

    //Guarda el array actualizado de usuarios en el localStorage//
    //Convierte el objeto JavaScript a formato JSON//
    //Usa la clave 'users' para almacenarlo//
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}