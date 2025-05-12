//Exporta un objeto que contiene constantes utilizadas en la aplicación//
module.exports = {
    //Objeto que define las claves utilizadas para el almacenamiento de datos//
    STORAGE_KEYS: {
        USERS: 'users',         //Clave para almacenar/recuperar datos de usuarios//
        MESSAGES: 'messages',   //Clave para almacenar/recuperar datos de mensajes//
        ID: 'id'               //Clave para almacenar/recuperar identificadores únicos//
    },

    //Objeto que define las rutas de los archivos donde se guardarán los datos//
    FILE_PATHS: {
        USERS: './data/users.json',      //Ruta del archivo JSON para almacenar usuarios//
        MESSAGES: './data/messages.json' //Ruta del archivo JSON para almacenar mensajes//
    }
}