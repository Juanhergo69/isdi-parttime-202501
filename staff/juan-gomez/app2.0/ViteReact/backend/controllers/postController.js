//Importa el módulo 'fs' (File System) de Node.js para operaciones con archivos//
const fs = require('fs')
//Importa el módulo 'path' de Node.js para manejar rutas de archivos//
const path = require('path')

//Define la ruta al archivo de mensajes, combinando el directorio actual con la ruta relativa//
const MESSAGES_FILE = path.join(__dirname, '../storage/messages.json')
//Define la ruta al archivo de usuarios, combinando el directorio actual con la ruta relativa//
const USERS_FILE = path.join(__dirname, '../storage/users.json') 

//Función para obtener todos los usuarios desde el archivo JSON//
const getUsers = () => {
    try {
        //Lee el archivo de usuarios de forma síncrona con codificación UTF-8//
        const data = fs.readFileSync(USERS_FILE, 'utf8')
        //Parsea el contenido JSON a un objeto JavaScript//
        return JSON.parse(data)
    } catch (err) {
        //Si hay error (ej. archivo no existe), devuelve array vacío//
        return []
    }
}

//Función para obtener todos los mensajes desde el archivo JSON//
const getMessages = () => {
    try {
        //Lee el archivo de mensajes de forma síncrona con codificación UTF-8//
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8')
        //Parsea el contenido JSON a un objeto JavaScript//
        return JSON.parse(data)
    } catch (err) {
        //Si hay error (ej. archivo no existe), devuelve array vacío//
        return []
    }
}

//Función para guardar los mensajes en el archivo JSON//
const saveMessages = (messages) => {
    //Escribe el array de mensajes en el archivo, convirtiéndolo a JSON formateado//
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
}

//Función para validar el título del mensaje (máximo 5 palabras)//
const validateTitle = (title) => {
    //Divide el título en palabras, filtrando cadenas vacías//
    const words = title.split(/\s+/).filter(word => word.length > 0)
    //Retorna true si tiene 5 palabras o menos//
    return words.length <= 5
}

//Función para validar el contenido del mensaje (máximo 100 palabras)//
const validateTextarea = (textarea) => {
    //Divide el texto en palabras, filtrando cadenas vacías//
    const words = textarea.split(/\s+/).filter(word => word.length > 0)
    //Retorna true si tiene 100 palabras o menos//
    return words.length <= 100
}

//Controlador para crear un nuevo post/mensaje//
exports.createPost = (req, res) => {
    //Extrae los datos del cuerpo de la solicitud//
    const { userId, title, msg, image } = req.body

    //Obtiene todos los usuarios//
    const users = getUsers()
    //Busca el usuario por su ID//
    const user = users.find(u => u.id === userId)

    //Si no encuentra el usuario, devuelve error 404//
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    //Valida que título y mensaje no estén vacíos//
    if (!title || !msg) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required. The message has not been stored'
        })
    }

    //Valida que el título no exceda 5 palabras//
    if (!validateTitle(title)) {
        return res.status(400).json({
            success: false,
            message: 'Title cannot exceed 5 words'
        });
    }

    //Valida que el mensaje no exceda 100 palabras//
    if (!validateTextarea(msg)) {
        return res.status(400).json({
            success: false,
            message: 'Message cannot exceed 100 words'
        })
    }

    //Obtiene todos los mensajes existentes//
    const messages = getMessages()
    //Crea un nuevo objeto post/mensaje//
    const newPost = {
        userId,                             //ID del usuario que creó el mensaje//
        userName: user.userName,            //Nombre del usuario//
        title,                              //Título del mensaje//
        msg,                                //Contenido del mensaje//
        date: new Date().toLocaleString(),  //Fecha actual formateada//
        likes: [],                          //Array para almacenar likes
        dislikes: [],                       //Array para almacenar dislikes//
        favorite: [],                       //Array para almacenar favoritos//
        image: image || null                //Imagen adjunta (opcional)//
    }

    //Agrega el nuevo mensaje al array de mensajes//
    messages.push(newPost)
    //Guarda los mensajes actualizados//
    saveMessages(messages)

    //Devuelve respuesta exitosa con código 201 (Creado)//
    res.status(201).json({
        success: true,
        message: 'Message stored successfully!',
        post: newPost
    })
}

