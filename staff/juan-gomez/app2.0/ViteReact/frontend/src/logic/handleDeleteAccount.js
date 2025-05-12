//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Obtiene el ID del usuario logueado (de localStorage o sessionStorage)//
export const getLoggedUserId = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || //Busca en localStorage//
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID)) //Si no, busca en sessionStorage//
}

//Exporta una función llamada handleDeleteAccount que maneja el proceso de eliminación de cuenta//
export const handleDeleteAccount = () => {
    //Obtiene el ID del usuario actualmente logueado llamando a la función getLoggedUserId//
    const userId = getLoggedUserId()

    //Verifica si no se obtuvo un ID de usuario (usuario no logueado)//
    if (!userId) {
        //Rechaza la promesa inmediatamente con un error si no hay usuario logueado//
        return Promise.reject(new Error('No user logged in'))
    }

    //Realiza una petición HTTP DELETE al endpoint del usuario específico en el servidor//
    return fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE' //Especifica que es una petición de tipo DELETE//
    })
        //Primera promesa: maneja la respuesta del servidor//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (status fuera del rango 200-299)//
            if (!response.ok) {
                //Lanza un error si la eliminación falló a nivel HTTP//
                throw new Error('Failed to delete account')
            }
            //Convierte la respuesta a formato JSON para procesarla//
            return response.json()
        })
        //Segunda promesa: maneja los datos JSON recibidos//
        .then(data => {
            //Verifica si la operación fue exitosa según la respuesta del servidor//
            if (data.success) {
                //Limpieza de almacenamiento local://
                //Elimina el ID del usuario del localStorage//
                localStorage.removeItem('id')
                //Elimina el ID del usuario del sessionStorage//
                sessionStorage.removeItem('id')
                //Retorna true indicando que la eliminación fue exitosa//
                return true
            }
            //Lanza un error si el servidor indicó que la operación falló//
            throw new Error('Failed to delete account')
        })
        //Manejo de errores: captura cualquier error en la cadena de promesas//
        .catch(error => {
            //Registra el error en la consola para propósitos de depuración//
            console.error('Error deleting account:', error);
            //Vuelve a lanzar el error para que pueda ser manejado por el llamador//
            throw error
        })
}