//Importa el servicio de mensajes que contiene la lógica de negocio relacionada con mensajes//
const MessageService = require('../services/messageService')

//Define el controlador de mensajes que manejará las operaciones CRUD de mensajes//
const messageHandler = {
    //Método para obtener todos los mensajes//
    getAllMessages: (req, res) => {
        //Llama al servicio para obtener todos los mensajes//
        MessageService.getAllMessages()
            .then(({ success, messages }) => {
                //Si es exitoso, devuelve los mensajes con estado de éxito//
                res.json({ success, messages })
            })
            .catch(error => {
                //Si falla, devuelve error 500 (Error interno del servidor)//
                res.status(500).json(error)
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
        //Extrae fecha del mensaje y userId del cuerpo//
        const { date } = req.params
        const { userId } = req.body

        //Llama al servicio para alternar like//
        MessageService.toggleLike(date, userId)
            .then(({ success, messages }) => {
                //Devuelve estado y mensajes actualizados//
                res.json({ success, messages })
            })
            .catch(error => {
                //Si falla, devuelve error 404//
                res.status(404).json(error)
            })
    },

    //Método para alternar "dislike" en un mensaje//
    toggleDislike: (req, res) => {
        //Extrae fecha del mensaje y userId del cuerpo//
        const { date } = req.params;
        const { userId } = req.body;

        //Llama al servicio para alternar dislike//
        MessageService.toggleDislike(date, userId)
            .then(({ success, messages }) => {
                //Devuelve estado y mensajes actualizados//
                res.json({ success, messages })
            })
            .catch(error => {
                //Si falla, devuelve error 404//
                res.status(404).json(error);
            })
    },

    //Método para alternar "favorito" en un mensaje//
    toggleFavorite: (req, res) => {
        //Extrae fecha del mensaje y userId del cuerpo//
        const { date } = req.params
        const { userId } = req.body

        //Llama al servicio para alternar favorito//
        MessageService.toggleFavorite(date, userId)
            .then(({ success, messages }) => {
                //Devuelve estado y mensajes actualizados//
                res.json({ success, messages })
            })
            .catch(error => {
                //Si falla, devuelve error 404//
                res.status(404).json(error)
            })
    }
}

//Exporta el controlador para ser usado en las rutas//
module.exports = messageHandler