//Controlador para manejar likes en un mensaje//
exports.toggleLike = (req, res) => {
    //Extrae messageId y userId del cuerpo de la solicitud//
    const { messageId, userId } = req.body
    //Obtiene todos los mensajes//
    const messages = getMessages();
    //Busca el mensaje por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    //Si no encuentra el mensaje, devuelve error 404//
    if (!message) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        })
    }

    //Busca si el usuario ya dio like//
    const userLikeIndex = message.likes.indexOf(userId)
    //Busca si el usuario ya dio dislike//
    const userDislikeIndex = message.dislikes.indexOf(userId)

    //Si el usuario no había dado like antes//
    if (userLikeIndex === -1) {
        //Agrega el like//
        message.likes.push(userId)
        //Si tenía dislike, lo remueve//
        if (userDislikeIndex !== -1) {
            message.dislikes.splice(userDislikeIndex, 1)
        }
    } else {
        //Si ya tenía like, lo remueve//
        message.likes.splice(userLikeIndex, 1);
    }

    //Guarda los cambios//
    saveMessages(messages)
    //Devuelve los contadores actualizados//
    res.json({
        success: true,
        likes: message.likes,
        dislikes: message.dislikes
    })
}

//Controlador para manejar dislikes en un mensaje//
exports.toggleDislike = (req, res) => {
    //Extrae messageId y userId del cuerpo de la solicitud//
    const { messageId, userId } = req.body
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Busca el mensaje por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    //Si no encuentra el mensaje, devuelve error 404//
    if (!message) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        })
    }

    //Busca si el usuario ya dio dislike//
    const userDislikeIndex = message.dislikes.indexOf(userId);
    //Busca si el usuario ya dio like//
    const userLikeIndex = message.likes.indexOf(userId);

    //Si el usuario no había dado dislike antes//
    if (userDislikeIndex === -1) {
        //Agrega el dislike//
        message.dislikes.push(userId);
        //Si tenía like, lo remueve//
        if (userLikeIndex !== -1) {
            message.likes.splice(userLikeIndex, 1);
        }
    } else {
        //Si ya tenía dislike, lo remueve//
        message.dislikes.splice(userDislikeIndex, 1);
    }

    //Guarda los cambios//
    saveMessages(messages);
    //Devuelve los contadores actualizados//
    res.json({
        success: true,
        likes: message.likes,
        dislikes: message.dislikes
    })
}

//Controlador para manejar favoritos en un mensaje//
exports.toggleFavorite = (req, res) => {
    //Extrae messageId y userId del cuerpo de la solicitud//
    const { messageId, userId } = req.body
    //Obtiene todos los mensajes//
    const messages = getMessages()
    //Busca el mensaje por su fecha (que funciona como ID)//
    const message = messages.find(msg => msg.date === messageId)

    //Si no encuentra el mensaje, devuelve error 404//
    if (!message) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        })
    }

    //Inicializa el array favorite si no existe//
    if (!message.favorite) {
        message.favorite = [];
    }

    //Busca si el usuario ya marcó como favorito//
    const userFavoriteIndex = message.favorite.indexOf(userId);

    //Si no estaba en favoritos, lo agrega//
    if (userFavoriteIndex === -1) {
        message.favorite.push(userId);
    } else {
        //Si ya estaba, lo remueve//
        message.favorite.splice(userFavoriteIndex, 1);
    }

    //Guarda los cambios//
    saveMessages(messages);
    //Devuelve el array de favoritos actualizado//
    res.json({
        success: true,
        favorite: message.favorite
    })
}

//Controlador para obtener todos los posts/mensajes//
exports.getPosts = (_, res) => {
    //Obtiene todos los mensajes//
    const messages = getMessages();
    //Devuelve los mensajes en formato JSON//
    res.json({
        success: true,
        messages
    })
}