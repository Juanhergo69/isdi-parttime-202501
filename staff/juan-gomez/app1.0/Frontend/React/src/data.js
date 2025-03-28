const storeMsg = (loggedUserUserId, title, msg, date) => { //Almacenamos los mensajes de los usuarios en base a su id, titulo, mensaje y fecha//
    if (!title || !msg) { //Si no hay titulo o mensaje//
        createModal('All fields are required. The message has not been stored') //Creamos un modal indicando el error//
        return //Salimos//
    }

    const messages = getMessages() //Los mensajes se recopilarán a través de la función getMessages//
    const objectUserMsg = { //El mensaje del usuario se compondrá de...//
        userId: loggedUserUserId, //Su id//
        title: title, //Título del mensaje//
        msg: msg, //Cuerpo del mensaje (contenido)//
        date: date.toLocaleString(), //Fecha (con toLocalString la hacemos leible)//
        likes: [], //Contador de likes//
        dislikes: [] //Contador de dislikes//
    };

    messages.push(objectUserMsg) //Almacenamos el mensaje del usuario al global de mensajes//
    saveMessages(messages) //Y ejecutamos la función saveMessages sobre los mensajes//
};

const toggleLike = (messageId, userId) => { //Manejamos los likes//
    const messages = getMessages() //Los mensajes se recopilarán a través de la función getMessages//
    const message = messages.find(msg => msg.date === messageId) //El mensaje será buscado (find) en base a la fecha y el id//

    if (message) { //Si existe mensaje//
        const userLikeIndex = message.likes.indexOf(userId) //Se genera un indice interno de likes//
        const userDislikeIndex = message.dislikes.indexOf(userId) //Se genera un indice interno de dislikes//

        if (userLikeIndex === -1) { //Si el indice de likes es -1 (es decir, no hay like dado)//
            message.likes.push(userId) //Se almacena la id del usuario en el contador de likes//
            if (userDislikeIndex !== -1) { //Si el indice de dislikes es distinto a -1 (es decir, el usuario previamente ya había dado dislike a ese mensaje)//
                message.dislikes.splice(userDislikeIndex, 1); //Quitamos el dislike//
            }
        } else { //Si no ocurre ningún caso anterior, y por tanto, lo que ocurre es que el usuario ya había dado like a ese mensaje//
            message.likes.splice(userLikeIndex, 1) //Quitamos el like//
        }
        saveMessages(messages) //Ejecutamos la función saveMessages sobre los mensajes//
    }
}

const toggleDislike = (messageId, userId) => { //Manejamos los dislikes//
    const messages = getMessages() //Los mensajes se recopilarán a través de la función gesMessages//
    const message = messages.find(msg => msg.date === messageId) //El mensaje será buscado (find) en base a la fecha y el id//

    if (message) { //Si existe mensaje//
        const userDislikeIndex = message.dislikes.indexOf(userId) //Se genera un indice interno de dislikes//
        const userLikeIndex = message.likes.indexOf(userId) //Se genera un indice interno de likes//

        if (userDislikeIndex === -1) { //Si el indice de dislikes es -1 (es decir, no hay dislike dado)
            message.dislikes.push(userId) //Almacenamos la id del usuario en el contador de dislikes//
            if (userLikeIndex !== -1) { //Si el indice de likes es distinto a -1 (es decir, el usuario previamente ya había dado like a ese mensaje)//
                message.likes.splice(userLikeIndex, 1) //Quitamos el like//
            }
        } else { //Si no ocurre ningún caso anterior, y por tanto, lo que ocurre es que el usuario ya había dado dislike a ese mensaje//
            message.dislikes.splice(userDislikeIndex, 1) //Quitamos el dislike//
        }
        saveMessages(messages) //Ejecutamos la función saveMessages sobre los mensajes//
    }
}
