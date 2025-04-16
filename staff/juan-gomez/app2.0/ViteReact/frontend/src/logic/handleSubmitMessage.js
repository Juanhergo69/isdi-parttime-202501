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

//Crea y muestra un modal con mensaje//
export const createModal = (message, onCloseCallback) => {
    //Crea elemento div para el modal//
    const modal = document.createElement('div');
    modal.className = 'modal' //Clase CSS para estilos//

    //HTML interno del modal. Muestra el mensaje recibido//
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p> 
        </div>
    `

    //Agrega el modal al body del documento//
    document.body.appendChild(modal)

    //Función para cerrar el modal//
    const closeModal = () => {
        modal.remove() //Elimina el modal del DOM//
        if (onCloseCallback) onCloseCallback() //Ejecuta callback si existe//
    }

    //Cierra al hacer click en cualquier parte del modal//
    modal.addEventListener('click', closeModal)
    //Cierra automáticamente después de 6 segundos//
    setTimeout(closeModal, 6000)

    return modal //Devuelve el modal creado//
}

//Función para almacenar un nuevo mensaje//
export const storeMsg = (loggedUserUserId, title, msg, date, image = null) => {
    //Valida que título y mensaje no estén vacíos//
    if (!title || !msg) {
        createModal('All fields are required. The message has not been stored')
        return
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
}

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