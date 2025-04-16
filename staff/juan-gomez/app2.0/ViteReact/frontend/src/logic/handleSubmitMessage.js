//Importa validateTitle y validateTextarea//
import { validateTitle, validateTextarea} from '../utils/validators'
//Importa createModal//
import { createModal } from '../utils/createModal'
//Importa storeMsg//
import { storeMsg } from './storeMsg'

export const handleSubmitMessage = (formData, loggedUserId, selectedImage, callback) => {
    //Extrae propiedades title y msg del objeto formData usando destructuring//
    const { title, msg } = formData

    //Valida el título del mensaje usando la función validateTitle//
    //Si la validación falla (retorna false)://
    if (!validateTitle(title)) {
        //Muestra un modal de error con mensaje específico//
        createModal('Title cannot exceed 5 words')
        //Retorna false indicando que el envío falló//
        return false
    }

    //Valida el contenido del mensaje usando la función validateTextarea//
    //Si la validación falla (retorna false)://
    if (!validateTextarea(msg)) {
        //Muestra un modal de error con mensaje específico//
        createModal('Message cannot exceed 100 words')
        //Retorna false indicando que el envío falló//
        return false
    }

    //Verifica si hay una imagen adjunta para procesar//
    if (selectedImage) {
        //Crea una instancia de FileReader para leer la imagen//
        const reader = new FileReader()
        
        //Define el evento que se ejecutará cuando la lectura se complete//
        reader.onload = (event) => {
            //Guarda el mensaje en el almacenamiento con://
            //- ID de usuario//
            //- Título del mensaje//
            //- Contenido del mensaje//
            //- Fecha actual//
            //- Imagen convertida a base64 (event.target.result)//
            storeMsg(loggedUserId, title, msg, new Date(), event.target.result)
            
            //Muestra modal de éxito//
            createModal('Message stored successfully!')
            
            //Si existe callback, lo ejecuta pasando true (éxito)//
            if (callback) callback(true)
        }
        
        //Inicia la lectura de la imagen como Data URL (base64)//
        reader.readAsDataURL(selectedImage)
        
        //Retorna true indicando que el proceso se inició correctamente//
        return true

    } else {
        //Caso cuando NO hay imagen adjunta://
        //Guarda el mensaje sin imagen//
        storeMsg(loggedUserId, title, msg, new Date())
        
        //Muestra modal de éxito//
        createModal('Message stored successfully!')

        //Si existe callback, lo ejecuta pasando true (éxito)//
        if (callback) callback(true)
        
        //Retorna true indicando éxito en el envío//
        return true
    }
}