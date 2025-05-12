//Importa el servicio de usuarios que contiene la lógica de negocio relacionada con usuarios//
const UserService = require('../services/userService')

//Define el controlador de usuarios que manejará las operaciones CRUD de usuarios//
const userHandler = {
    //Método para obtener un usuario específico por su ID//
    getUser: (req, res) => {
        //Extrae el parámetro 'id' de la URL de la solicitud//
        const { id } = req.params

        //Llama al servicio para obtener el usuario por ID//
        UserService.getUserById(id)
            .then(({ success, user }) => {
                //Si es exitoso, devuelve el usuario encontrado//
                res.json({ success, user })
            })
            .catch(error => {
                //Si falla (usuario no encontrado), devuelve error 404//
                res.status(404).json(error)
            })
    },

    //Método para actualizar los datos de un usuario//
    updateUser: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params
        //Extrae los datos a actualizar del cuerpo de la solicitud//
        let updateData = req.body

        // Si es FormData (contiene avatar), procesar de manera diferente
        if (req.file) {
            const imageBase64 = req.file.buffer.toString('base64');
            updateData = { ...updateData, avatar: imageBase64 };
        }

        //Llama al servicio para actualizar el usuario//
        UserService.updateUser(id, updateData)
            .then(({ success, user }) => {
                //Si es exitoso, devuelve el usuario actualizado//
                res.json({ success, user });
            })
            .catch(error => {
                //Si falla (datos inválidos), devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para eliminar un usuario//
    deleteUser: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params

        //Llama al servicio para eliminar el usuario//
        UserService.deleteUser(id)
            .then(({ success }) => {
                //Si es exitoso, devuelve confirmación de éxito//
                res.json({ success })
            })
            .catch(error => {
                //Si falla, devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para actualizar el estado de un usuario//
    updateStatus: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params
        //Extrae el nuevo estado del cuerpo de la solicitud//
        const { status } = req.body

        //Llama al servicio para actualizar el estado del usuario//
        UserService.updateUserStatus(id, status)
            .then(({ success, user }) => {
                //Si es exitoso, devuelve el usuario con estado actualizado//
                res.json({ success, user });
            })
            .catch(error => {
                //Si falla, devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para actualizar el avatar de un usuario//
    updateAvatar: (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No valid image provided'
            });
        }

        // Convertir el buffer de la imagen a base64 como en messages
        const imageBase64 = req.file ? req.file.buffer.toString('base64') : null

        UserService.updateUserAvatar(req.params.id, imageBase64)
            .then(({ success, user }) => {
                res.json({ success, user, notification });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    },

    deleteAvatar: (req, res) => {
        const { id } = req.params;

        UserService.deleteUserAvatar(id)
            .then(({ success, user }) => {
                res.json({ success, user });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    },

    //Método para obtener todos los usuarios//
    getAllUsers: (req, res) => {
        //Llama al servicio para obtener todos los usuarios//
        UserService.getAllUsers()
            .then(({ success, users }) => {
                //Si es exitoso, devuelve la lista de usuarios//
                res.json({ success, users });
            })
            .catch(error => {
                //Si falla (error del servidor), devuelve error 500//
                res.status(500).json(error)
            })
    }
}

//Exporta el controlador para ser utilizado en las rutas//
module.exports = userHandler