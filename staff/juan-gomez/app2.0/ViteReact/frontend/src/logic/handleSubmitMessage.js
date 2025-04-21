//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
    USERS: 'users',       //Clave para usuarios en localStorage//
    MESSAGES: 'messages', //Clave para mensajes//
    ID: 'id'              //Clave para ID de usuario//
}

//Obtiene todos los mensajes almacenados//
export const getMessages = () => {
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return messagesJson ? JSON.parse(messagesJson) : [] //Retorna mensajes o array vacío//
}

//Guarda la lista de mensajes en localStorage//
export const saveMessages = (messages) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
}

//Valida que un título no exceda 5 palabras//
export const validateTitle = (title) => {
    const words = title.split(/\s+/).filter(word => word.length > 0) //Divide y filtra palabras vacías//
    return words.length <= 5 //True si tiene 5 palabras o menos//
}

//Valida que un texto no exceda 100 palabras//
export const validateTextarea = (textarea) => {
    const words = textarea.split(/\s+/).filter(word => word.length > 0)
    return words.length <= 100 //True si tiene 100 palabras o menos//
}

//Función para almacenar un nuevo mensaje//
export const storeMsg = (loggedUserUserId, title, msg, date, image = null) => {
    //Valida que título y mensaje no estén vacíos//
    if (!title || !msg) {
        return {
            success: false,                                                     //Si no hay éxito//
            error: 'All fields are required. The message has not been stored'   //Devuelve mensaje de error//
        }
    }

    //Obtiene todos los mensajes existentes//
    const messages = getMessages()

    //Crea objeto con los datos del nuevo mensaje//
    const objectUserMsg = {
        userId: loggedUserUserId,    //ID del usuario que crea el mensaje//
        title: title,                //Título del mensaje//
        msg: msg,                    //Contenido del mensaje//
        date: date.toLocaleString(), //Fecha formateada como string//
        likes: [],                   //Array para likes (inicia vacío)//
        dislikes: [],                //Array para dislikes (inicia vacío)//
        favorite: [],                //Array para favoritos (inicia vacío)//
        image: image                 //Imagen adjunta (opcional)//
    }

    //Agrega el nuevo mensaje al array//
    messages.push(objectUserMsg)
    //Guarda todos los mensajes actualizados//
    saveMessages(messages)

    return { success: true } //Devuelve el suceso a verdadero//
}

export const handleSubmitMessage = (formData, loggedUserId, selectedImage, callback) => {
    //Extrae propiedades title y msg del objeto formData usando destructuring//
    const { title, msg } = formData

    //Valida el título del mensaje usando la función validateTitle//
    //Si la validación falla (retorna false)://
    if (!validateTitle(title)) {
        callback({
            success: false,                         //Si no hay éxito//
            error: 'Title cannot exceed 5 words'    //Devuelve mensaje de error//
        })
        return
    }

    //Valida el contenido del mensaje usando la función validateTextarea//
    //Si la validación falla (retorna false)://
    if (!validateTextarea(msg)) {
        callback({
            success: false,                             //Si no hay éxito//
            error: 'Message cannot exceed 100 words'    //Devuelve mensaje de error//
        })
        return
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
            const storeResult = storeMsg(loggedUserId, title, msg, new Date(), event.target.result)

            //Verifica si el almacenamento del mensaje fue existoso//
            if (storeResult.success) {
                //Si fue exitoso, ejecuta el callback con objeto de éxito://
                callback({
                    success: true,                                      //Si hay éxito//
                    message: 'Message stored successfully with image!'  //Devuelve mensaje indicándolo//
                })
            } else {
                //Si falló, pasa directamente el resultado de storeMsg al callback//
                //(que ya contiene success: false y el mensaje de error)//
                callback(storeResult)
            }
        }

        //Manejador de errores para la lectura de la imagen//
        reader.onerror = () => {
            //Cuando ocurre un error en la lectura de la imagen,//
            //ejecuta el callback con objeto de error://
            callback({
                success: false,                                         //Si no hay éxito//
                error: 'Failed to process image. Please try again.'     //Devuelve mensaje de error//
            })
        }

        //Inicia el proceso de lectura de la imagen seleccionada//
        //La convierte a formato Data URL (base64)//
        reader.readAsDataURL(selectedImage)
    }

    //Caso sin imagen//
    else {
        //Intenta almacenar el mensaje sin imagen//
        const storeResult = storeMsg(loggedUserId, title, msg, new Date());
        //Ejecuta el callback con://
        //- Objeto de éxito si storeResult.success es true//
        //- El mismo storeResult (que contiene el error) si es false//
        callback(storeResult.success ? {
            success: true,                              //Si hay éxito//
            message: 'Message stored successfully!'     //Devuelve mensaje indicándolo//
        } : storeResult)
    }
}