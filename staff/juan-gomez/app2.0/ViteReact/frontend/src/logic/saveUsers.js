//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Guarda la lista de usuarios en localStorage//
export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Convierte a JSON y guarda//
}