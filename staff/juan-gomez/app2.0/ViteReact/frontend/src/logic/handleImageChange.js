//Handler para manejar imágenes//
export const handleImageChange = (file, callback) => {
    //Verifica si no se proporcionó un archivo válido//
    //Si file es null, undefined o false, retorna false indicando fallo en la operación//
    if (!file) return false
    
    //Crea una nueva instancia de FileReader, API del navegador para leer archivos//
    const reader = new FileReader()
    
    //Define el evento onload que se dispara cuando la lectura del archivo se completa//
    //Cuando termina de leer, ejecuta el callback proporcionado pasando el resultado//
    reader.onload = () => callback(reader.result)
    
    //Inicia la lectura del archivo como Data URL (formato base64)//
    //Esto convertirá la imagen a una cadena de texto que puede ser usada en src de <img>//
    reader.readAsDataURL(file)
    
    //Retorna true indicando que el proceso de lectura se inició correctamente//
    return true
}