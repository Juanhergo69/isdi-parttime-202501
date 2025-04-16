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