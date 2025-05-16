//Importa el servicio de mensajes que contiene la lógica de negocio relacionada con mensajes//
const MessageService = require('../services/messageService')

//Define el controlador de mensajes que manejará las operaciones CRUD de mensajes//
const messageHandler = {
    //Método para obtener todos los mensajes//
    getAllMessages: (req, res) => {
        //Llama al método getAllMessages() del servicio MessageService que retorna una Promesa//
        MessageService.getAllMessages()
            //Maneja el caso exitoso cuando la promesa se resuelve//
            .then(({ success, messages }) => {
                //Verifica si 'messages' es un array, si no lo es asigna un array vacío//
                //Esto garantiza que siempre trabajaremos con un array aunque el servicio devuelva otro tipo//
                const safeMessages = Array.isArray(messages) ? messages : []

                //Envía la respuesta HTTP en formato JSON con://
                res.json({
                    success,                //El valor success recibido del servicio//
                    messages: safeMessages  //El array de mensajes (asegurado como array)//
                })
            })
            //Maneja el caso de error cuando la promesa es rechazada//
            .catch(error => {
                //Registra el error en la consola para debugging//
                console.error('Error getting messages:', error)

                //Envía una respuesta HTTP con://
                res.status(500)                               //Establece el código de estado HTTP 500 (Internal Server Error)//
                    .json({
                        success: false,                       //Indica que la operación falló//
                        error: 'Error retrieving messages',   //Mensaje de error genérico//
                        messages: []                          //Devuelve un array vacío para mantener consistencia en la estructura//
                    })
            })
    },

    //Método para obtener mensajes de un usuario específico//
    getUserMessages: (req, res) => {
        //Extrae el userId de los parámetros de la URL//
        const { userId } = req.params

        //Llama al servicio para obtener mensajes del usuario especificado//
        MessageService.getMessagesByUser(userId)
            .then(({ success, messages }) => {
                //Si es exitoso, devuelve los mensajes del usuario//
                res.json({ success, messages })
            })
            .catch(error => {
                //Si falla, devuelve error 500//
                res.status(500).json(error)
            })
    },

    //Método para crear un nuevo mensaje//
    createMessage: (req, res) => {
        //Extrae datos del cuerpo de la solicitud//
        const { userId, title, msg } = req.body;
        //Convierte la imagen adjunta (si existe) a base64//
        const image = req.file ? req.file.buffer.toString('base64') : null

        //Llama al servicio para crear el mensaje//
        MessageService.createMessage(userId, title, msg, image)
            .then(({ success, message, notification }) => {
                //Si es exitoso, devuelve el mensaje creado y notificación//
                res.json({ success, message, notification })
            })
            .catch(error => {
                //Si falla, devuelve error 400 (Solicitud incorrecta)//
                res.status(400).json(error)
            })
    },

    //Método para eliminar un mensaje//
    deleteMessage: (req, res) => {
        //Extrae la fecha (que actúa como identificador único) de los parámetros//
        const { date } = req.params

        //Llama al servicio para eliminar el mensaje//
        MessageService.deleteMessage(date)
            .then(({ success }) => {
                //Si es exitoso, devuelve estado de éxito//
                res.json({ success });
            })
            .catch(error => {
                //Si falla, devuelve error 404 (No encontrado)//
                res.status(404).json(error)
            })
    },

    //Método para alternar "like" en un mensaje//
    toggleLike: (req, res) => {
        //Extrae el parámetro 'date' de la URL de la solicitud//
        const { date } = req.params;

        //Extrae el campo 'userId' del cuerpo de la solicitud (request body)//
        const { userId } = req.body;

        //Llama al servicio toggleLike pasando la fecha y el ID de usuario//
        MessageService.toggleLike(date, userId)
            //Maneja la respuesta exitosa del servicio//
            .then(({ success, messages }) => {
                //Procesa cada mensaje para asegurar que tenga todos los campos requeridos//
                const completeMessages = messages.map(msg => ({
                    userId: msg.userId,             //ID del usuario que creó el mensaje (obligatorio)//
                    title: msg.title,               //Título del mensaje (obligatorio)//
                    msg: msg.msg,                   //Contenido del mensaje (obligatorio)//
                    date: msg.date,                 //Fecha del mensaje (obligatorio)//
                    image: msg.image || null,       //URL de imagen (si no existe, se establece null)//
                    likes: msg.likes || [],         //Array de likes (si no existe, array vacío)//
                    dislikes: msg.dislikes || [],   //Array de dislikes (si no existe, array vacío)//
                    favorite: msg.favorite || []    //Array de favoritos (si no existe, array vacío)//
                }))

                //Devuelve la respuesta HTTP con://
                res.json({
                    success,                    //Estado de éxito/fracaso de la operación//
                    messages: completeMessages  //Mensajes normalizados con estructura consistente//
                })
            })
            //Maneja los errores que puedan ocurrir//
            .catch(error => {
                //Registra el error en la consola para propósitos de depuración//
                console.error('Toggle like error:', error)

                //Devuelve una respuesta HTTP con://
                res.status(404).json(error)  //Establece código de estado 404 (Not Found). Devuelve el objeto de error completo//
            })
    },

    //Método para alternar "dislike" en un mensaje//
    toggleDislike: (req, res) => {
        //Extrae el parámetro 'date' de la URL de la solicitud//
        const { date } = req.params

        //Extrae el campo 'userId' del cuerpo de la solicitud (request body)//
        const { userId } = req.body

        //Llama al servicio toggleDislike pasando la fecha y el ID de usuario//
        MessageService.toggleDislike(date, userId)
            //Maneja la respuesta exitosa del servicio//
            .then(({ success, messages }) => {
                //Procesa cada mensaje para asegurar que tenga todos los campos requeridos//
                const completeMessages = messages.map(msg => ({
                    userId: msg.userId,             //ID del usuario que creó el mensaje (obligatorio)//
                    title: msg.title,               //Título del mensaje (obligatorio)//
                    msg: msg.msg,                   //Contenido del mensaje (obligatorio)//
                    date: msg.date,                 //Fecha del mensaje (obligatorio)//
                    image: msg.image || null,       //URL de imagen (si no existe, se establece null)//
                    likes: msg.likes || [],         //Array de likes (si no existe, array vacío)//
                    dislikes: msg.dislikes || [],   //Array de dislikes (si no existe, array vacío)//
                    favorite: msg.favorite || []    //Array de favoritos (si no existe, array vacío)//
                }))

                //Devuelve la respuesta HTTP con://
                res.json({
                    success,                    //Estado de éxito/fracaso de la operación//
                    messages: completeMessages  //Mensajes normalizados con estructura consistente//
                })
            })
            //Maneja los errores que puedan ocurrir//
            .catch(error => {
                //Registra el error en la consola para propósitos de depuración//
                console.error('Toggle dislike error:', error)

                //Devuelve una respuesta HTTP con://
                res.status(404).json(error)  //Establece código de estado 404 (Not Found). Devuelve el objeto de error completo//
            })
    },

    //Método para alternar "favorito" en un mensaje//
    toggleFavorite: (req, res) => {
        //Extrae el parámetro 'date' de la URL de la solicitud//
        const { date } = req.params

        //Extrae el campo 'userId' del cuerpo de la solicitud (request body)//
        const { userId } = req.body

        //Llama al servicio toggleFavorite pasando la fecha y el ID de usuario//
        MessageService.toggleFavorite(date, userId)
            .then(({ success, messages }) => {
                //Procesa cada mensaje para asegurar que tenga todos los campos requeridos//
                const completeMessages = messages.map(msg => ({
                    userId: msg.userId,             //ID del usuario que creó el mensaje (obligatorio)//
                    title: msg.title,               //Título del mensaje (obligatorio)//
                    msg: msg.msg,                   //Contenido del mensaje (obligatorio)//
                    date: msg.date,                 //Fecha del mensaje (obligatorio)//
                    image: msg.image || null,       //URL de imagen (si no existe, se establece null)//
                    likes: msg.likes || [],         //Array de likes (si no existe, array vacío)//
                    dislikes: msg.dislikes || [],   //Array de dislikes (si no existe, array vacío)//
                    favorite: msg.favorite || []    //Array de favoritos (si no existe, array vacío)//
                }))

                //Devuelve la respuesta HTTP con://
                res.json({
                    success,                    //Estado de éxito/fracaso de la operación//
                    messages: completeMessages  //Mensajes normalizados con estructura consistente//
                })
            })
            //Maneja los errores que puedan ocurrir//
            .catch(error => {
                //Registra el error en la consola para propósitos de depuración//
                console.error('Toggle favorite error:', error)

                //Devuelve una respuesta HTTP con://
                res.status(404).json(error)  //Establece código de estado 404 (Not Found). Devuelve el objeto de error completo//
            })
    },
}

//Exporta el controlador para ser usado en las rutas//
module.exports = messageHandler