const capitalizeFirstLetter = (str) => { //Transformamos la primera letra del string en mayúscula (útil para la generación del nombre de usuario)//
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const STORAGE_KEYS = { //Storage_Keys nos da unas claves de almacenamiento predeterminadas (útil para muchas funciones de manejo de usuarios, mensajes o id)//
    USERS: 'users',
    MESSAGES: 'messages',
    ID: 'id'
}

const getUsers = () => { //Traemos la lista de usuarios//
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS) //Cojemos los usuarios de localStorage//
    return usersJson ? JSON.parse(usersJson) : [] //Devolvemos los usuarios parseados para poder ser leidos, o nada, si no los hay//
}

const saveUsers = (users) => { //Guardamos la lista de usuarios//
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Seteamos los usuarios stringificados para poder ser leidos en localStorage// 
}

const getMessages = () => { //Traemos la lista de mensajes//
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES) //Cojemos los mensajes de localStorage//
    return messagesJson ? JSON.parse(messagesJson) : [] //Devolvemos los mensajes parseados para poder ser leidos, o nada, si no los hay//
}

const saveMessages = (messages) => { //Guardamos la lista de mensajes//
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages)) //Seteamos los mensajes stringificados para poder ser leidos en localStorage//
}

const getLoggedUserId = () => { //Traemos la lista de id de usuarios//
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || //Devolvemos las id parseadas para poder ser leidos, de localStorage o sessionStorage (según donde se encuentren)//
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID))
}

const validateEmail = (email) => { //Validamos que el input de email cumpla con el regex//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //El regex valida que el input cumpla con la estructura de un email//
    return emailRegex.test(email) //Devolvemos el text regex sobre el input de email//
}

const validatePassword = (password) => { //Validamos que el input de contraseña cumpla con el regex//
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ //El regex valida que la contraseña contenga una letra mayúscula, una letra mínuscula, un número, un carácter especial, y en global, al menos 6 caracteres//
    return passwordRegex.test(password) //Devolvemos el text regex sobre el input de constraseña//
}

const validateTitle = (title) => { //Validamos que el título del formulario de mensajes cumpla con el regex//
    const words = title.split(/\s+/).filter(word => word.length > 0) //El regex valida que el título no contenga más de 5 palabras//
    return words.length <= 5 //Devolvemos la longitud de las palabras, siempre y cuando sean iguales o inferiores a 5//
}

const validateTextarea = (textarea) => { //Validamos que el text area del formulario de mensajes cumpla con el regex//
    const words = textarea.split(/\s+/).filter(word => word.length > 0) //El regex valida que el textarea no contenga más de 100 palabras//
    return words.length <= 100 //Devolvemos la longitud de las palabras, siempre y cuando sean iguales o inferiores a 100//
}

const createModal = (message, onCloseCallback) => { //Cramos un modal en base a un mensaje y un callback de cierre//
    const modal = document.createElement('div') //Creamos el modal como div//
    modal.className = 'modal' //Damos nombre de clase//
    //Internamente tendrá un mensaje//
    modal.innerHTML = ` 
        <div class="modal-content">
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(modal) //Lo añadimos al body//

    const closeModal = () => { //Cerramos el modal//
        modal.remove() //Lo eliminamos
        if (onCloseCallback) onCloseCallback() //Si se aplica el callback de cierre//
    }

    modal.addEventListener('click', closeModal) //Se cerrará al hacer click sobre el modal//
    setTimeout(closeModal, 6000) //O se cerrará transcurridos 6 segundos//

    return modal //Devolvemos el modal//
}