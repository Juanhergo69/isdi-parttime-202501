//******************************************************************************************************************************************************************************************//
//AQUÍ SE IMPORTAN TODOS LOS ELEMENTOS NECESARIOS DE OTROS ARCHIVOS PARA EL CORRECTO FUNCIONAMIENTO DEL CÓDIGO ALOJADO EN ESTE ARCHIVO//
//******************************************************************************************************************************************************************************************//
import { currentView } from './1state.mjs' //Importamos la vista actual//
import {
    loadFonts,
    capitalizeFirstLetter,
    STORAGE_KEYS,
    getUsers,
    saveUsers,
    getMessages,
    saveMessages,
    getLoggedUserId
} from './2utils.mjs' //Importamos las funciones utilitarias (lo pongo en vertical para facilitar la vista//
import { navigateToHome } from './6navigation.mjs' //Importamos la navegación a home//
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN EL TRATAMIENTO DE DATOS, YA SEA CREACIÓN, ALMACENAMIENTO O COMPARACIÓN DE LOS MISMOS//
//******************************************************************************************************************************************************************************************//
export const registerUser = (registerData) => { //Export amos y creamos registerUser. La función permite crear el registro del usuario, en base a los datos de registro ej.-->registerData = {'email': '', 'password': '', 'confirmation-password': ''}//
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //El if nos indica que si no hay email, contraseña o confirmación de contraseña//
        alert('Register Data Incomplete') //Se ejecuta un alert diciendo que los datos de registro están incompletos//
        return //Salimos de la función//
    }

    if (registerData['password'] !== registerData['confirmation-password']) { //El if nos indica que si la contraseña es diferente a la confirmación de contraseña//
        alert('Password and confirmation password are not the same') //Se ejecuta un alert que nos indica que las contraseñas no son coincidentes//
        return //Salimos de la función
    }

    const users = getUsers() //Declaramos usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    const doesUserExist = users.some(user => user.email === registerData['email']) //Declaramos doesUserExist, que nos permitirá comprobar la existencia (o no) del usuario que pretende registrarse. Some permite comprobar si alguno de los elementos cumple la condición indicada, en base a la función proporcionada//

    if (doesUserExist) { //El if nos indica que, si el usuario existe//
        alert('This mail is alredy in use') //Se ejecuta un alert indicando que el usuario ya existe//
        return //Nos salimos de la función//
    }

    const userName = registerData['email'].split('@')[0] //Declaramos userName, que será el nombre que adoptará el sistema para el usuario registrado. Mediante split, dividimos la dirección de mail en dos partes de un mismo array, partiendo desde el arroba (y haciéndolo desaparecer), y seleccionamos el elemento 0, es decir, la primera posición de ese array. En este caso, sería todo lo anterior al @//
    const capitalizedUserName = capitalizeFirstLetter(userName) //Declaramos capitalizedUserName, y llamamos a la función capitalizedFirstLetter para poner la primera letra en mayúscula//
    const userCreated = { email: registerData['email'], password: registerData['password'], userName: capitalizedUserName, id: Date.now() } //Declaramos userCreated, que serán los datos almacenados del registro del usuario. Constará de su email, su contraseña, su nombre de usuario (declarado arriba) y "trampeamos con id:Date.now(), para asignar una id especifica para ese usuario"//

    users.push(userCreated) //Con este push lo que hacemos es empujar los datos de userCreated a la variable users previamente declarada//
    saveUsers(users) //Guardamos en localStorage los usuarios con la función saveUsers//
    sessionStorage.setItem(STORAGE_KEYS.ID, userCreated.id) //Añadimos a sessionStorage, gracias a STORAGE_KEYS.ID, la id del usuario. Hay que hacer la transformación JSON//

    navigateToHome(currentView) //La función navigateToHome permite navegar hasta la página de home, a traves de la vista actual (currentView)
}

