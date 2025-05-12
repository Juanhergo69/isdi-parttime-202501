//Importa el módulo fs (file system) de Node.js para operaciones con archivos//
const fs = require('fs')
//Importa el módulo path de Node.js para manejar rutas de archivos//
const path = require('path')
//Importa las constantes de configuración con las rutas de archivos//
const { FILE_PATHS } = require('../config/constants')

//Función para leer datos de un archivo JSON//
const readDataFromFile = (filePath) => {
    try {
        //Lee el archivo de forma síncrona://
        //1. path.resolve() crea la ruta absoluta al archivo//
        //2. __dirname es el directorio actual//
        //3. '../' sube un nivel en la estructura de directorios//
        //4. 'utf8' especifica la codificación del archivo//
        const data = fs.readFileSync(path.resolve(__dirname, '../', filePath), 'utf8')

        //Parsea el contenido del archivo de JSON a objeto JavaScript//
        return JSON.parse(data)
    } catch (error) {
        //Si el error es porque el archivo no existe (ENOENT)//
        if (error.code === 'ENOENT') {
            //Retorna un array vacío como valor por defecto//
            return []
        }
        //Para otros tipos de errores, lanza la excepción//
        throw error
    }
}

//Función para escribir datos en un archivo JSON//
const writeDataToFile = (filePath, data) => {
    //Escribe en el archivo de forma síncrona://
    //1. Crea la ruta absoluta igual que en readDataFromFile//
    //2. Convierte los datos a JSON con formato legible (2 espacios de indentación)//
    //3. 'utf8' especifica la codificación//
    fs.writeFileSync(path.resolve(__dirname, '../', filePath), JSON.stringify(data, null, 2), 'utf8')
}

//Función específica para obtener usuarios://
//Usa readDataFromFile con la ruta definida en constants.js//
const getUsers = () => readDataFromFile(FILE_PATHS.USERS)

//Función específica para guardar usuarios://
//Usa writeDataToFile con la ruta definida en constants.js//
const saveUsers = (users) => writeDataToFile(FILE_PATHS.USERS, users)

//Función específica para obtener mensajes://
//Usa readDataFromFile con la ruta definida en constants.js//
const getMessages = () => readDataFromFile(FILE_PATHS.MESSAGES)

//Función específica para guardar mensajes://
//Usa writeDataToFile con la ruta definida en constants.js//
const saveMessages = (messages) => writeDataToFile(FILE_PATHS.MESSAGES, messages)

//Exporta las funciones específicas para ser usadas en otros módulos//
module.exports = {
    getUsers,     //Para obtener usuarios//
    saveUsers,    //Para guardar usuarios//
    getMessages,  //Para obtener mensajes//
    saveMessages  //Para guardar mensajes//
}