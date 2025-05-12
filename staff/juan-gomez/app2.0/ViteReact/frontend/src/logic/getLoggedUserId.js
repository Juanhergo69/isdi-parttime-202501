//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Obtiene el ID del usuario logueado (de localStorage o sessionStorage)//
export const getLoggedUserId = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || //Busca en localStorage//
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID))     //Si no, busca en sessionStorage//
}