export const loginUser = (loginData) => { //Exportamos y creamos loginUser. La función permite crear el login del usuario, en base a los datos de registro ej.-->loginData = {'email': '', 'password': ''}//

    const users = getUsers() //Declaramos users, que traerá los usuarios de localStorage gracias a la función getUsers//
    const userLoginCheckout = users.find(user => user['email'] === loginData['email']) //Declaramos variable userLoginCheckout, que permitirá comprobar si el usuario se encuentra en la información facilitada//

    if (!userLoginCheckout || userLoginCheckout['password'] !== loginData['password']) { //El if nos indica que si no se encuentra el usuario, o que la contraseña, en caso de que el usuario exista, no es la correcta//
        alert('Wrong credentials') //Se ejecuta un alert que nos indica que los datos son incorrectos//
        return //Salimos de la función//
    }

    if (loginData['rememberme']) { //El if nos indica que, si desde los datos de logueo, el inputId remememberme (la checkbox) es true (o lo que es lo mismo, está marcada)//
        localStorage.id = userLoginCheckout.id //La id del usuario será almacenada en localStorage (es decir, el almacenamiento local)//
    } else { //Si sucede lo contrario (es decir, la checkbox no está marcada)//
        sessionStorage.id = userLoginCheckout.id //La id del usuario será almacenada en sessionStorage (es decir, el almacenamiento de la sesión)//
    }

    navigateToHome(currentView) //Navegamos a la página home desde la vista actual//
}

export const storeMsg = (loggedUserUserId, title, msg, date) => { //Exportamos y creamos storeMSg. La función permitira almacenar un mensaje en localStorage, basado en el nombre del usuario, titulo, mensaje y fecha de creación//
    if (!title || !msg) { //El if nos indica que si no hay título o no hay mensaje//
        alert('All fields are required. The message has not been stored') //Se ejecuta un alert indicando que el mensaje no se ha almacenado//
        return //Nos salimos de la función//
    } else { //Si no se cumple el if, es decir, hay titulo y mensaje//
        const messages = getMessages() //Declaramos messages, que serán los mensajes que nos traemos de localStorage gracias a la función getMessages//
        const objectUserMsg = { userId: loggedUserUserId, title: title, msg: msg, date: date.toLocaleString(), likes: [] } //Declaramos objectUserMsg, que contendrá la id del usuario, titulo, mensaje y fecha(utilizamos toLocaleString para formatear la fecha y que sea legible. Añadimos likes como array vacío para almacenamiento de likes por mensaje//
        messages.push(objectUserMsg) //Pusheamos objectUserMsg a messages//
        saveMessages(messages) //Guardamos los mensajes en localStorage gracias a la función saveMessages//
        alert('Message store successfully') //Se ejecuta un alert indicando que el mensaje se ha almacenado//
    }
}

export const toggleLike = (messageId, userId) => {
    const messages = getMessages() //Declaramos messages, que serán los mensajes que nos traemos de localStorage gracias a la función getMessages//
    const message = messages.find(msg => msg.date === messageId) //Declaramos message, que contendrá el elemento encontrado de messages que reúna la condición de igualdad de fecha e id. Este reultado lo almacena en msg//
    if (message) { //El if nos indica que, si existe message//
        const userIndex = message.likes.indexOf(userId) //Declaramos userIndex, que almacenará los likes de los mensajes, basado en la id del usuario//
        if (userIndex === -1) { //El if nos indica que si userIndex es -1 (es decir, el mensaje no tiene like)//
            message.likes.push(userId) //Se añade el like al mensaje, almacenando la userId//
        } else { //Si el if no se cumple, y por tanto, el mensaje ya tiene like dado//
            message.likes.splice(userIndex, 1) //Se quita el like que previamente tenía//
        }
        saveMessages(messages) //Guardamos los mensajes en localStorage gracias a la función saveMessages//
    }
}

