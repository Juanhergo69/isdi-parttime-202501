//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES DE UTILIDAD QUE PODRÁN SEGUIRSE REUTILIZANDO A LO LARGO DEL CÓDIGO //
//******************************************************************************************************************************************************************************************//
export const capitalizeFirstLetter = (str) => { //Exportamos y declaramos capitalizeFirstLetter, que nos servirá para, a cada nombre de usuario generado, cambiarle la primera letra a mayúsucula//
    return str.charAt(0).toUpperCase() + str.slice(1) //Devolveremos la primera posición del string (str) en mayúscula, para luego, con slice, añadir el resto de posiciones librando la primera// 
}

export const loadFonts = () => { //Exportamos y declaramos loadFonts, que nos servirá de base de datos para las fuentes que queramos utilizar en nuestra aplicación//
    const fonts = [ //Declaramos fonts, y a continuación, agregamos las url de las fuentes que queramos traernos (lo pongo en columna para facilitar la vista)//
        'https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap',
        'https://fonts.googleapis.com/css2?family=Zen+Dots&family=Zen+Loop:ital@0;1&display=swap',
        'https://fonts.googleapis.com/css2?family=Tektur:wght@400..900&display=swap'
    ]
    fonts.forEach(font => { //con forEach, recorremos cada una de las url introducidas, y las creamos como link, dandole su categoría y estilo//
        const link = document.createElement('link') //Declaramos link, para crear el link de cada fuente recorrida con forEach//
        link.href = font //Asignamos que se trata de una fuente de texto//
        link.rel = 'stylesheet' //Asignamos que se trata de un estilo//
        document.head.appendChild(link) //Añadimos el link generado al head del documento//
    })
}

export const STORAGE_KEYS = { //exportamos y declaramos STORAGE_KEYS, que nos permitirá simplicar las funciones de registro, logeo y obtención de datos de los usuarios regitrados/logueados, así como sus mensajes//
    USERS: 'users',
    MESSAGES: 'messages',
    ID: 'id'
}

export const getUsers = () => { //Exportamos y declaramos getUsers, que nos permitirá obtener los usuarios desde localStorage//
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS) //Declaramos userJSon, que contendrá los parámetros recogidos de localStorage basado en STORAGE_KEYS (usuario, mensaje e id)//
    return usersJson ? JSON.parse(usersJson) : [] //Devolvemos userJson haciendo la transformación JSON, o nada, en el caso que no haya usuarios//
}

export const saveUsers = (users) => { //Exportamos y declaramos saveUsers, que nos permitirá guardar los usuarios en localStorage//
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Añadimos a localStorage el usuario guardado, en base al parametro users de STORAGE_KEYS (usuario), y hacemos la transformación JSON//
}

export const getMessages = () => { //Exportamos y declaramos getMessages, que nos permitirá obtener los mensajes desde localStorage//
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES) //Declaramos messagesJson, que contendrá los parámetros recogidos en localStorage basado en STORAGE_KEYS (mensajes)//
    return messagesJson ? JSON.parse(messagesJson) : [] //Devolvemos messagesJson haciendo la transformación JSON, o nada, en el caso que no haya mensajes//
}

export const saveMessages = (messages) => { //Exportamos y declaramos saveMessages, que nos permitirá guardar los mensajes en localStorage//
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages)) //Añadimos a localStorage el mensaje guardado, en basado al parametro messages de STORAGE_KEYS (mensajes), y hacemos la transformacion JSON//
}

export const getLoggedUserId = () => { //Exportamos y declaramos getLoggedUserId, que nos permitirá obtener la id del usuario logueado//
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID)) //Devolvemos la id recogida en localStorage o sessionStorage (depende donde esté almacenada), y hacemos la transformación JSON en los dos casos//
}

export const renderPage = (container, elements) => { //Exportamos y declaramos renderPage, que nos permitirá la renderización de las páginas//
    elements.forEach(element => container.appendChild(element)); // Añadir elementos al contenedor
    document.body.appendChild(container); // Añadir el contenedor al body
    return container
}

export const validateEmail = (email) => { //Exportamos y declaramos validateEmail, que servirá para validar con regex la dirección de email para registro//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //El regex indica que, la estructura del email debe ser la siguiente: texto+@+texto+.(es,com,net,etc..)//
    return emailRegex.test(email) //Devolvemos el test realizado al campo email con regex//
}

export const validatePassword = (password) => { //Exportamos y declaramos validatePassword, que servirá para validar el formato válido de la contraseña ingresada para registro//
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ //El regex indica que, la contraseña debe contener al menos 6 carácteres, 1 letra mayúscula, 1 letra minúscula, 1 número y 1 carácter especial//
    return passwordRegex.test(password) //Devolvemos el test realizado al campo password con regex//
}

export const validateTitle = (title) => { //Exportamos y declaramos validateTitle, que servirá para validar el formato del título para el formulario de envío de mensajes//
    const words = title.split(/\s+/).filter(word => word.length > 0) //El regex indica que, el título debe tener 5 o menos palabras//
    return words.length <= 5 //Devolvemos la longitud del título, siempre y cuando sea igual o menor a 5 palabras//
}

export const validateTextarea = (textarea) => { //Exportamos y declaramos validateTextarea, que servíra para validar el formato del textarea para el formulario de envío de mensajes//
    const words = textarea.split(/\s+/).filter(word => word.length > 0) //El regex indica que, el mensaje introducido en el textarea deber tener 100 o menos palabras//
    return words.length <= 100 //Devolvemos la longitud del mensaje, siempre y cuando sea igual o menor a 100//
}

export const createModal = (message, onCloseCallback) => { //Exportamos y creamos createModal, que servirá para crear los modales según proceda. S indica como segundo parámetro onCloseCallback, ya que nos hará falta para aquellas situaciones en las que determinada acción renderice otra página//
    const modal = document.createElement('div') //Declramos modal y lo creamos como div//
    modal.className = 'modal' //Asginamos nombre de clase para dar estilos//
    modal.textContent = message //Indicamos que el contenido será un mensaje//
    document.body.appendChild(modal) //Añadimos el modal al body//

    document.addEventListener('click', () => { //Indicamos con un addEventListener, que cuando se haga click en cualquier parte del documento//
        modal.remove() //El modal desaparece//
        if (onCloseCallback) { //Si existe onCloseCallback
            onCloseCallback() //Ejecutarlo, para permitir mostrar el modal antes de que se produzca otra acción//
        }
    }, { once: true }) //Indicamos que lo haga una vez//

    return modal //Devolvemos el modal
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//