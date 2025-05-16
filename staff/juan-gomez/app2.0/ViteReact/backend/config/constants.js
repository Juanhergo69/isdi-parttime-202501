//Exporta un objeto de configuración que será accesible cuando otros módulos importen este archivo//
module.exports = {
    //Define la configuración relacionada con la base de datos//
    DB_CONFIG: {
        //URI de conexión a MongoDB. Usa la variable de entorno MONGODB_URI si está definida,//
        //de lo contrario usa la cadena de conexión local por defecto 'mongodb://localhost:27017'//
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',

        //Nombre de la base de datos que será utilizada en la aplicación//
        DB_NAME: 'sm_app',

        //Objeto que contiene los nombres de las colecciones (equivalentes a tablas en bases de datos relacionales)//
        COLLECTIONS: {
            //Nombre de la colección donde se almacenarán los documentos de usuarios//
            USERS: 'users',

            //Nombre de la colección donde se almacenarán los documentos de mensajes//
            MESSAGES: 'messages'
        }
    }
}