export const viewMessages = () => {
    const messages = getMessages() //Declaramos messages, que serán los mensajes que nos traemos de localStorage gracias a la función getMessages//
    const postCommunityMsgContainer = document.getElementById('postcommunity') //Declaramos postCommunityMsgContainer, que contendrá todos los elementos de la id postcommunity//
    const users = getUsers() //Declaramos users, que serán los usuarios que nos traemos de localStorage gracias a la función getUsers//

    postCommunityMsgContainer.innerHTML = '' //Limpiamos el contenedor antes de agregar los mensajes//

    messages.forEach(message => { //Iteramos cada mensaje almacenado//
        const messageDiv = document.createElement('div') //Declaramos messageDiv, y lo creamos como div (servirá de contenedor para el mensaje)
        messageDiv.className = 'message' //Asignamos nombre de clase para dar estilos//

        const user = users.find(user => user.id === message.userId) //Declaramos user, que contendrá la búsqueda del nombre del usuario actualizado usando la ID almacenada en el mensaje//
        const userName = user ? capitalizeFirstLetter(user.userName) : 'Unknown User' //Declaramos userName. Si no se encuentra el usuario preguntando con ternarios, mostramos Unknown User//

        const userDiv = document.createElement('div') //Declaramos userDiv//
        userDiv.className = 'message-user' //Asignamos nombre de clase para dar estilos//
        userDiv.textContent = `User: ${userName}` //Indicamos que su contenido será el nombre del usuario actualizado//
        messageDiv.appendChild(userDiv) //Añadimos userDiv a messageDiv//

        const titleDiv = document.createElement('div') //Declaramos titleDiv//
        titleDiv.className = 'message-title' //Asignamos nombre de clase para dar estilos//
        titleDiv.textContent = `Title: ${message.title}` //Indicamos que su contenido será el título del mensaje//
        messageDiv.appendChild(titleDiv) //Añadimos titleDiv a a messageDiv//

        const msgDiv = document.createElement('div') //Declaramos msgDiv//
        msgDiv.className = 'message-text' //Asignamos nombre de clase para dar estilos//
        msgDiv.textContent = `Message: ${message.msg}` //Indicamos que su contenido será el mensaje escrito por el usuario//
        messageDiv.appendChild(msgDiv) //Añadimos msgDiv a messageDiv//

        const dateDiv = document.createElement('div') //Declaramos dateDiv//
        dateDiv.className = 'message-date' //Asignamos nombre de clase para dar estilos//
        dateDiv.textContent = `Date: ${message.date}` //Indicamos que su contenido será la fecha en la que se generó el mensaje//
        messageDiv.appendChild(dateDiv) //añadimos dateDiv a messageDiv//

        const likesDiv = document.createElement('div') //Declaramos likesDiv//
        likesDiv.className = 'message-likes' //Asignamos nombre de clase para dar estilos//
        const likesCount = message.likes.length //Declaramos likesCount, que será el contador de likes//
        const likedUsers = message.likes.map(likeUserId => { //Declaramos likedUsers, que con map nos permitirá asociar la id del like del usuario con el like//
            const likedUser = users.find(user => user.id === likeUserId) //Declaramos likedUser asociará la id del usuario que da el like con el like dado//
            return likedUser ? capitalizeFirstLetter(likedUser.userName) : 'Unknown User' //Devolvemos el nombre del usuario en lugar de la id//
        }).join(', ') //Y unimos, en el caso que haya varios usuarios que hayan dado like al mismo mensaje, los usuarios, separándolos con una coma//
        likesDiv.textContent = `Likes: ${likesCount} (${likedUsers})` //Indicamos que el contenido de likesDiv, que será el contador de likes y los usuarios que han dado like//
        messageDiv.appendChild(likesDiv) //Añadimos likesDiv a messageDiv//

        const likeButton = document.createElement('button') //Declaramos likeButton, que será el botón para poder dar like//
        likeButton.className = 'like-button' //Asignamos nombre de clase para dar estilos//

        const heartIcon = document.createElement('i') //Declaramos heartIcon, que será el icono de corazón que serivirá de botón para dar like//
        heartIcon.className = 'far fa-heart' //Asignamos nombre de clase para dar estilos. El nombre del estilo viene dado por FontAwesome (se indica far porque este será el estilo para el corazón vacío y con borde, es decir, cuando no se ha dado like)//
        likeButton.appendChild(heartIcon) //Añadimos heartIcon a likeButton//

        const loggedUserId = getLoggedUserId() //Declaramos loggedUserId, que serán las id de los usuarios que nos traemos de localStorage gracias a la función getLoggedUserId//
        const hasLiked = message.likes && message.likes.includes(loggedUserId) //Declaramos hasLiked, que contendrá los mensajes con likes, incluyendo la id del usuario que ha logueado//
        if (hasLiked) { //El if nos indica, que si hay mensajes con like//
            heartIcon.classList.remove('far') //heartIcon pierde el nombre de clase far, para que deje de estar sólo con borde y vacío//
            heartIcon.classList.add('fas') //heartIcon gana el nombre de clase fas, para que ahora, una vez dado el like, pase a ser un icono relleno//
        }

        likeButton.addEventListener('click', () => { //Añadimos un addEventListener cuando se haga click, que ejecutará la siguiente función//
            const loggedUserId = JSON.parse(localStorage.getItem('id')) || JSON.parse(sessionStorage.getItem('id')) //Declaramos loggedUserId, que almacenará la id del usuario desde localStorage o sessionStorage (hay que hacer la conversión JSON)//
            toggleLike(message.date, loggedUserId); //Usamos la fecha como id único//
            viewMessages(); //Ejecutamos viewMessages para actualizar la vista de los mensajes//
        })
        messageDiv.appendChild(likeButton) //Añadimos likeButton a messageDiv//
        postCommunityMsgContainer.appendChild(messageDiv) //Añadimos messageDiv a postComunityMsgContainer//
    })

    loadFonts()
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//
